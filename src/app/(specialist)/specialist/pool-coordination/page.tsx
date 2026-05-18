/**
 * /specialist/pool-coordination — Manager-only Pool Coordination page.
 *
 * Wraps `<PoolCoordinationApp />` in `<ManagerRouteGuard>` +
 * `<Suspense>` (required for `useSearchParams()` reading `?focus=`
 * deep-link from dashboard urgent cards 3 + 6).
 *
 * Session 1 / Step 8.
 */

import { Suspense } from "react";
import { ManagerRouteGuard } from "@/components/manager/shell/manager-route-guard";
import { PoolCoordinationApp } from "@/components/manager/pool-coordination/pool-coordination-app";

export default function PoolCoordinationPage() {
  return (
    <ManagerRouteGuard>
      <Suspense fallback={null}>
        <PoolCoordinationApp />
      </Suspense>
    </ManagerRouteGuard>
  );
}
