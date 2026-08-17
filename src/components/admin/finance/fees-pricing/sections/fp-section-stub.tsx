import { FeesPricingSectionHead } from '../fees-pricing-section-head';

interface FpSectionStubProps {
  id: string;
  title: string;
  meta: string;
}

export function FpSectionStub({ id, title, meta }: FpSectionStubProps) {
  return (
    <section id={id} className="mb-[28px]">
      <FeesPricingSectionHead title={title} meta={meta} />
      <div className="bg-[var(--paper)] border border-dashed border-[var(--line)] rounded-[var(--r-md)] p-[28px_24px] text-center">
        <div className="font-display text-[15px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[6px]">
          Coming in Pass B
        </div>
        <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5]">
          This section is scaffolded for routing parity. Full content (modify drawer · promo codes table ·
          pricing tiers · audit timeline) will be populated in the next pass.
        </div>
      </div>
    </section>
  );
}
