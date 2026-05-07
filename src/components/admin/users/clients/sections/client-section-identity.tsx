import type { ClientProfile } from '@/lib/mock-data/admin/client-profiles-data';

interface ClientSectionIdentityProps {
  profile: ClientProfile;
}

export function ClientSectionIdentity({ profile }: ClientSectionIdentityProps) {
  const identity = profile.identity;
  const kyb = identity?.kyb;
  const kyc = identity?.signatory_kyc;

  if (!identity || (!kyb && !kyc)) {
    return null;
  }

  return (
    // admin.html line 17200: <section class="cd-section" id="cl-section-identity">
    <section
      id="cl-section-identity"
      className="border-t border-[var(--line)] py-[36px] scroll-mt-[80px] first:border-t-0 first:pt-[12px]"
    >
      {/* admin.html line 17201: <div class="cd-section-head"> */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        {/* admin.html line 17202: <div class="head-left"> */}
        <div className="flex items-baseline gap-[14px] min-w-0">
          {/* admin.html line 17203: <span class="cd-section-num"> */}
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            01 · 08
          </span>

          {/* admin.html line 17204: <h2> */}
          <h2 className="font-display [font-variation-settings:'opsz'_96] text-[24px] font-medium tracking-[-0.02em] leading-[1.1]">
            Identity verification
          </h2>
        </div>

        {/* admin.html line 17206: <span class="cd-section-status"> */}
        <span
          className={`inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold pt-[3px] pb-[3px] pl-[8px] pr-[9px] rounded-full before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[currentColor] ${
            identity.sectionStatus.variant === 'warn'
              ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
              : identity.sectionStatus.variant === 'failed'
                ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
                : 'bg-[var(--success-bg)] text-[var(--success)]'
          }`}
        >
          {identity.sectionStatus.label}
        </span>
      </div>

      {/* admin.html line 17209: <div class="cd-id-grid"> */}
      <div className="grid grid-cols-[1fr_1fr] gap-[18px] mb-[18px] max-[880px]:grid-cols-1">
        {/* TILE A — Business KYB (admin.html lines 17211–17235) */}
        {kyb && (
        <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[18px] flex flex-col gap-[14px]">
          {/* admin.html line 17212: <div class="big-status"> */}
          <div className="flex items-center gap-[12px] pb-[12px] border-b border-dashed border-[var(--line-soft)]">
            {/* admin.html line 17213: <span class="status-icon-lg"> */}
            <span
              className={`w-[38px] h-[38px] rounded-full grid place-items-center flex-shrink-0 ${
                kyb.status === 'pending'
                  ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
                  : kyb.status === 'failed'
                    ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
                    : 'bg-[var(--success-bg)] text-[var(--success)]'
              }`}
              aria-hidden="true"
            >
              {/* admin.html line 17214: checkmark SVG */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>

            {/* admin.html line 17216: <div class="status-text"> */}
            <div>
              {/* admin.html line 17217: <div class="v"> */}
              <div className="font-display [font-variation-settings:'opsz'_48] text-[17px] font-medium tracking-[-0.01em] mb-[1px]">
                {kyb.tileName}
              </div>

              {/* admin.html line 17218: <div class="meta"> */}
              <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
                {kyb.verifiedDate} · {kyb.verifiedBy}
              </div>
            </div>
          </div>

          {/* admin.html line 17221: <dl class="cd-id-details"> */}
          <dl className="grid grid-cols-[auto_1fr] gap-y-[8px] gap-x-[18px] text-[12.5px]">
            {kyb.fields.map((field, idx) => (
              <div key={idx} className="contents">
                {/* admin.html lines 17222, 17224, 17226, etc.: <dt> */}
                <dt className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--ink-mute)] font-medium pt-[1px]">
                  {field.label}
                </dt>

                {/* admin.html lines 17223, 17225, 17227, etc.: <dd> */}
                <dd className="m-0 text-[var(--ink)] font-medium flex items-center gap-[6px] flex-wrap">
                  {field.value}
                  {field.badge && (
                    <span
                      className={`font-mono text-[9px] tracking-[0.12em] px-[6px] py-[1px] rounded-[3px] font-semibold uppercase ${
                        field.badge.variant === 'success'
                          ? 'bg-[var(--success-bg)] text-[var(--success)]'
                          : field.badge.variant === 'warn'
                            ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
                            : 'bg-[var(--cream-deep)] text-[var(--ink-soft)]'
                      }`}
                    >
                      {field.badge.label}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        )}

        {/* TILE B — Authorized Signatory KYC (Phase 6e) */}
        {kyc && (
          <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[18px] flex flex-col gap-[14px]">
            {/* admin.html line 17239: <div class="big-status"> */}
            <div className="flex items-center gap-[12px] pb-[12px] border-b border-dashed border-[var(--line-soft)]">
              {/* admin.html line 17240: <span class="status-icon-lg"> */}
              <span
                className={`w-[38px] h-[38px] rounded-full grid place-items-center flex-shrink-0 ${
                  kyc.status === 'pending'
                    ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
                    : kyc.status === 'failed'
                      ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
                      : 'bg-[var(--success-bg)] text-[var(--success)]'
                }`}
                aria-hidden="true"
              >
                {/* admin.html line 17241: checkmark SVG */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>

              {/* admin.html line 17243: <div class="status-text"> */}
              <div>
                {/* admin.html line 17244: <div class="v"> */}
                <div className="font-display [font-variation-settings:'opsz'_48] text-[17px] font-medium tracking-[-0.01em] mb-[1px]">
                  {kyc.tileName}
                </div>

                {/* admin.html line 17245: <div class="meta"> */}
                <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
                  {kyc.verifiedDate} · {kyc.verifiedBy}
                </div>
              </div>
            </div>

            {/* admin.html line 17248: <dl class="cd-id-details"> */}
            <dl className="grid grid-cols-[auto_1fr] gap-y-[8px] gap-x-[18px] text-[12.5px]">
              {kyc.fields.map((field, idx) => (
                <div key={idx} className="contents">
                  {/* admin.html lines 17249, 17251, 17253, etc.: <dt> */}
                  <dt className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--ink-mute)] font-medium pt-[1px]">
                    {field.label}
                  </dt>

                  {/* admin.html lines 17250, 17252, 17254, etc.: <dd> */}
                  <dd className="m-0 text-[var(--ink)] font-medium flex items-center gap-[6px] flex-wrap">
                    {field.value}
                    {field.badge && (
                      <span
                        className={`font-mono text-[9px] tracking-[0.12em] px-[6px] py-[1px] rounded-[3px] font-semibold uppercase ${
                          field.badge.variant === 'success'
                            ? 'bg-[var(--success-bg)] text-[var(--success)]'
                            : field.badge.variant === 'warn'
                              ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
                              : 'bg-[var(--cream-deep)] text-[var(--ink-soft)]'
                        }`}
                      >
                        {field.badge.label}
                      </span>
                    )}
                  </dd>
                </div>
              ))}

              {/* admin.html lines 17257-17260: Biometric match with score-bar (Phase 6e) */}
              {kyc.biometric && (
                <div className="contents">
                  <dt className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--ink-mute)] font-medium pt-[1px]">
                    {kyc.biometric.label}
                  </dt>
                  <dd className="m-0 text-[var(--ink)] font-medium flex items-center gap-[6px] flex-wrap">
                    {kyc.biometric.barLabel}
                    {/* Correction 1: Score-bar with h-[4px] track height */}
                    <span className="inline-flex items-center gap-[8px] ml-auto">
                      <span className="w-[60px] h-[4px] bg-[var(--cream-deep)] rounded-full overflow-hidden">
                        <span
                          className="block h-full bg-[var(--success)] rounded-full"
                          style={{ width: `${kyc.biometric.score}%` }}
                        />
                      </span>
                    </span>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}
