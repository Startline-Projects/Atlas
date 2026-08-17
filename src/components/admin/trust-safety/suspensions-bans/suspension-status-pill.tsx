import type { SuspensionStatus } from '@/lib/mock-data/admin/suspensions-bans-data';

interface SuspensionStatusPillProps {
  status: SuspensionStatus;
  label: string;
}

const VARIANT: Record<SuspensionStatus, string> = {
  suspended: 'bg-[var(--amber-bg)] text-[var(--amber)]',
  banned: 'bg-[var(--danger-bg)] text-[var(--danger)]',
  lifted: 'bg-[var(--success-bg)] text-[var(--success)]',
  'auto-lifted': 'bg-[var(--lime-bg)] text-[var(--lime-deep)]',
  expired: 'bg-[var(--cream-deep)] text-[var(--ink-mute)]',
};

export function SuspensionStatusPill({ status, label }: SuspensionStatusPillProps) {
  return (
    <span
      className={`inline-flex items-center gap-[5px] px-[9px] py-[3px] font-mono text-[9.5px] font-bold tracking-[0.08em] uppercase rounded-full ${VARIANT[status]}`}
    >
      {label}
    </span>
  );
}
