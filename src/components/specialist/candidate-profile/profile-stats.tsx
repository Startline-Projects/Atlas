import type { CandidateProfile } from "@/lib/mock-data/specialist/candidate-profile";
import { cn } from "@/lib/utils/cn";

const NUM_TONE = {
  default: "text-ink",
  success: "text-success",
  amber: "text-amber",
  danger: "text-danger",
} as const;

type Tone = keyof typeof NUM_TONE;

type StatCellProps = {
  label: string;
  num: React.ReactNode;
  sub: string;
  tone?: Tone;
};

function StatCell({ label, num, sub, tone = "default" }: StatCellProps) {
  return (
    <div className="border-line-soft flex flex-col gap-[3px] border-r border-b px-6 py-[18px] last:border-r-0 md:border-b-0">
      <span className="text-ink-mute font-mono text-[9.5px] font-medium tracking-[0.12em] uppercase">
        {label}
      </span>
      <span
        className={cn(
          "font-display mt-0.5 text-[28px] leading-[1.1] font-normal tracking-[-0.02em] tabular-nums",
          NUM_TONE[tone],
        )}
        style={{ fontVariationSettings: '"opsz" 96' }}
      >
        {num}
      </span>
      <span className="text-ink-mute mt-[3px] font-mono text-[10px] tracking-[0.04em]">
        {sub}
      </span>
    </div>
  );
}

export function ProfileStats({ p }: { p: CandidateProfile }) {
  const ratingTone: Tone =
    p.averageRating === 0
      ? "default"
      : p.averageRating >= 4.5
        ? "success"
        : p.averageRating >= 4.0
          ? "default"
          : "amber";

  return (
    <div className="bg-paper border-line grid grid-cols-2 border-b sm:grid-cols-3 lg:grid-cols-5">
      <StatCell
        label="Engagements"
        num={p.totalEngagements}
        sub={`${p.activeEngagements} active · ${p.totalEngagements - p.activeEngagements} completed`}
      />
      <StatCell
        label="Hours logged"
        num={p.hoursLifetime > 0 ? p.hoursLifetime.toLocaleString("en-US") : "—"}
        sub="Lifetime · all clients"
      />
      <StatCell
        label="Avg rating"
        num={
          p.averageRating > 0 ? (
            p.averageRating.toFixed(1)
          ) : (
            <span className="text-ink-mute">—</span>
          )
        }
        sub={
          p.averageRating > 0
            ? `${p.reviewCount} review${p.reviewCount === 1 ? "" : "s"}${p.averageRating >= 4.7 ? " · top 5%" : ""}`
            : "No reviews yet"
        }
        tone={ratingTone}
      />
      <StatCell
        label="Disputes"
        num={p.disputes}
        sub={p.disputes === 0 ? "Clean record" : `${p.disputes} historical`}
        tone={p.disputes === 0 ? "default" : "danger"}
      />
      <StatCell
        label="Earnings (lifetime)"
        num={p.earningsLifetime}
        sub={`Avg ${p.hourlyRate} · paid via Atlas`}
      />
    </div>
  );
}
