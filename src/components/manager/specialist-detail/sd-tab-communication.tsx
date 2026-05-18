"use client";

/**
 * SdTabCommunication — Communication tab.
 *
 * 2 cards:
 *   1. Recent thread — 3-message chat preview. "manager" side renders
 *      avatar "M" + name "You". "specialist" side renders the
 *      Specialist's avatar + name. **Mateo self-page: both sides
 *      render as "You"** (per Step 5 Q3 reminder — self-referential).
 *   2. Past 1:1 sessions — 3 sessions (shared placeholder).
 *
 * "Open chat" → modal `landsInStep: 13` (Specialist Chat).
 * "Schedule next" → modal `landsInStep: 14` (1:1 scheduling coming
 * soon).
 *
 * Mateo self-page (per Step 5 Q2): both buttons suppressed
 * (interpersonal — chat with yourself doesn't exist).
 *
 * Ported from prototype lines 28185-28243.
 */

import { useState } from "react";
import {
  communicationThread,
  past1on1Sessions,
} from "@/lib/mock-data/manager/spec-detail-data";
import { MgrAvatar } from "@/components/manager/shell/mgr-avatar";
import { ManagerActionPlaceholderModal } from "@/components/manager/dashboard/manager-action-placeholder-modal";
import { currentManager } from "@/lib/mock-data/manager/manager-identity";
import type { ManagerActionCTA } from "@/lib/mock-data/manager/manager-rail";
import type { Specialist } from "@/lib/mock-data/manager/team";
import { cn } from "@/lib/utils/cn";

const OPEN_CHAT_CTA: ManagerActionCTA = {
  label: "Open chat",
  landsInStep: 13,
};
const SCHEDULE_NEXT_CTA: ManagerActionCTA = {
  label: "Schedule next",
  landsInStep: 14,
  description: "1:1 scheduling — coming soon.",
};

export function SdTabCommunication({ specialist: s }: { specialist: Specialist }) {
  const [activeCta, setActiveCta] = useState<ManagerActionCTA | null>(null);
  const isSelf = s.isManager === true;

  return (
    <div className="flex flex-col gap-4">
      {/* Recent thread */}
      <section className="bg-paper border-line rounded-md border p-5">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-ink-mute font-mono text-[10px] tracking-[0.12em] uppercase">
              Direct messages
            </div>
            <h2
              className="font-display text-ink m-0 mt-0.5 text-[18px] font-medium tracking-[-0.01em]"
              style={{ fontVariationSettings: '"opsz" 36' }}
            >
              Recent <em className="italic">thread</em>
            </h2>
          </div>
          {!isSelf ? (
            <button
              type="button"
              onClick={() => setActiveCta(OPEN_CHAT_CTA)}
              className="bg-ink text-paper hover:bg-ink-soft inline-flex items-center rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors"
            >
              Open chat
            </button>
          ) : null}
        </div>
        <ul className="flex flex-col gap-3">
          {communicationThread.map((msg) => {
            /* Mateo self-page: both sides render as "You" using the
               Manager avatar treatment (av-you). Otherwise, manager
               side = av-you + "You", specialist side = the spec's
               avatar + name. */
            const isManagerSide = msg.speaker === "manager" || isSelf;
            return (
              <li
                key={msg.id}
                className={cn(
                  "flex items-start gap-2.5",
                  isManagerSide && "flex-row-reverse",
                )}
              >
                {isManagerSide ? (
                  <MgrAvatar
                    slot="you"
                    initials={currentManager.initials}
                    fullName="You"
                    size="sm"
                  />
                ) : (
                  <MgrAvatar
                    slot={s.avatarSlot}
                    initials={s.initials}
                    fullName={s.fullName}
                    size="sm"
                  />
                )}
                <div className={cn("max-w-[80%]", isManagerSide && "items-end")}>
                  <div className="mb-1 flex items-baseline gap-2">
                    <span className="text-ink text-[12px] font-semibold">
                      {isManagerSide ? "You" : s.fullName}
                    </span>
                    <span className="text-ink-mute font-mono text-[10px] tracking-[0.04em]">
                      {msg.age}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "rounded-md px-3 py-2 text-[13px] leading-[1.45]",
                      isManagerSide
                        ? "bg-ink text-paper"
                        : "bg-cream/60 text-ink-soft border-line border",
                    )}
                  >
                    {msg.body}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Past 1:1 sessions */}
      <section className="bg-paper border-line rounded-md border p-5">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-ink-mute font-mono text-[10px] tracking-[0.12em] uppercase">
              1:1 meetings
            </div>
            <h2
              className="font-display text-ink m-0 mt-0.5 text-[18px] font-medium tracking-[-0.01em]"
              style={{ fontVariationSettings: '"opsz" 36' }}
            >
              Past <em className="italic">sessions</em>
            </h2>
          </div>
          {!isSelf ? (
            <button
              type="button"
              onClick={() => setActiveCta(SCHEDULE_NEXT_CTA)}
              className="border-line text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center rounded-md border px-3 py-1.5 text-[12px] font-medium transition-colors"
            >
              Schedule next
            </button>
          ) : null}
        </div>
        {isSelf ? (
          <div className="border-line bg-cream/40 text-ink-mute rounded-md border border-dashed px-4 py-8 text-center text-[12.5px]">
            No 1:1 history with yourself.
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {past1on1Sessions.map((mtg) => (
              <li key={mtg.id} className="border-line-soft border-l-[3px] pl-3">
                <div className="text-ink-mute mb-1 font-mono text-[10.5px] tracking-[0.04em]">
                  {mtg.dateLabel}
                </div>
                <div className="text-ink-soft text-[13px] leading-[1.45]">
                  <strong className="text-ink mr-1.5 font-semibold">
                    {mtg.topicLead}
                  </strong>
                  {mtg.topicBody}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <ManagerActionPlaceholderModal
        cta={activeCta}
        onClose={() => setActiveCta(null)}
      />
    </div>
  );
}
