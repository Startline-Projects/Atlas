interface PsRestrictionBannerProps {
  label: string;
}

export function PsRestrictionBanner({ label }: PsRestrictionBannerProps) {
  return (
    <span className="inline-flex items-center gap-[8px] py-[6px] px-[12px] bg-[var(--ink)] text-[var(--paper)] rounded-[4px] font-mono text-[10px] font-bold tracking-[0.12em] uppercase">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[13px] h-[13px] flex-shrink-0">
        <rect x="3" y="11" width="18" height="11" rx="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
      {label}
    </span>
  );
}
