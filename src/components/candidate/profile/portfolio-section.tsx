"use client";

import { ImagePlus, Loader2 } from "lucide-react";
import { useState } from "react";

import { ApiClientError, candidateProfileApi } from "@/lib/api-client";
import type {
  CandidateProfileDto,
  CandidateProfileViewDto,
} from "@/lib/api/dto/candidate-profile.dto";
import { PROFILE_LIMITS } from "@/lib/domain/candidate-profile";
import { cn } from "@/lib/utils/cn";

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

type Row = { title: string; description: string; imageUrl: string; linkUrl: string };

const EMPTY: Row = { title: "", description: "", imageUrl: "", linkUrl: "" };

/**
 * Portfolio — up to six pieces. Images upload the moment they are chosen (the
 * URL is stored on the row); the section itself saves on the button.
 */
export function PortfolioSection({
  profile,
  onSaved,
}: {
  profile: CandidateProfileDto;
  onSaved: (view: CandidateProfileViewDto) => void;
}) {
  const [rows, setRows] = useState<Row[]>(
    profile.portfolio.map((p) => ({
      title: p.title,
      description: p.description ?? "",
      imageUrl: p.imageUrl ?? "",
      linkUrl: p.linkUrl ?? "",
    })),
  );
  const [uploading, setUploading] = useState<number | null>(null);
  const save = useSectionSave(onSaved);

  const update = (i: number, patch: Partial<Row>) => {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
    for (const k of Object.keys(patch)) save.clearFieldError(`${i}.${k}`);
  };
  const err = (i: number, k: keyof Row) => save.fieldErrors[`${i}.${k}`];

  const handleImage = async (i: number, file: File | undefined) => {
    if (!file || uploading !== null) return;
    setUploading(i);
    save.setError(null);
    try {
      const result = await candidateProfileApi.upload("portfolio", file);
      update(i, { imageUrl: result.url });
    } catch (e) {
      save.setError(
        e instanceof ApiClientError ? (e.fields.file ?? e.message) : "Upload failed. Please try again.",
      );
    } finally {
      setUploading(null);
    }
  };

  return (
    <SectionCard
      id="portfolio"
      eyebrow="07 · Portfolio"
      title="Show your work"
      description={`Up to ${PROFILE_LIMITS.portfolio} pieces. A screenshot and two sentences on what you did beats a long list of links.`}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {rows.length === 0 && (
          <p className="text-ink-mute text-[13.5px] md:col-span-2">Nothing here yet.</p>
        )}
        {rows.map((row, i) => (
          <RowCard key={i}>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-ink-mute font-mono text-[11px] tracking-[0.12em] uppercase">Item {i + 1}</span>
              <RemoveRowButton label="Remove" onClick={() => setRows(rows.filter((_, idx) => idx !== i))} />
            </div>

            <label
              className={cn(
                "border-line bg-paper text-ink-mute relative mb-4 grid aspect-[16/10] cursor-pointer place-items-center overflow-hidden rounded-md border border-dashed text-[13px] transition-colors hover:border-[#C4BCA9]",
                uploading === i && "pointer-events-none",
              )}
            >
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={(e) => void handleImage(i, e.target.files?.[0])}
              />
              {row.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={row.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <span className="inline-flex flex-col items-center gap-1.5">
                  <ImagePlus className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                  Add an image
                </span>
              )}
              {uploading === i && (
                <span className="bg-paper/70 absolute inset-0 grid place-items-center">
                  <Loader2 className="h-5 w-5 animate-spin" strokeWidth={1.8} aria-hidden="true" />
                </span>
              )}
            </label>

            <div className="flex flex-col gap-3">
              <Field id={`pf-title-${i}`} label="Title" error={err(i, "title")}>
                <input
                  id={`pf-title-${i}`}
                  value={row.title}
                  onChange={(e) => update(i, { title: e.target.value })}
                  placeholder="Investor update template"
                  className={inputClass(Boolean(err(i, "title")))}
                />
              </Field>
              <Field id={`pf-desc-${i}`} label="Description" hint="Optional" error={err(i, "description")}>
                <textarea
                  id={`pf-desc-${i}`}
                  rows={2}
                  value={row.description}
                  onChange={(e) => update(i, { description: e.target.value })}
                  className={inputClass(Boolean(err(i, "description")), "resize-y leading-[1.5]")}
                />
              </Field>
              <Field id={`pf-link-${i}`} label="Link" hint="Optional" error={err(i, "linkUrl")}>
                <input
                  id={`pf-link-${i}`}
                  type="url"
                  value={row.linkUrl}
                  onChange={(e) => update(i, { linkUrl: e.target.value })}
                  placeholder="https://"
                  className={inputClass(Boolean(err(i, "linkUrl")))}
                />
              </Field>
            </div>
          </RowCard>
        ))}
      </div>

      <div className="mt-4">
        <AddRowButton
          label="Add portfolio item"
          disabled={rows.length >= PROFILE_LIMITS.portfolio}
          onClick={() => setRows([...rows, EMPTY])}
        />
      </div>

      <SectionFooter
        pending={save.pending}
        saved={save.saved}
        error={save.error}
        disabled={uploading !== null}
        onSave={() => save.run(() => candidateProfileApi.replaceSection("portfolio", rows))}
      />
    </SectionCard>
  );
}
