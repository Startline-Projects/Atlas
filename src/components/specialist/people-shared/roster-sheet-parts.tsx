/**
 * Standardized building blocks for the slide-over sheet content.
 * Both my-candidates and my-clients sheets use this layout: hero +
 * stats strip + sections + action grid. The page assembles the
 * blocks with view-specific data.
 */
import { cn } from "@/lib/utils/cn";

/* ============================================================
   Hero — avatar + name + meta + tags
   ============================================================ */

type SheetHeroProps = {
  /** Avatar element supplied by the page (gradient circle or square logo). */
  avatar: React.ReactNode;
  /** Title — name + optional flag — supplied as ReactNode for flexibility. */
  title: React.ReactNode;
  /** Mono-uppercase meta line. */
  meta: string;
  /** Tag pills under the meta line. */
  tags: ReadonlyArray<{ label: string; tone?: "default" | "success" | "lime" | "amber" | "danger" }>;
};

const TAG_TONE = {
  default: "bg-cream-deep text-ink-soft",
  success: "bg-success-bg text-success",
  lime: "bg-lime text-ink",
  amber: "bg-amber/14 text-amber",
  danger: "bg-danger-bg text-danger",
} as const;

export function SheetHero({ avatar, title, meta, tags }: SheetHeroProps) {
  return (
    <div className="border-line-soft border-b px-6 pt-8 pb-5 text-center">
      <div className="mx-auto mb-3 flex justify-center">{avatar}</div>
      <h3 className="font-display text-ink mb-1 inline-flex items-center gap-2 text-[24px] leading-tight font-medium tracking-[-0.015em]">
        {title}
      </h3>
      <div className="text-ink-mute mb-3 font-mono text-[10.5px] tracking-[0.06em] uppercase">
        {meta}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-1.5">
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
  );
}

/* ============================================================
   Stats strip — 3 cells
   ============================================================ */

type SheetStatsProps = {
  stats: ReadonlyArray<{ num: React.ReactNode; label: string }>;
};

export function SheetStats({ stats }: SheetStatsProps) {
  return (
    <div className="border-line-soft grid grid-cols-3 border-b">
      {stats.map((s, i) => (
        <div
          key={i}
          className={cn(
            "px-3 py-4 text-center",
            i > 0 && "border-line-soft border-l",
          )}
        >
          <div className="font-display text-ink mb-0.5 text-[22px] leading-none font-medium tracking-[-0.015em]">
            {s.num}
          </div>
          <div className="text-ink-mute font-mono text-[9.5px] tracking-[0.14em] uppercase">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   Section wrapper — h4 heading + content
   ============================================================ */

export function SheetSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-line-soft border-b px-6 py-5">
      <h4 className="text-ink mb-3 text-[13px] font-semibold tracking-[0.02em]">
        {title}
      </h4>
      {children}
    </div>
  );
}

/* ============================================================
   Action button grid — 4–5 stacked buttons at the sheet's bottom
   ============================================================ */

type SheetActionItem = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  variant?: "primary" | "default" | "danger";
  href?: string;
  onClick?: () => void;
};

type SheetActionsProps = {
  actions: ReadonlyArray<SheetActionItem>;
};

const ACTION_VARIANT = {
  primary: "bg-ink text-paper border-ink hover:bg-ink-soft",
  default: "bg-paper border-line text-ink hover:bg-cream-deep",
  danger: "bg-paper border-danger/30 text-danger hover:bg-danger/8",
} as const;

export function SheetActions({ actions }: SheetActionsProps) {
  return (
    <div className="flex flex-col gap-2 px-6 py-5">
      {actions.map((a) =>
        a.href ? (
          <a
            key={a.key}
            href={a.href}
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-[13px] font-medium transition-colors",
              ACTION_VARIANT[a.variant ?? "default"],
            )}
          >
            {a.icon ? <span aria-hidden="true">{a.icon}</span> : null}
            {a.label}
          </a>
        ) : (
          <button
            key={a.key}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              a.onClick?.();
            }}
            className={cn(
              "inline-flex cursor-pointer w-full items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-[13px] font-medium transition-colors",
              ACTION_VARIANT[a.variant ?? "default"],
            )}
          >
            {a.icon ? <span aria-hidden="true">{a.icon}</span> : null}
            {a.label}
          </button>
        ),
      )}
    </div>
  );
}
