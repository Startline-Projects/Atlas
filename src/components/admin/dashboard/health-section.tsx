'use client';

import { HEALTH_STATS, SPARKLINE_HEIGHTS, SPARKLINE_PEAK_INDEX } from '@/lib/mock-data/admin/dashboard-data';
import { StatCell } from './stat-cell';

export function HealthSection() {
  return (
    <>
      {/* Section header */}
      <div className="flex items-center justify-between gap-6 mb-[18px] pb-[18px] border-b border-[var(--color-line)]">
        <h2 className="font-display text-[22px] font-medium leading-tight tracking-[-0.015em]">
          Platform health
        </h2>
        <div className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-[var(--color-ink-mute)]">
          As of 4:42 PM
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-0 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[10px] overflow-hidden max-[880px]:grid-cols-2 max-[480px]:grid-cols-1">
        {HEALTH_STATS.map((stat, i) => (
          <StatCell
            key={i}
            label={stat.label}
            value={stat.value}
            valueSuffix={(stat as any).valueSuffix}
            delta={(stat as any).delta}
            breakdown={(stat as any).breakdown}
            hasSparkline={(stat as any).hasSparkline}
            sparklineHeights={SPARKLINE_HEIGHTS}
            sparklinePeakIndex={SPARKLINE_PEAK_INDEX}
          />
        ))}
      </div>
    </>
  );
}
