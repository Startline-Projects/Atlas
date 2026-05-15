/**
 * Phase 16b — GDPR 72-hour regulatory countdown clock.
 *
 * admin.html markup: L40768-40809
 * admin.html CSS:    L16968-17108 (.si-clock-wrap)
 *
 * Dark gradient card with animated top bar, 4-cell countdown,
 * multi-color progress bar, and meta footer.
 *
 * Static values (no setInterval). Scoped @keyframes via inline <style> JSX.
 */
import type { IncidentGDPRClockData } from '@/lib/mock-data/admin/incidents-data';

interface IncidentGDPRClockProps {
  data: IncidentGDPRClockData;
}

export function IncidentGDPRClock({ data }: IncidentGDPRClockProps) {
  return (
    <div className="bg-[linear-gradient(135deg,var(--ink),#1a1a17)] text-[var(--paper)] rounded-[var(--r-md)] p-[18px_20px] mb-[16px] relative overflow-hidden">
      {/* Scoped keyframe for animated top bar */}
      <style>{`
        @keyframes si-clock-bar {
          0%, 100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
      `}</style>

      {/* Animated top bar — 3px gradient shimmer */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{
          background: 'linear-gradient(to right, var(--amber), var(--danger), var(--amber))',
          backgroundSize: '200% 100%',
          animation: 'si-clock-bar 3s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex items-center justify-between gap-[12px] mb-[14px] flex-wrap">
        <div className="flex items-center gap-[10px]">
          {/* Icon wrap */}
          <div className="w-[36px] h-[36px] rounded-full bg-[rgba(232,118,58,0.18)] grid place-items-center text-[var(--amber)] flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div>
            <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--amber)] font-bold mb-[2px]">
              {data.eyebrow}
            </div>
            <div className="font-display text-[18px] font-medium text-[var(--paper)] tracking-[-0.02em] leading-[1.15]">
              {data.title}
            </div>
          </div>
        </div>

        {/* Status pill */}
        <span className="inline-flex items-center gap-[6px] py-[4px] px-[10px] bg-[rgba(232,118,58,0.18)] text-[var(--amber)] rounded-full font-mono text-[10px] tracking-[0.08em] uppercase font-bold">
          <span className="w-[6px] h-[6px] rounded-full bg-[var(--amber)] animate-pulse" aria-hidden="true" />
          {data.statusLabel}
        </span>
      </div>

      {/* 4-cell countdown grid */}
      <div className="grid grid-cols-4 gap-[8px] mb-[14px]">
        {data.cells.map((cell) => (
          <div
            key={cell.label}
            className="bg-[rgba(251,248,242,0.05)] border border-[rgba(251,248,242,0.12)] rounded-[var(--r-sm)] p-[10px_12px] text-center"
          >
            <div
              className={`font-display text-[26px] font-medium leading-none tracking-[-0.02em] [font-variant-numeric:tabular-nums] ${
                cell.isUrgent ? 'text-[var(--amber)]' : 'text-[var(--paper)]'
              }`}
            >
              {cell.value}
            </div>
            <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-[rgba(251,248,242,0.55)] font-semibold mt-[4px]">
              {cell.label}
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="h-[5px] bg-[rgba(251,248,242,0.12)] rounded-full overflow-hidden mb-[10px]">
        <div
          className="h-full bg-[linear-gradient(to_right,var(--success),var(--amber),var(--danger))] rounded-full"
          style={{ width: `${data.barPercent}%` }}
        />
      </div>

      {/* Meta footer */}
      <div className="flex justify-between items-center flex-wrap gap-[12px] font-mono text-[10.5px] text-[rgba(251,248,242,0.7)] tracking-[0.02em]">
        <span>
          <strong className="text-[var(--paper)] font-bold">{data.meta.elapsed}</strong>
          {' elapsed · '}
          <strong className="text-[var(--paper)] font-bold">{data.meta.remaining}</strong>
          {' remaining of '}
          {data.meta.windowLabel}
        </span>
        <a
          className="text-[var(--lime)] underline cursor-pointer hover:text-[var(--paper)] transition-colors"
          data-si-action="draft-notification"
        >
          {data.ctaLabel}
        </a>
      </div>
    </div>
  );
}
