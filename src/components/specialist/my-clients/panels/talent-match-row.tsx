/**
 * TalentMatchRow — one ranked candidate in the talent-match panel.
 *
 * Avatar + name + tier pill + rating + why-matched reason. "Suggest"
 * primary action fires the queued flash via the parent callback;
 * "View" links to the candidate-chat thread.
 */

import Link from "next/link";
import { Sparkles } from "lucide-react";
import {
  AVATAR_GRADIENTS,
} from "@/lib/mock-data/specialist/queue-types";
import type { TalentMatchResult } from "@/lib/mock-data/specialist/client-talent-match";
import type { ManagedClient } from "@/lib/mock-data/specialist/my-clients";
import { cn } from "@/lib/utils/cn";

const BAND_PILL: Record<TalentMatchResult["band"], string> = {
  top: "bg-lime text-ink",
  strong: "bg-success-bg text-success",
  fair: "bg-cream-deep text-ink-soft",
};

const BAND_LABEL: Record<TalentMatchResult["band"], string> = {
  top: "Top match",
  strong: "Strong",
  fair: "Worth a look",
};

const TIER_PILL: Record<string, string> = {
  Elite: "bg-[rgba(214,242,77,0.22)] text-ink shadow-[inset_0_0_0_1px_var(--color-lime-deep)]",
  Vetted: "bg-success-bg text-success",
  Standard: "bg-cream-deep text-ink-soft",
};

export function TalentMatchRow({
  result,
  client,
  onSuggest,
}: {
  result: TalentMatchResult;
  client: ManagedClient;
  onSuggest: (result: TalentMatchResult, client: ManagedClient) => void;
}) {
  const { candidate, band, reason, alreadyShortlisted } = result;
  const gradient = candidate.avatarGradient
    ? AVATAR_GRADIENTS[candidate.avatarGradient]
    : { from: "#FFD6A5", to: "#FFA07A" };

  return (
    <article className="border-line bg-paper shadow-sm flex items-start gap-3 rounded-md border p-3.5">
      {/* Avatar */}
      <div
        aria-hidden="true"
        className="font-display text-paper grid h-10 w-10 flex-shrink-0 place-items-center rounded-full text-[14px] font-medium"
        style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
      >
        {candidate.initials}
      </div>

      {/* Body */}
      <div className="min-w-0 flex-1">
        {/* Top — name + band pill */}
        <div className="mb-0.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <Link
              href={`/specialist/candidates/${candidate.id}`}
              className="text-ink hover:text-ink-soft truncate text-[13.5px] font-semibold transition-colors"
            >
              {candidate.fullName}
            </Link>
            <span aria-hidden="true" className="text-[12px]">
              {candidate.countryFlag}
            </span>
          </div>
          <span
            className={cn(
              "rounded-full px-2 py-[2px] font-mono text-[9.5px] font-semibold tracking-[0.08em] uppercase whitespace-nowrap flex-shrink-0",
              BAND_PILL[band],
            )}
          >
            {BAND_LABEL[band]}
          </span>
        </div>

        {/* Meta — tier + rating */}
        <div className="text-ink-mute mb-1.5 flex items-center gap-1.5 text-[11.5px]">
          <span
            className={cn(
              "rounded-[3px] px-1.5 py-px font-mono text-[9.5px] font-semibold tracking-[0.08em] uppercase",
              TIER_PILL[candidate.tier],
            )}
          >
            {candidate.tier}
          </span>
          {candidate.averageRating > 0 ? (
            <span className="text-ink-soft tabular-nums">
              <span className="text-amber" aria-hidden="true">★ </span>
              {candidate.averageRating.toFixed(1)} · {candidate.hoursLifetime.toLocaleString("en-US")}h lifetime
            </span>
          ) : (
            <span className="text-ink-mute">new to pool</span>
          )}
        </div>

        {/* Reason */}
        <p className="text-ink-soft m-0 text-[12px] leading-[1.45]">{reason}</p>

        {/* Footer actions */}
        <div className="mt-2.5 flex items-center justify-end gap-1.5">
          <Link
            href={`/specialist/candidate-chat?id=${candidate.id}`}
            className="border-line text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-[11px] transition-colors"
          >
            Message
          </Link>
          <button
            type="button"
            onClick={() => onSuggest(result, client)}
            disabled={alreadyShortlisted}
            className="bg-ink text-paper hover:bg-black inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-ink"
          >
            <Sparkles className="h-2.5 w-2.5" strokeWidth={1.6} aria-hidden="true" />
            {alreadyShortlisted ? "Shortlisted" : "Suggest"}
          </button>
        </div>
      </div>
    </article>
  );
}
