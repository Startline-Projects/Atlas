import { ok } from "@/lib/api/response";
import { clearSessionCookie, currentAccessToken } from "@/lib/auth";
import { candidateService } from "@/lib/services/candidate";

/**
 * POST /api/v1/candidates/logout
 *
 * Ends the web session: revokes the refresh tokens at the provider (so a
 * copied refresh cookie is dead too) and clears both cookies. Idempotent —
 * signing out while already signed out is fine.
 */
export async function POST() {
  const token = await currentAccessToken();
  if (token) await candidateService.signOut(token);

  const response = ok({ signedOut: true });
  clearSessionCookie(response);
  return response;
}
