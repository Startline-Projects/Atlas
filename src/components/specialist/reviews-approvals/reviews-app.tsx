"use client";

/**
 * Reviews-approvals orchestrator. Same QueueShell + QueueRail pattern
 * as disputes (Session 5.2):
 *
 *   header (RosterHeader-style with subtitle counts) →
 *   ReviewsDirectionTabs (outer Awaiting/Submitted/Closed) →
 *   ReviewsFilterChips (inner All/Urgent/Tier promotion/...) →
 *   3-col shell: rail (filtered list) + detail pane
 *
 * State:
 *   - URL: `?id=<REV-...>` controls active row (router.replace not push)
 *   - Local: active direction tab (defaults to "incoming")
 *   - Local: active filter chip (defaults to "all")
 *   - Local: decision modal (none / save-draft / reject / escalate /
 *     approve) + recently-decided case for the approved-flash trigger
 */

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  REVIEWS_DEFAULT_ID,
  REVIEWS_HEADER_SUBTITLE,
  reviewsSnapshot,
  type ReviewDirection,
  type ReviewItem,
  type ReviewsFilterKey,
} from "@/lib/mock-data/specialist/reviews-approvals";
import { QueueShell } from "@/components/specialist/queue-shared/queue-shell";
import { QueueRail } from "@/components/specialist/queue-shared/queue-rail";
import { ApprovedFlash } from "@/components/specialist/queue-shared/approved-flash";
import { ReviewModal } from "@/components/specialist/queue-shared/review-modal";
import {
  RosterHeader,
} from "@/components/specialist/people-shared";
import { Check, ShieldAlert, Save, X } from "lucide-react";

import { ReviewRow } from "./review-row";
import { ReviewDetail } from "./review-detail";
import { ReviewsDirectionTabs } from "./reviews-direction-tabs";
import { ReviewsFilterChips } from "./reviews-filter-chips";

/* ============================================================
   Project items into the QueueRail-required filterTags shape
   ============================================================ */

type RailRow = ReviewItem & { filterTags: ReadonlyArray<string> };

function toRailRow(item: ReviewItem): RailRow {
  return {
    ...item,
    filterTags: ["all", item.filterKey, item.direction],
  };
}

const ALL_RAIL_ROWS: ReadonlyArray<RailRow> =
  reviewsSnapshot.items.map(toRailRow);

type DecisionModalKind =
  | "save-draft"
  | "reject"
  | "escalate"
  | "approve-cosign"
  | null;

const MODAL_CONFIG: Record<
  Exclude<DecisionModalKind, null>,
  {
    title: string;
    subtitle: string;
    iconTone: "default" | "warn" | "danger" | "success";
    icon: React.ReactNode;
    confirmLabel: string;
    confirmTone: "default" | "danger" | "warn" | "success";
    flashVerb: string;
    flashTone: "success" | "warn";
  }
> = {
  "save-draft": {
    title: "Save your decision draft",
    subtitle:
      "Your decision rationale + replies will be saved locally. You can pick up where you left off.",
    iconTone: "default",
    icon: <Save className="h-5 w-5" strokeWidth={1.6} />,
    confirmLabel: "Save draft",
    confirmTone: "default",
    flashVerb: "Saved.",
    flashTone: "success",
  },
  reject: {
    title: "Reject this recommendation",
    subtitle:
      "Atlas will re-route the case for further review. The original submitter is notified.",
    iconTone: "danger",
    icon: <X className="h-5 w-5" strokeWidth={1.7} />,
    confirmLabel: "Confirm reject",
    confirmTone: "danger",
    flashVerb: "Rejected.",
    flashTone: "warn",
  },
  escalate: {
    title: "Escalate further",
    subtitle:
      "Routes to admin or manager for higher-authority decision. The case stays open until they respond.",
    iconTone: "warn",
    icon: <ShieldAlert className="h-5 w-5" strokeWidth={1.6} />,
    confirmLabel: "Confirm escalate",
    confirmTone: "warn",
    flashVerb: "Escalated.",
    flashTone: "warn",
  },
  "approve-cosign": {
    title: "Approve & co-sign",
    subtitle:
      "Decision is recorded with your co-sign. The case moves to Closed and the original submitter is notified.",
    iconTone: "success",
    icon: <Check className="h-5 w-5" strokeWidth={2.2} />,
    confirmLabel: "Approve & co-sign",
    confirmTone: "success",
    flashVerb: "Approved.",
    flashTone: "success",
  },
};

/* ============================================================
   The orchestrator
   ============================================================ */

