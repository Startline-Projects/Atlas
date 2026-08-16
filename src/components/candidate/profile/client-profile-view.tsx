import {
  BadgeCheck,
  Clock,
  ExternalLink,
  Globe,
  GraduationCap,
  MapPin,
  Award,
} from "lucide-react";

import type { CandidateProfileDto } from "@/lib/api/dto/candidate-profile.dto";
import { roleCategoryLabel } from "@/lib/domain/candidate";
import {
  availabilityLabel,
  languageProficiencyLabel,
} from "@/lib/domain/candidate-profile";
import { cn } from "@/lib/utils/cn";

/**
 * A candidate profile as a client sees it. Presentational and framework-light
 * so the same component serves the candidate's own preview today and the
 * client's browse/detail pages when those land.
 */

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function monthLabel(ym: string) {
  const [y, m] = ym.split("-");
  const idx = Number(m) - 1;
  return `${MONTHS[idx] ?? ""} ${y}`;
}

function rateLabel(cents: number) {
  const dollars = cents / 100;
  return Number.isInteger(dollars) ? `$${dollars}` : `$${dollars.toFixed(2)}`;
}

export function ClientProfileView({
  profile,
  className,
}: {
  profile: CandidateProfileDto;
  className?: string;
}) {
  const location = [profile.city, profile.country].filter(Boolean).join(", ");

  return (
    <article className={cn("flex flex-col gap-6", className)}>
      {/* Header */}
      <header className="bg-paper border-line shadow-card rounded-xl border p-6 sm:rounded-[22px] sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          {profile.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.photoUrl}
              alt=""
              className="border-line h-[96px] w-[96px] flex-shrink-0 rounded-full border object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="bg-cream-deep text-ink grid h-[96px] w-[96px] flex-shrink-0 place-items-center rounded-full text-[28px] font-semibold"
            >
              {initialsOf(profile.fullName)}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="text-ink-mute mb-1.5 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
              {roleCategoryLabel(profile.roleCategory)}
            </div>
            <h1 className="font-display text-ink text-[30px] leading-[1.1] font-medium tracking-[-0.01em]">
              {profile.fullName}
            </h1>
            {profile.headline ? (
              <p className="text-ink-soft mt-2 text-[16px] leading-[1.45]">{profile.headline}</p>
            ) : (
              <p className="text-ink-mute mt-2 text-[14px] italic">No headline yet.</p>
            )}

            <dl className="text-ink-soft mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px]">
              {location && (
                <div className="inline-flex items-center gap-1.5">
                  <MapPin className="text-ink-mute h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                  <dt className="sr-only">Location</dt>
                  <dd>{location}</dd>
                </div>
              )}
              {profile.hoursPerWeek !== null && (
                <div className="inline-flex items-center gap-1.5">
                  <Clock className="text-ink-mute h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                  <dt className="sr-only">Hours per week</dt>
                  <dd>{profile.hoursPerWeek} hrs/week</dd>
                </div>
              )}
              {profile.languages.length > 0 && (
                <div className="inline-flex items-center gap-1.5">
                  <Globe className="text-ink-mute h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                  <dt className="sr-only">Languages</dt>
                  <dd>{profile.languages.map((l) => l.language).join(" · ")}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="flex flex-shrink-0 flex-col items-start gap-2 sm:items-end">
            {profile.hourlyRateCents !== null ? (
              <div className="text-right">
                <div className="font-display text-ink text-[30px] leading-none font-medium">
                  {rateLabel(profile.hourlyRateCents)}
                  <span className="text-ink-mute text-[14px] font-normal">/hr</span>
                </div>
              </div>
            ) : (
              <span className="text-ink-mute text-[13px] italic">Rate not set</span>
            )}
            {profile.availability && (
              <span
                className={cn(
                  "rounded-full px-3 py-1 font-mono text-[10.5px] font-bold tracking-[0.12em] uppercase",
                  profile.availability === "NOT_AVAILABLE"
                    ? "bg-cream-deep text-ink-soft"
                    : "bg-lime text-ink",
                )}
              >
                {availabilityLabel(profile.availability)}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Bio */}
      <Block title="About">
        {profile.bio ? (
          <p className="text-ink-soft text-[15px] leading-[1.65] whitespace-pre-line">{profile.bio}</p>
        ) : (
          <Empty>No bio yet.</Empty>
        )}
      </Block>

      {/* Skills */}
      <Block title="Skills & tools">
        {profile.skills.length ? (
          <ul className="flex flex-wrap gap-2">
            {profile.skills.map((s) => (
              <li
                key={s.id}
                className="border-line text-ink rounded-full border bg-[#FFFDF7] px-3 py-1 text-[13px] font-medium"
              >
                {s.name}
              </li>
            ))}
          </ul>
        ) : (
          <Empty>No skills added yet.</Empty>
        )}
      </Block>

      {/* Experience */}
      <Block title="Work history">
        {profile.experiences.length ? (
          <ol className="flex flex-col gap-5">
            {profile.experiences.map((e) => (
              <li key={e.id} className="border-line-soft border-l-2 pl-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-ink text-[16px] font-medium">
                    {e.title}
                    <span className="text-ink-mute font-normal"> · {e.company}</span>
                    {e.verified && (
                      <span className="text-success ml-2 inline-flex items-center gap-1 align-middle text-[12px] font-medium">
                        <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                        Verified
                      </span>
                    )}
                  </h3>
                  <span className="text-ink-mute font-mono text-[12px]">
                    {monthLabel(e.startDate)} — {e.isCurrent ? "Present" : e.endDate ? monthLabel(e.endDate) : ""}
                  </span>
                </div>
                {e.location && <div className="text-ink-mute mt-0.5 text-[13px]">{e.location}</div>}
                {e.description && (
                  <p className="text-ink-soft mt-2 text-[14px] leading-[1.6] whitespace-pre-line">{e.description}</p>
                )}
              </li>
            ))}
          </ol>
        ) : (
          <Empty>No roles added yet.</Empty>
        )}
      </Block>

      {/* Portfolio */}
      {profile.portfolio.length > 0 && (
        <Block title="Portfolio">
          <ul className="grid gap-4 sm:grid-cols-2">
            {profile.portfolio.map((p) => (
              <li key={p.id} className="border-line-soft overflow-hidden rounded-lg border bg-[#FFFDF7]">
                {p.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.imageUrl} alt="" className="aspect-[16/10] w-full object-cover" />
                )}
                <div className="p-4">
                  <h3 className="text-ink text-[15px] font-medium">
                    {p.linkUrl ? (
                      <a
                        href={p.linkUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 hover:underline"
                      >
                        {p.title}
                        <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
                      </a>
                    ) : (
                      p.title
                    )}
                  </h3>
                  {p.description && (
                    <p className="text-ink-soft mt-1.5 text-[13.5px] leading-[1.55]">{p.description}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Block>
      )}

      {/* Education + certifications + languages */}
      <div className="grid gap-6 md:grid-cols-2">
        <Block title="Education" icon={<GraduationCap className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />}>
          {profile.education.length ? (
            <ul className="flex flex-col gap-3">
              {profile.education.map((e) => (
                <li key={e.id}>
                  <div className="text-ink text-[14.5px] font-medium">{e.school}</div>
                  <div className="text-ink-soft text-[13.5px]">
                    {[e.degree, e.fieldOfStudy].filter(Boolean).join(", ")}
                    {(e.startYear || e.endYear) && (
                      <span className="text-ink-mute"> · {[e.startYear, e.endYear].filter(Boolean).join("–")}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>Not added.</Empty>
          )}
        </Block>

        <Block title="Certifications" icon={<Award className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />}>
          {profile.certifications.length ? (
            <ul className="flex flex-col gap-3">
              {profile.certifications.map((c) => (
                <li key={c.id}>
                  <div className="text-ink text-[14.5px] font-medium">
                    {c.credentialUrl ? (
                      <a href={c.credentialUrl} target="_blank" rel="noreferrer noopener" className="hover:underline">
                        {c.name}
                      </a>
                    ) : (
                      c.name
                    )}
                  </div>
                  <div className="text-ink-soft text-[13.5px]">
                    {[c.issuer, c.issuedYear].filter(Boolean).join(" · ")}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>Not added.</Empty>
          )}
        </Block>
      </div>

      {profile.languages.length > 0 && (
        <Block title="Languages">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {profile.languages.map((l) => (
              <li key={l.id} className="text-[14px]">
                <span className="text-ink font-medium">{l.language}</span>
                <span className="text-ink-mute"> · {languageProficiencyLabel(l.proficiency)}</span>
              </li>
            ))}
          </ul>
        </Block>
      )}
    </article>
  );
}

function Block({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-paper border-line shadow-card rounded-xl border p-6 sm:rounded-[22px] sm:p-7">
      <h2 className="text-ink-mute mb-4 inline-flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="text-ink-mute text-[13.5px] italic">{children}</p>;
}
