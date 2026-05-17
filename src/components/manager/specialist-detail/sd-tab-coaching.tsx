"use client";

/**
 * SdTabCoaching — Coaching Notes tab.
 *
 * 2 cards:
 *   1. New coaching note editor (textarea, local state, "Auto-saving"
 *      indicator is decorative — no real persistence).
 *   2. Past notes history (3 entries — shared placeholder content).
 *
 * Mateo self-page (per Step 5 Q2 lock): Past notes renders empty
 * state ("No coaching notes on yourself"). The editor stays mounted
 * but the placeholder copy clarifies the self-coaching frame.
 *
 * Ported from prototype lines 28124-28183.
 */

import { useState } from "react";
import { coachingPastNotes } from "@/lib/mock-data/manager/spec-detail-data";
import type { Specialist } from "@/lib/mock-data/manager/team";

export function SdTabCoaching({ specialist: s }: { specialist: Specialist }) {
  const [draft, setDraft] = useState<string>("");
  const isSelf = s.isManager === true;

  return (
    <div className="flex flex-col gap-4">
      {/* Editor */}
      <section className="bg-paper border-line rounded-md border p-5">
        <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-ink-mute font-mono text-[10px] tracking-[0.12em] uppercase">
              Private · Manager + Admin only
            </div>
            <h2
              className="font-display text-ink m-0 mt-0.5 text-[18px] font-medium tracking-[-0.01em]"
              style={{ fontVariationSettings: '"opsz" 36' }}
            >
              New <em className="italic">coaching note</em>
            </h2>
          </div>
          <span className="text-ink-mute font-mono text-[10px] tracking-[0.08em] uppercase">
            Auto-saving
          </span>
        </div>
        <div className="border-line bg-cream/40 mb-2 flex items-center gap-1 rounded-md border-b-0 border px-2 py-1.5">
          <ToolBtn label="Bold"><strong>B</strong></ToolBtn>
          <ToolBtn label="Italic"><em>I</em></ToolBtn>
          <ToolBtn label="Bullet list">•</ToolBtn>
          <ToolBtn label="Number list">1.</ToolBtn>
          <ToolBtn label="Link">🔗</ToolBtn>
        </div>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={
            isSelf
              ? "Reflect on your own week — observations only visible to you & Admin…"
              : `Capture observations, feedback, or topics for next 1:1 with ${s.firstName}…`
          }
          className="border-line bg-paper text-ink placeholder:text-ink-mute min-h-[120px] w-full rounded-md border px-3 py-2 text-[13px] outline-none focus:border-ink"
        />
        <div className="text-ink-mute mt-2 flex flex-wrap items-center justify-between gap-2 text-[11.5px]">
          <span>Visible only to Manager &amp; Admin · linked to HR records</span>
          <span className="inline-flex items-center gap-1">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            Saved
          </span>
        </div>
      </section>

      {/* Past notes */}
      <section className="bg-paper border-line rounded-md border p-5">
        <div className="mb-4">
          <div className="text-ink-mute font-mono text-[10px] tracking-[0.12em] uppercase">
            Past notes
          </div>
          <h2
            className="font-display text-ink m-0 mt-0.5 text-[18px] font-medium tracking-[-0.01em]"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            Coaching <em className="italic">history</em>
          </h2>
        </div>
        {isSelf ? (
          <div className="border-line bg-cream/40 text-ink-mute rounded-md border border-dashed px-4 py-8 text-center text-[12.5px]">
            No coaching notes on yourself — self-reflection only.
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {coachingPastNotes.map((note) => (
              <li
                key={note.id}
                className="border-line-soft rounded-md border bg-cream/30 p-3.5"
              >
                <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-ink-mute text-[11.5px]">
                    {note.dateLabel} · {note.age}
                  </span>
                  <span className="bg-cream-deep text-ink-soft rounded-[3px] px-1.5 py-0.5 font-mono text-[9.5px] font-semibold tracking-[0.06em] uppercase">
                    {note.tag}
                  </span>
                </div>
                <p className="text-ink-soft m-0 text-[13px] leading-[1.45]">
                  {note.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function ToolBtn({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={label}
      className="text-ink-mute hover:bg-cream-deep hover:text-ink rounded px-2 py-1 text-[12px] transition-colors"
    >
      {children}
    </button>
  );
}
