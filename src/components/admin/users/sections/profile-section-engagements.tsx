import type { CandidateProfile } from '@/lib/mock-data/admin/candidate-profiles-data';
import { EngagementsTabs } from './engagements/engagements-tabs';

interface ProfileSectionEngagementsProps {
  profile: CandidateProfile;
}

export function ProfileSectionEngagements({ profile }: ProfileSectionEngagementsProps) {
  const activeItems = profile.engagements.items.filter((item) => item.status === 'active');
  const pastItems = profile.engagements.items.filter((item) => item.status === 'past');
  const totalHires = profile.engagements.active + profile.engagements.past;

  return (
    <section className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] first:border-t-0 first:pt-[12px]" id="cd-section-engagements">
      {/* Section header */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-medium block">04 · 09</span>
          <h2 className="font-display text-[24px] font-medium tracking-[-0.02em]">Engagement history</h2>
        </div>
        <span className="inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--success)] font-semibold px-[9px] py-[3px] rounded-full bg-[var(--success-bg)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current whitespace-nowrap">
          {totalHires > 0 ? (
            <>
              {totalHires} {totalHires === 1 ? 'hire' : 'hires'} · {profile.engagements.active} active
            </>
          ) : (
            <>0 hires</>
          )}
        </span>
      </div>

      {/* Tabs and table */}
      {totalHires > 0 ? (
        <EngagementsTabs activeItems={activeItems} pastItems={pastItems} />
      ) : (
        <div className="py-[48px] text-center">
          <div className="text-[var(--ink-mute)] text-[13px]">
            {profile.status === 'pipeline' ? (
              <>
                <div className="font-medium mb-[6px]">No engagements yet</div>
                <div className="text-[12px]">Candidate is still in the vetting pipeline. Engagement history will appear after first client hire.</div>
              </>
            ) : (
              <>
                <div className="font-medium mb-[6px]">No engagement history</div>
                <div className="text-[12px]">This candidate did not complete any engagements before account action.</div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
