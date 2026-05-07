import type { CandidateProfile } from '@/lib/mock-data/admin/candidate-profiles-data';

const heroGradients: Record<string, string> = {
  live: 'linear-gradient(135deg, #D9A77F, #8B5A3C)',
  suspended: 'linear-gradient(135deg, #DCA294, #8B4F47)',
  banned: 'linear-gradient(135deg, #6B6B6B, #2F2F2F)',
  pipeline: 'linear-gradient(135deg, #F0CC4F, #B8911E)',
};

const heroTopGradients: Record<string, string> = {
  live: 'linear-gradient(90deg, var(--success) 0%, var(--lime) 50%, var(--amber) 100%)',
  suspended: 'linear-gradient(90deg, var(--amber) 0%, var(--danger) 100%)',
  banned: 'var(--danger)',
  pipeline: 'linear-gradient(90deg, var(--amber) 0%, var(--lime) 100%)',
};

const heroPhotoFilters: Record<string, string> = {
  suspended: 'saturate(0.6)',
  banned: 'grayscale(0.7)',
  live: '',
  pipeline: '',
};

const statusPillStyles = {
  live: {
    pill: 'inline-flex items-center gap-[5px] px-[9px] pl-[8px] py-[3px] rounded-full font-mono text-[9.5px] tracking-[0.1em] uppercase font-semibold whitespace-nowrap bg-[var(--success-bg)] text-[var(--success)]',
    dot: 'w-[5px] h-[5px] rounded-full bg-current flex-shrink-0',
  },
  pipeline: {
    pill: 'inline-flex items-center gap-[5px] px-[9px] pl-[8px] py-[3px] rounded-full font-mono text-[9.5px] tracking-[0.1em] uppercase font-semibold whitespace-nowrap bg-[var(--amber-bg)] text-[var(--amber)]',
    dot: 'w-[5px] h-[5px] rounded-full bg-current flex-shrink-0',
  },
  suspended: {
    pill: 'inline-flex items-center gap-[5px] px-[9px] pl-[8px] py-[3px] rounded-full font-mono text-[9.5px] tracking-[0.1em] uppercase font-semibold whitespace-nowrap bg-[var(--danger-bg)] text-[var(--danger)]',
    dot: 'w-[5px] h-[5px] rounded-full bg-current flex-shrink-0',
  },
  banned: {
    pill: 'inline-flex items-center gap-[5px] px-[9px] pl-[8px] py-[3px] rounded-full font-mono text-[9.5px] tracking-[0.1em] uppercase font-semibold whitespace-nowrap bg-[var(--danger)] text-white',
    dot: 'w-[5px] h-[5px] rounded-full bg-white flex-shrink-0',
  },
} as const;

const actionBtnStyles = {
  default: {
    btn: 'group inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all duration-[150ms] ease whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)]',
    svg: 'text-[var(--ink-mute)] flex-shrink-0 transition-colors duration-[150ms] ease group-hover:text-[var(--ink)]',
  },
  primary: {
    btn: 'group inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--ink)] border border-[var(--ink)] rounded-full text-[var(--paper)] cursor-pointer transition-all duration-[150ms] ease whitespace-nowrap hover:bg-black hover:text-[var(--paper)]',
    svg: 'text-[var(--paper)] flex-shrink-0 transition-colors duration-[150ms] ease',
  },
  lime: {
    btn: 'inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--lime)] border border-[var(--lime)] rounded-full text-[var(--ink)] cursor-pointer transition-all duration-[150ms] ease whitespace-nowrap hover:bg-[var(--lime-deep)] hover:border-[var(--lime-deep)]',
    svg: 'text-[var(--ink-mute)] flex-shrink-0 transition-colors duration-[150ms] ease',
  },
  danger: {
    btn: 'inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-transparent border border-[rgba(194,65,43,0.3)] rounded-full text-[var(--danger)] cursor-pointer transition-all duration-[150ms] ease whitespace-nowrap hover:bg-[var(--danger-bg)] hover:text-[var(--danger)] hover:border-[var(--danger)]',
    svg: 'text-[var(--ink-mute)] flex-shrink-0 transition-colors duration-[150ms] ease',
  },
  warn: {
    btn: 'inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-transparent border border-[rgba(232,118,58,0.3)] rounded-full text-[var(--amber)] cursor-pointer transition-all duration-[150ms] ease whitespace-nowrap hover:bg-[var(--amber-bg)] hover:text-[var(--amber)] hover:border-[var(--amber)]',
    svg: 'text-[var(--ink-mute)] flex-shrink-0 transition-colors duration-[150ms] ease',
  },
};
const disabledBtnClasses = 'opacity-45 cursor-not-allowed pointer-events-none';

interface ProfileHeroProps {
  profile: CandidateProfile;
}

