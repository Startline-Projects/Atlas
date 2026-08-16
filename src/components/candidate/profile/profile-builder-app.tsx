"use client";

import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { ApiClientError, candidateProfileApi } from "@/lib/api-client";
import type { CandidateProfileViewDto } from "@/lib/api/dto/candidate-profile.dto";

import { BasicsSection } from "./basics-section";
import { CertificationsSection, EducationSection } from "./education-section";
import { ExperienceSection } from "./experience-section";
import { FormBanner } from "./form-primitives";
import { LanguagesSection } from "./languages-section";
import { PortfolioSection } from "./portfolio-section";
import { SkillsSection } from "./skills-section";
import { StrengthMeter } from "./strength-meter";

/**
 * The profile builder. Loads the profile once, then each section saves
 * itself and hands back the fresh view so the strength meter stays live.
 *
 * Sections are keyed on the loaded profile id, not re-seeded on every save:
 * a section keeps its local draft while a sibling section is being edited.
 */
export function ProfileBuilderApp() {
  const [view, setView] = useState<CandidateProfileViewDto | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    candidateProfileApi
      .get()
      .then((v) => {
        if (!cancelled) setView(v);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        if (e instanceof ApiClientError && e.status === 401) {
          window.location.assign("/candidate/signin?next=/candidate/profile");
          return;
        }
        setError(
          e instanceof ApiClientError ? e.message : "Could not load your profile.",
        );
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const onSaved = useCallback((next: CandidateProfileViewDto) => setView(next), []);

  if (error) {
    return <FormBanner message={error} />;
  }

  if (!view) {
    return (
      <div className="text-ink-mute flex items-center gap-2 py-16 text-[14px]">
        <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.8} aria-hidden="true" />
        Loading your profile…
      </div>
    );
  }

  const { profile, strength } = view;

  return (
    <div className="mx-auto flex max-w-[1060px] flex-col gap-10">
      <header>
        <div className="text-ink-mute mb-3 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
          {"// Your profile"}
        </div>
        <h1 className="display mb-2 text-[clamp(34px,4.4vw,50px)] leading-[1.05]">
          Build the profile clients <span className="serif-italic">hire from</span>.
        </h1>
        <p className="text-ink-soft max-w-[620px] text-[15px] leading-[1.55]">
          Everything here is what a client sees when they open your profile. Save
          each section as you go — nothing goes live until your profile is approved.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="flex flex-col gap-8">
          <BasicsSection key={`b-${profile.id}`} profile={profile} onSaved={onSaved} />
          <SkillsSection key={`s-${profile.id}`} profile={profile} onSaved={onSaved} />
          <LanguagesSection key={`l-${profile.id}`} profile={profile} onSaved={onSaved} />
          <ExperienceSection key={`e-${profile.id}`} profile={profile} onSaved={onSaved} />
          <EducationSection key={`ed-${profile.id}`} profile={profile} onSaved={onSaved} />
          <CertificationsSection key={`c-${profile.id}`} profile={profile} onSaved={onSaved} />
          <PortfolioSection key={`p-${profile.id}`} profile={profile} onSaved={onSaved} />
        </div>

        <div className="lg:sticky lg:top-24">
          <StrengthMeter strength={strength} />
        </div>
      </div>
    </div>
  );
}
