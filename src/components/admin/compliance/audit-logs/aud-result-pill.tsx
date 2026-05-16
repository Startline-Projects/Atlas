interface AudResultPillProps {
  variant: 'success' | 'failure' | 'blocked' | 'warn';
  label: string;
}

export function AudResultPill({ variant, label }: AudResultPillProps) {
  const variants = {
    success: 'bg-[rgba(34,177,76,0.12)] text-[var(--success)] border-[rgba(34,177,76,0.3)]',
    failure: 'bg-[rgba(220,53,69,0.12)] text-[var(--danger)] border-[rgba(220,53,69,0.3)]',
    blocked: 'bg-[rgba(255,193,7,0.12)] text-[var(--amber)] border-[rgba(255,193,7,0.3)]',
    warn: 'bg-[rgba(255,193,7,0.12)] text-[var(--amber)] border-[rgba(255,193,7,0.3)]',
  }[variant];

  return (
    <span className={`inline-flex items-center px-[9px] py-[3px] font-mono text-[10px] font-bold tracking-[0.04em] uppercase rounded-[3px] border ${variants}`}>
      {label}
    </span>
  );
}
