'use client';

/* admin.html fr-section-head pattern (lines 64065, 64138): sh-num + h2 + sh-meta + dashed bottom + optional right actions */

import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type { PfSectionHead } from '@/lib/mock-data/admin/performance-data';

interface PfSectionHeadProps {
  head: PfSectionHead;
}

export function PfSectionHeadComponent({ head }: PfSectionHeadProps) {
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
            className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[4px] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
            dangerouslySetInnerHTML={{ __html: head.meta }}
          />
        </div>
      </div>
      {head.actions && head.actions.length > 0 && (
        <div className="inline-flex gap-[6px] flex-shrink-0">
          {head.actions.map((action, idx) => {
            const isPrimary = action.isPrimary;
            const btnClasses = isPrimary
              ? 'bg-[var(--ink)] border-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)]'
              : 'bg-[var(--paper)] border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]';
            return (
              <button
                key={idx}
                type="button"
                onClick={() => showAction(action.label)}
                className={`inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full border cursor-pointer transition-all whitespace-nowrap ${btnClasses}`}
              >
                {action.icon === 'user' && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                )}
                {action.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
