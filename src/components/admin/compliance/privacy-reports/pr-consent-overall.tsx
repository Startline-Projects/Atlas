interface PrConsentOverallProps {
  bigValue: string;
  bigPct: string;
  eyebrow: string;
  title: string;
  detailHtml: string;
  trendValue: string;
  trendMeta: string;
}

export function PrConsentOverall({
  bigValue,
  bigPct,
  eyebrow,
  title,
  detailHtml,
  trendValue,
  trendMeta,
}: PrConsentOverallProps) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-[20px] items-center pb-[18px] mb-[18px] border-b border-b-dashed border-b-[var(--line)] max-[720px]:grid-cols-1">
      <div className="font-display text-[56px] font-medium text-[var(--ink)] tracking-[-0.04em] leading-[1] tabular-nums">
        {bigValue}
        <span className="text-[26px] text-[var(--ink-mute)] ml-[4px]">{bigPct}</span>
      </div>
      <div className="min-w-0">
        <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--ink-mute)] font-bold mb-[4px]">
          {eyebrow}
        </div>
        <div className="font-display text-[15px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[4px]">
          {title}
        </div>
        <div
          className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.55] [&_strong]:text-[var(--ink)] [&_strong]:font-bold"
          dangerouslySetInnerHTML={{ __html: detailHtml }}
        />
      </div>
      <div className="text-right max-[720px]:text-left">
        <div className="font-display text-[22px] font-medium text-[var(--success)] tracking-[-0.02em] leading-[1]">
          {trendValue}
        </div>
        <div className="font-mono text-[9.5px] tracking-[0.08em] uppercase text-[var(--ink-mute)] font-bold mt-[4px]">
          {trendMeta}
        </div>
      </div>
    </div>
  );
}
