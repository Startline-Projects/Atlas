/**
 * Mock data for `/specialist/my-candidates` — the specialist's
 * post-approval managed pool.
 *
 * Cross-session ID strategy (per Session 3 plan):
 *   - Canonical IDs are `cand-<slug>`. The dynamic route
 *     `/specialist/candidates/[id]` resolves these.
 *   - When a candidate also appears in a queue mock from Session 2,
 *     `reviewQueueId` and/or `recertQueueId` reference back. Session
 *     2 mocks are NOT modified.
 *
 * Spec rules (PDF Step 5):
 *   - Status enum (full): Live / Active Contract / Multiple Contracts /
 *     Vacation / Pending Action / At Capacity. The HTML's cohort filter
 *     uses a tighter set (Active / Available / In re-cert / Needs action).
 *     We carry the full status enum on each candidate; cohorts are
 *     derived. **HTML wins for visible filters.**
 *   - Suspend account requires admin override — UI surfaces the action;
 *     enforcement waits for services. Migration note in CONVERSION_LOG.
 *   - Re-verify references is a candidate action — wired but no-op.
 */

import type { AvatarGradientKey } from "./queue-types";

/* ============================================================
   Types & enums
   ============================================================ */

/**
 * Full canonical status enum from PDF Step 5 §"Status badge".
 * UI maps these to the HTML's tighter cohort filters via
 * `STATUS_TO_COHORTS` below.
 */
export type ManagedStatus =
  | "active"
  | "active-contract"
  | "multiple-contracts"
  | "available"
  | "vacation"
  | "pending-action"
  | "paused"
  | "off-boarded"
  | "in-dispute"
  | "awaiting-client";

export type ManagedTier = "Standard" | "Vetted" | "Elite";

/** HTML cohort filter chips (visible on the page). */
export const MANAGED_COHORTS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "available", label: "Available" },
  { key: "recert", label: "In re-cert", tone: "attention" as const },
  { key: "action", label: "Needs action", tone: "danger" as const },
] as const;
export type ManagedCohort = (typeof MANAGED_COHORTS)[number]["key"];

/** Tier filter (additional select). */
export const MANAGED_TIER_FILTERS = [
  { key: "all", label: "All tiers" },
  { key: "elite", label: "Elite" },
  { key: "vetted", label: "Vetted" },
  { key: "standard", label: "Standard" },
] as const;

/** Sort options. */
export const MANAGED_SORT_OPTIONS = [
  { key: "recent", label: "Recent activity" },
  { key: "name", label: "Name (A–Z)" },
  { key: "rating", label: "Highest rating" },
  { key: "hours", label: "Most hours" },
  { key: "cert", label: "Cert expiry (soonest)" },
] as const;

/** Attention strip card tones. */
export type AttentionTone = "danger" | "warn" | "info";

export type ManagedAttentionCard = {
  candidateId: string;
  tone: AttentionTone;
  /** Right-side chip text. */
  tagLabel: string;
  /** Body line — supports inline <strong> via segment list. */
  detail: ReadonlyArray<
    | { kind: "text"; value: string }
    | { kind: "strong"; value: string }
  >;
};

/* ============================================================
   Sub-shapes
   ============================================================ */

/**
 * Engagement summary (lite — just for row + slide-over preview).
 * The full profile carries a richer Engagement type.
 */
export type EngagementLite = {
  clientName: string;
  clientInitials: string;
  /** Decorative gradient bucket 1–5. */
  clientGradient: 1 | 2 | 3 | 4 | 5;
  role: string;
  status: "active" | "completed" | "paused";
  hours: number;
  rating?: number;
};

/** Timeline event for the slide-over "recent activity" + profile timeline. */
export type TimelineEvent = {
  id: string;
  /** Stable kind drives the bullet color. */
  kind:
    | "approved"
    | "hired"
    | "review-received"
    | "recert-submitted"
    | "dispute-opened"
    | "dispute-resolved"
    | "rate-changed"
    | "skill-added"
    | "vacation-set"
    | "paused"
    | "off-boarded"
    | "client-message"
    | "specialist-message";
  /** Body text (mixes plain + emphasized via <strong>). */
  text: string;
  when: string;
};

/* ============================================================
   The ManagedCandidate shape
   ============================================================ */

