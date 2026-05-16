interface AudSummaryCardProps {
  variant: 'critical';
  eyebrow: string;
  title: string;
  detailHtml: string;
}

export function AudSummaryCard({ variant, eyebrow, title, detailHtml }: AudSummaryCardProps) {
  const iconBgClass = variant === 'critical' ? 'bg-[var(--danger)]' : 'bg-[var(--amber)]';

  return (
    <div className="relative bg-[var(--paper)] border-[1.5px] border-[var(--line)] rounded-[var(--r-md)] mb-[18px] overflow-hidden">
      <span className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--danger)]" />

      <div className="p-[18px] flex gap-[14px]">
        <div className={`${iconBgClass} w-[40px] h-[40px] rounded-full grid place-items-center flex-shrink-0`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[4px]">
            {eyebrow}
          </div>
          <div className="font-display text-[16px] font-medium tracking-[-0.01em] text-[var(--ink)] mb-[8px]">
            {title}
          </div>
          <div
            className="font-body text-[12px] text-[var(--ink-soft)] leading-[1.6] [&_strong]:text-[var(--ink)] [&_strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: detailHtml }}
          />
        </div>
      </div>
    </div>
  );
}
