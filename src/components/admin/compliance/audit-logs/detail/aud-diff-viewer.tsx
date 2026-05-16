// Admin.html lines 58233-58390: Before/After state diff
// 3 full entities + 1 compressed + expand button

interface DiffField {
  name: string;
  before: string;
  after: string;
  isCompressed?: boolean;
}

interface DiffEntity {
  initials: string;
  name: string;
  id: string;
  ref: string;
  avatarGradient: string;
  fields: DiffField[];
}

interface AudDiffViewerProps {
  title: string;
  meta: string;
  entities: DiffEntity[];
  expandLabel: string;
}

export function AudDiffViewer({ title, meta, entities, expandLabel }: AudDiffViewerProps) {
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

      {/* Entities */}
      {entities.map((entity, idx) => (
        <div key={idx} className="border-b border-b-[var(--line)] last:border-b-0">
          {/* Entity head */}
          <div className="flex items-center gap-[10px] py-[10px] px-[18px] bg-gradient-to-r from-[var(--paper-deep)] to-[var(--paper)] border-b border-b-dashed border-b-[var(--line-soft)]">
            <div
              className="w-[22px] h-[22px] rounded-[4px] grid place-items-center font-display text-[9px] text-[var(--paper)] font-medium flex-shrink-0"
              style={{ background: entity.avatarGradient }}
            >
              {entity.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] font-bold text-[var(--ink)] tracking-[-0.01em]">
                {entity.name}
              </div>
            </div>
            <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] font-semibold">
              {entity.id}
            </div>
            <div className="font-mono text-[10px] text-[var(--super)] tracking-[0.02em] font-bold underline">
              {entity.ref}
            </div>
          </div>

          {/* Rows */}
          <div className="font-mono text-[11px]">
            {entity.fields.map((field, fieldIdx) => (
              <div
                key={fieldIdx}
                className="grid grid-cols-[130px_minmax(0,1fr)_minmax(0,1fr)] gap-[10px] py-[6px] px-[18px] items-center border-b border-b-[var(--line-soft)] last:border-b-0 max-[720px]:grid-cols-1 max-[720px]:py-[8px] max-[720px]:px-[16px]"
              >
                {/* Field name */}
                <div className="text-[var(--ink-mute)] font-semibold tracking-[0.04em] text-[10.5px]">
                  {field.name}
                </div>

                {/* Before (desktop) */}
                {!field.isCompressed && (
                  <>
                    <div className="py-[4px] px-[8px] rounded-[3px] tracking-[0.02em] text-[11px] font-semibold truncate bg-[rgba(194,65,43,0.06)] text-[var(--danger)] line-through decoration-[rgba(194,65,43,0.5)]">
                      {field.before}
                    </div>

                    {/* After (desktop) */}
                    <div className="py-[4px] px-[8px] rounded-[3px] tracking-[0.02em] text-[11px] font-semibold truncate bg-[rgba(46,125,84,0.06)] text-[var(--success)]">
                      {field.after}
                    </div>
                  </>
                )}

                {/* Compressed view */}
                {field.isCompressed && (
                  <>
                    <div className="py-[4px] px-[8px] rounded-[3px] tracking-[0.02em] text-[11px] font-semibold truncate bg-[rgba(194,65,43,0.06)] text-[var(--danger)]">
                      {field.before}
                    </div>
                    <div className="py-[4px] px-[8px] rounded-[3px] tracking-[0.02em] text-[11px] font-semibold truncate bg-[rgba(46,125,84,0.06)] text-[var(--success)]">
                      {field.after}
                    </div>
                  </>
                )}

                {/* Arrow (mobile only) */}
                <div className="hidden max-[720px]:block max-[720px]:text-center max-[720px]:text-[var(--ink-mute)] max-[720px]:text-[14px] max-[720px]:my-[2px]">
                  ↓
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Expand button */}
      <div className="py-[12px] px-[18px] border-t border-t-dashed border-t-[var(--line-soft)] text-center">
        <button className="inline-flex items-center gap-[6px] py-[7px] px-[14px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--ink)] border border-[var(--ink)] rounded-full text-[var(--paper)] cursor-pointer hover:bg-[var(--ink-soft)] transition-all">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
          {expandLabel}
        </button>
      </div>
    </div>
  );
}
