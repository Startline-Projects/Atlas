'use client';

import { FINANCIAL_STATS } from '@/lib/mock-data/admin/dashboard-data';
import { StatCell } from './stat-cell';

export function FinancialSection() {
  return (
    <>
      {/* Section header */}
      <div className="flex items-center justify-between gap-6 mb-[18px] pb-[18px] border-b border-[var(--color-line)]">
        <h2 className="font-display text-[22px] font-medium leading-tight tracking-[-0.015em]">
          Financial snapshot
        </h2>
        <div className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-[var(--color-ink-mute)]">
          USD · all currencies converted at Wise rate
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-0 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[10px] overflow-hidden max-[880px]:grid-cols-2 max-[480px]:grid-cols-1">
        {FINANCIAL_STATS.map((stat, i) => (
          <StatCell
            key={i}
            label={stat.label}
            value={stat.value}
            valueSuffix={(stat as any).suffix}
            currencyPrefix={!!(stat as any).prefix}
            delta={(stat as any).delta}
            detail={(stat as any).detail}
          />
        ))}
      </div>
    </>
  );
}
