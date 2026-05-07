"use client";

/**
 * Left-rail sub-navigation for settings. 3 grouped sections (Account /
 * Workflow / System) with 2-3 items each. Active item gets a left bar
 * + cream bg + ink text. Below 980px the rail stacks above the panel.
 *
 * Each item button swaps which `data-set-section` is visible in the
 * panel. Optional badge ("12", "2FA on", "3 of 6") with success / amber
 * / default tone.
 *
 * Client Component (controlled by parent's active-section state).
 */

import {
  SETTINGS_SUBNAV,
  type SettingsSection,
} from "@/lib/mock-data/specialist/settings";
import { cn } from "@/lib/utils/cn";

const BADGE_TONE: Record<"default" | "success" | "amber", string> = {
  default: "bg-cream-deep text-ink-mute",
  success: "bg-success-bg text-success",
  amber: "bg-amber/15 text-amber",
};

export function SettingsSubNav({
  active,
  onChange,
}: {
  active: SettingsSection;
  onChange: (next: SettingsSection) => void;
}) {
  return (
    <nav
      aria-label="Settings sections"
      className="bg-paper border-line-soft rounded-xl border p-3 lg:sticky lg:top-[calc(36px+57px+24px)] lg:self-start"
    >
      <div className="flex flex-col gap-3.5">
        {SETTINGS_SUBNAV.map((group) => (
          <div key={group.groupLabel}>
            <div className="mb-1.5 px-2 font-mono text-[9.5px] font-semibold tracking-[0.14em] uppercase text-ink-mute">
              {group.groupLabel}
            </div>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const isActive = item.key === active;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => onChange(item.key)}
                    className={cn(
                      "flex items-center justify-between gap-2 rounded-md border-l-[3px] px-2.5 py-2 text-left font-body text-[13px] transition-colors",
                      isActive
                        ? "border-l-ink bg-cream text-ink font-medium"
                        : "border-l-transparent text-ink-soft hover:bg-cream-deep hover:text-ink",
                    )}
                  >
                    <span>{item.label}</span>
                    {item.badge ? (
                      <span
                        className={cn(
                          "rounded-full px-1.5 py-0.5 font-mono text-[9.5px] font-medium tracking-[0.04em]",
                          BADGE_TONE[item.badge.tone],
                        )}
                      >
                        {item.badge.label}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
