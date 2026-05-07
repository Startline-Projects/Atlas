/**
 * Quick-help continue-training banner. Reads the `quickHelpBanner`
 * snapshot from mock data and renders a compact card with icon +
 * title + detail + CTA.
 *
 * Per source CSS `.help-quick-banner`. Card is paper bg + line border
 * + lime-tinted left edge to suggest progress / continuation.
 *
 * Server Component (CTA fires e.preventDefault via a small Client
 * resume button — but the surrounding banner is Server).
 */

import { PlayCircle } from "lucide-react";
import { quickHelpBanner } from "@/lib/mock-data/specialist/help";
import { HelpResumeButton } from "./help-resume-button";

export function HelpBanner() {
  const b = quickHelpBanner;
  return (
    <div className="bg-paper border-line border-l-lime-deep flex items-center gap-4 rounded-xl border border-l-[3px] px-5 py-4 max-md:flex-col max-md:items-start">
      <div
        aria-hidden="true"
        className="bg-lime/15 grid h-11 w-11 flex-shrink-0 place-items-center rounded-full text-lime-deep"
      >
        <PlayCircle className="h-5 w-5" strokeWidth={1.6} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-0.5 font-mono text-[9.5px] font-semibold tracking-[0.14em] uppercase text-lime-text">
          Continue where you left off
        </div>
        <div
          className="font-display text-[16px] font-medium leading-tight text-ink"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          {b.title}
        </div>
        <div className="mt-1 text-[12.5px] leading-[1.5] text-ink-soft">
          {b.detail}
        </div>
      </div>
      <HelpResumeButton trainingId={b.trainingId} ctaLabel={b.ctaLabel} />
    </div>
  );
}
