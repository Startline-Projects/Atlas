/**
 * You-vs-benchmark comparison bars — 6 rows in the span-6 card.
 * Each row: label + paired YOU/BENCH bars + numeric labels.
 *
 * Per source CSS `.perf-cmp` + `.perf-cmp-bar-fill` variants
 * (`.you` = ink, `.lime` = lime-deep, `.success` = success). The
 * benchmark fill uses `.lime` per source (lime-deep) — bench is a
 * comparison anchor, not a score.
 *
 * Server Component.
 */

import { MetricCard } from "@/components/specialist/operations-shared";
import type { CmpBarRow } from "@/lib/mock-data/specialist/performance";

export function CmpBars({
  rows,
}: {
  rows: ReadonlyArray<CmpBarRow>;
}) {
  return (
    <MetricCard
      label="Comparison"
      title="You vs. category benchmark"
      span={6}
    >
      <div className="flex flex-col gap-3.5">
        {rows.map((row) => (
          <CmpBarRowItem key={row.label} row={row} />
        ))}
      </div>
    </MetricCard>
  );
}

function CmpBarRowItem({ row }: { row: CmpBarRow }) {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-[110px_minmax(0,1fr)] sm:items-center sm:gap-3">
      <div className="font-mono text-[10.5px] font-medium tracking-[0.04em] uppercase text-ink-soft">
        {row.label}
      </div>
      <div className="flex flex-col gap-1.5">
        {/* YOU bar */}
        <BarPair label="You" pct={row.youPct} num={row.youLabel} variant="you" />
        {/* BENCH bar */}
        <BarPair
          label="Cat. avg"
          pct={row.benchPct}
          num={row.benchLabel}
          variant="bench"
        />
      </div>
    </div>
  );
}

function BarPair({
  label,
  pct,
  num,
  variant,
}: {
  label: string;
  pct: number;
  num: string;
  variant: "you" | "bench";
}) {
  const fill = variant === "you" ? "bg-ink" : "bg-lime-deep";
  return (
    <div className="grid grid-cols-[60px_minmax(0,1fr)_auto] items-center gap-2 text-[11.5px]">
      <span className="font-mono text-[10px] font-medium tracking-[0.04em] uppercase text-ink-mute">
        {label}
      </span>
      <div className="bg-cream-deep relative h-[7px] overflow-hidden rounded-full">
        <div
          className={`${fill} h-full rounded-full transition-[width] duration-500`}
          style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
          aria-hidden="true"
        />
      </div>
      <span className="font-mono text-[11px] whitespace-nowrap text-ink-soft tabular-nums">
        {num}
      </span>
    </div>
  );
}
