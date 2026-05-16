interface AuditEntry {
  time: string;
  action: string;
  actor: string;
  actorStrong: string;
  detail: string;
  variant?: 'danger';
}

interface LrAuditChainProps {
  entries: AuditEntry[];
}

export function LrAuditChain({ entries }: LrAuditChainProps) {
  return (
    <div className="relative bg-[var(--paper)] border-[1.5px] border-[var(--line)] rounded-[var(--r-md)] mb-[18px] overflow-hidden">
      <div className="space-y-0">
        {entries.map((entry, idx) => {
          const isLast = idx === entries.length - 1;
          const isDanger = entry.variant === 'danger';

          return (
            <div
              key={idx}
              className={`relative p-[14px_20px] border-b border-b-[var(--line-soft)] ${
                isDanger ? 'bg-[rgba(194,65,43,0.03)]' : 'bg-[var(--paper)]'
              } ${isLast ? 'border-b-0' : ''}`}
            >
              {/* Timeline dot and line */}
              <div className="absolute left-[14px] top-[50%] transform -translate-y-1/2">
                <div
                  className={`w-[12px] h-[12px] rounded-full border-[2px] ${
                    isDanger
                      ? 'bg-[var(--danger)] border-[var(--danger)]'
                      : 'bg-[var(--paper)] border-[var(--ink-soft)]'
                  }`}
                />
              </div>

              {/* Timeline line (down) */}
              {!isLast && (
                <div
                  className="absolute left-[19px] top-[50%] w-[1px] h-[calc(100%+14px)] bg-[var(--line-soft)]"
                  style={{ pointerEvents: 'none' }}
                />
              )}

              {/* Content */}
              <div className="pl-[24px]">
                <div className="flex items-baseline gap-[10px] mb-[4px]">
                  <div className="font-mono text-[9.5px] text-[var(--ink-soft)] tracking-[0.02em] font-semibold flex-shrink-0">
                    {entry.time}
                  </div>
                  <div
                    className={`font-body text-[12px] font-semibold leading-[1.4] ${
                      isDanger ? 'text-[var(--danger)]' : 'text-[var(--ink)]'
                    }`}
                  >
                    {entry.action}
                  </div>
                </div>

                <div className="flex items-center gap-[6px] mb-[6px]">
                  <span className="font-mono text-[9px] text-[var(--ink-soft)] tracking-[0.02em]">
                    {entry.actor}
                  </span>
                </div>

                <div className="font-body text-[11px] text-[var(--ink-soft)] leading-[1.5]">
                  {entry.detail}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
