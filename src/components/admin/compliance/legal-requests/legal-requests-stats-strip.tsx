interface LegalRequestsStatsStripProps {
  stats?: any[];
}

export function LegalRequestsStatsStrip({ stats }: LegalRequestsStatsStripProps) {
  return (
    <div className="grid grid-cols-5 gap-0 bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden mb-[18px] max-[1280px]:grid-cols-2 max-[720px]:grid-cols-1">
      {/* Cell 1: Active requests */}
      <div className="flex flex-col gap-[4px] p-[16px_18px] border-r border-r-[var(--line)] last:border-r-0">
        <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">
          Active requests
        </div>
        <div className="font-display text-[20px] font-medium tracking-[-0.01em] leading-none tabular-nums text-[var(--ink)]">
          8
        </div>
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] mt-[2px]">
          <strong className="text-[var(--ink-soft)] font-bold">4 court</strong> · 3 regulator · 1 agency
        </div>
      </div>

      {/* Cell 2: Deadline this week */}
      <div className="flex flex-col gap-[4px] p-[16px_18px] border-r border-r-[var(--line)] last:border-r-0">
        <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">
          Deadline this week
        </div>
        <div className="font-display text-[20px] font-medium tracking-[-0.01em] leading-none tabular-nums text-[var(--danger)]">
          1
        </div>
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] mt-[2px]">
          <strong className="text-[var(--ink-soft)] font-bold">LR-2026-0023</strong> · 14d remaining
        </div>
      </div>

      {/* Cell 3: Under gag order */}
      <div className="flex flex-col gap-[4px] p-[16px_18px] border-r border-r-[var(--line)] last:border-r-0">
        <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">
          Under gag order
        </div>
        <div className="font-display text-[20px] font-medium tracking-[-0.01em] leading-none tabular-nums text-[var(--amber)]">
          3
        </div>
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] mt-[2px]">
          cannot notify affected user
        </div>
      </div>

      {/* Cell 4: Avg response time */}
      <div className="flex flex-col gap-[4px] p-[16px_18px] border-r border-r-[var(--line)] last:border-r-0">
        <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">
          Avg response time
        </div>
        <div className="font-display text-[20px] font-medium tracking-[-0.01em] leading-none tabular-nums text-[var(--ink)]">
          18 <span className="font-mono text-[10px] font-bold text-[var(--ink-mute)] tracking-[0.06em] ml-[3px]">DAYS</span>
        </div>
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] mt-[2px]">
          last 12 closed · 100% on-deadline
        </div>
      </div>

      {/* Cell 5: Closed · YTD */}
      <div className="flex flex-col gap-[4px] p-[16px_18px] border-r border-r-[var(--line)] last:border-r-0">
        <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">
          Closed · YTD
        </div>
        <div className="font-display text-[20px] font-medium tracking-[-0.01em] leading-none tabular-nums text-[var(--success)]">
          23
        </div>
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] mt-[2px]">
          all archived to legal vault
        </div>
      </div>
    </div>
  );
}
