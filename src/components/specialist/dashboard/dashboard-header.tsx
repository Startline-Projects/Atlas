/**
 * Dashboard greeting + meta row + three quick-stat pills.
 *
 * Source: HTML lines 14150–14175. Today's date is rendered statically
 * from a hardcoded ISO string so the dashboard renders deterministically
 * during SSR; future sessions can replace this with `new Date()`.
 */
import { currentUser } from "@/lib/mock-data/specialist/current-user";
import {
  quickStats,
  systemStatus,
} from "@/lib/mock-data/specialist/dashboard-kpis";

const VALUE_TONE_CLASS: Record<NonNullable<(typeof quickStats)[number]["tone"]>, string> = {
  attn: "text-amber",
  urgent: "text-danger",
};

const TODAY_LABEL = "Thursday, April 30";

export function DashboardHeader() {
  return (
    <header className="border-line-soft mb-8 grid items-end gap-6 border-b pb-6 md:grid-cols-[1fr_auto]">
      <div>
        <h1 className="font-display text-[clamp(32px,4.2vw,44px)] leading-[1.05] tracking-[-0.02em] font-normal mb-2">
          Welcome back,{" "}
          <em
            className="font-display"
            style={{ fontVariationSettings: '"opsz" 144' }}
          >
            {currentUser.firstName}
          </em>
          .
        </h1>
        <div className="text-ink-soft flex flex-wrap items-center gap-3.5 text-[13.5px]">
          <span>{TODAY_LABEL}</span>
          <span
            aria-hidden="true"
            className="bg-ink-mute inline-block h-[3px] w-[3px] rounded-full"
          />
          <span
            className={[
              "inline-flex items-center gap-2 rounded-full py-1 pr-2.5 pl-2 text-[12.5px] font-medium",
              systemStatus.level === "ok"
                ? "bg-success-bg text-success"
                : "bg-amber/12 text-amber",
            ].join(" ")}
          >
            <span
              aria-hidden="true"
              className={[
                "inline-block h-1.5 w-1.5 animate-pulse rounded-full",
                systemStatus.level === "ok" ? "bg-success" : "bg-amber",
              ].join(" ")}
            />
            {systemStatus.label}
          </span>
        </div>
      </div>
      <ul className="flex items-stretch gap-5 md:gap-6">
        {quickStats.map((stat) => (
          <li key={stat.key} className="text-right">
            <span className="text-ink-mute mb-0.5 block font-mono text-[9.5px] tracking-[0.14em] uppercase">
              {stat.label}
            </span>
            <span
              className={[
                "font-display text-[22px] leading-none font-medium",
                stat.tone ? VALUE_TONE_CLASS[stat.tone] : "text-ink",
              ].join(" ")}
            >
              {stat.value}
            </span>
          </li>
        ))}
      </ul>
    </header>
  );
}