export function ReviewsApp() {
  const router = useRouter();
  const params = useSearchParams();
  const idFromUrl = params.get("id");

  const [direction, setDirection] = useState<ReviewDirection>("incoming");
  const [filterKey, setFilterKey] = useState<ReviewsFilterKey>("all");
  const [modalKind, setModalKind] = useState<DecisionModalKind>(null);
  const [flashOpen, setFlashOpen] = useState(false);
  const [flashCaseId, setFlashCaseId] = useState<string | null>(null);
  const [flashVerb, setFlashVerb] = useState<string>("");
  const [flashTone, setFlashTone] = useState<"success" | "warn">("success");

  /* Filter rows by direction first (the outer-tab filter), then by
   * inner filter chip when applied. */
  const directionRows = useMemo(
    () => ALL_RAIL_ROWS.filter((r) => r.direction === direction),
    [direction],
  );

  /* Counts for the direction-tab badges (always reflect total items
   * in that direction). */
  const directionCounts = useMemo<Record<ReviewDirection, number>>(
    () => ({
      incoming: ALL_RAIL_ROWS.filter((r) => r.direction === "incoming").length,
      outgoing: ALL_RAIL_ROWS.filter((r) => r.direction === "outgoing").length,
      closed: ALL_RAIL_ROWS.filter((r) => r.direction === "closed").length,
    }),
    [],
  );

  /* Filter-chip counts — derived from the active direction's rows. */
  const filterCounts = useMemo<Record<ReviewsFilterKey, number>>(() => {
    const counts: Record<ReviewsFilterKey, number> = {
      all: directionRows.length,
      urgent: directionRows.filter(
        (r) => r.filterKey === "urgent" || r.slaTone === "danger",
      ).length,
      "tier-promotion": directionRows.filter((r) => r.kind === "tier-promotion")
        .length,
      "off-board": directionRows.filter((r) => r.kind === "off-board").length,
      "rate-change": directionRows.filter((r) => r.kind === "rate-change")
        .length,
    };
    return counts;
  }, [directionRows]);

  /* Final visible rows after applying both filters. */
  const visibleRows = useMemo(() => {
    if (filterKey === "all") return directionRows;
    if (filterKey === "urgent") {
      return directionRows.filter(
        (r) => r.filterKey === "urgent" || r.slaTone === "danger",
      );
    }
    return directionRows.filter((r) => r.filterKey === filterKey);
  }, [directionRows, filterKey]);

  /* Active item — resolve URL id, falling back to direction default. */
  const activeItem = useMemo<ReviewItem | undefined>(() => {
    const id = idFromUrl ?? REVIEWS_DEFAULT_ID;
    return reviewsSnapshot.items.find((i) => i.id === id);
  }, [idFromUrl]);

  /* Auto-switch direction when the URL id refers to a non-current
   * direction's row (e.g., direct URL load to a closed item). */
  const effectiveDirection: ReviewDirection = activeItem
    ? activeItem.direction
    : direction;

  const handleSelect = useCallback(
    (id: string) => {
      const next = new URLSearchParams(params.toString());
      next.set("id", id);
      router.replace(`/specialist/reviews?${next.toString()}`);
    },
    [params, router],
  );

  const handleDirectionChange = useCallback(
    (next: ReviewDirection) => {
      setDirection(next);
      setFilterKey("all");
      // Auto-select the first item in the new direction so the detail pane
      // updates without a stale id.
      const firstInDirection = ALL_RAIL_ROWS.find((r) => r.direction === next);
      if (firstInDirection) {
        const qs = new URLSearchParams(params.toString());
        qs.set("id", firstInDirection.id);
        router.replace(`/specialist/reviews?${qs.toString()}`);
      }
    },
    [params, router],
  );

  const handleDecision = useCallback(
    (action: "save-draft" | "reject" | "escalate" | "approve-cosign") => {
      setModalKind(action);
    },
    [],
  );

  const handleConfirmDecision = useCallback(() => {
    if (!modalKind || !activeItem) return;
    const cfg = MODAL_CONFIG[modalKind];
    setModalKind(null);
    setFlashCaseId(activeItem.caseId);
    setFlashVerb(cfg.flashVerb);
    setFlashTone(cfg.flashTone);
    setFlashOpen(true);
    setTimeout(() => setFlashOpen(false), 2000);
  }, [modalKind, activeItem]);

  const modalCfg = modalKind ? MODAL_CONFIG[modalKind] : null;

  return (
    <>
      <main className="bg-cream flex min-w-0 flex-1 flex-col">
        <RosterHeader
          eyebrow="Operational workflow"
          title={{ lead: "Reviews &", italic: "approvals" }}
          subtitle={REVIEWS_HEADER_SUBTITLE}
        />

        <ReviewsDirectionTabs
          active={effectiveDirection}
          counts={directionCounts}
          onChange={handleDirectionChange}
        />

        <ReviewsFilterChips
          active={filterKey}
          counts={filterCounts}
          onChange={setFilterKey}
        />

        <QueueShell
          rail={
            <QueueRail<RailRow>
              title="Cases"
              count={visibleRows.length}
              countTone="danger"
              subtitle="Audit-logged · co-sign required"
              /* Step 11: empty filters array drops the vestigial "All [N]"
                 chip from the rail header. The outer direction-tabs +
                 filter-chips bands already handle filtering — the rail
                 chip was redundant. QueueRail's defaultFilterKey
                 fallback resolves to "all" with no chips rendered, and
                 every row carries "all" in its filterTags so the
                 active-filter check passes for every row. */
              filters={[]}
              defaultFilterKey="all"
              candidates={visibleRows.map((r) => ({
                ...r,
                filterTags: ["all"],
              }))}
              selectedId={activeItem?.id ?? ""}
              onSelect={handleSelect}
              renderRow={(row) => <ReviewRow item={row} />}
              emptyState={{
                title: "No cases match",
                subtitle: "Try a different direction or filter.",
              }}
            />
          }
        >
          {activeItem ? (
            <ReviewDetail item={activeItem} onDecision={handleDecision} />
          ) : (
            <div className="bg-cream flex min-h-[calc(100vh-36px-57px)] flex-1 items-center justify-center p-10">
              <div className="max-w-[360px] text-center text-ink-mute">
                <h3
                  className="font-display mb-2 text-[22px] font-normal tracking-tight text-ink"
                  style={{ fontVariationSettings: '"opsz" 96' }}
                >
                  Pick a <em className="italic text-ink-soft">review item</em>
                </h3>
                <p className="text-[13.5px] leading-[1.55]">
                  Select a case from the rail. Items in &ldquo;Awaiting your
                  review&rdquo; need a co-sign before SLA expiry.
                </p>
              </div>
            </div>
          )}
        </QueueShell>
      </main>

      {modalCfg && activeItem ? (
        <ReviewModal
          open={modalKind !== null}
          onClose={() => setModalKind(null)}
          iconTone={modalCfg.iconTone}
          icon={modalCfg.icon}
          title={modalCfg.title}
          subtitle={modalCfg.subtitle}
          ariaLabel={modalCfg.title}
          body={
            <div className="flex flex-col gap-2.5">
              <div className="font-mono text-[10px] font-medium tracking-[0.12em] uppercase text-ink-mute">
                Case
              </div>
              <div className="text-[13.5px] text-ink">
                {activeItem.caseId} · {activeItem.subject}
              </div>
              <div className="bg-cream border-line-soft mt-1 rounded-md border-l-[3px] border-l-line px-3 py-2 text-[12.5px] italic leading-[1.5] text-ink-soft">
                Decision: {activeItem.decisionSummary}
              </div>
            </div>
          }
          footer={
            <>
              <button
                type="button"
                onClick={() => setModalKind(null)}
                className="border-line bg-paper text-ink-soft hover:bg-cream-deep rounded-lg border px-4 py-2 text-[13px] transition-colors hover:text-ink"
              >
                Cancel
              </button>
              <ConfirmButton
                tone={modalCfg.confirmTone}
                onClick={handleConfirmDecision}
              >
                {modalCfg.icon}
                {modalCfg.confirmLabel}
              </ConfirmButton>
            </>
          }
        />
      ) : null}

      <ApprovedFlash
        open={flashOpen}
        verb={flashVerb}
        tail={flashCaseId ? `${flashCaseId} closed.` : "Done."}
        sub="Decision recorded · audit-logged · participants notified."
        meta={
          flashCaseId
            ? `DECISION · ${flashCaseId}`
            : "DECISION"
        }
        tone={flashTone}
      />
    </>
  );
}

/* ============================================================
   Confirm button — tone-keyed
   ============================================================ */

function ConfirmButton({
  tone,
  onClick,
  children,
}: {
  tone: "default" | "danger" | "warn" | "success";
  onClick: () => void;
  children: React.ReactNode;
}) {
  const cls =
    tone === "danger"
      ? "bg-danger text-paper hover:bg-danger/90"
      : tone === "warn"
        ? "bg-amber text-paper hover:bg-amber/90"
        : tone === "success"
          ? "bg-success text-paper hover:bg-success/90"
          : "bg-ink text-paper hover:bg-ink-soft";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-medium transition-colors ${cls}`}
    >
      {children}
    </button>
  );
}
