interface SparklineProps {
  heights: readonly number[];
  peakIndex: number;
}

export function Sparkline({ heights, peakIndex }: SparklineProps) {
  return (
    <div
      aria-hidden="true"
      className="flex items-end gap-[2px] h-[22px] mt-[10px]"
    >
      {heights.map((height, i) => (
        <div
          key={i}
          className={`flex-1 bg-[var(--color-line)] rounded-[1px] transition-all ${
            i === peakIndex
              ? 'group-hover:bg-[var(--color-ink)]'
              : 'group-hover:bg-[var(--color-line-strong)]'
          }`}
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}
