/**
 * /candidate/english-test
 *
 * The interactive short-form English assessment. Intro → questions →
 * hands off to /candidate/english-test/result?attempt=<id>&fresh=1.
 * Serves both the free first attempt and paid retakes.
 *
 * Eligibility is checked here (server) before the runner even renders, and
 * again by the API on every question fetch and submit — the UI never decides
 * who may sit.
 */
import { redirect } from "next/navigation";

import { TestRunner } from "@/components/candidate/english-test/test-runner";
import { englishTestApi } from "@/lib/api-client";
import { serverInit } from "@/lib/api-client/server";
import { candidateSignInPath, getCandidateSession } from "@/lib/auth";

export default async function EnglishTestPage() {
  const session = await getCandidateSession();
  if (!session) redirect(candidateSignInPath("/candidate/english-test"));

  const { eligibility } = await englishTestApi.overview(await serverInit());

  if (eligibility.status === "passed") redirect("/candidate/dashboard");
  if (eligibility.status === "retake_locked") redirect("/candidate/english-test/retake");

  return (
    <TestRunner
      attemptNumber={eligibility.nextAttemptNumber}
      paid={eligibility.status === "retake_unlocked"}
    />
  );
}
