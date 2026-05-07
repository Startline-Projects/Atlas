"use client";

/**
 * Notifications panel — 4-channel matrix (event × in-app/email/sms)
 * + Quiet hours card.
 *
 * Per source CSS:
 *   - Header row: Event / In-app / Email / SMS column headers
 *   - 8 event rows, each with 3 toggle cells
 *   - Required events (`dispute-filed`) render disabled toggles —
 *     can't be turned off
 *   - Quiet hours: enabled toggle + two `<input type="time">`
 *
 * Client Component.
 */

import { useState } from "react";
import {
  NOTIFICATION_EVENTS,
  type NotificationEvent,
  type NotificationChannel,
  quietHours as initialQuietHours,
} from "@/lib/mock-data/specialist/settings";
import {
  SettingsSectionCard,
  SettingsField,
} from "./settings-section-card";
import { SettingsToggle } from "./settings-toggle";

const CHANNELS: ReadonlyArray<{ key: NotificationChannel; label: string }> = [
  { key: "in-app", label: "In-app" },
  { key: "email", label: "Email" },
  { key: "sms", label: "SMS" },
];

export function NotificationsSection({ onModify }: { onModify: () => void }) {
  // Mirror the mock state into local mutable state. Resets on page reload.
  const [eventState, setEventState] = useState<
    Record<string, Record<NotificationChannel, boolean>>
  >(() => {
    const out: Record<string, Record<NotificationChannel, boolean>> = {};
    for (const e of NOTIFICATION_EVENTS) {
      out[e.key] = { ...e.channels };
    }
    return out;
  });

  const [quietEnabled, setQuietEnabled] = useState(initialQuietHours.enabled);
  const [quietFrom, setQuietFrom] = useState(initialQuietHours.fromHHmm);
  const [quietTo, setQuietTo] = useState(initialQuietHours.toHHmm);

  function flipChannel(eventKey: string, channel: NotificationChannel) {
    setEventState((prev) => ({
      ...prev,
      [eventKey]: {
        ...prev[eventKey]!,
        [channel]: !prev[eventKey]![channel],
      },
    }));
    onModify();
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Notifications matrix */}
      <SettingsSectionCard
        eyebrow="Notifications"
        title="Pick how each event reaches you"
        description="Atlas in-app is always on for critical events. Some events (Dispute filed) can't be disabled per compliance."
      >
        {/* Matrix header row — hidden at <600px per source CSS */}
        <div className="border-line-soft hidden grid-cols-[minmax(0,1fr)_60px_60px_60px] items-center gap-3 border-b pb-2 sm:grid">
          <div className="font-mono text-[9.5px] font-semibold tracking-[0.12em] uppercase text-ink-mute">
            Event
          </div>
          {CHANNELS.map((c) => (
            <div
              key={c.key}
              className="text-center font-mono text-[9.5px] font-semibold tracking-[0.12em] uppercase text-ink-mute"
            >
              {c.label}
            </div>
          ))}
        </div>

        {NOTIFICATION_EVENTS.map((event) => (
          <NotificationRow
            key={event.key}
            event={event}
            channels={eventState[event.key]!}
            onFlip={flipChannel}
          />
        ))}
      </SettingsSectionCard>

      {/* Quiet hours */}
      <SettingsSectionCard
        eyebrow="Quiet hours"
        title="When notifications stay silent"
        description="Quiet hours respect every channel. Critical events (Dispute filed) bypass quiet hours."
      >
        <SettingsField label="Enable quiet hours" inline>
          <SettingsToggle
            checked={quietEnabled}
            onChange={(v) => {
              setQuietEnabled(v);
              onModify();
            }}
            ariaLabel="Enable quiet hours"
          />
        </SettingsField>

        <SettingsField label="Time window" inline>
          <input
            type="time"
            value={quietFrom}
            disabled={!quietEnabled}
            onChange={(e) => {
              setQuietFrom(e.target.value);
              onModify();
            }}
            className="bg-cream border-line rounded-md border px-2.5 py-1.5 font-mono text-[12px] text-ink outline-none transition-colors focus:border-ink-mute focus:bg-paper disabled:opacity-50"
          />
          <span className="font-mono text-[10.5px] tracking-[0.04em] uppercase text-ink-mute">
            to
          </span>
          <input
            type="time"
            value={quietTo}
            disabled={!quietEnabled}
            onChange={(e) => {
              setQuietTo(e.target.value);
              onModify();
            }}
            className="bg-cream border-line rounded-md border px-2.5 py-1.5 font-mono text-[12px] text-ink outline-none transition-colors focus:border-ink-mute focus:bg-paper disabled:opacity-50"
          />
        </SettingsField>
      </SettingsSectionCard>
    </div>
  );
}

/* ============================================================
   Notification row
   ============================================================ */

function NotificationRow({
  event,
  channels,
  onFlip,
}: {
  event: NotificationEvent;
  channels: Record<NotificationChannel, boolean>;
  onFlip: (eventKey: string, channel: NotificationChannel) => void;
}) {
  return (
    <div className="border-line-soft grid grid-cols-[minmax(0,1fr)_60px_60px_60px] items-center gap-3 border-b py-3 last:border-b-0 max-sm:grid-cols-[minmax(0,1fr)_auto] max-sm:gap-2">
      <div className="min-w-0">
        <div className="text-[13px] font-medium text-ink">{event.label}</div>
        {event.required ? (
          <div className="mt-0.5 font-mono text-[9.5px] tracking-[0.08em] uppercase text-amber font-medium">
            CRITICAL · cannot be turned off
          </div>
        ) : null}
      </div>
      {CHANNELS.map((c) => (
        <div
          key={c.key}
          className="flex items-center justify-center max-sm:order-1"
        >
          <SettingsToggle
            checked={channels[c.key]}
            disabled={event.required === true}
            onChange={() => onFlip(event.key, c.key)}
            ariaLabel={`${event.label} via ${c.label}`}
          />
        </div>
      ))}
    </div>
  );
}
