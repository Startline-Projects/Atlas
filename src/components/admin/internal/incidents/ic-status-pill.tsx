/* admin.html CSS lines 30293-30318: incident status pill (open / mitigated / monitoring / resolved) */

import type { IcStatusVariant } from '@/lib/mock-data/admin/internal-incidents-data';

interface IcStatusPillProps {
  status: IcStatusVariant;
  label: string;
}

const variantClasses: Record<IcStatusVariant, string> = {
  open: 'bg-[var(--danger-bg)] text-[var(--danger)]',
  mitigated: 'bg-[var(--amber-bg)] text-[var(--amber)]',
  monitoring: 'bg-[rgba(110,63,224,0.10)] text-[var(--super)]',
  resolved: 'bg-[var(--success-bg)] text-[var(--success)]',
};

const dotAnim: Record<IcStatusVariant, string> = {
  open: 'animate-[pulse-fr_1s_ease-in-out_infinite]',
  mitigated: 'animate-[pulse-fr_1.5s_ease-in-out_infinite]',
  monitoring: '',
  resolved: '',
};

export function IcStatusPill({ status, label }: IcStatusPillProps) {
  return (
    <span
      className={`inline-flex items-center gap-[5px] py-[3px] px-[9px] font-mono text-[9.5px] font-bold tracking-[0.06em] uppercase rounded-[4px] whitespace-nowrap ${variantClasses[status]}`}
    >
      <span
        className={`w-[6px] h-[6px] rounded-full bg-current flex-shrink-0 ${dotAnim[status]}`}
      />
      {label}
    </span>
  );
}
