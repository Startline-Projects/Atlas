/* admin.html lines 62186-62248: event log — head + 8 event rows (success/error variants) */

import type { IntEvent } from '@/lib/mock-data/admin/integrations-data';

interface IntEventLogProps {
  headTitle: string;
  headMeta: string;
  events: IntEvent[];
}

export function IntEventLog({ headTitle, headMeta, events }: IntEventLogProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      {/* Log head */}
      <div className="flex items-center justify-between gap-[12px] py-[12px] px-[18px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)] flex-wrap">
        <h3 className="font-display text-[14.5px] font-medium tracking-[-0.01em] text-[var(--ink)] m-0">
          {headTitle}
        </h3>
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
          {headMeta}
        </div>
      </div>

      {/* Event rows */}
      {events.map((event, idx) => (
        <EventRow key={idx} event={event} />
      ))}
    </div>
  );
}

function EventRow({ event }: { event: IntEvent }) {
  const rowBg =
    event.variant === 'error' ? 'bg-[rgba(194,65,43,0.04)]' : '';

  const dotClasses =
    event.variant === 'success'
      ? 'bg-[var(--success)]'
      : event.variant === 'error'
      ? 'bg-[var(--danger)] animate-[pulse-live_1.4s_ease-in-out_infinite]'
      : 'bg-[var(--amber)]';

  const resultColor =
    event.variant === 'success'
      ? 'text-[var(--success)]'
      : event.variant === 'error'
      ? 'text-[var(--danger)]'
      : 'text-[var(--amber)]';

  return (
    <div
      className={`grid grid-cols-[130px_8px_minmax(0,1fr)_100px] gap-[12px] items-center py-[8px] px-[18px] border-b border-b-[var(--line-soft)] last:border-b-0 font-mono text-[11px] cursor-pointer hover:bg-[var(--paper-deep)] transition-colors max-[720px]:grid-cols-[110px_8px_minmax(0,1fr)] max-[720px]:px-[14px] ${rowBg}`}
    >
      <div className="text-[var(--ink-soft)] font-semibold tracking-[0.02em] tabular-nums">
        {event.time}
      </div>
      <div className={`w-[8px] h-[8px] rounded-full ${dotClasses}`} />
      <div
        className="font-body text-[12px] text-[var(--ink)] font-semibold tracking-[-0.01em] truncate [&_[data-meta]]:font-mono [&_[data-meta]]:text-[10px] [&_[data-meta]]:text-[var(--ink-mute)] [&_[data-meta]]:font-medium [&_[data-meta]]:tracking-[0.02em] [&_[data-meta]]:ml-[6px] [&_a]:text-[var(--danger)] [&_a]:underline [&_a]:cursor-pointer"
        dangerouslySetInnerHTML={{ __html: event.textHtml }}
      />
      <div className={`font-mono text-[10px] font-bold tracking-[0.06em] uppercase text-right max-[720px]:hidden ${resultColor}`}>
        {event.resultLabel}
      </div>
    </div>
  );
}
