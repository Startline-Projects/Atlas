"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { candidateProfileApi } from "@/lib/api-client";
import type {
  CandidateProfileDto,
  CandidateProfileViewDto,
  SkillDto,
} from "@/lib/api/dto/candidate-profile.dto";
import { PROFILE_LIMITS } from "@/lib/domain/candidate-profile";
import { cn } from "@/lib/utils/cn";

import { FieldError, inputClass, SectionCard, SectionFooter } from "./form-primitives";
import { useSectionSave } from "./use-section-save";

/**
 * Skills & tools as searchable tags. Typing suggests existing tags (so the
 * vocabulary stays deduplicated); Enter or comma adds whatever is typed.
 * The section saves as one list.
 */
export function SkillsSection({
  profile,
  onSaved,
}: {
  profile: CandidateProfileDto;
  onSaved: (view: CandidateProfileViewDto) => void;
}) {
  const inputId = useId();
  const listId = useId();
  const [tags, setTags] = useState<string[]>(profile.skills.map((s) => s.name));
  const [draft, setDraft] = useState("");
  const [suggestions, setSuggestions] = useState<SkillDto[]>([]);
  const [active, setActive] = useState(-1);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const save = useSectionSave(onSaved);

  const full = tags.length >= PROFILE_LIMITS.skills;

  useEffect(
    () => () => {
      if (debounce.current) clearTimeout(debounce.current);
    },
    [],
  );

  const handleDraftChange = (value: string) => {
    setDraft(value);
    if (debounce.current) clearTimeout(debounce.current);
    const q = value.trim();
    if (q.length < 1) {
      setSuggestions([]);
      return;
    }
    debounce.current = setTimeout(() => {
      candidateProfileApi
        .searchSkills(q)
        .then((r) => {
          setSuggestions(r.skills);
          setActive(-1);
        })
        .catch(() => setSuggestions([]));
    }, 180);
  };

  // Hide tags that are already attached, without re-querying.
  const visibleSuggestions = suggestions.filter(
    (s) => !tags.some((t) => t.toLowerCase() === s.name.toLowerCase()),
  );

  const add = (raw: string) => {
    const name = raw.trim().replace(/\s+/g, " ").replace(/,+$/, "");
    if (!name || full) return;
    if (tags.some((t) => t.toLowerCase() === name.toLowerCase())) {
      setDraft("");
      return;
    }
    setTags([...tags, name]);
    setDraft("");
    setSuggestions([]);
    save.clearFieldError(String(tags.length));
  };

  const remove = (i: number) => setTags(tags.filter((_, idx) => idx !== i));

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" && visibleSuggestions.length) {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, visibleSuggestions.length - 1));
    } else if (e.key === "ArrowUp" && visibleSuggestions.length) {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, -1));
    } else if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      add(active >= 0 ? (visibleSuggestions[active]?.name ?? draft) : draft);
    } else if (e.key === "Backspace" && draft === "" && tags.length) {
      remove(tags.length - 1);
    } else if (e.key === "Escape") {
      setSuggestions([]);
    }
  };

  const rowError = Object.entries(save.fieldErrors).find(([k]) => /^\d+$/.test(k))?.[1];

  return (
    <SectionCard
      id="skills"
      eyebrow="02 · Skills & tools"
      title="What you're good at"
      description="Add the skills and tools clients search for — the specific ones (“HubSpot”, “Excel pivot tables”) beat the broad ones (“marketing”)."
    >
      <label htmlFor={inputId} className="text-ink-soft mb-1.5 flex items-center justify-between text-[13px] font-medium">
        <span>Skills</span>
        <span className="text-ink-mute font-mono text-[10px] tracking-[0.1em] uppercase">
          {tags.length}/{PROFILE_LIMITS.skills}
        </span>
      </label>

      <div
        className={cn(
          inputClass(Boolean(rowError), "flex min-h-[48px] flex-wrap items-center gap-2 py-2"),
          "cursor-text",
        )}
        onClick={() => document.getElementById(inputId)?.focus()}
      >
        {tags.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="bg-ink text-paper inline-flex items-center gap-1.5 rounded-full py-1 pr-2 pl-3 text-[13px] font-medium"
          >
            {t}
            <button
              type="button"
              aria-label={`Remove ${t}`}
              onClick={(e) => {
                e.stopPropagation();
                remove(i);
              }}
              className="hover:bg-paper/20 grid h-[18px] w-[18px] place-items-center rounded-full transition-colors"
            >
              <X className="h-3 w-3" strokeWidth={2.2} aria-hidden="true" />
            </button>
          </span>
        ))}
        <input
          id={inputId}
          role="combobox"
          aria-expanded={visibleSuggestions.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          value={draft}
          disabled={full}
          onChange={(e) => handleDraftChange(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => setTimeout(() => setSuggestions([]), 120)}
          placeholder={full ? "Limit reached" : tags.length ? "Add another…" : "Type a skill and press Enter"}
          className="text-ink placeholder:text-ink-mute min-w-[160px] flex-1 bg-transparent text-[14.5px] outline-none disabled:opacity-60"
        />
      </div>

      {visibleSuggestions.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className="bg-paper border-line shadow-card mt-1.5 overflow-hidden rounded-md border"
        >
          {visibleSuggestions.map((s, i) => (
            <li
              key={s.id}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => {
                e.preventDefault();
                add(s.name);
              }}
              className={cn(
                "text-ink cursor-pointer px-3.5 py-2 text-[14px]",
                i === active ? "bg-cream-deep" : "hover:bg-cream",
              )}
            >
              {s.name}
            </li>
          ))}
        </ul>
      )}

      <FieldError message={rowError} />
      <p className="text-ink-mute mt-2 text-[12px]">
        Press Enter or comma to add. Backspace removes the last one.
      </p>

      <SectionFooter
        pending={save.pending}
        saved={save.saved}
        error={save.error}
        onSave={() => save.run(() => candidateProfileApi.replaceSection("skills", tags))}
      />
    </SectionCard>
  );
}
