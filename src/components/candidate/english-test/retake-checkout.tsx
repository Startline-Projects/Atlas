"use client";

import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  Lock,
  RotateCcw,
} from "lucide-react";
import { useId, useState } from "react";
import Link from "next/link";
import { ENGLISH_TEST, testAttempts } from "@/lib/mock-data/candidate";

type CheckoutState = "form" | "paid";

const FIELD_INPUT_CLASS =
  "w-full rounded-md border border-line bg-[#FFFDF7] px-3.5 py-3 text-[15px] text-ink transition-[border-color,box-shadow,background] outline-none placeholder:text-ink-mute placeholder:opacity-70 hover:not-disabled:not-focus:border-[#C4BCA9] focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,14,12,0.08)]";

/**
 * $10 retake checkout — visual demo only. The real flow charges via
 * Stripe (TECH_STACK.md) and unlocks the attempt on webhook
 * confirmation; here "Pay" flips straight to the unlocked state.
 */
export function RetakeCheckout() {
  const [state, setState] = useState<CheckoutState>("form");
  const cardId = useId();
  const expId = useId();
  const cvcId = useId();
  const nameId = useId();

  const attemptNumber = testAttempts.length + 1;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("paid");
  };

  if (state === "paid") {
    return (
      <div className="bg-paper border-line shadow-card flex flex-col items-center rounded-xl border p-8 text-center sm:rounded-[28px] sm:p-10">
        <div className="bg-success-bg text-success mb-5 grid h-16 w-16 place-items-center rounded-full">
          <BadgeCheck className="h-7 w-7" strokeWidth={1.6} aria-hidden="true" />
        </div>
        <h2 className="font-display mb-3 text-[28px] leading-[1.12] font-medium tracking-[-0.015em]">
          Retake unlocked.
        </h2>
        <p className="text-ink-soft mb-7 max-w-[380px] text-[14.5px] leading-[1.55]">
          Payment of {ENGLISH_TEST.retakeFeeLabel} received — a receipt is
          on its way to your inbox. Attempt #{attemptNumber} is ready
          whenever you are. Same format, fresh questions.
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

  return (
    <div className="bg-paper border-line shadow-card rounded-xl border p-7 sm:rounded-[28px] sm:p-9">
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

      <form noValidate onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-5">
          <label
            htmlFor={cardId}
            className="text-ink-soft mb-2 block text-[13px] font-medium"
          >
            Card number
          </label>
          <div className="relative">
            <input
              id={cardId}
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 1234 1234 1234"
              className={`${FIELD_INPUT_CLASS} pr-12`}
            />
            <CreditCard
              className="text-ink-mute absolute top-1/2 right-3.5 h-[18px] w-[18px] -translate-y-1/2"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor={expId}
              className="text-ink-soft mb-2 block text-[13px] font-medium"
            >
              Expiry
            </label>
            <input
              id={expId}
              type="text"
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM / YY"
              className={FIELD_INPUT_CLASS}
            />
          </div>
          <div>
            <label
              htmlFor={cvcId}
              className="text-ink-soft mb-2 block text-[13px] font-medium"
            >
              CVC
            </label>
            <input
              id={cvcId}
              type="text"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="123"
              className={FIELD_INPUT_CLASS}
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor={nameId}
            className="text-ink-soft mb-2 block text-[13px] font-medium"
          >
            Name on card
          </label>
          <input
            id={nameId}
            type="text"
            autoComplete="cc-name"
            placeholder="As printed on the card"
            className={FIELD_INPUT_CLASS}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg group w-full justify-center"
        >
          <span>Pay {ENGLISH_TEST.retakeFeeLabel}</span>
          <ArrowRight
            className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </button>
        <p className="text-ink-mute mt-3.5 flex items-center justify-center gap-1.5 text-[12.5px]">
          <Lock className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
          Secured by Stripe · one-time charge, no subscription
        </p>
      </form>
    </div>
  );
}
