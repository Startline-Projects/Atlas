/**
 * /candidate/english-test/result
 *
 * Shown to EVERY candidate, pass or fail. Two entry paths:
 *   - ?score=N&fresh=1 — straight from the runner; sub-scores derived
 *     deterministically from the overall score.
 *   - no params — revisiting the saved mock attempt (dashboard "View
 *     full result"), including its recorded sub-scores.
 */
import { ResultView } from "@/components/candidate/english-test/result-view";
import { latestAttempt, testAttempts } from "@/lib/mock-data/candidate";

type PageProps = {
  searchParams: Promise<{ score?: string; fresh?: string }>;
};

export default async function EnglishTestResultPage({
  searchParams,
}: PageProps) {
  const { score, fresh } = await searchParams;

  const parsed = Number(score);
  const hasScore = score !== undefined && Number.isFinite(parsed);
  const clamped = Math.max(0, Math.min(100, Math.round(parsed)));

  if (hasScore) {
    return (
      <ResultView
        score={clamped}
        fresh={fresh === "1"}
        attemptNumber={testAttempts.length + 1}
      />
    );
  }

  // Saved-attempt view — falls back to the default mock story.
  return (
    <ResultView
      score={latestAttempt?.score ?? 0}
      fresh={false}
      attemptNumber={latestAttempt?.number ?? 1}
      subScores={latestAttempt?.subScores}
    />
  );
}
