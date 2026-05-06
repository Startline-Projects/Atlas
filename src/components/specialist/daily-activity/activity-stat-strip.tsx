/**
 * Daily-activity stat strip — 4 cards across the top of the feed.
 * Reuses `operations-shared/StatCard` (second consumer after sourcing).
 *
 * Source CSS for `.act-stat` is character-for-character identical to
 * `.sp-stat-card` — confirmed by the operations-shared/stat-card
 * doc-block. No conversion-bar children slot used here.
 *
 * Server Component.
 */

import type { ActivityStatCard } from "@/lib/mock-data/specialist/daily-activity";
import { StatCard } from "@/components/specialist/operations-shared";

export function ActivityStatStrip({
  stats,
}: {
  stats: ReadonlyArray<ActivityStatCard>;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 px-10 pt-5 pb-3 max-md:px-5 max-md:grid-cols-2 lg:grid-cols-4">
      {stats.map((s, i) => (
        <StatCard
          key={i}
          label={s.label}
          num={s.num}
          {...(s.numEm !== undefined ? { numEm: s.numEm } : {})}
          {...(s.trend !== undefined ? { trend: s.trend } : {})}
        />
      ))}
    </div>
  );
}
