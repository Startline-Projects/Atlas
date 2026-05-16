// Admin.html lines 58101-58163: Forensic context grid
// 6 cells: IP / Device / Geolocation / MFA at login / Session age / Entry hash

interface ForensicCell {
  label: string;
  value: string;
  metaHtml: string;
  flag: {
    label: string;
    variant?: 'success' | 'warn' | 'danger';
  };
}

interface AudForensicGridProps {
  title: string;
  meta: string;
  cells: ForensicCell[];
}

export function AudForensicGrid({ title, meta, cells }: AudForensicGridProps) {
  const flagBg = (variant?: 'success' | 'warn' | 'danger') => {
    if (variant === 'warn') return 'bg-[var(--amber-bg)] text-[var(--amber)]';
    if (variant === 'danger') return 'bg-[var(--danger-bg)] text-[var(--danger)]';
    return 'bg-[var(--success-bg)] text-[var(--success)]';
  };

  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      {/* Head */}
      <div className="py-[12px] px-[18px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)] flex items-center justify-between gap-[12px] flex-wrap">
        <h3 className="font-display text-[14.5px] font-medium tracking-[-0.01em] text-[var(--ink)] m-0">
          {title}
        </h3>
        <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">
          {meta}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-0 max-[980px]:grid-cols-2 max-[600px]:grid-cols-1">
        {cells.map((cell, idx) => {
          const isThirdCol = (idx + 1) % 3 === 0;
          const isLastRow = idx >= cells.length - (cells.length % 3 || 3);
          const isTwoColLastCol = (idx + 1) % 2 === 0;
          const isSingleCol = cells.length % 3 !== 0;

          let borderClasses = 'border-r border-r-dashed border-r-[var(--line-soft)] border-b border-b-dashed border-b-[var(--line-soft)]';

          // At 980px (2 cols), remove right border on 2nd col
          if (isTwoColLastCol && cells.length > 2) {
            borderClasses += ' max-[980px]:border-r-0';
          }

          // At 600px (1 col), no right borders
          borderClasses += ' max-[600px]:border-r-0';

          // Remove bottom border from last row
          if (isLastRow) {
            borderClasses += ' border-b-0';
          }

          // Remove right border from 3rd column (3-col layout)
          if (isThirdCol) {
            borderClasses += ' border-r-0';
          }

          return (
            <div key={idx} className={`py-[14px] px-[18px] ${borderClasses}`}>
              <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[6px]">
                {cell.label}
              </div>
              <div className="font-mono text-[12.5px] font-bold text-[var(--ink)] tracking-[0.02em] tabular-nums leading-[1.4]">
                {cell.value}
              </div>
              <div
                className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[4px] leading-[1.55] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
                dangerouslySetInnerHTML={{ __html: cell.metaHtml }}
              />
              <span className={`inline-block mt-[6px] py-[2px] px-[7px] font-mono text-[8.5px] tracking-[0.1em] uppercase font-bold rounded-[3px] ${flagBg(cell.flag.variant)}`}>
                {cell.flag.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
