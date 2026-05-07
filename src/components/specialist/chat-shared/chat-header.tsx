/**
 * Main-pane header. Shows the active thread's avatar / title /
 * meta line / actions. Sticky to the top of the main pane (the
 * outer scroll on the `.cc-main` container is what scrolls; the
 * header itself is `flex-shrink-0`).
 *
 * Server Component — purely presentational. Action buttons differ
 * by `thread.kind`:
 *
 *   candidate → Voice call (icon) · Schedule · View profile (Link → candidate-profile) · More
 *   client    → Schedule · Send brief · View client (Link → /specialist/my-clients) · More
 *
 * "View profile" routes to the real candidate-profile route. "View
 * client" routes to /specialist/my-clients for now — the dedicated
 * client-profile route doesn't exist yet (Session 5+ candidate),
 * documented in CONVERSION_LOG Session 4 forward-looking notes.
 *
 * Schedule / Send brief / Voice call / More all render as decorative
 * buttons that no-op this session — the visual fidelity sweep covers
 * them, but no scheduling/calling/brief-creation pipeline lands until
 * services do.
 */

import Link from "next/link";
import {
  Phone,
  Calendar,
  UserRound,
  Building2,
  ClipboardList,
  MoreHorizontal,
} from "lucide-react";
import type {
  CandidateChatThread,
  ClientChatThread,
  MetaSegment,
} from "@/lib/mock-data/specialist/chat-types";
import { cn } from "@/lib/utils/cn";
import { ChatAvatar } from "./chat-avatar";

type Thread = CandidateChatThread | ClientChatThread;

export function ChatHeader({ thread }: { thread: Thread }) {
  return (
    <header className="bg-paper border-line flex flex-shrink-0 items-center justify-between gap-4 border-b px-7 py-3.5">
      {/* Left: avatar + name + meta line */}
      <div className="flex min-w-0 items-center gap-3">
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
          <CandidateActions thread={thread} />
        ) : (
          <ClientActions />
        )}
        <ActionIconButton aria-label="More">
          <MoreHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} />
        </ActionIconButton>
      </div>
    </header>
  );
}

/* ===== action-set: candidate ===== */

function CandidateActions({ thread }: { thread: CandidateChatThread }) {
  return (
    <>
      <ActionIconButton aria-label="Voice call">
        <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
      </ActionIconButton>
      <ActionTextButton>
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

function ClientActions() {
  return (
    <>
      <ActionTextButton>
        <Calendar className="h-3 w-3" strokeWidth={1.5} />
        Schedule
      </ActionTextButton>
      <ActionTextButton>
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

/* ===== local button helpers (server-side, no state) ===== */

function ActionIconButton({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...rest}
      className={cn(
        "grid h-8 w-8 place-items-center rounded-lg border border-transparent bg-transparent text-ink-soft transition-colors hover:border-line-soft hover:bg-cream hover:text-ink",
        rest.className,
      )}
    >
      {children}
    </button>
  );
}

function ActionTextButton({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...rest}
      className={cn(
        "inline-flex items-center gap-1 rounded-lg border border-transparent bg-transparent px-2.5 py-1.5 font-body text-[12.5px] text-ink-soft transition-colors hover:border-line-soft hover:bg-cream hover:text-ink",
        rest.className,
      )}
    >
      {children}
    </button>
  );
}
