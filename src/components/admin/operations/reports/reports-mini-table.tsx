/**
 * Phase 14a · extended 14b — Compact data-table for inline tables.
 *
 * admin.html CSS: L14762-14796
 * 14b extension: per-cell isBodyFont / isMuted / strong / href flags
 * (used for the Tab 3 specialist ranking table)
 */
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import type {
  ReportsMiniTable,
  ReportsMiniTableCell,
  MiniTableCellVariant,
} from '@/lib/mock-data/admin/reports-analytics-data';

interface ReportsMiniTableProps {
  table: ReportsMiniTable;
  className?: string;
}

function cellVariantClass(v: MiniTableCellVariant | undefined): string {
  switch (v) {
    case 'warn':    return 'text-[var(--amber)]';
    case 'danger':  return 'text-[var(--danger)]';
    case 'success': return 'text-[var(--success)]';
    case 'default':
    default:        return 'text-[var(--ink)]';
  }
}

interface CellProps {
  cell: ReportsMiniTableCell;
  isHead: boolean;
}

function Cell({ cell, isHead }: CellProps) {
  const className = cn(
    // num cells right-align + tabular-nums + 600
    cell.isNum && 'text-right font-semibold [font-variant-numeric:tabular-nums]',
    // num variant color only when not head
    cell.isNum && !isHead && cellVariantClass(cell.variant),
    // body-font swap (override the default mono inherited from .rep-mini-table wrapper)
    cell.isBodyFont && '[font-family:var(--font-body)] text-[12.5px] tracking-[-0.01em]',
    // strong override
    cell.strong && 'font-semibold',
    // muted override (wins over default ink for both num + non-num cells)
    cell.isMuted && '!text-[var(--ink-mute)]'
  );

  // When href + not head, render as Link with subtle hover
  if (cell.href && !isHead) {
    return (
      <div className={className}>
        <Link
          href={cell.href}
          className="text-[var(--ink)] no-underline hover:underline hover:decoration-[var(--ink-mute)] hover:underline-offset-[3px] transition-colors"
        >
          {cell.text}
        </Link>
      </div>
    );
  }

  return <div className={className}>{cell.text}</div>;
}

export function ReportsMiniTableEl({ table, className }: ReportsMiniTableProps) {
  return (
    <div
      className={cn(
        // rep-mini-table — L14762-14769
        'font-mono text-[11.5px] border border-[var(--line)] rounded-[var(--r-sm)] overflow-hidden grid',
        className
      )}
    >
      {table.rows.map((row, ridx) => {
        const isHead = !!row.isHead;
        return (
          <div
            key={ridx}
            className={cn(
              'grid items-baseline py-[8px] px-[12px] gap-[10px] border-b border-[var(--line-soft)] last:border-b-0',
              isHead && 'bg-[var(--paper-deep)] text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold !border-b-[var(--line)]'
            )}
            style={{ gridTemplateColumns: table.gridTemplateColumns }}
          >
            {row.cells.map((cell, cidx) => (
              <Cell key={cidx} cell={cell} isHead={isHead} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
