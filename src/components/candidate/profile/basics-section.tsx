"use client";

import { Camera, Loader2 } from "lucide-react";
import { useId, useRef, useState } from "react";

import { ApiClientError, candidateProfileApi } from "@/lib/api-client";
import type {
  CandidateProfileDto,
  CandidateProfileViewDto,
} from "@/lib/api/dto/candidate-profile.dto";
import { AVAILABILITY_OPTIONS, PROFILE_LIMITS } from "@/lib/domain/candidate-profile";
import type { Availability } from "@/lib/domain/candidate-profile";
import { countryOptions } from "@/lib/domain/countries";
import { roleCategoryLabel } from "@/lib/domain/candidate";
import { cn } from "@/lib/utils/cn";

import {
  Field,
  inputClass,
  SectionCard,
  SectionFooter,
} from "./form-primitives";
import { useSectionSave } from "./use-section-save";

const COUNTRIES = countryOptions();

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Basics: photo, name, headline, bio, location, rate, hours, availability.
 * The photo uploads on selection (it is its own request); everything else is
 * one PATCH on Save.
 */
export function BasicsSection({
  profile,
  onSaved,
}: {
  profile: CandidateProfileDto;
  onSaved: (view: CandidateProfileViewDto) => void;
}) {
  const ids = {
    fullName: useId(),
    headline: useId(),
    bio: useId(),
    country: useId(),
    city: useId(),
    rate: useId(),
    hours: useId(),
    availability: useId(),
  };

  const [fullName, setFullName] = useState(profile.fullName);
  const [headline, setHeadline] = useState(profile.headline ?? "");
  const [bio, setBio] = useState(profile.bio ?? "");
  const [countryCode, setCountryCode] = useState(profile.countryCode ?? "");
  const [city, setCity] = useState(profile.city ?? "");
  const [rate, setRate] = useState(
    profile.hourlyRateCents !== null ? String(profile.hourlyRateCents / 100) : "",
  );
  const [hours, setHours] = useState(
    profile.hoursPerWeek !== null ? String(profile.hoursPerWeek) : "",
  );
  const [availability, setAvailability] = useState(profile.availability ?? "");

  const save = useSectionSave(onSaved);

  const handleSave = () =>
    save.run(() =>
      candidateProfileApi.updateBasics({
        fullName,
        headline,
        bio,
        countryCode,
        city,
        hourlyRateCents: rate.trim() === "" ? null : Math.round(Number(rate) * 100),
        hoursPerWeek: hours.trim() === "" ? null : Number(hours),
        availability: availability === "" ? null : (availability as Availability),
      }),
    );

  return (
    <SectionCard
      id="basics"
      eyebrow="01 · Basics"
      title="Who you are"
      description="This is the first thing a client reads. A clear headline and a specific bio do more than any other section."
    >
      <div className="flex flex-col gap-5">
        <PhotoField profile={profile} onSaved={onSaved} />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={ids.fullName} label="Full name" error={save.fieldErrors.fullName}>
            <input
              id={ids.fullName}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
              className={inputClass(Boolean(save.fieldErrors.fullName))}
            />
          </Field>
          <Field id="role-category" label="Role category" hint="From signup">
            <input
              id="role-category"
              value={roleCategoryLabel(profile.roleCategory)}
              disabled
              readOnly
              className={inputClass(false)}
            />
          </Field>
        </div>

        <Field
          id={ids.headline}
          label="Headline"
          hint={`${headline.length}/${PROFILE_LIMITS.headline}`}
          error={save.fieldErrors.headline}
        >
          <input
            id={ids.headline}
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            maxLength={PROFILE_LIMITS.headline}
            placeholder="e.g. Executive assistant for founders · 6 yrs · Notion & HubSpot"
            className={inputClass(Boolean(save.fieldErrors.headline))}
          />
        </Field>

        <Field
          id={ids.bio}
          label="Bio"
          hint={`${bio.length}/${PROFILE_LIMITS.bio}`}
          error={save.fieldErrors.bio}
        >
          <textarea
            id={ids.bio}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={PROFILE_LIMITS.bio}
            rows={6}
            placeholder="What you do, who you've done it for, and how you like to work. Write it the way you'd say it on a call."
            className={inputClass(Boolean(save.fieldErrors.bio), "resize-y leading-[1.55]")}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={ids.country} label="Country" error={save.fieldErrors.countryCode}>
            <select
              id={ids.country}
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className={inputClass(Boolean(save.fieldErrors.countryCode), "appearance-none")}
            >
              <option value="">Select a country</option>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field id={ids.city} label="City" hint="Optional" error={save.fieldErrors.city}>
            <input
              id={ids.city}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Casablanca"
              className={inputClass(Boolean(save.fieldErrors.city))}
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <Field
            id={ids.rate}
            label="Hourly rate"
            hint="USD"
            error={save.fieldErrors.hourlyRateCents}
          >
            <div className="relative">
              <span className="text-ink-mute pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[14.5px]">
                $
              </span>
              <input
                id={ids.rate}
                type="number"
                inputMode="decimal"
                min={1}
                max={1000}
                step="0.5"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="12"
                className={inputClass(Boolean(save.fieldErrors.hourlyRateCents), "pl-7")}
              />
            </div>
          </Field>
          <Field
            id={ids.hours}
            label="Hours per week"
            error={save.fieldErrors.hoursPerWeek}
          >
            <input
              id={ids.hours}
              type="number"
              inputMode="numeric"
              min={1}
              max={PROFILE_LIMITS.hoursPerWeekMax}
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="40"
              className={inputClass(Boolean(save.fieldErrors.hoursPerWeek))}
            />
          </Field>
          <Field
            id={ids.availability}
            label="Availability"
            error={save.fieldErrors.availability}
          >
            <select
              id={ids.availability}
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className={inputClass(Boolean(save.fieldErrors.availability), "appearance-none")}
            >
              <option value="">Select</option>
              {AVAILABILITY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      <SectionFooter
        pending={save.pending}
        saved={save.saved}
        error={save.error}
        onSave={handleSave}
      />
    </SectionCard>
  );
}

/* -------------------------------------------------------------------------- */
/* Photo                                                                      */
/* -------------------------------------------------------------------------- */

function PhotoField({
  profile,
  onSaved,
}: {
  profile: CandidateProfileDto;
  onSaved: (view: CandidateProfileViewDto) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file || pending) return;
    setPending(true);
    setError(null);
    try {
      const result = await candidateProfileApi.upload("avatar", file);
      if (result.view) onSaved(result.view);
    } catch (err) {
      setError(
        err instanceof ApiClientError
          ? (err.fields.file ?? err.message)
          : "Upload failed. Please try again.",
      );
    } finally {
      setPending(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-center gap-5">
      <div className="relative">
        {profile.photoUrl ? (
          // Plain <img>: the URL is a Supabase public bucket, not a Next-optimised asset.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.photoUrl}
            alt=""
            className="border-line h-[88px] w-[88px] rounded-full border object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="bg-cream-deep text-ink grid h-[88px] w-[88px] place-items-center rounded-full text-[26px] font-semibold"
          >
            {initialsOf(profile.fullName)}
          </div>
        )}
        {pending && (
          <div className="bg-paper/70 absolute inset-0 grid place-items-center rounded-full">
            <Loader2 className="h-5 w-5 animate-spin" strokeWidth={1.8} aria-hidden="true" />
          </div>
        )}
      </div>
      <div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          id="profile-photo-input"
          onChange={(e) => void handleFile(e.target.files?.[0])}
        />
        <label
          htmlFor="profile-photo-input"
          className={cn(
            "btn btn-outline inline-flex cursor-pointer items-center gap-2 text-[13px]",
            pending && "pointer-events-none opacity-60",
          )}
        >
          <Camera className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
          {profile.photoUrl ? "Change photo" : "Upload photo"}
        </label>
        <p className="text-ink-mute mt-2 text-[12px]">
          JPEG, PNG or WebP · up to 5 MB · a plain background reads best.
        </p>
        {error && (
          <p role="alert" className="text-danger mt-1.5 text-[12.5px]">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
