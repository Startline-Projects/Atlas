/**
 * Quarterly goals — span-6 card with per-row layout (name + progress
 * bar + status pill). Tone-keyed status: success / amber / danger.
 *
 * Per source CSS `.perf-goal-row` + `.perf-goal-progress-fill` (default
 * success; `.amber` / `.danger` modifiers).
 *
 * Server Component.
 */

import { MetricCard } from "@/components/specialist/operations-shared";
import type { GoalRow as GoalRowData, GoalStatus } from "@/lib/mock-data/specialist/performance";
import { cn } from "@/lib/utils/cn";

const FILL_TONE: Record<GoalStatus, string> = {
  "on-track": "bg-success",
  met: "bg-success",
  exceeded: "bg-lime-deep",
  amber: "bg-amber",
  missed: "bg-danger",
};

const STATUS_TONE: Record<GoalStatus, string> = {
  "on-track": "text-ink-soft",
  met: "text-success font-semibold",
  exceeded: "text-lime-deep font-semibold",
  amber: "text-amber font-semibold",
  missed: "text-danger font-semibold",
};

export function GoalList({
  goals,
}: {
  goals: ReadonlyArray<GoalRowData>;
}) {
  return (
    <MetricCard label="Goals" title="Quarterly goals · set by manager" span={6}>
      <div className="flex flex-col gap-0">
        {goals.map((g) => (
          <GoalRowItem key={g.title} goal={g} />
        ))}
      </div>
    </MetricCard>
  );
}

function GoalRowItem({ goal }: { goal: GoalRowData }) {
  return (
    <div className="border-line-soft grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3.5 border-b py-3 last:border-b-0">
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-[13px] font-medium text-ink">
          <span className="truncate">{goal.title}</span>
        </div>
        <div className="mt-1.5 flex items-center gap-2.5">
          <span className="font-mono text-[11px] text-ink-soft tabular-nums whitespace-nowrap">
            {goal.progressLabel}
          </span>
          <div className="bg-cream-deep relative h-[5px] min-w-[160px] flex-1 overflow-hidden rounded-[3px]">
            <div
              className={cn(
                "h-full rounded-[3px] transition-[width] duration-500",
                FILL_TONE[goal.status],
              )}
              style={{ width: `${Math.min(100, Math.max(0, goal.progressPct))}%` }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
      <span
        className={cn(
          "text-right font-mono text-[10.5px] tracking-[0.04em] uppercase whitespace-nowrap tabular-nums",
          STATUS_TONE[goal.status],
        )}
      >
        {goal.statusLabel}
      </span>
    </div>
  );
}
