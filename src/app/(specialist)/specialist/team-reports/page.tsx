/**
 * /specialist/team-reports — Manager-only Team Reports & Analytics.
 *
 * Wraps `<TeamReportsApp />` in `<ManagerRouteGuard>` + `<Suspense>`
 * (for `?spec=<spec-id>` deep-link from Specialist Detail hero
 * "Performance review" button).
 *
 * Session 1 / Step 10 — largest single step.
 */

import { Suspense } from "react";
import { ManagerRouteGuard } from "@/components/manager/shell/manager-route-guard";
import { TeamReportsApp } from "@/components/manager/team-reports/team-reports-app";

export default function TeamReportsPage() {
  return (
    <ManagerRouteGuard>
      <Suspense fallback={null}>
        <TeamReportsApp />
      </Suspense>
    </ManagerRouteGuard>
  );
}
