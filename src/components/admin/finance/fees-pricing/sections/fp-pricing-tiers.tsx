import { FP_TIER_CARDS, type FpTierCard } from '@/lib/mock-data/admin/fees-pricing-data';
import { FeesPricingSectionHead } from '../fees-pricing-section-head';

function TierCard({ tier }: { tier: FpTierCard }) {
  const isCurrent = tier.variant === 'current';
  const cardClasses = isCurrent
    ? 'border-solid border-[var(--ink)] opacity-100'
    : 'border-dashed border-[var(--line-strong)] opacity-[0.85]';
  const badge = isCurrent ? (
    <span
      aria-hidden="true"
      className="absolute top-[12px] right-[12px] font-mono text-[9px] tracking-[0.16em] uppercase font-bold bg-[var(--ink)] text-[var(--paper)] py-[2px] px-[8px] rounded-[3px]"
    >
      Current
    </span>
  ) : (
    <span
      aria-hidden="true"
      className="absolute top-[12px] right-[12px] font-mono text-[9px] tracking-[0.12em] uppercase font-bold bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[2px] px-[8px] rounded-[3px]"
    >
      Preview · not live
    </span>
  );

  return (
    <div className={`bg-[var(--paper)] border-[1.5px] rounded-[var(--r-md)] p-[18px_20px] relative ${cardClasses}`}>
      {badge}
      <div className="font-display text-[20px] font-medium text-[var(--ink)] tracking-[-0.02em] mb-[4px]">
        {tier.name}
      </div>
      <div className="font-display text-[30px] font-medium text-[var(--ink)] tracking-[-0.025em] leading-none mb-[14px]">
        {tier.price}
        <span className="font-mono text-[13px] text-[var(--ink-mute)] font-semibold tracking-[0.04em] ml-[4px]">
          {tier.unit}
        </span>
      </div>
      <ul className="list-none m-0 p-0 flex flex-col gap-[6px] font-body text-[12.5px] text-[var(--ink-soft)] tracking-[-0.005em] leading-[1.5]">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-[6px]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[12px] h-[12px] text-[var(--success)] flex-shrink-0 mt-[4px]"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-[14px] pt-[14px] border-t border-dashed border-t-[var(--line-soft)] flex justify-end gap-[8px]">
        {tier.actions.map((action) => {
          const classes = action.primary
            ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] hover:bg-black'
            : 'bg-[var(--paper)] text-[var(--ink-soft)] border-[var(--line)] hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)]';
          return (
            <button
              key={action.label}
              type="button"
              className={`inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium border rounded-full cursor-pointer whitespace-nowrap transition-all ${classes}`}
            >
              {action.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function FpPricingTiers() {
  return (
    <section id="fp-section-tiers" className="mb-[28px]">
      <FeesPricingSectionHead
        title="Pricing tiers"
        meta="Premium and Enterprise tiers are roadmapped for Q3 · current platform runs single-tier · the cards below are configuration previews"
      />
      <div className="grid grid-cols-3 max-[880px]:grid-cols-1 gap-[14px]">
        {FP_TIER_CARDS.map((tier) => (
          <TierCard key={tier.id} tier={tier} />
        ))}
      </div>
    </section>
  );
}
