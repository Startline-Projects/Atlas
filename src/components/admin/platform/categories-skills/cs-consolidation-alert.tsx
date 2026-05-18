/* admin.html lines 61010-61043: .cs-consolidation alert banner with icon + text + 2 action buttons */

import type { CsConsolidationData } from '@/lib/mock-data/admin/categories-skills-data';

interface CsConsolidationAlertProps {
  data: CsConsolidationData;
}

export function CsConsolidationAlert({ data }: CsConsolidationAlertProps) {
  return (
    <div className="bg-gradient-to-br from-[var(--amber-bg)] to-[var(--paper)] border border-[rgba(232,118,58,0.3)] rounded-[var(--r-md)] py-[16px] px-[20px] mb-[20px] flex items-center gap-[14px] flex-wrap">
      {/* Icon circle */}
      <div className="w-[38px] h-[38px] rounded-full bg-[var(--amber)] text-[var(--paper)] grid place-items-center flex-shrink-0">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      {/* Text content */}
      <div className="flex-1 min-w-[200px]">
        <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--amber)] font-bold mb-[3px]">
          {data.eyebrow}
        </div>
        <div className="font-display text-[15px] font-medium tracking-[-0.01em] text-[var(--ink)] mb-[3px]">
          {data.title}
        </div>
        <div
          className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.55] [&_strong]:text-[var(--ink)] [&_strong]:font-bold"
          dangerouslySetInnerHTML={{ __html: data.metaHtml }}
        />
      </div>

      {/* Action buttons */}
      <div className="inline-flex gap-[6px] flex-shrink-0">
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] cursor-pointer transition-all whitespace-nowrap"
        >
          {data.viewAllLabel}
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full bg-[var(--ink)] border border-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)] cursor-pointer transition-all whitespace-nowrap"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 16 12 12 8 16" />
            <line x1="12" y1="12" x2="12" y2="21" />
            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
          </svg>
          {data.runLabel}
        </button>
      </div>
    </div>
  );
}
