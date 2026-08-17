import type { CandidateProfile } from '@/lib/mock-data/admin/candidate-profiles-data';

interface CandidateRailQuickFactsProps {
  profile: CandidateProfile;
}

export function CandidateRailQuickFacts({ profile }: CandidateRailQuickFactsProps) {
  const facts = [
    { label: 'Atlas ID', value: profile.atlasId },
    { label: 'Joined', value: profile.quickFacts.joinedDate },
    { label: 'Cohort', value: profile.cohortBadge || '—' },
    { label: 'Specialist', value: profile.specialist },
    { label: 'Region', value: profile.region },
    { label: 'Time zone', value: profile.quickFacts.timezoneShort },
    { label: 'Languages', value: profile.quickFacts.languagesShort },
    { label: 'Last seen', value: profile.lastActive, isLastSeen: true },
  ];

  return (
    <div className="bg-[var(--color-paper)] border border-[var(--color-line)]
                    rounded-[var(--radius-md)] p-[14px_16px]">
      <h4 className="font-mono text-[10px] tracking-[0.16em] uppercase
                     text-[var(--color-ink-mute)] font-semibold
                     mb-[10px] pb-[8px]
                     border-b border-dashed border-[var(--color-line-soft)]">
        Quick facts
      </h4>
      <dl className="m-0 grid grid-cols-[auto_1fr] gap-[6px_12px]">
        {facts.map((fact, i) => (
          <div key={i} className="contents">
            <dt className="font-mono text-[10px] tracking-[0.08em] uppercase
                          text-[var(--color-ink-mute)]">
              {fact.label}
            </dt>
            <dd
              className={`m-0 font-mono text-[11.5px] tracking-[0.01em] font-medium
                         ${
                           fact.isLastSeen && profile.lastActiveType === 'fresh'
                             ? 'text-[var(--color-success)]'
                             : 'text-[var(--color-ink)]'
                         }`}
            >
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
