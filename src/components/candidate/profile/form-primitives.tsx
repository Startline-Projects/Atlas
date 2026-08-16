"use client";

import { Check, Loader2 } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

/**
 * Small form pieces shared by every profile-builder section. Same visual
 * language as the auth forms; kept here (not in `components/ui`) until a third
 * surface needs them.
 */

export const FIELD_INPUT_CLASS =
  "w-full rounded-md border border-line bg-[#FFFDF7] px-3.5 py-2.5 text-[14.5px] text-ink transition-[border-color,box-shadow,background] outline-none placeholder:text-ink-mute placeholder:opacity-70 hover:not-disabled:not-focus:border-[#C4BCA9] focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,14,12,0.08)] disabled:bg-cream-deep disabled:text-ink-mute disabled:opacity-70";

export const FIELD_INPUT_ERROR_CLASS =
  "border-danger focus:border-danger focus:shadow-[0_0_0_3px_rgba(194,65,43,0.12)]";

export function FieldLabel({
  htmlFor,
  label,
  hint,
}: {
  htmlFor: string;
  label: string;
  hint?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-ink-soft mb-1.5 flex items-center justify-between text-[13px] font-medium"
    >
      <span>{label}</span>
      {hint && (
        <span className="text-ink-mute font-mono text-[10px] tracking-[0.1em] uppercase">
          {hint}
        </span>
      )}
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

export function Field({
  id,
  label,
  hint,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string | undefined;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <FieldLabel htmlFor={id} label={label} {...(hint ? { hint } : {})} />
      {children}
      <FieldError message={error} />
    </div>
  );
}

export function inputClass(hasError: boolean, extra?: string) {
  return cn(FIELD_INPUT_CLASS, hasError && FIELD_INPUT_ERROR_CLASS, extra);
}

export function FormBanner({
  message,
  tone = "danger",
  className,
}: {
  message: string;
  tone?: "danger" | "success";
  className?: string;
}) {
  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      className={cn(
        "rounded-md px-3.5 py-3 text-[13px] leading-[1.5]",
        tone === "danger" ? "bg-danger-bg text-danger" : "bg-success-bg text-success",
        className,
      )}
    >
      {message}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section card                                                               */
/* -------------------------------------------------------------------------- */

export function SectionCard({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="bg-paper border-line shadow-card scroll-mt-24 rounded-xl border p-6 sm:rounded-[22px] sm:p-8"
    >
      <header className="mb-6">
        <div className="text-ink-mute mb-2 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
          {`// ${eyebrow}`}
        </div>
        <h2
          id={`${id}-title`}
          className="font-display text-ink text-[24px] leading-[1.15] font-medium tracking-[-0.01em]"
        >
          {title}
        </h2>
        {description && (
          <p className="text-ink-soft mt-2 max-w-[560px] text-[14px] leading-[1.55]">
            {description}
          </p>
        )}
      </header>
      {children}
    </section>
  );
}

/**
 * The footer every section ends with: an error/success line on the left, the
 * save button on the right. `saved` flips to true for a moment after a
 * successful write so the candidate sees it landed.
 */
export function SectionFooter({
  pending,
  saved,
  error,
  label = "Save",
  onSave,
  disabled,
  extra,
}: {
  pending: boolean;
  saved: boolean;
  error: string | null;
  label?: string;
  onSave: () => void;
  disabled?: boolean;
  extra?: ReactNode;
}) {
  return (
    <div className="border-line-soft mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-5">
      <div className="min-h-[20px] text-[13px]">
        {error ? (
          <span role="alert" className="text-danger">
            {error}
          </span>
        ) : saved ? (
          <span role="status" className="text-success inline-flex items-center gap-1.5">
            <Check className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            Saved
          </span>
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        {extra}
        <button
          type="button"
          onClick={onSave}
          disabled={pending || disabled}
          className="btn btn-primary inline-flex items-center gap-2 disabled:opacity-60"
        >
          {pending && (
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.8} aria-hidden="true" />
          )}
          {pending ? "Saving…" : label}
        </button>
      </div>
    </div>
  );
}

/** Small "+ Add …" affordance used under each list section. */
export function AddRowButton({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="btn btn-outline text-[13px] disabled:cursor-not-allowed disabled:opacity-50"
    >
      + {label}
    </button>
  );
}

export function RemoveRowButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-ink-mute hover:text-danger text-[12.5px] underline-offset-2 transition-colors hover:underline"
    >
      {label}
    </button>
  );
}

/** Wrapper for one editable row inside a list section. */
export function RowCard({ children }: { children: ReactNode }) {
  return (
    <div className="bg-cream/60 border-line-soft rounded-lg border p-4 sm:p-5">
      {children}
    </div>
  );
}
