import { toJobDto } from "@/lib/api/dto/job.dto";
import { ok } from "@/lib/api/response";
import { requireCandidateSession } from "@/lib/auth";
import { handleApiError } from "@/lib/errors";
import { jobService } from "@/lib/services/job";

/** GET /api/v1/jobs/:id — one job for a signed-in candidate (closed ones included). */
export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await requireCandidateSession();
    const { id } = await context.params;
    const job = await jobService.getForCandidate(id);
    return ok({ job: toJobDto(job) });
  } catch (error) {
    return handleApiError(error);
  }
}
