'use client';

import { useState } from 'react';

const RANGES = ['7d', '30d', '90d', 'YTD'] as const;
type RangeValue = (typeof RANGES)[number] | 'custom';

export function DateRangeTabs() {
  const [active, setActive] = useState<RangeValue>('90d');

  return (
    <div className="inline-flex bg-[var(--paper-deep)] border border-[var(--line)] rounded-[var(--r-md)] p-[4px] gap-[2px]">
      {RANGES.map((r) => {
        const isActive = active === r;
        return (
          <button
            key={r}
            type="button"
            onClick={() => setActive(r)}
            className={`font-body text-[12px] py-[6px] px-[12px] rounded-[6px] tracking-[-0.005em] cursor-pointer transition-colors duration-[120ms] ${
              isActive
                ? 'bg-[var(--paper)] text-[var(--ink)] font-semibold shadow-[0_1px_2px_rgba(14,14,12,0.06)]'
                : 'text-[var(--ink-mute)] font-medium hover:text-[var(--ink)]'
            }`}
          >
            {r}
          </button>
        );
      })}
      <button
        type="button"
        onClick={() => setActive('custom')}
        className={`inline-flex items-center gap-[6px] py-[6px] px-[12px] rounded-[6px] font-mono text-[11px] tracking-[-0.005em] cursor-pointer transition-colors duration-[120ms] ${
          active === 'custom'
            ? 'bg-[var(--paper)] text-[var(--ink)] font-semibold shadow-[0_1px_2px_rgba(14,14,12,0.06)]'
            : 'text-[var(--ink-mute)] hover:text-[var(--ink)]'
        }`}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--ink-mute)]">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        Custom
      </button>
    </div>
  );
}
