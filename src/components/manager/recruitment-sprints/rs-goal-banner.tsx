/**
 * RsGoalBanner — dark-bg weekly goal banner.
 *
 * "This week's goal: Build 30 candidates" + horizontal progress bar
 * (70%) + "21/30 candidates so far" + days-remaining caption.
 *
 * Pure display component reading from `weeklyGoal`. Server-renderable.
 *
 * Ported from prototype lines 30456-30470.
 */

import { weeklyGoal } from "@/lib/mock-data/manager/manager-recruitment-sprints-data";

export function RsGoalBanner() {
  const pct = Math.min(
    100,
    Math.round((weeklyGoal.candidatesSoFar / weeklyGoal.candidateTarget) * 100),
  );

  return (
    <section className="bg-ink text-paper relative mb-6 overflow-hidden rounded-md p-5">
      <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-[1fr_auto]">
        <div>
          <div className="text-paper/60 font-mono text-[10px] tracking-[0.14em] uppercase">
            This week&apos;s goal
          </div>
          <div
            className="font-display mt-1 text-[22px] font-medium leading-snug tracking-[-0.01em]"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            Build{" "}
            <em className="italic">{weeklyGoal.candidateTarget} candidates</em>{" "}
            across 4 categories
          </div>
          {/* Progress bar */}
          <div className="bg-paper/10 mt-4 h-1.5 overflow-hidden rounded-full">
            <div
              className="bg-lime h-full rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="text-paper/70 mt-2 text-[12px]">
            {weeklyGoal.paceSummary}
          </div>
        </div>
        <div className="border-paper/15 flex flex-col items-end gap-1 border-l-0 md:border-l md:pl-6">
          <div
            className="font-display text-[36px] leading-none font-medium"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            {weeklyGoal.candidatesSoFar}
            <em className="text-paper/50 text-[20px] font-normal not-italic">
              /{weeklyGoal.candidateTarget}
            </em>
          </div>
          <div className="text-paper/60 font-mono text-[9.5px] tracking-[0.12em] uppercase">
            Candidates so far
          </div>
        </div>
      </div>
    </section>
  );
}
