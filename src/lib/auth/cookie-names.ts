/**
 * Session cookie names — deliberately a leaf module with no imports.
 *
 * `src/proxy.ts` needs these to decide whether a request even carries a
 * session, and it must stay light: pulling `lib/auth/session.ts` in there
 * would drag the services, Prisma and the Supabase SDK into the request
 * proxy. Anything that needs the *validated* session imports from
 * `@/lib/auth` instead.
 */

/** Candidate session — a Supabase access token, HttpOnly. */
export const SESSION_COOKIE = "atlas_session";
