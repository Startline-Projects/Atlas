/**
 * TdStatusOverview — 4 status tiles.
 *
 * Tile 1: Total open
 * Tile 2: ⚠ SLA at risk (slaHours < 24)
 * Tile 3: In progress (status === "progress")
 * Tile 4: Escalated (status === "escalated")
 *
 * "Across N Specialists" caption derived from unique owner count.
 *
 * Ported from prototype lines 29173-29194. Server-renderable.
 */

import { type Dispute, slaBand } from "@/lib/mock-data/manager/manager-team-disputes-data";
import { cn } from "@/lib/utils/cn";

export function TdStatusOverview({
  disputes,
}: {
  disputes: ReadonlyArray<Dispute>;
}) {
  const counts = countByStatus(disputes);
  const uniqueOwners = new Set(disputes.map((d) => d.ownerSpecialistId)).size;

  return (
    <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Tile
        label="Total open"
        num={String(disputes.length)}
        sub={`Across ${uniqueOwners} Specialists`}
      />
      <Tile
        label="⚠ SLA at risk"
        num={String(counts.slaRisk)}
        sub="Within next 24h"
        tone="urgent"
      />
      <Tile
        label="In progress"
        num={String(counts.progress)}
        sub="Specialist working"
        tone="attn"
      />
      <Tile
        label="Escalated"
        num={String(counts.escalated)}
        sub="Awaiting Admin"
      />
    </section>
  );
}

/* ============================================================
   Helpers
   ============================================================ */

function countByStatus(disputes: ReadonlyArray<Dispute>) {
  let slaRisk = 0;
  let progress = 0;
  let escalated = 0;
  for (const d of disputes) {
    if (slaBand(d) === "urgent") slaRisk += 1;
    if (d.status === "progress") progress += 1;
    if (d.status === "escalated") escalated += 1;
  }
  return { slaRisk, progress, escalated };
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
  tone?: "urgent" | "attn";
}) {
  const wrapperClass =
    tone === "urgent"
      ? "bg-danger-bg/30 border-danger/30"
      : "bg-paper border-line";
  const numClass =
    tone === "urgent" ? "text-danger" : tone === "attn" ? "text-amber" : "text-ink";
  const labelClass =
    tone === "urgent" ? "text-danger" : "text-ink-mute";

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
