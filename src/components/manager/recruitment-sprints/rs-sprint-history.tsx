/**
 * RsSprintHistory — sprint history list.
 *
 * Single card with 6 historical rows + insight footer. Each row:
 * date · category + owner (+ "You" tag for Mateo) · goal config ·
 * achieved/goal · outcome pill.
 *
 * Rows are non-clickable per Q4 lock (drilled-in detail deferred —
 * the meta caption reads "Last 8 weeks · most recent first" instead
 * of the prototype's "click any row for details").
 *
 * Server-renderable.
 *
 * Ported from prototype lines 30857-30906.
 */

import { getSpecialist, MANAGER_SPECIALIST_ID } from "@/lib/mock-data/manager/team";
import {
  getCategory,
  getCategoryLabel,
} from "@/lib/mock-data/manager/manager-pool-coordination-data";
import {
  outcomeLabel,
  outcomeTone,
  sprintHistory,
  sprintHistoryInsight,
  type SprintOutcomeTone,
  type SprintHistoryEntry,
} from "@/lib/mock-data/manager/manager-recruitment-sprints-data";
import { cn } from "@/lib/utils/cn";

const OUTCOME_PILL_CLASS: Record<SprintOutcomeTone, string> = {
  win: "bg-success-bg text-success border-success/30",
  partial: "bg-amber-bg text-amber border-amber/30",
  miss: "bg-danger-bg text-danger border-danger/30",
};

export function RsSprintHistory() {
  return (
    <section className="mb-2">
      <header className="mb-3 flex items-baseline justify-between gap-3">
        <h2
          className="font-display text-ink m-0 text-[18px] font-medium tracking-[-0.01em]"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          Sprint <em className="italic">history</em>
        </h2>
        <span className="text-ink-mute text-[12px]">
          Last 8 weeks · most recent first
        </span>
      </header>

      <article className="bg-paper border-line rounded-md border p-5 shadow-sm">
        <ul className="flex flex-col gap-2">
          {sprintHistory.map((entry) => (
            <HistoryRow key={entry.id} entry={entry} />
          ))}
        </ul>
        <p className="text-ink-mute border-line-soft m-0 mt-4 border-t pt-3 text-[11.5px] leading-[1.5]">
          💡 <strong className="text-ink-soft">Pattern:</strong> {sprintHistoryInsight}
        </p>
      </article>
    </section>
  );
}

function HistoryRow({ entry }: { entry: SprintHistoryEntry }) {
  const owner = getSpecialist(entry.ownerSpecialistId);
  const category = getCategory(entry.categoryId);
  const categoryLabel = category ? getCategoryLabel(category) : entry.categoryId;
  const isSelf = entry.ownerSpecialistId === MANAGER_SPECIALIST_ID;
  const tone = outcomeTone(entry.outcome);

  return (
    <li className="bg-cream/30 border-line-soft grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 rounded-md border p-3">
      {/* Date */}
      <span className="text-ink-mute font-mono text-[10.5px] tracking-[0.04em] whitespace-nowrap">
        {entry.dateLabel}
      </span>

      {/* Body */}
      <div className="min-w-0">
        <div className="text-ink truncate text-[13px] font-semibold">
          {categoryLabel}
          {owner ? (
            <span className="text-ink-soft font-normal"> · {owner.fullName}</span>
          ) : null}
          {isSelf ? (
            <span className="bg-lime text-ink ml-1 rounded-[3px] px-1.5 py-px font-mono text-[9px] font-semibold tracking-[0.08em] uppercase">
              You
            </span>
          ) : null}
        </div>
        <div className="text-ink-mute mt-0.5 text-[11px]">
          Goal {entry.goalCount} · {entry.channels.join(" + ")} · {entry.durationDays} days
        </div>
      </div>

      {/* Achieved/Goal */}
      <span
        className="font-display text-ink text-[14px] font-semibold whitespace-nowrap"
        style={{ fontVariationSettings: '"opsz" 36' }}
      >
        {entry.achievedCount}
        <em className="text-ink-mute text-[11px] font-normal not-italic"> /{entry.goalCount}</em>
      </span>

      {/* Outcome pill */}
      <span
        className={cn(
          "flex-shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[9.5px] font-semibold tracking-[0.08em] uppercase whitespace-nowrap",
          OUTCOME_PILL_CLASS[tone],
        )}
      >
        {outcomeLabel(entry)}
      </span>
    </li>
  );
}
