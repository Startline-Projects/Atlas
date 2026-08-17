"use client";

import { ArrowLeft, ArrowRight, BadgeCheck, Eye, EyeOff, Gift, MailCheck } from "lucide-react";
import { useId, useState } from "react";
import Link from "next/link";

import {
  FIELD_INPUT_CLASS,
  FIELD_INPUT_ERROR_CLASS,
  FieldError,
  FieldLabel,
  FormBanner,
  InfoNote,
} from "@/components/ui/form/field";
import { OtpGroup } from "@/components/ui/form/otp-group";
import { SubmitButton } from "@/components/ui/form/submit-button";
import { cn } from "@/lib/utils/cn";
import { ENGLISH_TEST } from "@/lib/domain/english-test";
import { ApiClientError, candidatesApi } from "@/lib/api-client";
import { ROLE_CATEGORIES } from "@/lib/domain/candidate";
// Imported from the module, not the barrel: the barrel reaches `next/server`,
// which must not be pulled into a client bundle.
import { fieldsFromZod } from "@/lib/errors/zod-fields";
import { signupSchema } from "@/lib/validators/candidate";

type SignupState = "account" | "verify" | "done";

type FieldErrors = Record<string, string>;

/**
 * Candidate signup: account → email verify → done.
 *
 * The account step validates with `signupSchema` before it calls the API, so
 * the browser and the server apply the same rules and an obvious mistake costs
 * no round trip. The server re-validates regardless — this is a convenience,
 * never a gate.
 *
 * Once the address is verified the form signs the candidate in on the spot,
 * so "Go to your dashboard" lands on the (guarded) dashboard instead of the
 * sign-in page. The password never leaves component memory: it is kept only
 * for the seconds between the account step and that sign-in call.
 */
export function SignupForm() {
  const [state, setState] = useState<SignupState>("account");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [signedIn, setSignedIn] = useState(false);

  // Takes the credentials explicitly rather than reading state: the
  // no-verification path calls this in the same tick as `setCredentials`.
  const signInThenFinish = async (creds: { email: string; password: string }) => {
    try {
      await candidatesApi.login(creds);
      setSignedIn(true);
    } catch {
      // Not fatal: the account exists and is verified. The dashboard link
      // will route through sign-in instead.
      setSignedIn(false);
    }
    setState("done");
  };

  return state === "account" ? (
    <AccountState
      onSignedUp={(signedUpEmail, password, needsVerification) => {
        const creds = { email: signedUpEmail, password };
        setCredentials(creds);
        if (needsVerification) {
          setState("verify");
        } else {
          void signInThenFinish(creds);
        }
      }}
    />
  ) : state === "verify" ? (
    <VerifyState
      email={credentials.email}
      onBack={() => setState("account")}
      onVerified={() => signInThenFinish(credentials)}
    />
  ) : (
    <DoneState signedIn={signedIn} />
  );
}

/* ============================================================
   STATE: account — name + email + password + category + terms
   ============================================================ */

function AccountState({
  onSignedUp,
}: {
  onSignedUp: (
    email: string,
    password: string,
    requiresEmailVerification: boolean,
  ) => void;
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
      onSignedUp(
        parsed.data.email,
        parsed.data.password,
        result.requiresEmailVerification,
      );
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
  onVerified: () => Promise<void>;
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
      // Stays "pending" through the sign-in that follows: the parent swaps
      // this state out for the done screen when it resolves.
      await onVerified();
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

/* ============================================================
   STATE: done — verified, hand off to the dashboard
   ============================================================ */

function DoneState({ signedIn }: { signedIn: boolean }) {
  // Signed in: a hard navigation so the server-rendered surface reads the
  // fresh cookie. Not signed in (the auto sign-in failed): go through the
  // sign-in page, which returns here afterwards.
  const href = signedIn
    ? "/candidate/dashboard?state=fresh"
    : "/candidate/signin?next=%2Fcandidate%2Fdashboard%3Fstate%3Dfresh";

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
      <a
        href={href}
        className="btn btn-primary btn-lg group w-full justify-center"
      >
        <span>{signedIn ? "Go to your dashboard" : "Sign in to continue"}</span>
        <ArrowRight
          className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5"
          strokeWidth={1.6}
          aria-hidden="true"
        />
      </a>
    </div>
  );
}

