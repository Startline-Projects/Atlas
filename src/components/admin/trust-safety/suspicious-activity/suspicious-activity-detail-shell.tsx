import Link from 'next/link';
import type { SuspiciousActivityProfile } from '@/lib/mock-data/admin/suspicious-activity-data';
import { SuspiciousActivityHero } from './suspicious-activity-hero';
import { SuspiciousActivityRail } from './suspicious-activity-rail';
import { SuspiciousPatternCard } from './sections/suspicious-pattern-card';
import { SuspiciousEventDetails } from './sections/suspicious-event-details';
import { SuspiciousConfidenceBreakdown } from './sections/suspicious-confidence-breakdown';
import { SuspiciousRelatedEvents } from './sections/suspicious-related-events';
import { SuspiciousInvestigatorNotes } from './sections/suspicious-investigator-notes';

interface SuspiciousActivityDetailShellProps {
  profile: SuspiciousActivityProfile;
}

export function SuspiciousActivityDetailShell({ profile }: SuspiciousActivityDetailShellProps) {
  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      {/* Breadcrumb */}
      <div className="inline-flex items-center gap-[6px] font-mono text-[11px] tracking-[0.02em] text-[var(--ink-mute)] mb-[18px]">
        <Link
          href="/admin/trust-safety/suspicious-activity"
          className="text-[var(--ink-mute)] no-underline hover:text-[var(--ink)] cursor-pointer transition-colors duration-[120ms]"
        >
          Suspicious activity
        </Link>
        <span className="text-[var(--ink-mute)] opacity-50">›</span>
        <Link
          href="/admin/trust-safety/suspicious-activity"
          className="text-[var(--ink-mute)] no-underline hover:text-[var(--ink)] cursor-pointer transition-colors duration-[120ms]"
        >
          {profile.freshness === 'new' ? 'New' : profile.freshness === 'escalated' ? 'Escalated' : profile.freshness === 'recent' ? 'Recent' : 'Older'}
        </Link>
        <span className="text-[var(--ink-mute)] opacity-50">›</span>
        <span className="text-[var(--ink)] font-semibold">
          {profile.atlasId} · {profile.candidateName} · {profile.typeLabel.toLowerCase()}
        </span>
      </div>

      <SuspiciousActivityHero profile={profile} />

      {/* 2-col body */}
      <div className="grid grid-cols-[minmax(0,1fr)_320px] max-[1100px]:grid-cols-1 gap-[24px] items-start">
        <main className="min-w-0">
          {profile.pattern && <SuspiciousPatternCard pattern={profile.pattern} />}
          <SuspiciousEventDetails rows={profile.eventDetails} mapTrail={profile.mapTrail} />
          <SuspiciousConfidenceBreakdown aiConfidence={profile.aiConfidence} features={profile.features} />
          <SuspiciousRelatedEvents related={profile.related} />
          <SuspiciousInvestigatorNotes />
        </main>

        <SuspiciousActivityRail profile={profile} />
      </div>
    </div>
  );
}
