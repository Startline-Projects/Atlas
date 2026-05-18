/* admin.html lines 62353-62373: fr-quickstats card — h3 + N fr-qs-row rows + optional footer disclaimer */

import type { IntQuickstatsCardData } from '@/lib/mock-data/admin/integrations-data';

interface IntQuickstatsProps {
  data: IntQuickstatsCardData;
}

export function IntQuickstats({ data }: IntQuickstatsProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[18px] px-[20px]">
      <h3 className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold m-0 mb-[14px]">
        {data.title}
      </h3>

      <div className="flex flex-col">
        {data.rows.map((row, idx) => {
          const valueColor =
            row.valueVariant === 'success'
              ? 'text-[var(--success)]'
              : row.valueVariant === 'warn'
              ? 'text-[var(--amber)]'
              : row.valueVariant === 'danger'
              ? 'text-[var(--danger)]'
              : 'text-[var(--ink)]';
          return (
            <div
              key={idx}
              className="flex justify-between items-baseline gap-[12px] py-[8px] border-b border-dashed border-[var(--line-soft)] last:border-b-0 text-[12.5px]"
            >
              <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
                {row.label}
              </span>
              <span
                className={`font-body font-semibold tracking-[-0.01em] text-right [&_a]:underline [&_a]:cursor-pointer [&_a]:!text-[var(--ink)] ${valueColor}`}
                dangerouslySetInnerHTML={{ __html: row.valueHtml }}
              />
            </div>
          );
        })}
      </div>

      {data.footerHtml && (
        <div
          className="mt-[10px] pt-[10px] border-t border-dashed border-[var(--line-soft)] font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.55] [&_a]:text-[var(--super)] [&_a]:underline [&_a]:font-bold [&_a]:cursor-pointer"
          dangerouslySetInnerHTML={{ __html: data.footerHtml }}
        />
      )}
    </div>
  );
}
