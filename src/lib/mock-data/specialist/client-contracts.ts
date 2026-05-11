/**
 * Mock data for the my-clients sheet "View contracts" panel.
 *
 * 12 managed clients × 3-5 contracts each (~40 total). Cross-session IDs:
 * `contract-*` joins to `client-*` (clientId) and `cand-*` (optional
 * candidateId — some contracts are role-level / multi-engagement).
 *
 * `documentUrl` is typed but unpopulated in the prototype — when storage
 * services land, ContractCard's "View document" button consumes
 * `PreviewUnavailableModal kind="document"` until then.
 *
 * Future polish: a separate session can split active/inactive contracts
 * into tabs once the count climbs past ~8/client.
 */

export type ContractStatus =
  /** Signed, in-progress. */
  | "active"
  /** Active, ends in <30 days; renewal nudge column lights up. */
  | "expiring-soon"
  /** Past end date, no renewal. */
  | "expired"
  /** Drafted, not yet signed. */
  | "draft"
  /** Finished cleanly, no renewal needed. */
  | "completed";

export type ContractTerms =
  | { kind: "hourly"; rate: number; estimatedMonthlyHours: number }
  | { kind: "retainer"; monthlyAmount: number };

export type ClientContract = {
  id: string;
  clientId: string;
  /** Cross-session candidate id when role-locked to one talent. */
  candidateId?: string;
  /** Denormalized name for lite reads — saves a candidate-lookup at render. */
  candidateName?: string;
  /** Role title, e.g. "Lead engineer ops". */
  role: string;
  status: ContractStatus;
  /** YYYY-MM-DD. */
  startedDate: string;
  /** YYYY-MM-DD. Optional for retainers / open-ended. */
  endsDate?: string;
  totalHoursLogged: number;
  /** Dollars in mock; real money goes Decimal/cents. */
  totalBilled: number;
  terms: ContractTerms;
  /** Future: storage URL. Empty in prototype. */
  documentUrl?: string;
};

