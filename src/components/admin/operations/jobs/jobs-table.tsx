'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type {
  JobListRow,
  JobStatusPillVariant,
  JobOwnerVariant,
} from '@/lib/mock-data/admin/job-profiles-data';
import { cn } from '@/lib/utils/cn';

interface JobsTableProps {
  rows: JobListRow[];
}

const GRID_COLUMNS = '28px 2.4fr 1.4fr 0.9fr 1fr 0.9fr 0.9fr 1fr 28px';

// admin.html lines 10366-10406 — 7 status pill variants
function statusPillClass(variant: JobStatusPillVariant): string {
  switch (variant) {
    case 'job-open':
    case 'job-filled':
      return 'bg-[var(--success-bg)] text-[var(--success)]';
    case 'job-shortlisted':
      return 'bg-[rgba(110,63,224,0.12)] text-[var(--super)]';
    case 'job-sourcing':
      return 'bg-[var(--lime)] text-[var(--ink)]';
    case 'job-paused':
      return 'bg-[var(--amber-bg)] text-[var(--amber)]';
    case 'job-closed':
      return 'bg-[var(--cream-deep)] text-[var(--ink-mute)]';
    case 'job-investigate':
      return 'bg-[var(--danger-bg)] text-[var(--danger)]';
  }
}

// admin.html lines 10374-10406 — ::before symbols
function statusPillPrefix(variant: JobStatusPillVariant): string | null {
  switch (variant) {
    case 'job-shortlisted': return '★';
    case 'job-filled': return '✓';
    case 'job-investigate': return '⚑';
    default: return null;
  }
}

// admin.html lines 9447-9461 — owner-chip dot gradients per initials
function ownerDotGradient(variant: JobOwnerVariant): string {
  switch (variant) {
    case 'dk': return 'linear-gradient(135deg, #7BA8D9, #3F6CA1)';
    case 'mv': return 'linear-gradient(135deg, #C9783F, #6E3818)';
    case 'lc': return 'linear-gradient(135deg, #F0CC4F, #E8911E)';
    case 'sr': return 'linear-gradient(135deg, #C2A8E8, #8B5FB8)';
    case 'im': return 'linear-gradient(135deg, #9CC9C2, #4D8A82)';
    case 'at': return 'linear-gradient(135deg, #DCA294, #8B4F47)';
  }
}

const COLUMN_HEADS = [
  'Job · Client',
  'Category',
  'Posted',
  'Status',
  'Interest',
  'Hires',
  'Owner',
];

