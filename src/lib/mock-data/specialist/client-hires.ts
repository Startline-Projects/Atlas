/**
 * Mock data for the my-clients sheet "Hiring history" panel.
 *
 * 12 managed clients × 3-5 hires each (~40 total). Cross-session IDs:
 * `hire-*` joins to `client-*`, `cand-*`, `contract-*` (backlink),
 * and `DSP-*` for hires that came under dispute.
 *
 * Each hire is the lifecycle row backing a contract:
 *   - one Anand contract at Acme → one `hire-acme-anand` row
 *   - active vs completed vs paused vs off-boarded
 *
 * The dispute backlink (Acme × Sofia → DSP-2026-04-12) is the recurring
 * cross-session example used across review-queue / dashboard / topbar
 * notifications. Keeping the join discoverable here lets a future
 * "Hire history → linked dispute" affordance route into the disputes
 * view.
 */

export type HireStatus =
  | "active"
  | "completed"
  | "paused"
  | "off-boarded";

export type ClientHireFull = {
  id: string;
  clientId: string;
  candidateId: string;
  candidateName: string;
  role: string;
  startedDate: string;
  endedDate?: string;
  status: HireStatus;
  totalHours: number;
  totalEarnings: number;
  rating?: number;
  notes?: string;
  /** Backlink to the contract row. */
  contractId?: string;
  /** Backlink to a dispute when the hire came under contention. */
  disputeId?: string;
};

