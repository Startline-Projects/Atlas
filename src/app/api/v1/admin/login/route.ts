import type { NextRequest } from "next/server";

import { toAdminDto } from "@/lib/api/dto/admin.dto";
import { ok } from "@/lib/api/response";
import { applyAdminSessionCookie } from "@/lib/auth";
import { fieldsFromZod, handleApiError, ValidationError } from "@/lib/errors";
import { adminService } from "@/lib/services/admin";
import { adminLoginSchema } from "@/lib/validators/admin";

/**
 * POST /api/v1/admin/login
 *
 * Public. Authenticates an admin and starts a console session (HttpOnly
 * cookie). Unlike the candidate variant the token is NOT echoed in the body:
 * there is no mobile admin client, and the less an admin token travels the
 * better.
 *
 * TODO(§7.6): rate limit + lockout after 5 failures — this is the highest-
 * value auth boundary in the app.
 */
export async function POST(request: NextRequest) {
  try {
    const parsed = adminLoginSchema.safeParse(await request.json());
    if (!parsed.success) {
      throw new ValidationError(
        "Please correct the highlighted fields.",
        fieldsFromZod(parsed.error),
      );
    }

    const result = await adminService.login(parsed.data);

    const response = ok({ admin: toAdminDto(result.admin) });
    applyAdminSessionCookie(response, {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      expiresIn: result.expiresIn,
    });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
