/**
 * Mock data for `/specialist/candidates/[id]` — the standalone
 * candidate profile route.
 *
 * Cross-session ID: profiles are keyed by canonical `cand-*` IDs from
 * `my-candidates.ts`. The profile extends `ManagedCandidate` with the
 * additional fields needed for the deep view (bio, skills, full
 * engagement history, rating distribution, activity timeline, vouches,
 * anti-cheat summary).
 *
 * Coverage: every `ManagedCandidate` resolves to a `CandidateProfile`
 * (5 are richly detailed: Marie / Carmen / Hana / Anand / Marcus; the
 * other 8 use a baseline-derive helper). `getCandidateProfile(id)`
 * returns `null` for unknown ids — the page calls Next.js `notFound()`.
 */

import {
  type EngagementLite,
  managedCandidates,
  type ManagedCandidate,
  type TimelineEvent,
} from "./my-candidates";

/* ============================================================
   Types
   ============================================================ */

/** Engagement row on the profile (extends the lite shape with dates). */
export type EngagementFull = EngagementLite & {
  startedLabel: string;
  endedLabel?: string;
  /** Optional candidate-id linkback (for cross-references; unused this session). */
  clientId?: string;
};

/** Reference widget on the profile side column — tighter than RefList. */
export type ProfileVouch = {
  id: string;
  name: string;
  /** Mono-uppercase tagline, e.g. "VP OPS · BANSAL GROUP · 4Y RELATIONSHIP". */
  meta: string;
  quote: string;
};

/** Compact anti-cheat record shown in the side column. */
export type AntiCheatRecord = {
  latestScan: "Clean" | "Flagged";
  biometricMatch: string;
  geoAnomalies: number;
  plagiarism: string;
};

/** Rating distribution by star count. Sums to reviewCount. */
export type RatingDistribution = {
  readonly 5: number;
  readonly 4: number;
  readonly 3: number;
  readonly 2: number;
  readonly 1: number;
};

export type CandidateProfile = ManagedCandidate & {
  bio: string;
  skills: ReadonlyArray<string>;
  engagements: ReadonlyArray<EngagementFull>;
  ratingDistribution: RatingDistribution;
  activityTimeline: ReadonlyArray<TimelineEvent>;
  vouches: ReadonlyArray<ProfileVouch>;
  antiCheat: AntiCheatRecord;
};

/* ============================================================
   Default anti-cheat block — used by lite profiles
   ============================================================ */

const ANTI_CHEAT_CLEAN: AntiCheatRecord = {
  latestScan: "Clean",
  biometricMatch: "98.4%",
  geoAnomalies: 0,
  plagiarism: "0%",
};

/**
 * Distribute reviewCount across the 5★/4★/3★/2★/1★ buckets so the
 * average lands within ±0.05 of `avg`. Used by lite profiles.
 */
