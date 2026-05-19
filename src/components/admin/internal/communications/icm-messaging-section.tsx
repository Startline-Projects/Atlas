/* admin.html lines 65621-65844: Section 02 Messaging — 2-col 480px fixed-height layout */

import type { IcmMessagingSectionData } from '@/lib/mock-data/admin/communications-data';
import { IcmThreadList } from './icm-thread-list';
import { IcmConversation } from './icm-conversation';

interface IcmMessagingSectionProps {
  data: IcmMessagingSectionData;
}

export function IcmMessagingSection({ data }: IcmMessagingSectionProps) {
  return (
    <div className="grid grid-cols-[280px_minmax(0,1fr)] gap-[14px] h-[480px] bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden max-[980px]:grid-cols-1 max-[980px]:h-auto">
      <IcmThreadList data={data.threadList} />
      <IcmConversation data={data.conversation} />
    </div>
  );
}
