interface RsStatusPillProps {
  variant: 'acknowledged' | 'in-progress' | 'not-started' | 'draft' | 'na';
  label: string;
}

export function RsStatusPill({ variant, label }: RsStatusPillProps) {
  const variantClasses = {
    'acknowledged': 'bg-[var(--success-bg)] text-[var(--success)]',
    'in-progress': 'bg-[rgba(110,63,224,0.10)] text-[var(--super)]',
    'not-started': 'bg-[var(--cream-deep)] text-[var(--ink-soft)]',
    'draft': 'bg-[var(--amber-bg)] text-[var(--amber)]',
    'na': 'bg-[var(--paper-deep)] text-[var(--ink-mute)]',
  };

  return (
    <span
      className={`inline-flex items-center gap-[5px] py-[2px] px-[7px] font-mono text-[9.5px] font-bold tracking-[0.06em] uppercase rounded-[3px] ${variantClasses[variant]}`}
    >
      {label}
    </span>
  );
}
