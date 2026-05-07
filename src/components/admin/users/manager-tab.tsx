import { USERS_DATA } from '@/lib/mock-data/admin/users-data';

const rolePillStyles = {
  super: {
    pill: 'bg-[var(--color-super)] text-[var(--color-paper)]',
    dot: 'bg-[var(--color-lime)] animate-pulse-soft',
  },
  ops: {
    pill: 'bg-[var(--color-ink)] text-[var(--color-paper)]',
    dot: 'bg-[var(--color-lime)] animate-pulse-soft',
  },
  trust: {
    pill: 'bg-[var(--color-amber)] text-white',
    dot: 'bg-[var(--color-paper)] animate-pulse-soft',
  },
  compliance: {
    pill: 'bg-[var(--color-navy)] text-white',
    dot: 'bg-[var(--color-lime)] animate-pulse-soft',
  },
  finance: {
    pill: 'bg-[var(--color-success)] text-white',
    dot: 'bg-[var(--color-lime)] animate-pulse-soft',
  },
  readonly: {
    pill: 'bg-[var(--color-ink-mute)] text-[var(--color-paper)]',
    dot: 'bg-[var(--color-paper)]',
  },
};

const basePillClasses = 'inline-flex items-center gap-[8px] py-[5px] pl-[10px] pr-[12px] rounded-full font-mono text-[10.5px] tracking-[0.12em] uppercase font-semibold cursor-default max-[720px]:py-[4px] max-[720px]:pl-[9px] max-[720px]:pr-[10px] max-[720px]:text-[9.5px] max-[720px]:gap-[6px]';
const baseDotClasses = 'w-[6px] h-[6px] rounded-full flex-shrink-0 max-[720px]:w-[5px] max-[720px]:h-[5px]';

// Manager Card styles
const managerCardClasses = 'bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-card)]';
const managerCardHeroClasses = 'pt-[28px] px-[32px] pb-[24px] grid grid-cols-[auto_minmax(0,1fr)_auto] gap-[24px] items-center bg-[var(--color-paper-deep)] border-b border-[var(--color-line-soft)] max-[720px]:grid-cols-1 max-[720px]:p-[22px]';
const managerAvatarClasses = 'w-[72px] h-[72px] rounded-full bg-[linear-gradient(135deg,#c9b8a4,#7a6b57)] text-[var(--color-paper)] text-[28px] font-medium grid place-items-center flex-shrink-0 tracking-[-0.01em]';
const managerMetaClasses = 'min-w-0';
const managerMetaHeadingClasses = 'font-display [font-variation-settings:\'opsz\'_96] text-[26px] font-medium tracking-[-0.02em] mb-[5px] flex items-center gap-[10px] flex-wrap';
const managerMetaRoleTagClasses = 'font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-ink-mute)] mb-[10px] font-semibold';
const managerMetaContactClasses = 'font-mono text-[12px] text-[var(--color-ink-soft)] flex flex-wrap gap-[4px_16px]';
const verifiedDotClasses = 'inline-block w-[5px] h-[5px] rounded-full bg-[var(--color-success)] ml-[4px]';
const managerActionsClasses = 'flex flex-col gap-[8px] flex-shrink-0';
const managerStatsClasses = 'grid grid-cols-4 gap-0 max-[720px]:grid-cols-2';
const managerStatClasses = 'py-[18px] px-[22px] border-r border-[var(--color-line-soft)] last:border-r-0 max-[720px]:[&:nth-child(2n)]:border-r-0 max-[720px]:[&:nth-child(-n+2)]:border-b max-[720px]:[&:nth-child(-n+2)]:border-[var(--color-line-soft)]';
const managerActivityClasses = 'pt-[20px] px-[32px] pb-[26px] border-t border-dashed border-[var(--color-line)]';
const managerActivityHeadClasses = 'font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-ink-mute)] mb-[12px] flex items-center justify-between font-semibold';
const managerActivityListClasses = 'flex flex-col gap-[8px] text-[13px]';
const managerActivityItemClasses = 'flex items-baseline gap-[10px] text-[var(--color-ink-soft)] py-[6px] px-0';
const managerActivityTimeClasses = 'font-mono text-[10.5px] text-[var(--color-ink-mute)] tracking-[0.04em] min-w-[55px]';
const managerActivityVerbClasses = 'text-[var(--color-ink)] font-medium';
const managerActivityTargetClasses = 'text-[var(--color-ink)] font-semibold';
const auditLinkClasses = 'text-[var(--color-ink-mute)] cursor-pointer transition-colors duration-[150ms] ease no-underline hover:text-[var(--color-ink)]';

