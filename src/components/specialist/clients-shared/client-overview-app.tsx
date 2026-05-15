/**
 * ClientOverviewApp — body of `/specialist/clients/[id]` (overview).
 *
 * Sections rendered, in order:
 *   1. Quick stats — 4 stat cards (Active hires / Lifetime spend /
 *      Their rating / Briefs all-time). Section 1 of the user spec
 *      ("client meta strip") lives in `ClientPageHeader` — that's
 *      industry / size / HQ / trust tier / VIP / verified.
 *   2. Recent activity timeline — reuses `client.activityPreview`
 *      (already-formatted on ManagedClient). Same visual bullet
 *      mapping as the slide-over sheet timeline so the overview
 *      reads like the sheet writ large. Hidden when the array is
 *      empty.
 *   3. Quick-action cards — 4 cards (Contracts / Briefs / Hires /
 *      Talent). Each shows the honest count (incl. "0") + a 1-line
 *      teaser. **Q1B's disabled-tab convention extended to these
 *      cards** (consistency-fix turn): cards render as `<div
 *      aria-disabled>` (NOT `<Link>`) for C1 because their routes
 *      404. Each card carries a `disabled?: boolean` flag; C2 flips
 *      `false` on Contracts + Briefs cards (when those routes land),
 *      C3 flips Hires + Talent. DOM stays stable across all 3
 *      checkpoints — only the flag changes, mirroring the sub-nav
 *      tab pattern.
 *
 * Notes section deferred to C3. No action group on this page.
 *
 * Server Component — no state.
 */

