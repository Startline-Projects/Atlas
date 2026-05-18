/**
 * ManagerTeamPerfSection — "Team performance · This week · vs last"
 * with 6 metric tiles.
 *
 * Server Component. Inlined `MetricTile` per Step 3 Q6.
 *
 * Each tile shows a label, a big number (with optional unit suffix),
 * and a trend caption with up/down/flat arrow.
 *
 * Ported from `reference/manager.html` lines 19857-19914.
 */

import {
  managerTeamPerfMetrics,
  type ManagerTeamPerfMetric,
  type TrendDirection,
} from "@/lib/mock-data/manager/manager-team-perf";
import { cn } from "@/lib/utils/cn";

const TREND_CLASS: Record<TrendDirection, string> = {
  up: "text-success",
  down: "text-danger",
  flat: "text-ink-mute",
};

export function ManagerTeamPerfSection() {
  return (
    <section className="mb-8">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2
          className="font-display text-ink m-0 text-[22px] font-medium tracking-[-0.015em]"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          Team performance
        </h2>
        <span className="text-ink-mute font-mono text-[10.5px] tracking-[0.04em]">
          This week · vs last
        </span>
      </div>
      <div className="bg-paper border-line rounded-md border p-5">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {managerTeamPerfMetrics.map((m) => (
            <MetricTile key={m.id} metric={m} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricTile({ metric }: { metric: ManagerTeamPerfMetric }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-ink-mute font-mono text-[9.5px] tracking-[0.14em] uppercase">
        {metric.label}
      </span>
      <span
        className="font-display text-ink text-[28px] leading-none font-medium tracking-[-0.015em]"
        style={{ fontVariationSettings: '"opsz" 36' }}
      >
        {metric.value.number}
        {metric.value.unit ? (
          <span className="text-ink-mute ml-0.5 text-[14px] font-normal">
            {metric.value.unit}
          </span>
        ) : null}
      </span>
      <span
        className={cn(
          "flex items-center gap-1 font-mono text-[10.5px] tracking-[0.04em]",
          TREND_CLASS[metric.trend.direction],
        )}
      >
        <TrendArrow direction={metric.trend.direction} />
        {metric.trend.delta}
      </span>
    </div>
  );
}

function TrendArrow({ direction }: { direction: TrendDirection }) {
  if (direction === "up") {
    return (
      <svg
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="m3 7 2.5-2.5L8 7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (direction === "down") {
    return (
      <svg
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="m3 4 2.5 2.5L8 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 5.5h5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
