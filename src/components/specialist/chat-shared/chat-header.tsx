"use client";

/**
 * Main-pane header for chat surfaces. Shows the active thread's
 * avatar / title / meta line + a dispatched-on-`thread.kind` action
 * cluster. Sticky to the top of the main pane (the outer scroll on
 * the `.cc-main` container is what scrolls; the header itself is
 * `flex-shrink-0`).
 *
 * Step 8a refit: previously a Server Component with all action
 * buttons inert. Now a Client Component to accommodate prop
 * callbacks for the visible action row + the kebab + a mobile back
 * button. Two consumers: `candidate-chat-app` and `client-chat-app`.
 * Same component instance dispatches on `thread.kind` for the action
 * differences:
 *
 *   candidate → Mobile-back (max-md) · Voice call (icon) ·
 *               Schedule · View profile (Link → candidate-profile) ·
 *               More-kebab
 *   client    → Mobile-back (max-md) · Schedule · Send brief ·
 *               View client (Link → /specialist/my-clients) ·
 *               More-kebab
 *
 * Voice call icon is candidate-only per Session 4 conventions
 * ("View client" doesn't link to a dedicated client-profile route
 * yet — see Session 4 forward-looking notes; client→my-clients is
 * the same fallback used by the existing visible "View client"
 * Link).
 *
 * Kebab item set is identical for both consumers (4 items: View
 * profile/View client · Search · Mute · [divider] · Archive). The
 * "View profile" item duplicates the visible-row Link by design —
 * provides a secondary discoverability path matching the standing
 * RowOverflowMenu pattern from my-candidates + my-clients.
 *
 * The visible action callbacks (onSchedule / onVoiceCall /
 * onSendBrief) and kebab callbacks (onSearchInThread / onMute /
 * onArchive) are all owned by the parent app (candidate-chat-app or
 * client-chat-app) — they fire the actual modals + flashes there.
 * Mobile back button likewise calls a parent-provided handler
 * (each app knows its own route).
 */

import Link from "next/link";
import {
  Archive,
  BellOff,
  Building2,
  Calendar,
  ChevronLeft,
  ClipboardList,
  MoreHorizontal,
  Phone,
  Search,
  UserRound,
} from "lucide-react";
import type {
  CandidateChatThread,
  ClientChatThread,
  MetaSegment,
} from "@/lib/mock-data/specialist/chat-types";
import {
  RowOverflowMenu,
  type OverflowMenuItem,
} from "@/components/specialist/people-shared";
import { cn } from "@/lib/utils/cn";
import { ChatAvatar } from "./chat-avatar";

type Thread = CandidateChatThread | ClientChatThread;

type ChatHeaderProps = {
  thread: Thread;
  /** Mobile-only back affordance — renders at max-md: breakpoint
   *  (same breakpoint where ChatShell hides the conv-rail). Each
   *  app passes its own route-aware handler (drops `?id=`). */
  onMobileBack?: (() => void) | undefined;
  /** Schedule check-in button — both candidate + client. Parent
   *  opens SchedulingModal with `subjectName={thread.title}`. */
  onSchedule?: (() => void) | undefined;
  /** Voice call icon — candidate-only (button is hidden on client
   *  threads). Parent opens WorkflowUnavailableModal kind="voice-call". */
  onVoiceCall?: (() => void) | undefined;
  /** Send brief — client-only (button is hidden on candidate
   *  threads). Parent opens WorkflowUnavailableModal kind="send-brief". */
  onSendBrief?: (() => void) | undefined;
  /** Kebab item — "Search in conversation". Both consumers. */
  onSearchInThread?: (() => void) | undefined;
  /** Kebab item — "Mute thread". Both consumers. */
  onMute?: (() => void) | undefined;
  /** Kebab item — "Archive thread". Both consumers. */
  onArchive?: (() => void) | undefined;
};

