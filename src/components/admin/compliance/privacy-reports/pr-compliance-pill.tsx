type PillVariant = 'compliant' | 'review-due' | 'non-compliant' | 'exempt';

interface PrCompliancePillProps {
  variant: PillVariant;
  label: string;
}

export function PrCompliancePill({ variant, label }: PrCompliancePillProps) {
  const variantClasses: Record<PillVariant, string> = {
    'compliant':     'bg-[rgba(46,177,76,0.12)] text-[var(--success)]',
    'review-due':    'bg-[rgba(255,193,7,0.12)] text-[var(--amber)]',
    'non-compliant': 'bg-[rgba(211,42,38,0.12)] text-[var(--danger)]',
    'exempt':        'bg-[var(--cream-deep)] text-[var(--ink-soft)]',
  };

  return (
    <span className={`inline-flex items-center gap-[5px] py-[3px] px-[8px] font-mono text-[10px] font-bold tracking-[0.06em] uppercase rounded-[4px] whitespace-nowrap ${variantClasses[variant]}`}>
      <span className="w-[6px] h-[6px] rounded-full bg-current" />
      {label}
    </span>
  );
}
