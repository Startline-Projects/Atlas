"use client";

/**
 * Conversation list rail — left column on the chat shell. Holds:
 *   - title + total count + (decorative) compose button
 *   - search input (filters by title or preview, in-memory)
 *   - filter chip row (uses `ConvFilters`)
 *   - scrollable list of `ConvRow`s
 *
 * Sticky to `top-[calc(36px+57px)]` (under the topbar+ribbon stack)
 * and bounded to `h-[calc(100vh-36px-57px)]` so it scrolls
 * independently of the page.
 *
 * Client Component because it owns the search-input value and the
 * active-filter state. Selection is delegated to the parent via
 * `onSelect(id)`; the active id is read from the URL one level up.
 */

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import type {
  CandidateChatThread,
  ClientChatThread,
  ConversationFilter,
} from "@/lib/mock-data/specialist/chat-types";
import { ConvRow } from "./conv-row";
import { ConvFilters } from "./conv-filters";

type Thread = CandidateChatThread | ClientChatThread;

export type FilterDef = {
  key: ConversationFilter;
  label: string;
};

export function ConvRail({
  title,
  threads,
  filters,
  activeId,
  onSelect,
}: {
  title: string;
  threads: ReadonlyArray<Thread>;
  filters: ReadonlyArray<FilterDef>;
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] =
    useState<ConversationFilter>("all");

  /* Derived counts — recompute when threads or activeFilter changes. */
  const counts = useMemo(() => {
    const out: Partial<Record<ConversationFilter, number>> = {};
    for (const f of filters) {
      if (f.key === "all") continue;
      out[f.key] = threads.filter((t) => t.tags.includes(f.key)).length;
    }
    return out;
  }, [threads, filters]);

  /* Filter + search the list. */
  const filteredThreads = useMemo(() => {
    const q = search.trim().toLowerCase();
    return threads.filter((t) => {
      // Filter chip
      if (activeFilter !== "all" && !t.tags.includes(activeFilter)) {
        return false;
      }
      // Search by title or preview (case-insensitive contains)
      if (q.length > 0) {
        const hay = `${t.title} ${t.preview}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [threads, activeFilter, search]);

  return (
    <aside className="bg-paper border-line-soft sticky top-[calc(36px+57px)] flex h-[calc(100vh-36px-57px)] flex-col overflow-hidden border-r">
      {/* Header */}
      <div className="border-line-soft flex items-center justify-between gap-2.5 border-b px-4 pt-4 pb-3">
        <div className="font-display text-[20px] font-normal tracking-tight text-ink">
          {title}
          <span className="ml-1.5 font-mono text-[11px] font-normal tracking-wider text-ink-mute">
            {threads.length}
          </span>
        </div>
        <button
          type="button"
          title="New conversation — coming soon"
          className="inline-flex items-center gap-1 rounded-lg bg-ink px-3 py-1.5 font-body text-[12px] text-paper transition-colors hover:bg-ink-soft"
        >
          <Plus className="h-3 w-3" strokeWidth={2} />
          Compose
        </button>
      </div>

      {/* Search */}
      <div className="relative px-4 pt-3 pb-2">
        <Search
          className="pointer-events-none absolute left-[26px] top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-mute"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search messages…"
          autoComplete="off"
          aria-label="Search messages"
          className="bg-cream border-line-soft w-full rounded-lg border px-3 py-2 pl-8 font-body text-[13px] text-ink outline-none transition-colors focus:border-ink-mute focus:bg-paper"
        />
      </div>

      {/* Filter chips */}
      <ConvFilters
        filters={filters}
        counts={counts}
        active={activeFilter}
        onChange={setActiveFilter}
      />

      {/* List */}
      <ul className="m-0 flex-1 list-none overflow-y-auto p-0 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-[3px] [&::-webkit-scrollbar-thumb]:bg-line">
        {filteredThreads.length === 0 ? (
          <li className="px-4 py-7 text-center font-body text-[12.5px] italic text-ink-mute">
            No conversations match.
          </li>
        ) : (
          filteredThreads.map((t) => (
            <li key={t.id}>
              <ConvRow
                thread={t}
                isActive={t.id === activeId}
                onSelect={onSelect}
              />
            </li>
          ))
        )}
      </ul>
    </aside>
  );
}
