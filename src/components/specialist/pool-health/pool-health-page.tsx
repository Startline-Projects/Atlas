/**
 * Pool-health Server Component — composes the strategic dashboard
 * from snapshot data. Single <main> vertical stack:
 *
 *   1. Header (Client island — period toggle + Export)
 *   2. Hero scorecard
 *   3. 12-col card grid:
 *        Row 1: span-4 capacity / span-4 utilization / span-4 quality
 *        Row 2: span-6 tier composition / span-6 geographic
 *        Row 3: span-6 churn risk / span-6 skill matrix
 *        Row 4: span-12 recommended actions
 *
 * Server-rendered. Period-toggle is the only interactive piece.
 */

import { poolHealthSnapshot } from "@/lib/mock-data/specialist/pool-health";

import { PoolHealthHeader } from "./pool-health-header";
import { ScoreCard } from "./score-card";
import { CapacitySparkline } from "./capacity-sparkline";
import { UtilizationDonut } from "./utilization-donut";
import { QualityTile } from "./quality-tile";
import { TierCompositionBar } from "./tier-composition-bar";
import { Barlist } from "./barlist";
import { ChurnRiskList } from "./churn-risk-list";
import { SkillTierMatrix } from "./skill-tier-matrix";
import { RecommendedActionsList } from "./recommended-actions-list";

export function PoolHealthPage() {
  const s = poolHealthSnapshot;

  return (
    <main className="bg-cream flex min-w-0 flex-1 flex-col">
      <PoolHealthHeader
        category={s.category}
        liveCount={s.liveCount}
        lastRefreshLabel={s.lastRefreshLabel}
        initialPeriod={s.activePeriod}
      />
      <ScoreCard snapshot={s} />
      <div className="grid grid-cols-12 gap-3.5 px-9 pt-[18px] pb-[60px] max-md:gap-3 max-md:px-5 max-md:pb-[50px]">
        <CapacitySparkline capacity={s.capacity} />
        <UtilizationDonut utilization={s.utilization} />
        <QualityTile quality={s.quality} />
        <TierCompositionBar composition={s.tierComposition} />
        <Barlist geographic={s.geographic} others={s.geographicOthers} />
        <ChurnRiskList items={s.churnRisk} />
        <SkillTierMatrix matrix={s.skillTierMatrix} />
        <RecommendedActionsList actions={s.recommendedActions} />
      </div>
    </main>
  );
}
