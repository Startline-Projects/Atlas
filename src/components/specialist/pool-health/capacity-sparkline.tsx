/**
 * Capacity / Pool size tile — bignum + target-range caption + sparkline.
 *
 * Server Component.
 */

import { PhCard } from "./ph-card";
import { SparklineSVG } from "./sparkline-svg";
import type { PoolHealthSnapshot } from "@/lib/mock-data/specialist/pool-health";

export function CapacitySparkline({
  capacity,
}: {
  capacity: PoolHealthSnapshot["capacity"];
}) {
  return (
    <PhCard label="Capacity" title="Pool size" span={4}>
      <div className="flex items-baseline justify-between gap-2">
        <div
          className="font-display text-[40px] font-normal leading-none tracking-[-0.03em] text-ink tabular-nums"
          style={{ fontVariationSettings: '"opsz" 144' }}
        >
          {capacity.bignum}
          {capacity.bignumEm ? (
            <em className="ml-1 font-body text-[14px] not-italic font-normal text-ink-mute">
              {capacity.bignumEm}
            </em>
          ) : null}
        </div>
        <span className="font-mono text-[10px] tracking-[0.04em] uppercase text-ink-mute">
          Target {capacity.targetRange}
        </span>
      </div>
      <SparklineSVG points={capacity.points} tone={capacity.tone} />
    </PhCard>
  );
}
