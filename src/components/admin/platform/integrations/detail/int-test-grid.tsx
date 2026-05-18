/* admin.html lines 62142-62167: test panel with 3 test cells (connectivity / end-to-end / webhook) */

import type { IntTestCell } from '@/lib/mock-data/admin/integrations-data';

interface IntTestGridProps {
  cells: IntTestCell[];
}

export function IntTestGrid({ cells }: IntTestGridProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      <div className="grid grid-cols-3 gap-0 max-[720px]:grid-cols-1">
        {cells.map((cell, idx) => (
          <TestCell key={idx} cell={cell} />
        ))}
      </div>
    </div>
  );
}

function TestCell({ cell }: { cell: IntTestCell }) {
  return (
    <div className="py-[16px] px-[18px] border-r border-r-[var(--line-soft)] last:border-r-0 max-[720px]:!border-r-0 max-[720px]:border-b max-[720px]:border-b-[var(--line-soft)] max-[720px]:last:border-b-0">
      <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[6px]">
        {cell.label}
      </div>
      <div className="font-display text-[14px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[4px] leading-[1.3]">
        {cell.title}
      </div>
      <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.55] mb-[10px]">
        {cell.description}
      </div>
      <button
        type="button"
        className="w-full inline-flex items-center justify-center gap-[6px] py-[7px] px-[12px] font-mono text-[11.5px] font-bold tracking-[0.04em] uppercase rounded-full bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] cursor-pointer transition-all whitespace-nowrap"
      >
        {cell.buttonLabel}
      </button>
    </div>
  );
}
