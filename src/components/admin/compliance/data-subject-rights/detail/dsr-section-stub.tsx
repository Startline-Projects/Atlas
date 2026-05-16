interface DsrSectionStubProps {
  sectionNum: string;
  title: string;
  meta: string;
  placeholderLabel: string;
}

export function DsrSectionStub({ sectionNum, title, meta, placeholderLabel }: DsrSectionStubProps) {
  return (
    <section className="mb-[28px]">
      <div className="flex items-start justify-between gap-[16px] mb-[14px] pb-[12px] border-b border-[var(--line)]">
        <div className="flex items-baseline gap-[12px]">
          <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-[var(--ink-mute)]">
            {sectionNum}
          </span>
          <div>
            <h2 className="font-display text-[18px] font-medium tracking-[-0.015em] text-[var(--ink)] mb-[3px] leading-[1.2]">
              {title}
            </h2>
            <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] leading-[1.5]">
              {meta}
            </div>
          </div>
        </div>
      </div>
      <div className="border border-dashed border-[var(--line)] rounded-[var(--r-md)] py-[40px] px-[20px] text-center font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.04em] uppercase">
        {placeholderLabel} coming in Pass B
      </div>
    </section>
  );
}
