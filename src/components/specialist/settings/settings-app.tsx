"use client";

/**
 * Settings orchestrator.
 *
 *   - Layout: sub-nav rail (left, sticky) + form panel (right). Below
 *     980px the sub-nav stacks above the panel.
 *   - URL state: `?section=<key>` — direct-load to a specific panel.
 *     Defaults to "profile" when absent or unknown.
 *   - Local state:
 *     · `modifiedCount` — number of settings modified this session
 *       (drives the savebar visibility + count)
 *     · `modalKind` — which modal is currently open (or null)
 *     · `flash*` — approved-flash trigger after a confirm action
 *
 * Per Session 6.1 decision, settings is a direct-URL-only route — not
 * surfaced in the main sidebar. HTML's intended access path is the
 * avatar-menu dropdown in the topbar (deferred to polish).
 *
 * Server Component? — No. This is a Client orchestrator (URL params
 * + local mutation state + modal state). The 7 panel components are
 * each Client because they own form-input / toggle state.
 */

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  SETTINGS_SUBNAV,
  type SettingsSection,
  type DangerZoneAction,
} from "@/lib/mock-data/specialist/settings";
import { ApprovedFlash } from "@/components/specialist/queue-shared/approved-flash";
import { RosterHeader } from "@/components/specialist/people-shared";

import { SettingsSubNav } from "./settings-sub-nav";
import { SettingsSavebar } from "./settings-savebar";
import { ProfileSection } from "./profile-section";
import { SecuritySection } from "./security-section";
import { NotificationsSection } from "./notifications-section";
import { PreferencesSection } from "./preferences-section";
import { IntegrationsSection } from "./integrations-section";
import { DataExportSection } from "./data-export-section";
import { AdvancedSection } from "./advanced-section";
import {
  SettingsModals,
  DANGER_BY_KEY,
  type SettingsModalKind,
} from "./settings-modals";

const ALL_SECTION_KEYS: ReadonlyArray<SettingsSection> = SETTINGS_SUBNAV.flatMap(
  (g) => g.items.map((i) => i.key),
);

function parseSection(raw: string | null): SettingsSection {
  if (raw && (ALL_SECTION_KEYS as ReadonlyArray<string>).includes(raw)) {
    return raw as SettingsSection;
  }
  return "profile";
}

/* ============================================================
   Approved-flash content per modal kind
   ============================================================ */

const FLASH_BY_MODAL: Record<
  Exclude<SettingsModalKind, null>,
  { verb: string; tail: string; tone: "success" | "warn" }
> = {
  "change-password": {
    verb: "Updated.",
    tail: "Password changed.",
    tone: "success",
  },
  "manage-2fa": {
    verb: "Regenerated.",
    tail: "Backup codes refreshed.",
    tone: "success",
  },
  "transfer-pool": {
    verb: "Initiated.",
    tail: "Pool transfer routed to admin.",
    tone: "warn",
  },
  "request-deletion": {
    verb: "Requested.",
    tail: "Admin will reach out within 48h.",
    tone: "warn",
  },
};

/* ============================================================
   Orchestrator
   ============================================================ */

