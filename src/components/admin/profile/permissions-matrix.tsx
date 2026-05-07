import { PERMISSIONS_DOMAINS, PROFILE_ADMIN } from '@/lib/mock-data/admin/profile-data';

const domainIcons: Record<string, React.ReactNode> = {
  users: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  operations: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  'trust-safety': (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  finance: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  compliance: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v18" />
      <path d="m5 8 7-5 7 5" />
      <path d="M3 12h18" />
      <path d="M5 12v8h14v-8" />
    </svg>
  ),
  platform: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  ),
  internal: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
};

const statusIcons = {
  allowed: (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  limited: (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 0 0 18" />
    </svg>
  ),
  restricted: (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

export default function PermissionsMatrix() {
  return (
    <section className="dash-section">
      {/* Section header */}
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <h2 className="font-display text-[22px] font-medium tracking-[-0.015em] leading-[1.2] flex items-baseline gap-3">
          Permissions
          <span className="font-mono text-[11.5px] tracking-[0.1em] uppercase text-[var(--color-ink-mute)] font-medium bg-[var(--color-paper)] px-[9px] py-[3px] border border-[var(--color-line)] rounded-[3px] relative -top-[2px]">
            {PROFILE_ADMIN.roleTag.toUpperCase()}
          </span>
        </h2>
        <button
          type="button"
          className="text-[12.5px] text-[var(--color-ink-soft)] border-b border-dashed border-[var(--color-line-strong)] pb-[1px] cursor-pointer transition-colors hover:text-[var(--color-ink)] hover:border-[var(--color-ink)]"
        >
          Request permission change →
        </button>
      </div>

      {/* Permissions grid */}
      <div className="flex flex-col gap-[14px]">
        {PERMISSIONS_DOMAINS.map((domain) => {
          // Render domain summary with colored counts
          const summary = domain.summary as Record<string, number | string>;
          const label = summary.label as string;
          let summaryContent: React.ReactNode;

          if ('total' in summary) {
            // Standard format: "X of Y actions allowed" or "X of Y actions allowed · read-only"
            const allowed = summary.allowed as number;
            const total = summary.total as number;
            summaryContent = (
              <>
                <span className="text-[var(--color-success)] font-semibold">
                  {allowed} of {total}
                </span>
                {' '}
                {label}
              </>
            );
          } else {
            // Finance format: "2 allowed · 1 limited" with mixed counts
            summaryContent = label;
          }

          return (
            <div
              key={domain.id}
              className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] overflow-hidden"
            >
              {/* Domain header */}
              <div className="flex items-center justify-between gap-3 py-[11px] px-[18px] bg-[var(--color-paper-deep)] border-b border-[var(--color-line-soft)]">
                <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--color-ink-soft)] font-semibold">
                  <span className="text-[var(--color-ink-mute)] w-[13px] h-[13px] flex-shrink-0">
                    {domainIcons[domain.icon as keyof typeof domainIcons]}
                  </span>
                  {domain.name}
                </div>
                <div className="font-mono text-[10.5px] tracking-[0.06em] text-[var(--color-ink-mute)] whitespace-nowrap">
                  {summaryContent}
                </div>
              </div>

              {/* Permission rows */}
              <div>
                {domain.rows.map((row, idx) => (
                  <div
                    key={row.id}
                    className={`grid grid-cols-[minmax(0,1fr)_auto] gap-[18px] items-start py-3 px-[18px] ${
                      idx < domain.rows.length - 1
                        ? 'border-b border-dashed border-[var(--color-line-soft)]'
                        : ''
                    } transition-colors hover:bg-[#FCF9F1]`}
                  >
                    {/* Permission info */}
                    <div className="min-w-0">
                      <div className="text-[13.5px] font-medium text-[var(--color-ink)] mb-[3px] leading-[1.3]">
                        {row.name}
                      </div>
                      <div className="text-[12px] text-[var(--color-ink-mute)] leading-[1.45]">
                        {row.note}
                      </div>
                    </div>

                    {/* Status badge */}
                    <span
                      className={`inline-flex items-center gap-1.5 py-1 px-2.5 pl-1 rounded-full font-mono text-[9.5px] tracking-[0.14em] uppercase font-semibold whitespace-nowrap flex-shrink-0 self-start ${
                        row.status === 'allowed'
                          ? 'bg-[var(--color-success-bg)] text-[var(--color-success)]'
                          : row.status === 'limited'
                            ? 'bg-[var(--color-amber-bg)] text-[var(--color-amber)]'
                            : 'bg-[var(--color-danger-bg)] text-[var(--color-danger)]'
                      }`}
                    >
                      <span
                        className={`w-[18px] h-[18px] grid place-items-center rounded-full flex-shrink-0 text-white ${
                          row.status === 'allowed'
                            ? 'bg-[var(--color-success)]'
                            : row.status === 'limited'
                              ? 'bg-[var(--color-amber)]'
                              : 'bg-[var(--color-danger)]'
                        }`}
                      >
                        {statusIcons[row.status as keyof typeof statusIcons]}
                      </span>
                      {row.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-[14px] py-3 px-4 bg-[var(--color-paper)] border border-dashed border-[var(--color-line-strong)] rounded-[var(--radius-md)] text-[12px] text-[var(--color-ink-mute)] flex items-start gap-2.5 leading-[1.5]">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="flex-shrink-0 text-[var(--color-ink-soft)] mt-[1px]"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <div>
          Permissions are assigned by Super Admin. To request a change, use the link above — your request goes to the Super Admin queue and any change is recorded in the audit log.
        </div>
      </div>
    </section>
  );
}