export function ProfileHero({ profile }: ProfileHeroProps) {
  const { initials, name, cohortBadge, country, flag, timezone, languages, title, status, atlasId, specialist } = profile;

  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-lg)] p-0 mb-[28px] shadow-[var(--shadow-card)] relative overflow-hidden" data-status={status}>
      {/* Top gradient strip */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: heroTopGradients[status] || heroTopGradients.live }} aria-hidden="true" />
      {/* Hero top section: Grid layout + responsive padding */}
      <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-[26px] items-center pt-[26px] px-[32px] pb-[22px] max-[720px]:grid-cols-1 max-[720px]:gap-[18px] max-[720px]:p-[22px]">
        {/* Avatar Section (96px) */}
        <div className="relative w-[96px] h-[96px] rounded-full grid place-items-center font-display text-[38px] font-medium text-[var(--paper)] flex-shrink-0 letter-spacing-[-0.02em]" style={{ background: heroGradients[status] || heroGradients.live, boxShadow: 'inset 0 0 0 2px rgba(255, 255, 255, 0.18)', filter: heroPhotoFilters[status] || 'none' }} aria-hidden="true">
          {initials}
          {/* Ring after element */}
          <div className="absolute inset-[-3px] rounded-full border-2 border-[var(--paper)]" aria-hidden="true" />
        </div>

        {/* Meta Section (Name, Cohort Badge, Tags, Status Row) */}
        <div className="min-w-0">
          <h1 className="font-display [font-variation-settings:'opsz'_96] text-[clamp(28px,3vw,36px)] font-medium letter-spacing-[-0.02em] leading-[1.05] mb-[8px] flex items-center gap-[12px] flex-wrap">
            <span>{name}</span>
            {cohortBadge && (
              <span className="inline-flex items-center gap-[5px] font-mono text-[9.5px] letter-spacing-[0.14em] text-transform-uppercase bg-[rgba(214,242,77,0.4)] text-[var(--ink)] px-[9px] pl-[8px] py-[3px] rounded-full font-semibold border border-[var(--lime-deep)]" style={{ verticalAlign: '4px' }}>
                <span style={{ color: 'var(--lime-deep)' }}>✦</span>
                {cohortBadge}
              </span>
            )}
          </h1>

          {/* 4 Tag Items (flex layout) */}
          <div className="flex flex-wrap gap-[5px_16px] text-[var(--color-ink-soft)] text-[13px] tracking-[0.01em] mb-[12px] font-mono">
            {/* Country */}
            <span className="inline-flex items-center gap-[6px]">
              <span className="text-[14px] flex-shrink-0 leading-1" aria-hidden="true">
                {flag}
              </span>
              {country}
            </span>

            {/* Timezone */}
            <span className="inline-flex items-center gap-[6px]">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--color-ink-mute)] flex-shrink-0"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {timezone}
            </span>

            {/* Languages */}
            <span className="inline-flex items-center gap-[6px]">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--color-ink-mute)] flex-shrink-0"
                aria-hidden="true"
              >
                <path d="m5 8 6 6" />
                <path d="m4 14 6-6 2-3" />
                <path d="M2 5h12" />
                <path d="M7 2h1" />
                <path d="m22 22-5-10-5 10" />
                <path d="M14 18h6" />
              </svg>
              {languages}
            </span>

            {/* Title */}
            <span className="inline-flex items-center gap-[6px]">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--color-ink-mute)] flex-shrink-0"
                aria-hidden="true"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              {title}
            </span>
          </div>

          {/* Status Row */}
          <div className="flex items-center gap-[10px] flex-wrap pt-[12px] border-t border-[var(--color-line-soft)]">
            {(() => {
              const pillStyle = (statusPillStyles as Record<string, { pill: string; dot: string }>)[status] || statusPillStyles.live;
              return (
                <span className={pillStyle.pill}>
                  <span className={pillStyle.dot} aria-hidden="true" />
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              );
            })()}
            <span className="font-mono text-[10.5px] tracking-[0.04em] text-[var(--color-ink-mute)] uppercase px-[8px]">{atlasId}</span>
            <span className="font-mono text-[10.5px] tracking-[0.04em] font-semibold uppercase px-[8px]" style={{ background: 'rgba(214,242,77,0.4)', color: 'var(--ink)' }}>
              Specialist: {specialist}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap gap-[6px] p-[16px_32px_20px] border-t border-dashed border-[var(--color-line-soft)] bg-[var(--color-paper-deep)]">
        <button type="button" className={actionBtnStyles.lime.btn} data-cd-action="message">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={actionBtnStyles.lime.svg}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Message
        </button>
        <button type="button" className={actionBtnStyles.warn.btn} data-cd-action="investigate">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={actionBtnStyles.warn.svg}>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          Investigate
        </button>
        <div className="w-[1px] bg-[var(--color-line-soft)] mx-[6px]" aria-hidden="true"></div>
        <button type="button" className={actionBtnStyles.danger.btn} data-cd-action="suspend">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={actionBtnStyles.danger.svg}>
            <circle cx="12" cy="12" r="10" />
            <rect x="9" y="9" width="6" height="6" />
          </svg>
          Suspend
        </button>
        <button type="button" className={actionBtnStyles.default.btn} data-cd-action="add-note">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={actionBtnStyles.default.svg}>
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Add note
        </button>
        <button type="button" className={actionBtnStyles.default.btn} data-cd-action="force-logout">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={actionBtnStyles.default.svg}>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Force log out
        </button>
        <button type="button" className={actionBtnStyles.default.btn} data-cd-action="more">
          More
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={actionBtnStyles.default.svg}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </div>
  );
}
