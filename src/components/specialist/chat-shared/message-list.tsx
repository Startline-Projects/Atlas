/**
 * Scrollable thread of messages. The `flex: 1` + `overflow-y: auto`
 * combo from the source CSS is mirrored here — the parent main pane
 * provides the bounded height; this list scrolls inside it.
 *
 * Server Component. Reads from a frozen `messages` array passed by
 * the parent. Local-state appends (composer send) live one level up
 * in `candidate-chat-app` / `client-chat-app`; this component just
 * renders whatever it's given.
 *
 * Auto-scroll-to-bottom on new-message is handled by a tiny Client
 * sentinel `<MessageListAutoScroll>` exported alongside; the list
 * itself doesn't need to be a Client Component.
 */

import type { ChatMessage } from "@/lib/mock-data/specialist/chat-types";
import { MessageBubble } from "./message-bubble";
import { MessageListAutoScroll } from "./message-list-auto-scroll";

export function MessageList({
  messages,
}: {
  messages: ReadonlyArray<ChatMessage>;
}) {
  // The "key" on the auto-scroll sentinel is `messages.length` so it
  // re-mounts on every append → triggers a fresh scrollIntoView.
  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-8 pt-6 pb-2 max-[700px]:px-4">
      {messages.map((m) => (
        <MessageBubble key={m.id} msg={m} />
      ))}
      <MessageListAutoScroll deps={messages.length} />
    </div>
  );
}
