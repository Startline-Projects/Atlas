/**
 * /candidate/dashboard
 *
 * Default story: failed first attempt, $10 retake bookable right now
 * (the locked policy demo — account active, result visible, no
 * waiting period).
 *
 * Design-review previews via ?state=
 *   fresh  — test not taken, first attempt free
 *   failed — result on record, $10 retake bookable (default)
 *   passed — C1+ cleared after a paid retake
 *
 * Legacy aliases from the cooldown era ("cooldown", "retake-ready")
 * resolve to "failed" so shared preview links keep working.
 *
 * The greeting is the real signed-in candidate; the English-test state is
 * still the mock story until `TestAttempt` lands (next slice).
 */
import { redirect } from "next/navigation";

import {
  DashboardApp,
  type DashboardState,
} from "@/components/candidate/dashboard/dashboard-app";
import { candidateSignInPath, getCandidateSession } from "@/lib/auth";

const STATES: ReadonlyArray<DashboardState> = ["fresh", "failed", "passed"];

const LEGACY_ALIASES: Record<string, DashboardState> = {
  cooldown: "failed",
  "retake-ready": "failed",
};

type PageProps = {
  searchParams: Promise<{ state?: string }>;
};

export default async function CandidateDashboardPage({
  searchParams,
}: PageProps) {
  // The layout already guards; this re-check covers client-side navigation
  // (layouts do not re-render then) and is free — the session lookup is
  // memoised per request.
  const session = await getCandidateSession();
  if (!session) redirect(candidateSignInPath());

  const { state } = await searchParams;
  const resolved: DashboardState = STATES.includes(state as DashboardState)
    ? (state as DashboardState)
    : (LEGACY_ALIASES[state ?? ""] ?? "failed");

  return <DashboardApp state={resolved} candidate={session.candidate} />;
}
