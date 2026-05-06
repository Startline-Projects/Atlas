/**
 * 30-day activity heatmap (GitHub-style). Reuses
 * `operations-shared/HeatCell` (second consumer after pool-health's
 * skill-tier matrix).
 *
 * Layout:
 *   - Header: "Activity · last 30 days" + legend (Less / 5 cells / More)
 *   - Grid: 30 cells in a single row at default; horizontal-scroll
 *     wrapper at <600px so cells stay readable
 *   - Axis labels: "30 days ago" / "2 weeks ago" / "Today"
 *
 * Server Component. The cells carry native `title` tooltips via
 * HeatCell's `title` prop.
 */

import type { ActivityHeatmapCell } from "@/lib/mock-data/specialist/daily-activity";
import { HeatCell, type HeatDensity } from "@/components/specialist/operations-shared";

export function ActivityHeatmap({
  cells,
}: {
  cells: ReadonlyArray<ActivityHeatmapCell>;
}) {
  return (
    <div className="bg-paper border-line mx-10 mb-5 rounded-xl border px-[22px] pt-[18px] pb-[18px] max-md:mx-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-ink-mute">
          Activity · last 30 days
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.04em] uppercase text-ink-mute">
          <span>Less</span>
          <div className="flex gap-0.5">
            {([0, 1, 2, 3, 4] as ReadonlyArray<HeatDensity>).map((d) => (
              <HeatCell
                key={d}
                density={d}
                className="h-2.5 w-2.5 rounded-[2px]"
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(30,minmax(0,1fr))] gap-[3px]">
        {cells.map((cell) => (
          <HeatCell
            key={cell.date}
            density={cell.density}
            title={cell.tooltip}
            className="aspect-square w-full rounded-[2px]"
          />
        ))}
      </div>

      <div className="mt-2 flex justify-between font-mono text-[9px] tracking-[0.04em] uppercase text-ink-mute">
        <span>30 days ago</span>
        <span>2 weeks ago</span>
        <span>Today</span>
      </div>
    </div>
  );
}
