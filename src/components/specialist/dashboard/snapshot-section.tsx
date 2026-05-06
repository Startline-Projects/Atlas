import { snapshot } from "@/lib/mock-data/specialist/dashboard-kpis";
import { POOL_DEPLETION_THRESHOLD } from "@/lib/mock-data/specialist/pool-health";
import { SectionHeader } from "./section-header";

const POOL_PILL: Record<typeof snapshot.poolHealth, string> = {
  Strong: "bg-success-bg text-success",
  Stable: "bg-success-bg text-success",
  Depleted: "bg-danger-bg text-danger",
};

const DAILY_PILL: Record<typeof snapshot.dailySubmission, string> = {
  Submitted: "bg-success-bg text-success",
  Pending: "bg-amber/14 text-amber",
};

export function SnapshotSection() {
  return (
    <section className="mb-9">
      <SectionHeader
        title="Today's snapshot"
        meta={<span>Updated 2 min ago</span>}
      />
      <div className="bg-paper border-line grid grid-cols-2 gap-3 rounded-lg border p-1.5 md:grid-cols-[repeat(auto-fill,minmax(170px,1fr))]">
        <SnapCard
          label="Review queue"
          numTone="attn"
          num={snapshot.reviewQueue.count}
          detail={
            <>
              candidates · avg{" "}
              <strong className="text-ink-soft font-medium">
                {snapshot.reviewQueue.avgWaitHours}h
              </strong>{" "}
              waiting
            </>
          }
        />
        <SnapCard
          label="Active disputes"
          numTone="urgent"
          num={snapshot.disputes.open}
          detail={
            <>
              open · oldest{" "}
              <strong className="text-ink-soft font-medium">
                {snapshot.disputes.oldestWaitingHours}h
              </strong>{" "}
              waiting
            </>
          }
        />
        <SnapCard
          label="My candidates"
          num={snapshot.myCandidates.live}
          suffix="live"
          detail={
            <>
              <strong className="text-ink-soft font-medium">
                {snapshot.myCandidates.pendingAction} pending
              </strong>{" "}
              · {snapshot.myCandidates.onCallNow} on call
            </>
          }
        />
        <SnapCard
          label="Sourcing requests"
          num={snapshot.sourcingRequests}
          detail={<>from clients</>}
        />
        <SnapStatusCard
          label="Pool health"
          pillClass={POOL_PILL[snapshot.poolHealth]}
          pillLabel={snapshot.poolHealth}
          detail={
            <>
              VAs ·{" "}
              <strong className="text-ink-soft font-medium">
                {snapshot.poolLiveCount}
              </strong>{" "}
              live · threshold {POOL_DEPLETION_THRESHOLD}
            </>
          }
        />
        <SnapStatusCard
          label="Daily activity"
          pillClass={DAILY_PILL[snapshot.dailySubmission]}
          pillLabel={snapshot.dailySubmission}
          detail={
            <>
              Submit by{" "}
              <strong className="text-ink-soft font-medium">EOD</strong>
            </>
          }
        />
      </div>
    </section>
  );
}

type NumTone = "attn" | "urgent" | "success" | undefined;
const NUM_TONE: Record<Exclude<NumTone, undefined>, string> = {
  attn: "text-amber",
  urgent: "text-danger",
  success: "text-success",
};

function SnapCard({
  label,
  num,
  numTone,
  suffix,
  detail,
}: {
  label: string;
  num: number;
  numTone?: NumTone;
  suffix?: string;
  detail: React.ReactNode;
}) {
  return (
    <article className="hover:bg-cream relative rounded-md p-3.5 transition-colors">
      <span className="text-ink-mute mb-2 block font-mono text-[9.5px] tracking-[0.16em] uppercase">
        {label}
      </span>
      <span
        className={[
          "font-display mb-1.5 inline-flex items-baseline gap-1.5 text-[36px] leading-none font-normal tracking-[-0.025em]",
          numTone ? NUM_TONE[numTone] : "text-ink",
        ].join(" ")}
        style={{ fontVariationSettings: '"opsz" 144' }}
      >
        {num}
        {suffix ? (
          <span className="text-ink-mute font-body text-[13px] font-normal">
            {suffix}
          </span>
        ) : null}
      </span>
      <span className="text-ink-mute block text-[11.5px] leading-[1.45]">
        {detail}
      </span>
    </article>
  );
}

function SnapStatusCard({
  label,
  pillLabel,
  pillClass,
  detail,
}: {
  label: string;
  pillLabel: string;
  pillClass: string;
  detail: React.ReactNode;
}) {
  return (
    <article className="hover:bg-cream relative rounded-md p-3.5 transition-colors">
      <span className="text-ink-mute mb-2 block font-mono text-[9.5px] tracking-[0.16em] uppercase">
        {label}
      </span>
      <span className="font-display mb-1.5 inline-flex items-center gap-2 text-[22px] font-normal">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full py-[3px] pr-2 pl-1.5 font-body text-[12px] font-medium ${pillClass}`}
        >
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full bg-current"
          />
          {pillLabel}
        </span>
      </span>
      <span className="text-ink-mute block text-[11.5px] leading-[1.45]">
        {detail}
      </span>
    </article>
  );
}
