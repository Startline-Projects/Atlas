/**
 * Where an anonymous visitor is sent, and how the "come back here after
 * sign-in" hint is carried. Shared by the proxy, the layouts and the pages
 * so the rule lives in one place. Leaf module — no imports — because
 * `src/proxy.ts` uses it too.
 */

export const CANDIDATE_SIGNIN_PATH = "/candidate/signin";
export const CANDIDATE_HOME_PATH = "/candidate/dashboard";

export const ADMIN_SIGNIN_PATH = "/admin/signin";
export const ADMIN_HOME_PATH = "/admin/dashboard";

export const CLIENT_SIGNIN_PATH = "/client/signin";
export const CLIENT_HOME_PATH = "/client/dashboard";

/**
 * Request header the proxy stamps with the path (+ query) being served.
 * Layouts have no other way to learn the URL they render for.
 */
export const PATHNAME_HEADER = "x-atlas-pathname";

/**
 * Only same-origin, absolute paths are honoured, so a `?next=` written by
 * anyone can never bounce a user off-site (`//evil.com` is a protocol-relative
 * URL and is rejected too).
 */
export function safeNextPath(
  raw: string | null | undefined,
  fallback: string,
): string {
  if (raw && raw.startsWith("/") && !raw.startsWith("//")) return raw;
  return fallback;
}

function signInPath(signin: string, home: string, next?: string | null): string {
  const target = safeNextPath(next, "");
  // Nowhere useful to return to: unsafe value, or the default landing page.
  if (!target || target === home) return signin;
  return `${signin}?next=${encodeURIComponent(target)}`;
}

/** `/candidate/signin?next=<path>` — `next` dropped when it adds nothing. */
export function candidateSignInPath(next?: string | null): string {
  return signInPath(CANDIDATE_SIGNIN_PATH, CANDIDATE_HOME_PATH, next);
}

/** `/admin/signin?next=<path>` — same rule as the candidate variant. */
export function adminSignInPath(next?: string | null): string {
  return signInPath(ADMIN_SIGNIN_PATH, ADMIN_HOME_PATH, next);
}

/** `/client/signin?next=<path>` — same rule as the candidate variant. */
export function clientSignInPath(next?: string | null): string {
  return signInPath(CLIENT_SIGNIN_PATH, CLIENT_HOME_PATH, next);
}
