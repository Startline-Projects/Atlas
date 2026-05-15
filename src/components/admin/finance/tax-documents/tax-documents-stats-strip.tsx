import { taxDocsStats } from '@/lib/mock-data/admin/tax-documents-data';

export function TaxDocumentsStatsStrip() {
  return (
    <div className="grid grid-cols-5 gap-0 bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mb-[22px] overflow-hidden max-[1080px]:grid-cols-3 max-[720px]:grid-cols-2">
      {taxDocsStats.map((stat, idx) => (
        <div
          key={idx}
          className="py-[14px] px-[18px] border-r border-r-[var(--line-soft)] flex flex-col gap-[4px] last:border-r-0 max-[1080px]:nth-[3n]:border-r-0 max-[1080px]:nth-[-n+3]:border-b max-[1080px]:nth-[-n+3]:border-b-[var(--line-soft)] max-[720px]:nth-[2n]:border-r-0 max-[720px]:nth-[-n+4]:border-b max-[720px]:nth-[-n+4]:border-b-[var(--line-soft)]"
        >
          <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold">
            {stat.label}
          </div>

          <div
            className={`font-display text-[28px] font-medium tracking-[-0.025em] leading-[1.1] tabular-nums flex items-baseline gap-[4px] ${
              stat.variant === 'success'
                ? 'text-[var(--success)]'
                : stat.variant === 'warn'
                  ? 'text-[var(--amber)]'
                  : stat.variant === 'danger'
                    ? 'text-[var(--danger)]'
                    : 'text-[var(--ink)]'
            }`}
          >
            {stat.value}
            {stat.suffix && (
              <span className="font-mono text-[11px] text-[var(--ink-mute)] font-medium tracking-[0.04em]">
                {stat.suffix}
              </span>
            )}
          </div>

          <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em]">
            {stat.meta.split(' · ').map((part, i) => (
              <span key={i}>
                {i > 0 && ' · '}
                {/^\d/.test(part) || part.includes('%') ? (
                  <strong className="text-[var(--ink-soft)] font-bold">{part}</strong>
                ) : (
                  part
                )}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
