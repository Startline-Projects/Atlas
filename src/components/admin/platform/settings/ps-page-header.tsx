import { PsRestrictionBanner } from './ps-restriction-banner';

interface PsPageHeaderProps {
  title: string;
  metaText: string;
  restrictionLabel: string;
  searchPlaceholder: string;
  actions: Array<{ label: string; icon: string }>;
}

function getActionIcon(icon: string) {
  const icons: Record<string, string> = {
    'audit': '<polyline points="4 4 4 20 20 20"/><polyline points="4 12 12 4 16 8 20 4"/>',
    'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  };
  return icons[icon] || '';
}

export function PsPageHeader({
  title,
  metaText,
  restrictionLabel,
  searchPlaceholder,
  actions,
}: PsPageHeaderProps) {
  return (
    <div className="mb-[18px]">
      <h1 className="font-display text-[28px] font-medium tracking-[-0.025em] text-[var(--ink)] m-0 leading-[1.1] mb-[4px]">
        {title}
      </h1>

      <div className="flex items-center justify-between gap-[12px] flex-wrap mb-[14px]">
        <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5]">
          {metaText}
        </div>
        <PsRestrictionBanner label={restrictionLabel} />
      </div>

      <div className="flex items-center justify-between gap-[12px] flex-wrap">
        <div className="inline-flex items-center gap-[8px] py-[8px] px-[14px] bg-[var(--paper)] border border-[var(--line)] rounded-[6px] w-full max-w-[280px]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--ink-mute)] flex-shrink-0">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="flex-1 min-w-0 bg-transparent border-0 outline-none font-body text-[12.5px] text-[var(--ink)] placeholder:text-[var(--ink-mute)] placeholder:font-mono placeholder:text-[11px]"
          />
        </div>
        <div className="inline-flex gap-[8px] flex-wrap items-center flex-shrink-0">
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] transition-all whitespace-nowrap cursor-pointer"
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
    </div>
  );
}
