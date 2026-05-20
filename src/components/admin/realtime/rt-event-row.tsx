'use client';

/* admin.html ticker event row — markup lines 68196-68304 + CSS 33106-33166.
   3-col grid (24px icon · text · time). .fresh → rt-event-arrive slide-in (once on mount).
   Whole row navigates to the event's resolved route (router.push, ticker stays open). */

import { useRouter } from 'next/navigation';
import { RtEventIcon } from './rt-event-icon';
import type { RtEventRow as RtEventRowData } from '@/lib/mock-data/admin/realtime-data';

export function RtEventRow({ event }: { event: RtEventRowData }) {
  const router = useRouter();
  const freshClass = event.isFresh
    ? 'animate-[rt-event-arrive_0.4s_ease-out]'
    : '';

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => router.push(event.href)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          router.push(event.href);
        }
      }}
      className={`relative grid grid-cols-[24px_minmax(0,1fr)_auto] gap-[10px] py-[10px] px-[14px] border-b border-b-[var(--line-soft)] last:border-b-0 cursor-pointer transition-colors duration-[100ms] hover:bg-[var(--paper-deep)] ${freshClass}`}
    >
      <RtEventIcon type={event.iconType} />
      <div className="min-w-0">
        <div className="text-[12px] font-bold text-[var(--ink)] tracking-[-0.005em] leading-[1.35]">
          {event.title}
        </div>
        <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
          {event.meta}
        </div>
      </div>
      <span className="font-mono text-[9px] text-[var(--ink-mute)] tracking-[0.04em] font-bold whitespace-nowrap self-start pt-[3px]">
        {event.time}
      </span>
    </div>
  );
}
