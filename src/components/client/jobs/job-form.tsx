"use client";

import { Sparkles, X } from "lucide-react";
import { useId, useState } from "react";

import {
  FieldError,
  FieldLabel,
  FormBanner,
  InfoNote,
  inputClass,
} from "@/components/ui/form/field";
import { SubmitButton } from "@/components/ui/form/submit-button";
import { ApiClientError, clientsApi } from "@/lib/api-client";
import { ROLE_CATEGORIES } from "@/lib/domain/candidate";
import { HOURS_PER_WEEK_OPTIONS, JOB_DURATIONS, JOB_LIMITS } from "@/lib/domain/job";
import { dedupeSkillNames } from "@/lib/domain/skill";
// Imported from the module, not the barrel: the barrel reaches `next/server`.
import { fieldsFromZod } from "@/lib/errors/zod-fields";
import { createJobSchema } from "@/lib/validators/job";

type FieldErrors = Record<string, string>;

/** "25" / "25.5" / "$25.50" → 2550; anything else → NaN (the schema rejects it). */
function dollarsToCents(raw: string): number {
  const cleaned = raw.replace(/[$,\s]/g, "");
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return Number.NaN;
  return Math.round(Number.parseFloat(cleaned) * 100);
}

/**
 * Post-a-job form. Validates with `createJobSchema` (the server's rules) before
 * calling the API; the server re-validates regardless. Skills are entered as
 * tags — Enter or comma adds one — and go up as an array. Rates are typed in
 * dollars and converted to integer cents at the boundary. On success we
 * hard-navigate to the new job's page so the server-rendered surface reads it.
 */