export const clientHires: ReadonlyArray<ClientHireFull> = [
  /* ============================================================
     Acme Co
     ============================================================ */
  {
    id: "hire-acme-anand",
    clientId: "client-acme-co",
    candidateId: "cand-anand-patel",
    candidateName: "Anand Patel",
    role: "Lead engineer ops",
    startedDate: "2025-08-12",
    status: "active",
    totalHours: 320,
    totalEarnings: 17920,
    rating: 5.0,
    notes: "Top performer — Sarah Lin requested extension twice.",
    contractId: "contract-acme-001",
  },
  {
    id: "hire-acme-aaliyah",
    clientId: "client-acme-co",
    candidateId: "cand-aaliyah-kone",
    candidateName: "Aaliyah Koné",
    role: "Customer-success ops",
    startedDate: "2025-11-04",
    status: "active",
    totalHours: 184,
    totalEarnings: 8832,
    rating: 4.7,
    notes: "Steady cadence. CX team rates her highly.",
    contractId: "contract-acme-002",
  },
  {
    id: "hire-acme-marcus",
    clientId: "client-acme-co",
    candidateId: "cand-marcus-bauer",
    candidateName: "Marcus Bauer",
    role: "EU ops liaison",
    startedDate: "2025-06-15",
    status: "active",
    totalHours: 410,
    totalEarnings: 21320,
    rating: 4.8,
    notes: "Renewal coming up — Acme has signalled likely extension.",
    contractId: "contract-acme-003",
  },
  {
    id: "hire-acme-sofia",
    clientId: "client-acme-co",
    candidateId: "cand-sofia-reyes",
    candidateName: "Sofia Reyes",
    role: "Sales ops support",
    startedDate: "2024-09-01",
    endedDate: "2025-07-31",
    status: "completed",
    totalHours: 624,
    totalEarnings: 29952,
    rating: 4.2,
    notes:
      "Active dispute over hours billed in final week — see DSP-2026-04-12.",
    contractId: "contract-acme-004",
    disputeId: "DSP-2026-04-12",
  },

  /* ============================================================
     TechFlow Inc
     ============================================================ */
  {
    id: "hire-techflow-anand",
    clientId: "client-techflow-inc",
    candidateId: "cand-anand-patel",
    candidateName: "Anand Patel",
    role: "Product team support",
    startedDate: "2025-10-22",
    status: "active",
    totalHours: 410,
    totalEarnings: 22550,
    rating: 5.0,
    notes: "Two extension reviews logged.",
    contractId: "contract-techflow-001",
  },
  {
    id: "hire-techflow-marcus",
    clientId: "client-techflow-inc",
    candidateId: "cand-marcus-bauer",
    candidateName: "Marcus Bauer",
    role: "Engineering project ops",
    startedDate: "2024-12-09",
    endedDate: "2025-09-08",
    status: "completed",
    totalHours: 540,
    totalEarnings: 27000,
    rating: 4.6,
    notes: "Completed cleanly. Client open to re-engagement.",
    contractId: "contract-techflow-002",
  },

  /* ============================================================
     Vertex Health
     ============================================================ */
  {
    id: "hire-vertex-mei",
    clientId: "client-vertex-health",
    candidateId: "cand-mei-chen",
    candidateName: "Mei Chen",
    role: "Biotech regulatory ops",
    startedDate: "2025-09-18",
    status: "active",
    totalHours: 246,
    totalEarnings: 14760,
    rating: 4.9,
    notes: "FDA filing season — heavy lift well-handled.",
    contractId: "contract-vertex-001",
  },
  {
    id: "hire-vertex-jomari",
    clientId: "client-vertex-health",
    candidateId: "cand-jomari-dc",
    candidateName: "Jomari Dela Cruz",
    role: "Lab ops coordinator",
    startedDate: "2026-01-07",
    status: "active",
    totalHours: 96,
    totalEarnings: 4992,
    rating: 4.8,
    contractId: "contract-vertex-002",
  },

  /* ============================================================
     Lumio Health
     ============================================================ */
  {
    id: "hire-lumio-tomas",
    clientId: "client-lumio-health",
    candidateId: "cand-tomas-silva",
    candidateName: "Tomás Silva",
    role: "Patient-comms support",
    startedDate: "2026-02-11",
    status: "active",
    totalHours: 56,
    totalEarnings: 2688,
    rating: 4.6,
    notes: "Replacement after Aaliyah's contract ended early.",
    contractId: "contract-lumio-001",
  },
  {
    id: "hire-lumio-aaliyah",
    clientId: "client-lumio-health",
    candidateId: "cand-aaliyah-kone",
    candidateName: "Aaliyah Koné",
    role: "Patient-comms support",
    startedDate: "2024-08-12",
    endedDate: "2025-12-31",
    status: "completed",
    totalHours: 720,
    totalEarnings: 34560,
    rating: 4.4,
    notes: "Ended early — see candidate notes for re-cert flag.",
    contractId: "contract-lumio-002",
  },

  /* ============================================================
     Mercer Capital
     ============================================================ */
  {
    id: "hire-mercer-marie",
    clientId: "client-mercer-capital",
    candidateId: "cand-marie-okonkwo",
    candidateName: "Marie Okonkwo",
    role: "Executive support — investment desk",
    startedDate: "2026-04-22",
    status: "active",
    totalHours: 28,
    totalEarnings: 1456,
    rating: 4.9,
    notes: "Fresh hire — first week ratings outstanding.",
    contractId: "contract-mercer-002",
  },
  {
    id: "hire-mercer-anand",
    clientId: "client-mercer-capital",
    candidateId: "cand-anand-patel",
    candidateName: "Anand Patel",
    role: "Investment ops admin",
    startedDate: "2024-10-04",
    endedDate: "2025-04-03",
    status: "completed",
    totalHours: 95,
    totalEarnings: 4750,
    rating: 5.0,
    notes: "Short-term project. Mercer wants Anand back when capacity allows.",
    contractId: "contract-mercer-001",
  },
  {
    id: "hire-mercer-tomas",
    clientId: "client-mercer-capital",
    candidateId: "cand-tomas-silva",
    candidateName: "Tomás Silva",
    role: "Spanish-language portfolio comms",
    startedDate: "2026-02-19",
    status: "active",
    totalHours: 88,
    totalEarnings: 4400,
    rating: 4.8,
    contractId: "contract-mercer-004",
  },

  /* ============================================================
     Bengaluru Bio
     ============================================================ */
  {
    id: "hire-bengaluru-jomari",
    clientId: "client-bengaluru-bio",
    candidateId: "cand-jomari-dc",
    candidateName: "Jomari Dela Cruz",
    role: "APAC biotech ops",
    startedDate: "2025-12-03",
    status: "active",
    totalHours: 142,
    totalEarnings: 6390,
    rating: 4.7,
    contractId: "contract-bengaluru-001",
  },
  {
    id: "hire-bengaluru-carlos",
    clientId: "client-bengaluru-bio",
    candidateId: "cand-carlos-mendoza",
    candidateName: "Carlos Mendoza",
    role: "QA documentation specialist",
    startedDate: "2024-07-14",
    endedDate: "2025-08-13",
    status: "completed",
    totalHours: 480,
    totalEarnings: 21600,
    rating: 4.6,
    contractId: "contract-bengaluru-003",
  },

  /* ============================================================
     Quill & Co — active dispute
     ============================================================ */
  {
    id: "hire-quill-sofia",
    clientId: "client-quill-co",
    candidateId: "cand-sofia-reyes",
    candidateName: "Sofia Reyes",
    role: "Editorial coordinator",
    startedDate: "2026-01-21",
    status: "paused",
    totalHours: 200,
    totalEarnings: 8400,
    rating: 4.0,
    notes:
      "Hire is paused pending dispute resolution. Quill alleges over-billed prep hours.",
    contractId: "contract-quill-001",
    disputeId: "DSP-2026-04-12",
  },
  {
    id: "hire-quill-marie",
    clientId: "client-quill-co",
    candidateId: "cand-marie-okonkwo",
    candidateName: "Marie Okonkwo",
    role: "Author-relations VA",
    startedDate: "2024-06-10",
    endedDate: "2025-06-09",
    status: "completed",
    totalHours: 540,
    totalEarnings: 24300,
    rating: 4.5,
    contractId: "contract-quill-002",
  },
  {
    id: "hire-quill-carmen",
    clientId: "client-quill-co",
    candidateId: "cand-carmen-lopez",
    candidateName: "Carmen López",
    role: "LATAM market editor",
    startedDate: "2024-09-02",
    endedDate: "2025-03-01",
    status: "completed",
    totalHours: 168,
    totalEarnings: 8064,
    rating: 4.8,
    contractId: "contract-quill-004",
  },

  /* ============================================================
     Sahara Logistics — historical, all completed
     ============================================================ */
  {
    id: "hire-sahara-carlos",
    clientId: "client-sahara-logistics",
    candidateId: "cand-carlos-mendoza",
    candidateName: "Carlos Mendoza",
    role: "Freight desk ops",
    startedDate: "2024-04-08",
    endedDate: "2025-10-07",
    status: "completed",
    totalHours: 920,
    totalEarnings: 41400,
    rating: 4.7,
    contractId: "contract-sahara-001",
  },
  {
    id: "hire-sahara-jomari",
    clientId: "client-sahara-logistics",
    candidateId: "cand-jomari-dc",
    candidateName: "Jomari Dela Cruz",
    role: "APAC fleet coordinator",
    startedDate: "2023-11-12",
    endedDate: "2024-12-31",
    status: "completed",
    totalHours: 760,
    totalEarnings: 31920,
    rating: 4.6,
    contractId: "contract-sahara-002",
  },

  /* ============================================================
     Helios Robotics — no hires yet (onboarding stalled)
     ============================================================ */
  /* (intentionally empty — onboarding has not yet placed a hire) */

  /* ============================================================
     Saunders SaaS
     ============================================================ */
  {
    id: "hire-saunders-marcus",
    clientId: "client-saunders-saas",
    candidateId: "cand-marcus-bauer",
    candidateName: "Marcus Bauer",
    role: "Engineering ops support",
    startedDate: "2025-07-21",
    status: "active",
    totalHours: 286,
    totalEarnings: 13728,
    rating: 4.8,
    contractId: "contract-saunders-001",
  },
  {
    id: "hire-saunders-marie",
    clientId: "client-saunders-saas",
    candidateId: "cand-marie-okonkwo",
    candidateName: "Marie Okonkwo",
    role: "Customer-success ops",
    startedDate: "2024-05-06",
    endedDate: "2025-07-05",
    status: "completed",
    totalHours: 580,
    totalEarnings: 26100,
    rating: 4.7,
    contractId: "contract-saunders-002",
  },

  /* ============================================================
     Bridgepoint LLC
     ============================================================ */
  {
    id: "hire-bridgepoint-anand",
    clientId: "client-bridgepoint-llc",
    candidateId: "cand-anand-patel",
    candidateName: "Anand Patel",
    role: "M&A research support",
    startedDate: "2024-12-01",
    endedDate: "2025-05-31",
    status: "completed",
    totalHours: 75,
    totalEarnings: 3375,
    rating: 4.0,
    notes:
      "Only sub-5★ score in Anand's history. Bridgepoint flagged pacing on M&A research — wasn't core domain.",
    contractId: "contract-bridgepoint-001",
  },

  /* ============================================================
     Northwind Solutions
     ============================================================ */
  {
    id: "hire-northwind-carlos",
    clientId: "client-northwind",
    candidateId: "cand-carlos-mendoza",
    candidateName: "Carlos Mendoza",
    role: "CRM cleanup project",
    startedDate: "2025-04-10",
    endedDate: "2025-12-09",
    status: "completed",
    totalHours: 60,
    totalEarnings: 2700,
    rating: 4.5,
    notes: "Clean engagement. Northwind has gone quiet since.",
    contractId: "contract-northwind-001",
  },
];

/** Index helper — `getClientHires(clientId)`. */
export function getClientHires(
  clientId: string,
): ReadonlyArray<ClientHireFull> {
  return clientHires.filter((h) => h.clientId === clientId);
}
