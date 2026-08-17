"use client";

/**
 * TeamDisputesApp — orchestrator for `/specialist/team-disputes`.
 *
 * Owns:
 *   - `filter` — single-select chip (default "all", per Step 7 Q2)
 *   - `sort` — 5 sort keys (default "sla", per Step 7 Q3)
 *   - `expandedRowId` — single-accordion row expansion
 *
 * Reads `?filter=` searchParam ONCE on mount for deep-link from
 * dashboard urgent card 2 ghost ("Filter by SLA" jumps in with
 * filter pre-applied to "sla-risk").
 */

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { teamDisputes, type DisputeId } from "@/lib/mock-data/manager/manager-team-disputes-data";
import { TdHeader } from "./td-header";
import { TdStatusOverview } from "./td-status-overview";
import { TdFilterBar, type FilterKey, isFilterKey } from "./td-filter-bar";
import { TdDisputeList, type SortKey } from "./td-dispute-list";
import { TdPatternsSection } from "./td-patterns-section";

export function TeamDisputesApp() {
  const searchParams = useSearchParams();
  /* Lazy initializer — reads `?filter=` ONCE on mount. */
  const [filter, setFilter] = useState<FilterKey>(() => {
    const raw = searchParams.get("filter");
    return raw && isFilterKey(raw) ? raw : "all";
  });
  const [sort, setSort] = useState<SortKey>("sla");
  const [expandedRowId, setExpandedRowId] = useState<DisputeId | null>(null);

  const handleRowToggle = (id: DisputeId) => {
    setExpandedRowId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-w-0 px-5 pt-7 pb-20 sm:px-7 lg:px-9">
      <TdHeader disputes={teamDisputes} />
      <TdStatusOverview disputes={teamDisputes} />
      <TdFilterBar
        disputes={teamDisputes}
        activeFilter={filter}
        onFilterChange={(next) => {
          setFilter(next);
          /* Reset expansion when switching filter — the expanded
             row may no longer be visible. */
          setExpandedRowId(null);
        }}
      />
      <TdDisputeList
        disputes={teamDisputes}
        activeFilter={filter}
        sort={sort}
        onSortChange={setSort}
        expandedRowId={expandedRowId}
        onRowToggle={handleRowToggle}
        onFilterReset={() => setFilter("all")}
      />
      <TdPatternsSection />
    </div>
  );
}
