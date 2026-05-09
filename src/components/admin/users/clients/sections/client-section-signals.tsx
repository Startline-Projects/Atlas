import { Fragment } from 'react';
import type { ClientProfile } from '@/lib/mock-data/admin/client-profiles-data';

interface ClientSectionSignalsProps {
  profile: ClientProfile;
}

export function ClientSectionSignals({ profile }: ClientSectionSignalsProps) {
  const trustSafety = profile.trustSafety;

  if (!trustSafety) {
    return null;
  }

  const { sectionStatus, cards } = trustSafety;

  return (
    // admin.html line 17887: <section class="cd-section" id="cl-section-signals">
    <section
      id="cl-section-signals"
      className="border-t border-[var(--line)] py-[36px] scroll-mt-[80px] first:border-t-0 first:pt-[12px]"
    >
      {/* admin.html line 17888: <div class="cd-section-head"> */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            07 · 08
          </span>
          <h2 className="font-display [font-variation-settings:'opsz'_96] text-[24px] font-medium tracking-[-0.02em] leading-[1.1]">
            Trust &amp; safety signals
          </h2>
        </div>
        {/* admin.html line 17893: <span class="cd-section-status"> */}
        <span
          className={`inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold pt-[3px] pb-[3px] pl-[8px] pr-[9px] rounded-full before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[currentColor] ${
            sectionStatus.variant === 'danger'
              ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
              : sectionStatus.variant === 'warn'
                ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
                : sectionStatus.variant === 'neutral'
                  ? 'bg-[var(--cream-deep)] text-[var(--ink-soft)]'
                  : 'bg-[var(--success-bg)] text-[var(--success)]'
          }`}
        >
          {sectionStatus.label}
        </span>
      </div>

      {/* admin.html line 17896: <div class="cd-signals"> */}
      <div className="flex flex-col gap-[8px]">
        {cards.map((card, idx) => {
          // admin.html lines 6828-6830: card border-left variant
          const borderLeftClass =
            card.cardVariant === 'flag'
              ? 'border-l-[var(--amber)]'
              : card.cardVariant === 'danger'
                ? 'border-l-[var(--danger)]'
                : 'border-l-[var(--success)]';

          // admin.html lines 6831, 6840-6841: icon bg/color variant
          const iconClass =
            card.cardVariant === 'flag'
              ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
              : card.cardVariant === 'danger'
                ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
                : 'bg-[var(--success-bg)] text-[var(--success)]';

          // admin.html lines 6855, 6866-6869: severity pill variant
          const severityClass =
            card.severity.variant === 'low'
              ? 'bg-[rgba(214,242,77,0.4)] text-[var(--ink)]'
              : card.severity.variant === 'medium'
                ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
                : card.severity.variant === 'high'
                  ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
                  : card.severity.variant === 'critical'
                    ? 'bg-[var(--danger)] text-white'
                    : 'bg-[var(--cream-deep)] text-[var(--ink-soft)]';

          // admin.html lines 6895-6896: status text color
          const statusClass =
            card.status.variant === 'open'
              ? 'text-[var(--amber)]'
              : 'text-[var(--success)]';

          return (
            // admin.html line 17898: <div class="cd-signal-card ..."> + border-l-[3px]
            <div
              key={idx}
              className={`bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] px-[16px] py-[14px] grid grid-cols-[auto_minmax(0,1fr)_auto] gap-[14px] items-start border-l-[3px] ${borderLeftClass}`}
            >
              {/* admin.html line 17899: <span class="cd-signal-icon"> */}
              <span
                className={`w-[32px] h-[32px] rounded-full grid place-items-center flex-shrink-0 ${iconClass}`}
                aria-hidden="true"
              >
                {card.iconType === 'check' && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                {card.iconType === 'flag' && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                    <line x1="4" y1="22" x2="4" y2="15" />
                  </svg>
                )}
                {card.iconType === 'lock' && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                )}
              </span>

              {/* admin.html line 17902: <div class="cd-signal-body"> */}
              <div className="min-w-0">
                {/* admin.html line 17903: <div class="cd-signal-head"> */}
                <div className="flex items-baseline gap-[8px] mb-[4px] flex-wrap">
                  {/* admin.html line 17904: <span class="cd-signal-title"> */}
                  <span className="text-[13.5px] font-semibold text-[var(--ink)]">
                    {card.title}
                  </span>
                  {/* admin.html line 17905: <span class="cd-signal-severity"> */}
                  <span
                    className={`font-mono text-[9px] tracking-[0.12em] uppercase px-[6px] py-[2px] rounded-[3px] font-semibold ${severityClass}`}
                  >
                    {card.severity.label}
                  </span>
                </div>
                {/* admin.html line 17907: <div class="cd-signal-detail"> */}
                <div className="text-[12.5px] text-[var(--ink-soft)] leading-[1.5] mb-[5px]">
                  {card.detail}
                </div>
                {/* admin.html line 17926: <div class="cd-signal-meta"> (optional) */}
                {card.meta && card.meta.length > 0 && (
                  <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] flex flex-wrap gap-y-[4px] gap-x-[12px]">
                    {card.meta.map((item, mIdx) => (
                      <Fragment key={mIdx}>
                        {mIdx > 0 && (
                          <span className="text-[var(--line-strong)]">·</span>
                        )}
                        <span>{item}</span>
                      </Fragment>
                    ))}
                  </div>
                )}
              </div>

              {/* admin.html line 17911: <span class="cd-signal-status"> */}
              <span
                className={`font-mono text-[10px] tracking-[0.1em] uppercase font-semibold whitespace-nowrap self-center ${statusClass}`}
              >
                {card.status.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
