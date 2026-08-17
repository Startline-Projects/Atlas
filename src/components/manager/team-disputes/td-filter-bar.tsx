"use client";

/**
 * TdFilterBar — 6 single-select filter chips.
 *
 * Active chip is solid-filled. SLA-risk chip gets danger tint
 * (active or not) — the urgency signal. Each chip shows a count
 * derived from the disputes list.
 *
 * Filter semantics (Step 7 Q2):
 *   - all        → every dispute
 *   - sla-risk   → slaBand === "urgent"
 *   - contested  → initiator === "both"
 *   - first      → isFirstForOwner === true
 *   - escalation → status === "escalated"
 *   - mine       → isOwnedByManager(d)
 *
 * Ported from prototype lines 29197-29204.
 */

import {
  type Dispute,
  isOwnedByManager,
  slaBand,
} from "@/lib/mock-data/manager/manager-team-disputes-data";
import { cn } from "@/lib/utils/cn";

export type FilterKey =
  | "all"
  | "sla-risk"
  | "contested"
  | "first"
  | "escalation"
  | "mine";

const ALL_FILTERS: ReadonlyArray<FilterKey> = [
  "all",
  "sla-risk",
  "contested",
  "first",
  "escalation",
  "mine",
];

/** Type-guard for deep-link parsing in the orchestrator. */
export function isFilterKey(raw: string): raw is FilterKey {
  return (ALL_FILTERS as ReadonlyArray<string>).includes(raw);
}

/** Predicate used by both `TdDisputeList` (filtering rows) and
 *  this component (counting). Exported so the filter shape lives
 *  in one place. */
export function matchesFilter(d: Dispute, filter: FilterKey): boolean {
  switch (filter) {
    case "all": return true;
    case "sla-risk": return slaBand(d) === "urgent";
    case "contested": return d.initiator === "both";
    case "first": return d.isFirstForOwner === true;
    case "escalation": return d.status === "escalated";
    case "mine": return isOwnedByManager(d);
  }
}

const CHIP_DEFS: ReadonlyArray<{
  key: FilterKey;
  label: string;
  danger?: boolean;
}> = [
  { key: "all", label: "All open" },
  { key: "sla-risk", label: "⚠ SLA at risk", danger: true },
  { key: "contested", label: "Disputed by both" },
  { key: "first", label: "Specialist's first" },
  { key: "escalation", label: "Escalation requested" },
  { key: "mine", label: "Owned by me" },
];

type TdFilterBarProps = {
  disputes: ReadonlyArray<Dispute>;
  activeFilter: FilterKey;
  onFilterChange: (next: FilterKey) => void;
};

export function TdFilterBar({
  disputes,
  activeFilter,
  onFilterChange,
}: TdFilterBarProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter disputes"
      className="mb-4 flex flex-wrap gap-2"
    >
      {CHIP_DEFS.map((def) => {
        const count = disputes.filter((d) => matchesFilter(d, def.key)).length;
        const isActive = def.key === activeFilter;
        return (
          <button
            key={def.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onFilterChange(def.key)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors",
              isActive
                ? def.danger
                  ? "bg-danger text-paper border-danger"
                  : "bg-ink text-paper border-ink"
                : def.danger
                  ? "border-danger/30 text-danger bg-danger-bg/30 hover:bg-danger-bg/50"
                  : "border-line text-ink-soft bg-paper hover:bg-cream-deep hover:text-ink",
            )}
          >
            <span>{def.label}</span>
            <span
              className={cn(
                "rounded-full px-1.5 py-px font-mono text-[10px] font-semibold",
                isActive
                  ? "bg-paper/20 text-paper"
                  : def.danger
                    ? "bg-danger/15 text-danger"
                    : "bg-cream-deep text-ink-soft",
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
