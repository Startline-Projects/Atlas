"use client";

/**
 * SdTabWork — Their Work tab.
 *
 * 2 cards:
 *   1. Their portfolio — 5 cards (Their candidates / Their clients /
 *      Open disputes / Shortlist requests / Open their full view).
 *      All render as DISABLED wrappers — destination routes don't
 *      exist (the Manager doesn't have a "view as specialist" mode).
 *   2. Manager actions — Flag for admin review + Suspend Specialist
 *      (suspended button is disabled per prototype precedent — admin
 *      override required).
 *
 * Mateo self-page (per Step 5 Q2 lock): Manager actions section
 * suppressed entirely (you can't flag/suspend yourself).
 *
 * Ported from prototype lines 28245-28306.
 */

import { useState } from "react";
import { workPortfolioCardDefs } from "@/lib/mock-data/manager/spec-detail-data";
import { ManagerActionPlaceholderModal } from "@/components/manager/dashboard/manager-action-placeholder-modal";
import type { ManagerActionCTA } from "@/lib/mock-data/manager/manager-rail";
import type { Specialist } from "@/lib/mock-data/manager/team";
import { cn } from "@/lib/utils/cn";

const FLAG_ADMIN_CTA: ManagerActionCTA = {
  label: "Flag for admin review",
  landsInStep: 14,
  description: "Admin escalation flow — coming soon.",
};

export function SdTabWork({ specialist: s }: { specialist: Specialist }) {
  const [activeCta, setActiveCta] = useState<ManagerActionCTA | null>(null);
  const isSelf = s.isManager === true;

  return (
    <div className="flex flex-col gap-4">
      <section className="bg-paper border-line rounded-md border p-5">
        <div className="mb-4">
          <div className="text-ink-mute font-mono text-[10px] tracking-[0.12em] uppercase">
            Their portfolio
          </div>
          <h2
            className="font-display text-ink m-0 mt-0.5 text-[18px] font-medium tracking-[-0.01em]"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            Open <em className="italic">everything</em>
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {workPortfolioCardDefs.map((def) => {
            /* Resolve per-specialist counts where the card def is
               unresolved (count === null). */
            const resolvedCount =
              def.count !== null
                ? def.count
                : def.id === "candidates"
                  ? s.workload.candidatesCount
                  : null;
            return (
              <div
                key={def.id}
                aria-disabled="true"
                title="Manager 'view as specialist' surface — not in any step"
                className={cn(
                  "bg-cream/40 border-line flex cursor-not-allowed flex-col gap-2 rounded-md border p-3.5 opacity-70",
                  def.isFeature && "border-lime-deep/40 ring-1 ring-lime-deep/20",
                )}
              >
                <div className="text-ink text-[13px] font-semibold">
                  {def.title}
                </div>
                {resolvedCount !== null ? (
                  <div
                    className="font-display text-ink text-[24px] leading-none font-medium tracking-[-0.015em]"
                    style={{ fontVariationSettings: '"opsz" 36' }}
                  >
                    {resolvedCount}
                  </div>
                ) : null}
                <div className="text-ink-mute text-[11.5px]">{def.meta}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Manager actions — suppressed for Mateo self-page. */}
      {!isSelf ? (
        <section className="bg-paper border-line rounded-md border p-5">
          <div className="mb-3">
            <div className="text-ink-mute font-mono text-[10px] tracking-[0.12em] uppercase">
              Admin controls
            </div>
            <h2
              className="font-display text-ink m-0 mt-0.5 text-[18px] font-medium tracking-[-0.01em]"
              style={{ fontVariationSettings: '"opsz" 36' }}
            >
              Manager <em className="italic">actions</em>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={() => setActiveCta(FLAG_ADMIN_CTA)}
              className="border-line text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors"
            >
              Flag for admin review
            </button>
            <button
              type="button"
              disabled
              title="Admin override required"
              className="border-line text-ink-mute bg-cream/60 inline-flex cursor-not-allowed items-center rounded-md border px-3 py-1.5 text-[12.5px] font-medium opacity-60"
            >
              Suspend Specialist
            </button>
          </div>
          <p className="text-ink-mute mt-3 m-0 text-[11.5px]">
            Suspending a Specialist requires admin authorization. Use
            &quot;Flag for admin review&quot; to start an escalation.
          </p>
        </section>
      ) : null}

      <ManagerActionPlaceholderModal
        cta={activeCta}
        onClose={() => setActiveCta(null)}
      />
    </div>
  );
}
