/* Placeholder for Skills (Pass B) and Tools (Pass C) panes */

interface CsPaneStubProps {
  label: string;
  sub: string;
}

export function CsPaneStub({ label, sub }: CsPaneStubProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px] border border-[var(--line)] rounded-[var(--r-md)] bg-[var(--paper-deep)]">
      <div className="text-center">
        <div className="font-display text-[20px] font-medium text-[var(--ink)] mb-[4px]">
          {label}
        </div>
        <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.04em] uppercase">
          {sub} — coming soon
        </div>
      </div>
    </div>
  );
}
