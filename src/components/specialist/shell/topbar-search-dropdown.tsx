"use client";

/**
 * TopbarSearchDropdown — portaled dropdown panel for the global
 * topbar search.
 *
 * Anchored to the topbar search input's bounding rect; renders via
 * `createPortal(document.body)` to escape the topbar's stacking
 * context (the topbar has `backdrop-blur` which creates a stacking
 * context; an inline absolute-positioned dropdown can have z-index
 * surprises through it). Same portal rationale as `RowOverflowMenu`.
 *
 * **Scope (Checkpoint 1 + 2 combined):**
 *   - dropdown shell + portal + positioning (C1)
 *   - empty-state placeholder ("Start typing to search") (C1)
 *   - no-match state ("No results for {query}") (C1)
 *   - result row rendering grouped by entity type (C2)
 *   - per-group "X of Y" count badges (C2)
 *   - click result → Next.js Link navigation + dropdown close (C2)
 *
 * **Out of scope (Checkpoint 3):** keyboard navigation (Up / Down /
 * Enter), matched-text highlighting, recent searches.
 *
 * ## Positioning
 *
 * Computed from `anchorRef.current.getBoundingClientRect()`:
 *   - `top` = rect.bottom + 4px gap
 *   - `left` = rect.left
 *   - `width` = rect.width  (matches the input wrapper)
 *
 * Repositions on window resize + scroll (capture phase to catch
 * nested scroll containers). Closes on Esc, closes on click-outside
 * of BOTH the panel AND the input wrapper.
 *
 * ## Z-index
 *
 * `z-[20]` — above topbar (`z-[6]`), above other topbar popovers
 * (notifications / messages / user — these render inline at lower
 * z), below modals (`z-[200]+`) and ApprovedFlash toast (`z-[300]`).
 *
 * ## Scroll
 *
 * `max-h-[70vh] overflow-y-auto` on the results container — keeps
 * the dropdown within viewport when all 5 groups × 5 caps = 25 rows
 * would otherwise exceed it.
 *
 * Client Component (portal + event listeners + layout effects).
 */

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Building2,
  ClipboardList,
  Scale,
  Search,
  Sparkles,
  User,
  type LucideIcon,
} from "lucide-react";
import type {
  SearchEntityType,
  SearchResult,
} from "@/lib/mock-data/specialist/search-index";
import {
  QUERY_MIN_LENGTH,
  SEARCH_GROUP_ORDER,
  type SearchMatchCounts,
} from "./use-search";
import { cn } from "@/lib/utils/cn";

const PANEL_GAP_PX = 4;

type Position = { top: number; left: number; width: number };

type TopbarSearchDropdownProps = {
  isOpen: boolean;
  onClose: () => void;
  /** Ref to the input wrapper (the `<label>` element in topbar.tsx).
   *  Drives both positioning AND click-outside safety. */
  anchorRef: React.RefObject<HTMLLabelElement | null>;
  /** Current query string. Drives the rendering fork between
   *  placeholder / no-match / results states. */
  query: string;
  /** Capped + ranked results from `useSearch`. */
  results: ReadonlyArray<SearchResult>;
  /** Per-entity-type total match counts (pre-cap) — drives the
   *  "X of Y" count badges in group headers. */
  matchCounts: SearchMatchCounts;
};

/* ============================================================
   Entity-type display metadata
   ============================================================ */

const GROUP_LABEL: Record<SearchEntityType, string> = {
  candidate: "Candidates",
  client: "Clients",
  dispute: "Disputes",
  brief: "Briefs",
  prospect: "Prospects",
};

const TYPE_PILL_LABEL: Record<SearchEntityType, string> = {
  candidate: "CANDIDATE",
  client: "CLIENT",
  dispute: "DISPUTE",
  brief: "BRIEF",
  prospect: "PROSPECT",
};

