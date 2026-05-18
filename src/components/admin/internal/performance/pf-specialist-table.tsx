'use client';

/* admin.html lines 64152-64510: 8-col specialist comparison table — wrap + thead (sort indicators) + tbody (11 rows with bar metrics + grade) + footer */

import { useRouter } from 'next/navigation';
import { PfGradeBadge } from './pf-grade-badge';
import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type {
  PfSpecialistTableData,
  PfSpecialistRow,
  PfMetricCellSimple,
  PfMetricCellWithBar,
  PfBarVariant,
} from '@/lib/mock-data/admin/performance-data';

interface PfSpecialistTableProps {
  data: PfSpecialistTableData;
}

function barFillClass(variant: PfBarVariant): string {
  return variant === 'high'
    ? 'bg-[var(--success)]'
    : variant === 'medium'
    ? 'bg-[var(--amber)]'
    : 'bg-[var(--danger)]';
}

function labelColorClass(variant?: PfBarVariant): string {
  if (variant === 'high') return 'text-[var(--success)]';
  if (variant === 'medium') return 'text-[var(--amber)]';
  if (variant === 'low') return 'text-[var(--danger)]';
  return 'text-[var(--ink)]';
}

function MetricCellBar({ cell }: { cell: PfMetricCellWithBar }) {
  return (
    <span className="tabular-nums">
      <div className="h-[6px] bg-[var(--paper-deep)] rounded-full overflow-hidden mb-[4px]">
        <div
          className={`h-full rounded-full ${barFillClass(cell.variant)}`}
          style={{ width: `${cell.percent}%` }}
        />
      </div>
      <span className={`font-mono text-[11.5px] font-bold tracking-[0.02em] ${labelColorClass(cell.variant)}`}>
        {cell.label}
      </span>
      {cell.sub && (
        <span className="block font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.04em] font-medium mt-[2px]">
          {cell.sub}
        </span>
      )}
    </span>
  );
}

function MetricCellSimple({ cell }: { cell: PfMetricCellSimple }) {
  return (
    <span className="tabular-nums">
      <span className={`font-mono text-[11.5px] font-bold tracking-[0.02em] ${labelColorClass(cell.variant)}`}>
        {cell.label}
      </span>
      {cell.sub && (
        <span className="block font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.04em] font-medium mt-[2px]">
          {cell.sub}
        </span>
      )}
    </span>
  );
}

function SpecRow({ row }: { row: PfSpecialistRow }) {
  const router = useRouter();
  const navigate = () => router.push(`/admin/users/specialists/${row.id}`);
  const rowBg =
    row.rowVariant === 'featured'
      ? 'bg-[var(--success-bg)] relative cursor-pointer transition-colors hover:bg-[var(--paper-deep)]'
      : row.rowVariant === 'needs-support'
      ? 'bg-[rgba(232,118,58,0.04)] relative cursor-pointer transition-colors hover:bg-[var(--paper-deep)]'
      : 'cursor-pointer transition-colors hover:bg-[var(--paper-deep)]';

  const firstTdBorder =
    row.rowVariant === 'featured'
      ? 'border-l-[3px] border-l-[var(--success)] !pl-[14px]'
      : row.rowVariant === 'needs-support'
      ? 'border-l-[3px] border-l-[var(--amber)] !pl-[14px]'
      : '';

  const rankColor = row.isTopRank ? 'text-[var(--success)]' : 'text-[var(--ink)]';

  return (
    <tr
      className={rowBg}
      onClick={navigate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate();
        }
      }}
      tabIndex={0}
      role="link"
      aria-label={`Open profile for ${row.name}`}
    >
      {/* Rank */}
      <td
        className={`py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle font-display text-[17px] font-medium tracking-[-0.02em] text-center w-[36px] tabular-nums ${rankColor} ${firstTdBorder}`}
      >
        {row.rank}
      </td>

      {/* Specialist (avatar + name + meta) */}
      <td className="py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle">
        <div className="flex items-center gap-[10px]">
          <div
            className="w-[32px] h-[32px] rounded-full grid place-items-center font-display text-[12px] font-bold text-[var(--paper)] flex-shrink-0 tracking-[-0.01em]"
            style={{ background: row.avatar.gradient }}
          >
            {row.avatar.initials}
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-bold text-[var(--ink)] tracking-[-0.01em] leading-[1.25]">
              {row.name}
            </div>
            <div
              className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
              dangerouslySetInnerHTML={{ __html: row.metaHtml }}
            />
          </div>
        </div>
      </td>

      {/* Engagements */}
      <td className="py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle text-right">
        <MetricCellSimple cell={row.engagements} />
      </td>

      {/* SLA · 30d */}
      <td className="py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle">
        <MetricCellBar cell={row.sla} />
      </td>

      {/* CSAT */}
      <td className="py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle">
        <MetricCellBar cell={row.csat} />
      </td>

      {/* Dispute rate */}
      <td className="py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle text-right">
        <MetricCellSimple cell={row.disputeRate} />
      </td>

      {/* Response · p50 */}
      <td className="py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle text-right">
        <MetricCellSimple cell={row.responseP50} />
      </td>

      {/* Grade */}
      <td className="py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle text-center">
        <PfGradeBadge grade={row.grade} />
      </td>
    </tr>
  );
}

export function PfSpecialistTable({ data }: PfSpecialistTableProps) {
  const { showAction } = useAdminActionToast();
  return (
    <>
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        <table className="w-full border-separate border-spacing-0 text-[12.5px]">
          <thead>
            <tr>
              {data.columns.map((col) => {
                const align = col.isCentered
                  ? 'text-center'
                  : col.isNumeric
                  ? 'text-right'
                  : 'text-left';
                const sortArrow = col.sortedDesc ? ' ↓' : col.sortedAsc ? ' ↑' : '';
                return (
                  <th
                    key={col.key}
                    className={`${align} py-[12px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold cursor-pointer select-none`}
                    style={col.widthPct ? { width: col.widthPct } : undefined}
                  >
                    {col.label}
                    {sortArrow && <span className="text-[var(--ink)]">{sortArrow}</span>}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <SpecRow key={row.id} row={row} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer meta + button */}
      <div className="flex items-center justify-between pt-[12px] flex-wrap gap-[12px]">
        <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
          {data.footerMeta}
        </span>
        <button
          type="button"
          onClick={() => showAction(data.footerButtonLabel)}
          className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] cursor-pointer transition-all whitespace-nowrap"
        >
          {data.footerButtonLabel}
        </button>
      </div>
    </>
  );
}
