"use client";

/**
 * Toggle primitive — track + thumb pattern matching source CSS
 * `.set-toggle`. Controlled: parent owns `checked` and `onChange`.
 *
 * Page-specific to settings/ for now (one consumer). Don't promote
 * until a 2nd consumer appears.
 *
 * Per source CSS:
 *   - Track: 32×18px, cream-deep bg (off) / ink bg (on)
 *   - Thumb: 14×14px circle, paper bg, slides 14px on
 *   - Disabled: 0.5 opacity, no cursor
 *
 * Client Component (input element).
 */

import { cn } from "@/lib/utils/cn";

export function SettingsToggle({
  checked,
  onChange,
  disabled = false,
  ariaLabel,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  ariaLabel: string;
}) {
  return (
    <label
      className={cn(
        "relative inline-flex h-[18px] w-8 flex-shrink-0 cursor-pointer items-center rounded-full transition-colors",
        checked ? "bg-ink" : "bg-cream-deep",
        disabled && "cursor-not-allowed opacity-50",
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-0.5 inline-block h-3.5 w-3.5 rounded-full bg-paper shadow-sm transition-transform",
          checked ? "translate-x-[15px]" : "translate-x-0.5",
        )}
      />
    </label>
  );
}
