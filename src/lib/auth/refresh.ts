import { createAnonSupabaseClient } from "@/lib/integrations/supabase";

/**
 * Access-token refresh — used by `src/proxy.ts`, the only place that can
 * both read the old cookies and *write* new ones before a page renders
 * (Server Components cannot set cookies).
 *
 * Kept free of Prisma and services on purpose: the proxy runs on every
 * matched request and this must stay a single HTTPS call at most.
 */

export interface RefreshedSession {
  accessToken: string;
  refreshToken: string;
  /** Seconds until `accessToken` expires. */
  expiresIn: number;
}

/**
 * Trades a refresh token for a new session. Null when the token is invalid,
 * revoked (sign-out, reuse detected) or the provider is unreachable — the
 * caller treats null as "signed out".
 *
 * Supabase rotates the refresh token on every call; the returned one must
 * replace the cookie or the next refresh fails.
 */
export async function refreshSession(
  refreshToken: string,
): Promise<RefreshedSession | null> {
  try {
    const supabase = createAnonSupabaseClient();
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });
    if (error || !data.session) return null;
    return {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      expiresIn: data.session.expires_in,
    };
  } catch {
    return null;
  }
}

/** Refresh when this close to expiry, so a page never renders on a token about to die. */
const EXPIRY_LEEWAY_SECONDS = 5 * 60;

/**
 * True when the JWT is expired or expires within the leeway. Reads the `exp`
 * claim without verifying the signature — this only decides whether to
 * *ask* the provider for a new token; the token itself is verified by
 * `auth.getUser()` in the session layer, never here. Unparseable → true.
 */
export function accessTokenNeedsRefresh(accessToken: string): boolean {
  const payload = accessToken.split(".")[1];
  if (!payload) return true;
  try {
    const json = JSON.parse(
      Buffer.from(payload.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8"),
    ) as { exp?: unknown };
    if (typeof json.exp !== "number") return true;
    return json.exp - Math.floor(Date.now() / 1000) < EXPIRY_LEEWAY_SECONDS;
  } catch {
    return true;
  }
}
