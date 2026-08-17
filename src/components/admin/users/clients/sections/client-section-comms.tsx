import type { ClientProfile } from '@/lib/mock-data/admin/client-profiles-data';
import { ClientCommFilterTabs } from './communications/client-comm-filter-tabs';

interface ClientSectionCommsProps {
  profile: ClientProfile;
}

export function ClientSectionComms({ profile }: ClientSectionCommsProps) {
  const comms = profile.communications;

  if (!comms || !comms.items || comms.items.length === 0) {
    return null;
  }

  const sectionStatus = comms.sectionStatus;

  return (
    // admin.html line 17793: <section class="cd-section" id="cl-section-communications">
    <section
      id="cl-section-communications"
      className="border-t border-[var(--line)] py-[36px] scroll-mt-[80px] first:border-t-0 first:pt-[12px]"
    >
      {/* admin.html line 17794: <div class="cd-section-head"> */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            06 · 08
          </span>
          <h2 className="font-display [font-variation-settings:'opsz'_96] text-[24px] font-medium tracking-[-0.02em] leading-[1.1]">
            Communications
          </h2>
        </div>
        {/* admin.html line 17799: <span class="cd-section-status"> */}
        {sectionStatus && (
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
        )}
      </div>

      {/* Filter chips + thread list (Client Component for tab state) */}
      <ClientCommFilterTabs
        threads={comms.items}
        {...(comms.totalCaption !== undefined && { totalCaption: comms.totalCaption })}
      />
    </section>
  );
}
