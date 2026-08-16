"use client";

import { useState } from "react";

import { candidateProfileApi } from "@/lib/api-client";
import type {
  CandidateProfileDto,
  CandidateProfileViewDto,
} from "@/lib/api/dto/candidate-profile.dto";
import { LANGUAGE_PROFICIENCIES, PROFILE_LIMITS } from "@/lib/domain/candidate-profile";

import {
  AddRowButton,
  Field,
  inputClass,
  RemoveRowButton,
  SectionCard,
  SectionFooter,
} from "./form-primitives";
import { useSectionSave } from "./use-section-save";

type Row = { language: string; proficiency: string };

export function LanguagesSection({
  profile,
  onSaved,
}: {
  profile: CandidateProfileDto;
  onSaved: (view: CandidateProfileViewDto) => void;
}) {
  const [rows, setRows] = useState<Row[]>(
    profile.languages.length
      ? profile.languages.map((l) => ({ language: l.language, proficiency: l.proficiency }))
      : [{ language: "English", proficiency: "" }],
  );
  const save = useSectionSave(onSaved);

  const update = (i: number, patch: Partial<Row>) => {
    setRows(rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
    for (const k of Object.keys(patch)) save.clearFieldError(`${i}.${k}`);
  };

  return (
    <SectionCard
      id="languages"
      eyebrow="03 · Languages"
      title="Languages you work in"
      description="Clients filter by this. Be honest about level — it gets checked in the interview."
    >
      <div className="flex flex-col gap-3">
        {rows.map((row, i) => (
          <div key={i} className="grid items-end gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <Field id={`lang-${i}`} label={i === 0 ? "Language" : ""} error={save.fieldErrors[`${i}.language`]}>
              <input
                id={`lang-${i}`}
                value={row.language}
                onChange={(e) => update(i, { language: e.target.value })}
                placeholder="Arabic"
                className={inputClass(Boolean(save.fieldErrors[`${i}.language`]))}
              />
            </Field>
            <Field id={`prof-${i}`} label={i === 0 ? "Level" : ""} error={save.fieldErrors[`${i}.proficiency`]}>
              <select
                id={`prof-${i}`}
                value={row.proficiency}
                onChange={(e) => update(i, { proficiency: e.target.value })}
                className={inputClass(Boolean(save.fieldErrors[`${i}.proficiency`]), "appearance-none")}
              >
                <option value="">Select level</option>
                {LANGUAGE_PROFICIENCIES.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </Field>
            <div className="pb-2.5">
              <RemoveRowButton label="Remove" onClick={() => setRows(rows.filter((_, idx) => idx !== i))} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <AddRowButton
          label="Add language"
          disabled={rows.length >= PROFILE_LIMITS.languages}
          onClick={() => setRows([...rows, { language: "", proficiency: "" }])}
        />
      </div>

      <SectionFooter
        pending={save.pending}
        saved={save.saved}
        error={save.error}
        onSave={() => save.run(() => candidateProfileApi.replaceSection("languages", rows))}
      />
    </SectionCard>
  );
}
