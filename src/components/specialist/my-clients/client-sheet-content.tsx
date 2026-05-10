import {
  Calendar,
  FileText,
  MessageSquare,
  Pause,
  Sparkles,
} from "lucide-react";
import {
  SheetActions,
  SheetHero,
  SheetSection,
  SheetStats,
} from "@/components/specialist/people-shared/roster-sheet-parts";
import type {
  ClientHireSummary,
  ClientTimelineEvent,
  ManagedClient,
} from "@/lib/mock-data/specialist/my-clients";
import { cn } from "@/lib/utils/cn";

export type ClientSheetCallbacks = {
  /** Fire a queued flash for "Open contracts". */
  onViewContracts: (c: ManagedClient) => void;
  /** Fire a queued flash for "Open briefs". */
  onOpenBriefs: (c: ManagedClient) => void;
  /** Fire a queued flash for "Suggest new talent". */
  onSuggestTalent: (c: ManagedClient) => void;
  /** Fire a queued flash for "Pause client" (danger tone). */
  onPauseClient: (c: ManagedClient) => void;
};

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

const LOGO_GRADIENT: Record<ManagedClient["logoGradient"], string> = {
  1: "bg-gradient-to-br from-[#4F6FA8] to-[#233458] text-paper",
  2: "bg-gradient-to-br from-[#8C9D5A] to-[#4D5A28] text-paper",
  3: "bg-gradient-to-br from-[#B5786B] to-[#6F4439] text-paper",
  4: "bg-gradient-to-br from-[#7E6FA8] to-[#423564] text-paper",
};

const HIRE_GRADIENT: Record<ClientHireSummary["candidateGradient"], string> = {
  1: "bg-gradient-to-br from-[#4F6FA8] to-[#233458] text-paper",
  2: "bg-gradient-to-br from-[#8C9D5A] to-[#4D5A28] text-paper",
  3: "bg-gradient-to-br from-[#B5786B] to-[#6F4439] text-paper",
  4: "bg-gradient-to-br from-[#7E6FA8] to-[#423564] text-paper",
  5: "bg-gradient-to-br from-[#5A8A8C] to-[#2B5054] text-paper",
};

const HIRE_STATUS_PILL: Record<ClientHireSummary["status"], string> = {
  active: "bg-success-bg text-success",
  completed: "bg-cream-deep text-ink-soft",
  paused: "bg-amber/14 text-amber",
};

