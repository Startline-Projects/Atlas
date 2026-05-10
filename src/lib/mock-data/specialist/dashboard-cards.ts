/**
 * Cards rendered on the specialist dashboard:
 *   - urgent action panel (red / orange / yellow priority)
 *   - "candidates needing my action" three-column section
 *   - "clients needing my action" three-column section
 *   - recent activity feed
 *
 * Priority semantics (spec §"Top action panel"):
 *   - red: urgent — SLA at risk in the next few hours
 *   - orange: today — needs to be resolved today
 *   - yellow: this week — keep on radar
 *
 * Card types: Review · Dispute · Client request · Pool alert.
 *
 * Data here is a curated snapshot matching the HTML at lines 14207+.
 * It is hand-authored, not generated, so future sessions can extend the
 * shapes without breaking this file.
 */

export type Urgency = "red" | "orange" | "yellow";

export type UrgentCardType =
  | "Review queue"
  | "Dispute"
  | "Client request"
  | "Pool alert";

export type UrgentCardAction = {
  label: string;
  /** Optional href; if absent, a future session will wire this to a server action. */
  href?: string;
};

/** A `body` segment is either plain text or text emphasized as <strong>/<em>. */
export type BodySegment =
  | { kind: "text"; value: string }
  | { kind: "strong"; value: string }
  | { kind: "em"; value: string };

export type UrgentCard = {
  id: string;
  urgency: Urgency;
  type: UrgentCardType;
  /** Free-form pre-formatted SLA chip ("14h left", "Today", "This week"). */
  sla: string;
  /** Body composed of plain + emphasized segments — preserves the HTML's mixed content. */
  body: ReadonlyArray<BodySegment>;
  primaryAction: UrgentCardAction;
  secondaryAction?: UrgentCardAction;
};

export const urgentCards: ReadonlyArray<UrgentCard> = [
  {
    id: "uc-dispute-acme-sofia",
    urgency: "red",
    type: "Dispute",
    sla: "14h left",
    body: [
      { kind: "text", value: "Open dispute between " },
      { kind: "strong", value: "Acme Co" },
      { kind: "text", value: " and " },
      { kind: "em", value: "Sofia Reyes" },
      {
        kind: "text",
        value:
          " over hours billed week of Apr 21. Both parties have responded.",
      },
    ],
    primaryAction: { label: "Open dispute", href: "/specialist/disputes" },
    secondaryAction: { label: "Message both" },
  },
  {
    id: "uc-review-sla",
    urgency: "red",
    type: "Review queue",
    sla: "2h left",
    body: [
      { kind: "strong", value: "3 candidates" },
      { kind: "text", value: " waiting in your queue. Oldest is " },
      { kind: "em", value: "Marie Okonkwo" },
      { kind: "text", value: " at 22h — SLA breach risk." },
    ],
    primaryAction: { label: "Open queue", href: "/specialist/review-queue" },
    secondaryAction: { label: "Sort by oldest" },
  },
  {
    id: "uc-shortlist-mercer",
    urgency: "orange",
    type: "Client request",
    sla: "Today",
    body: [
      { kind: "text", value: "Shortlist incomplete for " },
      { kind: "strong", value: "Mercer Capital" },
      { kind: "text", value: "'s " },
      { kind: "em", value: "Bilingual VA" },
      {
        kind: "text",
        value: " role — 1 of 5 matched. Need 4 more with QuickBooks & Spanish.",
      },
    ],
    primaryAction: { label: "Source candidates" },
    secondaryAction: { label: "View role" },
  },
  {
    id: "uc-shortlist-northbeam",
    urgency: "orange",
    type: "Client request",
    sla: "Today",
    body: [
      { kind: "strong", value: "Northbeam" },
      { kind: "text", value: " hasn't received a shortlist for their " },
      { kind: "em", value: "Operations VA" },
      { kind: "text", value: " role posted 3 days ago." },
    ],
    primaryAction: { label: "Build shortlist" },
  },
  {
    id: "uc-pool-alert-va",
    urgency: "yellow",
    type: "Pool alert",
    sla: "This week",
    body: [
      { kind: "text", value: "Pool depletion alert: " },
      { kind: "strong", value: "Virtual Assistants" },
      { kind: "text", value: " has 18 active candidates (threshold 15)." },
    ],
    primaryAction: { label: "Start sourcing sprint" },
    secondaryAction: { label: "View pool" },
  },
];

