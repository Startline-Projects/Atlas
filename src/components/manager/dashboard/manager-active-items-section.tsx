/**
 * ManagerActiveItemsSection — 3-column "Active items" panel.
 *
 * Server Component. Three lists rendered side-by-side at lg, stacked
 * at md and below:
 *
 *   1. Specialists need attention (4 rows)
 *   2. Disputes need oversight    (4 rows)
 *   3. Recent team activity        (6 feed items)
 *
 * Column footer links render as disabled spans (per Q2 lock) since
 * their target routes 404 until Steps 4 / 7 / 10.
 *
 * Inlined `SpecialistRow`, `DisputeRow`, `FeedItem` sub-components
 * per Step 3 Q6.
 *
 * Ported from `reference/manager.html` lines 19710-19854.
 */

import {
  activeColumnCounts,
  activeDisputesNeedingOversight,
  activeSpecialistsNeedingAttention,
  recentTeamActivity,
  type ActiveDisputeRow,
  type ActiveNeedTone,
  type ActiveSpecialistRow,
  type ActivityFeedItem,
} from "@/lib/mock-data/manager/manager-active-items";
import { cn } from "@/lib/utils/cn";

/* Avatar color slots (1-5) port the prototype's `.cl-{N}` classes
   to ad-hoc gradients. Step 4 will replace this with the full
   mt-avatar primitive — single-file refactor target. */
const COLOR_SLOT_BG: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "bg-gradient-to-br from-[#5468a0] to-[#2a3559]",
  2: "bg-gradient-to-br from-[#b8865a] to-[#704e27]",
  3: "bg-gradient-to-br from-[#7a9460] to-[#3f5028]",
  4: "bg-gradient-to-br from-[#a06b5f] to-[#5a3530]",
  5: "bg-gradient-to-br from-[#6b7894] to-[#3a4458]",
};

const NEED_TAG_CLASS: Record<ActiveNeedTone, string> = {
  urgent: "bg-danger-bg text-danger border-danger/30",
  attn: "bg-amber-bg text-amber border-amber/30",
  neutral: "bg-cream-deep text-ink-soft border-line",
};

export function ManagerActiveItemsSection() {
  return (
    <section className="mb-8">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2
          className="font-display text-ink m-0 text-[22px] font-medium tracking-[-0.015em]"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          Active items
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Column 1 — Specialists need attention */}
        <Column
          title="Specialists need attention"
          count={activeColumnCounts.specialistsNeedAttention}
          headerLink={{ label: "View team", landsInStep: 4 }}
          footerLink={{ label: "Open team directory →", landsInStep: 4 }}
        >
          <ul className="flex flex-col gap-0">
            {activeSpecialistsNeedingAttention.map((row) => (
              <SpecialistRow key={row.id} row={row} />
            ))}
          </ul>
        </Column>

        {/* Column 2 — Disputes need oversight */}
        <Column
          title="Disputes need oversight"
          count={activeColumnCounts.disputesNeedOversight}
          headerLink={{ label: "View all", landsInStep: 7 }}
          footerLink={{ label: "Open team disputes →", landsInStep: 7 }}
        >
          <ul className="flex flex-col gap-0">
            {activeDisputesNeedingOversight.map((row) => (
              <DisputeRow key={row.id} row={row} />
            ))}
          </ul>
        </Column>

        {/* Column 3 — Recent team activity */}
        <Column
          title="Recent team activity"
          headerLabel="Live"
          footerLink={{ label: "Full activity feed →", landsInStep: 10 }}
        >
          <ul className="flex flex-col gap-0">
            {recentTeamActivity.map((item) => (
              <FeedItem key={item.id} item={item} />
            ))}
          </ul>
        </Column>
      </div>
    </section>
  );
}

/* ============================================================
   Column wrapper — title + count + disabled "view all" + footer
   ============================================================ */

