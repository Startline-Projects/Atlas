'use client';

/* admin.html lines 68049-68128 + CSS 32543-32702: welcome modal
   hero (dark gradient + blurred amber glow blob) + body (prose + 8 overview rows + footnote) + foot (skip/start) */

import type { ObWelcomeData } from '@/lib/mock-data/admin/onboarding-data';
import { ObOverviewRowItem } from './ob-overview-row';

interface ObWelcomeModalProps {
  data: ObWelcomeData;
  onSkip: () => void;
  onStart: () => void;
}

export function ObWelcomeModal({ data, onSkip, onStart }: ObWelcomeModalProps) {
  return (
    <div
      role="dialog"
      aria-label="Onboarding welcome"
      className="w-[540px] max-w-full max-h-[90vh] overflow-y-auto bg-[var(--paper)] border border-[var(--line)] rounded-[12px] shadow-[0_24px_64px_rgba(50,38,28,0.32),0_4px_12px_rgba(50,38,28,0.12)]"
    >
      {/* Hero */}
      <div
        className="relative overflow-hidden pt-[32px] px-[32px] pb-[24px] text-[var(--paper)]"
        style={{ background: 'linear-gradient(135deg, var(--ink), #2A1F18)' }}
      >
        <span
          aria-hidden
          className="absolute top-[-40px] right-[-40px] w-[180px] h-[180px] rounded-full bg-[rgba(232,118,58,0.18)] blur-[40px] pointer-events-none"
        />
        <div className="relative font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(251,248,242,0.7)] font-bold mb-[8px]">
          {data.heroEyebrow}
        </div>
        <h2 className="relative font-display text-[32px] font-medium tracking-[-0.025em] m-0 mb-[8px] leading-[1.15]">
          {data.heroTitle}
        </h2>
        <div
          className="relative font-mono text-[11.5px] tracking-[0.04em] text-[rgba(251,248,242,0.75)] [&_strong]:text-[var(--paper)] [&_strong]:font-bold"
          dangerouslySetInnerHTML={{ __html: data.heroMetaHtml }}
        />
      </div>

      {/* Body */}
      <div className="pt-[22px] px-[32px] pb-[18px]">
        {data.bodyProse.map((para, idx) => (
          <p
            key={idx}
            className="font-body text-[14.5px] text-[var(--ink-soft)] leading-[1.65] tracking-[-0.005em] m-0 mb-[14px] [&_strong]:text-[var(--ink)] [&_strong]:font-semibold [&_em]:italic"
            dangerouslySetInnerHTML={{ __html: para }}
          />
        ))}

        <div className="grid grid-cols-2 gap-[10px] mt-[16px] mb-[6px]">
          {data.overviewRows.map((row) => (
            <ObOverviewRowItem key={row.num} row={row} />
          ))}
        </div>

        <p
          className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[14px] leading-[1.55] [&_strong]:text-[var(--ink-soft)]"
          dangerouslySetInnerHTML={{ __html: data.footnoteHtml }}
        />
      </div>

      {/* Foot */}
      <div className="flex items-center justify-between gap-[12px] pt-[16px] px-[32px] pb-[24px] border-t border-t-[var(--line-soft)] bg-[var(--paper-deep)] flex-wrap">
        <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
          {data.footMeta}
        </span>
        <div className="inline-flex gap-[8px]">
          <button
            type="button"
            onClick={onSkip}
            className="py-[8px] px-[14px] bg-transparent border-0 font-mono text-[11px] font-bold tracking-[0.04em] text-[var(--ink-mute)] cursor-pointer hover:text-[var(--ink-soft)] hover:underline"
          >
            {data.skipLabel}
          </button>
          <button
            type="button"
            onClick={onStart}
            className="py-[9px] px-[18px] bg-[var(--ink)] text-[var(--paper)] border-0 rounded-[6px] font-body text-[13.5px] font-semibold tracking-[-0.005em] cursor-pointer hover:bg-[#2A1F18]"
          >
            {data.startLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
