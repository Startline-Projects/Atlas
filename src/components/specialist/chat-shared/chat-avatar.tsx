/**
 * Avatar / logo shared by `ConvRow` and `ChatHeader`. Discriminates on
 * the thread shape: candidate threads use a gradient circle (matching
 * the queue-rail avatars); client threads use a flat-color rounded
 * square (matching the my-clients logo box).
 *
 * Server Component. Sizes:
 *   - "sm"  = 36×36 (conv-row)
 *   - "md"  = 40×40 (chat-header)
 *
 * The `status` dot in the bottom-right is rendered ONLY at "sm" size —
 * matches the source HTML where the chat-header doesn't repeat the
 * status dot (the meta line says "ONLINE" / "AWAY" / "OFFLINE"
 * instead).
 */

import { AVATAR_GRADIENTS } from "@/lib/mock-data/specialist/queue-types";
import type { AvatarGradientKey } from "@/lib/mock-data/specialist/queue-types";
import type {
  CandidateChatThread,
  ClientChatThread,
  ConversationStatus,
} from "@/lib/mock-data/specialist/chat-types";
import { cn } from "@/lib/utils/cn";

/** Client logo gradient buckets — mirror of `.mcl-logo.lg-*` in source HTML. */
const CLIENT_LOGO_BG: Record<1 | 2 | 3 | 4, { bg: string; text: string }> = {
  1: { bg: "#16213E", text: "#fbf8f2" }, // navy
  2: { bg: "#2B2A26", text: "#d6f24d" }, // ink-soft + lime text
  3: { bg: "#4D5A28", text: "#fbf8f2" }, // olive-deep
  4: { bg: "#6F4439", text: "#fbf8f2" }, // terracotta-deep
};

/** Candidate-side gradient resolver. Falls back to caramel. */
function gradientStyle(key: AvatarGradientKey | undefined): React.CSSProperties {
  const g = AVATAR_GRADIENTS[key ?? "caramel"];
  return { background: `linear-gradient(135deg, ${g.from}, ${g.to})` };
}

/**
 * Box size + typography per kind. Matches source CSS exactly:
 *
 *   candidate (.cc-conv-avatar / .cc-header-avatar)
 *     mono · weight 600 · 0.02em tracking · 12px (rail) / 14px (header)
 *
 *   client (.cc-conv-client-logo / .cc-client-logo overrides)
 *     display · opsz 36 · weight 500 · no extra tracking · 12px (rail) / 13px (header)
 *
 * The `font-variation-settings: "opsz" 36` rule on the client variant
 * lives in the inline style below — Tailwind v4 doesn't ship a utility
 * for font-variation-settings, so it's set on the element directly.
 */
const SIZE_CLASS: Record<"candidate" | "client", Record<"sm" | "md", string>> = {
  candidate: {
    sm: "h-9 w-9 text-[12px] font-mono font-semibold tracking-wider",
    md: "h-10 w-10 text-[14px] font-mono font-semibold tracking-wider",
  },
  client: {
    sm: "h-9 w-9 text-[12px] font-display font-medium",
    md: "h-10 w-10 text-[13px] font-display font-medium",
  },
};

/** Status-dot tone (matches the conv-row design from the HTML). */
const STATUS_DOT: Record<ConversationStatus, string> = {
  online: "bg-success",
  away: "bg-amber",
  offline: "bg-ink-mute",
};

type Thread = CandidateChatThread | ClientChatThread;

export function ChatAvatar({
  thread,
  size,
  showStatusDot = false,
  /** Background ring around the status dot. Defaults to paper (rail bg);
   *  pass "cream" for the active row where the row bg is cream. */
  dotRing = "paper",
}: {
  thread: Thread;
  size: "sm" | "md";
  showStatusDot?: boolean;
  dotRing?: "paper" | "cream";
}) {
  const isCandidate = thread.kind === "candidate";

  const style: React.CSSProperties = isCandidate
    ? gradientStyle(thread.avatarGradient)
    : {
        background: CLIENT_LOGO_BG[thread.logoVariant].bg,
        color: CLIENT_LOGO_BG[thread.logoVariant].text,
        // Source CSS: `font-variation-settings: "opsz" 36` on
        // .cc-client-logo / .cc-conv-client-logo (FA-1 / FA-2 fix in 6.4).
        fontVariationSettings: '"opsz" 36',
      };

  return (
    <div
      className={cn(
        "relative grid flex-shrink-0 place-items-center rounded-lg text-paper",
        SIZE_CLASS[isCandidate ? "candidate" : "client"][size],
      )}
      style={style}
      aria-hidden="true"
    >
      {thread.initials}
      {showStatusDot ? (
        <span
          className={cn(
            "absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2",
            dotRing === "cream" ? "border-cream" : "border-paper",
            STATUS_DOT[thread.status],
          )}
        />
      ) : null}
    </div>
  );
}
