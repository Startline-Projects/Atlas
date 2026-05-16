interface MetaRow {
  label: string;
  value: string;
  variant?: 'success' | 'warn' | 'danger';
}

interface AudImmutabilityCardProps {
  title: string;
  description: string;
  metaRows: MetaRow[];
}

export function AudImmutabilityCard({ title, description, metaRows }: AudImmutabilityCardProps) {
  const variantClass = (v?: 'success' | 'warn' | 'danger') => {
    if (v === 'success') return 'text-[var(--success)]';
    if (v === 'warn') return 'text-[var(--amber)]';
    if (v === 'danger') return 'text-[var(--danger)]';
    return 'text-[var(--ink-soft)]';
  };

  return (
    <div className="bg-[var(--paper)] border border-[var(--ink)] rounded-[var(--r-md)] py-[16px] px-[18px]">
      <h3 className="font-display text-[13px] font-medium text-[var(--ink)] tracking-[-0.005em] m-0 mb-[10px] pb-[8px] border-b border-[var(--ink)]">
        Immutability
      </h3>

      <div className="flex items-start gap-[10px] mb-[10px]">
        <div className="w-[36px] h-[36px] rounded-full bg-[var(--ink)] text-[var(--paper)] grid place-items-center flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-display text-[13.5px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[3px]">
            {title}
          </div>
          <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.55]">
            {description}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[4px] font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em]">
        {metaRows.map((row, idx) => (
          <div key={idx} className="flex justify-between gap-[8px] py-[3px]">
            <span className="text-[var(--ink-mute)]">{row.label}</span>
            <span className={`font-semibold text-right ${variantClass(row.variant)}`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
