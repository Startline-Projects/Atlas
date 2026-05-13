import type { SuspensionDetailProfile } from '@/lib/mock-data/admin/suspensions-bans-data';
import { SuspensionStatusPill } from './suspension-status-pill';

interface SuspensionsBansHeroProps {
  profile: SuspensionDetailProfile;
}

const HERO_BORDER_TOP: Record<SuspensionDetailProfile['heroVariant'], string> = {
  amber: 'border-t-[var(--amber)]',
  danger: 'border-t-[var(--danger)]',
  lime: 'border-t-[var(--lime-deep)]',
  success: 'border-t-[var(--success)]',
  neutral: 'border-t-[var(--ink-mute)]',
};

const STAT_COLOR: Record<'normal' | 'warn' | 'danger', string> = {
  normal: 'text-[var(--ink)]',
  warn: 'text-[var(--amber)]',
  danger: 'text-[var(--danger)]',
};

function SubtitleSegment({ text }: { text: string }) {
  // Highlight the "currently under admin review" phrase in amber per admin.html
  const parts = text.split(/(currently under admin review)/);
  return (
    <>
      {parts.map((part, i) => {
        if (part === 'currently under admin review') {
          return (
            <strong key={i} className="text-[var(--amber)] font-semibold">
              {part}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function SuspensionsBansHero({ profile }: SuspensionsBansHeroProps) {
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
            <SuspensionStatusPill status={profile.status} label={profile.statusLabel} />
            <span className="inline-flex items-center gap-[5px] px-[8px] py-[3px] font-mono text-[10px] font-semibold tracking-[0.04em] rounded-[4px] bg-[var(--paper-deep)] border border-[var(--line-soft)] text-[var(--ink-soft)]">
              {profile.reasonChipLabel}
            </span>
            <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">
              {profile.detectedMeta}
            </span>
          </div>

          <h1 className="font-display text-[26px] font-medium tracking-[-0.02em] mb-[6px] leading-[1.2] text-[var(--ink)]">
            {profile.title}
          </h1>

          <div className="font-mono text-[11.5px] tracking-[0.04em] text-[var(--ink-mute)] leading-[1.5]">
            <span className="text-[var(--ink-soft)] font-semibold">
              {profile.accountName} ({profile.accountId})
            </span>{' '}
            <SubtitleSegment text={profile.subtitleRaw} />
          </div>
        </div>

        <div className="inline-flex gap-[8px] flex-wrap items-start flex-shrink-0">
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[rgba(232,118,58,0.3)] rounded-full text-[var(--amber)] cursor-pointer whitespace-nowrap hover:border-[var(--amber)] hover:bg-[var(--amber-bg)] transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Lift early
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[rgba(194,65,43,0.3)] rounded-full text-[var(--danger)] cursor-pointer whitespace-nowrap hover:border-[var(--danger)] hover:bg-[var(--danger-bg)] transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            </svg>
            Convert to ban
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            Message party
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all"
          >
            More
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
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
              className={`font-display text-[18px] font-medium tracking-[-0.01em] leading-[1.1] ${STAT_COLOR[stat.variant ?? 'normal']}`}
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
