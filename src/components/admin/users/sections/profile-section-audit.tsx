'use client';

import { Fragment, useState } from 'react';
import type { CandidateProfile } from '@/lib/mock-data/admin/candidate-profiles-data';
import { cn } from '@/lib/utils/cn';

interface ProfileSectionAuditProps {
  profile: CandidateProfile;
}

export function ProfileSectionAudit({ profile }: ProfileSectionAuditProps) {
  const [expandedCount] = useState(profile.auditLog.recent.length);

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
      case 'export':
        return 'bg-[var(--cream-deep)] text-[var(--ink-soft)]';
      case 'investigation':
        return 'bg-[var(--navy-bg)] text-[var(--navy)]';
      default:
        return 'bg-[var(--cream-deep)] text-[var(--ink-soft)]';
    }
  };

  const getTagLabel = (category: string) => {
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
    };
    return labels[category] || category.toUpperCase();
  };

  return (
    <section
      id="cd-section-audit"
      className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] first:border-t-0 first:pt-[12px]"
    >
      {/* Section Header */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[16px]">
          <span className="font-display text-[10.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-medium">
            07 · 09
          </span>
          <h2 className="font-display [font-variation-settings:'opsz'_96] text-[24px] font-medium tracking-[-0.02em] leading-[1.1] text-[var(--ink)]">Audit log</h2>
        </div>
        <span className={cn(
          "inline-flex items-center gap-[6px]",
          "font-mono text-[10px] tracking-[0.14em] uppercase",
          "font-semibold px-[9px] py-[3px] rounded-full",
          "bg-[var(--success-bg)] text-[var(--success)]",
          "before:content-[''] before:w-[5px] before:h-[5px]",
          "before:rounded-full before:bg-[currentColor]"
        )}>
          {profile.auditLog.totalEvents} events · immutable
        </span>
      </div>

      {/* Timeline */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        {profile.auditLog.recent.length > 0 ? (
          profile.auditLog.recent.map((entry, idx) => (
            <Fragment key={idx}>
              {/* Day Header — rendered when entry.dayGroup is present */}
              {entry.dayGroup && (
                <div
                  className={cn(
                    'flex items-center gap-[10px]',
                    'px-[18px] py-[10px]',
                    'bg-[var(--paper-deep)]',
                    'border-t border-b border-[var(--line-soft)]',
                    'font-mono text-[10px]',
                    'tracking-[0.16em] uppercase',
                    'text-[var(--ink-mute)] font-semibold',
                    idx === 0 && 'border-t-0'
                  )}
                >
                  <span>{entry.dayGroup.label}</span>
                  <span
                    className={cn(
                      'ml-auto',
                      'font-medium tracking-[0.06em]',
                      'text-[10px] text-[var(--ink-mute)]'
                    )}
                  >
                    {entry.dayGroup.count} {entry.dayGroup.count === 1 ? 'event' : 'events'}
                  </span>
                </div>
              )}

              {/* Timeline Entry */}
              <div
                className="group relative"
                data-cat={entry.category}
              >
                <div
                className="grid gap-[18px] pl-[18px] pr-[20px] py-[14px] border-b border-dashed border-[var(--line-soft)] relative transition-colors duration-[120ms] ease hover:bg-[#FCF9F1] last:border-b-0 max-[540px]:grid-cols-[auto_1fr] max-[540px]:grid-rows-[auto_auto] max-[540px]:gap-y-[6px] max-[540px]:gap-x-[12px] max-[540px]:before:hidden max-[540px]:after:hidden"
                style={{ gridTemplateColumns: '70px minmax(0, 1fr) auto' }}
              >
                {/* Pseudo-line (::before) */}
                <div
                  className="absolute left-[84px] top-0 bottom-0 w-[1px] bg-[var(--line-soft)] max-[540px]:hidden"
                  aria-hidden="true"
                />

                {/* Pseudo-dot (::after) — color by category */}
                <div
                  className={cn(
                    'absolute left-[81px] top-[18px] w-[7px] h-[7px] rounded-full',
                    'shadow-[0_0_0_3px_var(--paper)]',
                    getDotColor(entry.category),
                    'max-[540px]:hidden'
                  )}
                  aria-hidden="true"
                />

                {/* TIME (70px column) */}
                <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] font-medium pt-[3px] text-right max-[540px]:hidden">
                  {entry.time}
                </span>

                {/* CONTENT (flex column: action + detail) */}
                <div className="pl-[14px] min-w-0 max-[540px]:pl-0 max-[540px]:col-span-2">
                  {/* ACTION: verb · target */}
                  <div className="text-[13.5px] text-[var(--ink)] leading-[1.4] mb-[4px]">
                    <span className="font-medium">{entry.verb}</span>
                    {entry.target && (
                      <>
                        {' · '}
                        <span className="font-semibold">{entry.target}</span>
                      </>
                    )}
                  </div>

                  {/* DETAIL: meta items separated by · */}
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
                        <span className="font-mono text-[11px] text-[var(--ink-soft)] bg-[var(--cream-deep)] px-[6px] py-[1px] rounded-[3px] tracking-[0.02em]">
                          {entry.refId}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* TAG: category badge (right-aligned) */}
                <span
                  className={cn(
                    'font-mono text-[9px] tracking-[0.14em] uppercase',
                    'px-[8px] py-[3px] rounded-[3px] font-semibold whitespace-nowrap',
                    'flex-shrink-0 self-start mt-[2px]',
                    'max-[540px]:col-start-2 max-[540px]:justify-self-end max-[540px]:row-start-1',
                    getTagColor(entry.category)
                  )}
                >
                  {getTagLabel(entry.category)}
                </span>
              </div>

              </div>
            </Fragment>
          ))
        ) : (
          <div className="py-[56px] px-[28px] text-center text-[13.5px] text-[var(--ink-mute)]">
            <div className="mb-[14px] text-[52px]">—</div>
            No audit events yet
          </div>
        )}
      </div>

      {/* Footer */}
      {profile.auditLog.recent.length > 0 && (
        <div className="px-[18px] py-[14px] border-t border-[var(--line-soft)] flex items-center justify-between text-[12px] text-[var(--ink-mute)] flex-wrap gap-[10px]">
          <span>
            Showing {Math.min(expandedCount, 8)} of {profile.auditLog.totalEvents} events
          </span>
          {profile.auditLog.totalEvents > 8 && (
            <button
              type="button"
              className={cn(
                'bg-transparent border border-[var(--line)] rounded-full',
                'px-[16px] py-[6px] font-mono text-[11px] tracking-[0.04em]',
                'text-[var(--ink-soft)] cursor-pointer',
                'transition-all duration-[150ms] ease',
                'hover:bg-[var(--cream-deep)] hover:text-[var(--ink)] hover:border-[var(--ink-mute)]'
              )}
              data-cd-action="load-more-audit"
            >
              Load more
            </button>
          )}
        </div>
      )}
    </section>
  );
}
