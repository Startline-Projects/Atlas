/**
 * Phase 14a — Stacked horizontal bar for category breakdowns.
 *
 * admin.html CSS: L14589-14642
 */
import type { ReportsStackListRow, StackSegmentVariant } from '@/lib/mock-data/admin/reports-analytics-data';

interface ReportsStackListProps {
  rows: ReportsStackListRow[];
}

function segmentBg(v: StackSegmentVariant): string {
  switch (v) {
    case 'engineering': return 'bg-[var(--ink)]';
    case 'design':      return 'bg-[var(--lime-deep)]';
    case 'product':     return 'bg-[var(--super)]';
    case 'marketing':   return 'bg-[var(--amber)]';
    case 'support':     return 'bg-[var(--ink-mute)]';
    case 'solid':       return 'bg-[var(--ink-soft)]';
    case 'success':     return 'bg-[var(--success)]';
    case 'warn':        return 'bg-[var(--amber)]';
    case 'danger':      return 'bg-[var(--danger)]';
  }
}

export function ReportsStackList({ rows }: ReportsStackListProps) {
  return (
    // rep-stack-list — L14589-14593
    <div className="flex flex-col gap-[12px]">
      {rows.map((row, idx) => (
        <div key={idx} className="grid grid-cols-1 gap-[4px]">
          {/* sr-head */}
          <div className="flex justify-between items-baseline gap-[8px]">
            <span className="text-[12.5px] font-medium text-[var(--ink)] tracking-[-0.01em]">
              {row.label}
            </span>
            <span className="font-mono text-[11.5px] font-bold text-[var(--ink)] tracking-[0.02em]">
              {row.value}
              {row.meta && (
                <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] font-normal ml-[6px]">
                  {row.meta}
                </span>
              )}
            </span>
          </div>
          {/* sr-bar */}
          <div className="h-[8px] bg-[var(--cream-deep)] rounded-full overflow-hidden flex">
            <span
              aria-hidden="true"
              className={`h-full ${segmentBg(row.segmentVariant)}`}
              style={{ width: `${row.widthPercent}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
