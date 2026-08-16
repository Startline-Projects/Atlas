import type { NextRequest } from "next/server";

import { ok } from "@/lib/api/response";
import { requireCandidateSession } from "@/lib/auth";
import { handleApiError } from "@/lib/errors";
import { candidateProfileService } from "@/lib/services/candidate-profile";
import { searchSkillsSchema } from "@/lib/validators/candidate-profile";

/**
 * GET /api/v1/skills?q=rea&limit=8
 *
 * Typeahead over the shared skill vocabulary. Signed-in only for now — the
 * list itself is not sensitive, but an open endpoint invites scraping.
 */
export async function GET(request: NextRequest) {
  try {
    await requireCandidateSession();

    const parsed = searchSkillsSchema.safeParse(
      Object.fromEntries(request.nextUrl.searchParams),
    );
    if (!parsed.success) return ok({ skills: [] });

    const skills = await candidateProfileService.searchSkills(
      parsed.data.q,
      parsed.data.limit,
    );
    return ok({ skills });
  } catch (error) {
    return handleApiError(error);
  }
}
