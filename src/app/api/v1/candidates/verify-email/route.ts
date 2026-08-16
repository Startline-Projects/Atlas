import type { NextRequest } from "next/server";

import { toCandidateDto } from "@/lib/api/dto/candidate.dto";
import { ok } from "@/lib/api/response";
import { fieldsFromZod, handleApiError, ValidationError } from "@/lib/errors";
import { candidateService } from "@/lib/services/candidate";
import { verifyEmailSchema } from "@/lib/validators/candidate";

/**
 * POST /api/v1/candidates/verify-email
 *
 * Public. Confirms the 6-digit code from the signup email and activates the
 * account.
 */
export async function POST(request: NextRequest) {
  try {
    const parsed = verifyEmailSchema.safeParse(await request.json());

    if (!parsed.success) {
      throw new ValidationError(
        "Please correct the highlighted fields.",
        fieldsFromZod(parsed.error),
      );
    }

    const candidate = await candidateService.verifyEmail(
      parsed.data.email,
      parsed.data.token,
    );

    return ok({ candidate: toCandidateDto(candidate) });
  } catch (error) {
    return handleApiError(error);
  }
}
