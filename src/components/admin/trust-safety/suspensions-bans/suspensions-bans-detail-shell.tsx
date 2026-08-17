import Link from 'next/link';
import type { SuspensionDetailProfile } from '@/lib/mock-data/admin/suspensions-bans-data';
import { SuspensionsBansHero } from './suspensions-bans-hero';
import { SuspensionsBansRail } from './suspensions-bans-rail';
import { SbAppealWorkflow } from './sections/sb-appeal-workflow';
import { SbReasonAudit } from './sections/sb-reason-audit';
import { SbNotifications } from './sections/sb-notifications';
import { SbCommunicationThread } from './sections/sb-communication-thread';
import { SbInternalNotes } from './sections/sb-internal-notes';

interface SuspensionsBansDetailShellProps {
  profile: SuspensionDetailProfile;
}

export function SuspensionsBansDetailShell({ profile }: SuspensionsBansDetailShellProps) {
  // Section numbering shifts if there's no appeal workflow
  const hasAppeal = !!profile.appeal;
  const num = (i: number) => String(i).padStart(2, '0');

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
        <Link
          href="/admin/trust-safety/suspensions-bans"
          className="text-[var(--ink-mute)] no-underline hover:text-[var(--ink)] cursor-pointer transition-colors duration-[120ms]"
        >
          {profile.status === 'banned' ? 'Banned' : profile.status === 'suspended' ? 'Suspended' : profile.status === 'auto-lifted' ? 'Auto-lifted' : profile.status === 'expired' ? 'Served' : 'Lifted'}
        </Link>
        <span className="text-[var(--ink-mute)] opacity-50">›</span>
        <span className="text-[var(--ink)] font-semibold">
          {profile.atlasId} · {profile.accountName}
        </span>
      </div>

      <SuspensionsBansHero profile={profile} />

      {/* 2-col body */}
      <div className="grid grid-cols-[minmax(0,1fr)_320px] max-[1100px]:grid-cols-1 gap-[24px] items-start">
        <main className="min-w-0">
          {hasAppeal && profile.appeal && <SbAppealWorkflow appeal={profile.appeal} />}
          <SbReasonAudit
            reasonSummary={profile.reasonSummary}
            auditChain={profile.auditChain}
            sectionNum={num(hasAppeal ? 2 : 1)}
          />
          <SbNotifications notifications={profile.notifications} sectionNum={num(hasAppeal ? 3 : 2)} />
          <SbCommunicationThread messages={profile.commThread} sectionNum={num(hasAppeal ? 4 : 3)} />
          <SbInternalNotes notes={profile.internalNotes} sectionNum={num(hasAppeal ? 5 : 4)} />
        </main>

        <SuspensionsBansRail profile={profile} />
      </div>
    </div>
  );
}
