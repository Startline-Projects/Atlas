import type { ClientProfile } from '@/lib/mock-data/admin/client-profiles-data';

interface ClientHeroProps {
  profile: ClientProfile;
}

export function ClientHero({ profile }: ClientHeroProps) {
  return (
    // admin.html line 17115: <div class="cd-hero" id="clHero" data-status="live" data-client-status="verified" data-entity="client">
    <div
      data-status={profile.status}
      data-client-status={profile.status}
      data-entity="client"
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-lg)] mb-[28px] shadow-[var(--shadow-card)] relative overflow-hidden"
    >
      {/* CSS rule from admin.html line 5217-5226: .cd-hero::before for status-based top gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{
          background:
            profile.status === 'suspended'
              ? 'linear-gradient(90deg, var(--amber) 0%, var(--danger) 100%)'
              : profile.status === 'pending'
                ? 'linear-gradient(90deg, #667599 0%, #3D4859 100%)'
                : profile.status === 'churned'
                  ? 'var(--danger)'
                  : 'linear-gradient(90deg, var(--success) 0%, var(--lime) 50%, var(--amber) 100%)',
        }}
        aria-hidden="true"
      />

      {/* admin.html line 17116: <div class="cd-hero-top"> */}
      {/* CSS rule from admin.html line 5228-5237: .cd-hero-top with responsive grid */}
      <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-[26px] items-center pt-[26px] px-[32px] pb-[22px] max-[720px]:grid-cols-1 max-[720px]:gap-[18px] max-[720px]:p-[22px]">
        {/* admin.html line 17117: <div class="cd-hero-photo" aria-hidden="true"> */}
        {/* CSS rule from admin.html line 5239-5264: .cd-hero-photo with data-status gradients */}
        <div
          className="relative w-[96px] h-[96px] rounded-full grid place-items-center font-display text-[38px] font-medium text-[var(--paper)] flex-shrink-0"
          style={{
            background:
              profile.status === 'suspended'
                ? 'linear-gradient(135deg, #DCA294, #8B4F47)'
                : profile.status === 'pending'
                  ? 'linear-gradient(135deg, #C9B8A4, #7A6B57)'
                  : profile.status === 'churned'
                    ? 'linear-gradient(135deg, #6B6B6B, #2F2F2F)'
                    : 'linear-gradient(135deg, #C9B8A4, #7A6B57)',
            boxShadow: 'inset 0 0 0 2px rgba(255, 255, 255, 0.18)',
            letterSpacing: '-0.02em',
            filter:
              profile.status === 'suspended'
                ? 'saturate(0.6)'
                : profile.status === 'churned'
                  ? 'grayscale(0.7)'
                  : 'none',
          }}
          aria-hidden="true"
        >
          {profile.initials}
          {/* CSS rule from admin.html line 5253-5259: .cd-hero-photo::after */}
          <div
            className="absolute inset-[-3px] rounded-full border-2 border-[var(--paper)]"
            aria-hidden="true"
          />
        </div>

        {/* admin.html line 17118: <div class="cd-hero-meta"> */}
        {/* CSS rule from admin.html line 5265: .cd-hero-meta */}
        <div className="min-w-0">
          {/* admin.html line 17119: <h1 class="cd-hero-name"> */}
          {/* CSS rule from admin.html line 5266-5278: .cd-hero-name */}
          <h1 className="font-display [font-variation-settings:'opsz'_96] text-[clamp(28px,3vw,36px)] font-medium tracking-[-0.02em] leading-[1.05] mb-[8px] flex items-center gap-[12px] flex-wrap">
            {/* admin.html line 17120 */}
            <span>{profile.name}</span>
            {/* admin.html line 17121: <span class="trust-tier-badge top-client"> */}
            {profile.badge && (
              <span className="inline-flex items-center gap-[5px] font-mono text-[9.5px] tracking-[0.14em] uppercase font-semibold pt-[3px] pb-[3px] pl-[8px] pr-[9px] rounded-full bg-gradient-to-br from-[rgba(240,204,79,0.4)] to-[rgba(232,145,30,0.25)] text-[#8B5A1B] border border-[rgba(184,145,30,0.4)] before:content-['♛'] before:text-[#B8911E] before:text-[11px] before:vertical-align-[-1px]">
                {profile.badge}
              </span>
            )}
          </h1>

          {/* admin.html line 17123: <div class="cd-hero-tags"> */}
          {/* CSS rule from admin.html line 5300-5322: .cd-hero-tags and .tag-item */}
          <div className="flex flex-wrap gap-[5px_16px] text-[12px] text-[var(--ink-soft)] tracking-[0.01em] mb-[12px] font-mono">
            {/* admin.html line 17124: <span class="tag-item"><span class="flag">🇩🇪</span>Germany · Berlin</span> */}
            {profile.location && (
              <span className="inline-flex items-center gap-[6px]">
                <span className="text-[14px] flex-shrink-0 leading-[1]" aria-hidden="true">
                  🇩🇪
                </span>
                {profile.location}
              </span>
            )}

            {/* admin.html line 17125-17128: timezone tag with SVG */}
            {profile.timezone && (
              <span className="inline-flex items-center gap-[6px]">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[var(--ink-mute)] flex-shrink-0"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {profile.timezone}
              </span>
            )}

            {/* admin.html line 17129-17132: industry tag with SVG */}
            {profile.industry && (
              <span className="inline-flex items-center gap-[6px]">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[var(--ink-mute)] flex-shrink-0"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
                {profile.industry}
              </span>
            )}

            {/* admin.html line 17133-17136: company size tag with SVG */}
            {profile.companySize && (
              <span className="inline-flex items-center gap-[6px]">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[var(--ink-mute)] flex-shrink-0"
                  aria-hidden="true"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                {profile.companySize}
              </span>
            )}
          </div>

          {/* admin.html line 17138: <div class="cd-hero-status-row"> */}
          {/* CSS rule from admin.html line 5324-5339: .cd-hero-status-row */}
          <div className="flex items-center gap-[10px] flex-wrap">
            {/* admin.html line 17139: <span class="status-pill verified"> */}
            {/* CSS rule from admin.html line 4761-4789: .status-pill and variants */}
            <span className="inline-flex items-center gap-[5px] pt-[3px] pb-[3px] pl-[8px] pr-[9px] rounded-full font-mono text-[9.5px] tracking-[0.1em] uppercase font-semibold whitespace-nowrap bg-[var(--success-bg)] text-[var(--success)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current before:flex-shrink-0">
              {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
            </span>

            {/* admin.html line 17140: <span class="id-mono"> */}
            {/* CSS rule from admin.html line 5330-5339: .id-mono */}
            <span className="font-mono text-[10.5px] tracking-[0.04em] text-[var(--ink-mute)] uppercase bg-[var(--cream-deep)] pt-[2px] pb-[2px] pl-[8px] pr-[8px] rounded-[3px]">
              {profile.atlasId}
            </span>

            {/* admin.html line 17141: <span class="id-mono" style="..."> */}
            {profile.specialist && (
              <span className="font-mono text-[10.5px] tracking-[0.04em] font-semibold uppercase bg-[rgba(214,242,77,0.4)] text-[var(--ink)] pt-[2px] pb-[2px] pl-[8px] pr-[8px] rounded-[3px]">
                Specialist: {profile.specialist}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* admin.html line 17147: <div class="cd-hero-banner" id="clHeroBanner" hidden> */}
      {/* CSS rule from admin.html line 5342-5371: .cd-hero-banner */}
      {profile.statusBanner && (
        <div
          className={`flex items-start gap-[14px] pt-[13px] pb-[13px] pl-[32px] pr-[32px] border-t border-b mt-[4px] ${
            profile.status === 'suspended'
              ? 'bg-[var(--danger-bg)] border-t-[rgba(194,65,43,0.2)] border-b-[rgba(194,65,43,0.2)]'
              : 'bg-[var(--amber-bg)] border-t-[rgba(232,118,58,0.2)] border-b-[rgba(232,118,58,0.2)]'
          }`}
        >
          {/* admin.html line 17148-17150: banner icon SVG */}
          <span
            className={`flex-shrink-0 mt-[2px] ${profile.status === 'suspended' ? 'text-[var(--danger)]' : 'text-[var(--amber)]'}`}
            aria-hidden="true"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </span>

          {/* admin.html line 17151-17154: banner body */}
          {/* CSS rule from admin.html line 5363-5371: .cd-hero-banner-body */}
          <div className="flex-1 min-w-0 text-[13px] leading-[1.5]">
            <strong className="font-semibold text-[var(--ink)]">{profile.statusBanner.title}</strong>
            <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] mt-[4px]">
              {profile.statusBanner.detail}
            </div>
          </div>
        </div>
      )}

      {/* admin.html line 17158: <div class="cd-hero-actions"> */}
      {/* CSS rule from admin.html line 5374-5446: .cd-hero-actions and .cd-action-btn variants */}
      <div className="flex flex-wrap gap-[6px] pt-[16px] pb-[20px] px-[32px] border-t border-dashed border-[var(--line-soft)] bg-[var(--paper-deep)]">
        {/* admin.html line 17159-17162: Message button */}
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--lime)] border border-[var(--lime)] rounded-full text-[var(--ink)] cursor-pointer transition-all duration-[150ms] ease whitespace-nowrap hover:bg-[var(--lime-deep)] hover:border-[var(--lime-deep)]"
          data-cl-action="message"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="text-[var(--ink-mute)] flex-shrink-0 transition-colors duration-[150ms] ease"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Message
        </button>

        {/* admin.html line 17163-17166: Investigate button */}
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-transparent border border-[rgba(232,118,58,0.3)] rounded-full text-[var(--amber)] cursor-pointer transition-all duration-[150ms] ease whitespace-nowrap hover:bg-[var(--amber-bg)] hover:text-[var(--amber)] hover:border-[var(--amber)]"
          data-cl-action="investigate"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="text-[var(--ink-mute)] flex-shrink-0 transition-colors duration-[150ms] ease"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          Investigate
        </button>

        {/* admin.html line 17167-17170: Refund button */}
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all duration-[150ms] ease whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)]"
          data-cl-action="refund"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="text-[var(--ink-mute)] flex-shrink-0 transition-colors duration-[150ms] ease"
          >
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          Issue refund
        </button>

        {/* admin.html line 17171: divider */}
        <div
          className="w-[1px] bg-[var(--line-soft)] my-[4px]"
          aria-hidden="true"
        />

        {/* admin.html line 17172-17175: Suspend button */}
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-transparent border border-[rgba(194,65,43,0.3)] rounded-full text-[var(--danger)] cursor-pointer transition-all duration-[150ms] ease whitespace-nowrap hover:bg-[var(--danger-bg)] hover:text-[var(--danger)] hover:border-[var(--danger)]"
          data-cl-action="suspend"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="text-[var(--ink-mute)] flex-shrink-0 transition-colors duration-[150ms] ease"
          >
            <circle cx="12" cy="12" r="10" />
            <rect x="9" y="9" width="6" height="6" />
          </svg>
          Suspend
        </button>

        {/* admin.html line 17176-17179: Add note button */}
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all duration-[150ms] ease whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)]"
          data-cl-action="add-note"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="text-[var(--ink-mute)] flex-shrink-0 transition-colors duration-[150ms] ease"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Add note
        </button>

        {/* admin.html line 17180-17183: Force logout button */}
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all duration-[150ms] ease whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)]"
          data-cl-action="force-logout"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="text-[var(--ink-mute)] flex-shrink-0 transition-colors duration-[150ms] ease"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Force log out
        </button>

        {/* admin.html line 17184-17187: More button */}
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all duration-[150ms] ease whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)]"
          data-cl-action="more"
        >
          More
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="text-[var(--ink-mute)] flex-shrink-0 transition-colors duration-[150ms] ease"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </div>
  );
}
