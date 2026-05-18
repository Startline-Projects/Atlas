/**
 * DaStatusOverview — 4 status tiles computed from team.ts.
 *
 * Tile 1: Total Specialists (always 11)
 * Tile 2: Submitted count (e.g. "8/11")
 * Tile 3: Pending count (e.g. "1")
 * Tile 4: ⚠ Not submitted — name list (missed + excused specialists
 *         with "X DAYS" or "EXCUSED" tag)
 *
 * Counts derived live from each specialist's `dailyActivity.kind`.
 *
 * Ported from prototype lines 28436-28465.
 *
 * Server-renderable — no hooks.
 */

import { countryFlag } from "@/lib/utils/country-flag";
import type { Specialist } from "@/lib/mock-data/manager/team";
import { cn } from "@/lib/utils/cn";

export function DaStatusOverview({
  specialists,
}: {
  specialists: ReadonlyArray<Specialist>;
}) {
  const counts = countByStatus(specialists);
  const notSubmittedList = specialists.filter(
    (s) => s.dailyActivity.kind === "missed" || s.dailyActivity.kind === "excused",
  );

  return (
    <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Tile label="Total Specialists" num={String(specialists.length)} sub="Across 10 categories" />
      <Tile
        label="Submitted"
        num={`${counts.submitted}`}
        suffix={`/${specialists.length}`}
        sub={`${counts.submitted} on time`}
        tone="success"
      />
      <Tile
        label="Pending"
        num={String(counts.pending)}
        sub={counts.pending > 0 ? "Due 11:59 PM" : "All accounted for"}
        tone="attn"
      />
      <NotSubmittedTile specialists={notSubmittedList} />
    </section>
  );
}

/* ============================================================
   Helpers
   ============================================================ */

function countByStatus(specialists: ReadonlyArray<Specialist>) {
  let submitted = 0;
  let pending = 0;
  let missed = 0;
  let excused = 0;
  for (const s of specialists) {
    switch (s.dailyActivity.kind) {
      case "submitted": submitted += 1; break;
      case "pending": pending += 1; break;
      case "missed": missed += 1; break;
      case "excused": excused += 1; break;
    }
  }
  return { submitted, pending, missed, excused };
}

function Tile({
  label,
  num,
  suffix,
  sub,
  tone,
}: {
  label: string;
  num: string;
  suffix?: string;
  sub: string;
  tone?: "success" | "attn" | "urgent";
}) {
  const numClass =
    tone === "success" ? "text-success"
    : tone === "attn" ? "text-amber"
    : tone === "urgent" ? "text-danger"
    : "text-ink";
  return (
    <article className="bg-paper border-line flex flex-col gap-1 rounded-md border p-4">
      <div className="text-ink-mute font-mono text-[9.5px] tracking-[0.14em] uppercase">
        {label}
      </div>
      <div
        className={cn(
          "font-display text-[28px] leading-none font-medium tracking-[-0.015em]",
          numClass,
        )}
        style={{ fontVariationSettings: '"opsz" 36' }}
      >
        {num}
        {suffix ? (
          <span className="text-ink-mute ml-0.5 text-[14px] font-normal">
            {suffix}
          </span>
        ) : null}
      </div>
      <div className="text-ink-mute text-[11.5px]">{sub}</div>
    </article>
  );
}

function NotSubmittedTile({
  specialists,
}: {
  specialists: ReadonlyArray<Specialist>;
}) {
  return (
    <article className="bg-danger-bg/30 border-danger/30 flex flex-col gap-1 rounded-md border p-4">
      <div className="text-danger font-mono text-[9.5px] tracking-[0.14em] uppercase">
        ⚠ Not submitted
      </div>
      {specialists.length === 0 ? (
        <div className="text-ink-mute mt-1 text-[12px]">None — all accounted for.</div>
      ) : (
        <ul className="mt-1 flex flex-col gap-1">
          {specialists.map((s) => {
            const isExcused = s.dailyActivity.kind === "excused";
            const sinceLabel =
              s.dailyActivity.kind === "missed"
                ? `${s.dailyActivity.daysCount} DAY${s.dailyActivity.daysCount === 1 ? "" : "S"}`
                : "EXCUSED";
            return (
              <li
                key={s.id}
                className={cn(
                  "flex items-center justify-between gap-2 text-[12.5px]",
                  isExcused ? "text-ink-mute font-normal" : "text-ink font-semibold",
                )}
              >
                <span>
                  {s.fullName}{" "}
                  <span aria-hidden="true">{countryFlag(s.countryCode)}</span>
                </span>
                <span
                  className={cn(
                    "font-mono text-[9.5px] tracking-[0.08em] uppercase",
                    isExcused ? "text-ink-mute" : "text-danger",
                  )}
                >
                  {sinceLabel}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
}
