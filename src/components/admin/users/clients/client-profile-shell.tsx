import type { ClientProfile } from '@/lib/mock-data/admin/client-profiles-data';

interface ClientProfileShellProps {
  profile: ClientProfile;
}

export function ClientProfileShell({ profile }: ClientProfileShellProps) {
  return (
    <main className="w-full max-w-[1600px] mx-auto min-w-0 pt-6 pr-8 pb-20 pl-8">
      {/* Back row — placeholder */}
      <div className="mb-[20px] text-[13px] text-[var(--ink-mute)]">
        Back to clients (placeholder — 6c will implement)
      </div>

      {/* Hero — placeholder */}
      <div className="mb-[32px] p-[28px] bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)]">
        <h1 className="text-[28px] font-bold text-[var(--ink)] mb-[8px]">{profile.name}</h1>
        <div className="text-[14px] text-[var(--ink-soft)]">
          Status: {profile.status} | ID: {profile.id}
        </div>
      </div>

      {/* Sections container — all placeholders */}
      <div className="space-y-[32px]">
        {/* Section 01 — Identity Verification (6d–6f placeholder) */}
        <section className="border-t border-[var(--line)] pt-[28px] first:border-t-0 first:pt-0">
          <h2 className="text-[20px] font-bold text-[var(--ink)] mb-[12px]">01 · 08 Identity verification</h2>
          <p className="text-[13px] text-[var(--ink-soft)]">
            [Sections 6d–6f will build: Business KYB tile, Signatory KYC tile, Sanctions + Documents]
          </p>
        </section>

        {/* Section 02 — Onboarding Status (6g placeholder) */}
        <section className="border-t border-[var(--line)] pt-[28px]">
          <h2 className="text-[20px] font-bold text-[var(--ink)] mb-[12px]">02 · 08 Onboarding status</h2>
          <p className="text-[13px] text-[var(--ink-soft)]">
            [Section 6g will build: 9-step timeline]
          </p>
        </section>

        {/* Section 03 — Profile Snapshot (6h placeholder) */}
        <section className="border-t border-[var(--line)] pt-[28px]">
          <h2 className="text-[20px] font-bold text-[var(--ink)] mb-[12px]">03 · 08 Profile snapshot</h2>
          <p className="text-[13px] text-[var(--ink-soft)]">
            [Section 6h will build: About + Company details]
          </p>
        </section>

        {/* Section 04 — Hiring History (6i placeholder) */}
        <section className="border-t border-[var(--line)] pt-[28px]">
          <h2 className="text-[20px] font-bold text-[var(--ink)] mb-[12px]">04 · 08 Hiring history</h2>
          <p className="text-[13px] text-[var(--ink-soft)]">
            [Section 6i will build: Active/Past tabs + candidate table]
          </p>
        </section>

        {/* Section 05 — Financial Activity (6j placeholder) */}
        <section className="border-t border-[var(--line)] pt-[28px]">
          <h2 className="text-[20px] font-bold text-[var(--ink)] mb-[12px]">05 · 08 Financial activity</h2>
          <p className="text-[13px] text-[var(--ink-soft)]">
            [Section 6j will build: Stats + Payment methods + Transactions]
          </p>
        </section>

        {/* Section 06 — Communications (6c shell integration will render ProfileSectionCommunications) */}
        <section className="border-t border-[var(--line)] pt-[28px]">
          <h2 className="text-[20px] font-bold text-[var(--ink)] mb-[12px]">06 · 08 Communications</h2>
          <p className="text-[13px] text-[var(--ink-soft)]">
            [6c shell composition will integrate ProfileSectionCommunications from Step 5]
          </p>
        </section>

        {/* Section 07 — Trust & Safety Signals (6k placeholder) */}
        <section className="border-t border-[var(--line)] pt-[28px]">
          <h2 className="text-[20px] font-bold text-[var(--ink)] mb-[12px]">07 · 08 Trust &amp; safety signals</h2>
          <p className="text-[13px] text-[var(--ink-soft)]">
            [Section 6k will build: 4 signal cards + confidentiality status]
          </p>
        </section>

        {/* Section 08 — Audit Log (6l placeholder) */}
        <section className="border-t border-[var(--line)] pt-[28px]">
          <h2 className="text-[20px] font-bold text-[var(--ink)] mb-[12px]">08 · 08 Audit log</h2>
          <p className="text-[13px] text-[var(--ink-soft)]">
            [Section 6l will build: Day-grouped timeline]
          </p>
        </section>

        {/* Right rail (6m–6n placeholders) */}
        <div className="mt-[20px] p-[16px] bg-[var(--cream-deep)] border border-[var(--line-soft)] rounded-[var(--r-md)]">
          <p className="text-[12px] text-[var(--ink-soft)]">
            Right rail: [6m will add Quick Facts + TOC static markup; 6n will wire scroll-spy]
          </p>
        </div>
      </div>
    </main>
  );
}
