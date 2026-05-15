import type { SpecialistProfile } from '@/lib/mock-data/admin/specialist-profiles-data';
import { SpecialistBackRow } from './specialist-back-row';
import { SpecialistSectionPerformance } from './sections/specialist-section-performance';
import { SpecialistSectionWorkload } from './sections/specialist-section-workload';
import { SpecialistSectionActivity } from './sections/specialist-section-activity';
import { SpecialistSectionAssignments } from './sections/specialist-section-assignments';
import { SpecialistSectionNotes } from './sections/specialist-section-notes';
import { SpecialistSectionReviews } from './sections/specialist-section-reviews';
import { SpecialistSectionHr } from './sections/specialist-section-hr';
import { SpecialistSectionAudit } from './sections/specialist-section-audit';
import { SpecialistRail } from './specialist-rail';
import { cn } from '@/lib/utils/cn';

interface SpecialistProfileShellProps {
  profile: SpecialistProfile;
}

export function SpecialistProfileShell({ profile }: SpecialistProfileShellProps) {
  // admin.html lines 4790, 7258, 4785, 4791 + spec mappings:
  // status pill variant per specialist status
  const statusPillClass =
    profile.status === 'on-track'
      ? 'bg-[var(--success-bg)] text-[var(--success)]'
      : profile.status === 'at-risk'
        ? 'bg-[rgba(232,118,58,0.18)] text-[var(--amber)]'
        : profile.status === 'off-track'
          ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
          : profile.status === 'inactive'
            ? 'bg-[var(--cream-deep)] text-[var(--ink-soft)]'
            : /* pending */ 'bg-[var(--navy-bg)] text-[var(--navy)]';

  // admin.html lines 5347, 5353-5356: banner variant by status (off-track = danger, others = amber)
  const bannerIsDanger = profile.status === 'off-track';
  const bannerBgClass = bannerIsDanger
    ? 'bg-[var(--danger-bg)] border-[rgba(194,65,43,0.2)]'
    : 'bg-[var(--amber-bg)] border-[rgba(232,118,58,0.2)]';
  const bannerIconClass = bannerIsDanger ? 'text-[var(--danger)]' : 'text-[var(--amber)]';

  return (
    <div className="mx-auto max-w-[1400px] pt-[28px] px-[32px] pb-[100px] max-[720px]:px-[16px] max-[720px]:pt-[18px]">
      {/* Back row (admin.html lines 18210-18225) */}
      <SpecialistBackRow profile={profile} />

      {/* Hero card (admin.html lines 18227-18308 + CSS 5207-5226) */}
      <div
        data-status={profile.status}
        data-spec-status={profile.status}
        data-entity="specialist"
        className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-lg)] mb-[28px] shadow-[var(--shadow-card)] relative overflow-hidden"
      >
        {/* admin.html lines 5217-5226: .cd-hero::before — 3px top accent strip, status-driven */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background:
              profile.status === 'at-risk'
                ? 'linear-gradient(90deg, var(--amber) 0%, var(--danger) 100%)'
                : profile.status === 'off-track'
                  ? 'var(--danger)'
                  : profile.status === 'inactive'
                    ? 'linear-gradient(90deg, var(--ink-mute) 0%, var(--line-strong) 100%)'
                    : profile.status === 'pending'
                      ? 'linear-gradient(90deg, var(--amber) 0%, var(--lime) 100%)'
                      : 'linear-gradient(90deg, var(--success) 0%, var(--lime) 50%, var(--amber) 100%)',
          }}
          aria-hidden="true"
        />

        {/* admin.html line 18229: <div class="cd-hero-top"> */}
        <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-[26px] items-center px-[32px] pt-[28px] pb-[22px] max-[720px]:grid-cols-1 max-[720px]:gap-[18px] max-[720px]:p-[22px]">
          {/* admin.html line 18230: <div class="cd-hero-photo">DK</div>
              CSS lines 5239-5260: photo with data-status="live" gradient */}
          <div
            className="relative w-[96px] h-[96px] rounded-full grid place-items-center font-display text-[38px] font-medium text-[var(--paper)] flex-shrink-0 tracking-[-0.02em] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.18)]"
            style={{ background: 'linear-gradient(135deg, #D9A77F, #8B5A3C)' }}
            aria-hidden="true"
          >
            {profile.initials}
            <div className="absolute inset-[-3px] rounded-full border-2 border-[var(--paper)]" aria-hidden="true" />
          </div>

          {/* admin.html line 18231: <div class="cd-hero-meta"> */}
          <div className="min-w-0">
            {/* admin.html line 18232: <h1 class="cd-hero-name"> */}
            <h1 className="font-display [font-variation-settings:'opsz'_96] text-[clamp(28px,3vw,36px)] font-medium tracking-[-0.02em] leading-[1.05] mb-[8px] flex items-center gap-[12px] flex-wrap">
              {/* admin.html line 18233 */}
              <span>{profile.name}</span>
              {/* admin.html line 18234: <span class="specialist-role-tag"> + CSS lines 7235-7255 */}
              <span className="inline-flex items-center gap-[5px] font-mono text-[9.5px] tracking-[0.14em] uppercase font-semibold pt-[3px] pb-[3px] pl-[8px] pr-[9px] rounded-full bg-[var(--ink)] text-[var(--paper)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[var(--lime)]">
                {profile.roleTag}
              </span>
            </h1>

            {/* admin.html line 18236: <div class="cd-hero-tags"> + CSS lines 5300-5322 */}
            <div className="flex flex-wrap gap-y-[5px] gap-x-[16px] font-mono text-[12px] text-[var(--ink-soft)] tracking-[0.01em] mb-[12px]">
              {/* admin.html line 18237: flag region tag */}
              <span className="inline-flex items-center gap-[6px]">
                <span className="text-[14px] leading-none" aria-hidden="true">{profile.flag}</span>
                {profile.region}
              </span>
              {/* admin.html lines 18238-18241: timezone tag with clock SVG */}
              <span className="inline-flex items-center gap-[6px]">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--ink-mute)] flex-shrink-0" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {profile.timezone}
              </span>
              {/* admin.html lines 18242-18245: languages tag with translate SVG */}
              <span className="inline-flex items-center gap-[6px]">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--ink-mute)] flex-shrink-0" aria-hidden="true">
                  <path d="m5 8 6 6" />
                  <path d="m4 14 6-6 2-3" />
                  <path d="M2 5h12" />
                  <path d="m22 22-5-10-5 10" />
                  <path d="M14 18h6" />
                </svg>
                {profile.languages}
              </span>
              {/* admin.html lines 18246-18249: tenure tag with clock SVG */}
              <span className="inline-flex items-center gap-[6px]">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--ink-mute)] flex-shrink-0" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {profile.tenure}
              </span>
            </div>

            {/* admin.html line 18251: <div class="cd-hero-status-row"> + CSS lines 5324-5339 */}
            <div className="flex items-center gap-[10px] flex-wrap">
              {/* admin.html line 18252: <span class="status-pill ..."> */}
              <span
                className={`inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold pt-[3px] pb-[3px] pl-[8px] pr-[9px] rounded-full before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[currentColor] ${statusPillClass}`}
              >
                {profile.statusLabel}
              </span>
              {/* admin.html line 18253: <span class="id-mono"> */}
              <span className="font-mono text-[10.5px] tracking-[0.04em] text-[var(--ink-mute)] bg-[var(--cream-deep)] px-[8px] py-[2px] rounded-[3px]">
                {profile.atlasId}
              </span>
              {/* admin.html line 18254: <span class="id-mono" style="navy"> */}
              <span className="font-mono text-[10.5px] tracking-[0.04em] bg-[var(--navy-bg)] text-[var(--navy)] font-semibold px-[8px] py-[2px] rounded-[3px]">
                Category: {profile.category}
              </span>
              {/* admin.html line 18255: <span class="id-mono" style="lime"> */}
              <span className="font-mono text-[10.5px] tracking-[0.04em] bg-[rgba(214,242,77,0.4)] text-[var(--ink)] font-semibold px-[8px] py-[2px] rounded-[3px]">
                Manager: {profile.manager}
              </span>
            </div>
          </div>
        </div>

        {/* Status banner (admin.html lines 18261-18269 + CSS 5342-5371). Only when statusBanner present */}
        {profile.statusBanner && (
          <div className={`flex items-start gap-[14px] px-[32px] py-[13px] border-y ${bannerBgClass}`}>
            <span className={`flex-shrink-0 mt-[2px] ${bannerIconClass}`} aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </span>
            <div className="flex-1 min-w-0 text-[13px] leading-[1.5]">
              <strong className="font-semibold text-[var(--ink)]">{profile.statusBanner.title}</strong>
              <div className="font-mono text-[11px] text-[var(--ink-mute)] mt-[4px] tracking-[0.02em]">
                {profile.statusBanner.detail}
              </div>
            </div>
          </div>
        )}

        {/* Action buttons row (admin.html lines 18272-18307 + CSS 5374-5452) */}
        <div className="flex flex-wrap gap-[6px] px-[32px] pt-[16px] pb-[20px] border-t border-dashed border-[var(--line-soft)] bg-[var(--paper-deep)]">
          {/* Message (lime) — admin.html line 18273 */}
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] bg-[var(--lime)] border border-[var(--lime)] rounded-full font-body text-[12.5px] font-medium text-[var(--ink)] cursor-pointer transition-all duration-[150ms] ease whitespace-nowrap hover:bg-[var(--lime-deep)] hover:border-[var(--lime-deep)] [&>svg]:flex-shrink-0"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Message
          </button>

          {/* Schedule 1:1 — admin.html line 18277 */}
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] bg-[var(--paper)] border border-[var(--line)] rounded-full font-body text-[12.5px] font-medium text-[var(--ink-soft)] cursor-pointer transition-all duration-[150ms] ease whitespace-nowrap hover:bg-[var(--cream-deep)] hover:border-[var(--ink)] hover:text-[var(--ink)] [&>svg]:text-[var(--ink-mute)] [&>svg]:flex-shrink-0 hover:[&>svg]:text-[var(--ink)]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Schedule 1:1
          </button>

          {/* View their dashboard — admin.html line 18281 */}
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] bg-[var(--paper)] border border-[var(--line)] rounded-full font-body text-[12.5px] font-medium text-[var(--ink-soft)] cursor-pointer transition-all duration-[150ms] ease whitespace-nowrap hover:bg-[var(--cream-deep)] hover:border-[var(--ink)] hover:text-[var(--ink)] [&>svg]:text-[var(--ink-mute)] [&>svg]:flex-shrink-0 hover:[&>svg]:text-[var(--ink)]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v6m0 10v6m11-7h-6m-10 0H1m17.66-7.66-4.24 4.24M9.17 14.83l-4.24 4.24m13.07 0-4.24-4.24M9.17 9.17 4.93 4.93" />
            </svg>
            View their dashboard
          </button>

          {/* Audit activity — admin.html line 18285 */}
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] bg-[var(--paper)] border border-[var(--line)] rounded-full font-body text-[12.5px] font-medium text-[var(--ink-soft)] cursor-pointer transition-all duration-[150ms] ease whitespace-nowrap hover:bg-[var(--cream-deep)] hover:border-[var(--ink)] hover:text-[var(--ink)] [&>svg]:text-[var(--ink-mute)] [&>svg]:flex-shrink-0 hover:[&>svg]:text-[var(--ink)]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            Audit activity
          </button>

          {/* Divider — admin.html line 18289 */}
          <div className="w-[1px] bg-[var(--line-soft)] my-[4px] mx-[6px] self-stretch" aria-hidden="true" />

          {/* Performance review (warn) — admin.html line 18290 */}
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] bg-[var(--paper)] border border-[rgba(232,118,58,0.3)] rounded-full font-body text-[12.5px] font-medium text-[var(--amber)] cursor-pointer transition-all duration-[150ms] ease whitespace-nowrap hover:bg-[var(--amber-bg)] hover:border-[var(--amber)] [&>svg]:flex-shrink-0"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            Performance review
          </button>

          {/* Coaching note — admin.html line 18294 */}
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] bg-[var(--paper)] border border-[var(--line)] rounded-full font-body text-[12.5px] font-medium text-[var(--ink-soft)] cursor-pointer transition-all duration-[150ms] ease whitespace-nowrap hover:bg-[var(--cream-deep)] hover:border-[var(--ink)] hover:text-[var(--ink)] [&>svg]:text-[var(--ink-mute)] [&>svg]:flex-shrink-0 hover:[&>svg]:text-[var(--ink)]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Coaching note
          </button>

          {/* Divider — admin.html line 18298 */}
          <div className="w-[1px] bg-[var(--line-soft)] my-[4px] mx-[6px] self-stretch" aria-hidden="true" />

          {/* Suspend (danger) — admin.html line 18299 */}
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] bg-[var(--paper)] border border-[rgba(194,65,43,0.3)] rounded-full font-body text-[12.5px] font-medium text-[var(--danger)] cursor-pointer transition-all duration-[150ms] ease whitespace-nowrap hover:bg-[var(--danger-bg)] hover:border-[var(--danger)] [&>svg]:flex-shrink-0"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <rect x="9" y="9" width="6" height="6" />
            </svg>
            Suspend
          </button>

          {/* More — admin.html line 18303 */}
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] bg-[var(--paper)] border border-[var(--line)] rounded-full font-body text-[12.5px] font-medium text-[var(--ink-soft)] cursor-pointer transition-all duration-[150ms] ease whitespace-nowrap hover:bg-[var(--cream-deep)] hover:border-[var(--ink)] hover:text-[var(--ink)] [&>svg]:flex-shrink-0"
          >
            More
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>

      {/* admin.html line 18311: 2-col cd-body grid (main 1fr / rail 280px / gap 32) — single-col when rail absent */}
      <div
        className={cn(
          'grid items-start',
          profile.rail
            ? 'grid-cols-[minmax(0,1fr)_280px] gap-[32px] max-[1100px]:grid-cols-1 max-[1100px]:gap-[24px]'
            : 'grid-cols-1'
        )}
      >
        {/* admin.html line 18314: <main class="cd-main"> */}
        <main className="min-w-0">
          {/* Section 01 — Performance summary (Phase 7c) */}
          <SpecialistSectionPerformance profile={profile} />

          {/* Section 02 — Workload & caseload (Phase 7d) */}
          <SpecialistSectionWorkload profile={profile} />

          {/* Section 03 — Daily activity audit (Phase 7e) */}
          <SpecialistSectionActivity profile={profile} />

          {/* Section 04 — Candidates & clients assigned (Phase 7f) */}
          <SpecialistSectionAssignments profile={profile} />

          {/* Section 05 — Notes (Phase 7g) */}
          <SpecialistSectionNotes profile={profile} />

          {/* Section 06 — Performance review history (Phase 7h) */}
          <SpecialistSectionReviews profile={profile} />

          {/* Section 07 — HR record (Phase 7i) */}
          <SpecialistSectionHr profile={profile} />

          {/* Section 08 — Audit log (Phase 7j) */}
          <SpecialistSectionAudit profile={profile} />
        </main>

        {/* admin.html line 19295: <aside class="cd-rail"> — TOC + Quick Facts + scroll-spy (Phase 7k) */}
        {profile.rail && <SpecialistRail rail={profile.rail} />}
      </div>
    </div>
  );
}
