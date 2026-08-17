/**
 * Phase 14a — Shared card chrome with head + body slots.
 *
 * admin.html CSS: L14368-14411
 */
import type { ReactNode } from 'react';
import type { ReportsCardHead, ReportsLineChartLegendItem } from '@/lib/mock-data/admin/reports-analytics-data';

interface ReportsCardProps {
  head: ReportsCardHead;
  /** Optional legend (e.g. chart legend) rendered on the right of head */
  legend?: ReportsLineChartLegendItem[];
  /** Optional custom node rendered on the right side of card head (e.g. pool-health inline legend). Wins over legend + action when provided. */
  customHeadRight?: ReactNode;
  /** Optional inline-style overrides (mb, etc.) — kept minimal */
  className?: string;
  children: ReactNode;
}

function swatchBg(v: ReportsLineChartLegendItem['variant']): string {
  switch (v) {
    case 'candidates': return 'bg-[var(--ink)]';
    case 'clients':    return 'bg-[var(--lime-deep)]';
    case 'disputes':   return 'bg-[var(--amber)]';
    case 'gmv':        return 'bg-[var(--success)]';
  }
}

export function ReportsCard({ head, legend, customHeadRight, className, children }: ReportsCardProps) {
  return (
    <div
      className={
        // rep-card — L14368-14373
        'bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[18px] px-[20px]' +
        (className ? ` ${className}` : '')
      }
    >
      {/* rep-card-head — L14374-14411 */}
      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[14px] pb-[12px] border-b border-dashed border-[var(--line-soft)]">
        <div className="min-w-0">
          <h3 className="font-display text-[16px] font-medium tracking-[-0.01em] leading-[1.2] m-0 mb-[3px]">
            {head.title}
          </h3>
          <div className="font-mono text-[10px] tracking-[0.04em] text-[var(--ink-mute)]">
            {head.meta}
          </div>
        </div>
        {customHeadRight ? (
          customHeadRight
        ) : legend && legend.length > 0 ? (
          // rep-chart-legend — L14483-14504
          <div className="inline-flex gap-[14px] flex-wrap font-mono text-[10.5px] tracking-[0.04em] text-[var(--ink-soft)]">
            {legend.map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-[6px]">
                <span aria-hidden="true" className={`w-[12px] h-[2px] rounded-full ${swatchBg(item.variant)}`} />
                {item.label}
              </span>
            ))}
          </div>
        ) : head.action ? (
          // card-action — L14398-14411
          <button
            type="button"
            data-rep-action={head.action.key}
            onClick={() => console.log('[rep-card-action]', head.action!.key)}
            className="font-mono text-[10.5px] font-semibold text-[var(--ink-soft)] tracking-[0.04em] uppercase cursor-pointer bg-transparent border-0 py-[4px] px-[8px] rounded-[4px] hover:bg-[var(--cream-deep)] hover:text-[var(--ink)] transition-colors"
          >
            {head.action.label}
          </button>
        ) : null}
      </div>
      {children}
    </div>
  );
}
