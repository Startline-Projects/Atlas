/* admin.html lines 65417-65487: fr-rail sticky aside with 4 cards
   Aside sticks below topbar; commander stays pinned at top of rail; lower cards scroll
   inside the rail (no overlap). Mobile: static stack, no inner scroll at max-[1080px]. */

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
    <aside className="sticky top-[88px] self-start flex flex-col gap-[14px] max-h-[calc(100vh-88px)] max-[1080px]:static max-[1080px]:max-h-none max-[1080px]:order-[-1]">
      <IcCommanderCard data={commander} />
      <div className="flex min-h-0 flex-col gap-[14px] overflow-y-auto max-[1080px]:overflow-visible">
        <IcRespondersCard data={responders} />
        <IcQuickstatsCard data={relatedLinks} />
        <IcQuickstatsCard data={sloSnapshot} />
      </div>
    </aside>
  );
}
