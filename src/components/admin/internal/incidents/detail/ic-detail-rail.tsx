/* admin.html lines 65417-65487: fr-rail sticky aside with 4 cards
   Incident commander + Responders + Related links + SLO snapshot
   Sticky pattern: top-22 self-start gap-14 NO max-h NO overflow (lesson from Step 32/33)
   Mobile: static + order-[-1] above main column at max-[1080px] */

import { IcCommanderCard } from './ic-commander-card';
import { IcRespondersCard } from './ic-responders-card';
import { IcQuickstatsCard } from './ic-quickstats-card';
import type {
  IcCommanderData,
  IcRespondersData,
  IcQuickstatsCardData,
} from '@/lib/mock-data/admin/internal-incidents-data';

interface IcDetailRailProps {
  commander: IcCommanderData;
  responders: IcRespondersData;
  relatedLinks: IcQuickstatsCardData;
  sloSnapshot: IcQuickstatsCardData;
}

export function IcDetailRail({
  commander,
  responders,
  relatedLinks,
  sloSnapshot,
}: IcDetailRailProps) {
  return (
    <aside className="sticky top-[22px] self-start max-h-[calc(100vh-44px)] overflow-y-auto flex flex-col gap-[14px] max-[1080px]:static max-[1080px]:max-h-none max-[1080px]:overflow-visible max-[1080px]:order-[-1]">
      <IcCommanderCard data={commander} />
      <IcRespondersCard data={responders} />
      <IcQuickstatsCard data={relatedLinks} />
      <IcQuickstatsCard data={sloSnapshot} />
    </aside>
  );
}
