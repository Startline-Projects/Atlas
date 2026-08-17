"use client";

/**
 * DaHeader — Daily Activity Audit page header.
 *
 * Eyebrow + title + dynamic subtitle + 4 date-range tabs (Today
 * enabled; Yesterday/7d/30d disabled per Q3) + Custom date button
 * (modal trigger, landsInStep: 14 — coming soon) + Submit Manager
 * daily button (disabled span per Q7 — Step 11 flips to real Link).
 *
 * Subtitle is dynamic: counts come from team.ts via the orchestrator.
 *
 * Ported from prototype lines 28411-28433.
 */

import { useState } from "react";
import { ManagerActionPlaceholderModal } from "@/components/manager/dashboard/manager-action-placeholder-modal";
import type { ManagerActionCTA } from "@/lib/mock-data/manager/manager-rail";
import type { Specialist } from "@/lib/mock-data/manager/team";
import { cn } from "@/lib/utils/cn";
import type { DateRange } from "./da-audit-list";

const TODAY_LABEL = "Thursday, April 30";

const CUSTOM_DATE_CTA: ManagerActionCTA = {
  label: "Custom date",
  landsInStep: 14,
  description: "Custom-date picker — coming soon.",
};

type DateRangeDef = {
  key: DateRange;
  label: string;
  /** Step 6 only enables "today"; others are visible-but-disabled. */
  enabled: boolean;
};

const RANGES: ReadonlyArray<DateRangeDef> = [
  { key: "today", label: "Today", enabled: true },
  { key: "yesterday", label: "Yesterday", enabled: false },
  { key: "7d", label: "7 days", enabled: false },
  { key: "30d", label: "30 days", enabled: false },
];

type DaHeaderProps = {
  dateRange: DateRange;
  onDateRangeChange: (next: DateRange) => void;
  specialists: ReadonlyArray<Specialist>;
};

export function DaHeader({ dateRange, onDateRangeChange, specialists }: DaHeaderProps) {
  const [activeCta, setActiveCta] = useState<ManagerActionCTA | null>(null);

  const subtitle = `Auditing ${specialists.length} Talent Specialists · ${TODAY_LABEL}`;

  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-line-soft pb-6">
      <div>
        <div className="text-ink-mute mb-2 font-mono text-[10px] tracking-[0.18em] uppercase">
          Manager
        </div>
        <h1
          className="font-display text-ink m-0 text-[clamp(28px,3.6vw,40px)] leading-[1.05] font-normal tracking-[-0.02em]"
        >
          Daily activity{" "}
          <em
            className="font-display"
            style={{ fontVariationSettings: '"opsz" 144' }}
          >
            audit
          </em>
        </h1>
        <p className="text-ink-soft mt-2 m-0 text-[13.5px]">{subtitle}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {/* Date-range tabs — only "today" enabled in Step 6. */}
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
          onClick={() => setActiveCta(CUSTOM_DATE_CTA)}
          className="border-line text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <rect x="1.5" y="2.5" width="9" height="8" rx="1" stroke="currentColor" strokeWidth="1.3" />
            <path d="M1.5 5h9M4 1v2M8 1v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          Custom date
        </button>
        {/* Submit Manager daily — disabled span until Step 11 lands. */}
        <span
          aria-disabled="true"
          title="Manager daily submission — Step 11"
          className="bg-cream-deep border-line text-ink-mute inline-flex cursor-not-allowed items-center gap-1.5 rounded-md border px-3 py-1.5 text-[12.5px] font-medium opacity-70"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="2.5" y="3" width="11" height="11" rx="1" stroke="currentColor" strokeWidth="1.4" />
            <path d="m6 10 1.2 1.2L9.5 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Submit Manager daily
        </span>
      </div>

      <ManagerActionPlaceholderModal
        cta={activeCta}
        onClose={() => setActiveCta(null)}
      />
    </header>
  );
}
