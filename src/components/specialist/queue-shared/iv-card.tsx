import type {
  IvCardData,
  ScoreBand,
} from "@/lib/mock-data/specialist/queue-types";
import { cn } from "@/lib/utils/cn";

const OVERALL_TONE: Record<ScoreBand, string> = {
  high: "text-success",
  mid: "text-ink",
  low: "text-danger",
};

const TIER_TONE: Record<ScoreBand, string> = {
  high: "bg-success-bg text-success",
  mid: "bg-cream-deep text-ink-soft",
  low: "bg-danger-bg text-danger",
};

const BAR_TONE: Record<ScoreBand, string> = {
  high: "bg-success",
  mid: "bg-amber",
  low: "bg-danger",
};

export function IvCard({ data }: { data: IvCardData }) {
  return (
    <div className="bg-paper border-line shadow-sm rounded-lg border p-5 sm:p-6">
      <div className="grid gap-6 md:grid-cols-[180px_minmax(0,1fr)] md:items-start">
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-baseline gap-1.5">
            <span
              className={cn(
                "font-display text-[44px] leading-none font-medium tracking-[-0.025em]",
                OVERALL_TONE[data.overallBand],
              )}
              style={{ fontVariationSettings: '"opsz" 144' }}
            >
              {data.overall}
            </span>
            <span className="text-ink-mute font-body text-[14px] font-normal">
              /100
            </span>
          </div>
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-[12.5px] font-medium",
              TIER_TONE[data.overallBand],
            )}
          >
            {data.tierLabel}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {data.subs.map((s, i) => {
            const pct = s.barPct ?? s.score ?? 0;
            return (
              <div
                key={`${s.label}-${i}`}
                className="grid grid-cols-[140px_minmax(0,1fr)_46px] items-center gap-3"
              >
                <span className="text-ink-soft text-[12.5px]">{s.label}</span>
                <div className="bg-line-soft relative h-1.5 overflow-hidden rounded-full">
                  <div
                    className={cn(
                      "absolute top-0 left-0 h-full rounded-full",
                      BAR_TONE[s.band],
                    )}
                    style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
                  />
                </div>
                <span className="font-display text-ink text-right text-[13px] font-medium tabular-nums">
                  {s.display ?? s.score}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {data.highlights ? (
        <div className="border-line-soft mt-6 grid gap-5 border-t pt-5 md:grid-cols-2">
          <div>
            <div className="text-success mb-2 font-mono text-[10px] tracking-[0.16em] uppercase">
              {data.highlights.positiveLabel}
            </div>
            <ul className="text-ink-soft space-y-1.5 text-[13.5px] leading-[1.5]">
              {data.highlights.positives.map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span aria-hidden="true" className="text-success mt-1.5 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-current" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-amber mb-2 font-mono text-[10px] tracking-[0.16em] uppercase">
              {data.highlights.negativeLabel}
            </div>
            <ul className="text-ink-soft space-y-1.5 text-[13.5px] leading-[1.5]">
              {data.highlights.negatives.length === 0 ? (
                <li className="text-ink-mute italic">None.</li>
              ) : (
                data.highlights.negatives.map((n, i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden="true" className="text-amber mt-1.5 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-current" />
                    <span>{n}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      ) : null}

      {data.snippets && data.snippets.length > 0 ? (
        <div className="border-line-soft mt-6 flex flex-col gap-4 border-t pt-5">
          {data.snippets.map((s, i) => (
            <div key={i} className="bg-cream/50 border-line-soft rounded-md border p-4">
              <span
                className={cn(
                  "border-line-soft bg-paper text-ink-mute mb-2 inline-flex items-center gap-1.5 rounded-[4px] border px-2 py-0.5 font-mono text-[10px] tracking-[0.06em] uppercase",
                  s.warn && "border-amber/30 bg-amber/12 text-amber",
                )}
              >
                {s.tag}
              </span>
              <p className="font-display text-ink mb-2 text-[14.5px] leading-[1.4] font-medium">
                {s.question}
              </p>
              <p className="text-ink-soft text-[13.5px] leading-[1.55]">
                {s.answer}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      {data.commentary ? (
        <div className="border-line-soft mt-6 border-t pt-5">
          <div className="text-ink-mute mb-2 font-mono text-[10px] tracking-[0.16em] uppercase">
            {data.commentary.label}
          </div>
          <p className="text-ink-soft text-[13.5px] leading-[1.6]">
            {data.commentary.body}
          </p>
        </div>
      ) : null}
    </div>
  );
}
