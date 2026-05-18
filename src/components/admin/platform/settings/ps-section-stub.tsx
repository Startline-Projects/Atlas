interface PsSectionStubProps {
  settingsCount: number;
}

export function PsSectionStub({ settingsCount }: PsSectionStubProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[20px] text-center">
      <div className="font-mono text-[12px] text-[var(--ink-mute)] tracking-[0.02em]">
        {settingsCount} settings
      </div>
    </div>
  );
}