const TYPE_ICON: Record<SearchEntityType, LucideIcon> = {
  candidate: User,
  client: Building2,
  dispute: Scale,
  brief: ClipboardList,
  prospect: Sparkles,
};

export function TopbarSearchDropdown({
  isOpen,
  onClose,
  anchorRef,
  query,
  results,
  matchCounts,
}: TopbarSearchDropdownProps) {
  const [position, setPosition] = useState<Position | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  /* Compute initial position when the panel opens. useLayoutEffect
     because we want the rect AFTER any DOM mutations but BEFORE the
     browser paints (avoids flicker). */
  useLayoutEffect(() => {
    if (!isOpen || !anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + PANEL_GAP_PX,
      left: rect.left,
      width: rect.width,
    });
  }, [isOpen, anchorRef]);

  /* Reposition on resize + scroll, plus Esc-to-close. The scroll
     listener uses capture phase so it catches nested scroll
     containers (e.g. a long detail-pane scroll that would shift the
     anchor's viewport position). */
  useEffect(() => {
    if (!isOpen) return;

    function reposition() {
      const anchor = anchorRef.current;
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      setPosition({
        top: rect.bottom + PANEL_GAP_PX,
        left: rect.left,
        width: rect.width,
      });
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    function onDown(e: MouseEvent) {
      const target = e.target as Node;
      /* Clicks inside the panel keep it open. */
      if (panelRef.current?.contains(target)) return;
      /* Clicks inside the anchor (input wrapper) keep it open —
         clicking the input shouldn't close the dropdown that the
         click is opening. */
      if (anchorRef.current?.contains(target)) return;
      onClose();
    }

    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [isOpen, onClose, anchorRef]);

  if (!isOpen || !position) return null;

  /* State fork:
       - Below min query length (0 or 1 chars) → "Start typing"
         placeholder. Avoids noisy "No results" on every keystroke
         before the search actually runs.
       - At or above min length but zero matches → "No results"
         no-match state.
       - At or above min length with matches → grouped result rows. */
  const trimmedQuery = query.trim();
  const isSearchable = trimmedQuery.length >= QUERY_MIN_LENGTH;

  const panel = (
    <div
      ref={panelRef}
      id="topbar-search-results"
      role="listbox"
      aria-label="Search results"
      style={{
        top: position.top,
        left: position.left,
        width: position.width,
      }}
      className="border-line bg-paper fixed z-[20] max-h-[70vh] overflow-hidden rounded-md border shadow-[0_8px_32px_rgba(14,14,12,0.12)]"
    >
      {!isSearchable ? (
        <EmptyStatePlaceholder />
      ) : results.length === 0 ? (
        <NoMatchState query={trimmedQuery} />
      ) : (
        <ResultsList
          results={results}
          matchCounts={matchCounts}
          onResultClick={onClose}
        />
      )}
    </div>
  );

  return createPortal(panel, document.body);
}

/* ============================================================
   Results list — grouped by entity type, scrollable
   ============================================================ */

function ResultsList({
  results,
  matchCounts,
  onResultClick,
}: {
  results: ReadonlyArray<SearchResult>;
  matchCounts: SearchMatchCounts;
  onResultClick: () => void;
}) {
  /* Re-group the flat (already type-ordered) results into per-type
     buckets. O(N) on ≤25 results — trivial. */
  const grouped = new Map<SearchEntityType, SearchResult[]>();
  for (const r of results) {
    let bucket = grouped.get(r.type);
    if (!bucket) {
      bucket = [];
      grouped.set(r.type, bucket);
    }
    bucket.push(r);
  }

  return (
    <div className="max-h-[70vh] overflow-y-auto py-1.5">
      {SEARCH_GROUP_ORDER.map((type, groupIndex) => {
        const bucket = grouped.get(type);
        if (!bucket || bucket.length === 0) return null;
        const total = matchCounts[type];
        return (
          <section
            key={type}
            aria-label={GROUP_LABEL[type]}
            /* Subtle separator between groups; none before the first
               rendered group (group order is fixed but groups can be
               empty, so we can't rely on `:not(:first-child)`). */
            className={cn(
              groupIndex > 0 && "border-line-soft border-t",
            )}
          >
            <GroupHeader
              label={GROUP_LABEL[type]}
              displayed={bucket.length}
              total={total}
            />
            {bucket.map((result) => (
              <ResultRow
                key={result.id}
                result={result}
                onClick={onResultClick}
              />
            ))}
          </section>
        );
      })}
    </div>
  );
}

function GroupHeader({
  label,
  displayed,
  total,
}: {
  label: string;
  displayed: number;
  total: number;
}) {
  /* Count badge shows "X of Y" when capped (displayed < total);
     just "X" when displayed === total (no cap applied). */
  const countText = displayed < total ? `${displayed} of ${total}` : `${total}`;
  return (
    <div className="bg-cream/40 border-line-soft flex items-center justify-between gap-2 border-b px-3 py-1.5">
      <span className="text-ink-mute font-mono text-[10px] font-semibold tracking-[0.12em] uppercase">
        {label}
      </span>
      <span className="text-ink-mute bg-cream-deep rounded-full px-1.5 py-px font-mono text-[10px] font-medium tracking-[0.04em]">
        {countText}
      </span>
    </div>
  );
}

function ResultRow({
  result,
  onClick,
}: {
  result: SearchResult;
  onClick: () => void;
}) {
  const Icon = TYPE_ICON[result.type];
  return (
    <Link
      href={result.href}
      role="option"
      onClick={onClick}
      className="hover:bg-cream-deep flex cursor-pointer items-center gap-2.5 px-3 py-2.5 transition-colors"
    >
      <div
        aria-hidden="true"
        className="bg-cream-deep text-ink-mute grid h-6 w-6 flex-shrink-0 place-items-center rounded-md"
      >
        <Icon className="h-3.5 w-3.5" strokeWidth={1.6} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-ink truncate text-[14px] font-medium leading-tight">
          {result.title}
        </div>
        <div className="text-ink-mute truncate text-[12px] leading-snug">
          {result.subtitle}
        </div>
      </div>
      <span
        aria-hidden="true"
        className="text-ink-mute bg-cream-deep flex-shrink-0 rounded-full px-1.5 py-0.5 font-mono text-[9.5px] font-semibold tracking-[0.08em]"
      >
        {TYPE_PILL_LABEL[result.type]}
      </span>
    </Link>
  );
}

/* ============================================================
   Empty-state placeholder — query below min length
   ============================================================ */

function EmptyStatePlaceholder() {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
      <div
        aria-hidden="true"
        className="bg-cream-deep text-ink-mute grid h-10 w-10 place-items-center rounded-full"
      >
        <Search className="h-[18px] w-[18px]" strokeWidth={1.6} />
      </div>
      <div className="text-ink mt-1 text-[14px] font-medium">
        Start typing to search
      </div>
      <div className="text-ink-mute max-w-[280px] text-[12.5px] leading-snug">
        Candidates, clients, disputes, briefs, sourcing prospects
      </div>
    </div>
  );
}

/* ============================================================
   No-match state — query at/above min length but no matches
   ============================================================ */

function NoMatchState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
      <div
        aria-hidden="true"
        className="bg-cream-deep text-ink-mute grid h-10 w-10 place-items-center rounded-full"
      >
        <Search className="h-[18px] w-[18px]" strokeWidth={1.6} />
      </div>
      <div className="text-ink mt-1 text-[14px] font-medium">
        No results for <span className="italic">&ldquo;{query}&rdquo;</span>
      </div>
      <div className="text-ink-mute max-w-[280px] text-[12.5px] leading-snug">
        Try a different query — search runs across candidates, clients,
        disputes, briefs, and sourcing prospects.
      </div>
    </div>
  );
}
