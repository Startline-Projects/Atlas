import type { PrStat } from '@/lib/mock-data/admin/privacy-reports-data';
import { PrStatCell } from './pr-stat-cell';

interface PrStatStripProps {
  stats: PrStat[];
}

export function PrStatStrip({ stats }: PrStatStripProps) {
  return (
    <div className="grid grid-cols-5 gap-0 bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mb-[22px] overflow-hidden max-[1080px]:grid-cols-3 max-[720px]:grid-cols-2">
      {stats.map((stat, idx) => (
        <PrStatCell key={idx} stat={stat} />
      ))}
    </div>
  );
}
