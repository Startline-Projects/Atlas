/**
 * Manager dashboard — "Active items" 3-column data.
 *
 * Ported from `reference/manager.html` lines 19710-19854. Three lists:
 *
 *   1. Specialists need attention — 4 rows (Priya, Diego, Aisha, Lucas)
 *   2. Disputes need oversight    — 4 rows (Quill × Min-Jun, Sofia ×
 *                                   Quill, Mercer × Hana, Lumio × Felipe)
 *   3. Recent team activity       — 6 feed items (Yara, Diego, Lucas,
 *                                   Pool warning, Felipe, Min-Jun)
 *
 * Canonical content for downstream Steps 4 (My Team), 5 (Specialist
 * Detail), 7 (Team Disputes), 10 (Team Reports' activity feed).
 *
 * ## Step 4 refactor — Specialist data sourced from team.ts
 *
 * Rows are now built via `buildSpecialistRow()` which derives
 * `initials`, `fullName`, `countryFlag` from the canonical
 * `Specialist` record. The `colorSlot` (1-5) stays inline — it's
 * the active-items context's OWN color cycle, deliberately
 * independent from each Specialist's `avatarSlot`. (The prototype
 * itself drifts here: Priya's team-grid avatar is `av-3` but her
 * active-items avatar is `cl-2`. We preserve the prototype's
 * visual rhythm.)
 *
 * TODO(step-7): refactor dispute owner attribution (the "Owner:
 * Lucas Andersen" lines) to reference dispute records once Step 7
 * lands `manager-team-disputes-data.ts`. The "Owner: you" phrasing
 * means owned by the current Manager.
 *
 * Sofia Reyes × Quill & Co dispute is `DSP-2026-04-12` — the
 * canonical dispute locked at the start of the initiative.
 *
 * Aaliyah Kone in the activity feed is a candidate (NOT a
 * specialist), so the name stays inline.
 */

import { countryFlag } from "@/lib/utils/country-flag";
import {
  getSpecialist,
  type SpecialistId,
} from "./team";

export type ActiveNeedTone = "urgent" | "attn" | "neutral";

/** A row in the "Specialists need attention" column. */
export type ActiveSpecialistRow = {
  id: string;
  /** Canonical Specialist id — Step 4 refactor. */
  specialistId: SpecialistId;
  /** Initials derived from team.ts. Cached at build for render. */
  initials: string;
  /** Active-items color slot (1-5) — deliberately independent from
   *  specialist.avatarSlot (see file header). */
  colorSlot: 1 | 2 | 3 | 4 | 5;
  /** Specialist full name — derived from team.ts. */
  fullName: string;
  /** Country flag emoji — derived from team.ts via countryFlag(). */
  countryFlag: string;
  /** Short tag rendered before the detail text. */
  needTag: { label: string; tone: ActiveNeedTone };
  /** Detail caption. */
  detail: string;
};

/** A row in the "Disputes need oversight" column. */
export type ActiveDisputeRow = {
  id: string;
  initials: string;
  colorSlot: 1 | 2 | 3 | 4 | 5;
  /** "Client × Candidate" or similar — rendered as the row title. */
  title: string;
  /** SLA tag. */
  slaTag: { label: string; tone: ActiveNeedTone };
  /** Owner attribution. `youOwn: true` renders the prototype's
   *  "Owner: <em>you</em>" treatment. Otherwise renders the
   *  attributed Specialist's name. */
  owner: { youOwn: true } | { youOwn: false; specialistName: string };
};

/** Feed item kind drives the bullet color. */
export type ActivityFeedKind = "review" | "neutral";

/** A row in the "Recent team activity" live feed. */
export type ActivityFeedItem = {
  id: string;
  kind: ActivityFeedKind;
  /** Body fragments — supports inline strong markers. */
  body: ReadonlyArray<
    | { kind: "text"; value: string }
    | { kind: "strong"; value: string }
  >;
  /** "5 min ago" etc. */
  when: string;
};

/* ============================================================
   Row builder — derives display fields from canonical Specialist
   ============================================================ */

function buildSpecialistRow(opts: {
  specialistId: SpecialistId;
  colorSlot: 1 | 2 | 3 | 4 | 5;
  needTag: { label: string; tone: ActiveNeedTone };
  detail: string;
}): ActiveSpecialistRow {
  const s = getSpecialist(opts.specialistId);
  const idSlug = opts.specialistId.replace("spec-", "");
  return {
    id: `asra-${idSlug}`,
    specialistId: opts.specialistId,
    initials: s?.initials ?? "??",
    colorSlot: opts.colorSlot,
    fullName: s?.fullName ?? "Unknown",
    countryFlag: countryFlag(s?.countryCode ?? ""),
    needTag: opts.needTag,
    detail: opts.detail,
  };
}

