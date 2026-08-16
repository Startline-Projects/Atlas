import type { Payment as PaymentRow } from "@prisma/client";

import { getPrisma } from "@/lib/db";
import type {
  Payment,
  PaymentPurpose,
  PaymentStatus,
} from "@/lib/domain/english-test";

/**
 * Payment repository — ARCHITECTURE §6 step 4.
 *
 * Status transitions are the service's business; this module only persists
 * them. It never talks to Stripe.
 */

function toPayment(row: PaymentRow): Payment {
  return {
    id: row.id,
    userId: row.userId,
    purpose: row.purpose as PaymentPurpose,
    amountCents: row.amountCents,
    currency: row.currency,
    status: row.status as PaymentStatus,
    provider: row.provider,
    providerCheckoutId: row.providerCheckoutId,
    paidAt: row.paidAt,
    createdAt: row.createdAt,
  };
}

export interface CreatePaymentRecord {
  userId: string;
  purpose: PaymentPurpose;
  amountCents: number;
  currency: string;
  provider: string;
}

export const paymentRepository = {
  async create(input: CreatePaymentRecord): Promise<Payment> {
    const row = await getPrisma().payment.create({ data: input });
    return toPayment(row);
  },

  async findById(id: string): Promise<Payment | null> {
    const row = await getPrisma().payment.findUnique({ where: { id } });
    return row ? toPayment(row) : null;
  },

  async findByCheckoutId(providerCheckoutId: string): Promise<Payment | null> {
    const row = await getPrisma().payment.findUnique({
      where: { providerCheckoutId },
    });
    return row ? toPayment(row) : null;
  },

  async attachCheckout(id: string, providerCheckoutId: string): Promise<void> {
    await getPrisma().payment.update({
      where: { id },
      data: { providerCheckoutId },
    });
  },

  /**
   * Idempotent: the webhook and the on-return confirmation may both report
   * success; the second write is a no-op rather than an error.
   */
  async markSucceeded(
    id: string,
    details: { providerPaymentIntentId?: string | null; paidAt: Date },
  ): Promise<Payment> {
    const row = await getPrisma().payment.update({
      where: { id },
      data: {
        status: "SUCCEEDED",
        paidAt: details.paidAt,
        ...(details.providerPaymentIntentId
          ? { providerPaymentIntentId: details.providerPaymentIntentId }
          : {}),
      },
    });
    return toPayment(row);
  },

  async markFailed(id: string): Promise<Payment> {
    const row = await getPrisma().payment.update({
      where: { id },
      data: { status: "FAILED" },
    });
    return toPayment(row);
  },

  /**
   * The oldest SUCCEEDED payment for `purpose` that has not unlocked an
   * attempt yet — i.e. a retake the candidate has paid for and not used.
   */
  async findUnconsumed(
    userId: string,
    purpose: PaymentPurpose,
  ): Promise<Payment | null> {
    const row = await getPrisma().payment.findFirst({
      where: { userId, purpose, status: "SUCCEEDED", testAttempt: null },
      orderBy: { paidAt: "asc" },
    });
    return row ? toPayment(row) : null;
  },
};
