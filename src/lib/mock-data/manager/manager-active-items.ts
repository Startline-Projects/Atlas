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
 * ## Denormalized specialist + candidate + client names
 *
 * All identity references are plain strings.
 *
 * TODO(step-4): refactor specialist names + initials + countryFlag
 * to reference canonical `spec-*` ids once Step 4 lands the
 * 11-specialist roster in `team.ts`. Grep `TODO(step-4)` to find
 * every site.
 *
 * TODO(step-7): refactor dispute owner attribution (the "Owner:
 * Lucas Andersen" lines) to reference dispute records once Step 7
 * lands `manager-team-disputes-data.ts`. The "Owner: you" phrasing
 * means owned by the current Manager — translate via
 * `currentManager` in Step 7.
 *
 * Sofia Reyes × Quill & Co dispute is `DSP-2026-04-12` — the
 * canonical dispute locked at the start of the initiative.
 */

export type ActiveNeedTone = "urgent" | "attn" | "neutral";

/** A row in the "Specialists need attention" column. */
export type ActiveSpecialistRow = {
  id: string;
  /** Initials shown in the cl-{N} avatar circle. */
  initials: string;
  /** Color slot (1-5 in prototype). Maps to existing Atlas avatar
   *  gradients via a one-off mapping in the section component. */
  colorSlot: 1 | 2 | 3 | 4 | 5;
  /** Specialist full name. TODO(step-4): replace with spec-* id lookup. */
  fullName: string;
  /** Country flag emoji. TODO(step-4): derive from spec-*.countryCode. */
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

export const activeSpecialistsNeedingAttention: ReadonlyArray<ActiveSpecialistRow> =
  [
    /* TODO(step-4): swap denormalized rows for spec-* lookups */
    {
      id: "asra-priya",
      initials: "PM",
      colorSlot: 2,
      fullName: "Priya Mehra",
      countryFlag: "🇮🇳",
      needTag: { label: "Daily activity", tone: "urgent" },
      detail: "Missed 2 days running",
    },
    {
      id: "asra-diego",
      initials: "DC",
      colorSlot: 3,
      fullName: "Diego Cabrera",
      countryFlag: "🇲🇽",
      needTag: { label: "Review SLA", tone: "attn" },
      detail: "Hit rate dropped to 85%",
    },
    {
      id: "asra-aisha",
      initials: "AB",
      colorSlot: 4,
      fullName: "Aisha Bello",
      countryFlag: "🇳🇬",
      needTag: { label: "Review", tone: "attn" },
      detail: "Performance review overdue",
    },
    {
      id: "asra-lucas",
      initials: "LA",
      colorSlot: 5,
      fullName: "Lucas Andersen",
      countryFlag: "🇸🇪",
      needTag: { label: "Capacity", tone: "neutral" },
      detail: "4 reviews pending past 18h",
    },
  ];

export const activeDisputesNeedingOversight: ReadonlyArray<ActiveDisputeRow> = [
  /* TODO(step-7): refactor to reference manager-team-disputes-data
     records once Step 7 lands. Sofia × Quill is DSP-2026-04-12. */
  {
    id: "adn-quill-minjun",
    initials: "QC",
    colorSlot: 4,
    title: "Quill & Co × Min-Jun Park",
    slaTag: { label: "9h SLA", tone: "urgent" },
    owner: { youOwn: false, specialistName: "Lucas Andersen" },
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
    owner: { youOwn: false, specialistName: "Diego Cabrera" },
  },
  {
    id: "adn-lumio-felipe",
    initials: "LH",
    colorSlot: 3,
    title: "Lumio Health × Felipe Santos",
    slaTag: { label: "56h SLA", tone: "neutral" },
    owner: { youOwn: false, specialistName: "Yara Khalil" },
  },
];

export const recentTeamActivity: ReadonlyArray<ActivityFeedItem> = [
  {
    id: "rta-yara-approve",
    kind: "review",
    body: [
      /* TODO(step-4): swap "Yara Khalil" / "Aaliyah Kone" for canonical refs */
      { kind: "strong", value: "Yara Khalil" },
      { kind: "text", value: " approved " },
      { kind: "strong", value: "Aaliyah Kone" },
      { kind: "text", value: " to go live." },
    ],
    when: "5 min ago",
  },
  {
    id: "rta-diego-resolve",
    kind: "neutral",
    body: [
      { kind: "strong", value: "Diego Cabrera" },
      { kind: "text", value: " resolved the Mercer × Hana dispute." },
    ],
    when: "28 min ago",
  },
  {
    id: "rta-lucas-daily",
    kind: "neutral",
    body: [
      { kind: "strong", value: "Lucas Andersen" },
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
      { kind: "strong", value: "Felipe Santos" },
      { kind: "text", value: " opened dispute with Lumio Health." },
    ],
    when: "2h ago",
  },
  {
    id: "rta-minjun-recert",
    kind: "review",
    body: [
      { kind: "strong", value: "Min-Jun Park" },
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
