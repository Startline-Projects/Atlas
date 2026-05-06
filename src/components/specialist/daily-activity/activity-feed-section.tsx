"use client";

/**
 * Filter chips + feed combined into one Client island. Owns the
 * filter state; renders the chips (Client) above the feed (Server-
 * rendered items in a Client wrapper because the visible items
 * depend on `filter`).
 *
 * Day grouping happens here: items are grouped by their `date` field
 * (already pre-formatted in mock data — "Today" / "Yesterday" /
 * "Mon Apr 28" etc.). A day-divider header renders before each
 * group.
 *
 * Empty state shown when no items match the active filter.
 */

import { useMemo, useState } from "react";
import { Inbox } from "lucide-react";

import {
  type ActivityFeedItem,
  type ActivityFilterKey,
} from "@/lib/mock-data/specialist/daily-activity";
import { ActivityFilterChips } from "./activity-filter-chips";
import { ActivityFeedItemRow } from "./activity-feed-item";

type FeedSectionProps = {
  items: ReadonlyArray<ActivityFeedItem>;
  counts: Record<ActivityFilterKey, number>;
};

export function ActivityFeedSection({ items, counts }: FeedSectionProps) {
  const [filter, setFilter] = useState<ActivityFilterKey>("all");

  const visible = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((i) => i.kind === filter);
  }, [items, filter]);

  /** Group visible items by their pre-formatted `date` field, preserving
   *  the order of first appearance (mock data is already newest-first). */
  const groupedByDate = useMemo(() => {
    const out: Array<{ date: string; items: ActivityFeedItem[] }> = [];
    for (const item of visible) {
      const last = out[out.length - 1];
      if (last && last.date === item.date) {
        last.items.push(item);
      } else {
        out.push({ date: item.date, items: [item] });
      }
    }
    return out;
  }, [visible]);

  return (
    <>
      <ActivityFilterChips
        active={filter}
        counts={counts}
        visibleCount={visible.length}
        onChange={setFilter}
      />
      <div className="mx-auto flex w-full max-w-[920px] flex-col gap-0 px-10 pt-7 pb-20 max-md:px-5 max-md:pb-14">
        {groupedByDate.length === 0 ? (
          <FeedEmpty />
        ) : (
          groupedByDate.map((group, gi) => (
            <DayGroup
              key={`${group.date}-${gi}`}
              date={group.date}
              count={group.items.length}
              isToday={group.date === "Today"}
            >
              {group.items.map((item) => (
                <ActivityFeedItemRow key={item.id} item={item} />
              ))}
            </DayGroup>
          ))
        )}
      </div>
    </>
  );
}

/* ============================================================
   Day-divider header + group wrapper
   ============================================================ */

function DayGroup({
  date,
  count,
  isToday,
  children,
}: {
  date: string;
  count: number;
  isToday: boolean;
  children: React.ReactNode;
}) {
  return (
    <section>
      <header
        className={`mb-0 flex items-baseline gap-3.5 border-b pt-[22px] pb-3.5 ${
          isToday ? "border-ink" : "border-line"
        } first:pt-0`}
      >
        <h2
          className="font-display text-[22px] font-medium tracking-[-0.015em] text-ink"
          style={{ fontVariationSettings: '"opsz" 96' }}
        >
          {isToday ? (
            <em className="italic text-ink-soft">{date}</em>
          ) : (
            date
          )}
        </h2>
        <span className="ml-auto font-mono text-[10.5px] tracking-[0.06em] uppercase text-ink-mute">
          {count} action{count === 1 ? "" : "s"}
        </span>
      </header>
      {children}
    </section>
  );
}

/* ============================================================
   Empty state
   ============================================================ */

function FeedEmpty() {
  return (
    <div className="px-6 py-16 text-center text-ink-mute">
      <div
        className="bg-cream-deep mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full text-ink-mute"
        aria-hidden="true"
      >
        <Inbox className="h-6 w-6" strokeWidth={1.5} />
      </div>
      <h4
        className="font-display m-0 mb-1.5 text-[18px] font-normal text-ink"
        style={{ fontVariationSettings: '"opsz" 72' }}
      >
        No matching actions
      </h4>
      <p className="m-0 text-[13px]">
        Try a different filter — the activity stream is the full record of
        decisions, messages, and system events.
      </p>
    </div>
  );
}
