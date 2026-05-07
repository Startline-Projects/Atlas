/**
 * Types shared by `candidate-chats.ts` and `client-chats.ts`.
 *
 * Same lite-vs-full pattern Session 3 used for ManagedCandidate /
 * CandidateProfile: `ChatConversationLite` is the row-level shape
 * consumed by the conversation-list rail; `CandidateChatThread` and
 * `ClientChatThread` are the full-detail shapes consumed by the main
 * pane.
 *
 * Both threads share the same message/attachment/template shapes —
 * the only structural difference is the avatar style (gradient circle
 * vs rounded-square logo) and the discriminator field (`candidateId`
 * vs `clientId`).
 */

import type { AvatarGradientKey } from "./queue-types";

/* ============================================================
   Message kinds
   ============================================================ */

/**
 * Per PDF Step 6 / Step 8, "internal-note" is a specialist-only
 * variant — visible to specialists in the thread, NOT delivered to
 * the candidate or client. UI must render this distinct (amber bg +
 * 🔒 icon + caption) so the specialist never confuses it for a
 * normal outgoing message.
 */
export type MessageKind =
  | "incoming"
  | "outgoing"
  | "system"
  | "internal-note";

/** Read receipt for outgoing messages. Optional. */
export type ReadReceipt = "sent" | "delivered" | "read";

/* ============================================================
   Attachments — placeholders only this session
   ============================================================ */

export type AttachmentKind = "doc" | "pdf" | "image" | "spreadsheet";

export type ChatAttachment = {
  id: string;
  filename: string;
  /** Pre-formatted ("1.2 MB", "412 KB"). */
  size: string;
  kind: AttachmentKind;
};

/* ============================================================
   Single message
   ============================================================ */

export type ChatMessage = {
  id: string;
  kind: MessageKind;
  /** Plain-text body. Multiline OK; rendered with `whitespace-pre-line`. */
  body: string;
  /** Pre-formatted timestamp ("2:34 PM", "Yesterday", "Mon"). */
  timestamp: string;
  /** Outgoing-only. */
  readReceipt?: ReadReceipt;
  /** Optional single attachment placeholder. */
  attachment?: ChatAttachment;
};

/* ============================================================
   AI suggestion — static text per conversation
   ============================================================ */

export type AiSuggestion = {
  /** The suggested reply text. */
  text: string;
  /** Optional one-line rationale (rendered as small label below the text). */
  rationale?: string;
};

/* ============================================================
   Quick templates — static lists per view (candidate vs client)
   ============================================================ */

export type ChatTemplate = {
  /** Stable id used for selection callbacks. */
  key: string;
  title: string;
  preview: string;
  /** Full body to populate the composer with. */
  body: string;
};

/* ============================================================
   Conversation list row — consumed by the conv-list rail
   ============================================================ */

export type ConversationStatus = "online" | "away" | "offline";

/** Available filter-chip keys, derived from `tags`. */
export type ConversationFilter = "all" | "unread" | "flagged" | "briefs";

export type ChatConversationLite = {
  /** Stable id — matches the underlying candidate or client id. */
  id: string;
  /** "Marie Okonkwo" / "Acme Co" — header + row title. */
  title: string;
  /** Two-character glyph for the avatar/logo. */
  initials: string;
  /** Country flag for candidate; absent for client. */
  countryFlag?: string;
  /** Last message preview shown in the row. */
  preview: string;
  /** Pre-formatted relative timestamp ("2h", "Yesterday", "Mon"). */
  timestamp: string;
  /** 0 = read; > 0 = unread count badge. */
  unread: number;
  /** Online status dot on the row avatar. */
  status: ConversationStatus;
  /** Tag set drives the filter chips ("unread", "flagged", "briefs"). */
  tags: ReadonlyArray<ConversationFilter>;
  /** Flagged conversations get a star/dot in the row. */
  flagged?: boolean;
  /** Pinned conversations float to the top of the list. */
  pinned?: boolean;
};

/* ============================================================
   Header metadata segments — drives the header meta line
   ============================================================ */

export type MetaSegment =
  | { kind: "tier"; label: string; tone?: "elite" | "thriving" | "default" }
  | { kind: "text"; value: string }
  | { kind: "online"; value: string };

/* ============================================================
   Context strip cell
   ============================================================ */

export type ContextCell = {
  label: string;
  value: string;
  tone?: "default" | "success" | "amber" | "danger";
};

/* ============================================================
   Full conversation thread — candidate variant
   ============================================================ */

export type CandidateChatThread = ChatConversationLite & {
  kind: "candidate";
  /** Cross-session canonical id; matches `cand-*` from my-candidates. */
  candidateId: string;
  avatarGradient?: AvatarGradientKey;
  metaLine: ReadonlyArray<MetaSegment>;
  contextStrip: ReadonlyArray<ContextCell>;
  messages: ReadonlyArray<ChatMessage>;
  aiSuggestion?: AiSuggestion;
  /**
   * PDF Step 6 — conversation tagging (sourcing/support/dispute/training/vacation).
   * Carried on the type for future filter & analytics; UI doesn't surface
   * these prominently this session.
   */
  conversationTags?: ReadonlyArray<
    "sourcing" | "support" | "dispute" | "training" | "vacation" | "performance"
  >;
};

/* ============================================================
   Full conversation thread — client variant
   ============================================================ */

export type ClientChatThread = ChatConversationLite & {
  kind: "client";
  /** Cross-session canonical id; matches `client-*` from my-clients. */
  clientId: string;
  /** Logo gradient bucket 1–4 (matches `ManagedClient.logoGradient`). */
  logoVariant: 1 | 2 | 3 | 4;
  metaLine: ReadonlyArray<MetaSegment>;
  contextStrip: ReadonlyArray<ContextCell>;
  messages: ReadonlyArray<ChatMessage>;
  aiSuggestion?: AiSuggestion;
  /**
   * PDF Step 8 — conversation tagging (shortlist request, dispute, market
   * rate question, hiring strategy, replacement request).
   */
  conversationTags?: ReadonlyArray<
    "shortlist" | "dispute" | "rates" | "strategy" | "replacement" | "renewal"
  >;
};

/** Union — useful for shared chat-shared/ components that don't care which side. */
export type ChatThread = CandidateChatThread | ClientChatThread;
