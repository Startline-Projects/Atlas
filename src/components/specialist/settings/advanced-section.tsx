"use client";

/**
 * Advanced panel — 3 power-user toggles + Danger Zone card with 2
 * destructive-action rows (transfer pool / delete account).
 *
 * Danger zone uses `SettingsSectionCard` with `danger` flag (red
 * eyebrow, danger border-bottom). Each destructive row triggers a
 * confirm modal (handled by the parent app's modal state).
 *
 * Client Component (toggle state + danger-button callbacks).
 */

import { useState } from "react";
import { Keyboard } from "lucide-react";
import {
  advancedToggles as initialAdvancedToggles,
  dangerZoneActions,
  type DangerZoneAction,
} from "@/lib/mock-data/specialist/settings";
import {
  SettingsSectionCard,
  SettingsField,
} from "./settings-section-card";
import { SettingsToggle } from "./settings-toggle";

export function AdvancedSection({
  onModify,
  onDangerAction,
}: {
  onModify: () => void;
  onDangerAction: (key: DangerZoneAction["key"]) => void;
}) {
  const [toggles, setToggles] = useState(initialAdvancedToggles);

  function flip(key: string) {
    setToggles((prev) =>
      prev.map((t) => (t.key === key ? { ...t, enabled: !t.enabled } : t)),
    );
    onModify();
  }

  return (
    <div className="flex flex-col gap-4">
      <SettingsSectionCard
        eyebrow="Advanced"
        title="For power users"
        description="Atlas behavior knobs that most specialists won't need to touch."
      >
        {toggles.map((toggle) => (
          <SettingsField
            key={toggle.key}
            label={toggle.label}
            inline
            helper={toggle.description}
          >
            {toggle.key === "keyboard-shortcuts" ? (
              <kbd className="border-line bg-cream-deep mr-1 rounded-[3px] border px-1.5 py-0.5 font-mono text-[10px] text-ink-soft">
                <Keyboard
                  className="mr-1 inline h-2.5 w-2.5 align-text-bottom"
                  strokeWidth={1.5}
                />
                ?
              </kbd>
            ) : null}
            <SettingsToggle
              checked={toggle.enabled}
              onChange={() => flip(toggle.key)}
              ariaLabel={toggle.label}
            />
          </SettingsField>
        ))}
      </SettingsSectionCard>

      <SettingsSectionCard
        eyebrow="Danger zone"
        title="Irreversible actions"
        description="These actions can't be undone · contact admin if uncertain."
        danger
      >
        {dangerZoneActions.map((action) => (
          <div
            key={action.key}
            className="border-line-soft grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 border-b py-3.5 last:border-b-0 first:pt-0"
          >
            <div className="min-w-0">
              <div className="text-[13.5px] font-medium text-ink">
                {action.title}
              </div>
              <div className="mt-1 text-[12.5px] leading-[1.45] text-ink-soft">
                {action.description}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onDangerAction(action.key)}
              className="border-danger text-danger hover:bg-danger-bg flex-shrink-0 rounded-md border bg-paper px-3.5 py-2 font-body text-[12.5px] font-medium transition-colors"
            >
              {action.ctaLabel}
            </button>
          </div>
        ))}
      </SettingsSectionCard>
    </div>
  );
}
