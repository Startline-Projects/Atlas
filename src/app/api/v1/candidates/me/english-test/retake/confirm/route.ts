import type { NextRequest } from "next/server";

import { toPaymentDto } from "@/lib/api/dto/english-test.dto";
import { ok } from "@/lib/api/response";
import { requireCandidateSession } from "@/lib/auth";
import { fieldsFromZod, handleApiError, ValidationError } from "@/lib/errors";
import { paymentService } from "@/lib/services/payment";
import { confirmRetakeCheckoutSchema } from "@/lib/validators/english-test";

/**
 * POST /api/v1/candidates/me/english-test/retake/confirm
 *
 * Called when the browser returns from checkout with `?session_id=`. Syncs
 * the payment with Stripe so the candidate is not waiting on the webhook.
 * Returns the payment (status PENDING | SUCCEEDED | FAILED).
 */
export async function POST(request: NextRequest) {
  try {
    const session = await requireCandidateSession();

    const parsed = confirmRetakeCheckoutSchema.safeParse(await request.json());
    if (!parsed.success) {
      throw new ValidationError(
        "Invalid confirmation request.",
        fieldsFromZod(parsed.error),
      );
    }

    const payment = await paymentService.confirmCheckout(
      session.userId,
      parsed.data.sessionId,
    );
    return ok({ payment: toPaymentDto(payment) });
  } catch (error) {
    return handleApiError(error);
  }
}