export function JobsTable({ rows }: JobsTableProps) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelected = (rowId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(rowId)) next.delete(rowId);
      else next.add(rowId);
      return next;
    });
  };

  const handleRowClick = (e: React.MouseEvent<HTMLDivElement>, rowId: string) => {
    const target = e.target as HTMLElement;
    if (target.closest('[data-row-select]') || target.closest('button') || target.closest('input')) {
      return;
    }
    router.push(`/admin/operations/jobs/${rowId}`);
  };

  return (
    // admin.html line 22361: .job-table-wrap
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-x-auto">
      <div className="grid min-w-[1180px]">
        {/* Head */}
        <div
          role="row"
          className="grid items-center gap-0 py-0 px-[14px] border-b border-[var(--line)] bg-[var(--paper-deep)]"
          style={{ gridTemplateColumns: GRID_COLUMNS }}
        >
          <div />
          {COLUMN_HEADS.map((label, idx) => (
            <div
              key={idx}
              role="columnheader"
              className={cn(
                'font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold py-[11px] px-[8px] whitespace-nowrap',
                label === 'Interest' && 'cursor-pointer hover:text-[var(--ink)]'
              )}
            >
              {label}
            </div>
          ))}
          <div role="columnheader" aria-label="Actions" />
        </div>

        {/* Body rows */}
        {rows.map((row) => {
          const isSelected = selectedIds.has(row.id);
          return (
          <div
            key={row.id}
            role="row"
            aria-selected={isSelected}
            data-job-row={row.id}
            data-job-status={row.status}
            data-job-cat={row.category}
            onClick={(e) => handleRowClick(e, row.id)}
            className={cn(
              // admin.html line 4630-4639: .table-row.selected — lime tint bg + 2px lime-deep left accent stripe via ::before
              'grid items-center gap-0 py-[12px] px-[14px] border-b border-[var(--line-soft)] last:border-b-0 cursor-pointer transition-colors duration-[120ms] ease relative',
              isSelected
                ? "bg-[rgba(214,242,77,0.10)] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-[var(--lime-deep)]"
                : row.rowVariant === 'investigate'
                  ? 'bg-[rgba(194,65,43,0.04)] hover:bg-[rgba(194,65,43,0.08)]'
                  : 'hover:bg-[#FCF9F1]',
              row.rowVariant === 'filled' && !isSelected && 'opacity-[0.85]'
            )}
            style={{ gridTemplateColumns: GRID_COLUMNS }}
          >
            {/* Checkbox */}
            <div className="flex items-center justify-center">
              <input
                type="checkbox"
                data-row-select
                checked={isSelected}
                aria-label="Select row"
                onClick={(e) => e.stopPropagation()}
                onChange={() => toggleSelected(row.id)}
                className="w-[14px] h-[14px] cursor-pointer accent-[var(--ink)]"
              />
            </div>

            {/* td-job-title */}
            <div className="flex flex-col gap-[2px] min-w-0 px-[8px]">
              <div className="text-[13.5px] font-semibold text-[var(--ink)] tracking-[-0.01em] whitespace-nowrap overflow-hidden text-ellipsis">
                {row.title}
              </div>
              <div
                className={cn(
                  'font-mono text-[10.5px] tracking-[0.02em] whitespace-nowrap overflow-hidden text-ellipsis',
                  row.jtClientIsReal
                    ? 'text-[var(--super)] font-semibold'
                    : 'text-[var(--ink-mute)]'
                )}
              >
                {row.client.name}
                {row.client.realLegalEntity && ` · REAL: ${row.client.realLegalEntity}`}
                {row.client.flagAndLocation && ` · ${row.client.flagAndLocation}`}
              </div>
            </div>

            {/* Category */}
            <div className="px-[8px] text-[12.5px] text-[var(--ink)] whitespace-nowrap overflow-hidden text-ellipsis min-w-0">
              {row.categoryLabel}
              <span className="block font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px] font-normal">
                {row.categorySub}
              </span>
            </div>

            {/* Posted */}
            <div className="px-[8px] font-mono text-[11.5px] text-[var(--ink-soft)] tracking-[0.02em] whitespace-nowrap overflow-hidden text-ellipsis">
              {row.postedDate}
              <span className="block font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px] font-normal">
                {row.postedRelative}
              </span>
            </div>

            {/* Status pill */}
            <div className="px-[8px]">
              <span
                className={cn(
                  'inline-flex items-center gap-[5px] py-[3px] pl-[8px] pr-[9px] rounded-full font-mono text-[9.5px] tracking-[0.1em] uppercase font-semibold whitespace-nowrap',
                  statusPillClass(row.statusPillVariant)
                )}
              >
                {statusPillPrefix(row.statusPillVariant) && (
                  <span aria-hidden="true" className={row.statusPillVariant === 'job-filled' ? 'font-bold' : ''}>
                    {statusPillPrefix(row.statusPillVariant)}
                  </span>
                )}
                {row.statusPillText}
              </span>
            </div>

            {/* Interest mini-bar */}
            <div className="px-[8px] min-w-0">
              <span className="inline-flex items-baseline gap-[5px]">
                <span className="font-display text-[16px] font-medium text-[var(--ink)] tracking-[-0.01em] [font-variant-numeric:tabular-nums]">
                  {row.interestNum}
                </span>
                <span className="w-[36px] h-[4px] rounded-[2px] bg-[var(--cream-deep)] relative overflow-hidden ml-[4px]">
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 bottom-0 bg-[var(--success)] rounded-[2px]"
                    style={{ width: `${row.interestFillPct}%` }}
                  />
                </span>
              </span>
              <span className="block font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px] font-normal">
                {row.interestSub}
              </span>
            </div>

            {/* Hires */}
            <div className="px-[8px] text-[12.5px] text-[var(--ink)] whitespace-nowrap overflow-hidden text-ellipsis">
              <span
                className={cn(
                  'font-semibold [font-variant-numeric:tabular-nums]',
                  row.hiresVariant === 'success' ? 'text-[var(--success)]' : 'text-[var(--ink-mute)]'
                )}
              >
                {row.hiresLabel}
              </span>
              <span className="block font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px] font-normal">
                {row.hiresSub}
              </span>
            </div>

            {/* Owner chip */}
            <div className="px-[8px]">
              <span className="inline-flex items-center gap-[5px] text-[11.5px] text-[var(--ink-soft)] whitespace-nowrap">
                <span
                  aria-hidden="true"
                  className="w-[16px] h-[16px] rounded-full font-display text-[8px] text-[var(--paper)] grid place-items-center font-medium"
                  style={{ background: ownerDotGradient(row.owner.variant) }}
                >
                  {row.owner.initials}
                </span>
                {row.owner.name}
              </span>
            </div>

            {/* Row actions */}
            <div>
              <button
                type="button"
                aria-label="Row actions"
                data-job-action="row-menu"
                onClick={(e) => {
                  e.stopPropagation();
                  // eslint-disable-next-line no-console
                  console.log(`[job-row-menu] clicked for ${row.id}`);
                }}
                className="w-[28px] h-[28px] grid place-items-center bg-transparent border-0 rounded-full text-[var(--ink-mute)] cursor-pointer transition-[background,color] duration-[120ms] ease hover:bg-[var(--cream-deep)] hover:text-[var(--ink)]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </button>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}
