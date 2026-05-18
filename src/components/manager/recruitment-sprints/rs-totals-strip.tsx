/**
 * RsTotalsStrip — 4 totals tiles.
 *
 * Tile 1: Active sprints (count)
 * Tile 2: On track + ahead (count) — green
 * Tile 3: ⚠ Behind pace (count) — red
 * Tile 4: Total budget — sum of budgetTotal across sprints, with
 *         spent% caption
 *
 * Computed live from `sprints`. Server-renderable.
 *
 * Ported from prototype lines 30472-30494.
 */

import { type Sprint } from "@/lib/mock-data/manager/manager-recruitment-sprints-data";
import { getSpecialist } from "@/lib/mock-data/manager/team";
import { cn } from "@/lib/utils/cn";

export function RsTotalsStrip({
  sprints,
}: {
  sprints: ReadonlyArray<Sprint>;
}) {
  const totals = computeTotals(sprints);
  const onTrackPlusAheadNames = sprints
    .filter((s) => s.status === "on-track" || s.status === "ahead")
    .map((s) => getSpecialist(s.ownerSpecialistId)?.firstName ?? "?")
    .join(" · ");
  const behindNames = sprints
    .filter((s) => s.status === "behind")
    .map((s) => getSpecialist(s.ownerSpecialistId)?.firstName ?? "?")
    .join(" · ");

  return (
    <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Tile
        label="Active sprints"
        num={String(sprints.length)}
        sub={`across ${countUniqueCategories(sprints)} categories`}
      />
      <Tile
        label="On track + ahead"
        num={String(totals.onTrackPlusAhead)}
        sub={onTrackPlusAheadNames || "—"}
        tone="success"
      />
      <Tile
        label="⚠ Behind pace"
        num={String(totals.behind)}
        sub={behindNames || "—"}
        tone="urgent"
      />
      <Tile
        label="Total budget"
        num={formatBudget(totals.budgetTotal)}
        sub={`${formatCurrency(totals.budgetSpent)} spent · ${totals.spentPct}%`}
      />
    </section>
  );
}

/* ============================================================
   Helpers
   ============================================================ */

type Totals = {
  onTrackPlusAhead: number;
  behind: number;
  budgetTotal: number;
  budgetSpent: number;
  spentPct: number;
};

function computeTotals(sprints: ReadonlyArray<Sprint>): Totals {
  let onTrackPlusAhead = 0;
  let behind = 0;
  let budgetTotal = 0;
  let budgetSpent = 0;
  for (const s of sprints) {
    if (s.status === "on-track" || s.status === "ahead") onTrackPlusAhead += 1;
    if (s.status === "behind") behind += 1;
    budgetTotal += s.budgetTotal;
    budgetSpent += s.budgetSpent;
  }
  const spentPct = budgetTotal === 0 ? 0 : Math.round((budgetSpent / budgetTotal) * 100);
  return { onTrackPlusAhead, behind, budgetTotal, budgetSpent, spentPct };
}

function countUniqueCategories(sprints: ReadonlyArray<Sprint>): number {
  return new Set(sprints.map((s) => s.categoryId)).size;
}

function formatBudget(amount: number): string {
  /* $2,400 → $2.4k. Always with a 'k' suffix for thousands. */
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return `$${amount}`;
}

function formatCurrency(amount: number): string {
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return `$${amount}`;
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
          "font-display text-[26px] leading-none font-medium tracking-[-0.015em]",
          numClass,
        )}
        style={{ fontVariationSettings: '"opsz" 36' }}
      >
        {num}
      </div>
      <div className="text-ink-mute truncate text-[11.5px]">{sub}</div>
    </article>
  );
}
