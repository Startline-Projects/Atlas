/* admin.html line 63134: meta-pulse amber alert inline in page-head meta line (framework primitive shared with Step 32) */

interface HcMetaPulseProps {
  html: string;
}

export function HcMetaPulse({ html }: HcMetaPulseProps) {
  return (
    <span className="inline-flex items-center gap-[5px] ml-[12px] text-[var(--danger)] font-semibold">
      <span className="w-[6px] h-[6px] rounded-full bg-[var(--danger)] animate-[pulse-fr_1.4s_ease-in-out_infinite] flex-shrink-0" />
      <span dangerouslySetInnerHTML={{ __html: html }} />
    </span>
  );
}
