'use client';

import { useRouter } from 'next/navigation';
import type { EngagementListRow, EngagementStatus, EngagementOwnerVariant } from '@/lib/mock-data/admin/engagement-profiles-data';
import { cn } from '@/lib/utils/cn';

interface EngagementsTableProps {
  rows: EngagementListRow[];
}

const GRID_COLUMNS = '28px 2fr 1.6fr 1.4fr 1fr 1fr 1.1fr 1.2fr 1fr 28px';

// admin.html lines 9292-9325 — status pill variants
function statusPillClass(status: EngagementStatus): string {
  switch (status) {
    case 'active':
      return 'bg-[var(--success-bg)] text-[var(--success)]';
    case 'paused':
      return 'bg-[var(--amber-bg)] text-[var(--amber)]';
    case 'dispute':
      return 'bg-[var(--danger-bg)] text-[var(--danger)]';
    case 'cancelled':
      return 'bg-[var(--cream-deep)] text-[var(--ink-mute)] line-through';
    case 'completed':
      return 'bg-[rgba(110,63,224,0.12)] text-[var(--super)]';
  }
}

function statusPillLabel(status: EngagementStatus): string {
  switch (status) {
    case 'active': return 'Active';
    case 'paused': return 'Paused';
    case 'dispute': return 'In dispute';
    case 'cancelled': return 'Cancelled';
    case 'completed': return 'Completed';
  }
}

// admin.html lines 9450-9461 — owner-chip dot gradients per initials
function ownerDotGradient(variant: EngagementOwnerVariant): string {
  switch (variant) {
    case 'dk': return 'linear-gradient(135deg, #7BA8D9, #3F6CA1)';
    case 'mv': return 'linear-gradient(135deg, #C9783F, #6E3818)';
    case 'lc': return 'linear-gradient(135deg, #F0CC4F, #E8911E)';
    case 'sr': return 'linear-gradient(135deg, #C2A8E8, #8B5FB8)';
  }
}

const COLUMN_HEADS = [
  'Client / Candidate',
  'Role',
  'Started',
  'Rate',
  'Hours/wk',
  'Paid to date',
  'Status',
  'Owner',
];

