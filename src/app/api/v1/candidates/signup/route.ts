import type { NextRequest } from "next/server";

import { toCandidateDto } from "@/lib/api/dto/candidate.dto";
import { created } from "@/lib/api/response";
import { fieldsFromZod, handleApiError, ValidationError } from "@/lib/errors";
import { candidateService } from "@/lib/services/candidate";
import { signupSchema } from "@/lib/validators/candidate";
import type { RoleCategory } from "@/lib/domain/candidate";

/**
 * POST /api/v1/candidates/signup
 *
 * Public. Creates the auth user and the candidate record together.
 *
 * TODO: rate limit (ARCHITECTURE §7.6) — this endpoint sends email and creates
 * accounts, so it is the first one that needs Upstash once that is wired.
 */
export async function POST(request: NextRequest) {
  try {
    const parsed = signupSchema.safeParse(await request.json());

    if (!parsed.success) {
      throw new ValidationError(
        "Please correct the highlighted fields.",
        fieldsFromZod(parsed.error),
      );
    }

    const result = await candidateService.signup({
      email: parsed.data.email,
      password: parsed.data.password,
      fullName: parsed.data.fullName,
      roleCategory: parsed.data.roleCategory as RoleCategory,
    });

    return created({
      candidate: toCandidateDto(result.candidate),
      requiresEmailVerification: result.requiresEmailVerification,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
