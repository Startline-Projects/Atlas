import { AudRow } from './aud-row';
import type { AudRow as AudRowType } from '@/lib/mock-data/admin/audit-logs-data';

interface AudTableProps {
  rows: AudRowType[];
}

export function AudTable({ rows }: AudTableProps) {
  return (
    <div>
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        {/* Table head */}
        <div className="grid grid-cols-[140px_16px_minmax(0,1fr)_140px_80px_130px_50px] gap-[10px] items-center py-[10px] px-[16px] bg-[var(--paper-deep)] border-b border-[var(--line)] font-mono text-[9px] font-bold tracking-[0.16em] uppercase text-[var(--ink-mute)] max-[1180px]:grid-cols-[130px_16px_minmax(0,1fr)_110px_110px] max-[720px]:grid-cols-[110px_16px_minmax(0,1fr)] max-[720px]:py-[8px] max-[720px]:px-[12px]">
          <div>Timestamp · UTC</div>
          <div></div>
          <div>Action · subject</div>
          <div className="max-[720px]:hidden">Actor</div>
          <div className="max-[1180px]:hidden">Result</div>
          <div className="max-[720px]:hidden">Category</div>
          <div className="max-[1180px]:hidden"></div>
        </div>

        {/* Rows */}
        {rows.map((row) => (
          <AudRow key={row.id} row={row} />
        ))}
      </div>

      {/* Footer — SIBLING of table card */}
      <div className="flex items-center justify-between gap-[12px] pt-[14px] flex-wrap">
        <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
          {rows.length} of 2,847 shown · last 24h · sorted reverse-chronological
        </span>
        <button className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] whitespace-nowrap">
          Load older (2,832 in window) →
        </button>
      </div>
    </div>
  );
}
