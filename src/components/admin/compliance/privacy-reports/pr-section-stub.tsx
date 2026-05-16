import { PrSection } from './pr-section';
import { PrSectionHead } from './pr-section-head';

interface PrSectionStubProps {
  id: string;
  number: string;
  title: string;
  meta: string;
}

export function PrSectionStub({ id, number, title, meta }: PrSectionStubProps) {
  return (
    <PrSection id={id}>
      <div className="py-[12px] px-[18px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)]">
        <PrSectionHead number={number} title={title} meta={meta} />
      </div>
      <div className="py-[40px] px-[18px] text-center">
        <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.04em]">
          [Section content — Stage 3 Pass B]
        </div>
      </div>
    </PrSection>
  );
}
