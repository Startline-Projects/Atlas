import Link from 'next/link';
import type { SuspensionListRow } from '@/lib/mock-data/admin/suspensions-bans-data';
import { SuspensionStatusPill } from './suspension-status-pill';
import { SuspensionReasonChip } from './suspension-reason-chip';
import { SuspensionExpiresCell } from './suspension-expires-cell';

interface SuspensionsBansListTableProps {
  rows: SuspensionListRow[];
}

const COLS =
  'grid grid-cols-[100px_minmax(0,1fr)_110px_200px_110px_130px_50px] gap-[10px] items-center px-[18px]';

export function SuspensionsBansListTable({ rows }: SuspensionsBansListTableProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      {/* Table head */}
      <div
        className={`${COLS} py-[12px] bg-[var(--paper-deep)] border-b border-[var(--line)] font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold`}
      >
        <div>ID</div>
        <div>Account</div>
        <div>Status</div>
        <div>Reason</div>
        <div>Imposed by</div>
        <div>Expires</div>
        <div />
      </div>

      {/* Rows */}
      {rows.map((row, idx) => {
        const isAppealing = row.variant === 'appealing';
        const isUrgent = row.variant === 'urgent';
        const rowBg = isAppealing
          ? 'bg-[rgba(232,118,58,0.04)]'
          : isUrgent
            ? 'bg-[rgba(194,65,43,0.025)]'
            : '';
        const isLast = idx === rows.length - 1;

        return (
          <Link
            key={row.id}
            href={`/admin/trust-safety/suspensions-bans/${row.id}`}
            className={`${COLS} py-[12px] cursor-pointer transition-colors relative hover:bg-[var(--paper-deep)] ${rowBg} ${isLast ? '' : 'border-b border-[var(--line-soft)]'}`}
          >
            {isAppealing && (
              <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--amber)]" />
            )}
            {isUrgent && (
              <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--danger)]" />
            )}

            {/* col-id */}
            <div className="font-mono text-[11px] font-bold text-[var(--ink-soft)] tracking-[0.02em]">
              {row.atlasId}
            </div>

            {/* col-account */}
            <div>
              <div className="flex items-center gap-[10px] min-w-0">
                <div
                  className="w-[32px] h-[32px] rounded-full grid place-items-center flex-shrink-0 font-display text-[12px] font-medium text-[var(--paper)] tracking-[-0.01em]"
                  style={{ background: row.accountGradient }}
                >
                  {row.accountInitials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-semibold text-[var(--ink)] tracking-[-0.01em] whitespace-nowrap overflow-hidden text-ellipsis">
                    {row.accountName}
                  </div>
                  <div className="font-mono text-[9.5px] tracking-[0.06em] text-[var(--ink-mute)] uppercase font-semibold flex items-center gap-[6px] mt-[2px]">
                    <span
                      className={`inline-block w-[5px] h-[5px] rounded-full flex-shrink-0 ${row.accountRole === 'candidate' ? 'bg-[var(--super)]' : 'bg-[var(--success)]'}`}
                    />
                    {row.accountRole === 'candidate' ? 'CANDIDATE' : 'CLIENT'} · {row.accountId}
                    {row.accountMeta && (
                      <>
                        <span className="text-[var(--line-strong)]">·</span>
                        <span>{row.accountMeta}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* col-status */}
            <div>
              <SuspensionStatusPill status={row.status} label={row.statusLabel} />
            </div>

            {/* col-reason */}
            <div className="min-w-0 overflow-hidden">
              <SuspensionReasonChip label={row.reasonLabel} link={row.reasonLink} />
            </div>

            {/* col-imposed */}
            <div className="flex items-center gap-[8px] min-w-0">
              <div
                className="w-[22px] h-[22px] rounded-full grid place-items-center flex-shrink-0 font-display text-[9px] font-medium text-[var(--paper)]"
                style={{ background: row.imposedBy.gradient }}
              >
                {row.imposedBy.initials}
              </div>
              <div className="min-w-0">
                <div className="text-[12px] font-semibold text-[var(--ink)] tracking-[-0.01em] whitespace-nowrap overflow-hidden text-ellipsis">
                  {row.imposedBy.name}
                </div>
                <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[1px]">
                  {row.imposedBy.when}
                </div>
              </div>
            </div>

            {/* col-expires */}
            <div>
              <SuspensionExpiresCell
                variant={row.expires.variant}
                primary={row.expires.primary}
                meta={row.expires.meta}
              />
            </div>

            {/* col-actions (decorative — entire row is the link) */}
            <div>
              <span
                className="w-[28px] h-[28px] border border-[var(--line)] bg-[var(--paper)] rounded-full grid place-items-center text-[var(--ink-mute)]"
                aria-hidden="true"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
