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
 */
import {
  DashboardApp,
  type DashboardState,
} from "@/components/candidate/dashboard/dashboard-app";

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
  const { state } = await searchParams;
  const resolved: DashboardState = STATES.includes(state as DashboardState)
    ? (state as DashboardState)
    : (LEGACY_ALIASES[state ?? ""] ?? "failed");

  return <DashboardApp state={resolved} />;
}
