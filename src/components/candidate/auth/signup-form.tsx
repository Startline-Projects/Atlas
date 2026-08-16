"use client";

import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Eye,
  EyeOff,
  Gift,
  Loader2,
  MailCheck,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { useHydrated } from "@/hooks/use-hydrated";
import { cn } from "@/lib/utils/cn";
import { ENGLISH_TEST } from "@/lib/mock-data/candidate";
import { ApiClientError, candidatesApi } from "@/lib/api-client";
import { ROLE_CATEGORIES } from "@/lib/domain/candidate";
// Imported from the module, not the barrel: the barrel reaches `next/server`,
// which must not be pulled into a client bundle.
import { fieldsFromZod } from "@/lib/errors/zod-fields";
import { signupSchema } from "@/lib/validators/candidate";

type SignupState = "account" | "verify" | "done";

type FieldErrors = Record<string, string>;

const FIELD_INPUT_CLASS =
  "w-full rounded-md border border-line bg-[#FFFDF7] px-3.5 py-3 text-[15px] text-ink transition-[border-color,box-shadow,background] outline-none placeholder:text-ink-mute placeholder:opacity-70 hover:not-disabled:not-focus:border-[#C4BCA9] focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,14,12,0.08)] disabled:bg-cream-deep disabled:text-ink-mute disabled:opacity-70";

const FIELD_INPUT_ERROR_CLASS =
  "border-danger focus:border-danger focus:shadow-[0_0_0_3px_rgba(194,65,43,0.12)]";

/**
 * Candidate signup: account → email verify → done.
 *
 * The account step validates with `signupSchema` before it calls the API, so
 * the browser and the server apply the same rules and an obvious mistake costs
 * no round trip. The server re-validates regardless — this is a convenience,
 * never a gate.
 */
export function SignupForm() {
  const [state, setState] = useState<SignupState>("account");
  const [email, setEmail] = useState("");

  return state === "account" ? (
    <AccountState
      onSignedUp={(signedUpEmail, needsVerification) => {
        setEmail(signedUpEmail);
        setState(needsVerification ? "verify" : "done");
      }}
    />
  ) : state === "verify" ? (
    <VerifyState
      email={email}
      onBack={() => setState("account")}
      onVerified={() => setState("done")}
    />
  ) : (
    <DoneState />
  );
}

/* ============================================================
   STATE: account — name + email + password + category + terms
   ============================================================ */

