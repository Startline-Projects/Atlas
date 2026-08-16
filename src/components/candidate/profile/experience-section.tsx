"use client";

import { BadgeCheck } from "lucide-react";
import { useState } from "react";

import { candidateProfileApi } from "@/lib/api-client";
import type {
  CandidateProfileDto,
  CandidateProfileViewDto,
} from "@/lib/api/dto/candidate-profile.dto";
import { PROFILE_LIMITS } from "@/lib/domain/candidate-profile";

import {
  AddRowButton,
  Field,
  inputClass,
  RemoveRowButton,
  RowCard,
  SectionCard,
  SectionFooter,
} from "./form-primitives";
import { useSectionSave } from "./use-section-save";

type Row = {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  verified: boolean;
};

const EMPTY: Row = {
  title: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  description: "",
  verified: false,
};

export function ExperienceSection({
  profile,
  onSaved,
}: {
  profile: CandidateProfileDto;
  onSaved: (view: CandidateProfileViewDto) => void;
}) {
  const [rows, setRows] = useState<Row[]>(
    profile.experiences.map((e) => ({
      title: e.title,
      company: e.company,
      location: e.location ?? "",
      startDate: e.startDate,
      endDate: e.endDate ?? "",
      isCurrent: e.isCurrent,
      description: e.description ?? "",
      verified: e.verified,
    })),
  );
  const save = useSectionSave(onSaved);

  const update = (i: number, patch: Partial<Row>) => {
    setRows(rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
    for (const k of Object.keys(patch)) save.clearFieldError(`${i}.${k}`);
  };
  const err = (i: number, k: keyof Row) => save.fieldErrors[`${i}.${k}`];

  return (
    <SectionCard
      id="experiences"
      eyebrow="04 · Work history"
      title="Where you've worked"
      description="Most recent first. Roles marked verified have been checked by an Atlas talent specialist."
    >
      <div className="flex flex-col gap-4">
        {rows.length === 0 && (
          <p className="text-ink-mute text-[13.5px]">No roles yet — add your most recent one.</p>
        )}
        {rows.map((row, i) => (
          <RowCard key={i}>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-ink-mute font-mono text-[11px] tracking-[0.12em] uppercase">
                Role {i + 1}
                {row.verified && (
                  <span className="text-success ml-2 inline-flex items-center gap-1 normal-case tracking-normal">
                    <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                    Verified
                  </span>
                )}
              </span>
              <RemoveRowButton label="Remove role" onClick={() => setRows(rows.filter((_, idx) => idx !== i))} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field id={`exp-title-${i}`} label="Job title" error={err(i, "title")}>
                <input
                  id={`exp-title-${i}`}
                  value={row.title}
                  onChange={(e) => update(i, { title: e.target.value })}
                  placeholder="Executive assistant"
                  className={inputClass(Boolean(err(i, "title")))}
                />
              </Field>
              <Field id={`exp-company-${i}`} label="Company" error={err(i, "company")}>
                <input
                  id={`exp-company-${i}`}
                  value={row.company}
                  onChange={(e) => update(i, { company: e.target.value })}
                  placeholder="Acme Inc."
                  className={inputClass(Boolean(err(i, "company")))}
                />
              </Field>
              <Field id={`exp-location-${i}`} label="Location" hint="Optional" error={err(i, "location")}>
                <input
                  id={`exp-location-${i}`}
                  value={row.location}
                  onChange={(e) => update(i, { location: e.target.value })}
                  placeholder="Remote · Casablanca"
                  className={inputClass(Boolean(err(i, "location")))}
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field id={`exp-start-${i}`} label="From" error={err(i, "startDate")}>
                  <input
                    id={`exp-start-${i}`}
                    type="month"
                    value={row.startDate}
                    onChange={(e) => update(i, { startDate: e.target.value })}
                    className={inputClass(Boolean(err(i, "startDate")))}
                  />
                </Field>
                <Field id={`exp-end-${i}`} label="To" error={err(i, "endDate")}>
                  <input
                    id={`exp-end-${i}`}
                    type="month"
                    value={row.endDate}
                    disabled={row.isCurrent}
                    onChange={(e) => update(i, { endDate: e.target.value })}
                    className={inputClass(Boolean(err(i, "endDate")))}
                  />
                </Field>
              </div>
            </div>

            <label className="text-ink-soft mt-3 inline-flex cursor-pointer items-center gap-2 text-[13px]">
              <input
                type="checkbox"
                checked={row.isCurrent}
                onChange={(e) => update(i, { isCurrent: e.target.checked, endDate: e.target.checked ? "" : row.endDate })}
                className="accent-ink h-4 w-4"
              />
              I currently work here
            </label>

            <Field id={`exp-desc-${i}`} label="What you did" hint="Optional" error={err(i, "description")} className="mt-4">
              <textarea
                id={`exp-desc-${i}`}
                rows={3}
                value={row.description}
                onChange={(e) => update(i, { description: e.target.value })}
                placeholder="Owned the CEO's calendar and inbox, ran weekly ops reviews, cut meeting load 30%."
                className={inputClass(Boolean(err(i, "description")), "resize-y leading-[1.5]")}
              />
            </Field>
          </RowCard>
        ))}
      </div>

      <div className="mt-4">
        <AddRowButton
          label="Add role"
          disabled={rows.length >= PROFILE_LIMITS.experiences}
          onClick={() => setRows([...rows, EMPTY])}
        />
      </div>

      <SectionFooter
        pending={save.pending}
        saved={save.saved}
        error={save.error}
        onSave={() =>
          save.run(() =>
            candidateProfileApi.replaceSection(
              "experiences",
              // `verified` is display-only; the server ignores unknown keys but
              // we keep the payload to what the schema actually reads.
              rows.map((r) => ({
                title: r.title,
                company: r.company,
                location: r.location,
                startDate: r.startDate,
                endDate: r.endDate,
                isCurrent: r.isCurrent,
                description: r.description,
              })),
            ),
          )
        }
      />
    </SectionCard>
  );
}
