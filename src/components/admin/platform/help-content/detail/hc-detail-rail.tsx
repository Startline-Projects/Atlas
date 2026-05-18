/* admin.html lines 63879-63987: fr-rail right sidebar — Public preview + Categorization cards stacked.
   Sticky positioning per admin.html .fr-rail framework rule (no max-h, no overflow per Step 32 lesson). */

import { HcPreviewCard } from './hc-preview-card';
import { HcCategorizationCard } from './hc-categorization-card';
import type {
  HcPublicPreviewData,
  HcCategorizationData,
} from '@/lib/mock-data/admin/help-content-data';

interface HcDetailRailProps {
  preview: HcPublicPreviewData;
  categorization: HcCategorizationData;
}

export function HcDetailRail({ preview, categorization }: HcDetailRailProps) {
  return (
    <aside className="sticky top-[22px] self-start flex flex-col gap-[14px] max-[1080px]:static max-[1080px]:order-[-1]">
      <HcPreviewCard preview={preview} />
      <HcCategorizationCard categorization={categorization} />
    </aside>
  );
}
