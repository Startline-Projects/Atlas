import { Suspense } from "react";
import { ClientChatApp } from "@/components/specialist/client-chat/client-chat-app";

/**
 * Client chat surface. URL state: `?id=<conversationId>` controls
 * the active thread. Direct URL load like
 * `/specialist/client-chat?id=client-acme-co` opens that
 * conversation immediately.
 *
 * `useSearchParams` requires a Suspense boundary on Next 15+. Empty
 * fallback because the boundary resolves on the client almost
 * instantly.
 */
export default function ClientChatPage() {
  return (
    <Suspense fallback={null}>
      <ClientChatApp />
    </Suspense>
  );
}
