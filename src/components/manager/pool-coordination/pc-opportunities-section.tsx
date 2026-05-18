"use client";

/**
 * PcOpportunitiesSection — 3 coordination opportunity cards.
 *
 * Auto-detected "smart suggestions" per prototype framing. 3 tones:
 *   - urgent (Redirect sprint — Bookkeeping → Customer Support)
 *   - warn (Cross-train — VAs ↔ Customer Support)
 *   - info (AI skill demand emerging — no owner)
 *
 * Each card has icon + eyebrow + italic-emphasized title + body
 * with inline-strong markers + 2 action buttons. All action
 * buttons trigger placeholder modal (no dedicated routes for
 * cross-category coordination flows).
 *
 * Ported from prototype lines 29929-29998.
 */

import { useState } from "react";
import { ManagerActionPlaceholderModal } from "@/components/manager/dashboard/manager-action-placeholder-modal";
import type { ManagerActionCTA } from "@/lib/mock-data/manager/manager-rail";
import {
  type CoordinationOpportunity,
  type CoordinationOpportunityActionTone,
  type CoordinationOpportunityTone,
  coordinationOpportunities,
} from "@/lib/mock-data/manager/manager-pool-coordination-data";
import { cn } from "@/lib/utils/cn";

const TONE_WRAPPER: Record<CoordinationOpportunityTone, string> = {
  urgent: "bg-danger-bg/30 border-danger/30 border-l-danger border-l-[3px]",
  warn: "bg-amber-bg/30 border-amber/30 border-l-amber border-l-[3px]",
  info: "bg-cream/40 border-line border-l-ink-soft border-l-[3px]",
};

const TONE_EYEBROW: Record<CoordinationOpportunityTone, string> = {
  urgent: "text-danger",
  warn: "text-amber",
  info: "text-ink-soft",
};

const TONE_ICON_WRAPPER: Record<CoordinationOpportunityTone, string> = {
  urgent: "bg-danger/15 text-danger",
  warn: "bg-amber/15 text-amber",
  info: "bg-cream-deep text-ink-soft",
};

const ACTION_TONE: Record<CoordinationOpportunityActionTone, string> = {
  danger: "bg-danger text-paper border-danger hover:bg-danger/90",
  primary: "bg-ink text-paper border-ink hover:bg-ink-soft",
  lime: "bg-lime text-ink border-lime-deep hover:bg-lime-deep",
  neutral: "bg-paper border-line text-ink-soft hover:bg-cream-deep hover:text-ink",
};

export function PcOpportunitiesSection() {
  return (
    <section className="mb-8">
      <header className="mb-3 flex items-baseline justify-between gap-3">
        <h2
          className="font-display text-ink m-0 text-[18px] font-medium tracking-[-0.01em]"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          Coordination <em className="italic">opportunities</em>
        </h2>
        <span className="text-ink-mute text-[12px]">
          {coordinationOpportunities.length} smart suggestions · auto-detected
        </span>
      </header>
      <div className="flex flex-col gap-3">
        {coordinationOpportunities.map((opp) => (
          <OpportunityCard key={opp.id} opportunity={opp} />
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   Card sub-component
   ============================================================ */

function OpportunityCard({ opportunity: o }: { opportunity: CoordinationOpportunity }) {
  const [activeCta, setActiveCta] = useState<ManagerActionCTA | null>(null);

  const handleAction = (label: string) => {
    setActiveCta({
      label,
      landsInStep: 14,
      description: `${label} — cross-category coordination flow coming soon.`,
    });
  };

  return (
    <article
      className={cn(
        "grid grid-cols-[auto_1fr_auto] items-start gap-4 rounded-md border p-4 shadow-sm",
        TONE_WRAPPER[o.tone],
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "grid h-10 w-10 flex-shrink-0 place-items-center rounded-md",
          TONE_ICON_WRAPPER[o.tone],
        )}
        aria-hidden="true"
      >
        <OpportunityIcon tone={o.tone} />
      </div>

      {/* Body */}
      <div className="min-w-0">
        <div
          className={cn(
            "font-mono text-[10px] tracking-[0.12em] uppercase",
            TONE_EYEBROW[o.tone],
          )}
        >
          {o.eyebrow}
        </div>
        <h3
          className="font-display text-ink mt-1 mb-1.5 text-[15px] font-medium leading-snug tracking-[-0.01em]"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          {o.titleParts.map((part, i) => (
            <span key={i}>
              {part.emphasized ? (
                <em className="italic">{part.text}</em>
              ) : (
                part.text
              )}
            </span>
          ))}
        </h3>
        <p className="text-ink-soft m-0 text-[12.5px] leading-[1.5]">
          {o.bodyParts.map((part, i) =>
            part.kind === "strong" ? (
              <strong key={i} className="text-ink font-semibold">
                {part.value}
              </strong>
            ) : (
              <span key={i}>{part.value}</span>
            ),
          )}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-shrink-0 flex-col gap-2 self-center">
        <button
          type="button"
          onClick={() => handleAction(o.primaryAction.label)}
          className={cn(
            "inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-[12.5px] font-medium whitespace-nowrap transition-colors",
            ACTION_TONE[o.primaryAction.tone],
          )}
        >
          {o.primaryAction.label}
        </button>
        <button
          type="button"
          onClick={() => handleAction(o.secondaryAction.label)}
          className={cn(
            "inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-[12.5px] font-medium whitespace-nowrap transition-colors",
            ACTION_TONE.neutral,
          )}
        >
          {o.secondaryAction.label}
        </button>
      </div>

      <ManagerActionPlaceholderModal
        cta={activeCta}
        onClose={() => setActiveCta(null)}
      />
    </article>
  );
}

function OpportunityIcon({ tone }: { tone: CoordinationOpportunityTone }) {
  /* Distinct glyph per tone matching prototype intent: arrow for
     redirect, bidirectional for cross-train, star for new demand. */
  if (tone === "urgent") {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="3" cy="9" r="1.5" fill="currentColor" />
      </svg>
    );
  }
  if (tone === "warn") {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 7h6M6 4l-3 3 3 3M15 11H9M12 14l3-3-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 1.5 11 6l5 .5-3.5 3.5L13 15l-4-2.5-4 2.5 .5-5L2 6.5l5-.5L9 1.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