export type ManagedCandidate = {
  /* canonical identity — used by `/specialist/candidates/[id]`. */
  id: string;
  /** Atlas pool ID shown in the profile hero (decorative). */
  atlasId: string;
  /** Cross-session links to queue mock entries (Session 2). */
  reviewQueueId?: string;
  recertQueueId?: string;

  /* identity */
  firstName: string;
  fullName: string;
  age: number;
  countryFlag: string;
  countryName: string;
  city: string;
  category: string;
  initials: string;
  avatarGradient?: AvatarGradientKey;

  /* identity row tags */
  hourlyRate: string;
  languagesLong: string;
  languagesShort: string;
  /** True when the candidate's primary language is not English. Drives a small "non-EN primary" tag in the row. */
  nonEnglishPrimary: boolean;

  /* pool & management */
  status: ManagedStatus;
  /** Status badge label (human-readable, can override the enum default). */
  statusLabel: string;
  tier: ManagedTier;
  /** Months since first joined the pool. */
  monthsInPool: number;
  /** When the candidate first joined the pool ("Apr 2025"). */
  poolJoinedLabel: string;

  /* engagement metrics */
  activeEngagements: number;
  totalEngagements: number;
  hoursLifetime: number;
  averageRating: number;
  reviewCount: number;
  disputes: number;
  /** Pre-formatted earnings ("$22.7k"). */
  earningsLifetime: string;
  /** Pre-formatted average response time ("< 4h"). */
  avgResponseTime: string;

  /* re-cert */
  certExpiresInDays: number;
  /** "Active now" / "2d ago" / "1mo ago". */
  lastActivityLabel: string;

  /* cohort membership for the filter chips */
  cohorts: ReadonlyArray<ManagedCohort>;

  /* slide-over previews */
  engagementsPreview: ReadonlyArray<EngagementLite>;
  activityPreview: ReadonlyArray<TimelineEvent>;
};

/* ============================================================
   Attention strip mock — drives the attention-this-week cards
   ============================================================ */

export const managedAttentionCards: ReadonlyArray<ManagedAttentionCard> = [
  {
    candidateId: "cand-sofia-reyes",
    tone: "danger",
    tagLabel: "Dispute",
    detail: [
      { kind: "text", value: "Paused · payment-delay dispute with " },
      { kind: "strong", value: "Quill & Co" },
    ],
  },
  {
    candidateId: "cand-aaliyah-kone",
    tone: "warn",
    tagLabel: "Re-cert · action",
    detail: [
      { kind: "text", value: "Re-cert in 8 days · AI flagged for action (rating slipping to 4.1)" },
    ],
  },
  {
    candidateId: "cand-kanya-suksawat",
    tone: "warn",
    tagLabel: "Re-cert · 5d",
    detail: [
      { kind: "text", value: "Re-cert in " },
      { kind: "strong", value: "5 days" },
      { kind: "text", value: " · interview 2 retake pending" },
    ],
  },
  {
    candidateId: "cand-mei-chen",
    tone: "danger",
    tagLabel: "Performance",
    detail: [
      { kind: "text", value: "Paused · rating dropped to 4.0 · performance review pending" },
    ],
  },
];

/* ============================================================
   Helper to keep candidate definitions tight
   ============================================================ */

const NO_ENGAGEMENT_PREVIEW: ReadonlyArray<EngagementLite> = [];

/* ============================================================
   The 13 managed candidates
   ============================================================ */

const marie: ManagedCandidate = {
  id: "cand-marie-okonkwo",
  atlasId: "ATLAS-VA-2026-0214",
  reviewQueueId: "rq-marie-okonkwo",
  firstName: "Marie",
  fullName: "Marie Okonkwo",
  age: 28,
  countryFlag: "🇳🇬",
  countryName: "Nigeria",
  city: "Lagos",
  category: "Virtual Assistant",
  initials: "M",
  hourlyRate: "$14/hr",
  languagesLong: "English (native), Yoruba (native), French (B2)",
  languagesShort: "English · Yoruba · French",
  nonEnglishPrimary: false,
  status: "active",
  statusLabel: "Live · just approved",
  tier: "Vetted",
  monthsInPool: 0,
  poolJoinedLabel: "Apr 2026",
  activeEngagements: 0,
  totalEngagements: 0,
  hoursLifetime: 0,
  averageRating: 0,
  reviewCount: 0,
  disputes: 0,
  earningsLifetime: "$0",
  avgResponseTime: "—",
  certExpiresInDays: 365,
  lastActivityLabel: "Approved 2h ago",
  cohorts: ["all", "active", "available"],
  engagementsPreview: NO_ENGAGEMENT_PREVIEW,
  activityPreview: [
    {
      id: "act-marie-1",
      kind: "approved",
      text: "You approved Marie to go live in Virtual Assistants.",
      when: "2h ago",
    },
    {
      id: "act-marie-2",
      kind: "review-received",
      text: "AI Interview 2 scored 84 (mid tier).",
      when: "2 days ago",
    },
  ],
};

