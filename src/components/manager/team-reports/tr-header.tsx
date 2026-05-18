"use client";

/**
 * TrHeader — Team Reports page header.
 *
 * Eyebrow + title "Team reports & analytics" + dynamic subtitle
 * (specialist count + month) + 5 date-range tabs (Month active;
 * Today / Week / Quarter / Year disabled per Step 6/7/8/9 pattern)
 * + Export button (modal step 14) + Schedule report button (modal
 * step 14 per Q7).
 *
 * Ported from prototype lines 31010-31033.
 */

import { useState } from "react";
import { ManagerActionPlaceholderModal } from "@/components/manager/dashboard/manager-action-placeholder-modal";
import type { ManagerActionCTA } from "@/lib/mock-data/manager/manager-rail";
import { cn } from "@/lib/utils/cn";

export type DateRange = "today" | "week" | "month" | "quarter" | "year";

const EXPORT_CTA: ManagerActionCTA = {
  label: "Export",
  landsInStep: 14,
  description: "Team-wide analytics export — coming soon.",
};

const SCHEDULE_REPORT_CTA: ManagerActionCTA = {
  label: "Schedule report",
  landsInStep: 14,
  description: "Scheduled reports delivery — coming soon.",
};

type DateRangeDef = { key: DateRange; label: string; enabled: boolean };

const RANGES: ReadonlyArray<DateRangeDef> = [
  { key: "today", label: "Today", enabled: false },
  { key: "week", label: "Week", enabled: false },
  { key: "month", label: "Month", enabled: true },
  { key: "quarter", label: "Quarter", enabled: false },
  { key: "year", label: "Year", enabled: false },
];

const PERIOD_LABEL = "April 2026";

type TrHeaderProps = {
  specialistCount: number;
  dateRange: DateRange;
  onDateRangeChange: (next: DateRange) => void;
};

export function TrHeader({
  specialistCount,
  dateRange,
  onDateRangeChange,
}: TrHeaderProps) {
  const [activeCta, setActiveCta] = useState<ManagerActionCTA | null>(null);
  const subtitle = `Performance snapshot · ${PERIOD_LABEL} · all ${specialistCount} Specialists`;

  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-line-soft pb-6">
      <div>
        <div className="text-ink-mute mb-2 font-mono text-[10px] tracking-[0.18em] uppercase">
          Manager
        </div>
        <h1 className="font-display text-ink m-0 text-[clamp(28px,3.6vw,40px)] leading-[1.05] font-normal tracking-[-0.02em]">
          Team{" "}
          <em
            className="font-display"
            style={{ fontVariationSettings: '"opsz" 144' }}
          >
            reports &amp; analytics
          </em>
        </h1>
        <p className="text-ink-soft mt-2 m-0 text-[13.5px]">{subtitle}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {/* Date-range tabs — only Month enabled in Step 10 */}
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
                  title="Historical / forward-looking ranges land later"
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
        <button
          type="button"
          onClick={() => setActiveCta(SCHEDULE_REPORT_CTA)}
          className="bg-ink text-paper border-ink hover:bg-ink-soft inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
            <rect x="2.5" y="3" width="11" height="11" rx="1" stroke="currentColor" strokeWidth="1.4" />
            <path d="M2.5 6h11M5 2v2M11 2v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          Schedule report
        </button>
      </div>
      <ManagerActionPlaceholderModal
        cta={activeCta}
        onClose={() => setActiveCta(null)}
      />
    </header>
  );
}
