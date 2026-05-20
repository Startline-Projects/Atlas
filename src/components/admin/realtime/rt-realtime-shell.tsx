'use client';

/* admin.html #realtime page (view-realtime) — markup lines 68317-68752.
   fr-wrap → header (3 actions) + 5-stat strip (reused PrStatStrip) + §01 channels (6 cards) +
   §02 subscribers (6 rows) + §03 "where real-time surfaces" prose grid + implementation note.
   Header actions: Open ticker (openTicker) · Force reconnect (pill → reconnect 2s → live) ·
   Subscribe to channel (toast). All toasts verbatim from admin.html rtActionMessages (JS 81532-81540). */

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useRtRealtime } from '@/lib/admin/realtime-context';
import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import { PrStatStrip } from '@/components/admin/compliance/privacy-reports/pr-stat-strip';
import { RtChannelCard } from './rt-channel-card';
import { RtSubscriberRow } from './rt-subscriber-row';
import { RtLivePulse } from './rt-live-pulse';
import {
  rtPageMeta,
  rtPageActions,
  rtPageStats,
  rtChannels,
  rtChannelsSectionMeta,
  rtChannelsFootnote,
  rtSubscribers,
  rtSubscribersFootnote,
  rtSurfaceIntroHtml,
  rtSurfaceCells,
  rtSurfaceImplNoteHtml,
  type RtPageAction,
} from '@/lib/mock-data/admin/realtime-data';