const carmen: ManagedCandidate = {
  id: "cand-carmen-lopez",
  atlasId: "ATLAS-VA-2026-0218",
  reviewQueueId: "rq-carmen-lopez",
  firstName: "Carmen",
  fullName: "Carmen López",
  age: 31,
  countryFlag: "🇦🇷",
  countryName: "Argentina",
  city: "Buenos Aires",
  category: "Virtual Assistant",
  initials: "C",
  avatarGradient: "navy",
  hourlyRate: "$18/hr",
  languagesLong: "Spanish (native), English (C2), Portuguese (B2)",
  languagesShort: "Spanish · English · Portuguese",
  nonEnglishPrimary: true,
  status: "available",
  statusLabel: "Available",
  tier: "Vetted",
  monthsInPool: 0,
  poolJoinedLabel: "Apr 2026",
  activeEngagements: 0,
  totalEngagements: 0,
  hoursLifetime: 0,
  averageRating: 0,
  reviewCount: 0,
  disputes: 0,
  earningsLifetime: "$0",
  avgResponseTime: "—",
  certExpiresInDays: 365,
  lastActivityLabel: "Approved yesterday",
  cohorts: ["all", "available"],
  engagementsPreview: NO_ENGAGEMENT_PREVIEW,
  activityPreview: [
    {
      id: "act-carmen-1",
      kind: "approved",
      text: "You approved Carmen to go live · Vetted tier.",
      when: "1d ago",
    },
  ],
};

const hana: ManagedCandidate = {
  id: "cand-hana-reza",
  atlasId: "ATLAS-VA-2026-0211",
  reviewQueueId: "rq-hana-reza",
  firstName: "Hana",
  fullName: "Hana Reza",
  age: 26,
  countryFlag: "🇮🇷",
  countryName: "Iran",
  city: "Tehran",
  category: "Virtual Assistant",
  initials: "H",
  avatarGradient: "terracotta",
  hourlyRate: "$11/hr",
  languagesLong: "Persian (native), English (B2), Arabic (B1)",
  languagesShort: "Persian · English · Arabic",
  nonEnglishPrimary: true,
  status: "pending-action",
  statusLabel: "Pending revisions",
  tier: "Standard",
  monthsInPool: 0,
  poolJoinedLabel: "Apr 2026",
  activeEngagements: 0,
  totalEngagements: 0,
  hoursLifetime: 0,
  averageRating: 0,
  reviewCount: 0,
  disputes: 0,
  earningsLifetime: "$0",
  avgResponseTime: "—",
  certExpiresInDays: 365,
  lastActivityLabel: "Revisions sent 6h ago",
  cohorts: ["all", "action"],
  engagementsPreview: NO_ENGAGEMENT_PREVIEW,
  activityPreview: [
    {
      id: "act-hana-1",
      kind: "specialist-message",
      text: "You sent revision request: re-record intro · add reference.",
      when: "6h ago",
    },
  ],
};

