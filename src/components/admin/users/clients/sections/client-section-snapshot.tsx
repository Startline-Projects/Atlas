import { Fragment } from 'react';
import type { ClientProfile } from '@/lib/mock-data/admin/client-profiles-data';

interface ClientSectionSnapshotProps {
  profile: ClientProfile;
}

export function ClientSectionSnapshot({ profile }: ClientSectionSnapshotProps) {
  const snapshot = profile.snapshot;

  if (!snapshot) {
    return null;
  }

  const { about, companyDetails, categories, trustTier, reviews } = snapshot;

  // Trust-tier badge styling per admin.html lines 6952-6988
  const tierBadgeBase =
    'inline-flex items-center gap-[5px] font-mono text-[11px] tracking-[0.14em] uppercase pt-[3px] pb-[3px] pl-[8px] pr-[9px] rounded-full font-semibold border';
  const tierBadgeClass =
    trustTier?.tier === 'top-client'
      ? `${tierBadgeBase} bg-[linear-gradient(135deg,rgba(240,204,79,0.4)_0%,rgba(232,145,30,0.25)_100%)] text-[#8B5A1B] border-[rgba(184,145,30,0.4)]`
      : trustTier?.tier === 'trusted'
        ? `${tierBadgeBase} bg-[var(--navy-bg)] text-[var(--navy)] border-[rgba(46,70,105,0.2)]`
        : `${tierBadgeBase} bg-[var(--cream-deep)] text-[var(--ink-soft)] border-[var(--line)]`;

  // Tier icon as child span (avoids Tailwind escape issues with non-ASCII before:content)
  const tierIcon =
    trustTier?.tier === 'top-client' ? (
      <span className="text-[#B8911E] text-[11px]" aria-hidden="true">♛</span>
    ) : trustTier?.tier === 'trusted' ? (
      <span className="text-[var(--navy)] font-bold" aria-hidden="true">✓</span>
    ) : (
      <span className="text-[var(--ink-mute)]" aria-hidden="true">✦</span>
    );

  return (
    // admin.html line 17504: <section class="cd-section" id="cl-section-profile">
    <section
      id="cl-section-profile"
      className="border-t border-[var(--line)] py-[36px] scroll-mt-[80px] first:border-t-0 first:pt-[12px]"
    >
      {/* admin.html line 17505: <div class="cd-section-head"> */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        {/* admin.html line 17506: <div class="head-left"> */}
        <div className="flex items-baseline gap-[14px] min-w-0">
          {/* admin.html line 17507: <span class="cd-section-num"> */}
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            03 · 08
          </span>
          {/* admin.html line 17508: <h2> */}
          <h2 className="font-display [font-variation-settings:'opsz'_96] text-[24px] font-medium tracking-[-0.02em] leading-[1.1]">
            Profile snapshot
          </h2>
        </div>

        {/* admin.html line 17510: <button class="cd-action-btn" data-cl-action="open-public-profile"> */}
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[5px] pl-[12px] pr-[12px] bg-[var(--paper)] border border-[var(--line)] rounded-full font-body text-[11.5px] font-medium text-[var(--ink-soft)] cursor-pointer transition-all duration-[150ms] ease whitespace-nowrap hover:bg-[var(--cream-deep)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
        >
          Open public profile →
        </button>
      </div>

      {/* admin.html line 17515: <div class="cd-snap"> */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        {/* Block 1 — About (admin.html lines 17517-17523) */}
        {about && (
          <div className="px-[22px] py-[18px] border-b border-dashed border-[var(--line-soft)] last:border-b-0">
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold mb-[10px]">
              About · public-facing
            </div>
            <div className="text-[13.5px] leading-[1.55] text-[var(--ink)]">
              <em className="font-display italic font-medium">{about.tagline}</em>
              {' '}
              {about.description}
            </div>
          </div>
        )}

        {/* Block 2 — Company details (admin.html lines 17525-17553) */}
        {companyDetails && companyDetails.length > 0 && (
          <div className="px-[22px] py-[18px] border-b border-dashed border-[var(--line-soft)] last:border-b-0">
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold mb-[10px]">
              Company details
            </div>
            <dl className="grid grid-cols-2 gap-y-[12px] gap-x-[24px] max-[720px]:grid-cols-1">
              {companyDetails.map((entry, idx) => (
                <div key={idx}>
                  <dt className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] mb-[3px]">
                    {entry.label}
                  </dt>
                  <dd className="m-0 text-[13px] text-[var(--ink)] font-medium leading-[1.45]">
                    {entry.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* Block 3 — Categories hired for (admin.html lines 17555-17565) */}
        {categories && categories.length > 0 && (
          <div className="px-[22px] py-[18px] border-b border-dashed border-[var(--line-soft)] last:border-b-0">
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold mb-[10px]">
              Categories hired for
            </div>
            <div className="flex flex-wrap gap-[6px]">
              {categories.map((tag, idx) => (
                <span
                  key={idx}
                  className={`inline-flex items-center gap-[5px] px-[10px] py-[4px] text-[12px] rounded-full ${
                    tag.highlighted
                      ? 'bg-[rgba(214,242,77,0.4)] text-[var(--ink)] font-semibold'
                      : 'bg-[var(--cream-deep)] text-[var(--ink-soft)] font-medium'
                  }`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Block 4 — Trust tier earned (admin.html lines 17567-17575) */}
        {trustTier && (
          <div className="px-[22px] py-[18px] border-b border-dashed border-[var(--line-soft)] last:border-b-0">
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold mb-[10px]">
              Trust tier earned
            </div>
            <div className="flex items-center gap-[14px] flex-wrap">
              {/* admin.html line 17570: <span class="trust-tier-badge ..."> */}
              <span className={tierBadgeClass}>
                {tierIcon}
                {trustTier.label}
              </span>
              {/* admin.html lines 17571-17573: description with inline highlights */}
              <div className="text-[12.5px] text-[var(--ink-soft)] leading-[1.5] flex-1 min-w-0">
                {trustTier.descriptionParts.map((part, idx) => {
                  if (part.variant === 'ink') {
                    return (
                      <strong key={idx} className="text-[var(--ink)] font-semibold">
                        {part.text}
                      </strong>
                    );
                  }
                  if (part.variant === 'success') {
                    return (
                      <strong key={idx} className="text-[var(--success)] font-semibold">
                        {part.text}
                      </strong>
                    );
                  }
                  return <span key={idx}>{part.text}</span>;
                })}
              </div>
            </div>
          </div>
        )}

        {/* Block 5 — Public reviews (admin.html lines 17577-17595) */}
        {reviews && reviews.cards.length > 0 && (
          <div className="px-[22px] py-[18px] border-b border-dashed border-[var(--line-soft)] last:border-b-0">
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold mb-[10px]">
              Public reviews from talent · {reviews.summary}
            </div>
            <div className="flex flex-col gap-[12px]">
              {reviews.cards.map((card, idx) => (
                // admin.html line 17580: <div class="cd-review-card">
                <div
                  key={idx}
                  className="p-[14px] bg-[var(--paper-deep)] rounded-[var(--r-sm)] border-l-[3px] border-[var(--lime-deep)]"
                >
                  {/* admin.html line 17581: <div class="review-head"> */}
                  <div className="flex items-center justify-between mb-[8px] flex-wrap gap-[8px]">
                    {/* admin.html line 17582: <span class="review-stars"> */}
                    <span className="inline-flex gap-[1px] text-[var(--amber)] text-[13px] tracking-[1px]">
                      {Array.from({ length: card.stars }).map((_, sIdx) => (
                        <Fragment key={sIdx}>★</Fragment>
                      ))}
                    </span>
                    {/* admin.html line 17583: <span class="review-author"> */}
                    <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
                      {card.author} · {card.date}
                    </span>
                  </div>
                  {/* admin.html line 17585: <div class="review-text"> with auto smart-quotes */}
                  <div className="text-[13px] leading-[1.55] text-[var(--ink)] italic font-display before:content-['“'] after:content-['”']">
                    {card.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
