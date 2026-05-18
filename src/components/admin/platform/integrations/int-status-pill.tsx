/* admin.html CSS lines 27820-27845: .in-status pill with 4 status variants + ::before dot */

import type { IntegrationStatus } from '@/lib/mock-data/admin/integrations-data';

interface IntStatusPillProps {
  status: IntegrationStatus;
  label: string;
}

export function IntStatusPill({ status, label }: IntStatusPillProps) {
  const pillClasses =
    status === 'connected'
      ? 'bg-[var(--success-bg)] text-[var(--success)]'
      : status === 'error'
      ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
      : status === 'warn'
      ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
      : 'bg-[var(--cream-deep)] text-[var(--ink-mute)]';

  const dotAnimation =
    status === 'connected'
      ? 'animate-[pulse-live_2.2s_ease-in-out_infinite]'
      : status === 'error'
      ? 'animate-[pulse-live_1.2s_ease-in-out_infinite]'
      : '';

  return (
    <span
      className={`inline-flex items-center gap-[5px] py-[3px] px-[8px] font-mono text-[9.5px] font-bold tracking-[0.06em] uppercase rounded-[4px] flex-shrink-0 ${pillClasses}`}
    >
      <span className={`w-[7px] h-[7px] rounded-full bg-current ${dotAnimation}`} />
      {label}
    </span>
  );
}