const anand: ManagedCandidate = {
  id: "cand-anand-patel",
  atlasId: "ATLAS-VA-2025-0142",
  recertQueueId: "rc-anand-patel",
  firstName: "Anand",
  fullName: "Anand Patel",
  age: 30,
  countryFlag: "🇮🇳",
  countryName: "India",
  city: "Mumbai",
  category: "Virtual Assistant",
  initials: "A",
  avatarGradient: "caramel",
  hourlyRate: "$16/hr",
  languagesLong: "Hindi (native), English (C1), Marathi (native)",
  languagesShort: "Hindi · English · Marathi",
  nonEnglishPrimary: true,
  status: "active-contract",
  statusLabel: "Active · 2 contracts",
  tier: "Vetted",
  monthsInPool: 12,
  poolJoinedLabel: "Apr 2025",
  activeEngagements: 2,
  totalEngagements: 8,
  hoursLifetime: 1420,
  averageRating: 4.8,
  reviewCount: 17,
  disputes: 0,
  earningsLifetime: "$22.7k",
  avgResponseTime: "< 4h",
  certExpiresInDays: 14,
  lastActivityLabel: "Active now",
  cohorts: ["all", "active", "recert"],
  engagementsPreview: [
    {
      clientName: "Acme Co",
      clientInitials: "AC",
      clientGradient: 1,
      role: "Lead engineer ops",
      status: "active",
      hours: 320,
      rating: 5.0,
    },
    {
      clientName: "TechFlow Inc",
      clientInitials: "TF",
      clientGradient: 2,
      role: "Product team support",
      status: "active",
      hours: 410,
      rating: 5.0,
    },
  ],
  activityPreview: [
    {
      id: "act-anand-1",
      kind: "recert-submitted",
      text: "Re-cert interview submitted · AI scored 82.",
      when: "5 days ago",
    },
    {
      id: "act-anand-2",
      kind: "review-received",
      text: "5★ review from Sarah Lin (Acme Co).",
      when: "2 weeks ago",
    },
  ],
};

const marcus: ManagedCandidate = {
  id: "cand-marcus-bauer",
  atlasId: "ATLAS-VA-2024-0089",
  recertQueueId: "rc-marcus-bauer",
  firstName: "Marcus",
  fullName: "Marcus Bauer",
  age: 38,
  countryFlag: "🇩🇪",
  countryName: "Germany",
  city: "Berlin",
  category: "Virtual Assistant",
  initials: "M",
  avatarGradient: "purple",
  hourlyRate: "$22/hr",
  languagesLong: "German (native), English (C2), French (B2)",
  languagesShort: "German · English · French",
  nonEnglishPrimary: true,
  status: "multiple-contracts",
  statusLabel: "Active · 3 contracts",
  tier: "Elite",
  monthsInPool: 22,
  poolJoinedLabel: "Jul 2024",
  activeEngagements: 3,
  totalEngagements: 9,
  hoursLifetime: 1860,
  averageRating: 4.7,
  reviewCount: 9,
  disputes: 0,
  earningsLifetime: "$40.9k",
  avgResponseTime: "< 2h",
  certExpiresInDays: 28,
  lastActivityLabel: "Active now",
  cohorts: ["all", "active"],
  engagementsPreview: [
    {
      clientName: "Berlin SaaS",
      clientInitials: "BS",
      clientGradient: 1,
      role: "Engineering ops",
      status: "active",
      hours: 580,
      rating: 5.0,
    },
    {
      clientName: "Munich Health",
      clientInitials: "MH",
      clientGradient: 2,
      role: "Patient comms",
      status: "active",
      hours: 420,
      rating: 4.5,
    },
    {
      clientName: "Helsinki Group",
      clientInitials: "HG",
      clientGradient: 3,
      role: "Cross-EU ops",
      status: "active",
      hours: 360,
      rating: 5.0,
    },
  ],
  activityPreview: [
    {
      id: "act-marcus-1",
      kind: "rate-changed",
      text: "Rate raised to $22/hr after 22 months in pool.",
      when: "3 days ago",
    },
    {
      id: "act-marcus-2",
      kind: "review-received",
      text: "5★ from Hannah Weber (Berlin SaaS).",
      when: "1 week ago",
    },
  ],
};

