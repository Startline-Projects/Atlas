/* admin.html lines 62327-62375: fr-rail right sidebar — Account / Billing / Support cards stacked */

import { IntAccountCard } from './int-account-card';
import { IntQuickstats } from './int-quickstats';
import type { IntDetailRail as IntDetailRailData } from '@/lib/mock-data/admin/integrations-data';

interface IntDetailRailProps {
  rail: IntDetailRailData;
}

export function IntDetailRail({ rail }: IntDetailRailProps) {
  return (
    <aside className="sticky top-[80px] self-start flex flex-col gap-[16px] max-[1080px]:hidden">
      <IntAccountCard data={rail.account} />
      <IntQuickstats data={rail.billing} />
      <IntQuickstats data={rail.support} />
    </aside>
  );
}
