import { ok } from "@/lib/api/response";
import { clearSessionCookie } from "@/lib/auth";

/**
 * POST /api/v1/candidates/logout
 *
 * Ends the web session by clearing the cookie. Idempotent — signing out while
 * already signed out is fine.
 */
export async function POST() {
  const response = ok({ signedOut: true });
  clearSessionCookie(response);
  return response;
}
