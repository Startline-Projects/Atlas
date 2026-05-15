import type {
  AdminProfile,
  AdminHrCard,
  AdminHrDdValue,
} from '@/lib/mock-data/admin/admin-profiles-data';

interface AdminSubProfileProps {
  profile: AdminProfile;
}

// Inline color for emphasized dd values — matches Phase 7i + 8gh pattern + super variant
function ddInlineStyle(dd: AdminHrDdValue): React.CSSProperties | undefined {
  if (!dd.emphasisColor) return undefined;
  const color =
    dd.emphasisColor === 'success' ? 'var(--success)'
    : dd.emphasisColor === 'warn'  ? 'var(--amber)'
    : dd.emphasisColor === 'super' ? 'var(--super)'
    :                                'var(--danger)';
  return { color, fontWeight: 600 };
}

// admin.html lines 7886-7923 — sp-hr-card with h4 + dl (mirror Phase 7i)
function HrCardView({ card }: { card: AdminHrCard }) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] px-[18px] py-[16px]">
      <h4 className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold mb-[12px] pb-[8px] border-b border-dashed border-[var(--line-soft)] m-0">
        {card.title}
      </h4>
      <dl className="grid grid-cols-[auto_1fr] gap-x-[14px] gap-y-[7px] text-[12.5px] m-0">
        {card.entries.map((entry, idx) => (
          <div key={idx} className="contents">
            <dt className="font-mono text-[9.5px] tracking-[0.12em] uppercase text-[var(--ink-mute)] pt-[1px] font-medium m-0">
              {entry.dt}
            </dt>
            <dd className="text-[var(--ink)] font-medium m-0" style={ddInlineStyle(entry.dd)}>
              {entry.dd.text}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function AdminSubProfile({ profile }: AdminSubProfileProps) {
  return (
    // admin.html line 8842: adm-sub wrapper with dashed bottom + 22mb/pb
    <div className="mb-[22px] pb-[22px] border-b border-dashed border-[var(--line-soft)]" id="admSubProfile">
      {/* admin.html line 8848: adm-sub-head with h3 + sub-num + sub-meta */}
      <div className="flex items-baseline justify-between gap-[12px] mb-[12px] flex-wrap">
        <h3 className="font-display text-[17px] font-medium tracking-[-0.01em] m-0 flex items-center gap-[10px]">
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold">
            01 · 04
          </span>
          Profile &amp; status
        </h3>
        <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
          Source of truth for HR + access
        </span>
      </div>

      {/* admin.html line 8882: adm-profile-grid 2-col with 2 sp-hr-cards */}
      <div className="grid grid-cols-2 gap-[14px] max-[720px]:grid-cols-1">
        <HrCardView card={profile.profile.accountCard} />
        <HrCardView card={profile.profile.securityCard} />
      </div>
    </div>
  );
}
