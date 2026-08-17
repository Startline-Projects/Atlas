import type { SbCountdownData } from '@/lib/mock-data/admin/suspensions-bans-data';

interface SuspensionCountdownCardProps {
  countdown: SbCountdownData;
}

const DARK_GRADIENT = 'bg-[linear-gradient(135deg,_#2a1f15,_var(--ink))]';

export function SuspensionCountdownCard({ countdown }: SuspensionCountdownCardProps) {
  if (countdown.permanent) {
    return (
      <div className={`${DARK_GRADIENT} rounded-[var(--r-md)] p-[18px_20px] relative overflow-hidden`}>
        <span aria-hidden="true" className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--danger)]" />
        <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--danger)] font-bold mb-[4px]">
          PERMANENT BAN
        </div>
        <div className="font-display text-[14px] font-medium text-[var(--paper)] tracking-[-0.01em] mb-[10px]">
          {countdown.label}
        </div>
        <div className="font-mono text-[10px] tracking-[0.02em] leading-[1.55] text-[rgba(251,248,242,0.7)]">
          {countdown.meta}
        </div>
      </div>
    );
  }

  if (countdown.liftedText) {
    return (
      <div className={`${DARK_GRADIENT} rounded-[var(--r-md)] p-[18px_20px] relative overflow-hidden`}>
        <span aria-hidden="true" className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--success)]" />
        <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--success)] font-bold mb-[4px]">
          SANCTION LIFTED
        </div>
        <div className="font-display text-[14px] font-medium text-[var(--paper)] tracking-[-0.01em] mb-[10px]">
          {countdown.label}
        </div>
        <div className="font-mono text-[10px] tracking-[0.02em] leading-[1.55] text-[rgba(251,248,242,0.7)]">
          {countdown.meta}
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes sb-clock-bar {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
      <div className={`${DARK_GRADIENT} rounded-[var(--r-md)] p-[18px_20px] relative overflow-hidden`}>
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-[3px] bg-[linear-gradient(to_right,var(--amber),var(--danger),var(--amber))] bg-[size:200%_100%]"
          style={{ animation: 'sb-clock-bar 3s ease-in-out infinite' }}
        />
        <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--amber)] font-bold mb-[4px]">
          {countdown.eyebrow}
        </div>
        <div className="font-display text-[14px] font-medium text-[var(--paper)] tracking-[-0.01em] mb-[10px]">
          {countdown.label}
        </div>
        <div className="grid grid-cols-3 gap-[6px] mb-[12px]">
          {countdown.cells.map((cell) => (
            <div
              key={cell.label}
              className="bg-[rgba(251,248,242,0.05)] border border-[rgba(251,248,242,0.12)] rounded-[var(--r-sm)] p-[8px_6px] text-center"
            >
              <div className="font-display text-[22px] font-medium text-[var(--paper)] tracking-[-0.02em] leading-none tabular-nums">
                {cell.value}
              </div>
              <div className="font-mono text-[8.5px] tracking-[0.12em] uppercase font-semibold mt-[3px] text-[rgba(251,248,242,0.55)]">
                {cell.label}
              </div>
            </div>
          ))}
        </div>
        <div className="h-[4px] bg-[rgba(251,248,242,0.12)] rounded-full overflow-hidden mb-[8px]">
          <div
            className="h-full rounded-full bg-[linear-gradient(to_right,var(--amber),#d57b3a)]"
            style={{ width: `${countdown.progressPercent}%` }}
          />
        </div>
        <div className="font-mono text-[10px] tracking-[0.02em] leading-[1.55] text-[rgba(251,248,242,0.7)]">
          {countdown.meta}
        </div>
      </div>
    </>
  );
}
