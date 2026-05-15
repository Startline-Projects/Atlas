"use client";

/**
 * ClientSubNavTabs — sub-navigation strip below the client page
 * header on `/specialist/clients/[id]/...`.
 *
 * Sticky under the topbar at `top-[calc(36px+57px)] z-[5]`, matching
 * the `queue-shared/ReviewTabs` precedent literally (same chrome
 * conventions: `bg-cream/95 backdrop-blur-md backdrop-saturate-150
 * border-b border-line-soft`).
 *
 * ## Tab inventory (Session 9 Checkpoint 1)
 *
 *   6 tabs rendered:  Overview · Contracts · Briefs · Hires · Talent · Tags
 *   1 tab hidden:     Settings (route lands in C3; tab added there)
 *
 *   Of the 6, only Overview is a real `<Link>` in C1 — the other 5
 *   render as `<span aria-disabled>` because their routes 404 until
 *   C2/C3. Disabled visual: `text-ink-mute opacity-60
 *   cursor-not-allowed`. NO tooltip in C1 (keep minimal).
 *
 *   Tab def carries `disabled?: boolean`. C2/C3 flip the flag to
 *   false as routes land — DOM structure stays consistent across all
 *   3 checkpoints; only the flag changes.
 *
 * ## Active-state detection
 *
 *   `usePathname()` returns `/specialist/clients/{id}/...`. The
 *   segment AFTER the client id determines the active tab. No
 *   segment (or trailing slash only) = Overview.
 *
 * ## Badge counts
 *
 *   Computed in the parent layout (Server Component) and passed as
 *   the `counts` prop. The hook stays pure — it just renders.
 *
 *   - contracts:  total contracts for the client
 *   - briefsOpen: OPEN briefs count (NOT total — Q2 lock; actionable
 *                 metric, matches the page header's "X open" framing)
 *   - hiresActive: active-status hires only (Q3 lock)
 *   - talentPool: `rankPoolForClient(id).length` (Q4 lock; 5-8 result range)
 *   - tagsApplied: `getClientTagKeys(id).length`
 *
 * Client Component (uses `usePathname()`).
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardList,
  FileText,
  LayoutDashboard,
  Sparkles,
  Tag,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type ClientSubNavCounts = {
  contracts: number;
  briefsOpen: number;
  hiresActive: number;
  talentPool: number;
  tagsApplied: number;
};

type TabKey =
  | "overview"
  | "contracts"
  | "briefs"
  | "hires"
  | "talent"
  | "tags";

type TabDef = {
  key: TabKey;
  label: string;
  Icon: LucideIcon;
  /** URL segment after `/specialist/clients/{id}`. Empty for Overview. */
  segment: "" | "contracts" | "briefs" | "hires" | "talent" | "tags";
  /** Key into the `counts` prop. Overview omits → no badge rendered. */
  badgeKey?: keyof ClientSubNavCounts;
  /** True = render as `<span aria-disabled>` (route 404s in C1).
   *  Flipped to false in C2/C3 as routes land. */
  disabled?: boolean;
};

/* Settings tab intentionally absent — added in C3 when
 * /specialist/clients/[id]/settings lands.
 */
const TABS: ReadonlyArray<TabDef> = [
  { key: "overview", label: "Overview", Icon: LayoutDashboard, segment: "" },
  {
    key: "contracts",
    label: "Contracts",
    Icon: FileText,
    segment: "contracts",
    badgeKey: "contracts",
    disabled: true,
  },
  {
    key: "briefs",
    label: "Briefs",
    Icon: ClipboardList,
    segment: "briefs",
    badgeKey: "briefsOpen",
    disabled: true,
  },
  {
    key: "hires",
    label: "Hires",
    Icon: Users,
    segment: "hires",
    badgeKey: "hiresActive",
    disabled: true,
  },
  {
    key: "talent",
    label: "Talent",
    Icon: Sparkles,
    segment: "talent",
    badgeKey: "talentPool",
    disabled: true,
  },
  {
    key: "tags",
    label: "Tags",
    Icon: Tag,
    segment: "tags",
    badgeKey: "tagsApplied",
    disabled: true,
  },
];

export function ClientSubNavTabs({
  clientId,
  counts,
}: {
  clientId: string;
  counts: ClientSubNavCounts;
}) {
  const pathname = usePathname();
  const basePath = `/specialist/clients/${clientId}`;

  /* Active key = the segment after `/clients/{id}/`. Empty / trailing-
     slash = Overview. Prefix-match on the first segment so detail
     routes (e.g. `/contracts/[contractId]`) still highlight their
     parent tab in C2. */
  const activeKey: TabKey = (() => {
    if (pathname === basePath || pathname === `${basePath}/`) return "overview";
    const rest = pathname.slice(basePath.length + 1);
    const firstSeg = rest.split("/")[0] ?? "";
    const match = TABS.find((t) => t.segment === firstSeg);
    return match?.key ?? "overview";
  })();

  return (
    <nav
      aria-label="Client sections"
      className="bg-cream/95 border-line-soft sticky top-[calc(36px+57px)] z-[5] border-b backdrop-blur-md backdrop-saturate-150"
    >
      <div className="container-page mx-auto flex max-w-none gap-1 overflow-x-auto px-6 sm:px-9">
        {TABS.map((tab) => {
          const isActive = activeKey === tab.key;
          const badge = tab.badgeKey !== undefined ? counts[tab.badgeKey] : undefined;
          const Icon = tab.Icon;

          /* Disabled tab — non-clickable span. */
          if (tab.disabled) {
            return (
              <span
                key={tab.key}
                aria-disabled="true"
                className="text-ink-mute relative flex flex-shrink-0 cursor-not-allowed items-center gap-1.5 px-3 py-2.5 text-[13px] font-medium whitespace-nowrap opacity-60"
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
                {tab.label}
                {typeof badge === "number" ? (
                  <span className="border-line-soft bg-cream rounded-[3px] border px-1.5 py-0.5 font-mono text-[9.5px] tracking-[0.04em]">
                    {badge}
                  </span>
                ) : null}
              </span>
            );
          }

          /* Enabled tab — Link. */
          const href = tab.segment === "" ? basePath : `${basePath}/${tab.segment}`;
          return (
            <Link
              key={tab.key}
              href={href}
              data-tab-active={isActive}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex flex-shrink-0 items-center gap-1.5 px-3 py-2.5 text-[13px] font-medium whitespace-nowrap transition-colors",
                isActive ? "text-ink" : "text-ink-mute hover:text-ink",
              )}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
              {tab.label}
              {typeof badge === "number" ? (
                <span
                  className={cn(
                    "border-line-soft bg-cream rounded-[3px] border px-1.5 py-0.5 font-mono text-[9.5px] tracking-[0.04em]",
                    isActive && "border-ink bg-ink text-paper",
                  )}
                >
                  {badge}
                </span>
              ) : null}
              {isActive ? (
                <span
                  aria-hidden="true"
                  className="bg-ink absolute right-0 -bottom-px left-0 h-[2px]"
                />
              ) : null}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
