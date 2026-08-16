import type { NextRequest } from "next/server";

import { ok } from "@/lib/api/response";
import { fieldsFromZod, handleApiError, ValidationError } from "@/lib/errors";
import { candidateService } from "@/lib/services/candidate";
import { resendVerificationSchema } from "@/lib/validators/candidate";

/**
 * POST /api/v1/candidates/resend-verification
 *
 * Public. Always answers 200 whether or not the address exists — see
 * `candidateService.resendVerification`.
 */
export async function POST(request: NextRequest) {
  try {
    const parsed = resendVerificationSchema.safeParse(await request.json());

    if (!parsed.success) {
      throw new ValidationError(
        "Enter a valid email address.",
        fieldsFromZod(parsed.error),
      );
    }

    await candidateService.resendVerification(parsed.data.email);

    return ok({ sent: true });
  } catch (error) {
    return handleApiError(error);
  }
}
