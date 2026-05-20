'use client';

/* admin.html ticker head — markup lines 68183-68191 + CSS 33054-33097.
   Pulsing rth-dot (rts-pulse-live) + h3 title + rth-meta + X close (closeTicker). */

import { useRtRealtime } from '@/lib/admin/realtime-context';

export function RtTickerHead({ title, meta }: { title: string; meta: string }) {
  const { closeTicker } = useRtRealtime();

  return (
    <div className="flex items-center justify-between gap-[10px] py-[12px] px-[16px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)]">
      <h3 className="font-display text-[14.5px] font-medium tracking-[-0.01em] text-[var(--ink)] m-0 flex items-center gap-[8px]">
        <span className="w-[7px] h-[7px] rounded-full bg-[var(--success)] shadow-[0_0_0_0_rgba(46,125,84,0.7)] animate-[rts-pulse-live_2s_ease-in-out_infinite]" />
        {title}
      </h3>
      <div className="inline-flex items-center gap-[8px]">
        <span className="font-mono text-[9.5px] tracking-[0.06em] text-[var(--ink-mute)] font-bold">
          {meta}
        </span>
        <button
          type="button"
          onClick={closeTicker}
          aria-label="Close"
          className="bg-transparent border-0 p-[4px] cursor-pointer text-[var(--ink-mute)] grid place-items-center hover:text-[var(--ink)]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
