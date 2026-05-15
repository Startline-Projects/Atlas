/**
 * Phase 14b — Dispute-stage stacked bar (Tab 2).
 *
 * admin.html markup: L38380-38391
 * admin.html CSS: L14644-14691
 */
import { cn } from '@/lib/utils/cn';
import type {
  ReportsStageStackedBar,
  StageSegmentVariant,
} from '@/lib/mock-data/admin/reports-analytics-data';

interface ReportsStageStackedBarProps {
  data: ReportsStageStackedBar;
}

function segBg(v: StageSegmentVariant): string {
  switch (v) {
    case 's1': return 'bg-[var(--success)]';
    case 's2': return 'bg-[var(--ink-soft)]';
    case 's3': return 'bg-[var(--amber)]';
    case 's4': return 'bg-[var(--danger)]';
  }
}

function swatchBg(v: StageSegmentVariant): string {
  // mirror seg bg for legend swatch
  return segBg(v);
}

export function ReportsStageStackedBarEl({ data }: ReportsStageStackedBarProps) {
  return (
    <>
      {/* rep-stage-stacked — L14645-14651 (mt-6 inline from markup L38380) */}
      <div className="mt-[6px] flex h-[36px] rounded-[6px] overflow-hidden bg-[var(--cream-deep)]">
        {data.segments.map((seg, idx) => (
          <span
            key={idx}
            title={seg.title}
            className={cn(
              'flex items-center justify-center font-mono text-[10.5px] text-[var(--paper)] font-bold tracking-[0.04em] cursor-help transition-opacity duration-[120ms] ease hover:opacity-[0.85]',
              segBg(seg.variant)
            )}
            style={{ width: `${seg.widthPercent}%` }}
          >
            {seg.text}
          </span>
        ))}
      </div>

      {/* rep-stage-legend — L14669-14691 */}
      <div className="flex gap-[14px] flex-wrap mt-[10px] font-mono text-[10.5px] text-[var(--ink-soft)] tracking-[0.04em]">
        {data.legend.map((item, idx) => (
          <span key={idx} className="inline-flex items-center gap-[6px]">
            <span aria-hidden="true" className={cn('w-[10px] h-[10px] rounded-[2px]', swatchBg(item.variant))} />
            {item.label}
          </span>
        ))}
      </div>
    </>
  );
}
