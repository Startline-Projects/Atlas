/**
 * Rate limits — ARCHITECTURE §7.6. Configured here, enforced in
 * `src/proxy.ts` (per IP, before the route runs) and in the auth services
 * (per account). Numbers are per key per window.
 */

export interface RateLimit {
  /** Requests allowed per window. */
  requests: number;
  /** Window length in seconds (sliding). */
  windowSeconds: number;
}

/**
 * Per-IP limits on the endpoints that are worth abusing. Keys double as the
 * Redis namespace, so renaming one resets its counters.
 */
export const IP_LIMITS = {
  "candidate-signup": { requests: 5, windowSeconds: 60 * 60 },
  "candidate-login": { requests: 10, windowSeconds: 15 * 60 },
  "candidate-verify-email": { requests: 10, windowSeconds: 15 * 60 },
  "candidate-resend-verification": { requests: 3, windowSeconds: 15 * 60 },
  "candidate-upload": { requests: 30, windowSeconds: 60 * 60 },
  "candidate-retake-checkout": { requests: 5, windowSeconds: 60 * 60 },
  "admin-login": { requests: 5, windowSeconds: 15 * 60 },
} as const satisfies Record<string, RateLimit>;

export type IpLimitName = keyof typeof IP_LIMITS;

/** Method + path → which limit applies. Exact path match. */
export const ROUTE_LIMITS: ReadonlyArray<{
  method: "POST";
  path: string;
  limit: IpLimitName;
}> = [
  { method: "POST", path: "/api/v1/candidates/signup", limit: "candidate-signup" },
  { method: "POST", path: "/api/v1/candidates/login", limit: "candidate-login" },
  { method: "POST", path: "/api/v1/candidates/verify-email", limit: "candidate-verify-email" },
  {
    method: "POST",
    path: "/api/v1/candidates/resend-verification",
    limit: "candidate-resend-verification",
  },
  { method: "POST", path: "/api/v1/candidates/me/uploads", limit: "candidate-upload" },
  {
    method: "POST",
    path: "/api/v1/candidates/me/english-test/retake/checkout",
    limit: "candidate-retake-checkout",
  },
  { method: "POST", path: "/api/v1/admin/login", limit: "admin-login" },
];

/**
 * Per-account lockout (PROJECT_SCOPE §2.1): after `failures` wrong passwords
 * within the window, sign-in for that address is refused until the window
 * lapses. Enforced in the services, so it holds regardless of IP.
 */
export const ACCOUNT_LOCKOUT = {
  candidate: { failures: 5, windowSeconds: 15 * 60 },
  // Stricter for the console — matches the sign-in screen's copy.
  admin: { failures: 3, windowSeconds: 30 * 60 },
} as const;
