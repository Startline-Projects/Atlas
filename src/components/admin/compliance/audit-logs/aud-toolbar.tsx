'use client';

import { useState } from 'react';
import { AudTimeRangeTabs } from './aud-time-range-tabs';

interface FilterChip {
  label: string;
  count: number;
  active?: boolean;
}

interface TimeRange {
  label: string;
  value: string;
  active?: boolean;
}

interface AudToolbarProps {
  filterChips: FilterChip[];
  timeRanges: TimeRange[];
}

export function AudToolbar({ filterChips, timeRanges }: AudToolbarProps) {
  const [activeFilter, setActiveFilter] = useState(
    filterChips.find((c) => c.active)?.label ?? filterChips[0]?.label ?? ''
  );

  return (
    <div className="flex flex-col gap-[10px] mb-[18px]">
      {/* Row 1 — search + all category chips on one line */}
      <div className="flex items-center gap-[10px] flex-nowrap min-w-0">
        <div className="flex items-center gap-[8px] py-[8px] px-[14px] bg-[var(--paper)] border border-[var(--line)] rounded-full w-[280px] shrink-0">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--ink-mute)] flex-shrink-0"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search · supports field queries: actor:dario action:ban subject:cl-167"
            className="bg-transparent border-0 outline-none flex-1 min-w-0 font-body text-[12.5px] text-[var(--ink)] placeholder:text-[var(--ink-mute)] placeholder:font-mono placeholder:text-[11px]"
          />
        </div>

        <div className="inline-flex gap-[6px] flex-nowrap items-center min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {filterChips.map((chip) => {
            const isActive = chip.label === activeFilter;
            return (
              <button
                key={chip.label}
                type="button"
                onClick={() => setActiveFilter(chip.label)}
                className={`inline-flex shrink-0 items-center gap-[6px] py-[6px] px-[12px] font-body text-[12px] font-medium rounded-full cursor-pointer tracking-[-0.005em] transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] font-semibold'
                    : 'text-[var(--ink-mute)] bg-[var(--paper-deep)] border border-[var(--line)] hover:text-[var(--ink)] hover:border-[var(--line-strong)]'
                }`}
              >
                {chip.label}
                <span
                  className={`font-mono text-[9.5px] py-[1px] px-[5px] rounded-[3px] font-semibold tracking-[0.04em] ${
                    isActive
                      ? 'bg-[rgba(251,248,242,0.18)] text-[var(--paper)]'
                      : 'bg-[var(--cream-deep)] text-[var(--ink-mute)]'
                  }`}
                >
                  {chip.count.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 2 — time range + Advanced, left-aligned with search bar */}
      <div className="flex items-center justify-start gap-[10px]">
        <AudTimeRangeTabs timeRanges={timeRanges} />
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] transition-all whitespace-nowrap shrink-0"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Advanced
        </button>
      </div>
    </div>
  );
}

