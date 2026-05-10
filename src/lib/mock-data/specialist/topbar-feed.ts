/**
 * Topbar interactive feeds — notifications bell + messages icon.
 *
 * These power the three topbar popovers (notifications panel, messages
 * panel, user menu). The data here references real cross-session ids:
 *   - candidates: cand-marie-okonkwo, cand-anand-patel, cand-carmen-lopez
 *   - clients:    client-acme-co, client-quill-co, client-mercer-capital
 *   - disputes:   DSP-2026-04-12 (Acme × Sofia)
 *   - reviews:    REV-* (handled by the inbox-feed in reviews.ts)
 *
 * Future sessions: replace these arrays with `apiClient.specialist
 * .notifications.list()` + `.messages.recent()`. The shapes mirror the
 * future API payload — call sites won't change.
 *
 * ALL action buttons here ("Mark all as read", "View all notifications",
 * "Sign out") are visual-only e.preventDefault() pending services. Item
 * clicks that route into the app DO navigate (the existing target routes
 * are real).
 */

import type { AvatarGradientKey } from "./queue-types";

/* ============================================================
   Notifications — bell icon
   ============================================================ */

export type TopbarNotificationKind =
  | "review"
  | "approved"
  | "dispute"
  | "recert"
  | "system";

export type TopbarNotification = {
  id: string;
  kind: TopbarNotificationKind;
  /** One-line headline ("New review needed", "Dispute updated"). */
  title: string;
  /** Sentence-case body ("Marie Okonkwo's profile is awaiting your review."). */
  detail: string;
  /** Human-readable timestamp ("12m", "2h", "Yesterday"). */
  when: string;
  /** Unread → shows a lime dot in the row gutter. */
  read: boolean;
  /**
   * Optional in-app target. When present, clicking the row navigates
   * (and closes the panel). When absent, click is no-op + close.
   */
  href?: string;
};

export const topbarNotifications: ReadonlyArray<TopbarNotification> = [
  {
    id: "ntf-review-marie",
    kind: "review",
    title: "SLA at risk · 3 candidates",
    detail:
      "Marie Okonkwo has been waiting 22h. Two more in your queue near 18h.",
    when: "12m",
    read: false,
    href: "/specialist/review-queue",
  },
  {
    id: "ntf-approved-marie",
    kind: "approved",
    title: "Marie Okonkwo approved",
    detail:
      "Profile is live in Virtual Assistants. Welcome message dispatched on your behalf.",
    when: "2h",
    read: false,
    href: "/specialist/candidates/cand-marie-okonkwo",
  },
  {
    id: "ntf-dispute-acme",
    kind: "dispute",
    title: "Dispute updated · Acme × Sofia",
    detail:
      "Eleanor (Quill) attached a counter-statement. SLA: 14h left to close.",
    when: "4h",
    read: false,
    href: "/specialist/disputes",
  },
  {
    id: "ntf-recert-anand",
    kind: "recert",
    title: "Re-cert window opens · Anand Patel",
    detail:
      "Cert expires in 14 days. Recommended: schedule a 30-min re-cert call this week.",
    when: "Yesterday",
    read: false,
    href: "/specialist/recert-queue",
  },
  {
    id: "ntf-system-pool",
    kind: "system",
    title: "Pool depletion watch",
    detail:
      "Virtual Assistants holds 18 active candidates — 3 above the depletion threshold of 15.",
    when: "2d",
    read: true,
    href: "/specialist/pool-health",
  },
];

/* ============================================================
   Recent messages — message icon (2 tabs: candidates / clients)
   ============================================================ */

export type TopbarMessageTab = "candidates" | "clients";

export const TOPBAR_MESSAGE_TABS: ReadonlyArray<{
  key: TopbarMessageTab;
  label: string;
}> = [
  { key: "candidates", label: "Candidates" },
  { key: "clients", label: "Clients" },
];

