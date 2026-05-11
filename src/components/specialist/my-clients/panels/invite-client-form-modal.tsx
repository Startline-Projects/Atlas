"use client";

/**
 * InviteClientFormModal — modal replacement for the prior
 * `WorkflowUnavailableModal kind="invite-client"` treatment.
 *
 * Differs from the other Session-7 workflow surfaces: the trigger is
 * the header "Invite client" button, which has no specific client
 * subject. Forcing the slide-over sheet open to host an invite form
 * would be confused UX (sheet always belongs to a chosen client).
 * Instead this is a stand-alone form modal — same wrapping pattern as
 * `SchedulingModal` / `PreviewUnavailableModal` / `WorkflowUnavailableModal`,
 * all of which wrap `ReviewModal` for Esc + backdrop + scroll-lock.
 *
 * Form fields:
 *   - Company name (required)
 *   - Primary contact: name + email (both required)
 *   - Industry (select, defaults to "Other")
 *   - Optional opening note (≤240 chars)
 *
 * Submit fires `useQueuedFlash` warn-tone via the parent callback —
 * "Invite link queued for {companyName}". The 'Generate link' affordance
 * is visual-only (no real link generated). Page reload resets.
 *
 * Disabled-until-valid pattern locked across all our modal confirms:
 * RevisionsModal · PauseModal · RejectModal · SchedulingModal.
 *
 * State reset semantics: parent passes `key={open ? "open" : "closed"}`
 * so the modal remounts on each open. Lazy-init `useState("")` picks up
 * fresh defaults per remount — no useEffect needed (avoids the
 * cascading-render lint rule). Same precedent as SchedulingModal.
 *
 * Client Component (form state).
 */

import { useState } from "react";
import { Mail } from "lucide-react";
import { ReviewModal } from "@/components/specialist/queue-shared/review-modal";

export type InvitePayload = {
  companyName: string;
  contactName: string;
  contactEmail: string;
  industry: string;
  note?: string;
};

const INDUSTRY_OPTIONS: ReadonlyArray<string> = [
  "B2B SaaS",
  "Developer tools",
  "Biotech",
  "Healthcare",
  "Fintech",
  "Logistics",
  "Publishing",
  "E-commerce",
  "Education",
  "Other",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function InviteClientFormModal({
  open,
  onClose,
  onInvite,
}: {
  open: boolean;
  onClose: () => void;
  onInvite: (payload: InvitePayload) => void;
}) {
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [industry, setIndustry] = useState<string>(INDUSTRY_OPTIONS[INDUSTRY_OPTIONS.length - 1] ?? "Other");
  const [note, setNote] = useState("");

  const canSubmit =
    companyName.trim().length > 0 &&
    contactName.trim().length > 0 &&
    EMAIL_RE.test(contactEmail.trim());

  const handleSubmit = () => {
    if (!canSubmit) return;
    const payload: InvitePayload = {
      companyName: companyName.trim(),
      contactName: contactName.trim(),
      contactEmail: contactEmail.trim(),
      industry,
    };
    if (note.trim().length > 0) payload.note = note.trim();
    onInvite(payload);
  };

  return (
    <ReviewModal
      open={open}
      onClose={onClose}
      iconTone="default"
      icon={<Mail className="h-5 w-5" strokeWidth={1.6} />}
      title="Invite client"
      subtitle="Visual prototype · auth service not yet wired"
      ariaLabel="Invite a new client"
      body={
        <div className="flex flex-col gap-3.5">
          <FieldShell label="Company name" htmlFor="invite-company">
            <input
              id="invite-company"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Acme Co"
              className="border-line bg-cream/40 text-ink focus:border-ink focus:ring-ink/8 placeholder:text-ink-mute w-full rounded-md border px-3 py-2 text-[14px] outline-none focus:ring-[3px]"
            />
          </FieldShell>

          <div className="grid grid-cols-2 gap-3">
            <FieldShell label="Primary contact" htmlFor="invite-contact-name">
              <input
                id="invite-contact-name"
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Full name"
                className="border-line bg-cream/40 text-ink focus:border-ink focus:ring-ink/8 placeholder:text-ink-mute w-full rounded-md border px-3 py-2 text-[14px] outline-none focus:ring-[3px]"
              />
            </FieldShell>
            <FieldShell label="Email" htmlFor="invite-contact-email">
              <input
                id="invite-contact-email"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="contact@company.com"
                className="border-line bg-cream/40 text-ink focus:border-ink focus:ring-ink/8 placeholder:text-ink-mute w-full rounded-md border px-3 py-2 text-[14px] outline-none focus:ring-[3px]"
              />
            </FieldShell>
          </div>

          <FieldShell label="Industry" htmlFor="invite-industry">
            <select
              id="invite-industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="border-line bg-paper text-ink hover:bg-cream-deep w-full cursor-pointer rounded-md border py-2 pr-8 pl-3 text-[13.5px] transition-colors"
            >
              {INDUSTRY_OPTIONS.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </FieldShell>

          <FieldShell label="Opening note" htmlFor="invite-note" optional>
            <textarea
              id="invite-note"
              value={note}
              onChange={(e) => setNote(e.target.value.slice(0, 240))}
              rows={2}
              placeholder="Optional intro — included in the welcome email."
              className="border-line bg-cream/40 text-ink focus:border-ink focus:ring-ink/8 placeholder:text-ink-mute w-full resize-y rounded-md border px-3 py-2 text-[13.5px] leading-[1.5] outline-none focus:ring-[3px]"
            />
            <div className="text-ink-mute mt-1 text-[10.5px]">{note.length} / 240</div>
          </FieldShell>
        </div>
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
              handleSubmit();
            }}
            disabled={!canSubmit}
            className="bg-ink text-paper hover:bg-black inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-ink"
          >
            Generate invite link
          </button>
        </>
      }
    />
  );
}

function FieldShell({
  label,
  htmlFor,
  optional,
  children,
}: {
  label: string;
  htmlFor?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="text-ink-soft mb-1.5 flex items-baseline gap-1.5 text-[12.5px] font-medium"
      >
        {label}
        {optional ? (
          <span className="text-ink-mute font-normal">(optional)</span>
        ) : null}
      </label>
      {children}
    </div>
  );
}
