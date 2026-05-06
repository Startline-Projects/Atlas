/**
 * Prospect card — one card in a kanban column. Top row: avatar +
 * name/loc + match score chip. Body: italic display reason. Foot:
 * source label + dot · stage time · optional warn/danger tone.
 *
 * On hover: 3-button advance/message/reject row appears with opacity
 * transition. All hover-action buttons are visual-only this session
 * (e.preventDefault on click + stopPropagation so the card click
 * still opens the slide-over).
 *
 * Per source CSS — note the gradient card avatar uses queue-types
 * `AVATAR_GRADIENTS` for candidate gradient fills (same logic as
 * dispute parties / chat avatars; consolidating into a shared `Avatar`
 * primitive is a future polish item).
 *
 * Server Component — the click handler comes through as a prop from
 * the parent. The parent (kanban-board) owns selection state.
 */

"use client";

import {
  ArrowRight,
  ExternalLink,
  MessageSquare,
  X as XIcon,
} from "lucide-react";
import Link from "next/link";
import {
  AVATAR_GRADIENTS,
  type AvatarGradientKey,
} from "@/lib/mock-data/specialist/queue-types";
import type {
  SourcingProspect,
  SourcingSource,
} from "@/lib/mock-data/specialist/sourcing";
import { cn } from "@/lib/utils/cn";

/* ============================================================
   Per-source colors (matches `.sp-card-source.*`)
   ============================================================ */

const SOURCE_TEXT: Record<SourcingSource, string> = {
  linkedin: "text-[#0A66C2]", // LinkedIn brand glyph (decorative literal)
  referral: "text-lime-deep",
  search: "text-ink-soft",
  scout: "text-amber",
};

const SOURCE_DOT: Record<SourcingSource, string> = {
  linkedin: "bg-[#0A66C2]",
  referral: "bg-lime-deep",
  search: "bg-ink-soft",
  scout: "bg-amber",
};

const SOURCE_LABEL: Record<SourcingSource, string> = {
  linkedin: "LINKEDIN",
  referral: "REFERRAL",
  search: "TALENT SEARCH",
  scout: "AI SCOUT",
};

/* ============================================================
   Match score chip tone
   ============================================================ */

const MATCH_TONE: Record<SourcingProspect["matchTone"], string> = {
  top: "bg-lime/20 text-lime-deep",
  high: "bg-success-bg text-success",
  mid: "bg-amber/12 text-amber",
};

/* ============================================================
   Stage-time tone
   ============================================================ */

const STAGE_TIME_TONE: Record<
  SourcingProspect["stageTime"]["tone"],
  string
> = {
  default: "text-ink-mute",
  warn: "text-amber font-medium",
  danger: "text-danger font-medium",
};

/* ============================================================
   Avatar
   ============================================================ */

function gradientStyle(key: AvatarGradientKey): React.CSSProperties {
  const g = AVATAR_GRADIENTS[key];
  return { background: `linear-gradient(135deg, ${g.from}, ${g.to})` };
}

/* ============================================================
   ProspectCard
   ============================================================ */

export function ProspectCard({
  prospect,
  isApplied,
  onSelect,
}: {
  prospect: SourcingProspect;
  isApplied: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onSelect(prospect.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(prospect.id);
        }
      }}
      className={cn(
        "group border-line bg-paper hover:border-ink-mute flex cursor-pointer flex-col gap-2 rounded-[10px] border px-3 pt-2.5 pb-2.5 transition-all hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(14,14,12,0.05)]",
        isApplied && "bg-lime/[0.06] hover:bg-lime/[0.12]",
      )}
    >
      {/* Top row: avatar + name + match score */}
      <div className="flex min-w-0 items-center gap-2.5">
        <div
          className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-md font-mono text-[11px] font-semibold text-paper"
          style={gradientStyle(prospect.avatarGradient)}
          aria-hidden="true"
        >
          {prospect.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-1.5 truncate text-[13px] font-medium text-ink">
            <span className="truncate">{prospect.name}</span>
            {prospect.countryFlag ? (
              <span className="text-[12px]" aria-hidden="true">
                {prospect.countryFlag}
              </span>
            ) : null}
          </div>
          <div className="truncate font-mono text-[10px] tracking-[0.02em] text-ink-mute">
            {prospect.location.toUpperCase()}
          </div>
        </div>
        <div
          className={cn(
            "flex-shrink-0 rounded font-mono text-[11px] font-semibold tabular-nums px-1.5 py-0.5",
            MATCH_TONE[prospect.matchTone],
          )}
        >
          {prospect.matchScore}
        </div>
      </div>

      {/* Reason */}
      <div
        className="font-display text-[11.5px] italic leading-[1.4] text-ink-soft"
        style={{ fontVariationSettings: '"opsz" 36' }}
      >
        {prospect.reason}
      </div>

      {/* Tags */}
      {prospect.tags && prospect.tags.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {prospect.tags.map((t) => (
            <span
              key={t}
              className="bg-cream-deep rounded-[3px] px-1.5 py-px font-mono text-[9px] tracking-[0.04em] text-ink-soft"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}

      {/* Foot row: source · divider · stage time */}
      <div className="flex items-center gap-2 font-mono text-[9.5px] tracking-[0.04em] uppercase">
        <span
          className={cn(
            "inline-flex items-center gap-1.5",
            SOURCE_TEXT[prospect.source],
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              SOURCE_DOT[prospect.source],
            )}
          />
          {SOURCE_LABEL[prospect.source]}
        </span>
        <span aria-hidden="true" className="text-line">
          ·
        </span>
        <span className={STAGE_TIME_TONE[prospect.stageTime.tone]}>
          {prospect.stageTime.label.toUpperCase()}
        </span>
      </div>

      {/* Applied-only: cross-session conversion link */}
      {isApplied && prospect.convertedTo ? (
        <Link
          href={`/specialist/candidates/${prospect.convertedTo}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 self-start rounded font-mono text-[10px] font-medium tracking-[0.04em] uppercase text-lime-deep hover:underline"
        >
          <ExternalLink className="h-2.5 w-2.5" strokeWidth={2} />
          View profile
        </Link>
      ) : null}

      {/* Hover actions — opacity transition */}
      <div className="border-line-soft mt-1 flex gap-1 border-t pt-2 opacity-0 transition-opacity group-hover:opacity-100">
        <HoverAction
          label="Advance"
          variant="advance"
          icon={<ArrowRight className="h-2.5 w-2.5" strokeWidth={2} />}
        />
        <HoverAction
          label="Message"
          icon={<MessageSquare className="h-2.5 w-2.5" strokeWidth={2} />}
        />
        <HoverAction
          label="Reject"
          variant="reject"
          icon={<XIcon className="h-2.5 w-2.5" strokeWidth={2} />}
        />
      </div>
    </article>
  );
}

function HoverAction({
  label,
  icon,
  variant,
}: {
  label: string;
  icon: React.ReactNode;
  variant?: "advance" | "reject";
}) {
  const cls =
    variant === "advance"
      ? "hover:bg-ink hover:text-paper hover:border-ink"
      : variant === "reject"
        ? "hover:bg-danger-bg hover:text-danger hover:border-danger"
        : "hover:bg-cream-deep hover:text-ink";
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className={cn(
        "border-line-soft text-ink-soft inline-flex flex-1 items-center justify-center gap-1 rounded-[5px] border px-2 py-1 font-body text-[10.5px] transition-colors",
        cls,
      )}
    >
      {icon}
      {label}
    </button>
  );
}
