"use client";

import { ArrowLeft, ArrowRight, BadgeCheck, Briefcase, Eye, EyeOff, MailCheck } from "lucide-react";
import { useId, useMemo, useState } from "react";
import Link from "next/link";

import {
  FieldError,
  FieldLabel,
  FormBanner,
  InfoNote,
  inputClass,
} from "@/components/ui/form/field";
import { OtpGroup } from "@/components/ui/form/otp-group";
import { SubmitButton } from "@/components/ui/form/submit-button";
import { ApiClientError, clientsApi } from "@/lib/api-client";
// Leaf modules, not the `@/lib/auth` barrel — that one reaches `next/headers`.
import { CLIENT_HOME_PATH, CLIENT_SIGNIN_PATH } from "@/lib/auth/redirects";
import { TEAM_SIZES } from "@/lib/domain/client";
import { countryOptions } from "@/lib/domain/countries";
// Imported from the module, not the barrel: the barrel reaches `next/server`.
import { fieldsFromZod } from "@/lib/errors/zod-fields";
import { clientSignupSchema } from "@/lib/validators/client";

type SignupState = "account" | "verify" | "done";

type FieldErrors = Record<string, string>;

/**
 * Client signup: account + company → email verify → done.
 *
 * Validates with `clientSignupSchema` before calling the API (same rules as
 * the server; the server re-validates regardless). Once verified, the form
 * signs the client in on the spot so "Post your first job" lands on the
 * guarded surface. The password stays in component memory only for the
 * seconds between the account step and that sign-in call.
 */
