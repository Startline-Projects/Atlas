"use client";

/**
 * Add-prospect modal. Reuses `queue-shared/ReviewModal` for the shell
 * (Esc-to-close, body lock, focus trap basics). Body has 5 fields per
 * source HTML: name / location / source / starting stage / reason.
 *
 * On submit, fires `e.preventDefault()` (visual only this session). No
 * persistence; closes the modal on Cancel + on Add (with the "added"
 * approved-flash deferred to a future polish session — adding a flash
 * here without a real persist feels misleading).
 *
 * Client Component.
 */

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  SOURCING_STAGES,
  SOURCING_SOURCE_FILTERS,
} from "@/lib/mock-data/specialist/sourcing";
import { ReviewModal } from "@/components/specialist/queue-shared/review-modal";

const ADD_STAGES = SOURCING_STAGES.filter((s) => s.key !== "applied");
const ADD_SOURCES = SOURCING_SOURCE_FILTERS.filter((s) => s.key !== "all");

export function AddProspectModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [source, setSource] = useState<string>("linkedin");
  const [stage, setStage] = useState<string>("sourced");
  const [reason, setReason] = useState("");

  const canAdd = name.trim().length > 0;

  function handleAdd() {
    if (!canAdd) return;
    // Visual-only this session. Reset + close.
    setName("");
    setLocation("");
    setSource("linkedin");
    setStage("sourced");
    setReason("");
    onClose();
  }

  return (
    <ReviewModal
      open={open}
      onClose={onClose}
      iconTone="default"
      icon={<Plus className="h-5 w-5" strokeWidth={1.7} />}
      title={
        <>
          Add a <em className="font-display italic text-ink-soft">prospect</em>
        </>
      }
      subtitle="Add a new candidate to the sourcing pipeline. Required: name + source + stage."
      ariaLabel="Add prospect"
      body={
        <div className="flex flex-col gap-3.5">
          <Field label="Full name" htmlFor="ap-name">
            <input
              id="ap-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Anjali Reddy"
              autoComplete="off"
              className="bg-cream border-line w-full rounded-md border px-3 py-2 font-body text-[13px] text-ink outline-none transition-colors placeholder:text-ink-mute focus:border-ink-mute focus:bg-paper"
            />
          </Field>
          <Field label="Location" htmlFor="ap-loc">
            <input
              id="ap-loc"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Bengaluru, India"
              autoComplete="off"
              className="bg-cream border-line w-full rounded-md border px-3 py-2 font-body text-[13px] text-ink outline-none transition-colors placeholder:text-ink-mute focus:border-ink-mute focus:bg-paper"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Source" htmlFor="ap-source">
              <select
                id="ap-source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="bg-cream border-line w-full rounded-md border px-3 py-2 font-body text-[13px] text-ink outline-none transition-colors focus:border-ink-mute focus:bg-paper"
              >
                {ADD_SOURCES.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Starting stage" htmlFor="ap-stage">
              <select
                id="ap-stage"
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="bg-cream border-line w-full rounded-md border px-3 py-2 font-body text-[13px] text-ink outline-none transition-colors focus:border-ink-mute focus:bg-paper"
              >
                {ADD_STAGES.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.title}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Reason to pursue" htmlFor="ap-reason">
            <textarea
              id="ap-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              placeholder="One sentence on why this prospect is worth pursuing…"
              className="bg-cream border-line w-full resize-y rounded-md border px-3 py-2 font-body text-[13px] leading-[1.5] text-ink outline-none transition-colors placeholder:text-ink-mute focus:border-ink-mute focus:bg-paper"
            />
          </Field>
        </div>
      }
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="border-line bg-paper text-ink-soft hover:bg-cream-deep hover:text-ink rounded-lg border px-4 py-2 font-body text-[13px] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleAdd();
            }}
            disabled={!canAdd}
            className="bg-ink text-paper hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-50 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 font-body text-[13px] font-medium transition-colors"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={1.7} />
            Add to pipeline
          </button>
        </>
      }
    />
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="font-mono text-[10px] font-medium tracking-[0.12em] uppercase text-ink-mute"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
