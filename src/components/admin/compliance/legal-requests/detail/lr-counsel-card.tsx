interface LrCounselCardProps {
  name: string;
  firm: string;
  initials: string;
  avatarGradient: string;
  metaRows: Array<{ label: string; value: string }>;
  title?: string;
}

export function LrCounselCard({ name, firm, initials, avatarGradient, metaRows, title }: LrCounselCardProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[16px_18px]">
      <h3 className="font-display text-[13px] font-medium text-[var(--ink)] tracking-[-0.005em] m-0 mb-[10px] pb-[8px] border-b border-b-dashed border-b-[var(--line-soft)]">
        {title ?? 'Assigned counsel'}
      </h3>

      <div className="flex items-center gap-[10px] mb-[10px]">
        <div
          className="w-[36px] h-[36px] rounded-full text-[var(--paper)] grid place-items-center font-display text-[13px] font-medium flex-shrink-0"
          style={{ background: avatarGradient }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-bold text-[var(--ink)] tracking-[-0.01em]">{name}</div>
          <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] mt-[2px]">{firm}</div>
        </div>
      </div>

      <div className="flex flex-col gap-[6px] font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] mb-[12px] pb-[10px] border-b border-b-dashed border-b-[var(--line-soft)]">
        {metaRows.map((row, idx) => (
          <div key={idx} className="flex justify-between gap-[8px]">
            <span className="text-[var(--ink-mute)]">{row.label}</span>
            <span className="text-[var(--ink-soft)] font-semibold text-right">{row.value}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-[6px]">
        <button className="flex-1 inline-flex items-center justify-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Message
        </button>
        <button className="flex-1 inline-flex items-center justify-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]">
          Portal ↗
        </button>
      </div>
    </div>
  );
}
