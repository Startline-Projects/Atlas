"use client";

/**
 * Preferences panel — workflow toggles + default sort/order selects.
 *
 * Per source HTML (single card):
 *   - Auto-advance after decision (toggle)
 *   - Show Atlas AI suggestions (toggle)
 *   - Compact lists (toggle)
 *   - Default sort for My candidates (select, 5 options)
 *   - Default review queue order (select, 3 options)
 *   - Confirm before destructive actions (toggle)
 *
 * PDF additions (theme/density/auto-refresh) are typed in
 * `PreferencesState` but UI deferred — captured-but-unrendered per
 * the standing pattern.
 *
 * Client Component.
 */

import { useState } from "react";
import {
  preferences as initialPrefs,
  type PreferencesState,
} from "@/lib/mock-data/specialist/settings";
import {
  SettingsSectionCard,
  SettingsField,
  SettingsSelect,
} from "./settings-section-card";
import { SettingsToggle } from "./settings-toggle";

const CANDIDATE_SORT_OPTIONS = [
  { key: "recent-activity" as const, label: "Recent activity" },
  { key: "name-asc" as const, label: "Name (A-Z)" },
  { key: "highest-rating" as const, label: "Highest rating" },
  { key: "most-hours" as const, label: "Most hours" },
  { key: "cert-expiry" as const, label: "Cert expiry (soonest)" },
];

const REVIEW_ORDER_OPTIONS = [
  { key: "sla-priority" as const, label: "SLA priority (current)" },
  { key: "submission-time" as const, label: "Submission time" },
  { key: "ai-confidence" as const, label: "AI confidence" },
];

export function PreferencesSection({
  onModify,
}: {
  onModify: () => void;
}) {
  const [prefs, setPrefs] =
    useState<PreferencesState>(initialPrefs);

  function update<K extends keyof PreferencesState>(
    key: K,
    next: PreferencesState[K],
  ) {
    setPrefs((p) => ({ ...p, [key]: next }));
    onModify();
  }

  return (
    <SettingsSectionCard
      eyebrow="Workflow preferences"
      title="How you work"
      description="Defaults that shape day-to-day flow. Settings apply across review queue, recert, and people pages."
    >
      <SettingsField
        label="Auto-advance after decision"
        inline
        helper="Auto-load the next item in the queue after each decision."
      >
        <SettingsToggle
          checked={prefs.autoAdvanceAfterDecision}
          onChange={(v) => update("autoAdvanceAfterDecision", v)}
          ariaLabel="Auto-advance after decision"
        />
      </SettingsField>

      <SettingsField
        label="Show Atlas AI suggestions"
        inline
        helper="Inline AI suggestions in chat composers and decision panels."
      >
        <SettingsToggle
          checked={prefs.showAiSuggestions}
          onChange={(v) => update("showAiSuggestions", v)}
          ariaLabel="Show Atlas AI suggestions"
        />
      </SettingsField>

      <SettingsField
        label="Compact lists"
        inline
        helper="Tighter row heights across all roster views (my-candidates, my-clients, queues)."
      >
        <SettingsToggle
          checked={prefs.compactLists}
          onChange={(v) => update("compactLists", v)}
          ariaLabel="Compact lists"
        />
      </SettingsField>

      <SettingsField label="Default sort for My candidates" htmlFor="set-cand-sort">
        <SettingsSelect
          id="set-cand-sort"
          value={prefs.defaultCandidateSort}
          options={CANDIDATE_SORT_OPTIONS}
          onChange={(v) => update("defaultCandidateSort", v)}
        />
      </SettingsField>

      <SettingsField label="Default review queue order" htmlFor="set-rev-order">
        <SettingsSelect
          id="set-rev-order"
          value={prefs.defaultReviewQueueOrder}
          options={REVIEW_ORDER_OPTIONS}
          onChange={(v) => update("defaultReviewQueueOrder", v)}
        />
      </SettingsField>

      <SettingsField
        label="Confirm before destructive actions"
        inline
        helper="Prompt a confirmation modal before reject / off-board / escalate / delete operations."
      >
        <SettingsToggle
          checked={prefs.confirmDestructiveActions}
          onChange={(v) => update("confirmDestructiveActions", v)}
          ariaLabel="Confirm before destructive actions"
        />
      </SettingsField>
    </SettingsSectionCard>
  );
}
