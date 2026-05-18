/* admin.html lines 65467-65485: fr-quickstats card hand-translated
   Reused for Related links (6 rows) and SLO snapshot (5 rows) */

import type { IcQuickstatsCardData } from '@/lib/mock-data/admin/internal-incidents-data';
import { IcQuickstatsRow } from './ic-quickstats-row';

interface IcQuickstatsCardProps {
  data: IcQuickstatsCardData;
}

export function IcQuickstatsCard({ data }: IcQuickstatsCardProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      <div className="py-[10px] px-[16px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)]">
        <h4 className="font-display text-[13px] font-medium text-[var(--ink)] tracking-[-0.01em] m-0">
          {data.title}
        </h4>
      </div>
      <div className="py-[6px] px-[16px]">
        {data.rows.map((row, idx) => (
          <IcQuickstatsRow key={idx} row={row} />
        ))}
      </div>
    </div>
  );
}
