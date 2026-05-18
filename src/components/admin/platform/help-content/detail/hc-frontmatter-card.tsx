/* admin.html lines 63770-63805: frontmatter card — 7 rows (title input / slug input / category text / tags inline chips / locale text / search keywords input / published text) */

import type { HcFrontmatterData, HcFrontmatterRow } from '@/lib/mock-data/admin/help-content-data';

interface HcFrontmatterCardProps {
  frontmatter: HcFrontmatterData;
}

export function HcFrontmatterCard({ frontmatter }: HcFrontmatterCardProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[14px] px-[16px]">
      {frontmatter.rows.map((row, idx) => (
        <FrontmatterRow key={idx} row={row} />
      ))}
    </div>
  );
}

function FrontmatterRow({ row }: { row: HcFrontmatterRow }) {
  return (
    <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-[10px] items-center py-[7px] border-b border-b-dashed border-b-[var(--line-soft)] last:border-b-0 max-[720px]:grid-cols-1 max-[720px]:gap-[4px]">
      <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">
        {row.key}
      </div>
      {row.valueKind === 'input' ? (
        <div>
          <input
            type="text"
            defaultValue={row.valueHtml}
            className="w-full py-[6px] px-[9px] font-mono text-[12px] bg-[var(--paper-deep)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] outline-none transition-colors focus:border-[var(--ink)]"
          />
        </div>
      ) : (
        <div
          className="font-mono text-[12px] text-[var(--ink)] font-semibold tracking-[0.01em] break-words [&_[data-hc-muted-soft]]:text-[var(--ink-mute)] [&_[data-hc-muted-soft]]:font-medium [&_[data-hc-tag-chip]]:inline-flex [&_[data-hc-tag-chip]]:items-center [&_[data-hc-tag-chip]]:gap-[4px] [&_[data-hc-tag-chip]]:py-[2px] [&_[data-hc-tag-chip]]:px-[7px] [&_[data-hc-tag-chip]]:font-mono [&_[data-hc-tag-chip]]:text-[9.5px] [&_[data-hc-tag-chip]]:font-bold [&_[data-hc-tag-chip]]:tracking-[0.04em] [&_[data-hc-tag-chip]]:bg-[var(--paper-deep)] [&_[data-hc-tag-chip]]:border [&_[data-hc-tag-chip]]:border-[var(--line)] [&_[data-hc-tag-chip]]:rounded-[3px] [&_[data-hc-tag-chip]]:!text-[var(--ink-soft)] [&_[data-hc-tag-chip]]:mr-[3px] [&_[data-hc-tag-chip]]:mb-[2px] [&_[data-hc-tag-add]]:border-dashed [&_[data-hc-tag-add]]:cursor-pointer"
          dangerouslySetInnerHTML={{ __html: row.valueHtml }}
        />
      )}
    </div>
  );
}
