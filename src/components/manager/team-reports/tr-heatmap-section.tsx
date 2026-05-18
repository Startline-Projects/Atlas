"use client";

/**
 * TrHeatmapSection — Submission heatmap.
 *
 * 11 specialist rows × 14 weekday cells. Header row shows weekday
 * letters from team.ts's canonical `HEATMAP_WEEKDAYS` pattern
 * (rendered via each day's `weekdayLetter` field).
 *
 * Cell state IS the canonical `DailyHistoryDay.intensity` field
 * (`s0` excused / `s1` missed / `s2` late / `s3` mostly on time /
 * `s4` on time) — no derivation needed. The audit-pass spec
 * locked this directly so Step 10 just renders the values.
 *
 * Mateo's row label reads "Mateo" (canonical from team.ts) — NOT
 * the prototype's "Miguel". Order matches `specialists` array
 * (Mateo first).
 *
 * Q4 lock: cells are static with `title` tooltips ("submitted on
 * time" / "missed" / etc.) — no click, no hover-card interaction.
 *
 * Specialist rows carry a ref forwarded to the orchestrator so
 * `?spec=` deep-link can scroll-into-view + ring the row.
 *
 * Ported from prototype lines 31312-31406.
 */

import { useEffect, useRef } from "react";
import { countryFlag } from "@/lib/utils/country-flag";
import {
  type DailyHistoryIntensity,
  type Specialist,
  type SpecialistId,
} from "@/lib/mock-data/manager/team";
import { cn } from "@/lib/utils/cn";

const CELL_CLASS: Record<DailyHistoryIntensity, string> = {
  s4: "bg-success",
  s3: "bg-success/70",
  s2: "bg-amber/80",
  s1: "bg-danger",
  s0: "bg-cream border border-line border-dashed",
};

const CELL_LABEL: Record<DailyHistoryIntensity, string> = {
  s4: "submitted on time",
  s3: "mostly on time",
  s2: "submitted late",
  s1: "missed",
  s0: "excused",
};

const LEGEND_ITEMS: ReadonlyArray<{ state: DailyHistoryIntensity; label: string }> = [
  { state: "s4", label: "On time" },
  { state: "s3", label: "Mostly on time" },
  { state: "s2", label: "Late" },
  { state: "s1", label: "Missed" },
  { state: "s0", label: "Excused" },
];

type TrHeatmapSectionProps = {
  specialists: ReadonlyArray<Specialist>;
  focusedSpecialistId: SpecialistId | null;
  registerRowRef: (id: SpecialistId, el: HTMLElement | null) => void;
};

export function TrHeatmapSection({
  specialists,
  focusedSpecialistId,
  registerRowRef,
}: TrHeatmapSectionProps) {
  /* Use the first specialist's history to determine weekday header
     letters — all 11 share the same 14-day pattern per audit-pass
     spec (HEATMAP_WEEKDAYS const in team.ts enforces). */
  const headerLetters = specialists[0]?.dailyHistory.map((d) => d.weekdayLetter) ?? [];

  return (
    <section className="mb-8">
      <header className="mb-3 flex items-baseline justify-between gap-3">
        <div>
          <div className="text-ink-mute font-mono text-[10px] tracking-[0.14em] uppercase">
            Daily activity
          </div>
          <h2
            className="font-display text-ink m-0 mt-0.5 text-[18px] font-medium tracking-[-0.01em]"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            Submission <em className="italic">heatmap</em>
          </h2>
        </div>
        <span className="text-ink-mute text-[12px]">
          past 14 weekdays · per Specialist
        </span>
      </header>

      <article className="bg-paper border-line rounded-md border p-5 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left text-[11px] font-normal text-ink-mute pb-2 pr-3">
                  <span className="sr-only">Specialist</span>
                </th>
                {headerLetters.map((letter, i) => (
                  <th
                    key={i}
                    scope="col"
                    className="text-ink-mute pb-2 px-1 text-center font-mono text-[10px] font-semibold tracking-[0.04em]"
                  >
                    {letter}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specialists.map((s) => (
                <HeatmapRow
                  key={s.id}
                  specialist={s}
                  isFocused={focusedSpecialistId === s.id}
                  registerRowRef={registerRowRef}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="border-line-soft mt-4 flex flex-wrap gap-4 border-t pt-3 text-[11px]">
          {LEGEND_ITEMS.map((item) => (
            <span key={item.state} className="text-ink-soft inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className={cn("inline-block h-2.5 w-2.5 rounded-sm", CELL_CLASS[item.state])}
              />
              {item.label}
            </span>
          ))}
        </div>
      </article>
    </section>
  );
}

function HeatmapRow({
  specialist: s,
  isFocused,
  registerRowRef,
}: {
  specialist: Specialist;
  isFocused: boolean;
  registerRowRef: (id: SpecialistId, el: HTMLElement | null) => void;
}) {
  const rowRef = useRef<HTMLTableRowElement>(null);
  useEffect(() => {
    registerRowRef(s.id, rowRef.current);
    return () => registerRowRef(s.id, null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <tr
      ref={rowRef}
      className={cn(
        "transition-all",
        isFocused && "outline outline-2 outline-offset-1 outline-lime",
      )}
    >
      <th
        scope="row"
        className="text-ink-soft py-1 pr-3 text-left text-[12px] font-medium whitespace-nowrap"
      >
        {s.firstName} <span aria-hidden="true">{countryFlag(s.countryCode)}</span>
      </th>
      {s.dailyHistory.map((entry, i) => {
        const tooltip = CELL_LABEL[entry.intensity];
        return (
          <td key={i} className="px-1 py-1">
            <span
              title={tooltip}
              aria-label={tooltip}
              className={cn(
                "inline-block h-3.5 w-3.5 rounded-sm transition-colors",
                CELL_CLASS[entry.intensity],
              )}
            />
          </td>
        );
      })}
    </tr>
  );
}
