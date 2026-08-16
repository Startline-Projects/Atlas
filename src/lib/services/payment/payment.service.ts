import { isProduction, publicConfig, serverConfig } from "@/lib/config";
import { ENGLISH_TEST } from "@/lib/domain/english-test";
import type { Payment, RetakeCheckoutStart } from "@/lib/domain/english-test";
import { BusinessRuleError, NotFoundError, UpstreamError } from "@/lib/errors";
import {
  createCheckoutSession,
  isStripeConfigured,
  parseWebhookEvent,
  retrieveCheckoutSession,
  type CheckoutSessionSummary,
} from "@/lib/integrations/stripe";
import { paymentRepository } from "@/lib/repositories/payment";

/**
 * Payment service — ARCHITECTURE §6 step 5, §7.10, §7.12.
 *
 * Owns the lifecycle of a `Payment`: PENDING when checkout starts, SUCCEEDED
 * or FAILED when Stripe says so. Two things can say so — the webhook and the
 * on-return confirmation — and both funnel through `applyCheckoutOutcome()`
 * so the transition logic exists once and is idempotent.
 *
 * Only the English-test retake is sold today; the shape generalises (purpose
 * enum, amount, provider ids) so invoices and hire fees can reuse it.
 *
 * Dev bypass: with `PAYMENTS_DEV_BYPASS=1` (never in production) checkout
 * skips Stripe entirely and the payment is SUCCEEDED on creation. Same
 * pattern as `AUTH_DEV_FIXED_OTP` — remove the variable, get the real flow.
 */

const DEV_BYPASS_PROVIDER = "dev-bypass";

function bypassEnabled(): boolean {
  const on = serverConfig().PAYMENTS_DEV_BYPASS === "1";
  if (on && isProduction) {
    throw new Error("PAYMENTS_DEV_BYPASS must not be set in production.");
  }
  return on;
}

function absolute(path: string): string {
  return new URL(path, publicConfig.NEXT_PUBLIC_APP_URL).toString();
}

export const paymentService = {
  /**
   * Starts a $10 retake checkout for the signed-in candidate.
   *
   * @param returnPath  Same-origin path the browser comes back to. Gets
   *                    `?session_id=…` on success and `?cancelled=1` on cancel.
   */
  async startRetakeCheckout(input: {
    userId: string;
    email: string;
    returnPath: string;
  }): Promise<RetakeCheckoutStart> {
    // Do not sell a second retake while one is paid for and unused — the
    // candidate would be charged twice for one sitting.
    const unused = await paymentRepository.findUnconsumed(
      input.userId,
      "ENGLISH_TEST_RETAKE",
    );
    if (unused) {
      throw new BusinessRuleError(
        "You already have a paid retake waiting — start it from your dashboard.",
      );
    }

    if (bypassEnabled()) {
      const payment = await paymentRepository.create({
        userId: input.userId,
        purpose: "ENGLISH_TEST_RETAKE",
        amountCents: ENGLISH_TEST.retakeFeeCents,
        currency: ENGLISH_TEST.retakeFeeCurrency,
        provider: DEV_BYPASS_PROVIDER,
      });
      await paymentRepository.attachCheckout(payment.id, `dev_${payment.id}`);
      await paymentRepository.markSucceeded(payment.id, { paidAt: new Date() });
      return {
        paymentId: payment.id,
        checkoutUrl: absolute(`${input.returnPath}?session_id=dev_${payment.id}`),
      };
    }

    if (!isStripeConfigured()) {
      throw new UpstreamError(
        "Payments are not configured on this server. Set STRIPE_SECRET_KEY " +
          "(or PAYMENTS_DEV_BYPASS=1 for local development).",
      );
    }

    const payment = await paymentRepository.create({
      userId: input.userId,
      purpose: "ENGLISH_TEST_RETAKE",
      amountCents: ENGLISH_TEST.retakeFeeCents,
      currency: ENGLISH_TEST.retakeFeeCurrency,
      provider: "stripe",
    });

    const session = await createCheckoutSession({
      paymentId: payment.id,
      userId: input.userId,
      amountCents: ENGLISH_TEST.retakeFeeCents,
      currency: ENGLISH_TEST.retakeFeeCurrency,
      productName: "Atlas English test — retake",
      productDescription:
        "One additional sitting of the English assessment. Unlocks immediately after payment.",
      customerEmail: input.email,
      // Stripe fills in {CHECKOUT_SESSION_ID} — the literal braces are intended.
      successUrl: absolute(`${input.returnPath}?session_id={CHECKOUT_SESSION_ID}`),
      cancelUrl: absolute(`${input.returnPath}?cancelled=1`),
    });

    if (!session.url) {
      await paymentRepository.markFailed(payment.id);
      throw new UpstreamError("Stripe did not return a checkout URL.");
    }

    await paymentRepository.attachCheckout(payment.id, session.id);
    return { paymentId: payment.id, checkoutUrl: session.url };
  },

  /**
   * Called when the browser returns from checkout with `?session_id=`.
   * Reads the session straight from Stripe and applies the outcome, so the
   * candidate is not left waiting for a webhook that may lag by seconds.
   * Scoped to the user — someone else's session id is a 404.
   */
  async confirmCheckout(userId: string, sessionId: string): Promise<Payment> {
    const payment = await paymentRepository.findByCheckoutId(sessionId);
    if (!payment || payment.userId !== userId) {
      throw new NotFoundError("We could not find that payment.");
    }

    if (payment.status !== "PENDING") return payment;

    if (payment.provider === DEV_BYPASS_PROVIDER) return payment;

    const session = await retrieveCheckoutSession(sessionId);
    // Not paid (yet) is not a failure: an async method may still settle, and
    // the webhook has the last word. Only a confirmed "paid" moves it here.
    if (session.paymentStatus !== "paid") return payment;
    return applyCheckoutOutcome(payment, session, true);
  },

  /**
   * Webhook entry point (`app/api/webhooks/stripe`). Signature is verified in
   * the integration; unknown event types are acknowledged and ignored.
   */
  async handleStripeWebhook(rawBody: string, signature: string): Promise<void> {
    const event = parseWebhookEvent(rawBody, signature);
    if (event.type === "ignored") return;

    const payment = await paymentRepository.findByCheckoutId(event.session.id);
    if (!payment) {
      // A session we never created (another environment, a manual test in the
      // dashboard). Nothing to reconcile — log, do not fail, or Stripe retries.
      console.warn(
        `[payments] webhook for unknown checkout session ${event.session.id}`,
      );
      return;
    }

    if (event.type === "checkout.completed") {
      // "completed" with an unpaid status means a delayed method (bank debit)
      // is still settling — stay PENDING and wait for async_payment_*.
      if (event.session.paymentStatus === "paid") {
        await applyCheckoutOutcome(payment, event.session, true);
      }
      return;
    }

    // expired / async_payment_failed
    await applyCheckoutOutcome(payment, event.session, false);
  },
};

/** The single place a payment moves out of PENDING. Idempotent. */
async function applyCheckoutOutcome(
  payment: Payment,
  session: CheckoutSessionSummary,
  succeeded: boolean,
): Promise<Payment> {
  if (payment.status !== "PENDING") return payment;

  if (succeeded) {
    return paymentRepository.markSucceeded(payment.id, {
      providerPaymentIntentId: session.paymentIntentId,
      paidAt: new Date(),
    });
  }
  return paymentRepository.markFailed(payment.id);
}
