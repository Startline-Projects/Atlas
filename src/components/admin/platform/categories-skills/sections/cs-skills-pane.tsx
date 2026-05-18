/* admin.html lines 61006-61228: complete skills pane with consolidation alert + toolbar + table + footer */

import { CsConsolidationAlert } from '../cs-consolidation-alert';
import { CsSkillToolbar } from '../cs-skill-toolbar';
import { CsSkillRowComponent } from '../cs-skill-row';
import type {
  CsConsolidationData,
  CsSkillFilter,
  CsSkillRow,
} from '@/lib/mock-data/admin/categories-skills-data';

interface CsSkillsPaneProps {
  consolidation: CsConsolidationData;
  filters: CsSkillFilter[];
  searchPlaceholder: string;
  rows: CsSkillRow[];
  footerMeta: string;
  loadMoreLabel: string;
}

export function CsSkillsPane({
  consolidation,
  filters,
  searchPlaceholder,
  rows,
  footerMeta,
  loadMoreLabel,
}: CsSkillsPaneProps) {
  return (
    <>
      {/* Consolidation alert */}
      <CsConsolidationAlert data={consolidation} />

      {/* Toolbar */}
      <CsSkillToolbar searchPlaceholder={searchPlaceholder} filters={filters} />

      {/* Table */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden mb-[18px]">
        <table className="w-full border-collapse-separate border-spacing-0 text-[12.5px]">
          <thead>
            <tr>
              <th className="text-left py-[12px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold" style={{ width: '32%' }}>
                Skill
              </th>
              <th className="text-left py-[12px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold" style={{ width: '22%' }}>
                Role families
              </th>
              <th className="text-right py-[12px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold" style={{ width: '14%' }}>
                Candidates
              </th>
              <th className="text-left py-[12px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold" style={{ width: '12%' }}>
                Trend Q2
              </th>
              <th className="text-left py-[12px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold" style={{ width: '10%' }}>
                Status
              </th>
              <th className="text-right py-[12px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold" style={{ width: '10%' }}>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <CsSkillRowComponent key={row.id} row={row} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between py-[14px] flex-wrap gap-[12px]">
        <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
          {footerMeta}
        </span>
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] cursor-pointer transition-all whitespace-nowrap"
        >
          {loadMoreLabel}
        </button>
      </div>
    </>
  );
}
