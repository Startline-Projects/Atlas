import Link from 'next/link';
import type { SuspiciousActivityStubProfile } from '@/lib/mock-data/admin/suspicious-activity-data';
import { SuspiciousFreshnessPip } from './suspicious-freshness-pip';
import { SuspiciousTypePip } from './suspicious-type-pip';
import { SuspiciousSignalMeter } from './suspicious-signal-meter';

interface SuspiciousActivityStubProps {
  stub: SuspiciousActivityStubProfile;
}

export function SuspiciousActivityStub({ stub }: SuspiciousActivityStubProps) {
  return (
    <div className="max-w-[1480px] mx-auto px-[28px] py-[24px]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-[8px] font-mono text-[11px] tracking-[0.04em] text-[var(--ink-mute)] mb-[16px] flex-wrap">
        <Link
          href="/admin/trust-safety/suspicious-activity"
          className="text-[var(--ink-soft)] hover:text-[var(--ink)] cursor-pointer underline decoration-dotted"
        >
          Suspicious activity
        </Link>
        <span className="text-[var(--line-strong)]">›</span>
        <span className="text-[var(--ink)] font-semibold">
          {stub.atlasId} · {stub.candidateName}
        </span>
      </div>

      {/* Minimal hero */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[22px_26px] mb-[22px] relative overflow-hidden border-t-[4px] border-t-[var(--lime-deep)]">
        <div className="flex items-center gap-[10px] flex-wrap mb-[8px]">
          <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.04em] font-semibold">
            {stub.atlasId}
          </span>
          <SuspiciousFreshnessPip state={stub.freshness} timeText={stub.freshnessTime} />
          <SuspiciousTypePip type={stub.type} label={stub.typeLabel} />
          <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">
            Detected {stub.timestamp}
          </span>
        </div>

        <h1 className="font-display text-[26px] font-medium tracking-[-0.02em] mb-[6px] leading-[1.2] text-[var(--ink)]">
          {stub.title}
        </h1>

        <div className="font-mono text-[11.5px] tracking-[0.04em] text-[var(--ink-mute)] leading-[1.5]">
          <span className="text-[var(--ink-soft)] font-semibold">
            {stub.candidateName} ({stub.candidateId})
          </span>{' '}
          · {stub.candidateRole === 'candidate' ? 'CANDIDATE' : 'CLIENT'}
        </div>

        <div className="mt-[16px] pt-[14px] border-t border-t-[var(--line-soft)]">
          <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold mb-[6px]">
            Signal strength
          </div>
          <SuspiciousSignalMeter strength={stub.strength} label={stub.strengthLabel} />
        </div>
      </div>

      {/* Placeholder section */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[28px_32px] text-center">
        <div className="font-display text-[16px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[6px]">
          Full investigation details not yet available
        </div>
        <div className="font-mono text-[11.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5]">
          This event has a stub profile only. The canonical detail breakdown (event details, AI confidence,
          related events, investigator notes) is wired up for SA-2026-1042. Other events are scaffolded for
          routing parity.
        </div>
        <div className="mt-[16px]">
          <Link
            href="/admin/trust-safety/suspicious-activity"
            className="inline-flex items-center gap-[6px] px-[14px] py-[8px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all"
          >
            ← Back to suspicious activity feed
          </Link>
        </div>
      </div>
    </div>
  );
}
