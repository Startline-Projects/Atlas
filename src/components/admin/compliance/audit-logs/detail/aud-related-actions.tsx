// Admin.html lines 58393-58476: Related actions chain
// 9 entries with 1 marked as "this entry" (highlighted)

interface RelatedAction {
  time: string;
  action: string;
  actor: string;
  isThisEntry?: boolean;
}

interface AudRelatedActionsProps {
  title: string;
  meta: string;
  rows: RelatedAction[];
}

export function AudRelatedActions({ title, meta, rows }: AudRelatedActionsProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      {/* Head */}
      <div className="py-[12px] px-[18px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)]">
        <h3 className="font-display text-[14.5px] font-medium tracking-[-0.01em] text-[var(--ink)] m-0 mb-[2px]">
          {title}
        </h3>
        <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] mt-[2px]">
          {meta}
        </div>
      </div>

      {/* List */}
      <div className="font-mono text-[11px]">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className={`grid grid-cols-[16px_130px_minmax(0,1fr)_100px] gap-[10px] py-[8px] px-[18px] items-center border-b border-b-[var(--line-soft)] last:border-b-0 cursor-pointer transition-colors hover:bg-[var(--paper-deep)] relative max-[720px]:grid-cols-[16px_minmax(0,1fr)] max-[720px]:py-[8px] max-[720px]:px-[14px] ${
              row.isThisEntry
                ? 'bg-[linear-gradient(90deg,rgba(232,118,58,0.06),transparent_60%)] before:content-["▸"] before:absolute before:left-[6px] before:text-[var(--amber)] before:font-bold'
                : ''
            }`}
          >
            {/* Spacer for indicator */}
            <div />

            {/* Time */}
            <div className="text-[var(--ink-soft)] font-semibold tracking-[0.02em] text-[10.5px] tabular-nums max-[720px]:hidden">
              {row.time}
            </div>

            {/* Action */}
            <div className="font-body text-[11.5px] font-semibold text-[var(--ink)] tracking-[-0.01em] truncate [&_strong]:text-[var(--ink)] [&_strong]:font-bold">
              {row.isThisEntry ? (
                <strong>{row.action}</strong>
              ) : (
                row.action
              )}
            </div>

            {/* Actor */}
            <div className="text-[var(--ink-mute)] font-semibold tracking-[0.02em] text-right max-[720px]:hidden">
              {row.actor}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
