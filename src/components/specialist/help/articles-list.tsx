/**
 * Popular articles list — 6 numbered rows (01-06) with title + meta
 * (read-time + last-updated).
 *
 * Per source CSS `.help-article-row` — 3-col grid (number / title-block
 * / arrow). All-row "All articles →" link in the header (visual only).
 *
 * Server Component.
 */

import { ArrowUpRight } from "lucide-react";
import { popularArticles } from "@/lib/mock-data/specialist/help";

export function ArticlesList() {
  return (
    <section>
      <header className="mb-3 flex items-baseline justify-between gap-3">
        <div>
          <div className="mb-0.5 font-mono text-[10px] font-semibold tracking-[0.14em] uppercase text-ink-mute">
            Popular
          </div>
          <h2
            className="font-display m-0 text-[22px] font-medium tracking-[-0.015em] text-ink"
            style={{ fontVariationSettings: '"opsz" 96' }}
          >
            Frequently asked questions
          </h2>
        </div>
        <button
          type="button"
          className="text-ink-soft hover:text-ink font-mono text-[11px] tracking-[0.04em] uppercase transition-colors"
        >
          All articles →
        </button>
      </header>
      <ol className="bg-paper border-line m-0 flex list-none flex-col rounded-xl border p-0">
        {popularArticles.map((art, i) => (
          <li
            key={art.id}
            className="border-line-soft border-b last:border-b-0"
          >
            <button
              type="button"
              className="grid w-full grid-cols-[40px_minmax(0,1fr)_24px] items-center gap-3 border-none bg-transparent px-5 py-3.5 text-left transition-colors hover:bg-cream"
            >
              <span className="font-mono text-[14px] font-medium text-ink-mute tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <div className="text-[13.5px] font-medium leading-tight text-ink">
                  {art.title}
                </div>
                <div className="mt-0.5 font-mono text-[10px] tracking-[0.04em] uppercase text-ink-mute">
                  {art.metaLabel}
                </div>
              </div>
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 flex-shrink-0 text-ink-mute"
                strokeWidth={1.5}
              />
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
