"use client";

/**
 * Security panel — Auth & access card + Active sessions card.
 *
 * Per Session 6.1: 2FA is mandatory (TWO_FACTOR_REQUIRED), so the
 * 2FA row shows an inline ENABLED chip with a "Manage" button — no
 * enable/disable toggle. Recovery codes + Login alerts toggle live
 * here too.
 *
 * Login history (PDF Step 15) is typed but not rendered — placeholder
 * caption added inline.
 *
 * Client Component (toggle + modal triggers).
 */

import { useState } from "react";
import { Check, ShieldCheck } from "lucide-react";
import {
  TWO_FACTOR_REQUIRED,
  activeSessions,
} from "@/lib/mock-data/specialist/settings";
import {
  SettingsSectionCard,
  SettingsField,
} from "./settings-section-card";
import { SettingsToggle } from "./settings-toggle";

export function SecuritySection({
  onModify,
  onChangePassword,
  onManage2FA,
  onSignOutSession,
}: {
  onModify: () => void;
  onChangePassword: () => void;
  onManage2FA: () => void;
  onSignOutSession: (id: string) => void;
}) {
  const [loginAlerts, setLoginAlerts] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      {/* Auth & access */}
      <SettingsSectionCard
        eyebrow="Security"
        title="Authentication & access"
        description="Atlas requires 2FA for all specialists · contact admin to opt out (compliance review required)."
      >
        <SettingsField
          label="Password"
          inline
          helper="Last changed 47 days ago · rotate every 90 days per policy."
        >
          <button
            type="button"
            onClick={onChangePassword}
            className="border-line bg-paper text-ink-soft hover:bg-cream-deep hover:text-ink rounded-md border px-3 py-1.5 font-body text-[12.5px] transition-colors"
          >
            Change password
          </button>
        </SettingsField>

        <SettingsField
          label="Two-factor authentication"
          inline
          helper="Authenticator app · Atlas backup codes (10 unused)."
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success-bg px-2 py-0.5 font-mono text-[10px] font-semibold tracking-[0.08em] uppercase text-success">
            <Check className="h-2.5 w-2.5" strokeWidth={2} aria-hidden="true" />
            Enabled
          </span>
          {TWO_FACTOR_REQUIRED ? (
            <span
              className="inline-flex items-center gap-1.5 rounded-full bg-cream-deep px-2 py-0.5 font-mono text-[9.5px] font-semibold tracking-[0.08em] uppercase text-ink-mute"
              title="2FA is mandatory for all specialists per PDF Step 15"
            >
              <ShieldCheck
                className="h-2.5 w-2.5"
                strokeWidth={2}
                aria-hidden="true"
              />
              Required
            </span>
          ) : null}
          <button
            type="button"
            onClick={onManage2FA}
            className="border-line bg-paper text-ink-soft hover:bg-cream-deep hover:text-ink rounded-md border px-3 py-1.5 font-body text-[12.5px] transition-colors"
          >
            Manage
          </button>
        </SettingsField>

        <SettingsField
          label="Recovery codes"
          inline
          helper="Single-use codes if you lose your authenticator · regenerate any time."
        >
          <button
            type="button"
            onClick={(e) => e.preventDefault()}
            className="border-line bg-paper text-ink-soft hover:bg-cream-deep hover:text-ink rounded-md border px-3 py-1.5 font-body text-[12.5px] transition-colors"
          >
            View &amp; regenerate
          </button>
        </SettingsField>

        <SettingsField
          label="Login alerts"
          inline
          helper="Email me when a new device signs in to my account."
        >
          <SettingsToggle
            checked={loginAlerts}
            onChange={(v) => {
              setLoginAlerts(v);
              onModify();
            }}
            ariaLabel="Login alerts"
          />
        </SettingsField>
      </SettingsSectionCard>

      {/* Active sessions */}
      <SettingsSectionCard
        eyebrow="Active sessions"
        title="Devices signed in to your account"
        description={`${activeSessions.length} active sessions · sign out of any device you don't recognize.`}
      >
        <div className="flex flex-col gap-0">
          {activeSessions.map((s) => (
            <div
              key={s.id}
              className="border-line-soft grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b py-3 last:border-b-0"
            >
              <div className="min-w-0">
                <div className="text-[13px] font-medium text-ink">
                  {s.device}
                </div>
                <div className="font-mono text-[10.5px] tracking-[0.04em] uppercase text-ink-mute">
                  {s.locationAndWhen}
                </div>
              </div>
              {s.isCurrent ? (
                <span className="rounded-full bg-success-bg px-2 py-0.5 font-mono text-[10px] font-semibold tracking-[0.08em] uppercase text-success">
                  CURRENT
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => onSignOutSession(s.id)}
                  className="border-line bg-paper text-ink-soft hover:bg-danger-bg hover:text-danger hover:border-danger rounded-md border px-3 py-1.5 font-body text-[12px] transition-colors"
                >
                  Sign out
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="mt-1 font-mono text-[10.5px] italic tracking-[0.04em] text-ink-mute">
          Login history available via Data &amp; export · 90-day window
          retained.
        </div>
      </SettingsSectionCard>
    </div>
  );
}
