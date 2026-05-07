import type { ClientProfile } from '@/lib/mock-data/admin/client-profiles-data';
import { ClientBackRow } from './client-back-row';
import { ClientHero } from './client-hero';
import { ClientSectionIdentity } from './sections/client-section-identity';

interface ClientProfileShellProps {
  profile: ClientProfile;
}

export function ClientProfileShell({ profile }: ClientProfileShellProps) {
  return (
    <main className="mx-auto max-w-[1400px] pt-[28px] px-[32px] pb-[100px] max-[720px]:px-[16px] max-[720px]:pt-[18px]">
      {/* Back row — Phase 6c */}
      <ClientBackRow profile={profile} />

      {/* Hero — Phase 6c */}
      <ClientHero profile={profile} />

      {/* Sections container — all placeholders */}
      <div className="space-y-[32px]">
        {/* Section 01 — Identity Verification (Phase 6d: Business KYB tile + Tile B placeholder) */}
        <ClientSectionIdentity profile={profile} />

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
