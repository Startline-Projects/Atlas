interface RsTagProps {
  label: string;
  variant?: 'annual' | 'quarterly' | 'adhoc' | 'ongoing' | undefined;
}

export function RsTag({ label, variant }: RsTagProps) {
  const variantClasses = {
    'annual': 'bg-[rgba(110,63,224,0.08)] text-[var(--super)]',
    'quarterly': 'bg-[var(--amber-bg)] text-[var(--amber)]',
    'adhoc': 'bg-[var(--danger-bg)] text-[var(--danger)]',
    'ongoing': 'bg-[var(--success-bg)] text-[var(--success)]',
  };

  const baseClass =
    'font-mono text-[9px] tracking-[0.08em] uppercase font-bold py-[2px] px-[6px] rounded-[3px] bg-[var(--cream-deep)] text-[var(--ink-soft)]';

  return (
    <span className={`${baseClass} ${variant && variantClasses[variant] ? variantClasses[variant] : ''}`}>
      {label}
    </span>
  );
}
