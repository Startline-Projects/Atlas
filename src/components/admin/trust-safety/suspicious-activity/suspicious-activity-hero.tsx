import type { SuspiciousActivityProfile } from '@/lib/mock-data/admin/suspicious-activity-data';
import { SuspiciousFreshnessPip } from './suspicious-freshness-pip';
import { SuspiciousTypePip } from './suspicious-type-pip';

interface SuspiciousActivityHeroProps {
  profile: SuspiciousActivityProfile;
}

const HERO_BORDER_TOP: Record<SuspiciousActivityProfile['heroVariant'], string> = {
  medium: 'border-t-[var(--lime-deep)]',
  high: 'border-t-[var(--amber)]',
  danger: 'border-t-[var(--danger)]',
};

const STAT_VARIANT: Record<'normal' | 'warn' | 'danger', string> = {
  normal: 'text-[var(--ink)]',
  warn: 'text-[var(--amber)]',
  danger: 'text-[var(--danger)]',
};

export function SuspiciousActivityHero({ profile }: SuspiciousActivityHeroProps) {
  return (
    <div
      className={`bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[22px_26px] mb-[22px] relative overflow-hidden border-t-[4px] ${HERO_BORDER_TOP[profile.heroVariant]}`}
    >
      <div className="flex items-start justify-between gap-[18px] flex-wrap mb-[14px]">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-[10px] flex-wrap mb-[8px]">
            <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.04em] font-semibold">
              {profile.atlasId}
            </span>
            <SuspiciousFreshnessPip state={profile.freshness} timeText={profile.freshnessTime} />
            <SuspiciousTypePip type={profile.type} label={profile.typeLabel} />
            <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">
              Detected {profile.timestamp} · {profile.detectionMethod}
            </span>
          </div>

          <h1 className="font-display text-[26px] font-medium tracking-[-0.02em] mb-[6px] leading-[1.2] text-[var(--ink)]">
            {profile.title}
          </h1>

          <div className="font-mono text-[11.5px] tracking-[0.04em] text-[var(--ink-mute)] leading-[1.5]">
            <span className="text-[var(--ink-soft)] font-semibold">
              {profile.candidateName} ({profile.candidateId})
            </span>{' '}
            {profile.subtitle
              .split(/(India → Germany → France → Germany|71% suspicious)/)
              .map((part, i) => {
                if (part === 'India → Germany → France → Germany') {
                  return (
                    <strong key={i} className="text-[var(--ink)] font-semibold">
                      {part}
                    </strong>
                  );
                }
                if (part === '71% suspicious') {
                  return (
                    <strong key={i} className="text-[var(--amber)] font-semibold">
                      {part}
                    </strong>
                  );
                }
                return <span key={i}>{part}</span>;
              })}
          </div>
        </div>

        <div className="inline-flex gap-[8px] flex-wrap items-start flex-shrink-0">
          <button
            type="button"
            className="inline-flex items-center gap-[6px] px-[14px] py-[8px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[rgba(232,118,58,0.3)] rounded-full text-[var(--amber)] cursor-pointer whitespace-nowrap hover:border-[var(--amber)] hover:bg-[var(--amber-bg)] transition-all"
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
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Investigate
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-[6px] px-[14px] py-[8px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all"
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
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Mark legitimate
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-[6px] px-[14px] py-[8px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[rgba(194,65,43,0.3)] rounded-full text-[var(--danger)] cursor-pointer whitespace-nowrap hover:border-[var(--danger)] hover:bg-[var(--danger-bg)] transition-all"
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
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
            Escalate to fraud
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-[6px] px-[14px] py-[8px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all"
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
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Watchlist
          </button>
        </div>
      </div>

      {/* Hero stats grid */}
      <div className="grid grid-cols-4 max-[720px]:grid-cols-2 gap-0 mt-[16px] pt-[14px] border-t border-t-[var(--line-soft)]">
        {profile.heroStats.map((stat) => (
          <div
            key={stat.label}
            className="pr-[16px] border-r border-r-[var(--line-soft)] last:border-r-0 last:pr-0 max-[720px]:[&:nth-child(2n)]:border-r-0 max-[720px]:[&:nth-child(2n)]:pr-0"
          >
            <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold mb-[4px]">
              {stat.label}
            </div>
            <div
              className={`font-display text-[18px] font-medium tracking-[-0.01em] leading-[1.1] ${STAT_VARIANT[stat.variant ?? 'normal']}`}
            >
              {stat.value}
            </div>
            <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
              {stat.meta}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
