import { ACCOUNT_SETTINGS_BLOCKS } from '@/lib/mock-data/admin/profile-data';

const sectionIcons: Record<string, React.ReactNode> = {
  identity: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  security: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  'ip-allowlist': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  notifications: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  sessions: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
};

export default function AccountSettings() {
  return (
    <section className="dash-section">
      {/* Section header with meta */}
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <h2 className="font-display text-[22px] font-medium tracking-[-0.015em] leading-[1.2]">
          Account settings
        </h2>
        <div className="font-mono text-[12px] text-[var(--color-ink-mute)]">
          All changes are audit-logged
        </div>
      </div>

      {/* Settings blocks grid */}
      <div className="grid grid-cols-2 max-[880px]:grid-cols-1 gap-[16px]">
        {ACCOUNT_SETTINGS_BLOCKS.map((block) => (
          <div key={block.id} className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] overflow-hidden">
            {/* Block header */}
            <div className="flex items-center justify-between gap-3 py-[11px] px-[18px] bg-[var(--color-paper-deep)] border-b border-[var(--color-line-soft)]">
              <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--color-ink-soft)] font-semibold">
                <span className="text-[var(--color-ink-mute)] w-[14px] h-[14px] flex-shrink-0">
                  {sectionIcons[block.icon as keyof typeof sectionIcons]}
                </span>
                {block.title}
              </div>
              {block.meta && (
                <div className="font-mono text-[10.5px] tracking-[0.06em] text-[var(--color-ink-mute)] whitespace-nowrap">
                  {block.meta}
                </div>
              )}
            </div>

            {/* Block rows */}
            <div>
              {block.rows.map((row, idx) => (
                <div
                  key={`${block.id}-${('actionId' in row && row.actionId) || row.key || idx}`}
                  className={`grid grid-cols-[minmax(0,1fr)_auto] gap-[18px] items-start py-3 px-[18px] ${
                    idx < block.rows.length - 1 ? 'border-b border-dashed border-[var(--color-line-soft)]' : ''
                  } transition-colors hover:bg-[#FCF9F1]`}
                >
                  {/* Row label and content */}
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-medium text-[var(--color-ink)] mb-[3px] leading-[1.3]">
                      {String(row.key)}
                    </div>
                    {'value' in row && row.value && (
                      <div className="text-[12px] text-[var(--color-ink-mute)] leading-[1.45]">
                        {row.value}
                      </div>
                    )}
                    {'isList' in row && row.isList && 'items' in row && row.items && (
                      <div className="mt-[6px] flex flex-col gap-1">
                        {row.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-center gap-2 font-mono text-[11px] text-[var(--color-ink-soft)]">
                            <span className="w-[5px] h-[5px] rounded-full bg-[var(--color-success)] flex-shrink-0" />
                            {item.ip}
                            <span className="text-[var(--color-ink-mute)] text-[10.5px] ml-1">— {item.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right column: badge, button, or toggle */}
                  {'toggle' in row && row.toggle ? (
                    <label htmlFor={`toggle-${block.id}-${idx}`} className="flex items-center gap-2.5 flex-shrink-0 cursor-pointer">
                      <input
                        id={`toggle-${block.id}-${idx}`}
                        type="checkbox"
                        defaultChecked={'toggled' in row && row.toggled}
                        className="sr-only peer"
                      />
                      <span className="relative inline-flex h-[22px] w-[36px] items-center rounded-full bg-[var(--color-line-strong)] transition-colors peer-checked:bg-[var(--color-ink)]">
                        <span className="absolute w-[18px] h-[18px] bg-white rounded-full shadow-[0_1px_3px_rgba(14,14,12,0.2)] transition-transform peer-checked:translate-x-[14px]" />
                      </span>
                    </label>
                  ) : 'action' in row && row.action ? (
                    <button
                      type="button"
                      className={`flex-shrink-0 py-[6px] px-[14px] font-body text-[12.5px] tracking-[0.08em] uppercase font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                        'actionPrimary' in row && row.actionPrimary
                          ? 'bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)] border hover:bg-[#000]'
                          : 'actionDanger' in row && row.actionDanger
                            ? 'bg-none text-[var(--color-danger)] border border-[rgba(194,65,43,0.3)] hover:bg-[var(--color-danger-bg)] hover:text-[var(--color-danger)] hover:border-[var(--color-danger)]'
                            : 'bg-none text-[var(--color-ink-soft)] border border-[var(--color-line)] hover:bg-[var(--color-cream-deep)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink-mute)]'
                      }`}
                    >
                      {row.action}
                    </button>
                  ) : 'badge' in row && row.badge ? (
                    <span className="inline-flex items-center gap-[4px] font-mono text-[9px] tracking-[0.12em] uppercase py-[2px] px-[6px] rounded-[3px] bg-[var(--color-success-bg)] text-[var(--color-success)] font-semibold flex-shrink-0">
                      <span className="w-[5px] h-[5px] rounded-full bg-[var(--color-success)] flex-shrink-0" />
                      {(row as any).badge}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
