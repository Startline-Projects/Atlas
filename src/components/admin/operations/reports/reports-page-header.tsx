/**
 * Phase 14a — Page header: title + meta + date-range pills + Export/Schedule.
 *
 * admin.html markup: L38010-38038
 * admin.html CSS: L14109-14174
 */
'use client';

import { cn } from '@/lib/utils/cn';
import type {
  ReportsDateRangeKey,
  ReportsDateRangeOption,
} from '@/lib/mock-data/admin/reports-analytics-data';

interface ReportsPageHeaderProps {
  pageMeta: string;
  options: ReportsDateRangeOption[];
  active: ReportsDateRangeKey;
  onChange: (key: ReportsDateRangeKey) => void;
}

export function ReportsPageHeader({ pageMeta, options, active, onChange }: ReportsPageHeaderProps) {
  return (
    // rep-page-head — L14109-14118
    <div className="flex items-end justify-between gap-[18px] mb-[22px] pb-[18px] border-b border-[var(--line)] flex-wrap">
      <div className="min-w-0">
        <h1 className="font-display text-[32px] font-medium tracking-[-0.02em] leading-[1.1] m-0 mb-[4px] text-[var(--ink)]">
          Reports &amp; analytics
        </h1>
        <div className="font-mono text-[11px] tracking-[0.04em] text-[var(--ink-mute)]">
          {pageMeta}
        </div>
      </div>

      <div className="inline-flex gap-[10px] items-center flex-wrap">
        {/* Date range segmented control — L14140-14174 */}
        <div
          role="tablist"
          aria-label="Date range"
          className="inline-flex bg-[var(--paper-deep)] border border-[var(--line)] rounded-[var(--r-md)] p-[4px] gap-[2px]"
        >
          {options.map((opt) => {
            const isActive = opt.key === active;
            const isCustom = opt.isCustom === true;
            return (
              <button
                key={opt.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(opt.key)}
                data-rep-range={opt.key}
                className={cn(
                  'cursor-pointer rounded-[6px] py-[6px] px-[12px] transition-colors duration-[120ms] ease',
                  isCustom
                    ? 'inline-flex items-center gap-[6px] font-mono text-[11px]'
                    : 'font-body text-[12px]',
                  !isCustom && 'tracking-[-0.005em] font-medium',
                  isActive
                    ? 'bg-[var(--paper)] text-[var(--ink)] font-semibold shadow-[0_1px_2px_rgba(14,14,12,0.06)]'
                    : 'text-[var(--ink-mute)] hover:text-[var(--ink)]'
                )}
              >
                {isCustom && (
                  <svg
                    width="11" height="11" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="text-[var(--ink-mute)]"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                )}
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Export button — cd-action-btn pattern (CSS L5383-5412) */}
        <button
          type="button"
          data-rep-action="export"
          onClick={() => console.log('[rep-action] export')}
          className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap transition-all duration-150 hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] [&_svg]:text-[var(--ink-mute)] hover:[&_svg]:text-[var(--ink)]"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* Schedule button */}
        <button
          type="button"
          data-rep-action="schedule"
          onClick={() => console.log('[rep-action] schedule')}
          className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap transition-all duration-150 hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] [&_svg]:text-[var(--ink-mute)] hover:[&_svg]:text-[var(--ink)]"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Schedule
        </button>
      </div>
    </div>
  );
}
