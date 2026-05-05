/**
 * Types shared by `review-queue.ts` and `recert-queue.ts`.
 *
 * These mirror the future API payload — when services land, the same
 * shapes will be returned by `apiClient.specialist.reviewQueue.list()`
 * etc., so component imports won't change.
 *
 * Naming convention (Session 2): the queue rail row carries every field
 * needed to render the row alone (no detail-pane fields). The
 * `*Detail` blocks carry section-pane fields and are looked up by id
 * when the user selects a candidate.
 */

/* ============================================================
   Avatar gradient pairs (decorative)
   ============================================================ */

export type AvatarGradient = { from: string; to: string };

/** Stable named gradients used by both queue rails and detail panes. */
export const AVATAR_GRADIENTS = {
  caramel: { from: "#B89478", to: "#6E4830" },
  navy: { from: "#4F6FA8", to: "#233458" },
  olive: { from: "#8C9D5A", to: "#4D5A28" },
  terracotta: { from: "#B5786B", to: "#6F4439" },
  purple: { from: "#7E6FA8", to: "#423564" },
  teal: { from: "#5A8A8C", to: "#2B5054" },
  warm: { from: "#FFD6A5", to: "#FFA07A" },
  lime: { from: "#D6F24D", to: "#A8D821" },
  ice: { from: "#A8C8FF", to: "#6A8EFF" },
} as const satisfies Record<string, AvatarGradient>;

export type AvatarGradientKey = keyof typeof AVATAR_GRADIENTS;

/* ============================================================
   AI score blocks (used by both Interview cards and the
   composite IV-cards on Overview / AI assessment)
   ============================================================ */

export type ScoreBand = "high" | "mid" | "low";

export type AiScoreSubItem = {
  label: string;
  /** 0–100 numeric score, or `null` when the sub uses a short text value (e.g. "2/3"). */
  score: number | null;
  /** Optional short text override displayed instead of the number ("2/3", "C2"). */
  display?: string;
  band: ScoreBand;
  /** 0–100 width for the bar; defaults to `score` when not set. */
  barPct?: number;
};

export type IvCardData = {
  /** Overall numeric score, e.g. 87. */
  overall: number;
  /** Tier label shown next to the overall ("★ Strong fit", "★ APPROVE"). */
  tierLabel: string;
  /** Color of the overall number — same band scale as sub-items. */
  overallBand: ScoreBand;
  /** Sub-scores rendered as horizontal bar rows. */
  subs: ReadonlyArray<AiScoreSubItem>;
  /** Optional positive / negative bullets. Two heading labels are configurable. */
  highlights?: {
    positiveLabel: string;
    positives: ReadonlyArray<string>;
    negativeLabel: string;
    negatives: ReadonlyArray<string>;
  };
  /** Optional Q/A snippets shown below the highlights. */
  snippets?: ReadonlyArray<{
    tag: string;
    /** Optional warning chip (orange) on the tag. */
    warn?: boolean;
    question: string;
    answer: string;
  }>;
  /** Final commentary block at the bottom. Both fields optional. */
  commentary?: { label: string; body: string };
};

/* ============================================================
   References, anti-cheat, notes — shared between review and recert
   ============================================================ */

/** Spec PDF Step 3 §References — full enum; HTML shows only `confirmed` + `pending`. */
export type ReferenceStatus =
  | "pending"
  | "confirmed"
  | "conflicting"
  | "unreachable";

export type Reference = {
  id: string;
  initials: string;
  /** Optional gradient key; falls back to default cream-deep if absent. */
  avatarGradient?: AvatarGradientKey;
  name: string;
  relation: string;
  quote: string;
  status: ReferenceStatus;
  /** "Verified · Strong" / "Awaiting" / "Conflicting" / "Unreachable". */
  statusLabel: string;
  /** Free-form metadata under the status pill ("Apr 27 · phone (12 min)"). */
  contactMeta: string;
  /** Optional badge to the right of name ("RE-CONFIRMED" / "NEW · ACTIVE CLIENT"). */
  badge?: { label: string; tone: "neutral" | "success" };
};

export type AntiCheatCheck = {
  /** "Identity verification" / "Proctoring" / "Plagiarism check" / "Browser activity" / etc. */
  title: string;
  /** Body copy — may include a `<strong>` segment we render via dangerouslySetInnerHTML
   * is overkill; instead we accept a plain string and the component wraps key numbers. */
  detail: string;
  passed: boolean;
};

export type AntiCheatBlock = {
  checks: ReadonlyArray<AntiCheatCheck>;
  /** Bottom summary bar ("All anti-cheat checks passed cleanly..."). */
  summary: string;
  /** True if any check failed — drives the dot indicator on the tab and the rail row. */
  flagsRaised: boolean;
};

/* ============================================================
   Decision bar config (button labels differ per queue)
   ============================================================ */

export type DecisionBarConfig = {
  /** "AI recommends APPROVE" / "AI recommends RE-CERTIFY + UPGRADE" — pre-formatted. */
  aiRecommendation: string;
  /** "91% confidence" — pre-formatted. */
  aiConfidence: string;
  /** Average specialist time on this kind of review ("22m"). */
  averageMinutes: string;
  /** Sections-reviewed progress count + total. */
  sectionsReviewed: number;
  sectionsTotal: number;
  /** Three-button labels in order: destructive · neutral · primary. */
  destructive: { label: string; longLabel?: string };
  neutral: { label: string; longLabel?: string };
  primary: { label: string };
};

/* ============================================================
   Tab definitions (used by ReviewTabs)
   ============================================================ */

export type TabBadge =
  | { kind: "number"; value: string | number }
  /** Small dot indicator (anti-cheat warn). */
  | { kind: "dot"; tone?: "default" | "danger" };

export type TabDef = {
  /** Stable key used both for the URL hash anchor and for the active state. */
  key: string;
  label: string;
  badge?: TabBadge;
};
