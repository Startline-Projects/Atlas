interface PrNextReviewProps {
  eyebrow: string;
  title: string;
  meta: string;
  buttonLabel: string;
}

export function PrNextReview({ eyebrow, title, meta, buttonLabel }: PrNextReviewProps) {
  return (
    <div className="bg-gradient-to-br from-[rgba(74,109,65,0.08)] to-[var(--paper-deep)] border border-[rgba(74,109,65,0.25)] rounded-[var(--r-sm)] py-[14px] px-[16px] mt-[14px] flex items-center justify-between gap-[12px] flex-wrap">
      <div className="flex-1 min-w-[200px]">
        <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--success)] font-bold mb-[3px]">
          {eyebrow}
        </div>
        <div className="font-display text-[14px] font-medium text-[var(--ink)] tracking-[-0.01em]">
          {title}
        </div>
        <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] mt-[3px]">
          {meta}
        </div>
      </div>
      <button className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full cursor-pointer transition-all whitespace-nowrap bg-[var(--ink)] border border-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)] flex-shrink-0">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        {buttonLabel}
      </button>
    </div>
  );
}
