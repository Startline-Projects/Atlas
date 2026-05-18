/**
 * /specialist/recruitment-sprints — Manager-only Recruitment
 * Sprints page.
 *
 * Wraps `<RecruitmentSprintsApp />` in `<ManagerRouteGuard>` +
 * `<Suspense>` (for `?launch=<category-id>` deep-link).
 *
 * Session 1 / Step 9.
 */

import { Suspense } from "react";
import { ManagerRouteGuard } from "@/components/manager/shell/manager-route-guard";
import { RecruitmentSprintsApp } from "@/components/manager/recruitment-sprints/recruitment-sprints-app";

export default function RecruitmentSprintsPage() {
  return (
    <ManagerRouteGuard>
      <Suspense fallback={null}>
        <RecruitmentSprintsApp />
      </Suspense>
    </ManagerRouteGuard>
  );
}
