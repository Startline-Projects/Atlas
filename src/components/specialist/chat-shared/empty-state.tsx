/**
 * Empty state shown in the main pane when no `?id=<thread>` is
 * selected (or the id is invalid). Mirrors the source HTML
 * `.cc-empty-main` block. The italicized noun in the heading
 * differs by view ("conversation" for candidate-chat, "client" for
 * client-chat); pass `nounItalic` to swap it.
 *
 * Server Component.
 */

import { Mail } from "lucide-react";

export function EmptyChatState({
  /** Leading text in the h3, e.g. "Select a". */
  leading = "Select a",
  /** Italicized noun in the h3 (default "conversation"). */
  nounItalic = "conversation",
  /** Body copy under the heading. */
  message = "Pick a thread from the list, or use compose to start a new one.",
}: {
  leading?: string;
  nounItalic?: string;
  message?: string;
}) {
  return (
    <div className="bg-cream grid flex-1 place-items-center px-10 py-16">
      <div className="max-w-[320px] text-center">
        <div className="bg-cream-deep mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full text-ink-mute">
          <Mail className="h-7 w-7" strokeWidth={1.5} />
        </div>
        <h3 className="font-display m-0 mb-2 text-[22px] font-normal tracking-tight text-ink">
          {leading}{" "}
          <em className="text-ink-soft italic">{nounItalic}</em>
        </h3>
        <p className="m-0 text-[13.5px] leading-relaxed text-ink-mute">
          {message}
        </p>
      </div>
    </div>
  );
}
