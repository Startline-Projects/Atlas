interface LrDocCardProps {
  filename: string;
  pages: number;
  filesize: string;
  meta: string;
  sealText: string;
  courtName: string;
  jurisdiction: string;
  caseNumber: string;
  title: string;
  bodyText: string[];
}

export function LrDocCard({
  filename,
  pages,
  filesize,
  meta,
  sealText,
  courtName,
  jurisdiction,
  caseNumber,
  title,
  bodyText,
}: LrDocCardProps) {
  return (
    <div className="relative bg-[var(--paper)] border-[1.5px] border-[var(--line)] rounded-[var(--r-md)] mb-[18px] overflow-hidden">
      {/* Header with file info */}
      <div className="bg-[var(--paper-deep)] p-[14px_20px] border-b border-b-[var(--line-soft)] flex items-start justify-between gap-[16px]">
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[4px]">
            Issued Document
          </div>
          <div className="font-body text-[13px] font-medium text-[var(--ink)] truncate mb-[6px]">
            {filename}
          </div>
          <div className="flex items-center gap-[12px] flex-wrap">
            <div className="flex items-center gap-[4px] font-mono text-[10px] text-[var(--ink-soft)] tracking-[0.02em]">
              <span>{pages}p</span>
              <span>·</span>
              <span>{filesize}</span>
            </div>
            <div className="h-[12px] w-[1px] bg-[var(--line-soft)]" />
            <div
              className="font-mono text-[9.5px] text-[var(--ink-soft)] tracking-[0.02em]"
              dangerouslySetInnerHTML={{ __html: meta }}
            />
          </div>
        </div>

        {/* Court seal badge */}
        <div className="flex-shrink-0 w-[64px] h-[64px] rounded-full bg-[var(--paper)] border-[2px] border-[var(--ink-soft)] grid place-items-center">
          <div className="text-center font-mono text-[7px] tracking-[0.08em] uppercase font-bold text-[var(--ink-soft)] leading-[1.2]">
            {sealText.split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Court details section */}
      <div className="p-[12px_20px] border-b border-b-[var(--line-soft)] bg-[var(--paper)]">
        <div className="grid grid-cols-2 gap-[20px] max-[768px]:grid-cols-1">
          <div>
            <div className="font-mono text-[8px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold mb-[4px]">
              Court
            </div>
            <div className="font-body text-[12px] text-[var(--ink)] leading-[1.4]">
              {courtName}
              <div className="text-[11px] text-[var(--ink-soft)] mt-[2px]">{jurisdiction}</div>
            </div>
          </div>
          <div>
            <div className="font-mono text-[8px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold mb-[4px]">
              Case Number
            </div>
            <div className="font-mono text-[12px] font-semibold text-[var(--ink)] tracking-[0.02em]">
              {caseNumber}
            </div>
          </div>
        </div>
      </div>

      {/* Document title and body */}
      <div className="p-[16px_20px]">
        <h4 className="font-display text-[15px] font-medium tracking-[-0.01em] text-[var(--ink)] mb-[12px]">
          {title}
        </h4>

        <div className="space-y-[12px]">
          {bodyText.map((text, idx) => (
            <div
              key={idx}
              className="font-body text-[12px] leading-[1.6] text-[var(--ink)] line-clamp-3"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          ))}
        </div>

        <div className="mt-[12px] pt-[12px] border-t border-t-[var(--line-soft)]">
          <div className="font-mono text-[9px] text-[var(--ink-mute)] tracking-[0.02em]">
            Document preview · full content available in original PDF
          </div>
        </div>
      </div>
    </div>
  );
}
