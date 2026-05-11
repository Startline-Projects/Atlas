"use client";

/**
 * Client-chat orchestrator. Mirror of `candidate-chat-app.tsx` —
 * same chat-shared/ pieces, same URL-state pattern, same composer
 * behavior, same Step 8a chat-header refit. Differences from the
 * candidate side:
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
 *   - **Step 8a chat-header divergence:**
 *     - NO voice-call action (Session 4 convention: telephony is
 *       candidate-only)
 *     - "Send brief" replaces the candidate-side "View profile" slot
 *       behavior — fires `WorkflowUnavailableModal kind="send-brief"`
 *     - Schedule confirm flash uses the full thread title ("Acme Co")
 *       rather than the first-name token (companies don't split on
 *       space cleanly)
 *     - Kebab "View profile" item links to `/specialist/my-clients`
 *       (same fallback as the visible "View client" Link — see
 *       Session 4 forward-looking notes about the missing
 *       client-profile route)
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
  ClientChatThread,
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
import { ApprovedFlash } from "@/components/specialist/queue-shared/approved-flash";
import { useQueuedFlash } from "@/components/specialist/people-shared";
import {
  SchedulingModal,
  formatSchedulePartsForFlash,
  type SchedulePayload,
} from "@/components/specialist/shell/scheduling-modal";
import {
  WorkflowUnavailableModal,
  type WorkflowKind,
} from "@/components/specialist/shell/workflow-unavailable-modal";

const FILTERS: ReadonlyArray<FilterDef> = CLIENT_CHAT_FILTERS.map((f) => ({
  key: f.key as ConversationFilter,
  label: f.label,
}));

/** Migration-note caption — verbatim per CONVERSION_LOG Session 4. */
const COMPOSER_STATUS = "Logged to client record · audit-tracked";

/** Workflow-modal state slot. Only `send-brief` fires from this
 *  surface today; slot is generic for future additions. */
type WorkflowModalState = { workflow: WorkflowKind; subjectName: string } | null;

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

  /* Step 8a — Scheduling modal state (4th consumer site of
     SchedulingModal: my-candidates · candidate-profile ·
     candidate-chat · client-chat). */
  const [schedulingFor, setSchedulingFor] =
    useState<ClientChatThread | null>(null);

  /* Step 8a — Workflow modal slot (currently only `send-brief`). */
  const [workflowModal, setWorkflowModal] = useState<WorkflowModalState>(null);

  /* Step 8a — Single queued-flash for schedule confirm + kebab acks. */
  const { flash, fireQueuedFlash } = useQueuedFlash();

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

  /* ---- Step 8a chat-header callbacks ---- */

  /* Mobile back — drops `?id=`, lands on empty state. */
  const handleMobileBack = useCallback(() => {
    router.replace("/specialist/client-chat");
  }, [router]);

  /* Schedule check-in → opens SchedulingModal pointing at activeThread. */
  const handleSchedule = useCallback(() => {
    if (!activeThread) return;
    setSchedulingFor(activeThread);
  }, [activeThread]);

  /* Schedule confirm → success-tone flash per b58d1ef tone-consistency
     lock. Use the full thread title (company name) — clients don't
     have a friendly first-name split. */
  const handleScheduleConfirm = useCallback(
    (payload: SchedulePayload) => {
      if (!schedulingFor) return;
      const parts = formatSchedulePartsForFlash(payload);
      fireQueuedFlash(
        `Scheduled. ${schedulingFor.title} · ${parts}${payload.videoCall ? " · video link queued" : ""}`,
        {
          tone: "success",
          tail: "Invite pending — scheduling service not yet wired",
        },
      );
      setSchedulingFor(null);
    },
    [schedulingFor, fireQueuedFlash],
  );

  /* Send brief (client-only) → WorkflowUnavailableModal kind="send-brief". */
  const handleSendBrief = useCallback(() => {
    if (!activeThread) return;
    setWorkflowModal({
      workflow: "send-brief",
      subjectName: activeThread.title,
    });
  }, [activeThread]);

  /* Kebab — Search in conversation. */
  const handleSearchInThread = useCallback(() => {
    fireQueuedFlash(
      "Search-in-thread queued — feature lands with search service",
    );
  }, [fireQueuedFlash]);

  /* Kebab — Mute thread. */
  const handleMute = useCallback(() => {
    if (!activeThread) return;
    fireQueuedFlash(`Muted ${activeThread.title} for 8h`);
  }, [activeThread, fireQueuedFlash]);

  /* Kebab — Archive thread. */
  const handleArchive = useCallback(() => {
    if (!activeThread) return;
    fireQueuedFlash(`${activeThread.title} archived`);
  }, [activeThread, fireQueuedFlash]);

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
    <>
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
                <ChatHeader
                  thread={activeThread}
                  onMobileBack={handleMobileBack}
                  onSchedule={handleSchedule}
                  onSendBrief={handleSendBrief}
                  onSearchInThread={handleSearchInThread}
                  onMute={handleMute}
                  onArchive={handleArchive}
                />
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

      <SchedulingModal
        key={schedulingFor?.id ?? "closed"}
        open={schedulingFor !== null}
        subjectName={schedulingFor?.title ?? ""}
        onClose={() => setSchedulingFor(null)}
        onSchedule={handleScheduleConfirm}
      />

      <WorkflowUnavailableModal
        open={workflowModal !== null}
        workflow={workflowModal?.workflow ?? "send-brief"}
        subjectName={workflowModal?.subjectName ?? ""}
        onClose={() => setWorkflowModal(null)}
      />

      <ApprovedFlash {...flash} />
    </>
  );
}
