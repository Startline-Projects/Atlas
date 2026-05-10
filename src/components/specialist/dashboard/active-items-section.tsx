import {
  activityFeed,
  candidateActions,
  clientActions,
  type ActivityEvent,
  type CandidateActionItem,
  type ClientActionItem,
} from "@/lib/mock-data/specialist/dashboard-cards";
import Link from "next/link";
import { SectionHeader } from "./section-header";

const ACTIVITY_BULLET: Record<ActivityEvent["kind"], string> = {
  "candidate-signup": "bg-lime-deep",
  "job-post": "bg-navy",
  "dispute-resolved": "bg-success",
  hire: "bg-success",
};

export function ActiveItemsSection() {
  return (
    <section className="mb-9">
      <SectionHeader title="Active items" />
      <div className="grid gap-3.5 lg:grid-cols-3 md:grid-cols-2">
        <CandidateActionsColumn items={candidateActions} />
        <ClientActionsColumn items={clientActions} />
        <ActivityFeedColumn items={activityFeed} />
      </div>
    </section>
  );
}

function ColumnShell({
  title,
  count,
  action,
  footerHref,
  footerLabel,
  children,
  extraClass,
}: {
  title: string;
  count?: { value: string | number; tone?: "live" };
  action?: { label: string; href: string };
  footerHref?: string;
  footerLabel?: string;
  children: React.ReactNode;
  extraClass?: string;
}) {
  return (
    <div
      className={[
        "bg-paper border-line flex min-h-[320px] flex-col rounded-md border",
        extraClass ?? "",
      ].join(" ")}
    >
      <div className="border-line-soft flex items-center justify-between gap-2 border-b px-4 pt-3.5 pb-3">
        <h3 className="text-ink flex items-center gap-2 text-[13px] font-semibold tracking-[0.02em]">
          <span>{title}</span>
          {count ? (
            <span
              className={[
                "rounded-[3px] px-1.5 py-0.5 font-mono text-[10px] font-medium tracking-[0.06em]",
                count.tone === "live"
                  ? "text-lime-text bg-lime/18"
                  : "bg-cream-deep text-ink-soft",
              ].join(" ")}
            >
              {count.value}
            </span>
          ) : null}
        </h3>
        {action ? (
          <Link
            href={action.href}
            className="text-ink-mute hover:bg-cream-deep hover:text-ink rounded px-1.5 py-0.5 text-[12px] transition-colors"
          >
            {action.label}
          </Link>
        ) : null}
      </div>
      <ul className="flex flex-1 flex-col">{children}</ul>
      {footerHref && footerLabel ? (
        <div className="border-line-soft text-ink-mute border-t px-4 py-2.5 text-center text-[12px]">
          <Link
            href={footerHref}
            className="text-ink border-line hover:border-ink border-b pb-px font-medium transition-colors"
          >
            {footerLabel}
          </Link>
        </div>
      ) : null}
    </div>
  );
}

/* ============================================================
   Row primitives — Link when href present, static <li> otherwise.
   The static fallback is for non-canonical rows (e.g. Northbeam)
   that have no in-app destination — backend-blocked, logged in
   CONVERSION_LOG.
   ============================================================ */

function CandidateActionsColumn({
  items,
}: {
  items: ReadonlyArray<CandidateActionItem>;
}) {
  return (
    <ColumnShell
      title="Candidates need you"
      count={{ value: items.length }}
      action={{ label: "View all", href: "/specialist/my-candidates" }}
      footerHref="/specialist/my-candidates"
      footerLabel="See all 47 candidates →"
    >
      {items.map((item) => {
        const inner = <CandidateRowInner item={item} />;
        return (
          <li key={item.id} className="border-line-soft border-b last:border-0">
            <Link
              href={item.href}
              className="hover:bg-cream flex items-start gap-2.5 px-4 py-3 transition-colors"
            >
              {inner}
            </Link>
          </li>
        );
      })}
    </ColumnShell>
  );
}

