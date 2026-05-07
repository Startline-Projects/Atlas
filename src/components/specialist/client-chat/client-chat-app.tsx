"use client";

/**
 * Client-chat orchestrator. Mirror of `candidate-chat-app.tsx` —
 * same chat-shared/ pieces, same URL-state pattern, same composer
 * behavior. Differences from the candidate side:
 *
 *   - Mock data:        clientChatThreads + CLIENT_CHAT_*
 *   - Filter chips:     All / Unread / With briefs (no "Flagged" —
 *                        per HTML, flagged is candidate-internal)
 *   - Templates:        Quarterly check-in / Send shortlist / Rate
 *                        adjustment / Contract renewal
 *   - Status caption:   "Logged to client record · audit-tracked"
 *                        (verbatim per CONVERSION_LOG migration note)
 *   - Router target:    /specialist/client-chat
 *   - Empty state:      "Select a client" (italic noun differs)
 *
 * The chat-shared components (ChatHeader, ChatAvatar, MessageBubble,
 * etc.) all dispatch internally on `thread.kind` so this app passes
 * the thread object straight through with no per-side wrapping.
 */

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  clientChatThreads,
  CLIENT_CHAT_FILTERS,
  CLIENT_CHAT_LIST_TITLE,
  CLIENT_CHAT_TEMPLATES,
} from "@/lib/mock-data/specialist/client-chats";
import type {
  ChatMessage,
  ConversationFilter,
} from "@/lib/mock-data/specialist/chat-types";

import {
  AiSuggestPanel,
  ChatHeader,
  ChatShell,
  Composer,
  ContextStrip,
  ConvRail,
  EmptyChatState,
  MessageList,
  type FilterDef,
} from "@/components/specialist/chat-shared";

const FILTERS: ReadonlyArray<FilterDef> = CLIENT_CHAT_FILTERS.map((f) => ({
  key: f.key as ConversationFilter,
  label: f.label,
}));

/** Migration-note caption — verbatim per CONVERSION_LOG Session 4. */
const COMPOSER_STATUS = "Logged to client record · audit-tracked";

export function ClientChatApp() {
  const router = useRouter();
  const params = useSearchParams();
  const idFromUrl = params.get("id");

  /* Resolve active thread (or undefined for empty state). */
  const activeThread = useMemo(() => {
    if (!idFromUrl) return undefined;
    return clientChatThreads.find((t) => t.id === idFromUrl);
  }, [idFromUrl]);

  /* Per-thread composer drafts (preserves text on thread switch). */
  const [composerByThread, setComposerByThread] = useState<
    Record<string, string>
  >({});

  /* Per-thread local appends (sent messages this session). */
  const [localAppends, setLocalAppends] = useState<
    Record<string, ReadonlyArray<ChatMessage>>
  >({});

  /* Threads whose AI suggestion has been dismissed this session. */
  const [dismissedSuggestions, setDismissedSuggestions] = useState<
    ReadonlySet<string>
  >(new Set());

  /* ---- Handlers ---- */

  const handleSelect = useCallback(
    (id: string) => {
      // useRouter().replace not push — avoids polluting back history.
      const next = new URLSearchParams(params.toString());
      next.set("id", id);
      router.replace(`/specialist/client-chat?${next.toString()}`);
    },
    [params, router],
  );

  const handleComposerChange = useCallback(
    (next: string) => {
      if (!activeThread) return;
      setComposerByThread((prev) => ({ ...prev, [activeThread.id]: next }));
    },
    [activeThread],
  );

  const handleSend = useCallback(
    (body: string) => {
      if (!activeThread) return;
      const newMsg: ChatMessage = {
        id: `local-${activeThread.id}-${Date.now()}`,
        kind: "outgoing",
        body,
        timestamp: "Just now",
        readReceipt: "sent",
      };
      setLocalAppends((prev) => ({
        ...prev,
        [activeThread.id]: [...(prev[activeThread.id] ?? []), newMsg],
      }));
      setComposerByThread((prev) => ({ ...prev, [activeThread.id]: "" }));
    },
    [activeThread],
  );

  const handleAiUse = useCallback(
    (text: string) => {
      if (!activeThread) return;
      setComposerByThread((prev) => ({ ...prev, [activeThread.id]: text }));
      setDismissedSuggestions((prev) => {
        const next = new Set(prev);
        next.add(activeThread.id);
        return next;
      });
    },
    [activeThread],
  );

  const handleAiDismiss = useCallback(() => {
    if (!activeThread) return;
    setDismissedSuggestions((prev) => {
      const next = new Set(prev);
      next.add(activeThread.id);
      return next;
    });
  }, [activeThread]);

  const handleAiTrigger = useCallback(() => {
    if (!activeThread) return;
    setDismissedSuggestions((prev) => {
      if (!prev.has(activeThread.id)) return prev;
      const next = new Set(prev);
      next.delete(activeThread.id);
      return next;
    });
  }, [activeThread]);

  /* ---- Derived view-model for the active thread ---- */

  const activeMessages = useMemo<ReadonlyArray<ChatMessage>>(() => {
    if (!activeThread) return [];
    const appended = localAppends[activeThread.id] ?? [];
    return [...activeThread.messages, ...appended];
  }, [activeThread, localAppends]);

  const composerValue = activeThread
    ? composerByThread[activeThread.id] ?? ""
    : "";

  const showAiPanel =
    !!activeThread &&
    !!activeThread.aiSuggestion &&
    !dismissedSuggestions.has(activeThread.id);

  /* ---- Render ---- */

  return (
    <ChatShell
      rail={
        <ConvRail
          title={CLIENT_CHAT_LIST_TITLE}
          threads={clientChatThreads}
          filters={FILTERS}
          activeId={activeThread?.id ?? null}
          onSelect={handleSelect}
        />
      }
      main={
        <main className="bg-cream sticky top-[calc(36px+57px)] flex h-[calc(100vh-36px-57px)] min-w-0 flex-col">
          {activeThread ? (
            <>
              <ChatHeader thread={activeThread} />
              <ContextStrip cells={activeThread.contextStrip} />
              <MessageList messages={activeMessages} />
              {showAiPanel && activeThread.aiSuggestion ? (
                <AiSuggestPanel
                  suggestion={activeThread.aiSuggestion}
                  onUse={handleAiUse}
                  onDismiss={handleAiDismiss}
                />
              ) : null}
              <Composer
                placeholder={`Message ${activeThread.title}…`}
                value={composerValue}
                onValueChange={handleComposerChange}
                onSend={handleSend}
                onAiTrigger={
                  activeThread.aiSuggestion ? handleAiTrigger : undefined
                }
                templates={CLIENT_CHAT_TEMPLATES}
                statusCaption={COMPOSER_STATUS}
              />
            </>
          ) : (
            <EmptyChatState
              nounItalic="client"
              message="Pick a client thread from the list, or use compose to start a new one."
            />
          )}
        </main>
      }
    />
  );
}
