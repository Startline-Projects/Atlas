import Link from 'next/link';
import type { SuspensionStubProfile } from '@/lib/mock-data/admin/suspensions-bans-data';
import { SuspensionStatusPill } from './suspension-status-pill';

interface SuspensionsBansStubProps {
  stub: SuspensionStubProfile;
}

const HERO_BORDER_TOP: Record<SuspensionStubProfile['heroVariant'], string> = {
  amber: 'border-t-[var(--amber)]',
  danger: 'border-t-[var(--danger)]',
  lime: 'border-t-[var(--lime-deep)]',
  success: 'border-t-[var(--success)]',
  neutral: 'border-t-[var(--ink-mute)]',
};

export function SuspensionsBansStub({ stub }: SuspensionsBansStubProps) {
  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      {/* Breadcrumb */}
      <div className="inline-flex items-center gap-[6px] font-mono text-[11px] tracking-[0.02em] text-[var(--ink-mute)] mb-[18px]">
        <Link
          href="/admin/trust-safety/suspensions-bans"
          className="text-[var(--ink-mute)] no-underline hover:text-[var(--ink)] cursor-pointer transition-colors duration-[120ms]"
        >
          Suspensions &amp; bans
        </Link>
        <span className="text-[var(--ink-mute)] opacity-50">›</span>
        <span className="text-[var(--ink)] font-semibold">
          {stub.atlasId} · {stub.accountName}
        </span>
      </div>

      {/* Minimal hero */}
      <div
        className={`bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[22px_26px] mb-[22px] relative overflow-hidden border-t-[4px] ${HERO_BORDER_TOP[stub.heroVariant]}`}
      >
        <div className="flex items-center gap-[10px] flex-wrap mb-[8px]">
          <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.04em] font-semibold">
            {stub.atlasId}
          </span>
          <SuspensionStatusPill status={stub.status} label={stub.statusLabel} />
          <span className="inline-flex items-center gap-[5px] px-[8px] py-[3px] font-mono text-[10px] font-semibold tracking-[0.04em] rounded-[4px] bg-[var(--paper-deep)] border border-[var(--line-soft)] text-[var(--ink-soft)]">
            {stub.reasonChipLabel}
          </span>
          <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">
            {stub.detectedMeta}
          </span>
        </div>

        <h1 className="font-display text-[26px] font-medium tracking-[-0.02em] mb-[6px] leading-[1.2] text-[var(--ink)]">
          {stub.title}
        </h1>

        <div className="font-mono text-[11.5px] tracking-[0.04em] text-[var(--ink-mute)] leading-[1.5]">
          <span className="text-[var(--ink-soft)] font-semibold">
            {stub.accountName} ({stub.accountId})
          </span>{' '}
          · {stub.accountRole === 'candidate' ? 'CANDIDATE' : 'CLIENT'}
        </div>
      </div>

      {/* Placeholder */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[28px_32px] text-center">
        <div className="font-display text-[16px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[6px]">
          Full appeal workflow not yet wired
        </div>
        <div className="font-mono text-[11.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5]">
          The canonical detail breakdown (appeal stepper, audit chain, notifications, communications, internal
          notes, countdown card, sanction ladder) is wired up for SB-2026-0083 (Marek Kowalczyk). Other
          sanctions are scaffolded for routing parity and will be populated in Phase 18b.
        </div>
        <div className="mt-[16px]">
          <Link
            href="/admin/trust-safety/suspensions-bans"
            className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all"
          >
            ← Back to suspensions &amp; bans
          </Link>
        </div>
      </div>
    </div>
  );
}
