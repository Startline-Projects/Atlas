import { ACCOUNT_LOCKOUT } from "@/lib/config/rate-limits";
import { RateLimitedError } from "@/lib/errors/domain-error";
import { counter } from "@/lib/integrations/upstash";

/**
 * Per-account sign-in lockout (PROJECT_SCOPE §2.1) — used by the candidate
 * and admin services. Keyed by normalised email so it holds across IPs.
 *
 * Window is measured from the FIRST failure (see the counter): after
 * `failures` wrong passwords the address is refused until the window
 * lapses; a successful sign-in resets the count.
 *
 * Lives in lib/auth rather than the services so both surfaces share one
 * definition; it depends only on config, errors and the integration.
 */

type Surface = keyof typeof ACCOUNT_LOCKOUT;

function minutes(seconds: number): string {
  const m = Math.max(1, Math.ceil(seconds / 60));
  return `${m} minute${m === 1 ? "" : "s"}`;
}

export const accountLockout = {
  /** Throws `RateLimitedError` (429) when the address is currently locked. */
  async assertNotLocked(surface: Surface, email: string): Promise<void> {
    const rule = ACCOUNT_LOCKOUT[surface];
    const store = counter(`lockout:${surface}`);
    const failures = await store.get(email);
    if (failures < rule.failures) return;

    const retryAfter = (await store.ttl(email)) || rule.windowSeconds;
    throw new RateLimitedError(
      `Too many failed sign-in attempts. Try again in ${minutes(retryAfter)}.`,
      retryAfter,
    );
  },

  /** Records a wrong password. */
  async recordFailure(surface: Surface, email: string): Promise<void> {
    const rule = ACCOUNT_LOCKOUT[surface];
    await counter(`lockout:${surface}`).increment(email, rule.windowSeconds);
  },

  /** Clears the count after a successful sign-in. */
  async clear(surface: Surface, email: string): Promise<void> {
    await counter(`lockout:${surface}`).reset(email);
  },
};
