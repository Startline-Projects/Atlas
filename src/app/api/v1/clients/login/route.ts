import type { NextRequest } from "next/server";

import { toClientDto } from "@/lib/api/dto/client.dto";
import { ok } from "@/lib/api/response";
import { applyClientSessionCookie } from "@/lib/auth";
import { fieldsFromZod, handleApiError, ValidationError } from "@/lib/errors";
import { clientService } from "@/lib/services/client";
import { clientLoginSchema } from "@/lib/validators/client";

/**
 * POST /api/v1/clients/login
 *
 * Public (per-IP limited in `src/proxy.ts`; per-account lockout in the
 * service). Authenticates a client and starts a session: access + refresh
 * tokens go into the client HttpOnly cookies.
 */
export async function POST(request: NextRequest) {
  try {
    const parsed = clientLoginSchema.safeParse(await request.json());

    if (!parsed.success) {
      throw new ValidationError(
        "Please correct the highlighted fields.",
        fieldsFromZod(parsed.error),
      );
    }

    const result = await clientService.login({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    const response = ok({
      client: toClientDto(result.client),
      accessToken: result.accessToken,
    });
    applyClientSessionCookie(response, {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      expiresIn: result.expiresIn,
    });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
