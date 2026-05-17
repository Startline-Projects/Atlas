"use client";

/**
 * SdTabOverview — Overview tab.
 *
 * 2 cards:
 *   1. At-a-glance: 4 tiles (Candidates approved, Reviews pending,
 *      Sourcing volume, Hires placed — last tile shows team revenue
 *      sub-label)
 *   2. Recent timeline (6 entries, shared placeholder content with
 *      name interpolation)
 *
 * Ported from prototype lines 27844-27894.
 *
 * Inherits Client boundary from SpecialistDetailApp.
 */

import { overviewTimelineEntries } from "@/lib/mock-data/manager/spec-detail-data";
import type { Specialist } from "@/lib/mock-data/manager/team";
import { cn } from "@/lib/utils/cn";

export function SdTabOverview({ specialist: s }: { specialist: Specialist }) {
  const kpis = s.kpis;
  return (
    <div className="flex flex-col gap-4">
      <section className="bg-paper border-line rounded-md border p-5">
        <div className="mb-4">
          <div className="text-ink-mute font-mono text-[10px] tracking-[0.12em] uppercase">
            At a glance
          </div>
          <h2
            className="font-display text-ink m-0 mt-0.5 text-[18px] font-medium tracking-[-0.01em]"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            This month&apos;s <em className="italic">activity</em>
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <PerfTile label="Candidates approved" value={String(kpis.candidatesApprovedMonth)} sub="up 3 vs last mo" />
          <PerfTile label="Reviews · pending" value={String(s.reviewsPendingNow)} sub="avg 18h wait" />
          <PerfTile label="Sourcing volume" value={String(kpis.sourcingProspectsMonth)} sub="prospects this mo" />
          <PerfTile label="Hires placed" value={String(kpis.hiresPlacedMonth)} sub="$8.2k team revenue" tone="success" />
        </div>
      </section>

      <section className="bg-paper border-line rounded-md border p-5">
        <div className="mb-4">
          <div className="text-ink-mute font-mono text-[10px] tracking-[0.12em] uppercase">
            Activity
          </div>
          <h2
            className="font-display text-ink m-0 mt-0.5 text-[18px] font-medium tracking-[-0.01em]"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            Recent <em className="italic">timeline</em>
          </h2>
        </div>
        <ul className="flex flex-col gap-2.5">
          {overviewTimelineEntries.map((entry) => (
            <li
              key={entry.id}
              className={cn(
                "border-line-soft flex items-start justify-between gap-3 border-l-[3px] pl-3 text-[13px]",
                entry.tone === "success" && "border-l-success",
                entry.tone === "attn" && "border-l-amber",
                entry.tone === "neutral" && "border-l-line",
              )}
            >
              <span
                className="text-ink-soft leading-[1.45]"
                dangerouslySetInnerHTML={{ __html: entry.body }}
              />
              <span className="text-ink-mute flex-shrink-0 font-mono text-[10px] tracking-[0.06em] uppercase">
                {entry.time}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function PerfTile({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  tone?: "success";
}) {
  return (
    <div className="bg-cream/40 border-line-soft flex flex-col gap-1 rounded-md border px-3 py-2.5">
      <div className="text-ink-mute font-mono text-[9px] tracking-[0.14em] uppercase">
        {label}
      </div>
      <div
        className={cn(
          "font-display text-[22px] leading-none font-medium tracking-[-0.015em]",
          tone === "success" ? "text-success" : "text-ink",
        )}
        style={{ fontVariationSettings: '"opsz" 36' }}
      >
        {value}
      </div>
      <div className="text-ink-mute text-[11px]">{sub}</div>
    </div>
  );
}