export function EngagementsTable({ rows }: EngagementsTableProps) {
  const router = useRouter();

  const handleRowClick = (e: React.MouseEvent<HTMLDivElement>, rowId: string) => {
    const target = e.target as HTMLElement;
    if (target.closest('[data-row-select]') || target.closest('button') || target.closest('input')) {
      return;
    }
    router.push(`/admin/operations/engagements/${rowId}`);
  };

  return (
    // admin.html line 21442: eng-table-wrap
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-x-auto">
      <div className="grid min-w-[1100px]">
        {/* Table head */}
        <div
          role="row"
          className="grid items-center gap-0 py-0 px-[14px] border-b border-[var(--line)] bg-[var(--paper-deep)]"
          style={{ gridTemplateColumns: GRID_COLUMNS }}
        >
          <div className="th-checkbox" />
          {COLUMN_HEADS.map((label, idx) => (
            <div
              key={idx}
              role="columnheader"
              className={cn(
                'font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold py-[11px] px-[8px] whitespace-nowrap',
                (label === 'Rate' || label === 'Paid to date') && 'cursor-pointer hover:text-[var(--ink)]'
              )}
            >
              {label}
            </div>
          ))}
          <div role="columnheader" aria-label="Actions" />
        </div>

        {/* Body rows */}
        {rows.map((row) => (
          <div
            key={row.id}
            role="row"
            data-eng-row={row.id}
            data-eng-status={row.status}
            data-eng-type={row.type}
            onClick={(e) => handleRowClick(e, row.id)}
            className={cn(
              'grid items-center gap-0 py-[12px] px-[14px] border-b border-[var(--line-soft)] last:border-b-0 cursor-pointer transition-colors duration-[120ms] ease',
              row.status === 'dispute'
                ? 'bg-[rgba(194,65,43,0.04)] hover:bg-[rgba(194,65,43,0.08)]'
                : 'hover:bg-[#FCF9F1]'
            )}
            style={{ gridTemplateColumns: GRID_COLUMNS }}
          >
            {/* Checkbox */}
            <div className="flex items-center justify-center">
              <input
                type="checkbox"
                data-row-select
                aria-label="Select row"
                onClick={(e) => e.stopPropagation()}
                className="w-[14px] h-[14px] cursor-pointer accent-[var(--ink)]"
              />
            </div>

            {/* td-pair Client / Candidate */}
            <div className="flex flex-col gap-[2px] min-w-0 px-[8px]">
              <div className="text-[13px] font-semibold text-[var(--ink)] tracking-[-0.01em] whitespace-nowrap overflow-hidden text-ellipsis">
                {row.client.displayName}
                <span className="text-[var(--ink-mute)] font-normal mx-[6px]">↔</span>
                {row.candidate.name}
              </div>
              {row.pairSecondaryNote && (
                <div
                  className={cn(
                    'font-mono text-[10.5px] tracking-[0.02em] whitespace-nowrap overflow-hidden text-ellipsis',
                    row.pairSecondaryReal
                      ? 'text-[var(--super)] font-semibold'
                      : 'text-[var(--ink-mute)]'
                  )}
                >
                  {row.pairSecondaryNote}
                </div>
              )}
            </div>

            {/* Role */}
            <div className="px-[8px] text-[12.5px] text-[var(--ink)] whitespace-nowrap overflow-hidden text-ellipsis min-w-0">
              {row.role}
              <span className="block font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px] font-normal">
                {row.roleSub}
              </span>
            </div>

            {/* Started */}
            <div className="px-[8px] font-mono text-[11.5px] text-[var(--ink-soft)] tracking-[0.02em] whitespace-nowrap overflow-hidden text-ellipsis">
              {row.startedDate}
              <span className="block font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px] font-normal">
                {row.startedRelative}
              </span>
            </div>

            {/* Rate */}
            <div className="px-[8px] text-[12.5px] text-[var(--ink)] whitespace-nowrap overflow-hidden text-ellipsis">
              <span className="font-semibold [font-variant-numeric:tabular-nums]">{row.rateValue}</span>
              <span className="block font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px] font-normal">
                {row.rateSuffix}
              </span>
            </div>

            {/* Hours/wk */}
            <div className="px-[8px] font-mono text-[11.5px] text-[var(--ink-soft)] tracking-[0.02em] whitespace-nowrap">
              {row.hoursLabel}
            </div>

            {/* Paid to date */}
            <div className="px-[8px] text-[12.5px] text-[var(--ink)] whitespace-nowrap overflow-hidden text-ellipsis">
              <span
                className={cn(
                  'font-semibold [font-variant-numeric:tabular-nums]',
                  row.paidSuccess && 'text-[var(--success)]'
                )}
              >
                {row.paidValue}
              </span>
              <span className="block font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px] font-normal">
                {row.paidSub}
              </span>
            </div>

            {/* Status pill */}
            <div className="px-[8px]">
              <span
                className={cn(
                  'inline-flex items-center gap-[5px] py-[3px] pl-[8px] pr-[9px] rounded-full font-mono text-[9.5px] tracking-[0.1em] uppercase font-semibold whitespace-nowrap',
                  statusPillClass(row.status)
                )}
              >
                {row.status === 'active' && (
                  <span
                    aria-hidden="true"
                    className="w-[6px] h-[6px] rounded-full bg-[var(--success)] inline-block flex-shrink-0 animate-pulse"
                  />
                )}
                {statusPillLabel(row.status)}
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
                data-eng-action="row-menu"
                onClick={(e) => {
                  e.stopPropagation();
                  // eslint-disable-next-line no-console
                  console.log(`[engagement-row-menu] clicked for ${row.id}`);
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
        ))}
      </div>
    </div>
  );
}
