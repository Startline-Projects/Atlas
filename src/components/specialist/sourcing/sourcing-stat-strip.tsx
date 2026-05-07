/**
 * Sourcing stat strip — 4 stat cards across the top of the kanban.
 * The second card has a conversion bar (CSS `--w`) that fills based
 * on `conversionPct`.
 *
 * Server Component.
 */

import {
  sourcingStats,
  type SourcingStatCard,
} from "@/lib/mock-data/specialist/sourcing";
import { StatCard } from "@/components/specialist/operations-shared";

export function SourcingStatStrip() {
  return (
    <div className="grid grid-cols-1 gap-3 px-9 pt-5 pb-3 max-md:px-5 max-md:grid-cols-2 lg:grid-cols-4">
      {sourcingStats.map((s, i) => (
        <SourcingStatCardItem key={i} stat={s} />
      ))}
    </div>
  );
}

function SourcingStatCardItem({ stat }: { stat: SourcingStatCard }) {
  return (
    <StatCard
      label={stat.label}
      num={stat.num}
      {...(stat.numEm !== undefined ? { numEm: stat.numEm } : {})}
      {...(stat.trend !== undefined ? { trend: stat.trend } : {})}
    >
      {stat.conversionPct !== undefined ? (
        <ConversionBar pct={stat.conversionPct} />
      ) : null}
    </StatCard>
  );
}

function ConversionBar({ pct }: { pct: number }) {
  const clamped = Math.min(100, Math.max(0, pct));
  return (
    <div className="bg-line-soft mt-2 h-1 w-full overflow-hidden rounded-full">
      <div
        className="bg-ink h-full rounded-full transition-[width] duration-300"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
