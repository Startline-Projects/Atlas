"use client";

/**
 * Recent-messages panel — anchored under the topbar message icon.
 * ~360px wide, two tabs (Candidates / Clients).
 *
 *   Header  · "Recent messages" + tab strip
 *   Body    · scrollable list of TopbarRecentMessage rows
 *             avatar (gradient for candidate, brand-glyph for client)
 *             + name + preview + when + unread badge
 *   Footer  · "View all messages →"  →  /specialist/{candidate,client}-chat
 *
 * Closes on Esc, click outside, item click. Item clicks navigate to the
 * existing chat routes via Next.js <Link>. The "View all" link routes
 * to the active tab's chat list (no `?id=`, falls to first thread).
 *
 * Source-fidelity note: source HTML never built this popover; the
 * design pattern matches the existing chat conv-list rail aesthetic
 * (initials tile + display name + truncated preview + when chip).
 *
 * Client Component.
 */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  TOPBAR_MESSAGE_TABS,
  TOPBAR_VIEW_ALL_HREF,
  topbarRecentCandidates,
  topbarRecentClients,
  type TopbarMessageTab,
  type TopbarRecentMessage,
} from "@/lib/mock-data/specialist/topbar-feed";
import { AVATAR_GRADIENTS } from "@/lib/mock-data/specialist/queue-types";
import { cn } from "@/lib/utils/cn";

const CLIENT_LOGO_TONE: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
  1: "bg-navy/10 text-navy",
  2: "bg-amber/15 text-amber",
  3: "bg-success-bg text-success",
  4: "bg-danger-bg text-danger",
  5: "bg-lime/20 text-lime-deep",
  6: "bg-cream-deep text-ink",
};

export function TopbarMessagesPanel({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState<TopbarMessageTab>("candidates");

  /* Click-outside + Esc to close. */
  useEffect(() => {
    if (!isOpen) return;
    function onDown(e: MouseEvent) {
      if (!ref.current) return;
      const target = e.target as Node;
      if (ref.current.contains(target)) return;
      if (
        target instanceof HTMLElement &&
        target.closest('[data-topbar-trigger="messages"]')
      ) {
        return;
      }
      onClose();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const rows =
    activeTab === "candidates" ? topbarRecentCandidates : topbarRecentClients;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label="Recent messages"
      className="border-line bg-paper absolute top-full right-0 z-[30] mt-1.5 w-[360px] overflow-hidden rounded-xl border shadow-[0_8px_24px_rgba(14,14,12,0.12)]"
    >
      {/* Header */}
      <header className="border-line-soft border-b">
        <div className="flex items-center justify-between gap-3 px-4 pt-3 pb-2">
          <div className="flex flex-col">
            <span className="font-mono text-[9.5px] font-semibold tracking-[0.14em] uppercase text-ink-mute">
              Inbox
            </span>
            <h2
              className="font-display mt-0.5 text-[15px] font-medium leading-none tracking-[-0.01em] text-ink"
              style={{ fontVariationSettings: '"opsz" 36' }}
            >
              Recent messages
            </h2>
          </div>
        </div>
        <nav
          aria-label="Message tabs"
          role="tablist"
          className="flex items-center gap-1 px-3 pb-1"
        >
          {TOPBAR_MESSAGE_TABS.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "relative px-2.5 py-1.5 text-[12px] font-medium transition-colors",
                  isActive ? "text-ink" : "text-ink-mute hover:text-ink",
                )}
              >
                {tab.label}
                {isActive ? (
                  <span
                    aria-hidden="true"
                    className="bg-ink absolute right-2.5 -bottom-px left-2.5 h-[2px]"
                  />
                ) : null}
              </button>
            );
          })}
        </nav>
      </header>

      {/* Body */}
      <ul className="m-0 flex max-h-[420px] list-none flex-col overflow-y-auto p-0">
        {rows.map((row) => (
          <MessageRow key={row.id} row={row} onClose={onClose} />
        ))}
        {rows.length === 0 ? (
          <li className="px-4 py-6 text-center text-[12px] text-ink-mute">
            No recent messages.
          </li>
        ) : null}
      </ul>

      {/* Footer */}
      <footer className="border-line-soft border-t px-4 py-2.5">
        <Link
          href={TOPBAR_VIEW_ALL_HREF[activeTab]}
          onClick={onClose}
          className="text-ink-soft hover:text-ink block w-full text-left font-mono text-[10.5px] tracking-[0.04em] uppercase transition-colors"
        >
          View all messages →
        </Link>
      </footer>
    </div>
  );
}

function MessageRow({
  row,
  onClose,
}: {
  row: TopbarRecentMessage;
  onClose: () => void;
}) {
  return (
    <li>
      <Link
        href={row.href}
        onClick={onClose}
        className="border-line-soft flex items-start gap-3 border-b px-4 py-3 transition-colors hover:bg-cream last:border-b-0"
      >
        {row.kind === "candidate" ? (
          <span
            aria-hidden="true"
            className="font-display text-paper relative grid h-9 w-9 flex-shrink-0 place-items-center rounded-full text-[14px] font-medium"
            style={{
              background: `linear-gradient(135deg, ${AVATAR_GRADIENTS[row.avatarGradient].from}, ${AVATAR_GRADIENTS[row.avatarGradient].to})`,
            }}
          >
            {row.initials}
            <span
              aria-hidden="true"
              className="absolute -right-0.5 -bottom-0.5 text-[12px]"
            >
              {row.countryFlag}
            </span>
          </span>
        ) : (
          <span
            aria-hidden="true"
            className={cn(
              "font-display grid h-9 w-9 flex-shrink-0 place-items-center rounded-md text-[12px] font-semibold",
              CLIENT_LOGO_TONE[row.logoVariant],
            )}
          >
            {row.initials}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <span
              className={cn(
                "truncate text-[13px] leading-tight text-ink",
                row.unread > 0 ? "font-semibold" : "font-normal",
              )}
            >
              {row.name}
            </span>
            <span className="font-mono text-[10px] tracking-[0.04em] uppercase text-ink-mute flex-shrink-0">
              {row.when}
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between gap-2">
            <p className="m-0 line-clamp-1 flex-1 text-[12px] leading-[1.45] text-ink-soft">
              {row.preview}
            </p>
            {row.unread > 0 ? (
              <span
                aria-label={`${row.unread} unread`}
                className="bg-lime-deep text-paper grid h-4 min-w-[16px] flex-shrink-0 place-items-center rounded-full px-1 font-mono text-[9px] font-semibold"
              >
                {row.unread}
              </span>
            ) : null}
          </div>
        </div>
      </Link>
    </li>
  );
}
