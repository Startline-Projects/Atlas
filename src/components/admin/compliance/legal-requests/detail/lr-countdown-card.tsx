interface LrCountdownCardProps {
  eyebrow: string;
  label: string;
  cells: Array<{ value: number | string; label: string }>;
  barFillPct: number;
  meta: string;
  variant?: 'urgent';
}

export function LrCountdownCard({ eyebrow, label, cells, barFillPct, meta, variant }: LrCountdownCardProps) {
  const isUrgent = variant === 'urgent';

  return (
    <div
      className="relative overflow-hidden rounded-[var(--r-md)] p-[18px_20px] text-[var(--paper)]"
      style={{ background: 'linear-gradient(135deg, #2a1f15, var(--ink))' }}
    >
      <style>{`
        @keyframes lr-clock-bar {
          0%, 100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        .lr-clock-bar-anim {
          background-size: 200% 100%;
          animation: lr-clock-bar 3s ease-in-out infinite;
        }
      `}</style>

      {isUrgent && (
        <span
          className="lr-clock-bar-anim absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: 'linear-gradient(to right, var(--danger), var(--amber), var(--danger))' }}
        />
      )}

      <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--danger)] font-bold mb-[4px]">
        {eyebrow}
      </div>

      <div className="font-display text-[14px] font-medium text-[var(--paper)] tracking-[-0.01em] mb-[10px]">
        {label}
      </div>

      <div className="grid grid-cols-3 gap-[6px] mb-[12px]">
        {cells.map((cell, idx) => (
          <div
            key={idx}
            className="bg-[rgba(251,248,242,0.05)] border border-[rgba(251,248,242,0.12)] rounded-[var(--r-sm)] p-[8px_6px] text-center"
          >
            <div className="font-display text-[22px] font-medium text-[var(--paper)] leading-none tracking-[-0.02em] tabular-nums">
              {cell.value}
            </div>
            <div className="font-mono text-[8.5px] tracking-[0.12em] uppercase text-[rgba(251,248,242,0.55)] font-semibold mt-[3px]">
              {cell.label}
            </div>
          </div>
        ))}
      </div>

      <div className="h-[4px] bg-[rgba(251,248,242,0.12)] rounded-full overflow-hidden mb-[8px]">
        <div
          className="h-full rounded-full"
          style={{
            width: `${barFillPct}%`,
            background: 'linear-gradient(to right, var(--amber), var(--danger))',
          }}
        />
      </div>

      <div
        className="font-mono text-[10px] text-[rgba(251,248,242,0.7)] tracking-[0.02em] leading-[1.55] [&_strong]:text-[var(--paper)] [&_strong]:font-bold"
        dangerouslySetInnerHTML={{ __html: meta }}
      />
    </div>
  );
}
