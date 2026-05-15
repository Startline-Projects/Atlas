/**
 * Phase 14a — 7-stage approval funnel.
 *
 * admin.html markup: L38184-38226
 * admin.html CSS: L14506-14586
 */
import { cn } from '@/lib/utils/cn';
import type { ReportsFunnelStage, FunnelStageVariant } from '@/lib/mock-data/admin/reports-analytics-data';

interface ReportsFunnelProps {
  stages: ReportsFunnelStage[];
}

function fillGradient(v: FunnelStageVariant): string {
  switch (v) {
    case 'warn':   return 'bg-gradient-to-r from-[var(--amber)] to-[#d57b3a]';
    case 'danger': return 'bg-gradient-to-r from-[var(--danger)] to-[#a33829]';
    case 'default':
    default:       return 'bg-gradient-to-r from-[var(--ink)] to-[var(--ink-soft)]';
  }
}

function dropoffColor(v: FunnelStageVariant): string {
  switch (v) {
    case 'warn':   return 'text-[var(--amber)]';
    case 'danger': return 'text-[var(--danger)]';
    case 'default':
    default:       return 'text-[var(--ink-mute)]';
  }
}

export function ReportsFunnel({ stages }: ReportsFunnelProps) {
  return (
    // rep-funnel — L14507-14511
    <div className="flex flex-col gap-[4px]">
      {stages.map((stage, idx) => (
        // rep-funnel-stage — L14512-14518
        <div
          key={idx}
          className="grid grid-cols-[130px_1fr_86px_70px] gap-[10px] items-center py-[10px]"
        >
          {/* fs-label */}
          <div className="text-[12.5px] font-medium text-[var(--ink)] tracking-[-0.01em] flex items-center gap-[8px] min-w-0">
            <span className="font-mono text-[9px] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[2px] px-[5px] rounded-[3px] font-bold tracking-[0.04em] flex-shrink-0">
              {stage.num}
            </span>
            <span className="truncate">{stage.label}</span>
          </div>
          {/* fs-bar (track) */}
          <div className="relative h-[22px] bg-[var(--cream-deep)] rounded-[4px] overflow-hidden">
            <div
              className={cn(
                'absolute inset-y-0 left-0 rounded-[4px] flex items-center justify-end px-[8px] font-mono text-[9.5px] text-[var(--paper)] tracking-[0.04em] font-semibold',
                fillGradient(stage.variant)
              )}
              style={{ width: `${stage.widthPercent}%` }}
            >
              {stage.barLabel}
            </div>
          </div>
          {/* fs-count */}
          <div className="font-mono text-[12px] font-bold text-[var(--ink)] tracking-[0.02em] text-right [font-variant-numeric:tabular-nums]">
            {stage.count}
          </div>
          {/* fs-dropoff */}
          <div
            className={cn(
              'font-mono text-[10.5px] tracking-[0.02em] font-semibold text-right',
              dropoffColor(stage.variant)
            )}
          >
            {stage.dropoff}
          </div>
        </div>
      ))}
    </div>
  );
}
