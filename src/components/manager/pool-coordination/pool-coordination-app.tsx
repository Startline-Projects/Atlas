"use client";

/**
 * PoolCoordinationApp — orchestrator for `/specialist/pool-coordination`.
 *
 * Owns:
 *   - `dateRange` — only "today" enabled in Step 8 (7d / 30d
 *     disabled per Step 6 Q3 pattern, matching Step 5/6/7 lock)
 *   - `focusedCategoryId` — initial deep-link target from
 *     `?focus=` searchParam. Used ONCE on mount to scroll-to + ring;
 *     after mount, ring auto-fades and state stays null.
 *
 * Reads `?focus=<category-id>` on mount, scrolls the matching
 * category card into center via `block: "center"` (matching Step
 * 6's deep-link pattern), and applies a brief lime ring overlay
 * via `data-pc-focused="true"` on the card root for 2 seconds.
 */

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  getCategory,
  poolCategories,
} from "@/lib/mock-data/manager/manager-pool-coordination-data";
import { PcHeader, type DateRange } from "./pc-header";
import { PcTotalsStrip } from "./pc-totals-strip";
import { PcOpportunitiesSection } from "./pc-opportunities-section";
import { PcCategoriesGrid } from "./pc-categories-grid";
import { PcSprintPriorities } from "./pc-sprint-priorities";

const FOCUS_RING_DURATION_MS = 2000;

export function PoolCoordinationApp() {
  const searchParams = useSearchParams();
  const [dateRange, setDateRange] = useState<DateRange>("today");
  /* Lazy initializer — reads `?focus=` ONCE on mount. */
  const [focusedCategoryId, setFocusedCategoryId] = useState<string | null>(() => {
    const raw = searchParams.get("focus");
    if (!raw) return null;
    return getCategory(raw) ? raw : null;
  });

  /* Map keyed by category id — populated by each card via ref
     callback so the orchestrator can scroll on deep-link. */
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map());

  /* On mount only: deep-link scroll + ring. Both effects keyed
     off the SAME initial focusedCategoryId — no re-fires when
     user later interacts. */
  useEffect(() => {
    if (!focusedCategoryId) return;
    const el = cardRefs.current.get(focusedCategoryId);
    if (!el) return;
    const t = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
    /* Auto-clear focus after the ring fade-out window so a manual
       link-back doesn't keep the ring active forever. */
    const clear = window.setTimeout(() => {
      setFocusedCategoryId(null);
    }, FOCUS_RING_DURATION_MS);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(clear);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerCardRef = (id: string, el: HTMLElement | null) => {
    if (el) cardRefs.current.set(id, el);
    else cardRefs.current.delete(id);
  };

  return (
    <div className="min-w-0 px-5 pt-7 pb-20 sm:px-7 lg:px-9">
      <PcHeader
        categories={poolCategories}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />
      <PcTotalsStrip categories={poolCategories} />
      <PcOpportunitiesSection />
      <PcCategoriesGrid
        categories={poolCategories}
        focusedCategoryId={focusedCategoryId}
        registerCardRef={registerCardRef}
      />
      <PcSprintPriorities />
    </div>
  );
}
