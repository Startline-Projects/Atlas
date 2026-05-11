'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type {
  DisputeListRow,
  DisputeStatusPillVariant,
  DisputeReasonCategory,
  DisputeSlaVariant,
  DisputeOwnerVariant,
} from '@/lib/mock-data/admin/dispute-profiles-data';
import { cn } from '@/lib/utils/cn';

interface DisputesTableProps {
  rows: DisputeListRow[];
}

// admin.html line 11491 spec: '28px 0.9fr 2fr 1.4fr 1fr 1fr 1fr 0.9fr 28px'
// Adjusted: Status column widened (1fr → 1.3fr) to fit "SPECIALIST DECIDING" pill
// without bleeding into Elapsed; Reason shrunk (1.4fr → 1.1fr) — reason tags are
// short (≤17 chars uppercase). Total fr unchanged at 8.2.
const GRID_COLUMNS = '28px 0.9fr 2fr 1.1fr 1.3fr 1fr 1fr 0.9fr 28px';

// admin.html lines 11398-11440 — 6 status pill variants used in fixtures
function statusPillClass(variant: DisputeStatusPillVariant): string {
  switch (variant) {
    case 'disp-open':       return 'bg-[var(--amber-bg)] text-[var(--amber)]';
    case 'disp-progress':   return 'bg-[rgba(110,63,224,0.12)] text-[var(--super)]';
    case 'disp-mediation':  return 'bg-[var(--lime)] text-[var(--ink)]';
    case 'disp-escalated':  return 'bg-[var(--danger-bg)] text-[var(--danger)]';
    case 'disp-urgent':     return 'bg-[var(--danger)] text-[var(--paper)] font-bold';
    case 'disp-resolved':   return 'bg-[var(--success-bg)] text-[var(--success)]';
    case 'disp-closed':     return 'bg-[var(--cream-deep)] text-[var(--ink-mute)]';
  }
}

// admin.html lines 11414, 11424, 11432 — pseudo-element symbol prefixes
function statusPillPrefix(variant: DisputeStatusPillVariant): string | null {
  switch (variant) {
    case 'disp-escalated': return '↑';
    case 'disp-urgent':    return '⚠';
    case 'disp-resolved':  return '✓';
    default: return null;
  }
}

// admin.html lines 11606-11613 — 8 reason tag variants
function disputeReasonClass(cat: DisputeReasonCategory): string {
  switch (cat) {
    case 'conduct':
      return 'bg-[var(--danger)] text-[var(--paper)]';
    case 'quality':
    case 'ip':
      return 'bg-[rgba(110,63,224,0.10)] text-[var(--super)]';
    case 'hours':
      return 'bg-[var(--amber-bg)] text-[var(--amber)]';
    case 'noshow':
      return 'bg-[var(--danger-bg)] text-[var(--danger)]';
    case 'refund':
    case 'payment':
    case 'commun':
    default:
      return 'bg-[var(--cream-deep)] text-[var(--ink-soft)]';
  }
}

// admin.html lines 11443-11475 — sla badge with dot icon (no padding/bg)
function slaTextClass(variant: DisputeSlaVariant): string {
  switch (variant) {
    case 'ok':       return 'text-[var(--ink-soft)]';
    case 'warn':     return 'text-[var(--amber)]';
    case 'danger':   return 'text-[var(--danger)]';
    case 'done':     return 'text-[var(--success)]';
    case 'expired':  return 'text-[var(--ink-mute)] line-through';
  }
}

function slaIconClass(variant: DisputeSlaVariant): string {
  switch (variant) {
    case 'ok':       return 'bg-[var(--success)]';
    case 'warn':     return 'bg-[var(--amber)]';
    case 'danger':   return 'bg-[var(--danger)]';
    case 'done':     return 'bg-[var(--success)]';
    case 'expired':  return 'bg-[var(--ink-mute)]';
  }
}

// admin.html lines 11623-11638 — owner chip dot gradients
function ownerDotGradient(variant: DisputeOwnerVariant): string | undefined {
  switch (variant) {
    case 'dk': return 'linear-gradient(135deg, #7BA8D9, #3F6CA1)';
    case 'mv': return 'linear-gradient(135deg, #C9783F, #6E3818)';
    case 'lc': return 'linear-gradient(135deg, #F0CC4F, #E8911E)';
    case 'sr': return 'linear-gradient(135deg, #C2A8E8, #8B5FB8)';
    case 'im': return 'linear-gradient(135deg, #9CC9C2, #4D8A82)';
    case 'at': return 'linear-gradient(135deg, #DCA294, #8B4F47)';
    case 'ad': return 'var(--ink)'; // admin.html line 11638 — solid ink
  }
}

// admin.html line 23518 — column headers verbatim
const COLUMN_HEADS = [
  'Dispute ID',
  'Parties · Contract',
  'Reason',
  'Status',
  'Elapsed',
  'SLA',
  'Owner',
];

