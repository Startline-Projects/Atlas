"use client";

/**
 * MyTeamApp — top-level orchestrator for `/specialist/team`.
 *
 * Owns the filter state machine (cohort + search query + sort) and
 * derives the visible roster. Children components are presentational
 * + receive state via props.
 *
 * ## State shape
 *
 *   - `cohort: CohortKey` — defaults to "all"
 *   - `query: string`     — defaults to ""
 *   - `sort: SortKey`     — defaults to "name"
 *
 * Filter pipeline (locked Step 4 Q6):
 *
 *   roster → cohort filter → search filter → sort → visible
 *
 * Cohort + search compose AND-style. Search matches against
 * fullName / role / countryName / initials (case-insensitive,
 * per Q5 addition).
 *
 * ## Reset filters
 *
 * The empty-state "Reset filters" button calls `resetFilters` which
 * clears all three to defaults. Wired through `MyTeamGrid`.
 */

import { useMemo, useState } from "react";
import {
  countSpecialistsByCohort,
  specialists,
  type Specialist,
} from "@/lib/mock-data/manager/team";
import { MyTeamAttentionStrip } from "./my-team-attention-strip";
import { MyTeamFilters } from "./my-team-filters";
import { MyTeamGrid } from "./my-team-grid";
import { MyTeamHeader } from "./my-team-header";

export type CohortKey = "all" | "active" | "vacation" | "flag" | "capacity";
export type SortKey = "name" | "role" | "performance" | "workload";

const DEFAULT_COHORT: CohortKey = "all";
const DEFAULT_SORT: SortKey = "name";

export function MyTeamApp() {
  const [cohort, setCohort] = useState<CohortKey>(DEFAULT_COHORT);
  const [query, setQuery] = useState<string>("");
  const [sort, setSort] = useState<SortKey>(DEFAULT_SORT);

  const counts = useMemo(() => countSpecialistsByCohort(), []);

  const visible = useMemo(
    () => applyFilters(specialists, cohort, query, sort),
    [cohort, query, sort],
  );

  const resultCountLabel =
    visible.length === specialists.length
      ? `Showing all ${specialists.length}`
      : `Showing ${visible.length} of ${specialists.length}`;

  const resetFilters = () => {
    setCohort(DEFAULT_COHORT);
    setQuery("");
    setSort(DEFAULT_SORT);
  };

  return (
    <div className="min-w-0 px-5 pt-7 pb-20 sm:px-7 lg:px-9">
      <MyTeamHeader />
      <MyTeamAttentionStrip />
      <MyTeamFilters
        cohort={cohort}
        onCohortChange={setCohort}
        query={query}
        onQueryChange={setQuery}
        sort={sort}
        onSortChange={setSort}
        resultCountLabel={resultCountLabel}
        counts={counts}
      />
      <MyTeamGrid
        visible={visible}
        totalCount={specialists.length}
        onResetFilters={resetFilters}
      />
    </div>
  );
}

/* ============================================================
   Filter pipeline
   ============================================================ */

function applyFilters(
  roster: ReadonlyArray<Specialist>,
  cohort: CohortKey,
  query: string,
  sort: SortKey,
): ReadonlyArray<Specialist> {
  /* 1. Cohort filter. "All" = no filter; "Active" = not vacation. */
  const afterCohort = roster.filter((s) => {
    if (cohort === "all") return true;
    if (cohort === "active") return s.status !== "vacation";
    return s.status === cohort;
  });

  /* 2. Search filter. Match against fullName / role / countryName /
     initials. Case-insensitive substring; empty query = no filter. */
  const q = query.trim().toLowerCase();
  const afterSearch = q.length === 0
    ? afterCohort
    : afterCohort.filter((s) =>
        s.fullName.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q) ||
        s.countryName.toLowerCase().includes(q) ||
        s.initials.toLowerCase().includes(q),
      );

  /* 3. Sort. Stable in-place on a fresh array copy. */
  const sorted = [...afterSearch];
  switch (sort) {
    case "name":
      sorted.sort((a, b) => a.fullName.localeCompare(b.fullName));
      break;
    case "role":
      sorted.sort((a, b) =>
        a.role.localeCompare(b.role) || a.fullName.localeCompare(b.fullName),
      );
      break;
    case "performance":
      sorted.sort((a, b) => b.performanceScore - a.performanceScore);
      break;
    case "workload":
      sorted.sort(
        (a, b) =>
          b.workload.candidatesCount - a.workload.candidatesCount ||
          b.workload.contractsCount - a.workload.contractsCount,
      );
      break;
  }

  return sorted;
}
