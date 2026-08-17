import type { NextRequest } from "next/server";

import { toClientDto } from "@/lib/api/dto/client.dto";
import { ok } from "@/lib/api/response";
import { fieldsFromZod, handleApiError, ValidationError } from "@/lib/errors";
import { clientService } from "@/lib/services/client";
import { clientVerifyEmailSchema } from "@/lib/validators/client";

/**
 * POST /api/v1/clients/verify-email
 *
 * Public. Confirms the 6-digit code from the signup email and activates the
 * account.
 */
export async function POST(request: NextRequest) {
  try {
    const parsed = clientVerifyEmailSchema.safeParse(await request.json());

    if (!parsed.success) {
      throw new ValidationError(
        "Please correct the highlighted fields.",
        fieldsFromZod(parsed.error),
      );
    }

    const client = await clientService.verifyEmail(parsed.data.email, parsed.data.token);

    return ok({ client: toClientDto(client) });
  } catch (error) {
    return handleApiError(error);
  }
}
