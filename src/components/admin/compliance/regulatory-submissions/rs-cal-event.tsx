import type { RsCalEvent } from '@/lib/mock-data/admin/regulatory-submissions-data';

interface RsCalEventProps {
  event: RsCalEvent;
}

export function RsCalEventComponent({ event }: RsCalEventProps) {
  return (
    <div
      className={`grid grid-cols-[60px_minmax(0,1fr)_auto] gap-[12px] items-center py-[8px] px-[12px] bg-[var(--paper-deep)] border border-[var(--line-soft)] rounded-[var(--r-sm)] border-l-[3px] text-[12px] cursor-pointer hover:opacity-90 transition-opacity ${
        event.variant === 'urgent'
          ? 'border-l-[var(--danger)] bg-[rgba(194,65,43,0.04)]'
          : event.variant === 'warn'
            ? 'border-l-[var(--amber)] bg-[rgba(232,118,58,0.04)]'
            : event.variant === 'done'
              ? 'border-l-[var(--success)] opacity-70'
              : 'border-l-[var(--super)]'
      }`}
    >
      <div className="font-mono text-[11px] font-bold text-[var(--ink)] tracking-[0.02em]">
        {event.date}
      </div>

      <div>
        <div className="font-semibold text-[var(--ink)] tracking-[-0.01em] text-[12px]">
          {event.name}
        </div>
        <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[1px]">
          {event.meta}
        </div>
      </div>

      <div className="font-mono text-[9.5px] font-bold tracking-[0.06em] text-[var(--ink-mute)] py-[2px] px-[7px] bg-[var(--paper)] border border-[var(--line-soft)] rounded-[3px] whitespace-nowrap">
        {event.jurisdiction}
      </div>
    </div>
  );
}
