interface AudSectionStubProps {
  num: string;
  title: string;
  meta: string;
}

export function AudSectionStub({ num, title, meta }: AudSectionStubProps) {
  return (
    <section className="mb-[28px]">
      <div className="flex items-baseline gap-[12px] mb-[14px] pb-[12px] border-b border-b-[var(--line)]">
        <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-[var(--ink-mute)]">
          {num}
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
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[20px] text-center text-[var(--ink-soft)]">
        <div className="font-body text-[12px] leading-[1.6]">
          {title} — coming in Pass B
        </div>
      </div>
    </section>
  );
}
