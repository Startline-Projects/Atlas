"use client";

/**
 * SdTabWorkload — Workload tab.
 *
 * 3 cards:
 *   1. Active caseload — 3 capacity bars (candidates / contracts /
 *      reviews-pending). Bar tone forks on % over capacity (≥100% =
 *      danger, ≥85% = amber, else success).
 *   2. Recent assignments — 4 timeline items (shared)
 *   3. Needs attention now — 4 items (shared)
 *
 * Capacity bar values: candidates+contracts from Specialist.workload,
 * reviewsPendingNow from spec stats. Capacities from team.ts +
 * spec-detail-data.
 *
 * Ported from prototype lines 27962-28040.
 */

import {
  workloadNeedsAttention,
  workloadRecentAssignments,
} from "@/lib/mock-data/manager/spec-detail-data";
import type { Specialist } from "@/lib/mock-data/manager/team";
import { cn } from "@/lib/utils/cn";

export function SdTabWorkload({ specialist: s }: { specialist: Specialist }) {
  return (
    <div className="flex flex-col gap-4">
      <section className="bg-paper border-line rounded-md border p-5">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-ink-mute font-mono text-[10px] tracking-[0.12em] uppercase">
              Capacity
            </div>
            <h2
              className="font-display text-ink m-0 mt-0.5 text-[18px] font-medium tracking-[-0.01em]"
              style={{ fontVariationSettings: '"opsz" 36' }}
            >
              Active <em className="italic">caseload</em>
            </h2>
          </div>
          <span className="text-ink-mute text-[12px]">
            Caseload capacity: {s.caseloadCapacity}
          </span>
        </div>
        <CapacityBar
          label="Candidates"
          numerator={s.workload.candidatesCount}
          denominator={s.caseloadCapacity}
        />
        <CapacityBar
          label="Contracts"
          numerator={s.workload.contractsCount}
          denominator={s.contractsCapacity}
        />
        <CapacityBar
          label="Reviews pending"
          numerator={s.reviewsPendingNow}
          denominator={s.reviewsPendingCapacity}
        />
      </section>

      <TimelineCard
        eyebrow="Recent assignments"
        title="Last"
        titleEm="10 days"
        items={workloadRecentAssignments}
      />

      <TimelineCard
        eyebrow="Needs attention now"
        title="In their"
        titleEm="queue"
        items={workloadNeedsAttention}
      />
    </div>
  );
}

function CapacityBar({
  label,
  numerator,
  denominator,
}: {
  label: string;
  numerator: number;
  denominator: number;
}) {
  const pct = denominator > 0 ? (numerator / denominator) * 100 : 0;
  const clamped = Math.min(pct, 100);
  const tone =
    pct >= 100 ? "bg-danger" : pct >= 85 ? "bg-amber" : "bg-success";
  const numTone =
    pct >= 100 ? "text-danger" : pct >= 85 ? "text-amber" : "text-ink";

  return (
    <div className="mt-3 first:mt-0">
      <div className="text-ink-mute mb-1.5 font-mono text-[10px] tracking-[0.08em] uppercase">
        {label}
      </div>
      <div className="bg-cream-deep relative h-2.5 overflow-hidden rounded-full">
        <span
          aria-hidden="true"
          className={cn("absolute inset-y-0 left-0 rounded-full", tone)}
          style={{ width: `${clamped}%` }}
        />
      </div>
      <div className={cn("text-ink mt-1 text-right font-mono text-[11px] font-semibold tabular-nums", numTone)}>
        {numerator} / {denominator}
        {pct >= 100 ? (
          <span className="text-danger ml-2 text-[10px] font-mono uppercase tracking-[0.08em]">
            Over
          </span>
        ) : null}
      </div>
    </div>
  );
}

function TimelineCard({
  eyebrow,
  title,
  titleEm,
  items,
}: {
  eyebrow: string;
  title: string;
  titleEm: string;
  items: ReadonlyArray<{ id: string; tone: "neutral" | "urgent" | "attn"; body: string; time: string }>;
}) {
  return (
    <section className="bg-paper border-line rounded-md border p-5">
      <div className="mb-4">
        <div className="text-ink-mute font-mono text-[10px] tracking-[0.12em] uppercase">
          {eyebrow}
        </div>
        <h2
          className="font-display text-ink m-0 mt-0.5 text-[18px] font-medium tracking-[-0.01em]"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          {title} <em className="italic">{titleEm}</em>
        </h2>
      </div>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(
              "border-line-soft flex items-start justify-between gap-3 border-l-[3px] pl-3 text-[13px]",
              item.tone === "urgent" && "border-l-danger",
              item.tone === "attn" && "border-l-amber",
              item.tone === "neutral" && "border-l-line",
            )}
          >
            <span
              className="text-ink-soft leading-[1.45]"
              dangerouslySetInnerHTML={{ __html: item.body }}
            />
            <span className="text-ink-mute flex-shrink-0 font-mono text-[10px] tracking-[0.06em] uppercase">
              {item.time}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
