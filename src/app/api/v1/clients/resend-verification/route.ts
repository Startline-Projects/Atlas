import type { NextRequest } from "next/server";

import { ok } from "@/lib/api/response";
import { fieldsFromZod, handleApiError, ValidationError } from "@/lib/errors";
import { clientService } from "@/lib/services/client";
import { clientResendVerificationSchema } from "@/lib/validators/client";

/**
 * POST /api/v1/clients/resend-verification
 *
 * Public. Always answers 200 whether or not the address exists — see
 * `clientService.resendVerification`.
 */
export async function POST(request: NextRequest) {
  try {
    const parsed = clientResendVerificationSchema.safeParse(await request.json());

    if (!parsed.success) {
      throw new ValidationError("Enter a valid email address.", fieldsFromZod(parsed.error));
    }

    await clientService.resendVerification(parsed.data.email);

    return ok({ sent: true });
  } catch (error) {
    return handleApiError(error);
  }
}