const aaliyah: ManagedCandidate = {
  id: "cand-aaliyah-kone",
  atlasId: "ATLAS-VA-2025-0067",
  recertQueueId: "rc-aaliyah-kone",
  firstName: "Aaliyah",
  fullName: "Aaliyah Koné",
  age: 33,
  countryFlag: "🇨🇮",
  countryName: "Côte d'Ivoire",
  city: "Abidjan",
  category: "Virtual Assistant",
  initials: "A",
  avatarGradient: "olive",
  hourlyRate: "$15/hr",
  languagesLong: "French (native), English (C1), Bambara (native)",
  languagesShort: "French · English · Bambara",
  nonEnglishPrimary: true,
  status: "pending-action",
  statusLabel: "Action needed · re-cert + dispute",
  tier: "Vetted",
  monthsInPool: 14,
  poolJoinedLabel: "Mar 2025",
  activeEngagements: 1,
  totalEngagements: 6,
  hoursLifetime: 980,
  averageRating: 4.1,
  reviewCount: 9,
  disputes: 1,
  earningsLifetime: "$14.7k",
  avgResponseTime: "12h",
  certExpiresInDays: 5,
  lastActivityLabel: "2 days ago",
  cohorts: ["all", "active", "recert", "action"],
  engagementsPreview: [
    {
      clientName: "Sahara Logistics",
      clientInitials: "SL",
      clientGradient: 2,
      role: "Operations support",
      status: "active",
      hours: 280,
      rating: 4.5,
    },
  ],
  activityPreview: [
    {
      id: "act-aaliyah-1",
      kind: "dispute-opened",
      text: "Hours-billed dispute opened by Ferry Logistics.",
      when: "8 days ago",
    },
    {
      id: "act-aaliyah-2",
      kind: "recert-submitted",
      text: "Re-cert interview submitted (score 75 — slight regression).",
      when: "5 days ago",
    },
  ],
};

const sofia: ManagedCandidate = {
  id: "cand-sofia-reyes",
  atlasId: "ATLAS-VA-2025-0193",
  firstName: "Sofia",
  fullName: "Sofia Reyes",
  age: 29,
  countryFlag: "🇲🇽",
  countryName: "Mexico",
  city: "Mexico City",
  category: "Virtual Assistant",
  initials: "S",
  avatarGradient: "lime",
  hourlyRate: "$15/hr",
  languagesLong: "Spanish (native), English (C1)",
  languagesShort: "Spanish · English",
  nonEnglishPrimary: true,
  status: "in-dispute",
  statusLabel: "Paused · open dispute",
  tier: "Vetted",
  monthsInPool: 9,
  poolJoinedLabel: "Aug 2025",
  activeEngagements: 0,
  totalEngagements: 4,
  hoursLifetime: 620,
  averageRating: 4.5,
  reviewCount: 5,
  disputes: 1,
  earningsLifetime: "$9.3k",
  avgResponseTime: "6h",
  certExpiresInDays: 180,
  lastActivityLabel: "12h ago",
  cohorts: ["all", "action"],
  engagementsPreview: [
    {
      clientName: "Quill & Co",
      clientInitials: "QC",
      clientGradient: 4,
      role: "Editorial coordination · paused",
      status: "paused",
      hours: 180,
    },
  ],
  activityPreview: [
    {
      id: "act-sofia-1",
      kind: "dispute-opened",
      text: "Payment-delay dispute opened against Quill & Co.",
      when: "12h ago",
    },
    {
      id: "act-sofia-2",
      kind: "paused",
      text: "Engagement paused pending dispute resolution.",
      when: "12h ago",
    },
  ],
};

const mei: ManagedCandidate = {
  id: "cand-mei-chen",
  atlasId: "ATLAS-VA-2024-0156",
  firstName: "Mei",
  fullName: "Mei Chen",
  age: 35,
  countryFlag: "🇨🇳",
  countryName: "China",
  city: "Shenzhen",
  category: "Virtual Assistant",
  initials: "M",
  avatarGradient: "ice",
  hourlyRate: "$13/hr",
  languagesLong: "Mandarin (native), English (B2)",
  languagesShort: "Mandarin · English",
  nonEnglishPrimary: true,
  status: "paused",
  statusLabel: "Paused · performance review",
  tier: "Standard",
  monthsInPool: 16,
  poolJoinedLabel: "Jan 2025",
  activeEngagements: 0,
  totalEngagements: 5,
  hoursLifetime: 870,
  averageRating: 4.0,
  reviewCount: 6,
  disputes: 0,
  earningsLifetime: "$11.3k",
  avgResponseTime: "18h",
  certExpiresInDays: 95,
  lastActivityLabel: "3 days ago",
  cohorts: ["all", "action"],
  engagementsPreview: NO_ENGAGEMENT_PREVIEW,
  activityPreview: [
    {
      id: "act-mei-1",
      kind: "paused",
      text: "Account paused · rating dropped from 4.5 → 4.0 over last 60 days.",
      when: "3 days ago",
    },
    {
      id: "act-mei-2",
      kind: "specialist-message",
      text: "You opened a performance check-in.",
      when: "3 days ago",
    },
  ],
};