export function ClientSheetContent({
  c,
  callbacks,
}: {
  c: ManagedClient;
  callbacks: ClientSheetCallbacks;
}) {
  return (
    <>
      <SheetHero
        avatar={
          <div
            aria-hidden="true"
            className={cn(
              "grid h-16 w-16 place-items-center rounded-2xl font-mono text-[20px] font-semibold tracking-[0.04em]",
              LOGO_GRADIENT[c.logoGradient],
            )}
          >
            {c.logoInitials}
          </div>
        }
        title={c.companyName}
        meta={c.metaLine.toUpperCase()}
        tags={[
          { label: c.trustTier, tone: c.trustTier === "Top Client" ? "lime" : "default" },
          ...(c.isVip
            ? [{ label: "VIP", tone: "lime" as const }]
            : []),
          ...(c.verified
            ? [{ label: "Verified", tone: "success" as const }]
            : []),
        ]}
      />

      <SheetStats
        stats={[
          { num: c.activeHires, label: "Active hires" },
          { num: c.totalSpendLabel, label: "Total spend" },
          {
            num:
              c.rating > 0 ? (
                <>
                  {c.rating.toFixed(1)}
                  <em className="text-ink-mute font-display text-[12px] font-normal not-italic">
                    /5
                  </em>
                </>
              ) : (
                <span className="text-ink-mute">—</span>
              ),
            label: "Their rating",
          },
        ]}
      />

      {c.hiresPreview.length > 0 ? (
        <SheetSection title="Active hires from your pool">
          <div className="flex flex-col gap-2">
            {c.hiresPreview.map((h) => (
              <HireRow key={h.candidateId} h={h} />
            ))}
          </div>
        </SheetSection>
      ) : null}

      <SheetSection title="Brief activity">
        <div className="grid grid-cols-2 gap-3">
          <BriefCell num={c.briefsTotal} label="Briefs sent · all-time" />
          <BriefCell
            num={
              c.briefsLastLabel === "—" ? (
                <span className="text-ink-mute">—</span>
              ) : (
                <>
                  {c.briefsLastLabel.replace(/(\d+)/, "")}
                  <em className="text-ink-mute font-display text-[12px] font-normal not-italic">
                    {c.briefsLastLabel.match(/(\d+)/)
                      ? c.briefsLastLabel.match(/[a-z]+/i)?.[0] ?? "d"
                      : ""}
                  </em>
                </>
              )
            }
            label="Since last brief"
            valueOverride={c.briefsLastLabel}
          />
        </div>
      </SheetSection>

      {c.activityPreview.length > 0 ? (
        <SheetSection title="Recent activity">
          <ul className="flex flex-col gap-3">
            {c.activityPreview.map((ev) => (
              <li key={ev.id} className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full",
                    TIMELINE_BULLET[ev.kind],
                  )}
                />
                <div className="text-ink-soft text-[12.5px] leading-[1.45]">
                  {ev.text}
                  <span className="text-ink-mute mt-1 block font-mono text-[10px] tracking-[0.04em]">
                    {ev.when}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </SheetSection>
      ) : null}

      <SheetActions
        actions={[
          {
            key: "message",
            label: "Message client",
            icon: <MessageSquare className="h-3.5 w-3.5" strokeWidth={1.5} />,
            variant: "primary",
            href: `/specialist/client-chat?id=${c.id}`,
          },
          {
            key: "contracts",
            label: "View contracts",
            icon: <FileText className="h-3.5 w-3.5" strokeWidth={1.5} />,
            onClick: () => callbacks.onViewContracts(c),
          },
          {
            key: "briefs",
            label: "Open briefs",
            icon: <Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />,
            onClick: () => callbacks.onOpenBriefs(c),
          },
          {
            key: "suggest",
            label: "Suggest new talent",
            icon: <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />,
            onClick: () => callbacks.onSuggestTalent(c),
          },
          {
            key: "pause",
            label: "Pause client",
            icon: <Pause className="h-3.5 w-3.5" strokeWidth={1.5} />,
            variant: "danger",
            onClick: () => callbacks.onPauseClient(c),
          },
        ]}
      />
    </>
  );
}

function HireRow({ h }: { h: ClientHireSummary }) {
  return (
    <div className="border-line bg-cream/50 flex items-center gap-2.5 rounded-md border p-2.5">
      <div
        aria-hidden="true"
        className={cn(
          "grid h-8 w-8 flex-shrink-0 place-items-center rounded-full font-mono text-[11px] font-semibold",
          HIRE_GRADIENT[h.candidateGradient],
        )}
      >
        {h.candidateInitials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-ink truncate text-[12.5px] font-medium">
          {h.candidateName}
        </div>
        <div className="text-ink-mute truncate text-[11px]">{h.role}</div>
      </div>
      <span
        className={cn(
          "rounded-[3px] px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-[0.06em] uppercase",
          HIRE_STATUS_PILL[h.status],
        )}
      >
        {h.status}
      </span>
      <span className="font-display text-ink text-right text-[12.5px] font-medium tabular-nums">
        {h.hours}h
      </span>
    </div>
  );
}

function BriefCell({
  num,
  label,
  valueOverride,
}: {
  num: React.ReactNode;
  label: string;
  valueOverride?: string;
}) {
  return (
    <div className="border-line bg-cream/50 rounded-md border p-3">
      <div className="font-display text-ink mb-0.5 text-[20px] leading-none font-medium tracking-[-0.015em]">
        {valueOverride ?? num}
      </div>
      <div className="text-ink-mute font-mono text-[10px] tracking-[0.10em] uppercase">
        {label}
      </div>
    </div>
  );
}
