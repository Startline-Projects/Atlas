/**
 * Changelog list — 5 dated entries with type-tag (new / improved /
 * fixed) and message text.
 *
 * Per source CSS `.help-changelog-row` — grid (date / tag / text).
 *
 * Server Component.
 */

import { changelog, type ChangelogTagKind } from "@/lib/mock-data/specialist/help";
import { cn } from "@/lib/utils/cn";

const TAG_TONE: Record<ChangelogTagKind, string> = {
  new: "bg-lime/20 text-lime-deep",
  improved: "bg-success-bg text-success",
  fixed: "bg-amber/15 text-amber",
};

export function ChangelogList() {
  return (
    <section>
      <header className="mb-3 flex items-baseline justify-between gap-3">
        <div>
          <div className="mb-0.5 font-mono text-[10px] font-semibold tracking-[0.14em] uppercase text-ink-mute">
            Changelog
          </div>
          <h2
            className="font-display m-0 text-[22px] font-medium tracking-[-0.015em] text-ink"
            style={{ fontVariationSettings: '"opsz" 96' }}
          >
            What&apos;s new in Atlas
          </h2>
        </div>
        <button
          type="button"
          className="text-ink-soft hover:text-ink font-mono text-[11px] tracking-[0.04em] uppercase transition-colors"
        >
          Full release notes →
        </button>
      </header>
      <ul className="bg-paper border-line m-0 flex list-none flex-col rounded-xl border p-0">
        {changelog.map((entry) => (
          <li
            key={entry.id}
            className="border-line-soft grid grid-cols-[60px_minmax(0,90px)_minmax(0,1fr)] items-start gap-3 border-b px-5 py-3.5 last:border-b-0 max-sm:grid-cols-[60px_minmax(0,1fr)] max-sm:gap-2"
          >
            <span className="font-mono text-[10.5px] font-semibold tracking-[0.06em] uppercase text-ink-mute">
              {entry.dateLabel}
            </span>
            <span
              className={cn(
                "self-center justify-self-start rounded-full px-2 py-0.5 font-mono text-[9.5px] font-semibold tracking-[0.08em] uppercase",
                TAG_TONE[entry.tag.kind],
              )}
            >
              {entry.tag.label}
            </span>
            <span className="text-[12.5px] leading-[1.5] text-ink-soft max-sm:col-span-2">
              {entry.text}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
