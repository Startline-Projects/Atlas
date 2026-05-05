"use client";

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type SigninState = "default" | "two-factor";

const FIELD_INPUT_CLASS =
  "w-full rounded-md border border-line bg-[#FFFDF7] px-3.5 py-3 text-[15px] text-ink transition-[border-color,box-shadow,background] outline-none placeholder:text-ink-mute placeholder:opacity-70 hover:not-disabled:not-focus:border-[#C4BCA9] focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,14,12,0.08)] disabled:bg-cream-deep disabled:text-ink-mute disabled:opacity-70";

/** Non-functional sign-in form — pure UI per Session 1 scope. */
export function SigninForm() {
  const [state, setState] = useState<SigninState>("default");
  const [showPassword, setShowPassword] = useState(false);

  const handleCredentialsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Visual demo only: show what would happen on a successful credentials
    // step — move to the 2FA screen. Real auth wires up in a later session.
    setState("two-factor");
  };

  return state === "default" ? (
    <DefaultState
      showPassword={showPassword}
      onTogglePassword={() => setShowPassword((v) => !v)}
      onSubmit={handleCredentialsSubmit}
    />
  ) : (
    <TwoFactorState onBack={() => setState("default")} />
  );
}

/* ============================================================
   STATE: default — email + password + remember-me + 2FA hint
   ============================================================ */

function DefaultState({
  showPassword,
  onTogglePassword,
  onSubmit,
}: {
  showPassword: boolean;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const emailId = useId();
  const pwdId = useId();
  const rememberId = useId();

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-1 flex-col">
      <FormAlert
        title="Incorrect email or password."
        body={
          <>
            Check your info and try again.{" "}
            <Link href="/specialist/forgot" className="underline-offset-2 hover:underline">
              Reset your password?
            </Link>
          </>
        }
      />

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
          className={FIELD_INPUT_CLASS}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor={pwdId}
          className="text-ink-soft mb-2 flex items-center justify-between text-[13px] font-medium"
        >
          <span>Password</span>
          <span className="text-ink-mute font-mono text-[10px] tracking-[0.1em] uppercase">
            Required
          </span>
        </label>
        <div className="relative">
          <input
            id={pwdId}
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            placeholder="Enter your password"
            className={cn(FIELD_INPUT_CLASS, "pr-12")}
          />
          <button
            type="button"
            onClick={onTogglePassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="text-ink-mute hover:bg-cream-deep hover:text-ink absolute top-1/2 right-2 grid h-[30px] w-[30px] -translate-y-1/2 place-items-center rounded-sm transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-[18px] w-[18px]" strokeWidth={1.4} />
            ) : (
              <Eye className="h-[18px] w-[18px]" strokeWidth={1.4} />
            )}
          </button>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <label
          htmlFor={rememberId}
          className="text-ink-soft inline-flex cursor-pointer items-center gap-2.5 text-[13.5px] select-none"
        >
          <span className="relative inline-flex">
            <input
              id={rememberId}
              type="checkbox"
              className="peer absolute h-0 w-0 opacity-0"
            />
            <span
              aria-hidden="true"
              className="border-line hover:border-ink-mute peer-checked:bg-ink peer-checked:border-ink peer-focus-visible:ring-ink/30 grid h-4 w-4 place-items-center rounded-[4px] border-[1.5px] bg-[#FFFDF7] transition-all peer-focus-visible:ring-2 after:hidden peer-checked:after:block after:content-['']"
            >
              <CheckMark className="h-2 w-2 text-lime hidden peer-checked:block" />
            </span>
          </span>
          Trust this device for 14 days
        </label>
        <Link
          href="/specialist/forgot"
          className="text-ink border-line hover:border-ink border-b pb-px text-[13px] font-medium transition-colors"
        >
          Reset password
        </Link>
      </div>

      <InfoNote
        title="2FA required."
        icon={<ShieldCheck className="h-4 w-4" strokeWidth={1.6} />}
        body="You'll be asked for your authenticator code on the next step. Internal staff can't disable it."
      />

      <SubmitButton label="Continue to 2FA" />
    </form>
  );
}

/* ============================================================
   STATE: two-factor — six-digit OTP + countdown ring
   ============================================================ */

function TwoFactorState({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-1 flex-col">
      <button
        type="button"
        onClick={onBack}
        className="text-ink-mute hover:bg-cream-deep hover:text-ink mb-4 inline-flex items-center gap-1.5 self-start rounded-sm px-2 py-1 pl-1 text-[12.5px] transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
        Back to sign in
      </button>

      <div className="text-center">
        <div className="bg-cream-deep text-ink mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full">
          <ShieldCheck className="h-7 w-7" strokeWidth={1.6} aria-hidden="true" />
        </div>
        <h2 className="font-display mb-3 text-[28px] leading-[1.12] font-medium tracking-[-0.015em]">
          Verify it&rsquo;s you
        </h2>
        <p className="text-ink-soft mx-auto mb-6 max-w-[360px] text-[14.5px] leading-[1.55]">
          Open your authenticator app and enter the 6-digit code for{" "}
          <strong className="text-ink font-medium">
            Atlas Talent Specialist
          </strong>
          .
        </p>
      </div>

      <OtpGroup />

      <div className="text-ink-mute mb-3 flex items-center justify-center gap-2 text-[12px]">
        <span aria-hidden="true" className="relative inline-block h-3.5 w-3.5">
          <svg viewBox="0 0 14 14" className="h-3.5 w-3.5">
            <circle
              cx="7"
              cy="7"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.18"
              strokeWidth="1.5"
            />
            <circle
              cx="7"
              cy="7"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="37.7"
              strokeDashoffset="9.4"
              strokeLinecap="round"
              transform="rotate(-90 7 7)"
            />
          </svg>
        </span>
        <span>
          Code refreshes in{" "}
          <span className="text-ink font-medium">22s</span>
        </span>
      </div>

      <div className="text-ink-mute flex flex-wrap items-center justify-center gap-1.5 text-[12.5px]">
        <a
          href="#"
          className="text-ink border-line hover:border-ink border-b pb-px transition-colors"
        >
          Use a backup code instead
        </a>
        <span aria-hidden="true">or</span>
        <span>
          Lost your device?{" "}
          <a
            href="mailto:security@atlasworld.co"
            className="text-ink border-line hover:border-ink border-b pb-px transition-colors"
          >
            security@atlasworld.co
          </a>
        </span>
      </div>
    </div>
  );
}

