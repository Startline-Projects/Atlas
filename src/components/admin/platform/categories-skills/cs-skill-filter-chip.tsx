/* admin.html lines 61049-61054: .fr-filter-chip single filter button with count badge */

interface CsSkillFilterChipProps {
  label: string;
  count: string;
  active: boolean;
  onClick: () => void;
}

export function CsSkillFilterChip({ label, count, active, onClick }: CsSkillFilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-[5px] py-[5px] px-[10px] font-mono text-[10.5px] font-semibold tracking-[0.04em] rounded-full cursor-pointer transition-all whitespace-nowrap ${
        active
          ? 'bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)]'
          : 'bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]'
      }`}
    >
      {label}
      <span
        className={`font-mono text-[9px] font-bold py-[1px] px-[5px] rounded-full tracking-[0.04em] ${
          active
            ? 'bg-[rgba(251,248,242,0.15)] text-[rgba(251,248,242,0.85)]'
            : 'bg-[var(--paper-deep)] text-[var(--ink-mute)]'
        }`}
      >
        {count}
      </span>
    </button>
  );
}
