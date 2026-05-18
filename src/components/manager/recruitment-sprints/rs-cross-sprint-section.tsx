/**
 * RsCrossSprintSection — cross-sprint coordination.
 *
 * Per Step 9 trim (a): kept Channels overlap matrix + Geographic
 * overlap. Dropped Budget allocation + Resource sharing cards.
 *
 * Two inlined sub-cards:
 *   1. ChannelsOverlapMatrix — 6 channels × 4 active sprint owners
 *   2. GeographicOverlapList — 4 regions with conflict / OK tone
 *
 * Server-renderable (no state).
 *
 * Ported from prototype lines 30664-30770 (only channels + geo;
 * budget at 30772-30810 + resource sharing at 30812-30852 are
 * dropped per trim).
 */

import { getSpecialist } from "@/lib/mock-data/manager/team";
import {
  channelOverlapInsight,
  channelOverlapMatrix,
  geographicOverlap,
  geographicOverlapInsight,
  getActiveSprintOwners,
  type ChannelOverlapIntensity,
  type GeoOverlap,
} from "@/lib/mock-data/manager/manager-recruitment-sprints-data";
import { cn } from "@/lib/utils/cn";

export function RsCrossSprintSection() {
  return (
    <section className="mb-8">
      <header className="mb-3 flex items-baseline justify-between gap-3">
        <h2
          className="font-display text-ink m-0 text-[18px] font-medium tracking-[-0.01em]"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          Cross-sprint <em className="italic">coordination</em>
        </h2>
        <span className="text-ink-mute text-[12px]">Conflicts &amp; opportunities</span>
      </header>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChannelsOverlapMatrix />
        <GeographicOverlapList />
      </div>
    </section>
  );
}

/* ============================================================
   Sub-card 1 — Channels overlap matrix
   ============================================================ */

const INTENSITY_CELL_CLASS: Record<ChannelOverlapIntensity, string> = {
  heavy: "bg-danger",
  using: "bg-ink-mute",
  none: "bg-cream-deep",
};

const INTENSITY_TITLE: Record<ChannelOverlapIntensity, string> = {
  heavy: "heavy use",
  using: "using",
  none: "not using",
};

function ChannelsOverlapMatrix() {
  const owners = getActiveSprintOwners();
  return (
    <article className="bg-paper border-line flex flex-col rounded-md border p-5 shadow-sm">
      <header>
        <div className="text-ink-mute font-mono text-[9.5px] tracking-[0.14em] uppercase">
          Channels overlap
        </div>
        <h3
          className="font-display text-ink m-0 mt-0.5 text-[15px] font-medium tracking-[-0.01em]"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          Who&apos;s using <em className="italic">what</em>
        </h3>
      </header>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-[11.5px]">
          <thead>
            <tr>
              <th className="text-left font-normal text-ink-mute pb-2 pr-2">{""}</th>
              {owners.map((ownerId) => {
                const owner = getSpecialist(ownerId);
                return (
                  <th
                    key={ownerId}
                    scope="col"
                    className="text-ink-soft pb-2 px-2 text-center font-mono text-[10px] font-semibold tracking-[0.04em]"
                  >
                    {owner?.initials ?? "??"}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {channelOverlapMatrix.map((row) => (
              <tr key={row.channel}>
                <th
                  scope="row"
                  className="text-ink-soft py-1.5 pr-3 text-left text-[11.5px] font-medium whitespace-nowrap"
                >
                  {row.channel}
                </th>
                {owners.map((ownerId) => {
                  const intensity = row.usage[ownerId];
                  const owner = getSpecialist(ownerId);
                  const title = owner
                    ? `${owner.firstName} · ${INTENSITY_TITLE[intensity]}`
                    : INTENSITY_TITLE[intensity];
                  return (
                    <td key={ownerId} className="px-2 py-1.5 text-center">
                      <span
                        title={title}
                        aria-label={title}
                        className={cn(
                          "inline-block h-3 w-3 rounded-sm transition-colors",
                          INTENSITY_CELL_CLASS[intensity],
                        )}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-ink-mute border-line-soft m-0 mt-3 border-t pt-3 text-[11.5px] leading-[1.45]">
        💡 <strong className="text-danger">Conflict:</strong> {channelOverlapInsight}
      </p>
    </article>
  );
}

/* ============================================================
   Sub-card 2 — Geographic overlap
   ============================================================ */

const GEO_TONE_CLASS: Record<GeoOverlap["tone"], string> = {
  conflict: "bg-danger-bg/40 border-danger/30 border-l-danger border-l-[3px]",
  ok: "bg-cream/40 border-line",
};

const GEO_TAG_CLASS: Record<GeoOverlap["tone"], string> = {
  conflict: "bg-danger text-paper",
  ok: "bg-cream-deep text-ink-soft",
};

function GeographicOverlapList() {
  return (
    <article className="bg-paper border-line flex flex-col rounded-md border p-5 shadow-sm">
      <header>
        <div className="text-ink-mute font-mono text-[9.5px] tracking-[0.14em] uppercase">
          Geographic overlap
        </div>
        <h3
          className="font-display text-ink m-0 mt-0.5 text-[15px] font-medium tracking-[-0.01em]"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          Region <em className="italic">conflicts</em>
        </h3>
      </header>

      <ul className="mt-4 flex flex-col gap-2">
        {geographicOverlap.map((geo) => (
          <li
            key={geo.region}
            className={cn(
              "grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-md border p-2.5",
              GEO_TONE_CLASS[geo.tone],
            )}
          >
            <span className="text-ink text-[12px] font-semibold whitespace-nowrap">
              {geo.region}
            </span>
            <span className="text-ink-soft text-[11.5px] leading-snug">
              {geo.detail}
            </span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 font-mono text-[9.5px] font-semibold tracking-[0.08em] uppercase",
                GEO_TAG_CLASS[geo.tone],
              )}
            >
              {geo.tone === "conflict" ? "Conflict" : "OK"}
            </span>
          </li>
        ))}
      </ul>

      <p className="text-ink-mute border-line-soft m-0 mt-3 border-t pt-3 text-[11.5px] leading-[1.45]">
        💡 <strong className="text-danger">Action:</strong> {geographicOverlapInsight}
      </p>
    </article>
  );
}