export function JobForm() {
  const titleId = useId();
  const categoryId = useId();
  const descId = useId();
  const skillsId = useId();
  const minId = useId();
  const maxId = useId();
  const hoursId = useId();
  const durationId = useId();
  const tzId = useId();

  const [skills, setSkills] = useState<string[]>([]);
  const [skillDraft, setSkillDraft] = useState("");
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const commitSkillDraft = (): string[] => {
    const next = dedupeSkillNames([...skills, ...skillDraft.split(",")]);
    setSkills(next);
    setSkillDraft("");
    return next;
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commitSkillDraft();
    } else if (e.key === "Backspace" && !skillDraft && skills.length > 0) {
      setSkills(skills.slice(0, -1));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;

    const form = new FormData(e.currentTarget);
    // Anything still typed in the skills box counts too.
    const finalSkills = skillDraft.trim() ? commitSkillDraft() : skills;

    const parsed = createJobSchema.safeParse({
      title: String(form.get("title") ?? ""),
      description: String(form.get("description") ?? ""),
      category: String(form.get("category") ?? ""),
      skills: finalSkills,
      hourlyRateMinCents: dollarsToCents(String(form.get("rateMin") ?? "")),
      hourlyRateMaxCents: dollarsToCents(String(form.get("rateMax") ?? "")),
      hoursPerWeek: String(form.get("hoursPerWeek") ?? ""),
      duration: String(form.get("duration") ?? ""),
      timezoneNote: String(form.get("timezoneNote") ?? ""),
    });

    if (!parsed.success) {
      setFormError(null);
      setFieldErrors(fieldsFromZod(parsed.error));
      return;
    }

    setPending(true);
    setFormError(null);
    setFieldErrors({});

    try {
      const { job } = await clientsApi.createJob(parsed.data);
      window.location.assign(`/client/jobs/${job.id}?posted=1`);
    } catch (error) {
      if (error instanceof ApiClientError) {
        setFieldErrors(error.fields);
        setFormError(Object.keys(error.fields).length > 0 ? null : error.message);
      } else {
        setFormError("Something went wrong. Please try again.");
      }
      setPending(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col">
      {formError && <FormBanner message={formError} />}

      <Section title="The role" hint="What you're hiring for">
        <div className="mb-5">
          <FieldLabel htmlFor={titleId} label="Job title" />
          <input
            id={titleId}
            name="title"
            type="text"
            required
            disabled={pending}
            maxLength={JOB_LIMITS.title}
            placeholder="e.g. Senior React developer for a fintech dashboard"
            aria-invalid={Boolean(fieldErrors.title)}
            className={inputClass(Boolean(fieldErrors.title))}
          />
          <FieldError message={fieldErrors.title} />
        </div>

        <div className="mb-5">
          <FieldLabel htmlFor={categoryId} label="Category" />
          <select
            id={categoryId}
            name="category"
            required
            disabled={pending}
            defaultValue=""
            aria-invalid={Boolean(fieldErrors.category)}
            className={inputClass(Boolean(fieldErrors.category), "appearance-none")}
          >
            <option value="" disabled>
              Pick the closest category
            </option>
            {ROLE_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <FieldError message={fieldErrors.category} />
        </div>

        <div className="mb-5">
          <FieldLabel htmlFor={descId} label="Description" />
          <textarea
            id={descId}
            name="description"
            required
            disabled={pending}
            rows={8}
            maxLength={JOB_LIMITS.description}
            onChange={(e) => setDescriptionLength(e.target.value.trim().length)}
            placeholder="What the work is, what success looks like in the first month, the stack or tools, and how your team communicates."
            aria-invalid={Boolean(fieldErrors.description)}
            className={inputClass(Boolean(fieldErrors.description), "min-h-[180px] resize-y leading-[1.55]")}
          />
          <div className="mt-1.5 flex items-start justify-between gap-3">
            <FieldError message={fieldErrors.description} />
            <span className="text-ink-mute ml-auto font-mono text-[10.5px] tracking-[0.06em]">
              {descriptionLength < JOB_LIMITS.descriptionMin
                ? `${JOB_LIMITS.descriptionMin - descriptionLength} more characters`
                : `${descriptionLength.toLocaleString("en-US")} / ${JOB_LIMITS.description.toLocaleString("en-US")}`}
            </span>
          </div>
        </div>

        <div className="mb-1">
          <FieldLabel htmlFor={skillsId} label="Skills & tools" hint="Optional" />
          <div
            className={inputClass(
              Boolean(fieldErrors.skills),
              "flex flex-wrap items-center gap-1.5 py-2",
            )}
          >
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-cream-deep text-ink inline-flex items-center gap-1 rounded-full py-1 pr-1.5 pl-2.5 text-[12.5px]"
              >
                {skill}
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => setSkills(skills.filter((s) => s !== skill))}
                  aria-label={`Remove ${skill}`}
                  className="text-ink-mute hover:text-ink grid h-4 w-4 place-items-center rounded-full"
                >
                  <X className="h-3 w-3" strokeWidth={2} />
                </button>
              </span>
            ))}
            <input
              id={skillsId}
              type="text"
              disabled={pending || skills.length >= JOB_LIMITS.skills}
              value={skillDraft}
              onChange={(e) => setSkillDraft(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              onBlur={() => skillDraft.trim() && commitSkillDraft()}
              placeholder={
                skills.length === 0
                  ? "React, Figma, QuickBooks — press Enter after each"
                  : skills.length >= JOB_LIMITS.skills
                    ? `Up to ${JOB_LIMITS.skills} skills`
                    : "Add another"
              }
              className="text-ink placeholder:text-ink-mute min-w-[160px] flex-1 border-0 bg-transparent px-1 py-1 text-[14.5px] outline-none placeholder:opacity-70 disabled:opacity-60"
            />
          </div>
          <FieldError message={fieldErrors.skills} />
        </div>
      </Section>

      <Section title="Rate & commitment" hint="Candidates filter on these">
        <div className="mb-5 grid gap-5 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor={minId} label="Hourly rate — from (USD)" />
            <div className="relative">
              <span
                aria-hidden="true"
                className="text-ink-mute pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[15px]"
              >
                $
              </span>
              <input
                id={minId}
                name="rateMin"
                type="text"
                inputMode="decimal"
                required
                disabled={pending}
                placeholder="25"
                aria-invalid={Boolean(fieldErrors.hourlyRateMinCents)}
                className={inputClass(Boolean(fieldErrors.hourlyRateMinCents), "pl-7")}
              />
            </div>
            <FieldError message={fieldErrors.hourlyRateMinCents} />
          </div>
          <div>
            <FieldLabel htmlFor={maxId} label="Hourly rate — to (USD)" />
            <div className="relative">
              <span
                aria-hidden="true"
                className="text-ink-mute pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[15px]"
              >
                $
              </span>
              <input
                id={maxId}
                name="rateMax"
                type="text"
                inputMode="decimal"
                required
                disabled={pending}
                placeholder="40"
                aria-invalid={Boolean(fieldErrors.hourlyRateMaxCents)}
                className={inputClass(Boolean(fieldErrors.hourlyRateMaxCents), "pl-7")}
              />
            </div>
            <FieldError message={fieldErrors.hourlyRateMaxCents} />
          </div>
        </div>

        <div className="mb-5 grid gap-5 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor={hoursId} label="Hours per week" />
            <select
              id={hoursId}
              name="hoursPerWeek"
              required
              disabled={pending}
              defaultValue=""
              aria-invalid={Boolean(fieldErrors.hoursPerWeek)}
              className={inputClass(Boolean(fieldErrors.hoursPerWeek), "appearance-none")}
            >
              <option value="" disabled>
                Weekly commitment
              </option>
              {HOURS_PER_WEEK_OPTIONS.map((h) => (
                <option key={h} value={h}>
                  {h === 40 ? "40 hours (full-time)" : `${h} hours`}
                </option>
              ))}
            </select>
            <FieldError message={fieldErrors.hoursPerWeek} />
          </div>
          <div>
            <FieldLabel htmlFor={durationId} label="Expected duration" />
            <select
              id={durationId}
              name="duration"
              required
              disabled={pending}
              defaultValue=""
              aria-invalid={Boolean(fieldErrors.duration)}
              className={inputClass(Boolean(fieldErrors.duration), "appearance-none")}
            >
              <option value="" disabled>
                How long
              </option>
              {JOB_DURATIONS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
            <FieldError message={fieldErrors.duration} />
          </div>
        </div>

        <div className="mb-1">
          <FieldLabel htmlFor={tzId} label="Timezone / overlap" hint="Optional" />
          <input
            id={tzId}
            name="timezoneNote"
            type="text"
            disabled={pending}
            maxLength={JOB_LIMITS.timezoneNote}
            placeholder="e.g. 4 hours overlap with CET, or any timezone"
            aria-invalid={Boolean(fieldErrors.timezoneNote)}
            className={inputClass(Boolean(fieldErrors.timezoneNote))}
          />
          <FieldError message={fieldErrors.timezoneNote} />
        </div>
      </Section>

      <InfoNote
        icon={<Sparkles className="h-4 w-4" strokeWidth={1.6} />}
        title="Live the moment you post."
        body="Vetted candidates see it right away and can apply. You can close the role any time from its page."
        className="mt-2"
      />

      <SubmitButton label="Post job" pendingLabel="Posting" pending={pending} className="mt-0" />
    </form>
  );
}

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="bg-paper border-line shadow-card mb-6 rounded-xl border p-6 sm:rounded-[22px] sm:p-8">
      <legend className="sr-only">{title}</legend>
      <div className="mb-6 flex items-baseline justify-between gap-3">
        <h2 className="font-display text-[22px] font-medium tracking-[-0.01em]">{title}</h2>
        <span className="text-ink-mute font-mono text-[10.5px] tracking-[0.12em] uppercase">
          {hint}
        </span>
      </div>
      {children}
    </fieldset>
  );
}
