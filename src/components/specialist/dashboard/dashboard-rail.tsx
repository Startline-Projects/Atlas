import { DailyActivityCard } from "./daily-activity-card";
import { OnCallCard } from "./on-call-card";
import { QuickActionsCard } from "./quick-actions-card";

/**
 * Right rail shown alongside the main dashboard column at ≥1280px.
 * Below 1280 it stacks under the main content (handled by the page grid).
 */
export function DashboardRail() {
  return (
    <aside className="flex flex-col gap-4 self-start lg:sticky lg:top-[calc(36px+57px+1rem)]">
      <OnCallCard />
      <QuickActionsCard />
      <DailyActivityCard />
    </aside>
  );
}
