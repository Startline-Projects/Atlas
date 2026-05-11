"use client";

/**
 * Source filter chips (LinkedIn / Referral / Talent search / AI scout)
 * + search input + visible-count meta. Each chip has a colored leading
 * dot per source CSS (`.sp-card-source.<key>`).
 *
 * The chip labels and source-count derivation are owned by the parent;
 * this component is controlled.
 *
 * Client Component (chip + search state lives here, lifted to the
 * page via `onChange` / `onSearchChange`).
 */

import { Search } from "lucide-react";
import {
  SOURCING_SOURCE_FILTERS,
  type SourcingSourceFilter,
} from "@/lib/mock-data/specialist/sourcing";
import { cn } from "@/lib/utils/cn";

const DOT_TONE: Record<SourcingSourceFilter["key"], string> = {
  all: "bg-ink-mute",
  linkedin: "bg-[#0A66C2]", // LinkedIn brand glyph (decorative literal — see Session 5 token note)
  referral: "bg-lime-deep",
  search: "bg-ink-soft",
  scout: "bg-amber",
};

export function SourceFilterChips({
  active,
  counts,
  search,
  onSearchChange,
  onChange,
  visibleCount,
}: {
  active: SourcingSourceFilter["key"];
  counts: Record<SourcingSourceFilter["key"], number>;
  search: string;
  onSearchChange: (next: string) => void;
  onChange: (next: SourcingSourceFilter["key"]) => void;
  visibleCount: number;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-line-soft border-y bg-cream px-9 py-2.5 max-md:px-5">
      <div className="flex flex-wrap gap-1.5">
        {SOURCING_SOURCE_FILTERS.map((f) => {
          const isActive = f.key === active;
          const count = counts[f.key] ?? 0;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => onChange(f.key)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-transparent px-3 py-1.5 font-body text-[12px] transition-colors",
                isActive
                  ? "bg-ink text-paper"
                  : "text-ink-mute hover:bg-cream hover:text-ink-soft",
              )}
            >
              {f.key !== "all" ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    DOT_TONE[f.key],
                  )}
                />
              ) : null}
              {f.label}
              {count > 0 ? (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-px font-mono text-[9.5px] font-medium",
                    isActive
                      ? "bg-paper/15 text-paper"
                      : "bg-cream-deep text-ink-mute",
                  )}
                >
                  {count}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="relative ml-auto flex-shrink-0 max-md:ml-0 max-md:w-full">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-mute"
          strokeWidth={1.5}
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search prospects…"
          autoComplete="off"
          aria-label="Search prospects"
          className="bg-cream border-line rounded-md border px-3 py-1.5 pl-7 font-body text-[12.5px] text-ink outline-none transition-colors focus:border-ink-mute focus:bg-paper max-md:w-full"
        />
      </div>

      <span className="font-mono text-[10.5px] tracking-[0.04em] uppercase text-ink-mute">
        {visibleCount} visible
      </span>
    </div>
  );
}
