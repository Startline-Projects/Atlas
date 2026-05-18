/* admin.html CSS lines 27854-27892: .in-card-metric — label + value (with variant + v-suffix) + meta */

import type { IntegrationMetric } from '@/lib/mock-data/admin/integrations-data';

interface IntMetricProps {
  metric: IntegrationMetric;
}

export function IntMetric({ metric }: IntMetricProps) {
  const valueColor =
    metric.valueVariant === 'success'
      ? 'text-[var(--success)]'
      : metric.valueVariant === 'warn'
      ? 'text-[var(--amber)]'
      : metric.valueVariant === 'danger'
      ? 'text-[var(--danger)]'
      : 'text-[var(--ink)]';

  return (
    <div className="min-w-0">
      <div className="font-mono text-[8.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[3px]">
        {metric.label}
      </div>
      <div className={`font-display text-[17px] font-medium tracking-[-0.015em] leading-[1] tabular-nums ${valueColor}`}>
        {metric.value}
        {metric.valueSuffix && (
          <span className="text-[11px] font-normal text-[var(--ink-mute)] ml-[3px] tracking-[-0.005em]">
            {metric.valueSuffix}
          </span>
        )}
      </div>
      <div
        className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[3px] leading-[1.5] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
        dangerouslySetInnerHTML={{ __html: metric.meta }}
      />
    </div>
  );
}
