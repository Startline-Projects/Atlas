'use client';

import { PAGE_HEADER } from '@/lib/mock-data/admin/dashboard-data';
import { useDashboardState } from '@/lib/admin/dashboard-state-context';

export function DashboardHeader() {
  const { state } = useDashboardState();

  const statusConfig = {
    ok: {
      dot: 'bg-green-600 text-green-600',
      label: 'All systems operational',
      meta: 'Checked 30s ago',
    },
    warn: {
      dot: 'bg-amber-600 text-amber-600',
      label: 'Degraded performance',
      meta: 'Checked 30s ago',
    },
    down: {
      dot: 'bg-red-600 text-red-600',
      label: 'Major incident',
      meta: 'Checked 30s ago',
    },
  }[state.systemStatus];

  return (
    <header className="flex items-end justify-between gap-6 mb-7 pb-5 border-b border-[var(--color-line)]">
      <div className="flex-1">
        <div className="eyebrow text-xs font-mono tracking-[0.14em] uppercase text-[var(--color-ink-mute)] mb-2">
          {PAGE_HEADER.eyebrow}
        </div>
        <h1 className="text-2xl font-display font-medium leading-snug mb-[6px]">
          {PAGE_HEADER.title}
          <span className="serif-italic">{PAGE_HEADER.titleItalic}</span>
        </h1>
        <div className="subhead text-sm text-[var(--color-ink-soft)] mt-2 flex items-center gap-2">
          <span id="dashAlertSummary">{PAGE_HEADER.alertSummaryByMode[state.viewMode]}</span>
          <span className="sep text-[var(--color-line-strong)]">·</span>
          <span>{PAGE_HEADER.lastCleared}</span>
        </div>
      </div>

      <div className="system-status" data-status={state.systemStatus}>
        <span
          className="system-status-dot"
          aria-hidden="true"
        />
        <div>
          <div className="status-label text-sm font-medium" id="statusLabel">
            {statusConfig.label}
          </div>
          <div
            className="status-meta text-xs font-mono tracking-[0.16em] text-[var(--color-ink-mute)]"
            id="statusMeta"
          >
            {statusConfig.meta}
          </div>
        </div>
      </div>
    </header>
  );
}
