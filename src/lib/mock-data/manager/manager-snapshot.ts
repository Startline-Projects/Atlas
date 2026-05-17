/**
 * Manager dashboard — "Today's snapshot" 6 stat tiles.
 *
 * Team-wide counts. Ported from `reference/manager.html` lines
 * 19670-19707. Canonical numbers:
 *
 *   - 10/11 specialists active, 1 on vacation (Olena K.)
 *   - 9/11 daily activity submitted, 2 pending, 1 overdue
 *   - 12 open disputes, 3 SLA at risk
 *   - 47 reviews today team-wide, 11 approvals
 *   - Pool health Mixed: 9 strong, 1 depleted (10 categories total —
 *     1 doesn't fit cleanly into strong/depleted)
 *   - 4 active sprints, 2 on track, 2 behind
 *
 * ## Clickability (per Step 3 Q2 lock)
 *
 * 4 of 6 cards are clickable in the prototype (navigate to a
 * Manager-only route). Step 3 renders all 4 as DISABLED wrappers
 * (`cursor-not-allowed`, no click handler) — matches the
 * navigation-link tier of the two-tier CTA pattern. The
 * `disabledRoute` field records the Step where the click target
 * lands so the dashboard upgrade is trivial when those routes ship.
 *
 * The 2 non-clickable cards (Reviews · today + the one without a
 * `disabledRoute`) render as plain wrappers — no disabled treatment.
 *
 * TODO(step-6..10): As each disabledRoute target lands, swap the
 * disabled wrapper for a real `<Link>`. Single per-card change.
 * Step 4 enabled `/specialist/team` — the My Team snapshot card's
 * disabledRoute target is now live; remove its `disabledRoute` to
 * make the card a real Link. (Doing this in Step 4 as part of the
 * cross-step cleanup pass.)
 */

import { formatFirstAndInitial } from "./team";

export type SnapshotTone = "neutral" | "attn" | "urgent";
export type SnapshotPillTone = "neutral" | "lime";

export type ManagerSnapshotItem = {
  id: string;
  label: string;
  /** Numeric value rendered as the big stat. Use a string-pill for
   *  status-style cards (Mixed / 4 running). */
  value:
    | { kind: "number"; value: number; suffix?: string; tone?: SnapshotTone }
    | { kind: "pill"; text: string; tone: SnapshotPillTone };
  /** Rich detail line — supports inline strong markers. */
  detail: ReadonlyArray<
    | { kind: "text"; value: string }
    | { kind: "strong"; value: string }
  >;
  /** Optional disabled route target. When set, the card renders with
   *  cursor-not-allowed visual cue. When unset, plain wrapper. */
  disabledRoute?: { href: string; landsInStep: 4 | 6 | 7 | 8 | 9 | 10 };
};

export const managerSnapshotItems: ReadonlyArray<ManagerSnapshotItem> = [
  /* 1. Specialists active.
        Step 4: `/specialist/team` is now live — `disabledRoute`
        removed so the dashboard snapshot card upgrades from
        disabled wrapper to a real `<Link>` automatically (the
        snapshot section component reads `disabledRoute` to fork
        between span and link). */
  {
    id: "snap-specialists-active",
    label: "Specialists active",
    value: { kind: "number", value: 10, suffix: "of 11" },
    detail: [
      { kind: "strong", value: "1" },
      {
        kind: "text",
        value: ` on vacation · ${formatFirstAndInitial("spec-olena-kovalenko")}`,
      },
    ],
  },

  /* 2. Daily activity.
        Step 6: /specialist/daily-audit is now live — disabledRoute
        removed; the snapshot section component reads `disabledRoute`
        to fork between span and link, so the card auto-upgrades. */
  {
    id: "snap-daily-activity",
    label: "Daily activity",
    value: { kind: "number", value: 9, suffix: "of 11", tone: "attn" },
    detail: [
      { kind: "strong", value: "2 pending" },
      { kind: "text", value: " · 1 overdue" },
    ],
  },

  /* 3. Open disputes */
  {
    id: "snap-open-disputes",
    label: "Open disputes",
    value: { kind: "number", value: 12, tone: "urgent" },
    detail: [
      { kind: "strong", value: "3 SLA at risk" },
      { kind: "text", value: " · across team" },
    ],
    disabledRoute: { href: "/specialist/team-disputes", landsInStep: 7 },
  },

  /* 4. Reviews · today (non-clickable in prototype) */
  {
    id: "snap-reviews-today",
    label: "Reviews · today",
    value: { kind: "number", value: 47 },
    detail: [
      { kind: "text", value: "team-wide · " },
      { kind: "strong", value: "11" },
      { kind: "text", value: " approvals" },
    ],
  },

  /* 5. Pool health (status pill) */
  {
    id: "snap-pool-health",
    label: "Pool health",
    value: { kind: "pill", text: "Mixed", tone: "neutral" },
    detail: [
      { kind: "strong", value: "9" },
      { kind: "text", value: " strong · " },
      { kind: "strong", value: "1" },
      { kind: "text", value: " depleted" },
    ],
    disabledRoute: { href: "/specialist/pool-coordination", landsInStep: 8 },
  },

  /* 6. Active sprints (lime status pill) */
  {
    id: "snap-active-sprints",
    label: "Active sprints",
    value: { kind: "pill", text: "4 running", tone: "lime" },
    detail: [
      { kind: "text", value: "2 on track · " },
      { kind: "strong", value: "2 behind" },
    ],
    disabledRoute: { href: "/specialist/recruitment-sprints", landsInStep: 9 },
  },
];
