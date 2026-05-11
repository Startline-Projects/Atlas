"use client";

/**
 * Prospect detail slide-over. Reuses `people-shared/RosterSheet` for
 * the shell (Esc-to-close, body lock, backdrop fade, close button).
 * Content layout follows the source HTML's `.sp-detail-*` blocks:
 *
 *   - Hero (cream bg): stage pill + name + meta + match-score block
 *   - Sections: Why this prospect / Signals / Skills / Outreach history
 *   - Actions footer: 4-up grid (Advance primary across 2 cols, then
 *     Send message / Add note / Reject)
 *
 * Reuse rationale: RosterSheet's API is `<RosterSheet open onClose
 * ariaLabel children />` — a pure shell. The sourcing detail's
 * specific content shape doesn't fit any of the people-shared
 * "sheet-parts" helpers (those were tuned for candidate / client
 * roster slide-overs). We compose freely inside `children`.
 *
 * Client Component (the action buttons fire e.preventDefault).
 */

import {
  ArrowRight,
  Bell,
  ExternalLink,
  Mail,
  MessageSquare,
  StickyNote,
  UserCheck,
  X as XIcon,
  Search as SearchIcon,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import {
  AVATAR_GRADIENTS,
  type AvatarGradientKey,
} from "@/lib/mock-data/specialist/queue-types";
import type {
  ProspectOutreachKind,
  SourcingProspect,
  SourcingStage,
} from "@/lib/mock-data/specialist/sourcing";
import { RosterSheet } from "@/components/specialist/people-shared";
import { cn } from "@/lib/utils/cn";

/* ============================================================
   Stage pill tone (matches `.sp-detail-stage-pill.*`)
   ============================================================ */

const STAGE_PILL: Record<SourcingStage, string> = {
  sourced: "bg-cream-deep text-ink-soft",
  contacted: "bg-amber/15 text-amber",
  engaged: "bg-success-bg text-success",
  applied: "bg-lime/20 text-lime-deep",
};

const STAGE_LABEL: Record<SourcingStage, string> = {
  sourced: "Sourced",
  contacted: "Contacted",
  engaged: "Engaged",
  applied: "Applied",
};

/* ============================================================
   Outreach history marker tones
   ============================================================ */

const HISTORY_MARKER: Record<ProspectOutreachKind, string> = {
  linkedin: "bg-[#0A66C2]",
  email: "bg-amber",
  referral: "bg-lime-deep",
  atlas: "bg-success",
  note: "bg-ink-mute",
  system: "bg-ink",
};

const HISTORY_ICON: Record<ProspectOutreachKind, React.ReactNode> = {
  // No lucide brand glyph for LinkedIn — use the small bell-style ping
  // glyph as a generic outreach marker (the colored marker dot does
  // most of the visual work; the icon is a secondary cue).
  linkedin: <Bell className="h-3 w-3" strokeWidth={2} />,
  email: <Mail className="h-3 w-3" strokeWidth={1.5} />,
  referral: <UserCheck className="h-3 w-3" strokeWidth={1.5} />,
  atlas: <SearchIcon className="h-3 w-3" strokeWidth={1.5} />,
  note: <StickyNote className="h-3 w-3" strokeWidth={1.5} />,
  system: <Sparkles className="h-3 w-3" strokeWidth={1.5} />,
};

function gradientStyle(key: AvatarGradientKey): React.CSSProperties {
  const g = AVATAR_GRADIENTS[key];
  return { background: `linear-gradient(135deg, ${g.from}, ${g.to})` };
}

/* ============================================================
   Component
   ============================================================ */

export function ProspectDetailSheet({
  prospect,
  open,
  onClose,
  onAdvance,
  onMessage,
  onAddNote,
  onReject,
}: {
  prospect: SourcingProspect | undefined;
  open: boolean;
  onClose: () => void;
  /** Footer action callbacks — each receives the prospect so the
   *  parent can fire a stage-aware flash (Advance) or interpolate the
   *  firstName. Optional — if omitted the buttons no-op silently
   *  (same shape as ProspectCard hover-actions). */
  onAdvance?: ((p: SourcingProspect) => void) | undefined;
  onMessage?: ((p: SourcingProspect) => void) | undefined;
  onAddNote?: ((p: SourcingProspect) => void) | undefined;
  onReject?: ((p: SourcingProspect) => void) | undefined;
}) {
  if (!prospect) {
    return (
      <RosterSheet open={open} onClose={onClose} ariaLabel="Prospect detail">
        <div />
      </RosterSheet>
    );
  }

  return (
    <RosterSheet
      open={open}
      onClose={onClose}
      ariaLabel={`${prospect.name} prospect detail`}
    >
      {/* Hero */}
      <div className="bg-cream border-line-soft flex flex-col items-start gap-2.5 border-b px-8 pt-8 pb-[22px]">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[9.5px] font-semibold tracking-[0.14em] uppercase",
            STAGE_PILL[prospect.stage],
          )}
        >
          <span
            aria-hidden="true"
            className="bg-current h-1.5 w-1.5 rounded-full"
          />
          {STAGE_LABEL[prospect.stage]}
        </span>

        <div className="flex items-center gap-3">
          <div
            className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-lg font-mono text-[16px] font-semibold text-paper"
            style={gradientStyle(prospect.avatarGradient)}
            aria-hidden="true"
          >
            {prospect.initials}
          </div>
          <h3
            className="font-display m-0 flex items-center gap-2 text-[26px] font-normal leading-[1.05] tracking-[-0.02em] text-ink"
            style={{ fontVariationSettings: '"opsz" 96' }}
          >
            <span>{prospect.name}</span>
            {prospect.countryFlag ? (
              <span className="text-[18px]" aria-hidden="true">
                {prospect.countryFlag}
              </span>
            ) : null}
          </h3>
        </div>

        <div className="font-mono text-[11px] tracking-[0.06em] uppercase text-ink-mute">
          {prospect.location.toUpperCase()}
          {prospect.age ? ` · ${prospect.age}` : ""}
          {prospect.currentRole ? ` · ${prospect.currentRole.toUpperCase()}` : ""}
        </div>

        <div className="mt-1 flex items-baseline gap-2.5">
          <div>
            <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-mute">
              Match score
            </div>
            <div
              className="font-display text-[36px] font-normal leading-[1] tracking-[-0.03em] text-ink"
              style={{ fontVariationSettings: '"opsz" 96' }}
            >
              {prospect.matchScore}
              <em className="ml-0.5 font-body text-[14px] not-italic text-ink-mute">
                /100
              </em>
            </div>
          </div>
        </div>
      </div>

      {/* Why this prospect */}
      {prospect.bio ? (
        <Section title="Why this prospect">
          <ProspectBio html={prospect.bio} />
        </Section>
      ) : null}

      {/* Signals */}
      {prospect.signals && prospect.signals.length > 0 ? (
        <Section title="Signals">
          <div className="flex flex-col gap-2.5">
            {prospect.signals.map((s, i) => (
              <div
                key={i}
                className={cn(
                  "bg-cream flex items-start gap-2.5 rounded border-l-[3px] px-4 py-3",
                  s.tone === "warn"
                    ? "border-l-amber"
                    : "border-l-lime",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full",
                    s.tone === "warn" ? "bg-amber" : "bg-lime-deep",
                  )}
                />
                <div className="text-[12.5px] leading-[1.5] text-ink-soft">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Skills */}
      {prospect.skills && prospect.skills.length > 0 ? (
        <Section title="Skills mentioned">
          <div className="flex flex-wrap gap-1.5">
            {prospect.skills.map((s) => (
              <span
                key={s}
                className="bg-cream-deep rounded px-2.5 py-1 font-mono text-[10.5px] font-medium tracking-[0.04em] text-ink-soft"
              >
                {s}
              </span>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Outreach history */}
      {prospect.outreachHistory && prospect.outreachHistory.length > 0 ? (
        <Section title="Outreach history">
          <div className="flex flex-col gap-0">
            {prospect.outreachHistory.map((h, i) => (
              <div
                key={h.id}
                className={cn(
                  "border-line-soft grid grid-cols-[14px_1fr] items-start gap-3 py-2.5",
                  i < prospect.outreachHistory!.length - 1 && "border-b",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "ml-[3px] mt-1.5 grid h-4 w-4 place-items-center rounded-full text-paper",
                    HISTORY_MARKER[h.kind],
                  )}
                >
                  {HISTORY_ICON[h.kind]}
                </span>
                <div className="min-w-0">
                  <div className="text-[12.5px] leading-[1.45] text-ink-soft">
                    {h.summary}
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] tracking-[0.04em] uppercase text-ink-mute">
                    {h.when}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Applied stage: cross-session conversion link */}
      {prospect.stage === "applied" && prospect.convertedTo ? (
        <Section title="Conversion">
          <Link
            href={`/specialist/candidates/${prospect.convertedTo}`}
            className="bg-lime/10 hover:bg-lime/20 border-line-soft inline-flex items-center gap-2 rounded-md border border-l-[3px] border-l-lime-deep px-3 py-2.5 font-body text-[12.5px] text-ink transition-colors"
          >
            <ExternalLink
              className="h-3 w-3 flex-shrink-0 text-lime-deep"
              strokeWidth={2}
            />
            View profile in pool · {prospect.convertedTo}
          </Link>
        </Section>
      ) : null}

      {/* Actions footer */}
      <div className="bg-paper grid grid-cols-2 gap-2 px-8 pt-[18px] pb-8">
        <ActionBtn variant="primary" onClick={() => onAdvance?.(prospect)}>
          <ArrowRight className="h-3 w-3" strokeWidth={1.7} />
          Advance to next stage
        </ActionBtn>
        <ActionBtn onClick={() => onMessage?.(prospect)}>
          <MessageSquare className="h-3 w-3" strokeWidth={1.5} />
          Send message
        </ActionBtn>
        <ActionBtn onClick={() => onAddNote?.(prospect)}>
          <StickyNote className="h-3 w-3" strokeWidth={1.5} />
          Add note
        </ActionBtn>
        <ActionBtn variant="danger" onClick={() => onReject?.(prospect)}>
          <XIcon className="h-3 w-3" strokeWidth={1.7} />
          Reject prospect
        </ActionBtn>
      </div>
    </RosterSheet>
  );
}

/* ============================================================
   Section helper
   ============================================================ */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-line-soft border-b px-8 py-[18px]">
      <h4 className="m-0 mb-3 font-mono text-[10px] font-semibold tracking-[0.14em] uppercase text-ink-mute">
        {title}
      </h4>
      {children}
    </div>
  );
}

/* ============================================================
   Bio renderer — supports the leading <em>...</em> clause from data
   ============================================================ */

function ProspectBio({ html }: { html: string }) {
  // Source data carries `<em>...</em>` markers for emphasis. Parse
  // them inline rather than dangerouslySetInnerHTML.
  const match = /^<em>([\s\S]*?)<\/em>(.*)/.exec(html);
  if (match) {
    return (
      <p className="text-[13.5px] leading-[1.55] text-ink-soft">
        <em className="font-medium not-italic text-ink italic">{match[1]}</em>
        {match[2]}
      </p>
    );
  }
  return <p className="text-[13.5px] leading-[1.55] text-ink-soft">{html}</p>;
}

/* ============================================================
   Action button helper
   ============================================================ */

function ActionBtn({
  children,
  variant = "default",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "default" | "primary" | "danger";
  onClick?: () => void;
}) {
  const cls =
    variant === "primary"
      ? "col-span-2 bg-ink text-paper border-ink hover:bg-ink-soft"
      : variant === "danger"
        ? "border-line bg-paper text-ink-soft hover:bg-danger-bg hover:text-danger hover:border-danger"
        : "border-line bg-paper text-ink-soft hover:bg-cream hover:text-ink hover:border-ink-mute";
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2.5 font-body text-[12.5px] transition-colors cursor-pointer",
        cls,
      )}
    >
      {children}
    </button>
  );
}
