import { cn } from "@/lib/utils/cn";

type SectionFrameProps = {
  /** Section number, e.g. "01" — rendered next to the title. */
  num: string;
  title: string;
  /** Free-form right-side meta — usually plain spans + status pills. */
  meta?: React.ReactNode;
  status?: { label: string; tone?: "default" | "success" | "warn" | "neutral" };
  id?: string;
  className?: string;
  children: React.ReactNode;
};

const STATUS_TONE: Record<NonNullable<SectionFrameProps["status"]>["tone"] & string, string> = {
  default: "bg-cream-deep text-ink-soft",
  success: "bg-success-bg text-success",
  warn: "bg-amber/14 text-amber",
  neutral: "bg-cream-deep text-ink-soft",
};

export function SectionFrame({
  num,
  title,
  meta,
  status,
  id,
  className,
  children,
}: SectionFrameProps) {
  return (
    <section id={id} className={cn("scroll-mt-[200px] py-7", className)}>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <h2
          className="font-display text-ink flex items-baseline gap-2 text-[22px] font-medium tracking-[-0.015em]"
          style={{ fontVariationSettings: '"opsz" 72' }}
        >
          <span>{title}</span>
          <span className="text-ink-mute font-mono text-[10px] font-normal tracking-[0.14em]">
            {num}
          </span>
        </h2>
        <div className="text-ink-mute flex items-center gap-3 text-[12.5px]">
          {meta}
          {status ? (
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[11px] font-medium",
                STATUS_TONE[status.tone ?? "default"],
              )}
            >
              {status.label}
            </span>
          ) : null}
        </div>
      </div>
      {children}
    </section>
  );
}
