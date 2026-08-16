import { ok } from "@/lib/api/response";
import { requireCandidateSession } from "@/lib/auth";
import { handleApiError } from "@/lib/errors";
import { englishTestService } from "@/lib/services/english-test";

/**
 * GET /api/v1/candidates/me/english-test/questions
 *
 * The paper for a sitting — without the answer key. 422 when the candidate
 * may not sit right now (already passed, or retake not paid for).
 */
export async function GET() {
  try {
    const session = await requireCandidateSession();
    const questions = await englishTestService.questions(session.userId);
    return ok({ questions });
  } catch (error) {
    return handleApiError(error);
  }
}
