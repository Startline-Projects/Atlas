"use client";

import { useEffect, useRef } from "react";
import type { TabDef } from "@/lib/mock-data/specialist/queue-types";
import { cn } from "@/lib/utils/cn";

type ReviewTabsProps = {
  tabs: ReadonlyArray<TabDef>;
  activeKey: string;
  onChange: (key: string) => void;
  ariaLabel: string;
};

export function ReviewTabs({
  tabs,
  activeKey,
  onChange,
  ariaLabel,
}: ReviewTabsProps) {
  /** Auto-scroll the active tab into view on change (mobile / overflow). */
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current?.querySelector<HTMLButtonElement>(
      `[data-tab-active="true"]`,
    );
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }, [activeKey]);

  return (
    <nav
      aria-label={ariaLabel}
      className="bg-cream/95 border-line-soft sticky top-[calc(36px+57px)] z-[5] border-b backdrop-blur-md backdrop-saturate-150"
    >
      <div
        ref={containerRef}
        className="container-page mx-auto flex max-w-none gap-1 overflow-x-auto px-6 sm:px-9"
      >
        {tabs.map((tab) => {
          const isActive = activeKey === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              data-tab-active={isActive}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.key)}
              className={cn(
                "group relative flex flex-shrink-0 items-center gap-1.5 px-3 py-2.5 text-[13px] font-medium whitespace-nowrap transition-colors",
                isActive
                  ? "text-ink"
                  : "text-ink-mute hover:text-ink",
              )}
            >
              {tab.label}
              {tab.badge?.kind === "number" ? (
                <span
                  className={cn(
                    "border-line-soft bg-cream rounded-[3px] border px-1.5 py-0.5 font-mono text-[9.5px] tracking-[0.04em]",
                    isActive && "border-ink bg-ink text-paper",
                  )}
                >
                  {tab.badge.value}
                </span>
              ) : null}
              {tab.badge?.kind === "dot" ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "inline-block h-1.5 w-1.5 rounded-full",
                    tab.badge.tone === "danger"
                      ? "bg-danger animate-pulse"
                      : "bg-amber",
                  )}
                />
              ) : null}
              {isActive ? (
                <span
                  aria-hidden="true"
                  className="bg-ink absolute right-0 -bottom-px left-0 h-[2px]"
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
