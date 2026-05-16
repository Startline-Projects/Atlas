export function AudLiveIndicator() {
  return (
    <>
      <style>{`
        @keyframes aud-pulse-live {
          0%, 100% { transform: scale(0.8); opacity: 0.4; }
          50% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
      <span className="inline-flex items-center gap-[6px] py-[4px] px-[10px] bg-[var(--success-bg)] border border-[rgba(46,125,84,0.3)] rounded-full font-mono text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--success)]">
        <span className="relative w-[6px] h-[6px] rounded-full bg-[var(--success)] flex-shrink-0">
          <span
            className="absolute inset-[-3px] rounded-full bg-[var(--success)] opacity-40 animate-[aud-pulse-live_1.6s_ease-in-out_infinite]"
            aria-hidden
          />
        </span>
        Live · auto-refresh 30s
      </span>
    </>
  );
}
