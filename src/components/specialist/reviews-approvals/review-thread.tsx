/**
 * Discussion thread — renders a list of `ReviewThreadMessage`s.
 *
 * Server Component (the auto-scroll-to-bottom-on-new-message sentinel
 * is the same Client primitive that chat-shared uses; importing it
 * keeps the thread itself Server).
 */

import type { ReviewThreadMessage } from "@/lib/mock-data/specialist/reviews-approvals";
import { MessageListAutoScroll } from "@/components/specialist/chat-shared/message-list-auto-scroll";
import { ReviewThreadMessageRow } from "./review-thread-message";

export function ReviewThread({
  messages,
}: {
  messages: ReadonlyArray<ReviewThreadMessage>;
}) {
  return (
    <div className="flex flex-col gap-3">
      {messages.map((m) => (
        <ReviewThreadMessageRow key={m.id} msg={m} />
      ))}
      <MessageListAutoScroll deps={messages.length} />
    </div>
  );
}
