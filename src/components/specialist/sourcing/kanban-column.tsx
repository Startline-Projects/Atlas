/**
 * Kanban column — header (stage dot + title + count + add button) +
 * meta sub-line + scrollable card list.
 *
 * The applied column has a special lime-deep border + lime-tinted
 * count chip per source CSS (`.sp-column.col-applied`).
 *
 * Server Component. Cards are rendered as children — selection
 * handler comes from the parent (kanban-board → sourcing-app).
 */

import { Plus } from "lucide-react";
import {
  type SourcingStage,
  type SourcingStageDef,
} from "@/lib/mock-data/specialist/sourcing";
import { cn } from "@/lib/utils/cn";

const STAGE_DOT: Record<SourcingStage, string> = {
  sourced: "bg-ink-mute",
  contacted: "bg-amber",
  engaged: "bg-success",
  applied: "bg-lime-deep",
};

export function KanbanColumn({
  def,
  count,
  isApplied,
  emptyLabel,
  children,
}: {
  def: SourcingStageDef;
  count: number;
  isApplied: boolean;
  emptyLabel: string;
  children: React.ReactNode;
}) {
  const isEmpty = count === 0;
  return (
    <div
      className={cn(
        "border-line bg-paper flex flex-col rounded-[14px] border",
        isApplied && "border-lime-deep border-[1.5px]",
      )}
    >
      <div className="border-line-soft flex items-center justify-between gap-2 border-b px-4 pt-3.5 pb-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span
            aria-hidden="true"
            className={cn("h-2 w-2 flex-shrink-0 rounded-full", STAGE_DOT[def.key])}
          />
          <span
            className="font-display text-[14px] font-medium tracking-[-0.005em] text-ink"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            {def.title}
          </span>
          <span
            className={cn(
              "rounded-full px-1.5 py-0.5 font-mono text-[11px] tracking-[0.02em]",
              isApplied
                ? "bg-lime/20 text-lime-deep font-semibold"
                : "bg-cream-deep text-ink-soft font-medium",
            )}
          >
            {count}
          </span>
        </div>
        <button
          type="button"
          aria-label={`Add to ${def.title}`}
          className="border-line text-ink-mute hover:bg-cream hover:border-ink-mute hover:border-solid hover:text-ink grid h-[22px] w-[22px] place-items-center rounded-[5px] border border-dashed transition-colors"
        >
          <Plus className="h-2.5 w-2.5" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      <div className="border-line-soft flex justify-between border-b px-4 pt-1 pb-2 font-mono text-[10px] tracking-[0.04em] text-ink-mute">
        <span>{def.meta}</span>
        <span>{def.avg}</span>
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-2.5 pt-2.5 pb-3.5 max-h-[calc(100vh-380px)]">
        {isEmpty ? (
          <div className="px-3 py-6 text-center font-body text-[11.5px] italic text-ink-mute">
            {emptyLabel}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
