import { toCandidateDto } from "@/lib/api/dto/candidate.dto";
import { ok } from "@/lib/api/response";
import { requireCandidateSession } from "@/lib/auth";
import { handleApiError } from "@/lib/errors";

/**
 * GET /api/v1/candidates/me
 *
 * The signed-in candidate. 401 when there is no live session — the client
 * uses that to decide between "show the app" and "go to sign-in".
 */
export async function GET() {
  try {
    const session = await requireCandidateSession();
    return ok({ candidate: toCandidateDto(session.candidate) });
  } catch (error) {
    return handleApiError(error);
  }
}
