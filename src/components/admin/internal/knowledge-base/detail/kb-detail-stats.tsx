/* admin.html lines 66774-66796: in-detail-stats 4-up grid wrapper */

import type { KbDetailStat } from '@/lib/mock-data/admin/knowledge-base-data';
import { KbDetailStatCell } from './kb-detail-stat';

interface KbDetailStatsProps {
  stats: KbDetailStat[];
}

export function KbDetailStats({ stats }: KbDetailStatsProps) {
  return (
    <div className="grid grid-cols-4 gap-0 bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden mb-[22px] max-[980px]:grid-cols-2 max-[480px]:grid-cols-1">
      {stats.map((stat, idx) => (
        <KbDetailStatCell key={idx} stat={stat} />
      ))}
    </div>
  );
}
