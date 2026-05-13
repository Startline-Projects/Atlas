import Link from 'next/link';
import type { SuspiciousActivityRow } from '@/lib/mock-data/admin/suspicious-activity-data';
import { SuspiciousFreshnessPip } from './suspicious-freshness-pip';
import { SuspiciousTypePip } from './suspicious-type-pip';
import { SuspiciousSignalMeter } from './suspicious-signal-meter';

interface SuspiciousActivityLiveFeedProps {
  rows: SuspiciousActivityRow[];
}

const HEAD_COLS =
  'grid grid-cols-[100px_minmax(0,1fr)_160px_130px_110px_50px] gap-[10px] items-center px-[18px]';

export function SuspiciousActivityLiveFeed({ rows }: SuspiciousActivityLiveFeedProps) {
  return (
    <>
      <style>{`
        @keyframes sa-pulse-fresh-row {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        {/* Table head */}
        <div
          className={`${HEAD_COLS} py-[10px] bg-[var(--paper-deep)] border-b border-[var(--line)] font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold`}
        >
          <div>Status</div>
          <div>Account · activity</div>
          <div>Type</div>
          <div>Signal strength</div>
          <div>Time</div>
          <div />
        </div>

        {/* Rows */}
        {rows.map((row, idx) => {
          const isFresh = row.variant === 'fresh';
          const isEscalated = row.variant === 'escalated';
          const rowBg = isFresh
            ? 'bg-[rgba(110,63,224,0.025)]'
            : isEscalated
              ? 'bg-[rgba(194,65,43,0.025)]'
              : '';
          const isLast = idx === rows.length - 1;

          return (
            <Link
              key={row.id}
              href={`/admin/trust-safety/suspicious-activity/${row.id}`}
              className={`${HEAD_COLS} py-[12px] cursor-pointer transition-colors relative hover:bg-[var(--paper-deep)] ${rowBg} ${isLast ? '' : 'border-b border-[var(--line-soft)]'}`}
            >
              {/* Left strip indicator for fresh / escalated */}
              {isFresh && (
                <span
                  className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--super)]"
                  style={{ animation: 'sa-pulse-fresh-row 1.4s ease-in-out infinite' }}
                />
              )}
              {isEscalated && (
                <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--danger)]" />
              )}

              {/* col-fresh */}
              <div>
                <SuspiciousFreshnessPip state={row.freshness} timeText={row.freshnessTime} />
              </div>

              {/* col-account */}
              <div>
                <div className="flex items-center gap-[10px] min-w-0">
                  <div
                    className="w-[32px] h-[32px] rounded-full grid place-items-center flex-shrink-0 font-display text-[12px] font-medium text-[var(--paper)] tracking-[-0.01em]"
                    style={{ background: row.candidateAvatar }}
                  >
                    {row.candidateInitials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-semibold text-[var(--ink)] tracking-[-0.01em] whitespace-nowrap overflow-hidden text-ellipsis">
                      {row.candidateName} · {row.description}
                    </div>
                    <div className="font-mono text-[9.5px] tracking-[0.06em] text-[var(--ink-mute)] uppercase font-semibold flex items-center gap-[6px] mt-[2px]">
                      <span
                        className={`inline-block w-[5px] h-[5px] rounded-full flex-shrink-0 ${row.candidateRole === 'candidate' ? 'bg-[var(--super)]' : 'bg-[var(--success)]'}`}
                      />
                      {row.candidateRole === 'candidate' ? 'CANDIDATE' : 'CLIENT'} · {row.candidateId}
                      {row.escalatedToFraudId && (
                        <>
                          <span className="text-[var(--line-strong)]">·</span>
                          <span className="text-[var(--danger)] font-semibold">
                            → {row.escalatedToFraudId.toUpperCase()}
                          </span>
                        </>
                      )}
                      {row.descriptionMeta && (
                        <>
                          <span className="text-[var(--line-strong)]">·</span>
                          <span>{row.descriptionMeta}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* col-type */}
              <div>
                <SuspiciousTypePip type={row.activityType} label={row.activityLabel} />
              </div>

              {/* col-strength */}
              <div>
                <SuspiciousSignalMeter strength={row.strength} label={row.strengthLabel} />
              </div>

              {/* col-time */}
              <div>
                <div
                  className={`font-mono text-[11px] tracking-[0.02em] flex flex-col gap-[2px] ${row.freshness === 'new' ? 'text-[var(--super)] font-semibold' : 'text-[var(--ink-soft)]'}`}
                >
                  <span>{row.timestamp}</span>
                  <span className="text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">
                    {row.relativeTime}
                  </span>
                </div>
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
    </>
  );
}
