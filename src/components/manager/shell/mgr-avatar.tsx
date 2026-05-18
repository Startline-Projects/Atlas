/**
 * MgrAvatar — the 10-gradient + av-you Specialist avatar primitive.
 *
 * Used by:
 *   - Step 4 My Team grid SpecialistCard (large)
 *   - Step 4 My Team AttentionStrip card (medium)
 *   - Step 5+ Specialist Detail hero + various scattered spots
 *
 * Gradient stops ported faithfully from `reference/manager.html`
 * `:root`-adjacent `.mt-avatar.av-{N}` CSS rules (lines 14291-14301).
 *
 * ## av-you treatment
 *
 * The Manager's Specialist persona (Mateo Vargas, `spec-mateo-vargas`,
 * `avatarSlot: "you"`) gets a distinct look: ink background +
 * lime-deep border + lime text. Keeps "self" visually findable in
 * roster lists where the 10 numbered slots already form a varied
 * palette.
 *
 * ## Sizes
 *
 *   - `md` (default) — 36px circle, 13px font. Team grid card head.
 *   - `sm` — 28px circle, 11px font. Attention strip + dashboard
 *     active items rows (when downstream files adopt this primitive).
 *
 * ## Display name + a11y
 *
 * Initials render as plain text inside the circle (visible). The
 * `aria-label` defaults to the initials but consumers can pass a
 * fuller `fullName` for screen reader context.
 *
 * Server Component.
 */

import type { AvatarSlot } from "@/lib/mock-data/manager/team";
import { cn } from "@/lib/utils/cn";

type MgrAvatarSize = "sm" | "md";

type MgrAvatarProps = {
  slot: AvatarSlot;
  initials: string;
  /** Full name for screen readers. Falls back to initials. */
  fullName?: string;
  size?: MgrAvatarSize;
  className?: string;
};

/* Inline-style gradients — Tailwind's arbitrary `bg-gradient-to-br`
   syntax doesn't compose well with the prototype's exact hex pairs
   without bloating the safelist. CSS variable would also work; raw
   inline-style keeps each slot's intent visible at the call site. */
const SLOT_GRADIENT: Record<Exclude<AvatarSlot, "you">, { from: string; to: string }> = {
  1: { from: "#B5786B", to: "#6F4439" },
  2: { from: "#8C9D5A", to: "#4D5A28" },
  3: { from: "#4F6FA8", to: "#233458" },
  4: { from: "#7E6FA8", to: "#423564" },
  5: { from: "#C28A4A", to: "#8B5A1D" },
  6: { from: "#5C8E7E", to: "#2E5147" },
  7: { from: "#A8696F", to: "#6B3A3F" },
  8: { from: "#6A6E7E", to: "#2F3340" },
  9: { from: "#B07246", to: "#6E4421" },
  10: { from: "#94756E", to: "#5A3F38" },
};

const SIZE_CLASS: Record<MgrAvatarSize, string> = {
  sm: "h-7 w-7 text-[10px]",
  md: "h-9 w-9 text-[12px]",
};

export function MgrAvatar({
  slot,
  initials,
  fullName,
  size = "md",
  className,
}: MgrAvatarProps) {
  const label = fullName ?? initials;

  if (slot === "you") {
    return (
      <span
        aria-label={label}
        role="img"
        className={cn(
          "bg-ink text-lime border-lime-deep inline-flex flex-shrink-0 items-center justify-center rounded-full border font-mono font-semibold tracking-[0.04em]",
          SIZE_CLASS[size],
          className,
        )}
      >
        {initials}
      </span>
    );
  }

  const gradient = SLOT_GRADIENT[slot];
  return (
    <span
      aria-label={label}
      role="img"
      className={cn(
        "text-paper inline-flex flex-shrink-0 items-center justify-center rounded-full font-mono font-semibold tracking-[0.04em]",
        SIZE_CLASS[size],
        className,
      )}
      style={{
        background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
      }}
    >
      {initials}
    </span>
  );
}
