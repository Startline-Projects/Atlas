/**
 * Mock data for the my-clients sheet "Open briefs" panel.
 *
 * 12 managed clients × 3-5 briefs each (~45 total). Cross-session IDs:
 * `brief-*` joins to `client-*` (clientId) and `cand-*` (shortlist +
 * hired candidate IDs).
 *
 * Briefs are split visually in the panel into:
 *   - Open: `open` / `shortlist-sent` / `draft` / `paused`
 *   - Closed: `filled` / `closed-no-fill`
 *
 * `slaTone` drives the SLA chip color on each card. Fresh = green,
 * warn = amber, urgent = red. Aligns with the same fresh/warn/urgent
 * scale used across review-queue, recert-queue, disputes.
 */

export type BriefStatus =
  | "open"
  | "shortlist-sent"
  | "filled"
  | "closed-no-fill"
  | "draft"
  | "paused";

export type ClientBrief = {
  id: string;
  clientId: string;
  status: BriefStatus;
  role: string;
  createdDate: string;
  closedDate?: string;
  scope: string;
  budget: { min: number; max: number; type: "hourly" | "monthly" };
  shortlistCount: number;
  shortlistCandidateIds: ReadonlyArray<string>;
  hiredCandidateId?: string;
  daysOpen: number;
  slaTone: "fresh" | "warn" | "urgent";
};

