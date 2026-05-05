import type {
  BodySegment,
  UrgentCard as UrgentCardData,
  Urgency,
} from "@/lib/mock-data/specialist/dashboard-cards";
import Link from "next/link";

const TONE_BORDER: Record<Urgency, string> = {
  red: "before:bg-danger",
  orange: "before:bg-amber",
  yellow: "before:bg-lime-deep",
};

const TONE_GRADIENT: Record<Urgency, string> = {
  red: "bg-[linear-gradient(to_right,rgba(194,65,43,0.04),var(--color-paper)_30%)]",
  orange:
    "bg-[linear-gradient(to_right,rgba(232,118,58,0.04),var(--color-paper)_30%)]",
  yellow:
    "bg-[linear-gradient(to_right,rgba(214,242,77,0.08),var(--color-paper)_30%)]",
};

const DOT_TONE: Record<Urgency, string> = {
  red: "bg-danger animate-pulse",
  orange: "bg-amber",
  yellow: "bg-lime-deep",
};

const TYPE_TONE: Record<Urgency, string> = {
  red: "text-danger font-semibold",
  orange: "text-amber font-semibold",
  yellow: "text-lime-text font-semibold",
};

const SLA_TONE: Record<Urgency, string> = {
  red: "text-danger border-danger/25 bg-danger-bg",
  orange: "text-ink-soft border-line-soft bg-cream",
  yellow: "text-ink-soft border-line-soft bg-cream",
};

/** Render the {text|strong|em} body segments without flattening. */
function renderBody(segments: ReadonlyArray<BodySegment>) {
  return segments.map((seg, i) => {
    const key = `${seg.kind}-${i}`;
    if (seg.kind === "strong") {
      return (
        <strong key={key} className="text-ink font-semibold">
          {seg.value}
        </strong>
      );
    }
    if (seg.kind === "em") {
      return (
        <em
          key={key}
          className="font-display text-ink font-medium not-italic italic"
          style={{ fontVariationSettings: '"opsz" 72' }}
        >
          {seg.value}
        </em>
      );
    }
    return <span key={key}>{seg.value}</span>;
  });
}

export function UrgentCard({ card }: { card: UrgentCardData }) {
  return (
    <article
      className={[
        "group bg-paper border-line hover:border-[#C4BCA9] hover:shadow-md relative rounded-md border py-3.5 pr-4 pl-5 transition-all hover:-translate-y-px",
        // colored left bar via ::before
        "before:absolute before:top-3.5 before:bottom-3.5 before:left-0 before:w-[3px] before:rounded-r-[2px] before:content-['']",
        TONE_BORDER[card.urgency],
        TONE_GRADIENT[card.urgency],
      ].join(" ")}
    >
      <div className="mb-2 flex items-center justify-between gap-2.5">
        <span className="text-ink-mute inline-flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.14em] uppercase">
          <span
            aria-hidden="true"
            className={`inline-block h-1.5 w-1.5 rounded-full ${DOT_TONE[card.urgency]}`}
          />
          <span className={TYPE_TONE[card.urgency]}>{card.type}</span>
        </span>
        <span
          className={`inline-flex items-center gap-1.5 rounded-[4px] border px-1.5 py-0.5 font-mono text-[11px] font-medium tracking-[0.04em] tabular-nums ${SLA_TONE[card.urgency]}`}
        >
          {card.sla}
        </span>
      </div>

      <p className="text-ink mb-3 text-sm leading-[1.45]">
        {renderBody(card.body)}
      </p>

      <div className="flex items-center gap-2">
        <UrgentCardButton action={card.primaryAction} variant="primary" />
        {card.secondaryAction ? (
          <UrgentCardButton action={card.secondaryAction} variant="ghost" />
        ) : null}
      </div>
    </article>
  );
}

function UrgentCardButton({
  action,
  variant,
}: {
  action: { label: string; href?: string };
  variant: "primary" | "ghost";
}) {
  const className =
    variant === "primary"
      ? "bg-ink text-paper border-ink hover:bg-black"
      : "border-transparent text-ink-mute hover:bg-cream-deep hover:text-ink";
  const base =
    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors";
  if (action.href) {
    return (
      <Link href={action.href} className={`${base} ${className}`}>
        {action.label}
      </Link>
    );
  }
  return (
    <button type="button" className={`${base} ${className}`}>
      {action.label}
    </button>
  );
}
