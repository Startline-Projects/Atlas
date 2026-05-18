/* admin.html CSS lines 28535-28558: .tm-status-pill — 4 variants (active/draft/in-approval/archived).
   In-approval dot animates pulse-fr 1.4s. */

import type { TmStatus } from '@/lib/mock-data/admin/templates-data';

interface TmStatusPillProps {
  status: TmStatus;
  label: string;
}

export function TmStatusPill({ status, label }: TmStatusPillProps) {
  const pillClasses =
    status === 'active'
      ? 'bg-[var(--success-bg)] text-[var(--success)]'
      : status === 'draft'
      ? 'bg-[var(--cream-deep)] text-[var(--ink-soft)]'
      : status === 'in-approval'
      ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
      : 'bg-[var(--paper-deep)] text-[var(--ink-mute)]';

  const dotAnimation =
    status === 'in-approval' ? 'animate-[pulse-fr_1.4s_ease-in-out_infinite]' : '';

  return (
    <span
      className={`inline-flex items-center gap-[5px] py-[3px] px-[8px] font-mono text-[9.5px] font-bold tracking-[0.06em] uppercase rounded-[4px] whitespace-nowrap ${pillClasses}`}
    >
      <span className={`w-[6px] h-[6px] rounded-full bg-current ${dotAnimation}`} />
      {label}
    </span>
  );
}
