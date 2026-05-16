import Link from 'next/link';
import { DsrTypeBadge } from './dsr-type-badge';
import { DsrJurisdictionBadge } from './dsr-jurisdiction-badge';
import { DsrIdPill } from './dsr-id-pill';
import { dsrRows } from '@/lib/mock-data/admin/data-subject-rights-data';

const statusStyles: Record<string, { bg: string; text: string }> = {
  'dsr-processing': { bg: 'bg-[rgba(110,63,224,0.10)]', text: 'text-[var(--super)]' },
  'dsr-verifying': { bg: 'bg-[var(--amber-bg)]', text: 'text-[var(--amber)]' },
  'dsr-rejected': { bg: 'bg-[var(--danger-bg)]', text: 'text-[var(--danger)]' },
  'dsr-received': { bg: 'bg-[var(--cream-deep)]', text: 'text-[var(--ink-soft)]' },
  'dsr-closed': { bg: 'bg-[var(--success-bg)]', text: 'text-[var(--success)]' },
};

const gridCols = 'grid grid-cols-[110px_minmax(0,1fr)_120px_100px_100px_110px_120px_120px_50px] gap-[10px] items-center py-[12px] px-[18px]';

export function DsrTable() {
  return (
    <>
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden mb-[14px]">
        {/* Head */}
        <div className={`${gridCols} bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold`}>
          <div>Ref</div>
          <div>Subject</div>
          <div>Type</div>
          <div>Jurisdiction</div>
          <div>Filed</div>
          <div>Deadline</div>
          <div>ID status</div>
          <div>Status</div>
          <div></div>
        </div>

        {/* Rows */}
        {dsrRows.map((row) => {
          const ss = statusStyles[row.status.variant] ?? { bg: 'bg-[var(--cream-deep)]', text: 'text-[var(--ink-soft)]' };
          const rowBg = row.rowVariant === 'urgent' ? 'bg-[rgba(194,65,43,0.025)]' : row.rowVariant === 'warn' ? 'bg-[rgba(232,118,58,0.025)]' : '';
          const stripColor = row.rowVariant === 'urgent' ? 'bg-[var(--danger)]' : row.rowVariant === 'warn' ? 'bg-[var(--amber)]' : '';

          const deadlineTextClass =
            row.deadline.variant === 'urgent'
              ? 'text-[var(--danger)]'
              : row.deadline.variant === 'warn'
                ? 'text-[var(--amber)]'
                : row.deadline.variant === 'met'
                  ? 'text-[var(--success)]'
                  : 'text-[var(--ink-soft)]';
          const dRelClass =
            row.deadline.variant === 'urgent'
              ? 'text-[var(--danger)] font-bold'
              : row.deadline.variant === 'warn'
                ? 'text-[var(--amber)]'
                : 'text-[var(--ink-mute)]';

          return (
            <Link
              key={row.id}
              href={`/admin/compliance/data-subject-rights/${row.id}`}
              className={`relative ${gridCols} border-b border-b-[var(--line-soft)] last:border-b-0 cursor-pointer transition-colors hover:bg-[var(--paper-deep)] no-underline ${rowBg}`}
            >
              {row.rowVariant && <span className={`absolute left-0 top-0 bottom-0 w-[3px] ${stripColor}`} />}

              {/* Ref */}
              <div className="font-mono text-[11px] font-bold text-[var(--ink-soft)] tracking-[0.02em]">
                {row.id}
              </div>

              {/* Subject */}
              <div className="flex items-center gap-[10px] min-w-0">
                <div
                  className="w-[28px] h-[28px] rounded-full grid place-items-center font-display text-[11px] text-[var(--paper)] font-medium flex-shrink-0"
                  style={{ background: row.subject.avatarGradient }}
                >
                  {row.subject.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[12.5px] font-semibold text-[var(--ink)] tracking-[-0.01em] truncate">
                    {row.subject.name}
                  </div>
                  <div
                    className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[1px] truncate"
                    dangerouslySetInnerHTML={{ __html: row.subject.metaHtml }}
                  />
                </div>
              </div>

              {/* Type */}
              <div className="min-w-0">
                <DsrTypeBadge variant={row.type.variant} label={row.type.label} />
              </div>

              {/* Jurisdiction */}
              <div className="min-w-0">
                <DsrJurisdictionBadge variant={row.jurisdiction.variant} label={row.jurisdiction.label} {...(row.jurisdiction.flagStyle ? { flagStyle: row.jurisdiction.flagStyle } : {})} />
              </div>

              {/* Filed */}
              <div>
                <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] font-semibold tabular-nums">
                  {row.filed.date}
                </div>
                <div className="block text-[9.5px] text-[var(--ink-mute)] font-medium tracking-[0.04em] mt-[2px]">
                  {row.filed.rel}
                </div>
              </div>

              {/* Deadline */}
              <div>
                <div className={`font-mono text-[11px] tracking-[0.02em] font-semibold tabular-nums ${deadlineTextClass}`}>
                  {row.deadline.variant === 'met' && '✓ '}
                  {row.deadline.date}
                </div>
                <div className={`block text-[9.5px] font-medium tracking-[0.04em] mt-[2px] ${dRelClass}`}>
                  {row.deadline.rel}
                </div>
              </div>

              {/* ID pill */}
              <div>
                <DsrIdPill variant={row.idPill.variant} label={row.idPill.label} />
              </div>

              {/* Status */}
              <div>
                <span className={`inline-flex items-center font-mono text-[10px] font-bold tracking-[0.06em] uppercase py-[3px] px-[8px] rounded-[3px] ${ss.bg} ${ss.text}`}>
                  {row.status.label}
                </span>
              </div>

              {/* Actions */}
              <div className="flex justify-end">
                <button className="inline-flex items-center justify-center w-[28px] h-[28px] rounded-full text-[var(--ink-mute)] hover:bg-[var(--paper-deep)] hover:text-[var(--ink)] transition-colors" aria-label="Open">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-[14px] flex-wrap gap-[12px]">
        <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
          9 of 98 shown · YTD · sorted by most recent · all DSR types · all jurisdictions
        </span>
        <button className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]">
          Load older (89 remaining) →
        </button>
      </div>
    </>
  );
}
