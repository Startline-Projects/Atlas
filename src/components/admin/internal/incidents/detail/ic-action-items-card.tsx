/* admin.html lines 65369-65409: action-item rows inside ic-table-wrap outer */

import type { IcActionItemsData } from '@/lib/mock-data/admin/internal-incidents-data';
import { IcActionItemRow } from './ic-action-item';

interface IcActionItemsCardProps {
  data: IcActionItemsData;
}

export function IcActionItemsCard({ data }: IcActionItemsCardProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      {data.items.map((item) => (
        <IcActionItemRow key={item.num} item={item} />
      ))}
    </div>
  );
}
