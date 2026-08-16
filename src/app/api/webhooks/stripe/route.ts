import { NextResponse, type NextRequest } from "next/server";

import { paymentService } from "@/lib/services/payment";

/**
 * POST /api/webhooks/stripe — ARCHITECTURE §7.10.
 *
 * Verifies the signature (in the integration), validates, delegates to
 * `paymentService`. Does no work itself. Configure the endpoint in the Stripe
 * dashboard for: checkout.session.completed, checkout.session.expired,
 * checkout.session.async_payment_succeeded, checkout.session.async_payment_failed
 * — and put the signing secret in STRIPE_WEBHOOK_SECRET.
 *
 * Reads the raw body: signature verification needs the exact bytes.
 */
export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  const rawBody = await request.text();

  try {
    await paymentService.handleStripeWebhook(rawBody, signature);
    return NextResponse.json({ received: true });
  } catch (error) {
    // A bad signature (or missing secret) is a 400 so Stripe stops retrying;
    // anything else is a 500 so it retries.
    const message = error instanceof Error ? error.message : "Webhook error";
    const bad = /signature|STRIPE_WEBHOOK_SECRET/i.test(message);
    console.error("[webhooks/stripe]", message);
    return NextResponse.json({ error: message }, { status: bad ? 400 : 500 });
  }
}