function CandidateRowInner({ item }: { item: CandidateActionItem }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="font-display text-paper grid h-[30px] w-[30px] flex-shrink-0 place-items-center rounded-full text-[12px] font-medium"
        style={{
          background: `linear-gradient(135deg, ${item.avatarFrom}, ${item.avatarTo})`,
        }}
      >
        {item.initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-ink mb-0.5 flex items-center gap-1.5 text-[13.5px] font-medium">
          {item.candidateName}
        </div>
        <div className="text-ink-soft text-[12.5px] leading-[1.4]">
          {item.needs}
        </div>
      </div>
      <span className="text-ink-mute mt-px flex-shrink-0 font-mono text-[10.5px] tracking-[0.04em] whitespace-nowrap">
        {item.becameActionable}
      </span>
    </>
  );
}

function ClientActionsColumn({
  items,
}: {
  items: ReadonlyArray<ClientActionItem>;
}) {
  return (
    <ColumnShell
      title="Clients need you"
      count={{ value: items.length }}
      action={{ label: "View all", href: "/specialist/my-clients" }}
      footerHref="/specialist/my-clients"
      footerLabel="See all 12 clients →"
    >
      {items.map((item) => {
        const inner = <ClientRowInner item={item} />;
        if (item.href) {
          return (
            <li
              key={item.id}
              className="border-line-soft border-b last:border-0"
            >
              <Link
                href={item.href}
                className="hover:bg-cream flex items-start gap-2.5 px-4 py-3 transition-colors"
              >
                {inner}
              </Link>
            </li>
          );
        }
        // Backend-blocked row (e.g. Northbeam) — render inert.
        return (
          <li
            key={item.id}
            className="border-line-soft flex items-start gap-2.5 border-b px-4 py-3 last:border-0"
          >
            {inner}
          </li>
        );
      })}
    </ColumnShell>
  );
}

function ClientRowInner({ item }: { item: ClientActionItem }) {
  const initial = item.clientName.charAt(0);
  return (
    <>
      <div
        aria-hidden="true"
        className="font-display text-paper grid h-[30px] w-[30px] flex-shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#4F6FA8] to-[#233458] text-[12px] font-medium"
      >
        {initial}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-ink mb-0.5 text-[13.5px] font-medium">
          {item.clientName}
        </div>
        <div className="text-ink-soft text-[12.5px] leading-[1.4]">
          {item.request}
        </div>
      </div>
      <span className="text-ink-mute mt-px flex-shrink-0 font-mono text-[10.5px] tracking-[0.04em] whitespace-nowrap">
        {item.timeElapsed}
      </span>
    </>
  );
}

function ActivityFeedColumn({
  items,
}: {
  items: ReadonlyArray<ActivityEvent>;
}) {
  return (
    <ColumnShell
      title="Recent activity"
      count={{ value: "live", tone: "live" }}
      // No header action — source HTML's "Filter" span was non-functional.
      // Removed rather than synthesizing a feature not in source.
      footerHref="/specialist/daily-activity"
      footerLabel="View full activity feed →"
      extraClass="md:col-span-2 lg:col-span-1"
    >
      {items.map((item) => (
        <li
          key={item.id}
          className="border-line-soft flex items-start gap-2 border-b px-4 py-2.5 last:border-0"
        >
          <span
            aria-hidden="true"
            className={[
              "mt-1.5 inline-block h-2 w-2 flex-shrink-0 rounded-full",
              ACTIVITY_BULLET[item.kind],
            ].join(" ")}
          />
          <div className="text-ink-soft flex-1 text-[12.5px] leading-[1.45]">
            {item.text}
            <span className="text-ink-mute mt-1 block font-mono text-[10px] tracking-[0.04em]">
              {item.when}
            </span>
          </div>
        </li>
      ))}
    </ColumnShell>
  );
}
