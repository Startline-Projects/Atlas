/**
 * Mock data for `/specialist/my-clients` — clients in the specialist's
 * role category.
 *
 * Spec rules (PDF Step 7):
 *   - Specialists see full client profiles within their category (real
 *     company names, contact info, hiring history). UI carries
 *     `fullProfileVisible: boolean` per client; out-of-category clients
 *     would render anonymized — a future-session concern.
 *   - **PDF-vs-HTML deviation:** PDF describes Trust tier (New /
 *     Trusted / Top Client) as the primary classification. The HTML
 *     uses a different cohort filter (Active / Onboarding / Paused /
 *     At-risk) as the visible filter and treats trust tier as a
 *     secondary tag shown in the slide-over sheet. Per the standing
 *     "HTML wins" rule, the visible filter follows the HTML; trust
 *     tier is carried as a secondary field. If product revisits, the
 *     trust tier becomes the primary cohort filter. See CONVERSION_LOG.
 *   - Open-dispute-on-client-behalf is a rare action — UI surfaces it
 *     but no enforcement; future service must guard.
 *   - VIP / special-handling flag is per-client; one mock client
 *     carries it. UI tag rendered when `isVip === true`.
 */

/* ============================================================
   Types & enums
   ============================================================ */

/** PDF-defined trust tiers. Carried but not used as the primary filter. */
export type ClientTrustTier = "New" | "Trusted" | "Top Client";

/** HTML cohort filter chips (visible). */
export const CLIENT_COHORTS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "onboarding", label: "Onboarding" },
  { key: "paused", label: "Paused", tone: "danger" as const },
  { key: "at-risk", label: "At risk", tone: "attention" as const },
] as const;
export type ClientCohort = (typeof CLIENT_COHORTS)[number]["key"];

/** Company-size filter (additional select). */
export const CLIENT_SIZE_FILTERS = [
  { key: "all", label: "All sizes" },
  { key: "seed", label: "Seed (1–20)" },
  { key: "early", label: "Early (21–80)" },
  { key: "mid", label: "Mid (81–250)" },
  { key: "large", label: "Large (250+)" },
] as const;
export type ClientSize = (typeof CLIENT_SIZE_FILTERS)[number]["key"];

/** Sort options. */
export const CLIENT_SORT_OPTIONS = [
  { key: "recent", label: "Recent activity" },
  { key: "spend", label: "Total spend (high)" },
  { key: "hires", label: "Most hires" },
  { key: "name", label: "Name (A–Z)" },
  { key: "rating", label: "Their rating" },
] as const;

/** Attention-strip tone variants from the HTML. */
export type ClientAttentionTone = "danger" | "warn" | "expanding" | "info";

export type ClientAttentionCard = {
  clientId: string;
  tone: ClientAttentionTone;
  tagLabel: string;
  detail: ReadonlyArray<
    | { kind: "text"; value: string }
    | { kind: "strong"; value: string }
  >;
};

/* ============================================================
   Sub-shapes
   ============================================================ */

/**
 * Per-hire summary on the client's slide-over sheet.
 * References candidates via canonical id; hires from outside
 * the specialist's category would be out-of-scope for now.
 */
export type ClientHireSummary = {
  candidateId: string;
  candidateName: string;
  candidateInitials: string;
  candidateGradient: 1 | 2 | 3 | 4 | 5;
  role: string;
  hours: number;
  rating?: number;
  status: "active" | "completed" | "paused";
};

export type ClientTimelineEvent = {
  id: string;
  kind:
    | "hire"
    | "brief-sent"
    | "brief-received"
    | "review-left"
    | "dispute-opened"
    | "dispute-resolved"
    | "engagement-completed"
    | "expansion-ask"
    | "client-message"
    | "specialist-message";
  text: string;
  when: string;
};

/* ============================================================
   The ManagedClient shape
   ============================================================ */