export function ChatHeader({
  thread,
  onMobileBack,
  onSchedule,
  onVoiceCall,
  onSendBrief,
  onSearchInThread,
  onMute,
  onArchive,
}: ChatHeaderProps) {
  return (
    <header className="bg-paper border-line flex flex-shrink-0 items-center justify-between gap-4 border-b px-7 py-3.5">
      {/* Left: mobile-back (max-md only) + avatar + name + meta line */}
      <div className="flex min-w-0 items-center gap-3">
        {onMobileBack ? (
          <button
            type="button"
            onClick={onMobileBack}
            aria-label="Back to inbox"
            className="grid h-8 w-8 flex-shrink-0 cursor-pointer place-items-center rounded-lg border border-transparent bg-transparent text-ink-soft transition-colors hover:border-line-soft hover:bg-cream hover:text-ink md:hidden"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.6} />
          </button>
        ) : null}
        <ChatAvatar thread={thread} size="md" />
        <div className="min-w-0">
          <h2 className="font-display m-0 mb-0.5 flex items-center gap-1.5 text-[18px] font-medium tracking-tight text-ink">
            <span className="truncate">{thread.title}</span>
            {thread.countryFlag ? (
              <span className="text-[14px]" aria-hidden="true">
                {thread.countryFlag}
              </span>
            ) : null}
          </h2>
          <div className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-ink-mute">
            {thread.metaLine.map((seg, i) => (
              <MetaSeg key={i} seg={seg} isFirst={i === 0} />
            ))}
          </div>
        </div>
      </div>

      {/* Right: actions — dispatched on thread.kind */}
      <div className="flex flex-shrink-0 items-center gap-1">
        {thread.kind === "candidate" ? (
          <CandidateActions
            thread={thread}
            onVoiceCall={onVoiceCall}
            onSchedule={onSchedule}
          />
        ) : (
          <ClientActions
            onSchedule={onSchedule}
            onSendBrief={onSendBrief}
          />
        )}
        <ChatHeaderKebab
          thread={thread}
          {...(onSearchInThread ? { onSearchInThread } : {})}
          {...(onMute ? { onMute } : {})}
          {...(onArchive ? { onArchive } : {})}
        />
      </div>
    </header>
  );
}

/* ===== action-set: candidate ===== */

function CandidateActions({
  thread,
  onVoiceCall,
  onSchedule,
}: {
  thread: CandidateChatThread;
  onVoiceCall?: (() => void) | undefined;
  onSchedule?: (() => void) | undefined;
}) {
  return (
    <>
      <ActionIconButton aria-label="Voice call" onClick={onVoiceCall}>
        <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
      </ActionIconButton>
      <ActionTextButton onClick={onSchedule}>
        <Calendar className="h-3 w-3" strokeWidth={1.5} />
        Schedule
      </ActionTextButton>
      <Link
        href={`/specialist/candidates/${thread.candidateId}`}
        className="inline-flex items-center gap-1 rounded-lg border border-ink bg-ink px-2.5 py-1.5 font-body text-[12.5px] text-paper transition-colors hover:bg-ink-soft hover:border-ink-soft"
      >
        <UserRound className="h-3 w-3" strokeWidth={1.5} />
        View profile
      </Link>
    </>
  );
}

/* ===== action-set: client ===== */

function ClientActions({
  onSchedule,
  onSendBrief,
}: {
  onSchedule?: (() => void) | undefined;
  onSendBrief?: (() => void) | undefined;
}) {
  return (
    <>
      <ActionTextButton onClick={onSchedule}>
        <Calendar className="h-3 w-3" strokeWidth={1.5} />
        Schedule
      </ActionTextButton>
      <ActionTextButton onClick={onSendBrief}>
        <ClipboardList className="h-3 w-3" strokeWidth={1.5} />
        Send brief
      </ActionTextButton>
      <Link
        // Dedicated client-profile route doesn't exist yet (Session 5+ candidate).
        // See CONVERSION_LOG Session 4 forward-looking notes.
        href="/specialist/my-clients"
        className="inline-flex items-center gap-1 rounded-lg border border-ink bg-ink px-2.5 py-1.5 font-body text-[12.5px] text-paper transition-colors hover:bg-ink-soft hover:border-ink-soft"
      >
        <Building2 className="h-3 w-3" strokeWidth={1.5} />
        View client
      </Link>
    </>
  );
}