export function DisputesTable({ rows }: DisputesTableProps) {
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
    router.push(`/admin/operations/disputes/${rowId}`);
  };

  return (
    // admin.html line 11478: .disp-table-wrap
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
              className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold py-[11px] px-[8px] whitespace-nowrap"
            >
              {label}
            </div>
          ))}
          <div role="columnheader" aria-label="Actions" />
        </div>

        {/* Body */}
        {rows.map((row) => {
          const isSelected = selectedIds.has(row.id);
          const isUrgent = row.rowVariant === 'urgent';
          const isEscalated = row.rowVariant === 'escalated';
          return (
            <div
              key={row.id}
              role="row"
              aria-selected={isSelected}
              data-disp-row={row.id}
              data-disp-status={row.status}
              data-disp-cat={row.reasonCategory}
              onClick={(e) => handleRowClick(e, row.id)}
              className={cn(
                // admin.html line 11511 — base row
                'grid items-center gap-0 py-[12px] border-b border-[var(--line-soft)] last:border-b-0 cursor-pointer transition-colors duration-[120ms] ease relative',
                // admin.html lines 11519-11522 — urgent-row uses REAL border-left + pl-11 (not pseudo) so it coexists with selection ::before
                isUrgent
                  ? 'pl-[11px] pr-[14px] border-l-[3px] border-l-[var(--danger)]'
                  : 'px-[14px]',
                // Background priority: selected wins, else urgent/escalated tint, else default hover
                isSelected
                  ? 'bg-[rgba(214,242,77,0.10)]'
                  : isUrgent
                    ? 'bg-[rgba(194,65,43,0.05)] hover:bg-[rgba(194,65,43,0.10)]'
                    : isEscalated
                      ? 'bg-[rgba(194,65,43,0.025)] hover:bg-[#FCF9F1]'
                      : 'hover:bg-[#FCF9F1]',
                // Lime ::before selection stripe: only when selected AND NOT urgent
                // (urgent rows keep their 3px red border-left as the priority indicator —
                // urgency overrides selection per user-preferred visual coherence)
                isSelected && !isUrgent &&
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

              {/* td-disp-id — admin.html lines 11529-11537 */}
              <div className="font-mono text-[11px] text-[var(--ink-soft)] font-semibold tracking-[0.02em] px-[8px] whitespace-nowrap">
                {row.atlasId}
              </div>

              {/* td-disp-pair — admin.html lines 11538-11566 */}
              <div className="flex flex-col gap-[2px] min-w-0 px-[8px]">
                <div className="text-[13px] font-semibold text-[var(--ink)] tracking-[-0.01em] whitespace-nowrap overflow-hidden text-ellipsis">
                  {row.partyA}
                  <span className="text-[var(--ink-mute)] font-normal"> ↔ </span>
                  {row.partyB}
                </div>
                <div
                  className={cn(
                    'font-mono text-[10.5px] tracking-[0.02em] whitespace-nowrap overflow-hidden text-ellipsis',
                    row.pairSecondaryIsReal
                      ? 'text-[var(--super)] font-semibold'
                      : 'text-[var(--ink-mute)]'
                  )}
                >
                  {row.pairSecondary}
                </div>
              </div>

              {/* Reason — admin.html lines 11592-11613 */}
              <div className="px-[8px] min-w-0 overflow-hidden">
                <span
                  className={cn(
                    'inline-flex items-center gap-[4px] font-mono text-[10px] tracking-[0.06em] py-[3px] px-[7px] rounded-[3px] font-semibold whitespace-nowrap',
                    disputeReasonClass(row.reasonCategory)
                  )}
                >
                  {row.reasonTagLabel}
                </span>
              </div>

              {/* Status — admin.html lines 11398-11440 + cell-sub. admin.html line 11572 has overflow:hidden on td-cell to clip overflowing pills */}
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

              {/* Elapsed — admin.html lines 11576-11581 (td-cell.mono) */}
              <div className="px-[8px] min-w-0 font-mono text-[11.5px] text-[var(--ink-soft)] tracking-[0.02em] whitespace-nowrap overflow-hidden text-ellipsis">
                {row.elapsedLabel}
                <span className="block font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px] font-normal">
                  {row.elapsedSub}
                </span>
              </div>

              {/* SLA — admin.html lines 11443-11475 */}
              <div className="px-[8px] min-w-0 overflow-hidden">
                <span
                  className={cn(
                    'inline-flex items-center gap-[5px] font-mono text-[11px] font-semibold tracking-[0.02em] [font-variant-numeric:tabular-nums] whitespace-nowrap max-w-full',
                    slaTextClass(row.sla.variant)
                  )}
                >
                  <span aria-hidden="true" className={cn('w-[9px] h-[9px] rounded-full flex-shrink-0', slaIconClass(row.sla.variant))} />
                  <span className="overflow-hidden text-ellipsis">{row.sla.text}</span>
                </span>
                {row.slaSub && (
                  <span className="block font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px] font-normal whitespace-nowrap overflow-hidden text-ellipsis">
                    {row.slaSub}
                  </span>
                )}
              </div>

              {/* Owner — admin.html lines 11615-11639 */}
              <div className="px-[8px] min-w-0 overflow-hidden">
                <span
                  className={cn(
                    'inline-flex items-center gap-[5px] text-[11.5px] whitespace-nowrap',
                    row.owner.isAdmin ? 'text-[var(--danger)] font-semibold' : 'text-[var(--ink-soft)]'
                  )}
                >
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
                  data-disp-action="row-menu"
                  onClick={(e) => {
                    e.stopPropagation();
                    // eslint-disable-next-line no-console
                    console.log(`[disp-row-menu] clicked for ${row.id}`);
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
