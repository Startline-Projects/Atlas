import type { SuspensionExpiresVariant } from '@/lib/mock-data/admin/suspensions-bans-data';

interface SuspensionExpiresCellProps {
  variant: SuspensionExpiresVariant;
  primary: string;
  meta: string;
}

const COLOR: Record<SuspensionExpiresVariant, string> = {
  normal: 'text-[var(--ink-soft)] font-semibold',
  urgent: 'text-[var(--danger)] font-semibold',
  warn: 'text-[var(--amber)] font-semibold',
  perm: 'text-[var(--ink)] font-bold',
  lifted: 'text-[var(--success)] font-semibold',
};

export function SuspensionExpiresCell({ variant, primary, meta }: SuspensionExpiresCellProps) {
  return (
    <div className={`font-mono text-[11.5px] tracking-[0.02em] tabular-nums ${COLOR[variant]}`}>
      {primary}
      <span className="block text-[9.5px] font-medium text-[var(--ink-mute)] tracking-[0.04em] mt-[2px]">
        {meta}
      </span>
    </div>
  );
}
