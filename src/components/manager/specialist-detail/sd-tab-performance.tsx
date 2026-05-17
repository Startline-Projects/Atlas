"use client";

/**
 * SdTabPerformance — Performance tab.
 *
 * 4 cards arranged 2x2 at lg, each with:
 *   - eyebrow + title (Reviews / Disputes / Sourcing / Pool)
 *   - 4 metric tiles
 *   - 7-bar sparkline with up/flat trend indicator
 *
 * Sparkline numbers and shape are shared placeholder content
 * (matches prototype's one-block-with-data-swap pattern). Future
 * audit may parameterize per specialist — see CONVERSION_LOG
 * "Specialist shape audit pass" follow-up.
 *
 * Ported from prototype lines 27896-27960.
 */

import { performanceCards } from "@/lib/mock-data/manager/spec-detail-data";
import { cn } from "@/lib/utils/cn";

export function SdTabPerformance() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {performanceCards.map((card) => (
        <section
          key={card.id}
          className="bg-paper border-line rounded-md border p-5"
        >
          <div className="mb-4">
            <div className="text-ink-mute font-mono text-[10px] tracking-[0.12em] uppercase">
              {card.eyebrow}
            </div>
            <h2
              className="font-display text-ink m-0 mt-0.5 text-[18px] font-medium tracking-[-0.01em]"
              style={{ fontVariationSettings: '"opsz" 36' }}
            >
              {card.titleLead} <em className="italic">{card.titleEm}</em>
            </h2>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-2.5 md:grid-cols-4">
            {card.tiles.map((tile) => (
              <div
                key={tile.label}
                className="bg-cream/40 border-line-soft flex flex-col gap-1 rounded-md border px-3 py-2.5"
              >
                <div className="text-ink-mute font-mono text-[9px] tracking-[0.14em] uppercase">
                  {tile.label}
                </div>
                <div
                  className={cn(
                    "font-display text-[20px] leading-none font-medium tracking-[-0.015em]",
                    tile.tone === "success" ? "text-success" : "text-ink",
                  )}
                  style={{ fontVariationSettings: '"opsz" 36' }}
                >
                  {tile.value}
                </div>
              </div>
            ))}
          </div>
          <Sparkline heights={card.sparkHeights} dir={card.sparkDir} />
        </section>
      ))}
    </div>
  );
}

function Sparkline({
  heights,
  dir,
}: {
  heights: ReadonlyArray<number>;
  dir: "up" | "flat";
}) {
  return (
    <div
      aria-label="Trend"
      role="img"
      className={cn(
        "flex h-12 items-end gap-1",
        dir === "up" ? "[--spark-fill:var(--color-success)]" : "[--spark-fill:var(--color-line-strong)]",
      )}
    >
      {heights.map((h, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            height: `${h}%`,
            background: "var(--spark-fill)",
          }}
          className="w-2 flex-1 rounded-t-sm opacity-80"
        />
      ))}
    </div>
  );
}