function SectionHead({
  number,
  title,
  meta,
  action,
}: {
  number: string;
  title: string;
  meta: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-[16px] mb-[14px]">
      <div className="flex items-baseline gap-[12px]">
        <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-[var(--ink-mute)]">
          {number}
        </span>
        <div>
          <h2 className="font-display text-[18px] font-medium tracking-[-0.015em] text-[var(--ink)] mb-[3px] leading-[1.2]">
            {title}
          </h2>
          <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] leading-[1.5]">
            {meta}
          </div>
        </div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

function ActionIcon({ id }: { id: RtPageAction['id'] }) {
  if (id === 'open-ticker') {
    return <path d="M3 12h4l3-9 4 18 3-9h4" />;
  }
  if (id === 'reconnect') {
    return (
      <>
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </>
    );
  }
  return (
    <>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </>
  );
}

export function RtRealtimeShell() {
  const { openTicker, setConnectionState } = useRtRealtime();
  const { showAction } = useAdminActionToast();

  const handleAction = (id: RtPageAction['id']) => {
    if (id === 'open-ticker') {
      openTicker();
      return;
    }
    if (id === 'reconnect') {
      setConnectionState('reconnect');
      showAction(
        'Forcing reconnect · drops current WS · re-establishes within ~200ms · subscriptions auto-restored.'
      );
      setTimeout(() => setConnectionState('live'), 2000);
      return;
    }
    showAction(
      'Subscribe to channel · pick from registry (14 channels) · role-scoped · audit-logged.'
    );
  };

  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      {/* Page header */}
      <div className="flex items-start justify-between gap-[20px] mb-[18px] flex-wrap">
        <div className="flex-1 min-w-0">
          <h1 className="font-display text-[28px] font-medium tracking-[-0.025em] text-[var(--ink)] m-0 leading-[1.1] mb-[4px]">
            {rtPageMeta.title}
          </h1>
          <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] flex items-center gap-[10px] flex-wrap">
            <span>{rtPageMeta.meta}</span>
            <span className="inline-flex items-center gap-[6px] py-[3px] px-[8px] bg-[var(--cream-deep)] rounded-full font-mono text-[10px] font-bold tracking-[0.04em] text-[var(--ink-soft)]">
              {rtPageMeta.pulseLabel}
            </span>
          </div>
        </div>
        <div className="inline-flex gap-[8px] flex-wrap items-center flex-shrink-0">
          {rtPageActions.map((action) => (
            <button
              key={action.id}
              type="button"
              onClick={() => handleAction(action.id)}
              className={`inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full cursor-pointer transition-all whitespace-nowrap ${
                action.isPrimary
                  ? 'bg-[var(--ink)] border border-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)]'
                  : 'bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]'
              }`}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <ActionIcon id={action.id} />
              </svg>
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5-stat strip */}
      <PrStatStrip stats={rtPageStats} />

      {/* §01 — Subscribed channels */}
      <section id="rt-section-channels" className="mb-[28px]">
        <SectionHead
          number="01"
          title="Subscribed channels · 12 active"
          meta={
            <>
              {rtChannelsSectionMeta}
              <Link
                href="/admin/compliance/audit-logs"
                className="text-[var(--super)] underline font-bold hover:text-[var(--ink)]"
              >
                Step 25
              </Link>
            </>
          }
        />
        <div className="grid grid-cols-2 gap-[14px] mb-[22px] max-[980px]:grid-cols-1">
          {rtChannels.map((channel) => (
            <RtChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em]">
          {rtChannelsFootnote}
          <button
            type="button"
            onClick={() =>
              showAction('Showing all 12 subscribed channels · 6 additional cards expand below.')
            }
            className="text-[var(--super)] underline font-bold cursor-pointer bg-transparent border-0 p-0"
          >
            show all →
          </button>
        </div>
      </section>

      {/* §02 — Active subscribers */}
      <section id="rt-section-subscribers" className="mb-[28px]">
        <SectionHead
          number="02"
          title="Active subscribers · 9 admins online"
          meta="who's currently subscribed · which channels they're listening to · for support + auditing"
          action={
            <button
              type="button"
              onClick={() =>
                showAction(
                  'Export subscribers CSV · 9 admins · channel-by-admin matrix · audit-logged.'
                )
              }
              className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full cursor-pointer transition-all whitespace-nowrap bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export
            </button>
          }
        />
        <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
          {rtSubscribers.map((subscriber) => (
            <RtSubscriberRow key={subscriber.id} subscriber={subscriber} />
          ))}
        </div>
        <div className="pt-[10px] font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em]">
          {rtSubscribersFootnote}
          <button
            type="button"
            onClick={() =>
              showAction('Showing all 9 active subscribers · 3 specialists appended.')
            }
            className="text-[var(--super)] underline font-bold cursor-pointer bg-transparent border-0 p-0"
          >
            show all →
          </button>
        </div>
      </section>

      {/* §03 — Where real-time surfaces */}
      <section id="rt-section-where" className="mb-[28px]">
        <SectionHead
          number="03"
          title="Where real-time updates surface"
          meta="retrofittable affordances · these surfaces auto-refresh when subscribed events arrive · no page reload required"
        />
        <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[18px] px-[22px] font-body text-[13.5px] leading-[1.7] text-[var(--ink-soft)] tracking-[-0.005em]">
          <p
            className="m-0 mb-[14px] [&_strong]:text-[var(--ink)]"
            dangerouslySetInnerHTML={{ __html: rtSurfaceIntroHtml }}
          />
          <div className="grid grid-cols-2 gap-[14px] mb-[14px] max-[720px]:grid-cols-1">
            {rtSurfaceCells.map((cell) => (
              <div
                key={cell.linkLabel}
                className="bg-[var(--paper-deep)] rounded-[6px] py-[12px] px-[14px] font-mono text-[11.5px] leading-[1.6] tracking-[0.02em]"
              >
                <strong className="text-[var(--ink)]">
                  <Link
                    href={cell.href}
                    className="text-[var(--super)] underline hover:text-[var(--ink)]"
                  >
                    {cell.linkLabel}
                  </Link>
                  {cell.stepSuffix}
                </strong>
                <br />
                {cell.descPrefix}
                {cell.livePulse && <RtLivePulse />}
                {cell.descSuffix}
              </div>
            ))}
          </div>
          <p
            className="m-0 font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.65] [&_strong]:text-[var(--ink-soft)] [&_code]:font-mono [&_code]:text-[11px] [&_code]:bg-[var(--paper-deep)] [&_code]:px-[5px] [&_code]:py-[1px] [&_code]:rounded-[3px]"
            dangerouslySetInnerHTML={{ __html: rtSurfaceImplNoteHtml }}
          />
        </div>
      </section>
    </div>
  );
}
