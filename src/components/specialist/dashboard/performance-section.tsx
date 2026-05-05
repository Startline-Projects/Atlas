import { performance } from "@/lib/mock-data/specialist/dashboard-kpis";
import { SectionHeader } from "./section-header";

type Trend = "up" | "down" | "flat" | "down-good";

type Metric = {
  label: string;
  value: number | string;
  unit?: string;
  trend: Trend;
  /** Trend label, e.g. "13%", "0%", "4% faster". */
  trendLabel: string;
};

const TREND_COLOR: Record<Trend, string> = {
  up: "text-success",
  down: "text-danger",
  flat: "text-ink-mute",
  "down-good": "text-success",
};

function TrendIcon({ trend }: { trend: Trend }) {
  if (trend === "flat") {
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
  if (trend === "down" || trend === "down-good") {
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
        d="m3 7 2.5-2.5L8 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PerformanceSection() {
  const metrics: ReadonlyArray<Metric> = [
    {
      label: "Reviews completed",
      value: performance.reviewsWeek,
      trend: "up",
      trendLabel: "13%",
    },
    {
      label: "Disputes resolved",
      value: performance.disputesResolvedWeek,
      trend: "flat",
      trendLabel: "0%",
    },
    {
      label: "Avg review time",
      value: performance.avgReviewMinutes,
      unit: "min",
      trend: "down-good",
      trendLabel: "4% faster",
    },
    {
      label: "Approvals · month",
      value: performance.candidatesApprovedMonth,
      trend: "up",
      trendLabel: "8%",
    },
    {
      label: "SLA hit rate",
      value: performance.disputeSlaHitRate,
      unit: "%",
      trend: "up",
      trendLabel: "2%",
    },
    {
      label: "Sourcing pass rate",
      value: performance.sourcingActivePercent,
      unit: "%",
      trend: "flat",
      trendLabel: "0%",
    },
  ];

  return (
    <section className="mb-9">
      <SectionHeader title="Your performance" meta={<span>This week · vs last</span>} />
      <div className="bg-paper border-line rounded-md border px-5 py-4">
        <div className="grid grid-cols-2 gap-x-5 gap-y-4 md:grid-cols-3 lg:grid-cols-6">
          {metrics.map((m) => (
            <div key={m.label} className="relative">
              <span className="text-ink-mute mb-1.5 block font-mono text-[9.5px] tracking-[0.14em] uppercase">
                {m.label}
              </span>
              <span
                className="font-display text-ink mb-1 inline-flex items-baseline gap-1 text-[26px] leading-none font-medium tracking-[-0.02em]"
                style={{ fontVariationSettings: '"opsz" 72' }}
              >
                {m.value}
                {m.unit ? (
                  <span className="font-body text-ink-mute text-[12px] font-normal">
                    {m.unit}
                  </span>
                ) : null}
              </span>
              <span
                className={[
                  "inline-flex items-center gap-1 font-mono text-[11px] font-medium tracking-[0.04em]",
                  TREND_COLOR[m.trend],
                ].join(" ")}
              >
                <TrendIcon trend={m.trend} />
                {m.trendLabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
