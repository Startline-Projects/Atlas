/* admin.html line 65509: meta-pulse danger alert inline in fr-page-head meta line */

interface IcmMetaPulseProps {
  html: string;
}

export function IcmMetaPulse({ html }: IcmMetaPulseProps) {
  return (
    <span className="inline-flex items-center gap-[5px] ml-[12px] text-[var(--danger)] font-semibold">
      <span className="w-[6px] h-[6px] rounded-full bg-[var(--danger)] animate-[pulse-fr_1.4s_ease-in-out_infinite] flex-shrink-0" />
      <span dangerouslySetInnerHTML={{ __html: html }} />
    </span>
  );
}
