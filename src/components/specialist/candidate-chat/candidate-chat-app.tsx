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
 *   - **Step 8a additions:**
 *     - `schedulingFor`: active thread for SchedulingModal (3rd
 *       consumer site after my-candidates + candidate-profile)
 *     - `workflowModal`: active workflow + subject for
 *       WorkflowUnavailableModal (`voice-call` kind only on this
 *       surface)
 *     - `useQueuedFlash`: drives ApprovedFlash overlay for both the
 *       schedule confirm (success-tone, locked per b58d1ef) and
 *       kebab actions (warn-tone for Search / Mute / Archive)
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
  CandidateChatThread,
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

const FILTERS: ReadonlyArray<FilterDef> = CANDIDATE_CHAT_FILTERS.map((f) => ({
  key: f.key as ConversationFilter,
  label: f.label,
}));

/** Migration-note caption per CONVERSION_LOG. */
const COMPOSER_STATUS = "Encrypted in transit";

/** Workflow-modal state slot. Only the `voice-call` kind fires from
 *  this surface today; slot is generic for future additions. */
type WorkflowModalState = { workflow: WorkflowKind; subjectName: string } | null;

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

  /* Step 8a — Scheduling modal state (3rd consumer of SchedulingModal). */
  const [schedulingFor, setSchedulingFor] =
    useState<CandidateChatThread | null>(null);

  /* Step 8a — Workflow modal slot (currently only `voice-call`). */
  const [workflowModal, setWorkflowModal] = useState<WorkflowModalState>(null);

  /* Step 8a — Single queued-flash for schedule confirm + kebab acks. */
  const { flash, fireQueuedFlash } = useQueuedFlash();

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

  /* ---- Step 8a chat-header callbacks ---- */

  /* Mobile back — drops `?id=` and lands on the empty state. */
  const handleMobileBack = useCallback(() => {
    router.replace("/specialist/candidate-chat");
  }, [router]);

  /* Schedule check-in → opens SchedulingModal pointing at activeThread. */
  const handleSchedule = useCallback(() => {
    if (!activeThread) return;
    setSchedulingFor(activeThread);
  }, [activeThread]);

  /* Schedule confirm → success-tone flash per b58d1ef tone-consistency
     lock. First-token of the thread title for the friendly-name prefix
     ("Anand" rather than "Anand Patel"). */
  const handleScheduleConfirm = useCallback(
    (payload: SchedulePayload) => {
      if (!schedulingFor) return;
      const firstName =
        schedulingFor.title.split(" ")[0] ?? schedulingFor.title;
      const parts = formatSchedulePartsForFlash(payload);
      fireQueuedFlash(
        `Scheduled. ${firstName} · ${parts}${payload.videoCall ? " · video link queued" : ""}`,
        {
          tone: "success",
          tail: "Invite pending — scheduling service not yet wired",
        },
      );
      setSchedulingFor(null);
    },
    [schedulingFor, fireQueuedFlash],
  );

  /* Voice call icon → WorkflowUnavailableModal kind="voice-call". */
  const handleVoiceCall = useCallback(() => {
    if (!activeThread) return;
    setWorkflowModal({
      workflow: "voice-call",
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
                <ChatHeader
                  thread={activeThread}
                  onMobileBack={handleMobileBack}
                  onSchedule={handleSchedule}
                  onVoiceCall={handleVoiceCall}
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

      <SchedulingModal
        key={schedulingFor?.id ?? "closed"}
        open={schedulingFor !== null}
        subjectName={schedulingFor?.title ?? ""}
        onClose={() => setSchedulingFor(null)}
        onSchedule={handleScheduleConfirm}
      />

      <WorkflowUnavailableModal
        open={workflowModal !== null}
        workflow={workflowModal?.workflow ?? "voice-call"}
        subjectName={workflowModal?.subjectName ?? ""}
        onClose={() => setWorkflowModal(null)}
      />

      <ApprovedFlash {...flash} />
    </>
  );
}
