"use client";

/**
 * Candidate-chat orchestrator. Reads `?id=<conversationId>` from the
 * URL, resolves it to a `CandidateChatThread`, and drives the
 * chat-shared/ components.
 *
 * State owned here:
 *   - `localAppends`: per-thread array of `ChatMessage`s appended by
 *     the composer this session. Page reload resets — that's by
 *     design (no persistence layer until services land).
 *   - `composerByThread`: per-thread textarea draft so switching
 *     threads doesn't lose what the user was typing.
 *   - `dismissedSuggestions`: per-thread Set of thread ids whose AI
 *     suggestion has been dismissed (or "Use this"-d) this session.
 *     Per directive 5: "don't auto-show again on the same conversation
 *     in the same session".
 *
 * URL state:
 *   - useSearchParams() to read the active id (no useState mirror —
 *     URL is the source of truth)
 *   - useRouter().replace() (not push) when switching threads, so
 *     back-button history doesn't pollute with every thread click.
 *
 * Empty / invalid id: render `<EmptyChatState>` in the main pane. The
 * rail still shows. No notFound() — the rail is always there.
 */

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  candidateChatThreads,
  CANDIDATE_CHAT_FILTERS,
  CANDIDATE_CHAT_LIST_TITLE,
  CANDIDATE_CHAT_TEMPLATES,
} from "@/lib/mock-data/specialist/candidate-chats";
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

const FILTERS: ReadonlyArray<FilterDef> = CANDIDATE_CHAT_FILTERS.map((f) => ({
  key: f.key as ConversationFilter,
  label: f.label,
}));

/** Migration-note caption per CONVERSION_LOG. */
const COMPOSER_STATUS = "Encrypted in transit";

export function CandidateChatApp() {
  const router = useRouter();
  const params = useSearchParams();
  const idFromUrl = params.get("id");

  /* Resolve active thread (or undefined for empty state). */
  const activeThread = useMemo(() => {
    if (!idFromUrl) return undefined;
    return candidateChatThreads.find((t) => t.id === idFromUrl);
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
      router.replace(`/specialist/candidate-chat?${next.toString()}`);
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
      // Clear the composer for this thread.
      setComposerByThread((prev) => ({ ...prev, [activeThread.id]: "" }));
    },
    [activeThread],
  );

  const handleAiUse = useCallback(
    (text: string) => {
      if (!activeThread) return;
      // Populate composer with the suggestion text.
      setComposerByThread((prev) => ({ ...prev, [activeThread.id]: text }));
      // Hide the panel for the rest of the session.
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
          title={CANDIDATE_CHAT_LIST_TITLE}
          threads={candidateChatThreads}
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
                placeholder={`Message ${activeThread.title.split(" ")[0]}…`}
                value={composerValue}
                onValueChange={handleComposerChange}
                onSend={handleSend}
                onAiTrigger={
                  activeThread.aiSuggestion ? handleAiTrigger : undefined
                }
                templates={CANDIDATE_CHAT_TEMPLATES}
                statusCaption={COMPOSER_STATUS}
              />
            </>
          ) : (
            <EmptyChatState />
          )}
        </main>
      }
    />
  );
}
