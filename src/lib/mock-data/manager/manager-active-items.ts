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
 * ## Step 7 refactor — Dispute rows source from canonical domain
 *
 * `activeDisputesNeedingOversight` no longer carries inline title /
 * SLA tag / owner strings. Each row references a canonical
 * `DisputeId` from `manager-team-disputes-data.ts` and the
 * `buildDisputeRow()` helper resolves the display fields. The
 * "Owner: you" treatment now derives from `isOwnedByManager()`
 * (which compares against the `MANAGER_SPECIALIST_ID` constant
 * from team.ts) — no more magic strings.
 *
 * Aaliyah Kone in the activity feed is a candidate (NOT a
 * specialist), so the name stays inline.
 */

import { countryFlag } from "@/lib/utils/country-flag";
import {
  getSpecialist,
  type SpecialistId,
} from "./team";
import {
  getDisputeStrict,
  isOwnedByManager,
  slaBand,
  type DisputeId,
} from "./manager-team-disputes-data";

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

/** A row in the "Disputes need oversight" column. Post-Step-7:
 *  `disputeId` is the canonical reference; other fields are derived
 *  by `buildDisputeRow()` from the dispute record. */
export type ActiveDisputeRow = {
  id: string;
  /** Canonical dispute id — Step 7 refactor. */
  disputeId: DisputeId;
  initials: string;
  colorSlot: 1 | 2 | 3 | 4 | 5;
  /** "Client × Candidate" — rendered as the row title. Derived from
   *  the dispute record. */
  title: string;
  /** SLA tag derived from `slaHours` via `slaBand()`. */
  slaTag: { label: string; tone: ActiveNeedTone };
  /** Owner attribution. `youOwn: true` for Mateo-owned disputes
   *  (renders the prototype's "Owner: <em>you</em>" treatment). */
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

/* Resolve Specialist names referenced in the activity feed (Column
   3). Dispute rows used to need these too; post-Step-7 refactor,
   dispute owner names are derived inside `buildDisputeRow()`. */
const lucasName = getSpecialist("spec-lucas-andersen")?.fullName ?? "Lucas Andersen";
const diegoName = getSpecialist("spec-diego-cabrera")?.fullName ?? "Diego Cabrera";
const yaraName = getSpecialist("spec-yara-khalil")?.fullName ?? "Yara Khalil";
const felipeName = getSpecialist("spec-felipe-santos")?.fullName ?? "Felipe Santos";
const minJunName = getSpecialist("spec-min-jun-park")?.fullName ?? "Min-Jun Park";

/* ============================================================
   Dispute row builder — derives display fields from canonical
   dispute domain (manager-team-disputes-data.ts)
   ============================================================ */

/** SLA tone bucket → display tone for the row. */
function slaToneForDispute(disputeId: DisputeId): ActiveNeedTone {
  const d = getDisputeStrict(disputeId);
  const band = slaBand(d);
  if (band === "urgent") return "urgent";
  if (band === "warn") return "attn";
  return "neutral";
}

function buildDisputeRow(opts: {
  disputeId: DisputeId;
  colorSlot: 1 | 2 | 3 | 4 | 5;
  /** Override the initials shown on the row's left avatar (the
   *  active-items column uses the CLIENT's initials, not the
   *  owner Specialist's — preserved from prototype). */
  initials: string;
}): ActiveDisputeRow {
  const d = getDisputeStrict(opts.disputeId);
  const owner = getSpecialist(d.ownerSpecialistId);
  return {
    id: `adn-${d.id.toLowerCase()}`,
    disputeId: d.id,
    initials: opts.initials,
    colorSlot: opts.colorSlot,
    title: `${d.client.name} × ${d.candidate.name}`,
    slaTag: {
      label: `${d.slaHours}h SLA`,
      tone: slaToneForDispute(d.id),
    },
    owner: isOwnedByManager(d)
      ? { youOwn: true }
      : { youOwn: false, specialistName: owner?.fullName ?? "Unknown" },
  };
}

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
  /* Step 7 refactor — rows reference canonical dispute records.
     Each row's title / SLA tag / owner attribution is derived
     from the dispute record by `buildDisputeRow()`. The `initials`
     and `colorSlot` stay inline — they're context-specific render
     hints (the active-items column uses CLIENT initials, not
     owner Specialist initials; the colorSlot is the section's
     own color cycle). */
  buildDisputeRow({ disputeId: "DSP-2026-04-29", colorSlot: 4, initials: "QC" }),
  buildDisputeRow({ disputeId: "DSP-2026-04-12", colorSlot: 1, initials: "QC" }),
  buildDisputeRow({ disputeId: "DSP-2026-04-15", colorSlot: 1, initials: "M" }),
  buildDisputeRow({ disputeId: "DSP-2026-04-17", colorSlot: 3, initials: "LH" }),
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
