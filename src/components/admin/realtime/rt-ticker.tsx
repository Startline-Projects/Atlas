'use client';

/* admin.html live-event ticker (right-edge slide-out) — markup lines 68182-68312 + CSS 33034-33193.
   Global panel mounted once in the (admin) layout. tickerOpen (context) drives the right-edge
   slide transition (right:-340px → right:0, 250ms). Closes on Escape + the head X button
   (admin.html has no click-outside, so neither do we). Keyframes provided by RtStatusPill's
   <style> tag (always mounted in topbar). */

import { useEffect } from 'react';
import { useRtRealtime } from '@/lib/admin/realtime-context';
import { rtTickerData } from '@/lib/mock-data/admin/realtime-data';
import { RtTickerHead } from './rt-ticker-head';
import { RtTickerFoot } from './rt-ticker-foot';
import { RtEventRow } from './rt-event-row';

export function RtTicker() {
  const { tickerOpen, closeTicker } = useRtRealtime();

  useEffect(() => {
    if (!tickerOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeTicker();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [tickerOpen, closeTicker]);

  return (
    <aside
      role="complementary"
      aria-label="Live event ticker"
      aria-hidden={!tickerOpen}
      className={`fixed top-[60px] bottom-0 w-[340px] bg-[var(--paper)] border-l border-l-[var(--line)] shadow-[-8px_0_24px_rgba(50,38,28,0.06)] z-[95] flex flex-col transition-[right] duration-[250ms] ease-in-out max-[720px]:w-[92vw] max-[720px]:top-[56px] ${
        tickerOpen ? 'right-0' : 'right-[-340px] max-[720px]:right-[-92vw]'
      }`}
    >
      <RtTickerHead title={rtTickerData.headTitle} meta={rtTickerData.headMeta} />
      <div className="flex-1 overflow-y-auto p-0">
        {rtTickerData.events.map((ev) => (
          <RtEventRow key={ev.id} event={ev} />
        ))}
      </div>
      <RtTickerFoot
        stats={rtTickerData.footStats}
        linkLabel={rtTickerData.footLinkLabel}
        linkHref={rtTickerData.footLinkHref}
      />
    </aside>
  );
}
