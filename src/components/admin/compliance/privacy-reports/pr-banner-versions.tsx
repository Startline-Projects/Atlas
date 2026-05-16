interface BannerVersion {
  name: string;
  meta: string;
  rate: string;
  rateSuffix: string;
  current?: boolean;
}

interface PrBannerVersionsProps {
  versions: BannerVersion[];
}

export function PrBannerVersions({ versions }: PrBannerVersionsProps) {
  return (
    <div className="grid grid-cols-2 gap-[14px] pt-[18px] mt-[18px] border-t border-t-dashed border-t-[var(--line)] max-[720px]:grid-cols-1">
      {versions.map((v, idx) => (
        <div
          key={idx}
          className={`py-[14px] px-[16px] bg-[var(--paper-deep)] rounded-[var(--r-sm)] ${
            v.current
              ? 'border border-[var(--success)] relative'
              : 'border border-[var(--line)]'
          }`}
        >
          {v.current && (
            <span className="absolute top-[10px] right-[12px] font-mono text-[8.5px] font-bold tracking-[0.1em] uppercase py-[2px] px-[6px] bg-[var(--success-bg)] text-[var(--success)] rounded-[3px]">
              Current
            </span>
          )}
          <div className="font-display text-[14.5px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[3px]">
            {v.name}
          </div>
          <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] mb-[10px]">
            {v.meta}
          </div>
          <div className="font-display text-[24px] font-medium text-[var(--ink)] tracking-[-0.025em] tabular-nums">
            {v.rate}
            <span className="text-[13px] text-[var(--ink-mute)] ml-[2px]">
              {v.rateSuffix}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
