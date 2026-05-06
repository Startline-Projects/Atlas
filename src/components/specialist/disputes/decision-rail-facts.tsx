/**
 * Right-rail of Section 02 — "Case facts" cells. Each cell has a mono
 * uppercase label + value with optional tone (default / success / amber
 * / danger).
 *
 * Server Component.
 */

import type { DisputeFactCell } from "@/lib/mock-data/specialist/disputes";
import { cn } from "@/lib/utils/cn";

const TONE_CLASS: Record<NonNullable<DisputeFactCell["tone"]>, string> = {
  default: "text-ink",
  success: "text-success",
  amber: "text-amber",
  danger: "text-danger",
};

export function DecisionRailFacts({
  title = "Case facts",
  cells,
}: {
  title?: string;
  cells: ReadonlyArray<DisputeFactCell>;
}) {
  return (
    <div className="bg-paper border-line-soft flex flex-col gap-3.5 rounded-lg border p-5">
      <div className="font-mono text-[9.5px] font-semibold tracking-[0.12em] uppercase text-ink-mute">
        {title}
      </div>
      {cells.map((cell, i) => (
        <div key={i} className="flex flex-col gap-1">
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
