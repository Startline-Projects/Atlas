/**
 * Manager dashboard — right-rail content.
 *
 * Three cards (top to bottom):
 *   1. On-call card — SHARED with Specialist mode. Reused via direct
 *      import of `src/components/specialist/dashboard/on-call-card.tsx`.
 *      No mock data lives here for it.
 *   2. Quick actions — 5 buttons. Each triggers a placeholder modal
 *      in Step 3; Steps 5/6/9/10/11 retarget them as their actions
 *      become real.
 *   3. Manager daily report — status card with Submit-now CTA.
 *
 * Ported from `reference/manager.html` lines 19988-20038.
 *
 * ## ManagerActionCTA — shared shape
 *
 * Every Manager-extension CTA in Step 3 (urgent cards, quick actions,
 * Submit-now) uses the same `ManagerActionCTA` shape so the
 * placeholder modal has a uniform contract:
 *
 *   - `label` — visible button text
 *   - `landsInStep` — step number where the action becomes real;
 *     drives the modal's auto-derived feature name
 *   - `description` — optional body override; uses the auto-derived
 *     "{label} lands in Step {N} — {feature}" copy when omitted
 *
 * The step-features lookup map (step number → feature name) is
 * centralized inside `ManagerActionPlaceholderModal` per the Step 3
 * lock — single file changes if step numbering shifts.
 */

/** Step numbers Manager-extension CTAs can land in.
 *  Step 13 (Messages + Specialist Chat) is included for hero
 *  "Message" CTAs that route to the Specialist chat surface.
 *  Step 14 (Help) is included for "coming soon" actions whose target
 *  never lands as a dedicated step (e.g. team meeting scheduling). */
export type ManagerActionStep = 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 13 | 14;

export type ManagerActionCTA = {
  label: string;
  /** Required for modal CTAs; OPTIONAL when `href` is set (the CTA
   *  renders as a Link and never opens the modal, so landsInStep is
   *  unused). Step 6 audit: CTAs that flipped to `href` drop their
   *  landsInStep field to keep the `grep "landsInStep: N"` canary
   *  honest — N hits = N CTAs that still route through the modal. */
  landsInStep?: ManagerActionStep;
  /** Optional copy override. When omitted, the modal renders its
   *  auto-derived body using the step-features lookup. */
  description?: string;
  /** Step 5+: when set, the CTA renders as a real `<Link href={href}>`
   *  instead of a button-that-opens-modal. Used when an action's
   *  target step has landed and the CTA can navigate directly. The
   *  consumer's render code forks on `href` presence. */
  href?: string;
};

export type ManagerQuickAction = ManagerActionCTA & {
  id: string;
  /** Inline SVG path key — resolved by the rail component. */
  iconKey:
    | "submit-daily"
    | "schedule-1on1"
    | "audit-specialist"
    | "team-analytics"
    | "run-sprint";
  /** Primary button visual treatment (filled). The first action
   *  ("Submit Manager daily report") is primary; the rest are ghosts. */
  isPrimary?: boolean;
};

export const managerQuickActions: ReadonlyArray<ManagerQuickAction> = [
  {
    id: "qa-submit-daily",
    label: "Submit Manager daily report",
    iconKey: "submit-daily",
    landsInStep: 11,
    isPrimary: true,
  },
  {
    id: "qa-schedule-1on1",
    label: "Schedule a 1:1",
    iconKey: "schedule-1on1",
    landsInStep: 5,
  },
  {
    id: "qa-audit-specialist",
    label: "Audit a Specialist",
    iconKey: "audit-specialist",
    /* Step 6 un-disable: route exists. `href` set → renders as Link;
       `landsInStep` dropped (would be vestigial for href-set CTAs). */
    href: "/specialist/daily-audit",
  },
  {
    id: "qa-team-analytics",
    label: "View team analytics",
    iconKey: "team-analytics",
    landsInStep: 10,
  },
  {
    id: "qa-run-sprint",
    label: "Run a recruitment sprint",
    iconKey: "run-sprint",
    landsInStep: 9,
  },
];

/** Manager daily report status card content. */
export type ManagerDailyReportState = {
  /** Header right-aligned meta. */
  dueLabel: string;
  /** Status visual + copy. Status icon swap (pending → submitted) will
   *  land alongside the real form in Step 11. */
  statusTitle: string;
  statusSub: string;
  /** Bottom CTA — triggers the placeholder modal in Step 3. */
  cta: ManagerActionCTA;
};

export const managerDailyReportState: ManagerDailyReportState = {
  dueLabel: "Due 11:59 PM",
  statusTitle: "Pending submission",
  statusSub: "1:1s, audits, coaching, decisions",
  cta: {
    label: "Submit now",
    landsInStep: 11,
  },
};

/* The Manager header's 3 quick stats (10/11 specialists, 9/11
   submitted, 12 open disputes) live in the header component rather
   than as mock data — they're rendered once, referenced nowhere else.
   If a future step needs them shared (e.g. mobile-collapsed header),
   extract here. */
