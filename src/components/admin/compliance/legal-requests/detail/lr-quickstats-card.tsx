interface QuickStat {
  label: string;
  value: string;
  variant?: 'success' | 'danger';
}

interface LrQuickstatsCardProps {
  title: string;
  stats: QuickStat[];
  note?: string;
}

export function LrQuickstatsCard({ title, stats, note }: LrQuickstatsCardProps) {
  const valueVariantClass = (v?: string) => {
    if (v === 'success') return 'text-[var(--success)]';
    if (v === 'danger') return 'text-[var(--danger)]';
    return 'text-[var(--ink)]';
  };

  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[16px_18px]">
      <h3 className="font-display text-[13px] font-medium text-[var(--ink)] tracking-[-0.005em] m-0 mb-[10px] pb-[8px] border-b border-b-dashed border-b-[var(--line-soft)]">
        {title}
      </h3>

      {stats.map((stat, idx) => (
        <div key={idx} className="flex justify-between gap-[8px] py-[5px]">
          <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em]">{stat.label}</span>
          <span
            className={`font-mono text-[11px] font-semibold text-right tracking-[0.02em] ${valueVariantClass(stat.variant)} [&_a]:text-[var(--ink-soft)] [&_a]:underline [&_a]:cursor-pointer`}
            dangerouslySetInnerHTML={{ __html: stat.value }}
          />
        </div>
      ))}

      {note && (
        <div className="mt-[10px] pt-[10px] border-t border-t-dashed border-t-[var(--line-soft)] font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5]">
          {note}
        </div>
      )}
    </div>
  );
}
