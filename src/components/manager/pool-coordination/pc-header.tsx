"use client";

/**
 * PcHeader — Pool Coordination page header.
 *
 * Eyebrow + title + dynamic subtitle (computed live from
 * `poolCategories`) + 3 date-range tabs (Today enabled; 7d / 30d
 * disabled per Step 5/6/7 pattern) + Export button (modal step 14).
 *
 * Subtitle format: "10 role categories · 187 candidates ·
 *                   1 depleted · 1 overflowing"
 *
 * Ported from prototype lines 29886-29903.
 */

import { useState } from "react";
import { ManagerActionPlaceholderModal } from "@/components/manager/dashboard/manager-action-placeholder-modal";
import type { ManagerActionCTA } from "@/lib/mock-data/manager/manager-rail";
import {
  type PoolCategory,
  getCategoriesByStatus,
} from "@/lib/mock-data/manager/manager-pool-coordination-data";
import { cn } from "@/lib/utils/cn";

export type DateRange = "today" | "7d" | "30d";

const EXPORT_CTA: ManagerActionCTA = {
  label: "Export",
  landsInStep: 14,
  description: "Pool data export — coming soon.",
};

type DateRangeDef = { key: DateRange; label: string; enabled: boolean };

const RANGES: ReadonlyArray<DateRangeDef> = [
  { key: "today", label: "Today", enabled: true },
  { key: "7d", label: "7 days", enabled: false },
  { key: "30d", label: "30 days", enabled: false },
];

type PcHeaderProps = {
  categories: ReadonlyArray<PoolCategory>;
  dateRange: DateRange;
  onDateRangeChange: (next: DateRange) => void;
};

export function PcHeader({
  categories,
  dateRange,
  onDateRangeChange,
}: PcHeaderProps) {
  const [activeCta, setActiveCta] = useState<ManagerActionCTA | null>(null);

  const totalCandidates = categories.reduce((sum, c) => sum + c.liveCount, 0);
  const depletedCount = getCategoriesByStatus("depleted").length;
  const overflowingCount = getCategoriesByStatus("overflowing").length;
  const subtitle =
    `${categories.length} role categories · ${totalCandidates} candidates · ` +
    `${depletedCount} depleted · ${overflowingCount} overflowing`;

  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-line-soft pb-6">
      <div>
        <div className="text-ink-mute mb-2 font-mono text-[10px] tracking-[0.18em] uppercase">
          Manager
        </div>
        <h1 className="font-display text-ink m-0 text-[clamp(28px,3.6vw,40px)] leading-[1.05] font-normal tracking-[-0.02em]">
          Pool{" "}
          <em
            className="font-display"
            style={{ fontVariationSettings: '"opsz" 144' }}
          >
            coordination
          </em>
        </h1>
        <p className="text-ink-soft mt-2 m-0 text-[13.5px]">{subtitle}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {/* Date-range tabs — only Today enabled in Step 8. */}
        <div
          role="tablist"
          aria-label="Date range"
          className="border-line bg-paper inline-flex gap-0.5 rounded-md border p-0.5"
        >
          {RANGES.map((range) => {
            const isActive = range.key === dateRange;
            if (!range.enabled) {
              return (
                <span
                  key={range.key}
                  aria-disabled="true"
                  title="Historical data lands later"
                  className="text-ink-mute cursor-not-allowed rounded-[5px] px-3 py-1.5 text-[12px] font-medium opacity-50"
                >
                  {range.label}
                </span>
              );
            }
            return (
              <button
                key={range.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onDateRangeChange(range.key)}
                className={cn(
                  "rounded-[5px] px-3 py-1.5 text-[12px] font-medium transition-colors",
                  isActive
                    ? "bg-ink text-paper"
                    : "text-ink-mute hover:text-ink",
                )}
              >
                {range.label}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setActiveCta(EXPORT_CTA)}
          className="border-line text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 1v7M3.5 5 6 8l2.5-3M2 10h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Export
        </button>
      </div>
      <ManagerActionPlaceholderModal
        cta={activeCta}
        onClose={() => setActiveCta(null)}
      />
    </header>
  );
}
