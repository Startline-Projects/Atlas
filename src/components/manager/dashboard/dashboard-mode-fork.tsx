"use client";

/**
 * DashboardModeFork — the single content switch for the Manager
 * dashboard surface (ADR 0001 — Path C).
 *
 * ## Contract
 *
 *   - When `useSessionRole() === "manager"` AND
 *     `useManagerMode() === "manager"` → renders `managerContent`
 *   - Otherwise → renders `children` (the existing Specialist
 *     dashboard body, untouched)
 *
 * Both gates failing is the common case (most users are non-Manager
 * Specialists). Specialist Mode for a Manager is also valid — they
 * see their own Specialist dashboard.
 *
 * ## Single switch, not 6 conditionals
 *
 * Per Step 3 lock, the fork is ONE clean switch wrapping main+rail.
 * Per Step 3 Q1B, the `ModeToggle` is hoisted ABOVE this fork in
 * `(specialist)/specialist/dashboard/page.tsx` so toggle focus +
 * keyboard state survive the swap.
 *
 * ## Why a wrapper, not inline conditional
 *
 * Keeps `page.tsx` (Server Component) clean. The hooks live here
 * (Client Component); the page renders the JSX subtrees as RSC and
 * passes them in as children + prop.
 */

import { useManagerMode } from "@/lib/manager/manager-mode-context";
import { useSessionRole } from "@/lib/manager/use-session-role";
import type { ReactNode } from "react";

type DashboardModeForkProps = {
  /** What to render when both gates are `"manager"`. */
  managerContent: ReactNode;
  /** What to render otherwise — the existing Specialist dashboard body. */
  children: ReactNode;
};

export function DashboardModeFork({
  managerContent,
  children,
}: DashboardModeForkProps) {
  const role = useSessionRole();
  const { mode } = useManagerMode();

  if (role === "manager" && mode === "manager") {
    return <>{managerContent}</>;
  }
  return <>{children}</>;
}
