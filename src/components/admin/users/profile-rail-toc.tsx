export function ProfileRailToc() {
  const sections = [
    { num: '01', label: 'Identity', anchor: '#cd-section-identity', meta: '✓', metaVariant: 'ok' as const },
    { num: '02', label: 'Pipeline', anchor: '#cd-section-pipeline', meta: '10 / 10', metaVariant: 'ok' as const },
    { num: '03', label: 'Profile', anchor: '#cd-section-profile', meta: 'live', metaVariant: 'plain' as const },
    { num: '04', label: 'Engagements', anchor: '#cd-section-engagements', meta: '3 active', metaVariant: 'plain' as const },
    { num: '05', label: 'Financial', anchor: '#cd-section-financial', meta: '$48.2K', metaVariant: 'plain' as const },
    { num: '06', label: 'Communications', anchor: '#cd-section-communications', meta: '241', metaVariant: 'plain' as const },
    { num: '07', label: 'Audit log', anchor: '#cd-section-audit', meta: '52', metaVariant: 'plain' as const },
    { num: '08', label: 'T&S signals', anchor: '#cd-section-signals', meta: '1 flag', metaVariant: 'warn' as const },
    { num: '09', label: 'Privacy', anchor: '#cd-section-privacy', meta: 'clear', metaVariant: 'ok' as const },
  ];

  return (
    <nav
      className="bg-[var(--color-paper)] border border-[var(--color-line)]
                 rounded-[var(--radius-md)] p-[14px_0] overflow-hidden"
      aria-label="On this page"
    >
      <h4 className="px-[16px] pb-[10px] font-mono text-[10px] tracking-[0.16em]
                     uppercase text-[var(--color-ink-mute)] font-semibold
                     border-b border-dashed border-[var(--color-line-soft)] mb-[6px]">
        On this page
      </h4>
      <ul className="list-none p-0 m-0">
        {sections.map((section, i) => (
          <li key={i}>
            <a
              href={section.anchor}
              className={`grid grid-cols-[22px_minmax(0,1fr)_auto] gap-[8px] items-center
                          p-[7px_16px] text-[12.5px] no-underline cursor-pointer
                          transition-all duration-[120ms] ease border-l-[2px]
                          ${
                            i === 0
                              ? 'bg-[var(--color-cream-deep)] text-[var(--color-ink)] border-l-[var(--color-ink)] font-semibold'
                              : 'text-[var(--color-ink-soft)] border-l-transparent hover:bg-[#FCF9F1] hover:text-[var(--color-ink)]'
                          }`}
            >
              <span
                className={`font-mono text-[10px] tracking-[0.06em] font-medium
                           ${i === 0 ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink-mute)]'}`}
              >
                {section.num}
              </span>
              <span className="whitespace-nowrap overflow-hidden text-overflow-ellipsis">
                {section.label}
              </span>
              <span
                className={`font-mono text-[10px] tracking-[0.02em] whitespace-nowrap
                           ${section.metaVariant === 'ok' ? 'text-[var(--color-success)]' : ''}
                           ${section.metaVariant === 'warn' ? 'text-[var(--color-amber)]' : ''}
                           ${section.metaVariant === 'plain' ? 'text-[var(--color-ink-mute)]' : ''}`}
              >
                {section.meta}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
