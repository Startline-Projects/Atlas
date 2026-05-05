/**
 * Page header for roster views: eyebrow + h1 + subtitle + actions slot.
 *
 * Server Component. The page passes its own action buttons via the
 * `actions` slot — those buttons can carry their own onClick handlers
 * if the page wraps them in a Client component.
 */
type RosterHeaderProps = {
  eyebrow: string;
  /** h1 content — supports inline emphasized fragment via the `italic` part. */
  title: { lead: string; italic: string };
  subtitle: string;
  actions?: React.ReactNode;
};

export function RosterHeader({
  eyebrow,
  title,
  subtitle,
  actions,
}: RosterHeaderProps) {
  return (
    <header className="border-line-soft bg-cream flex items-end justify-between gap-6 border-b px-6 pt-7 pb-[18px] sm:px-10">
      <div>
        <div className="text-ink-mute mb-1 font-mono text-[10px] font-medium tracking-[0.16em] uppercase">
          {eyebrow}
        </div>
        <h1
          className="font-display text-ink m-0 text-[36px] leading-[1.05] font-normal tracking-[-0.02em]"
          style={{ fontVariationSettings: '"opsz" 144' }}
        >
          {title.lead}{" "}
          <em className="text-ink-soft font-display italic">{title.italic}</em>
        </h1>
        <div className="text-ink-mute mt-1.5 text-[13.5px]">{subtitle}</div>
      </div>
      {actions ? (
        <div className="flex flex-shrink-0 items-center gap-2">{actions}</div>
      ) : null}
    </header>
  );
}

/** Standard action button used in the roster header `actions` slot. */
type RosterActionProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "primary";
  icon?: React.ReactNode;
};

export function RosterActionButton({
  variant = "default",
  icon,
  children,
  className,
  ...rest
}: RosterActionProps) {
  const base =
    "inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-3.5 py-2 text-[12.5px] transition-colors";
  const variantClass =
    variant === "primary"
      ? "bg-ink text-paper border-ink hover:bg-ink-soft"
      : "bg-paper border-line text-ink hover:bg-cream-deep";
  return (
    <button
      type="button"
      className={`${base} ${variantClass} ${className ?? ""}`}
      {...rest}
    >
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      {children}
    </button>
  );
}
