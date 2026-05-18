"use client";

/**
 * TeamReportsApp — orchestrator for `/specialist/team-reports`.
 *
 * Owns:
 *   - `dateRange` — only "month" enabled in Step 10 (Today / Week /
 *     Quarter / Year disabled per the visible-but-disabled pattern
 *     locked in Steps 6/7/8/9)
 *   - `chartTab` — Section 2's active comparison chart (default
 *     "reviews" per Q3)
 *   - `focusedSpecialistId` — initial `?spec=<spec-id>` deep-link
 *     target. Drives Section 2 chart row ring + Section 4 heatmap
 *     row ring (both fade after 2s).
 *
 * `?spec=` deep-link semantics (Q2):
 *   - Valid SpecialistId → ring + scroll to heatmap row (heatmap is
 *     the more visually-distinct anchor since 11 spec rows fit
 *     entirely on screen)
 *   - Invalid → silently clear via `router.replace(pathname)`
 *
 * Future cross-domain consumers will inherit this orchestrator's
 * deep-link pattern.
 */

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  specialists,
  type SpecialistId,
} from "@/lib/mock-data/manager/team";
import { TrHeader, type DateRange } from "./tr-header";
import { TrOverviewSection } from "./tr-overview-section";
import { TrComparisonSection, type ChartTab } from "./tr-comparison-section";
import { TrHeatmapSection } from "./tr-heatmap-section";
import { TrPoolAnalyticsSection } from "./tr-pool-analytics-section";
import { TrHireSuccessSection } from "./tr-hire-success-section";

const FOCUS_RING_DURATION_MS = 2000;

const VALID_IDS = new Set<SpecialistId>(specialists.map((s) => s.id));

export function TeamReportsApp() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [dateRange, setDateRange] = useState<DateRange>("month");
  const [chartTab, setChartTab] = useState<ChartTab>("reviews");

  /* Lazy initializer reads `?spec=` ONCE on mount. */
  const [focusedSpecialistId, setFocusedSpecialistId] = useState<SpecialistId | null>(
    () => {
      const raw = searchParams.get("spec");
      if (!raw) return null;
      return VALID_IDS.has(raw as SpecialistId) ? (raw as SpecialistId) : null;
    },
  );

  /* Q2 fallback: if `?spec=` was set but invalid, clear URL via
     router.replace to prevent shareable URL confusion. */
  useEffect(() => {
    const raw = searchParams.get("spec");
    if (raw && !VALID_IDS.has(raw as SpecialistId)) {
      router.replace(pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Heatmap row ref map — orchestrator uses this for scroll-into-view
     on deep-link entry. */
  const heatmapRowRefs = useRef<Map<SpecialistId, HTMLElement>>(new Map());

  useEffect(() => {
    if (!focusedSpecialistId) return;
    const el = heatmapRowRefs.current.get(focusedSpecialistId);
    if (!el) return;
    const t = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
    /* Auto-clear focus state so the ring fades. */
    const clear = window.setTimeout(() => {
      setFocusedSpecialistId(null);
    }, FOCUS_RING_DURATION_MS);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(clear);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerHeatmapRowRef = (id: SpecialistId, el: HTMLElement | null) => {
    if (el) heatmapRowRefs.current.set(id, el);
    else heatmapRowRefs.current.delete(id);
  };

  return (
    <div className="min-w-0 px-5 pt-7 pb-20 sm:px-7 lg:px-9">
      <TrHeader
        specialistCount={specialists.length}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />
      <TrOverviewSection />
      <TrComparisonSection
        specialists={specialists}
        activeTab={chartTab}
        onTabChange={setChartTab}
        focusedSpecialistId={focusedSpecialistId}
      />
      <TrHeatmapSection
        specialists={specialists}
        focusedSpecialistId={focusedSpecialistId}
        registerRowRef={registerHeatmapRowRef}
      />
      <TrPoolAnalyticsSection />
      <TrHireSuccessSection />
    </div>
  );
}
