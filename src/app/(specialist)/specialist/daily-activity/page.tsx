import { DailyActivityPage as DailyActivityFeed } from "@/components/specialist/daily-activity/daily-activity-page";

/**
 * Daily-activity view — read-only audit log. Server-rendered; period
 * toggle and filter chips are Client islands. No URL state.
 */
export default function DailyActivityPage() {
  return <DailyActivityFeed />;
}
