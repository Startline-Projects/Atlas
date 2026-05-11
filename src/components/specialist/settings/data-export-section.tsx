"use client";

/**
 * Data & export panel — 4 export rows (Decision history / Activity log
 * / Pool snapshot / Communication archive).
 *
 * Per source HTML: each row is `label / description / CTA button`.
 *
 * Step 12 polish: each CTA fires a warn-tone queued-flash with the
 * row's own label interpolated — "{label} queued for export — data
 * export service not yet wired". Single handler factory pattern; one
 * `onExport(label)` callback owned by the parent, four call sites
 * passing their own labels.
 *
 * Client Component (button onClick).
 */

import { Download } from "lucide-react";
import { dataExportItems } from "@/lib/mock-data/specialist/settings";
import {
  SettingsSectionCard,
  SettingsField,
} from "./settings-section-card";

export function DataExportSection({
  onExport,
}: {
  /** Step 12: fired with the row's `label` string. Parent fires a
   *  warn-tone queued-flash with row-specific copy. */
  onExport?: ((label: string) => void) | undefined;
}) {
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
            onClick={onExport ? () => onExport(item.label) : undefined}
            className="border-line bg-paper text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex cursor-pointer items-center gap-1.5 rounded-md border px-3 py-1.5 font-body text-[12.5px] transition-colors"
          >
            <Download className="h-3 w-3" strokeWidth={1.5} aria-hidden="true" />
            {item.ctaLabel}
          </button>
        </SettingsField>
      ))}
    </SettingsSectionCard>
  );
}
