export function DsrStatsStrip() {
  return (
    <div className="grid grid-cols-5 gap-0 bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden mb-[18px] max-[1280px]:grid-cols-2 max-[720px]:grid-cols-1">
      {/* Cell 1: Active requests */}
      <div className="flex flex-col gap-[4px] p-[16px_18px] border-r border-r-[var(--line)] last:border-r-0">
        <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">
          Active requests
        </div>
        <div className="font-display text-[20px] font-medium tracking-[-0.01em] leading-none tabular-nums text-[var(--ink)]">
          11
        </div>
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] mt-[2px]">
          <strong className="text-[var(--ink-soft)] font-bold">4 access</strong> · 3 deletion · 2 portability · 1 correction · 1 objection
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
          <strong className="text-[var(--ink-soft)] font-bold">DSR-2026-0087</strong> · 3d remaining · portability
        </div>
      </div>

      {/* Cell 3: ID verification pending */}
      <div className="flex flex-col gap-[4px] p-[16px_18px] border-r border-r-[var(--line)] last:border-r-0">
        <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">
          ID verification pending
        </div>
        <div className="font-display text-[20px] font-medium tracking-[-0.01em] leading-none tabular-nums text-[var(--amber)]">
          2
        </div>
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] mt-[2px]">
          cannot process · gate open
        </div>
      </div>

      {/* Cell 4: Avg fulfillment */}
      <div className="flex flex-col gap-[4px] p-[16px_18px] border-r border-r-[var(--line)] last:border-r-0">
        <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">
          Avg fulfillment
        </div>
        <div className="font-display text-[20px] font-medium tracking-[-0.01em] leading-none tabular-nums text-[var(--ink)]">
          14 <span className="font-mono text-[10px] font-bold text-[var(--ink-mute)] tracking-[0.06em] ml-[3px]">DAYS</span>
        </div>
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] mt-[2px]">
          well within 30d SLA · 100% on-time
        </div>
      </div>

      {/* Cell 5: Closed YTD */}
      <div className="flex flex-col gap-[4px] p-[16px_18px] border-r border-r-[var(--line)] last:border-r-0">
        <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">
          Closed · YTD
        </div>
        <div className="font-display text-[20px] font-medium tracking-[-0.01em] leading-none tabular-nums text-[var(--success)]">
          87
        </div>
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] mt-[2px]">
          71 access · 11 deletion · 5 other
        </div>
      </div>
    </div>
  );
}
