import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  AVATAR_GRADIENTS,
  type AvatarGradientKey,
} from "@/lib/mock-data/specialist/queue-types";
import { cn } from "@/lib/utils/cn";

export type IdentityTagTone = "default" | "lime" | "success" | "amber";

export type IdentityTag = {
  label: string;
  tone?: IdentityTagTone;
};

export type ReviewHeaderProgress = {
  /** "SLA: 2h 12m left of 24h" or "Cert expires in 14 days" */
  text: React.ReactNode;
  /** 0–100. Width of the filled portion. */
  progressPct: number;
  tone: "fresh" | "warn" | "urgent";
};

type ReviewHeaderProps = {
  /** Breadcrumb labels — final segment is the position chip ("1 of 3"). */
  crumbs: ReadonlyArray<{ label: string; href?: string }>;
  position: { current: number; total: number };
  onPrev?: (() => void) | undefined;
  onNext?: (() => void) | undefined;

  initials: string;
  avatarGradient?: AvatarGradientKey | undefined;

  /** "Marie Okonkwo" — split allows the comma+age formatting. */
  name: string;
  age: number;
  countryFlag: string;
  tags: ReadonlyArray<IdentityTag>;

  progress: ReviewHeaderProgress;
};

const TAG_TONE: Record<IdentityTagTone, string> = {
  default: "bg-cream-deep text-ink-soft",
  lime: "bg-lime text-ink",
  success: "bg-success-bg text-success",
  amber: "bg-amber/14 text-amber",
};

const PROGRESS_TONE: Record<ReviewHeaderProgress["tone"], string> = {
  fresh: "text-success bg-success-bg",
  warn: "text-amber bg-amber/14",
  urgent: "text-danger bg-danger-bg",
};

const PROGRESS_BAR_TONE: Record<ReviewHeaderProgress["tone"], string> = {
  fresh: "bg-success",
  warn: "bg-amber",
  urgent: "bg-danger",
};

export function ReviewHeader({
  crumbs,
  position,
  onPrev,
  onNext,
  initials,
  avatarGradient,
  name,
  age,
  countryFlag,
  tags,
  progress,
}: ReviewHeaderProps) {
  const gradient = avatarGradient
    ? AVATAR_GRADIENTS[avatarGradient]
    : { from: "#FFD6A5", to: "#FFA07A" };

  return (
    <header className="bg-cream border-line-soft border-b px-6 pt-5 pb-4 sm:px-9">
      <div className="mb-4 flex items-center justify-between gap-3">
        <nav
          aria-label="Breadcrumb"
          className="text-ink-mute flex items-center font-mono text-[10.5px] tracking-[0.1em] uppercase"
        >
          {crumbs.map((c, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <span key={`${c.label}-${i}`} className="flex items-center">
                {i > 0 ? (
                  <span aria-hidden="true" className="mx-1.5 opacity-50">
                    /
                  </span>
                ) : null}
                {c.href && !isLast ? (
                  <Link
                    href={c.href}
                    className="hover:text-ink transition-colors"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-ink font-semibold" : ""}>
                    {c.label}
                  </span>
                )}
              </span>
            );
          })}
        </nav>

        <div className="text-ink-mute flex items-center gap-1 font-mono text-[11px] tracking-[0.04em]">
          <button
            type="button"
            onClick={onPrev}
            disabled={position.current <= 1}
            aria-label="Previous candidate"
            className="text-ink-soft hover:bg-cream-deep hover:text-ink grid h-7 w-7 place-items-center rounded-sm bg-transparent transition-colors disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-3.5 w-3.5" strokeWidth={1.6} />
          </button>
          <span className="px-1.5">
            <span className="text-ink font-medium">{position.current}</span> of{" "}
            <span>{position.total}</span>
          </span>
          <button
            type="button"
            onClick={onNext}
            disabled={position.current >= position.total}
            aria-label="Next candidate"
            className="text-ink-soft hover:bg-cream-deep hover:text-ink grid h-7 w-7 place-items-center rounded-sm bg-transparent transition-colors disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.6} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-6">
        <div className="flex min-w-0 items-center gap-4">
          <div
            aria-hidden="true"
            className="font-display text-paper grid h-14 w-14 flex-shrink-0 place-items-center rounded-full text-[22px] font-medium"
            style={{
              background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
            }}
          >
            {initials}
          </div>
          <div className="min-w-0">
            <h1 className="font-display flex items-baseline gap-2 text-[26px] leading-tight font-medium tracking-[-0.015em]">
              <span className="truncate">{name}</span>
              <span className="text-ink-mute font-body text-[16px] font-normal">
                , {age}
              </span>
              <span aria-hidden="true" className="text-[22px]">
                {countryFlag}
              </span>
            </h1>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              {tags.map((t, i) => (
                <span
                  key={`${t.label}-${i}`}
                  className={cn(
                    "rounded-[3px] px-2 py-[3px] font-mono text-[9.5px] font-medium tracking-[0.1em] uppercase",
                    TAG_TONE[t.tone ?? "default"],
                  )}
                >
                  {t.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden min-w-[200px] flex-shrink-0 flex-col items-end gap-2 md:flex">
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-[12.5px] font-medium",
              PROGRESS_TONE[progress.tone],
            )}
          >
            {progress.text}
          </span>
          <div className="bg-line-soft relative h-1.5 w-full max-w-[220px] overflow-hidden rounded-full">
            <div
              className={cn(
                "absolute top-0 left-0 h-full rounded-full",
                PROGRESS_BAR_TONE[progress.tone],
              )}
              style={{ width: `${Math.min(100, Math.max(0, progress.progressPct))}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
