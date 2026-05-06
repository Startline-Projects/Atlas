/**
 * Section 02 — Atlas summary. Split layout: italic display analysis on
 * the left (with AI recommendation callout), Case facts rail on the
 * right. Page-specific composition; not extracted to operations-shared.
 *
 * Server Component.
 */

import { Sparkles } from "lucide-react";
import type { DisputeAtlasSummary } from "@/lib/mock-data/specialist/disputes";
import { DecisionRailFacts } from "./decision-rail-facts";

export function AtlasSummary({
  summary,
}: {
  summary: DisputeAtlasSummary;
}) {
  const paragraphs = summary.analysis.split("\n\n");

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="flex flex-col gap-4">
        <div
          className="font-display text-[15px] italic leading-[1.6] text-ink-soft"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          {paragraphs.map((p, i) => (
            <p key={i} className={i > 0 ? "mt-3.5" : ""}>
              {p}
            </p>
          ))}
        </div>
        <div className="bg-lime/10 border-line-soft flex items-start gap-3 rounded-lg border border-l-[3px] border-l-lime-deep px-4 py-3">
          <div className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-md bg-lime text-ink">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={1.6} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-mono text-[9.5px] font-semibold tracking-[0.14em] uppercase text-lime-text">
              AI recommendation
            </div>
            <div className="mt-0.5 text-[14px] font-medium text-ink">
              {summary.recommendation.label}
            </div>
            {summary.recommendation.detail ? (
              <div className="mt-0.5 text-[12.5px] text-ink-mute">
                {summary.recommendation.detail}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <DecisionRailFacts cells={summary.facts} />
    </div>
  );
}
