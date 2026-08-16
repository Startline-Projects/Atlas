"use client";

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

type EduRow = { school: string; degree: string; fieldOfStudy: string; startYear: string; endYear: string };
type CertRow = { name: string; issuer: string; issuedYear: string; credentialUrl: string };

const EMPTY_EDU: EduRow = { school: "", degree: "", fieldOfStudy: "", startYear: "", endYear: "" };
const EMPTY_CERT: CertRow = { name: "", issuer: "", issuedYear: "", credentialUrl: "" };

/** Empty year fields go up as `null`, not `""` — `z.coerce.number("")` is 0. */
const yearOrNull = (v: string) => (v.trim() === "" ? null : v);

export function EducationSection({
  profile,
  onSaved,
}: {
  profile: CandidateProfileDto;
  onSaved: (view: CandidateProfileViewDto) => void;
}) {
  const [rows, setRows] = useState<EduRow[]>(
    profile.education.map((e) => ({
      school: e.school,
      degree: e.degree ?? "",
      fieldOfStudy: e.fieldOfStudy ?? "",
      startYear: e.startYear?.toString() ?? "",
      endYear: e.endYear?.toString() ?? "",
    })),
  );
  const save = useSectionSave(onSaved);

  const update = (i: number, patch: Partial<EduRow>) => {
    setRows(rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
    for (const k of Object.keys(patch)) save.clearFieldError(`${i}.${k}`);
  };
  const err = (i: number, k: keyof EduRow) => save.fieldErrors[`${i}.${k}`];

  return (
    <SectionCard
      id="education"
      eyebrow="05 · Education"
      title="Where you studied"
      description="Degrees, diplomas, bootcamps. Add certifications separately below."
    >
      <div className="flex flex-col gap-4">
        {rows.length === 0 && (
          <p className="text-ink-mute text-[13.5px]">Nothing here yet.</p>
        )}
        {rows.map((row, i) => (
          <RowCard key={i}>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-ink-mute font-mono text-[11px] tracking-[0.12em] uppercase">Entry {i + 1}</span>
              <RemoveRowButton label="Remove" onClick={() => setRows(rows.filter((_, idx) => idx !== i))} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id={`edu-school-${i}`} label="School" error={err(i, "school")} className="sm:col-span-2">
                <input
                  id={`edu-school-${i}`}
                  value={row.school}
                  onChange={(e) => update(i, { school: e.target.value })}
                  placeholder="Université Hassan II"
                  className={inputClass(Boolean(err(i, "school")))}
                />
              </Field>
              <Field id={`edu-degree-${i}`} label="Degree" hint="Optional" error={err(i, "degree")}>
                <input
                  id={`edu-degree-${i}`}
                  value={row.degree}
                  onChange={(e) => update(i, { degree: e.target.value })}
                  placeholder="Bachelor's"
                  className={inputClass(Boolean(err(i, "degree")))}
                />
              </Field>
              <Field id={`edu-field-${i}`} label="Field of study" hint="Optional" error={err(i, "fieldOfStudy")}>
                <input
                  id={`edu-field-${i}`}
                  value={row.fieldOfStudy}
                  onChange={(e) => update(i, { fieldOfStudy: e.target.value })}
                  placeholder="Business administration"
                  className={inputClass(Boolean(err(i, "fieldOfStudy")))}
                />
              </Field>
              <div className="grid grid-cols-2 gap-3 sm:col-span-2 sm:max-w-[320px]">
                <Field id={`edu-start-${i}`} label="Start year" hint="Optional" error={err(i, "startYear")}>
                  <input
                    id={`edu-start-${i}`}
                    type="number"
                    inputMode="numeric"
                    min={1950}
                    max={2100}
                    value={row.startYear}
                    onChange={(e) => update(i, { startYear: e.target.value })}
                    placeholder="2016"
                    className={inputClass(Boolean(err(i, "startYear")))}
                  />
                </Field>
                <Field id={`edu-end-${i}`} label="End year" hint="Optional" error={err(i, "endYear")}>
                  <input
                    id={`edu-end-${i}`}
                    type="number"
                    inputMode="numeric"
                    min={1950}
                    max={2100}
                    value={row.endYear}
                    onChange={(e) => update(i, { endYear: e.target.value })}
                    placeholder="2020"
                    className={inputClass(Boolean(err(i, "endYear")))}
                  />
                </Field>
              </div>
            </div>
          </RowCard>
        ))}
      </div>

      <div className="mt-4">
        <AddRowButton
          label="Add education"
          disabled={rows.length >= PROFILE_LIMITS.education}
          onClick={() => setRows([...rows, EMPTY_EDU])}
        />
      </div>

      <SectionFooter
        pending={save.pending}
        saved={save.saved}
        error={save.error}
        onSave={() =>
          save.run(() =>
            candidateProfileApi.replaceSection(
              "education",
              rows.map((r) => ({
                ...r,
                startYear: yearOrNull(r.startYear),
                endYear: yearOrNull(r.endYear),
              })),
            ),
          )
        }
      />
    </SectionCard>
  );
}

export function CertificationsSection({
  profile,
  onSaved,
}: {
  profile: CandidateProfileDto;
  onSaved: (view: CandidateProfileViewDto) => void;
}) {
  const [rows, setRows] = useState<CertRow[]>(
    profile.certifications.map((c) => ({
      name: c.name,
      issuer: c.issuer ?? "",
      issuedYear: c.issuedYear?.toString() ?? "",
      credentialUrl: c.credentialUrl ?? "",
    })),
  );
  const save = useSectionSave(onSaved);

  const update = (i: number, patch: Partial<CertRow>) => {
    setRows(rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
    for (const k of Object.keys(patch)) save.clearFieldError(`${i}.${k}`);
  };
  const err = (i: number, k: keyof CertRow) => save.fieldErrors[`${i}.${k}`];

  return (
    <SectionCard
      id="certifications"
      eyebrow="06 · Certifications"
      title="Certifications"
      description="Google, HubSpot, PMP, language certificates — anything with a credential you can link to."
    >
      <div className="flex flex-col gap-4">
        {rows.length === 0 && (
          <p className="text-ink-mute text-[13.5px]">No certifications yet.</p>
        )}
        {rows.map((row, i) => (
          <RowCard key={i}>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-ink-mute font-mono text-[11px] tracking-[0.12em] uppercase">Certification {i + 1}</span>
              <RemoveRowButton label="Remove" onClick={() => setRows(rows.filter((_, idx) => idx !== i))} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id={`cert-name-${i}`} label="Name" error={err(i, "name")}>
                <input
                  id={`cert-name-${i}`}
                  value={row.name}
                  onChange={(e) => update(i, { name: e.target.value })}
                  placeholder="HubSpot Inbound Marketing"
                  className={inputClass(Boolean(err(i, "name")))}
                />
              </Field>
              <Field id={`cert-issuer-${i}`} label="Issued by" hint="Optional" error={err(i, "issuer")}>
                <input
                  id={`cert-issuer-${i}`}
                  value={row.issuer}
                  onChange={(e) => update(i, { issuer: e.target.value })}
                  placeholder="HubSpot Academy"
                  className={inputClass(Boolean(err(i, "issuer")))}
                />
              </Field>
              <Field id={`cert-year-${i}`} label="Year" hint="Optional" error={err(i, "issuedYear")}>
                <input
                  id={`cert-year-${i}`}
                  type="number"
                  inputMode="numeric"
                  min={1950}
                  max={2100}
                  value={row.issuedYear}
                  onChange={(e) => update(i, { issuedYear: e.target.value })}
                  placeholder="2024"
                  className={inputClass(Boolean(err(i, "issuedYear")))}
                />
              </Field>
              <Field id={`cert-url-${i}`} label="Credential link" hint="Optional" error={err(i, "credentialUrl")}>
                <input
                  id={`cert-url-${i}`}
                  type="url"
                  value={row.credentialUrl}
                  onChange={(e) => update(i, { credentialUrl: e.target.value })}
                  placeholder="https://"
                  className={inputClass(Boolean(err(i, "credentialUrl")))}
                />
              </Field>
            </div>
          </RowCard>
        ))}
      </div>

      <div className="mt-4">
        <AddRowButton
          label="Add certification"
          disabled={rows.length >= PROFILE_LIMITS.certifications}
          onClick={() => setRows([...rows, EMPTY_CERT])}
        />
      </div>

      <SectionFooter
        pending={save.pending}
        saved={save.saved}
        error={save.error}
        onSave={() =>
          save.run(() =>
            candidateProfileApi.replaceSection(
              "certifications",
              rows.map((r) => ({ ...r, issuedYear: yearOrNull(r.issuedYear) })),
            ),
          )
        }
      />
    </SectionCard>
  );
}
