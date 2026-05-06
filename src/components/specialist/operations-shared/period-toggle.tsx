"use client";

/**
 * Period toggle — pill-row with active-state highlight. Used by:
 *
 *   - pool-health (7d / 30d / 90d / All) — drives the analytic period
 *   - daily-activity (Today / 7 days / 30 days) — drives the feed range
 *
 * Generic over the option key so each consumer's enum is preserved at
 * the call site. The component is controlled — parent owns the active
 * key + change handler.
 *
 * Per source CSS `.ph-period-toggle` and `.act-period-toggle` —
 * character-for-character identical: paper bg + line border + 8px
 * radius + 3px inner padding; active button gets ink bg + paper text;
 * inactive buttons hover-darken.
 */

import { cn } from "@/lib/utils/cn";

export type PeriodOption<K extends string = string> = {
  key: K;
  label: string;
};

export function PeriodToggle<K extends string>({
  options,
  active,
  onChange,
  ariaLabel = "Period",
}: {
  options: ReadonlyArray<PeriodOption<K>>;
  active: K;
  onChange: (next: K) => void;
  ariaLabel?: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="bg-paper border-line inline-flex gap-0 rounded-lg border p-[3px]"
    >
      {options.map((o) => {
        const isActive = active === o.key;
        return (
          <button
            key={o.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(o.key)}
            className={cn(
              "rounded-[5px] border-none bg-transparent px-2.5 py-1 font-body text-[11.5px] transition-colors",
              isActive
                ? "bg-ink text-paper"
                : "text-ink-mute hover:text-ink-soft",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
