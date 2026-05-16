'use client';

interface RsViewToggleProps {
  toggles: Array<{
    label: string;
    icon: string;
    value: string;
    active?: boolean;
  }>;
  active: string;
  onChange: (value: string) => void;
}

function getIconSvg(icon: string) {
  const icons: Record<string, string> = {
    'globe': '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    'calendar': '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    'list': '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
  };
  return icons[icon] || '';
}

export function RsViewToggle({
  toggles,
  active,
  onChange,
}: RsViewToggleProps) {
  return (
    <div className="inline-flex bg-[var(--paper)] border border-[var(--line)] rounded-full p-[3px] gap-[2px]">
      {toggles.map((toggle) => {
        const isActive = active === toggle.value;
        return (
          <button
            key={toggle.value}
            type="button"
            onClick={() => onChange(toggle.value)}
            className={`font-mono text-[10.5px] font-semibold tracking-[0.04em] py-[5px] px-[12px] rounded-full border-0 inline-flex items-center gap-[5px] transition-all cursor-pointer ${
              isActive
                ? 'bg-[var(--ink)] text-[var(--paper)]'
                : 'bg-transparent text-[var(--ink-mute)] hover:text-[var(--ink)]'
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[12px] h-[12px]"
            >
              <g dangerouslySetInnerHTML={{ __html: getIconSvg(toggle.icon) }} />
            </svg>
            {toggle.label}
          </button>
        );
      })}
    </div>
  );
}