export const clientContracts: ReadonlyArray<ClientContract> = [
  /* ============================================================
     Acme Co — Top Client, 3 active hires
     ============================================================ */
  {
    id: "contract-acme-001",
    clientId: "client-acme-co",
    candidateId: "cand-anand-patel",
    candidateName: "Anand Patel",
    role: "Lead engineer ops",
    status: "active",
    startedDate: "2025-08-12",
    endsDate: "2026-08-11",
    totalHoursLogged: 320,
    totalBilled: 17920,
    terms: { kind: "hourly", rate: 56, estimatedMonthlyHours: 32 },
  },
  {
    id: "contract-acme-002",
    clientId: "client-acme-co",
    candidateId: "cand-aaliyah-kone",
    candidateName: "Aaliyah Koné",
    role: "Customer-success ops",
    status: "active",
    startedDate: "2025-11-04",
    endsDate: "2026-11-03",
    totalHoursLogged: 184,
    totalBilled: 8832,
    terms: { kind: "hourly", rate: 48, estimatedMonthlyHours: 28 },
  },
  {
    id: "contract-acme-003",
    clientId: "client-acme-co",
    candidateId: "cand-marcus-bauer",
    candidateName: "Marcus Bauer",
    role: "EU ops liaison",
    status: "expiring-soon",
    startedDate: "2025-06-15",
    endsDate: "2026-06-14",
    totalHoursLogged: 410,
    totalBilled: 21320,
    terms: { kind: "hourly", rate: 52, estimatedMonthlyHours: 35 },
  },
  {
    id: "contract-acme-004",
    clientId: "client-acme-co",
    candidateId: "cand-sofia-reyes",
    candidateName: "Sofia Reyes",
    role: "Sales ops support",
    status: "completed",
    startedDate: "2024-09-01",
    endsDate: "2025-07-31",
    totalHoursLogged: 624,
    totalBilled: 29952,
    terms: { kind: "hourly", rate: 48, estimatedMonthlyHours: 60 },
  },
  {
    id: "contract-acme-005",
    clientId: "client-acme-co",
    role: "Senior Operations Lead — open brief",
    status: "draft",
    startedDate: "2026-05-04",
    totalHoursLogged: 0,
    totalBilled: 0,
    terms: { kind: "hourly", rate: 60, estimatedMonthlyHours: 32 },
  },

  /* ============================================================
     TechFlow Inc — Trusted, 1 active hire
     ============================================================ */
  {
    id: "contract-techflow-001",
    clientId: "client-techflow-inc",
    candidateId: "cand-anand-patel",
    candidateName: "Anand Patel",
    role: "Product team support",
    status: "active",
    startedDate: "2025-10-22",
    endsDate: "2026-10-21",
    totalHoursLogged: 410,
    totalBilled: 22550,
    terms: { kind: "hourly", rate: 55, estimatedMonthlyHours: 36 },
  },
  {
    id: "contract-techflow-002",
    clientId: "client-techflow-inc",
    candidateId: "cand-marcus-bauer",
    candidateName: "Marcus Bauer",
    role: "Engineering project ops",
    status: "completed",
    startedDate: "2024-12-09",
    endsDate: "2025-09-08",
    totalHoursLogged: 540,
    totalBilled: 27000,
    terms: { kind: "hourly", rate: 50, estimatedMonthlyHours: 60 },
  },
  {
    id: "contract-techflow-003",
    clientId: "client-techflow-inc",
    role: "DevTools docs writer",
    status: "draft",
    startedDate: "2026-05-01",
    totalHoursLogged: 0,
    totalBilled: 0,
    terms: { kind: "retainer", monthlyAmount: 4800 },
  },

  /* ============================================================
     Vertex Health — Expansion ask
     ============================================================ */
  {
    id: "contract-vertex-001",
    clientId: "client-vertex-health",
    candidateId: "cand-mei-chen",
    candidateName: "Mei Chen",
    role: "Biotech regulatory ops",
    status: "active",
    startedDate: "2025-09-18",
    endsDate: "2026-09-17",
    totalHoursLogged: 246,
    totalBilled: 14760,
    terms: { kind: "hourly", rate: 60, estimatedMonthlyHours: 30 },
  },
  {
    id: "contract-vertex-002",
    clientId: "client-vertex-health",
    candidateId: "cand-jomari-dc",
    candidateName: "Jomari Dela Cruz",
    role: "Lab ops coordinator",
    status: "active",
    startedDate: "2026-01-07",
    endsDate: "2027-01-06",
    totalHoursLogged: 96,
    totalBilled: 4992,
    terms: { kind: "hourly", rate: 52, estimatedMonthlyHours: 24 },
  },
  {
    id: "contract-vertex-003",
    clientId: "client-vertex-health",
    role: "Biotech ops — expansion role",
    status: "draft",
    startedDate: "2026-05-02",
    totalHoursLogged: 0,
    totalBilled: 0,
    terms: { kind: "hourly", rate: 58, estimatedMonthlyHours: 28 },
  },
  {
    id: "contract-vertex-004",
    clientId: "client-vertex-health",
    role: "Biotech ops — expansion role 2",
    status: "draft",
    startedDate: "2026-05-02",
    totalHoursLogged: 0,
    totalBilled: 0,
    terms: { kind: "hourly", rate: 58, estimatedMonthlyHours: 28 },
  },

  /* ============================================================
     Lumio Health — clean record, one ended early
     ============================================================ */
  {
    id: "contract-lumio-001",
    clientId: "client-lumio-health",
    candidateId: "cand-tomas-silva",
    candidateName: "Tomás Silva",
    role: "Patient-comms support",
    status: "active",
    startedDate: "2026-02-11",
    endsDate: "2027-02-10",
    totalHoursLogged: 56,
    totalBilled: 2688,
    terms: { kind: "hourly", rate: 48, estimatedMonthlyHours: 30 },
  },
  {
    id: "contract-lumio-002",
    clientId: "client-lumio-health",
    candidateId: "cand-aaliyah-kone",
    candidateName: "Aaliyah Koné",
    role: "Patient-comms support",
    status: "completed",
    startedDate: "2024-08-12",
    endsDate: "2025-12-31",
    totalHoursLogged: 720,
    totalBilled: 34560,
    terms: { kind: "hourly", rate: 48, estimatedMonthlyHours: 50 },
  },
  {
    id: "contract-lumio-003",
    clientId: "client-lumio-health",
    role: "Behavioral health ops",
    status: "expired",
    startedDate: "2024-03-01",
    endsDate: "2025-02-28",
    totalHoursLogged: 340,
    totalBilled: 14620,
    terms: { kind: "hourly", rate: 43, estimatedMonthlyHours: 30 },
  },

  /* ============================================================
     Mercer Capital — VIP, frequent hires
     ============================================================ */
  {
    id: "contract-mercer-001",
    clientId: "client-mercer-capital",
    candidateId: "cand-anand-patel",
    candidateName: "Anand Patel",
    role: "Investment ops admin",
    status: "completed",
    startedDate: "2024-10-04",
    endsDate: "2025-04-03",
    totalHoursLogged: 95,
    totalBilled: 4750,
    terms: { kind: "hourly", rate: 50, estimatedMonthlyHours: 16 },
  },
  {
    id: "contract-mercer-002",
    clientId: "client-mercer-capital",
    candidateId: "cand-marie-okonkwo",
    candidateName: "Marie Okonkwo",
    role: "Executive support — investment desk",
    status: "active",
    startedDate: "2026-04-22",
    endsDate: "2027-04-21",
    totalHoursLogged: 28,
    totalBilled: 1456,
    terms: { kind: "hourly", rate: 52, estimatedMonthlyHours: 24 },
  },
  {
    id: "contract-mercer-003",
    clientId: "client-mercer-capital",
    role: "Bilingual VA — open brief",
    status: "draft",
    startedDate: "2026-05-01",
    totalHoursLogged: 0,
    totalBilled: 0,
    terms: { kind: "hourly", rate: 48, estimatedMonthlyHours: 30 },
  },
  {
    id: "contract-mercer-004",
    clientId: "client-mercer-capital",
    candidateId: "cand-tomas-silva",
    candidateName: "Tomás Silva",
    role: "Spanish-language portfolio comms",
    status: "active",
    startedDate: "2026-02-19",
    endsDate: "2027-02-18",
    totalHoursLogged: 88,
    totalBilled: 4400,
    terms: { kind: "hourly", rate: 50, estimatedMonthlyHours: 22 },
  },

  /* ============================================================
     Bengaluru Bio — Trusted, regional
     ============================================================ */
  {
    id: "contract-bengaluru-001",
    clientId: "client-bengaluru-bio",
    candidateId: "cand-jomari-dc",
    candidateName: "Jomari Dela Cruz",
    role: "APAC biotech ops",
    status: "active",
    startedDate: "2025-12-03",
    endsDate: "2026-12-02",
    totalHoursLogged: 142,
    totalBilled: 6390,
    terms: { kind: "hourly", rate: 45, estimatedMonthlyHours: 28 },
  },
  {
    id: "contract-bengaluru-002",
    clientId: "client-bengaluru-bio",
    role: "Clinical-trials data lead",
    status: "draft",
    startedDate: "2026-05-05",
    totalHoursLogged: 0,
    totalBilled: 0,
    terms: { kind: "retainer", monthlyAmount: 5200 },
  },
  {
    id: "contract-bengaluru-003",
    clientId: "client-bengaluru-bio",
    candidateId: "cand-carlos-mendoza",
    candidateName: "Carlos Mendoza",
    role: "QA documentation specialist",
    status: "completed",
    startedDate: "2024-07-14",
    endsDate: "2025-08-13",
    totalHoursLogged: 480,
    totalBilled: 21600,
    terms: { kind: "hourly", rate: 45, estimatedMonthlyHours: 38 },
  },

  /* ============================================================
     Quill & Co — active dispute (DSP-2026-04-12)
     ============================================================ */
  {
    id: "contract-quill-001",
    clientId: "client-quill-co",
    candidateId: "cand-sofia-reyes",
    candidateName: "Sofia Reyes",
    role: "Editorial coordinator",
    status: "active",
    startedDate: "2026-01-21",
    endsDate: "2027-01-20",
    totalHoursLogged: 200,
    totalBilled: 8400,
    terms: { kind: "hourly", rate: 42, estimatedMonthlyHours: 25 },
  },
  {
    id: "contract-quill-002",
    clientId: "client-quill-co",
    candidateId: "cand-marie-okonkwo",
    candidateName: "Marie Okonkwo",
    role: "Author-relations VA",
    status: "completed",
    startedDate: "2024-06-10",
    endsDate: "2025-06-09",
    totalHoursLogged: 540,
    totalBilled: 24300,
    terms: { kind: "hourly", rate: 45, estimatedMonthlyHours: 45 },
  },
  {
    id: "contract-quill-003",
    clientId: "client-quill-co",
    role: "Editorial team support",
    status: "expired",
    startedDate: "2024-01-15",
    endsDate: "2025-01-14",
    totalHoursLogged: 410,
    totalBilled: 16400,
    terms: { kind: "hourly", rate: 40, estimatedMonthlyHours: 34 },
  },
  {
    id: "contract-quill-004",
    clientId: "client-quill-co",
    candidateId: "cand-carmen-lopez",
    candidateName: "Carmen López",
    role: "LATAM market editor",
    status: "completed",
    startedDate: "2024-09-02",
    endsDate: "2025-03-01",
    totalHoursLogged: 168,
    totalBilled: 8064,
    terms: { kind: "hourly", rate: 48, estimatedMonthlyHours: 28 },
  },

  /* ============================================================
     Sahara Logistics — Trusted, all completed (currently inactive)
     ============================================================ */
  {
    id: "contract-sahara-001",
    clientId: "client-sahara-logistics",
    candidateId: "cand-carlos-mendoza",
    candidateName: "Carlos Mendoza",
    role: "Freight desk ops",
    status: "completed",
    startedDate: "2024-04-08",
    endsDate: "2025-10-07",
    totalHoursLogged: 920,
    totalBilled: 41400,
    terms: { kind: "hourly", rate: 45, estimatedMonthlyHours: 50 },
  },
  {
    id: "contract-sahara-002",
    clientId: "client-sahara-logistics",
    candidateId: "cand-jomari-dc",
    candidateName: "Jomari Dela Cruz",
    role: "APAC fleet coordinator",
    status: "completed",
    startedDate: "2023-11-12",
    endsDate: "2024-12-31",
    totalHoursLogged: 760,
    totalBilled: 31920,
    terms: { kind: "hourly", rate: 42, estimatedMonthlyHours: 52 },
  },
  {
    id: "contract-sahara-003",
    clientId: "client-sahara-logistics",
    role: "Cross-border compliance VA",
    status: "expired",
    startedDate: "2024-02-19",
    endsDate: "2025-02-18",
    totalHoursLogged: 312,
    totalBilled: 14040,
    terms: { kind: "hourly", rate: 45, estimatedMonthlyHours: 26 },
  },

  /* ============================================================
     Helios Robotics — onboarding stalled
     ============================================================ */
  {
    id: "contract-helios-001",
    clientId: "client-helios-robotics",
    role: "Robotics ops generalist",
    status: "draft",
    startedDate: "2026-04-25",
    totalHoursLogged: 0,
    totalBilled: 0,
    terms: { kind: "hourly", rate: 55, estimatedMonthlyHours: 30 },
  },

  /* ============================================================
     Saunders SaaS — Trusted
     ============================================================ */
  {
    id: "contract-saunders-001",
    clientId: "client-saunders-saas",
    candidateId: "cand-marcus-bauer",
    candidateName: "Marcus Bauer",
    role: "Engineering ops support",
    status: "active",
    startedDate: "2025-07-21",
    endsDate: "2026-07-20",
    totalHoursLogged: 286,
    totalBilled: 13728,
    terms: { kind: "hourly", rate: 48, estimatedMonthlyHours: 26 },
  },
  {
    id: "contract-saunders-002",
    clientId: "client-saunders-saas",
    candidateId: "cand-marie-okonkwo",
    candidateName: "Marie Okonkwo",
    role: "Customer-success ops",
    status: "completed",
    startedDate: "2024-05-06",
    endsDate: "2025-07-05",
    totalHoursLogged: 580,
    totalBilled: 26100,
    terms: { kind: "hourly", rate: 45, estimatedMonthlyHours: 41 },
  },
  {
    id: "contract-saunders-003",
    clientId: "client-saunders-saas",
    role: "Onboarding curriculum writer",
    status: "draft",
    startedDate: "2026-05-06",
    totalHoursLogged: 0,
    totalBilled: 0,
    terms: { kind: "retainer", monthlyAmount: 4200 },
  },

  /* ============================================================
     Bridgepoint LLC — M&A research (less engaged)
     ============================================================ */
  {
    id: "contract-bridgepoint-001",
    clientId: "client-bridgepoint-llc",
    candidateId: "cand-anand-patel",
    candidateName: "Anand Patel",
    role: "M&A research support",
    status: "completed",
    startedDate: "2024-12-01",
    endsDate: "2025-05-31",
    totalHoursLogged: 75,
    totalBilled: 3375,
    terms: { kind: "hourly", rate: 45, estimatedMonthlyHours: 12 },
  },
  {
    id: "contract-bridgepoint-002",
    clientId: "client-bridgepoint-llc",
    role: "Deal-team document QA",
    status: "expired",
    startedDate: "2023-09-04",
    endsDate: "2024-09-03",
    totalHoursLogged: 240,
    totalBilled: 9600,
    terms: { kind: "hourly", rate: 40, estimatedMonthlyHours: 20 },
  },
  {
    id: "contract-bridgepoint-003",
    clientId: "client-bridgepoint-llc",
    role: "Junior research analyst",
    status: "draft",
    startedDate: "2026-04-30",
    totalHoursLogged: 0,
    totalBilled: 0,
    terms: { kind: "hourly", rate: 42, estimatedMonthlyHours: 16 },
  },

  /* ============================================================
     Northwind Solutions — churn risk (62 days idle)
     ============================================================ */
  {
    id: "contract-northwind-001",
    clientId: "client-northwind",
    candidateId: "cand-carlos-mendoza",
    candidateName: "Carlos Mendoza",
    role: "CRM cleanup project",
    status: "completed",
    startedDate: "2025-04-10",
    endsDate: "2025-12-09",
    totalHoursLogged: 60,
    totalBilled: 2700,
    terms: { kind: "hourly", rate: 45, estimatedMonthlyHours: 8 },
  },
  {
    id: "contract-northwind-002",
    clientId: "client-northwind",
    role: "Salesforce admin VA",
    status: "expired",
    startedDate: "2024-08-20",
    endsDate: "2025-08-19",
    totalHoursLogged: 196,
    totalBilled: 8820,
    terms: { kind: "hourly", rate: 45, estimatedMonthlyHours: 18 },
  },
  {
    id: "contract-northwind-003",
    clientId: "client-northwind",
    role: "Marketing ops contractor",
    status: "expired",
    startedDate: "2024-01-29",
    endsDate: "2024-12-31",
    totalHoursLogged: 110,
    totalBilled: 4400,
    terms: { kind: "hourly", rate: 40, estimatedMonthlyHours: 12 },
  },
];

/** Index helper — `getClientContracts(clientId)`. */
export function getClientContracts(
  clientId: string,
): ReadonlyArray<ClientContract> {
  return clientContracts.filter((c) => c.clientId === clientId);
}
