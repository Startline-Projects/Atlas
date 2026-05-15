interface RefundReasonChipProps {
  variant: 'dispute' | 'quality' | 'cancellation' | 'billing' | 'fraud';
  label: string;
}

export function RefundReasonChip({ variant, label }: RefundReasonChipProps) {
  const variantStyles = {
    dispute: 'text-[var(--super)] border-[rgba(110,63,224,0.25)] bg-[rgba(110,63,224,0.05)]',
    quality: 'text-[var(--amber)] border-[rgba(232,118,58,0.3)] bg-[var(--amber-bg)]',
    cancellation: 'text-[var(--lime-deep)] border-[rgba(74,109,65,0.25)] bg-[var(--lime-bg)]',
    billing: 'text-[var(--ink-soft)] border-[var(--line-soft)] bg-[var(--paper-deep)]',
    fraud: 'text-[var(--danger)] border-[rgba(194,65,43,0.3)] bg-[var(--danger-bg)]',
  };

  return (
    <span
      className={`inline-flex items-center gap-[5px] py-[3px] px-[8px] font-mono text-[10px] font-semibold tracking-[0.04em] border border-solid rounded-[4px] whitespace-nowrap ${variantStyles[variant]}`}
    >
      {label}
    </span>
  );
}