export function ClientSignupForm() {
  const [state, setState] = useState<SignupState>("account");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [signedIn, setSignedIn] = useState(false);

  const signInThenFinish = async (creds: { email: string; password: string }) => {
    try {
      await clientsApi.login(creds);
      setSignedIn(true);
    } catch {
      // Not fatal: the account exists and is verified; the CTA routes
      // through sign-in instead.
      setSignedIn(false);
    }
    setState("done");
  };

  return state === "account" ? (
    <AccountState
      onSignedUp={(email, password, needsVerification) => {
        const creds = { email, password };
        setCredentials(creds);
        if (needsVerification) setState("verify");
        else void signInThenFinish(creds);
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
   STATE: account — contact + company + credentials + terms
   ============================================================ */

function AccountState({
  onSignedUp,
}: {
  onSignedUp: (email: string, password: string, requiresEmailVerification: boolean) => void;
}) {
  const nameId = useId();
  const companyId = useId();
  const countryId = useId();
  const sizeId = useId();
  const emailId = useId();
  const pwdId = useId();
  const termsId = useId();

  const countries = useMemo(() => countryOptions(), []);

  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;

    const form = new FormData(e.currentTarget);
    const parsed = clientSignupSchema.safeParse({
      contactName: String(form.get("contactName") ?? ""),
      companyName: String(form.get("companyName") ?? ""),
      countryCode: String(form.get("countryCode") ?? ""),
      teamSize: String(form.get("teamSize") ?? ""),
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
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
      const result = await clientsApi.signup(parsed.data);
      onSignedUp(parsed.data.email, parsed.data.password, result.requiresEmailVerification);
    } catch (error) {
      if (error instanceof ApiClientError) {
        setFieldErrors(error.fields);
        setFormError(Object.keys(error.fields).length > 0 ? null : error.message);
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
        <FieldLabel htmlFor={nameId} label="Your name" />
        <input
          id={nameId}
          name="contactName"
          type="text"
          required
          disabled={pending}
          autoComplete="name"
          placeholder="First and last name"
          aria-invalid={Boolean(fieldErrors.contactName)}
          className={inputClass(Boolean(fieldErrors.contactName))}
        />
        <FieldError message={fieldErrors.contactName} />
      </div>

      <div className="mb-5">
        <FieldLabel htmlFor={companyId} label="Company" />
        <input
          id={companyId}
          name="companyName"
          type="text"
          required
          disabled={pending}
          autoComplete="organization"
          placeholder="Company or brand name"
          aria-invalid={Boolean(fieldErrors.companyName)}
          className={inputClass(Boolean(fieldErrors.companyName))}
        />
        <FieldError message={fieldErrors.companyName} />
      </div>

      <div className="mb-5 grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor={countryId} label="Country" />
          <select
            id={countryId}
            name="countryCode"
            required
            disabled={pending}
            defaultValue=""
            autoComplete="country"
            aria-invalid={Boolean(fieldErrors.countryCode)}
            className={inputClass(Boolean(fieldErrors.countryCode), "appearance-none")}
          >
            <option value="" disabled>
              Where you&rsquo;re based
            </option>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
          <FieldError message={fieldErrors.countryCode} />
        </div>

        <div>
          <FieldLabel htmlFor={sizeId} label="Team size" />
          <select
            id={sizeId}
            name="teamSize"
            required
            disabled={pending}
            defaultValue=""
            aria-invalid={Boolean(fieldErrors.teamSize)}
            className={inputClass(Boolean(fieldErrors.teamSize), "appearance-none")}
          >
            <option value="" disabled>
              How many people
            </option>
            {TEAM_SIZES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <FieldError message={fieldErrors.teamSize} />
        </div>
      </div>

      <div className="mb-5">
        <FieldLabel htmlFor={emailId} label="Work email" />
        <input
          id={emailId}
          name="email"
          type="email"
          required
          disabled={pending}
          autoComplete="email"
          placeholder="you@company.com"
          aria-invalid={Boolean(fieldErrors.email)}
          className={inputClass(Boolean(fieldErrors.email))}
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
            className={inputClass(Boolean(fieldErrors.password), "pr-12")}
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
        icon={<Briefcase className="h-4 w-4" strokeWidth={1.6} />}
        title="Posting is free."
        body="No subscription, no setup fees. Post a role, hear from vetted candidates, and pay only when you hire."
      />

      <SubmitButton label="Create account" pendingLabel="Creating your account" pending={pending} />

      <p className="text-ink-mute mt-4 text-center text-[13px]">
        Already hiring on Atlas?{" "}
        <Link
          href={CLIENT_SIGNIN_PATH}
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
  const [resendState, setResendState] = useState<"idle" | "sending" | "sent">("idle");

  const handleCode = async (token: string) => {
    if (pending) return false;
    setPending(true);
    setError(null);
    try {
      await clientsApi.verifyEmail({ email, token });
      await onVerified();
      return true;
    } catch (err) {
      setError(
        err instanceof ApiClientError ? err.message : "Something went wrong. Please try again.",
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
      await clientsApi.resendVerification(email);
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
          We sent a 6-digit code to <strong className="text-ink font-medium">{email}</strong>.
          Enter it below to verify your address.
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
  const target = `${CLIENT_HOME_PATH}?state=fresh`;
  // Signed in: a hard navigation so the server-rendered surface reads the
  // fresh cookie. Otherwise go through sign-in, which returns here afterwards.
  const href = signedIn
    ? target
    : `${CLIENT_SIGNIN_PATH}?next=${encodeURIComponent(target)}`;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-2 py-1 text-center">
      <div className="bg-success-bg text-success mb-5 grid h-16 w-16 place-items-center rounded-full">
        <BadgeCheck className="h-7 w-7" strokeWidth={1.6} aria-hidden="true" />
      </div>
      <h2 className="font-display mb-3 text-[28px] leading-[1.12] font-medium tracking-[-0.015em]">
        You&rsquo;re set up.
      </h2>
      <p className="text-ink-soft mb-7 max-w-[360px] text-[14.5px] leading-[1.55]">
        Email verified and your company account is live. Post your first role and vetted
        candidates can start applying.
      </p>
      <a href={href} className="btn btn-primary btn-lg group w-full justify-center">
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
