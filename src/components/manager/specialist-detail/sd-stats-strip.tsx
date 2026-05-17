/**
 * SdStatsStrip — 5-stat strip below the meta bar.
 *
 *   Candidates · Active contracts · Reviews · month · Disputes
 *   resolved · Daily adherence
 *
 * Pulls per-specialist numbers from team.ts + spec-detail-data.ts.
 * Server Component. Ported from prototype lines 27801-27828.
 */

import { getSpecStats } from "@/lib/mock-data/manager/spec-detail-data";
import type { Specialist } from "@/lib/mock-data/manager/team";
import { cn } from "@/lib/utils/cn";

export function SdStatsStrip({ specialist: s }: { specialist: Specialist }) {
  const stats = getSpecStats(s.id);
  const adherenceTone =
    stats.dailyAdherencePct >= 95
      ? "text-success"
      : stats.dailyAdherencePct >= 80
        ? "text-amber"
        : "text-danger";

  return (
    <div className="bg-paper border-line mb-6 grid grid-cols-2 gap-px overflow-hidden rounded-md border md:grid-cols-5">
      <Stat label="Candidates" num={s.workload.candidatesCount} sub="managed in pool" />
      <Stat label="Active contracts" num={s.workload.contractsCount} sub="live engagements" />
      <Stat
        label="Reviews · month"
        num={stats.reviewsMonth}
        sub={`SLA ${stats.reviewsMonthSLAPct}%`}
      />
      <Stat
        label="Disputes resolved"
        num={stats.disputesResolvedMonth}
        sub="this month"
      />
      <Stat
        label="Daily adherence"
        num={`${stats.dailyAdherencePct}%`}
        sub="30-day rolling"
        numClass={adherenceTone}
      />
    </div>
  );
}

function Stat({
  label,
  num,
  sub,
  numClass,
}: {
  label: string;
  num: number | string;
  sub: string;
  numClass?: string;
}) {
  return (
    <div className="bg-paper flex flex-col gap-1 px-4 py-3.5">
      <div className="text-ink-mute font-mono text-[9.5px] tracking-[0.14em] uppercase">
        {label}
      </div>
      <div
        className={cn(
          "font-display text-[24px] leading-none font-medium tracking-[-0.015em]",
          numClass ?? "text-ink",
        )}
        style={{ fontVariationSettings: '"opsz" 36' }}
      >
        {num}
      </div>
      <div className="text-ink-mute text-[11.5px]">{sub}</div>
    </div>
  );
}
