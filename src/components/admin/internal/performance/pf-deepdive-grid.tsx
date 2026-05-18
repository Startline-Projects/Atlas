/* admin.html lines 64739-64843: pf-deepdive-grid — 2-col grid (top + improving cards), collapses to 1-col at 1080px */

import { PfDeepDiveCardComponent } from './pf-deepdive-card';
import type { PfDeepDiveGridData } from '@/lib/mock-data/admin/performance-data';

interface PfDeepDiveGridProps {
  data: PfDeepDiveGridData;
}

export function PfDeepDiveGrid({ data }: PfDeepDiveGridProps) {
  return (
    <div className="grid grid-cols-2 gap-[16px] max-[1080px]:grid-cols-1">
      {data.cards.map((card) => (
        <PfDeepDiveCardComponent key={card.id} card={card} />
      ))}
    </div>
  );
}
