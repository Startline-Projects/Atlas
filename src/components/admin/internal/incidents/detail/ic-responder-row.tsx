/* admin.html lines 65442-65462 + CSS 30792-30829: single responder row
   30/1fr grid · avatar (inline gradient) + role eyebrow + name */

import type { IcResponder } from '@/lib/mock-data/admin/internal-incidents-data';

interface IcResponderRowProps {
  responder: IcResponder;
}

export function IcResponderRow({ responder }: IcResponderRowProps) {
  return (
    <div className="grid grid-cols-[30px_minmax(0,1fr)] gap-[10px] items-center py-[9px] border-b border-b-dashed border-b-[var(--line-soft)] last:border-b-0">
      <div
        className="w-[30px] h-[30px] rounded-full grid place-items-center font-display text-[11px] font-bold text-[var(--paper)] tracking-[-0.01em] flex-shrink-0"
        style={{ background: responder.avatarGradient }}
      >
        {responder.avatarInitials}
      </div>
      <div className="min-w-0">
        <div className="font-mono text-[8.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold mb-[1px]">
          {responder.role}
        </div>
        <div className="text-[12px] font-bold text-[var(--ink)] tracking-[-0.01em]">
          {responder.name}
        </div>
      </div>
    </div>
  );
}
