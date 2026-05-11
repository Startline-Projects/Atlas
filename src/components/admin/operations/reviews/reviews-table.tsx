'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type {
  ReviewListRow,
  ReviewStatusPillVariant,
  ReviewDirectionChip,
} from '@/lib/mock-data/admin/review-profiles-data';
import { cn } from '@/lib/utils/cn';

interface ReviewsTableProps {
  rows: ReviewListRow[];
}

// admin.html L13015 verbatim grid
const GRID_COLUMNS = '28px 0.85fr 1.4fr 1.4fr 2.2fr 0.95fr 0.85fr 28px';

// admin.html L12930-12970 — status pill variants
function statusPillClass(v: ReviewStatusPillVariant): string {
  switch (v) {
    case 'rv-live': return 'bg-[var(--success-bg)] text-[var(--success)]';
    case 'rv-flagged': return 'bg-[var(--amber-bg)] text-[var(--amber)]';
    case 'rv-pattern': return 'bg-[var(--danger-bg)] text-[var(--danger)]';
    case 'rv-removed': return 'bg-[var(--cream-deep)] text-[var(--ink-mute)] line-through';
    case 'rv-appealed': return 'bg-[rgba(110,63,224,0.12)] text-[var(--super)]';
  }
}

function statusPillPrefix(v: ReviewStatusPillVariant): string | null {
  switch (v) {
    case 'rv-flagged': return '⚑';
    case 'rv-pattern': return '!';
    case 'rv-appealed': return '↩';
    default: return null;
  }
}

// admin.html L13160-13161 — direction chip variants
function directionChipClass(v: ReviewDirectionChip): string {
  return v === 'cs'
    ? 'bg-[rgba(123,168,217,0.15)] text-[#3F6CA1]'
    : 'bg-[rgba(232,145,30,0.15)] text-[#B86C1A]';
}

function directionChipLabel(v: ReviewDirectionChip): string {
  return v === 'cs' ? 'Candidate' : 'Client';
}

// admin.html L12977-12999 — star rating
function StarRating({ rating, danger }: { rating: number; danger: boolean }) {
  const filled = Math.round(rating);
  const filledColor = danger ? 'text-[var(--danger)]' : 'text-[#E8911E]';
  return (
    <span className="inline-flex items-center gap-[1px]">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={cn('text-[13px] leading-none', i <= filled ? filledColor : 'text-[var(--line-strong)]')}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
      <span className="font-mono text-[11px] text-[var(--ink-soft)] ml-[6px] font-semibold">
        {rating.toFixed(1)}
      </span>
    </span>
  );
}

const COLUMN_HEADS = [
  'Review ID',
  'Reviewer',
  'Reviewee · Engagement',
  'Content · Rating',
  'Status',
  'Posted',
];