/** Single recent-conversation row, shared shape across both tabs. */
export type TopbarRecentMessage = {
  id: string;
  /** Display name shown in the row ("Anand Patel", "Acme Co"). */
  name: string;
  /** First letter / 2-letter initials shown in the avatar tile. */
  initials: string;
  /** Last-message snippet (sentence-case, truncated by CSS). */
  preview: string;
  /** Human-readable timestamp ("12m", "2h", "Mon"). */
  when: string;
  /** Unread count on this thread; 0 hides the badge. */
  unread: number;
  /** In-app destination — `/specialist/{candidate,client}-chat?id=...`. */
  href: string;
} & (
  | {
      kind: "candidate";
      avatarGradient: AvatarGradientKey;
      countryFlag: string;
    }
  | {
      kind: "client";
      /** 1–6 — picks a brand-glyph tone class in the panel. */
      logoVariant: 1 | 2 | 3 | 4 | 5 | 6;
    }
);

export const topbarRecentCandidates: ReadonlyArray<TopbarRecentMessage> = [
  {
    id: "cand-anand-patel",
    kind: "candidate",
    name: "Anand Patel",
    initials: "A",
    avatarGradient: "caramel",
    countryFlag: "🇮🇳",
    preview:
      "Bandwidth confirmed — go ahead with the 4th. I'll formalize the cap…",
    when: "12m",
    unread: 2,
    href: "/specialist/candidate-chat?id=cand-anand-patel",
  },
  {
    id: "cand-marie-okonkwo",
    kind: "candidate",
    name: "Marie Okonkwo",
    initials: "M",
    avatarGradient: "warm",
    countryFlag: "🇳🇬",
    preview: "Thank you, Miguel! Looking forward to it. Where should I direct…",
    when: "1h",
    unread: 1,
    href: "/specialist/candidate-chat?id=cand-marie-okonkwo",
  },
  {
    id: "cand-marcus-bauer",
    kind: "candidate",
    name: "Marcus Bauer",
    initials: "M",
    avatarGradient: "purple",
    countryFlag: "🇩🇪",
    preview: "Q1 ops summary attached. Three engagements all green.",
    when: "Mon",
    unread: 0,
    href: "/specialist/candidate-chat?id=cand-marcus-bauer",
  },
  {
    id: "cand-sofia-reyes",
    kind: "candidate",
    name: "Sofia Reyes",
    initials: "S",
    avatarGradient: "lime",
    countryFlag: "🇲🇽",
    preview: "Replying with my logs and the signed SOW for the dispute review.",
    when: "Mon",
    unread: 0,
    href: "/specialist/candidate-chat?id=cand-sofia-reyes",
  },
];

export const topbarRecentClients: ReadonlyArray<TopbarRecentMessage> = [
  {
    id: "client-acme-co",
    kind: "client",
    name: "Acme Co",
    initials: "AC",
    logoVariant: 1,
    preview: "Sarah Lin: Anand crushed the Q2 ops report — sending kudos.",
    when: "2h",
    unread: 2,
    href: "/specialist/client-chat?id=client-acme-co",
  },
  {
    id: "client-quill-co",
    kind: "client",
    name: "Quill & Co",
    initials: "QC",
    logoVariant: 2,
    preview:
      "I'd really like to resolve this without escalating further. Open to…",
    when: "5h",
    unread: 1,
    href: "/specialist/client-chat?id=client-quill-co",
  },
  {
    id: "client-mercer-capital",
    kind: "client",
    name: "Mercer Capital",
    initials: "MC",
    logoVariant: 3,
    preview:
      "Following up on the Bilingual VA shortlist — any update on the four…",
    when: "Yesterday",
    unread: 0,
    href: "/specialist/client-chat?id=client-mercer-capital",
  },
];

/* ============================================================
   Tab → "View all" route resolution
   ============================================================ */

/** Footer "View all messages" target, keyed by active tab. */
export const TOPBAR_VIEW_ALL_HREF: Record<TopbarMessageTab, string> = {
  candidates: "/specialist/candidate-chat",
  clients: "/specialist/client-chat",
};

/** Convenience accessor for the badge count on the bell icon. */
export const topbarUnreadNotificationCount: number =
  topbarNotifications.filter((n) => !n.read).length;

/** Convenience accessor for the badge count on the messages icon. */
export const topbarUnreadMessageCount: number = [
  ...topbarRecentCandidates,
  ...topbarRecentClients,
].reduce((sum, m) => sum + (m.unread > 0 ? 1 : 0), 0);
