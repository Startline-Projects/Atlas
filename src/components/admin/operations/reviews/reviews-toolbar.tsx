'use client';

import type {
  ReviewsFilterChip,
  ReviewsDirectionTab,
  ReviewFilterKey,
  ReviewDirectionFilterKey,
} from '@/lib/mock-data/admin/review-profiles-data';
import { cn } from '@/lib/utils/cn';

interface ReviewsToolbarProps {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  selectedDirection: ReviewDirectionFilterKey;
  onDirectionChange: (k: ReviewDirectionFilterKey) => void;
  selectedFilter: ReviewFilterKey;
  onFilterChange: (k: ReviewFilterKey) => void;
  directionTabs: ReviewsDirectionTab[];
  filterChips: ReviewsFilterChip[];
}

export function ReviewsToolbar({
  searchQuery,
  onSearchChange,
  selectedDirection,
  onDirectionChange,
  selectedFilter,
  onFilterChange,
  directionTabs,
  filterChips,
}: ReviewsToolbarProps) {
  return (
    <>
      {/* admin.html L12887-12927 — .rev-direction-tabs (independent filter axis) */}
      <div
        role="tablist"
        aria-label="Filter by review direction"
        className="flex gap-[18px] border-b border-[var(--line)] mb-[14px] flex-wrap"
      >
        {directionTabs.map((tab) => {
          const isActive = tab.key === selectedDirection;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              data-rev-dir={tab.key}
              onClick={() => onDirectionChange(tab.key)}
              className={cn(
                'py-[10px] px-0 bg-transparent border-0 border-b-[2px] font-display text-[13.5px] font-medium cursor-pointer transition-[color,border-color] duration-[120ms] ease',
                isActive
                  ? 'text-[var(--ink)] border-[var(--ink)]'
                  : 'text-[var(--ink-mute)] border-transparent hover:text-[var(--ink)]'
              )}
            >
              {tab.label}
              <span
                className={cn(
                  'font-mono text-[10px] py-[1px] px-[6px] rounded-[3px] ml-[4px]',
                  isActive
                    ? 'bg-[var(--ink)] text-[var(--paper)]'
                    : 'bg-[var(--cream-deep)] text-[var(--ink-mute)]'
                )}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search (Phase 12a toolbar pattern) */}
      <div className="flex items-center gap-[12px] mb-[16px] flex-wrap">
        <div className="flex-[1_1_280px] flex items-center gap-[8px] bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[8px] px-[14px] min-w-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-[var(--ink-mute)] flex-shrink-0">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by review ID, reviewer, reviewee, or content phrase…"
            aria-label="Search reviews"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 border-0 bg-transparent font-body text-[13px] text-[var(--ink)] outline-none min-w-0"
          />
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-[12px] mb-[18px] flex-wrap">
        <div className="inline-flex gap-[8px] flex-wrap">
          {filterChips.map((chip) => {
            const isActive = chip.key === selectedFilter;
            return (
              <button
                key={chip.key}
                type="button"
                onClick={() => onFilterChange(chip.key)}
                data-rev-filter={chip.key}
                className={cn(
                  'font-mono text-[10.5px] tracking-[0.06em] py-[7px] px-[12px] border rounded-full cursor-pointer transition-[background,color] duration-[120ms] ease inline-flex items-center gap-[6px]',
                  isActive
                    ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]'
                    : 'bg-[var(--paper)] border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--cream-deep)] hover:text-[var(--ink)]'
                )}
              >
                {chip.label}
                <span
                  className={cn(
                    'text-[9px] py-[1px] px-[6px] rounded-full tracking-[0.04em]',
                    isActive ? 'bg-[rgba(255,255,255,0.18)]' : 'bg-[var(--cream-deep)] text-[var(--ink-mute)]'
                  )}
                >
                  {chip.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
