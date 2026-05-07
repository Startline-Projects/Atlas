'use client';

import { ALERTS, ALERT_COUNTS } from '@/lib/mock-data/admin/dashboard-data';
import { useDashboardState } from '@/lib/admin/dashboard-state-context';

const PRIORITY_COLORS = {
  urgent: { dot: 'bg-[var(--color-danger)]', border: 'before:bg-[var(--color-danger)]', tag: 'bg-[var(--color-danger-bg)]', text: 'text-[var(--color-danger)]' },
  today: { dot: 'bg-[var(--color-amber)]', border: 'before:bg-[var(--color-amber)]', tag: 'bg-[var(--color-amber-bg)]', text: 'text-[var(--color-amber)]' },
  week: { dot: 'bg-[var(--color-lime-deep)]', border: 'before:bg-[var(--color-lime-deep)]', tag: 'bg-[rgba(214,242,77,0.35)]', text: 'text-[var(--color-ink-soft)]' },
} as const;

export function AlertsSection() {
  const { state, setState } = useDashboardState();
  const { alertFilter, viewMode } = state;

  const filteredAlerts = ALERTS.filter(
    a => alertFilter === 'all' || a.priority === alertFilter
  );

  // In all-clear mode, show no alerts; otherwise show filtered
  const shouldShowAlerts = viewMode !== 'all-clear';

  return (
    <>
      {/* Header */}
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <h2 className="font-display text-[22px] font-medium leading-tight tracking-[-0.015em] flex items-baseline gap-3">
          Needs your attention
          <span className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-[var(--color-ink-mute)] font-medium bg-[var(--color-paper)] px-[9px] py-[3px] pb-[2px] border border-[var(--color-line)] rounded-[3px] relative top-[-2px]">
            {viewMode === 'all-clear' ? '0' : ALERT_COUNTS.all} OPEN
          </span>
          <span className="inline-flex items-center gap-[5px] font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-amber)] font-semibold relative top-[-3px]">
            <span
              className="w-[6px] h-[6px] rounded-full bg-[var(--color-amber)] flex-shrink-0"
              style={{ animation: 'pulse-soft 1.6s ease-in-out infinite' }}
              aria-hidden="true"
            />
            Live
          </span>
        </h2>
        <button className="bg-transparent text-[12.5px] text-[var(--color-ink-soft)] border-t-0 border-l-0 border-r-0 border-b border-dotted border-[var(--color-line-strong)] pb-[1px] transition-all hover:text-[var(--color-ink)] hover:border-[var(--color-ink)]">
          View all alerts →
        </button>
      </div>

      {/* Filter Row */}
      <div className="flex items-center gap-[6px] mb-[14px] px-1 py-1 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full w-fit" role="tablist" aria-label="Filter alerts by priority">
        {(['all', 'urgent', 'today', 'week'] as const).map(priority => (
          <button
            key={priority}
            className={`px-[14px] py-[6px] font-mono text-[11px] uppercase tracking-[0.06em] border-0 rounded-full cursor-pointer transition-all inline-flex items-center gap-[6px] ${
              alertFilter === priority
                ? 'bg-[var(--color-ink)] text-[var(--color-paper)]'
                : 'text-[var(--color-ink-mute)] hover:text-[var(--color-ink)]'
            }`}
            data-priority={priority}
            onClick={() => setState({ alertFilter: priority })}
            role="tab"
          >
            {priority !== 'all' && (
              <span className={`w-[5px] h-[5px] rounded-full inline-block ${PRIORITY_COLORS[priority].dot}`} />
            )}
            <span>
              {priority === 'all' ? 'All' :
               priority === 'urgent' ? 'Urgent' :
               priority === 'today' ? 'Today' :
               'This week'}
            </span>
            <span className={`text-[10px] px-[6px] py-[1px] rounded-full font-semibold ${
              alertFilter === priority
                ? 'bg-[rgba(251,248,242,0.2)] text-[var(--color-paper)]'
                : 'bg-[var(--color-cream-deep)] text-[var(--color-ink-soft)]'
            }`}>
              {ALERT_COUNTS[priority]}
            </span>
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="flex flex-col gap-2">
        {shouldShowAlerts && filteredAlerts.length > 0 ? (
          filteredAlerts.map(alert => {
            const colors = PRIORITY_COLORS[alert.priority as 'urgent' | 'today' | 'week'];
            const slaStatus = (alert as any).slaStatus;
            const refNum = (alert as any).refNum;
            const detail = (alert as any).detail;
            const timestamp = (alert as any).timestamp;
            const isCritical = slaStatus?.includes('RESPONSE') || slaStatus?.includes('LEFT');

            return (
              <div
                key={alert.id}
                className={`relative bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[10px] px-[18px] py-[14px] pl-[20px] grid grid-cols-[auto_1fr_auto] gap-[18px] items-center transition-all hover:border-[var(--color-line-strong)] hover:shadow-sm hover:translate-y-[-1px] cursor-pointer before:absolute before:left-0 before:top-[14px] before:bottom-[14px] before:w-[3px] before:rounded-r-[3px] ${colors.border} ${
                  alert.priority === 'urgent'
                    ? 'bg-gradient-to-r from-[rgba(194,65,43,0.04)] to-[var(--color-paper)] border-[rgba(194,65,43,0.18)]'
                    : ''
                } ${
                  alert.priority === 'urgent' && 'hover:border-[rgba(194,65,43,0.4)]'
                }`}
                data-priority={alert.priority}
              >
                {/* Priority Tag */}
                <span className={`font-mono text-[9.5px] uppercase tracking-[0.16em] font-semibold inline-flex items-center gap-[6px] px-[10px] py-1 rounded-[3px] whitespace-nowrap flex-shrink-0 ${colors.tag} ${colors.text}`}>
                  {alert.tag}
                </span>

                {/* Content */}
                <div className="min-w-0">
                  <div className="text-[14.5px] font-semibold text-[var(--color-ink)] leading-[1.35] mb-[3px]">
                    {alert.title}
                  </div>
                  <div className="text-[12.5px] text-[var(--color-ink-soft)] leading-[1.45] flex items-center gap-2 flex-wrap">
                    {refNum && (
                      <>
                        <span className="font-mono text-[11.5px] text-[var(--color-ink-mute)] tracking-[0.02em]">
                          {refNum}
                        </span>
                        <span className="text-[var(--color-line-strong)]">·</span>
                      </>
                    )}
                    <span>
                      {detail || timestamp}
                    </span>
                    {slaStatus && (
                      <>
                        <span className="text-[var(--color-line-strong)]">·</span>
                        <span className={`font-mono text-[11px] uppercase tracking-[0.06em] px-[7px] py-[1px] rounded-[3px] font-semibold ${
                          isCritical
                            ? 'bg-[var(--color-danger-bg)] text-[var(--color-danger)]'
                            : 'bg-[var(--color-amber-bg)] text-[var(--color-amber)]'
                        }`}>
                          {slaStatus}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <a
                  href="#"
                  className="inline-flex items-center gap-[6px] px-[14px] py-[7px] pl-3 bg-[var(--color-ink)] text-[var(--color-paper)] rounded-full text-[12px] font-medium whitespace-nowrap flex-shrink-0 transition-all hover:bg-black active:translate-y-[1px]"
                >
                  {alert.actionLabel}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-[2px]"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            );
          })
        ) : (
          <div className="bg-[var(--color-paper)] border border-dashed border-[var(--color-line-strong)] rounded-[10px] px-[28px] py-[36px] text-center">
            <div className="w-[56px] h-[56px] rounded-full mx-auto mb-[14px] grid place-items-center bg-gradient-to-br from-[rgba(214,242,77,0.25)] to-[rgba(46,125,84,0.12)] text-[var(--color-success)]">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <h3 className="font-display text-[22px] font-medium tracking-[-0.01em] mb-[6px]">
              All clear.
            </h3>
            <p className="text-[13.5px] text-[var(--color-ink-mute)] leading-[1.5] max-w-[380px] mx-auto">
              No urgent items right now. The platform is humming along — every dispute is in SLA, every payout is queued, every alert is resolved.
            </p>
            <div className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.1em] text-[var(--color-ink-mute)]">
              Last cleared: 2 hours ago by Aïsha Okafor
            </div>
          </div>
        )}
      </div>
    </>
  );
}
