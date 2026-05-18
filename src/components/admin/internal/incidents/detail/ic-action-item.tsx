/* admin.html lines 65370-65408 + CSS 30722-30785: single action item row
   28/1fr/130/90 grid · num circle (3 status colors) · title (complete=line-through) · owner · status */

import type {
  IcActionItem,
  IcActionItemStatus,
} from '@/lib/mock-data/admin/internal-incidents-data';

interface IcActionItemRowProps {
  item: IcActionItem;
}

const numBg: Record<IcActionItemStatus, string> = {
  complete: 'bg-[var(--success)]',
  'in-progress': 'bg-[var(--amber)]',
  todo: 'bg-[var(--ink)]',
};

const titleClass: Record<IcActionItemStatus, string> = {
  complete: 'line-through text-[var(--ink-soft)]',
  'in-progress': 'text-[var(--ink)]',
  todo: 'text-[var(--ink)]',
};

const statusColor: Record<IcActionItemStatus, string> = {
  complete: 'text-[var(--success)]',
  'in-progress': 'text-[var(--amber)]',
  todo: 'text-[var(--ink-mute)]',
};

export function IcActionItemRow({ item }: IcActionItemRowProps) {
  return (
    <div className="grid grid-cols-[28px_minmax(0,1fr)_130px_90px] gap-[12px] items-center py-[12px] px-[18px] border-b border-b-[var(--line-soft)] last:border-b-0 max-[720px]:grid-cols-[28px_minmax(0,1fr)]">
      <div
        className={`grid place-items-center w-[24px] h-[24px] rounded-full font-mono text-[10px] font-bold tracking-[0.04em] text-[var(--paper)] ${numBg[item.status]}`}
      >
        {item.num}
      </div>
      <div className="min-w-0">
        <div
          className={`text-[12.5px] font-bold tracking-[-0.01em] leading-[1.4] ${titleClass[item.status]}`}
        >
          {item.title}
        </div>
        <div
          className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold [&_a]:text-[var(--super)] [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: item.metaHtml }}
        />
      </div>
      <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] font-bold max-[720px]:hidden">
        {item.owner}
      </div>
      <div
        className={`font-mono text-[10px] font-bold tracking-[0.06em] uppercase text-right max-[720px]:hidden ${statusColor[item.status]}`}
      >
        {item.statusLabel}
      </div>
    </div>
  );
}
