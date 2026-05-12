/**
 * Phase 15a — Fraud alerts table (CSS grid, 7-col, 9 rows).
 *
 * admin.html CSS: .fr-table-wrap + .fr-row (L15563-15710)
 * admin.html markup: L39283-39533
 *
 * Grid: 90px 1fr 160px 130px 110px 130px 50px (desktop)
 * Rows 1-2 (critical + investigating/open) have .urgent = red tint + left stripe.
 * Status pill colors: open=danger, investigating=amber, resolved=success, dismissed=mute.
 * Confidence color bands: ≥85% danger, 70-84% amber, 50-69% lime-deep, <50% ink-mute.
 * Avatar 28×28, role with colored pip, type cell mono 11px.
 */
import Link from 'next/link';
import type { FraudAlertListRow, FraudSeverityKey, FraudStatusKey } from '@/lib/mock-data/admin/fraud-alerts-data';

const SEVERITY_BADGE: Record<FraudSeverityKey, string> = {
  critical: 'bg-[var(--danger-bg)] text-[var(--danger)]',
  high: 'bg-[var(--amber-bg)] text-[var(--amber)]',
  medium: 'bg-[rgba(214,242,77,0.25)] text-[var(--lime-deep)]',
  low: 'bg-[var(--cream-deep)] text-[var(--ink-mute)]',
};

const STATUS_PILL: Record<FraudStatusKey, string> = {
  open: 'bg-[var(--danger-bg)] text-[var(--danger)]',
  investigating: 'bg-[var(--amber-bg)] text-[var(--amber)]',
  resolved: 'bg-[var(--success-bg)] text-[var(--success)]',
  dismissed: 'bg-[var(--cream-deep)] text-[var(--ink-mute)]',
};

const STATUS_LABEL: Record<FraudStatusKey, string> = {
  open: 'Open',
  investigating: 'Investigating',
  resolved: 'Resolved',
  dismissed: 'Dismissed',
};

/* Per-row avatar gradients — admin.html inline styles */
const AVATAR_GRADIENTS: Record<string, string> = {
  'fa-2026-0042': 'linear-gradient(135deg, #C41E3A, #7E1525)',
  'fa-2026-0041': 'linear-gradient(135deg, #4A6741, #2C3E2A)',
  'fa-2026-0039': 'linear-gradient(135deg, #6B4226, #3F260F)',
  'fa-2026-0038': 'linear-gradient(135deg, #8B7355, #5C4D38)',
  'fa-2026-0037': 'linear-gradient(135deg, #6E4F8B, #3D2B4E)',
  'fa-2026-0036': 'linear-gradient(135deg, #B8860B, #8B5A00)',
  'fa-2026-0034': 'linear-gradient(135deg, #5C8E5A, #2D4F2C)',
  'fa-2026-0029': 'linear-gradient(135deg, #8B4F6E, #4F2D3E)',
  'fa-2026-0024': 'linear-gradient(135deg, #707070, #404040)',
};

function confidenceColor(c: number): string {
  if (c >= 85) return 'var(--danger)';
  if (c >= 70) return 'var(--amber)';
  if (c >= 50) return 'var(--lime-deep)';
  return 'var(--ink-mute)';
}

/** Extract role type from accountMeta for pip color */
function rolePipColor(meta: string): string {
  const lower = meta.toLowerCase();
  if (lower.startsWith('candidate')) return 'bg-[var(--lime-deep)]';
  if (lower.startsWith('client')) return 'bg-[var(--super)]';
  if (lower.startsWith('specialist')) return 'bg-[var(--amber)]';
  return 'bg-[var(--ink-mute)]';
}

interface FraudAlertsTableProps {
  rows: FraudAlertListRow[];
}

