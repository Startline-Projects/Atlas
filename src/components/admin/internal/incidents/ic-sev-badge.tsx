/* admin.html CSS lines 30267-30291: severity pill (SEV-0 to SEV-3) */

import type { IcSevVariant } from '@/lib/mock-data/admin/internal-incidents-data';

interface IcSevBadgeProps {
  sev: IcSevVariant;
}

const variantClasses: Record<IcSevVariant, string> = {
  'sev-0': 'bg-[var(--danger-bg)] text-[var(--danger)]',
  'sev-1': 'bg-[var(--danger-bg)] text-[var(--danger)]',
  'sev-2': 'bg-[var(--amber-bg)] text-[var(--amber)]',
  'sev-3': 'bg-[rgba(110,63,224,0.10)] text-[var(--super)]',
};

const variantLabels: Record<IcSevVariant, string> = {
  'sev-0': 'SEV-0',
  'sev-1': 'SEV-1',
  'sev-2': 'SEV-2',
  'sev-3': 'SEV-3',
};

export function IcSevBadge({ sev }: IcSevBadgeProps) {
  const isPulse = sev === 'sev-0';
  const dotAnim = isPulse ? 'animate-[pulse-fr_0.9s_ease-in-out_infinite]' : '';
  return (
    <span
      className={`inline-flex items-center gap-[5px] py-[3px] px-[9px] font-mono text-[9.5px] font-bold tracking-[0.08em] uppercase rounded-[4px] whitespace-nowrap ${variantClasses[sev]}`}
    >
      <span
        className={`w-[7px] h-[7px] rounded-full bg-current flex-shrink-0 ${dotAnim}`}
      />
      {variantLabels[sev]}
    </span>
  );
}
