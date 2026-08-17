/**
 * /specialist/team — Manager-only "My Team" page.
 *
 * First Manager-only route under Path C (ADR 0001). Mounts inside
 * the existing `(specialist)` layout — same StaffRibbon, Topbar,
 * Sidebar (with TEAM MANAGEMENT section visible to Managers in
 * Manager Mode).
 *
 * Route guard: `<ManagerRouteGuard>` reads `useSessionRole()` +
 * `useManagerMode()`. If either fails, redirects to
 * `/specialist/dashboard`. Renders a centered "Redirecting…" message
 * during the brief useEffect-to-navigation gap (per Step 4 Q8 lock).
 *
 * Page itself stays a Server Component; the guard + the
 * `MyTeamApp` orchestrator handle all the Client-side state.
 */

import { ManagerRouteGuard } from "@/components/manager/shell/manager-route-guard";
import { MyTeamApp } from "@/components/manager/team/my-team-app";

export default function MyTeamPage() {
  return (
    <ManagerRouteGuard>
      <MyTeamApp />
    </ManagerRouteGuard>
  );
}
