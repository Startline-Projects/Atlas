import type { NextRequest } from "next/server";

import { toCandidateProfileViewDto } from "@/lib/api/dto/candidate-profile.dto";
import { ok } from "@/lib/api/response";
import { requireCandidateSession } from "@/lib/auth";
import type { ProfileSection, ProfileSectionInputs } from "@/lib/domain/candidate-profile";
import { fieldsFromZod, handleApiError, NotFoundError, ValidationError } from "@/lib/errors";
import { candidateProfileService } from "@/lib/services/candidate-profile";
import {
  PROFILE_SECTION_SCHEMAS,
  profileSectionNameSchema,
} from "@/lib/validators/candidate-profile";

/**
 * PUT /api/v1/candidates/me/profile/{skills|languages|experiences|education|certifications|portfolio}
 *
 * Replaces one list section with the body's array. Field errors come back
 * keyed as `"2.endDate"` — index first — so the builder can put the message
 * under the right row.
 */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ section: string }> },
) {
  try {
    const session = await requireCandidateSession();

    const { section: raw } = await context.params;
    const name = profileSectionNameSchema.safeParse(raw);
    if (!name.success) throw new NotFoundError("Unknown profile section.");
    const section = name.data as ProfileSection;

    const parsed = PROFILE_SECTION_SCHEMAS[section].safeParse(await request.json());
    if (!parsed.success) {
      throw new ValidationError(
        "Please correct the highlighted fields.",
        fieldsFromZod(parsed.error),
      );
    }

    const view = await candidateProfileService.replaceSection(
      session.userId,
      section,
      parsed.data as ProfileSectionInputs[typeof section],
    );
    return ok(toCandidateProfileViewDto(view));
  } catch (error) {
    return handleApiError(error);
  }
}
