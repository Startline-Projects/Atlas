'use client';

interface TaxFormChipProps {
  variant: 'f1099-nec' | 'f1042-s' | 'w9' | 'w8ben' | 'w8ben-e' | 'missing';
}

export function TaxFormChip({ variant }: TaxFormChipProps) {
  const styles = {
    'f1099-nec': 'bg-[var(--lime-bg)] text-[var(--lime)]',
    'f1042-s': 'bg-[var(--super-bg)] text-[var(--super)]',
    'w9': 'bg-[var(--lime-bg)] text-[var(--lime)]',
    'w8ben': 'bg-[var(--super-bg)] text-[var(--super)]',
    'w8ben-e': 'bg-[var(--super-bg)] text-[var(--super)]',
    'missing': 'bg-[var(--danger-bg)] text-[var(--danger)]',
  };

  const labels = {
    'f1099-nec': '1099-NEC',
    'f1042-s': '1042-S',
    'w9': 'W-9',
    'w8ben': 'W-8BEN',
    'w8ben-e': 'W-8BEN-E',
    'missing': 'Missing',
  };

  return (
    <span className={`inline-block font-mono text-[10.5px] font-semibold tracking-[0.04em] uppercase py-[2px] px-[6px] rounded-[2px] ${styles[variant]}`}>
      {labels[variant]}
    </span>
  );
}
