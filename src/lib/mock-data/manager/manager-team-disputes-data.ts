/**
 * Team Disputes — canonical dispute domain.
 *
 * 12 open dispute records ported from `reference/manager.html`
 * lines 29221-29611. Each record references its owner via
 * `ownerSpecialistId` (canonical pointer to team.ts) — no inline
 * specialist names. Candidate names are inline strings (candidates
 * are external to the Specialist roster).
 *
 * ## DSP-2026-04-12 — THE canonical dispute
 *
 * Sofia Reyes × Quill & Co is THE canonical dispute referenced
 * across the entire Manager initiative (urgent items card,
 * active items column, this list, future Steps 10-13). Do NOT
 * redefine it elsewhere. Always reference via
 * `getDispute("DSP-2026-04-12")` or `findDispute(...)`.
 *
 * Ownership: `spec-mateo-vargas` (Mateo — the current Manager).
 *
 * ## ID convention
 *
 * `DSP-YYYY-MM-DD` for one dispute opened on a given date.
 * `DSP-YYYY-MM-DD{b,c,...}` suffix for additional disputes opened
 * on the same date. Preserved literally from prototype.
 *
 * ## Title rendering convention (locked in Step 7 Q8 + Q11x)
 *
 * - Initiated by client → `"<Client> × <em>Candidate</em>"` (client first)
 * - Initiated by candidate → `"<em>Candidate</em> × <Client>"` (candidate first)
 * - Contested (initiator: "both") → `"<Client> × <em>Candidate</em>"` (client first, default)
 *
 * Render-time helper `disputeTitleParts()` returns the ordered
 * fragments so consumers don't reimplement the convention.
 *
 * ## SLA pill convention (locked in Step 7 Q4)
 *
 * - `slaHours < 24` → urgent (red)
 * - `slaHours < 48` → warn (amber)
 * - `slaHours >= 48` → neutral
 * - `status === "escalated"` → label changes from "to SLA" to "to admin"
 */

import { type SpecialistId, MANAGER_SPECIALIST_ID } from "./team";

/* ============================================================
   Types
   ============================================================ */

export type DisputeId = `DSP-${string}`;

export type DisputeStatus = "open" | "progress" | "escalated";

export type DisputeReason =
  | "quality-of-work"
  | "hours-billed"
  | "communication"
  | "payment"
  | "no-show"
  | "other";

/** Who opened the dispute. "both" = contested (both client and
 *  candidate filed simultaneously or counter-filed). */
export type DisputeInitiator = "client" | "candidate" | "both";

export type DisputeSeverity = 1 | 2 | 3;

/** SLA urgency band — derived from `slaHours` via `slaBand()`. */
export type SlaBand = "urgent" | "warn" | "neutral";

export type Dispute = {
  id: DisputeId;
  status: DisputeStatus;
  reason: DisputeReason;
  initiator: DisputeInitiator;
  severity: DisputeSeverity;
  /** Client side of the dispute. `companyShort` used for compact
   *  contexts (urgent card, active items). */
  client: { name: string; companyShort: string };
  /** Candidate side — NOT a Specialist. Inline string. */
  candidate: { name: string };
  /** Canonical reference to team.ts. The owner Specialist (the one
   *  Atlas hired the candidate through) is responsible for resolving
   *  the dispute. */
  ownerSpecialistId: SpecialistId;
  /** Hours since the dispute was opened. */
  ageHours: number;
  /** Hours remaining until SLA breach. For escalated disputes,
   *  this is "hours remaining until admin's SLA breach" instead. */
  slaHours: number;
  /** Marks "Aisha's first dispute" / "Naomi's first dispute" badge.
   *  Computed from owner's dispute history; stored as a flag on
   *  the record for simpler consumer rendering. */
  isFirstForOwner?: boolean;
};

/* ============================================================
   Display-fragment helpers
   ============================================================ */

/** Reason chip label (rendered exactly as the prototype shows). */
export function disputeReasonLabel(reason: DisputeReason): string {
  switch (reason) {
    case "quality-of-work": return "Quality of work";
    case "hours-billed": return "Hours billed";
    case "communication": return "Communication";
    case "payment": return "Payment";
    case "no-show": return "No-show";
    case "other": return "Other";
  }
}

/** Initiator meta-line label.
 *  "Disputed by both" for contested, "Initiated by client/candidate" otherwise. */
export function disputeInitiatorLabel(initiator: DisputeInitiator): string {
  switch (initiator) {
    case "both": return "Disputed by both";
    case "client": return "Initiated by client";
    case "candidate": return "Initiated by candidate";
  }
}

