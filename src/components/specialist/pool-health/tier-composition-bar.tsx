/**
 * Composition / Tier distribution — stacked horizontal bar (flex:N
 * ratio segments) + 3-row list (Elite / Vetted / Standard).
 *
 * Per source CSS `.ph-stack-bar`: 36px tall, 6px radius, 3 segments
 * driven by `flex: <count>`. Elite is a lime gradient with ink text;
 * Vetted is success bg with paper text; Standard is ink-mute with
 * paper text.
 *
 * Server Component.
 */

import { PhCard } from "./ph-card";
import type {
  PoolHealthSnapshot,
  TierKey,
} from "@/lib/mock-data/specialist/pool-health";
import { cn } from "@/lib/utils/cn";

const SEGMENT_CLASS: Record<TierKey, string> = {
  elite:
    "text-ink bg-[linear-gradient(135deg,var(--color-lime-deep),#8FA826)]",
  vetted: "bg-success text-paper",
  standard: "bg-ink-mute text-paper",
};

const DOT_CLASS: Record<TierKey, string> = {
  elite: "bg-lime-deep",
  vetted: "bg-success",
  standard: "bg-ink-mute",
};

export function TierCompositionBar({
  composition,
}: {
  composition: PoolHealthSnapshot["tierComposition"];
}) {
  return (
    <PhCard label="Composition" title="Tier distribution" span={6}>
      <div className="my-1.5 flex h-9 overflow-hidden rounded-md">
        {composition.map((row) => (
          <div
            key={row.tier}
            style={{ flex: row.count }}
            className={cn(
              "grid place-items-center font-mono text-[10.5px] font-semibold tracking-[0.04em] whitespace-nowrap transition-[filter] hover:brightness-110",
              SEGMENT_CLASS[row.tier],
            )}
            title={`${row.label} · ${row.count} talents · ${row.pctLabel}`}
          >
            {row.count}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {composition.map((row) => (
          <div
            key={row.tier}
            className="border-line-soft grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b py-1.5 text-[12.5px] last:border-b-0"
          >
            <span className="flex items-center gap-2 font-medium text-ink">
              <span
                aria-hidden="true"
                className={cn("h-[9px] w-[9px] rounded-[2px]", DOT_CLASS[row.tier])}
              />
              {row.label}
            </span>
            <span className="text-[11.5px] text-ink-mute">
              {row.pctLabel} of pool
            </span>
            <span className="font-mono text-[13px] font-medium text-ink tabular-nums">
              {row.count}
            </span>
          </div>
        ))}
      </div>
    </PhCard>
  );
}