/* ============================================================
   Three-column "active items" rows (spec §"My active items")
   ============================================================ */

export type CandidateActionItem = {
  id: string;
  candidateName: string;
  /** Human-readable summary of what's needed ("Profile revision", "Re-interview"). */
  needs: string;
  /** Avatar gradient. */
  avatarFrom: string;
  avatarTo: string;
  /** When did this become actionable, in human-readable form ("2h ago"). */
  becameActionable: string;
  /** Initials shown inside the avatar circle. */
  initials: string;
};

export const candidateActions: ReadonlyArray<CandidateActionItem> = [
  {
    id: "ca-marie",
    candidateName: "Marie Okonkwo",
    initials: "MO",
    needs: "Awaiting your review · 22h",
    avatarFrom: "#FFD6A5",
    avatarTo: "#FFA07A",
    becameActionable: "22h ago",
  },
  {
    id: "ca-kenji",
    candidateName: "Kenji Watanabe",
    initials: "KW",
    needs: "Profile revisions submitted",
    avatarFrom: "#A8C8FF",
    avatarTo: "#6A8EFF",
    becameActionable: "4h ago",
  },
  {
    id: "ca-priya",
    candidateName: "Priya Sundaram",
    initials: "PS",
    needs: "Re-interview requested",
    avatarFrom: "#D6F24D",
    avatarTo: "#A8D821",
    becameActionable: "1d ago",
  },
];

export type ClientActionItem = {
  id: string;
  clientName: string;
  /** "Shortlist request" / "Dispute opened" / "Market rate question". */
  request: string;
  timeElapsed: string;
};

export const clientActions: ReadonlyArray<ClientActionItem> = [
  {
    id: "cl-mercer",
    clientName: "Mercer Capital",
    request: "Shortlist incomplete · Bilingual VA",
    timeElapsed: "5h ago",
  },
  {
    id: "cl-northbeam",
    clientName: "Northbeam",
    request: "Shortlist not yet sent · Operations VA",
    timeElapsed: "3d ago",
  },
  {
    id: "cl-acme",
    clientName: "Acme Co",
    request: "Dispute open · billing week of Apr 21",
    timeElapsed: "58h ago",
  },
];

export type ActivityEvent = {
  id: string;
  /** Concise summary of the event. */
  text: string;
  kind: "candidate-signup" | "job-post" | "dispute-resolved" | "hire";
  when: string;
};

export const activityFeed: ReadonlyArray<ActivityEvent> = [
  {
    id: "ev-1",
    kind: "hire",
    text: "Sofia Reyes was hired by Acme Co for $32/hr.",
    when: "2h ago",
  },
  {
    id: "ev-2",
    kind: "candidate-signup",
    text: "New candidate signed up via your affiliate link: Diego Hernandez.",
    when: "3h ago",
  },
  {
    id: "ev-3",
    kind: "job-post",
    text: "Mercer Capital posted a new Bilingual VA role.",
    when: "6h ago",
  },
  {
    id: "ev-4",
    kind: "dispute-resolved",
    text: "Dispute Mercer × Reyes resolved in your favor.",
    when: "1d ago",
  },
  {
    id: "ev-5",
    kind: "candidate-signup",
    text: "New candidate Anika Patel applied directly.",
    when: "1d ago",
  },
];

/* ============================================================
   Right rail — quick actions + on-call + daily-activity prompt
   ============================================================ */

export type QuickAction = {
  key: "source" | "view-pool" | "submit-daily" | "msg-candidate" | "msg-client";
  label: string;
  /** Stable icon key — Sidebar/Rail components own the SVG mapping. */
  iconKey: "plus" | "pool" | "calendar" | "candidate-msg" | "client-msg";
  /** Optional Next.js route — when present the card renders as a <Link>. */
  href?: string;
};

export const quickActions: ReadonlyArray<QuickAction> = [
  { key: "source", label: "Source candidate", iconKey: "plus" },
  { key: "view-pool", label: "View pool", iconKey: "pool", href: "/specialist/pool-health" },
  { key: "submit-daily", label: "Submit daily activity", iconKey: "calendar", href: "/specialist/daily-activity" },
  { key: "msg-candidate", label: "Message a candidate", iconKey: "candidate-msg", href: "/specialist/candidate-chat" },
  { key: "msg-client", label: "Message a client", iconKey: "client-msg", href: "/specialist/client-chat" },
];
