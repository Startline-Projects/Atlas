/**
 * 6-cell subject-context grid. 3-col at desktop, 2-col at <700px,
 * 1-col at <480px (matches source CSS `.rev-context-grid`).
 *
 * Each cell is a label/value pair with optional tone (default /
 * success / amber / danger).
 *
 * Server Component.
 */

import type { ReviewContextCell } from "@/lib/mock-data/specialist/reviews-approvals";
import { cn } from "@/lib/utils/cn";

const TONE_CLASS: Record<NonNullable<ReviewContextCell["tone"]>, string> = {
  default: "text-ink",
  success: "text-success",
  amber: "text-amber",
  danger: "text-danger",
};

export function ReviewContextGrid({
  cells,
}: {
  cells: ReadonlyArray<ReviewContextCell>;
}) {
  return (
    <div className="grid grid-cols-3 gap-3.5 max-[700px]:grid-cols-2 max-[480px]:grid-cols-1">
      {cells.map((cell, i) => (
        <div key={i} className="flex flex-col gap-0.5">
          <div className="font-mono text-[9.5px] font-medium tracking-[0.12em] uppercase text-ink-mute">
            {cell.label}
          </div>
          <div
            className={cn(
              "text-[13.5px] font-medium",
              TONE_CLASS[cell.tone ?? "default"],
            )}
          >
            {cell.value}
          </div>
        </div>
      ))}
    </div>
  );
}
