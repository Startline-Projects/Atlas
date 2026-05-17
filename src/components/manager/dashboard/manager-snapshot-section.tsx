/**
 * ManagerSnapshotSection — "Today's snapshot" 6 stat tiles, team-wide.
 *
 * Server Component. Inlined `SnapshotCard` sub-component per Step 3 Q6.
 *
 * Per Q2 lock: 4 of the 6 tiles are clickable in the prototype; in
 * Step 3 they render as `<div aria-disabled cursor-not-allowed>`
 * wrappers (navigation-link tier). The 2 non-clickable tiles render
 * as plain `<article>` (no disabled treatment).
 *
 * Ported from `reference/manager.html` lines 19670-19707.
 */

import {
  managerSnapshotItems,
  type ManagerSnapshotItem,
  type SnapshotTone,
  type SnapshotPillTone,
} from "@/lib/mock-data/manager/manager-snapshot";
import { cn } from "@/lib/utils/cn";

const VALUE_TONE_CLASS: Record<SnapshotTone, string> = {
  neutral: "text-ink",
  attn: "text-amber",
  urgent: "text-danger",
};

const PILL_TONE_CLASS: Record<SnapshotPillTone, string> = {
  neutral: "bg-cream-deep text-ink-soft border-line",
  lime: "bg-lime text-ink border-lime-deep",
};

export function ManagerSnapshotSection() {
  return (
    <section className="mb-8">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2
          className="font-display text-ink m-0 text-[22px] font-medium tracking-[-0.015em]"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          Today&apos;s snapshot
        </h2>
        <span className="text-ink-mute font-mono text-[10.5px] tracking-[0.04em]">
          Updated 2 min ago · team-wide
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {managerSnapshotItems.map((item) => (
          <SnapshotCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function SnapshotCard({ item }: { item: ManagerSnapshotItem }) {
  const inner = (
    <>
      <span className="text-ink-mute mb-1 block font-mono text-[9.5px] tracking-[0.14em] uppercase">
        {item.label}
      </span>
      <span className="mb-1.5 block">
        {item.value.kind === "number" ? (
          <span
            className={cn(
              "font-display text-[26px] leading-none font-medium tracking-[-0.015em]",
              VALUE_TONE_CLASS[item.value.tone ?? "neutral"],
            )}
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            {item.value.value}
            {item.value.suffix ? (
              <span className="text-ink-mute ml-1 text-[12px] font-normal">
                {item.value.suffix}
              </span>
            ) : null}
          </span>
        ) : (
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[12px] font-medium",
              PILL_TONE_CLASS[item.value.tone],
            )}
          >
            {item.value.text}
          </span>
        )}
      </span>
      <span className="text-ink-soft block text-[12px] leading-[1.4]">
        {item.detail.map((seg, i) =>
          seg.kind === "strong" ? (
            <strong key={i} className="text-ink font-semibold">
              {seg.value}
            </strong>
          ) : (
            <span key={i}>{seg.value}</span>
          ),
        )}
      </span>
    </>
  );

  if (item.disabledRoute) {
    return (
      <div
        aria-disabled="true"
        className="bg-paper border-line flex cursor-not-allowed flex-col rounded-md border p-3.5 opacity-60"
      >
        {inner}
      </div>
    );
  }

  return (
    <article className="bg-paper border-line flex flex-col rounded-md border p-3.5">
      {inner}
    </article>
  );
}
