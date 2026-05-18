/**
 * PcSprintPriorities — sprint priorities card.
 *
 * Single card containing 3 prioritized rows + footer note about
 * Diego's surplus capacity. Each row has rank badge + category
 * label + owner + detail + "Launch sprint →" Link.
 *
 * Sprint priorities reference category IDs via `getCategory()`.
 * Rows where the referenced category resolves to undefined are
 * silently dropped (logged at module load via assertion in the
 * data file). Q9w verification: all 3 priorities resolve correctly.
 *
 * Step 9 un-disable: "Launch sprint →" buttons + "Open sprint
 * coordination →" footer all flipped from modal triggers to real
 * Links pointing to `/specialist/recruitment-sprints`. The launch
 * links deep-link via `?launch=<category-id>` for scroll-and-ring.
 *
 * Server-renderable now that there's no modal state to own.
 *
 * Ported from prototype lines 30294-30334.
 */

import Link from "next/link";
import { getSpecialist } from "@/lib/mock-data/manager/team";
import {
  type SprintPriority,
  getCategory,
  getCategoryLabel,
  sprintPriorities,
} from "@/lib/mock-data/manager/manager-pool-coordination-data";
import { cn } from "@/lib/utils/cn";

const PRIO_BADGE_CLASS: Record<1 | 2 | 3, string> = {
  1: "bg-danger text-paper",
  2: "bg-amber text-ink",
  3: "bg-cream-deep text-ink-soft",
};

export function PcSprintPriorities() {
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
            <PriorityRow key={sp.rank} priority={sp} />
          ))}
        </ul>
        <p className="text-ink-mute border-line-soft m-0 mt-4 border-t pt-3 text-[11.5px] leading-[1.5]">
          💡 <strong className="text-ink-soft">Coordinate with team:</strong>{" "}
          Diego (Bookkeeping) has surplus capacity to assist any of these
          sprints.{" "}
          <Link
            href="/specialist/recruitment-sprints"
            className="text-ink hover:text-ink-soft underline transition-colors"
          >
            Open sprint coordination →
          </Link>
        </p>
      </article>
    </section>
  );
}

function PriorityRow({ priority: sp }: { priority: SprintPriority }) {
  const category = getCategory(sp.categoryId);
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
      <Link
        href={`/specialist/recruitment-sprints?launch=${sp.categoryId}`}
        className="bg-paper border-line text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex flex-shrink-0 items-center rounded-md border px-3 py-1.5 text-[12px] font-medium whitespace-nowrap transition-colors"
      >
        Launch sprint →
      </Link>
    </li>
  );
}
