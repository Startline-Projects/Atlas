"use client";

/**
 * Help search input — large hero search with `⌘ /` keyboard hint chip
 * and inline suggestion chips below.
 *
 * Search is visual-only this session (no live filtering across topics
 * / articles / training). Typing into the input shows a small dropdown
 * with matching `searchSuggestions` filtered by substring; clicking a
 * suggestion routes to the article (visual only — `e.preventDefault`
 * since article routes don't exist).
 *
 * Client Component (input value state + dropdown visibility).
 */

import { useState } from "react";
import { Search, ArrowUpRight } from "lucide-react";

import { SEARCH_SUGGESTIONS } from "@/lib/mock-data/specialist/help";
import { cn } from "@/lib/utils/cn";

export function HelpSearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const trimmed = query.trim().toLowerCase();
  const filteredSuggestions = trimmed.length === 0
    ? SEARCH_SUGGESTIONS
    : SEARCH_SUGGESTIONS.filter((s) =>
        s.label.toLowerCase().includes(trimmed),
      );

  const showDropdown = focused && filteredSuggestions.length > 0;

  return (
    <div className="relative w-full">
      <label
        className={cn(
          "bg-paper border-line-soft flex items-center gap-3 rounded-xl border px-4 py-3.5 transition-colors",
          focused && "border-ink-mute shadow-card",
        )}
      >
        <Search
          className="h-4 w-4 flex-shrink-0 text-ink-mute"
          strokeWidth={1.6}
          aria-hidden="true"
        />
        <span className="sr-only">Search help articles</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            // Defer blur so suggestion clicks register
            setTimeout(() => setFocused(false), 120);
          }}
          placeholder="Search articles, training, policies…"
          autoComplete="off"
          className="text-ink placeholder:text-ink-mute min-w-0 flex-1 bg-transparent text-[14px] outline-none"
        />
        <kbd
          aria-hidden="true"
          className="bg-cream border-line-soft text-ink-mute hidden flex-shrink-0 rounded-md border px-2 py-1 font-mono text-[10.5px] sm:inline-block"
        >
          ⌘ /
        </kbd>
      </label>

      {showDropdown ? (
        <div
          role="listbox"
          aria-label="Search suggestions"
          className="bg-paper border-line shadow-card absolute top-full left-0 right-0 z-[12] mt-2 overflow-hidden rounded-xl border"
        >
          <div className="border-line-soft border-b px-4 pt-2.5 pb-1.5 font-mono text-[9.5px] font-semibold tracking-[0.12em] uppercase text-ink-mute">
            {trimmed.length === 0 ? "Quick suggestions" : "Matching articles"}
          </div>
          <ul className="m-0 flex list-none flex-col p-0">
            {filteredSuggestions.map((s) => (
              <li key={s.articleId}>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    // Use mousedown so the click registers before blur
                    e.preventDefault();
                    setQuery("");
                    setFocused(false);
                  }}
                  className="hover:bg-cream flex w-full items-center gap-2.5 border-none bg-transparent px-4 py-2.5 text-left font-body text-[13px] text-ink-soft transition-colors hover:text-ink"
                >
                  <Search
                    className="h-3 w-3 flex-shrink-0 text-ink-mute"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span className="flex-1 truncate">{s.label}</span>
                  <ArrowUpRight
                    className="h-3 w-3 flex-shrink-0 text-ink-mute"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

/* ============================================================
   Suggestion chips (renders below the input — Server-friendly
   because no chip needs state, but lives here for co-location)
   ============================================================ */

export function HelpSearchSuggestions() {
  return (
    <div className="flex flex-wrap gap-1.5">
      <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-ink-mute self-center">
        Try:
      </span>
      {SEARCH_SUGGESTIONS.map((s) => (
        <button
          key={s.articleId}
          type="button"
          onClick={(e) => e.preventDefault()}
          className="border-line bg-paper text-ink-soft hover:bg-cream-deep hover:text-ink rounded-full border px-3 py-1 font-body text-[11.5px] transition-colors"
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
