"use client";

import { cn } from "@/lib/utils/cn";

export type CohortTone = "default" | "attention" | "danger";

export type CohortDef = {
  key: string;
  label: string;
  tone?: CohortTone | undefined;
};

type RosterCohortsProps = {
  cohorts: ReadonlyArray<CohortDef>;
  /** Per-key counts — derived by the page. */
  counts: Record<string, number>;
  active: string;
  onChange: (key: string) => void;
};

const TONE_COUNT_DEFAULT: Record<CohortTone, string> = {
  default: "bg-cream-deep text-ink-mute",
  attention: "bg-amber/14 text-amber",
  danger: "bg-danger-bg text-danger",
};

export function RosterCohorts({
  cohorts,
  counts,
  active,
  onChange,
}: RosterCohortsProps) {
  return (
    <div
      role="tablist"
      className="border-line-soft bg-cream sticky top-[calc(36px+57px)] z-[7] flex gap-2 overflow-x-auto border-b px-6 py-3.5 sm:px-10 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
    >
      {cohorts.map((c) => {
        const isActive = active === c.key;
        const tone = c.tone ?? "default";
        const count = counts[c.key] ?? 0;
        return (
          <button
            key={c.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(c.key)}
            className={cn(
              "inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-paper px-3.5 py-1.5 text-[12.5px] font-medium whitespace-nowrap transition-colors",
              isActive
                ? "bg-ink text-paper border-ink"
                : "text-ink-soft hover:bg-cream-deep hover:border-ink-mute",
            )}
          >
            {c.label}
            <span
              className={cn(
                "rounded-full px-[7px] py-px font-mono text-[10px] font-medium tracking-[0.04em]",
                isActive
                  ? "bg-paper/14 text-paper"
                  : TONE_COUNT_DEFAULT[tone],
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
