/* admin.html lines 64993-65115 + CSS 30446-30541: incident table (8 resolved rows) */

import type { IcIncidentRow } from '@/lib/mock-data/admin/internal-incidents-data';
import { IcTableRow } from './ic-table-row';

interface IcTableProps {
  rows: IcIncidentRow[];
}

const thBase =
  'text-left py-[12px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold';

export function IcTable({ rows }: IcTableProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      <table className="w-full border-separate border-spacing-0 text-[12.5px]">
        <thead>
          <tr>
            <th className={`${thBase} w-[12%]`}>ID</th>
            <th className={`${thBase} w-[9%]`}>Severity</th>
            <th className={`${thBase} w-[36%]`}>Title &amp; summary</th>
            <th className={`${thBase} w-[11%]`}>Duration</th>
            <th className={`${thBase} w-[14%]`}>Resolved</th>
            <th className={`${thBase} w-[11%]`}>Post-mortem</th>
            <th className={`${thBase} w-[7%]`} />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <IcTableRow key={row.id} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
