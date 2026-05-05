import { Clock } from "lucide-react";
import { snapshot } from "@/lib/mock-data/specialist/dashboard-kpis";

const SUBMITTED = snapshot.dailySubmission === "Submitted";

export function DailyActivityCard() {
  return (
    <div className="bg-paper border-line rounded-md border px-4 py-4">
      <div className="text-ink-mute mb-3 flex items-center justify-between gap-2 font-mono text-[9.5px] tracking-[0.16em] uppercase">
        <span>Today&rsquo;s daily activity</span>
        <span className="text-ink-mute font-body text-[12px] tracking-normal normal-case">
          Due 11:59 PM
        </span>
      </div>
      <div
        className={[
          "mb-3 flex items-center gap-2.5 rounded-sm px-3.5 py-3",
          SUBMITTED ? "bg-success-bg" : "bg-cream",
        ].join(" ")}
      >
        <span
          aria-hidden="true"
          className={[
            "grid h-7 w-7 flex-shrink-0 place-items-center rounded-full",
            SUBMITTED
              ? "bg-success text-paper"
              : "bg-paper text-ink-mute border-line border border-dashed",
          ].join(" ")}
        >
          <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
        </span>
        <div className="text-[13px]">
          <strong className="text-ink mb-px block font-semibold">
            {SUBMITTED ? "Submitted" : "Pending submission"}
          </strong>
          <span className="text-ink-mute text-[11.5px]">
            Logs reviews, disputes, and outreach
          </span>
        </div>
      </div>
      <button
        type="button"
        className="bg-ink text-paper hover:bg-black w-full cursor-pointer rounded-full px-4 py-2.5 text-center text-[13px] font-medium transition-colors"
      >
        {SUBMITTED ? "View today's log" : "Submit now"}
      </button>
    </div>
  );
}
