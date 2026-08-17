import { ok } from "@/lib/api/response";
import { clearClientSessionCookie, currentClientAccessToken } from "@/lib/auth";
import { clientService } from "@/lib/services/client";

/**
 * POST /api/v1/clients/logout
 *
 * Ends the web session: revokes the refresh tokens at the provider and clears
 * both cookies. Idempotent — signing out while signed out is fine.
 */
export async function POST() {
  const token = await currentClientAccessToken();
  if (token) await clientService.signOut(token);

  const response = ok({ signedOut: true });
  clearClientSessionCookie(response);
  return response;
}
