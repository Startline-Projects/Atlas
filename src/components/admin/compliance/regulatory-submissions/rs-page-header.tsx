interface RsPageHeaderProps {
  title: string;
  metaText: string;
  pulseText: string;
  actions: Array<{ label: string; icon: string; isPrimary?: boolean }>;
}

function getActionIcon(icon: string) {
  const icons: Record<string, string> = {
    'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    'calendar': '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    'plus': '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  };
  return icons[icon] || '';
}

export function RsPageHeader({
  title,
  metaText,
  pulseText,
  actions,
}: RsPageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-[20px] mb-[18px] flex-wrap">
      <div className="flex-1 min-w-0">
        <h1 className="font-display text-[28px] font-medium tracking-[-0.025em] text-[var(--ink)] m-0 leading-[1.1] mb-[4px]">
          {title}
        </h1>
        <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] flex items-center gap-[10px] flex-wrap">
          <span>{metaText}</span>
          <span className="inline-flex items-center gap-[6px] py-[3px] px-[8px] bg-[var(--cream-deep)] rounded-full font-mono text-[10px] font-bold tracking-[0.04em] text-[var(--ink-soft)]">
            {pulseText}
          </span>
        </div>
      </div>
      <div className="inline-flex gap-[8px] flex-wrap items-center flex-shrink-0">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            className={`inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full cursor-pointer transition-all whitespace-nowrap ${
              action.isPrimary
                ? 'bg-[var(--ink)] border border-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)]'
                : 'bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]'
            }`}
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
              <g dangerouslySetInnerHTML={{ __html: getActionIcon(action.icon) }} />
            </svg>
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
