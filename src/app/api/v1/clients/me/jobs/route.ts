import type { NextRequest } from "next/server";

import { toJobDto } from "@/lib/api/dto/job.dto";
import { created, ok } from "@/lib/api/response";
import { requireClientSession } from "@/lib/auth";
import type { RoleCategory } from "@/lib/domain/candidate";
import type { JobDuration } from "@/lib/domain/job";
import { fieldsFromZod, handleApiError, ValidationError } from "@/lib/errors";
import { jobService } from "@/lib/services/job";
import { createJobSchema } from "@/lib/validators/job";

/**
 * GET  /api/v1/clients/me/jobs — everything the signed-in client has posted.
 * POST /api/v1/clients/me/jobs — post a job (live immediately).
 */
export async function GET() {
  try {
    const session = await requireClientSession();
    const jobs = await jobService.listForClient(session.userId);
    return ok({ jobs: jobs.map(toJobDto) });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireClientSession();

    const parsed = createJobSchema.safeParse(await request.json());
    if (!parsed.success) {
      throw new ValidationError(
        "Please correct the highlighted fields.",
        fieldsFromZod(parsed.error),
      );
    }

    const job = await jobService.create(session.userId, {
      ...parsed.data,
      category: parsed.data.category as RoleCategory,
      duration: parsed.data.duration as JobDuration,
    });

    return created({ job: toJobDto(job) });
  } catch (error) {
    return handleApiError(error);
  }
}
