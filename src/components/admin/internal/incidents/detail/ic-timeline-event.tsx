/* admin.html lines 65221-65299 + CSS 30578-30660: single timeline event row
   90/18/1fr grid · time+elapsed · dot with phase variant + vertical spine · text + actor */

import type {
  IcTimelineEvent,
  IcTimelinePhase,
} from '@/lib/mock-data/admin/internal-incidents-data';

interface IcTimelineEventRowProps {
  event: IcTimelineEvent;
  isLast: boolean;
}

const dotPhaseClass: Record<IcTimelinePhase, string> = {
  detect:
    'bg-[var(--danger)] animate-[pulse-fr_1.4s_ease-in-out_infinite]',
  escalate: 'bg-[var(--amber)]',
  investigate: 'bg-[var(--super)]',
  mitigate: 'bg-[var(--amber)]',
  resolve: 'bg-[var(--success)]',
  review: 'bg-[var(--ink-soft)]',
};

export function IcTimelineEventRow({ event, isLast }: IcTimelineEventRowProps) {
  const spine = isLast
    ? ''
    : "after:content-[''] after:absolute after:top-[12px] after:left-[5px] after:w-[2px] after:h-[calc(100%+16px)] after:bg-[var(--line)]";

  return (
    <div className="grid grid-cols-[90px_18px_minmax(0,1fr)] gap-[12px] py-[10px] px-[18px] border-b border-b-[var(--line-soft)] last:border-b-0 relative">
      <div className="font-mono text-[11px] font-bold text-[var(--ink-soft)] tracking-[0.04em] tabular-nums pt-[1px]">
        {event.time}
        <span className="block text-[9.5px] font-medium text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
          {event.elapsed}
        </span>
      </div>
      <div
        className={`relative w-[12px] h-[12px] rounded-full mt-[3px] flex-shrink-0 ${dotPhaseClass[event.phase]} ${spine}`}
      />
      <div className="min-w-0">
        <div className="text-[12.5px] text-[var(--ink)] font-semibold tracking-[-0.01em] leading-[1.45] mb-[3px]">
          {event.action}
        </div>
        <div
          className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.55] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold [&_a]:text-[var(--super)] [&_a]:underline [&_a]:font-bold [&_code]:font-mono [&_code]:text-[10.5px] [&_code]:bg-[var(--paper-deep)] [&_code]:py-[1px] [&_code]:px-[4px] [&_code]:rounded-[3px] [&_code]:text-[var(--ink)]"
          dangerouslySetInnerHTML={{ __html: event.detailHtml }}
        />
        <span className="inline-block mt-[4px] font-mono text-[9px] tracking-[0.1em] uppercase font-bold py-[2px] px-[6px] bg-[var(--paper-deep)] border border-[var(--line-soft)] text-[var(--ink-soft)] rounded-[3px]">
          {event.actor}
        </span>
      </div>
    </div>
  );
}
