/**
 * Generic `cp-card` wrapper used by every section card on the profile.
 * Eyebrow + title in the head, optional right-side meta, body content.
 *
 * Server Component.
 */
import { cn } from "@/lib/utils/cn";

type ProfileCardProps = {
  eyebrow: string;
  /** Title supports inline italic via the `italic` slot. */
  title: { lead: string; italic?: string };
  meta?: React.ReactNode;
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export function ProfileCard({
  eyebrow,
  title,
  meta,
  id,
  className,
  children,
}: ProfileCardProps) {
  return (
    <section
      id={id}
      className={cn(
        "bg-paper border-line scroll-mt-[200px] rounded-xl border px-7 py-6",
        className,
      )}
    >
      <header className="border-line-soft mb-3.5 flex items-baseline justify-between gap-3.5 border-b pb-3">
        <div className="min-w-0 flex-1">
          <div className="text-ink-mute font-mono text-[9.5px] font-semibold tracking-[0.14em] uppercase">
            {eyebrow}
          </div>
          <h3
            className="font-display text-ink mt-[3px] text-[17px] leading-[1.2] font-medium tracking-[-0.01em]"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            {title.lead}
            {title.italic ? (
              <em className="text-ink-soft font-display italic"> {title.italic}</em>
            ) : null}
          </h3>
        </div>
        {meta ? (
          <span className="text-ink-mute font-mono text-[10px] tracking-[0.04em] whitespace-nowrap">
            {meta}
          </span>
        ) : null}
      </header>
      {children}
    </section>
  );
}

/* ============================================================
   Fact row (label · value) used by Vital facts + Anti-cheat cards
   ============================================================ */

type ProfileFactRowProps = {
  label: string;
  /** Renders right-aligned. */
  value: React.ReactNode;
  /** Tone applies to the value text. */
  tone?: "default" | "success" | "amber" | "danger" | "mono";
};

const FACT_VALUE_TONE = {
  default: "text-ink",
  success: "text-success",
  amber: "text-amber",
  danger: "text-danger",
  mono: "text-ink font-mono text-[12px] tracking-[0.04em] tabular-nums",
} as const;

export function ProfileFactRow({
  label,
  value,
  tone = "default",
}: ProfileFactRowProps) {
  return (
    <div className="border-line-soft flex items-center justify-between gap-3 border-b py-[10px] text-[13px] last:border-b-0 last:pb-0 first:pt-0">
      <span className="text-ink-mute">{label}</span>
      <span
        className={cn(
          "text-right",
          tone !== "mono" && "font-medium",
          FACT_VALUE_TONE[tone],
        )}
      >
        {value}
      </span>
    </div>
  );
}