export function SettingsApp() {
  const router = useRouter();
  const params = useSearchParams();

  const activeSection = parseSection(params.get("section"));

  const [modifiedCount, setModifiedCount] = useState(0);
  const [modalKind, setModalKind] = useState<SettingsModalKind>(null);

  const [flashOpen, setFlashOpen] = useState(false);
  const [flashVerb, setFlashVerb] = useState<string>("");
  const [flashTail, setFlashTail] = useState<string>("");
  const [flashTone, setFlashTone] = useState<"success" | "warn">("success");

  const handleSectionChange = useCallback(
    (next: SettingsSection) => {
      const qs = new URLSearchParams(params.toString());
      qs.set("section", next);
      router.replace(`/specialist/settings?${qs.toString()}`);
    },
    [params, router],
  );

  const handleModify = useCallback(() => {
    setModifiedCount((c) => c + 1);
  }, []);

  const handleDiscard = useCallback(() => {
    setModifiedCount(0);
    // No real revert — page reload would reset; visual feedback only.
  }, []);

  const handleSave = useCallback(() => {
    const count = modifiedCount;
    setModifiedCount(0);
    setFlashVerb("Saved.");
    setFlashTail(
      `${count} setting${count === 1 ? "" : "s"} updated.`,
    );
    setFlashTone("success");
    setFlashOpen(true);
    setTimeout(() => setFlashOpen(false), 2000);
  }, [modifiedCount]);

  const handleDangerAction = useCallback(
    (key: DangerZoneAction["key"]) => {
      setModalKind(DANGER_BY_KEY[key]);
    },
    [],
  );

  const handleConfirmModal = useCallback(
    (kind: NonNullable<SettingsModalKind>) => {
      setModalKind(null);
      const flash = FLASH_BY_MODAL[kind];
      setFlashVerb(flash.verb);
      setFlashTail(flash.tail);
      setFlashTone(flash.tone);
      setFlashOpen(true);
      setTimeout(() => setFlashOpen(false), 2000);
    },
    [],
  );

  return (
    <>
      <main className="bg-cream flex min-w-0 flex-1 flex-col">
        <RosterHeader
          eyebrow="Configuration"
          title={{ lead: "Account", italic: "settings" }}
          subtitle="Manage your account, notifications, integrations, and preferences"
        />

        <div className="grid grid-cols-1 gap-5 px-9 pt-6 pb-15 max-md:px-5 lg:grid-cols-[260px_minmax(0,1fr)]">
          <SettingsSubNav
            active={activeSection}
            onChange={handleSectionChange}
          />

          <div className="flex min-w-0 flex-col gap-4">
            <ActiveSectionPanel
              section={activeSection}
              onModify={handleModify}
              onChangePassword={() => setModalKind("change-password")}
              onManage2FA={() => setModalKind("manage-2fa")}
              onSignOutSession={() => {
                /* visual only — no state change beyond local toast in
                 * a future polish session */
              }}
              onDangerAction={handleDangerAction}
            />

            <SettingsSavebar
              visible={modifiedCount > 0}
              modifiedCount={modifiedCount}
              onDiscard={handleDiscard}
              onSave={handleSave}
            />
          </div>
        </div>
      </main>

      <SettingsModals
        kind={modalKind}
        onClose={() => setModalKind(null)}
        onConfirm={handleConfirmModal}
      />

      <ApprovedFlash
        open={flashOpen}
        verb={flashVerb}
        tail={flashTail}
        sub="Settings updated · audit-logged."
        meta="SETTINGS"
        tone={flashTone}
      />
    </>
  );
}

/* ============================================================
   Active panel switch
   ============================================================ */

function ActiveSectionPanel({
  section,
  onModify,
  onChangePassword,
  onManage2FA,
  onSignOutSession,
  onDangerAction,
}: {
  section: SettingsSection;
  onModify: () => void;
  onChangePassword: () => void;
  onManage2FA: () => void;
  onSignOutSession: (id: string) => void;
  onDangerAction: (key: DangerZoneAction["key"]) => void;
}) {
  switch (section) {
    case "profile":
      return <ProfileSection onModify={onModify} />;
    case "security":
      return (
        <SecuritySection
          onModify={onModify}
          onChangePassword={onChangePassword}
          onManage2FA={onManage2FA}
          onSignOutSession={onSignOutSession}
        />
      );
    case "notifications":
      return <NotificationsSection onModify={onModify} />;
    case "preferences":
      return <PreferencesSection onModify={onModify} />;
    case "integrations":
      return <IntegrationsSection onModify={onModify} />;
    case "data-export":
      return <DataExportSection />;
    case "advanced":
      return (
        <AdvancedSection
          onModify={onModify}
          onDangerAction={onDangerAction}
        />
      );
  }
}
