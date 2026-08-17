"use client";

/**
 * ManagerSidebarSection — the TEAM MANAGEMENT section appended to
 * the Specialist sidebar via Path C (ADR 0001).
 *
 * ## Render gate (both must be true)
 *
 *   1. `useSessionRole() === "manager"` — this user is a Manager
 *      (mocked to true in Session 1; real auth-backed value later)
 *   2. `useManagerMode() === "manager"` — the Manager has toggled to
 *      Manager Mode (the dashboard `ModeToggle` writes localStorage;
 *      `useSyncExternalStore` propagates the change to this component
 *      instantly without a page reload)
 *
 * Either gate failing → returns `null`. Non-Manager Specialist users
 * never see this section regardless of which Specialist route they're
 * on. Managers in Specialist Mode also don't see it.
 *
 * ## Cross-route mode indicator
 *
 * Per scope MD §1, the ModeToggle is dashboard-only. On every other
 * Specialist route a Manager in Manager Mode needs an on-screen cue
 * that Manager Mode is active. This section IS that cue — it
 * persists across navigation, appearing/disappearing only when mode
 * itself changes.
 *
 * ## Disabled items (Steps 4-11 unlock)
 *
 * All 7 items render as `<span aria-disabled>` in Step 2 because
 * their routes 404 until Steps 4-11 land. Visual treatment matches
 * Session 9 C1's sub-nav-tabs convention: `cursor-not-allowed
 * opacity-60`, no hover state change. As each Manager-only route
 * lands, the corresponding `disabled` flag in `manager-nav-items.ts`
 * flips to `false` and the item becomes a real `<Link>`. DOM
 * structure stays stable.
 *
 * Active-state machinery (highlighting the current Manager-only
 * route) is deferred to Step 4 — no point wiring no-op infrastructure
 * while all items are disabled.
 *
 * ## Mobile
 *
 * Section wrapper carries `max-md:hidden` — TEAM MANAGEMENT items
 * are tablet-and-up only, matching the prototype's `.mobile-hide`
 * convention. The narrow mobile sidebar variant shows essential
 * Specialist items only.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  managerNavItems,
  type ManagerNavBadgeTone,
  type ManagerNavItem,
} from "@/lib/mock-data/manager/manager-nav-items";
import { useManagerMode } from "@/lib/manager/manager-mode-context";
import { useSessionRole } from "@/lib/manager/use-session-role";
import { cn } from "@/lib/utils/cn";
import { ManagerSidebarIcon } from "./manager-sidebar-icons";

const BADGE_TONE_CLASS: Record<ManagerNavBadgeTone, string> = {
  default: "bg-cream text-ink-soft border-line-soft",
  urgent: "bg-danger text-paper border-danger",
  attention: "bg-amber text-paper border-amber",
  lime: "bg-lime text-ink border-lime-deep",
};

export function ManagerSidebarSection() {
  const role = useSessionRole();
  const { mode } = useManagerMode();
  const pathname = usePathname();

  /* Dual gate. Either failing → no render. Documented at the top. */
  if (role !== "manager") return null;
  if (mode !== "manager") return null;

  return (
    <div className="contents max-md:hidden">
      <div className="border-line-soft text-ink-mute mt-2.5 border-t px-2.5 pt-3.5 pb-1.5 font-mono text-[9px] tracking-[0.18em] uppercase">
        Team Management
      </div>
      {managerNavItems.map((item) => {
        /* Active when pathname matches exactly OR is a child route.
           Child match covers Step 5's `/specialist/team/[id]` etc. */
        const isActive =
          !item.disabled &&
          (pathname === item.href || pathname.startsWith(`${item.href}/`));
        return (
          <ManagerSidebarItem key={item.key} item={item} isActive={isActive} />
        );
      })}
    </div>
  );
}

/* ============================================================
   Item renderer — disabled <span>, active Link, or inactive Link
   ============================================================ */

function ManagerSidebarItem({
  item,
  isActive,
}: {
  item: ManagerNavItem;
  isActive: boolean;
}) {
  /* Shared inner content. Icon coloring forks on active state to
     match the existing Specialist `SidebarNavItem` visual exactly:
     active = lime icon over bg-ink; inactive = ink-mute icon. */
  const inner = (
    <>
      <ManagerSidebarIcon
        iconKey={item.iconKey}
        className={cn(
          "h-4 w-4 flex-shrink-0 transition-colors",
          isActive ? "text-lime" : "text-ink-mute group-hover:text-ink-soft",
        )}
      />
      <span className="min-w-0 flex-1 truncate">{item.label}</span>
      {item.badge ? (
        <span
          className={cn(
            "flex-shrink-0 rounded-[3px] border px-1.5 py-px font-mono text-[9.5px] font-semibold tracking-[0.06em]",
            isActive
              ? "bg-paper/10 text-paper border-paper/15"
              : BADGE_TONE_CLASS[item.badge.tone],
          )}
        >
          {item.badge.value}
        </span>
      ) : null}
    </>
  );

  if (item.disabled) {
    return (
      <span
        aria-disabled="true"
        className="text-ink-soft relative flex cursor-not-allowed items-center gap-2.5 rounded-sm px-2.5 py-2 text-[13.5px] font-medium opacity-60"
      >
        {inner}
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative flex items-center gap-2.5 rounded-sm px-2.5 py-2 text-[13.5px] font-medium transition-colors",
        isActive
          ? "bg-ink text-paper"
          : "text-ink-soft hover:bg-cream-deep hover:text-ink",
      )}
    >
      {inner}
    </Link>
  );
}
