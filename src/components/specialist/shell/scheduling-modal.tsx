"use client";

/**
 * SchedulingModal — visual-only date/time picker for "Schedule check-in"
 * style buttons. Wraps `queue-shared/ReviewModal` so it inherits Esc /
 * backdrop / scroll-lock and the established modal aesthetic.
 *
 * State reset semantics: parents should pass a `key` derived from the
 * subject identity (e.g. `key={schedulingFor?.id ?? "closed"}`) so the
 * modal remounts on each open. Lazy-init `useState(defaultDateTime)`
 * picks up fresh defaults per remount; no `useEffect` needed (avoids
 * the cascading-render lint rule). Same precedent as
 * `review-queue/detail-pane.tsx` re-keying on candidate id.
 *
 * Honest treatment: real date+time pickers, real form state, but the
 * confirm path fires `onSchedule(payload)` for the parent to surface a
 * queued-flash overlay — no backend persistence happens. Same precedent
 * as `PreviewUnavailableModal` (commit 6241650): visual-only-but-polished
 * for actions advertised as features whose backends aren't yet wired.
 *
 * Anticipated consumer surfaces (3 files, 4 surfaces):
 *   1. my-candidates sheet — "Schedule check-in" action      (wired here)
 *   2. candidate-profile hero — "Schedule check-in" action   (to be wired)
 *   3. chat-shared/chat-header — "Schedule" action            (to be wired
 *      — covers both candidate-chat AND client-chat headers)
 *
 * Defaults:
 *   - Date: today (min)
 *   - Time: now + 2 hours, rounded UP to the next 15-min interval
 *   - Duration: 30 min
 *   - Video call link: on
 *
 * Confirm gate: `disabled` until BOTH date and time are non-empty.
 *
 * Client Component.
 */

import { useState } from "react";
import { Calendar, Video } from "lucide-react";
import { ReviewModal } from "@/components/specialist/queue-shared/review-modal";
import { cn } from "@/lib/utils/cn";

export type SchedulePayload = {
  /** YYYY-MM-DD (HTML date input format). */
  date: string;
  /** HH:MM 24-hour (HTML time input format). */
  time: string;
  /** Minutes — one of 15 / 30 / 45 / 60. */
  duration: number;
  /** True when "include video call link" toggle is on. */
  videoCall: boolean;
  /** Optional agenda / note (≤140 chars). Absent when empty. */
  note?: string;
};

type SchedulingModalProps = {
  open: boolean;
  /** Subject heading copy ("Marie Okonkwo", "Acme Co · Sarah Lin"). */
  subjectName: string;
  /** Body header purpose hint ("Quarterly check-in"); defaults to "Check-in". */
  purpose?: string;
  onClose: () => void;
  /** Visual-only callback — parent typically fires a queued-flash overlay. */
  onSchedule: (payload: SchedulePayload) => void;
};

const DURATIONS: ReadonlyArray<number> = [15, 30, 45, 60];

