/**
 * /candidate/dashboard
 *
 * The signed-in candidate's home. Everything on it is real: the greeting is
 * the session's candidate, the English-test card and history come from
 * `GET /api/v1/candidates/me/english-test` (read through the API client with
 * the visitor's cookies — ARCHITECTURE §5.1), and which card shows is a flag
 * the service computed (`eligibility`), not a rule re-derived here.
 */
import { redirect } from "next/navigation";

import { DashboardApp } from "@/components/candidate/dashboard/dashboard-app";
import { englishTestApi } from "@/lib/api-client";
import { serverInit } from "@/lib/api-client/server";
import { candidateSignInPath, getCandidateSession } from "@/lib/auth";

export default async function CandidateDashboardPage() {
  // The layout already guards; this re-check covers client-side navigation
  // (layouts do not re-render then) and is free — the lookup is memoised.
  const session = await getCandidateSession();
  if (!session) redirect(candidateSignInPath());

  const overview = await englishTestApi.overview(await serverInit());

  return <DashboardApp candidate={session.candidate} overview={overview} />;
}
