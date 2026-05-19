/* admin.html lines 66946-67067: fr-rail sticky aside — preview card + categorization
   Sticky pattern uses Step 35 fix: max-h calc(100vh-44px) + overflow-y-auto so tall rail content stays reachable
   Mobile: static + order-[-1] above main column at ≤1080px */

import type {
  KbPreviewCardData,
  KbCategorizationData,
} from '@/lib/mock-data/admin/knowledge-base-data';
import { KbPreviewCard } from './kb-preview-card';
import { KbCategorizationCard } from './kb-categorization-card';

interface KbDetailRailProps {
  preview: KbPreviewCardData;
  categorization: KbCategorizationData;
}

export function KbDetailRail({ preview, categorization }: KbDetailRailProps) {
  return (
    <aside className="sticky top-[22px] self-start space-y-[14px] max-[1080px]:static max-[1080px]:order-[-1]">
      <KbPreviewCard data={preview} />
      <KbCategorizationCard data={categorization} />
    </aside>
  );
}
