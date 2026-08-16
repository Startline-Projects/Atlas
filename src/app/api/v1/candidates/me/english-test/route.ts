import { toEnglishTestOverviewDto } from "@/lib/api/dto/english-test.dto";
import { ok } from "@/lib/api/response";
import { requireCandidateSession } from "@/lib/auth";
import { handleApiError } from "@/lib/errors";
import { englishTestService } from "@/lib/services/english-test";

/**
 * GET /api/v1/candidates/me/english-test
 *
 * Attempt history + eligibility + journey strip for the signed-in candidate.
 * The dashboard's single read.
 */
export async function GET() {
  try {
    const session = await requireCandidateSession();
    const overview = await englishTestService.overview(session.candidate);
    return ok(toEnglishTestOverviewDto(overview));
  } catch (error) {
    return handleApiError(error);
  }
}
