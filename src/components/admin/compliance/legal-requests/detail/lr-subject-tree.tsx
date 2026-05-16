interface Entity {
  initials: string;
  flagBg: string;
  name: string;
  meta: string;
  scopeChips: string[];
}

interface ScopeItem {
  collected: boolean;
  label: string;
  meta: string;
  status: 'Collected' | 'Pending';
}

interface LrSubjectTreeProps {
  heading: string;
  meta: string;
  count: number;
  countMeta: string;
  entities: Entity[];
  scopeList: ScopeItem[];
}

export function LrSubjectTree({
  heading,
  meta,
  count,
  countMeta,
  entities,
  scopeList,
}: LrSubjectTreeProps) {
  return (
    <div className="relative bg-[var(--paper)] border-[1.5px] border-[var(--line)] rounded-[var(--r-md)] mb-[18px] overflow-hidden">
      {/* Header */}
      <div className="bg-[var(--paper-deep)] p-[14px_20px] border-b border-b-[var(--line-soft)]">
        <div className="flex items-baseline justify-between gap-[12px] mb-[6px]">
          <h3 className="font-display text-[16px] font-medium tracking-[-0.01em] m-0 text-[var(--ink)]">
            {heading}
          </h3>
          <div className="flex-shrink-0 inline-flex items-center gap-[6px] font-mono text-[11px] font-bold tracking-[0.02em] bg-[var(--paper)] px-[8px] py-[4px] rounded-[3px] text-[var(--ink)]">
            <span>{count}</span>
            <span className="text-[var(--ink-mute)]">{countMeta}</span>
          </div>
        </div>
        <div className="font-mono text-[9.5px] text-[var(--ink-soft)] tracking-[0.02em]">{meta}</div>
      </div>

      {/* Entities section */}
      <div className="p-[14px_20px] border-b border-b-[var(--line-soft)]">
        <div className="space-y-[10px]">
          {entities.map((entity, idx) => (
            <div key={idx} className="flex items-start gap-[12px]">
              {/* Flag badge */}
              <div
                className="flex-shrink-0 w-[40px] h-[40px] rounded-[6px] grid place-items-center text-white font-mono text-[11px] font-bold tracking-[0.02em]"
                style={{ background: entity.flagBg }}
              >
                {entity.initials}
              </div>

              {/* Entity details */}
              <div className="flex-1 min-w-0">
                <div className="font-body text-[12px] font-semibold text-[var(--ink)]">
                  {entity.name}
                </div>
                <div className="font-mono text-[9px] text-[var(--ink-soft)] tracking-[0.02em] mt-[2px] mb-[6px]">
                  {entity.meta}
                </div>

                {/* Scope chips */}
                <div className="flex flex-wrap gap-[6px]">
                  {entity.scopeChips.map((chip, cidx) => (
                    <span
                      key={cidx}
                      className="inline-flex items-center px-[6px] py-[2px] bg-[var(--paper-deep)] border border-[var(--line-soft)] rounded-[2px] font-mono text-[8px] font-bold tracking-[0.06em] uppercase text-[var(--ink-mute)]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scope checklist */}
      <div className="p-[14px_20px]">
        <div className="font-mono text-[8px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold mb-[10px]">
          Record scope
        </div>

        <div className="space-y-[8px]">
          {scopeList.map((item, idx) => (
            <div key={idx} className="flex items-start gap-[10px]">
              {/* Checkbox */}
              <div className="flex-shrink-0 w-[18px] h-[18px] mt-[1px] rounded-[3px] border-[1.5px] border-[var(--line)] bg-[var(--paper)] grid place-items-center flex-none">
                {item.collected && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--success)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>

              {/* Label and meta */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-[8px] mb-[2px]">
                  <span className="font-body text-[12px] text-[var(--ink)]">
                    {item.label}
                  </span>
                  <span
                    className={`inline-flex items-center px-[4px] py-[1px] text-[8px] font-mono font-bold tracking-[0.06em] uppercase rounded-[2px] ${
                      item.collected
                        ? 'bg-[var(--success-bg)] text-[var(--success)]'
                        : 'bg-[var(--amber-bg)] text-[var(--amber)]'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="font-mono text-[9px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.4]">
                  {item.meta}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
