import type { NextRequest } from "next/server";

import { toCandidateProfileViewDto } from "@/lib/api/dto/candidate-profile.dto";
import { ok } from "@/lib/api/response";
import { requireCandidateSession } from "@/lib/auth";
import { fieldsFromZod, handleApiError, ValidationError } from "@/lib/errors";
import { candidateProfileService } from "@/lib/services/candidate-profile";
import { updateProfileBasicsSchema } from "@/lib/validators/candidate-profile";

/**
 * GET   /api/v1/candidates/me/profile — the full profile plus its strength.
 * PATCH /api/v1/candidates/me/profile — update the scalar "basics" fields.
 *
 * List-shaped sections (skills, experiences, …) are saved through
 * `/me/profile/[section]`.
 */
export async function GET() {
  try {
    const session = await requireCandidateSession();
    const view = await candidateProfileService.getOwn(session.userId);
    return ok(toCandidateProfileViewDto(view));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await requireCandidateSession();

    const parsed = updateProfileBasicsSchema.safeParse(await request.json());
    if (!parsed.success) {
      throw new ValidationError(
        "Please correct the highlighted fields.",
        fieldsFromZod(parsed.error),
      );
    }

    const view = await candidateProfileService.updateBasics(
      session.userId,
      parsed.data,
    );
    return ok(toCandidateProfileViewDto(view));
  } catch (error) {
    return handleApiError(error);
  }
}
