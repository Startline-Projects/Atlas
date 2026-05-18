/* admin.html .fr-section-head pattern: flex with dashed bottom-border separator.
   sh-label (sh-num eyebrow + h2 + sh-meta) on left, optional action button on right. */

interface IntSectionHeadAction {
  label: string;
  icon: 'audit' | 'download';
}

interface IntSectionHeadData {
  num: string;
  title: string;
  meta: string;
  action?: IntSectionHeadAction;
}

interface IntSectionHeadProps {
  head: IntSectionHeadData;
}

function getActionIcon(icon: 'audit' | 'download') {
  const icons: Record<string, string> = {
    audit: '<polyline points="4 4 4 20 20 20"/><polyline points="4 12 12 4 16 8 20 4"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  };
  return icons[icon] || '';
}

export function IntSectionHead({ head }: IntSectionHeadProps) {
  return (
    <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[16px] pb-[12px] border-b border-b-dashed border-b-[var(--line-soft)]">
      <div className="flex items-baseline gap-[10px]">
        <span className="font-mono text-[9.5px] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[2px] px-[6px] rounded-[3px] font-bold tracking-[0.06em]">
          {head.num}
        </span>
        <div>
          <h2 className="font-display text-[18px] font-medium tracking-[-0.01em] m-0 leading-[1.2] text-[var(--ink)]">
            {head.title}
          </h2>
          <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[4px]">
            {head.meta}
          </div>
        </div>
      </div>
      {head.action && (
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] cursor-pointer transition-all whitespace-nowrap flex-shrink-0"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <g dangerouslySetInnerHTML={{ __html: getActionIcon(head.action.icon) }} />
          </svg>
          {head.action.label}
        </button>
      )}
    </div>
  );
}
