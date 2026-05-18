/**
 * PcTotalsStrip — 4 totals tiles.
 *
 * Tile 1: Total candidates (sum of liveCount across all categories)
 * Tile 2: Strong pools (count of status === "strong")
 * Tile 3: Stable / steady (count of status === "stable" OR "steady")
 * Tile 4: ⚠ Needs attention (count of depleted + overflowing)
 *
 * All counts derived live from `poolCategories`. Server-renderable.
 *
 * Ported from prototype lines 29906-29927.
 */

import { type PoolCategory } from "@/lib/mock-data/manager/manager-pool-coordination-data";
import { cn } from "@/lib/utils/cn";

export function PcTotalsStrip({
  categories,
}: {
  categories: ReadonlyArray<PoolCategory>;
}) {
  const totals = computeTotals(categories);

  return (
    <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Tile
        label="Total candidates"
        num={String(totals.totalCandidates)}
        sub={`across ${categories.length} categories`}
      />
      <Tile
        label="Strong pools"
        num={String(totals.strongCount)}
        sub="above threshold"
        tone="success"
      />
      <Tile
        label="Stable / steady"
        num={String(totals.stableSteadyCount)}
        sub="tracking on target"
      />
      <Tile
        label="⚠ Needs attention"
        num={String(totals.needsAttentionCount)}
        sub={attentionSubtitle(totals)}
        tone="urgent"
      />
    </section>
  );
}

/* ============================================================
   Helpers
   ============================================================ */

type Totals = {
  totalCandidates: number;
  strongCount: number;
  stableSteadyCount: number;
  depletedCount: number;
  overflowingCount: number;
  needsAttentionCount: number;
};

function computeTotals(categories: ReadonlyArray<PoolCategory>): Totals {
  let totalCandidates = 0;
  let strongCount = 0;
  let stableSteadyCount = 0;
  let depletedCount = 0;
  let overflowingCount = 0;
  for (const c of categories) {
    totalCandidates += c.liveCount;
    if (c.status === "strong") strongCount += 1;
    if (c.status === "stable" || c.status === "steady") stableSteadyCount += 1;
    if (c.status === "depleted") depletedCount += 1;
    if (c.status === "overflowing") overflowingCount += 1;
  }
  return {
    totalCandidates,
    strongCount,
    stableSteadyCount,
    depletedCount,
    overflowingCount,
    needsAttentionCount: depletedCount + overflowingCount,
  };
}

function attentionSubtitle(t: Totals): string {
  if (t.needsAttentionCount === 0) return "All pools healthy";
  const parts: string[] = [];
  if (t.depletedCount > 0) parts.push(`${t.depletedCount} depleted`);
  if (t.overflowingCount > 0) parts.push(`${t.overflowingCount} overflowing`);
  return parts.join(" · ");
}

function Tile({
  label,
  num,
  sub,
  tone,
}: {
  label: string;
  num: string;
  sub: string;
  tone?: "success" | "urgent";
}) {
  const wrapperClass =
    tone === "urgent"
      ? "bg-danger-bg/30 border-danger/30"
      : tone === "success"
        ? "bg-success-bg/20 border-success/30"
        : "bg-paper border-line";
  const numClass =
    tone === "urgent" ? "text-danger" : tone === "success" ? "text-success" : "text-ink";
  const labelClass = tone === "urgent" ? "text-danger" : "text-ink-mute";

  return (
    <article className={cn("flex flex-col gap-1 rounded-md border p-4", wrapperClass)}>
      <div className={cn("font-mono text-[9.5px] tracking-[0.14em] uppercase", labelClass)}>
        {label}
      </div>
      <div
        className={cn(
          "font-display text-[28px] leading-none font-medium tracking-[-0.015em]",
          numClass,
        )}
        style={{ fontVariationSettings: '"opsz" 36' }}
      >
        {num}
      </div>
      <div className="text-ink-mute text-[11.5px]">{sub}</div>
    </article>
  );
}
