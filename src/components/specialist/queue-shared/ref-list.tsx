import {
  AVATAR_GRADIENTS,
  type Reference,
} from "@/lib/mock-data/specialist/queue-types";
import { cn } from "@/lib/utils/cn";

const STATUS_TONE: Record<Reference["status"], string> = {
  confirmed: "bg-success-bg text-success",
  pending: "bg-amber/14 text-amber",
  conflicting: "bg-amber/14 text-amber",
  unreachable: "bg-danger-bg text-danger",
};

const BADGE_TONE = {
  neutral: "bg-cream-deep text-ink-mute",
  success: "bg-success-bg text-success",
} as const;

export function RefList({ refs }: { refs: ReadonlyArray<Reference> }) {
  return (
    <div className="flex flex-col gap-3">
      {refs.map((r) => {
        const gradient = r.avatarGradient
          ? AVATAR_GRADIENTS[r.avatarGradient]
          : { from: "#FFD6A5", to: "#FFA07A" };
        return (
          <div
            key={r.id}
            className="bg-paper border-line shadow-sm grid gap-4 rounded-md border p-5 sm:grid-cols-[44px_minmax(0,1fr)_180px] sm:items-start"
          >
            <div
              aria-hidden="true"
              className="font-display text-paper grid h-11 w-11 place-items-center rounded-full text-[15px] font-medium"
              style={{
                background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
              }}
            >
              {r.initials}
            </div>
            <div className="min-w-0">
              <div className="text-ink mb-1 flex flex-wrap items-center gap-2 text-[14px] font-semibold">
                <span>{r.name}</span>
                {r.badge ? (
                  <span
                    className={cn(
                      "rounded-[3px] px-1.5 py-0.5 font-mono text-[9.5px] tracking-[0.06em] uppercase",
                      BADGE_TONE[r.badge.tone],
                    )}
                  >
                    {r.badge.label}
                  </span>
                ) : null}
              </div>
              <div className="text-ink-mute mb-2 text-[12.5px]">{r.relation}</div>
              <p
                className={cn(
                  "text-[13.5px] leading-[1.55]",
                  r.status === "pending" || r.status === "unreachable"
                    ? "text-ink-mute italic"
                    : "text-ink-soft",
                )}
              >
                &ldquo;{r.quote}&rdquo;
              </p>
            </div>
            <div className="flex flex-col items-start gap-1 sm:items-end">
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-[12px] font-medium",
                  STATUS_TONE[r.status],
                )}
              >
                {r.statusLabel}
              </span>
              <span className="text-ink-mute font-mono text-[10.5px] tracking-[0.04em]">
                {r.contactMeta}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
