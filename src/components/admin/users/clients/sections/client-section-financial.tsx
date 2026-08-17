import type { ClientProfile } from '@/lib/mock-data/admin/client-profiles-data';

interface ClientSectionFinancialProps {
  profile: ClientProfile;
}

export function ClientSectionFinancial({ profile }: ClientSectionFinancialProps) {
  const financial = profile.financial;

  if (!financial) {
    return null;
  }

  const { sectionStatus, headStats, paymentMethods, subscription, transactions } = financial;
  const isEmpty =
    headStats.length === 0 &&
    paymentMethods.rows.length === 0 &&
    subscription.rows.length === 0 &&
    transactions.rows.length === 0;

  return (
    // admin.html line 17669: <section class="cd-section" id="cl-section-financial">
    <section
      id="cl-section-financial"
      className="border-t border-[var(--line)] py-[36px] scroll-mt-[80px] first:border-t-0 first:pt-[12px]"
    >
      {/* admin.html line 17670: <div class="cd-section-head"> */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            05 · 08
          </span>
          <h2 className="font-display [font-variation-settings:'opsz'_96] text-[24px] font-medium tracking-[-0.02em] leading-[1.1]">
            Financial activity
          </h2>
        </div>
        {/* admin.html line 17675: <span class="cd-section-status"> */}
        <span
          className={`inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold pt-[3px] pb-[3px] pl-[8px] pr-[9px] rounded-full before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[currentColor] ${
            sectionStatus.variant === 'warn'
              ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
              : sectionStatus.variant === 'neutral'
                ? 'bg-[var(--cream-deep)] text-[var(--ink-soft)]'
                : 'bg-[var(--success-bg)] text-[var(--success)]'
          }`}
        >
          {sectionStatus.label}
        </span>
      </div>

      {isEmpty ? (
        // Empty-state for cl-005 Open Tundra (pending)
        <div className="bg-[var(--paper)] border border-dashed border-[var(--line)] rounded-[var(--r-md)] p-[40px] text-center">
          <div className="font-display [font-variation-settings:'opsz'_48] text-[18px] font-medium text-[var(--ink)] mb-[6px]">
            No financial activity yet
          </div>
          <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.06em]">
            Financial activity will appear once verified status is granted and first hire is made
          </div>
        </div>
      ) : (
        <>
          {/* admin.html line 17678: <div class="cd-fin-head-stats"> — 3-tile grid */}
          {headStats.length > 0 && (
            <div className="grid grid-cols-3 gap-0 bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mb-[16px] overflow-hidden max-[720px]:grid-cols-1">
              {headStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="px-[22px] py-[18px] border-r border-[var(--line-soft)] last:border-r-0 max-[720px]:border-r-0 max-[720px]:border-b max-[720px]:border-[var(--line-soft)] max-[720px]:last:border-b-0"
                >
                  {/* admin.html line 17680: <div class="fin-label"> */}
                  <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] mb-[6px]">
                    {stat.label}
                  </div>
                  {/* admin.html line 17681: <div class="fin-value"> */}
                  <div className="font-display [font-variation-settings:'opsz'_96] text-[28px] font-medium text-[var(--ink)] tracking-[-0.02em] leading-none [font-variant-numeric:tabular-nums] flex items-baseline gap-[6px]">
                    <span className="text-[16px] text-[var(--ink-mute)] font-normal font-mono">
                      {stat.currency}
                    </span>
                    {stat.value}
                  </div>
                  {/* admin.html line 17682: <div class="fin-meta"> */}
                  <div className="mt-[6px] font-mono text-[10.5px] tracking-[0.04em] text-[var(--ink-mute)]">
                    {stat.meta}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* admin.html line 17696: <div class="cd-fin-grid"> — 2-col Payment + Subscription */}
          {(paymentMethods.rows.length > 0 || subscription.rows.length > 0) && (
            <div className="grid grid-cols-2 gap-[16px] mb-[16px] max-[880px]:grid-cols-1">
              {/* Payment methods card (admin.html lines 17697-17723) */}
              {paymentMethods.rows.length > 0 && (
                <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
                  {/* admin.html line 17699: <div class="card-head"> */}
                  <div className="flex items-center justify-between px-[16px] py-[11px] bg-[var(--paper-deep)] border-b border-[var(--line-soft)] font-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold">
                    <span>Payment methods</span>
                    <span className="font-mono text-[10.5px] text-[var(--ink-soft)] normal-case tracking-normal">
                      {paymentMethods.summary}
                    </span>
                  </div>
                  {/* admin.html line 17703: <div class="cd-pm-list"> */}
                  <div className="p-0">
                    {paymentMethods.rows.map((pm, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-[auto_1fr_auto_auto] gap-[12px] items-center px-[16px] py-[12px] border-b border-dashed border-[var(--line-soft)] last:border-b-0"
                      >
                        {/* admin.html line 17705: <div class="cd-payment-icon" style="background: ..."> */}
                        <div
                          className="w-[36px] h-[24px] rounded-[3px] grid place-items-center text-white font-mono text-[9px] tracking-[0.06em] font-bold flex-shrink-0"
                          style={{ background: pm.iconGradient }}
                        >
                          {pm.iconLabel}
                        </div>
                        {/* admin.html line 17706: name + meta wrapper */}
                        <div className="min-w-0">
                          <div className="text-[13px] font-semibold text-[var(--ink)]">
                            {pm.name}
                          </div>
                          <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
                            {pm.meta}
                          </div>
                        </div>
                        {/* admin.html line 17710: <span class="pm-tag"> */}
                        <span
                          className={`font-mono text-[9px] tracking-[0.12em] uppercase px-[7px] py-[2px] rounded-[3px] font-semibold whitespace-nowrap ${
                            pm.tag === 'primary'
                              ? 'bg-[var(--ink)] text-[var(--paper)]'
                              : 'bg-[var(--cream-deep)] text-[var(--ink-soft)]'
                          }`}
                        >
                          {pm.tagLabel}
                        </span>
                        {/* admin.html line 17711: <span class="pm-status"> */}
                        <span
                          className={`font-mono text-[9px] tracking-[0.1em] uppercase px-[7px] py-[2px] rounded-[3px] font-semibold whitespace-nowrap ${
                            pm.status.variant === 'danger'
                              ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
                              : 'bg-[var(--success-bg)] text-[var(--success)]'
                          }`}
                        >
                          {pm.status.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Subscription card (admin.html lines 17725-17743) */}
              {subscription.rows.length > 0 && (
                <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
                  <div className="flex items-center justify-between px-[16px] py-[11px] bg-[var(--paper-deep)] border-b border-[var(--line-soft)] font-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold">
                    <span>Subscription</span>
                    <span className="font-mono text-[10.5px] text-[var(--ink-soft)] normal-case tracking-normal">
                      {subscription.summary}
                    </span>
                  </div>
                  {/* admin.html line 17731: <div class="cd-tax-list"> */}
                  <div className="p-0">
                    {subscription.rows.map((sub, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-[10px] px-[16px] py-[10px] border-b border-dashed border-[var(--line-soft)] last:border-b-0 text-[12.5px]"
                      >
                        <span className="font-semibold text-[var(--ink)] flex-1 min-w-0">
                          {sub.name}
                        </span>
                        <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
                          {sub.meta}
                        </span>
                        <span className="font-mono text-[9px] tracking-[0.12em] uppercase px-[7px] py-[2px] rounded-[3px] font-semibold bg-[var(--success-bg)] text-[var(--success)]">
                          {sub.statusLabel}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* admin.html line 17747: <div class="cd-payouts"> — Recent transactions */}
          {transactions.rows.length > 0 && (
            <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
              <div className="flex items-center justify-between px-[16px] py-[11px] bg-[var(--paper-deep)] border-b border-[var(--line-soft)] font-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold">
                <span>{transactions.summary}</span>
              </div>
              {transactions.rows.map((txn, idx) => (
                // admin.html line 17751: <div class="cd-payout-row">
                <div
                  key={idx}
                  className="grid grid-cols-[auto_1fr_auto_auto] gap-[14px] items-center px-[16px] py-[10px] border-b border-dashed border-[var(--line-soft)] last:border-b-0 text-[12.5px]"
                >
                  {/* admin.html line 17752: <span class="payout-date"> */}
                  <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] min-w-[70px]">
                    {txn.date}
                  </span>
                  {/* admin.html line 17753: <span class="payout-desc"> */}
                  <span className="text-[var(--ink)] font-medium">{txn.description}</span>
                  {/* admin.html line 17754: <span class="payout-amount"> */}
                  <span
                    className={`font-mono text-[12.5px] font-semibold tracking-[0.01em] [font-variant-numeric:tabular-nums] ${
                      txn.amountVariant === 'success'
                        ? 'text-[var(--success)]'
                        : 'text-[var(--ink)]'
                    }`}
                  >
                    {txn.amount}
                  </span>
                  {/* admin.html line 17755: <span class="payout-status"> */}
                  <span
                    className={`font-mono text-[9px] tracking-[0.1em] uppercase px-[7px] py-[2px] rounded-[3px] font-semibold ${
                      txn.status.variant === 'danger'
                        ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
                        : txn.status.variant === 'warn'
                          ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
                          : 'bg-[var(--success-bg)] text-[var(--success)]'
                    }`}
                  >
                    {txn.status.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
