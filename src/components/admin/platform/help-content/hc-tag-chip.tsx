/* admin.html CSS lines 29208-29223: article tag chip — default + 5 colored variants */

import type { HcTagVariant } from '@/lib/mock-data/admin/help-content-data';

interface HcTagChipProps {
  label: string;
  variant: HcTagVariant;
}

export function HcTagChip({ label, variant }: HcTagChipProps) {
  const variantClasses =
    variant === 'featured'
      ? 'bg-[var(--ink)] text-[var(--paper)]'
      : variant === 'video'
      ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
      : variant === 'payment'
      ? 'bg-[var(--success-bg)] text-[var(--success)]'
      : variant === 'policy'
      ? 'bg-[rgba(194,65,43,0.08)] text-[var(--danger)]'
      : variant === 'compliance'
      ? 'bg-[rgba(110,63,224,0.08)] text-[var(--super)]'
      : 'bg-[var(--cream-deep)] text-[var(--ink-soft)]';

  return (
    <span
      className={`font-mono text-[9px] tracking-[0.08em] uppercase font-bold py-[2px] px-[6px] rounded-[3px] ${variantClasses}`}
    >
      {label}
    </span>
  );
}
