/**
 * Manager dashboard — "Needs your attention" urgent cards.
 *
 * 6 cards ported faithfully from `reference/manager.html` lines
 * 19541-19667. Canonical content; downstream Steps 6 (Daily Activity
 * Audit), 7 (Team Disputes), 8 (Pool Coordination), 9 (Recruitment
 * Sprints), 10 (Team Reports) all read derived metrics from the
 * SAME source numbers — drift here propagates everywhere.
 *
 * ## CTA pattern (per Step 3 Q2 lock)
 *
 * Each card has TWO actions, one primary + one ghost. Both are
 * `ManagerActionCTA` records carrying `label` + `landsInStep` +
 * optional `description`. Step 3 routes them all through the
 * placeholder modal. Steps 4-11 retarget individual CTAs as they
 * become real (some become real `<Link>` navigation; some become
 * inline actions).
 *
 * ## Step 4 refactor — Specialist names sourced from team.ts
 *
 * The Step 3 placeholder strings ("Priya Mehra", "Diego Cabrera",
 * etc.) are replaced with `getSpecialist("spec-…")?.fullName`
 * lookups against the canonical 11-Specialist roster locked in
 * Step 4's `team.ts`. Fallback strings preserve display if a
 * lookup ever fails (defensive — shouldn't happen with the strict
 * `SpecialistId` union).
 */

import { getSpecialist } from "./team";
import type { ManagerActionCTA } from "./manager-rail";

export type UrgentPriority = "red" | "orange" | "yellow";

export type ManagerUrgentItem = {
  id: string;
  priority: UrgentPriority;
  /** Short uppercase category — e.g. "Daily activity", "Pool depletion". */
  typeLabel: string;
  /** SLA / urgency caption at top-right of the card. */
  slaLabel: string;
  /** Rich body — supports a few inline strong/em markers. Rendered as
   *  a single line of text via React fragments in the section component.
   *  Each segment is either plain text or one of `{strong}` / `{em}`. */
  body: ReadonlyArray<
    | { kind: "text"; value: string }
    | { kind: "strong"; value: string }
    | { kind: "em"; value: string }
  >;
  primary: ManagerActionCTA;
  ghost: ManagerActionCTA;
};

/* Resolve specialist display names once at module load. The
   `?? "<literal>"` fallback is defensive — the strict SpecialistId
   union should make lookup-misses impossible. */
const priyaName = getSpecialist("spec-priya-mehra")?.fullName ?? "Priya Mehra";
const diegoName = getSpecialist("spec-diego-cabrera")?.fullName ?? "Diego Cabrera";
const aishaName = getSpecialist("spec-aisha-bello")?.fullName ?? "Aisha Bello";
const lucasFirstName = getSpecialist("spec-lucas-andersen")?.firstName ?? "Lucas";
const lucasName = getSpecialist("spec-lucas-andersen")?.fullName ?? "Lucas Andersen";

export const managerUrgentItems: ReadonlyArray<ManagerUrgentItem> = [
  /* Card 1 — RED — Daily activity missed */
  {
    id: "urgent-priya-daily",
    priority: "red",
    typeLabel: "Daily activity",
    slaLabel: "2 days",
    body: [
      { kind: "strong", value: priyaName },
      {
        kind: "text",
        value:
          " missed daily activity submission — 2 days running. Needs immediate follow-up.",
      },
    ],
    primary: { label: "Open profile", landsInStep: 5 },
    ghost: { label: "Open daily audit", landsInStep: 6 },
  },

  /* Card 2 — RED — Disputes SLA at risk */
  {
    id: "urgent-team-disputes-sla",
    priority: "red",
    typeLabel: "Team disputes",
    slaLabel: "3 at risk",
    body: [
      { kind: "strong", value: "3 disputes" },
      { kind: "text", value: " nearing 72-hour SLA across team. Oldest is " },
      { kind: "em", value: "Quill & Co × Min-Jun Park" },
      { kind: "text", value: ` at 9h (${lucasFirstName}).` },
    ],
    primary: { label: "Open team disputes", landsInStep: 7 },
    ghost: {
      label: "Filter by SLA",
      landsInStep: 7,
      description:
        "Filter-by-SLA jumps into Team Disputes filtered to SLA-at-risk only. Lands in Step 7.",
    },
  },

  /* Card 3 — RED — Pool depletion */
  {
    id: "urgent-pool-cs-low",
    priority: "red",
    typeLabel: "Pool depletion",
    slaLabel: "Critical",
    body: [
      { kind: "strong", value: "Customer Support" },
      { kind: "text", value: " pool critically low at " },
      { kind: "em", value: "8 candidates" },
      { kind: "text", value: " (threshold 15). Owning Specialist: " },
      { kind: "text", value: `${aishaName}.` },
    ],
    primary: { label: "Run sprint", landsInStep: 9 },
    ghost: { label: "Pool coordination", landsInStep: 8 },
  },

  /* Card 4 — ORANGE — Review SLA drop */
  {
    id: "urgent-diego-sla-drop",
    priority: "orange",
    typeLabel: "Performance flag",
    slaLabel: "This week",
    body: [
      { kind: "strong", value: diegoName },
      { kind: "text", value: "'s review SLA hit rate dropped to " },
      { kind: "em", value: "85%" },
      { kind: "text", value: " this week — down from 94%." },
    ],
    primary: { label: "View performance", landsInStep: 5 },
    ghost: { label: "Schedule 1:1", landsInStep: 5 },
  },

  /* Card 5 — ORANGE — Performance reviews overdue */
  {
    id: "urgent-perf-reviews-overdue",
    priority: "orange",
    typeLabel: "Performance reviews",
    slaLabel: "2 overdue",
    body: [
      { kind: "strong", value: "2 performance reviews" },
      { kind: "text", value: " overdue: " },
      { kind: "em", value: aishaName },
      { kind: "text", value: " (3 days), " },
      { kind: "em", value: lucasName },
      { kind: "text", value: " (1 day)." },
    ],
    primary: { label: "Open templates", landsInStep: 5 },
    ghost: { label: "View team", landsInStep: 4 },
  },

  /* Card 6 — YELLOW — Sprint forecast */
  {
    id: "urgent-bookkeepers-deplete",
    priority: "yellow",
    typeLabel: "Sprint forecast",
    slaLabel: "This week",
    body: [
      { kind: "strong", value: "Bookkeepers" },
      { kind: "text", value: " projected to deplete in " },
      { kind: "em", value: "5 days" },
      { kind: "text", value: " at current burn rate. Sprint recommended." },
    ],
    primary: { label: "Start sprint", landsInStep: 9 },
    ghost: { label: "View forecast", landsInStep: 8 },
  },
];

/** Total open across team — shown in the section meta header. */
export const managerUrgentOpenCount: number = managerUrgentItems.length;
