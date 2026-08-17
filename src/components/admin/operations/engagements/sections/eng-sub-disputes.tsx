'use client';

import type { EngagementProfile, ActiveDispute } from '@/lib/mock-data/admin/engagement-profiles-data';
import { cn } from '@/lib/utils/cn';

interface EngSubDisputesProps {
  engagement: EngagementProfile;
}

function AttentionRow({ dispute, engagementId }: { dispute: ActiveDispute; engagementId: string }) {
  const isDanger = dispute.variant === 'danger';
  return (
    <div
      role="button"
      tabIndex={0}
      data-eng-action="open-dispute"
      onClick={() => {
        // eslint-disable-next-line no-console
        console.log(`[engagement-disputes] open-dispute clicked for ${dispute.refId} on ${engagementId}`);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          // eslint-disable-next-line no-console
          console.log(`[engagement-disputes] open-dispute clicked for ${dispute.refId} on ${engagementId}`);
        }
      }}
      className="grid grid-cols-[auto_1fr_auto] gap-[12px] items-center py-[11px] px-[16px] border-b border-dashed border-[var(--line-soft)] last:border-b-0 text-[12.5px] cursor-pointer transition-colors duration-[120ms] ease hover:bg-[#FCF9F1]"
    >
      <span
        aria-hidden="true"
        className={cn(
          'w-[28px] h-[28px] rounded-full grid place-items-center flex-shrink-0',
          isDanger ? 'bg-[var(--danger-bg)] text-[var(--danger)]' : 'bg-[var(--amber-bg)] text-[var(--amber)]'
        )}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </span>
      <div className="min-w-0">
        <div className="text-[var(--ink)] font-medium">{dispute.text}</div>
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
          {dispute.meta}
        </div>
      </div>
      <span
        className={cn(
          'font-mono text-[10.5px] tracking-[0.02em] whitespace-nowrap font-semibold',
          isDanger ? 'text-[var(--danger)]' : 'text-[var(--amber)]'
        )}
      >
        {dispute.time}
      </span>
    </div>
  );
}

export function EngSubDisputes({ engagement }: EngSubDisputesProps) {
  const { disputes } = engagement;
  const isClean = disputes.status === 'clean';

  return (
    <section
      id="eng-section-disputes"
      className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] [&:first-child]:border-t-0 [&:first-child]:pt-[12px]"
    >
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            05 · 06
          </span>
          <h2 className="font-display text-[24px] font-medium tracking-[-0.02em] leading-[1.1] [font-variation-settings:'opsz'_96] m-0">
            Active disputes
          </h2>
        </div>
        <span
          className={cn(
            'inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold py-[3px] pl-[8px] pr-[9px] rounded-full before:content-[\'\'] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current',
            isClean
              ? 'bg-[var(--success-bg)] text-[var(--success)]'
              : 'bg-[var(--danger-bg)] text-[var(--danger)]'
          )}
        >
          {disputes.statusLine}
        </span>
      </div>

      {isClean ? (
        // admin.html line 8006: .sp-disciplinary-empty — dashed border centered card
        <div className="bg-[var(--paper)] border border-dashed border-[var(--line-strong)] rounded-[var(--r-md)] py-[24px] px-[20px] text-center">
          <div className="w-[36px] h-[36px] mx-auto mb-[10px] rounded-full bg-[var(--success-bg)] text-[var(--success)] grid place-items-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className="font-display text-[16px] font-medium mb-[4px] tracking-[-0.01em]">
            {disputes.cleanTitle}
          </div>
          <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
            {disputes.cleanMeta}
          </div>
        </div>
      ) : (
        // admin.html line 8037: .sp-attention-list — solid border unified card
        <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
          {(disputes.active ?? []).map((d) => (
            <AttentionRow key={d.refId} dispute={d} engagementId={engagement.id} />
          ))}
        </div>
      )}
    </section>
  );
}
