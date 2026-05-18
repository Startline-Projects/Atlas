/**
 * TdPatternsSection — Patterns & insights (3 cards).
 *
 * Card 1: Dispute volume per Specialist (8-row bar list w/ insight)
 * Card 2: Role category breakdown (8-row count list)
 * Card 3: Avg resolution time per Specialist (7-row time list w/ insight)
 *
 * All data sourced from `manager-team-disputes-patterns.ts`
 * (team-wide 30-day historical aggregates, NOT computed from the
 * 12 currently-open disputes).
 *
 * Ported from prototype lines 29622-29781. Server-renderable.
 */

import { countryFlag } from "@/lib/utils/country-flag";
import { getSpecialist } from "@/lib/mock-data/manager/team";
import {
  avgResolutionInsight,
  avgResolutionTimePerSpecialist,
  disputeVolumeInsight,
  disputeVolumePerSpecialist,
  disputesByRoleCategory,
  type AvgResolutionTimeRow,
  type DisputeVolumeRow,
  type ResolutionTimeTone,
  type RoleCategoryRow,
} from "@/lib/mock-data/manager/manager-team-disputes-patterns";
import { cn } from "@/lib/utils/cn";

export function TdPatternsSection() {
  return (
    <section className="mb-6">
      <header className="mb-3 flex items-baseline justify-between gap-3">
        <h2
          className="font-display text-ink m-0 text-[18px] font-medium tracking-[-0.01em]"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          Patterns &amp; <em className="italic">insights</em>
        </h2>
        <span className="text-ink-mute text-[12px]">last 30 days</span>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <DisputeVolumeCard />
        <RoleCategoryCard />
        <AvgResolutionCard />
      </div>
    </section>
  );
}

/* ============================================================
   Card 1 — Dispute volume per Specialist
   ============================================================ */

function DisputeVolumeCard() {
  const max = Math.max(...disputeVolumePerSpecialist.map((r) => r.count));
  return (
    <article className="bg-paper border-line flex flex-col rounded-md border p-5">
      <CardHead eyebrow="Per Specialist" title="Dispute" titleEm="volume" />
      <ul className="mt-3 flex flex-col gap-2.5">
        {disputeVolumePerSpecialist.map((row) => (
          <VolumeBarRow key={row.specialistId} row={row} max={max} />
        ))}
      </ul>
      <InsightFooter text={disputeVolumeInsight} />
    </article>
  );
}

function VolumeBarRow({ row, max }: { row: DisputeVolumeRow; max: number }) {
  const s = getSpecialist(row.specialistId);
  if (!s) return null;
  const pct = (row.count / max) * 100;
  return (
    <li className="grid grid-cols-[1fr_auto_auto] items-center gap-3 text-[12px]">
      <span className="text-ink-soft truncate">
        {s.fullName}{" "}
        <span aria-hidden="true">{countryFlag(s.countryCode)}</span>
      </span>
      <div className="bg-cream-deep relative h-1.5 w-32 overflow-hidden rounded-full">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            row.tone === "urgent" ? "bg-danger" : "bg-ink",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-ink font-display w-4 text-right text-[13px] font-semibold">
        {row.count}
      </span>
    </li>
  );
}

/* ============================================================
   Card 2 — Role category
   ============================================================ */

function RoleCategoryCard() {
  return (
    <article className="bg-paper border-line flex flex-col rounded-md border p-5">
      <CardHead eyebrow="By category" title="Role" titleEm="category" />
      <ul className="mt-3 flex flex-col gap-2.5">
        {disputesByRoleCategory.map((row) => (
          <CategoryRow key={row.category} row={row} />
        ))}
      </ul>
    </article>
  );
}

function CategoryRow({ row }: { row: RoleCategoryRow }) {
  return (
    <li className="flex items-center justify-between text-[12px]">
      <span className="text-ink-soft">{row.category}</span>
      <span className="text-ink-mute text-[11.5px]">
        <strong className="text-ink font-semibold">{row.count}</strong>{" "}
        dispute{row.count === 1 ? "" : "s"}
      </span>
    </li>
  );
}

/* ============================================================
   Card 3 — Avg resolution time
   ============================================================ */

function AvgResolutionCard() {
  return (
    <article className="bg-paper border-line flex flex-col rounded-md border p-5">
      <CardHead eyebrow="Resolution time" title="Average" titleEm="by Specialist" />
      <ul className="mt-3 flex flex-col gap-2.5">
        {avgResolutionTimePerSpecialist.map((row) => (
          <ResolutionRow key={row.specialistId} row={row} />
        ))}
      </ul>
      <InsightFooter text={avgResolutionInsight} />
    </article>
  );
}

const TIME_TONE_CLASS: Record<ResolutionTimeTone, string> = {
  success: "text-success",
  warn: "text-amber",
  urgent: "text-danger",
  neutral: "text-ink-soft",
};

function ResolutionRow({ row }: { row: AvgResolutionTimeRow }) {
  const s = getSpecialist(row.specialistId);
  if (!s) return null;
  return (
    <li className="grid grid-cols-[1fr_auto] items-center gap-3 text-[12px]">
      <div className="min-w-0">
        <div className="text-ink-soft truncate">{s.fullName}</div>
        <div className="text-ink-mute mt-0.5 text-[10.5px]">{row.caption}</div>
      </div>
      <span
        className={cn(
          "font-display w-10 text-right text-[14px] font-semibold",
          TIME_TONE_CLASS[row.tone],
        )}
      >
        {row.hours}h
      </span>
    </li>
  );
}

/* ============================================================
   Shared bits
   ============================================================ */

function CardHead({
  eyebrow,
  title,
  titleEm,
}: {
  eyebrow: string;
  title: string;
  titleEm: string;
}) {
  return (
    <header>
      <div className="text-ink-mute font-mono text-[9.5px] tracking-[0.14em] uppercase">
        {eyebrow}
      </div>
      <h3
        className="font-display text-ink m-0 mt-0.5 text-[15px] font-medium tracking-[-0.01em]"
        style={{ fontVariationSettings: '"opsz" 36' }}
      >
        {title} <em className="italic">{titleEm}</em>
      </h3>
    </header>
  );
}

function InsightFooter({ text }: { text: string }) {
  return (
    <p className="text-ink-mute border-line-soft m-0 mt-3 border-t pt-3 text-[11.5px] leading-[1.45]">
      💡 <strong className="text-ink-soft">Insight:</strong> {text}
    </p>
  );
}
