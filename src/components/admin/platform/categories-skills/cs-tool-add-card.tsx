/* admin.html lines 61302-61305 (and similar): dashed "Add tool" cell at end of each tool grid */

interface CsToolAddCardProps {
  label: string;
}

export function CsToolAddCard({ label }: CsToolAddCardProps) {
  return (
    <div className="flex items-center justify-center gap-[10px] py-[12px] px-[14px] border border-dashed border-[var(--line)] bg-[var(--paper-deep)] text-[var(--ink-mute)] font-mono text-[11px] font-bold tracking-[0.04em] cursor-pointer transition-colors hover:text-[var(--ink)] hover:bg-[var(--paper)]">
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
      {label}
    </div>
  );
}
