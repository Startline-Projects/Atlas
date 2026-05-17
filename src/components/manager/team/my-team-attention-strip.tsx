"use client";

/**
 * MyTeamAttentionStrip — the 3-card priority strip above the main
 * team grid. Shows Specialists with the most pressing issues:
 *
 *   - Priya Mehra — DANGER — Daily missed (2 days running)
 *   - Diego Cabrera — WARN — Review SLA dropped to 85%
 *   - Aisha Bello  — WARN — At capacity + Customer Support depleted
 *
 * Ported from `reference/manager.html` lines 27298-27332.
 *
 * Each card is a wrapper that LINKS to the Specialist's detail
 * page (`/specialist/team/[id]`). Step 5 lands those routes — until
 * then the wrappers render as `<div aria-disabled cursor-not-allowed>`
 * per the two-tier CTA pattern (nav links = disabled spans).
 *
 * TODO(step-5): un-disable the Attention card wrappers — flip
 * the `<div aria-disabled>` to `<Link href={...}>` for each card.
 * Grep target.
 *
 * Detail copy uses derived Specialist names + canonical avatar
 * slots from team.ts.
 */

import {
  getSpecialist,
  type SpecialistId,
} from "@/lib/mock-data/manager/team";
import { countryFlag } from "@/lib/utils/country-flag";
import { MgrAvatar } from "@/components/manager/shell/mgr-avatar";
import { cn } from "@/lib/utils/cn";

type AttentionTone = "danger" | "warn";

type AttentionCard = {
  specialistId: SpecialistId;
  tone: AttentionTone;
  /** Inline body fragments — supports strong markers. */
  detail: ReadonlyArray<
    | { kind: "text"; value: string }
    | { kind: "strong"; value: string }
  >;
  tagLabel: string;
};

const CARDS: ReadonlyArray<AttentionCard> = [
  {
    specialistId: "spec-priya-mehra",
    tone: "danger",
    detail: [
      { kind: "text", value: "Missed daily activity · " },
      { kind: "strong", value: "2 days running" },
      { kind: "text", value: " · Tech Support pool steady" },
    ],
    tagLabel: "Daily missed",
  },
  {
    specialistId: "spec-diego-cabrera",
    tone: "warn",
    detail: [
      { kind: "text", value: "Review SLA dropped to " },
      { kind: "strong", value: "85%" },
      { kind: "text", value: " this week · down from 94%" },
    ],
    tagLabel: "Performance",
  },
  {
    specialistId: "spec-aisha-bello",
    tone: "warn",
    detail: [
      { kind: "text", value: "At capacity · " },
      { kind: "strong", value: "Customer Support pool depleted" },
      { kind: "text", value: " · review overdue" },
    ],
    tagLabel: "Capacity",
  },
];

const CARD_BORDER: Record<AttentionTone, string> = {
  danger: "border-l-danger",
  warn: "border-l-amber",
};

const TAG_TONE: Record<AttentionTone, string> = {
  danger: "bg-danger-bg text-danger border-danger/30",
  warn: "bg-amber-bg text-amber border-amber/30",
};

export function MyTeamAttentionStrip() {
  return (
    <section className="bg-paper border-line shadow-sm mb-6 rounded-md border p-4">
      <header className="mb-3">
        <div className="text-ink text-[13px] font-semibold">
          ⚠ Specialists needing attention
        </div>
        <div className="text-ink-mute mt-0.5 text-[11.5px]">
          Performance flags, capacity issues, missed daily activity · 3 flagged
        </div>
      </header>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {CARDS.map((card) => (
          <AttentionCardView key={card.specialistId} card={card} />
        ))}
      </div>
    </section>
  );
}

function AttentionCardView({ card }: { card: AttentionCard }) {
  const s = getSpecialist(card.specialistId);
  if (!s) return null;
  return (
    /* TODO(step-5): swap this `<div aria-disabled>` wrapper for a
       `<Link href={`/specialist/team/${card.specialistId}`}>` when
       Step 5 lands the Specialist Detail route. Grep target. */
    <div
      aria-disabled="true"
      title={`${s.fullName} — detail lands in Step 5`}
      className={cn(
        "bg-cream/40 border-line flex cursor-not-allowed items-center gap-3 rounded-md border border-l-[3px] p-3 opacity-90",
        CARD_BORDER[card.tone],
      )}
    >
      <MgrAvatar
        slot={s.avatarSlot}
        initials={s.initials}
        fullName={s.fullName}
        size="sm"
      />
      <div className="min-w-0 flex-1">
        <div className="text-ink mb-0.5 flex items-center gap-1.5 text-[13px] font-medium">
          {s.fullName}{" "}
          <span aria-hidden="true">{countryFlag(s.countryCode)}</span>
        </div>
        <div className="text-ink-soft text-[11.5px] leading-[1.4]">
          {card.detail.map((seg, i) =>
            seg.kind === "strong" ? (
              <strong key={i} className="text-ink font-semibold">
                {seg.value}
              </strong>
            ) : (
              <span key={i}>{seg.value}</span>
            ),
          )}
        </div>
      </div>
      <span
        className={cn(
          "flex-shrink-0 rounded-[3px] border px-2 py-0.5 font-mono text-[9.5px] font-semibold tracking-[0.06em]",
          TAG_TONE[card.tone],
        )}
      >
        {card.tagLabel}
      </span>
    </div>
  );
}
