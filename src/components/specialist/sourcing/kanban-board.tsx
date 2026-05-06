"use client";

/**
 * Kanban board — 4-column shell with horizontal overflow scroll on
 * narrow widths. Renders one `KanbanColumn` per stage def, filtering
 * the prospects array by stage.
 *
 * Per source CSS: `grid-template-columns: repeat(4, minmax(280px, 1fr))`
 * at default; `repeat(4, 280px)` below 1200px (forces horizontal
 * scroll on narrow screens rather than collapsing to 1 column).
 *
 * Drag-and-drop is NOT implemented this session — cards are visually
 * in their stage. Hover-actions on cards include "Advance" but it's
 * decorative. Documented in CONVERSION_LOG Session 5.
 *
 * Client Component because the prospect-card click handler bubbles
 * up to the parent which owns selection state.
 */

import {
  SOURCING_STAGES,
  type SourcingProspect,
} from "@/lib/mock-data/specialist/sourcing";
import { KanbanColumn } from "./kanban-column";
import { ProspectCard } from "./prospect-card";

export function KanbanBoard({
  prospects,
  onSelect,
}: {
  prospects: ReadonlyArray<SourcingProspect>;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      className="grid auto-cols-[minmax(280px,1fr)] grid-flow-col gap-4 overflow-x-auto px-9 pt-[18px] pb-[60px] max-md:px-5"
      style={{
        gridAutoColumns: "minmax(280px, 1fr)",
      }}
    >
      {SOURCING_STAGES.map((def) => {
        const stageProspects = prospects.filter((p) => p.stage === def.key);
        return (
          <KanbanColumn
            key={def.key}
            def={def}
            count={stageProspects.length}
            isApplied={def.key === "applied"}
            emptyLabel={
              def.key === "applied"
                ? "No conversions yet this month."
                : "No prospects here."
            }
          >
            {stageProspects.map((p) => (
              <ProspectCard
                key={p.id}
                prospect={p}
                isApplied={def.key === "applied"}
                onSelect={onSelect}
              />
            ))}
          </KanbanColumn>
        );
      })}
    </div>
  );
}
