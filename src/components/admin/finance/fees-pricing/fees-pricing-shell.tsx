import {
  FEES_PRICING_NAV_ITEMS,
  FEES_PRICING_PAGE_HEADER,
} from '@/lib/mock-data/admin/fees-pricing-data';
import { FeesPricingSectionNav } from './fees-pricing-section-nav';
import { FeesPricingGateBanner } from './fees-pricing-gate-banner';
import { FpCurrentFees } from './sections/fp-current-fees';
import { FpReCertification } from './sections/fp-re-certification';
import { FpPassThrough } from './sections/fp-pass-through';
import { FpModifyDrawer } from './sections/fp-modify-drawer';
import { FpPromoCodes } from './sections/fp-promo-codes';
import { FpPricingTiers } from './sections/fp-pricing-tiers';
import { FpAuditLog } from './sections/fp-audit-log';

export function FeesPricingShell() {
  return (
    <div className="max-w-[1320px] mx-auto pt-[28px] px-[32px] pb-[64px] max-[720px]:pt-[22px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      {/* Page header */}
      <div className="flex items-end justify-between gap-[18px] mb-[22px] pb-[18px] border-b border-[var(--line)] flex-wrap">
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-[32px] font-medium tracking-[-0.02em] mb-[4px] leading-[1.1] text-[var(--ink)]">
            {FEES_PRICING_PAGE_HEADER.title}
          </h1>
          <div className="font-mono text-[11px] tracking-[0.04em] text-[var(--ink-mute)]">
            {FEES_PRICING_PAGE_HEADER.meta}
          </div>
        </div>
        <div className="inline-flex gap-[10px] items-center flex-wrap flex-shrink-0">
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            Export policy doc
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Full audit log
          </button>
        </div>
      </div>

      {/* Sticky section navigator */}
      <FeesPricingSectionNav items={FEES_PRICING_NAV_ITEMS} />

      {/* Super Admin permission banner */}
      <FeesPricingGateBanner />

      {/* Section 1 */}
      <FpCurrentFees />

      {/* Section 2 */}
      <FpReCertification />

      {/* Section 3 */}
      <FpPassThrough />

      {/* Section 4 — Modify drawer */}
      <FpModifyDrawer />

      {/* Section 5 — Promotional codes */}
      <FpPromoCodes />

      {/* Section 6 — Pricing tiers */}
      <FpPricingTiers />

      {/* Section 7 — Audit log */}
      <FpAuditLog />
    </div>
  );
}
