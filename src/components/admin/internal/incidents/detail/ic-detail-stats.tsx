/* admin.html lines 65173-65195: in-detail-stats 4-up grid */

import type { IcDetailStat } from '@/lib/mock-data/admin/internal-incidents-data';
import { IcDetailStatCell } from './ic-detail-stat';

interface IcDetailStatsProps {
  stats: IcDetailStat[];
}

export function IcDetailStats({ stats }: IcDetailStatsProps) {
  return (
    <div className="grid grid-cols-4 gap-0 bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden mb-[22px] max-[980px]:grid-cols-2 max-[480px]:grid-cols-1">
      {stats.map((stat, idx) => (
        <IcDetailStatCell key={idx} stat={stat} />
      ))}
    </div>
  );
}
