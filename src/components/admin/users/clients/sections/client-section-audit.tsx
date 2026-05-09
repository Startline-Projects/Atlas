'use client';

import { Fragment, useState } from 'react';
import type { ClientProfile } from '@/lib/mock-data/admin/client-profiles-data';
import { cn } from '@/lib/utils/cn';

interface ClientSectionAuditProps {
  profile: ClientProfile;
}

export function ClientSectionAudit({ profile }: ClientSectionAuditProps) {
  const auditLog = profile.auditLog;
  const recentLength = auditLog?.recent.length ?? 0;
  const [expandedCount] = useState(recentLength);

  if (!auditLog || auditLog.recent.length === 0) {
    return null;
  }

  // admin.html lines 3785-3791: data-cat dot color variants
  const getDotColor = (category: string) => {
    switch (category) {
      case 'suspension':
      case 'ban':
        return 'bg-[var(--danger)]';
      case 'refund':
        return 'bg-[var(--success)]';
      case 'dispute':
        return 'bg-[var(--amber)]';
      case 'override':
        return 'bg-[var(--super)]';
      case 'signin':
        return 'bg-[var(--lime-deep)]';
      case 'export':
        return 'bg-[var(--ink-soft)]';
      default:
        return 'bg-[var(--ink)]';
    }
  };

  // admin.html lines 3873-3879: timeline-tag color variants
  const getTagColor = (category: string) => {
    switch (category) {
      case 'suspension':
      case 'ban':
        return 'bg-[var(--danger-bg)] text-[var(--danger)]';
      case 'refund':
        return 'bg-[var(--success-bg)] text-[var(--success)]';
      case 'dispute':
        return 'bg-[var(--amber-bg)] text-[var(--amber)]';
      case 'override':
        return 'bg-[rgba(110,63,224,0.15)] text-[var(--super)]';
      case 'signin':
        return 'bg-[rgba(214,242,77,0.3)] text-[var(--ink)]';
      case 'investigation':
        return 'bg-[var(--navy-bg)] text-[var(--navy)]';
      default:
        return 'bg-[var(--cream-deep)] text-[var(--ink-soft)]';
    }
  };

  // Default category-derived label (overridden by entry.tagLabel when present)
  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      profile: 'PROFILE',
      signin: 'SIGN-IN',
      contract: 'CONTRACT',
      review: 'REVIEW',
      flag: 'FLAG',
      decision: 'DECISION',
      interview: 'INTERVIEW',
      created: 'CREATED',
      export: 'EXPORT',
      refund: 'REFUND',
      dispute: 'DISPUTE',
      override: 'OVERRIDE',
      charge: 'CHARGE',
      suspension: 'SUSPENSION',
    };
    return labels[category] || category.toUpperCase();
  };

  return (
    // admin.html line 17975: <section class="cd-section" id="cl-section-audit">
    <section
      id="cl-section-audit"
      className="border-t border-[var(--line)] py-[36px] scroll-mt-[80px] first:border-t-0 first:pt-[12px]"
    >
      {/* admin.html line 17976: <div class="cd-section-head"> */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            08 · 08
          </span>
          <h2 className="font-display [font-variation-settings:'opsz'_96] text-[24px] font-medium tracking-[-0.02em] leading-[1.1]">
            Audit log
          </h2>
        </div>
        {/* admin.html line 17981: <span class="cd-section-status"> */}
        <span
          className={cn(
            'inline-flex items-center gap-[6px]',
            'font-mono text-[10px] tracking-[0.14em] uppercase',
            'font-semibold pt-[3px] pb-[3px] pl-[8px] pr-[9px] rounded-full',
            'bg-[var(--success-bg)] text-[var(--success)]',
            "before:content-[''] before:w-[5px] before:h-[5px]",
            'before:rounded-full before:bg-[currentColor]'
          )}
        >
          {auditLog.totalEvents} events · immutable
        </span>
      </div>

      {/* admin.html line 17984: <div class="timeline"> */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        {auditLog.recent.map((entry, idx) => (
          <Fragment key={idx}>
            {/* Day group header (admin.html lines 17986-17989) — only when entry.dayGroup present */}
            {entry.dayGroup && (
              <div
                className={cn(
                  'flex items-center gap-[10px] px-[18px] py-[10px]',
                  'bg-[var(--paper-deep)]',
                  'border-t border-b border-[var(--line-soft)]',
                  'font-mono text-[10px] tracking-[0.16em] uppercase',
                  'text-[var(--ink-mute)] font-semibold',
                  idx === 0 && 'border-t-0'
                )}
              >
                <span>{entry.dayGroup.label}</span>
                <span className="ml-auto font-medium tracking-[0.06em] text-[10px] text-[var(--ink-mute)]">
                  {entry.dayGroup.count} {entry.dayGroup.count === 1 ? 'event' : 'events'}
                </span>
              </div>
            )}

            {/* admin.html line 17991: <div class="timeline-entry" data-cat="..."> */}
            <div className="group relative" data-cat={entry.category}>
              <div
                className="grid gap-[18px] pl-[18px] pr-[20px] py-[14px] border-b border-dashed border-[var(--line-soft)] last:border-b-0 relative transition-colors duration-[120ms] ease hover:bg-[#FCF9F1] max-[540px]:grid-cols-[auto_1fr] max-[540px]:grid-rows-[auto_auto] max-[540px]:gap-y-[6px] max-[540px]:gap-x-[12px]"
                style={{ gridTemplateColumns: '70px minmax(0, 1fr) auto' }}
              >
                {/* admin.html line 3766: ::before vertical line */}
                <div
                  className="absolute left-[84px] top-0 bottom-0 w-[1px] bg-[var(--line-soft)] max-[540px]:hidden"
                  aria-hidden="true"
                />
                {/* admin.html line 3775: ::after dot — color by category */}
                <div
                  className={cn(
                    'absolute left-[81px] top-[18px] w-[7px] h-[7px] rounded-full',
                    'shadow-[0_0_0_3px_var(--paper)]',
                    getDotColor(entry.category),
                    'max-[540px]:hidden'
                  )}
                  aria-hidden="true"
                />

                {/* admin.html line 17992: <span class="timeline-time"> */}
                <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] font-medium pt-[3px] text-right whitespace-pre-line max-[540px]:hidden">
                  {entry.time}
                </span>

                {/* admin.html line 17993: <div class="timeline-content"> */}
                <div className="pl-[14px] min-w-0 max-[540px]:pl-0 max-[540px]:col-span-2">
                  {/* admin.html line 17994: <div class="timeline-action"> verb · target */}
                  <div className="text-[13.5px] text-[var(--ink)] leading-[1.4] mb-[4px]">
                    <span className="font-medium">{entry.verb}</span>
                    {entry.target && (
                      <>
                        {' · '}
                        <span className="font-semibold">{entry.target}</span>
                      </>
                    )}
                  </div>
                  {/* admin.html line 17995: <div class="timeline-detail"> */}
                  <div className="text-[12px] text-[var(--ink-mute)] leading-[1.5] flex flex-wrap gap-y-[4px] gap-x-[12px]">
                    <span>{entry.detail}</span>
                    {entry.outcome && (
                      <>
                        <span className="text-[var(--line-strong)]">·</span>
                        <span
                          className={cn(
                            'inline-flex items-center gap-[4px]',
                            'font-mono text-[10.5px] tracking-[0.04em] uppercase',
                            'font-semibold px-[7px] py-[1px] rounded-[3px]',
                            entry.outcome.variant === 'success' && 'bg-[var(--success-bg)] text-[var(--success)]',
                            entry.outcome.variant === 'partial' && 'bg-[var(--amber-bg)] text-[var(--amber)]',
                            entry.outcome.variant === 'escalated' && 'bg-[rgba(110,63,224,0.12)] text-[var(--super)]'
                          )}
                        >
                          {entry.outcome.label.toUpperCase()}
                        </span>
                      </>
                    )}
                    {entry.refId && (
                      <>
                        <span className="text-[var(--line-strong)]">·</span>
                        {/* admin.html line 18053: <span class="ref-id"> */}
                        <span className="font-mono text-[11px] text-[var(--ink-soft)] bg-[var(--cream-deep)] px-[6px] py-[1px] rounded-[3px] tracking-[0.02em]">
                          {entry.refId}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* admin.html line 18003: <span class="timeline-tag"> */}
                <span
                  className={cn(
                    'font-mono text-[9px] tracking-[0.14em] uppercase',
                    'px-[8px] py-[3px] rounded-[3px] font-semibold whitespace-nowrap',
                    'flex-shrink-0 self-start mt-[2px]',
                    'max-[540px]:col-start-2 max-[540px]:justify-self-end max-[540px]:row-start-1',
                    getTagColor(entry.category)
                  )}
                >
                  {entry.tagLabel ?? getCategoryLabel(entry.category)}
                </span>
              </div>
            </div>
          </Fragment>
        ))}
      </div>

      {/* admin.html line 18129: <div class="timeline-footer"> */}
      <div className="flex items-center justify-between px-[18px] py-[14px] border-t border-[var(--line-soft)] text-[12px] text-[var(--ink-mute)] flex-wrap gap-[10px] bg-[var(--paper)] border-x border-b border-[var(--line)] rounded-b-[var(--r-md)] -mt-[1px]">
        <span>
          Showing {Math.min(expandedCount, auditLog.recent.length)} of {auditLog.totalEvents} events
        </span>
        {auditLog.totalEvents > auditLog.recent.length && (
          <button
            type="button"
            className="font-body text-[12px] text-[var(--ink-soft)] bg-transparent border-0 cursor-pointer transition-colors duration-[150ms] ease hover:text-[var(--ink)] underline-offset-[3px] hover:underline"
          >
            Load more
          </button>
        )}
      </div>
    </section>
  );
}
