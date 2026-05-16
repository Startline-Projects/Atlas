import { PrCompliancePill } from './pr-compliance-pill';
import type { PrRetentionRow } from '@/lib/mock-data/admin/privacy-reports-data';

interface PrRetentionTableProps {
  rows: PrRetentionRow[];
}

export function PrRetentionTable({ rows }: PrRetentionTableProps) {
  return (
    <table className="w-full border-collapse text-[12.5px]">
      <thead>
        <tr>
          <th className="text-left py-[10px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold w-[30%]">
            Data category
          </th>
          <th className="text-left py-[10px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold w-[25%]">
            Retention period
          </th>
          <th className="text-left py-[10px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold w-[15%]">
            Records
          </th>
          <th className="text-left py-[10px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold w-[15%]">
            Last verified
          </th>
          <th className="text-left py-[10px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold w-[15%]">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx} className="hover:bg-[var(--paper-deep)] transition-colors">
            <td className="py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-top">
              <div className="font-bold text-[var(--ink)] tracking-[-0.01em]">{row.category}</div>
              <div className="font-mono text-[10px] font-medium text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
                {row.categoryMeta}
              </div>
            </td>
            <td className="py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-top font-mono text-[11.5px] text-[var(--ink-soft)] font-semibold tracking-[0.02em]">
              {row.retention}
            </td>
            <td className="py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-top font-mono text-[12px] text-[var(--ink)] font-bold tracking-[0.02em] tabular-nums">
              {row.records}
            </td>
            <td className="py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-top font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
              {row.verified}
            </td>
            <td className="py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-top">
              <PrCompliancePill variant={row.status} label={row.statusLabel} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
