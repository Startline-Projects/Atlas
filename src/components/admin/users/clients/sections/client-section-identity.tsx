import type { ClientProfile } from '@/lib/mock-data/admin/client-profiles-data';

interface ClientSectionIdentityProps {
  profile: ClientProfile;
}

export function ClientSectionIdentity({ profile }: ClientSectionIdentityProps) {
  const identity = profile.identity;
  const kyb = identity?.kyb;
  const kyc = identity?.signatory_kyc;
  const sanctions = identity?.sanctions;
  const documents = identity?.documents;

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

      {/* admin.html lines 17267-17303: Sanctions & PEP screening (cd-fraud-card) */}
      {sanctions && (
        <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden mb-[14px]">
          {/* admin.html line 17269: <div class="fraud-head"> */}
          <div className="flex items-center justify-between px-[16px] py-[11px] bg-[var(--paper-deep)] border-b border-[var(--line-soft)] font-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold">
            {/* admin.html line 17270 */}
            <span>Sanctions &amp; PEP screening</span>
            {/* admin.html line 17271: <span class="summary"> */}
            <span
              className={`font-mono text-[10.5px] tracking-[0.06em] font-semibold normal-case ${
                sanctions.summaryVariant === 'warn'
                  ? 'text-[var(--amber)]'
                  : sanctions.summaryVariant === 'danger'
                    ? 'text-[var(--danger)]'
                    : 'text-[var(--success)]'
              }`}
            >
              {sanctions.summary}
            </span>
          </div>

          {/* admin.html line 17273: <div class="cd-sanctions-grid"> */}
          <div className="grid grid-cols-2 gap-0 max-[720px]:grid-cols-1">
            {sanctions.rows.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[auto_1fr_auto] gap-[10px] items-center px-[14px] py-[11px] border-r border-b border-dashed border-[var(--line-soft)] text-[12.5px] even:border-r-0 [&:nth-last-child(-n+2)]:border-b-0 max-[720px]:border-r-0 max-[720px]:[&:nth-last-child(-n+2)]:border-b max-[720px]:last:border-b-0"
              >
                {/* admin.html line 17275: <span class="s-icon"> */}
                <span
                  className={`w-[22px] h-[22px] rounded-full grid place-items-center flex-shrink-0 ${
                    row.status.variant === 'warn'
                      ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
                      : row.status.variant === 'danger'
                        ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
                        : 'bg-[var(--success-bg)] text-[var(--success)]'
                  }`}
                  aria-hidden="true"
                >
                  {/* admin.html line 17276: checkmark SVG */}
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {/* admin.html line 17278: <span class="s-label"> */}
                <span className="font-mono text-[11px] text-[var(--ink)] font-semibold tracking-[0.02em]">
                  {row.listLabel}
                </span>
                {/* admin.html line 17279: <span class="s-status"> */}
                <span
                  className={`font-mono text-[9px] tracking-[0.1em] uppercase font-semibold ${
                    row.status.variant === 'warn'
                      ? 'text-[var(--amber)]'
                      : row.status.variant === 'danger'
                        ? 'text-[var(--danger)]'
                        : 'text-[var(--success)]'
                  }`}
                >
                  {row.status.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* admin.html lines 17305-17363: Documents on file (cd-fraud-card) */}
      {documents && (
        <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
          {/* admin.html line 17307: <div class="fraud-head"> */}
          <div className="flex items-center justify-between px-[16px] py-[11px] bg-[var(--paper-deep)] border-b border-[var(--line-soft)] font-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold">
            {/* admin.html line 17308 */}
            <span>Documents on file</span>
            {/* admin.html line 17309: <span class="summary"> */}
            <span
              className={`font-mono text-[10.5px] tracking-[0.06em] font-semibold normal-case ${
                documents.summaryVariant === 'warn'
                  ? 'text-[var(--amber)]'
                  : 'text-[var(--ink-soft)]'
              }`}
            >
              {documents.summary}
            </span>
          </div>

          {/* admin.html line 17311: <div class="cd-doc-list"> */}
          <div className="p-0">
            {documents.documents.map((doc, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[auto_1fr_auto] gap-[12px] items-center px-[16px] py-[10px] border-b border-dashed border-[var(--line-soft)] text-[12.5px] last:border-b-0"
              >
                {/* admin.html line 17313: <span class="cd-doc-icon"> */}
                <span
                  className="w-[28px] h-[28px] rounded-[6px] bg-[var(--paper-deep)] border border-[var(--line-soft)] grid place-items-center text-[var(--ink-mute)] flex-shrink-0"
                  aria-hidden="true"
                >
                  {/* admin.html line 17314: file SVG */}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </span>
                {/* admin.html line 17316: <div> wrapping name + meta */}
                <div className="min-w-0">
                  {/* admin.html line 17317: <div class="cd-doc-name"> */}
                  <div className="font-semibold text-[var(--ink)]">{doc.name}</div>
                  {/* admin.html line 17318: <div class="cd-doc-meta"> */}
                  <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[1px]">
                    {doc.filename} · {doc.fileSize} · {doc.uploadedDate}
                  </div>
                </div>
                {/* admin.html line 17320: <button class="cd-doc-action"> */}
                <button
                  type="button"
                  className="font-body text-[11px] text-[var(--ink-mute)] bg-transparent border-0 px-[8px] py-[4px] rounded-full cursor-pointer transition-[background-color,color] duration-[150ms] ease whitespace-nowrap hover:bg-[var(--cream-deep)] hover:text-[var(--ink)]"
                >
                  View →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* admin.html lines 17365-17379: Section actions (3 buttons) */}
      <div className="flex gap-[6px] mt-[14px] flex-wrap">
        {/* admin.html line 17367: Re-run KYB (default) */}
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] bg-[var(--paper)] border border-[var(--line)] rounded-full font-body text-[12.5px] font-medium text-[var(--ink-soft)] cursor-pointer transition-all duration-[150ms] ease whitespace-nowrap hover:bg-[var(--cream-deep)] hover:border-[var(--ink)] hover:text-[var(--ink)] [&>svg]:text-[var(--ink-mute)] [&>svg]:flex-shrink-0 [&>svg]:transition-colors [&>svg]:duration-[150ms] hover:[&>svg]:text-[var(--ink)]"
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
          >
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10" />
            <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14" />
          </svg>
          Re-run KYB
        </button>

        {/* admin.html line 17371: Override verification (.warn) */}
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] bg-[var(--paper)] border border-[rgba(232,118,58,0.3)] rounded-full font-body text-[12.5px] font-medium text-[var(--amber)] cursor-pointer transition-all duration-[150ms] ease whitespace-nowrap hover:bg-[rgba(232,118,58,0.1)] [&>svg]:flex-shrink-0"
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
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Override verification
        </button>

        {/* admin.html line 17375: Flag account (.danger) */}
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] bg-[var(--paper)] border border-[rgba(194,65,43,0.3)] rounded-full font-body text-[12.5px] font-medium text-[var(--danger)] cursor-pointer transition-all duration-[150ms] ease whitespace-nowrap hover:bg-[rgba(194,65,43,0.1)] [&>svg]:flex-shrink-0"
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
          >
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" y1="22" x2="4" y2="15" />
          </svg>
          Flag account
        </button>
      </div>
    </section>
  );
}
