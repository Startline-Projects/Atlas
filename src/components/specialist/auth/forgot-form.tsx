"use client";

import { ArrowLeft, ArrowRight, Mail, RotateCcw } from "lucide-react";
import { useId, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

const FIELD_INPUT_CLASS =
  "w-full rounded-md border border-line bg-[#FFFDF7] px-3.5 py-3 text-[15px] text-ink transition-[border-color,box-shadow,background] outline-none placeholder:text-ink-mute placeholder:opacity-70 hover:not-disabled:not-focus:border-[#C4BCA9] focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,14,12,0.08)]";

type ForgotState = "request" | "sent";

/** Non-functional reset-request form — request → sent visual toggle. */
export function ForgotForm() {
  const [state, setState] = useState<ForgotState>("request");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("sent");
  };

  return state === "request" ? (
    <RequestState
      email={email}
      onEmailChange={setEmail}
      onSubmit={handleSubmit}
    />
  ) : (
    <SentState email={email} onResetEmail={() => setState("request")} />
  );
}

function RequestState({
  email,
  onEmailChange,
  onSubmit,
}: {
  email: string;
  onEmailChange: (v: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const emailId = useId();
  return (
    <div className="flex flex-1 flex-col">
      <Link
        href="/specialist/signin"
        className="text-ink-mute hover:bg-cream-deep hover:text-ink mb-4 inline-flex items-center gap-1.5 self-start rounded-sm px-2 py-1 pl-1 text-[12.5px] transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
        Back to sign in
      </Link>

      <form noValidate onSubmit={onSubmit} className="flex flex-1 flex-col">
        <div className="mb-5">
          <label
            htmlFor={emailId}
            className="text-ink-soft mb-2 flex items-center justify-between text-[13px] font-medium"
          >
            <span>Atlas email</span>
            <span className="text-ink-mute font-mono text-[10px] tracking-[0.1em] uppercase">
              Required
            </span>
          </label>
          <input
            id={emailId}
            type="email"
            required
            autoComplete="email"
            placeholder="you@atlasworld.co"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className={cn(FIELD_INPUT_CLASS)}
          />
          <p className="text-ink-mute mt-1.5 text-[12px] leading-[1.45]">
            Reset links go to your registered Atlas address only — no personal
            emails.
          </p>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg group mt-auto w-full justify-center"
        >
          <span>Send reset link</span>
          <ArrowRight
            className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </button>
      </form>
    </div>
  );
}

function SentState({
  email,
  onResetEmail,
}: {
  email: string;
  onResetEmail: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center px-2 py-1 text-center">
      <div className="bg-cream-deep text-ink mb-5 grid h-16 w-16 place-items-center rounded-full">
        <Mail className="h-7 w-7" strokeWidth={1.6} aria-hidden="true" />
      </div>
      <h2 className="font-display mb-3 text-[28px] leading-[1.12] font-medium tracking-[-0.015em]">
        Check your inbox.
      </h2>
      <p className="text-ink-soft mb-6 max-w-[380px] text-[14.5px] leading-[1.55]">
        If{" "}
        <strong className="text-ink font-medium">
          {email || "your email"}
        </strong>{" "}
        matches an Atlas Specialist account, a reset link is on its way. The
        link expires in <strong className="text-ink font-medium">30 minutes</strong>.
      </p>

      <div className="mb-6 flex flex-col items-stretch gap-2.5">
        <button
          type="button"
          disabled
          className="border-line text-ink-mute inline-flex items-center justify-center gap-1.5 rounded-full border px-5 py-2.5 text-[13px] font-medium opacity-70"
        >
          <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
          Resend in 60s
        </button>
        <Link
          href="/specialist/signin"
          className="border-line text-ink hover:bg-cream-deep inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-[13px] font-medium transition-colors"
        >
          Back to sign in
        </Link>
      </div>

      <p className="text-ink-mute max-w-[380px] text-[12.5px] leading-[1.55]">
        Didn&rsquo;t get it? Check spam, or email{" "}
        <a
          href="mailto:internal@atlasworld.co"
          className="text-ink border-line hover:border-ink border-b pb-px transition-colors"
        >
          internal@atlasworld.co
        </a>
        .{" "}
        <button
          type="button"
          onClick={onResetEmail}
          className="text-ink border-line hover:border-ink border-b pb-px transition-colors"
        >
          Use a different email
        </button>
      </p>
    </div>
  );
}
