/**
 * /specialist/dashboard
 *
 * Composes the dashboard sections in source-HTML order:
 *   1. Header (greeting + date + system status + quick stats)
 *   2. Urgent panel
 *   3. Today's snapshot
 *   4. Active items (3 columns)
 *   5. Performance card
 *
 * The right rail (on-call, quick actions, daily activity) sits as a
 * second grid column at ≥1280px and stacks below the main column on
 * smaller viewports. Sidebar lives in the (specialist) layout.
 */
import { ActiveItemsSection } from "@/components/specialist/dashboard/active-items-section";
import { DashboardHeader } from "@/components/specialist/dashboard/dashboard-header";
import { DashboardRail } from "@/components/specialist/dashboard/dashboard-rail";
import { PerformanceSection } from "@/components/specialist/dashboard/performance-section";
import { SnapshotSection } from "@/components/specialist/dashboard/snapshot-section";
import { UrgentSection } from "@/components/specialist/dashboard/urgent-section";
/* Manager-extension surface (ADR 0001 — Path C).
   - ModeToggle: hoisted ABOVE the fork so focus + keyboard state
     survive mode swaps (Step 3 Q1B lock). Role-gated; non-Manager
     Specialist users see nothing.
   - DashboardModeFork: the single switch. When session role is
     "manager" AND useManagerMode() is "manager", renders the Manager
     dashboard (ManagerDashboardApp). Otherwise renders the
     existing Specialist dashboard children below, untouched.
   Added in Manager-conversion Session 1 / Step 3. */
import { DashboardModeFork } from "@/components/manager/dashboard/dashboard-mode-fork";
import { ManagerDashboardApp } from "@/components/manager/dashboard/manager-dashboard-app";
import { ModeToggle } from "@/components/manager/shell/mode-toggle";

export default function SpecialistDashboardPage() {
  return (
    <>
      {/* ============================================================
          Manager-extension surface (ADR 0001 — Path C).
          ModeToggle is hoisted ABOVE the fork so its focus +
          keyboard state persist across mode swaps.
          ============================================================ */}
      <div className="px-5 pt-7 sm:px-7 lg:px-9">
        <ModeToggle />
      </div>
      {/* ============================================================
          Manager-extension surface (ADR 0001 — Path C).
          Single content switch — Manager dashboard OR existing
          Specialist dashboard. No section-by-section conditionals.
          ============================================================ */}
      <DashboardModeFork managerContent={<ManagerDashboardApp />}>
        <div className="grid min-w-0 grid-cols-1 gap-y-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-x-6">
          <div className="min-w-0 px-5 pb-20 sm:px-7 lg:px-9">
            <DashboardHeader />
            <UrgentSection />
            <SnapshotSection />
            <ActiveItemsSection />
            <PerformanceSection />
          </div>
          <div className="px-5 pb-20 sm:px-7 lg:px-0 lg:pr-6">
            <DashboardRail />
          </div>
        </div>
      </DashboardModeFork>
    </>
  );
}
