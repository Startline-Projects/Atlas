import type { NextRequest } from "next/server";

import { ok } from "@/lib/api/response";
import { requireCandidateSession } from "@/lib/auth";
import { fieldsFromZod, handleApiError, ValidationError } from "@/lib/errors";
import { englishTestService } from "@/lib/services/english-test";
import { startRetakeCheckoutSchema } from "@/lib/validators/english-test";

/**
 * POST /api/v1/candidates/me/english-test/retake/checkout
 *
 * Starts the $10 retake checkout. Returns `{ paymentId, checkoutUrl }` — the
 * browser navigates to `checkoutUrl` (Stripe-hosted; or straight back to us
 * under PAYMENTS_DEV_BYPASS). 422 if a paid retake is already waiting.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await requireCandidateSession();

    const parsed = startRetakeCheckoutSchema.safeParse(await request.json());
    if (!parsed.success) {
      throw new ValidationError(
        "Invalid checkout request.",
        fieldsFromZod(parsed.error),
      );
    }

    const start = await englishTestService.startRetakeCheckout({
      userId: session.userId,
      email: session.email,
      returnPath: parsed.data.returnPath,
    });
    return ok(start);
  } catch (error) {
    return handleApiError(error);
  }
}
