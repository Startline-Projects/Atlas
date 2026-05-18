/**
 * RsSprintsGrid — 2-column grid wrapper for the 4 active sprint cards.
 *
 * Forwards `focusedSprintId` + `registerCardRef` to each card so the
 * orchestrator can scroll-and-ring on `?launch=` deep-link.
 *
 * Server-renderable wrapper (cards themselves are Client).
 */

import { type Sprint, type SprintId } from "@/lib/mock-data/manager/manager-recruitment-sprints-data";
import { RsSprintCard } from "./rs-sprint-card";

type RsSprintsGridProps = {
  sprints: ReadonlyArray<Sprint>;
  focusedSprintId: SprintId | null;
  registerCardRef: (id: SprintId, el: HTMLElement | null) => void;
};

export function RsSprintsGrid({
  sprints,
  focusedSprintId,
  registerCardRef,
}: RsSprintsGridProps) {
  return (
    <section className="mb-8">
      <header className="mb-3 flex items-baseline justify-between gap-3">
        <h2
          className="font-display text-ink m-0 text-[18px] font-medium tracking-[-0.01em]"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          Active <em className="italic">sprints</em>
        </h2>
        <span className="text-ink-mute text-[12px]">
          {sprints.length} sprint{sprints.length === 1 ? "" : "s"} this week
        </span>
      </header>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {sprints.map((s) => (
          <RsSprintCard
            key={s.id}
            sprint={s}
            isFocused={focusedSprintId === s.id}
            registerRef={(el) => registerCardRef(s.id, el)}
          />
        ))}
      </div>
    </section>
  );
}
