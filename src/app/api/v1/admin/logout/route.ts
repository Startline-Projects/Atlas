import { ok } from "@/lib/api/response";
import { clearAdminSessionCookie } from "@/lib/auth";

/** POST /api/v1/admin/logout — clears the console cookie. Idempotent. */
export async function POST() {
  const response = ok({ signedOut: true });
  clearAdminSessionCookie(response);
  return response;
}
