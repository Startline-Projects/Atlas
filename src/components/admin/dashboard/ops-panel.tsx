'use client';

import { OPERATIONS_DATA } from '@/lib/mock-data/admin/dashboard-data';

export function OpsPanel() {
  const { disputes, reviews, sla, poolHealth } = OPERATIONS_DATA;

  return (
    <div className="flex flex-col gap-0 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[10px] overflow-hidden">
      {/* Header */}
      <div className="flex items-baseline justify-between px-[18px] pt-[14px] pb-3 border-b border-[var(--color-line-soft)]">
        <h3 className="font-display text-[16px] font-medium leading-tight tracking-[-0.01em]">
          Operations
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-ink-mute)] inline-flex items-center gap-[6px]">
          <span
            className="w-[5px] h-[5px] rounded-full bg-[var(--color-amber)] flex-shrink-0"
            style={{ animation: 'pulse-soft 1.6s ease-in-out infinite' }}
            aria-hidden="true"
          />
          Live
        </span>
      </div>

      {/* Body */}
      <div className="px-[18px] py-4 flex-1 flex flex-col gap-[14px]">
        {/* Disputes Row */}
        <div className="flex items-center justify-between gap-3 text-[13px]">
          <div className="flex items-center gap-2 text-[var(--color-ink-soft)]">
            <span
              className="w-[22px] h-[22px] rounded-full bg-[var(--color-cream-deep)] flex items-center justify-center flex-shrink-0 text-[var(--color-ink-soft)]"
              aria-hidden="true"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
              </svg>
            </span>
            {disputes.label}
          </div>
          <div className="flex items-baseline gap-[10px] font-mono text-[12px] text-[var(--color-ink)]">
            {disputes.pieces.map((piece, i) => (
              <span key={i} className="inline-flex items-baseline gap-1">
                <span
                  className={`font-display text-[18px] font-medium -tracking-[0.02em] ${
                    piece.type === 'urgent'
                      ? 'text-[var(--color-danger)]'
                      : piece.type === 'success'
                        ? 'text-[var(--color-success)]'
                        : 'text-[var(--color-ink)]'
                  }`}
                >
                  {piece.value}
                </span>
                <span className="text-[9.5px] uppercase tracking-[0.12em] text-[var(--color-ink-mute)]">
                  {piece.key}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Reviews Row */}
        <div className="flex items-center justify-between gap-3 text-[13px]">
          <div className="flex items-center gap-2 text-[var(--color-ink-soft)]">
            <span
              className="w-[22px] h-[22px] rounded-full bg-[var(--color-cream-deep)] flex items-center justify-center flex-shrink-0 text-[var(--color-ink-soft)]"
              aria-hidden="true"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </span>
            {reviews.label}
          </div>
          <div className="flex items-baseline gap-1 font-mono text-[12px] text-[var(--color-ink)]">
            <span className="font-display text-[18px] font-medium -tracking-[0.02em]">
              {reviews.pieces[0].value}
            </span>
            <span className="text-[9.5px] uppercase tracking-[0.12em] text-[var(--color-ink-mute)]">
              {reviews.pieces[0].key}
            </span>
          </div>
        </div>

        {/* SLA Row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[13px] text-[var(--color-ink-soft)]">
            <span
              className="w-[22px] h-[22px] rounded-full bg-[var(--color-cream-deep)] flex items-center justify-center flex-shrink-0 text-[var(--color-ink-soft)]"
              aria-hidden="true"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </span>
            {sla.label}
          </div>
          <div className="flex items-center gap-2 flex-1 max-w-[60%]">
            <div className="flex-1">
              <div className="h-[6px] bg-[var(--color-cream-deep)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--color-success)] rounded-full"
                  style={{ width: `${sla.slaProgress.percent}%` }}
                />
              </div>
            </div>
            <span className="font-mono text-[11px] text-[var(--color-ink)] font-semibold whitespace-nowrap">
              {sla.slaProgress.current}h / {sla.slaProgress.max}h
            </span>
          </div>
        </div>

        {/* Pool Health Section */}
        <div className="mt-1 pt-[14px] border-t border-dashed border-[var(--color-line)]">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-ink-mute)]">
              {poolHealth.label}
            </span>
            <span className="font-mono text-[10px] text-[var(--color-ink-soft)] font-medium">
              {poolHealth.subLabel}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {poolHealth.bars.map((bar, i) => (
              <div
                key={i}
                className="grid gap-[10px] items-center text-[12px]"
                style={{ gridTemplateColumns: '90px 1fr auto' }}
              >
                <span className="text-[var(--color-ink-soft)] font-medium truncate overflow-hidden text-ellipsis whitespace-nowrap">
                  {bar.name}
                </span>
                <div className="h-[6px] bg-[var(--color-cream-deep)] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      bar.status === 'danger'
                        ? 'bg-[var(--color-danger)]'
                        : bar.status === 'warn'
                          ? 'bg-[var(--color-amber)]'
                          : 'bg-[var(--color-success)]'
                    }`}
                    style={{ width: `${bar.percent}%` }}
                  />
                </div>
                <span className="font-mono text-[11px] text-[var(--color-ink-mute)] text-right min-w-[32px]">
                  {bar.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
