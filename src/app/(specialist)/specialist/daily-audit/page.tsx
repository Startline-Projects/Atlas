/**
 * /specialist/daily-audit — Manager-only Daily Activity Audit page.
 *
 * Wraps the `<DailyAuditApp />` orchestrator in `<ManagerRouteGuard>`
 * + `<Suspense>` (required for `useSearchParams()` reading the
 * `?row=` deep-link). Mirrors the page-shell pattern from Step 5's
 * Specialist Detail route.
 *
 * Session 1 / Step 6.
 */

import { Suspense } from "react";
import { ManagerRouteGuard } from "@/components/manager/shell/manager-route-guard";
import { DailyAuditApp } from "@/components/manager/daily-audit/daily-audit-app";

export default function DailyAuditPage() {
  return (
    <ManagerRouteGuard>
      <Suspense fallback={null}>
        <DailyAuditApp />
      </Suspense>
    </ManagerRouteGuard>
  );
}
