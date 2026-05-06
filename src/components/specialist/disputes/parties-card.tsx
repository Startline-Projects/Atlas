/**
 * Parties strip — claimant card · "vs" divider · respondent card.
 *
 * Sits above the tab strip on the dispute detail. Each card carries a
 * 40×40 avatar, role label (CLAIMANT · TALENT / RESPONDENT · CLIENT),
 * party name with optional country flag, and a meta line.
 *
 * The avatar uses the same visual treatment as `ChatAvatar` (gradient
 * circle for candidates, flat-color square for clients) but reads from
 * `DisputeParty` (which uses `partyType` rather than `kind`). Per the
 * "fits awkwardly, build parallel" rule, we render the avatar inline
 * here rather than reshape DisputeParty into a ChatThread.
 *
 * Server Component.
 */

import {
  AVATAR_GRADIENTS,
  type AvatarGradientKey,
} from "@/lib/mock-data/specialist/queue-types";
import type { DisputeParty } from "@/lib/mock-data/specialist/disputes";
import { cn } from "@/lib/utils/cn";

/** Client logo gradient buckets — mirror of `.mcl-logo.lg-*` in source. */
const CLIENT_LOGO_BG: Record<1 | 2 | 3 | 4, { bg: string; text: string }> = {
  1: { bg: "#16213E", text: "#fbf8f2" }, // navy
  2: { bg: "#2B2A26", text: "#d6f24d" }, // ink-soft + lime text
  3: { bg: "#4D5A28", text: "#fbf8f2" }, // olive-deep
  4: { bg: "#6F4439", text: "#fbf8f2" }, // terracotta-deep
};

function gradientStyle(key: AvatarGradientKey): React.CSSProperties {
  const g = AVATAR_GRADIENTS[key];
  return { background: `linear-gradient(135deg, ${g.from}, ${g.to})` };
}

/* ============================================================
   PartiesCard — 3-col grid (claimant · vs · respondent)
   ============================================================ */

export function PartiesCard({
  claimant,
  respondent,
}: {
  claimant: DisputeParty;
  respondent: DisputeParty;
}) {
  return (
    <div className="bg-paper border-line grid grid-cols-1 items-center gap-3 border-b px-9 py-[18px] md:grid-cols-[1fr_auto_1fr] max-md:px-5">
      <PartyTile party={claimant} side="claimant" />
      <div
        className="font-display hidden text-center text-[18px] italic text-ink-mute md:block"
        style={{ fontVariationSettings: '"opsz" 36' }}
      >
        vs.
      </div>
      <PartyTile party={respondent} side="respondent" />
    </div>
  );
}

/* ============================================================
   PartyTile — single side card
   ============================================================ */

function PartyTile({
  party,
  side,
}: {
  party: DisputeParty;
  side: "claimant" | "respondent";
}) {
  const sideBorder =
    side === "claimant" ? "border-l-success" : "border-l-amber";
  const roleColor =
    side === "claimant" ? "text-success" : "text-amber";
  const roleLabel =
    side === "claimant" ? "CLAIMANT" : "RESPONDENT";
  const partyTypeLabel =
    party.partyType === "candidate" ? "TALENT" : "CLIENT";

  return (
    <div
      className={cn(
        "bg-cream border-line-soft flex min-w-0 items-center gap-3 rounded-[10px] border border-l-[3px] px-4 py-3",
        sideBorder,
      )}
    >
      <PartyAvatar party={party} />
      <div className="min-w-0 flex-1">
        <div
          className={cn(
            "mb-0.5 font-mono text-[9.5px] font-semibold tracking-[0.12em] uppercase",
            roleColor,
          )}
        >
          {roleLabel} · {partyTypeLabel}
        </div>
        <div className="flex items-center gap-1.5 truncate text-[14px] font-medium text-ink">
          <span className="truncate">{party.name}</span>
          {party.partyType === "candidate" && party.countryFlag ? (
            <span className="text-[12px]" aria-hidden="true">
              {party.countryFlag}
            </span>
          ) : null}
        </div>
        <div className="mt-0.5 font-mono text-[10px] tracking-[0.04em] uppercase text-ink-mute">
          {party.partyType === "candidate" ? (
            <>
              {party.tier.toUpperCase()} · {party.tenureLabel.toUpperCase()} ·{" "}
              {party.ratingLabel.toUpperCase()}
            </>
          ) : (
            <>
              {party.industry.toUpperCase()} · {party.sizeLabel.toUpperCase()} ·{" "}
              {party.city.toUpperCase()}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PartyAvatar — gradient circle (candidate) / flat square (client)
   ============================================================ */

function PartyAvatar({ party }: { party: DisputeParty }) {
  if (party.partyType === "candidate") {
    return (
      <div
        className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg font-mono text-[13px] font-semibold tracking-wider text-paper"
        style={gradientStyle(party.avatarGradient)}
        aria-hidden="true"
      >
        {party.initials}
      </div>
    );
  }
  // Client variant — flat square with display font + opsz 36, matching
  // the chat-shared/ChatAvatar client styling (see Session 4 FA-1/FA-2 fix).
  const bg = CLIENT_LOGO_BG[party.logoVariant];
  return (
    <div
      className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg font-display text-[13px] font-medium"
      style={{
        background: bg.bg,
        color: bg.text,
        fontVariationSettings: '"opsz" 36',
      }}
      aria-hidden="true"
    >
      {party.initials}
    </div>
  );
}
