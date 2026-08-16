/**
 * Where an anonymous visitor is sent, and how the "come back here after
 * sign-in" hint is carried. Shared by the proxy, the layouts and the pages
 * so the rule lives in one place. Leaf module — no imports — because
 * `src/proxy.ts` uses it too.
 */

export const CANDIDATE_SIGNIN_PATH = "/candidate/signin";
export const CANDIDATE_HOME_PATH = "/candidate/dashboard";

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

/**
 * `/candidate/signin?next=<path>` — `next` is dropped when there is nowhere
 * useful to return to (unsafe value, or the dashboard, which is the default).
 */
export function candidateSignInPath(next?: string | null): string {
  const target = safeNextPath(next, "");
  if (!target || target === CANDIDATE_HOME_PATH) return CANDIDATE_SIGNIN_PATH;
  return `${CANDIDATE_SIGNIN_PATH}?next=${encodeURIComponent(target)}`;
}
