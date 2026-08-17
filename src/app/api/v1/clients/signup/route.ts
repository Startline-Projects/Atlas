import type { NextRequest } from "next/server";

import { toClientDto } from "@/lib/api/dto/client.dto";
import { created } from "@/lib/api/response";
import type { TeamSize } from "@/lib/domain/client";
import { fieldsFromZod, handleApiError, ValidationError } from "@/lib/errors";
import { clientService } from "@/lib/services/client";
import { clientSignupSchema } from "@/lib/validators/client";

/**
 * POST /api/v1/clients/signup
 *
 * Public (per-IP limited in `src/proxy.ts`). Creates the auth user and the
 * client record together.
 */
export async function POST(request: NextRequest) {
  try {
    const parsed = clientSignupSchema.safeParse(await request.json());

    if (!parsed.success) {
      throw new ValidationError(
        "Please correct the highlighted fields.",
        fieldsFromZod(parsed.error),
      );
    }

    const result = await clientService.signup({
      email: parsed.data.email,
      password: parsed.data.password,
      contactName: parsed.data.contactName,
      companyName: parsed.data.companyName,
      countryCode: parsed.data.countryCode,
      teamSize: parsed.data.teamSize as TeamSize,
    });

    return created({
      client: toClientDto(result.client),
      requiresEmailVerification: result.requiresEmailVerification,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
