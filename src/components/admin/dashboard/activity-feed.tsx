'use client';

import { ACTIVITY_FEED } from '@/lib/mock-data/admin/dashboard-data';
import { useDashboardState } from '@/lib/admin/dashboard-state-context';

const avatarGradients: Record<string, string> = {
  AO: 'linear-gradient(135deg, #D9A77F, #8B5A3C)',
  DK: 'linear-gradient(135deg, #7BA8D9, #3F6CA1)',
  SR: 'linear-gradient(135deg, #B89BD6, #6E3FE0)',
  JN: 'linear-gradient(135deg, #C7CFA8, #6B8E23)',
  MT: 'linear-gradient(135deg, #E8B4B8, #8B5A6F)',
};

const tagStyles: Record<
  string,
  { bg: string; text: string }
> = {
  SUSPENSION: { bg: 'bg-[var(--color-danger-bg)]', text: 'text-[var(--color-danger)]' },
  REFUND: { bg: 'bg-[var(--color-success-bg)]', text: 'text-[var(--color-success)]' },
  DISPUTE: { bg: 'bg-[var(--color-amber-bg)]', text: 'text-[var(--color-amber)]' },
  OVERRIDE: {
    bg: 'bg-[rgba(110,63,224,0.15)]',
    text: 'text-[#6E3FE0]',
  },
  'T&S': { bg: 'bg-[var(--color-navy)]', text: 'text-white' },
  EXPORT: { bg: 'bg-[var(--color-cream-deep)]', text: 'text-[var(--color-ink-soft)]' },
  BAN: { bg: 'bg-[var(--color-danger-bg)]', text: 'text-[var(--color-danger)]' },
  'SIGN-IN': {
    bg: 'bg-[rgba(214,242,77,0.3)]',
    text: 'text-[var(--color-ink)]',
  },
};

export function ActivityFeed() {
  const { state, setState } = useDashboardState();
  const { activityFilter } = state;

  const filterOptions: Array<{
    value: typeof activityFilter;
    label: string;
  }> = [
    { value: 'all', label: 'All' },
    { value: 'me', label: 'Just me' },
    { value: 'suspension', label: 'Suspensions' },
    { value: 'refund', label: 'Refunds' },
    { value: 'dispute', label: 'Disputes' },
    { value: 'override', label: 'Overrides' },
  ];

  const filteredRows = ACTIVITY_FEED.filter((row) => {
    if (activityFilter === 'all') return true;
    if (activityFilter === 'me') return row.actorType === 'me';
    return row.category === activityFilter;
  });

  return (
    <div className="flex flex-col gap-0 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[10px] overflow-hidden">
      {/* Header */}
      <div className="flex items-baseline justify-between px-[18px] pt-[14px] pb-3 border-b border-[var(--color-line-soft)]">
        <h3 className="font-display text-[16px] font-medium leading-tight tracking-[-0.01em]">
          Admin activity
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-ink-mute)] inline-flex items-center gap-[6px]">
          <span
            className="w-[5px] h-[5px] rounded-full bg-[var(--color-amber)] flex-shrink-0"
            style={{ animation: 'pulse-soft 1.6s ease-in-out infinite' }}
            aria-hidden="true"
          />
          Today
        </span>
      </div>

      {/* Filter chips */}
      <div
        className="activity-filter-row flex items-center gap-[10px] px-[18px] py-[10px] border-b border-[var(--color-line-soft)] overflow-x-auto"
        role="tablist"
        aria-label="Filter activity"
      >
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setState({ activityFilter: option.value })}
            className={`px-[10px] py-1 font-mono text-[10px] uppercase tracking-[0.1em] rounded-full border cursor-pointer transition-all whitespace-nowrap flex-shrink-0 ${
              activityFilter === option.value
                ? 'bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)]'
                : 'bg-transparent text-[var(--color-ink-mute)] border-[var(--color-line)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink-mute)]'
            }`}
            role="tab"
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Activity list */}
      <ul className="activity-list flex-1 overflow-y-auto max-h-[480px] list-none">
        {filteredRows.map((row, i) => {
          const tagStyle = tagStyles[row.tag] || {
            bg: 'bg-[var(--color-cream-deep)]',
            text: 'text-[var(--color-ink-soft)]',
          };
          const avatarGradient = avatarGradients[row.actor] || '#888';

          return (
            <li
              key={i}
              className="grid items-baseline gap-[10px] px-[18px] py-[11px] border-b border-[var(--color-line-soft)] text-[12.5px] cursor-pointer transition-all hover:bg-[var(--color-cream-hover)]"
              style={{ gridTemplateColumns: 'auto auto 1fr auto' }}
            >
              {/* Time */}
              <span className="font-mono text-[10.5px] text-[var(--color-ink-mute)] tracking-[0.02em] font-medium flex-shrink-0 whitespace-nowrap">
                {row.time}
              </span>

              {/* Actor */}
              <span className="inline-flex items-center gap-[7px] flex-shrink-0 font-semibold text-[var(--color-ink)] whitespace-nowrap">
                <span
                  className="w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0 font-display text-[10px] font-medium text-[var(--color-paper)]"
                  style={{ background: avatarGradient }}
                >
                  {row.actor}
                </span>
                {row.actorName}
              </span>

              {/* Action */}
              <span className="text-[var(--color-ink-soft)] leading-[1.5] min-w-0">
                <span className="text-[var(--color-ink)] font-medium">
                  {row.verb}
                </span>{' '}
                {(row as any).target && (
                  <span className="text-[var(--color-ink)]">{(row as any).target}</span>
                )}
                {(row as any).targetMeta && (
                  <span className="font-mono text-[11px] tracking-[0.02em] text-[var(--color-ink-mute)]">
                    {' '}
                    {(row as any).targetMeta}
                  </span>
                )}
              </span>

              {/* Tag */}
              <span
                className={`font-mono text-[9px] uppercase tracking-[0.14em] px-[7px] py-[2px] rounded-[3px] font-semibold whitespace-nowrap flex-shrink-0 ${tagStyle.bg} ${tagStyle.text}`}
              >
                {row.tag}
              </span>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div className="px-[18px] py-3 border-t border-[var(--color-line-soft)] text-center text-[12px]">
        <a
          href="#"
          className="text-[var(--color-ink-soft)] border-b border-dotted border-[var(--color-line-strong)] pb-[1px] transition-all hover:text-[var(--color-ink)] hover:border-[var(--color-ink)]"
        >
          View full audit log →
        </a>
      </div>
    </div>
  );
}
