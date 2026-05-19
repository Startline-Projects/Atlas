/* admin.html CSS lines 31587-31607: kbd-tag chip with 6 variants */

import type { KbTagVariant } from '@/lib/mock-data/admin/knowledge-base-data';

interface KbTagProps {
  label: string;
  variant: KbTagVariant;
}

const variantClasses: Record<KbTagVariant, string> = {
  default: 'bg-[var(--cream-deep)] text-[var(--ink-soft)]',
  runbook: 'bg-[var(--ink)] text-[var(--paper)]',
  critical: 'bg-[var(--danger-bg)] text-[var(--danger)]',
  compliance: 'bg-[rgba(110,63,224,0.08)] text-[var(--super)]',
  fraud: 'bg-[rgba(194,65,43,0.08)] text-[var(--danger)]',
  onboarding: 'bg-[var(--success-bg)] text-[var(--success)]',
};

export function KbTag({ label, variant }: KbTagProps) {
  return (
    <span
      className={`font-mono text-[9px] tracking-[0.08em] uppercase font-bold py-[2px] px-[6px] rounded-[3px] ${variantClasses[variant]}`}
    >
      {label}
    </span>
  );
}
