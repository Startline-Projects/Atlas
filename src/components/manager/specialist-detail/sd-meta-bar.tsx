/**
 * SdMetaBar — slim meta bar below the hero.
 *
 *   Time zone · Languages · Performance score · Last active
 *
 * Server Component. Ported from `reference/manager.html` lines
 * 27791-27799.
 */

import type { Specialist } from "@/lib/mock-data/manager/team";

export function SdMetaBar({ specialist: s }: { specialist: Specialist }) {
  return (
    <div className="bg-paper border-line text-ink-soft mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-md border px-4 py-2.5 text-[12px]">
      <MetaItem label="Time zone" value={s.timeZone} />
      <Separator />
      <MetaItem label="Languages" value={s.languages.join(" · ")} />
      <Separator />
      <MetaItem label="Performance score" value={String(s.performanceScore)} />
      <Separator />
      <MetaItem
        label="Last active"
        value={s.lastActiveLabel ?? "On vacation"}
      />
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <span>
      <strong className="text-ink font-semibold">{label}</strong>{" "}
      <span className="text-ink-soft">{value}</span>
    </span>
  );
}

function Separator() {
  return (
    <span
      aria-hidden="true"
      className="bg-line inline-block h-3 w-px flex-shrink-0"
    />
  );
}
