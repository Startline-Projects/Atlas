// Admin.html lines 47795-47994
import type { DsrScopeSplit } from '@/lib/mock-data/admin/data-subject-rights-data';

interface DsrScopeSplitProps {
  scope: DsrScopeSplit;
}

export function DsrScopeSplit({ scope }: DsrScopeSplitProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      {/* Head */}
      <div className="py-[14px] px-[20px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)] flex items-center justify-between gap-[14px] flex-wrap">
        <div>
          <h3 className="font-display text-[15px] font-medium tracking-[-0.01em] text-[var(--ink)] m-0 mb-[3px] leading-[1.2]">
            Scope · partial deletion · 12 categories analyzed
          </h3>
          <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
            {scope.metaLabel}
          </div>
        </div>
        <div className="inline-flex gap-[6px] flex-wrap items-center">
          <button className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Dry-run
          </button>
          <button className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]">
            Edit scope
          </button>
        </div>
      </div>

      {/* Scope split grid */}
      <div className="grid grid-cols-2 gap-0 max-[880px]:grid-cols-1">
        {/* DELETE COLUMN */}
        <div
          className="py-[18px] px-[20px] border-r border-r-dashed border-r-[var(--line)] max-[880px]:border-r-0 max-[880px]:border-b max-[880px]:border-b-dashed max-[880px]:border-b-[var(--line)]"
          style={{ background: 'linear-gradient(180deg, rgba(194,65,43,0.04), transparent)' }}
        >
          <div className="flex items-center gap-[8px] mb-[12px] pb-[10px] border-b border-b-dashed border-b-[var(--line-soft)]">
            <div className="w-[26px] h-[26px] rounded-full bg-[var(--danger)] text-[var(--paper)] grid place-items-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </div>
            <h4 className="font-display text-[13.5px] font-medium tracking-[-0.01em] text-[var(--ink)] m-0 leading-[1.2]">
              Will be deleted
            </h4>
            <span className="ml-auto font-display text-[18px] font-medium tracking-[-0.02em] tabular-nums text-[var(--danger)]">
              {scope.delete.count}
            </span>
          </div>
          <div className="flex flex-col gap-[8px]">
            {scope.delete.items.map((item, idx) => (
              <div key={idx} className="p-[10px_12px] bg-[var(--paper)] border border-[var(--line-soft)] rounded-[var(--r-sm)]">
                <div className="flex items-center gap-[8px] mb-[4px]">
                  <div className="w-[16px] h-[16px] rounded-[3px] bg-[var(--danger)] text-[var(--paper)] grid place-items-center flex-shrink-0">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                    </svg>
                  </div>
                  <span className="text-[12.5px] font-semibold text-[var(--ink)] tracking-[-0.01em]">
                    {item.name}
                  </span>
                  <span className="ml-auto font-mono text-[10px] font-bold text-[var(--ink-mute)] tracking-[0.04em]">
                    {item.count}
                  </span>
                </div>
                <div
                  className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] pl-[24px] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
                  dangerouslySetInnerHTML={{ __html: item.detailHtml }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* RETAIN COLUMN */}
        <div
          className="py-[18px] px-[20px]"
          style={{ background: 'linear-gradient(180deg, rgba(46,125,84,0.04), transparent)' }}
        >
          <div className="flex items-center gap-[8px] mb-[12px] pb-[10px] border-b border-b-dashed border-b-[var(--line-soft)]">
            <div className="w-[26px] h-[26px] rounded-full bg-[var(--success)] text-[var(--paper)] grid place-items-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h4 className="font-display text-[13.5px] font-medium tracking-[-0.01em] text-[var(--ink)] m-0 leading-[1.2]">
              Will be retained · with legal basis
            </h4>
            <span className="ml-auto font-display text-[18px] font-medium tracking-[-0.02em] tabular-nums text-[var(--success)]">
              {scope.retain.count}
            </span>
          </div>
          <div className="flex flex-col gap-[8px]">
            {scope.retain.items.map((item, idx) => (
              <div key={idx} className="p-[10px_12px] bg-[var(--paper)] border border-[var(--line-soft)] rounded-[var(--r-sm)]">
                <div className="flex items-center gap-[8px] mb-[4px]">
                  <div className="w-[16px] h-[16px] rounded-[3px] bg-[var(--success)] text-[var(--paper)] grid place-items-center flex-shrink-0">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                    </svg>
                  </div>
                  <span className="text-[12.5px] font-semibold text-[var(--ink)] tracking-[-0.01em]">
                    {item.name}
                  </span>
                  <span className="ml-auto font-mono text-[10px] font-bold text-[var(--ink-mute)] tracking-[0.04em]">
                    {item.count}
                  </span>
                </div>
                <div
                  className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] pl-[24px] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
                  dangerouslySetInnerHTML={{ __html: item.detailHtml }}
                />
                <span className="inline-block mt-[4px] ml-[24px] font-mono text-[9px] tracking-[0.08em] uppercase font-bold py-[2px] px-[6px] bg-[var(--cream-deep)] text-[var(--ink-soft)] rounded-[3px]">
                  {item.legalBasis}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process strip footer */}
      <div className="py-[16px] px-[20px] bg-[var(--ink)] text-[var(--paper)] flex items-center justify-between gap-[14px] flex-wrap">
        <div
          className="flex-1 min-w-[200px] font-mono text-[11px] text-[rgba(251,248,242,0.78)] tracking-[0.02em] leading-[1.55] [&_strong]:text-[var(--paper)] [&_strong]:font-bold"
          dangerouslySetInnerHTML={{ __html: scope.processStrip.textHtml }}
        />
        <div className="inline-flex gap-[6px] flex-wrap">
          <button className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[rgba(251,248,242,0.10)] border border-[rgba(251,248,242,0.2)] rounded-full text-[var(--paper)] cursor-pointer transition-all hover:bg-[rgba(251,248,242,0.18)]">
            {scope.processStrip.primaryBtnLabel}
          </button>
          <button className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--danger)] border border-[var(--danger)] rounded-full text-[var(--paper)] cursor-pointer transition-all hover:bg-[#a8351f] hover:border-[#a8351f]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            </svg>
            {scope.processStrip.executeBtnLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
