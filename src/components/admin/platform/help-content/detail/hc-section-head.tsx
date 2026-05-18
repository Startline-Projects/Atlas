'use client';

/* admin.html fr-section-head pattern (lines 63760, 63810): cream-deep sh-num badge + h2 + sh-meta with dashed bottom-border separator + optional right action */

import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type { HcSectionHeadData } from '@/lib/mock-data/admin/help-content-data';

interface HcSectionHeadProps {
  head: HcSectionHeadData;
}

export function HcSectionHead({ head }: HcSectionHeadProps) {
  const { showAction } = useAdminActionToast();
  return (
    <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[16px] pb-[12px] border-b border-b-dashed border-b-[var(--line-soft)]">
      <div className="flex items-baseline gap-[10px]">
        <span className="font-mono text-[9.5px] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[2px] px-[6px] rounded-[3px] font-bold tracking-[0.06em]">
          {head.num}
        </span>
        <div>
          <h2 className="font-display text-[18px] font-medium tracking-[-0.01em] m-0 leading-[1.2] text-[var(--ink)]">
            {head.title}
          </h2>
          <div
            className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[4px] [&_code]:font-mono [&_code]:text-[10.5px] [&_code]:bg-[var(--paper-deep)] [&_code]:py-[1px] [&_code]:px-[4px] [&_code]:rounded-[3px] [&_code]:text-[var(--ink-soft)]"
            dangerouslySetInnerHTML={{ __html: head.meta }}
          />
        </div>
      </div>
      {head.actionLabel && (
        <button
          type="button"
          onClick={() => head.actionLabel && showAction(head.actionLabel)}
          className="inline-flex items-center gap-[6px] py-[6px] px-[11px] font-mono text-[10.5px] font-bold tracking-[0.04em] uppercase rounded-full bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] cursor-pointer transition-all whitespace-nowrap flex-shrink-0"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          {head.actionLabel}
        </button>
      )}
    </div>
  );
}
