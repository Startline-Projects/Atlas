/**
 * Attachment card — placeholder only this session. Renders a 280px+
 * card with an icon (per attachment kind) + filename + size + a
 * decorative download button. No upload pipeline lands until a real
 * file service does (per CONVERSION_LOG migration note).
 *
 * Variants:
 *   - mine = false → paper bg, ink text (matches incoming bubble)
 *   - mine = true  → semi-transparent white over the ink bubble
 *                    (matches outgoing bubble color scheme)
 *
 * Server Component.
 */

import {
  FileText,
  FileType,
  Image as ImageIcon,
  Sheet,
  Download,
} from "lucide-react";
import type { ChatAttachment } from "@/lib/mock-data/specialist/chat-types";
import { cn } from "@/lib/utils/cn";

const KIND_ICON = {
  doc: FileText,
  pdf: FileType,
  image: ImageIcon,
  spreadsheet: Sheet,
} as const;

export function AttachmentCard({
  attachment,
  mine,
}: {
  attachment: ChatAttachment;
  mine: boolean;
}) {
  const Icon = KIND_ICON[attachment.kind];
  return (
    <div
      className={cn(
        "flex min-w-[280px] cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-2.5 transition-colors",
        mine
          ? "border-paper/15 bg-paper/[0.06] text-paper hover:bg-paper/10"
          : "bg-paper border-line text-ink hover:bg-cream hover:border-line-soft",
      )}
    >
      <div
        className={cn(
          "grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg",
          mine ? "bg-paper/10 text-paper" : "bg-cream-deep text-ink-soft",
        )}
      >
        <Icon className="h-4 w-4" strokeWidth={1.5} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-0.5 truncate text-[13px] font-medium">
          {attachment.filename}
        </div>
        <div
          className={cn(
            "font-mono text-[10.5px] tracking-wider",
            mine ? "text-paper/60" : "text-ink-mute",
          )}
        >
          {attachment.size}
        </div>
      </div>
      <button
        type="button"
        aria-label={`Download ${attachment.filename}`}
        className={cn(
          "grid h-7 w-7 flex-shrink-0 place-items-center rounded-md opacity-60 transition-opacity hover:opacity-100",
          mine ? "hover:bg-paper/10" : "hover:bg-cream-deep",
        )}
      >
        <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
    </div>
  );
}
