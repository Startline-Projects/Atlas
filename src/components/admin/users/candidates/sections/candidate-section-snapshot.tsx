import type { CandidateProfile } from '@/lib/mock-data/admin/candidate-profiles-data';

interface CandidateSectionSnapshotProps {
  profile: CandidateProfile;
}

export function CandidateSectionSnapshot({ profile }: CandidateSectionSnapshotProps) {
  const { profileSnapshot } = profile;

  if (!profileSnapshot) return null;

  return (
    <section className="py-[36px] border-t border-[var(--color-line)] scroll-mt-[80px] first:border-t-0 first:pt-[12px]" id="cd-section-profile">
      {/* Section heading */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--color-ink-mute)] font-medium">03 · 09</span>
          <h2 className="font-display [font-variation-settings:'opsz'_96] text-[24px] font-medium tracking-[-0.02em] leading-[1.1]">Profile snapshot</h2>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[5px] px-[12px] font-body text-[11.5px] font-medium bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full text-[var(--color-ink-soft)] cursor-pointer transition-all duration-[150ms] ease whitespace-nowrap hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] hover:bg-[var(--color-cream-deep)]"
          data-cd-action="open-public-profile"
        >
          Open public profile →
        </button>
      </div>

      {/* Profile snapshot container */}
      <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] overflow-hidden">
        {/* Tagline & Bio block */}
        <div className="py-[18px] px-[22px] border-b border-dashed border-[var(--color-line-soft)]">
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-ink-mute)] font-semibold mb-[10px]">
            Tagline &amp; Bio
          </div>
          <div className="text-[13.5px] leading-[1.55] text-[var(--color-ink)]">
            <em className="font-display italic font-medium">"{profileSnapshot.bio.substring(0, profileSnapshot.bio.indexOf('"') > 0 ? profileSnapshot.bio.indexOf('"') : 50)}{profileSnapshot.bio.includes('"') ? '"' : ''}</em>
            {profileSnapshot.bio.includes('"') ? profileSnapshot.bio.substring(profileSnapshot.bio.indexOf('"') + 1) : profileSnapshot.bio}
          </div>
        </div>

        {/* Rate & Availability block */}
        <div className="py-[18px] px-[22px] border-b border-dashed border-[var(--color-line-soft)]">
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-ink-mute)] font-semibold mb-[10px]">
            Rate &amp; Availability
          </div>
          <div className="grid grid-cols-3 gap-[14px] max-[720px]:grid-cols-1">
            <div>
              <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--color-ink-mute)] mb-[4px]">Hourly rate</div>
              <div className="font-display [font-variation-settings:'opsz'_48] text-[18px] font-medium text-[var(--color-ink)] tracking-[-0.01em]">
                <span className="text-[12px] text-[var(--color-ink-mute)] font-mono font-normal">$</span>
                {profileSnapshot.hourlyRate.replace('$', '').replace('/hr', '')}
                <span className="text-[12px] text-[var(--color-ink-mute)] font-mono font-normal">/hr</span>
              </div>
            </div>
            <div>
              <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--color-ink-mute)] mb-[4px]">Hours per week</div>
              <div className="font-display [font-variation-settings:'opsz'_48] text-[18px] font-medium text-[var(--color-ink)] tracking-[-0.01em]">
                {profileSnapshot.hoursPerWeek}
                <span className="text-[12px] text-[var(--color-ink-mute)] font-mono font-normal"> hrs</span>
              </div>
            </div>
            <div>
              <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--color-ink-mute)] mb-[4px]">Available from</div>
              <div className="font-display [font-variation-settings:'opsz'_48] text-[18px] font-medium text-[var(--color-ink)] tracking-[-0.01em]">
                {profileSnapshot.availableFrom}
              </div>
            </div>
          </div>
        </div>

        {/* Skills block */}
        <div className="py-[18px] px-[22px] border-b border-dashed border-[var(--color-line-soft)]">
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-ink-mute)] font-semibold mb-[10px]">
            Skills
          </div>
          <div className="flex flex-wrap gap-[6px]">
            {profileSnapshot.skills.map((skill) => (
              <span
                key={skill.name}
                className={`inline-flex items-center gap-[5px] py-[4px] px-[10px] text-[12px] rounded-full font-medium ${
                  skill.highlighted
                    ? 'bg-[rgba(214,242,77,0.4)] text-[var(--color-ink)] font-semibold'
                    : 'bg-[var(--color-cream-deep)] text-[var(--color-ink-soft)]'
                }`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* Tools block */}
        <div className="py-[18px] px-[22px] border-b border-dashed border-[var(--color-line-soft)]">
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-ink-mute)] font-semibold mb-[10px]">
            Tools
          </div>
          <div className="flex flex-wrap gap-[6px]">
            {profileSnapshot.tools.map((tool) => (
              <span
                key={tool}
                className="inline-flex items-center gap-[5px] py-[4px] px-[10px] text-[12px] bg-[var(--color-cream-deep)] text-[var(--color-ink-soft)] rounded-full font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Work history block */}
        <div className="py-[18px] px-[22px] border-b border-dashed border-[var(--color-line-soft)]">
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-ink-mute)] font-semibold mb-[10px]">
            Work history (verified)
          </div>
          <div className="flex flex-col gap-[10px]">
            {profileSnapshot.workHistory.map((job, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[minmax(0,1fr)_auto] gap-[12px] items-center py-[10px] px-[12px] bg-[var(--color-paper-deep)] rounded-[var(--radius-sm)]"
              >
                <div>
                  <div className="text-[13px] font-semibold text-[var(--color-ink)]">
                    {job.role}{' '}
                    <span
                      className={`font-mono text-[9px] tracking-[0.12em] uppercase py-[2px] px-[6px] rounded-[3px] font-semibold ml-[6px] inline-block ${
                        job.verified
                          ? 'bg-[var(--color-success-bg)] text-[var(--color-success)]'
                          : 'bg-[var(--color-cream-deep)] text-[var(--color-ink-mute)]'
                      }`}
                    >
                      {job.verified ? 'Verified' : 'Unverified'}
                    </span>
                  </div>
                  <div className="text-[12px] text-[var(--color-ink-soft)] mt-[1px]">
                    {job.employer}
                  </div>
                </div>
                <div className="font-mono text-[11px] text-[var(--color-ink-mute)] text-right tracking-[0.02em] whitespace-nowrap">
                  {job.dates}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio block */}
        <div className="py-[18px] px-[22px] border-b border-dashed border-[var(--color-line-soft)]">
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-ink-mute)] font-semibold mb-[10px]">
            Portfolio ({profileSnapshot.portfolioItems} items)
          </div>
          <div className="grid grid-cols-4 gap-[8px] max-[720px]:grid-cols-2">
            {Array.from({ length: profileSnapshot.portfolioItems }).map((_, idx) => {
              const pfNum = idx + 1;
              const gradients = [
                'bg-[linear-gradient(135deg,#D9A77F,#8B5A3C)]',
                'bg-[linear-gradient(135deg,#7BA8D9,#3F6CA1)]',
                'bg-[linear-gradient(135deg,#C7CFA8,#6B8E23)]',
                'bg-[linear-gradient(135deg,#B89BD6,#6E3FE0)]',
              ];
              return (
                <div
                  key={pfNum}
                  className={`aspect-square rounded-[var(--radius-sm)] grid place-items-center cursor-pointer transition-all duration-[150ms] ease relative overflow-hidden hover:scale-[1.03] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] ${gradients[idx % 4]}`}
                  data-cd-action="open-portfolio"
                >
                  <span className="absolute top-[8px] left-[8px] font-mono text-[9px] bg-[rgba(14,14,12,0.6)] text-white py-[2px] px-[6px] rounded-[3px] tracking-[0.06em]">
                    {pfNum.toString().padStart(2, '0')}
                  </span>
                  {pfNum === 1 && (
                    <svg className="text-[rgba(255,255,255,0.7)]" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  )}
                  {pfNum === 2 && (
                    <svg className="text-[rgba(255,255,255,0.7)]" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  )}
                  {pfNum === 3 && (
                    <svg className="text-[rgba(255,255,255,0.7)]" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  )}
                  {pfNum === 4 && (
                    <svg className="text-[rgba(255,255,255,0.7)]" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Reviews block */}
        <div className="py-[18px] px-[22px]">
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-ink-mute)] font-semibold mb-[10px]">
            Public reviews · {profileSnapshot.avgRating} avg from {profileSnapshot.ratingCount} hires
          </div>
          <div className="flex flex-col gap-[12px]">
            {profileSnapshot.reviews.map((review, idx) => (
              <div
                key={idx}
                className="py-[14px] px-[14px] bg-[var(--color-paper-deep)] rounded-[var(--radius-sm)] border-l-[3px] border-[var(--color-lime-deep)]"
              >
                <div className="flex items-center justify-between mb-[8px] flex-wrap gap-[8px]">
                  <span className="inline-flex gap-[1px] text-[var(--color-amber)] text-[13px] tracking-[1px]">
                    {'★'.repeat(review.stars)}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--color-ink-mute)] tracking-[0.02em]">
                    {review.author} · {review.date}
                  </span>
                </div>
                <div className="text-[13px] leading-[1.55] text-[var(--color-ink)] italic font-display before:content-['“'] after:content-['”']">
                  {review.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
