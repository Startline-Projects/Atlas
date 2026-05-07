/**
 * KPI card for Overview row 1 — 4 cards (Volume / Speed / Accuracy /
 * Satisfaction). Reuses operations-shared/MetricCard chrome with a
 * span={3} layout; body is bignum + vs-benchmark sub-line.
 *
 * Per source CSS `.perf-kpi-num` (display 38px opsz 96) +
 * `.perf-kpi-vs` (mono 10.5px sub-line).
 *
 * Server Component.
 */

import { MetricCard } from "@/components/specialist/operations-shared";
import type { PerformanceKpiCard } from "@/lib/mock-data/specialist/performance";

export function KpiCard({ kpi }: { kpi: PerformanceKpiCard }) {
  return (
    <MetricCard
      label={kpi.label}
      title={kpi.label}
      span={3}
      {...(kpi.trend !== undefined ? { trend: kpi.trend } : {})}
    >
      <div className="flex flex-col gap-1.5">
        <div
          className="font-display flex items-baseline text-[38px] font-normal leading-[0.95] tracking-[-0.03em] text-ink tabular-nums"
          style={{ fontVariationSettings: '"opsz" 96' }}
        >
          {kpi.num}
          {kpi.numEm ? (
            <em className="ml-0.5 font-body text-[16px] not-italic font-normal text-ink-mute">
              {kpi.numEm}
            </em>
          ) : null}
        </div>
        <div className="font-mono text-[10.5px] tracking-[0.04em] uppercase text-ink-mute">
          {kpi.vsBenchmark}
        </div>
      </div>
    </MetricCard>
  );
}
