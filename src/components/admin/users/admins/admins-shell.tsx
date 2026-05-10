'use client';

import { useState, useEffect } from 'react';
import { ADMIN_PROFILES, ADMINS_PAGE_DATA } from '@/lib/mock-data/admin/admin-profiles-data';
import { AdminRosterCard } from './admin-roster-card';
import { AdminDetailHead } from './admin-detail-head';
import { AdminSubProfile } from './sections/admin-sub-profile';
import { AdminSubActivity } from './sections/admin-sub-activity';

// Sub-section placeholder (Phase 9b will replace 02 + 03)
function AdminSubPlaceholder({
  num,
  title,
  phase,
  isLast,
}: {
  num: string;
  title: string;
  phase: string;
  isLast?: boolean;
}) {
  return (
    <div
      className={`mb-[22px] pb-[22px] ${isLast ? '' : 'border-b border-dashed border-[var(--line-soft)]'}`}
    >
      <div className="flex items-baseline justify-between gap-[12px] mb-[12px] flex-wrap">
        <h3 className="font-display text-[17px] font-medium tracking-[-0.01em] m-0 flex items-center gap-[10px]">
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold">
            {num}
          </span>
          {title}
        </h3>
      </div>
      <div className="bg-[var(--paper)] border border-dashed border-[var(--line)] rounded-[var(--r-md)] p-[40px] text-center">
        <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.06em] uppercase">
          Phase {phase} will build this section
        </div>
      </div>
    </div>
  );
}

export function AdminsShell() {
  // Default to admin-001 on both server (SSG) and first client render — prevents
  // hydration mismatch. The useEffect below syncs selectedId with the URL hash
  // after mount, and continues to listen for hashchange events.
  const [selectedId, setSelectedId] = useState<string>('admin-001');

  useEffect(() => {
    const updateFromHash = () => {
      const hash = window.location.hash.substring(1);
      if (hash && ADMIN_PROFILES[hash]) {
        setSelectedId(hash);
      }
    };
    // Sync on mount (handles deep-link case e.g. /profile#admin-002)
    updateFromHash();
    // Defensive: snap to top on mount if hash navigation parked us mid-page.
    if (window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    window.addEventListener('hashchange', updateFromHash);
    return () => window.removeEventListener('hashchange', updateFromHash);
  }, []);

  const selected = ADMIN_PROFILES[selectedId] ?? ADMIN_PROFILES['admin-001']!;

  return (
    // admin.html line 8460: adm-wrap
    <div className="mx-auto max-w-[1180px] pt-[28px] px-[32px] pb-[64px] max-[720px]:px-[18px] max-[720px]:pt-[22px] max-[720px]:pb-[48px]">
      {/* admin.html line 8468: adm-page-head */}
      <div className="flex items-end justify-between gap-[18px] mb-[22px] pb-[18px] border-b border-[var(--line)] flex-wrap">
        <div>
          <h1 className="font-display text-[32px] font-medium tracking-[-0.02em] leading-[1.1] m-0 mb-[4px]">
            Admin accounts
          </h1>
          <div className="font-mono text-[11px] tracking-[0.04em] text-[var(--ink-mute)]">
            {ADMINS_PAGE_DATA.pageMeta}
          </div>
        </div>
        {/* Create button — disabled placeholder in 9a; Phase 9c will wire form toggle */}
        <button
          type="button"
          disabled
          aria-label="Create new admin (Super Admin only — Phase 9c will wire this)"
          className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] whitespace-nowrap opacity-50 cursor-not-allowed [&>svg]:flex-shrink-0"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Create new admin
          <span
            className="inline-flex items-center gap-[4px] font-mono text-[8.5px] tracking-[0.12em] bg-[rgba(110,63,224,0.12)] text-[var(--super)] py-[1px] px-[6px] rounded-[3px] font-semibold ml-[6px]"
            style={{ verticalAlign: '3px' }}
          >
            SUPER ONLY
          </span>
        </button>
      </div>

      {/* Stats row — DEFERRED to Phase 9b */}
      {/* Toolbar (search + filter chips) — DEFERRED to Phase 9b */}

      {/* admin.html line 8615: adm-section-label "Admin roster" */}
      <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold mt-[22px] mb-[12px] pb-[6px] border-b border-dashed border-[var(--line-soft)] flex items-center justify-between gap-[8px]">
        <span>Admin roster</span>
        <span className="font-body normal-case tracking-[0.02em] text-[var(--ink-soft)] text-[11.5px] font-medium">
          Showing 5 of 5 · click to view detail
        </span>
      </div>

      {/* admin.html line 8640: adm-roster 2-col grid */}
      <div className="grid grid-cols-2 gap-[12px] mb-[8px] max-[720px]:grid-cols-1">
        {ADMINS_PAGE_DATA.profiles.map((profile) => (
          <AdminRosterCard
            key={profile.id}
            profile={profile}
            isActive={profile.id === selectedId}
            onClick={() => setSelectedId(profile.id)}
          />
        ))}
      </div>

      {/* admin.html line 8853: detail section label */}
      <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold mt-[24px] mb-[12px] pb-[6px] border-b border-dashed border-[var(--line-soft)] flex items-center justify-between gap-[8px]">
        <span>Selected admin · detail</span>
        <span className="font-body normal-case tracking-[0.02em] text-[var(--ink-soft)] text-[11.5px] font-medium">
          Click any roster card above to switch
        </span>
      </div>

      {/* admin.html line 8766: adm-detail single unified card */}
      <section className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mt-[14px] overflow-hidden">
        <AdminDetailHead profile={selected} />
        <div className="pt-[22px] px-[26px] pb-0 max-[720px]:px-[18px] max-[720px]:pt-[18px]">
          {/* Sub 1 — Profile & status (Phase 9a built) */}
          <AdminSubProfile profile={selected} />

          {/* Sub 2 — Permissions matrix (Phase 9b placeholder) */}
          <AdminSubPlaceholder num="02 · 04" title="Permissions matrix" phase="9b" />

          {/* Sub 3 — IP allowlist (Phase 9b placeholder) */}
          <AdminSubPlaceholder num="03 · 04" title="IP allowlist" phase="9b" />

          {/* Sub 4 — Recent activity (Phase 9a built) */}
          <AdminSubActivity profile={selected} />
        </div>

        {/* Action buttons row — DEFERRED to Phase 9b */}
      </section>

      {/* Create-new-admin form — DEFERRED to Phase 9c (hidden by default per admin.html) */}
    </div>
  );
}
