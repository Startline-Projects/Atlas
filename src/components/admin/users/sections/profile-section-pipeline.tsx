import type { CandidateProfile } from '@/lib/mock-data/admin/candidate-profiles-data';

interface ProfileSectionPipelineProps {
  profile: CandidateProfile;
}

export function ProfileSectionPipeline({ profile }: ProfileSectionPipelineProps) {
  const { vettingPipeline } = profile;

  if (!vettingPipeline) return null;

  return (
    <section className="py-[36px] border-t border-[var(--color-line)] scroll-mt-[80px] first:border-t-0 first:pt-[12px]" id="cd-section-pipeline">
      {/* Section heading */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--color-ink-mute)] font-medium">02 · 09</span>
          <h2 className="font-display [font-variation-settings:'opsz'_96] text-[24px] font-medium tracking-[-0.02em] leading-[1.1]">Vetting pipeline</h2>
        </div>
        <span className="inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold px-[9px] pl-[8px] py-[3px] rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)]">
          <span className="w-[5px] h-[5px] rounded-full bg-current" />
          {vettingPipeline.complete} of {vettingPipeline.total} complete
        </span>
      </div>

      {/* Pipeline container */}
      <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] overflow-hidden py-[6px]">
        {vettingPipeline.steps.map((step, idx) => {
          const prevStatus = idx > 0 ? vettingPipeline.steps[idx - 1]?.status : null;
          const isLocked = step.status === 'locked';
          const prevIsLocked = prevStatus === 'locked';
          const connectorColor = isLocked || prevIsLocked ? 'bg-[var(--color-line-soft)]' : 'bg-[var(--color-success)]';

          const circleColor =
            step.status === 'in-progress' ? 'bg-[var(--color-amber)]' :
            step.status === 'locked' ? 'bg-[var(--color-cream-deep)]' :
            step.status === 'failed' ? 'bg-[var(--color-danger)]' :
            'bg-[var(--color-success)]';

          const circleTextColor =
            step.status === 'locked' ? 'text-[var(--color-ink-mute)]' :
            step.status === 'failed' || step.status === 'passed' ? 'text-white' :
            'text-white';

          const titleColor = step.status === 'locked' ? 'text-[var(--color-ink-mute)] font-medium' : 'text-[var(--color-ink)] font-semibold';

          return (
            <div
              key={idx}
              className="grid grid-cols-[56px_minmax(0,1fr)_auto] gap-[16px] py-[14px] px-[18px] relative cursor-pointer transition-colors duration-[120ms] ease hover:bg-[#FCF9F1]"
            >
              {/* Connector line (above step, if not first) */}
              {idx > 0 && (
                <span
                  className={`absolute left-[45px] top-[-16px] w-[2px] h-[32px] rounded-full ${connectorColor}`}
                  aria-hidden="true"
                />
              )}

              {/* Step circle */}
              <div className={`flex items-center justify-center flex-shrink-0 ml-[14px] w-[32px] h-[32px] rounded-full border-[2px] border-[var(--color-paper)] relative z-[1] font-display text-[13px] font-medium ${circleColor} ${circleTextColor} ${step.status === 'in-progress' ? 'animate-pulse-amber' : ''}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              {/* Step content (title + meta) */}
              <div className="min-w-0 pt-[2px]">
                <div className={`text-[13.5px] mb-[3px] flex items-center gap-[8px] flex-wrap ${titleColor}`}>
                  {step.title}
                  {step.score !== undefined && (
                    <span className="font-mono text-[10px] tracking-[0.04em] font-semibold bg-[var(--color-lime)] text-[var(--color-ink)] px-[6px] py-[1px] rounded-[3px]">
                      {step.score} / 100
                    </span>
                  )}
                </div>
                {(step.detail || step.meta) && (
                  <div className="font-mono text-[11px] text-[var(--color-ink-mute)] tracking-[0.02em] flex flex-wrap gap-[4px_10px]">
                    {step.detail && <span>{step.detail}</span>}
                    {step.detail && step.meta && <span className="text-[var(--color-line-strong)]">·</span>}
                    {step.meta && <span>{step.meta}</span>}
                  </div>
                )}
              </div>

              {/* Step time (right-aligned) */}
              <div className="font-mono text-[10.5px] text-[var(--color-ink-mute)] letter-spacing-[0.04em] text-right align-self-center whitespace-nowrap">
                {step.timestamp}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
