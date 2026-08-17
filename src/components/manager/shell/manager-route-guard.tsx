"use client";

/**
 * ManagerRouteGuard — wraps Manager-only page content with a
 * dual-gate authorization check.
 *
 * ## Contract
 *
 *   - `useSessionRole() === "manager"` AND `useManagerMode() === "manager"`
 *     → renders children
 *   - Either failing → calls `router.replace("/specialist/dashboard")`
 *     in useEffect; renders a centered "Redirecting…" message while
 *     the redirect queues
 *
 * Per Step 4 Q8 lock: NOT null during unauthorized state. The
 * centered minimal message avoids the flash-of-empty-page during
 * the brief useEffect-to-navigation gap.
 *
 * ## Reuse
 *
 * Steps 5-11 each add a Manager-only page. Every one of those
 * routes wraps content in this guard:
 *
 *   /specialist/team           (Step 4)
 *   /specialist/team/[id]      (Step 5)
 *   /specialist/daily-audit    (Step 6)
 *   /specialist/team-disputes  (Step 7)
 *   /specialist/pool-coordination (Step 8)
 *   /specialist/recruitment-sprints (Step 9)
 *   /specialist/team-reports   (Step 10)
 *   /specialist/manager-daily-activity (Step 11)
 *
 * ## When mode toggles to specialist while on a Manager-only page
 *
 * The dashboard `ModeToggle` writes localStorage; `useManagerMode()`
 * propagates the change to THIS guard via React's external store
 * sync; the dependency change in useEffect re-fires; the redirect
 * triggers. Net: instant redirect to dashboard.
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useManagerMode } from "@/lib/manager/manager-mode-context";
import { useSessionRole } from "@/lib/manager/use-session-role";

export function ManagerRouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const role = useSessionRole();
  const { mode } = useManagerMode();
  const authorized = role === "manager" && mode === "manager";

  useEffect(() => {
    if (!authorized) {
      router.replace("/specialist/dashboard");
    }
  }, [authorized, router]);

  if (!authorized) {
    return (
      <div className="text-ink-mute flex min-h-[200px] items-center justify-center text-sm">
        Redirecting…
      </div>
    );
  }
  return <>{children}</>;
}