function distributeRating(reviewCount: number, avg: number): RatingDistribution {
  if (reviewCount === 0) return { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  // Heuristic: bias 5★ when avg ≥ 4.7, blend with 4★ for 4.0–4.6, dip into 3★ for <4.0.
  if (avg >= 4.7) {
    const fives = Math.round(reviewCount * 0.78);
    const fours = Math.round(reviewCount * 0.18);
    const threes = Math.max(0, reviewCount - fives - fours);
    return { 5: fives, 4: fours, 3: threes, 2: 0, 1: 0 };
  }
  if (avg >= 4.3) {
    const fives = Math.round(reviewCount * 0.55);
    const fours = Math.round(reviewCount * 0.35);
    const threes = Math.max(0, reviewCount - fives - fours);
    return { 5: fives, 4: fours, 3: threes, 2: 0, 1: 0 };
  }
  if (avg >= 4.0) {
    const fives = Math.round(reviewCount * 0.35);
    const fours = Math.round(reviewCount * 0.45);
    const threes = Math.max(0, reviewCount - fives - fours);
    return { 5: fives, 4: fours, 3: threes, 2: 0, 1: 0 };
  }
  // <4.0
  const fives = Math.round(reviewCount * 0.2);
  const fours = Math.round(reviewCount * 0.4);
  const threes = Math.round(reviewCount * 0.3);
  const twos = Math.max(0, reviewCount - fives - fours - threes);
  return { 5: fives, 4: fours, 3: threes, 2: twos, 1: 0 };
}

/* ============================================================
   Rich profiles (5)
   ============================================================ */

const marieProfile: Omit<CandidateProfile, keyof ManagedCandidate> = {
  bio: "Six years supporting C-suite executives at Lagos-based finance and legal firms. Specializes in complex calendar management, international travel coordination, and discreet board-level admin. Trilingual (English / Yoruba / French). Just promoted into the active pool — eager for first match.",
  skills: [
    "Executive support",
    "Calendar management",
    "Travel coordination",
    "Email triage",
    "Board prep",
    "Spreadsheet ops",
    "CRM (HubSpot)",
    "Notion · Slack",
  ],
  engagements: [],
  ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  activityTimeline: [
    {
      id: "tl-marie-1",
      kind: "approved",
      text: "You approved Marie to go live in Virtual Assistants.",
      when: "2h ago",
    },
    {
      id: "tl-marie-2",
      kind: "review-received",
      text: "AI Interview 2 scored 84.",
      when: "2 days ago",
    },
    {
      id: "tl-marie-3",
      kind: "review-received",
      text: "AI Interview 1 scored 89.",
      when: "2 days ago",
    },
    {
      id: "tl-marie-4",
      kind: "specialist-message",
      text: "Marie completed onboarding and submitted for Step-9 review.",
      when: "3 days ago",
    },
  ],
  vouches: [
    {
      id: "v-marie-1",
      name: "Adaeze Nwosu",
      meta: "EXEC DIRECTOR · LAGOS WOMEN IN FINANCE · 3Y RELATIONSHIP",
      quote: "Most quietly competent EA I've ever worked with.",
    },
    {
      id: "v-marie-2",
      name: "Daniel Ade",
      meta: "CFO · STERLING CAPITAL LAGOS · 2Y RELATIONSHIP",
      quote: "I'd hire her again in a heartbeat. Discreet, sharp.",
    },
  ],
  antiCheat: {
    latestScan: "Clean",
    biometricMatch: "99.2%",
    geoAnomalies: 0,
    plagiarism: "0%",
  },
};

const carmenProfile: Omit<CandidateProfile, keyof ManagedCandidate> = {
  bio: "Eight years operations & exec support across Buenos Aires-based and remote SaaS startups. Bilingual operator (Spanish/English) with intermediate Portuguese. Specializes in cross-functional ops, vendor management, and bilingual customer comms.",
  skills: [
    "Operations leadership",
    "Vendor management",
    "Bilingual customer ops",
    "Notion · Asana · HubSpot",
    "Xero · QuickBooks Online",
    "Financial reporting",
  ],
  engagements: [],
  ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  activityTimeline: [
    {
      id: "tl-carmen-1",
      kind: "approved",
      text: "You approved Carmen · Vetted tier.",
      when: "1d ago",
    },
    {
      id: "tl-carmen-2",
      kind: "review-received",
      text: "Three references all returned 5★.",
      when: "2 days ago",
    },
  ],
  vouches: [
    {
      id: "v-carmen-1",
      name: "Mateo Romero",
      meta: "FOUNDER · POLARA (YC W22) · 4Y RELATIONSHIP",
      quote: "The operator I'd want for any LATAM-based founder.",
    },
    {
      id: "v-carmen-2",
      name: "Diana García",
      meta: "HEAD OF PEOPLE · LUMIO HEALTH · 2Y RELATIONSHIP",
      quote: "Better than most full-time hires we've made.",
    },
  ],
  antiCheat: ANTI_CHEAT_CLEAN,
};

const hanaProfile: Omit<CandidateProfile, keyof ManagedCandidate> = {
  bio: "Three years remote admin support for European clients. Strong fundamentals; growing into the senior-VA role. Currently working through a revisions checklist (re-record intro · third reference) before going live.",
  skills: [
    "Calendar management",
    "Email triage",
    "Google Workspace",
    "Translation",
    "Customer support",
  ],
  engagements: [],
  ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  activityTimeline: [
    {
      id: "tl-hana-1",
      kind: "specialist-message",
      text: "You sent revision request: re-record intro · add reference.",
      when: "6h ago",
    },
    {
      id: "tl-hana-2",
      kind: "review-received",
      text: "AI Interview 2 scored 70 (borderline band).",
      when: "1 day ago",
    },
  ],
  vouches: [
    {
      id: "v-hana-1",
      name: "Fatima Karimi",
      meta: "FOUNDER · PERSA STUDIO · 2Y RELATIONSHIP",
      quote: "Reliable and easy to work with.",
    },
  ],
  antiCheat: ANTI_CHEAT_CLEAN,
};

const anandProfile: Omit<CandidateProfile, keyof ManagedCandidate> = {
  bio: "Engineering operations specialist with 5 years of B2B SaaS experience. Strong in async-first work, calendar & project orchestration, stakeholder communication. Best fit for ongoing engagements with engineering or product leadership rather than one-off projects.",
  skills: [
    "Engineering ops",
    "Calendar & project orchestration",
    "Notion · Slack · Linear",
    "Asana · Intercom",
    "Stakeholder comms",
    "Cross-time-zone coordination",
  ],
  engagements: [
    {
      clientName: "Acme Co",
      clientInitials: "AC",
      clientGradient: 1,
      role: "Lead engineer ops · long-term",
      status: "active",
      hours: 320,
      rating: 5.0,
      startedLabel: "Jan 2026",
    },
    {
      clientName: "TechFlow Inc",
      clientInitials: "TF",
      clientGradient: 2,
      role: "Product team support · ongoing",
      status: "active",
      hours: 410,
      rating: 5.0,
      startedLabel: "Nov 2025",
    },
    {
      clientName: "Lumio Health",
      clientInitials: "LH",
      clientGradient: 3,
      role: "Patient comms support",
      status: "completed",
      hours: 240,
      rating: 5.0,
      startedLabel: "Jul 2025",
      endedLabel: "Oct 2025",
    },
    {
      clientName: "Quill & Co",
      clientInitials: "QC",
      clientGradient: 4,
      role: "Editorial coordination",
      status: "completed",
      hours: 180,
      rating: 4.5,
      startedLabel: "May 2025",
      endedLabel: "Jul 2025",
    },
    {
      clientName: "Mercer Capital",
      clientInitials: "MC",
      clientGradient: 1,
      role: "Investment ops admin",
      status: "completed",
      hours: 95,
      rating: 5.0,
      startedLabel: "Apr 2025",
      endedLabel: "May 2025",
    },
    {
      clientName: "Bridgepoint LLC",
      clientInitials: "BL",
      clientGradient: 2,
      role: "M&A research support",
      status: "completed",
      hours: 75,
      rating: 4.0,
      startedLabel: "Feb 2025",
      endedLabel: "Apr 2025",
    },
    {
      clientName: "Northwind Solutions",
      clientInitials: "NS",
      clientGradient: 3,
      role: "CRM cleanup project",
      status: "completed",
      hours: 60,
      rating: 5.0,
      startedLabel: "Jan 2025",
      endedLabel: "Feb 2025",
    },
    {
      clientName: "Vertex Health",
      clientInitials: "VH",
      clientGradient: 4,
      role: "Onboarding admin",
      status: "completed",
      hours: 40,
      rating: 4.5,
      startedLabel: "Apr 2025",
      endedLabel: "May 2025",
    },
  ],
  ratingDistribution: { 5: 13, 4: 3, 3: 1, 2: 0, 1: 0 },
  activityTimeline: [
    {
      id: "tl-anand-1",
      kind: "recert-submitted",
      text: "Re-cert interview submitted · AI scored 82.",
      when: "5 days ago",
    },
    {
      id: "tl-anand-2",
      kind: "review-received",
      text: "5★ review from Sarah Lin (Acme Co).",
      when: "2 weeks ago",
    },
    {
      id: "tl-anand-3",
      kind: "rate-changed",
      text: "Rate raised to $16/hr after 4.8 rating milestone.",
      when: "6 weeks ago",
    },
    {
      id: "tl-anand-4",
      kind: "skill-added",
      text: "Added Linear to skills (verified via TechFlow engagement).",
      when: "2 months ago",
    },
    {
      id: "tl-anand-5",
      kind: "hired",
      text: "Hired by TechFlow Inc · ongoing engagement.",
      when: "5 months ago",
    },
  ],
  vouches: [
    {
      id: "v-anand-1",
      name: "Adya Sharma",
      meta: "VP OPS · BANSAL GROUP · 4Y RELATIONSHIP",
      quote: "Reliable, low-drama, gets things done.",
    },
    {
      id: "v-anand-2",
      name: "David Park",
      meta: "CTO · TECHFLOW · ACTIVE CLIENT",
      quote: "If you're going to upgrade his tier, do it.",
    },
  ],
  antiCheat: {
    latestScan: "Clean",
    biometricMatch: "99.6%",
    geoAnomalies: 0,
    plagiarism: "0%",
  },
};

const marcusProfile: Omit<CandidateProfile, keyof ManagedCandidate> = {
  bio: "22 months in pool · Elite tier. EU-based ops generalist with deep SaaS / engineering ops fluency. Currently extends across three concurrent active engagements with explicit extension intent from each client.",
  skills: [
    "Cross-EU ops",
    "Engineering ops",
    "Vendor management",
    "Notion · Linear · Slack",
    "Asana",
    "Healthcare admin",
  ],
  engagements: [
    {
      clientName: "Berlin SaaS",
      clientInitials: "BS",
      clientGradient: 1,
      role: "Engineering ops · ongoing",
      status: "active",
      hours: 580,
      rating: 5.0,
      startedLabel: "Oct 2024",
    },
    {
      clientName: "Munich Health",
      clientInitials: "MH",
      clientGradient: 2,
      role: "Patient comms",
      status: "active",
      hours: 420,
      rating: 4.5,
      startedLabel: "Jan 2025",
    },
    {
      clientName: "Helsinki Group",
      clientInitials: "HG",
      clientGradient: 3,
      role: "Cross-EU ops",
      status: "active",
      hours: 360,
      rating: 5.0,
      startedLabel: "Mar 2025",
    },
  ],
  ratingDistribution: { 5: 6, 4: 3, 3: 0, 2: 0, 1: 0 },
  activityTimeline: [
    {
      id: "tl-marcus-1",
      kind: "rate-changed",
      text: "Rate raised to $22/hr after 22 months in pool.",
      when: "3 days ago",
    },
    {
      id: "tl-marcus-2",
      kind: "review-received",
      text: "5★ from Hannah Weber (Berlin SaaS).",
      when: "1 week ago",
    },
    {
      id: "tl-marcus-3",
      kind: "hired",
      text: "Helsinki Group extended his engagement to month 13.",
      when: "1 month ago",
    },
  ],
  vouches: [
    {
      id: "v-marcus-1",
      name: "Hannah Weber",
      meta: "HEAD OF OPS · BERLIN SAAS · 18MO ACTIVE CLIENT",
      quote: "Re-certify him. We're not the only client extending.",
    },
  ],
  antiCheat: {
    latestScan: "Clean",
    biometricMatch: "99.4%",
    geoAnomalies: 0,
    plagiarism: "0%",
  },
};

/* ============================================================
   Profile sources by canonical id
   ============================================================ */

type ProfileExtras = Omit<CandidateProfile, keyof ManagedCandidate>;

const RICH_PROFILES: Record<string, ProfileExtras> = {
  "cand-marie-okonkwo": marieProfile,
  "cand-carmen-lopez": carmenProfile,
  "cand-hana-reza": hanaProfile,
  "cand-anand-patel": anandProfile,
  "cand-marcus-bauer": marcusProfile,
};

/**
 * Lite profile derived from a `ManagedCandidate` for the 8 candidates
 * without a hand-authored rich profile. Carries enough data for the
 * profile route to render every section without "missing data" gaps.
 */
function liteProfile(c: ManagedCandidate): ProfileExtras {
  return {
    bio: `${c.firstName} is a ${c.tier.toLowerCase()}-tier ${c.category.toLowerCase()} based in ${c.city}, ${c.countryName}. ${c.monthsInPool > 0 ? `${c.monthsInPool} months in the pool.` : "Recently joined the pool."} Status: ${c.statusLabel.toLowerCase()}.`,
    skills: [
      "Calendar management",
      "Email triage",
      "Google Workspace",
      "Notion · Slack",
    ],
    engagements: c.engagementsPreview.map(
      (e): EngagementFull => ({
        ...e,
        startedLabel: "—",
      }),
    ),
    ratingDistribution: distributeRating(c.reviewCount, c.averageRating),
    activityTimeline: c.activityPreview,
    vouches: [],
    antiCheat:
      c.disputes > 0
        ? { latestScan: "Clean", biometricMatch: "98.0%", geoAnomalies: 0, plagiarism: "0%" }
        : ANTI_CHEAT_CLEAN,
  };
}

/* ============================================================
   Lookup
   ============================================================ */

/**
 * Resolve a canonical `cand-*` id to a full `CandidateProfile`.
 * Returns `null` when the id doesn't match any managed candidate —
 * the dynamic route then calls Next.js `notFound()`.
 */
export function getCandidateProfile(id: string): CandidateProfile | null {
  const base = managedCandidates.find((c) => c.id === id);
  if (!base) return null;
  const extras = RICH_PROFILES[id] ?? liteProfile(base);
  return { ...base, ...extras };
}

/** Static list of all valid candidate ids — useful for build-time pre-rendering. */
export const ALL_CANDIDATE_IDS: ReadonlyArray<string> = managedCandidates.map(
  (c) => c.id,
);
