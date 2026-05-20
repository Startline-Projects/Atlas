'use client';

/* admin.html topbar live-ticker toggle — markup lines 34361-34365:
     <button class="rt-ticker-toggle" data-rt-action="open-ticker" aria-label="Open live event ticker" title="Live activity ticker">
       <svg ...><path d="M3 12h4l3-9 4 18 3-9h4"/></svg>
       <span class="rtt-badge"></span>
     </button>
   CSS lines 33195-33217 (.rt-ticker-toggle + .rtt-badge pulsing success dot).
   Opens the right-edge ticker via context (Pass B renders the panel). */

import { useRtRealtime } from '@/lib/admin/realtime-context';

export function RtTickerToggle() {
  const { openTicker } = useRtRealtime();

  return (
    <button
      type="button"
      onClick={openTicker}
      aria-label="Open live event ticker"
      title="Live activity ticker"
      className="inline-grid place-items-center w-[32px] h-[32px] bg-transparent border-0 rounded-[6px] cursor-pointer text-[var(--ink-soft)] relative transition-colors duration-[120ms] hover:bg-[var(--paper-deep)]"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 12h4l3-9 4 18 3-9h4" />
      </svg>
      <span className="absolute top-[4px] right-[4px] w-[8px] h-[8px] rounded-full bg-[var(--success)] animate-[rts-pulse-live_2s_ease-in-out_infinite]" />
    </button>
  );
}
