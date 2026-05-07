"use client";

/**
 * Integrations panel — 6 integration cards (Google Calendar / Gmail /
 * Slack / LinkedIn / Zoom / Notion). Each card has a brand-colored
 * glyph initial, name, description, connected/disconnected state,
 * and Connect/Manage button.
 *
 * Brand color literals (`#4285F4`, `#EA4335`, `#4A154B`, `#0A66C2`,
 * `#2D8CFF`, `#000000`) come from mock data; they're known decoratives
 * documented in CONVERSION_LOG Session 6.
 *
 * Connect / Manage / Disconnect toggle local state per card.
 *
 * Client Component.
 */

import { useState } from "react";
import {
  integrations as initialIntegrations,
  type IntegrationCard,
} from "@/lib/mock-data/specialist/settings";
import { SettingsSectionCard } from "./settings-section-card";

export function IntegrationsSection({
  onModify,
}: {
  onModify: () => void;
}) {
  const [items, setItems] = useState<ReadonlyArray<IntegrationCard>>(
    initialIntegrations,
  );

  function toggleConnected(key: IntegrationCard["key"]) {
    setItems((prev) =>
      prev.map((it) =>
        it.key === key ? { ...it, connected: !it.connected } : it,
      ),
    );
    onModify();
  }

  return (
    <SettingsSectionCard
      eyebrow="Integrations"
      title="Connected tools"
      description="Connect Atlas to the tools you already use. All integrations are scoped to your specialist account."
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 max-md:gap-2.5">
        {items.map((card) => (
          <IntegrationCardItem
            key={card.key}
            card={card}
            onToggle={() => toggleConnected(card.key)}
          />
        ))}
      </div>
    </SettingsSectionCard>
  );
}

function IntegrationCardItem({
  card,
  onToggle,
}: {
  card: IntegrationCard;
  onToggle: () => void;
}) {
  return (
    <article className="bg-cream border-line-soft flex flex-col gap-2.5 rounded-lg border p-3.5">
      <div className="flex items-start gap-3">
        <div
          className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg font-display text-[15px] font-semibold text-paper"
          style={{ background: card.brandColor }}
          aria-hidden="true"
        >
          {card.name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[13.5px] font-medium text-ink">
            <span className="truncate">{card.name}</span>
            {card.connected ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-success-bg px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-[0.08em] uppercase text-success">
                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-success"
                />
                Connected
              </span>
            ) : null}
          </div>
        </div>
      </div>
      <p className="m-0 text-[12.5px] leading-[1.4] text-ink-soft">
        {card.description}
      </p>
      <div className="border-line-soft flex items-end justify-between gap-2 border-t pt-2.5">
        <div className="min-w-0 flex-1 font-mono text-[10px] tracking-[0.04em] uppercase text-ink-mute">
          {card.metaLabel ?? "Not connected"}
        </div>
        <button
          type="button"
          onClick={onToggle}
          className={`flex-shrink-0 rounded-md border px-3 py-1.5 font-body text-[11.5px] transition-colors ${
            card.connected
              ? "border-line bg-paper text-ink-soft hover:bg-cream-deep hover:text-ink"
              : "border-ink bg-ink text-paper hover:bg-ink-soft"
          }`}
        >
          {card.connected ? "Manage" : "Connect"}
        </button>
      </div>
    </article>
  );
}
