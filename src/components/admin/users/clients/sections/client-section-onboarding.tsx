import { Fragment } from 'react';
import type { ClientProfile } from '@/lib/mock-data/admin/client-profiles-data';

interface ClientSectionOnboardingProps {
  profile: ClientProfile;
}

export function ClientSectionOnboarding({ profile }: ClientSectionOnboardingProps) {
  const onboarding = profile.onboarding;

  if (!onboarding) {
    return null;
  }

  const { sectionStatus, steps } = onboarding;

  return (
    // admin.html line 17385: <section class="cd-section" id="cl-section-onboarding">
    <section
      id="cl-section-onboarding"
      className="border-t border-[var(--line)] py-[36px] scroll-mt-[80px] first:border-t-0 first:pt-[12px]"
    >
      {/* admin.html line 17386: <div class="cd-section-head"> */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        {/* admin.html line 17387: <div class="head-left"> */}
        <div className="flex items-baseline gap-[14px] min-w-0">
          {/* admin.html line 17388: <span class="cd-section-num"> */}
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            02 · 08
          </span>

          {/* admin.html line 17389: <h2> */}
          <h2 className="font-display [font-variation-settings:'opsz'_96] text-[24px] font-medium tracking-[-0.02em] leading-[1.1]">
            Onboarding status
          </h2>
        </div>

        {/* admin.html line 17391: <span class="cd-section-status"> */}
        <span
          className={`inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold pt-[3px] pb-[3px] pl-[8px] pr-[9px] rounded-full before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[currentColor] ${
            sectionStatus.variant === 'warn'
              ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
              : sectionStatus.variant === 'neutral'
                ? 'bg-[var(--cream-deep)] text-[var(--ink-soft)]'
                : 'bg-[var(--success-bg)] text-[var(--success)]'
          }`}
        >
          {sectionStatus.label}
        </span>
      </div>

      {/* admin.html line 17394: <div class="cd-pipeline"> */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[6px] overflow-hidden">
        {steps.map((step, idx) => {
          const prevStep = idx > 0 ? steps[idx - 1] : null;
          const isLineMuted = idx > 0 && (prevStep?.status === 'locked' || step.status === 'locked');

          // step-circle classes (admin.html lines 6087-6119)
          const circleClass =
            step.status === 'in-progress'
              ? 'bg-[var(--amber)] text-white animate-pulse-amber'
              : step.status === 'locked'
                ? 'bg-[var(--cream-deep)] text-[var(--ink-mute)]'
                : step.status === 'failed'
                  ? 'bg-[var(--danger)] text-white'
                  : 'bg-[var(--success)] text-white'; // completed (default)

          // connector line color (admin.html lines 6074-6085)
          const connectorClass =
            idx > 0
              ? `before:content-[''] before:absolute before:left-[45px] before:top-[-16px] before:w-[2px] before:h-[32px] before:rounded-full ${
                  isLineMuted ? 'before:bg-[var(--line-soft)]' : 'before:bg-[var(--success)]'
                }`
              : '';

          // step-title color (admin.html line 6132 for locked variant)
          const titleClass =
            step.status === 'locked'
              ? 'text-[var(--ink-mute)] font-medium'
              : 'text-[var(--ink)] font-semibold';

          return (
            // admin.html line 17396: <div class="cd-pipeline-step">
            <div
              key={idx}
              className={`grid grid-cols-[56px_minmax(0,1fr)_auto] gap-[16px] px-[18px] py-[14px] relative transition-colors duration-[120ms] ease cursor-pointer hover:bg-[#FCF9F1] ${connectorClass}`}
            >
              {/* admin.html line 17397: <div class="step-circle"> */}
              <div
                className={`w-[32px] h-[32px] rounded-full grid place-items-center font-display text-[13px] font-medium flex-shrink-0 ml-[14px] relative z-[1] border-2 border-[var(--paper)] ${circleClass}`}
              >
                {step.status === 'locked' ? (
                  // Empty / muted circle for locked state — no SVG content
                  <span className="w-[6px] h-[6px] rounded-full bg-[currentColor]" />
                ) : (
                  // admin.html line 17398: checkmark SVG (used for completed AND in-progress)
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>

              {/* admin.html line 17400: <div class="step-content"> */}
              <div className="min-w-0 pt-[2px]">
                {/* admin.html line 17401: <div class="step-title"> */}
                <div className={`text-[13.5px] mb-[3px] flex items-center gap-[8px] flex-wrap ${titleClass}`}>
                  {step.label}
                  {step.score && (
                    // admin.html line 17447: <span class="step-score"> (Step 5 only)
                    <span className="font-mono text-[10px] tracking-[0.04em] bg-[var(--lime)] text-[var(--ink)] px-[6px] py-[1px] rounded-[3px] font-semibold">
                      {step.score}
                    </span>
                  )}
                </div>

                {/* admin.html line 17402: <div class="step-meta"> */}
                <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] flex flex-wrap gap-y-[4px] gap-x-[10px]">
                  {step.meta.map((item, mIdx) => (
                    <Fragment key={mIdx}>
                      {mIdx > 0 && (
                        // admin.html: <span class="meta-sep">·</span>
                        <span className="text-[var(--line-strong)]">·</span>
                      )}
                      <span>{item}</span>
                    </Fragment>
                  ))}
                </div>
              </div>

              {/* admin.html line 17404: <span class="step-time"> */}
              <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] text-right self-center whitespace-nowrap">
                {step.date}
                {step.time && (
                  <>
                    <br />
                    {step.time}
                  </>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
