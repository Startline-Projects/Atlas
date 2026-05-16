interface LegalRequestsPageHeaderProps {
  title: string;
  meta: string;
  metaPulse: string;
}

export function LegalRequestsPageHeader({ title, meta, metaPulse }: LegalRequestsPageHeaderProps) {
  return (
    <div className="mb-[20px] pb-[16px] border-b border-b-[var(--line)]">
      <h1 className="font-display text-[28px] font-medium tracking-[-0.025em] text-[var(--ink)] leading-[1.15] mb-[6px]">
        {title}
      </h1>
      <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.04em] leading-[1.6] flex items-center gap-[10px] flex-wrap mb-[12px]">
        <span>{meta}</span>
        <span className="inline-block py-[2px] px-[8px] bg-[var(--danger-bg)] text-[var(--danger)] rounded-[3px] font-mono text-[10px] font-bold tracking-[0.06em] uppercase">
          {metaPulse}
        </span>
      </div>
      <div className="inline-flex gap-[8px] items-center flex-wrap">
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] transition-all"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export log
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] transition-all"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          Response playbook
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--ink)] border border-[var(--ink)] rounded-full text-[var(--paper)] cursor-pointer hover:bg-[var(--ink-soft)] transition-all"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Log new request
        </button>
      </div>
    </div>
  );
}
