/**
 * Section 03 — recent activity timeline. 3-column grid per item:
 * timestamp / marker dot / body. Vertical line connects markers.
 *
 * Step 10 polish: attachment buttons (e.g. `sofia_quill_sow_signed.pdf
 * · 287 KB`) are no longer inert. When `onAttachmentPreview` is
 * provided, clicking the attachment fires it with the
 * `DisputeTimelineAttachment` — parent (DisputeDetail) opens
 * `PreviewUnavailableModal kind="document"`. The shared modal state
 * is also used by the evidence ledger's per-row "View" buttons.
 */

import { FileText } from "lucide-react";
import type {
  DisputeTimelineActor,
  DisputeTimelineAttachment,
  DisputeTimelineItem,
  DisputeTimelineMarkerTone,
} from "@/lib/mock-data/specialist/disputes";
import { cn } from "@/lib/utils/cn";

const MARKER_TONE: Record<DisputeTimelineMarkerTone, string> = {
  default: "bg-paper border-line",
  amber: "bg-amber border-amber",
  danger: "bg-danger border-danger",
  system: "bg-ink border-ink",
};

const ACTOR_TONE: Record<DisputeTimelineActor, string> = {
  claimant: "text-success",
  respondent: "text-amber",
  atlas: "text-navy",
  specialist: "text-ink-soft",
};

export function DisputeTimeline({
  items,
  onAttachmentPreview,
}: {
  items: ReadonlyArray<DisputeTimelineItem>;
  /** Per-attachment click handler. When omitted (or attachment is
   *  absent on a row), the attachment button stays decorative. */
  onAttachmentPreview?: ((a: DisputeTimelineAttachment) => void) | undefined;
}) {
  return (
    <div className="relative flex flex-col gap-0">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <div
            key={item.id}
            className="relative grid grid-cols-[110px_14px_1fr] items-start gap-3.5 py-3"
          >
            <div className="pt-0.5 text-right font-mono text-[10px] tracking-[0.04em] uppercase text-ink-mute">
              {item.when}
            </div>
            <div className="relative">
              <span
                className={cn(
                  "block h-[14px] w-[14px] rounded-full border-[2px]",
                  MARKER_TONE[item.marker],
                )}
                style={{ marginTop: "4px" }}
                aria-hidden="true"
              />
              {!isLast ? (
                <span
                  aria-hidden="true"
                  className="bg-line absolute left-[6px] top-6 w-[1.5px]"
                  style={{ height: "calc(100% + 4px)" }}
                />
              ) : null}
            </div>
            <div className="min-w-0">
              <div
                className={cn(
                  "mb-0.5 font-mono text-[9.5px] font-semibold tracking-[0.1em] uppercase",
                  ACTOR_TONE[item.actor],
                )}
              >
                {item.actorLabel}
              </div>
              <div className="text-[13px] leading-[1.5] text-ink-soft">
                {item.message}
              </div>
              {item.attachment ? (
                <button
                  type="button"
                  onClick={
                    onAttachmentPreview && item.attachment
                      ? () => onAttachmentPreview(item.attachment!)
                      : undefined
                  }
                  className="border-line bg-cream hover:bg-cream-deep mt-2 inline-flex cursor-pointer items-center gap-2 rounded-md border px-2.5 py-1.5 font-mono text-[11px] text-ink-soft transition-colors hover:text-ink"
                >
                  <FileText
                    className="h-3 w-3 flex-shrink-0 text-ink-mute"
                    strokeWidth={1.5}
                  />
                  {item.attachment.filename}
                  <span className="text-ink-mute">
                    · {item.attachment.size}
                  </span>
                </button>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
