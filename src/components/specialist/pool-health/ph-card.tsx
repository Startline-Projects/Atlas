/**
 * Card chrome shared by all 8 grid cards on the pool-health dashboard.
 * Per source CSS `.ph-card`: paper bg + line border + 12px radius +
 * 14px gap between head and body. Each card has a label/title pair on
 * the left and an optional trend caption on the right.
 *
 * Server Component. Page-specific to pool-health (not promoted to
 * operations-shared) because the card's exact chrome doesn't surface
 * elsewhere this session.
 */

import { cn } from "@/lib/utils/cn";

export type PhCardTrendTone = "default" | "success" | "amber" | "danger";

const TREND_TONE: Record<PhCardTrendTone, string> = {
  default: "text-ink-mute",
  success: "text-success",
  amber: "text-amber",
  danger: "text-danger",
};

export function PhCard({
  label,
  title,
  trend,
  span,
  children,
}: {
  /** Mono uppercase label above the title. */
  label: string;
  /** Display-font 16px title (with optional emphasized fragment). */
  title: string;
  /** Optional trend caption (top-right). */
  trend?: { tone: PhCardTrendTone; text: string };
  /** Grid column span for the card. */
  span: 4 | 6 | 8 | 12;
  children: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        "bg-paper border-line flex min-w-0 flex-col gap-3.5 rounded-xl border p-4",
        // Default → 12-col span
        span === 4 && "lg:col-span-4 max-lg:col-span-6 max-md:col-span-12",
        span === 6 && "lg:col-span-6 max-md:col-span-12",
        span === 8 && "lg:col-span-8 max-md:col-span-12",
        span === 12 && "col-span-12",
      )}
    >
      <header className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="mb-0.5 font-mono text-[9.5px] font-medium tracking-[0.14em] uppercase text-ink-mute">
            {label}
          </div>
          <div
            className="font-display text-[16px] font-medium tracking-[-0.01em] text-ink"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            {title}
          </div>
        </div>
        {trend ? (
          <span
            className={cn(
              "font-mono text-[10.5px] tracking-[0.04em] whitespace-nowrap",
              TREND_TONE[trend.tone],
            )}
          >
            {trend.text}
          </span>
        ) : null}
      </header>
      {children}
    </article>
  );
}
