/* admin.html line 65574: REQUIRED ACK super-tinted chip inside pinned head (uses ic-sev sev-3 markup with inline override)
   Hand-translated to dedicated component to avoid sev-3 default-danger collision. */

interface IcmRequiredAckChipProps {
  label: string;
}

export function IcmRequiredAckChip({ label }: IcmRequiredAckChipProps) {
  return (
    <span className="inline-flex items-center gap-[5px] py-[3px] px-[9px] font-mono text-[9.5px] font-bold tracking-[0.08em] uppercase rounded-[4px] whitespace-nowrap bg-[rgba(110,63,224,0.10)] text-[var(--super)]">
      <span className="w-[7px] h-[7px] rounded-full bg-current flex-shrink-0" />
      {label}
    </span>
  );
}
