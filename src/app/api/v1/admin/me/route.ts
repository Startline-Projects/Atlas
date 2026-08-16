import { toAdminDto } from "@/lib/api/dto/admin.dto";
import { ok } from "@/lib/api/response";
import { requireAdminSession } from "@/lib/auth";
import { handleApiError } from "@/lib/errors";

/** GET /api/v1/admin/me — the signed-in admin, 401 when there is none. */
export async function GET() {
  try {
    const session = await requireAdminSession();
    return ok({ admin: toAdminDto(session.admin) });
  } catch (error) {
    return handleApiError(error);
  }
}