/** Bold-rendered initiator label for SLA-risk / contested rows
 *  (the prototype wraps the contested label in <strong>). */
export function disputeInitiatorIsBold(initiator: DisputeInitiator): boolean {
  return initiator === "both";
}

/** Ordered title fragments. `emphasized: true` renders italic.
 *  Convention: candidate-initiated → candidate first; otherwise
 *  client first. Consumer composes with " × " separator. */
export function disputeTitleParts(d: Dispute): ReadonlyArray<{
  text: string;
  emphasized: boolean;
}> {
  const clientPart = { text: d.client.name, emphasized: false };
  const candidatePart = { text: d.candidate.name, emphasized: true };
  if (d.initiator === "candidate") {
    return [candidatePart, clientPart];
  }
  return [clientPart, candidatePart];
}

/** Three-band SLA classification. Escalated rows get "neutral" so
 *  the row's escalated-status badge carries the urgency signal. */
export function slaBand(d: Dispute): SlaBand {
  if (d.status === "escalated") return "neutral";
  if (d.slaHours < 24) return "urgent";
  if (d.slaHours < 48) return "warn";
  return "neutral";
}

/** SLA label suffix: "to SLA" for open/progress, "to admin" for
 *  escalated (the admin team now has the SLA clock). */
export function slaLabelSuffix(d: Dispute): string {
  return d.status === "escalated" ? "to admin" : "to SLA";
}

/** "9h" / "36h" / "48h" — slaHours formatted. */
export function slaHoursLabel(d: Dispute): string {
  return `${d.slaHours}h`;
}

/** Age label: "16h" / "1d 4h" / "2d 10h" / "5d". */
export function disputeAgeLabel(ageHours: number): string {
  if (ageHours < 24) return `${ageHours}h`;
  const days = Math.floor(ageHours / 24);
  const hours = ageHours % 24;
  if (hours === 0) return `${days}d`;
  return `${days}d ${hours}h`;
}

/** Whether this dispute is owned by the current Manager. Single
 *  source-of-truth check; consumers should NOT compare ownerSpecialistId
 *  to a literal string. */
export function isOwnedByManager(d: Dispute): boolean {
  return d.ownerSpecialistId === MANAGER_SPECIALIST_ID;
}

/* ============================================================
   Records — 12 open disputes
   ============================================================ */

