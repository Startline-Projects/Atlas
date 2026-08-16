import { NextResponse, type NextRequest } from "next/server";

import {
  ADMIN_REFRESH_COOKIE,
  ADMIN_SESSION_COOKIE,
  REFRESH_COOKIE,
  SESSION_COOKIE,
} from "@/lib/auth/cookie-names";
import {
  adminSignInPath,
  candidateSignInPath,
  PATHNAME_HEADER,
} from "@/lib/auth/redirects";
import { accessTokenNeedsRefresh, refreshSession } from "@/lib/auth/refresh";
import { IP_LIMITS, ROUTE_LIMITS } from "@/lib/config/rate-limits";
import { limiter } from "@/lib/integrations/upstash";
import {
  ADMIN_COOKIES,
  applySessionCookies,
  CANDIDATE_COOKIES,
  clearSessionCookies,
} from "@/lib/auth/session-cookies";

/**
 * Request proxy (Next 16's name for `middleware.ts`) — ARCHITECTURE §15:
 * "All routes default to authenticated. Public routes are explicitly listed."
 *
 * Two jobs, both cheap:
 *
 * 1. Gate. Anonymous visitors (no session cookies at all) are bounced to the
 *    matching sign-in page with `?next=`. Only *presence* is checked here —
 *    validity is the guarded layouts' job via `getCandidateSession()` /
 *    `getAdminSession()`, so a stale cookie gets past this file and is caught
 *    one step later. Validating here would put a Supabase round-trip in front
 *    of every matched request.
 *
 * 2. Refresh. When the access token is gone or about to expire and a refresh
 *    cookie exists, trade it for a new pair *before* the page renders. This is
 *    the only place that can: Server Components cannot set cookies. Runs for
 *    the `me` API prefixes too, so a long-open profile builder keeps working
 *    across the access token's lifetime. On API paths a dead session is left
 *    to the route (401 JSON) — never a redirect.
 *
 * Deliberately NOT done here: sending a visitor who *has* a cookie away from
 * a sign-in page. Presence is not validity, and a stale cookie would loop.
 * The auth layouts do that after a real check.
 *
 * 3. Rate limit. The auth endpoints in `config/rate-limits.ts` get a per-IP
 *    sliding window (§7.6) — a 429 with Retry-After before the route runs.
 *    Per-account lockout is the services' job (`lib/auth/account-lockout`).
 *
 * Only guards + refresh + limits. No rewrites, no locale — keep it that way
 * so the file stays auditable at a glance.
 */

interface Surface {
  /** URL prefixes the surface owns. */
  prefixes: ReadonlyArray<string>;
  /** Prefixes that are API, not pages: refresh yes, redirect never. */
  apiPrefixes: ReadonlyArray<string>;
  /** Page paths under the prefixes an anonymous visitor may open. */
  publicPaths: ReadonlyArray<string>;
  cookies: { access: string; refresh: string };
  /** Where to send anonymous visitors, carrying `?next=`. */
  signInPath: (next: string) => string;
}

const SURFACES: ReadonlyArray<Surface> = [
  {
    prefixes: ["/candidate", "/api/v1/candidates/me"],
    apiPrefixes: ["/api/v1/candidates/me"],
    publicPaths: ["/candidate/signin", "/candidate/signup"],
    cookies: { access: SESSION_COOKIE, refresh: REFRESH_COOKIE },
    signInPath: candidateSignInPath,
  },
  {
    prefixes: ["/admin", "/api/v1/admin/me"],
    apiPrefixes: ["/api/v1/admin/me"],
    publicPaths: ["/admin/signin"],
    cookies: { access: ADMIN_SESSION_COOKIE, refresh: ADMIN_REFRESH_COOKIE },
    signInPath: adminSignInPath,
  },
];

function isUnder(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

/**
 * Best-effort client address. Behind Vercel / a proxy the first hop of
 * `x-forwarded-for` is the client; locally there is nothing, so every request
 * shares one bucket ("local") — fine for development.
 */
function clientIp(request: NextRequest): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "local";
}

/**
 * Per-IP rate limit for the abusable endpoints (config/rate-limits.ts).
 * Returns a 429 response, or null when the request may proceed.
 */
async function enforceRateLimit(request: NextRequest): Promise<NextResponse | null> {
  const rule = ROUTE_LIMITS.find(
    (r) => r.method === request.method && r.path === request.nextUrl.pathname,
  );
  if (!rule) return null;

  const result = await limiter(rule.limit, IP_LIMITS[rule.limit]).limit(
    clientIp(request),
  );
  if (result.success) return null;

  return NextResponse.json(
    {
      error: {
        code: "RATE_LIMITED",
        message: "Too many requests. Please wait a moment and try again.",
      },
    },
    {
      status: 429,
      headers: { "Retry-After": String(result.retryAfterSeconds) },
    },
  );
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname, search } = request.nextUrl;
  const here = `${pathname}${search}`;

  const limited = await enforceRateLimit(request);
  if (limited) return limited;

  const surface = SURFACES.find((s) => s.prefixes.some((p) => isUnder(pathname, p)));

  // Layouts cannot see the URL they are rendering for; hand it to them so a
  // session that turns out to be stale can still redirect with a `?next=`.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(PATHNAME_HEADER, here);

  if (!surface || surface.publicPaths.some((p) => isUnder(pathname, p))) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const isApi = surface.apiPrefixes.some((p) => isUnder(pathname, p));
  const access = request.cookies.get(surface.cookies.access)?.value;
  const refresh = request.cookies.get(surface.cookies.refresh)?.value;

  // Healthy access token — nothing to do.
  if (access && !accessTokenNeedsRefresh(access)) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Access token missing or nearly dead, and a refresh token to trade in.
  if (refresh) {
    const fresh = await refreshSession(refresh);
    if (fresh) {
      // The render that follows must see the new token: rewrite the request
      // cookie header, then also set the cookies on the response for the
      // browser. `request.cookies.set` writes through to the `cookie` header.
      request.cookies.set(surface.cookies.access, fresh.accessToken);
      request.cookies.set(surface.cookies.refresh, fresh.refreshToken);
      const forwarded = new Headers(request.headers);
      forwarded.set(PATHNAME_HEADER, here);

      const response = NextResponse.next({ request: { headers: forwarded } });
      applySessionCookies(
        response,
        surface.cookies.access === SESSION_COOKIE ? CANDIDATE_COOKIES : ADMIN_COOKIES,
        fresh,
      );
      return response;
    }

    // Refresh token is dead (revoked, reused, expired). Drop both cookies so
    // the visitor is cleanly signed out instead of retrying every request.
    const response = isApi
      ? NextResponse.next({ request: { headers: requestHeaders } })
      : NextResponse.redirect(new URL(surface.signInPath(here), request.url));
    clearSessionCookies(
      response,
      surface.cookies.access === SESSION_COOKIE ? CANDIDATE_COOKIES : ADMIN_COOKIES,
    );
    return response;
  }

  // No refresh token. A still-valid-but-expiring access token gets through
  // (the layout validates it); nothing at all → sign in (pages) / 401 (API).
  if (access || isApi) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }
  return NextResponse.redirect(new URL(surface.signInPath(here), request.url));
}

export const config = {
  matcher: [
    "/candidate/:path*",
    "/admin/:path*",
    // Session refresh for the signed-in APIs + rate limits for the auth
    // endpoints (config/rate-limits.ts ROUTE_LIMITS must stay within these).
    "/api/v1/candidates/:path*",
    "/api/v1/admin/:path*",
  ],
};
