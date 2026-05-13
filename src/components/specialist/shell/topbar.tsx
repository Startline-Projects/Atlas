"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { Bell, MessageSquare, Search, ChevronDown } from "lucide-react";
import { currentUser } from "@/lib/mock-data/specialist/current-user";
import {
  topbarUnreadNotificationCount,
  topbarUnreadMessageCount,
} from "@/lib/mock-data/specialist/topbar-feed";
import { TopbarNotificationsPanel } from "./topbar-notifications-panel";
import { TopbarMessagesPanel } from "./topbar-messages-panel";
import { TopbarUserMenu } from "./topbar-user-menu";
import { TopbarSearchDropdown } from "./topbar-search-dropdown";
import { useSearch } from "./use-search";

/**
 * Specialist console topbar.
 *
 * Ships four popover-class affordances:
 *   - Notifications / Messages / User menu — sibling popovers
 *     (`openPanel` state); only one open at a time.
 *   - Global search — controlled input + portaled dropdown anchored
 *     to the input. Coordinated bidirectionally with the other three
 *     so only one of the four is ever open.
 *
 * Each popover handles its own Esc + click-outside via document-level
 * listeners (see chat-shared/templates-popover for the original
 * precedent; `RowOverflowMenu` for the portal pattern that the
 * search dropdown follows).
 *
 * Badge counts read live from `topbar-feed.ts` so they stay in sync
 * with the data the panels display (no more hardcoded "5" / "3").
 *
 * Source HTML: lines 13847–13894 (visual). The popovers + search
 * functionality are post-conversion polish — source HTML rendered the
 * search input as inert.
 *
 * Client Component (popover state + search state).
 */

type OpenPanel = "notifications" | "messages" | "user" | null;

