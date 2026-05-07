"use client";

import { cn } from "@/lib/utils/cn";

type RejectReasonChipsProps = {
  /** Chip definitions — `key` is the stable id, `label` is the display text. */
  options: ReadonlyArray<{ key: string; label: string }>;
  /** Currently-selected key (empty string when none). */
  value: string;
  onChange: (key: string) => void;
  ariaLabel?: string;
};

export function RejectReasonChips({
  options,
  value,
  onChange,
  ariaLabel,
}: RejectReasonChipsProps) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className="flex flex-wrap gap-1.5"
    >
      {options.map((opt) => {
        const isActive = value === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(opt.key)}
            className={cn(
              "border-line bg-paper text-ink-soft hover:border-ink rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors",
              isActive && "bg-ink text-paper border-ink hover:text-paper",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
