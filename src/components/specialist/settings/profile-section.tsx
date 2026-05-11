"use client";

/**
 * Profile panel — avatar block + identity form fields. Reads from
 * `currentUser` (Session 1 mock + Session 6 extensions).
 *
 * Local form state — onChange flips parent's `modified` flag.
 * Field changes don't persist (page reload resets).
 *
 * Client Component.
 */

import { useState } from "react";
import { currentUser } from "@/lib/mock-data/specialist/current-user";
import {
  SettingsSectionCard,
  SettingsField,
  SettingsTextInput,
  SettingsSelect,
  SettingsTextarea,
} from "./settings-section-card";

const TIMEZONE_OPTIONS = [
  { key: "mexico-city" as const, label: "Mexico City · GMT−6 (current)" },
  { key: "pacific" as const, label: "Pacific · GMT−7" },
  { key: "eastern" as const, label: "Eastern · GMT−4" },
  { key: "utc" as const, label: "UTC" },
];

export function ProfileSection({
  onModify,
  onAvatarUpload,
  onAvatarRemove,
}: {
  onModify: () => void;
  /** Step 12: avatar Upload / Remove flashes — file-storage service
   *  not yet wired, so clicks fire warn-tone queued-flash via parent. */
  onAvatarUpload?: (() => void) | undefined;
  onAvatarRemove?: (() => void) | undefined;
}) {
  const [fullName, setFullName] = useState(currentUser.fullName);
  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [bio, setBio] = useState(currentUser.bio);
  const [timeZone, setTimeZone] = useState<
    typeof TIMEZONE_OPTIONS[number]["key"]
  >("mexico-city");

  function bound<T>(setter: (next: T) => void) {
    return (next: T) => {
      setter(next);
      onModify();
    };
  }

  return (
    <SettingsSectionCard
      eyebrow="Identity"
      title="Your profile"
      description="Visible to talents and clients in chat threads, profile cards, and the public talent-facing page."
    >
      {/* Avatar block */}
      <div className="border-line-soft flex items-center gap-4 rounded-xl border bg-cream p-3.5">
        <div
          className="grid h-[60px] w-[60px] flex-shrink-0 place-items-center rounded-xl font-display text-[26px] font-semibold text-paper"
          style={{
            background: `linear-gradient(135deg, ${currentUser.avatarGradient.from}, ${currentUser.avatarGradient.to})`,
          }}
          aria-hidden="true"
        >
          {currentUser.initials.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-display text-[18px] font-medium text-ink">
            {fullName}
          </div>
          <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-mute">
            SPECIALIST · {currentUser.category.toUpperCase()} ·{" "}
            {currentUser.tenureMonths} MONTHS · {currentUser.cityCountry.toUpperCase()}
          </div>
        </div>
        <div className="flex flex-shrink-0 gap-2">
          <button
            type="button"
            onClick={onAvatarUpload}
            className="border-line bg-paper text-ink-soft hover:bg-cream-deep hover:text-ink cursor-pointer rounded-md border px-3 py-1.5 font-body text-[12px] transition-colors"
          >
            Upload photo
          </button>
          <button
            type="button"
            onClick={onAvatarRemove}
            className="border-line bg-paper text-ink-mute hover:text-danger hover:border-danger cursor-pointer rounded-md border px-3 py-1.5 font-body text-[12px] transition-colors"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Identity fields */}
      <SettingsField label="Full name" htmlFor="set-fullname">
        <SettingsTextInput
          id="set-fullname"
          value={fullName}
          onChange={bound(setFullName)}
        />
      </SettingsField>

      <SettingsField
        label="Display name (shown to talents)"
        htmlFor="set-displayname"
        helper="Used in chat threads. Conventionally first-name or first-name + last-initial."
      >
        <SettingsTextInput
          id="set-displayname"
          value={displayName}
          onChange={bound(setDisplayName)}
        />
      </SettingsField>

      <SettingsField
        label="Email"
        htmlFor="set-email"
        helper="Your work email · managed by admin · contact ops to change."
      >
        <SettingsTextInput
          id="set-email"
          type="email"
          value={currentUser.email}
          readOnly
        />
      </SettingsField>

      <SettingsField label="Time zone" htmlFor="set-tz">
        <SettingsSelect
          id="set-tz"
          value={timeZone}
          options={TIMEZONE_OPTIONS}
          onChange={bound(setTimeZone)}
        />
      </SettingsField>

      <SettingsField
        label="Bio (visible on talent profile)"
        htmlFor="set-bio"
        helper={`Markdown supported · ${bio.length} chars used of 500 max`}
      >
        <SettingsTextarea
          id="set-bio"
          value={bio}
          onChange={bound(setBio)}
          rows={5}
        />
      </SettingsField>
    </SettingsSectionCard>
  );
}
