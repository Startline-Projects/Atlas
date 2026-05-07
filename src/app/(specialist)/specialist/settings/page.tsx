import { Suspense } from "react";
import { SettingsApp } from "@/components/specialist/settings/settings-app";

/**
 * Settings view — sub-nav + form panel. URL state:
 * `?section=<key>` (one of: profile / security / notifications /
 * preferences / integrations / data-export / advanced) controls the
 * active panel.
 *
 * Per Session 6.1 decision: settings is a direct-URL-only route —
 * not surfaced in the main sidebar nav. HTML's intended access path
 * is the avatar-menu dropdown in the topbar (deferred to polish).
 *
 * `useSearchParams` requires a Suspense boundary on Next 15+.
 */
export default function SettingsPage() {
  return (
    <Suspense fallback={null}>
      <SettingsApp />
    </Suspense>
  );
}