export type ManagedClient = {
  id: string;
  /** Display name shown to specialists. */
  companyName: string;
  /** Short logo glyph (2 chars). */
  logoInitials: string;
  /** Decorative logo gradient bucket 1–4. */
  logoGradient: 1 | 2 | 3 | 4;
  /** "B2B SaaS · 200 employees · San Francisco, USA" */
  metaLine: string;
  /** Industry — used by future filters; carried but not in UI yet. */
  industry: string;
  size: ClientSize;
  city: string;
  countryFlag: string;
  countryName: string;

  /** Specialist's view scope. PDF rule: full profile visible within category. */
  fullProfileVisible: boolean;

  /** Cohort assignment (drives the HTML filter chip). */
  cohort: Exclude<ClientCohort, "all">;
  /** Trust tier — secondary tag shown in the sheet. */
  trustTier: ClientTrustTier;
  /** VIP flag — renders a star tag when true. */
  isVip: boolean;
  /** Verified-account badge. */
  verified: boolean;

  /* roster table metrics */
  /** Status pill in the table (label only — color follows cohort). */
  healthLabel: string;
  activeHires: number;
  totalSpendLabel: string; // "$84.2k"
  /** Their rating of us — clients rate the specialist's work. 1-5. */
  rating: number;
  /** Last brief activity ("2d", "62d") — drives the "last brief" column. */
  lastBriefLabel: string;
  daysSinceLastBrief: number;

  /* slide-over sheet preview */
  /** Active hires from the specialist's pool. */
  hiresPreview: ReadonlyArray<ClientHireSummary>;
  briefsTotal: number;
  briefsLastLabel: string;
  activityPreview: ReadonlyArray<ClientTimelineEvent>;
  /** Aggregate spend over time, in dollars. Sheet stat. */
  totalSpendDollars: number;
};

/* ============================================================
   Attention strip — drives the attention-this-week cards
   ============================================================ */

export const clientAttentionCards: ReadonlyArray<ClientAttentionCard> = [
  {
    clientId: "client-quill-co",
    tone: "danger",
    tagLabel: "Dispute",
    detail: [
      { kind: "text", value: "Active dispute · payment delay claim from " },
      { kind: "strong", value: "Sofia Reyes" },
    ],
  },
  {
    clientId: "client-northwind",
    tone: "warn",
    tagLabel: "Churn risk",
    detail: [
      { kind: "text", value: "Churn signal · " },
      { kind: "strong", value: "62 days" },
      { kind: "text", value: " since last brief · 2 hires idle" },
    ],
  },
  {
    clientId: "client-vertex-health",
    tone: "expanding",
    tagLabel: "Expansion",
    detail: [
      { kind: "text", value: "Expansion ask · requested " },
      { kind: "strong", value: "2 more talents" },
      { kind: "text", value: " for biotech ops team" },
    ],
  },
  {
    clientId: "client-helios-robotics",
    tone: "info",
    tagLabel: "New · stalled",
    detail: [
      { kind: "text", value: "Onboarding stalled · signed 5 days ago, no first brief sent" },
    ],
  },
];

/* ============================================================
   The 12 managed clients
   ============================================================ */

const acme: ManagedClient = {
  id: "client-acme-co",
  companyName: "Acme Co",
  logoInitials: "AC",
  logoGradient: 1,
  metaLine: "B2B SaaS · 200 employees · San Francisco, USA",
  industry: "B2B SaaS",
  size: "mid",
  city: "San Francisco",
  countryFlag: "🇺🇸",
  countryName: "USA",
  fullProfileVisible: true,
  cohort: "active",
  trustTier: "Top Client",
  isVip: true,
  verified: true,
  healthLabel: "Strong",
  activeHires: 3,
  totalSpendLabel: "$84.2k",
  rating: 4.9,
  lastBriefLabel: "2d",
  daysSinceLastBrief: 2,
  hiresPreview: [
    {
      candidateId: "cand-anand-patel",
      candidateName: "Anand Patel",
      candidateInitials: "A",
      candidateGradient: 3,
      role: "Lead engineer ops",
      hours: 320,
      rating: 5.0,
      status: "active",
    },
  ],
  briefsTotal: 14,
  briefsLastLabel: "2d",
  activityPreview: [
    {
      id: "act-acme-1",
      kind: "brief-sent",
      text: "Sent shortlist for Senior Operations Lead role.",
      when: "2d ago",
    },
    {
      id: "act-acme-2",
      kind: "review-left",
      text: "Sarah Lin left a 5★ review for Anand Patel.",
      when: "2 weeks ago",
    },
  ],
  totalSpendDollars: 84200,
};

