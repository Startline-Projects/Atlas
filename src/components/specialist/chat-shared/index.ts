/**
 * Barrel for chat-shared components. Same discipline as
 * `queue-shared/` and `people-shared/`: actually shared by
 * candidate-chat AND client-chat, no per-view forks.
 *
 * Server: chat-shell, chat-header, context-strip, conv-row,
 *   message-list, message-bubble, attachment-card, empty-state,
 *   chat-avatar.
 * Client: conv-rail (selection + search + filter state),
 *   conv-filters, composer, ai-suggest-panel, templates-popover,
 *   message-list-auto-scroll (effect-only sentinel).
 */

export { ChatShell } from "./chat-shell";
export { ChatAvatar } from "./chat-avatar";
export { ChatHeader } from "./chat-header";
export { ContextStrip } from "./context-strip";
export { ConvRow } from "./conv-row";
export { ConvRail } from "./conv-rail";
export type { FilterDef } from "./conv-rail";
export { ConvFilters } from "./conv-filters";
export { MessageList } from "./message-list";
export { MessageBubble } from "./message-bubble";
export { AttachmentCard } from "./attachment-card";
export { Composer } from "./composer";
export { AiSuggestPanel } from "./ai-suggest-panel";
export { TemplatesPopover } from "./templates-popover";
export { EmptyChatState } from "./empty-state";
