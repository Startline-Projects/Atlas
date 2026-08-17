"use client";

import { Eye, EyeOff, Users } from "lucide-react";
import { useId, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { FieldError, FieldLabel, FormBanner, inputClass } from "@/components/ui/form/field";
import { SubmitButton } from "@/components/ui/form/submit-button";
import { ApiClientError, clientsApi } from "@/lib/api-client";
// Leaf module, not the `@/lib/auth` barrel — that one reaches `next/headers`.
import { CLIENT_HOME_PATH, safeNextPath } from "@/lib/auth/redirects";
// Imported from the module, not the barrel: the barrel reaches `next/server`.
import { fieldsFromZod } from "@/lib/errors/zod-fields";
import { clientLoginSchema } from "@/lib/validators/client";

/**
 * Client sign-in. Validates with `clientLoginSchema` first (same rules as the
 * server), then calls the login endpoint, which sets the session cookies. On
 * success we hard-navigate so the server-rendered surface picks up the cookie.
 */
export function ClientSigninForm() {
  const searchParams = useSearchParams();
  const emailId = useId();
  const pwdId = useId();

  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;

    const form = new FormData(e.currentTarget);
    const parsed = clientLoginSchema.safeParse({
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
      await clientsApi.login(parsed.data);
      window.location.assign(safeNextPath(searchParams.get("next"), CLIENT_HOME_PATH));
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
            autoComplete="current-password"
            placeholder="Enter your password"
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

      <div className="bg-cream border-line-soft text-ink-soft mb-5 flex items-start gap-2.5 rounded-md border px-3.5 py-3 text-[12.5px] leading-[1.5]">
        <span aria-hidden="true" className="text-ink mt-0.5 flex-shrink-0">
          <Users className="h-4 w-4" strokeWidth={1.6} />
        </span>
        <div>
          <strong className="text-ink font-semibold">Your roles are waiting.</strong> Sign in to
          see who applied, post a new role, or close one you have filled.
        </div>
      </div>

      <SubmitButton label="Sign in" pendingLabel="Signing in" pending={pending} />

      <p className="text-ink-mute mt-4 text-center text-[13px]">
        New to Atlas?{" "}
        <Link
          href="/client/signup"
          className="text-ink border-line hover:border-ink border-b pb-px font-medium transition-colors"
        >
          Create a company account
        </Link>
      </p>
    </form>
  );
}
