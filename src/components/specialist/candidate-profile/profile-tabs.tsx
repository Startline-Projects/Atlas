"use client";

import { cn } from "@/lib/utils/cn";

export type ProfileTabKey =
  | "overview"
  | "engagements"
  | "feedback"
  | "activity";

export type ProfileTabDef = {
  key: ProfileTabKey;
  label: string;
  count?: number;
};

type ProfileTabsProps = {
  tabs: ReadonlyArray<ProfileTabDef>;
  activeKey: ProfileTabKey;
  onChange: (key: ProfileTabKey) => void;
};

/**
 * Profile-specific tab strip. Distinct from `queue-shared/ReviewTabs`
 * because the styling differs: cp-tab uses `paper` background (queue
 * tabs use cream/90), the active marker is a 2px lower bar with
 * 16px inset (queue uses full-width), and the count chip styling
 * differs. Forking is the right call here per the standing
 * "shape genuinely diverges → parallel component" rule.
 */
export function ProfileTabs({ tabs, activeKey, onChange }: ProfileTabsProps) {
  return (
    <nav
      aria-label="Profile sections"
      className="bg-paper border-line sticky top-[calc(36px+57px)] z-[8] flex gap-0 overflow-x-auto border-b px-6 sm:px-10 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
    >
      {tabs.map((tab) => {
        const isActive = activeKey === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.key)}
            className={cn(
              "relative inline-flex cursor-pointer items-center gap-1.5 border-none bg-transparent px-4 py-3 font-body text-[13px] whitespace-nowrap transition-colors",
              isActive
                ? "text-ink font-medium"
                : "text-ink-mute hover:text-ink-soft",
            )}
          >
            {tab.label}
            {tab.count !== undefined ? (
              <span
                className={cn(
                  "rounded-full px-1.5 py-px font-mono text-[9.5px] font-medium",
                  isActive
                    ? "bg-ink text-paper"
                    : "bg-cream-deep text-ink-mute",
                )}
              >
                {tab.count}
              </span>
            ) : null}
            {isActive ? (
              <span
                aria-hidden="true"
                className="bg-ink absolute right-4 -bottom-px left-4 h-[2px] rounded-[1px]"
              />
            ) : null}
          </button>
        );
      })}
    </nav>
  );
}
