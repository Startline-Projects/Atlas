'use client';

/* admin.html subscribed-channel card — markup lines 68389-68422 (+ 5 siblings) + CSS 33255-33361.
   All 6 fixture cards are .subscribed (success border + success icon tint). Head (icon + title +
   channel code + Live pulse) → 3-metric strip → foot (note + Step cross-link + Pause toast). */

import Link from 'next/link';
import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import { RtChannelIcon } from './rt-channel-icon';
import { RtLivePulse } from './rt-live-pulse';
import type { RtChannelCard as RtChannelCardData } from '@/lib/mock-data/admin/realtime-data';

export function RtChannelCard({ channel }: { channel: RtChannelCardData }) {
  const { showAction } = useAdminActionToast();

  return (
    <div className="bg-[var(--paper)] border border-[rgba(46,125,84,0.3)] rounded-[var(--r-md)] py-[16px] px-[18px] relative">
      {/* head */}
      <div className="flex items-center justify-between gap-[10px] mb-[12px] flex-wrap">
        <div className="flex items-center gap-[9px] min-w-0">
          <RtChannelIcon icon={channel.iconKey} />
          <div className="min-w-0">
            <h3 className="font-display text-[14.5px] font-medium tracking-[-0.01em] text-[var(--ink)] m-0">
              {channel.title}
            </h3>
            <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] font-bold mt-[2px]">
              channel: <strong className="text-[var(--ink-soft)]">{channel.channelCode}</strong>
            </div>
          </div>
        </div>
        <RtLivePulse />
      </div>

      {/* metrics */}
      <div className="grid grid-cols-3 gap-0 bg-[var(--paper-deep)] rounded-[6px] overflow-hidden mb-[10px]">
        {channel.metrics.map((m, idx) => {
          const tone =
            m.tone === 'success'
              ? 'text-[var(--success)]'
              : m.tone === 'warn'
                ? 'text-[var(--amber)]'
                : 'text-[var(--ink)]';
          return (
            <div
              key={idx}
              className="py-[10px] px-[12px] border-r border-r-[var(--line-soft)] last:border-r-0"
            >
              <div className="font-mono text-[8.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold mb-[4px]">
                {m.label}
              </div>
              <div
                className={`font-display text-[17px] font-medium tracking-[-0.015em] leading-[1] tabular-nums ${tone}`}
              >
                {m.value}
                {m.suffix && (
                  <span className="text-[11px] text-[var(--ink-mute)] ml-[2px]">{m.suffix}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* foot */}
      <div className="flex items-center justify-between gap-[8px] font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em]">
        <span className="[&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold">
          <span dangerouslySetInnerHTML={{ __html: channel.footNoteHtml }} />
          <Link
            href={channel.stepHref}
            className="text-[var(--super)] underline font-bold hover:text-[var(--ink)]"
          >
            {channel.stepLabel}
          </Link>
        </span>
        <span className="inline-flex gap-[4px] flex-shrink-0">
          <button
            type="button"
            onClick={() =>
              showAction(
                'Channel paused for your session · events queue but do not fire UI updates · resume anytime.'
              )
            }
            className="inline-flex items-center py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full cursor-pointer transition-all whitespace-nowrap bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
          >
            Pause
          </button>
        </span>
      </div>
    </div>
  );
}
