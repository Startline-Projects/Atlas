"use client";

/**
 * PreviewUnavailableModal — shared primitive used wherever a feature
 * button advertises a preview/play/download action that requires
 * backend data not yet wired (file storage, transcript service,
 * audio CDN, etc).
 *
 * Design principle:
 *   Honest > faked > removed. A button that says "Play" should DO
 *   something when clicked. Removing the button would make the page
 *   look incomplete; faking the play-action would mislead users.
 *   This modal acknowledges the gap honestly and tells the user
 *   what will happen when services land.
 *
 * Standing convention:
 *   Use this anywhere a click currently opens nothing because the
 *   underlying data is backend-blocked. First consumers (post-conversion
 *   polish): review-queue intro-video play + read-transcript buttons.
 *   Pre-emptive 2nd-consumer trigger: disputes evidence ledger
 *   "View" buttons.
 *
 * Wraps `queue-shared/ReviewModal` so it inherits Esc-close, backdrop-
 * click-close, body scroll lock, and the established modal aesthetic.
 *
 * Client Component (modal state owned by parent; this is a pure
 * "use client" wrapper for the shell).
 */

import {
  AudioLines,
  FileText,
  PlayCircle,
  ScrollText,
  type LucideIcon,
} from "lucide-react";
import { ReviewModal } from "@/components/specialist/queue-shared/review-modal";

export type PreviewUnavailableKind = "video" | "document" | "transcript" | "audio";

const KIND_ICON: Record<PreviewUnavailableKind, LucideIcon> = {
  video: PlayCircle,
  document: FileText,
  transcript: ScrollText,
  audio: AudioLines,
};

const KIND_TITLE: Record<PreviewUnavailableKind, string> = {
  video: "Video preview",
  document: "Document preview",
  transcript: "Full transcript",
  audio: "Audio preview",
};

const KIND_BODY: Record<PreviewUnavailableKind, string> = {
  video:
    "Video preview lands when the file storage service is wired. This will play the candidate's intro video inline — no new tab, full controls, with chapter markers tied to the AI assessment timestamps.",
  document:
    "Document preview lands when the file storage service is wired. PDFs, Word docs, and spreadsheets render inline with the same controls as the candidate-facing preview.",
  transcript:
    "Full transcript loads when the assessment service persists transcripts. The current view shows AI-extracted snippets — the full transcript adds every Q&A turn with timestamps and confidence flags.",
  audio:
    "Audio preview lands when the file storage service is wired. Inline waveform with playback controls and word-level highlights synced to the transcript.",
};

export function PreviewUnavailableModal({
  open,
  kind,
  subjectName,
  onClose,
}: {
  open: boolean;
  kind: PreviewUnavailableKind;
  /** Human-readable subject — e.g. "Anand's intro video", "Sofia × Acme dispute · Exhibit B". Shown in heading. */
  subjectName: string;
  onClose: () => void;
}) {
  const Icon = KIND_ICON[kind];
  const title = `${KIND_TITLE[kind]} — ${subjectName}`;
  return (
    <ReviewModal
      open={open}
      onClose={onClose}
      iconTone="default"
      icon={<Icon className="h-5 w-5" strokeWidth={1.6} />}
      title={title}
      subtitle="Prototype build · backend services not yet wired"
      ariaLabel={title}
      body={
        <p className="text-ink-soft text-[13.5px] leading-[1.55]">
          {KIND_BODY[kind]}
        </p>
      }
      footer={
        <button
          type="button"
          onClick={onClose}
          className="bg-ink text-paper hover:bg-black inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition-colors"
        >
          Got it
        </button>
      }
    />
  );
}
