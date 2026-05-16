import type { PrGeoRow } from '@/lib/mock-data/admin/privacy-reports-data';

interface PrGeoBarsProps {
  rows: PrGeoRow[];
}

export function PrGeoBars({ rows }: PrGeoBarsProps) {
  return (
    <div>
      <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold mb-[14px]">
        BY JURISDICTION
      </div>
      <div className="flex flex-col gap-[12px]">
        {rows.map((row, idx) => (
          <div key={idx} className="grid grid-cols-[110px_minmax(0,1fr)_90px] gap-[12px] items-center max-[720px]:grid-cols-[100px_minmax(0,1fr)_70px] max-[720px]:gap-[10px]">
            <div className="flex items-center gap-[6px] text-[12.5px] font-bold text-[var(--ink)] tracking-[-0.01em]">
              <span
                className={`w-[16px] h-[11px] rounded-[1px] flex-shrink-0 ${row.flagBorder ? 'border border-[var(--ink)]' : ''}`}
                style={{ background: row.flagBg }}
              />
              {row.label}
            </div>
            <div className="h-[10px] bg-[var(--paper-deep)] rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-[var(--ink-soft)] to-[var(--ink)] rounded-full"
                style={{ width: `${row.value}%` }}
              />
            </div>
            <div className="font-mono text-[12px] font-bold text-[var(--ink)] tracking-[0.02em] text-right tabular-nums">
              {row.value}
              <span className="text-[var(--ink-mute)] font-semibold">%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
