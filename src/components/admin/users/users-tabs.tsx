'use client';

import { USERS_DATA, USERS_TABS } from '@/lib/mock-data/admin/users-data';

type TabName = 'candidates' | 'clients' | 'specialists' | 'manager' | 'admins';

export function UsersTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
}) {
  const handleTabClick = (tabId: TabName) => {
    onTabChange(tabId);
    window.location.hash = '#' + tabId;
  };

  return (
    <div
      className="users-tabs flex gap-0 border-b border-[var(--color-line)] overflow-x-auto overflow-y-visible mb-[24px]"
      role="tablist"
      aria-label="User category tabs"
    >
      {USERS_TABS.map((tab) => {
        const count = USERS_DATA.header[tab.countKey] as number;
        return (
          <button
            key={tab.id}
            className={`px-[18px] py-3 whitespace-nowrap font-body text-[13.5px] border-b-2 mb-[-1px] relative inline-flex items-center gap-2 transition-colors cursor-pointer font-medium ${
              activeTab === tab.id
                ? 'text-[var(--color-ink)] border-b-[var(--color-ink)] font-semibold'
                : 'text-[var(--color-ink-mute)] border-b-transparent hover:text-[var(--color-ink)]'
            }`}
            data-tab={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
            <span
              className={`font-mono text-[10px] tracking-[0.02em] pl-[7px] pr-[6px] py-[2px] rounded-[999px] font-semibold flex-shrink-0 ${
                activeTab === tab.id
                  ? 'bg-[var(--color-ink)] text-[var(--color-paper)]'
                  : 'bg-[var(--color-cream-deep)] text-[var(--color-ink-soft)]'
              }`}
            >
              {count.toLocaleString()}
            </span>
            {tab.warning && (
              <span
                className="w-[6px] h-[6px] rounded-full bg-[var(--color-amber)] flex-shrink-0"
                aria-hidden="true"
                title="Action needed"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
