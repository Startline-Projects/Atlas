interface PrSectionHeadAction {
  label: string;
  icon?: 'search' | 'code' | 'plus' | 'trash' | 'edit' | 'list' | 'calendar';
  isPrimary?: boolean;
}

interface PrSectionHeadProps {
  number: string;
  title: string;
  meta: string;
  actions?: PrSectionHeadAction[];
}

export function PrSectionHead({ number, title, meta, actions }: PrSectionHeadProps) {
  const renderIcon = (icon?: string) => {
    switch (icon) {
      case 'search':
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <polyline points="21 21 16.65 16.65" />
          </svg>
        );
      case 'code':
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        );
      case 'plus':
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        );
      case 'trash':
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        );
      case 'edit':
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="11 4 14 4 20 10 20 20 4 20 4 8 10 8" />
            <path d="M15 4l5 5" />
          </svg>
        );
      case 'list':
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
        );
      case 'calendar':
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-start justify-between gap-[16px] mb-[14px] pb-[12px] border-b border-b-[var(--line)]">
      <div className="flex items-baseline gap-[12px]">
        <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-[var(--ink-mute)]">
          {number}
        </span>
        <div>
          <h2 className="font-display text-[18px] font-medium tracking-[-0.015em] text-[var(--ink)] mb-[3px] leading-[1.2]">
            {title}
          </h2>
          <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] leading-[1.5]">
            {meta}
          </div>
        </div>
      </div>
      {actions && actions.length > 0 && (
        <div className="inline-flex gap-[6px] flex-wrap items-center flex-shrink-0">
          {actions.map((action, idx) => (
            <button
              key={idx}
              className={`inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full cursor-pointer transition-all whitespace-nowrap ${
                action.isPrimary
                  ? 'bg-[var(--ink)] border border-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)]'
                  : 'bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]'
              }`}
            >
              {action.icon && renderIcon(action.icon)}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
