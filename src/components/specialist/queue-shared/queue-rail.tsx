"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils/cn";

/* ============================================================
   Types
   ============================================================ */

export type QueueCountTone = "danger" | "warn" | "lime" | "default";

export type QueueFilter = {
  key: string;
  label: string;
};

type QueueRailProps<T extends { id: string; filterTags: ReadonlyArray<string> }> = {
  /** Rail header — title chip ("Review queue 3") + subtitle. */
  title: string;
  count: number;
  countTone?: QueueCountTone;
  subtitle: string;

  /** Filter chips — each has a stable `key`. The first key is treated as "show all". */
  filters: ReadonlyArray<QueueFilter>;

  /** Initial active filter (defaults to first filter's key). */
  defaultFilterKey?: string;

  /** Candidates to display. */
  candidates: ReadonlyArray<T>;

  /** Currently selected candidate id (controlled by the page). */
  selectedId: string;
  onSelect: (id: string) => void;

  /**
   * Per-row renderer. Receives the candidate plus an `isActive` flag for
   * styling the selected row. Each queue supplies its own row shape so
   * the rail stays content-agnostic.
   */
  renderRow: (candidate: T, isActive: boolean) => React.ReactNode;

  /** Empty-state copy shown when no candidates match the active filter. */
  emptyState?: { title: string; subtitle: string };

  /**
   * Optional CTA shown above the list when one or more candidates match
   * a "bulk-eligible" criterion. Used by recert-queue's bulk-approve.
   */
  bulkAction?: { label: string; visible: boolean; onClick?: () => void };
};

/* ============================================================
   Implementation
   ============================================================ */

const COUNT_TONE: Record<QueueCountTone, string> = {
  default: "bg-cream-deep text-ink-soft",
  danger: "bg-danger text-paper",
  warn: "bg-amber text-paper",
  lime: "bg-lime text-ink",
};

export function QueueRail<
  T extends { id: string; filterTags: ReadonlyArray<string> },
>({
  title,
  count,
  countTone = "danger",
  subtitle,
  filters,
  defaultFilterKey,
  candidates,
  selectedId,
  onSelect,
  renderRow,
  emptyState,
  bulkAction,
}: QueueRailProps<T>) {
  const [activeFilter, setActiveFilter] = useState<string>(
    defaultFilterKey ?? filters[0]?.key ?? "all",
  );

  /** Count per filter chip — derived from the candidates' `filterTags`. */
  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const f of filters) {
      counts[f.key] = candidates.filter((c) =>
        c.filterTags.includes(f.key),
      ).length;
    }
    return counts;
  }, [filters, candidates]);

  /** Visible candidates after applying the active filter. */
  const visible = useMemo(
    () => candidates.filter((c) => c.filterTags.includes(activeFilter)),
    [candidates, activeFilter],
  );

  return (
    <aside
      className="bg-paper border-line-soft sticky top-[calc(36px+57px)] flex h-[calc(100vh-36px-57px)] flex-col overflow-y-auto border-r"
      aria-label="Queue navigation"
    >
      <div className="border-line-soft bg-paper sticky top-0 z-[2] border-b px-[18px] pt-[18px] pb-3.5">
        <h3 className="font-display mb-1 flex items-center gap-2 text-[18px] leading-tight font-medium tracking-[-0.01em]">
          <span>{title}</span>
          <span
            className={cn(
              "rounded-[3px] px-1.5 py-0.5 font-mono text-[10px] tracking-[0.06em]",
              COUNT_TONE[countTone],
            )}
          >
            {count}
          </span>
        </h3>
        <p className="text-ink-mute text-[12.5px]">{subtitle}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {filters.map((f) => {
            const isActive = activeFilter === f.key;
            const c = filterCounts[f.key] ?? 0;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setActiveFilter(f.key)}
                aria-pressed={isActive}
                className={cn(
                  "border-line bg-paper text-ink-mute hover:text-ink hover:border-[#C4BCA9] inline-flex items-center gap-1.5 rounded-[6px] border px-2.5 py-1 text-[12px] font-medium transition-colors",
                  isActive && "bg-ink text-paper border-ink hover:text-paper",
                )}
              >
                {f.label}
                <span
                  className={cn(
                    "font-mono text-[10px] tracking-[0.04em]",
                    isActive ? "text-paper/65" : "text-ink-mute",
                  )}
                >
                  {c}
                </span>
              </button>
            );
          })}
        </div>

        {bulkAction?.visible ? (
          <button
            type="button"
            onClick={bulkAction.onClick}
            className="bg-lime text-ink hover:bg-lime-deep mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full px-3 py-2 text-[12.5px] font-semibold transition-colors"
          >
            {bulkAction.label}
          </button>
        ) : null}
      </div>

      {visible.length > 0 ? (
        <ul role="listbox" className="flex flex-1 flex-col">
          {visible.map((c) => (
            <li
              key={c.id}
              onClick={() => onSelect(c.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(c.id);
                }
              }}
              role="option"
              tabIndex={0}
              aria-selected={selectedId === c.id}
              className={cn(
                "border-line-soft hover:bg-cream relative cursor-pointer border-b px-4 py-3.5 transition-colors last:border-0",
                selectedId === c.id &&
                  "bg-cream-deep before:bg-ink before:absolute before:top-3.5 before:bottom-3.5 before:left-0 before:w-[3px] before:rounded-r-[2px] before:content-['']",
              )}
            >
              {renderRow(c, selectedId === c.id)}
            </li>
          ))}
        </ul>
      ) : emptyState ? (
        <div className="text-ink-mute flex flex-1 flex-col items-center justify-center gap-2 px-6 py-10 text-center">
          <div
            aria-hidden="true"
            className="text-ink-mute mb-1 inline-grid h-8 w-8 place-items-center"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle
                cx="16"
                cy="16"
                r="13"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="m11 16 3.5 3.5L21 13"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <strong className="text-ink text-[13px]">{emptyState.title}</strong>
          <span className="text-[12px]">{emptyState.subtitle}</span>
        </div>
      ) : null}
    </aside>
  );
}
