interface LrGagBannerProps {
  title: string;
  detail: string;
  daysRemaining: number;
  expirationDate: string;
}

export function LrGagBanner({ title, detail, daysRemaining, expirationDate }: LrGagBannerProps) {
  return (
    <div
      className="flex items-center gap-[14px] p-[14px_20px] rounded-[var(--r-md)] mb-[18px] text-[var(--paper)] relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #4a1f17, #2a0f0a)' }}
    >
      <span className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--danger)]" />

      <div className="w-[36px] h-[36px] rounded-full bg-[rgba(255,255,255,0.15)] grid place-items-center flex-shrink-0">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--paper)' }}>
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>

      <div className="flex-1">
        <div className="font-display text-[14px] font-bold tracking-[-0.01em] mb-[4px]">{title}</div>
        <div className="font-body text-[11px] leading-[1.55] opacity-90" dangerouslySetInnerHTML={{ __html: detail }} />
      </div>

      <div className="text-center flex-shrink-0">
        <div className="font-display text-[16px] font-bold tracking-[-0.01em]">{daysRemaining}</div>
        <div className="font-mono text-[9px] tracking-[0.04em] mt-[2px] opacity-85">days<br />remaining</div>
      </div>
    </div>
  );
}
