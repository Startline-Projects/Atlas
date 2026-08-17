import type { NextRequest } from "next/server";

import { toJobDto } from "@/lib/api/dto/job.dto";
import { ok } from "@/lib/api/response";
import { requireClientSession } from "@/lib/auth";
import { fieldsFromZod, handleApiError, ValidationError } from "@/lib/errors";
import { jobService } from "@/lib/services/job";
import { updateJobStatusSchema } from "@/lib/validators/job";

type Context = { params: Promise<{ id: string }> };

/** GET /api/v1/clients/me/jobs/:id — one of the client's own jobs. */
export async function GET(_request: Request, context: Context) {
  try {
    const session = await requireClientSession();
    const { id } = await context.params;
    const job = await jobService.getForClient(session.userId, id);
    return ok({ job: toJobDto(job) });
  } catch (error) {
    return handleApiError(error);
  }
}

/** PATCH /api/v1/clients/me/jobs/:id — `{ status: "CLOSED" }` withdraws the posting. */
export async function PATCH(request: NextRequest, context: Context) {
  try {
    const session = await requireClientSession();
    const { id } = await context.params;

    const parsed = updateJobStatusSchema.safeParse(await request.json());
    if (!parsed.success) {
      throw new ValidationError("Unsupported status change.", fieldsFromZod(parsed.error));
    }

    const job = await jobService.close(session.userId, id);
    return ok({ job: toJobDto(job) });
  } catch (error) {
    return handleApiError(error);
  }
}
