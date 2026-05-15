'use client';

import { useState } from 'react';
import type { YearTab } from '@/lib/mock-data/admin/tax-documents-data';

interface TaxYearTabsProps {
  tabs: YearTab[];
}

export function TaxYearTabs({ tabs }: TaxYearTabsProps) {
  const [activeYear, setActiveYear] = useState(
    () => tabs.find((t) => !t.isUpcoming && t.status !== 'filed')?.year ?? tabs[tabs.length - 1]?.year ?? 2025
  );

  return (
    <div className="inline-flex bg-[var(--paper)] border border-[var(--line)] rounded-full p-[3px] gap-[2px] mb-[16px]">
      {tabs.map((tab) => {
        const isActive = activeYear === tab.year;
        return (
          <button
            key={tab.year}
            type="button"
            onClick={() => setActiveYear(tab.year)}
            className={`font-mono text-[11.5px] font-semibold tracking-[0.06em] py-[5px] px-[14px] rounded-full border-0 cursor-pointer transition-all ${
              isActive
                ? 'bg-[var(--ink)] text-[var(--paper)]'
                : 'bg-transparent text-[var(--ink-mute)] hover:text-[var(--ink)]'
            }`}
          >
            {tab.year}
            <span
              className={`inline-block ml-[6px] text-[9px] tracking-[0.08em] uppercase font-bold py-[1px] px-[5px] rounded-[3px] ${
                isActive && tab.isUpcoming
                  ? 'bg-[rgba(251,248,242,0.12)] text-[var(--amber)]'
                  : isActive
                    ? 'bg-[rgba(251,248,242,0.12)] text-[var(--paper)]'
                    : tab.isUpcoming
                      ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
                      : 'bg-[var(--success-bg)] text-[var(--success)]'
              }`}
            >
              {tab.status}
            </span>
          </button>
        );
      })}
    </div>
  );
}
