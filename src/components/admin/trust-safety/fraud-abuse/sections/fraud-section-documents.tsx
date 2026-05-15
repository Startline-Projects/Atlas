'use client';

/**
 * Phase 15c — §04 Documents involved (Client component for onClick interactivity).
 *
 * admin.html CSS: .fr-doc-list + .fr-doc-item (L16295-16356)
 * admin.html markup: L39960-40050
 *
 * 6 doc items + "+17 more" CTA. Section head has right-aligned action button
 * ("Export evidence pack"). Each item: 32×32 icon (variant) + name/meta + VIEW →.
 * Flagged variant: dc-icon bg danger-bg color danger.
 */
import type { FraudDocumentsData, FraudDocIconKey } from '@/lib/mock-data/admin/fraud-alerts-data';

/** Doc icon SVGs — admin.html L39979-40035 verbatim path data. */
function DocIcon({ iconKey }: { iconKey: FraudDocIconKey }) {
  switch (iconKey) {
    case 'file':
      return (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>);
    case 'image':
      return (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>);
    case 'dollar':
      return (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>);
    case 'globe':
      return (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>);
    case 'star':
      return (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>);
  }
}

interface FraudSectionDocumentsProps {
  data: FraudDocumentsData;
}

export function FraudSectionDocuments({ data }: FraudSectionDocumentsProps) {
  return (
    <section
      data-fraud-section="documents"
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[20px] px-[24px] mb-[16px]"
    >
      {/* Section head with right-aligned action */}
      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[16px] pb-[12px] border-b border-dashed border-[var(--line-soft)]">
        <div className="flex items-baseline gap-[10px]">
          <span className="font-mono text-[9.5px] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[2px] px-[6px] rounded-[3px] font-bold tracking-[0.06em]">
            04
          </span>
          <div>
            <h2 className="font-display text-[18px] font-medium tracking-[-0.01em] m-0 leading-[1.2] text-[var(--ink)]">
              Documents involved
            </h2>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[4px]">
              {data.flaggedHeader}
            </div>
          </div>
        </div>
        <button
          type="button"
          data-fraud-action={data.exportActionKey}
          onClick={() => console.log('[fraud-action]', data.exportActionKey)}
          className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all duration-150 ease whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] [&>svg]:flex-shrink-0 [&>svg]:text-[var(--ink-mute)] hover:[&>svg]:text-[var(--ink)]"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          {data.exportActionLabel}
        </button>
      </div>

      {/* Doc list */}
      <div className="flex flex-col gap-[8px]">
        {data.docs.map((doc) => (
          <button
            key={doc.id}
            type="button"
            data-fraud-action={doc.actionKey}
            onClick={() => console.log('[fraud-action]', doc.actionKey)}
            className="grid grid-cols-[36px_1fr_auto] gap-[12px] items-center py-[10px] px-[12px] bg-[var(--paper-deep)] border border-[var(--line-soft)] rounded-[var(--r-sm)] cursor-pointer transition-all duration-[120ms] ease text-left hover:border-[var(--line-strong)] hover:bg-[var(--paper)]"
          >
            {/* dc-icon */}
            <div
              className={`w-[32px] h-[32px] rounded-[6px] grid place-items-center flex-shrink-0 ${
                doc.variant === 'flagged'
                  ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
                  : 'bg-[var(--cream-deep)] text-[var(--ink-mute)]'
              }`}
            >
              <DocIcon iconKey={doc.iconKey} />
            </div>

            {/* dc-text */}
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-[var(--ink)] tracking-[-0.01em] truncate">
                {doc.name}
              </div>
              <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
                {doc.meta}
              </div>
            </div>

            {/* dc-action */}
            <div className="font-mono text-[10px] text-[var(--ink-soft)] tracking-[0.06em] uppercase font-bold">
              VIEW →
            </div>
          </button>
        ))}

        {/* CTA */}
        <div className="text-center py-[10px] pb-0">
          <button
            type="button"
            data-fraud-action={data.ctaActionKey}
            onClick={() => console.log('[fraud-action]', data.ctaActionKey)}
            className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.04em] bg-transparent border-0 cursor-pointer py-[6px] px-[14px] hover:text-[var(--ink)] transition-colors"
          >
            {data.ctaLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