const techflow: ManagedClient = {
  id: "client-techflow-inc",
  companyName: "TechFlow Inc",
  logoInitials: "TF",
  logoGradient: 2,
  metaLine: "Developer tools SaaS · 80 employees · Austin, USA",
  industry: "Developer tools",
  size: "early",
  city: "Austin",
  countryFlag: "🇺🇸",
  countryName: "USA",
  fullProfileVisible: true,
  cohort: "active",
  trustTier: "Trusted",
  isVip: false,
  verified: true,
  healthLabel: "Strong",
  activeHires: 1,
  totalSpendLabel: "$48.6k",
  rating: 5.0,
  lastBriefLabel: "5d",
  daysSinceLastBrief: 5,
  hiresPreview: [
    {
      candidateId: "cand-anand-patel",
      candidateName: "Anand Patel",
      candidateInitials: "A",
      candidateGradient: 3,
      role: "Product team support",
      hours: 410,
      rating: 5.0,
      status: "active",
    },
  ],
  briefsTotal: 6,
  briefsLastLabel: "5d",
  activityPreview: [
    {
      id: "act-techflow-1",
      kind: "review-left",
      text: "David Park gave Anand Patel a 5★ extension review.",
      when: "1w ago",
    },
  ],
  totalSpendDollars: 48600,
};

const vertex: ManagedClient = {
  id: "client-vertex-health",
  companyName: "Vertex Health",
  logoInitials: "VH",
  logoGradient: 2,
  metaLine: "Biotech · 130 employees · Cambridge, USA",
  industry: "Biotech",
  size: "mid",
  city: "Cambridge",
  countryFlag: "🇺🇸",
  countryName: "USA",
  fullProfileVisible: true,
  cohort: "active",
  trustTier: "Trusted",
  isVip: false,
  verified: true,
  healthLabel: "Expansion ask",
  activeHires: 2,
  totalSpendLabel: "$36.4k",
  rating: 4.8,
  lastBriefLabel: "1d",
  daysSinceLastBrief: 1,
  hiresPreview: [
    {
      candidateId: "cand-jomari-dc",
      candidateName: "Jomari Dela Cruz",
      candidateInitials: "J",
      candidateGradient: 2,
      role: "Lab ops admin",
      hours: 220,
      rating: 5.0,
      status: "active",
    },
  ],
  briefsTotal: 9,
  briefsLastLabel: "1d",
  activityPreview: [
    {
      id: "act-vertex-1",
      kind: "expansion-ask",
      text: "Requested 2 more candidates for biotech ops team.",
      when: "1d ago",
    },
  ],
  totalSpendDollars: 36400,
};

const lumio: ManagedClient = {
  id: "client-lumio-health",
  companyName: "Lumio Health",
  logoInitials: "LH",
  logoGradient: 3,
  metaLine: "Telehealth SaaS · 240 employees · Toronto, Canada",
  industry: "Healthcare",
  size: "mid",
  city: "Toronto",
  countryFlag: "🇨🇦",
  countryName: "Canada",
  fullProfileVisible: true,
  cohort: "active",
  trustTier: "Trusted",
  isVip: false,
  verified: true,
  healthLabel: "Strong",
  activeHires: 1,
  totalSpendLabel: "$28.0k",
  rating: 4.9,
  lastBriefLabel: "3d",
  daysSinceLastBrief: 3,
  hiresPreview: [
    {
      candidateId: "cand-kanya-suksawat",
      candidateName: "Kanya Suksawat",
      candidateInitials: "K",
      candidateGradient: 3,
      role: "Patient comms",
      hours: 240,
      rating: 4.5,
      status: "active",
    },
  ],
  briefsTotal: 11,
  briefsLastLabel: "3d",
  activityPreview: [
    {
      id: "act-lumio-1",
      kind: "brief-received",
      text: "Lumio sent a brief for a Spanish-speaking VA role.",
      when: "3d ago",
    },
  ],
  totalSpendDollars: 28000,
};

const mercer: ManagedClient = {
  id: "client-mercer-capital",
  companyName: "Mercer Capital",
  logoInitials: "MC",
  logoGradient: 1,
  metaLine: "Investment ops · 90 employees · Boston, USA",
  industry: "Finance",
  size: "early",
  city: "Boston",
  countryFlag: "🇺🇸",
  countryName: "USA",
  fullProfileVisible: true,
  cohort: "active",
  trustTier: "Trusted",
  isVip: false,
  verified: true,
  healthLabel: "Awaiting shortlist",
  activeHires: 0,
  totalSpendLabel: "$22.5k",
  rating: 4.7,
  lastBriefLabel: "5h",
  daysSinceLastBrief: 0,
  hiresPreview: [],
  briefsTotal: 7,
  briefsLastLabel: "5h",
  activityPreview: [
    {
      id: "act-mercer-1",
      kind: "brief-received",
      text: "Mercer requested a Bilingual VA shortlist.",
      when: "5h ago",
    },
  ],
  totalSpendDollars: 22500,
};

