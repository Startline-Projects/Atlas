/**
 * /specialist/team-disputes — Manager-only Team Disputes page.
 *
 * Wraps `<TeamDisputesApp />` in `<ManagerRouteGuard>` + `<Suspense>`
 * (required for `useSearchParams()` reading `?filter=` deep-link
 * from the dashboard urgent card's "Filter by SLA" ghost CTA).
 *
 * Session 1 / Step 7.
 */

import { Suspense } from "react";
import { ManagerRouteGuard } from "@/components/manager/shell/manager-route-guard";
import { TeamDisputesApp } from "@/components/manager/team-disputes/team-disputes-app";

export default function TeamDisputesPage() {
  return (
    <ManagerRouteGuard>
      <Suspense fallback={null}>
        <TeamDisputesApp />
      </Suspense>
    </ManagerRouteGuard>
  );
}