export function ManagerTab() {
  const manager = USERS_DATA.manager;

  return (
    <div className={managerCardClasses}>
      {/* Hero Section */}
      <div className={managerCardHeroClasses}>
        {/* Avatar (from admin.html line 15675) */}
        <div className={`${managerAvatarClasses} font-display`} aria-hidden="true">
          MV
        </div>

        {/* Meta Section (from admin.html lines 15676-15690) */}
        <div className={managerMetaClasses}>
          <h3 className={`font-display ${managerMetaHeadingClasses}`}>
            Mateo Vargas
            {(() => {
              const role = 'trust' as keyof typeof rolePillStyles;
              const styles = rolePillStyles[role];
              return (
                <span
                  className={`${basePillClasses} ${styles.pill}`}
                  style={{ fontSize: '10px', padding: '4px 10px' }}
                >
                  <span className={`${baseDotClasses} ${styles.dot}`} aria-hidden="true" />
                  Manager of Talent Specialists
                </span>
              );
            })()}
          </h3>
          <div className={`${managerMetaRoleTagClasses} font-mono`}>Buenos Aires · LATAM</div>
          <div className={managerMetaContactClasses}>
            <span>
              mateo.vargas@atlas.example<span className={verifiedDotClasses} title="Verified" />
            </span>
            <span>
              +54 11 5555-0162<span className={verifiedDotClasses} title="Verified" />
            </span>
            <span>Joined Aug 2023</span>
          </div>
        </div>

        {/* Actions (from admin.html lines 15691-15700) */}
        <div className={managerActionsClasses}>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-[8px] py-[11px] px-[20px] border border-[var(--color-ink)] text-[var(--color-ink)] bg-transparent rounded-full text-[13.5px] font-medium cursor-pointer transition-colors duration-[150ms] ease hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
            data-users-action="open-manager-detail"
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
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
            Open profile
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-[8px] py-[11px] px-[20px] border border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)] rounded-full text-[13.5px] font-medium cursor-pointer transition-colors duration-[150ms] ease hover:bg-black"
            data-users-action="message-manager"
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
              aria-hidden="true"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Message
          </button>
        </div>
      </div>

      {/* Stats Section (from admin.html lines 15703-15724) */}
      <div className={managerStatsClasses}>
        <div className={managerStatClasses}>
          <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--color-ink-mute)] mb-[7px]">Specialists managed</div>
          <div className="font-display [font-variation-settings:'opsz'_64] text-[24px] font-medium text-[var(--color-ink)] tracking-[-0.02em] leading-none [font-variant-numeric:tabular-nums] flex items-baseline gap-[6px]">11</div>
          <div className="mt-[7px] font-mono text-[10.5px] tracking-[0.04em] text-[var(--color-ink-mute)]">across 6 regions</div>
        </div>
        <div className={managerStatClasses}>
          <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--color-ink-mute)] mb-[7px]">Team SLA · 7d</div>
          <div className="font-display [font-variation-settings:'opsz'_64] text-[24px] font-medium text-[var(--color-ink)] tracking-[-0.02em] leading-none [font-variant-numeric:tabular-nums] flex items-baseline gap-[6px]">
            96.5<span className="font-mono text-[13px] text-[var(--color-ink-mute)] font-normal">%</span> <span className="font-mono text-[11px] font-semibold tracking-[0.02em] text-[var(--color-success)]">↑0.6</span>
          </div>
          <div className="mt-[7px] font-mono text-[10.5px] tracking-[0.04em] text-[var(--color-ink-mute)]">target 95.0%</div>
        </div>
        <div className={managerStatClasses}>
          <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--color-ink-mute)] mb-[7px]">Escalation resolution</div>
          <div className="font-display [font-variation-settings:'opsz'_64] text-[24px] font-medium text-[var(--color-ink)] tracking-[-0.02em] leading-none [font-variant-numeric:tabular-nums] flex items-baseline gap-[6px]">
            4.2<span className="font-mono text-[13px] text-[var(--color-ink-mute)] font-normal">h avg</span>
          </div>
          <div className="mt-[7px] font-mono text-[10.5px] tracking-[0.04em] text-[var(--color-ink-mute)]">3 escalated today</div>
        </div>
        <div className={managerStatClasses}>
          <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--color-ink-mute)] mb-[7px]">Manager actions today</div>
          <div className="font-display [font-variation-settings:'opsz'_64] text-[24px] font-medium text-[var(--color-ink)] tracking-[-0.02em] leading-none [font-variant-numeric:tabular-nums] flex items-baseline gap-[6px]">12</div>
          <div className="mt-[7px] font-mono text-[10.5px] tracking-[0.04em] text-[var(--color-ink-mute)]">all audit-logged</div>
        </div>
      </div>

      {/* Activity Section (from admin.html lines 15726-15749) */}
      <div className={managerActivityClasses}>
        <div className={managerActivityHeadClasses}>
          <span>Today's managerial activity</span>
          <a
            href="#comp-audit"
            className={auditLinkClasses}
            style={{
              fontFamily: 'var(--font-body)',
              textTransform: 'none',
              letterSpacing: '0',
              fontSize: '12px',
            }}
            data-users-action="open-audit"
          >
            Audit log →
          </a>
        </div>
        <div className={managerActivityListClasses}>
          {manager.activityFeed.map((item, idx) => (
            <div key={idx} className={managerActivityItemClasses}>
              <span className={managerActivityTimeClasses}>{item.time}</span>
              <span>
                <span className={managerActivityVerbClasses}>{item.verb}</span> <span className={managerActivityTargetClasses}>{item.target}</span>{' '}
                <span style={{ color: 'var(--color-ink-mute)' }}>{item.description}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
