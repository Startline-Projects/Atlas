import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { isProduction, serverConfig } from "@/lib/config";
import type { RateLimit } from "@/lib/config/rate-limits";

/**
 * Upstash wrapper — ARCHITECTURE §5.6 / §7.6. The only place
 * `@upstash/ratelimit` and `@upstash/redis` are imported.
 *
 * Two primitives, both keyed by an arbitrary string:
 *   • `limiter(name, limit)`  — sliding-window "N requests per window"
 *   • `counter(name)`         — INCR with TTL, for account lockouts
 *
 * Without Upstash credentials:
 *   • outside production, an in-process store stands in so the behaviour
 *     is exercised locally (per Node process — resets on restart);
 *   • in production, the store is a no-op and an error is logged ONCE at
 *     first use. Failing open keeps sign-in available; the launch checklist
 *     (PROJECT_SCOPE §5) requires the real thing to be configured.
 */

let redis: Redis | null | undefined;
let warned = false;

function getRedis(): Redis | null {
  if (redis !== undefined) return redis;
  const { UPSTASH_REDIS_REST_URL: url, UPSTASH_REDIS_REST_TOKEN: token } =
    serverConfig();
  redis = url && token ? new Redis({ url, token }) : null;
  if (!redis && isProduction && !warned) {
    warned = true;
    console.error(
      "[rate-limit] UPSTASH_REDIS_REST_URL / _TOKEN are not set in production — " +
        "rate limits and account lockouts are OFF.",
    );
  }
  return redis;
}

export function isUpstashConfigured(): boolean {
  return getRedis() !== null;
}

/* -------------------------------------------------------------------------- */
/* Sliding-window limiter                                                     */
/* -------------------------------------------------------------------------- */

export interface LimitResult {
  success: boolean;
  /** Seconds until the caller may try again (0 when `success`). */
  retryAfterSeconds: number;
}

export interface Limiter {
  limit(key: string): Promise<LimitResult>;
}

const limiters = new Map<string, Limiter>();

/** A limiter for `name`. Cached — the same name always yields the same instance. */
export function limiter(name: string, limit: RateLimit): Limiter {
  const cached = limiters.get(name);
  if (cached) return cached;

  const client = getRedis();
  const built: Limiter = client
    ? upstashLimiter(client, name, limit)
    : isProduction
      ? NOOP_LIMITER
      : memoryLimiter(limit);

  limiters.set(name, built);
  return built;
}

const NOOP_LIMITER: Limiter = {
  async limit() {
    return { success: true, retryAfterSeconds: 0 };
  },
};

function upstashLimiter(client: Redis, name: string, limit: RateLimit): Limiter {
  const rl = new Ratelimit({
    redis: client,
    prefix: `atlas:rl:${name}`,
    limiter: Ratelimit.slidingWindow(limit.requests, `${limit.windowSeconds} s`),
    analytics: false,
  });
  return {
    async limit(key) {
      const r = await rl.limit(key);
      return {
        success: r.success,
        retryAfterSeconds: r.success
          ? 0
          : Math.max(1, Math.ceil((r.reset - Date.now()) / 1000)),
      };
    },
  };
}

/** Dev stand-in: exact sliding window over an in-process timestamp list. */
function memoryLimiter(limit: RateLimit): Limiter {
  const hits = new Map<string, number[]>();
  const windowMs = limit.windowSeconds * 1000;
  return {
    async limit(key) {
      const now = Date.now();
      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
      if (recent.length >= limit.requests) {
        hits.set(key, recent);
        const oldest = recent[0] ?? now;
        return {
          success: false,
          retryAfterSeconds: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)),
        };
      }
      recent.push(now);
      hits.set(key, recent);
      return { success: true, retryAfterSeconds: 0 };
    },
  };
}

/* -------------------------------------------------------------------------- */
/* TTL counter (account lockout)                                              */
/* -------------------------------------------------------------------------- */

export interface Counter {
  /** Increments and returns the new count; the key expires `ttlSeconds` after its first increment. */
  increment(key: string, ttlSeconds: number): Promise<number>;
  get(key: string): Promise<number>;
  /** Seconds until the key expires — 0 when absent. */
  ttl(key: string): Promise<number>;
  reset(key: string): Promise<void>;
}

const counters = new Map<string, Counter>();

export function counter(name: string): Counter {
  const cached = counters.get(name);
  if (cached) return cached;

  const client = getRedis();
  const built: Counter = client
    ? upstashCounter(client, `atlas:ctr:${name}`)
    : isProduction
      ? NOOP_COUNTER
      : memoryCounter();

  counters.set(name, built);
  return built;
}

const NOOP_COUNTER: Counter = {
  async increment() {
    return 0;
  },
  async get() {
    return 0;
  },
  async ttl() {
    return 0;
  },
  async reset() {},
};

function upstashCounter(client: Redis, prefix: string): Counter {
  const k = (key: string) => `${prefix}:${key}`;
  return {
    async increment(key, ttlSeconds) {
      const n = await client.incr(k(key));
      // Only the first increment starts the clock, so the window is measured
      // from the first failure, not the last (a "sliding" lockout would be
      // an easy way to keep someone locked out forever).
      if (n === 1) await client.expire(k(key), ttlSeconds);
      return n;
    },
    async get(key) {
      const v = await client.get<number>(k(key));
      return typeof v === "number" ? v : Number(v ?? 0);
    },
    async ttl(key) {
      const t = await client.ttl(k(key));
      return t > 0 ? t : 0;
    },
    async reset(key) {
      await client.del(k(key));
    },
  };
}

function memoryCounter(): Counter {
  const store = new Map<string, { n: number; expiresAt: number }>();
  const live = (key: string) => {
    const e = store.get(key);
    if (!e) return undefined;
    if (e.expiresAt <= Date.now()) {
      store.delete(key);
      return undefined;
    }
    return e;
  };
  return {
    async increment(key, ttlSeconds) {
      const e = live(key);
      if (!e) {
        store.set(key, { n: 1, expiresAt: Date.now() + ttlSeconds * 1000 });
        return 1;
      }
      e.n += 1;
      return e.n;
    },
    async get(key) {
      return live(key)?.n ?? 0;
    },
    async ttl(key) {
      const e = live(key);
      return e ? Math.max(1, Math.ceil((e.expiresAt - Date.now()) / 1000)) : 0;
    },
    async reset(key) {
      store.delete(key);
    },
  };
}