import Link from "next/link";
import {
  ClipboardList,
  FileText,
  Sparkles,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";
import type {
  ClientTimelineEvent,
  ManagedClient,
} from "@/lib/mock-data/specialist/my-clients";
import { cn } from "@/lib/utils/cn";
import type { ClientSubNavCounts } from "./client-sub-nav-tabs";

const TIMELINE_BULLET: Record<ClientTimelineEvent["kind"], string> = {
  hire: "bg-success",
  "brief-sent": "bg-ink",
  "brief-received": "bg-ink",
  "review-left": "bg-success",
  "dispute-opened": "bg-danger",
  "dispute-resolved": "bg-success",
  "engagement-completed": "bg-amber",
  "expansion-ask": "bg-success",
  "client-message": "bg-navy",
  "specialist-message": "bg-ink",
};

export function ClientOverviewApp({
  client,
  counts,
}: {
  client: ManagedClient;
  counts: ClientSubNavCounts;
}) {
  return (
    <div className="flex flex-col gap-7 px-6 pt-6 pb-12 sm:px-10">
      <QuickStats client={client} />
      <RecentActivity events={client.activityPreview} />
      <QuickActions clientId={client.id} counts={counts} />
    </div>
  );
}

/* ============================================================
   Section 1 — Quick stats (4 cards)
   ============================================================ */

function QuickStats({ client }: { client: ManagedClient }) {
  return (
    <section aria-label="Quick metrics">
      <h2 className="sr-only">Quick metrics</h2>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Active hires" value={String(client.activeHires)} />
        <StatCard label="Lifetime spend" value={client.totalSpendLabel} />
        <StatCard
          label="Their rating"
          value={client.rating > 0 ? `${client.rating.toFixed(1)}/5` : "—"}
          icon={client.rating > 0 ? <Star className="h-3.5 w-3.5 fill-current" /> : null}
        />
        <StatCard label="Briefs all-time" value={String(client.briefsTotal)} />
      </div>
    </section>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <article className="bg-paper border-line flex flex-col gap-2 rounded-xl border p-4">
      <div className="text-ink-mute font-mono text-[9.5px] font-medium tracking-[0.14em] uppercase">
        {label}
      </div>
      <div
        className="font-display text-ink flex items-center gap-1.5 text-[24px] font-medium leading-none tracking-[-0.015em]"
        style={{ fontVariationSettings: '"opsz" 36' }}
      >
        {icon ? (
          <span className="text-amber flex-shrink-0" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <span>{value}</span>
      </div>
    </article>
  );
}

/* ============================================================
   Section 2 — Recent activity timeline
   ============================================================ */

function RecentActivity({
  events,
}: {
  events: ReadonlyArray<ClientTimelineEvent>;
}) {
  if (events.length === 0) return null;
  return (
    <section aria-label="Recent activity">
      <SectionHeading>Recent activity</SectionHeading>
      <div className="bg-paper border-line rounded-xl border p-5">
        <ul className="flex flex-col gap-3">
          {events.map((ev) => (
            <li key={ev.id} className="flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className={cn(
                  "mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full",
                  TIMELINE_BULLET[ev.kind],
                )}
              />
              <div className="text-ink-soft text-[13px] leading-[1.45]">
                {ev.text}
                <span className="text-ink-mute mt-0.5 block font-mono text-[10px] tracking-[0.04em]">
                  {ev.when}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ============================================================
   Section 3 — Quick-action cards (4 cards)

   C1: all 4 disabled. C2 flips Contracts + Briefs → enabled (Link).
   C3 flips Hires + Talent → enabled. DOM structure stays stable
   across checkpoints; only the `disabled` flag changes. Mirrors the
   sub-nav tab pattern in `client-sub-nav-tabs.tsx`.
   ============================================================ */

type QuickActionCard = {
  href: string;
  Icon: LucideIcon;
  label: string;
  count: number;
  teaser: string;
  /** When true, render as `<div aria-disabled>` instead of `<Link>`.
   *  Visual: `cursor-not-allowed opacity-60`, no hover state. */
  disabled?: boolean;
};

function QuickActions({
  clientId,
  counts,
}: {
  clientId: string;
  counts: ClientSubNavCounts;
}) {
  const cards: ReadonlyArray<QuickActionCard> = [
    {
      href: `/specialist/clients/${clientId}/contracts`,
      Icon: FileText,
      label: "Contracts",
      count: counts.contracts,
      teaser:
        counts.contracts === 0
          ? "None on file"
          : counts.contracts === 1
            ? "1 on file"
            : `${counts.contracts} on file`,
      disabled: true, // C2: flip to false when route lands
    },
    {
      href: `/specialist/clients/${clientId}/briefs`,
      Icon: ClipboardList,
      label: "Briefs",
      count: counts.briefsOpen,
      teaser:
        counts.briefsOpen === 0
          ? "No open briefs"
          : counts.briefsOpen === 1
            ? "1 open brief"
            : `${counts.briefsOpen} open briefs`,
      disabled: true, // C2: flip to false when route lands
    },
    {
      href: `/specialist/clients/${clientId}/hires`,
      Icon: Users,
      label: "Hires",
      count: counts.hiresActive,
      teaser:
        counts.hiresActive === 0
          ? "No active hires"
          : counts.hiresActive === 1
            ? "1 active hire"
            : `${counts.hiresActive} active hires`,
      disabled: true, // C3: flip to false when route lands
    },
    {
      href: `/specialist/clients/${clientId}/talent`,
      Icon: Sparkles,
      label: "Talent matches",
      count: counts.talentPool,
      teaser:
        counts.talentPool === 0
          ? "No matches yet"
          : counts.talentPool === 1
            ? "1 in top pool"
            : `${counts.talentPool} in top pool`,
      disabled: true, // C3: flip to false when route lands
    },
  ];

  return (
    <section aria-label="Client sections">
      <SectionHeading>Sections</SectionHeading>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <QuickActionCardView key={card.label} card={card} />
        ))}
      </div>
    </section>
  );
}

function QuickActionCardView({ card }: { card: QuickActionCard }) {
  const inner = (
    <>
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "bg-cream-deep flex h-9 w-9 items-center justify-center rounded-lg",
            card.disabled
              ? "text-ink-mute"
              : "text-ink-mute group-hover:text-ink transition-colors",
          )}
        >
          <card.Icon className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
        </span>
        <span className="border-line-soft bg-cream text-ink rounded-[3px] border px-1.5 py-0.5 font-mono text-[10px] tracking-[0.04em]">
          {card.count}
        </span>
      </div>
      <div className="text-ink text-[14px] font-semibold leading-tight">
        {card.label}
      </div>
      <div className="text-ink-mute text-[12px]">{card.teaser}</div>
    </>
  );

  if (card.disabled) {
    return (
      <div
        aria-disabled="true"
        className="bg-paper border-line flex cursor-not-allowed flex-col gap-2 rounded-xl border p-4 opacity-60"
      >
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={card.href}
      className="bg-paper border-line hover:border-ink group flex flex-col gap-2 rounded-xl border p-4 transition-colors"
    >
      {inner}
    </Link>
  );
}

/* ============================================================
   Section heading (shared)
   ============================================================ */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-display text-ink m-0 mb-3 text-[18px] font-medium tracking-[-0.01em]"
      style={{ fontVariationSettings: '"opsz" 36' }}
    >
      {children}
    </h2>
  );
}
