/* admin.html lines 63102-63110: linked context card — fr-quickstats pattern hand-translated (forbidden prefixes).
   h3 eyebrow + N rows (label / value with optional inline <a> cross-links to other steps). */

import type { TmLinkedContextData } from '@/lib/mock-data/admin/templates-data';

interface TmLinkedContextProps {
  data: TmLinkedContextData;
}

export function TmLinkedContext({ data }: TmLinkedContextProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[18px] px-[20px]">
      <h3 className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold m-0 mb-[14px]">
        {data.headTitle}
      </h3>
      <div className="flex flex-col">
        {data.rows.map((row, idx) => (
          <div
            key={idx}
            className="flex justify-between items-baseline gap-[12px] py-[8px] border-b border-dashed border-[var(--line-soft)] last:border-b-0 text-[12.5px]"
          >
            <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
              {row.label}
            </span>
            <span
              className="font-body font-semibold tracking-[-0.01em] text-right text-[var(--ink)] [&_a]:text-[var(--super)] [&_a]:underline [&_a]:font-bold [&_a]:cursor-pointer"
              dangerouslySetInnerHTML={{ __html: row.valueHtml }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
