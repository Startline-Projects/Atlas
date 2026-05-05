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

export default function SpecialistDashboardPage() {
  return (
    <div className="grid min-w-0 grid-cols-1 gap-y-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-x-6">
      <div className="min-w-0 px-5 pt-7 pb-20 sm:px-7 lg:px-9">
        <DashboardHeader />
        <UrgentSection />
        <SnapshotSection />
        <ActiveItemsSection />
        <PerformanceSection />
      </div>
      <div className="px-5 pt-7 pb-20 sm:px-7 lg:px-0 lg:pr-6 lg:pt-7">
        <DashboardRail />
      </div>
    </div>
  );
}