/* ===== kebab — 3rd consumer of RowOverflowMenu =====

   Items dispatched on thread.kind:
     - View profile / View client (Link)
     - Search in conversation (action)
     - Mute thread (action)
     - divider
     - Archive thread (action)

   Skip Schedule from kebab — already lives in the visible action row.

   The trigger uses the standing chat-header icon-button styling
   via renderTrigger so the kebab visually matches the other action
   buttons in the row. */
function ChatHeaderKebab({
  thread,
  onSearchInThread,
  onMute,
  onArchive,
}: {
  thread: Thread;
  onSearchInThread?: (() => void) | undefined;
  onMute?: (() => void) | undefined;
  onArchive?: (() => void) | undefined;
}) {
  const profileHref =
    thread.kind === "candidate"
      ? `/specialist/candidates/${thread.candidateId}`
      : `/specialist/my-clients`;
  const profileLabel =
    thread.kind === "candidate" ? "View profile" : "View client";
  const profileIcon =
    thread.kind === "candidate" ? (
      <UserRound className="h-3.5 w-3.5" strokeWidth={1.5} />
    ) : (
      <Building2 className="h-3.5 w-3.5" strokeWidth={1.5} />
    );

  const items: ReadonlyArray<OverflowMenuItem> = [
    {
      kind: "link",
      key: "view-profile",
      label: profileLabel,
      href: profileHref,
      icon: profileIcon,
    },
    {
      kind: "action",
      key: "search",
      label: "Search in conversation",
      onClick: () => onSearchInThread?.(),
      icon: <Search className="h-3.5 w-3.5" strokeWidth={1.5} />,
    },
    {
      kind: "action",
      key: "mute",
      label: "Mute thread",
      onClick: () => onMute?.(),
      icon: <BellOff className="h-3.5 w-3.5" strokeWidth={1.5} />,
    },
    { kind: "divider", key: "div-1" },
    {
      kind: "action",
      key: "archive",
      label: "Archive thread",
      onClick: () => onArchive?.(),
      icon: <Archive className="h-3.5 w-3.5" strokeWidth={1.5} />,
    },
  ];

  return (
    <RowOverflowMenu
      triggerId={`chat-header-${thread.id}`}
      triggerLabel={`More actions for ${thread.title}`}
      items={items}
      renderTrigger={({ toggle, triggerProps }) => (
        <button
          type="button"
          {...triggerProps}
          onClick={toggle}
          className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg border border-transparent bg-transparent text-ink-soft transition-colors hover:border-line-soft hover:bg-cream hover:text-ink"
        >
          <MoreHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} />
        </button>
      )}
    />
  );
}

/* ===== meta-line segment renderer ===== */

function MetaSeg({ seg, isFirst }: { seg: MetaSegment; isFirst: boolean }) {
  const sep = isFirst ? null : <span className="opacity-50"> · </span>;
  if (seg.kind === "tier") {
    const tone =
      seg.tone === "elite"
        ? "text-lime-deep font-semibold"
        : seg.tone === "thriving"
          ? "text-success font-semibold"
          : "text-ink-soft font-semibold";
    return (
      <>
        {sep}
        <span className={tone}>{seg.label}</span>
      </>
    );
  }
  if (seg.kind === "online") {
    return (
      <>
        {sep}
        <span className="text-success font-medium">{seg.value}</span>
      </>
    );
  }
  return (
    <>
      {sep}
      <span>{seg.value}</span>
    </>
  );
}

/* ===== local button helpers ===== */

function ActionIconButton({
  children,
  onClick,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      onClick={onClick}
      {...rest}
      className={cn(
        "grid h-8 w-8 cursor-pointer place-items-center rounded-lg border border-transparent bg-transparent text-ink-soft transition-colors hover:border-line-soft hover:bg-cream hover:text-ink",
        rest.className,
      )}
    >
      {children}
    </button>
  );
}

function ActionTextButton({
  children,
  onClick,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      onClick={onClick}
      {...rest}
      className={cn(
        "inline-flex cursor-pointer items-center gap-1 rounded-lg border border-transparent bg-transparent px-2.5 py-1.5 font-body text-[12.5px] text-ink-soft transition-colors hover:border-line-soft hover:bg-cream hover:text-ink",
        rest.className,
      )}
    >
      {children}
    </button>
  );
}
