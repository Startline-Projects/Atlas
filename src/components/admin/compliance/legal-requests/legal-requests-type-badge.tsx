interface LrTypeBadgeProps {
  variant: 'subpoena' | 'court-order' | 'regulatory' | 'foia' | 'preservation';
  label: string;
}

export function LrTypeBadge({ variant, label }: LrTypeBadgeProps) {
  const variantStyles = {
    subpoena: 'text-[var(--danger)] border-[rgba(194,65,43,0.3)] bg-[var(--danger-bg)]',
    'court-order': 'text-[var(--danger)] border-[rgba(194,65,43,0.3)] bg-[var(--danger-bg)]',
    regulatory: 'text-[var(--amber)] border-[rgba(232,118,58,0.3)] bg-[var(--amber-bg)]',
    foia: 'text-[var(--super)] border-[rgba(110,63,224,0.25)] bg-[rgba(110,63,224,0.05)]',
    preservation: 'text-[var(--ink-soft)]',
  };

  return (
    <span
      className={`inline-block py-[4px] px-[8px] border-[1px] rounded-[4px] font-body text-[11px] tracking-[-0.005em] font-medium ${variantStyles[variant]}`}
    >
      {label}
    </span>
  );
}
