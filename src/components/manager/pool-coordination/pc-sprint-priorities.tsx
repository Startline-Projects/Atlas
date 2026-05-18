"use client";

/**
 * PcSprintPriorities — sprint priorities card.
 *
 * Single card containing 3 prioritized rows + footer note about
 * Diego's surplus capacity. Each row has rank badge + category
 * label + owner + detail + "Launch sprint →" CTA (modal step 9).
 *
 * Sprint priorities reference category IDs via `getCategory()`.
 * Rows where the referenced category resolves to undefined are
 * silently dropped (logged at module load via assertion in the
 * data file). Q9w verification: all 3 priorities resolve correctly.
 *
 * Ported from prototype lines 30294-30334.
 */

import { useState } from "react";
import { getSpecialist } from "@/lib/mock-data/manager/team";
import { ManagerActionPlaceholderModal } from "@/components/manager/dashboard/manager-action-placeholder-modal";
import type { ManagerActionCTA } from "@/lib/mock-data/manager/manager-rail";
import {
  type SprintPriority,
  getCategory,
  getCategoryLabel,
  sprintPriorities,
} from "@/lib/mock-data/manager/manager-pool-coordination-data";
import { cn } from "@/lib/utils/cn";

const COORDINATE_CTA: ManagerActionCTA = {
  label: "Open sprint coordination",
  landsInStep: 9,
  description: "Cross-team sprint coordination view — coming soon.",
};

const PRIO_BADGE_CLASS: Record<1 | 2 | 3, string> = {
  1: "bg-danger text-paper",
  2: "bg-amber text-ink",
  3: "bg-cream-deep text-ink-soft",
};

export function PcSprintPriorities() {
  const [activeCta, setActiveCta] = useState<ManagerActionCTA | null>(null);

  return (
    <section className="mb-2">
      <header className="mb-3 flex items-baseline justify-between gap-3">
        <h2
          className="font-display text-ink m-0 text-[18px] font-medium tracking-[-0.01em]"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          Sprint <em className="italic">priorities</em>
        </h2>
        <span className="text-ink-mute text-[12px]">
          Suggested order · refresh weekly
        </span>
      </header>

      <article className="bg-paper border-line rounded-md border p-5 shadow-sm">
        <p className="text-ink-soft m-0 mb-3 text-[13px] leading-[1.5]">
          Based on current pool data, run sprints in this order to balance the
          team this week:
        </p>
        <ul className="flex flex-col gap-2">
          {sprintPriorities.map((sp) => (
            <PriorityRow key={sp.rank} priority={sp} onAction={setActiveCta} />
          ))}
        </ul>
        <p className="text-ink-mute border-line-soft m-0 mt-4 border-t pt-3 text-[11.5px] leading-[1.5]">
          💡 <strong className="text-ink-soft">Coordinate with team:</strong>{" "}
          Diego (Bookkeeping) has surplus capacity to assist any of these
          sprints.{" "}
          <button
            type="button"
            onClick={() => setActiveCta(COORDINATE_CTA)}
            className="text-ink hover:text-ink-soft inline cursor-pointer border-0 bg-transparent p-0 font-inherit text-inherit underline transition-colors"
          >
            Open sprint coordination →
          </button>
        </p>
      </article>

      <ManagerActionPlaceholderModal
        cta={activeCta}
        onClose={() => setActiveCta(null)}
      />
    </section>
  );
}

function PriorityRow({
  priority: sp,
  onAction,
}: {
  priority: SprintPriority;
  onAction: (cta: ManagerActionCTA) => void;
}) {
  const category = getCategory(sp.categoryId);
  /* Defensive: drop rows whose category doesn't resolve. Module-load
     assertion in the data file should prevent this, but guard at
     render too for runtime safety. */
  if (!category) return null;
  const owner = getSpecialist(category.primaryOwnerSpecialistId);
  const label = getCategoryLabel(category);

  return (
    <li className="bg-cream/40 border-line-soft grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-md border p-3">
      <span
        className={cn(
          "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full font-mono text-[10.5px] font-semibold",
          PRIO_BADGE_CLASS[sp.rank],
        )}
      >
        #{sp.rank}
      </span>
      <div className="min-w-0">
        <div className="text-ink truncate text-[13px] font-semibold">
          {label}
          {owner ? (
            <span className="text-ink-soft font-normal"> · {owner.fullName}</span>
          ) : null}
        </div>
        <div className="text-ink-mute mt-0.5 text-[11.5px]">{sp.detail}</div>
      </div>
      <button
        type="button"
        onClick={() =>
          onAction({
            label: `Launch sprint — ${label}`,
            landsInStep: 9,
            description: "Sprint launch flow — coming soon.",
          })
        }
        className="bg-paper border-line text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex flex-shrink-0 items-center rounded-md border px-3 py-1.5 text-[12px] font-medium whitespace-nowrap transition-colors"
      >
        Launch sprint →
      </button>
    </li>
  );
}
