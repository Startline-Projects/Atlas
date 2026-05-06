"use client";

/**
 * Escalation-to-admin modal. Reuses `queue-shared/ReviewModal` (which
 * provides the modal shell + close-on-Esc + focus trap basics). Body
 * is a textarea for the escalation reason; footer has Cancel + Confirm
 * escalation.
 *
 * On Confirm, fires `onConfirm(reason)` — the parent triggers the
 * approved-flash with warn tone, just like Session 2's recert
 * off-board flow.
 *
 * Client Component.
 */

import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { ReviewModal } from "@/components/specialist/queue-shared/review-modal";

export function EscalationModal({
  open,
  caseId,
  onClose,
  onConfirm,
}: {
  open: boolean;
  caseId: string;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}) {
  const [reason, setReason] = useState("");
  const trimmed = reason.trim();
  const canConfirm = trimmed.length > 0;

  return (
    <ReviewModal
      open={open}
      onClose={onClose}
      iconTone="warn"
      icon={<ShieldAlert className="h-5 w-5" strokeWidth={1.6} />}
      title={
        <>
          Escalate <em className="font-display italic text-ink-soft">{caseId}</em> to admin
        </>
      }
      subtitle="Admin will take over decision-making. You can stay informed but admin makes the final call."
      ariaLabel={`Escalate ${caseId} to admin`}
      body={
        <div className="flex flex-col gap-2.5">
          <label
            htmlFor="esc-reason"
            className="font-mono text-[10px] font-medium tracking-[0.12em] uppercase text-ink-mute"
          >
            Why escalate?
          </label>
          <textarea
            id="esc-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explain why specialist authority is insufficient — e.g., damages claim out of scope, conflict of interest, repeated escalation by claimant…"
            rows={5}
            className="bg-cream border-line rounded-lg border px-3 py-2.5 font-body text-[13px] leading-[1.5] text-ink outline-none transition-colors placeholder:text-ink-mute focus:border-ink-mute focus:bg-paper"
          />
        </div>
      }
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="border-line bg-paper text-ink-soft hover:bg-cream-deep rounded-lg border px-4 py-2 text-[13px] transition-colors hover:text-ink"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canConfirm}
            onClick={() => {
              if (!canConfirm) return;
              onConfirm(trimmed);
              setReason("");
            }}
            className="bg-amber text-paper hover:bg-amber/90 disabled:cursor-not-allowed disabled:opacity-50 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-medium transition-colors"
          >
            <ShieldAlert className="h-3.5 w-3.5" strokeWidth={1.7} />
            Confirm escalation
          </button>
        </>
      }
    />
  );
}
