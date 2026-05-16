import type { PrSecondaryMetric } from '@/lib/mock-data/admin/privacy-reports-data';

interface PrSecondaryMetricsProps {
  metrics: PrSecondaryMetric[];
}

export function PrSecondaryMetrics({ metrics }: PrSecondaryMetricsProps) {
  return (
    <div className="py-[12px] px-[18px] grid grid-cols-3 gap-[12px] max-[720px]:grid-cols-1">
      {metrics.map((metric, idx) => (
        <div
          key={idx}
          className="p-[10px] bg-[var(--paper-deep)] rounded-[var(--r-sm)] border border-[var(--line-soft)]"
        >
          <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[4px]">
            {metric.label}
          </div>
          <div className="font-display text-[16px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[3px]">
            {metric.value}
          </div>
          <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em]">
            {metric.meta}
          </div>
        </div>
      ))}
    </div>
  );
}
