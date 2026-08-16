/**
 * /candidate/english-test/result
 *
 * Shown to EVERY candidate, pass or fail. Two entry paths:
 *   - ?attempt=<id>&fresh=1 — straight from the runner, right after scoring
 *   - ?attempt=<id>         — revisiting from the dashboard
 *   - no param              — the latest attempt; no attempts → dashboard
 *
 * The attempt is read through the API client (own attempts only — another
 * candidate's id is a 404 → back to the dashboard).
 */
import { redirect } from "next/navigation";

import { ResultView } from "@/components/candidate/english-test/result-view";
import { ApiClientError, englishTestApi } from "@/lib/api-client";
import { serverInit } from "@/lib/api-client/server";
import { candidateSignInPath, getCandidateSession } from "@/lib/auth";

type PageProps = {
  searchParams: Promise<{ attempt?: string; fresh?: string }>;
};

export default async function EnglishTestResultPage({ searchParams }: PageProps) {
  const session = await getCandidateSession();
  if (!session) redirect(candidateSignInPath("/candidate/english-test/result"));

  const { attempt: attemptId, fresh } = await searchParams;
  const init = await serverInit();

  const overview = await englishTestApi.overview(init);

  let attempt = overview.latest;
  if (attemptId) {
    try {
      attempt = (await englishTestApi.attempt(attemptId, init)).attempt;
    } catch (error) {
      if (error instanceof ApiClientError && error.status === 404) {
        redirect("/candidate/dashboard");
      }
      throw error;
    }
  }

  if (!attempt) redirect("/candidate/dashboard");

  return (
    <ResultView
      attempt={attempt}
      fresh={fresh === "1"}
      retakeUnlocked={overview.eligibility.status === "retake_unlocked"}
    />
  );
}
