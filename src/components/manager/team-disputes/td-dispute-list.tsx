"use client";

/**
 * TdDisputeList — toolbar (meta + sort) + filtered+sorted rows +
 * empty state.
 *
 * Sort (Step 7 Q3): default "sla" — slaHours ascending, severity
 * desc tiebreak, ageHours desc tiebreak. Escalated rows treated as
 * "to admin" sla bucket — sorted by their slaHours value normally.
 *
 * Empty state (Q7): renders prototype message with reset button
 * (resets filter to "all"). Ported from prototype lines 29613-29618.
 */

import { type Dispute, type DisputeId } from "@/lib/mock-data/manager/manager-team-disputes-data";
import { matchesFilter, type FilterKey } from "./td-filter-bar";
import { TdDisputeRow } from "./td-dispute-row";

export type SortKey = "sla" | "oldest" | "newest" | "specialist" | "severity";

const SORT_OPTIONS: ReadonlyArray<{ value: SortKey; label: string }> = [
  { value: "sla", label: "Sort: SLA urgency" },
  { value: "oldest", label: "Sort: Oldest first" },
  { value: "newest", label: "Sort: Newest" },
  { value: "specialist", label: "Sort: By Specialist" },
  { value: "severity", label: "Sort: By severity" },
];

const FILTER_META: Record<FilterKey, string> = {
  "all": "all open across team",
  "sla-risk": "at SLA risk · within next 24h",
  "contested": "contested · disputed by both parties",
  "first": "Specialist's first dispute",
  "escalation": "escalation requested · awaiting Admin",
  "mine": "owned by you",
};

type TdDisputeListProps = {
  disputes: ReadonlyArray<Dispute>;
  activeFilter: FilterKey;
  sort: SortKey;
  onSortChange: (next: SortKey) => void;
  expandedRowId: DisputeId | null;
  onRowToggle: (id: DisputeId) => void;
  onFilterReset: () => void;
};

export function TdDisputeList({
  disputes,
  activeFilter,
  sort,
  onSortChange,
  expandedRowId,
  onRowToggle,
  onFilterReset,
}: TdDisputeListProps) {
  const filtered = disputes.filter((d) => matchesFilter(d, activeFilter));
  const sorted = sortDisputes(filtered, sort);
  const filterCaption = FILTER_META[activeFilter];

  return (
    <section className="mb-8">
      <header className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="text-ink-soft text-[12.5px]">
          <strong className="text-ink">{sorted.length}</strong> dispute
          {sorted.length === 1 ? "" : "s"} · {filterCaption}
        </div>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortKey)}
          aria-label="Sort"
          className="bg-paper border-line text-ink hover:border-ink-soft cursor-pointer rounded-md border px-3 py-2 text-[12.5px] transition-colors"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </header>

      {sorted.length === 0 ? (
        <EmptyState onReset={onFilterReset} />
      ) : (
        <div className="flex flex-col gap-2">
          {sorted.map((d) => (
            <TdDisputeRow
              key={d.id}
              dispute={d}
              isExpanded={expandedRowId === d.id}
              onToggle={() => onRowToggle(d.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

/* ============================================================
   Sort pipeline
   ============================================================ */

function sortDisputes(
  disputes: ReadonlyArray<Dispute>,
  sort: SortKey,
): ReadonlyArray<Dispute> {
  const arr = [...disputes];
  switch (sort) {
    case "sla":
      arr.sort((a, b) => {
        if (a.slaHours !== b.slaHours) return a.slaHours - b.slaHours;
        if (a.severity !== b.severity) return b.severity - a.severity;
        return b.ageHours - a.ageHours;
      });
      break;
    case "oldest":
      arr.sort((a, b) => b.ageHours - a.ageHours);
      break;
    case "newest":
      arr.sort((a, b) => a.ageHours - b.ageHours);
      break;
    case "specialist":
      arr.sort((a, b) =>
        a.ownerSpecialistId.localeCompare(b.ownerSpecialistId),
      );
      break;
    case "severity":
      arr.sort((a, b) => {
        if (a.severity !== b.severity) return b.severity - a.severity;
        return a.slaHours - b.slaHours;
      });
      break;
  }
  return arr;
}

/* ============================================================
   Empty state
   ============================================================ */

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="border-line bg-paper flex flex-col items-center justify-center gap-3 rounded-md border border-dashed p-10 text-center">
      <h4 className="font-display text-ink text-[16px] font-medium m-0">
        No disputes match this filter
      </h4>
      <p className="text-ink-mute m-0 text-[12.5px]">
        Try a different filter or clear the current selection.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="bg-ink text-paper hover:bg-ink-soft border-ink mt-1 inline-flex items-center rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors"
      >
        Show all open
      </button>
    </div>
  );
}
