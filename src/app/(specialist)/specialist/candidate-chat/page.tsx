import { Suspense } from "react";
import { CandidateChatApp } from "@/components/specialist/candidate-chat/candidate-chat-app";

/**
 * Candidate chat surface. URL state: `?id=<conversationId>` controls
 * the active thread. Direct URL load like
 * `/specialist/candidate-chat?id=cand-anand-patel` opens Anand's
 * conversation immediately.
 *
 * `useSearchParams` requires a Suspense boundary on Next 15+ (the
 * boundary is what allows the page to remain statically renderable
 * up to the params-read; the inner Client component re-renders on
 * the client when the URL changes). Empty fallback because the
 * boundary resolves on the client almost instantly.
 */
export default function CandidateChatPage() {
  return (
    <Suspense fallback={null}>
      <CandidateChatApp />
    </Suspense>
  );
}
