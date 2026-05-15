import type { CandidateProfile } from '@/lib/mock-data/admin/candidate-profiles-data';

interface IdentityFraudCardProps {
  profile: CandidateProfile;
}

export function IdentityFraudCard({ profile }: IdentityFraudCardProps) {
  const { antifraudChecks } = profile.identity;

  const statusCounts = antifraudChecks.reduce(
    (acc, check) => {
      acc[check.status] = (acc[check.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const summaryStatus = statusCounts.danger ? 'danger' : statusCounts.flag ? 'flag' : 'pass';

  const summaryStatusText = summaryStatus === 'danger' ? 'Critical Issues Found' : summaryStatus === 'flag' ? 'Review Recommended' : 'All Clear';

  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      <div className="flex items-center justify-between p-[11px_16px] bg-[var(--paper-deep)] border-b border-[var(--line-soft)] font-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold">
        <span>Anti-fraud signals</span>
        <span className={`font-mono text-[10.5px] tracking-[0.06em] font-semibold ${
          summaryStatus === 'danger'
            ? 'text-[var(--danger)]'
            : summaryStatus === 'flag'
            ? 'text-[var(--amber)]'
            : 'text-[var(--success)]'
        }`}>
          {summaryStatusText}
        </span>
      </div>

      <div>
        {antifraudChecks.length === 0 ? (
          <div className="p-[11px_16px] text-[12.5px] text-[var(--ink-soft)]">
            No fraud checks performed
          </div>
        ) : (
          antifraudChecks.map((check, idx) => {
            const iconClass =
              check.status === 'danger' ? 'danger' : check.status === 'flag' ? 'flag' : '';

            const statusText =
              check.status === 'danger' ? 'DANGER' : check.status === 'flag' ? 'FLAG' : 'PASS';

            return (
              <div key={idx} className={`grid grid-cols-[auto_minmax(0,1fr)_auto] gap-[12px] items-center p-[11px_16px] text-[12.5px] ${
                idx < antifraudChecks.length - 1 ? 'border-b border-dashed border-[var(--line-soft)]' : ''
              }`}>
                <div className={`w-[22px] h-[22px] flex items-center justify-center rounded-full flex-shrink-0 ${
                  iconClass === 'danger'
                    ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
                    : iconClass === 'flag'
                    ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
                    : 'bg-[var(--success-bg)] text-[var(--success)]'
                }`} aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>

                <div className="min-w-0">
                  <div className="text-[var(--ink)] font-medium">{check.label}</div>
                  {check.detail && (
                    <div className="text-[11.5px] text-[var(--ink-mute)] mt-[2px]">{check.detail}</div>
                  )}
                </div>

                <div className={`font-mono text-[10px] tracking-[0.1em] uppercase text-transform-none font-semibold whitespace-nowrap flex-shrink-0 ${
                  check.status === 'danger'
                    ? 'text-[var(--danger)]'
                    : check.status === 'flag'
                    ? 'text-[var(--amber)]'
                    : 'text-[var(--success)]'
                }`}>{statusText}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