/** Default to today + 2 hours, rounded UP to next 15-min interval. */
function defaultDateTime(): { date: string; time: string } {
  const now = new Date();
  now.setHours(now.getHours() + 2);
  const remainder = now.getMinutes() % 15;
  if (remainder !== 0) now.setMinutes(now.getMinutes() + (15 - remainder));
  now.setSeconds(0, 0);
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const mi = String(now.getMinutes()).padStart(2, "0");
  return { date: `${yyyy}-${mm}-${dd}`, time: `${hh}:${mi}` };
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function SchedulingModal({
  open,
  subjectName,
  purpose = "Check-in",
  onClose,
  onSchedule,
}: SchedulingModalProps) {
  const [{ date, time }, setDateTime] = useState(defaultDateTime);
  const [duration, setDuration] = useState<number>(30);
  const [videoCall, setVideoCall] = useState<boolean>(true);
  const [note, setNote] = useState<string>("");

  const canSubmit = date.length > 0 && time.length > 0;
  const min = todayISO();

  const handleConfirm = () => {
    const payload: SchedulePayload = { date, time, duration, videoCall };
    if (note.trim().length > 0) payload.note = note.trim();
    onSchedule(payload);
  };

  return (
    <ReviewModal
      open={open}
      onClose={onClose}
      iconTone="default"
      icon={<Calendar className="h-5 w-5" strokeWidth={1.6} />}
      title={
        <>
          {purpose} with{" "}
          <em className="serif-italic">{subjectName}</em>
        </>
      }
      subtitle="Visual prototype · scheduling service not yet wired"
      ariaLabel={`${purpose} with ${subjectName}`}
      body={
        <div className="flex flex-col gap-4">
          {/* Date + Time row */}
          <div className="grid grid-cols-2 gap-3">
            <FieldShell label="Date" htmlFor="schedule-date">
              <input
                id="schedule-date"
                type="date"
                value={date}
                min={min}
                onChange={(e) =>
                  setDateTime((prev) => ({ ...prev, date: e.target.value }))
                }
                className="border-line bg-cream/40 text-ink focus:border-ink focus:ring-ink/8 w-full rounded-md border px-3 py-2 text-[14px] outline-none focus:ring-[3px]"
              />
            </FieldShell>
            <FieldShell label="Time" htmlFor="schedule-time">
              <input
                id="schedule-time"
                type="time"
                value={time}
                onChange={(e) =>
                  setDateTime((prev) => ({ ...prev, time: e.target.value }))
                }
                className="border-line bg-cream/40 text-ink focus:border-ink focus:ring-ink/8 w-full rounded-md border px-3 py-2 text-[14px] outline-none focus:ring-[3px]"
              />
            </FieldShell>
          </div>

          {/* Duration chips */}
          <FieldShell label="Duration">
            <div className="flex flex-wrap gap-1.5">
              {DURATIONS.map((d) => {
                const isActive = duration === d;
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDuration(d)}
                    aria-pressed={isActive}
                    className={cn(
                      "border-line bg-paper text-ink-soft inline-flex items-center rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors",
                      isActive
                        ? "bg-ink text-paper border-ink"
                        : "hover:bg-cream-deep hover:border-ink-mute",
                    )}
                  >
                    {d} min
                  </button>
                );
              })}
            </div>
          </FieldShell>

          {/* Video call toggle */}
          <label className="border-line bg-cream/40 hover:bg-cream-deep flex cursor-pointer items-center gap-2.5 rounded-md border px-3.5 py-2.5 transition-colors">
            <input
              type="checkbox"
              checked={videoCall}
              onChange={(e) => setVideoCall(e.target.checked)}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className={cn(
                "grid h-4 w-4 flex-shrink-0 place-items-center rounded-[3px] border-[1.5px] transition-colors",
                videoCall
                  ? "bg-ink border-ink text-lime"
                  : "border-line bg-paper",
              )}
            >
              {videoCall ? (
                <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" aria-hidden="true">
                  <path
                    d="m2 5 2 2 4-5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              ) : null}
            </span>
            <Video
              className="text-ink-mute h-3.5 w-3.5 flex-shrink-0"
              strokeWidth={1.6}
              aria-hidden="true"
            />
            <span className="text-ink-soft text-[13px]">
              Include video call link
            </span>
          </label>

          {/* Note */}
          <FieldShell label="Agenda / note" htmlFor="schedule-note" optional>
            <textarea
              id="schedule-note"
              value={note}
              onChange={(e) => setNote(e.target.value.slice(0, 140))}
              rows={2}
              placeholder="Topics to cover, prep needed, etc."
              className="border-line bg-cream/40 text-ink focus:border-ink focus:ring-ink/8 placeholder:text-ink-mute w-full resize-y rounded-md border px-3 py-2 text-[13.5px] leading-[1.5] outline-none focus:ring-[3px]"
            />
            <div className="text-ink-mute mt-1 text-[10.5px]">
              {note.length} / 140
            </div>
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
              handleConfirm();
            }}
            disabled={!canSubmit}
            className="bg-ink text-paper hover:bg-black inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-ink"
          >
            Schedule
          </button>
        </>
      }
    />
  );
}

/* ============================================================
   Internal: field-label wrapper
   ============================================================ */

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

/* ============================================================
   Helper exports — used by parents to format the queued-flash
   message after a successful schedule. Keeps the formatting
   logic close to the modal so consumers stay consistent.
   ============================================================ */

/**
 * Format a {date, time, duration} into a short flash heading suffix.
 * Example: "Wed May 13, 2:00 PM · 30 min".
 */
export function formatSchedulePartsForFlash(payload: SchedulePayload): string {
  const d = new Date(`${payload.date}T${payload.time}`);
  const dateLabel = d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const timeLabel = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${dateLabel}, ${timeLabel} · ${payload.duration} min`;
}
