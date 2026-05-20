/* admin.html active-subscriber row — markup lines 68630-68638 (+ 5 siblings) + CSS 33370-33443.
   4-col grid (avatar · text · rate · status). Avatar uses a verbatim inline gradient (one of the
   6 approved inline styles in this step). status::before dot rendered as an explicit child span. */

import type { RtSubscriber } from '@/lib/mock-data/admin/realtime-data';

export function RtSubscriberRow({ subscriber }: { subscriber: RtSubscriber }) {
  const statusTone =
    subscriber.status === 'online'
      ? 'bg-[var(--success-bg)] text-[var(--success)]'
      : 'bg-[var(--amber-bg)] text-[var(--amber)]';
  const statusLabel = subscriber.status === 'online' ? 'Online' : 'Idle';

  return (
    <div className="grid grid-cols-[32px_minmax(0,1fr)_auto_auto] gap-[12px] items-center py-[10px] px-[16px] border-b border-b-[var(--line-soft)] last:border-b-0">
      <span
        className="w-[28px] h-[28px] rounded-full grid place-items-center font-display text-[11px] font-bold text-[var(--paper)] tracking-[-0.01em] flex-shrink-0"
        style={{ background: subscriber.avatarGradient }}
      >
        {subscriber.initials}
      </span>
      <div className="min-w-0">
        <div className="text-[13px] font-bold text-[var(--ink)] tracking-[-0.005em] leading-[1.3]">
          {subscriber.name}
        </div>
        <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em] font-semibold mt-[2px]">
          {subscriber.channels}
        </div>
      </div>
      <div className="font-mono text-[11px] font-bold tracking-[0.02em] text-[var(--ink)] text-right whitespace-nowrap">
        {subscriber.rate}
        {subscriber.rateMeta && (
          <span className="block text-[9px] font-medium text-[var(--ink-mute)] tracking-[0.04em] mt-[1px]">
            {subscriber.rateMeta}
          </span>
        )}
      </div>
      <span
        className={`inline-flex items-center gap-[4px] py-[2px] px-[6px] font-mono text-[9px] font-bold tracking-[0.06em] uppercase rounded-[3px] ${statusTone}`}
      >
        <span className="w-[5px] h-[5px] rounded-full bg-current" />
        {statusLabel}
      </span>
    </div>
  );
}
