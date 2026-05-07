import type { CandidateProfile } from '@/lib/mock-data/admin/candidate-profiles-data';

interface CandidateSectionFinancialProps {
  profile: CandidateProfile;
}

export function CandidateSectionFinancial({ profile }: CandidateSectionFinancialProps) {
  const { financial } = profile;
  const hasTransactions = financial.recentTransactions.length > 0;
  const hasTaxDocs = financial.taxDocs.length > 0;

  return (
    <section className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] first:border-t-0 first:pt-[12px]" id="cd-section-financial">
      {/* Section header */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-medium block">05 · 09</span>
          <h2 className="font-display text-[24px] font-medium tracking-[-0.02em]">Financial activity</h2>
        </div>
        <span className="inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--success)] font-semibold px-[9px] py-[3px] rounded-full bg-[var(--success-bg)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current whitespace-nowrap">{financial.totalEarned} lifetime</span>
      </div>

      {/* Summary stats grid */}
      <div className="grid grid-cols-3 gap-0 bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mb-[16px] overflow-hidden max-[720px]:grid-cols-1">
        <div className="px-[22px] py-[18px] border-r border-[var(--line-soft)] max-[720px]:border-r-0 max-[720px]:border-b max-[720px]:border-[var(--line-soft)] last:border-r-0">
          <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] mb-[6px] font-semibold">Total earned</div>
          <div className="font-display [font-variation-settings:'opsz'_96] text-[28px] font-medium text-[var(--ink)] tracking-[-0.02em] leading-none [font-variant-numeric:tabular-nums] flex items-baseline gap-[6px]">
            <span className="font-mono text-[16px] text-[var(--ink-mute)] font-normal">$</span>
            {financial.totalEarned.replace('$', '')}
          </div>
          <div className="font-mono text-[10.5px] tracking-[0.04em] text-[var(--ink-mute)] mt-[6px]">since Mar 2024</div>
        </div>
        <div className="px-[22px] py-[18px] border-r border-[var(--line-soft)] max-[720px]:border-r-0 max-[720px]:border-b max-[720px]:border-[var(--line-soft)] last:border-r-0">
          <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] mb-[6px] font-semibold">Last 30 days</div>
          <div className="font-display [font-variation-settings:'opsz'_96] text-[28px] font-medium text-[var(--ink)] tracking-[-0.02em] leading-none [font-variant-numeric:tabular-nums] flex items-baseline gap-[6px]">
            <span className="font-mono text-[16px] text-[var(--ink-mute)] font-normal">$</span>
            {financial.last30Days.replace('$', '')}
          </div>
          <div className="font-mono text-[10.5px] tracking-[0.04em] text-[var(--ink-mute)] mt-[6px]">{profile.engagements.active} active</div>
        </div>
        <div className="px-[22px] py-[18px] border-r border-[var(--line-soft)] max-[720px]:border-r-0 max-[720px]:border-b max-[720px]:border-[var(--line-soft)] last:border-r-0">
          <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] mb-[6px] font-semibold">Pending payout</div>
          <div className="font-display [font-variation-settings:'opsz'_96] text-[28px] font-medium text-[var(--ink)] tracking-[-0.02em] leading-none [font-variant-numeric:tabular-nums] flex items-baseline gap-[6px]">
            <span className="font-mono text-[16px] text-[var(--ink-mute)] font-normal">$</span>
            {financial.pendingPayout.replace('$', '')}
          </div>
          <div className="font-mono text-[10.5px] tracking-[0.04em] text-[var(--ink-mute)] mt-[6px]">may vary</div>
        </div>
      </div>

      {/* Payment method and Tax docs grid */}
      <div className="grid grid-cols-2 gap-[16px] mb-[16px] max-[880px]:grid-cols-1">
        {/* Payment method card */}
        <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
          <div className="flex items-center justify-between px-[16px] py-[11px] bg-[var(--paper-deep)] border-b border-[var(--line-soft)] font-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold">
            <span>Payment method on file</span>
            <span className="font-mono text-[10.5px] text-[var(--ink-soft)] font-normal normal-case tracking-normal">Updated Mar 4, 2024</span>
          </div>
          <div className="flex items-center gap-[12px] px-[16px] py-[14px]">
            <div className="w-[36px] h-[24px] rounded-[3px] bg-gradient-to-br from-[#635BFF] to-[#4B45CC] grid place-items-center text-white font-mono text-[9px] tracking-[0.06em] font-bold flex-shrink-0">
              {financial.paymentMethod.provider.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-[var(--ink)]">{financial.paymentMethod.account}</div>
              <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">{financial.paymentMethod.meta}</div>
            </div>
          </div>
        </div>

        {/* Tax docs card */}
        {hasTaxDocs && (
          <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
            <div className="flex items-center justify-between px-[16px] py-[11px] bg-[var(--paper-deep)] border-b border-[var(--line-soft)] font-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold">
              <span>Tax documents</span>
              <span className="font-mono text-[10.5px] text-[var(--ink-soft)] font-normal normal-case tracking-normal">{financial.taxDocs.length} on file</span>
            </div>
            <div className="p-0">
              {financial.taxDocs.map((doc, idx) => (
                <div key={idx} className={`flex items-center gap-[10px] px-[16px] py-[10px] text-[12.5px] ${idx !== financial.taxDocs.length - 1 ? 'border-b border-dashed border-[var(--line-soft)]' : ''}`}>
                  <span className="font-semibold text-[var(--ink)] flex-1 min-w-0">{doc.name}</span>
                  <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] whitespace-nowrap">{doc.name.includes('1099') ? 'Generated' : 'Filed'} {doc.date}</span>
                  <span className="font-mono text-[9px] tracking-[0.12em] uppercase px-[7px] py-[2px] rounded-[3px] font-semibold bg-[var(--success-bg)] text-[var(--success)] whitespace-nowrap">
                    {doc.status === 'valid' ? 'Valid' : 'Expired'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recent transactions card */}
      {hasTransactions && (
        <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden mb-[20px]">
          <div className="flex items-center justify-between px-[16px] py-[11px] bg-[var(--paper-deep)] border-b border-[var(--line-soft)] font-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold">
            <span>Recent transactions (last 5)</span>
          </div>
          <div>
            {financial.recentTransactions.slice(0, 5).map((txn, idx) => (
              <div key={idx} className={`grid gap-[14px] items-center px-[16px] py-[10px] text-[12.5px] ${idx !== financial.recentTransactions.length - 1 ? 'border-b border-dashed border-[var(--line-soft)]' : ''}`} style={{ gridTemplateColumns: 'auto 1fr auto auto' }}>
                <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] min-w-[70px]">{txn.date}</span>
                <span className="text-[var(--ink)] font-medium">{txn.desc}</span>
                <span className={`font-mono text-[12.5px] font-semibold tracking-[0.01em] [font-variant-numeric:tabular-nums] ${txn.status === 'refunded' ? 'text-[var(--danger)]' : 'text-[var(--ink)]'}`}>
                  {txn.amount}
                </span>
                <span className={`font-mono text-[9px] tracking-[0.1em] uppercase px-[7px] py-[2px] rounded-[3px] font-semibold whitespace-nowrap ${
                  txn.status === 'released' ? 'bg-[var(--success-bg)] text-[var(--success)]' : txn.status === 'refunded' ? 'bg-[var(--danger-bg)] text-[var(--danger)]' : 'bg-[var(--amber-bg)] text-[var(--amber)]'
                }`}>
                  {txn.status === 'released' ? 'Released' : txn.status === 'refunded' ? 'Refunded' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
