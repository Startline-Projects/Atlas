"use client";

import { ArrowRight, Loader2 } from "lucide-react";

import { useHydrated } from "@/hooks/use-hydrated";
import { cn } from "@/lib/utils/cn";

/**
 * Primary submit button with the pending spinner. Inert until React is
 * attached — otherwise a click or Enter before hydration submits the form
 * natively as a GET with the fields (password included) in the URL.
 */
export function SubmitButton({
  label,
  pendingLabel,
  pending,
  className,
}: {
  label: string;
  pendingLabel: string;
  pending: boolean;
  className?: string;
}) {
  const hydrated = useHydrated();

  return (
    <button
      type="submit"
      disabled={pending || !hydrated}
      className={cn(
        "btn btn-primary btn-lg group mt-auto w-full justify-center disabled:opacity-70",
        className,
      )}
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
