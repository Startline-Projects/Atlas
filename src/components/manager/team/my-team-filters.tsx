"use client";

/**
 * MyTeamFilters — cohort chip strip + search input + sort select +
 * result count.
 *
 * Receives state + setters from `MyTeamApp` (controlled component).
 * Pure presentational + event-bind shape; no logic of its own.
 *
 * ## Cohort chips (locked Step 4 Q4 default = "all")
 *
 *   - All (counts.all = 11)
 *   - Active (counts.active = 10 — all except vacation)
 *   - On vacation (counts.vacation = 1 — Olena)
 *   - Performance flagged (counts.flag = 2 — Priya, Diego) — danger tone
 *   - At capacity (counts.capacity = 2 — Aisha, Lucas) — attention tone
 *
 * Single-select: clicking a chip replaces the active cohort. Matches
 * the prototype's `data-mt-cohort` attribute (radio-button semantics).
 *
 * ## Sort options (locked Step 4 Q4 default = "name")
 *
 *   - name        — Name (A-Z)
 *   - role        — Role category
 *   - performance — Performance score (high → low)
 *   - workload    — Workload (high → low)
 *
 * ## Search (locked Step 4 Q5)
 *
 * Case-insensitive substring against fullName / role / countryName /
 * initials (latter per Q5 addition). Empty query = no filtering.
 */

import type {
  CohortKey,
  SortKey,
} from "./my-team-app";

type Counts = {
  all: number;
  active: number;
  vacation: number;
  flag: number;
  capacity: number;
};

type MyTeamFiltersProps = {
  cohort: CohortKey;
  onCohortChange: (next: CohortKey) => void;
  query: string;
  onQueryChange: (next: string) => void;
  sort: SortKey;
  onSortChange: (next: SortKey) => void;
  /** Result count caption — "Showing 4 of 11" / "Showing all 11". */
  resultCountLabel: string;
  counts: Counts;
};

type CohortDef = {
  key: CohortKey;
  label: string;
  countKey: keyof Counts;
  /** Extra visual tone (danger / attention). Default chips are neutral. */
  tone?: "danger" | "attn";
};

const COHORTS: ReadonlyArray<CohortDef> = [
  { key: "all", label: "All", countKey: "all" },
  { key: "active", label: "Active", countKey: "active" },
  { key: "vacation", label: "On vacation", countKey: "vacation" },
  { key: "flag", label: "Performance flagged", countKey: "flag", tone: "danger" },
  { key: "capacity", label: "At capacity", countKey: "capacity", tone: "attn" },
];

const SORT_OPTIONS: ReadonlyArray<{ value: SortKey; label: string }> = [
  { value: "name", label: "Name (A–Z)" },
  { value: "role", label: "Role category" },
  { value: "performance", label: "Performance score" },
  { value: "workload", label: "Workload (high)" },
];

export function MyTeamFilters({
  cohort,
  onCohortChange,
  query,
  onQueryChange,
  sort,
  onSortChange,
  resultCountLabel,
  counts,
}: MyTeamFiltersProps) {
  return (
    <div className="mb-5 flex flex-col gap-3">
      {/* Cohort chips */}
      <div role="tablist" aria-label="Specialist cohorts" className="flex flex-wrap gap-2">
        {COHORTS.map((def) => {
          const isActive = cohort === def.key;
          return (
            <button
              key={def.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onCohortChange(def.key)}
              className={cohortChipClass(isActive, def.tone)}
            >
              {def.label}
              <span className={cohortCountClass(isActive, def.tone)}>
                {counts[def.countKey]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search + sort + count */}
      <div className="flex flex-wrap items-center gap-3">
        <label className="bg-paper border-line focus-within:border-ink relative flex flex-1 min-w-[260px] items-center gap-2 rounded-md border px-3 py-2 transition-colors">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            className="text-ink-mute flex-shrink-0"
          >
            <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.4" />
            <path d="m9 9 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span className="sr-only">Search</span>
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by name, role, or country…"
            autoComplete="off"
            className="text-ink placeholder:text-ink-mute min-w-0 flex-1 bg-transparent text-[13px] outline-none"
          />
        </label>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortKey)}
          aria-label="Sort"
          className="bg-paper border-line text-ink hover:border-ink-soft cursor-pointer rounded-md border px-3 py-2 text-[13px] transition-colors"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="text-ink-mute font-mono text-[11px] tracking-[0.06em]">
          {resultCountLabel}
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   Chip style helpers
   ============================================================ */

function cohortChipClass(isActive: boolean, tone: CohortDef["tone"]) {
  if (isActive) {
    return "bg-ink text-paper inline-flex items-center gap-1.5 rounded-full border border-ink px-3 py-1.5 text-[12.5px] font-medium transition-colors";
  }
  if (tone === "danger") {
    return "border-danger/40 text-danger hover:bg-danger-bg inline-flex items-center gap-1.5 rounded-full border bg-paper px-3 py-1.5 text-[12.5px] font-medium transition-colors";
  }
  if (tone === "attn") {
    return "border-amber/40 text-amber hover:bg-amber-bg inline-flex items-center gap-1.5 rounded-full border bg-paper px-3 py-1.5 text-[12.5px] font-medium transition-colors";
  }
  return "border-line text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center gap-1.5 rounded-full border bg-paper px-3 py-1.5 text-[12.5px] font-medium transition-colors";
}

function cohortCountClass(isActive: boolean, tone: CohortDef["tone"]) {
  if (isActive) {
    return "bg-paper/15 text-paper rounded-full px-1.5 py-0.5 font-mono text-[10px] tracking-[0.04em]";
  }
  if (tone === "danger") {
    return "bg-danger/12 text-danger rounded-full px-1.5 py-0.5 font-mono text-[10px] tracking-[0.04em]";
  }
  if (tone === "attn") {
    return "bg-amber/15 text-amber rounded-full px-1.5 py-0.5 font-mono text-[10px] tracking-[0.04em]";
  }
  return "bg-cream-deep text-ink-soft rounded-full px-1.5 py-0.5 font-mono text-[10px] tracking-[0.04em]";
}