/* Resolve disputed-Specialist names from team.ts. */
const lucasName = getSpecialist("spec-lucas-andersen")?.fullName ?? "Lucas Andersen";
const diegoName = getSpecialist("spec-diego-cabrera")?.fullName ?? "Diego Cabrera";
const yaraName = getSpecialist("spec-yara-khalil")?.fullName ?? "Yara Khalil";
const felipeName = getSpecialist("spec-felipe-santos")?.fullName ?? "Felipe Santos";
const minJunName = getSpecialist("spec-min-jun-park")?.fullName ?? "Min-Jun Park";

/* ============================================================
   Column 1 — Specialists need attention
   ============================================================ */

export const activeSpecialistsNeedingAttention: ReadonlyArray<ActiveSpecialistRow> =
  [
    buildSpecialistRow({
      specialistId: "spec-priya-mehra",
      colorSlot: 2,
      needTag: { label: "Daily activity", tone: "urgent" },
      detail: "Missed 2 days running",
    }),
    buildSpecialistRow({
      specialistId: "spec-diego-cabrera",
      colorSlot: 3,
      needTag: { label: "Review SLA", tone: "attn" },
      detail: "Hit rate dropped to 85%",
    }),
    buildSpecialistRow({
      specialistId: "spec-aisha-bello",
      colorSlot: 4,
      needTag: { label: "Review", tone: "attn" },
      detail: "Performance review overdue",
    }),
    buildSpecialistRow({
      specialistId: "spec-lucas-andersen",
      colorSlot: 5,
      needTag: { label: "Capacity", tone: "neutral" },
      detail: "4 reviews pending past 18h",
    }),
  ];

/* ============================================================
   Column 2 — Disputes need oversight
   ============================================================ */

export const activeDisputesNeedingOversight: ReadonlyArray<ActiveDisputeRow> = [
  /* TODO(step-7): refactor to reference manager-team-disputes-data
     records once Step 7 lands. Sofia × Quill is DSP-2026-04-12. */
  {
    id: "adn-quill-minjun",
    initials: "QC",
    colorSlot: 4,
    title: "Quill & Co × Min-Jun Park",
    slaTag: { label: "9h SLA", tone: "urgent" },
    owner: { youOwn: false, specialistName: lucasName },
  },
  {
    id: "adn-sofia-quill",
    initials: "QC",
    colorSlot: 1,
    title: "Sofia Reyes × Quill & Co",
    slaTag: { label: "14h SLA", tone: "urgent" },
    owner: { youOwn: true },
  },
  {
    id: "adn-mercer-hana",
    initials: "M",
    colorSlot: 1,
    title: "Mercer Capital × Hana Tanaka",
    slaTag: { label: "36h SLA", tone: "attn" },
    owner: { youOwn: false, specialistName: diegoName },
  },
  {
    id: "adn-lumio-felipe",
    initials: "LH",
    colorSlot: 3,
    title: "Lumio Health × Felipe Santos",
    slaTag: { label: "56h SLA", tone: "neutral" },
    owner: { youOwn: false, specialistName: yaraName },
  },
];

/* ============================================================
   Column 3 — Recent team activity feed
   ============================================================ */

export const recentTeamActivity: ReadonlyArray<ActivityFeedItem> = [
  {
    id: "rta-yara-approve",
    kind: "review",
    body: [
      { kind: "strong", value: yaraName },
      { kind: "text", value: " approved " },
      /* Aaliyah Kone is a candidate (NOT a specialist) — stays inline. */
      { kind: "strong", value: "Aaliyah Kone" },
      { kind: "text", value: " to go live." },
    ],
    when: "5 min ago",
  },
  {
    id: "rta-diego-resolve",
    kind: "neutral",
    body: [
      { kind: "strong", value: diegoName },
      { kind: "text", value: " resolved the Mercer × Hana dispute." },
    ],
    when: "28 min ago",
  },
  {
    id: "rta-lucas-daily",
    kind: "neutral",
    body: [
      { kind: "strong", value: lucasName },
      { kind: "text", value: " submitted daily activity." },
    ],
    when: "45 min ago",
  },
  {
    id: "rta-pool-warning-lift",
    kind: "review",
    body: [
      { kind: "text", value: "Pool depletion warning lifted for " },
      { kind: "strong", value: "VAs" },
      { kind: "text", value: "." },
    ],
    when: "1h ago",
  },
  {
    id: "rta-felipe-dispute",
    kind: "neutral",
    body: [
      { kind: "strong", value: felipeName },
      { kind: "text", value: " opened dispute with Lumio Health." },
    ],
    when: "2h ago",
  },
  {
    id: "rta-minjun-recert",
    kind: "review",
    body: [
      { kind: "strong", value: minJunName },
      { kind: "text", value: " completed re-cert for 3 candidates." },
    ],
    when: "3h ago",
  },
];

/** Counts shown in column headers. */
export const activeColumnCounts = {
  specialistsNeedAttention: activeSpecialistsNeedingAttention.length,
  disputesNeedOversight: activeDisputesNeedingOversight.length,
} as const;
