"use client";

/**
 * DailyAuditApp — orchestrator for `/specialist/daily-audit`.
 *
 * Owns:
 *   - `sort` — one of 4 sort keys (status priority / time / name / volume)
 *   - `expandedRowId` — single-accordion state; clicking a row's
 *     head toggles; clicking another row collapses the first
 *   - `dateRange` — only "today" is enabled in Step 6 (Yesterday/7d/
 *     30d are visible-but-disabled per Q3)
 *
 * Reads `?row=spec-…` searchParam ONCE on mount for initial expanded
 * row (used by Specialist Detail hero "Audit daily" deep-link).
 * Scrolls expanded row into view via `block: "center"` per Q2.
 *
 * Sort defaults to "status-priority" — Missed → Pending → Excused →
 * Submitted, then alphabetical (per Q10v). Surfaces problems first
 * which is the audit's primary purpose.
 */

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  specialists,
  type Specialist,
  type SpecialistId,
} from "@/lib/mock-data/manager/team";
import { DaHeader } from "./da-header";
import { DaStatusOverview } from "./da-status-overview";
import { DaTimingChart } from "./da-timing-chart";
import { DaAuditList, type SortKey, type DateRange } from "./da-audit-list";
import { DaCalendarStrip } from "./da-calendar-strip";

const VALID_IDS = new Set<SpecialistId>(specialists.map((s) => s.id));

function parseInitialRowId(raw: string | null): SpecialistId | null {
  if (!raw) return null;
  if (VALID_IDS.has(raw as SpecialistId)) return raw as SpecialistId;
  return null;
}

export function DailyAuditApp() {
  const searchParams = useSearchParams();
  const [sort, setSort] = useState<SortKey>("status-priority");
  const [dateRange, setDateRange] = useState<DateRange>("today");
  /* Lazy initializer — reads `?row=` ONCE on mount. After this,
     local state owns expansion (clicks toggle, deep-link doesn't
     re-fire). */
  const [expandedRowId, setExpandedRowId] = useState<SpecialistId | null>(
    () => parseInitialRowId(searchParams.get("row")),
  );

  /* Refs for scroll-into-view on deep-link. Map keyed by SpecialistId. */
  const rowRefs = useRef<Map<SpecialistId, HTMLElement>>(new Map());

  /* On mount only: if a deep-link expanded a row, scroll it into
     center. `setTimeout(0)` defers past layout so the expanded
     detail panel has measured its height. */
  useEffect(() => {
    if (!expandedRowId) return;
    const el = rowRefs.current.get(expandedRowId);
    if (!el) return;
    const t = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
    return () => window.clearTimeout(t);
    /* Run once on mount only — subsequent expansions (via click)
       don't auto-scroll. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRowToggle = (id: SpecialistId) => {
    setExpandedRowId((prev) => (prev === id ? null : id));
  };

  const registerRowRef = (id: SpecialistId, el: HTMLElement | null) => {
    if (el) rowRefs.current.set(id, el);
    else rowRefs.current.delete(id);
  };

  return (
    <div className="min-w-0 px-5 pt-7 pb-20 sm:px-7 lg:px-9">
      <DaHeader
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        specialists={specialists}
      />
      <DaStatusOverview specialists={specialists} />
      <DaTimingChart specialists={specialists} />
      <DaAuditList
        specialists={specialists}
        sort={sort}
        onSortChange={setSort}
        expandedRowId={expandedRowId}
        onRowToggle={handleRowToggle}
        registerRowRef={registerRowRef}
      />
      <DaCalendarStrip />
    </div>
  );
}

/* Re-export the Specialist type so tab files can `import type
   { Specialist } from "./daily-audit-app"` if it helps localize
   the dependency. Not strictly required. */
export type { Specialist };