export function Topbar() {
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);

  /* Global search — query + dropdown state. The hook stays decoupled
     from `openPanel` (the other 3 popovers' state machine); this
     component wires bidirectional coordination so opening any one of
     the four closes the other three. */
  const search = useSearch();
  const searchAnchorRef = useRef<HTMLLabelElement | null>(null);

  /* Toggle a non-search popover. ALSO closes the search dropdown so
     only one of the four affordances is open at any time. */
  const toggle = useCallback(
    (panel: Exclude<OpenPanel, null>) => {
      search.closeDropdown();
      setOpenPanel((prev) => (prev === panel ? null : panel));
    },
    [search],
  );

  const close = useCallback(() => setOpenPanel(null), []);

  /* Open the search dropdown — ALSO closes any open non-search
     popover. Called from the input's focus / change handlers. */
  const handleOpenSearch = useCallback(() => {
    setOpenPanel(null);
    search.openDropdown();
  }, [search]);

  /* Esc inside the input — closes the dropdown and blurs the input
     to clear focus state. */
  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        e.preventDefault();
        search.closeDropdown();
        e.currentTarget.blur();
      }
    },
    [search],
  );

  /* Input change — update query AND ensure dropdown is open so the
     "Esc-then-type-again" flow reopens cleanly. */
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      search.setQuery(e.target.value);
      if (!search.isOpen) handleOpenSearch();
    },
    [search, handleOpenSearch],
  );

  return (
    <header className="bg-cream/90 border-line-soft sticky top-9 z-[6] flex items-center justify-between gap-4 border-b px-4 py-2.5 backdrop-blur-md backdrop-saturate-[140%] sm:px-6">
      <div className="flex flex-shrink-0 items-center gap-2.5">
        <Link
          href="/specialist/dashboard"
          aria-label="Atlas — Specialist Dashboard"
          className="font-display text-ink flex items-center gap-2.5 text-[22px] font-medium tracking-[-0.02em]"
        >
          <span
            aria-hidden="true"
            className="bg-ink relative inline-block h-[26px] w-[26px] flex-shrink-0 rounded-full after:absolute after:inset-[5px] after:rounded-full after:bg-lime after:content-['']"
          />
          <span>Atlas</span>
          <span className="border-line text-ink-mute ml-1 rounded-[4px] border px-[7px] py-[3px] font-mono text-[9.5px] tracking-[0.18em] uppercase">
            Specialist
          </span>
        </Link>
      </div>

      <label
        ref={searchAnchorRef}
        data-topbar-trigger="search"
        className="bg-cream border-line-soft hover:border-line focus-within:border-ink relative hidden min-w-0 flex-1 items-center gap-2 rounded-md border px-3 py-2 transition-colors md:flex md:max-w-xl"
      >
        <Search className="text-ink-mute h-4 w-4 flex-shrink-0" aria-hidden="true" />
        <span className="sr-only">Search</span>
        <input
          type="search"
          role="combobox"
          placeholder="Search candidates, clients, jobs, disputes…"
          value={search.query}
          onChange={handleInputChange}
          onFocus={handleOpenSearch}
          onKeyDown={handleInputKeyDown}
          aria-expanded={search.isOpen}
          aria-controls="topbar-search-results"
          aria-autocomplete="list"
          autoComplete="off"
          className="text-ink placeholder:text-ink-mute min-w-0 flex-1 bg-transparent text-[13.5px] outline-none"
        />
        <kbd
          aria-hidden="true"
          className="bg-paper border-line-soft text-ink-mute hidden flex-shrink-0 rounded-[4px] border px-1.5 py-0.5 font-mono text-[10px] sm:inline-block"
        >
          ⌘ K
        </kbd>
      </label>

      <TopbarSearchDropdown
        isOpen={search.isOpen}
        onClose={search.closeDropdown}
        anchorRef={searchAnchorRef}
        query={search.query}
        results={search.results}
        matchCounts={search.matchCounts}
      />

      <div className="flex flex-shrink-0 items-center gap-1.5">
        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            data-topbar-trigger="notifications"
            aria-label="Notifications"
            aria-expanded={openPanel === "notifications"}
            aria-haspopup="dialog"
            onClick={() => toggle("notifications")}
            className="text-ink-mute hover:bg-cream-deep hover:text-ink relative flex h-9 w-9 items-center justify-center rounded-md transition-colors"
          >
            <Bell className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden="true" />
            {topbarUnreadNotificationCount > 0 ? (
              <span
                aria-hidden="true"
                className="bg-danger text-paper absolute -top-0.5 -right-0.5 grid h-4 min-w-[16px] place-items-center rounded-full px-1 font-mono text-[9px] font-semibold"
              >
                {topbarUnreadNotificationCount}
              </span>
            ) : null}
          </button>
          <TopbarNotificationsPanel
            isOpen={openPanel === "notifications"}
            onClose={close}
          />
        </div>

        {/* Messages */}
        <div className="relative">
          <button
            type="button"
            data-topbar-trigger="messages"
            aria-label="Messages"
            aria-expanded={openPanel === "messages"}
            aria-haspopup="dialog"
            onClick={() => toggle("messages")}
            className="text-ink-mute hover:bg-cream-deep hover:text-ink relative flex h-9 w-9 items-center justify-center rounded-md transition-colors"
          >
            <MessageSquare
              className="h-[18px] w-[18px]"
              strokeWidth={1.6}
              aria-hidden="true"
            />
            {topbarUnreadMessageCount > 0 ? (
              <span
                aria-hidden="true"
                className="bg-lime-deep text-ink absolute -top-0.5 -right-0.5 grid h-4 min-w-[16px] place-items-center rounded-full px-1 font-mono text-[9px] font-semibold"
              >
                {topbarUnreadMessageCount}
              </span>
            ) : null}
          </button>
          <TopbarMessagesPanel
            isOpen={openPanel === "messages"}
            onClose={close}
          />
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            type="button"
            data-topbar-trigger="user"
            aria-label="Account menu"
            aria-expanded={openPanel === "user"}
            aria-haspopup="menu"
            onClick={() => toggle("user")}
            className="border-line-soft hover:border-line ml-1 flex items-center gap-2 rounded-full border py-1 pr-2 pl-1 transition-colors"
          >
            <span
              aria-hidden="true"
              className="font-display text-ink grid h-7 w-7 place-items-center rounded-full text-[13px] font-medium"
              style={{
                background: `linear-gradient(135deg, ${currentUser.avatarGradient.from}, ${currentUser.avatarGradient.to})`,
              }}
            >
              {currentUser.initials.charAt(0)}
            </span>
            <span className="text-ink hidden text-[13px] font-medium sm:inline">
              {currentUser.firstName} {currentUser.lastName.charAt(0)}.
            </span>
            <ChevronDown
              className="text-ink-mute h-3 w-3"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </button>
          <TopbarUserMenu isOpen={openPanel === "user"} onClose={close} />
        </div>
      </div>
    </header>
  );
}