const bengaluru: ManagedClient = {
  id: "client-bengaluru-bio",
  companyName: "Bengaluru Bio",
  logoInitials: "BB",
  logoGradient: 1,
  metaLine: "Pharma research · 60 employees · Bengaluru, India",
  industry: "Biotech",
  size: "early",
  city: "Bengaluru",
  countryFlag: "🇮🇳",
  countryName: "India",
  fullProfileVisible: true,
  cohort: "active",
  trustTier: "New",
  isVip: false,
  verified: true,
  healthLabel: "Strong",
  activeHires: 1,
  totalSpendLabel: "$11.8k",
  rating: 5.0,
  lastBriefLabel: "8d",
  daysSinceLastBrief: 8,
  hiresPreview: [
    {
      candidateId: "cand-carlos-mendoza",
      candidateName: "Carlos Mendoza",
      candidateInitials: "C",
      candidateGradient: 4,
      role: "Research admin",
      hours: 60,
      rating: 5.0,
      status: "active",
    },
  ],
  briefsTotal: 3,
  briefsLastLabel: "8d",
  activityPreview: [
    {
      id: "act-bengaluru-1",
      kind: "hire",
      text: "Hired Carlos Mendoza for Research admin role.",
      when: "1w ago",
    },
  ],
  totalSpendDollars: 11800,
};

const quill: ManagedClient = {
  id: "client-quill-co",
  companyName: "Quill & Co",
  logoInitials: "QC",
  logoGradient: 2,
  metaLine: "Editorial agency · 22 employees · London, UK",
  industry: "Media",
  size: "seed",
  city: "London",
  countryFlag: "🇬🇧",
  countryName: "UK",
  fullProfileVisible: true,
  cohort: "active",
  trustTier: "Trusted",
  isVip: false,
  verified: true,
  healthLabel: "Open dispute",
  activeHires: 0,
  totalSpendLabel: "$18.0k",
  rating: 4.2,
  lastBriefLabel: "21d",
  daysSinceLastBrief: 21,
  hiresPreview: [
    {
      candidateId: "cand-sofia-reyes",
      candidateName: "Sofia Reyes",
      candidateInitials: "S",
      candidateGradient: 4,
      role: "Editorial coordination · paused",
      hours: 180,
      status: "paused",
    },
  ],
  briefsTotal: 4,
  briefsLastLabel: "21d",
  activityPreview: [
    {
      id: "act-quill-1",
      kind: "dispute-opened",
      text: "Sofia Reyes opened a payment-delay dispute.",
      when: "12h ago",
    },
  ],
  totalSpendDollars: 18000,
};

const sahara: ManagedClient = {
  id: "client-sahara-logistics",
  companyName: "Sahara Logistics",
  logoInitials: "SL",
  logoGradient: 2,
  metaLine: "Pan-African logistics · 45 employees · Abidjan, CI",
  industry: "Logistics",
  size: "seed",
  city: "Abidjan",
  countryFlag: "🇨🇮",
  countryName: "Côte d'Ivoire",
  fullProfileVisible: true,
  cohort: "active",
  trustTier: "New",
  isVip: false,
  verified: true,
  healthLabel: "Strong",
  activeHires: 1,
  totalSpendLabel: "$7.2k",
  rating: 4.5,
  lastBriefLabel: "12d",
  daysSinceLastBrief: 12,
  hiresPreview: [
    {
      candidateId: "cand-aaliyah-kone",
      candidateName: "Aaliyah Koné",
      candidateInitials: "A",
      candidateGradient: 2,
      role: "Operations support",
      hours: 280,
      rating: 4.5,
      status: "active",
    },
  ],
  briefsTotal: 2,
  briefsLastLabel: "12d",
  activityPreview: [
    {
      id: "act-sahara-1",
      kind: "review-left",
      text: "Adama Touré left a supportive review for Aaliyah.",
      when: "2 weeks ago",
    },
  ],
  totalSpendDollars: 7200,
};

const helios: ManagedClient = {
  id: "client-helios-robotics",
  companyName: "Helios Robotics",
  logoInitials: "HR",
  logoGradient: 3,
  metaLine: "Industrial robotics · 35 employees · Munich, Germany",
  industry: "Robotics",
  size: "seed",
  city: "Munich",
  countryFlag: "🇩🇪",
  countryName: "Germany",
  fullProfileVisible: true,
  cohort: "onboarding",
  trustTier: "New",
  isVip: false,
  verified: true,
  healthLabel: "Onboarding stalled",
  activeHires: 0,
  totalSpendLabel: "$0",
  rating: 0,
  lastBriefLabel: "—",
  daysSinceLastBrief: 999,
  hiresPreview: [],
  briefsTotal: 0,
  briefsLastLabel: "—",
  activityPreview: [
    {
      id: "act-helios-1",
      kind: "specialist-message",
      text: "Welcome message sent · awaiting first brief.",
      when: "5 days ago",
    },
  ],
  totalSpendDollars: 0,
};

