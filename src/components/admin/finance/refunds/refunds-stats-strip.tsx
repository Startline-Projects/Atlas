import { refundsStats } from '@/lib/mock-data/admin/refunds-data';

export function RefundsStatsStrip() {
  return (
    <div className="grid grid-cols-5 gap-0 bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mb-[22px] overflow-hidden max-[1080px]:grid-cols-3 max-[720px]:grid-cols-2">
      {refundsStats.map((stat, idx) => (
        <div
          key={idx}
          className="py-[14px] px-[18px] border-r border-r-[var(--line-soft)] flex flex-col gap-[4px] last:border-r-0 max-[1080px]:border-r-[var(--line-soft)] max-[1080px]:nth-[3n]:border-r-0 max-[1080px]:nth-[-n+3]:border-b max-[1080px]:nth-[-n+3]:border-b-[var(--line-soft)] max-[720px]:border-r-[var(--line-soft)] max-[720px]:nth-[2n]:border-r-0 max-[720px]:nth-[-n+4]:border-b max-[720px]:nth-[-n+4]:border-b-[var(--line-soft)]"
        >
          {/* Label */}
          <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold flex items-center gap-[6px]">
            {stat.label}
            {stat.hasPulse && (
              <span className="w-[6px] h-[6px] rounded-full bg-[var(--amber)] animate-pulse-fr inline-block flex-shrink-0"></span>
            )}
          </div>

          {/* Value */}
          <div
            className={`font-display text-[28px] font-medium text-[var(--ink)] tracking-[-0.025em] leading-[1.1] tabular-nums flex items-baseline gap-[4px] ${
              stat.variant === 'warn'
                ? 'text-[var(--amber)]'
                : stat.variant === 'success'
                  ? 'text-[var(--success)]'
                  : stat.variant === 'danger'
                    ? 'text-[var(--danger)]'
                    : 'text-[var(--ink)]'
            }`}
          >
            {stat.value}
          </div>

          {/* Meta */}
          <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em]">
            {stat.variant === 'warn' && stat.meta.includes('over'
) ? (
              <>
                {stat.meta.split(' · ').map((part, idx) => (
                  <span key={idx}>
                    {idx > 0 && ' · '}
                    {part.includes('over') ? <strong className="text-[var(--danger)]">{part}</strong> : <strong>{part}</strong>}
                  </span>
                ))}
              </>
            ) : stat.variant === 'success' ? (
              <>
                {stat.meta.split(' · ').map((part, idx) => (
                  <span key={idx}>
                    {idx > 0 && ' · '}
                    {part.includes('below') ? <strong className="text-[var(--success)]">{part}</strong> : <strong>{part}</strong>}
                  </span>
                ))}
              </>
            ) : (
              <>
                {stat.meta.split(' · ').map((part, idx) => (
                  <span key={idx}>
                    {idx > 0 && ' · '}
                    {part.startsWith('$') || part.includes('%') || /^\d/.test(part) ? <strong>{part}</strong> : part}
                  </span>
                ))}
              </>
            )}
          </div>
        </div>
      ))}

      {/* Inline style for pulse animation */}
      <style>{`
        @keyframes pulse-fr {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-fr {
          animation: pulse-fr 1.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
