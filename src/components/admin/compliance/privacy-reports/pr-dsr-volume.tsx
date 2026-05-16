import type { PrDsrRow } from '@/lib/mock-data/admin/privacy-reports-data';

interface PrDsrVolumeProps {
  rows: PrDsrRow[];
  totalLabel: string;
  totalValue: string;
}

export function PrDsrVolume({ rows, totalLabel, totalValue }: PrDsrVolumeProps) {
  const barBgClass = (variant: PrDsrRow['variant']) => {
    switch (variant) {
      case 'access':      return 'bg-[var(--super)]';
      case 'deletion':    return 'bg-[var(--danger)]';
      case 'portability': return 'bg-[var(--amber)]';
      case 'correction':  return 'bg-[var(--lime-deep)]';
      case 'objection':   return 'bg-[var(--ink)]';
      case 'restriction': return 'bg-[var(--ink-mute)]';
      default:            return 'bg-[var(--ink-mute)]';
    }
  };

  return (
    <div>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-[20px] mb-[16px] items-baseline">
        <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold">
          {totalLabel}
        </div>
        <div className="font-display text-[20px] font-medium text-[var(--ink)] tracking-[-0.02em]">
          {totalValue}
        </div>
      </div>
      <div className="flex flex-col gap-[10px]">
        {rows.map((row, idx) => (
          <div key={idx} className="grid grid-cols-[120px_minmax(0,1fr)_80px] gap-[12px] items-center max-[720px]:grid-cols-[100px_minmax(0,1fr)_60px]">
            <div className="text-[12.5px] font-bold text-[var(--ink)] tracking-[-0.01em]">
              {row.label}
            </div>
            <div className="h-[18px] bg-[var(--paper-deep)] rounded-[4px] overflow-hidden relative">
              <div
                className={`h-full rounded-[4px] flex items-center pl-[8px] font-mono text-[10px] font-bold text-[var(--paper)] tracking-[0.04em] min-w-[26px] ${barBgClass(row.variant)}`}
                style={{ width: `${row.barWidth}%` }}
              >
                {row.barLabel}
              </div>
            </div>
            <div className="font-mono text-[11px] font-bold text-[var(--ink-soft)] tracking-[0.04em] text-right tabular-nums">
              {row.valuePctText}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
