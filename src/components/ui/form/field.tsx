/**
 * Form field primitives shared by every surface's forms (candidate signup /
 * signin, client signup / signin, post-a-job …). Presentational only — no
 * state, no API calls — so they are safe in Client and Server Components.
 */
import { cn } from "@/lib/utils/cn";

/** Text-input look: cream field, ink focus ring, muted placeholder. */
export const FIELD_INPUT_CLASS =
  "w-full rounded-md border border-line bg-[#FFFDF7] px-3.5 py-3 text-[15px] text-ink transition-[border-color,box-shadow,background] outline-none placeholder:text-ink-mute placeholder:opacity-70 hover:not-disabled:not-focus:border-[#C4BCA9] focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,14,12,0.08)] disabled:bg-cream-deep disabled:text-ink-mute disabled:opacity-70";

export const FIELD_INPUT_ERROR_CLASS =
  "border-danger focus:border-danger focus:shadow-[0_0_0_3px_rgba(194,65,43,0.12)]";

/** `inputClass(hasError)` — the field class with the error ring toggled. */
export function inputClass(hasError: boolean, extra?: string): string {
  return cn(FIELD_INPUT_CLASS, hasError && FIELD_INPUT_ERROR_CLASS, extra);
}

export function FieldLabel({
  htmlFor,
  label,
  hint = "Required",
}: {
  htmlFor: string;
  label: string;
  /** Small mono tag on the right — "Required" by default, "Optional", or `null` for none. */
  hint?: string | null;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-ink-soft mb-2 flex items-center justify-between text-[13px] font-medium"
    >
      <span>{label}</span>
      {hint ? (
        <span className="text-ink-mute font-mono text-[10px] tracking-[0.1em] uppercase">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

export function FieldError({ message }: { message?: string | undefined }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-danger mt-1.5 text-[12.5px] leading-[1.4]">
      {message}
    </p>
  );
}

export function FormBanner({
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

export function InfoNote({
  title,
  body,
  icon,
  className,
}: {
  title: string;
  body: string;
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-cream border-line-soft text-ink-soft mt-[-2px] mb-5 flex items-start gap-2.5 rounded-md border px-3.5 py-3 text-[12.5px] leading-[1.5]",
        className,
      )}
    >
      <span aria-hidden="true" className="text-ink mt-0.5 flex-shrink-0">
        {icon}
      </span>
      <div>
        <strong className="text-ink font-semibold">{title}</strong> {body}
      </div>
    </div>
  );
}
