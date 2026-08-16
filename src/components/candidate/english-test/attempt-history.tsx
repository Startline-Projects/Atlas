/**
 * Attempt-history list for the candidate dashboard. Server Component.
 * Every attempt stays visible — pass or fail — with its fee chip
 * (Free / $10.00), score, CEFR level, and outcome pill.
 */
import type { TestAttemptDto } from "@/lib/api/dto/english-test.dto";
import { ENGLISH_TEST } from "@/lib/domain/english-test";
import { cn } from "@/lib/utils/cn";

import { formatTakenAt, formatUsdCents } from "./format";

export function AttemptHistory({
  attempts,
}: {
  attempts: ReadonlyArray<TestAttemptDto>;
}) {
  if (attempts.length === 0) return null;

  return (
    <section>
      <h2 className="text-ink-mute mb-4 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
        {"// Attempt history"}
      </h2>
      <div className="bg-paper border-line shadow-card overflow-hidden rounded-xl border sm:rounded-[18px]">
        {attempts.map((a, i) => (
          <div
            key={a.id}
            className={cn(
              "flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6",
              i > 0 && "border-line-soft border-t",
            )}
          >
            <div className="flex items-center gap-3.5">
              <span className="bg-cream-deep text-ink font-display grid h-9 w-9 flex-shrink-0 place-items-center rounded-full text-[14px] font-medium">
                #{a.number}
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-ink text-[14px] font-medium">
                  {formatTakenAt(a.takenAt)}
                </span>
                <span className="text-ink-mute text-[12px]">
                  {a.kind === "FREE"
                    ? "First attempt · Free"
                    : `Retake · ${
                        a.feePaidCents !== null
                          ? formatUsdCents(a.feePaidCents)
                          : ENGLISH_TEST.retakeFeeLabel
                      }`}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-ink text-[14px] font-semibold tabular-nums">
                {a.score}
                <span className="text-ink-mute font-normal">/100</span>
              </span>
              <span className="border-line text-ink rounded-full border px-2.5 py-0.5 font-mono text-[10.5px] font-bold tracking-[0.1em] uppercase">
                {a.cefr}
              </span>
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 font-mono text-[10.5px] font-bold tracking-[0.1em] uppercase",
                  a.passed
                    ? "bg-success-bg text-success"
                    : "bg-amber-bg text-amber",
                )}
              >
                {a.passed ? "Passed" : `Below ${ENGLISH_TEST.passingLevel}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
