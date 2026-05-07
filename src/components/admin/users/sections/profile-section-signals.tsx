'use client';

import type { CandidateProfile } from '@/lib/mock-data/admin/candidate-profiles-data';
import { cn } from '@/lib/utils/cn';

interface ProfileSectionSignalsProps {
  profile: CandidateProfile;
}

export function ProfileSectionSignals({ profile }: ProfileSectionSignalsProps) {
  const { signals } = profile;

  const getCardBorderColor = (variant: 'flag' | 'danger' | 'clear') => {
    switch (variant) {
      case 'flag':
        return 'border-l-[3px] border-l-[var(--amber)]';
      case 'danger':
        return 'border-l-[3px] border-l-[var(--danger)]';
      case 'clear':
        return 'border-l-[3px] border-l-[var(--success)]';
    }
  };

  const getIconBg = (variant: 'flag' | 'danger' | 'clear') => {
    switch (variant) {
      case 'flag':
        return 'bg-[var(--amber-bg)] text-[var(--amber)]';
      case 'danger':
        return 'bg-[var(--danger-bg)] text-[var(--danger)]';
      case 'clear':
        return 'bg-[var(--success-bg)] text-[var(--success)]';
    }
  };

  const getSeverityBg = (severity?: string) => {
    switch (severity) {
      case 'low':
        return 'bg-[rgba(214,242,77,0.4)] text-[var(--ink)]';
      case 'medium':
        return 'bg-[var(--amber-bg)] text-[var(--amber)]';
      case 'high':
        return 'bg-[var(--danger-bg)] text-[var(--danger)]';
      case 'critical':
        return 'bg-[var(--danger)] text-white';
      case 'none':
      default:
        return 'bg-[var(--cream-deep)] text-[var(--ink-soft)]';
    }
  };

  const getStatusColor = (variant?: 'resolved' | 'open' | 'clear') => {
    switch (variant) {
      case 'resolved':
        return 'text-[var(--success)]';
      case 'open':
        return 'text-[var(--amber)]';
      case 'clear':
      default:
        return 'text-[var(--success)]';
    }
  };

  const getStatusPillVariant = (variant?: 'warn' | 'danger' | 'neutral' | 'default') => {
    switch (variant) {
      case 'warn':
        return 'bg-[var(--amber-bg)] text-[var(--amber)]';
      case 'danger':
        return 'bg-[var(--danger-bg)] text-[var(--danger)]';
      case 'neutral':
        return 'bg-[var(--cream-deep)] text-[var(--ink-soft)]';
      case 'default':
      default:
        return 'bg-[var(--success-bg)] text-[var(--success)]';
    }
  };

  return (
    <section
      id="cd-section-signals"
      className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] first:border-t-0 first:pt-[12px]"
    >
      {/* Section Header */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[16px]">
          <span className="font-display text-[10.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-medium">
            08 · 09
          </span>
          <h2 className="font-display [font-variation-settings:'opsz'_96] text-[24px] font-medium tracking-[-0.02em] leading-[1.1] text-[var(--ink)]">
            Trust &amp; safety signals
          </h2>
        </div>
        {signals.statusPill && (
          <span
            className={cn(
              'inline-flex items-center gap-[6px]',
              'font-mono text-[10px] tracking-[0.14em] uppercase font-semibold',
              'px-[9px] py-[3px] rounded-full',
              'before:content-[\'\'] before:w-[5px] before:h-[5px]',
              'before:rounded-full before:bg-[currentColor]',
              getStatusPillVariant(signals.statusPill.variant)
            )}
          >
            {signals.statusPill.label}
          </span>
        )}
      </div>

      {/* Signal Cards */}
      <div className="flex flex-col gap-[8px]">
        {signals.groups && signals.groups.length > 0 ? (
          signals.groups.map((group, idx) => (
            <div
              key={idx}
              className={cn(
                'bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)]',
                'px-[16px] py-[14px]',
                'grid gap-[14px] items-start',
                'transition-colors duration-[120ms] ease hover:bg-[#FCF9F1]',
                getCardBorderColor(group.cardVariant)
              )}
              style={{ gridTemplateColumns: 'auto minmax(0, 1fr) auto' }}
            >
              {/* Icon */}
              <div
                className={cn(
                  'w-[32px] h-[32px] rounded-full',
                  'grid place-items-center flex-shrink-0',
                  getIconBg(group.cardVariant)
                )}
                aria-hidden="true"
              >
                {group.cardVariant === 'clear' ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                    <line x1="4" y1="22" x2="4" y2="15" />
                  </svg>
                )}
              </div>

              {/* Body */}
              <div className="min-w-0">
                {/* Head: Title + Severity */}
                <div className="flex items-baseline gap-[8px] mb-[4px] flex-wrap">
                  <span className="text-[13.5px] font-semibold text-[var(--ink)]">
                    {group.title}
                  </span>
                  {group.severity && (
                    <span
                      className={cn(
                        'font-mono text-[9px] tracking-[0.12em] uppercase',
                        'px-[6px] py-[2px] rounded-[3px]',
                        'font-semibold whitespace-nowrap',
                        getSeverityBg(group.severity)
                      )}
                    >
                      {group.severity === 'none'
                        ? 'None'
                        : group.severity.charAt(0).toUpperCase() + group.severity.slice(1)}
                    </span>
                  )}
                </div>

                {/* Detail */}
                <div className="text-[12.5px] text-[var(--ink-soft)] leading-[1.5] mb-[5px]">
                  {group.detail}
                </div>

                {/* Metadata */}
                {group.metadata && (
                  <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] flex flex-wrap gap-y-[4px] gap-x-[12px]">
                    <span>{group.metadata.filedDate}</span>
                    {group.metadata.resolvedBy && (
                      <>
                        <span className="text-[var(--line-strong)]">·</span>
                        <span>
                          Resolved by {group.metadata.resolvedBy.name} · {group.metadata.resolvedBy.date} ·{' '}
                          {group.metadata.resolvedBy.turnaround}
                        </span>
                      </>
                    )}
                    {group.metadata.referenceId && (
                      <>
                        <span className="text-[var(--line-strong)]">·</span>
                        <span className="font-mono text-[11px] text-[var(--ink-soft)] bg-[var(--cream-deep)] px-[6px] py-[1px] rounded-[3px] tracking-[0.02em]">
                          {group.metadata.referenceId}
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Status */}
              {group.status && (
                <span
                  className={cn(
                    'font-mono text-[10px] tracking-[0.1em] uppercase',
                    'font-semibold whitespace-nowrap',
                    'self-center',
                    getStatusColor(group.status.variant)
                  )}
                >
                  {group.status.label}
                </span>
              )}
            </div>
          ))
        ) : (
          <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden py-[56px] px-[28px] text-center text-[13.5px] text-[var(--ink-mute)]">
            <div className="mb-[14px] text-[52px]">—</div>
            No signals on record
          </div>
        )}
      </div>
    </section>
  );
}