export function FraudAlertsTable({ rows }: FraudAlertsTableProps) {
  const isUrgent = (row: FraudAlertListRow) =>
    row.severity === 'critical' && (row.status === 'open' || row.status === 'investigating');

  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      {/* Head row */}
      <div className="grid grid-cols-[90px_1fr_160px_130px_110px_130px_50px] gap-[10px] items-center py-[12px] px-[18px] bg-[var(--paper-deep)] border-b border-[var(--line)] font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold max-[1080px]:grid-cols-[90px_1fr_130px_110px_90px_110px] max-[720px]:grid-cols-[80px_1fr]">
        <div>Severity</div>
        <div>Account</div>
        <div className="max-[720px]:hidden">Type</div>
        <div className="max-[720px]:hidden">Detected</div>
        <div className="max-[720px]:hidden">Status</div>
        <div className="max-[720px]:hidden">Confidence</div>
        <div className="max-[1080px]:hidden" />
      </div>

      {/* Data rows */}
      {rows.map((row) => (
        <Link
          key={row.id}
          href={`/admin/trust-safety/fraud-abuse/${row.id}`}
          className={`grid grid-cols-[90px_1fr_160px_130px_110px_130px_50px] gap-[10px] items-center py-[12px] px-[18px] border-b border-[var(--line-soft)] last:border-b-0 cursor-pointer transition-colors duration-[120ms] ease no-underline relative hover:bg-[var(--paper-deep)] max-[1080px]:grid-cols-[90px_1fr_130px_110px_90px_110px] max-[720px]:grid-cols-[80px_1fr] ${
            isUrgent(row) ? 'bg-[rgba(194,65,43,0.025)] before:content-[\'\'] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[var(--danger)]' : ''
          }`}
        >
          {/* Severity badge */}
          <div>
            <span className={`inline-flex items-center gap-[5px] py-[3px] px-[9px] font-mono text-[9.5px] font-bold tracking-[0.08em] uppercase rounded-[4px] ${SEVERITY_BADGE[row.severity]}`}>
              {row.severity === 'critical' && (
                <span className="w-[6px] h-[6px] rounded-full bg-[var(--danger)] animate-pulse" />
              )}
              {row.severity}
            </span>
          </div>

          {/* Account */}
          <div className="flex items-center gap-[10px] min-w-0">
            <span
              className="w-[28px] h-[28px] rounded-full grid place-items-center flex-shrink-0 font-display text-[11px] text-[var(--paper)] font-medium tracking-[0.02em]"
              style={{ background: AVATAR_GRADIENTS[row.id] || 'linear-gradient(135deg, var(--ink), var(--ink-soft))' }}
            >
              {row.accountInitials}
            </span>
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-[var(--ink)] tracking-[-0.01em] truncate">
                {row.accountName}
              </div>
              <div className="font-mono text-[9.5px] tracking-[0.06em] text-[var(--ink-mute)] uppercase font-semibold mt-[1px]">
                <span className={`inline-block w-[5px] h-[5px] rounded-full ${rolePipColor(row.accountMeta)} mr-[5px] align-[1px]`} />
                {row.accountMeta}
              </div>
            </div>
          </div>

          {/* Type */}
          <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] font-medium max-[720px]:hidden">
            {row.alertType}
          </div>

          {/* Detected */}
          <div className="max-[720px]:hidden">
            <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em]">{row.detected}</div>
            <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[2px]">{row.detectedAgo}</div>
          </div>

          {/* Status */}
          <div className="max-[720px]:hidden">
            <span className={`inline-flex items-center gap-[5px] py-[3px] px-[9px] font-mono text-[9.5px] font-bold tracking-[0.08em] uppercase rounded-full ${STATUS_PILL[row.status]}`}>
              {STATUS_LABEL[row.status]}
            </span>
          </div>

          {/* Confidence */}
          <div className="max-[720px]:hidden">
            <span className="font-mono text-[12px] font-bold tracking-[0.02em]" style={{ color: confidenceColor(row.confidence) }}>
              {row.confidence}%
            </span>
            <div className="h-[3px] bg-[var(--cream-deep)] rounded-full mt-[4px] overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${row.confidence}%`, background: confidenceColor(row.confidence) }} />
            </div>
          </div>

          {/* Quick action */}
          <div className="flex justify-end max-[1080px]:hidden">
            <span className="w-[28px] h-[28px] border border-[var(--line)] bg-[var(--paper)] rounded-full grid place-items-center text-[var(--ink-mute)] transition-all duration-[120ms] ease hover:bg-[var(--ink)] hover:text-[var(--paper)] hover:border-[var(--ink)]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
