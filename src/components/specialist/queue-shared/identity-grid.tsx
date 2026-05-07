import { Check, X } from "lucide-react";
import type { AntiCheatBlock } from "@/lib/mock-data/specialist/queue-types";

export function IdentityGrid({ data }: { data: AntiCheatBlock }) {
  return (
    <>
      <div className="grid gap-3 md:grid-cols-2">
        {data.checks.map((c, i) => (
          <div
            key={i}
            className="bg-paper border-line shadow-sm flex items-start gap-3 rounded-md border p-4"
          >
            <div
              aria-hidden="true"
              className={
                c.passed
                  ? "bg-success-bg text-success grid h-7 w-7 flex-shrink-0 place-items-center rounded-full"
                  : "bg-danger-bg text-danger grid h-7 w-7 flex-shrink-0 place-items-center rounded-full"
              }
            >
              {c.passed ? (
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              ) : (
                <X className="h-3.5 w-3.5" strokeWidth={2.5} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-ink mb-1 text-[13.5px] font-semibold">
                {c.title}
              </div>
              <div className="text-ink-soft text-[12.5px] leading-[1.5]">
                {c.detail}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className={
          data.flagsRaised
            ? "bg-amber/12 border-amber/25 text-ink mt-4 flex items-start gap-2.5 rounded-md border px-4 py-3 text-[13px] leading-[1.55]"
            : "bg-success-bg border-success/20 text-ink mt-4 flex items-start gap-2.5 rounded-md border px-4 py-3 text-[13px] leading-[1.55]"
        }
      >
        <Check
          className={
            data.flagsRaised
              ? "text-amber mt-0.5 h-4 w-4 flex-shrink-0"
              : "text-success mt-0.5 h-4 w-4 flex-shrink-0"
          }
          strokeWidth={2.2}
          aria-hidden="true"
        />
        <span>{data.summary}</span>
      </div>
    </>
  );
}
