import type { NextRequest } from "next/server";

import { toTestAttemptDto } from "@/lib/api/dto/english-test.dto";
import { created } from "@/lib/api/response";
import { requireCandidateSession } from "@/lib/auth";
import { fieldsFromZod, handleApiError, ValidationError } from "@/lib/errors";
import { englishTestService } from "@/lib/services/english-test";
import { submitAttemptSchema } from "@/lib/validators/english-test";

/**
 * POST /api/v1/candidates/me/english-test/attempts
 *
 * Submits a full answer sheet. Scored server-side; the response is the
 * recorded attempt (201). 422 when the candidate may not sit; 409 if the same
 * attempt was already recorded (double submit).
 */
export async function POST(request: NextRequest) {
  try {
    const session = await requireCandidateSession();

    const parsed = submitAttemptSchema.safeParse(await request.json());
    if (!parsed.success) {
      throw new ValidationError(
        "That answer sheet could not be read.",
        fieldsFromZod(parsed.error),
      );
    }

    const attempt = await englishTestService.submit(
      session.userId,
      parsed.data.answers,
    );
    return created({ attempt: toTestAttemptDto(attempt) });
  } catch (error) {
    return handleApiError(error);
  }
}
