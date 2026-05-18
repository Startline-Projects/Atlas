/* admin.html lines 63047-63112 + framework .fr-rail rule (line 15970-15979):
   position sticky, NO height cap, NO overflow. Rail flows naturally; sticky
   only engages while parent has room. At ≤1080px, rail unstacks above main
   column (order -1) instead of being hidden. */

import { TmPreviewCard } from './tm-preview-card';
import { TmTestSendCard } from './tm-test-send-card';
import { TmLinkedContext } from './tm-linked-context';
import type {
  TmPreviewCardData,
  TmTestSendData,
  TmLinkedContextData,
} from '@/lib/mock-data/admin/templates-data';

interface TmDetailRailProps {
  preview: TmPreviewCardData;
  testSend: TmTestSendData;
  linked: TmLinkedContextData;
}

export function TmDetailRail({ preview, testSend, linked }: TmDetailRailProps) {
  return (
    <aside className="sticky top-[22px] self-start flex flex-col gap-[14px] max-[1080px]:static max-[1080px]:order-[-1]">
      <TmPreviewCard data={preview} />
      <TmTestSendCard data={testSend} />
      <TmLinkedContext data={linked} />
    </aside>
  );
}
