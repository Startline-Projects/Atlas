"use client";

import { Pause, RefreshCw, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { RejectReasonChips } from "@/components/specialist/queue-shared/reject-reason-chips";
import { ReviewModal } from "@/components/specialist/queue-shared/review-modal";
import {
  OFFBOARD_REASONS,
  RECERT_OFFBOARD_GRACE_DAYS,
  RECERT_PAUSE_ITEMS,
  RECERT_TIER_ACTIONS,
} from "@/lib/mock-data/specialist/recert-queue";
import { cn } from "@/lib/utils/cn";
import { Check } from "lucide-react";

type ModalProps = {
  candidateName: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

/* ============================================================
   Re-certify
   ============================================================ */

export function RecertifyModal({
  candidateName,
  open,
  onClose,
  onConfirm,
}: ModalProps) {
  const [tier, setTier] = useState<string>("upgrade");
  const [note, setNote] = useState("");
  const firstName = candidateName.split(" ")[0] ?? candidateName;
  return (
    <ReviewModal
      open={open}
      onClose={onClose}
      iconTone="default"
      icon={<RefreshCw className="h-5 w-5" strokeWidth={1.8} />}
      title={
        <>
          Re-certify <em className="serif-italic">{firstName}</em>?
        </>
      }
      subtitle={`Cert renews for another 12 months. Optionally adjust ${firstName}'s tier — strong rating and reference quality may support an upgrade.`}
      ariaLabel={`Re-certify ${candidateName}`}
      body={
        <>
          <label className="text-ink-soft mb-2 block text-[13px] font-medium">
            Tier action
          </label>
          <RejectReasonChips
            options={[...RECERT_TIER_ACTIONS]}
            value={tier}
            onChange={setTier}
            ariaLabel="Tier action"
          />
          <label
            className="text-ink-soft mt-4 mb-2 block text-[13px] font-medium"
            htmlFor="recertify-note"
          >
            Optional note to {firstName}
          </label>
          <textarea
            id="recertify-note"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={`Congratulations message · 'Promoted to Elite tier based on your top-5% rating…'`}
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
            Re-certify & advance →
          </button>
        </>
      }
    />
  );
}

/* ============================================================
   Pause for action
   ============================================================ */

export function PauseModal({
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

  return (
    <ReviewModal
      open={open}
      onClose={onClose}
      iconTone="warn"
      icon={<Pause className="h-5 w-5 fill-current" strokeWidth={1.6} />}
      title={`Pause ${firstName} for action`}
      subtitle={`${firstName} keeps active engagements but is paused from new client matches until the items below are addressed. 14 days to resolve before automatic re-review.`}
      ariaLabel="Pause for action"
      body={
        <>
          <div className="flex flex-col gap-2">
            {RECERT_PAUSE_ITEMS.map((item) => {
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
            htmlFor="pause-note"
          >
            Note to candidate
          </label>
          <textarea
            id="pause-note"
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
            className="border-amber text-amber hover:bg-amber hover:text-paper rounded-full border px-4 py-2 text-[13px] font-medium transition-colors"
          >
            Pause & send action items
          </button>
        </>
      }
    />
  );
}

/* ============================================================
   Off-board (with grace period)
   ============================================================ */

export function OffboardModal({
  candidateName,
  open,
  onClose,
  onConfirm,
}: ModalProps) {
  const [reason, setReason] = useState("");
  const [grace, setGrace] = useState<string>("14");
  const [note, setNote] = useState("");
  const firstName = candidateName.split(" ")[0] ?? candidateName;
  return (
    <ReviewModal
      open={open}
      onClose={onClose}
      iconTone="danger"
      icon={
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M3 10h11M11 6l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      }
      title={
        <>
          Off-board <em className="serif-italic">{firstName}</em>?
        </>
      }
      subtitle={
        <>
          Removes {firstName} from the live pool. Active engagements must be
          honored to completion (grace period below). Profile becomes
          read-only; re-apply allowed after 12 months.
        </>
      }
      ariaLabel={`Off-board ${candidateName}`}
      body={
        <>
          <label className="text-ink-soft mb-2 block text-[13px] font-medium">
            Primary reason
          </label>
          <RejectReasonChips
            options={[...OFFBOARD_REASONS]}
            value={reason}
            onChange={setReason}
            ariaLabel="Off-board reason"
          />
          <label className="text-ink-soft mt-4 mb-2 block text-[13px] font-medium">
            Grace period for active engagements
          </label>
          <RejectReasonChips
            options={RECERT_OFFBOARD_GRACE_DAYS.map((d) => ({
              key: String(d),
              label: d === 0 ? "Immediate" : `${d} days`,
            }))}
            value={grace}
            onChange={setGrace}
            ariaLabel="Grace period"
          />
          <label
            className="text-ink-soft mt-4 mb-2 block text-[13px] font-medium"
            htmlFor="offboard-note"
          >
            Internal reason (admin audit log)
          </label>
          <textarea
            id="offboard-note"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Specific reasoning · escalation history · supports re-apply review later."
            className="border-line bg-cream/40 text-ink focus:border-ink focus:ring-ink/8 placeholder:text-ink-mute w-full resize-y rounded-md border px-3.5 py-2.5 text-[14px] leading-[1.55] outline-none focus:ring-[3px]"
          />
          <div className="bg-amber/12 text-ink mt-4 flex items-start gap-2 rounded-md px-3 py-2 text-[12px] leading-[1.5]">
            <ShieldCheck
              className="text-amber mt-0.5 h-3.5 w-3.5 flex-shrink-0"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <span>
              Active client engagements remain billable through the grace
              window. Audit log captures every off-board decision.
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
            Off-board candidate
          </button>
        </>
      }
    />
  );
}
