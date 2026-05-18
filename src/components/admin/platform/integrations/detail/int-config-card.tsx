/* admin.html lines 62043-62127: config card with 6 rows (label/value+pills/meta/action) — see Group I */

import type { IntConfigRow } from '@/lib/mock-data/admin/integrations-data';

interface IntConfigCardProps {
  rows: IntConfigRow[];
}

export function IntConfigCard({ rows }: IntConfigCardProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      {rows.map((row, idx) => (
        <ConfigRow key={idx} row={row} />
      ))}
    </div>
  );
}

function ConfigRow({ row }: { row: IntConfigRow }) {
  const actionClasses =
    row.action?.variant === 'warn'
      ? 'bg-[var(--amber)] border-[var(--amber)] text-[var(--paper)] hover:bg-[var(--amber-deep,#C7642E)]'
      : 'bg-[var(--paper)] border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]';

  return (
    <div className="grid grid-cols-[200px_minmax(0,1fr)_130px] gap-[14px] items-start py-[14px] px-[20px] border-b border-b-[var(--line-soft)] last:border-b-0 max-[720px]:grid-cols-1 max-[720px]:gap-[8px] max-[720px]:px-[16px]">
      {/* Label + label meta */}
      <div className="font-mono text-[11px] font-bold tracking-[0.04em] uppercase text-[var(--ink-mute)]">
        {row.label}
        {row.labelMeta && (
          <span className="block mt-[4px] normal-case font-medium text-[10px] text-[var(--ink-mute)] tracking-[0.02em]">
            {row.labelMeta}
          </span>
        )}
      </div>

      {/* Value + inline pills + meta */}
      <div>
        <div
          className="font-mono text-[12.5px] text-[var(--ink)] font-semibold tracking-[0.02em] break-all leading-[1.4] [&_[data-mask]]:text-[var(--ink-mute)] [&_[data-mask]]:tracking-[0.06em] [&_[data-mask]]:select-none [&_[data-pill]]:inline-flex [&_[data-pill]]:items-center [&_[data-pill]]:gap-[4px] [&_[data-pill]]:text-[9.5px] [&_[data-pill]]:tracking-[0.1em] [&_[data-pill]]:uppercase [&_[data-pill]]:font-bold [&_[data-pill]]:py-[2px] [&_[data-pill]]:px-[7px] [&_[data-pill]]:bg-[var(--paper-deep)] [&_[data-pill]]:border [&_[data-pill]]:border-[var(--line-soft)] [&_[data-pill]]:rounded-[3px] [&_[data-pill]]:text-[var(--ink-soft)] [&_[data-pill]]:ml-[6px] [&_[data-pill='success']]:bg-[var(--success-bg)] [&_[data-pill='success']]:!text-[var(--success)] [&_[data-pill='success']]:border-[rgba(46,125,84,0.3)] [&_[data-pill='danger']]:bg-[var(--danger-bg)] [&_[data-pill='danger']]:!text-[var(--danger)] [&_[data-pill='danger']]:border-[rgba(194,65,43,0.3)]"
          dangerouslySetInnerHTML={{ __html: row.valueHtml }}
        />
        {row.metaHtml && (
          <div
            className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[5px] leading-[1.55] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold [&_a]:text-[var(--super)] [&_a]:underline [&_a]:font-bold [&_a]:cursor-pointer"
            dangerouslySetInnerHTML={{ __html: row.metaHtml }}
          />
        )}
      </div>

      {/* Action button */}
      {row.action && (
        <div className="inline-flex gap-[4px] flex-shrink-0 max-[720px]:justify-self-end">
          <button
            type="button"
            className={`inline-flex items-center gap-[6px] py-[5px] px-[10px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full border cursor-pointer transition-all whitespace-nowrap ${actionClasses}`}
          >
            {row.action.label}
          </button>
        </div>
      )}
    </div>
  );
}
