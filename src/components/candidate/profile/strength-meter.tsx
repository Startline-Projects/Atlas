"use client";

import { Check, Circle, Eye } from "lucide-react";
import Link from "next/link";

import type { ProfileStrengthDto } from "@/lib/api/dto/candidate-profile.dto";
import { cn } from "@/lib/utils/cn";

/**
 * Profile strength — score ring plus the checklist of what still earns points.
 * Each unfinished item links to its section, so the meter doubles as the
 * builder's table of contents.
 */

const SECTION_FOR_KEY: Record<string, string> = {
  photo: "basics",
  headline: "basics",
  bio: "basics",
  location: "basics",
  rate: "basics",
  hours: "basics",
  availability: "basics",
  languages: "languages",
  skills: "skills",
  experience: "experiences",
  education: "education",
  portfolio: "portfolio",
};

function tier(score: number) {
  if (score >= 85) return { label: "Strong", tone: "bg-lime text-ink" };
  if (score >= 55) return { label: "Getting there", tone: "bg-amber/20 text-ink" };
  return { label: "Just started", tone: "bg-cream-deep text-ink-soft" };
}

export function StrengthMeter({ strength }: { strength: ProfileStrengthDto }) {
  const { score, items } = strength;
  const todo = items.filter((i) => !i.done);
  const t = tier(score);

  return (
    <aside className="bg-paper border-line shadow-card rounded-xl border p-6 sm:rounded-[22px]">
      <div className="text-ink-mute mb-3 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
        {"// Profile strength"}
      </div>

      <div className="flex items-center gap-4">
        <div
          role="img"
          aria-label={`Profile strength ${score} out of 100`}
          className="relative grid h-[84px] w-[84px] flex-shrink-0 place-items-center rounded-full"
          style={{
            background: `conic-gradient(var(--color-ink) ${score * 3.6}deg, var(--color-line) 0deg)`,
          }}
        >
          <div className="bg-paper grid h-[68px] w-[68px] place-items-center rounded-full">
            <span className="font-display text-ink text-[26px] leading-none font-medium">
              {score}
            </span>
          </div>
        </div>
        <div>
          <span
            className={cn(
              "inline-block rounded-full px-3 py-1 font-mono text-[10.5px] font-bold tracking-[0.12em] uppercase",
              t.tone,
            )}
          >
            {t.label}
          </span>
          <p className="text-ink-soft mt-2 text-[13px] leading-[1.5]">
            {score === 100
              ? "Complete. Clients see everything they need to hire you."
              : `${todo.length} ${todo.length === 1 ? "step" : "steps"} left to a complete profile.`}
          </p>
        </div>
      </div>

      {todo.length > 0 && (
        <ul className="mt-5 flex flex-col gap-1.5">
          {todo.slice(0, 6).map((item) => (
            <li key={item.key}>
              <a
                href={`#${SECTION_FOR_KEY[item.key] ?? "basics"}`}
                className="text-ink-soft hover:bg-cream-deep hover:text-ink flex items-center justify-between gap-3 rounded-md px-2 py-1.5 text-[13px] transition-colors"
              >
                <span className="inline-flex items-center gap-2">
                  <Circle className="text-line h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                  {item.label}
                </span>
                <span className="text-ink-mute font-mono text-[11px]">+{item.points}</span>
              </a>
            </li>
          ))}
        </ul>
      )}

      {items.some((i) => i.done) && todo.length > 0 && (
        <p className="text-ink-mute mt-3 inline-flex items-center gap-1.5 text-[12px]">
          <Check className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          {items.filter((i) => i.done).length} of {items.length} done
        </p>
      )}

      <Link
        href="/candidate/profile/preview"
        className="btn btn-outline mt-5 inline-flex w-full items-center justify-center gap-2 text-[13px]"
      >
        <Eye className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
        Preview as a client
      </Link>
    </aside>
  );
}
