'use client';

/* admin.html framework lines 25449-25474: pill-shaped segmented time selector (Q1/Q2/YTD/12mo) */

import type { PfPeriodTab, PfPeriodValue } from '@/lib/mock-data/admin/performance-data';

interface PfPeriodSelectorProps {
  tabs: PfPeriodTab[];
  active: PfPeriodValue;
  onChange: (value: PfPeriodValue) => void;
}

export function PfPeriodSelector({ tabs, active, onChange }: PfPeriodSelectorProps) {
  return (
    <div className="inline-flex bg-[var(--paper)] border border-[var(--line)] rounded-full p-[3px] gap-[2px]">
      {tabs.map((tab) => {
        const isActive = tab.value === active;
        const btnClasses = isActive
          ? 'bg-[var(--ink)] text-[var(--paper)]'
          : 'bg-transparent text-[var(--ink-mute)] hover:text-[var(--ink)]';
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={`font-mono text-[10.5px] font-semibold tracking-[0.04em] py-[5px] px-[12px] rounded-full border-0 cursor-pointer transition-all ${btnClasses}`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
