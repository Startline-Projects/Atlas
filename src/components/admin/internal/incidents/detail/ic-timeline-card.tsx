/* admin.html lines 65215-65302 + CSS 30547-30577: timeline outer card with internal head + 8 events */

import type { IcTimelineData } from '@/lib/mock-data/admin/internal-incidents-data';
import { IcTimelineEventRow } from './ic-timeline-event';

interface IcTimelineCardProps {
  data: IcTimelineData;
}

export function IcTimelineCard({ data }: IcTimelineCardProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      <div className="py-[12px] px-[18px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)] flex items-center justify-between gap-[10px] flex-wrap">
        <h3 className="font-display text-[14px] font-medium tracking-[-0.01em] text-[var(--ink)] m-0">
          {data.headerTitle}
        </h3>
        <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">
          {data.headerMeta}
        </div>
      </div>
      {data.events.map((event, idx) => (
        <IcTimelineEventRow
          key={idx}
          event={event}
          isLast={idx === data.events.length - 1}
        />
      ))}
    </div>
  );
}
