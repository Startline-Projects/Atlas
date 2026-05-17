"use client";

/**
 * SdTabs — 7-tab navigation strip for Specialist Detail.
 *
 * Controlled by the orchestrator (SpecialistDetailApp). Receives
 * active key + setter via props.
 *
 * Tab order locked per prototype lines 27831-27839:
 *   Overview · Performance · Workload · Daily Activity · Coaching
 *   Notes · Communication · Their Work
 */

import { cn } from "@/lib/utils/cn";

export type SdTabKey =
  | "overview"
  | "performance"
  | "workload"
  | "daily"
  | "coaching"
  | "communication"
  | "work";

const TABS: ReadonlyArray<{ key: SdTabKey; label: string }> = [
  { key: "overview", label: "Overview" },
  { key: "performance", label: "Performance" },
  { key: "workload", label: "Workload" },
  { key: "daily", label: "Daily Activity" },
  { key: "coaching", label: "Coaching Notes" },
  { key: "communication", label: "Communication" },
  { key: "work", label: "Their Work" },
];

export function SdTabs({
  active,
  onChange,
}: {
  active: SdTabKey;
  onChange: (next: SdTabKey) => void;
}) {
  return (
    <nav
      aria-label="Specialist sections"
      className="border-line-soft mb-6 flex gap-1 overflow-x-auto border-b"
    >
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.key)}
            className={cn(
              "relative flex-shrink-0 px-3 py-2.5 text-[13px] font-medium whitespace-nowrap transition-colors",
              isActive
                ? "text-ink"
                : "text-ink-mute hover:text-ink",
            )}
          >
            {tab.label}
            {isActive ? (
              <span
                aria-hidden="true"
                className="bg-ink absolute right-0 -bottom-px left-0 h-[2px]"
              />
            ) : null}
          </button>
        );
      })}
    </nav>
  );
}
