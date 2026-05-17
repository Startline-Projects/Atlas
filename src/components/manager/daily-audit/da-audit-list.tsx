"use client";

/**
 * DaAuditList — toolbar (title + count + sort) + 11 rows sorted.
 *
 * Pure presentation; receives sort state + expansion state + setters
 * from the orchestrator. Renders one `<DaAuditRow>` per specialist.
 *
 * ## Sort semantics (Q10v lock)
 *
 *   - `status-priority` (DEFAULT) — Missed → Pending → Excused →
 *     Submitted; alphabetical within. Surfaces problems first.
 *   - `time` — Earliest submission time first. Un-submitted go to end
 *     (alphabetical within).
 *   - `name` — fullName A–Z.
 *   - `volume` — sum of todayActivity counts, high to low.
 */

import {
  type Specialist,
  type SpecialistId,
} from "@/lib/mock-data/manager/team";
import { DaAuditRow } from "./da-audit-row";

export type SortKey = "status-priority" | "time" | "name" | "volume";

export type DateRange = "today" | "yesterday" | "7d" | "30d";

const SORT_OPTIONS: ReadonlyArray<{ value: SortKey; label: string }> = [
  { value: "status-priority", label: "Sort: Status priority" },
  { value: "time", label: "Sort: Submission time" },
  { value: "name", label: "Sort: Name (A–Z)" },
  { value: "volume", label: "Sort: Activity volume (high)" },
];

type DaAuditListProps = {
  specialists: ReadonlyArray<Specialist>;
  sort: SortKey;
  onSortChange: (next: SortKey) => void;
  expandedRowId: SpecialistId | null;
  onRowToggle: (id: SpecialistId) => void;
  registerRowRef: (id: SpecialistId, el: HTMLElement | null) => void;
};

export function DaAuditList({
  specialists,
  sort,
  onSortChange,
  expandedRowId,
  onRowToggle,
  registerRowRef,
}: DaAuditListProps) {
  const sorted = sortSpecialists(specialists, sort);

  return (
    <section className="mb-6">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2
            className="font-display text-ink m-0 text-[18px] font-medium tracking-[-0.01em]"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            Per-Specialist <em className="italic">audit</em>
          </h2>
          <span className="text-ink-mute mt-0.5 block text-[12px]">
            {specialists.length} Specialists · today
          </span>
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

      <div className="flex flex-col gap-2">
        {sorted.map((s) => (
          <DaAuditRow
            key={s.id}
            specialist={s}
            isExpanded={expandedRowId === s.id}
            onToggle={() => onRowToggle(s.id)}
            registerRef={(el) => registerRowRef(s.id, el)}
          />
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   Sort pipeline
   ============================================================ */

function sortSpecialists(
  specialists: ReadonlyArray<Specialist>,
  sort: SortKey,
): ReadonlyArray<Specialist> {
  const arr = [...specialists];
  switch (sort) {
    case "status-priority":
      arr.sort((a, b) => {
        const pa = statusPriority(a);
        const pb = statusPriority(b);
        if (pa !== pb) return pa - pb;
        return a.fullName.localeCompare(b.fullName);
      });
      break;
    case "time":
      arr.sort((a, b) => {
        const ta = submissionTimeMinutes(a);
        const tb = submissionTimeMinutes(b);
        /* nulls (un-submitted) → end */
        if (ta === null && tb === null) return a.fullName.localeCompare(b.fullName);
        if (ta === null) return 1;
        if (tb === null) return -1;
        if (ta !== tb) return ta - tb;
        return a.fullName.localeCompare(b.fullName);
      });
      break;
    case "name":
      arr.sort((a, b) => a.fullName.localeCompare(b.fullName));
      break;
    case "volume":
      arr.sort((a, b) => {
        const va = volumeSum(a);
        const vb = volumeSum(b);
        if (va !== vb) return vb - va;
        return a.fullName.localeCompare(b.fullName);
      });
      break;
  }
  return arr;
}

/** Lower number = higher priority (renders earlier). Missed first. */
function statusPriority(s: Specialist): number {
  switch (s.dailyActivity.kind) {
    case "missed": return 1;
    case "pending": return 2;
    case "excused": return 3;
    case "submitted": return 4;
  }
}

/** Parse "9:14 AM" to minutes-since-midnight; null for un-submitted. */
function submissionTimeMinutes(s: Specialist): number | null {
  if (s.dailyActivity.kind !== "submitted") return null;
  const match = s.dailyActivity.timeLabel.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  const hStr = match[1], mStr = match[2], ap = match[3];
  if (hStr === undefined || mStr === undefined || ap === undefined) return null;
  let h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  if (isNaN(h) || isNaN(m)) return null;
  const isPm = ap.toUpperCase() === "PM";
  if (h === 12) h = isPm ? 12 : 0;
  else if (isPm) h += 12;
  return h * 60 + m;
}

function volumeSum(s: Specialist): number {
  return (
    s.todayActivity.outreach +
    s.todayActivity.checkIns +
    s.todayActivity.interviews +
    s.todayActivity.signups
  );
}
