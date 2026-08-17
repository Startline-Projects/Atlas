/**
 * ManagerDashboardHeader — the Manager dashboard's greeting + meta
 * row + 3 Manager quick stats.
 *
 * Ported from `reference/manager.html` lines 19018-19056 (Manager
 * branches only). Layout mirrors the existing Specialist
 * `DashboardHeader` for visual consistency — same grid math, same
 * typography scales, same meta-row pattern.
 *
 * ## Mateo, not Miguel
 *
 * Greeting reads from `currentManager.firstName`
 * (`lib/mock-data/manager/manager-identity.ts`). The prototype's
 * "Miguel" string never reaches the rendered output. Drift-proof.
 *
 * ## Manager quick stats (3)
 *
 *   - Specialists: 10/11 (neutral)
 *   - Submitted:    9/11 (attn — amber)
 *   - Open disputes: 12  (urgent — danger)
 *
 * These are local to the header — see `manager-rail.ts` header
 * comment for why they don't live in mock data yet.
 *
 * Server Component — no state, no hooks.
 */

import { currentManager } from "@/lib/mock-data/manager/manager-identity";

const TODAY_LABEL = "Thursday, April 30";
const SYSTEM_STATUS_LABEL = "All systems normal";

type QuickStatTone = "neutral" | "attn" | "urgent";

type QuickStat = {
  label: string;
  /** Big number. */
  value: number;
  /** Optional "of N" suffix rendered in muted style. */
  suffix?: string;
  tone: QuickStatTone;
};

const QUICK_STATS: ReadonlyArray<QuickStat> = [
  { label: "Specialists", value: 10, suffix: "/11", tone: "neutral" },
  { label: "Submitted", value: 9, suffix: "/11", tone: "attn" },
  { label: "Open disputes", value: 12, tone: "urgent" },
];

const TONE_CLASS: Record<QuickStatTone, string> = {
  neutral: "text-ink",
  attn: "text-amber",
  urgent: "text-danger",
};

export function ManagerDashboardHeader() {
  return (
    <header className="border-line-soft mb-8 grid items-end gap-6 border-b pb-6 md:grid-cols-[1fr_auto]">
      <div>
        <h1 className="font-display mb-2 text-[clamp(32px,4.2vw,44px)] leading-[1.05] font-normal tracking-[-0.02em]">
          Manager view,{" "}
          <em
            className="font-display"
            style={{ fontVariationSettings: '"opsz" 144' }}
          >
            {currentManager.firstName}
          </em>
          .
        </h1>
        <div className="text-ink-soft flex flex-wrap items-center gap-3.5 text-[13.5px]">
          <span>{TODAY_LABEL}</span>
          <span
            aria-hidden="true"
            className="bg-ink-mute inline-block h-[3px] w-[3px] rounded-full"
          />
          <span className="bg-success-bg text-success inline-flex items-center gap-2 rounded-full py-1 pr-2.5 pl-2 text-[12.5px] font-medium">
            <span
              aria-hidden="true"
              className="bg-success inline-block h-1.5 w-1.5 animate-pulse rounded-full"
            />
            {SYSTEM_STATUS_LABEL}
          </span>
        </div>
      </div>
      <ul className="flex items-stretch gap-5 md:gap-6">
        {QUICK_STATS.map((stat) => (
          <li key={stat.label} className="text-right">
            <span className="text-ink-mute mb-0.5 block font-mono text-[9.5px] tracking-[0.14em] uppercase">
              {stat.label}
            </span>
            <span
              className={`font-display text-[22px] leading-none font-medium ${TONE_CLASS[stat.tone]}`}
            >
              {stat.value}
              {stat.suffix ? (
                <span className="text-ink-mute text-[13px] font-normal">
                  {stat.suffix}
                </span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>
    </header>
  );
}
