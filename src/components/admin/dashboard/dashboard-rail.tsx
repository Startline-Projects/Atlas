'use client';

import { QUICK_ACTIONS, SYSTEM_STATUS_METRICS, GLANCE_STATS } from '@/lib/mock-data/admin/dashboard-data';

const quickActionIcons = {
  investigate: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  refund: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 14 4 9 9 4" />
      <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
    </svg>
  ),
  suspend: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  export: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  announcement: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  ),
  ticket: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="13" y2="17" />
    </svg>
  ),
};

export function DashboardRail() {
  return (
    <>
      {/* Quick Actions Panel */}
      <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] overflow-hidden">
        <div className="flex items-center justify-between px-4 pt-[11px] pb-2 border-b border-[var(--color-line-soft)] font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-mute)]">
          Quick actions
          <span className="inline-flex items-center gap-[5px] py-[3px] pl-[6px] pr-[7px] rounded-[3px] bg-[var(--logged-bg)] font-mono text-[9.5px] font-medium uppercase tracking-[0.12em] text-[var(--logged)]">
            <span className="inline-block w-[5px] h-[5px] rounded-full bg-[var(--logged)]" />
            Audited
          </span>
        </div>
        <div className="px-[10px] py-[10px] pb-4 flex flex-col gap-[2px]">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.id}
              type="button"
              className={`relative w-full flex items-center gap-[11px] px-[11px] py-[9px] rounded-[var(--radius-sm)] bg-transparent border-0 cursor-pointer text-left text-[13px] font-medium transition-colors duration-[120ms] ${
                action.danger
                  ? 'text-[var(--color-danger)] hover:bg-[var(--color-danger-bg)]'
                  : 'text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)] hover:text-[var(--color-ink)]'
              }`}
              data-audited={action.audited}
              onClick={(e) => e.preventDefault()}
            >
              <span
                className={`flex-shrink-0 ${
                  action.danger ? 'text-[var(--color-danger)]' : 'text-[var(--color-ink-mute)] transition-colors duration-[120ms] group-hover:text-[var(--color-ink)]'
                }`}
              >
                {quickActionIcons[action.id as keyof typeof quickActionIcons]}
              </span>
              <span className="flex-1 font-medium">{action.label}</span>
              <span className="font-mono text-[9.5px] text-[var(--color-ink-mute)] bg-[var(--color-cream)] border border-[var(--color-line)] px-[5px] py-px rounded-[3px] letter-spacing-[0.04em]">
                {action.shortcut}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* System Status Panel */}
      <div>
        <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] overflow-hidden">
          <div className="flex items-center justify-between px-4 pt-[11px] pb-2 border-b border-[var(--color-line-soft)] font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-mute)]">
            System status
            <span style={{ fontSize: '9px', color: 'var(--color-ink-mute)', letterSpacing: '0.12em' }}>
              30s ago
            </span>
          </div>
          <div className="px-4 py-[14px]">
            <div className="flex items-center gap-[10px] mb-3">
              <span className="w-[10px] h-[10px] rounded-full bg-[var(--color-success)]" aria-hidden="true" />
              <span className="text-[14px] font-semibold text-[var(--color-ink)]">
                All operational
              </span>
            </div>
            <div className="flex flex-col gap-[7px] font-mono text-[11px] text-[var(--color-ink-mute)] letter-spacing-[0.02em]">
              {SYSTEM_STATUS_METRICS.map((metric, i) => (
                <div key={i} className="flex justify-between items-baseline">
                  <span className="text-[9.5px] uppercase letter-spacing-[0.12em]">{metric.label}</span>
                  <span
                    className={`text-[var(--color-ink-soft)] font-medium ${
                      metric.status === 'good' ? 'text-[var(--color-success)]' : ''
                    }`}
                  >
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Today at a Glance Panel */}
      <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] overflow-hidden">
        <div className="flex items-center justify-between px-4 pt-[11px] pb-2 border-b border-[var(--color-line-soft)] font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-mute)]">
          Today at a glance
        </div>
        <div className="px-4 pt-3 pb-5 flex flex-col gap-[10px]">
          {GLANCE_STATS.map((stat, i) => (
            <div
              key={i}
              className="flex items-baseline justify-between gap-[10px] pb-[9px] border-b border-dashed border-[var(--color-line-soft)] last:border-b-0 last:pb-0"
            >
              <span className="font-mono text-[9.5px] uppercase letter-spacing-[0.14em] text-[var(--color-ink-mute)] flex-shrink-0">
                {stat.label}
              </span>
              <span
                className="font-display text-[17px] font-medium text-[var(--color-ink)] letter-spacing-[-0.01em] tabular-nums text-right"
                style={{ fontVariationSettings: '"opsz" 32' }}
              >
                {stat.value}
                <span
                  className={`font-mono text-[10px] letter-spacing-[0.04em] font-semibold ml-1 ${
                    stat.delta.direction === 'up' ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'
                  }`}
                >
                  {stat.delta.direction === 'up' ? '↑' : '↓'}
                  {stat.delta.value}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
