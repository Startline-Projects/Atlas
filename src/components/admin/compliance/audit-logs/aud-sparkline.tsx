interface AudSparklineProps {
  data: number[];
}

export function AudSparkline({ data }: AudSparklineProps) {
  return (
    <div className="flex items-end gap-[1px] h-[14px] mt-[4px]">
      {data.map((value, idx) => {
        const isLast = idx === data.length - 1;
        return (
          <span
            key={idx}
            className={`flex-1 rounded-[1px] min-h-[2px] ${
              isLast
                ? 'bg-[var(--ink)] opacity-100'
                : 'bg-[var(--ink-mute)] opacity-50'
            }`}
            style={{ height: `${value}%` }}
          />
        );
      })}
    </div>
  );
}
