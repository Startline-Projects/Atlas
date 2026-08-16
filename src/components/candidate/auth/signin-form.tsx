"use client";

import { ArrowRight, Eye, EyeOff, Loader2, Sparkles } from "lucide-react";
import { useId, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useHydrated } from "@/hooks/use-hydrated";
import { ApiClientError, candidatesApi } from "@/lib/api-client";
// Imported from the module, not the barrel: the barrel reaches `next/server`,
// which must not be pulled into a client bundle.
import { fieldsFromZod } from "@/lib/errors/zod-fields";
import { cn } from "@/lib/utils/cn";
import { loginSchema } from "@/lib/validators/candidate";

const FIELD_INPUT_CLASS =
  "w-full rounded-md border border-line bg-[#FFFDF7] px-3.5 py-3 text-[15px] text-ink transition-[border-color,box-shadow,background] outline-none placeholder:text-ink-mute placeholder:opacity-70 hover:not-disabled:not-focus:border-[#C4BCA9] focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,14,12,0.08)] disabled:bg-cream-deep disabled:text-ink-mute disabled:opacity-70";

const FIELD_INPUT_ERROR_CLASS =
  "border-danger focus:border-danger focus:shadow-[0_0_0_3px_rgba(194,65,43,0.12)]";

/** Only same-origin paths are honoured, so `?next=` cannot bounce off-site. */
function safeNext(raw: string | null): string {
  if (raw && raw.startsWith("/") && !raw.startsWith("//")) return raw;
  return "/candidate/dashboard";
}

/**
 * Candidate sign-in. Validates with `loginSchema` first (same rules as the
 * server), then calls the login endpoint, which sets the session cookie. On
 * success we hard-navigate so the server-rendered surface picks up the cookie.
 */
export function SigninForm() {
  const searchParams = useSearchParams();
  const emailId = useId();
  const pwdId = useId();

  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  // Inert until React is attached — see useHydrated.
  const hydrated = useHydrated();
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;

    const form = new FormData(e.currentTarget);
    const parsed = loginSchema.safeParse({
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
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
      await candidatesApi.login(parsed.data);
      window.location.assign(safeNext(searchParams.get("next")));
    } catch (error) {
      if (error instanceof ApiClientError) {
        setFieldErrors(error.fields);
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
      {formError && (
        <div
          role="alert"
          className="bg-danger-bg text-danger mb-5 rounded-md px-3.5 py-3 text-[13px] leading-[1.5]"
        >
          {formError}
        </div>
      )}

      <div className="mb-5">
        <label
          htmlFor={emailId}
          className="text-ink-soft mb-2 flex items-center justify-between text-[13px] font-medium"
        >
          <span>Email</span>
          <span className="text-ink-mute font-mono text-[10px] tracking-[0.1em] uppercase">
            Required
          </span>
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          disabled={pending}
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={Boolean(fieldErrors.email)}
          className={cn(FIELD_INPUT_CLASS, fieldErrors.email && FIELD_INPUT_ERROR_CLASS)}
        />
        {fieldErrors.email && (
          <p role="alert" className="text-danger mt-1.5 text-[12.5px] leading-[1.4]">
            {fieldErrors.email}
          </p>
        )}
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
            name="password"
            type={showPassword ? "text" : "password"}
            required
            disabled={pending}
            autoComplete="current-password"
            placeholder="Enter your password"
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
        {fieldErrors.password && (
          <p role="alert" className="text-danger mt-1.5 text-[12.5px] leading-[1.4]">
            {fieldErrors.password}
          </p>
        )}
      </div>

      <div className="bg-cream border-line-soft text-ink-soft mb-5 flex items-start gap-2.5 rounded-md border px-3.5 py-3 text-[12.5px] leading-[1.5]">
        <span aria-hidden="true" className="text-ink mt-0.5 flex-shrink-0">
          <Sparkles className="h-4 w-4" strokeWidth={1.6} />
        </span>
        <div>
          <strong className="text-ink font-semibold">
            Your results are saved.
          </strong>{" "}
          Pass or fail, your English-test result stays on your dashboard —
          sign back in any time to see it or book a retake.
        </div>
      </div>

      <button
        type="submit"
        disabled={pending || !hydrated}
        className="btn btn-primary btn-lg group mt-auto w-full justify-center disabled:opacity-70"
      >
        <span>{pending ? "Signing in" : "Sign in"}</span>
        {pending ? (
          <Loader2 className="h-[18px] w-[18px] animate-spin" strokeWidth={1.6} aria-hidden="true" />
        ) : (
          <ArrowRight
            className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        )}
      </button>

      <p className="text-ink-mute mt-4 text-center text-[13px]">
        New to Atlas?{" "}
        <Link
          href="/candidate/signup"
          className="text-ink border-line hover:border-ink border-b pb-px font-medium transition-colors"
        >
          Apply to join
        </Link>
      </p>
    </form>
  );
}
