import type { NextRequest } from "next/server";

import { toJobListDto } from "@/lib/api/dto/job.dto";
import { ok } from "@/lib/api/response";
import { requireCandidateSession } from "@/lib/auth";
import type { RoleCategory } from "@/lib/domain/candidate";
import { fieldsFromZod, handleApiError, ValidationError } from "@/lib/errors";
import { jobService } from "@/lib/services/job";
import { listJobsQuerySchema } from "@/lib/validators/job";

/**
 * GET /api/v1/jobs?category=&minRateCents=&maxRateCents=&minHoursPerWeek=&q=&limit=&offset=
 *
 * The candidate browse feed (PROJECT_SCOPE §2.2): open jobs only, newest
 * first. Signed-in candidates only — postings are not public content.
 */
export async function GET(request: NextRequest) {
  try {
    await requireCandidateSession();

    const parsed = listJobsQuerySchema.safeParse(
      Object.fromEntries(request.nextUrl.searchParams),
    );
    if (!parsed.success) {
      throw new ValidationError("Check the filters.", fieldsFromZod(parsed.error));
    }

    const list = await jobService.listOpen({
      ...parsed.data,
      category: parsed.data.category as RoleCategory | undefined,
    });

    return ok(toJobListDto(list));
  } catch (error) {
    return handleApiError(error);
  }
}
