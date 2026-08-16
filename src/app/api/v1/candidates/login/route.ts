import type { NextRequest } from "next/server";

import { toCandidateDto } from "@/lib/api/dto/candidate.dto";
import { ok } from "@/lib/api/response";
import { applySessionCookie } from "@/lib/auth";
import { fieldsFromZod, handleApiError, ValidationError } from "@/lib/errors";
import { candidateService } from "@/lib/services/candidate";
import { loginSchema } from "@/lib/validators/candidate";

/**
 * POST /api/v1/candidates/login
 *
 * Public. Authenticates a candidate and starts a session: the access token
 * goes into an HttpOnly cookie for the web app, and is also returned in the
 * body for the (future) mobile client, which has no cookie jar.
 *
 * TODO: rate limit (ARCHITECTURE §7.6) — this endpoint is an auth boundary
 * and should be rate-limited stricter than normal endpoints.
 */
export async function POST(request: NextRequest) {
  try {
    const parsed = loginSchema.safeParse(await request.json());

    if (!parsed.success) {
      throw new ValidationError(
        "Please correct the highlighted fields.",
        fieldsFromZod(parsed.error),
      );
    }

    const result = await candidateService.login({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    const response = ok({
      candidate: toCandidateDto(result.candidate),
      accessToken: result.accessToken,
      requiresEmailVerification: result.requiresEmailVerification,
    });
    applySessionCookie(response, result.accessToken, result.expiresIn);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
