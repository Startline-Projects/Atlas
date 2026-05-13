"use client";

/**
 * useSearch — hook owning the global topbar search state machine.
 *
 * **Scope (Checkpoint 1 + 2 combined):**
 *   - query + dropdown open/close state (C1)
 *   - substring filter against the precomputed `searchIndex.haystack`
 *     with score-based ranking + 5-per-group cap (C2)
 *
 * **Out of scope (Checkpoint 3):** keyboard navigation (Up/Down/Enter),
 * Cmd+K shortcut, recent searches localStorage persistence,
 * matched-text highlighting.
 *
 * Mounted once at the topbar level. The 4-popover coordination
 * (notifications / messages / user-menu / search) is wired by the
 * Topbar component — it calls `closeDropdown()` when any other
 * popover opens, and calls its own `setOpenPanel(null)` when search
 * opens. The hook stays decoupled from the other popovers' state.
 *
 * No debouncing: the index is ~125 entries; substring filtering at
 * this scale is sub-millisecond. If the index grows past ~10k a
 * debounce will become worth adding.
 *
 * ## Matching rules
 *
 *   - **2-character minimum** — queries of 0 or 1 chars return `[]`
 *     so the dropdown shows the "Start typing to search" placeholder
 *     instead of "No results for …" or noisy single-char matches
 *     ("s" would match too many things to be useful).
 *   - **Substring on `haystack`** — case-insensitive (haystack is
 *     pre-lowercased at module init).
 *   - **Score-based ranking within entity type:**
 *       - 2 = title contains query (priority match)
 *       - 1 = subtitle contains query (secondary)
 *       - 0 = haystack-only match (rest of the fields)
 *     Tie-break alphabetically by title (case-insensitive).
 *   - **5-per-group cap** — at most 5 results per entity type in the
 *     returned array. The dropdown's per-group count badge shows
 *     "X of Y" where X = capped count, Y = full match count.
 */

import { useCallback, useMemo, useState } from "react";
import {
  searchIndex,
  type SearchEntityType,
  type SearchResult,
} from "@/lib/mock-data/specialist/search-index";

/** Minimum query length before search runs. 1-character queries
 *  would match too many entries to be useful; 2 chars is the
 *  threshold where results become meaningful. Exported so the
 *  dropdown component can fork between "Start typing" placeholder
 *  vs "No results" no-match state. */
export const QUERY_MIN_LENGTH = 2;

/** Max results displayed per entity-type group. Total displayed
 *  cap: 5 groups × 5 = 25 rows. */
const PER_GROUP_CAP = 5;

/** Entity-type display order in the dropdown — locked in
 *  `topbar-search-dropdown.tsx` rendering. Exported here so the cap +
 *  sort logic can iterate in the same order. */
export const SEARCH_GROUP_ORDER: ReadonlyArray<SearchEntityType> = [
  "candidate",
  "client",
  "dispute",
  "brief",
  "prospect",
];

/** Compute score for a single result against the lowercased query.
 *  Higher score = higher rank within its entity type group. */
function scoreOf(result: SearchResult, qLower: string): number {
  if (result.title.toLowerCase().includes(qLower)) return 2;
  if (result.subtitle.toLowerCase().includes(qLower)) return 1;
  return 0;
}

/** Match-count metadata per entity type — exposed alongside the
 *  capped results so the dropdown can show "X of Y" badges. */
export type SearchMatchCounts = Record<SearchEntityType, number>;

const ZERO_COUNTS: SearchMatchCounts = {
  candidate: 0,
  client: 0,
  dispute: 0,
  brief: 0,
  prospect: 0,
};

export type UseSearchReturn = {
  query: string;
  setQuery: (next: string) => void;
  isOpen: boolean;
  openDropdown: () => void;
  closeDropdown: () => void;
  /** Capped results — top `PER_GROUP_CAP` per entity type, in
   *  `SEARCH_GROUP_ORDER`. */
  results: ReadonlyArray<SearchResult>;
  /** Per-entity-type total match counts (pre-cap). Drives the
   *  "X of Y" count badges in the dropdown's group headers. */
  matchCounts: SearchMatchCounts;
};

export function useSearch(): UseSearchReturn {
  const [query, setQueryState] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setQuery = useCallback((next: string) => {
    setQueryState(next);
  }, []);

  const openDropdown = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  /* Filter + rank + cap. Recomputes on every `query` change.
     Sub-millisecond on a 125-entry index; no debouncing. */
  const { results, matchCounts } = useMemo<{
    results: ReadonlyArray<SearchResult>;
    matchCounts: SearchMatchCounts;
  }>(() => {
    const qLower = query.trim().toLowerCase();
    if (qLower.length < QUERY_MIN_LENGTH) {
      return { results: [], matchCounts: ZERO_COUNTS };
    }

    /* Bucket all matches by entity type, scoring as we go. */
    const buckets: Record<SearchEntityType, Array<{
      result: SearchResult;
      score: number;
    }>> = {
      candidate: [],
      client: [],
      dispute: [],
      brief: [],
      prospect: [],
    };

    for (const result of searchIndex) {
      if (!result.haystack.includes(qLower)) continue;
      buckets[result.type].push({ result, score: scoreOf(result, qLower) });
    }

    /* Sort each bucket by score desc, then title alpha asc;
       record total count BEFORE capping. */
    const counts: SearchMatchCounts = {
      candidate: buckets.candidate.length,
      client: buckets.client.length,
      dispute: buckets.dispute.length,
      brief: buckets.brief.length,
      prospect: buckets.prospect.length,
    };

    const flat: SearchResult[] = [];
    for (const type of SEARCH_GROUP_ORDER) {
      const sorted = buckets[type].sort((a, b) => {
        if (a.score !== b.score) return b.score - a.score;
        return a.result.title.toLowerCase().localeCompare(
          b.result.title.toLowerCase(),
        );
      });
      for (const { result } of sorted.slice(0, PER_GROUP_CAP)) {
        flat.push(result);
      }
    }

    return { results: flat, matchCounts: counts };
  }, [query]);

  return {
    query,
    setQuery,
    isOpen,
    openDropdown,
    closeDropdown,
    results,
    matchCounts,
  };
}
