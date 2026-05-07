"use client";

/**
 * Data & export panel — 4 export rows (Decision history / Activity log
 * / Pool snapshot / Communication archive).
 *
 * Per source HTML: each row is `label / description / CTA button`. CTA
 * is visual-only (no actual download); clicking fires
 * e.preventDefault().
 *
 * Client Component (button onClick).
 */

import { Download } from "lucide-react";
import { dataExportItems } from "@/lib/mock-data/specialist/settings";
import {
  SettingsSectionCard,
  SettingsField,
} from "./settings-section-card";

export function DataExportSection() {
  return (
    <SettingsSectionCard
      eyebrow="Data & export"
      title="Your data, your records"
      description="Export anything Atlas holds about your work. GDPR / SOC2 compliant."
    >
      {dataExportItems.map((item) => (
        <SettingsField
          key={item.key}
          label={item.label}
          inline
          helper={item.description}
        >
          <button
            type="button"
            onClick={(e) => e.preventDefault()}
            className="border-line bg-paper text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 font-body text-[12.5px] transition-colors"
          >
            <Download className="h-3 w-3" strokeWidth={1.5} aria-hidden="true" />
            {item.ctaLabel}
          </button>
        </SettingsField>
      ))}
    </SettingsSectionCard>
  );
}
