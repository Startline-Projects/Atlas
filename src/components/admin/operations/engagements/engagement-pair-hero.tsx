import type {
  EngagementProfile,
  EngagementParty,
  EngagementStatus,
  EngagementHeroStat,
} from '@/lib/mock-data/admin/engagement-profiles-data';
import { cn } from '@/lib/utils/cn';

interface EngagementPairHeroProps {
  engagement: EngagementProfile;
}

// admin.html lines 9476-9491 — ::before gradient per status
function topBarGradient(status: EngagementStatus): string {
  switch (status) {
    case 'active':
    case 'completed':
      return 'linear-gradient(90deg, var(--success) 0%, var(--lime) 100%)';
    case 'paused':
      return 'linear-gradient(90deg, var(--amber) 0%, var(--cream-deep) 100%)';
    case 'dispute':
      return 'linear-gradient(90deg, var(--danger) 0%, var(--amber) 100%)';
    case 'cancelled':
      return 'var(--ink-mute)';
  }
}

// admin.html lines 9292-9325 — status pill variants (subset used in hero stats Status tile)
function statusPillClass(variant: EngagementStatus): string {
  switch (variant) {
    case 'active':
      return 'bg-[var(--success-bg)] text-[var(--success)]';
    case 'paused':
      return 'bg-[var(--amber-bg)] text-[var(--amber)]';
    case 'dispute':
      return 'bg-[var(--danger-bg)] text-[var(--danger)]';
    case 'cancelled':
      return 'bg-[var(--cream-deep)] text-[var(--ink-mute)] line-through';
    case 'completed':
      return 'bg-[rgba(110,63,224,0.12)] text-[var(--super)]';
  }
}

function PartyView({ party, roleLabel, isCandidate }: { party: EngagementParty; roleLabel: string; isCandidate?: boolean }) {
  return (
    <div
      className={cn(
        'py-[24px] px-[26px] flex items-center gap-[16px]',
        isCandidate &&
          'border-l border-l-dashed border-[var(--line-soft)] max-[880px]:border-l-0 max-[880px]:border-t max-[880px]:border-t-dashed max-[880px]:border-[var(--line-soft)]'
      )}
    >
      <div
        aria-hidden="true"
        className="w-[56px] h-[56px] rounded-full grid place-items-center font-display text-[18px] text-[var(--paper)] font-medium tracking-[-0.01em] flex-shrink-0"
        style={{ background: party.avatarGradient }}
      >
        {party.avatarInitials}
      </div>
      <div className="min-w-0">
        <div className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold mb-[4px]">
          {roleLabel}
        </div>
        <div className="font-display text-[19px] font-medium tracking-[-0.01em] text-[var(--ink)] leading-[1.15] mb-[4px]">
          {party.name}
          {party.realLegalEntity && (
            <span
              className="font-mono text-[9px] tracking-[0.12em] bg-[rgba(110,63,224,0.12)] text-[var(--super)] py-[1px] px-[6px] rounded-[3px] font-semibold ml-[6px] uppercase"
              style={{ verticalAlign: '5px' }}
            >
              REAL: {party.realLegalEntity}
            </span>
          )}
        </div>
        <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] flex items-center gap-[4px] flex-wrap">
          <span>
            {party.flag} {party.location}
          </span>
          <span aria-hidden="true" className="mx-[4px] text-[var(--line-strong)]">·</span>
          <span>{party.metaTrail}</span>
        </div>
      </div>
    </div>
  );
}

function StatTile({ stat }: { stat: EngagementHeroStat }) {
  return (
    <div className="py-[14px] px-[16px] border-r border-dashed border-[var(--line-soft)] text-center last:border-r-0">
      <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold mb-[4px]">
        {stat.label}
      </div>
      <div
        className={cn(
          'font-display text-[18px] font-medium tracking-[-0.01em] [font-variant-numeric:tabular-nums] leading-[1.1] text-[var(--ink)]',
          stat.valueColor === 'success' && 'text-[var(--success)]'
        )}
      >
        {stat.valuePill ? (
          <span
            className={cn(
              'inline-flex items-center gap-[5px] py-[3px] pl-[8px] pr-[9px] rounded-full font-mono text-[9.5px] tracking-[0.1em] uppercase font-semibold whitespace-nowrap',
              statusPillClass(stat.valuePill.variant)
            )}
          >
            {stat.valuePill.variant === 'active' && (
              <span
                aria-hidden="true"
                className="w-[6px] h-[6px] rounded-full bg-[var(--success)] inline-block flex-shrink-0 animate-pulse"
              />
            )}
            {stat.valuePill.text}
          </span>
        ) : (
          <>
            {stat.value}
            {stat.vSuffix && (
              <span className="text-[11px] text-[var(--ink-mute)] font-normal">{stat.vSuffix}</span>
            )}
          </>
        )}
      </div>
      <div className="font-mono text-[9.5px] tracking-[0.02em] text-[var(--ink-mute)] mt-[3px]">
        {stat.meta}
      </div>
    </div>
  );
}

export function EngagementPairHero({ engagement }: EngagementPairHeroProps) {
  return (
    // admin.html line 21630: eng-pair-hero with data-status
    <div
      data-status={engagement.status}
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mb-[18px] relative overflow-hidden"
    >
      {/* ::before top gradient bar — implemented as inline element since gradient varies by status */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: topBarGradient(engagement.status) }}
      />

      {/* 3-col grid: client / divider / candidate */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-0 items-stretch max-[880px]:grid-cols-1">
        <PartyView party={engagement.client} roleLabel="Client" />

        {/* Divider */}
        <div className="grid place-items-center px-[8px] relative max-[880px]:hidden">
          <div>
            <div className="w-[56px] h-[56px] rounded-full bg-[var(--paper-deep)] border border-dashed border-[var(--line-strong)] grid place-items-center text-[var(--ink-soft)] mx-auto">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 12l2 2 4-4" />
                <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.39 0 4.68.94 6.36 2.64" />
              </svg>
            </div>
            <div className="font-mono text-[8.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold text-center mt-[8px] whitespace-nowrap">
              Engaged
              <br />
              {engagement.engagedDate}
            </div>
          </div>
        </div>

        <PartyView party={engagement.candidate} roleLabel="Candidate" isCandidate />
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-5 gap-0 border-t border-[var(--line)] bg-[var(--paper-deep)] max-[720px]:grid-cols-2">
        {engagement.heroStats.map((stat, idx) => (
          <StatTile key={idx} stat={stat} />
        ))}
      </div>

      {/* Conditional banner (paused/dispute/cancelled) */}
      {engagement.banner && (
        <div
          className={cn(
            'py-[12px] px-[26px] border-t border-[var(--line)] flex items-start gap-[12px]',
            engagement.banner.variant === 'amber'
              ? 'bg-[var(--amber-bg)]'
              : 'bg-[var(--danger-bg)]'
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              'flex-shrink-0 mt-[1px]',
              engagement.banner.variant === 'amber'
                ? 'text-[var(--amber)]'
                : 'text-[var(--danger)]'
            )}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </span>
          <div className="min-w-0">
            <strong className="font-semibold text-[var(--ink)] text-[13px]">
              {engagement.banner.title}
            </strong>
            <div className="font-mono text-[11px] text-[var(--ink-soft)] mt-[3px] tracking-[0.02em]">
              {engagement.banner.meta}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
