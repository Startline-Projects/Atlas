/* admin.html lines 67177-67431 + CSS 32030-32045: 4-variant priority chip
   critical (danger) / high (amber) / info (paper-deep/ink-mute neutral) / resolved (success) */

import type { NfcPriorityVariant } from '@/lib/mock-data/admin/notifications-data';

interface NfcPriorityChipProps {
  variant: NfcPriorityVariant;
  label: string;
}

const variantClasses: Record<NfcPriorityVariant, string> = {
  critical: 'bg-[var(--danger-bg)] text-[var(--danger)]',
  high: 'bg-[var(--amber-bg)] text-[var(--amber)]',
  info: 'bg-[var(--paper-deep)] text-[var(--ink-mute)]',
  resolved: 'bg-[var(--success-bg)] text-[var(--success)]',
};

export function NfcPriorityChip({ variant, label }: NfcPriorityChipProps) {
  return (
    <span
      className={`inline-flex items-center py-[1px] px-[6px] font-mono text-[8.5px] font-bold tracking-[0.06em] uppercase rounded-[3px] flex-shrink-0 ${variantClasses[variant]}`}
    >
      {label}
    </span>
  );
}
