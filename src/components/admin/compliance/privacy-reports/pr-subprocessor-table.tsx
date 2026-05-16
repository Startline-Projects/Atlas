import { PrCompliancePill } from './pr-compliance-pill';
import type { PrSubprocessorRow } from '@/lib/mock-data/admin/privacy-reports-data';

interface PrSubprocessorTableProps {
  rows: PrSubprocessorRow[];
}

export function PrSubprocessorTable({ rows }: PrSubprocessorTableProps) {
  return (
    <table className="w-full border-collapse text-[12.5px]">
      <thead>
        <tr>
          <th className="text-left py-[10px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold w-[32%]">
            Vendor
          </th>
          <th className="text-left py-[10px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold w-[16%]">
            Location
          </th>
          <th className="text-left py-[10px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold w-[18%]">
            DPA on file
          </th>
          <th className="text-left py-[10px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold w-[18%]">
            Last review
          </th>
          <th className="text-left py-[10px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold w-[16%]">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx} className="hover:bg-[var(--paper-deep)] transition-colors cursor-pointer">
            <td className="py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-top">
              <div className="flex items-center gap-[10px]">
                <div
                  className="w-[30px] h-[30px] rounded-[6px] grid place-items-center font-display text-[11px] font-bold text-[var(--paper)] flex-shrink-0 tracking-[-0.01em]"
                  style={{ background: row.logoGradient }}
                >
                  {row.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-bold text-[var(--ink)] tracking-[-0.01em]">{row.name}</div>
                  <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
                    {row.purpose}
                  </div>
                </div>
              </div>
            </td>
            <td className="py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-top font-mono text-[11px] font-semibold text-[var(--ink-soft)] tracking-[0.04em]">
              {row.location}
            </td>
            <td className="py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-top font-mono text-[11px] font-semibold text-[var(--ink-soft)] tracking-[0.02em]">
              {row.dpa}
            </td>
            <td className={`py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-top font-mono text-[11px] font-semibold tracking-[0.02em] ${row.reviewWarn ? 'text-[var(--amber)] font-bold' : 'text-[var(--ink-soft)]'}`}>
              {row.reviewDate}
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