function AccountState({
  onSignedUp,
}: {
  onSignedUp: (email: string, requiresEmailVerification: boolean) => void;
}) {
  const nameId = useId();
  const emailId = useId();
  const pwdId = useId();
  const catId = useId();
  const termsId = useId();

  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;

    const form = new FormData(e.currentTarget);
    const parsed = signupSchema.safeParse({
      fullName: String(form.get("fullName") ?? ""),
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
      roleCategory: String(form.get("roleCategory") ?? ""),
      acceptedTerms: form.get("acceptedTerms") === "on",
    });

    if (!parsed.success) {
      setFormError(null);
      setFieldErrors(fieldsFromZod(parsed.error));
      return;
    }

    setPending(true);
    setFormError(null);
    setFieldErrors({});

    try {
      const result = await candidatesApi.signup(parsed.data);
      onSignedUp(parsed.data.email, result.requiresEmailVerification);
    } catch (error) {
      if (error instanceof ApiClientError) {
        setFieldErrors(error.fields);
        // A message that is only about one field is already shown under it.
        setFormError(
          Object.keys(error.fields).length > 0 ? null : error.message,
        );
      } else {
        setFormError("Something went wrong. Please try again.");
      }
      setPending(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-1 flex-col">
      {formError && <FormBanner message={formError} />}

      <div className="mb-5">
        <FieldLabel htmlFor={nameId} label="Full name" />
        <input
          id={nameId}
          name="fullName"
          type="text"
          required
          disabled={pending}
          autoComplete="name"
          placeholder="As it appears on your ID"
          aria-invalid={Boolean(fieldErrors.fullName)}
          className={cn(
            FIELD_INPUT_CLASS,
            fieldErrors.fullName && FIELD_INPUT_ERROR_CLASS,
          )}
        />
        <FieldError message={fieldErrors.fullName} />
      </div>

      <div className="mb-5">
        <FieldLabel htmlFor={emailId} label="Email" />
        <input
          id={emailId}
          name="email"
          type="email"
          required
          disabled={pending}
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={Boolean(fieldErrors.email)}
          className={cn(
            FIELD_INPUT_CLASS,
            fieldErrors.email && FIELD_INPUT_ERROR_CLASS,
          )}
        />
        <FieldError message={fieldErrors.email} />
      </div>

      <div className="mb-5">
        <FieldLabel htmlFor={pwdId} label="Password" />
        <div className="relative">
          <input
            id={pwdId}
            name="password"
            type={showPassword ? "text" : "password"}
            required
            disabled={pending}
            autoComplete="new-password"
            placeholder="8+ characters"
            aria-invalid={Boolean(fieldErrors.password)}
            className={cn(
              FIELD_INPUT_CLASS,
              "pr-12",
              fieldErrors.password && FIELD_INPUT_ERROR_CLASS,
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
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
        <FieldError message={fieldErrors.password} />
      </div>

      <div className="mb-5">
        <FieldLabel htmlFor={catId} label="Role category" />
        <select
          id={catId}
          name="roleCategory"
          required
          disabled={pending}
          defaultValue=""
          aria-invalid={Boolean(fieldErrors.roleCategory)}
          className={cn(
            FIELD_INPUT_CLASS,
            "appearance-none",
            fieldErrors.roleCategory && FIELD_INPUT_ERROR_CLASS,
          )}
        >
          <option value="" disabled>
            Pick the category you&rsquo;re applying for
          </option>
          {ROLE_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        <FieldError message={fieldErrors.roleCategory} />
      </div>

      <div className="mb-5">
        <label
          htmlFor={termsId}
          className="text-ink-soft inline-flex cursor-pointer items-start gap-2.5 text-[13px] leading-[1.5] select-none"
        >
          <span className="relative mt-0.5 inline-flex">
            <input
              id={termsId}
              name="acceptedTerms"
              type="checkbox"
              required
              disabled={pending}
              className="peer absolute h-0 w-0 opacity-0"
            />
            <span
              aria-hidden="true"
              className="border-line hover:border-ink-mute peer-checked:bg-ink peer-checked:border-ink peer-focus-visible:ring-ink/30 grid h-4 w-4 place-items-center rounded-[4px] border-[1.5px] bg-[#FFFDF7] transition-all peer-focus-visible:ring-2"
            />
          </span>
          <span>
            I agree to the{" "}
            <Link
              href="/legal/terms"
              className="text-ink border-line hover:border-ink border-b pb-px transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/legal/privacy"
              className="text-ink border-line hover:border-ink border-b pb-px transition-colors"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        <FieldError message={fieldErrors.acceptedTerms} />
      </div>

      <InfoNote
        icon={<Gift className="h-4 w-4" strokeWidth={1.6} />}
        title="Free to apply."
        body={`Your first English-test attempt is free — pass or fail, you keep your account and see your full result. Retakes cost ${ENGLISH_TEST.retakeFeeLabel} and unlock immediately after payment.`}
      />

      <SubmitButton
        label="Create account"
        pendingLabel="Creating your account"
        pending={pending}
      />

      <p className="text-ink-mute mt-4 text-center text-[13px]">
        Already applied?{" "}
        <Link
          href="/candidate/signin"
          className="text-ink border-line hover:border-ink border-b pb-px font-medium transition-colors"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}

/* ============================================================
   STATE: verify — six-digit email OTP
   ============================================================ */

function VerifyState({
  email,
  onBack,
  onVerified,
}: {
  email: string;
  onBack: () => void;
  onVerified: () => void;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendState, setResendState] = useState<"idle" | "sending" | "sent">(
    "idle",
  );

  const handleCode = async (token: string) => {
    if (pending) return false;

    setPending(true);
    setError(null);

    try {
      await candidatesApi.verifyEmail({ email, token });
      onVerified();
      return true;
    } catch (err) {
      setError(
        err instanceof ApiClientError
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setPending(false);
      return false;
    }
  };

  const handleResend = async () => {
    if (resendState === "sending") return;
    setResendState("sending");
    setError(null);
    try {
      await candidatesApi.resendVerification(email);
    } finally {
      setResendState("sent");
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <button
        type="button"
        onClick={onBack}
        className="text-ink-mute hover:bg-cream-deep hover:text-ink mb-4 inline-flex items-center gap-1.5 self-start rounded-sm px-2 py-1 pl-1 text-[12.5px] transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
        Back to account details
      </button>

      <div className="text-center">
        <div className="bg-cream-deep text-ink mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full">
          <MailCheck className="h-7 w-7" strokeWidth={1.6} aria-hidden="true" />
        </div>
        <h2 className="font-display mb-3 text-[28px] leading-[1.12] font-medium tracking-[-0.015em]">
          Check your inbox
        </h2>
        <p className="text-ink-soft mx-auto mb-6 max-w-[360px] text-[14.5px] leading-[1.55]">
          We sent a 6-digit code to{" "}
          <strong className="text-ink font-medium">{email}</strong>. Enter it
          below to verify your address.
        </p>
      </div>

      <OtpGroup disabled={pending} onFilled={handleCode} />

      {error && <FormBanner message={error} className="mb-3.5" />}

      <div className="text-ink-mute flex flex-wrap items-center justify-center gap-1.5 text-[12.5px]">
        <span>Didn&rsquo;t get it?</span>
        {resendState === "sent" ? (
          <span className="text-ink">Sent — check your inbox again.</span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={resendState === "sending"}
            className="text-ink border-line hover:border-ink border-b pb-px transition-colors disabled:opacity-60"
          >
            {resendState === "sending" ? "Sending…" : "Resend code"}
          </button>
        )}
        <span aria-hidden="true">·</span>
        <span>Check your spam folder first</span>
      </div>
    </div>
  );
}

function OtpGroup({
  disabled,
  onFilled,
}: {
  disabled: boolean;
  /** Resolves false when the code was rejected, so the inputs can be cleared. */
  onFilled: (code: string) => Promise<boolean>;
}) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const [values, setValues] = useState<string[]>(["", "", "", "", "", ""]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  const submit = async (code: string) => {
    const accepted = await onFilled(code);
    if (!accepted) {
      setValues(["", "", "", "", "", ""]);
      refs.current[0]?.focus();
    }
  };

  const handleInput = (index: number, raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (!digits) {
      setValues(values.map((v, i) => (i === index ? "" : v)));
      return;
    }

    // Pasting the whole code into any box fills the rest of the row.
    const next = [...values];
    for (let i = 0; i < digits.length && index + i < 6; i += 1) {
      next[index + i] = digits[i]!;
    }
    setValues(next);

    const lastFilled = Math.min(index + digits.length, 5);
    refs.current[lastFilled]?.focus();

    if (next.every((v) => v !== "")) void submit(next.join(""));
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
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
          maxLength={6}
          disabled={disabled}
          aria-label={`Code digit ${i + 1}`}
          value={value}
          onChange={(e) => handleInput(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className={cn(
            "font-display text-ink focus:border-ink h-16 min-w-0 flex-1 rounded-md border bg-[#FFFDF7] text-center text-[30px] font-medium transition-all focus:shadow-[0_0_0_3px_rgba(14,14,12,0.08)] focus:outline-none disabled:opacity-60",
            value ? "border-ink-soft" : "border-line",
          )}
          style={{ fontVariationSettings: '"opsz" 72' }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   STATE: done — verified, hand off to the dashboard
   ============================================================ */

function DoneState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-2 py-1 text-center">
      <div className="bg-success-bg text-success mb-5 grid h-16 w-16 place-items-center rounded-full">
        <BadgeCheck className="h-7 w-7" strokeWidth={1.6} aria-hidden="true" />
      </div>
      <h2 className="font-display mb-3 text-[28px] leading-[1.12] font-medium tracking-[-0.015em]">
        You&rsquo;re in.
      </h2>
      <p className="text-ink-soft mb-7 max-w-[360px] text-[14.5px] leading-[1.55]">
        Email verified and your account is live. Next step on your
        dashboard: the English test — your first attempt is free.
      </p>
      <Link
        href="/candidate/dashboard?state=fresh"
        className="btn btn-primary btn-lg group w-full justify-center"
      >
        <span>Go to your dashboard</span>
        <ArrowRight
          className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5"
          strokeWidth={1.6}
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}

/* ============================================================
   Local helpers — one-off compositions, not shared primitives.
   ============================================================ */

function FieldLabel({ htmlFor, label }: { htmlFor: string; label: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-ink-soft mb-2 flex items-center justify-between text-[13px] font-medium"
    >
      <span>{label}</span>
      <span className="text-ink-mute font-mono text-[10px] tracking-[0.1em] uppercase">
        Required
      </span>
    </label>
  );
}

function FieldError({ message }: { message?: string | undefined }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-danger mt-1.5 text-[12.5px] leading-[1.4]">
      {message}
    </p>
  );
}

function FormBanner({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "bg-danger-bg text-danger mb-5 rounded-md px-3.5 py-3 text-[13px] leading-[1.5]",
        className,
      )}
    >
      {message}
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

function SubmitButton({
  label,
  pendingLabel,
  pending,
}: {
  label: string;
  pendingLabel: string;
  pending: boolean;
}) {
  // Inert until React is attached — otherwise a click or Enter before
  // hydration submits the form natively as a GET with the password in the URL.
  const hydrated = useHydrated();

  return (
    <button
      type="submit"
      disabled={pending || !hydrated}
      className="btn btn-primary btn-lg group mt-auto w-full justify-center disabled:opacity-70"
    >
      <span>{pending ? pendingLabel : label}</span>
      {pending ? (
        <Loader2
          className="h-[18px] w-[18px] animate-spin"
          strokeWidth={1.6}
          aria-hidden="true"
        />
      ) : (
        <ArrowRight
          className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5"
          strokeWidth={1.6}
          aria-hidden="true"
        />
      )}
    </button>
  );
}
