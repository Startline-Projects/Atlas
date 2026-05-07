/**
 * Daily-activity Server Component — composes the read-only audit log
 * page from the snapshot.
 *
 * Single-column layout, no rail:
 *   1. Header (Client island — period toggle + Export log)
 *   2. 4-card stat strip (Server, consumes operations-shared/StatCard)
 *   3. 30-day heatmap (Server, consumes operations-shared/HeatCell)
 *   4. Filter chips + feed (Client island — owns filter state)
 *
 * Per the HTML-vs-PDF deviation captured in 5.1's CONVERSION_LOG entry:
 * this is the read-only audit log. The PDF's submission-form fields
 * are typed in `DailyActivitySubmission` (in mock-data) but not
 * rendered. The "Submit today's report" CTA is intentionally NOT
 * placed here per 5.5 directive 9.
 */

import { activitySnapshot } from "@/lib/mock-data/specialist/daily-activity";

import { DailyActivityHeader } from "./daily-activity-header";
import { ActivityStatStrip } from "./activity-stat-strip";
import { ActivityHeatmap } from "./activity-heatmap";
import { ActivityFeedSection } from "./activity-feed-section";

export function DailyActivityPage() {
  const s = activitySnapshot;
  return (
    <main className="bg-cream flex min-w-0 flex-1 flex-col">
      <DailyActivityHeader initialPeriod={s.activePeriod} />
      <ActivityStatStrip stats={s.stats} />
      <ActivityHeatmap cells={s.heatmap} />
      <ActivityFeedSection items={s.feed} counts={s.filterCounts} />
    </main>
  );
}
