"use client";

import { cn } from "@/lib/utils/cn";

export type AttentionTone = "danger" | "warn" | "info" | "expanding";

export type AttentionBodySegment =
  | { kind: "text"; value: string }
  | { kind: "strong"; value: string };

export type AttentionCardData = {
  /** Stable id used as a key + click target. */
  id: string;
  /** Avatar glyph (1–2 chars). */
  avatarGlyph: string;
  /** Decorative background gradient bucket OR a flat color id. */
  avatarStyle: "gradient" | "logo";
  /** Avatar gradient — 1–5 for candidate avatars, 1–4 for client logos. */
  avatarVariant: number;
  /** Title — name + optional flag emoji. */
  title: React.ReactNode;
  /** Body line — segmented for safe inline emphasis. */
  detail: ReadonlyArray<AttentionBodySegment>;
  tone: AttentionTone;
  tagLabel: string;
};

type RosterAttentionStripProps = {
  /** Eyebrow label — "⚠ Attention this week". */
  label: string;
  sub: string;
  cards: ReadonlyArray<AttentionCardData>;
  /** Click handler — typically opens the slide-over sheet for the row. */
  onCardClick: (id: string) => void;
};

const BORDER_TONE: Record<AttentionTone, string> = {
  danger: "border-l-danger",
  warn: "border-l-amber",
  info: "border-l-ink-mute",
  expanding: "border-l-success",
};

const TAG_TONE: Record<AttentionTone, string> = {
  danger: "bg-danger-bg text-danger",
  warn: "bg-amber/16 text-amber",
  info: "bg-cream-deep text-ink-soft",
  expanding: "bg-success-bg text-success",
};

const AVATAR_GRADIENT: Record<number, string> = {
  1: "bg-gradient-to-br from-[#4F6FA8] to-[#233458] text-paper",
  2: "bg-gradient-to-br from-[#8C9D5A] to-[#4D5A28] text-paper",
  3: "bg-gradient-to-br from-[#B5786B] to-[#6F4439] text-paper",
  4: "bg-gradient-to-br from-[#7E6FA8] to-[#423564] text-paper",
  5: "bg-gradient-to-br from-[#5A8A8C] to-[#2B5054] text-paper",
};

export function RosterAttentionStrip({
  label,
  sub,
  cards,
  onCardClick,
}: RosterAttentionStripProps) {
  if (cards.length === 0) return null;
  return (
    <section className="bg-cream px-6 pt-[18px] pb-1.5 sm:px-10">
      <div className="mb-2.5 flex items-baseline gap-3">
        <span className="text-amber font-mono text-[10px] font-semibold tracking-[0.14em] uppercase">
          {label}
        </span>
        <span className="text-ink-mute text-[12.5px]">{sub}</span>
      </div>
      <div className="grid gap-2.5 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => onCardClick(card.id)}
            className={cn(
              "border-line bg-paper hover:bg-cream flex cursor-pointer items-center gap-3 rounded-md border border-l-[3px] p-3 text-left transition-colors",
              BORDER_TONE[card.tone],
            )}
          >
            <div
              aria-hidden="true"
              className={cn(
                "grid h-9 w-9 flex-shrink-0 place-items-center font-mono text-[12px] font-semibold",
                card.avatarStyle === "logo" ? "rounded-md" : "rounded-md",
                AVATAR_GRADIENT[card.avatarVariant] ?? AVATAR_GRADIENT[1],
              )}
            >
              {card.avatarGlyph}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-ink flex items-center gap-1.5 text-[13px] font-medium">
                {card.title}
              </div>
              <div className="text-ink-mute mt-0.5 text-[11.5px]">
                {card.detail.map((seg, i) =>
                  seg.kind === "strong" ? (
                    <strong key={i} className="text-ink-soft font-semibold">
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
                "flex-shrink-0 rounded-[3px] px-1.5 py-0.5 font-mono text-[9.5px] font-semibold tracking-[0.10em] uppercase",
                TAG_TONE[card.tone],
              )}
            >
              {card.tagLabel}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
