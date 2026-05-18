interface PsFooterProps {
  meta: string;
  buttonLabel: string;
}

export function PsFooter({ meta, buttonLabel }: PsFooterProps) {
  return (
    <div className="mt-[48px] pt-[24px] border-t border-[var(--line)] max-[720px]:mt-[32px] max-[720px]:pt-[18px]">
      <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.6] mb-[16px]">
        {meta}
      </div>
      <button
        type="button"
        className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] transition-all"
      >
        {buttonLabel}
      </button>
    </div>
  );
}
