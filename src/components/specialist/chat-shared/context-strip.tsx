/**
 * Sub-header context strip — 4 cells, label + value pairs. Sticky-ish
 * (it lives in the same `flex-shrink-0` band as the header). Tones
 * follow the source CSS: success / amber / danger override the value
 * color; default keeps it ink.
 *
 * Server Component.
 */

import type { ContextCell } from "@/lib/mock-data/specialist/chat-types";
import { cn } from "@/lib/utils/cn";

const TONE_CLASS: Record<NonNullable<ContextCell["tone"]>, string> = {
  default: "text-ink",
  success: "text-success",
  amber: "text-amber",
  danger: "text-danger",
};

export function ContextStrip({
  cells,
}: {
  cells: ReadonlyArray<ContextCell>;
}) {
  return (
    <div className="bg-paper border-line-soft flex flex-shrink-0 flex-wrap gap-x-7 gap-y-2 border-b px-7 pt-2.5 pb-3">
      {cells.map((cell, i) => (
        <div key={i} className="flex min-w-0 flex-col">
          <div className="font-mono text-[9.5px] tracking-[0.12em] uppercase text-ink-mute">
            {cell.label}
          </div>
          <div
            className={cn(
              "max-w-[220px] truncate text-[12.5px] font-medium",
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