function Column({
  title,
  count,
  headerLink,
  headerLabel,
  footerLink,
  children,
}: {
  title: string;
  count?: number;
  headerLink?: { label: string; landsInStep: number };
  headerLabel?: string;
  footerLink: { label: string; landsInStep: number };
  children: React.ReactNode;
}) {
  return (
    <div className="bg-paper border-line shadow-sm flex flex-col rounded-md border">
      <div className="border-line-soft flex items-center justify-between gap-3 border-b px-4 py-3">
        <h3 className="text-ink m-0 flex items-center gap-2 text-[13px] font-semibold">
          {title}
          {typeof count === "number" ? (
            <span className="bg-cream-deep text-ink-soft rounded-full px-2 py-0.5 font-mono text-[9.5px] tracking-[0.04em]">
              {count}
            </span>
          ) : null}
        </h3>
        {headerLink ? (
          <span
            aria-disabled="true"
            className="text-ink-mute cursor-not-allowed text-[11.5px] font-medium opacity-60"
            title={`Lands in Step ${headerLink.landsInStep}`}
          >
            {headerLink.label}
          </span>
        ) : headerLabel ? (
          <span className="text-ink-mute flex items-center gap-1.5 text-[11.5px] font-medium">
            <span
              aria-hidden="true"
              className="bg-success inline-block h-1.5 w-1.5 animate-pulse rounded-full"
            />
            {headerLabel}
          </span>
        ) : null}
      </div>
      <div className="flex-1 px-4 py-2">{children}</div>
      <div className="border-line-soft border-t px-4 py-3">
        <span
          aria-disabled="true"
          className="text-ink-mute cursor-not-allowed text-[12px] font-medium opacity-60"
          title={`Lands in Step ${footerLink.landsInStep}`}
        >
          {footerLink.label}
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   Specialist row — avatar + name + country + need tag + detail
   ============================================================ */

function SpecialistRow({ row }: { row: ActiveSpecialistRow }) {
  return (
    <li className="flex items-start gap-3 py-2.5">
      <div
        aria-hidden="true"
        className={cn(
          "text-paper grid h-8 w-8 flex-shrink-0 place-items-center rounded-full font-mono text-[10.5px] font-semibold tracking-[0.04em]",
          COLOR_SLOT_BG[row.colorSlot],
        )}
      >
        {row.initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-ink mb-0.5 flex items-center gap-1.5 text-[13px] font-medium">
          {row.fullName} <span aria-hidden="true">{row.countryFlag}</span>
        </div>
        <div className="text-ink-soft flex items-center gap-1.5 text-[11.5px]">
          <span
            className={cn(
              "rounded-[3px] border px-1.5 py-0.5 font-mono text-[9.5px] tracking-[0.04em]",
              NEED_TAG_CLASS[row.needTag.tone],
            )}
          >
            {row.needTag.label}
          </span>
          {row.detail}
        </div>
      </div>
    </li>
  );
}

/* ============================================================
   Dispute row — avatar + title + SLA tag + owner attribution
   ============================================================ */

function DisputeRow({ row }: { row: ActiveDisputeRow }) {
  return (
    <li className="flex items-start gap-3 py-2.5">
      <div
        aria-hidden="true"
        className={cn(
          "text-paper grid h-8 w-8 flex-shrink-0 place-items-center rounded-full font-mono text-[10.5px] font-semibold tracking-[0.04em]",
          COLOR_SLOT_BG[row.colorSlot],
        )}
      >
        {row.initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-ink mb-0.5 text-[13px] font-medium leading-tight">
          {row.title}
        </div>
        <div className="text-ink-soft flex items-center gap-1.5 text-[11.5px]">
          <span
            className={cn(
              "rounded-[3px] border px-1.5 py-0.5 font-mono text-[9.5px] tracking-[0.04em]",
              NEED_TAG_CLASS[row.slaTag.tone],
            )}
          >
            {row.slaTag.label}
          </span>
          {row.owner.youOwn ? (
            <>
              Owner: <em className="text-ink font-medium not-italic">you</em>
            </>
          ) : (
            <>Owner: {row.owner.specialistName}</>
          )}
        </div>
      </div>
    </li>
  );
}

/* ============================================================
   Feed item — bullet + text + relative-time
   ============================================================ */

const FEED_BULLET_CLASS: Record<ActivityFeedItem["kind"], string> = {
  review: "bg-success",
  neutral: "bg-ink-mute",
};

function FeedItem({ item }: { item: ActivityFeedItem }) {
  return (
    <li className="flex items-start gap-2.5 py-2">
      <span
        aria-hidden="true"
        className={cn(
          "mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full",
          FEED_BULLET_CLASS[item.kind],
        )}
      />
      <div className="text-ink-soft flex-1 text-[12.5px] leading-[1.45]">
        {item.body.map((seg, i) =>
          seg.kind === "strong" ? (
            <strong key={i} className="text-ink font-semibold">
              {seg.value}
            </strong>
          ) : (
            <span key={i}>{seg.value}</span>
          ),
        )}
        <span className="text-ink-mute ml-1.5 font-mono text-[10px] tracking-[0.04em]">
          {item.when}
        </span>
      </div>
    </li>
  );
}
