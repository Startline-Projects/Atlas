import Stripe from "stripe";

import { serverConfig } from "@/lib/config";

/**
 * Stripe SDK wrapper — ARCHITECTURE §5.6: this folder is the only place
 * `stripe` is imported. Services call the small typed surface below; they
 * never see the SDK.
 *
 * Server only. The secret key is read lazily so a build (or a page that never
 * charges) does not fail on a missing key — the first *charge* does, loudly.
 */

let client: Stripe | undefined;

export function isStripeConfigured(): boolean {
  return Boolean(serverConfig().STRIPE_SECRET_KEY);
}

function getStripe(): Stripe {
  if (typeof window !== "undefined") {
    throw new Error("Stripe must never be initialised in the browser.");
  }
  if (!client) {
    const key = serverConfig().STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error(
        "STRIPE_SECRET_KEY is not set — payments are not configured. " +
          "See .env.example (or set PAYMENTS_DEV_BYPASS=1 for local development).",
      );
    }
    client = new Stripe(key, { typescript: true });
  }
  return client;
}

export interface CreateCheckoutInput {
  /** Our payment id — round-trips as `client_reference_id` + metadata. */
  paymentId: string;
  userId: string;
  amountCents: number;
  currency: string;
  /** Line-item name shown on the Stripe-hosted page. */
  productName: string;
  productDescription?: string | undefined;
  customerEmail: string;
  /** Stripe substitutes `{CHECKOUT_SESSION_ID}` in this URL. */
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutSessionSummary {
  id: string;
  url: string | null;
  /** "paid" | "unpaid" | "no_payment_required" */
  paymentStatus: string;
  paymentIntentId: string | null;
  /** Our payment id, as we stored it on the session. */
  paymentId: string | null;
}

function summarise(session: Stripe.Checkout.Session): CheckoutSessionSummary {
  const pi = session.payment_intent;
  return {
    id: session.id,
    url: session.url ?? null,
    paymentStatus: session.payment_status,
    paymentIntentId: typeof pi === "string" ? pi : (pi?.id ?? null),
    paymentId:
      session.client_reference_id ?? session.metadata?.paymentId ?? null,
  };
}

/** Creates a one-off Checkout Session and returns the hosted-page URL. */
export async function createCheckoutSession(
  input: CreateCheckoutInput,
): Promise<CheckoutSessionSummary> {
  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    client_reference_id: input.paymentId,
    customer_email: input.customerEmail,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: input.currency,
          unit_amount: input.amountCents,
          product_data: {
            name: input.productName,
            ...(input.productDescription
              ? { description: input.productDescription }
              : {}),
          },
        },
      },
    ],
    metadata: { paymentId: input.paymentId, userId: input.userId },
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
  });
  return summarise(session);
}

/** Re-reads a session — used when the browser returns before the webhook lands. */
export async function retrieveCheckoutSession(
  sessionId: string,
): Promise<CheckoutSessionSummary> {
  const session = await getStripe().checkout.sessions.retrieve(sessionId);
  return summarise(session);
}

/**
 * The webhook events we act on, already reduced to what the service needs.
 * Anything else is `{ type: "ignored" }` — acknowledged, not processed.
 */
export type StripeWebhookEvent =
  | { type: "checkout.completed"; session: CheckoutSessionSummary }
  | { type: "checkout.failed"; session: CheckoutSessionSummary }
  | { type: "ignored"; rawType: string };

/**
 * Verifies the signature and parses the event. Throws if the signature is
 * bad — the route turns that into a 400 so Stripe does not retry forever.
 */
export function parseWebhookEvent(
  rawBody: string,
  signature: string,
): StripeWebhookEvent {
  const secret = serverConfig().STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not set — cannot verify webhooks.");
  }

  const event = getStripe().webhooks.constructEvent(rawBody, signature, secret);

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      return { type: "checkout.completed", session: summarise(event.data.object) };
    case "checkout.session.expired":
    case "checkout.session.async_payment_failed":
      return { type: "checkout.failed", session: summarise(event.data.object) };
    default:
      return { type: "ignored", rawType: event.type };
  }
}
