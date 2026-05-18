/* fr-qs-row pattern hand-translated: label / value with optional variant tint */

import type { IcQuickstatRow } from '@/lib/mock-data/admin/internal-incidents-data';

interface IcQuickstatsRowProps {
  row: IcQuickstatRow;
}

export function IcQuickstatsRow({ row }: IcQuickstatsRowProps) {
  const valueColor =
    row.valueVariant === 'success'
      ? 'text-[var(--success)]'
      : row.valueVariant === 'warn'
      ? 'text-[var(--amber)]'
      : 'text-[var(--ink)]';

  return (
    <div className="flex justify-between gap-[10px] items-baseline py-[6px] border-b border-b-dashed border-b-[var(--line-soft)] last:border-b-0">
      <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--ink-mute)] font-bold flex-shrink-0">
        {row.label}
      </span>
      <span
        className={`font-mono text-[11.5px] font-bold tracking-[0.02em] text-right max-w-[60%] break-words ${valueColor}`}
      >
        {row.value}
      </span>
    </div>
  );
}
