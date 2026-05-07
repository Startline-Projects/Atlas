import { PROFILE_ADMIN, PROFILE_QUICKSTATS, PROFILE_BANNERS } from '@/lib/mock-data/admin/profile-data';

export default function ProfileHeader() {
  return (
    <>
      {/* Back row */}
      <div className="flex items-center gap-[14px] mb-5">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-[12.5px] text-ink-mute bg-transparent border-0 py-1.5 px-2.5 pl-1.5 rounded-[var(--radius-sm)] font-body cursor-pointer transition-all hover:bg-cream-deep hover:text-ink"
        >
          {/* Back arrow SVG inline */}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to dashboard
        </button>
        <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-ink-mute px-2 py-0.75 border border-line rounded-[3px] bg-paper">
          My profile · /admin/profile
        </span>
      </div>

      {/* Hero section */}
      <div className="bg-paper border border-line rounded-[var(--radius-lg)] px-8 py-7 mb-7 shadow-card relative overflow-hidden">
        {/* Gradient bar at top */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: 'linear-gradient(90deg, var(--color-lime) 0%, var(--color-amber) 50%, var(--color-danger) 100%)',
          }}
        />

        {/* Hero top grid: avatar | meta | actions */}
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-7 items-center pb-5.5">

          {/* Avatar */}
          <div className="w-[88px] h-[88px] rounded-full text-paper font-display text-[36px] font-medium flex items-center justify-center flex-shrink-0 tracking-tight" style={{ background: 'linear-gradient(135deg, #D9A77F, #8B5A3C)', boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.18)' }}>
            AO
          </div>

          {/* Meta: name + role + contact */}
          <div className="min-w-0">
            <h1 className="font-display text-[clamp(28px,3vw,34px)] font-medium tracking-tight leading-[1.05] mb-2.5 flex items-center gap-3 flex-wrap" style={{ fontVariationSettings: '"opsz" 96' }}>
              <span>{PROFILE_ADMIN.name}</span>
              <span className="inline-flex items-center gap-2 text-[10.5px] py-1 px-[11px] pl-[9px] rounded-full bg-ink text-paper font-mono font-semibold tracking-[0.12em] uppercase relative -top-0.5" data-role={PROFILE_ADMIN.roleTag}>
                <span className="w-1.5 h-1.5 rounded-full bg-lime flex-shrink-0 animate-pulse-soft" />
                {PROFILE_ADMIN.role}
              </span>
            </h1>

            {/* Contact row */}
            <div className="flex flex-wrap gap-y-1.5 gap-x-[18px] font-mono text-xs text-ink-soft tracking-tight">
              <span className="inline-flex items-center gap-1.5">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {PROFILE_ADMIN.email}
                <span className="inline-block w-[5px] h-[5px] rounded-full bg-success ml-0.5 flex-shrink-0" />
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {PROFILE_ADMIN.phone}
                <span className="inline-block w-[5px] h-[5px] rounded-full bg-success ml-0.5 flex-shrink-0" />
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {PROFILE_ADMIN.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Joined {PROFILE_ADMIN.joinedDate}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2 flex-shrink-0">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 py-2.75 px-5 border border-ink rounded-full text-[13.5px] font-medium text-ink bg-transparent cursor-pointer transition-all hover:bg-ink hover:text-paper whitespace-nowrap"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit profile
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 py-2.75 px-5 border border-ink rounded-full text-[13.5px] font-medium bg-ink text-paper cursor-pointer transition-all hover:bg-black whitespace-nowrap"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Change password
            </button>
          </div>
        </div>

        {/* Quick stats */}
        <div className="border-t border-dashed border-line grid grid-cols-4 gap-0 py-4.5">
          {PROFILE_QUICKSTATS.map((stat, idx) => (
            <div
              key={idx}
              className={`px-6 border-r border-line-soft ${idx === 0 ? 'pl-0' : ''} ${idx === 3 ? 'border-r-0 pr-0' : ''}`}
            >
              <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-ink-mute mb-1.5">
                {stat.label}
              </div>
              <div className="font-display text-lg font-medium text-ink tracking-[-0.01em] leading-[1.1] flex items-center gap-[7px]" style={{ fontVariationSettings: '"opsz" 48' }}>
                <span
                  className={`w-4 h-4 flex items-center justify-center flex-shrink-0 ${stat.status === 'ok' ? 'text-success' : 'text-ink'}`}
                  aria-hidden="true"
                >
                  {stat.status === 'ok' ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      {stat.label === 'Two-factor auth' ? (
                        <>
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          <polyline points="9 12 11 14 15 10" />
                        </>
                      ) : (
                        <polyline points="20 6 9 17 4 12" />
                      )}
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                      <polyline points="10 17 15 12 10 7" />
                      <line x1="15" y1="12" x2="3" y2="12" />
                    </svg>
                  )}
                </span>
                {stat.value}
              </div>
              <div className="font-mono text-[10.5px] tracking-[0.04em] text-ink-mute mt-1 whitespace-nowrap overflow-hidden text-ellipsis">
                {stat.meta}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Banners */}
      {PROFILE_BANNERS.map((banner) => (
        <div
          key={banner.id}
          className="flex items-start gap-3.5 px-4.5 py-3.5 rounded-[var(--radius-md)] mb-3.5 bg-amber-bg border border-[#F0BB95]"
        >
          <span className="flex-shrink-0 w-5.5 h-5.5 flex items-center justify-center text-amber mt-0.25" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </span>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-ink mb-0.5">
              {banner.title}
            </div>
            <div className="text-xs text-ink-soft leading-[1.5]">
              {banner.text}
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 ml-3 py-1.75 px-[13px] bg-ink text-paper rounded-full text-xs font-medium flex-shrink-0 whitespace-nowrap cursor-pointer transition-all hover:bg-black -mt-0.5"
          >
            Reset now
          </button>
        </div>
      ))}
    </>
  );
}
