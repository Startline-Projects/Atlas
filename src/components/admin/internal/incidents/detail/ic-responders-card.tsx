/* admin.html lines 65439-65464: fr-quickstats wrapper hand-translated
   paper outer + paper-deep h4 head + body wrapping ic-responder-row entries */

import type { IcRespondersData } from '@/lib/mock-data/admin/internal-incidents-data';
import { IcResponderRow } from './ic-responder-row';

interface IcRespondersCardProps {
  data: IcRespondersData;
}

export function IcRespondersCard({ data }: IcRespondersCardProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      <div className="py-[10px] px-[16px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)]">
        <h4 className="font-display text-[13px] font-medium text-[var(--ink)] tracking-[-0.01em] m-0">
          {data.title}
        </h4>
      </div>
      <div className="py-[2px] px-[16px]">
        {data.responders.map((responder, idx) => (
          <IcResponderRow key={idx} responder={responder} />
        ))}
      </div>
    </div>
  );
}
