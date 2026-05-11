/**
 * Talent matching — derived from existing pool + client's open briefs.
 *
 * Mock-only ranking. Real matching service replaces this behind the same
 * `rankPoolForClient(clientId)` interface — no UI changes needed.
 *
 * Scoring is deterministic and stable (same inputs → same outputs):
 *   - Tier weight:       Elite +40 · Vetted +30 · Standard +20
 *   - Availability:      active-contract +0 · available +25 · multi +5
 *   - Engagement health: rating × 6 (0-30 points; 5★ = 30)
 *   - Recency:           months in pool ÷ 4, capped at +10
 *   - Brief match:       +12 if candidate.id already on a shortlist for the client
 *   - Disputes:          −15 per active dispute
 *
 * Output is sorted by score descending, sliced to top 5-8.
 * Each result carries the score + a 1-sentence human-readable reason.
 */

import {
  clientBriefs,
  splitBriefs,
  type ClientBrief,
} from "./client-briefs";
import {
  managedCandidates,
  type ManagedCandidate,
} from "./my-candidates";

export type TalentMatchResult = {
  candidate: ManagedCandidate;
  /** 0-110 — sort key only, not shown directly. */
  score: number;
  /** "Top 5%" / "Strong fit" / "Worth a look" — drives a tone chip. */
  band: "top" | "strong" | "fair";
  /** Sentence-case explanation, ≤120 chars. */
  reason: string;
  /** Brief id that drove the top match (when applicable). */
  matchedBriefId?: string;
  /** True when this candidate already sits on a client shortlist. */
  alreadyShortlisted: boolean;
};

/* ============================================================
   Scoring
   ============================================================ */

function tierWeight(tier: ManagedCandidate["tier"]): number {
  if (tier === "Elite") return 40;
  if (tier === "Vetted") return 30;
  return 20;
}

function availabilityWeight(status: ManagedCandidate["status"]): number {
  if (status === "available") return 25;
  if (status === "multiple-contracts") return 5;
  if (status === "active-contract") return 0;
  /* Paused / pending-action / off-boarded / etc. — exclude or weight negative. */
  if (status === "active") return 10;
  return -20;
}

function recencyWeight(monthsInPool: number): number {
  return Math.min(10, Math.round(monthsInPool / 4));
}

function disputePenalty(disputes: number): number {
  return -15 * disputes;
}

/**
 * Compute a match score for one candidate against the full set of a
 * client's open briefs. Returns 0 for any candidate that's a hard
 * exclude (off-boarded, in-dispute as the candidate, etc.).
 */
function scoreCandidate(
  candidate: ManagedCandidate,
  openBriefs: ReadonlyArray<ClientBrief>,
): { score: number; matchedBriefId?: string; alreadyShortlisted: boolean } {
  if (candidate.status === "off-boarded" || candidate.status === "in-dispute") {
    return { score: 0, alreadyShortlisted: false };
  }
  let score = 0;
  score += tierWeight(candidate.tier);
  score += availabilityWeight(candidate.status);
  score += Math.round(candidate.averageRating * 6);
  score += recencyWeight(candidate.monthsInPool);
  score += disputePenalty(candidate.disputes);

  /* Brief-specific bonus: +12 when already on a shortlist for any
     open brief of this client. Used by the UI to mark the row. */
  let matchedBriefId: string | undefined;
  let alreadyShortlisted = false;
  for (const b of openBriefs) {
    if (b.shortlistCandidateIds.includes(candidate.id)) {
      score += 12;
      alreadyShortlisted = true;
      matchedBriefId ??= b.id;
      break;
    }
  }

  return matchedBriefId
    ? { score, matchedBriefId, alreadyShortlisted }
    : { score, alreadyShortlisted };
}

function bandForScore(score: number): TalentMatchResult["band"] {
  if (score >= 90) return "top";
  if (score >= 70) return "strong";
  return "fair";
}

function reasonForCandidate(
  candidate: ManagedCandidate,
  band: TalentMatchResult["band"],
  alreadyShortlisted: boolean,
): string {
  const pieces: string[] = [];
  if (alreadyShortlisted) pieces.push("Already shortlisted");
  if (candidate.tier === "Elite") pieces.push("Elite tier");
  else if (candidate.tier === "Vetted") pieces.push("Vetted tier");
  if (candidate.averageRating >= 4.7) pieces.push(`★ ${candidate.averageRating.toFixed(1)} rating`);
  if (candidate.status === "available") pieces.push("available now");
  else if (candidate.status === "multiple-contracts") pieces.push("multi-contract — proven bandwidth");
  if (candidate.disputes > 0) pieces.push(`${candidate.disputes} prior dispute · review carefully`);
  if (band === "top") return pieces.length ? pieces.join(" · ") : "Top pool match.";
  if (band === "strong") return pieces.length ? pieces.join(" · ") : "Strong fit.";
  return pieces.length ? pieces.join(" · ") : "Worth a look.";
}

/* ============================================================
   Public entry point
   ============================================================ */

/**
 * Rank pool candidates for a given client. Returns up to 8 results
 * sorted by score descending. Excludes candidates with 0 score
 * (off-boarded, in-dispute, etc.).
 */
export function rankPoolForClient(
  clientId: string,
): ReadonlyArray<TalentMatchResult> {
  const allBriefs = clientBriefs.filter((b) => b.clientId === clientId);
  const { open: openBriefs } = splitBriefs(allBriefs);

  const ranked = managedCandidates
    .map((candidate): TalentMatchResult | null => {
      const { score, matchedBriefId, alreadyShortlisted } = scoreCandidate(
        candidate,
        openBriefs,
      );
      if (score <= 0) return null;
      const band = bandForScore(score);
      const reason = reasonForCandidate(candidate, band, alreadyShortlisted);
      const result: TalentMatchResult = {
        candidate,
        score,
        band,
        reason,
        alreadyShortlisted,
      };
      if (matchedBriefId) result.matchedBriefId = matchedBriefId;
      return result;
    })
    .filter((r): r is TalentMatchResult => r !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  return ranked;
}