export const clientBriefs: ReadonlyArray<ClientBrief> = [
  /* ============================================================
     Acme Co — active hiring pipeline
     ============================================================ */
  {
    id: "brief-acme-q4-ops",
    clientId: "client-acme-co",
    status: "open",
    role: "Senior Operations Lead",
    createdDate: "2026-04-28",
    scope:
      "Senior ops to mirror Anand's calibre — 30h/week, EST overlap, eng-leadership focus.",
    budget: { min: 50, max: 60, type: "hourly" },
    shortlistCount: 3,
    shortlistCandidateIds: [
      "cand-anand-patel",
      "cand-marcus-bauer",
      "cand-carmen-lopez",
    ],
    daysOpen: 4,
    slaTone: "fresh",
  },
  {
    id: "brief-acme-cx-lead",
    clientId: "client-acme-co",
    status: "shortlist-sent",
    role: "Customer-success ops",
    createdDate: "2025-10-20",
    closedDate: "2025-11-04",
    scope:
      "Owner of CX tooling + Zendesk integrations · 28h/week · async-friendly.",
    budget: { min: 45, max: 52, type: "hourly" },
    shortlistCount: 4,
    shortlistCandidateIds: [
      "cand-aaliyah-kone",
      "cand-marie-okonkwo",
      "cand-jomari-dc",
      "cand-carmen-lopez",
    ],
    hiredCandidateId: "cand-aaliyah-kone",
    daysOpen: 15,
    slaTone: "fresh",
  },
  {
    id: "brief-acme-sales-ops",
    clientId: "client-acme-co",
    status: "filled",
    role: "Sales ops support",
    createdDate: "2024-08-12",
    closedDate: "2024-09-01",
    scope: "Pipeline hygiene + lead-routing automation. Salesforce required.",
    budget: { min: 42, max: 50, type: "hourly" },
    shortlistCount: 3,
    shortlistCandidateIds: ["cand-sofia-reyes", "cand-marie-okonkwo"],
    hiredCandidateId: "cand-sofia-reyes",
    daysOpen: 20,
    slaTone: "fresh",
  },
  {
    id: "brief-acme-eu-liaison",
    clientId: "client-acme-co",
    status: "filled",
    role: "EU ops liaison",
    createdDate: "2025-05-22",
    closedDate: "2025-06-15",
    scope: "CET-anchored ops support · GDPR-aware · 35h/week.",
    budget: { min: 48, max: 56, type: "hourly" },
    shortlistCount: 2,
    shortlistCandidateIds: ["cand-marcus-bauer"],
    hiredCandidateId: "cand-marcus-bauer",
    daysOpen: 24,
    slaTone: "fresh",
  },

  /* ============================================================
     TechFlow Inc
     ============================================================ */
  {
    id: "brief-techflow-prod-support",
    clientId: "client-techflow-inc",
    status: "filled",
    role: "Product team support",
    createdDate: "2025-09-29",
    closedDate: "2025-10-22",
    scope:
      "Embedded with the product team — Linear hygiene, release-notes drafting.",
    budget: { min: 50, max: 58, type: "hourly" },
    shortlistCount: 3,
    shortlistCandidateIds: ["cand-anand-patel", "cand-marcus-bauer"],
    hiredCandidateId: "cand-anand-patel",
    daysOpen: 23,
    slaTone: "fresh",
  },
  {
    id: "brief-techflow-docs",
    clientId: "client-techflow-inc",
    status: "draft",
    role: "DevTools docs writer",
    createdDate: "2026-05-01",
    scope: "Maintain SDK docs site. Markdown + Mintlify familiarity needed.",
    budget: { min: 4500, max: 5200, type: "monthly" },
    shortlistCount: 0,
    shortlistCandidateIds: [],
    daysOpen: 4,
    slaTone: "fresh",
  },
  {
    id: "brief-techflow-eng-ops",
    clientId: "client-techflow-inc",
    status: "filled",
    role: "Engineering project ops",
    createdDate: "2024-11-18",
    closedDate: "2024-12-09",
    scope: "Standup hygiene, sprint planning support, eng-leadership liaison.",
    budget: { min: 48, max: 55, type: "hourly" },
    shortlistCount: 3,
    shortlistCandidateIds: ["cand-marcus-bauer", "cand-anand-patel"],
    hiredCandidateId: "cand-marcus-bauer",
    daysOpen: 21,
    slaTone: "fresh",
  },

  /* ============================================================
     Vertex Health — expansion
     ============================================================ */
  {
    id: "brief-vertex-biotech-1",
    clientId: "client-vertex-health",
    status: "filled",
    role: "Biotech regulatory ops",
    createdDate: "2025-08-29",
    closedDate: "2025-09-18",
    scope:
      "FDA / EMA filing experience. Mandarin a plus. Lab-bench background not required but helpful.",
    budget: { min: 55, max: 65, type: "hourly" },
    shortlistCount: 3,
    shortlistCandidateIds: ["cand-mei-chen", "cand-jomari-dc"],
    hiredCandidateId: "cand-mei-chen",
    daysOpen: 20,
    slaTone: "fresh",
  },
  {
    id: "brief-vertex-lab-coord",
    clientId: "client-vertex-health",
    status: "filled",
    role: "Lab ops coordinator",
    createdDate: "2025-12-09",
    closedDate: "2026-01-07",
    scope: "Lab scheduling + supply ordering. APAC tz preferred.",
    budget: { min: 48, max: 55, type: "hourly" },
    shortlistCount: 4,
    shortlistCandidateIds: ["cand-jomari-dc", "cand-mei-chen"],
    hiredCandidateId: "cand-jomari-dc",
    daysOpen: 29,
    slaTone: "fresh",
  },
  {
    id: "brief-vertex-expand-1",
    clientId: "client-vertex-health",
    status: "open",
    role: "Biotech ops — expansion role",
    createdDate: "2026-05-02",
    scope:
      "Vertex requested 2 more biotech-ops talents. This is slot 1 of 2. Strong regulatory exposure desired.",
    budget: { min: 52, max: 60, type: "hourly" },
    shortlistCount: 2,
    shortlistCandidateIds: ["cand-mei-chen", "cand-hana-reza"],
    daysOpen: 3,
    slaTone: "fresh",
  },
  {
    id: "brief-vertex-expand-2",
    clientId: "client-vertex-health",
    status: "open",
    role: "Biotech ops — expansion role 2",
    createdDate: "2026-05-02",
    scope: "Vertex expansion · slot 2 of 2.",
    budget: { min: 52, max: 60, type: "hourly" },
    shortlistCount: 0,
    shortlistCandidateIds: [],
    daysOpen: 3,
    slaTone: "fresh",
  },

  /* ============================================================
     Lumio Health
     ============================================================ */
  {
    id: "brief-lumio-patient-comms",
    clientId: "client-lumio-health",
    status: "filled",
    role: "Patient-comms support — replacement",
    createdDate: "2026-01-22",
    closedDate: "2026-02-11",
    scope:
      "Replacement after Aaliyah's contract ended early. Behavioral-health domain.",
    budget: { min: 45, max: 52, type: "hourly" },
    shortlistCount: 4,
    shortlistCandidateIds: ["cand-tomas-silva", "cand-marie-okonkwo"],
    hiredCandidateId: "cand-tomas-silva",
    daysOpen: 20,
    slaTone: "fresh",
  },
  {
    id: "brief-lumio-orig",
    clientId: "client-lumio-health",
    status: "filled",
    role: "Patient-comms support",
    createdDate: "2024-07-18",
    closedDate: "2024-08-12",
    scope: "Original patient-comms hire. 50h/week, Spanish a plus.",
    budget: { min: 45, max: 52, type: "hourly" },
    shortlistCount: 4,
    shortlistCandidateIds: ["cand-aaliyah-kone"],
    hiredCandidateId: "cand-aaliyah-kone",
    daysOpen: 25,
    slaTone: "fresh",
  },
  {
    id: "brief-lumio-behavioral",
    clientId: "client-lumio-health",
    status: "closed-no-fill",
    role: "Behavioral health ops — renewal",
    createdDate: "2025-02-01",
    closedDate: "2025-02-28",
    scope: "Did not renew — client paused hiring cycle.",
    budget: { min: 42, max: 48, type: "hourly" },
    shortlistCount: 2,
    shortlistCandidateIds: [],
    daysOpen: 27,
    slaTone: "fresh",
  },

  /* ============================================================
     Mercer Capital
     ============================================================ */
  {
    id: "brief-mercer-bilingual-va",
    clientId: "client-mercer-capital",
    status: "open",
    role: "Bilingual VA",
    createdDate: "2026-04-26",
    scope:
      "1 of 5 matched · need 4 more with QuickBooks + Spanish (LATAM market focus).",
    budget: { min: 45, max: 52, type: "hourly" },
    shortlistCount: 1,
    shortlistCandidateIds: ["cand-tomas-silva"],
    daysOpen: 9,
    slaTone: "warn",
  },
  {
    id: "brief-mercer-exec-support",
    clientId: "client-mercer-capital",
    status: "filled",
    role: "Executive support — investment desk",
    createdDate: "2026-04-04",
    closedDate: "2026-04-22",
    scope: "EA for managing director. Confidentiality-critical.",
    budget: { min: 50, max: 60, type: "hourly" },
    shortlistCount: 3,
    shortlistCandidateIds: ["cand-marie-okonkwo", "cand-anand-patel"],
    hiredCandidateId: "cand-marie-okonkwo",
    daysOpen: 18,
    slaTone: "fresh",
  },
  {
    id: "brief-mercer-investment-ops",
    clientId: "client-mercer-capital",
    status: "filled",
    role: "Investment ops admin",
    createdDate: "2024-09-12",
    closedDate: "2024-10-04",
    scope: "Portfolio admin support. Hourly, async-friendly.",
    budget: { min: 45, max: 52, type: "hourly" },
    shortlistCount: 2,
    shortlistCandidateIds: ["cand-anand-patel"],
    hiredCandidateId: "cand-anand-patel",
    daysOpen: 22,
    slaTone: "fresh",
  },
  {
    id: "brief-mercer-spanish-portfolio",
    clientId: "client-mercer-capital",
    status: "filled",
    role: "Spanish-language portfolio comms",
    createdDate: "2026-01-28",
    closedDate: "2026-02-19",
    scope: "LATAM client-facing comms. Native or near-native Spanish.",
    budget: { min: 48, max: 55, type: "hourly" },
    shortlistCount: 2,
    shortlistCandidateIds: ["cand-tomas-silva", "cand-carmen-lopez"],
    hiredCandidateId: "cand-tomas-silva",
    daysOpen: 22,
    slaTone: "fresh",
  },

  /* ============================================================
     Bengaluru Bio
     ============================================================ */
  {
    id: "brief-bengaluru-apac-ops",
    clientId: "client-bengaluru-bio",
    status: "filled",
    role: "APAC biotech ops",
    createdDate: "2025-11-12",
    closedDate: "2025-12-03",
    scope: "APAC tz, biotech-ops experience preferred.",
    budget: { min: 42, max: 50, type: "hourly" },
    shortlistCount: 3,
    shortlistCandidateIds: ["cand-jomari-dc", "cand-mei-chen"],
    hiredCandidateId: "cand-jomari-dc",
    daysOpen: 21,
    slaTone: "fresh",
  },
  {
    id: "brief-bengaluru-clinical-data",
    clientId: "client-bengaluru-bio",
    status: "draft",
    role: "Clinical-trials data lead",
    createdDate: "2026-05-05",
    scope: "Trial-protocol QA + data hygiene. Looking for Indian / Asian tz.",
    budget: { min: 4800, max: 5500, type: "monthly" },
    shortlistCount: 0,
    shortlistCandidateIds: [],
    daysOpen: 0,
    slaTone: "fresh",
  },
  {
    id: "brief-bengaluru-qa-docs",
    clientId: "client-bengaluru-bio",
    status: "filled",
    role: "QA documentation specialist",
    createdDate: "2024-06-24",
    closedDate: "2024-07-14",
    scope: "Quality-control documentation. Pharma background a plus.",
    budget: { min: 42, max: 48, type: "hourly" },
    shortlistCount: 3,
    shortlistCandidateIds: ["cand-carlos-mendoza"],
    hiredCandidateId: "cand-carlos-mendoza",
    daysOpen: 20,
    slaTone: "fresh",
  },

  /* ============================================================
     Quill & Co — active dispute
     ============================================================ */
  {
    id: "brief-quill-editorial-coord",
    clientId: "client-quill-co",
    status: "filled",
    role: "Editorial coordinator",
    createdDate: "2026-01-02",
    closedDate: "2026-01-21",
    scope:
      "Author-facing editorial coordination. Now in active dispute over hours billed.",
    budget: { min: 40, max: 46, type: "hourly" },
    shortlistCount: 3,
    shortlistCandidateIds: ["cand-sofia-reyes", "cand-marie-okonkwo"],
    hiredCandidateId: "cand-sofia-reyes",
    daysOpen: 19,
    slaTone: "urgent",
  },
  {
    id: "brief-quill-author-relations",
    clientId: "client-quill-co",
    status: "filled",
    role: "Author-relations VA",
    createdDate: "2024-05-20",
    closedDate: "2024-06-10",
    scope: "Author onboarding + manuscript handling.",
    budget: { min: 42, max: 48, type: "hourly" },
    shortlistCount: 3,
    shortlistCandidateIds: ["cand-marie-okonkwo"],
    hiredCandidateId: "cand-marie-okonkwo",
    daysOpen: 21,
    slaTone: "fresh",
  },
  {
    id: "brief-quill-latam",
    clientId: "client-quill-co",
    status: "filled",
    role: "LATAM market editor",
    createdDate: "2024-08-08",
    closedDate: "2024-09-02",
    scope: "Editorial for Spanish-language imprints.",
    budget: { min: 45, max: 52, type: "hourly" },
    shortlistCount: 2,
    shortlistCandidateIds: ["cand-carmen-lopez"],
    hiredCandidateId: "cand-carmen-lopez",
    daysOpen: 25,
    slaTone: "fresh",
  },

  /* ============================================================
     Sahara Logistics — currently inactive
     ============================================================ */
  {
    id: "brief-sahara-freight",
    clientId: "client-sahara-logistics",
    status: "filled",
    role: "Freight desk ops",
    createdDate: "2024-03-15",
    closedDate: "2024-04-08",
    scope: "Multi-region freight operations.",
    budget: { min: 42, max: 50, type: "hourly" },
    shortlistCount: 3,
    shortlistCandidateIds: ["cand-carlos-mendoza"],
    hiredCandidateId: "cand-carlos-mendoza",
    daysOpen: 24,
    slaTone: "fresh",
  },
  {
    id: "brief-sahara-apac",
    clientId: "client-sahara-logistics",
    status: "filled",
    role: "APAC fleet coordinator",
    createdDate: "2023-10-22",
    closedDate: "2023-11-12",
    scope: "APAC region fleet logistics.",
    budget: { min: 40, max: 46, type: "hourly" },
    shortlistCount: 2,
    shortlistCandidateIds: ["cand-jomari-dc"],
    hiredCandidateId: "cand-jomari-dc",
    daysOpen: 21,
    slaTone: "fresh",
  },
  {
    id: "brief-sahara-compliance",
    clientId: "client-sahara-logistics",
    status: "closed-no-fill",
    role: "Cross-border compliance VA",
    createdDate: "2025-01-29",
    closedDate: "2025-02-18",
    scope: "Did not fill — client adjusted requirements.",
    budget: { min: 45, max: 50, type: "hourly" },
    shortlistCount: 1,
    shortlistCandidateIds: [],
    daysOpen: 20,
    slaTone: "fresh",
  },

  /* ============================================================
     Helios Robotics — onboarding stalled
     ============================================================ */
  {
    id: "brief-helios-ops-generalist",
    clientId: "client-helios-robotics",
    status: "draft",
    role: "Robotics ops generalist",
    createdDate: "2026-04-25",
    scope: "First brief — signed 5 days ago, not yet sent.",
    budget: { min: 50, max: 60, type: "hourly" },
    shortlistCount: 0,
    shortlistCandidateIds: [],
    daysOpen: 0,
    slaTone: "warn",
  },

  /* ============================================================
     Saunders SaaS
     ============================================================ */
  {
    id: "brief-saunders-eng-ops",
    clientId: "client-saunders-saas",
    status: "filled",
    role: "Engineering ops support",
    createdDate: "2025-06-30",
    closedDate: "2025-07-21",
    scope: "Sprint operations + release-mgmt support.",
    budget: { min: 45, max: 52, type: "hourly" },
    shortlistCount: 3,
    shortlistCandidateIds: ["cand-marcus-bauer", "cand-anand-patel"],
    hiredCandidateId: "cand-marcus-bauer",
    daysOpen: 21,
    slaTone: "fresh",
  },
  {
    id: "brief-saunders-cx-ops",
    clientId: "client-saunders-saas",
    status: "filled",
    role: "Customer-success ops",
    createdDate: "2024-04-14",
    closedDate: "2024-05-06",
    scope: "CX automation + onboarding tooling.",
    budget: { min: 42, max: 48, type: "hourly" },
    shortlistCount: 3,
    shortlistCandidateIds: ["cand-marie-okonkwo"],
    hiredCandidateId: "cand-marie-okonkwo",
    daysOpen: 22,
    slaTone: "fresh",
  },
  {
    id: "brief-saunders-onboarding",
    clientId: "client-saunders-saas",
    status: "draft",
    role: "Onboarding curriculum writer",
    createdDate: "2026-05-06",
    scope: "Build a customer onboarding curriculum for self-serve SaaS.",
    budget: { min: 4000, max: 4500, type: "monthly" },
    shortlistCount: 0,
    shortlistCandidateIds: [],
    daysOpen: 0,
    slaTone: "fresh",
  },

  /* ============================================================
     Bridgepoint LLC — M&A research
     ============================================================ */
  {
    id: "brief-bridgepoint-research",
    clientId: "client-bridgepoint-llc",
    status: "filled",
    role: "M&A research support",
    createdDate: "2024-11-10",
    closedDate: "2024-12-01",
    scope: "Quarterly M&A research + deal-team document QA.",
    budget: { min: 42, max: 50, type: "hourly" },
    shortlistCount: 2,
    shortlistCandidateIds: ["cand-anand-patel"],
    hiredCandidateId: "cand-anand-patel",
    daysOpen: 21,
    slaTone: "fresh",
  },
  {
    id: "brief-bridgepoint-doc-qa",
    clientId: "client-bridgepoint-llc",
    status: "closed-no-fill",
    role: "Deal-team document QA",
    createdDate: "2023-08-14",
    closedDate: "2023-09-03",
    scope: "Did not renew · contract expired.",
    budget: { min: 38, max: 44, type: "hourly" },
    shortlistCount: 1,
    shortlistCandidateIds: [],
    daysOpen: 20,
    slaTone: "fresh",
  },
  {
    id: "brief-bridgepoint-research-jr",
    clientId: "client-bridgepoint-llc",
    status: "open",
    role: "Junior research analyst",
    createdDate: "2026-04-30",
    scope:
      "Entry-level research support. Bridgepoint is being cautious after the 4.0 review.",
    budget: { min: 40, max: 45, type: "hourly" },
    shortlistCount: 0,
    shortlistCandidateIds: [],
    daysOpen: 5,
    slaTone: "warn",
  },

  /* ============================================================
     Northwind Solutions — churn risk (62 days idle, 2 hires idle)
     ============================================================ */
  {
    id: "brief-northwind-crm-cleanup",
    clientId: "client-northwind",
    status: "filled",
    role: "CRM cleanup project",
    createdDate: "2025-03-20",
    closedDate: "2025-04-10",
    scope: "Salesforce hygiene project — small scope.",
    budget: { min: 42, max: 48, type: "hourly" },
    shortlistCount: 2,
    shortlistCandidateIds: ["cand-carlos-mendoza"],
    hiredCandidateId: "cand-carlos-mendoza",
    daysOpen: 21,
    slaTone: "fresh",
  },
  {
    id: "brief-northwind-sfdc",
    clientId: "client-northwind",
    status: "closed-no-fill",
    role: "Salesforce admin VA",
    createdDate: "2024-07-29",
    closedDate: "2024-08-19",
    scope: "Did not renew — client paused hiring.",
    budget: { min: 42, max: 48, type: "hourly" },
    shortlistCount: 1,
    shortlistCandidateIds: [],
    daysOpen: 21,
    slaTone: "fresh",
  },
  {
    id: "brief-northwind-mktg-ops",
    clientId: "client-northwind",
    status: "closed-no-fill",
    role: "Marketing ops contractor",
    createdDate: "2024-01-09",
    closedDate: "2024-01-29",
    scope: "Filled, completed, did not extend.",
    budget: { min: 38, max: 44, type: "hourly" },
    shortlistCount: 2,
    shortlistCandidateIds: [],
    daysOpen: 20,
    slaTone: "fresh",
  },
];

/** Index helper — `getClientBriefs(clientId)`. */
export function getClientBriefs(
  clientId: string,
): ReadonlyArray<ClientBrief> {
  return clientBriefs.filter((b) => b.clientId === clientId);
}

/** Sub-helper — open vs closed split, used by the briefs panel tabs. */
export function splitBriefs(
  briefs: ReadonlyArray<ClientBrief>,
): { open: ReadonlyArray<ClientBrief>; closed: ReadonlyArray<ClientBrief> } {
  const open: ClientBrief[] = [];
  const closed: ClientBrief[] = [];
  for (const b of briefs) {
    if (
      b.status === "open" ||
      b.status === "shortlist-sent" ||
      b.status === "draft" ||
      b.status === "paused"
    ) {
      open.push(b);
    } else {
      closed.push(b);
    }
  }
  return { open, closed };
}
