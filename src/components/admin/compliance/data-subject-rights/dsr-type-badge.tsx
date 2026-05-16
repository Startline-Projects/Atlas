type Variant = 'access' | 'correction' | 'deletion' | 'portability' | 'restriction' | 'objection';

interface DsrTypeBadgeProps {
  variant: Variant;
  label: string;
}

export function DsrTypeBadge({ variant, label }: DsrTypeBadgeProps) {
  const variantClass: Record<Variant, string> = {
    access: 'text-[var(--super)] border-[rgba(110,63,224,0.25)] bg-[rgba(110,63,224,0.05)]',
    correction: 'text-[var(--lime-deep)] border-[rgba(74,109,65,0.25)] bg-[var(--lime-bg)]',
    deletion: 'text-[var(--danger)] border-[rgba(194,65,43,0.3)] bg-[var(--danger-bg)]',
    portability: 'text-[var(--amber)] border-[rgba(232,118,58,0.3)] bg-[var(--amber-bg)]',
    restriction: 'text-[var(--ink-soft)] border-[var(--cream-deep)] bg-[var(--cream-deep)]',
    objection: 'text-[var(--ink)] border-[var(--line)] bg-[var(--paper-deep)]',
  };

  return (
    <span
      className={`inline-flex items-center gap-[5px] py-[3px] px-[8px] font-mono text-[10px] font-bold tracking-[0.04em] rounded-[4px] border whitespace-nowrap ${variantClass[variant]}`}
    >
      {label}
    </span>
  );
}
