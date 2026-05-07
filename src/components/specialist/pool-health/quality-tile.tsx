/**
 * Quality signal / Avg client rating tile — bignum (4.7/5) + caption +
 * sparkline. Same visual shape as capacity-sparkline but with a different
 * caption and a lime-tone line.
 *
 * Server Component.
 */

import { MetricCard } from "@/components/specialist/operations-shared";
import { SparklineSVG } from "@/components/specialist/operations-shared";
import type { PoolHealthSnapshot } from "@/lib/mock-data/specialist/pool-health";

export function QualityTile({
  quality,
}: {
  quality: PoolHealthSnapshot["quality"];
}) {
  return (
    <MetricCard label="Quality signal" title="Avg client rating" span={4}>
      <div className="flex items-baseline justify-between gap-2">
        <div
          className="font-display text-[40px] font-normal leading-none tracking-[-0.03em] text-ink tabular-nums"
          style={{ fontVariationSettings: '"opsz" 144' }}
        >
          {quality.bignum}
          {quality.bignumEm ? (
            <em className="font-body text-[14px] not-italic font-normal text-ink-mute">
              {quality.bignumEm}
            </em>
          ) : null}
        </div>
        <span className="font-mono text-[10px] tracking-[0.04em] uppercase text-ink-mute">
          {quality.caption}
        </span>
      </div>
      <SparklineSVG points={quality.points} tone={quality.tone} />
    </MetricCard>
  );
}
