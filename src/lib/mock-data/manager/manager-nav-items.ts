/**
 * Manager-extension sidebar nav items (TEAM MANAGEMENT section).
 *
 * The 7 items the Manager sees ONLY when they are simultaneously
 * (a) the session role is "manager" AND (b) Manager Mode is active
 * (via `useManagerMode()` / `localStorage["atlas:managerMode"]`).
 *
 * ## Why a separate file (not in `nav-items.ts`)
 *
 * Per ADR 0001's "constraint to preserve" rule, Specialist files are
 * touched only where the edit adds mode-awareness. Adding Manager
 * items to the Specialist `navItems` array would also require
 * extending the `NavSection` and `NavIconKey` literal unions in
 * `nav-items.ts` — pure data ownership leak, not a mode-aware edit.
 * Keeping the Manager items in their own file keeps the boundary
 * clean.
 *
 * ## Why a separate icon-key union
 *
 * Per Session 1 / Step 2 lock: **Manager-specific icon-key union.
 * Do NOT extend or reuse Specialist's NavIconKey.** Even where a
 * Manager icon would be visually similar to a Specialist one (e.g.
 * the calendar shape used in both "Daily Activity" and "Manager
 * Daily Activity"), we duplicate the SVG in
 * `manager-sidebar-icons.tsx` rather than import from the Specialist
 * side. Locks the surface boundary.
 *
 * ## "Team Performance" dropped — locked Session 1 / Step 2
 *
 * The prototype's 8-item TEAM MANAGEMENT array includes "Team
 * Performance" routing to `#team-performance`. Cross-checking
 * `reference/manager.html` reveals NO `view-team-performance` exists
 * — the entry is sidebar-only dead navigation. Under Path C:
 *   - The Manager's personal Specialist performance lives at
 *     `/specialist/performance` (already implemented; the Manager
 *     IS a Specialist per scope MD §"Core principle")
 *   - The Manager's view of team performance is Team Reports
 *     (item 6 below — `/specialist/team-reports`, Step 10)
 * Adding a dead nav entry would create user-visible "broken link
 * UX." Dropped from this list. Documented for future maintainers.
 *
 * ## `disabled` flag — Steps 4-11 unlock
 *
 * Step 2 ships all 7 items with `disabled: true`. The
 * `ManagerSidebarSection` renders disabled items as `<span
 * aria-disabled>` instead of `<Link>` (matches Session 9 C1
 * sub-nav-tabs convention from the Specialist surface). As each
 * Manager-only route lands (Step 4 = My Team, Step 6 = Daily
 * Activity Audit, etc.), the corresponding `disabled` flag flips
 * to `false` in this file. DOM structure stays stable across all
 * steps; only the flag changes per step.
 *
 * ## Badge counts
 *
 *   - My Team — derived from `specialists.length` for honesty.
 *     Currently 1 (Lucas Andersen stub). Auto-updates to 11 when
 *     Step 4 lands the full roster.
 *   - Daily Activity Audit, Team Disputes, Recruitment Sprints —
 *     hardcoded prototype-derived placeholders. Replaced with
 *     derived counts in Steps 6, 7, 9 respectively when the data
 *     files for those surfaces land.
 *   - My Team Performance / Pool Coordination / Team Reports /
 *     Manager Daily Activity — no badge.
 */

import { specialists } from "./team";

export type ManagerNavIconKey =
  | "my-team"
  | "daily-audit"
  | "team-disputes"
  | "pool-coordination"
  | "recruitment-sprints"
  | "team-reports"
  | "manager-daily-activity";

export type ManagerNavBadgeTone =
  | "default"
  | "urgent"
  | "attention"
  | "lime";

export type ManagerNavItem = {
  /** Stable key — also the URL last segment. */
  key: ManagerNavIconKey;
  label: string;
  /** Real Next.js href. All under `/specialist/` prefix per
   *  ADR 0001 (Path C: Manager as Specialist extension). */
  href: string;
  iconKey: ManagerNavIconKey;
  /** Optional count badge with tone. */
  badge?: { value: number; tone: ManagerNavBadgeTone };
  /** When true, render as a disabled `<span aria-disabled>` instead
   *  of a `<Link>`. Steps 4-11 flip these to false as each route lands. */
  disabled?: boolean;
};

export const managerNavItems: ReadonlyArray<ManagerNavItem> = [
  {
    key: "my-team",
    label: "My Team",
    href: "/specialist/team",
    iconKey: "my-team",
    badge: { value: specialists.length, tone: "default" },
    /* Step 4: enabled — /specialist/team now exists. */
  },
  {
    key: "daily-audit",
    label: "Daily Activity Audit",
    href: "/specialist/daily-audit",
    iconKey: "daily-audit",
    badge: { value: 2, tone: "attention" }, // Step 6: replace with derived count
    disabled: true, // Step 6: flip to false
  },
  {
    key: "team-disputes",
    label: "Team Disputes",
    href: "/specialist/team-disputes",
    iconKey: "team-disputes",
    badge: { value: 3, tone: "urgent" }, // Step 7: replace with derived count
    disabled: true, // Step 7: flip to false
  },
  {
    key: "pool-coordination",
    label: "Pool Coordination",
    href: "/specialist/pool-coordination",
    iconKey: "pool-coordination",
    disabled: true, // Step 8: flip to false
  },
  {
    key: "recruitment-sprints",
    label: "Recruitment Sprints",
    href: "/specialist/recruitment-sprints",
    iconKey: "recruitment-sprints",
    badge: { value: 4, tone: "lime" }, // Step 9: replace with derived count
    disabled: true, // Step 9: flip to false
  },
  {
    key: "team-reports",
    label: "Team Reports",
    href: "/specialist/team-reports",
    iconKey: "team-reports",
    disabled: true, // Step 10: flip to false
  },
  {
    key: "manager-daily-activity",
    label: "Manager Daily Activity",
    href: "/specialist/manager-daily-activity",
    iconKey: "manager-daily-activity",
    disabled: true, // Step 11: flip to false
  },
];
