'use client';

/* admin.html topbar connection pill — markup lines 34354-34359:
     <button class="rt-status live" data-rt-action="open-realtime-page" aria-label="WebSocket connection status: Live, 14ms latency">
       <span class="rts-dot"></span><span class="rts-label">Live</span><span class="rts-latency">14ms</span>
     </button>
   CSS lines 32970-33033 (.rt-status + .live/.reconnect/.offline + .rts-dot/.rts-latency).

   This component also OWNS the 3 NEW rt keyframes (rts-pulse-live / rts-pulse-reconnect /
   rt-event-arrive). They are injected once via a component-scoped <style> tag — globals.css
   stays untouched. The topbar is always mounted, so the keyframes are available app-wide for
   the ticker (Pass B) + live-pulse affordances (Pass C). Tailwind animate-[...] arbitrary
   values reference them by name. */

import { useRouter } from 'next/navigation';
import { useRtRealtime } from '@/lib/admin/realtime-context';
import { rtConnectionLabels } from '@/lib/mock-data/admin/realtime-data';

export function RtStatusPill() {
  const router = useRouter();
  const { connectionState, latencyMs } = useRtRealtime();

  const pillClass =
    connectionState === 'live'
      ? 'bg-[var(--success-bg)] text-[var(--success)]'
      : connectionState === 'reconnect'
        ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
        : 'bg-[var(--danger-bg)] text-[var(--danger)]';

  const dotClass =
    connectionState === 'live'
      ? 'bg-[var(--success)] animate-[rts-pulse-live_2s_ease-in-out_infinite]'
      : connectionState === 'reconnect'
        ? 'bg-[var(--amber)] animate-[rts-pulse-reconnect_0.8s_ease-in-out_infinite]'
        : 'bg-[var(--danger)]';

  const latencyText =
    connectionState === 'live'
      ? `${latencyMs}ms`
      : connectionState === 'reconnect'
        ? '— ms'
        : '';

  const latencyColor =
    connectionState === 'live'
      ? 'text-[rgba(46,125,84,0.7)]'
      : 'text-[var(--ink-mute)]';

  return (
    <>
      <style>{`
@keyframes rts-pulse-live {
  0%, 100% { box-shadow: 0 0 0 0 rgba(46,125,84,0.7); }
  50%      { box-shadow: 0 0 0 4px rgba(46,125,84,0); }
}
@keyframes rts-pulse-reconnect {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.4; transform: scale(0.8); }
}
@keyframes rt-event-arrive {
  0%   { background: var(--success-bg); transform: translateX(8px); opacity: 0; }
  100% { background: transparent; transform: translateX(0); opacity: 1; }
}
`}</style>
      <button
        type="button"
        onClick={() => router.push('/admin/realtime')}
        aria-label={`WebSocket connection status: ${rtConnectionLabels[connectionState]}${
          connectionState === 'live' ? `, ${latencyMs}ms latency` : ''
        }`}
        className={`inline-flex items-center gap-[7px] py-[3px] px-[10px] font-mono text-[10px] font-bold tracking-[0.06em] uppercase rounded-full cursor-pointer transition-colors duration-[120ms] border border-transparent hover:border-[var(--line)] ${pillClass}`}
      >
        <span className={`w-[7px] h-[7px] rounded-full flex-shrink-0 ${dotClass}`} />
        <span>{rtConnectionLabels[connectionState]}</span>
        {latencyText && (
          <span
            className={`font-mono text-[9.5px] font-semibold tracking-[0.02em] ml-[1px] ${latencyColor}`}
          >
            {latencyText}
          </span>
        )}
      </button>
    </>
  );
}
