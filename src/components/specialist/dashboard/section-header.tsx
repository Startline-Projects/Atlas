import { cn } from "@/lib/utils/cn";

type SectionHeaderProps = {
  title: string;
  meta?: React.ReactNode;
  className?: string;
};

/** Shared `<h2> + meta` row used by every dashboard section. */
export function SectionHeader({ title, meta, className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-4 flex items-baseline justify-between gap-3.5",
        className,
      )}
    >
      <h2
        className="font-display text-[22px] font-medium tracking-[-0.015em]"
        style={{ fontVariationSettings: '"opsz" 72' }}
      >
        {title}
      </h2>
      {meta ? (
        <span className="text-ink-mute inline-flex items-center gap-2 text-[12.5px]">
          {meta}
        </span>
      ) : null}
    </div>
  );
}
