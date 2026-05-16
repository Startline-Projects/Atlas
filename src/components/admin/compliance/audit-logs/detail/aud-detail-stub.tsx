interface AudDetailStubProps {
  id: string;
}

export function AudDetailStub({ id }: AudDetailStubProps) {
  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px]">
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[40px] text-center">
        <div className="font-display text-[24px] font-medium text-[var(--ink)] mb-[8px]">
          Entry {id}
        </div>
        <div className="font-body text-[14px] text-[var(--ink-soft)]">
          This entry displays the canonical detail. Detail page stubs are in development.
        </div>
      </div>
    </div>
  );
}
