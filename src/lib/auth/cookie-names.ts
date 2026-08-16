/**
 * Session cookie names — deliberately a leaf module with no imports.
 *
 * `src/proxy.ts` needs these to decide whether a request even carries a
 * session, and it must stay light: pulling `lib/auth/session.ts` in there
 * would drag the services, Prisma and the Supabase SDK into the request
 * proxy. Anything that needs the *validated* session imports from
 * `@/lib/auth` instead.
 *
 * One cookie per surface. Both hold Supabase access tokens, but keeping them
 * apart means a candidate token can never be *presented* as an admin session
 * (and the service layer would reject it anyway — defence in depth), and a
 * developer can be signed in to both consoles at once.
 */

/** Candidate session — a Supabase access token, HttpOnly. */
export const SESSION_COOKIE = "atlas_session";

/** Admin session — a Supabase access token for a `role = ADMIN` user, HttpOnly. */
export const ADMIN_SESSION_COOKIE = "atlas_admin_session";