const kanya: ManagedCandidate = {
  id: "cand-kanya-suksawat",
  atlasId: "ATLAS-VA-2025-0034",
  firstName: "Kanya",
  fullName: "Kanya Suksawat",
  age: 27,
  countryFlag: "🇹🇭",
  countryName: "Thailand",
  city: "Bangkok",
  category: "Virtual Assistant",
  initials: "K",
  avatarGradient: "teal",
  hourlyRate: "$12/hr",
  languagesLong: "Thai (native), English (C1)",
  languagesShort: "Thai · English",
  nonEnglishPrimary: true,
  status: "active-contract",
  statusLabel: "Active · re-cert pending",
  tier: "Vetted",
  monthsInPool: 11,
  poolJoinedLabel: "Jun 2025",
  activeEngagements: 1,
  totalEngagements: 4,
  hoursLifetime: 740,
  averageRating: 4.6,
  reviewCount: 4,
  disputes: 0,
  earningsLifetime: "$8.9k",
  avgResponseTime: "8h",
  certExpiresInDays: 5,
  lastActivityLabel: "Yesterday",
  cohorts: ["all", "active", "recert"],
  engagementsPreview: [
    {
      clientName: "Lumio Health",
      clientInitials: "LH",
      clientGradient: 3,
      role: "Patient comms",
      status: "active",
      hours: 240,
      rating: 4.5,
    },
  ],
  activityPreview: [
    {
      id: "act-kanya-1",
      kind: "recert-submitted",
      text: "Interview 2 retake pending — re-cert in 5 days.",
      when: "Yesterday",
    },
  ],
};

const tomas: ManagedCandidate = {
  id: "cand-tomas-silva",
  atlasId: "ATLAS-VA-2024-0017",
  firstName: "Tomás",
  fullName: "Tomás Silva-Mendes",
  age: 41,
  countryFlag: "🇵🇹",
  countryName: "Portugal",
  city: "Lisbon",
  category: "Virtual Assistant",
  initials: "T",
  avatarGradient: "purple",
  hourlyRate: "$20/hr",
  languagesLong: "Portuguese (native), English (C1), Spanish (B2)",
  languagesShort: "Portuguese · English · Spanish",
  nonEnglishPrimary: true,
  status: "off-boarded",
  statusLabel: "Off-boarded · Mar 2026",
  tier: "Standard",
  monthsInPool: 18,
  poolJoinedLabel: "Sep 2024",
  activeEngagements: 0,
  totalEngagements: 3,
  hoursLifetime: 410,
  averageRating: 3.6,
  reviewCount: 3,
  disputes: 2,
  earningsLifetime: "$7.6k",
  avgResponseTime: "—",
  certExpiresInDays: 0,
  lastActivityLabel: "Off-boarded 6 weeks ago",
  cohorts: ["all"],
  engagementsPreview: NO_ENGAGEMENT_PREVIEW,
  activityPreview: [
    {
      id: "act-tomas-1",
      kind: "off-boarded",
      text: "Off-boarded · prolonged inactivity + rating below threshold.",
      when: "6 weeks ago",
    },
  ],
};

const carlos: ManagedCandidate = {
  id: "cand-carlos-mendoza",
  atlasId: "ATLAS-VA-2026-0231",
  firstName: "Carlos",
  fullName: "Carlos Mendoza",
  age: 32,
  countryFlag: "🇨🇴",
  countryName: "Colombia",
  city: "Medellín",
  category: "Virtual Assistant",
  initials: "C",
  avatarGradient: "warm",
  hourlyRate: "$15/hr",
  languagesLong: "Spanish (native), English (C1)",
  languagesShort: "Spanish · English",
  nonEnglishPrimary: true,
  status: "awaiting-client",
  statusLabel: "Awaiting first match",
  tier: "Vetted",
  monthsInPool: 1,
  poolJoinedLabel: "Mar 2026",
  activeEngagements: 0,
  totalEngagements: 0,
  hoursLifetime: 0,
  averageRating: 0,
  reviewCount: 0,
  disputes: 0,
  earningsLifetime: "$0",
  avgResponseTime: "< 6h",
  certExpiresInDays: 330,
  lastActivityLabel: "1 week ago",
  cohorts: ["all", "available"],
  engagementsPreview: NO_ENGAGEMENT_PREVIEW,
  activityPreview: [
    {
      id: "act-carlos-1",
      kind: "approved",
      text: "Approved · Vetted tier · awaiting first client match.",
      when: "1 week ago",
    },
  ],
};

