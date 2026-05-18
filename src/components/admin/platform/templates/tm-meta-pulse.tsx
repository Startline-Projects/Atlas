/* admin.html lines 62397: meta-pulse amber alert inline in page-head meta line.
   CSS source: framework lines 15443-15458 — danger color + ::before pulse-fr dot. */

interface TmMetaPulseProps {
  html: string;
}

export function TmMetaPulse({ html }: TmMetaPulseProps) {
  return (
    <span className="inline-flex items-center gap-[5px] ml-[12px] text-[var(--danger)] font-semibold">
      <span className="w-[6px] h-[6px] rounded-full bg-[var(--danger)] animate-[pulse-fr_1.4s_ease-in-out_infinite] flex-shrink-0" />
      <span dangerouslySetInnerHTML={{ __html: html }} />
    </span>
  );
}
