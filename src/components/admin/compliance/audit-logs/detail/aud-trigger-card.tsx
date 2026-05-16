interface AudTriggerCardProps {
  eyebrow: string;
  titleHtml: string;
  detailHtml: string;
}

export function AudTriggerCard({ eyebrow, titleHtml, detailHtml }: AudTriggerCardProps) {
  return (
    <div className="bg-gradient-to-br from-[rgba(255,193,7,0.08)] to-[rgba(255,193,7,0.04)] border-[1.5px] border-[var(--amber)] rounded-[var(--r-md)] mb-[18px] p-[18px] flex gap-[14px]">
      <div className="w-[40px] h-[40px] rounded-full grid place-items-center bg-[var(--amber)] flex-shrink-0">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--amber)] font-bold mb-[4px]">
          {eyebrow}
        </div>
        <div className="font-display text-[14px] font-medium tracking-[-0.01em] text-[var(--ink)] mb-[6px]">
          <span dangerouslySetInnerHTML={{ __html: titleHtml }} />
        </div>
        <div
          className="font-body text-[12px] text-[var(--ink-soft)] leading-[1.6] [&_strong]:text-[var(--ink)] [&_strong]:font-semibold"
          dangerouslySetInnerHTML={{ __html: detailHtml }}
        />
      </div>
    </div>
  );
}
