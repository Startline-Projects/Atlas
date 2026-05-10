"use client";

import { ArrowRight, Check, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { RejectReasonChips } from "@/components/specialist/queue-shared/reject-reason-chips";
import { ReviewModal } from "@/components/specialist/queue-shared/review-modal";
import {
  APPROVE_TIERS,
  REJECT_REASONS,
  REVISION_ITEMS,
  type ApproveTier,
} from "@/lib/mock-data/specialist/review-queue";
import { cn } from "@/lib/utils/cn";

type ModalProps = {
  candidateName: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

/* ============================================================
   Approve
   ============================================================ */

export function ApproveModal({
  candidateName,
  open,
  onClose,
  onConfirm,
}: ModalProps) {
  const [tier, setTier] = useState<ApproveTier>("Vetted");
  const [note, setNote] = useState("");
  const firstName = candidateName.split(" ")[0] ?? candidateName;
  return (
    <ReviewModal
      open={open}
      onClose={onClose}
      iconTone="success"
      icon={<Check className="h-5 w-5" strokeWidth={2.5} />}
      title={
        <>
          Approve <em className="serif-italic">{firstName}</em>?
        </>
      }
      subtitle={`${firstName}'ll go live in your category and become discoverable to clients within the hour. You can adjust the profile or pause from My Candidates.`}
      ariaLabel={`Approve ${candidateName}`}
      body={
        <>
          <label className="text-ink-soft mb-2 block text-[13px] font-medium">
            Tier placement
          </label>
          <RejectReasonChips
            options={APPROVE_TIERS.map((t) => ({ key: t, label: t }))}
            value={tier}
            onChange={(k) => setTier(k as ApproveTier)}
            ariaLabel="Tier placement"
          />
          <label
            className="text-ink-soft mt-4 mb-2 block text-[13px] font-medium"
            htmlFor="approve-note"
          >
            Optional note to candidate
          </label>
          <textarea
            id="approve-note"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={`Welcome message, e.g. 'Welcome to Atlas, ${firstName}. I've placed you in ${tier} tier given your strong references…'`}
            className="border-line bg-cream/40 text-ink focus:border-ink focus:ring-ink/8 placeholder:text-ink-mute w-full resize-y rounded-md border px-3.5 py-2.5 text-[14px] leading-[1.55] outline-none focus:ring-[3px]"
          />
        </>
      }
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="text-ink-mute hover:bg-cream-deep hover:text-ink rounded-full px-4 py-2 text-[13px] font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            className="bg-ink text-paper hover:bg-black inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition-colors"
          >
            Approve & advance →
          </button>
        </>
      }
    />
  );
}

/* ============================================================
   Revisions
   ============================================================ */

export function RevisionsModal({
  candidateName,
  open,
  onClose,
  onConfirm,
}: ModalProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [note, setNote] = useState("");
  const firstName = candidateName.split(" ")[0] ?? candidateName;

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <ReviewModal
      open={open}
      onClose={onClose}
      iconTone="warn"
      icon={<ArrowRight className="h-5 w-5" strokeWidth={1.6} />}
      title="Request revisions"
      subtitle={`${firstName} will be sent back into onboarding to address only the items you check below. The rest of the review carries forward.`}
      ariaLabel="Request revisions"
      body={
        <>
          <div className="flex flex-col gap-2">
            {REVISION_ITEMS.map((item) => {
              const isChecked = !!checked[item.key];
              return (
                <label
                  key={item.key}
                  className={cn(
                    "border-line bg-paper hover:border-ink flex cursor-pointer items-start gap-3 rounded-md border px-3.5 py-3 transition-colors",
                    isChecked && "border-ink bg-cream",
                  )}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggle(item.key)}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-0.5 grid h-4 w-4 flex-shrink-0 place-items-center rounded-[3px] border-[1.5px] transition-colors",
                      isChecked
                        ? "bg-ink border-ink text-lime"
                        : "border-line bg-paper",
                    )}
                  >
                    {isChecked ? (
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    ) : null}
                  </span>
                  <div className="min-w-0">
                    <div className="text-ink mb-0.5 text-[13.5px] font-medium">
                      {item.title}
                    </div>
                    <div className="text-ink-mute text-[12.5px] leading-[1.4]">
                      {item.detail}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
          <label
            className="text-ink-soft mt-4 mb-2 block text-[13px] font-medium"
            htmlFor="revisions-note"
          >
            Note to candidate
          </label>
          <textarea
            id="revisions-note"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={`Be specific. ${firstName} will receive this verbatim with the checklist above.`}
            className="border-line bg-cream/40 text-ink focus:border-ink focus:ring-ink/8 placeholder:text-ink-mute w-full resize-y rounded-md border px-3.5 py-2.5 text-[14px] leading-[1.55] outline-none focus:ring-[3px]"
          />
        </>
      }
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="text-ink-mute hover:bg-cream-deep hover:text-ink rounded-full px-4 py-2 text-[13px] font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={checkedCount === 0}
            className="border-amber text-amber hover:bg-amber hover:text-paper rounded-full border px-4 py-2 text-[13px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent disabled:hover:text-amber"
          >
            Send revisions request
          </button>
        </>
      }
    />
  );
}

/* ============================================================
   Reject
   ============================================================ */

export function RejectModal({
  candidateName,
  open,
  onClose,
  onConfirm,
}: ModalProps) {
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const firstName = candidateName.split(" ")[0] ?? candidateName;
  return (
    <ReviewModal
      open={open}
      onClose={onClose}
      iconTone="danger"
      icon={<X className="h-5 w-5" strokeWidth={1.8} />}
      title={
        <>
          Reject <em className="serif-italic">{firstName}</em>?
        </>
      }
      subtitle={
        <>
          This is permanent. {firstName} will receive a respectful rejection
          note and won&rsquo;t be able to reapply for 6 months. Use revisions
          instead if there&rsquo;s a fixable issue.
        </>
      }
      ariaLabel={`Reject ${candidateName}`}
      body={
        <>
          <label className="text-ink-soft mb-2 block text-[13px] font-medium">
            Primary reason
          </label>
          <RejectReasonChips
            options={REJECT_REASONS}
            value={reason}
            onChange={setReason}
            ariaLabel="Reject reason"
          />
          <label
            className="text-ink-soft mt-4 mb-2 block text-[13px] font-medium"
            htmlFor="reject-note"
          >
            Internal reason (visible to admin only)
          </label>
          <textarea
            id="reject-note"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Specific reasoning · audit log entry · supports any escalation later."
            className="border-line bg-cream/40 text-ink focus:border-ink focus:ring-ink/8 placeholder:text-ink-mute w-full resize-y rounded-md border px-3.5 py-2.5 text-[14px] leading-[1.55] outline-none focus:ring-[3px]"
          />
          <div className="bg-amber/12 text-ink mt-4 flex items-start gap-2 rounded-md px-3 py-2 text-[12px] leading-[1.5]">
            <ShieldCheck
              className="text-amber mt-0.5 h-3.5 w-3.5 flex-shrink-0"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <span>
              <strong className="font-semibold">Policy under review:</strong>{" "}
              the 6-month reapply lockout is not yet legally finalized. The UI
              shows it for awareness; the rule does not enforce in production.
            </span>
          </div>
        </>
      }
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="text-ink-mute hover:bg-cream-deep hover:text-ink rounded-full px-4 py-2 text-[13px] font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={!reason}
            className="bg-danger text-paper hover:bg-danger/85 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            Reject candidate
          </button>
        </>
      }
    />
  );
}
