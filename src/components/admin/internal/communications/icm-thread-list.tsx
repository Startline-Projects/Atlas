/* admin.html lines 65637-65737 + CSS 30986-31024: thread list left column
   head with title + count, scrollable body with N rows */

import type { IcmThreadListData } from '@/lib/mock-data/admin/communications-data';
import { IcmThreadRow } from './icm-thread-row';

interface IcmThreadListProps {
  data: IcmThreadListData;
}

export function IcmThreadList({ data }: IcmThreadListProps) {
  return (
    <div className="border-r border-r-[var(--line)] flex flex-col min-h-0 max-[980px]:border-r-0 max-[980px]:border-b max-[980px]:border-b-[var(--line)]">
      <div className="flex items-center justify-between gap-[8px] py-[10px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)] flex-shrink-0">
        <h4 className="font-display text-[13.5px] font-medium text-[var(--ink)] tracking-[-0.01em] m-0">
          {data.headTitle}
        </h4>
        <span className="font-mono text-[10px] font-bold text-[var(--ink-mute)] tracking-[0.04em]">
          {data.headCount}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto min-h-0">
        {data.threads.map((thread) => (
          <IcmThreadRow key={thread.id} thread={thread} />
        ))}
      </div>
    </div>
  );
}
