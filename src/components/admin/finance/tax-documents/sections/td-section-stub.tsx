interface TdSectionStubProps {
  id: string;
  title: string;
  meta: string;
}

export function TdSectionStub({ id, title, meta }: TdSectionStubProps) {
  return (
    <section className="mb-[28px]" id={id}>
      <div className="flex items-end justify-between gap-[14px] flex-wrap mb-[14px] pb-[12px] border-b border-[var(--line)]">
        <div>
          <h2 className="font-display text-[22px] font-medium tracking-[-0.02em] m-0 mb-[4px] text-[var(--ink)]">
            {title}
          </h2>
          <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
            {meta}
          </div>
        </div>
      </div>
      <div className="border-2 border-dashed border-[var(--line)] rounded-[var(--r-md)] p-[48px] text-center font-mono text-[12px] text-[var(--ink-mute)] tracking-[0.04em]">
        Coming in Pass B
      </div>
    </section>
  );
}
