/* admin.html lines 61064-61219: single skill table row with 6 columns */

import { CsSkillFlag } from './cs-skill-flag';
import type { CsSkillRow } from '@/lib/mock-data/admin/categories-skills-data';

interface CsSkillRowProps {
  row: CsSkillRow;
}

export function CsSkillRowComponent({ row }: CsSkillRowProps) {
  return (
    <tr className={`cursor-pointer transition-colors hover:bg-[var(--paper-deep)] ${row.duplicateWarn ? 'bg-[rgba(232,118,58,0.04)]' : ''}`}>
      {/* COL 1: Skill name + aliases */}
      <td className={`font-bold text-[var(--ink)] tracking-[-0.01em] text-[13px] py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle ${row.duplicateWarn ? 'border-l-[3px] border-l-[var(--amber)]' : ''}`}>
        {row.name}
        {row.aliasesHtml && (
          <span
            className="block mt-[3px] font-mono text-[10px] text-[var(--ink-mute)] font-medium tracking-[0.02em]"
            dangerouslySetInnerHTML={{ __html: row.aliasesHtml }}
          />
        )}
      </td>

      {/* COL 2: Category chips */}
      <td className="font-mono text-[10.5px] text-[var(--ink-soft)] tracking-[0.02em] font-semibold py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle">
        {row.categoryChips.map((chip, idx) => (
          <span
            key={idx}
            className="inline-block py-[2px] px-[7px] bg-[var(--paper-deep)] border border-[var(--line-soft)] rounded-[3px] text-[var(--ink-soft)] font-bold text-[10px] mr-[4px] mb-[2px]"
          >
            {chip}
          </span>
        ))}
      </td>

      {/* COL 3: Candidate count + meta */}
      <td className="font-mono text-[12.5px] font-bold text-[var(--ink)] tracking-[0.02em] tabular-nums text-right py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle">
        {row.count}
        <span className="block text-[9.5px] font-medium text-[var(--ink-mute)] tracking-[0.04em] mt-[2px]">
          {row.countMetaText}
        </span>
      </td>

      {/* COL 4: Trend */}
      <td
        className={`font-mono text-[11px] tracking-[0.04em] font-bold py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle ${
          row.trend === 'up' ? 'text-[var(--success)]' : row.trend === 'down' ? 'text-[var(--danger)]' : 'text-[var(--ink-mute)]'
        }`}
      >
        {row.trendLabel}
      </td>

      {/* COL 5: Flag (merge/archive) */}
      <td className="py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle">
        {row.flag && row.flagLabel && (
          <CsSkillFlag variant={row.flag} label={row.flagLabel} style={row.flagStyle} />
        )}
      </td>

      {/* COL 6: Action button */}
      <td className="text-right py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle">
        {row.actionLabel && (
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] cursor-pointer transition-all whitespace-nowrap"
          >
            {row.actionLabel}
          </button>
        )}
      </td>
    </tr>
  );
}
