/**
 * English-test result screen. Server Component — no state.
 *
 * Shown to EVERY candidate, pass or fail (product policy 2026-07-17).
 * A fail is presented honestly but never as a dead end: the account
 * stays active, the result is saved, and the $10 retake is bookable
 * immediately — payment unlocks a fresh attempt on the spot.
 *
 * Props cover both entry paths:
 *   - fresh=true  → the interactive runner just finished (?score=N&fresh=1)
 *   - fresh=false → revisiting the saved mock attempt
 */
import {
  ArrowRight,
  BadgeCheck,
  LayoutDashboard,
  RotateCcw,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import {
  ENGLISH_TEST,
  cefrForScore,
  isPassingLevel,
  subScoresForScore,
  type SubScore,
} from "@/lib/mock-data/candidate";

type ResultViewProps = {
  score: number;
  fresh: boolean;
  attemptNumber: number;
  /** Pre-built sub-scores (saved attempt); derived from score if omitted. */
  subScores?: SubScore[] | undefined;
};

export function ResultView({
  score,
  fresh,
  attemptNumber,
  subScores,
}: ResultViewProps) {
  const cefr = cefrForScore(score);
  const passed = isPassingLevel(cefr);
  const bars = subScores ?? subScoresForScore(score);

  return (
    <div className="mx-auto max-w-[720px]">
      {/* Score hero */}
      <header className="mb-8 text-center">
        <div className="text-ink-mute mb-3.5 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
          {`// English assessment · Attempt #${attemptNumber}`}
        </div>
        <div
          className={cn(
            "mx-auto mb-5 grid h-28 w-28 place-items-center rounded-full border-4",
            passed
              ? "border-success bg-success-bg"
              : "border-amber bg-amber-bg",
          )}
        >
          <span className="flex flex-col items-center leading-none">
            <span className="font-display text-ink text-[40px] font-medium tracking-tight tabular-nums">
              {score}
            </span>
            <span className="text-ink-mute font-mono text-[10px] tracking-[0.12em] uppercase">
              / 100
            </span>
          </span>
        </div>
        <div
          className={cn(
            "mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-[12px] font-bold tracking-[0.12em] uppercase",
            passed
              ? "border-success/30 bg-success-bg text-success"
              : "border-amber/30 bg-amber-bg text-amber",
          )}
        >
          CEFR {cefr}
          {passed ? (
            <BadgeCheck className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
          ) : null}
        </div>
        <h1 className="display mb-3.5 text-[clamp(36px,4.6vw,52px)] leading-[1.05]">
          {passed ? (
            <>
              You&rsquo;re <span className="serif-italic">through</span>.
            </>
          ) : (
            <>
              Not this time — but your{" "}
              <span className="serif-italic">account is yours</span>.
            </>
          )}
        </h1>
        <p className="text-ink-soft mx-auto max-w-[480px] text-base leading-[1.55]">
          {passed
            ? `${cefr} clears the ${ENGLISH_TEST.passingLevel} bar. Next up: your first video interview — scheduling opens on your dashboard.`
            : `You need ${ENGLISH_TEST.passingLevel} or higher to continue to interviews. Your result is saved to your profile, and you can retake the test for ${ENGLISH_TEST.retakeFeeLabel} right away — no waiting period.`}
        </p>
      </header>

      {/* Sub-scores */}
      <div className="bg-paper border-line shadow-card mb-6 rounded-xl border p-6 sm:rounded-[22px] sm:p-8">
        <h2 className="text-ink-mute mb-5 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
          {"// Sub-scores"}
        </h2>
        <div className="flex flex-col gap-4">
          {bars.map((s) => (
            <div key={s.skill}>
              <div className="mb-1.5 flex items-baseline justify-between">
                <span className="text-ink text-[14px] font-medium">
                  {s.skill}
                </span>
                <span className="text-ink-mute text-[12.5px] tabular-nums">
                  {s.score} ·{" "}
                  <span className="font-mono text-[11px] tracking-[0.08em]">
                    {s.cefr}
                  </span>
                </span>
              </div>
              <div className="bg-cream-deep h-1.5 overflow-hidden rounded-full">
                <div
                  className={cn(
                    "h-full rounded-full",
                    isPassingLevel(s.cefr) ? "bg-success" : "bg-amber",
                  )}
                  style={{ width: `${s.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next step */}
      {passed ? (
        <div className="bg-lime flex flex-wrap items-center justify-between gap-3 rounded-xl p-5 sm:rounded-[22px] sm:px-7">
          <span className="font-display text-ink text-lg font-bold">
            ✓ English assessment complete.
          </span>
          <Link href="/candidate/dashboard?state=passed" className="btn btn-primary group">
            <span>Continue on your dashboard</span>
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </Link>
        </div>
      ) : (
        <div className="bg-paper border-line shadow-card rounded-xl border p-6 sm:rounded-[22px] sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="bg-cream-deep text-ink grid h-11 w-11 flex-shrink-0 place-items-center rounded-full">
                <RotateCcw className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-display text-ink text-[19px] font-medium">
                  Retake the test — {ENGLISH_TEST.retakeFeeLabel}
                </h2>
                <p className="text-ink-soft mt-1 max-w-[400px] text-[13.5px] leading-[1.55]">
                  <Zap
                    className="mr-1 inline-block h-3.5 w-3.5 align-[-2px]"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  {fresh
                    ? "Available right now — a fresh attempt unlocks the moment payment clears."
                    : "Available any time — a fresh attempt unlocks the moment payment clears."}{" "}
                  Your best score is the one that counts.
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto">
              <Link
                href="/candidate/english-test/retake"
                className="btn btn-primary group justify-center"
              >
                <span>Retake for {ENGLISH_TEST.retakeFeeLabel}</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/candidate/dashboard"
                className="btn btn-ghost justify-center text-[13.5px]"
              >
                <LayoutDashboard className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                Back to dashboard
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
