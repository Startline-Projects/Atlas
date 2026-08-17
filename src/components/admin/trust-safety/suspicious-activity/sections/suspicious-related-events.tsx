import Link from 'next/link';
import type { SuspiciousRelatedEvent } from '@/lib/mock-data/admin/suspicious-activity-data';
import { SuspiciousSignalMeter } from '../suspicious-signal-meter';

interface SuspiciousRelatedEventsProps {
  related: SuspiciousRelatedEvent[];
}

export function SuspiciousRelatedEvents({ related }: SuspiciousRelatedEventsProps) {
  return (
    <section className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[20px_24px] mb-[16px]">
      {/* Section head with dashed bottom border */}
      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[16px] pb-[12px] border-b border-dashed border-b-[var(--line-soft)]">
        <div className="flex items-baseline gap-[10px]">
          <span className="font-mono text-[9.5px] tracking-[0.06em] bg-[var(--cream-deep)] text-[var(--ink-mute)] px-[6px] py-[2px] rounded-[3px] font-bold">
            03
          </span>
          <div>
            <h2 className="font-display text-[18px] font-medium tracking-[-0.01em] text-[var(--ink)] leading-[1.2] m-0">
              Related events
            </h2>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[4px]">
              other events from this account or matching the cluster pattern · last 24h
            </div>
          </div>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all flex-shrink-0"
        >
          Open full cluster (cluster 2026-04-A) →
        </button>
      </div>

      <div className="flex flex-col gap-[8px]">
        {related.map((event) => (
          <Link
            key={event.id}
            href={`/admin/trust-safety/suspicious-activity/${event.id}`}
            className="grid grid-cols-[minmax(0,1fr)_110px_80px_30px] max-[720px]:grid-cols-1 gap-[10px] items-center p-[10px_14px] bg-[var(--paper-deep)] border border-[var(--line-soft)] rounded-[var(--r-sm)] cursor-pointer transition-all duration-[120ms] hover:border-[var(--line-strong)] hover:bg-[var(--paper)]"
          >
            <div className="min-w-0">
              <div className="text-[12.5px] font-semibold text-[var(--ink)] tracking-[-0.01em] whitespace-nowrap overflow-hidden text-ellipsis">
                {event.title}
              </div>
              <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
                {event.detail}
              </div>
            </div>
            <div>
              <SuspiciousSignalMeter strength={event.strength} label={event.strengthLabel} />
            </div>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] text-right max-[720px]:text-left">
              {event.time}
            </div>
            <div className="text-[var(--ink-mute)] grid place-items-center max-[720px]:justify-self-start">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
