interface ActionCell {
  label: string;
  value: string;
  valueDanger?: boolean;
  meta: string;
}

interface LrActionCardProps {
  eyebrow: string;
  heading: string;
  cells: ActionCell[];
}

export function LrActionCard({ eyebrow, heading, cells }: LrActionCardProps) {
  return (
    <div className="relative bg-[var(--paper)] border-[1.5px] border-[var(--danger)] rounded-[var(--r-md)] mb-[18px] overflow-hidden">
      <span className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--danger)]" />

      <div className="bg-[var(--danger-bg)] p-[14px_20px] border-b border-b-[var(--line-soft)] flex items-center gap-[12px]">
        <div className="w-[32px] h-[32px] rounded-full bg-[var(--paper)] grid place-items-center text-[var(--danger)] flex-shrink-0 border-[1.5px] border-[var(--danger)]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--danger)] font-bold mb-[2px]">{eyebrow}</div>
          <h3 className="font-display text-[16px] font-medium tracking-[-0.01em] m-0 text-[var(--ink)] leading-[1.25]">{heading}</h3>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-[10px] p-[12px_18px]">
        {cells.map((cell, idx) => (
          <div key={idx} className="flex flex-col gap-[4px]">
            <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold">{cell.label}</div>
            <div className={`font-display text-[15px] font-medium tracking-[-0.01em] leading-none ${cell.valueDanger ? 'text-[var(--danger)]' : 'text-[var(--ink)]'}`}>
              {cell.value}
            </div>
            <div className="font-mono text-[9.5px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.4]" dangerouslySetInnerHTML={{ __html: cell.meta }} />
          </div>
        ))}
      </div>
    </div>
  );
}
