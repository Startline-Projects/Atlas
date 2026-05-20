/* admin.html + CSS 32434-32450: result status pill, 4 variants (banned/active/resolved/investigating) */

import type { GsResultStatus } from '@/lib/mock-data/admin/search-results-data';

interface GsStatusPillProps {
  status: GsResultStatus;
  label: string;
}

const variantClasses: Record<GsResultStatus, string> = {
  banned: 'bg-[var(--danger-bg)] text-[var(--danger)]',
  active: 'bg-[var(--success-bg)] text-[var(--success)]',
  resolved: 'bg-[var(--success-bg)] text-[var(--success)]',
  investigating: 'bg-[var(--amber-bg)] text-[var(--amber)]',
};

export function GsStatusPill({ status, label }: GsStatusPillProps) {
  return (
    <span
      className={`inline-flex items-center py-[2px] px-[7px] font-mono text-[9px] font-bold tracking-[0.06em] uppercase rounded-[3px] whitespace-nowrap ${variantClasses[status]}`}
    >
      {label}
    </span>
  );
}
