import { ok } from "@/lib/api/response";
import { clearAdminSessionCookie, currentAdminAccessToken } from "@/lib/auth";
import { adminService } from "@/lib/services/admin";

/** POST /api/v1/admin/logout — revokes at the provider and clears the console cookies. Idempotent. */
export async function POST() {
  const token = await currentAdminAccessToken();
  if (token) await adminService.signOut(token);

  const response = ok({ signedOut: true });
  clearAdminSessionCookie(response);
  return response;
}