export function ReviewsTable({ rows }: ReviewsTableProps) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelected = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleRowClick = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const target = e.target as HTMLElement;
    if (target.closest('[data-row-select]') || target.closest('button') || target.closest('input')) {
      return;
    }
    router.push(`/admin/operations/reviews/${id}`);
  };

  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-x-auto">
      <div className="grid min-w-[1200px]">
        {/* Head */}
        <div
          role="row"
          className="grid items-center gap-0 px-[14px] border-b border-[var(--line)] bg-[var(--paper-deep)]"
          style={{ gridTemplateColumns: GRID_COLUMNS }}
        >
          <div />
          {COLUMN_HEADS.map((label, idx) => (
            <div
              key={idx}
              role="columnheader"
              className={cn(
                'font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold py-[11px] px-[8px] whitespace-nowrap',
                label === 'Posted' && 'cursor-pointer hover:text-[var(--ink)]'
              )}
            >
              {label}
            </div>
          ))}
          <div role="columnheader" aria-label="Actions" />
        </div>

        {/* Body */}
        {rows.map((row) => {
          const isSelected = selectedIds.has(row.id);
          const isPattern = row.rowVariant === 'pattern';
          const isFlagged = row.rowVariant === 'flagged';
          const isRemoved = row.rowVariant === 'removed';
          return (
            <div
              key={row.id}
              role="row"
              aria-selected={isSelected}
              data-rev-row={row.id}
              data-rev-status={row.status}
              data-rev-dir={row.direction}
              onClick={(e) => handleRowClick(e, row.id)}
              className={cn(
                'grid items-center gap-0 py-[12px] border-b border-[var(--line-soft)] last:border-b-0 cursor-pointer transition-colors duration-[120ms] ease relative',
                isPattern ? 'pl-[11px] pr-[14px] border-l-[3px] border-l-[var(--danger)]' : 'px-[14px]',
                isRemoved && 'opacity-[0.62]',
                // Background priority (Phase 12a fix pattern)
                isPattern
                  ? (isSelected
                      ? 'bg-[rgba(194,65,43,0.18)] hover:bg-[rgba(194,65,43,0.22)]'
                      : 'bg-[rgba(194,65,43,0.05)] hover:bg-[rgba(194,65,43,0.10)]')
                  : isFlagged
                    ? (isSelected
                        ? 'bg-[rgba(232,118,58,0.14)] hover:bg-[rgba(232,118,58,0.18)]'
                        : 'bg-[rgba(232,118,58,0.04)] hover:bg-[#FCF9F1]')
                    : (isSelected
                        ? 'bg-[rgba(214,242,77,0.10)]'
                        : 'hover:bg-[#FCF9F1]'),
                // Lime stripe only when selected default rows (not pattern/flagged — preserves red priority)
                isSelected && !isPattern && !isFlagged &&
                  "before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-[var(--lime-deep)]"
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

              {/* td-rev-id */}
              <div className="font-mono text-[11px] text-[var(--ink-soft)] font-semibold tracking-[0.02em] px-[8px] whitespace-nowrap overflow-hidden text-ellipsis min-w-0">
                {row.atlasId}
              </div>

              {/* td-rev-author */}
              <div className="flex flex-col gap-[2px] min-w-0 px-[8px] overflow-hidden">
                <div className="text-[13px] font-semibold text-[var(--ink)] tracking-[-0.01em] whitespace-nowrap overflow-hidden text-ellipsis flex items-center gap-[6px]">
                  <span className="overflow-hidden text-ellipsis">{row.reviewer.name}</span>
                  {row.reviewer.directionChip && (
                    <span
                      className={cn(
                        'inline-flex items-center font-mono text-[9.5px] tracking-[0.10em] uppercase py-[2px] px-[6px] rounded-[3px] font-semibold whitespace-nowrap flex-shrink-0',
                        directionChipClass(row.reviewer.directionChip)
                      )}
                    >
                      {directionChipLabel(row.reviewer.directionChip)}
                    </span>
                  )}
                </div>
                <div
                  className={cn(
                    'font-mono text-[10.5px] tracking-[0.02em] whitespace-nowrap overflow-hidden text-ellipsis',
                    row.reviewer.metaIsReal ? 'text-[var(--super)] font-semibold' : 'text-[var(--ink-mute)]'
                  )}
                >
                  {row.reviewer.metaText}
                </div>
              </div>

              {/* td-rev-target */}
              <div className="flex flex-col gap-[2px] min-w-0 px-[8px] overflow-hidden">
                <div className="text-[13px] font-semibold text-[var(--ink)] tracking-[-0.01em] whitespace-nowrap overflow-hidden text-ellipsis">
                  {row.reviewee.name}
                </div>
                <div className="font-mono text-[10.5px] tracking-[0.02em] text-[var(--ink-mute)] whitespace-nowrap overflow-hidden text-ellipsis">
                  {row.reviewee.metaText}
                </div>
              </div>

              {/* td-rev-snippet (content) — 2-line clamp */}
              <div className="px-[10px] pl-[8px] text-[12.5px] text-[var(--ink-soft)] leading-[1.45] italic min-w-0 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                {row.snippet}
              </div>

              {/* Status */}
              <div className="px-[8px] min-w-0 overflow-hidden">
                <span
                  className={cn(
                    'inline-flex items-center gap-[5px] py-[3px] pl-[8px] pr-[9px] rounded-full font-mono text-[9.5px] tracking-[0.1em] uppercase font-semibold whitespace-nowrap max-w-full',
                    statusPillClass(row.statusPillVariant)
                  )}
                >
                  {statusPillPrefix(row.statusPillVariant) && (
                    <span aria-hidden="true" className="font-bold flex-shrink-0">{statusPillPrefix(row.statusPillVariant)}</span>
                  )}
                  <span className="overflow-hidden text-ellipsis">{row.statusPillText}</span>
                </span>
                <span className="block font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px] font-normal whitespace-nowrap overflow-hidden text-ellipsis">
                  {row.statusSub}
                </span>
              </div>

              {/* Posted */}
              <div className="px-[8px] font-mono text-[11.5px] text-[var(--ink-soft)] tracking-[0.02em] min-w-0 overflow-hidden">
                <div className="whitespace-nowrap overflow-hidden text-ellipsis">{row.postedDate}</div>
                <span className="block font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px] font-normal whitespace-nowrap overflow-hidden text-ellipsis">
                  {row.postedRelative}
                </span>
              </div>

              {/* Row actions */}
              <div>
                <button
                  type="button"
                  aria-label="Row actions"
                  data-rev-action="row-menu"
                  onClick={(e) => {
                    e.stopPropagation();
                    // eslint-disable-next-line no-console
                    console.log(`[rev-row-menu] clicked for ${row.id}`);
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

export { StarRating };