export const teamDisputes: ReadonlyArray<Dispute> = [
  /* 1 — SLA RISK 9h · Quill × Min-Jun (owned by Lucas) */
  {
    id: "DSP-2026-04-29",
    status: "progress",
    reason: "quality-of-work",
    initiator: "both",
    severity: 3,
    client: { name: "Quill & Co", companyShort: "Quill" },
    candidate: { name: "Min-Jun Park" },
    ownerSpecialistId: "spec-lucas-andersen",
    ageHours: 63,
    slaHours: 9,
  },

  /* 2 — SLA RISK 14h · Sofia × Quill (owned by Mateo — CANONICAL) */
  {
    id: "DSP-2026-04-12",
    status: "progress",
    reason: "hours-billed",
    initiator: "candidate",
    severity: 3,
    client: { name: "Quill & Co", companyShort: "Quill" },
    candidate: { name: "Sofia Reyes" },
    ownerSpecialistId: MANAGER_SPECIALIST_ID,
    ageHours: 58,
    slaHours: 14,
  },

  /* 3 — WARN 36h · Mercer × Hana (owned by Diego) */
  {
    id: "DSP-2026-04-15",
    status: "progress",
    reason: "communication",
    initiator: "both",
    severity: 2,
    client: { name: "Mercer Capital", companyShort: "Mercer" },
    candidate: { name: "Hana Tanaka" },
    ownerSpecialistId: "spec-diego-cabrera",
    ageHours: 36,
    slaHours: 36,
  },

  /* 4 — ESCALATED · Brightline × Layla (owned by Yara) */
  {
    id: "DSP-2026-04-08",
    status: "escalated",
    reason: "payment",
    initiator: "client",
    severity: 3,
    client: { name: "Brightline Health", companyShort: "Brightline" },
    candidate: { name: "Layla Adel" },
    ownerSpecialistId: "spec-yara-khalil",
    ageHours: 120,
    slaHours: 48,
  },

  /* 5 — OPEN 56h · Lumio × Felipe-the-candidate (owned by Yara).
        Prototype quirk: the candidate name happens to match a
        specialist name, but this candidate is NOT a specialist. */
  {
    id: "DSP-2026-04-17",
    status: "open",
    reason: "quality-of-work",
    initiator: "client",
    severity: 2,
    client: { name: "Lumio Health", companyShort: "Lumio" },
    candidate: { name: "Felipe Santos" },
    ownerSpecialistId: "spec-yara-khalil",
    ageHours: 16,
    slaHours: 56,
  },

  /* 6 — OPEN 60h · Northwind × Aaron (Aisha's first dispute) */
  {
    id: "DSP-2026-04-18",
    status: "open",
    reason: "no-show",
    initiator: "client",
    severity: 2,
    client: { name: "Northwind Logistics", companyShort: "Northwind" },
    candidate: { name: "Aaron Tate" },
    ownerSpecialistId: "spec-aisha-bello",
    ageHours: 12,
    slaHours: 60,
    isFirstForOwner: true,
  },

  /* 7 — OPEN 64h · Cobalt × Jules (Naomi's first dispute) */
  {
    id: "DSP-2026-04-19",
    status: "open",
    reason: "communication",
    initiator: "candidate",
    severity: 1,
    client: { name: "Cobalt Studios", companyShort: "Cobalt" },
    candidate: { name: "Jules Park" },
    ownerSpecialistId: "spec-naomi-adebayo",
    ageHours: 8,
    slaHours: 64,
    isFirstForOwner: true,
  },

  /* 8 — IN PROGRESS 44h · Stride × Ahmad (owned by Felipe — contested) */
  {
    id: "DSP-2026-04-16",
    status: "progress",
    reason: "hours-billed",
    initiator: "both",
    severity: 2,
    client: { name: "Stride Foods", companyShort: "Stride" },
    candidate: { name: "Ahmad Reyes" },
    ownerSpecialistId: "spec-felipe-santos",
    ageHours: 28,
    slaHours: 44,
  },

  /* 9 — OPEN 58h · Pinecrest × Han (owned by Min-Jun).
        ID suffix "b" — same date as DSP-2026-04-18 (Aisha's).
        Preserved from prototype. */
  {
    id: "DSP-2026-04-18b",
    status: "open",
    reason: "other",
    initiator: "client",
    severity: 1,
    client: { name: "Pinecrest Group", companyShort: "Pinecrest" },
    candidate: { name: "Han Yu" },
    ownerSpecialistId: "spec-min-jun-park",
    ageHours: 14,
    slaHours: 58,
  },

  /* 10 — IN PROGRESS 38h · Drift × Sara (owned by Lucas — contested) */
  {
    id: "DSP-2026-04-14",
    status: "progress",
    reason: "quality-of-work",
    initiator: "both",
    severity: 2,
    client: { name: "Drift Marketing", companyShort: "Drift" },
    candidate: { name: "Sara Cordova" },
    ownerSpecialistId: "spec-lucas-andersen",
    ageHours: 34,
    slaHours: 38,
  },

  /* 11 — OPEN 68h · Glasshouse × Olu (owned by Aisha) */
  {
    id: "DSP-2026-04-19b",
    status: "open",
    reason: "no-show",
    initiator: "client",
    severity: 1,
    client: { name: "Glasshouse Co", companyShort: "Glasshouse" },
    candidate: { name: "Olu Adebowale" },
    ownerSpecialistId: "spec-aisha-bello",
    ageHours: 4,
    slaHours: 68,
  },

  /* 12 — OPEN 66h · Halcyon × Maya (owned by Kavi) */
  {
    id: "DSP-2026-04-19c",
    status: "open",
    reason: "payment",
    initiator: "candidate",
    severity: 1,
    client: { name: "Halcyon Partners", companyShort: "Halcyon" },
    candidate: { name: "Maya Iyer" },
    ownerSpecialistId: "spec-kavi-rajan",
    ageHours: 6,
    slaHours: 66,
  },
];

/* ============================================================
   Lookups
   ============================================================ */

const BY_ID: ReadonlyMap<DisputeId, Dispute> = new Map(
  teamDisputes.map((d) => [d.id, d]),
);

/** Look up a dispute by its canonical id. Returns undefined for
 *  unknown ids — consumers should provide a fallback. */
export function getDispute(id: DisputeId): Dispute | undefined {
  return BY_ID.get(id);
}

/** Strict lookup — throws if missing. Use this when the id is
 *  hard-coded in a downstream consumer (e.g. urgent items card
 *  referencing DSP-2026-04-12). */
export function getDisputeStrict(id: DisputeId): Dispute {
  const d = BY_ID.get(id);
  if (!d) throw new Error(`Dispute not found: ${id}`);
  return d;
}
