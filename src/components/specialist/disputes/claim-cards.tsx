/**
 * Section 01 content — claim cards (claimant on top / left, respondent
 * below / right). Each card has a colored left border + uppercase
 * "FROM CLAIMANT" / "FROM RESPONDENT" label + italic display body.
 *
 * Body supports `\n\n` paragraph breaks.
 *
 * Server Component.
 */

import type { DisputeClaimCard } from "@/lib/mock-data/specialist/disputes";
import { cn } from "@/lib/utils/cn";

export function ClaimCards({
  claims,
}: {
  claims: ReadonlyArray<DisputeClaimCard>;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {claims.map((c, i) => (
        <ClaimCardItem key={i} card={c} />
      ))}
    </div>
  );
}

function ClaimCardItem({ card }: { card: DisputeClaimCard }) {
  const labelTone =
    card.side === "claimant" ? "text-success" : "text-amber";
  const borderTone =
    card.side === "claimant" ? "border-l-success" : "border-l-amber";
  const paragraphs = card.body.split("\n\n");

  return (
    <div
      className={cn(
        "bg-cream rounded-lg border border-l-[3px] border-line-soft p-[18px]",
        borderTone,
      )}
    >
      <div
        className={cn(
          "mb-2 font-mono text-[9.5px] font-semibold tracking-[0.12em] uppercase",
          labelTone,
        )}
      >
        {card.heading}
      </div>
      <div
        className="font-display text-[14.5px] italic leading-[1.55] text-ink-soft"
        style={{ fontVariationSettings: '"opsz" 36' }}
      >
        {paragraphs.map((p, i) => (
          <p key={i} className={i > 0 ? "mt-3" : ""}>
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
