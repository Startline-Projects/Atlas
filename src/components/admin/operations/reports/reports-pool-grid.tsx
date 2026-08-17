/**
 * Phase 14b — Pool health heat-grid (Tab 3).
 *
 * admin.html markup: L38540-38563
 * admin.html CSS: L14693-14759
 */
import { cn } from '@/lib/utils/cn';
import type {
  ReportsPoolGrid,
  PoolHeatState,
} from '@/lib/mock-data/admin/reports-analytics-data';

interface ReportsPoolGridProps {
  data: ReportsPoolGrid;
}

function cellChrome(state: PoolHeatState): string {
  switch (state) {
    case 'healthy':
      return 'bg-[var(--success-bg)] border-[rgba(46,125,84,0.3)]';
    case 'balanced':
      return 'bg-[var(--paper-deep)] border-[var(--line-soft)]';
    case 'thin':
      return 'bg-[var(--amber-bg)] border-[rgba(232,118,58,0.3)]';
    case 'critical':
      return "bg-[var(--danger-bg)] border-[rgba(194,65,43,0.4)] before:content-['⚠'] before:absolute before:top-[4px] before:right-[6px] before:text-[10px] before:text-[var(--danger)]";
  }
}

function pcCountColor(state: PoolHeatState): string {
  switch (state) {
    case 'healthy':  return 'text-[var(--success)]';
    case 'balanced': return 'text-[var(--ink-mute)]';
    case 'thin':     return 'text-[var(--amber)] font-bold';
    case 'critical': return 'text-[var(--danger)] font-bold';
  }
}

export function ReportsPoolGridEl({ data }: ReportsPoolGridProps) {
  return (
    // rep-pool-grid — L14694-14700
    <div className="grid grid-cols-8 gap-[4px] max-[980px]:grid-cols-4 max-[480px]:grid-cols-2">
      {data.cells.map((cell, idx) => (
        <div
          key={idx}
          className={cn(
            // rep-pool-cell — L14701-14716 + state variant
            'relative border rounded-[4px] py-[8px] px-[10px] cursor-help flex flex-col gap-[2px] min-h-[56px] transition-[transform,border-color] duration-[120ms] ease hover:-translate-y-[1px] hover:border-[var(--line-strong)]',
            cellChrome(cell.state)
          )}
        >
          {/* pc-name — L14717-14726 */}
          <div className="text-[11px] font-semibold text-[var(--ink)] tracking-[-0.01em] leading-[1.2] whitespace-nowrap overflow-hidden text-ellipsis">
            {cell.name}
          </div>
          {/* pc-count — L14727-14733 */}
          <div
            className={cn(
              'font-mono text-[10px] tracking-[0.02em] mt-auto',
              pcCountColor(cell.state)
            )}
          >
            {cell.count}
          </div>
        </div>
      ))}
    </div>
  );
}