const jomari: ManagedCandidate = {
  id: "cand-jomari-dc",
  atlasId: "ATLAS-VA-2024-0102",
  firstName: "Jomari",
  fullName: "Jomari Dela Cruz",
  age: 34,
  countryFlag: "🇵🇭",
  countryName: "Philippines",
  city: "Manila",
  category: "Virtual Assistant",
  initials: "J",
  avatarGradient: "olive",
  hourlyRate: "$14/hr",
  languagesLong: "Filipino (native), English (C2)",
  languagesShort: "Filipino · English",
  nonEnglishPrimary: true,
  status: "vacation",
  statusLabel: "On vacation · back May 15",
  tier: "Vetted",
  monthsInPool: 17,
  poolJoinedLabel: "Nov 2024",
  activeEngagements: 0,
  totalEngagements: 5,
  hoursLifetime: 1080,
  averageRating: 4.9,
  reviewCount: 7,
  disputes: 0,
  earningsLifetime: "$15.1k",
  avgResponseTime: "Out of office",
  certExpiresInDays: 145,
  lastActivityLabel: "On vacation",
  cohorts: ["all"],
  engagementsPreview: NO_ENGAGEMENT_PREVIEW,
  activityPreview: [
    {
      id: "act-jomari-1",
      kind: "vacation-set",
      text: "Vacation status · back May 15.",
      when: "1 week ago",
    },
  ],
};

const linh: ManagedCandidate = {
  id: "cand-linh-nguyen",
  atlasId: "ATLAS-VA-2024-0044",
  recertQueueId: "rc-linh-nguyen",
  firstName: "Linh",
  fullName: "Linh Nguyen",
  age: 31,
  countryFlag: "🇻🇳",
  countryName: "Vietnam",
  city: "Hanoi",
  category: "Virtual Assistant",
  initials: "L",
  avatarGradient: "navy",
  hourlyRate: "$15/hr",
  languagesLong: "Vietnamese (native), English (C1)",
  languagesShort: "Vietnamese · English",
  nonEnglishPrimary: true,
  status: "active-contract",
  statusLabel: "Active · long-term",
  tier: "Standard",
  monthsInPool: 18,
  poolJoinedLabel: "Oct 2024",
  activeEngagements: 1,
  totalEngagements: 11,
  hoursLifetime: 2180,
  averageRating: 4.5,
  reviewCount: 11,
  disputes: 0,
  earningsLifetime: "$32.7k",
  avgResponseTime: "< 4h",
  certExpiresInDays: 22,
  lastActivityLabel: "Active now",
  cohorts: ["all", "active"],
  engagementsPreview: [
    {
      clientName: "Hanoi Coffee Co",
      clientInitials: "HC",
      clientGradient: 1,
      role: "Remote ops",
      status: "active",
      hours: 480,
      rating: 5.0,
    },
  ],
  activityPreview: [
    {
      id: "act-linh-1",
      kind: "review-received",
      text: "5★ review from Anh Tran (Hanoi Coffee Co).",
      when: "5 days ago",
    },
  ],
};

/* ============================================================
   Roster export
   ============================================================ */

export const managedCandidates: ReadonlyArray<ManagedCandidate> = [
  marie,
  carmen,
  hana,
  anand,
  marcus,
  aaliyah,
  sofia,
  mei,
  kanya,
  tomas,
  carlos,
  jomari,
  linh,
];

/** Header subtitle copy ("47 live in your pool · last refresh 2 min ago"). */
export const MANAGED_HEADER_SUBTITLE =
  "47 live in your Virtual Assistants pool · last refresh 2 min ago";