function OtpGroup() {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const [values, setValues] = useState<string[]>(["", "", "", "", "", ""]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  const handleInput = (index: number, raw: string) => {
    const value = raw.replace(/\D/g, "").slice(0, 1);
    setValues((prev) => prev.map((v, i) => (i === index ? value : v)));
    if (value && index < 5) refs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="mb-3.5 flex justify-between gap-2 max-[420px]:gap-1">
      {values.map((value, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : undefined}
          maxLength={1}
          aria-label={`Code digit ${i + 1}`}
          value={value}
          onChange={(e) => handleInput(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className={cn(
            "font-display text-ink h-16 min-w-0 flex-1 rounded-md border bg-[#FFFDF7] text-center text-[30px] font-medium transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,14,12,0.08)] focus:outline-none",
            value ? "border-ink-soft" : "border-line",
          )}
          style={{ fontVariationSettings: '"opsz" 72' }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   Lockout state — separate exported component so the page can
   render it via `?state=lockout`. No real countdown.
   ============================================================ */

export function LockoutCard() {
  return (
    <div className="flex flex-1 flex-col items-center px-2 py-1 text-center">
      <div className="bg-danger-bg text-danger mb-5 grid h-16 w-16 place-items-center rounded-full">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          aria-hidden="true"
        >
          <rect x="6" y="11" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M9.5 11V7.5a4.5 4.5 0 0 1 9 0V11"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M11 17.5h6M14 14.5v6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h2 className="font-display mb-3 text-[28px] leading-[1.12] font-medium tracking-[-0.015em]">
        Account locked.
      </h2>
      <p className="text-ink-soft mb-6 max-w-[360px] text-[14.5px] leading-[1.55]">
        Five failed sign-in attempts in a row. For your security and ours,
        your account is temporarily locked.
      </p>

      <div className="border-line bg-cream/50 mb-6 flex flex-col items-center gap-1 rounded-md border px-6 py-5">
        <span
          className="font-display text-ink text-[42px] leading-none font-medium tracking-tight tabular-nums"
          aria-live="polite"
        >
          14:32
        </span>
        <span className="text-ink-mute font-mono text-[10.5px] tracking-[0.14em] uppercase">
          Try again in
        </span>
      </div>

      <p className="text-ink-mute max-w-[360px] text-[12.5px] leading-[1.55]">
        All sign-in attempts are logged. If this wasn&rsquo;t you, contact
        your manager immediately or email{" "}
        <a
          href="mailto:security@atlasworld.co"
          className="text-ink border-line hover:border-ink border-b pb-px transition-colors"
        >
          security@atlasworld.co
        </a>
        . Reference:{" "}
        <span className="font-mono text-[11px] tracking-[0.04em]">
          SI-2K8F-MIG
        </span>
      </p>
    </div>
  );
}

/* ============================================================
   Local helpers — kept inside this file because they're
   one-off compositions, not reusable primitives yet.
   ============================================================ */

function FormAlert({
  title,
  body,
}: {
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div
      role="alert"
      className="bg-danger-bg border-danger/30 text-danger mb-5 flex items-start gap-2.5 rounded-md border px-3.5 py-3 text-[13.5px] leading-[1.5]"
    >
      <AlertCircle
        className="mt-px h-[18px] w-[18px] flex-shrink-0"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <div>
        <strong className="mb-0.5 block font-semibold">{title}</strong>
        <span>{body}</span>
      </div>
    </div>
  );
}

function InfoNote({
  title,
  body,
  icon,
}: {
  title: string;
  body: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-cream border-line-soft text-ink-soft mt-[-2px] mb-5 flex items-start gap-2.5 rounded-md border px-3.5 py-3 text-[12.5px] leading-[1.5]">
      <span aria-hidden="true" className="text-ink mt-0.5 flex-shrink-0">
        {icon}
      </span>
      <div>
        <strong className="text-ink font-semibold">{title}</strong> {body}
      </div>
    </div>
  );
}

function SubmitButton({ label }: { label: string }) {
  return (
    <button
      type="submit"
      className="btn btn-primary btn-lg group mt-auto w-full justify-center"
    >
      <span>{label}</span>
      <ArrowRight
        className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5"
        strokeWidth={1.6}
        aria-hidden="true"
      />
    </button>
  );
}

function CheckMark({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 9 9" fill="none" className={className} aria-hidden="true">
      <path
        d="M1.5 4.5 3.5 6.5 7.5 2.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
