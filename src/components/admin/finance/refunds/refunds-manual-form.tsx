import { manualFormData } from '@/lib/mock-data/admin/refunds-data';

export function RefundsManualForm() {
  const d = manualFormData;

  return (
    <section className="mb-[28px]">
      <div className="flex items-end justify-between gap-[14px] flex-wrap mb-[14px] pb-[12px] border-b border-[var(--line)]">
        <div>
          <h2 className="font-display text-[22px] font-medium tracking-[-0.02em] m-0 mb-[4px] text-[var(--ink)]">
            {d.sectionTitle}
          </h2>
          <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
            {d.sectionMeta}
          </div>
        </div>
      </div>

      <div className="bg-[var(--paper)] border-[1.5px] border-[var(--line-strong)] rounded-[var(--r-md)] overflow-hidden">
        {/* Header */}
        <div className="py-[16px] px-[20px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)] flex items-start justify-between gap-[14px] flex-wrap">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-[17px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[3px] leading-[1.2]">
              {d.title}
            </h3>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] leading-[1.5]">
              {d.meta}
            </div>
          </div>
        </div>

        {/* Body — 2-col grid */}
        <div className="py-[18px] px-[20px] grid grid-cols-2 gap-[18px] max-[880px]:grid-cols-1">

          {/* Recipient autocomplete */}
          <div>
            <div className="flex items-center gap-[8px] mb-[8px] font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Recipient
              <span className="ml-auto font-mono text-[9px] tracking-[0.06em] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[1px] px-[5px] rounded-[3px] font-semibold normal-case">required</span>
            </div>
            <div className="relative">
              <input
                type="text"
                readOnly
                defaultValue={d.recipientValue}
                className="w-full border border-[var(--line)] rounded-[var(--r-sm)] py-[10px] px-[12px] font-body text-[13px] text-[var(--ink)] bg-[var(--paper-deep)] outline-none tracking-[-0.005em] focus:border-[var(--ink)]"
              />
              {/* Sample autocomplete dropdown (visual demo) */}
              <div className="absolute top-full left-0 right-0 mt-[4px] bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-sm)] z-[5] shadow-[0_6px_14px_rgba(14,14,12,0.06)] max-h-[200px] overflow-y-auto">
                {d.autocompleteResults.map((r) => (
                  <div
                    key={r.id}
                    className="py-[8px] px-[12px] flex items-center gap-[10px] cursor-pointer border-b border-b-[var(--line-soft)] last:border-b-0 transition-colors hover:bg-[var(--paper-deep)]"
                  >
                    <div
                      className="w-[24px] h-[24px] rounded-full grid place-items-center font-display text-[10px] text-[var(--paper)] font-medium flex-shrink-0"
                      style={{ background: r.gradient }}
                    >
                      {r.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[12.5px] font-semibold text-[var(--ink)] tracking-[-0.01em]">{r.name}</div>
                      <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[1px]">{r.meta}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[6px]">
              selected: <strong className="text-[var(--ink)] font-bold">{d.recipientSelected}</strong> ({d.recipientSelectedId}) · {d.recipientHint}
            </div>
          </div>

          {/* Amount + currency + source funds */}
          <div>
            <div className="flex items-center gap-[8px] mb-[8px] font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Amount
              <span className="ml-auto font-mono text-[9px] tracking-[0.06em] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[1px] px-[5px] rounded-[3px] font-semibold normal-case">required</span>
            </div>
            <div className="flex items-stretch border border-[var(--line)] rounded-[var(--r-sm)] bg-[var(--paper-deep)] overflow-hidden">
              <input
                type="text"
                readOnly
                defaultValue={d.amountValue}
                className="flex-1 border-0 py-[10px] px-[12px] font-display text-[17px] font-medium text-[var(--ink)] tracking-[-0.01em] bg-transparent outline-none tabular-nums min-w-0"
              />
              <select
                defaultValue="EUR"
                className="w-auto border-0 border-l border-l-[var(--line)] rounded-none py-0 px-[10px] bg-[var(--cream-deep)] font-mono text-[11px] font-bold text-[var(--ink-soft)] tracking-[0.06em] cursor-pointer outline-none"
              >
                {d.currencies.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[6px]">
              {d.amountHint}
            </div>

            {/* Source funds */}
            <div className="flex items-center gap-[8px] mb-[8px] mt-[18px] font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
              Source funds
            </div>
            <div className="flex gap-[6px] flex-wrap mt-[4px]">
              {d.sourceChips.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  className={`py-[4px] px-[10px] font-mono text-[11px] font-semibold tracking-[0.02em] border rounded-full cursor-pointer transition-all ${
                    chip.active
                      ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]'
                      : 'bg-[var(--paper-deep)] text-[var(--ink-soft)] border-[var(--line)] hover:text-[var(--ink)] hover:border-[var(--line-strong)]'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
            <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[6px]">
              {d.sourceHint}
            </div>
          </div>

          {/* Reason + notes — full width */}
          <div className="col-span-2 max-[880px]:col-span-1">
            <div className="flex items-center gap-[8px] mb-[8px] font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Reason category
              <span className="ml-auto font-mono text-[9px] tracking-[0.06em] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[1px] px-[5px] rounded-[3px] font-semibold normal-case">required</span>
            </div>
            <select
              defaultValue={d.reasonSelected}
              className="w-full border border-[var(--line)] rounded-[var(--r-sm)] py-[10px] px-[12px] font-body text-[13px] text-[var(--ink)] bg-[var(--paper-deep)] outline-none tracking-[-0.005em] cursor-pointer focus:border-[var(--ink)]"
            >
              {d.reasonOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>

            <div className="flex items-center gap-[8px] mb-[8px] mt-[16px] font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Detailed notes
              <span className="ml-auto font-mono text-[9px] tracking-[0.06em] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[1px] px-[5px] rounded-[3px] font-semibold normal-case">required if &quot;Other&quot;</span>
            </div>
            <textarea
              readOnly
              defaultValue={d.notesValue}
              placeholder={d.notesPlaceholder}
              className="w-full border border-[var(--line)] rounded-[var(--r-sm)] py-[10px] px-[12px] font-body text-[13px] text-[var(--ink)] bg-[var(--paper-deep)] outline-none tracking-[-0.005em] min-h-[60px] resize-y leading-[1.5] focus:border-[var(--ink)]"
            />
          </div>
        </div>

        {/* Confirm strip */}
        <div className="flex items-center justify-between gap-[14px] py-[14px] px-[20px] border-t border-t-[var(--line-soft)] bg-[var(--paper-deep)] flex-wrap">
          <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.5] flex-1 min-w-[200px]">
            Refund <strong className="text-[var(--ink)] font-bold">{d.confirmText.amount}</strong> to <strong className="text-[var(--ink)] font-bold">{d.confirmText.recipient}</strong> · source: <strong className="text-[var(--ink)] font-bold">{d.confirmText.source}</strong> · reason: <strong className="text-[var(--ink)] font-bold">{d.confirmText.reason}</strong>. {d.confirmText.suffix}
          </div>
          <div className="inline-flex gap-[8px]">
            <button
              type="button"
              className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap transition-all hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)]"
            >
              Clear
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--ink)] border border-[var(--ink)] rounded-full text-[var(--paper)] cursor-pointer whitespace-nowrap transition-all hover:opacity-90"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Issue refund
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
