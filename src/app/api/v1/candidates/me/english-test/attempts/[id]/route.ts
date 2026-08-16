import { toTestAttemptDto } from "@/lib/api/dto/english-test.dto";
import { ok } from "@/lib/api/response";
import { requireCandidateSession } from "@/lib/auth";
import { handleApiError } from "@/lib/errors";
import { englishTestService } from "@/lib/services/english-test";

/** GET /api/v1/candidates/me/english-test/attempts/:id — one attempt, own only. */
export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireCandidateSession();
    const { id } = await context.params;
    const attempt = await englishTestService.attempt(session.userId, id);
    return ok({ attempt: toTestAttemptDto(attempt) });
  } catch (error) {
    return handleApiError(error);
  }
}
