/**
 * Coverage map / Skill × tier matrix — heatmap grid. Columns:
 * Standard / Vetted / Elite. Rows: 6 skill specialties. Each cell
 * uses operations-shared/HeatCell.
 *
 * Server Component.
 */

import { MetricCard } from "@/components/specialist/operations-shared";
import { HeatCell } from "@/components/specialist/operations-shared";
import type { PoolHealthSnapshot } from "@/lib/mock-data/specialist/pool-health";

export function SkillTierMatrix({
  matrix,
}: {
  matrix: PoolHealthSnapshot["skillTierMatrix"];
}) {
  return (
    <MetricCard label="Coverage map" title="Skill × tier matrix" span={6}>
      <div className="grid gap-1">
        {/* Header row: empty corner + column labels */}
        <div className="grid grid-cols-[110px_repeat(3,minmax(0,1fr))] gap-1 pb-1 font-mono text-[9.5px] tracking-[0.08em] uppercase text-ink-mute">
          <div />
          {matrix.columns.map((col) => (
            <div key={col.key} className="text-center">
              {col.label}
            </div>
          ))}
        </div>
        {/* Data rows */}
        {matrix.rows.map((row, ri) => (
          <div
            key={row.key}
            className="grid grid-cols-[110px_repeat(3,minmax(0,1fr))] items-center gap-1"
          >
            <div className="flex items-center gap-1.5 text-[12px] text-ink-soft">
              {row.label}
            </div>
            {matrix.cells[ri]!.map((cell, ci) => (
              <HeatCell
                key={`${ri}-${ci}`}
                density={cell.density}
                amber={cell.amber === true}
                title={`${row.label} · ${matrix.columns[ci]!.label} · ${cell.count}`}
                className="h-9"
              >
                {cell.count}
              </HeatCell>
            ))}
          </div>
        ))}
      </div>
    </MetricCard>
  );
}
