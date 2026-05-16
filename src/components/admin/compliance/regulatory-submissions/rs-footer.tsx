interface RsFooterProps {
  meta: string;
}

export function RsFooter({ meta }: RsFooterProps) {
  return (
    <div className="flex items-center justify-between py-[14px] px-0 flex-wrap gap-[12px]">
      <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
        {meta}
      </span>
      <button
        type="button"
        className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[10.5px] font-bold tracking-[0.04em] uppercase rounded-full bg-transparent border border-[var(--line)] text-[var(--ink)] hover:bg-[var(--paper-deep)] cursor-pointer transition-all"
      >
        View archive (2024 + earlier) →
      </button>
    </div>
  );
}
