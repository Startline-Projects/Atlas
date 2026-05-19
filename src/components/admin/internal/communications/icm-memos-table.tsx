/* admin.html lines 66060-66139 + CSS 31442-31476: memos archive table shell + thead + 6 rows */

import type { IcmMemoRow as IcmMemoRowData } from '@/lib/mock-data/admin/communications-data';
import { IcmMemoRow } from './icm-memo-row';

interface IcmMemosTableProps {
  rows: IcmMemoRowData[];
}

const THEAD_BASE =
  'text-left py-[12px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold';

export function IcmMemosTable({ rows }: IcmMemosTableProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      <table className="w-full border-separate border-spacing-0 text-[12.5px] [&_tbody_tr:last-child_td]:border-b-0">
        <thead>
          <tr>
            <th className={`${THEAD_BASE} w-[50%]`}>Memo</th>
            <th className={`${THEAD_BASE} w-[16%]`}>Author</th>
            <th className={`${THEAD_BASE} w-[10%]`}>Audience</th>
            <th className={`${THEAD_BASE} w-[10%] !text-right`}>Views</th>
            <th className={`${THEAD_BASE} w-[14%]`}>Published</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <IcmMemoRow key={row.id} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
