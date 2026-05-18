/* Profile Performance metrics card — reuses pf-deepdive-stat row pattern (130_1fr_auto grid + 6px bar). */

import type { PfProfilePerfData, PfBarVariant } from '@/lib/mock-data/admin/performance-data';

interface PfProfilePerfCardProps {
  data: PfProfilePerfData;
}

function barFillClass(variant: PfBarVariant): string {
  return variant === 'high'
    ? 'bg-[var(--success)]'
    : variant === 'medium'
    ? 'bg-[var(--amber)]'
    : 'bg-[var(--danger)]';
}

export function PfProfilePerfCard({ data }: PfProfilePerfCardProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      <div className="py-[14px] px-[20px] pb-[16px]">
        {data.stats.map((row, idx) => (
          <div
            key={idx}
            className="grid grid-cols-[130px_minmax(0,1fr)_auto] gap-[10px] items-center py-[8px] border-b border-b-dashed border-b-[var(--line-soft)] last:border-b-0"
          >
            <div className="font-mono text-[10px] tracking-[0.06em] uppercase text-[var(--ink-mute)] font-bold">
              {row.label}
            </div>
            <div className="h-[6px] bg-[var(--paper-deep)] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${barFillClass(row.variant)}`}
                style={{ width: `${row.percent}%` }}
              />
            </div>
            <div className="font-mono text-[11.5px] font-bold text-[var(--ink)] tracking-[0.02em] tabular-nums text-right">
              {row.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
