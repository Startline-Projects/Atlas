import { taxDocumentsPageHeader } from '@/lib/mock-data/admin/tax-documents-data';

export function TaxDocumentsPageHeader() {
  return (
    <div className="flex items-end justify-between gap-[18px] mb-[22px] pb-[18px] border-b border-[var(--line)] flex-wrap">
      <div className="min-w-0">
        <h1 className="font-display text-[32px] font-medium tracking-[-0.02em] leading-[1.1] m-0 mb-[4px] text-[var(--ink)]">
          {taxDocumentsPageHeader.title}
        </h1>
        <div className="font-mono text-[11px] tracking-[0.04em] text-[var(--ink-mute)] flex items-center gap-[12px] flex-wrap">
          {taxDocumentsPageHeader.meta}
          {taxDocumentsPageHeader.metaPulses?.map((pulse, idx) => (
            <span
              key={idx}
              className={`inline-flex items-center gap-[4px] px-[8px] py-[2px] rounded-[999px] font-semibold ${
                pulse.variant === 'danger'
                  ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
                  : pulse.variant === 'warn'
                    ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
                    : 'bg-[var(--success-bg)] text-[var(--success)]'
              }`}
            >
              <span
                className={`w-[5px] h-[5px] rounded-full animate-pulse-fr ${
                  pulse.variant === 'danger'
                    ? 'bg-[var(--danger)]'
                    : pulse.variant === 'warn'
                      ? 'bg-[var(--amber)]'
                      : 'bg-[var(--success)]'
                }`}
              />
              {pulse.text}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-[8px] flex-wrap">
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          Tax policy
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] rounded-full cursor-pointer transition-all hover:bg-[var(--ink-soft)] hover:border-[var(--ink-soft)]"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Bulk run
        </button>
      </div>
    </div>
  );
}
