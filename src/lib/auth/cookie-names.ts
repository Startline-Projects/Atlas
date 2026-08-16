/**
 * Session cookie names — deliberately a leaf module with no imports.
 *
 * `src/proxy.ts` needs these to decide whether a request even carries a
 * session, and it must stay light: pulling `lib/auth/session.ts` in there
 * would drag the services, Prisma and the Supabase SDK into the request
 * proxy. Anything that needs the *validated* session imports from
 * `@/lib/auth` instead.
 *
 * One pair of cookies per surface. Both surfaces hold Supabase tokens, but
 * keeping them apart means a candidate token can never be *presented* as an
 * admin session (and the service layer would reject it anyway — defence in
 * depth), and a developer can be signed in to both consoles at once.
 *
 * Each pair is: a short-lived access token (lives as long as the JWT) and a
 * long-lived refresh token that `src/proxy.ts` trades in for a fresh access
 * token when the old one runs out. Both HttpOnly.
 */

/** Candidate access token. */
export const SESSION_COOKIE = "atlas_session";
/** Candidate refresh token. */
export const REFRESH_COOKIE = "atlas_refresh";

/** Admin access token (`role = ADMIN` user). */
export const ADMIN_SESSION_COOKIE = "atlas_admin_session";
/** Admin refresh token. */
export const ADMIN_REFRESH_COOKIE = "atlas_admin_refresh";

/**
 * How long the refresh cookie lives. Supabase rotates the token on every
 * use, so this is the maximum stretch of *inactivity* before a candidate
 * has to sign in again — 30 days matches the "stay signed in" norm.
 */
export const REFRESH_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