const saunders: ManagedClient = {
  id: "client-saunders-saas",
  companyName: "Saunders SaaS",
  logoInitials: "SS",
  logoGradient: 1,
  metaLine: "Vertical SaaS · 50 employees · Sydney, Australia",
  industry: "SaaS",
  size: "early",
  city: "Sydney",
  countryFlag: "🇦🇺",
  countryName: "Australia",
  fullProfileVisible: true,
  cohort: "onboarding",
  trustTier: "New",
  isVip: false,
  verified: true,
  healthLabel: "Onboarding",
  activeHires: 0,
  totalSpendLabel: "$0",
  rating: 0,
  lastBriefLabel: "1d",
  daysSinceLastBrief: 1,
  hiresPreview: [],
  briefsTotal: 1,
  briefsLastLabel: "1d",
  activityPreview: [
    {
      id: "act-saunders-1",
      kind: "brief-received",
      text: "First brief: Customer ops VA · APAC overlap.",
      when: "1d ago",
    },
  ],
  totalSpendDollars: 0,
};

const bridgepoint: ManagedClient = {
  id: "client-bridgepoint-llc",
  companyName: "Bridgepoint LLC",
  logoInitials: "BL",
  logoGradient: 4,
  metaLine: "M&A advisory · 18 employees · New York, USA",
  industry: "Finance",
  size: "seed",
  city: "New York",
  countryFlag: "🇺🇸",
  countryName: "USA",
  fullProfileVisible: true,
  cohort: "paused",
  trustTier: "New",
  isVip: false,
  verified: false,
  healthLabel: "Paused",
  activeHires: 0,
  totalSpendLabel: "$3.0k",
  rating: 4.0,
  lastBriefLabel: "47d",
  daysSinceLastBrief: 47,
  hiresPreview: [],
  briefsTotal: 1,
  briefsLastLabel: "47d",
  activityPreview: [
    {
      id: "act-bridgepoint-1",
      kind: "specialist-message",
      text: "Account paused at client request · pausing new briefs.",
      when: "6 weeks ago",
    },
  ],
  totalSpendDollars: 3000,
};

const northwind: ManagedClient = {
  id: "client-northwind",
  companyName: "Northwind Solutions",
  logoInitials: "NS",
  logoGradient: 3,
  metaLine: "IT consulting · 95 employees · Chicago, USA",
  industry: "Consulting",
  size: "early",
  city: "Chicago",
  countryFlag: "🇺🇸",
  countryName: "USA",
  fullProfileVisible: true,
  cohort: "at-risk",
  trustTier: "Trusted",
  isVip: false,
  verified: true,
  healthLabel: "Churn risk",
  activeHires: 2,
  totalSpendLabel: "$24.3k",
  rating: 4.4,
  lastBriefLabel: "62d",
  daysSinceLastBrief: 62,
  hiresPreview: [
    {
      candidateId: "cand-anand-patel",
      candidateName: "Anand Patel",
      candidateInitials: "A",
      candidateGradient: 3,
      role: "CRM cleanup project · idle",
      hours: 60,
      rating: 5.0,
      status: "completed",
    },
  ],
  briefsTotal: 5,
  briefsLastLabel: "62d",
  activityPreview: [
    {
      id: "act-northwind-1",
      kind: "engagement-completed",
      text: "Last engagement completed · 62 days idle.",
      when: "2 months ago",
    },
  ],
  totalSpendDollars: 24300,
};

/* ============================================================
   Roster export
   ============================================================ */

export const managedClients: ReadonlyArray<ManagedClient> = [
  acme,
  techflow,
  vertex,
  lumio,
  mercer,
  bengaluru,
  quill,
  sahara,
  helios,
  saunders,
  bridgepoint,
  northwind,
];

/** Header subtitle ("12 client companies in your VA category · $474K lifetime spend"). */
export const CLIENT_HEADER_SUBTITLE = (() => {
  const totalSpend = managedClients.reduce((sum, c) => sum + c.totalSpendDollars, 0);
  return `${managedClients.length} client companies in your VA category · $${Math.round(totalSpend / 1000)}K lifetime spend`;
})();
