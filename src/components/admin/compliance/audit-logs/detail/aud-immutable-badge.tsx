export function AudImmutableBadge() {
  return (
    <span className="inline-flex items-center gap-[6px] py-[3px] px-[9px] font-mono text-[10px] font-bold tracking-[0.04em] uppercase rounded-[3px] bg-[rgba(110,63,224,0.1)] text-[var(--super)]">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
      Immutable
    </span>
  );
}
