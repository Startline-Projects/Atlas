/**
 * ManagerDashboardApp — top-level orchestrator for the Manager
 * dashboard content (everything below the ModeToggle).
 *
 * Server Component. Composes header + main column sections + right
 * rail in the same outer grid layout as the Specialist dashboard, so
 * mode swaps don't shift layout primitives.
 *
 * Mounted ONLY by `DashboardModeFork` when
 * `useSessionRole() === "manager" && useManagerMode() === "manager"`.
 *
 * Section order matches the prototype (Manager content block, lines
 * 19539-19914):
 *
 *   1. ManagerDashboardHeader  — greeting + 3 quick stats
 *   2. ManagerUrgentSection    — 6 cards "Needs your attention"
 *   3. ManagerSnapshotSection  — 6 stats "Today's snapshot"
 *   4. ManagerActiveItemsSection — 3 cols Active items
 *   5. ManagerTeamPerfSection  — 6 metric tiles "Team performance"
 *
 * Right rail (`ManagerDashboardRail`) sits as the second grid
 * column at lg+ and stacks below at smaller viewports.
 */

import { ManagerActiveItemsSection } from "./manager-active-items-section";
import { ManagerDashboardHeader } from "./manager-dashboard-header";
import { ManagerDashboardRail } from "./manager-dashboard-rail";
import { ManagerSnapshotSection } from "./manager-snapshot-section";
import { ManagerTeamPerfSection } from "./manager-team-perf-section";
import { ManagerUrgentSection } from "./manager-urgent-section";

export function ManagerDashboardApp() {
  return (
    <div className="grid min-w-0 grid-cols-1 gap-y-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-x-6">
      <div className="min-w-0 px-5 pb-20 sm:px-7 lg:px-9">
        <ManagerDashboardHeader />
        <ManagerUrgentSection />
        <ManagerSnapshotSection />
        <ManagerActiveItemsSection />
        <ManagerTeamPerfSection />
      </div>
      <ManagerDashboardRail />
    </div>
  );
}
