"use client";

import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  CreditCard,
  Lock,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

import { ApiClientError, englishTestApi } from "@/lib/api-client";
import { ENGLISH_TEST } from "@/lib/domain/english-test";

const RETURN_PATH = "/candidate/english-test/retake";

/**
 * $10 retake checkout.
 *
 * "Pay" asks the API to start a checkout and sends the browser to the URL it
 * returns — Stripe's hosted page in production, or (under
 * PAYMENTS_DEV_BYPASS) straight back here with the payment already marked
 * paid. Card details are never typed into Atlas: Stripe collects them.
 *
 * Renders one of: unlocked (paid retake waiting), payment still pending,
 * payment failed, or the order summary + pay button.
 */
export function RetakeCheckout({
  attemptNumber,
  unlocked,
  returnedPaymentStatus,
  cancelled,
}: {
  attemptNumber: number;
  /** A SUCCEEDED, unused retake payment exists. */
  unlocked: boolean;
  /** Set when arriving back from checkout with `?session_id=`. */
  returnedPaymentStatus: "SUCCEEDED" | "PENDING" | "FAILED" | null;
  /** Arrived back with `?cancelled=1`. */
  cancelled: boolean;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async () => {
    if (pending) return;
    setPending(true);
    setError(null);
    try {
      const { checkoutUrl } = await englishTestApi.startRetakeCheckout(RETURN_PATH);
      window.location.assign(checkoutUrl);
    } catch (e) {
      setError(
        e instanceof ApiClientError
          ? e.message
          : "Could not start the payment. Please try again.",
      );
      setPending(false);
    }
  };

  if (unlocked) {
    return (
      <div className="bg-paper border-line shadow-card flex flex-col items-center rounded-xl border p-8 text-center sm:rounded-[28px] sm:p-10">
        <div className="bg-success-bg text-success mb-5 grid h-16 w-16 place-items-center rounded-full">
          <BadgeCheck className="h-7 w-7" strokeWidth={1.6} aria-hidden="true" />
        </div>
        <h2 className="font-display mb-3 text-[28px] leading-[1.12] font-medium tracking-[-0.015em]">
          Retake unlocked.
        </h2>
        <p className="text-ink-soft mb-7 max-w-[380px] text-[14.5px] leading-[1.55]">
          {returnedPaymentStatus === "SUCCEEDED"
            ? `Payment of ${ENGLISH_TEST.retakeFeeLabel} received. `
            : "You already have a paid retake waiting. "}
          Attempt #{attemptNumber} is ready whenever you are. Same format,
          fresh sitting.
        </p>
        <Link
          href="/candidate/english-test"
          className="btn btn-primary btn-lg group w-full justify-center sm:w-auto"
        >
          <span>Start attempt #{attemptNumber}</span>
          <ArrowRight
            className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </Link>
      </div>
    );
  }

  if (returnedPaymentStatus === "PENDING") {
    return (
      <div className="bg-paper border-line shadow-card flex flex-col items-center rounded-xl border p-8 text-center sm:rounded-[28px] sm:p-10">
        <div className="bg-amber-bg text-amber mb-5 grid h-16 w-16 place-items-center rounded-full">
          <Clock3 className="h-7 w-7" strokeWidth={1.6} aria-hidden="true" />
        </div>
        <h2 className="font-display mb-3 text-[28px] leading-[1.12] font-medium tracking-[-0.015em]">
          Payment still processing.
        </h2>
        <p className="text-ink-soft mb-7 max-w-[380px] text-[14.5px] leading-[1.55]">
          Your bank has not confirmed the {ENGLISH_TEST.retakeFeeLabel} yet.
          This usually takes seconds; refresh in a moment, or check your
          dashboard — the retake unlocks the instant it clears.
        </p>
        <Link href="/candidate/dashboard" className="btn btn-ghost">
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-paper border-line shadow-card rounded-xl border p-7 sm:rounded-[28px] sm:p-9">
      {(returnedPaymentStatus === "FAILED" || cancelled) && (
        <p
          role="status"
          className="bg-amber-bg text-amber mb-6 rounded-md px-3.5 py-3 text-[13px] leading-[1.5]"
        >
          {cancelled
            ? "Checkout was cancelled — nothing was charged."
            : "That payment didn't go through — nothing was charged. Try again below."}
        </p>
      )}

      {/* Order summary */}
      <div className="border-line mb-6 flex items-center justify-between gap-3 border-b pb-6">
        <div className="flex items-center gap-3">
          <span className="bg-cream-deep text-ink grid h-11 w-11 flex-shrink-0 place-items-center rounded-full">
            <RotateCcw className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-ink text-[15px] font-medium">
              English test retake
            </span>
            <span className="text-ink-mute text-[12.5px]">
              Attempt #{attemptNumber} · unlocks immediately after payment
            </span>
          </div>
        </div>
        <span className="font-display text-ink text-[26px] font-medium tracking-tight">
          {ENGLISH_TEST.retakeFeeLabel}
        </span>
      </div>

      {error && (
        <p
          role="alert"
          className="bg-danger-bg text-danger mb-5 rounded-md px-3.5 py-3 text-[13px] leading-[1.5]"
        >
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handlePay}
        disabled={pending}
        className="btn btn-primary btn-lg group w-full justify-center disabled:pointer-events-none disabled:opacity-60"
      >
        <CreditCard className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden="true" />
        <span>
          {pending ? "Opening secure checkout…" : `Pay ${ENGLISH_TEST.retakeFeeLabel}`}
        </span>
        <ArrowRight
          className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5"
          strokeWidth={1.6}
          aria-hidden="true"
        />
      </button>
      <p className="text-ink-mute mt-3.5 flex items-center justify-center gap-1.5 text-[12.5px]">
        <Lock className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
        Card details are entered on Stripe&rsquo;s secure page · one-time
        charge, no subscription
      </p>
    </div>
  );
}
