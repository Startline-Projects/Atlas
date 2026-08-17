'use client';

import type { DisputeProfile, DisputeDecisionSide } from '@/lib/mock-data/admin/dispute-profiles-data';
import { cn } from '@/lib/utils/cn';
import { RichInline } from './dispute-rich';

function SideView({ side, isLast }: { side: DisputeDecisionSide; isLast: boolean }) {
  return (
    // admin.html lines 12272-76 — disp-decision-side
    <div className={cn('py-[18px] px-[22px]', !isLast && 'border-r border-dashed border-[var(--line-soft)] max-[720px]:border-r-0 max-[720px]:border-b max-[720px]:border-b-dashed')}>
      <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase font-semibold py-[2px] px-[8px] rounded-[3px] inline-block mb-[8px] bg-[var(--cream-deep)] text-[var(--ink-soft)]">
        {side.tagLabel}
      </span>
      <div className="text-[13.5px] font-semibold text-[var(--ink)] tracking-[-0.01em] mb-[6px]">
        {side.name}
      </div>
      <div
        className={cn(
          'font-display text-[26px] font-medium tracking-[-0.02em] [font-variant-numeric:tabular-nums] leading-[1.1] mb-[4px]',
          side.amountSign === 'neg' ? 'text-[var(--danger)]' : 'text-[var(--success)]'
        )}
      >
        {side.amount}
      </div>
      <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">{side.meta}</div>
    </div>
  );
}

export function DisputeSubDecision({ dispute }: { dispute: DisputeProfile }) {
  const dec = dispute.decision;
  const isDraft = dec.signatureState === 'draft';

  return (
    <section
      id="disp-section-decision"
      className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] [&:first-child]:border-t-0 [&:first-child]:pt-[12px]"
    >
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">04 · 06</span>
          <h2 className="font-display text-[24px] font-medium tracking-[-0.02em] leading-[1.1] [font-variation-settings:'opsz'_96] m-0">
            Specialist&apos;s proposed decision
          </h2>
        </div>
        <span className="inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold py-[3px] pl-[8px] pr-[9px] rounded-full bg-[var(--cream-deep)] text-[var(--ink-soft)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">
          {dec.statusText}
        </span>
      </div>

      {/* admin.html line 12227 — .disp-decision-card (single unified) */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        {/* Head */}
        <div className="py-[14px] px-[22px] bg-[var(--paper-deep)] border-b border-[var(--line)] flex items-center justify-between flex-wrap gap-[8px]">
          <div className="font-display text-[15px] font-medium flex items-center gap-[10px]">{dec.headTitle}</div>
          <span
            className={cn(
              'font-mono text-[9.5px] tracking-[0.14em] uppercase py-[3px] px-[8px] rounded-[3px] font-semibold',
              isDraft ? 'bg-[var(--amber-bg)] text-[var(--amber)]' : 'bg-[var(--success-bg)] text-[var(--success)]'
            )}
          >
            {dec.signatureBadgeText}
          </span>
        </div>

        {/* Body: split */}
        <div className="grid grid-cols-2 border-b border-[var(--line)] max-[720px]:grid-cols-1">
          <SideView side={dec.allocations.client} isLast={false} />
          <SideView side={dec.allocations.candidate} isLast={true} />
        </div>

        {/* Rationale */}
        <div className="py-[18px] px-[22px] bg-[var(--paper-deep)]">
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold mb-[8px]">
            {dec.rationaleLabel}
          </div>
          <div className="text-[13px] text-[var(--ink-soft)] leading-[1.6]">
            {dec.rationaleParagraphs.map((p, i) => (
              <p key={i} className={cn('m-0', i < dec.rationaleParagraphs.length - 1 && 'mb-[10px]')}>
                <RichInline paragraph={p} />
              </p>
            ))}
          </div>
        </div>

        {/* Foot */}
        <div className="py-[12px] px-[22px] border-t border-dashed border-[var(--line-soft)] bg-[var(--paper-deep)] flex items-center justify-between flex-wrap gap-[10px]">
          <span className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em]">
            <RichInline paragraph={dec.footText} />
          </span>
          <button
            type="button"
            data-disp-action="lock-decision"
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log(`[dispute-action] lock-decision for ${dispute.id}`);
            }}
            className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all duration-150 ease whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)]"
          >
            {dec.forceLockLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
