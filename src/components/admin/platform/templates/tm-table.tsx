/* admin.html lines 62481-62693: template table wrap + thead (7 cols) + tbody (N rows) */

import { TmTableRow } from './tm-table-row';
import type { TmTemplate } from '@/lib/mock-data/admin/templates-data';

interface TmTableProps {
  templates: TmTemplate[];
}

export function TmTable({ templates }: TmTableProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      <table className="w-full border-separate border-spacing-0 text-[12.5px]">
        <thead>
          <tr>
            <th className="text-left py-[12px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold" style={{ width: '28%' }}>
              Template
            </th>
            <th className="text-left py-[12px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold" style={{ width: '24%' }}>
              Used in flow
            </th>
            <th className="text-left py-[12px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold" style={{ width: '10%' }}>
              Locales
            </th>
            <th className="text-left py-[12px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold" style={{ width: '14%' }}>
              Last modified
            </th>
            <th className="text-right py-[12px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold" style={{ width: '10%' }}>
              Sends · 30d
            </th>
            <th className="text-left py-[12px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold" style={{ width: '9%' }}>
              Status
            </th>
            <th className="text-right py-[12px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold" style={{ width: '5%' }}>
            </th>
          </tr>
        </thead>
        <tbody>
          {templates.map((tpl) => (
            <TmTableRow key={tpl.id} template={tpl} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
