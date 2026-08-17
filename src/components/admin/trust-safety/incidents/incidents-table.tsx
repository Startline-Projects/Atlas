/**
 * Phase 16a — Incidents table (CSS grid 7-col, 9 rows).
 *
 * admin.html CSS: .si-table-head + .si-row (L16737-16813)
 * admin.html markup: L40414-40642
 *
 * Grid: 90px 110px 1fr 160px 110px 110px 50px (desktop)
 *       90px 110px 1fr 130px 100px 90px       (≤1180, drops actions)
 *       80px 1fr                              (≤720, drops all but sev+summary)
 * Row variant: .urgent for critical (rgba(194,65,43,0.025) bg + 3px left stripe).
 */
import Link from 'next/link';
import type { IncidentListRow, IncidentSeverity, IncidentStatusKey, IncidentAffectedTone } from '@/lib/mock-data/admin/incidents-data';
import { IncidentTypeBadge } from './incident-type-badge';

const SEVERITY_BADGE: Record<IncidentSeverity, string> = {
  critical: 'bg-[var(--danger-bg)] text-[var(--danger)]',
  high: 'bg-[var(--amber-bg)] text-[var(--amber)]',
  medium: 'bg-[rgba(214,242,77,0.25)] text-[var(--lime-deep)]',
  low: 'bg-[var(--cream-deep)] text-[var(--ink-mute)]',
};

const STATUS_PILL: Record<IncidentStatusKey, string> = {
  new: 'bg-[var(--danger-bg)] text-[var(--danger)]',
  investigating: 'bg-[var(--amber-bg)] text-[var(--amber)]',
  mitigated: 'bg-[rgba(214,242,77,0.25)] text-[var(--lime-deep)]',
  closed: 'bg-[var(--cream-deep)] text-[var(--ink-mute)]',
};

const AFFECTED_COLOR: Record<IncidentAffectedTone, string> = {
  high: 'text-[var(--danger)]',
  med: 'text-[var(--amber)]',
  default: 'text-[var(--ink)]',
};

interface IncidentsTableProps {
  rows: IncidentListRow[];
}

export function IncidentsTable({ rows }: IncidentsTableProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      {/* Head row */}
      <div className="grid grid-cols-[90px_110px_1fr_160px_110px_110px_50px] gap-[10px] items-center py-[12px] px-[18px] bg-[var(--paper-deep)] border-b border-[var(--line)] font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold max-[1180px]:grid-cols-[90px_110px_1fr_130px_100px_90px] max-[720px]:grid-cols-[80px_1fr] max-[720px]:py-[12px] max-[720px]:px-[12px]">
        <div className="max-[720px]:hidden">ID</div>
        <div>Severity</div>
        <div>Summary</div>
        <div className="max-[720px]:hidden">Type</div>
        <div className="max-[720px]:hidden">Detected</div>
        <div className="max-[720px]:hidden">Affected · status</div>
        <div className="max-[1180px]:hidden" />
      </div>

      {/* Data rows */}
      {rows.map((row) => (
        <Link
          key={row.id}
          href={`/admin/trust-safety/security-incidents/${row.id}`}
          className={`grid grid-cols-[90px_110px_1fr_160px_110px_110px_50px] gap-[10px] items-center py-[12px] px-[18px] border-b border-[var(--line-soft)] last:border-b-0 cursor-pointer transition-colors duration-[120ms] ease no-underline relative hover:bg-[var(--paper-deep)] max-[1180px]:grid-cols-[90px_110px_1fr_130px_100px_90px] max-[720px]:grid-cols-[80px_1fr] max-[720px]:py-[12px] max-[720px]:px-[12px] ${
            row.isUrgent ? 'bg-[rgba(194,65,43,0.025)] before:content-[\'\'] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[var(--danger)]' : ''
          }`}
        >
          {/* ID */}
          <div className="font-mono text-[11px] font-bold text-[var(--ink-soft)] tracking-[0.02em] max-[720px]:hidden">
            {row.atlasId}
          </div>

          {/* Severity */}
          <div>
            <span className={`inline-flex items-center gap-[5px] py-[3px] px-[9px] font-mono text-[9.5px] font-bold tracking-[0.08em] uppercase rounded-[4px] ${SEVERITY_BADGE[row.severity]}`}>
              {row.severity === 'critical' && (
                <span className="w-[6px] h-[6px] rounded-full bg-[var(--danger)] animate-pulse" />
              )}
              {row.severity}
            </span>
          </div>

          {/* Summary */}
          <div className="min-w-0">
            <div className="text-[13px] font-semibold text-[var(--ink)] tracking-[-0.01em] whitespace-nowrap overflow-hidden text-ellipsis mb-[2px]">
              {row.summaryTitle}
            </div>
            <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] whitespace-nowrap overflow-hidden text-ellipsis">
              {row.summaryMeta}
            </div>
          </div>

          {/* Type */}
          <div className="max-[720px]:hidden">
            <IncidentTypeBadge type={row.typeKey} {...(row.typeIconKey ? { iconKey: row.typeIconKey } : {})} label={row.typeLabel} />
          </div>

          {/* Detected */}
          <div className="max-[720px]:hidden">
            <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em]">{row.detectedDate}</div>
            <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[2px]">{row.detectedRel}</div>
          </div>

          {/* Affected · status */}
          <div className="max-[720px]:hidden">
            <div className={`font-mono text-[12px] font-bold tracking-[0.02em] tabular-nums text-right ${AFFECTED_COLOR[row.affectedTone]}`}>
              {row.affectedCount}
            </div>
            <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[2px] text-right">
              {row.affectedMeta}
            </div>
            <div className="mt-[3px] flex justify-end">
              <span className={`inline-flex items-center gap-[5px] py-[2px] px-[7px] font-mono text-[9px] font-bold tracking-[0.08em] uppercase rounded-full ${STATUS_PILL[row.status]}`}>
                {row.statusLabel}
              </span>
            </div>
          </div>

          {/* Quick action */}
          <div className="flex justify-end max-[1180px]:hidden">
            <span className="w-[28px] h-[28px] border border-[var(--line)] bg-[var(--paper)] rounded-full grid place-items-center text-[var(--ink-mute)] transition-all duration-[120ms] ease hover:bg-[var(--ink)] hover:text-[var(--paper)] hover:border-[var(--ink)]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
