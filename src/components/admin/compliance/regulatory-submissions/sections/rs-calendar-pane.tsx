import { RsCalEventComponent } from '../rs-cal-event';
import type { RsCalendarMonth } from '@/lib/mock-data/admin/regulatory-submissions-data';

interface RsCalendarPaneProps {
  months: RsCalendarMonth[];
}

export function RsCalendarPane({ months }: RsCalendarPaneProps) {
  return (
    <div
      data-rs-view-pane="calendar"
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[22px]"
    >
      <div className="grid grid-cols-[80px_minmax(0,1fr)] gap-0">
        {months.map((month) => (
          <div key={month.monthLabel} className="contents">
            {/* Month label */}
            <div className="font-display text-[17px] font-medium tracking-[-0.01em] text-[var(--ink)] py-[14px] pr-[16px] border-r border-r-dashed border-r-[var(--line)] text-right">
              {month.monthLabel}
              <span className="block font-mono text-[9.5px] font-bold text-[var(--ink-mute)] tracking-[0.08em] mt-[3px]">
                {month.yearLabel}
              </span>
            </div>

            {/* Events column */}
            <div className="py-[14px] pl-[18px] pr-0 flex flex-col gap-[8px] border-b border-b-dashed border-b-[var(--line-soft)] last:border-b-0">
              {month.events.map((event) => (
                <RsCalEventComponent key={event.id} event={event} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
