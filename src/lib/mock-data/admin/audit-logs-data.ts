// Audit Logs fixture data
// Source: reference/admin.html lines 57566-58650

export interface AudRow {
  id: string;
  timestamp: {
    time: string;
    dateRel: string;
  };
  severity: 'info' | 'success' | 'warn' | 'critical' | 'failure';
  action: {
    textHtml: string;
    subjectHtml: string;
  };
  actor: {
    initials: string;
    name: string;
    avatarGradient: string;
    isSystem?: boolean;
  };
  result: {
    variant: 'success' | 'failure' | 'blocked' | 'warn';
    label: string;
  };
  category: {
    variant: 'auth' | 'admin' | 'access' | 'modify' | 'system' | 'financial' | 'compliance';
    label: string;
  };
  rowVariant?: 'recent' | 'failure' | 'critical';
}

export interface AudMetaRow {
  label: string;
  value: string;
  variant?: 'success' | 'warn' | 'danger';
}

export interface AudImmutability {
  title: string;
  description: string;
  metaRows: AudMetaRow[];
}

export interface AudActor {
  name: string;
  subjectId: string;
  initials: string;
  avatarGradient: string;
  metaRows: AudMetaRow[];
  actionLabel: string;
}

export interface AudQuickStat {
  label: string;
  value: string;
  variant?: 'success' | 'danger';
}

export interface AudCrossReferences {
  stats: AudQuickStat[];
  note: string;
}

export interface AudForensicCell {
  label: string;
  value: string;
  metaHtml: string;
  flag: {
    label: string;
    variant?: 'warn' | 'danger';
  };
}

export interface AudForensicGrid {
  title: string;
  meta: string;
  cells: AudForensicCell[];
}

export interface AudSubject {
  initials: string;
  name: string;
  id: string;
  ref: string;
  avatarGradient: string;
}

export interface AudDiffField {
  name: string;
  before: string;
  after: string;
}

export interface AudDiffEntity {
  initials: string;
  name: string;
  id: string;
  ref: string;
  avatarGradient: string;
  fields: AudDiffField[];
}

export interface AudDiff {
  title: string;
  meta: string;
  entities: AudDiffEntity[];
  expandLabel: string;
}

export interface AudRelatedRow {
  time: string;
  action: string;
  actor: string;
  isThisEntry?: boolean;
}

export interface AudRelatedActions {
  title: string;
  meta: string;
  rows: AudRelatedRow[];
}

export interface AudContextNote {
  author: string;
  role: string;
  time: string;
  textHtml: string;
  initials: string;
  avatarGradient: string;
}

export interface AudContextNotes {
  meta: string;
  immutBadge: string;
  notes: AudContextNote[];
  composer: {
    placeholder: string;
    footMetaText: string;
    saveLabel: string;
  };
}

export interface AudDetail {
  breadcrumb: {
    backLabel: string;
    filterLabel: string;
    currentLabel: string;
  };
  hero: {
    id: string;
    actionChip: {
      variant: string;
      label: string;
    };
    result: {
      variant: string;
      label: string;
    };
    immutable: boolean;
    timestamp: string;
    title: string;
    subtitleHtml: string;
  };
  heroActions: Array<{
    icon: string;
    label: string;
    isPrimary?: boolean;
    isDisabled?: boolean;
  }>;
  heroMoreMenu: {
    navigateSection: Array<{ icon: string; label: string }>;
    forensicsSection: Array<{ icon: string; label: string }>;
    disabledSection: Array<{ icon: string; label: string }>;
  };
  heroStats: Array<{
    label: string;
    value: string;
    meta: string;
    variant?: 'danger';
    valueStyle?: Record<string, string>;
  }>;
  summary: {
    variant: 'critical';
    eyebrow: string;
    title: string;
    detailHtml: string;
  };
  trigger: {
    eyebrow: string;
    titleHtml: string;
    detailHtml: string;
  };
  // Pass B sections
  forensicGrid: AudForensicGrid;
  subjects: AudSubject[];
  diff: AudDiff;
  relatedActions: AudRelatedActions;
  contextNotes: AudContextNotes;
  // Rail cards
  immutability: AudImmutability;
  actor: AudActor;
  crossReferences: AudCrossReferences;
}

export const audListMeta = {
  title: 'Audit logs',
  subtitle: '/admin/compliance/audit-logs · immutable · 7-year retention · last sync 12s ago · 2.4M total entries',
  live: true,
  liveLabel: 'Live · auto-refresh 30s',
};

export const audStats = [
  {
    label: 'Events today',
    value: '2,847',
    sparkline: [35, 50, 42, 60, 75, 55, 85],
  },
  {
    label: 'Events · 7-day',
    value: '18,440',
    meta: '+12% vs prior week · normal range',
  },
  {
    label: 'Failed actions · 24h',
    value: '23',
    meta: '19 auth · 3 rate-limit · 1 perms',
    variant: 'warn' as const,
  },
  {
    label: 'High-risk actions · 24h',
    value: '4',
    meta: '2 bans · 1 refund · 1 role grant',
    variant: 'danger' as const,
  },
  {
    label: 'Total entries · lifetime',
    value: '2.4M',
    meta: 'since launch · all retained · immutable',
  },
];

export const audFilterChips = [
  { label: 'All', count: 2847, active: true },
  { label: 'Auth', count: 912 },
  { label: 'Admin actions', count: 68 },
  { label: 'Data access', count: 441 },
  { label: 'Modifications', count: 183 },
  { label: 'Financial', count: 94 },
  { label: 'Compliance', count: 37 },
  { label: 'System', count: 1112 },
];

export const audTimeRanges = [
  { label: '1h', value: '1h' },
  { label: '24h', value: '24h', active: true },
  { label: '7d', value: '7d' },
  { label: '30d', value: '30d' },
  { label: 'Custom', value: 'custom' },
];

export const audRows: AudRow[] = [
  {
    id: 'aud-2026-106891',
    timestamp: { time: '11:42:18', dateRel: 'May 11 · 2m ago' },
    severity: 'success',
    action: {
      textHtml: '<strong>Document download</strong> · subpoena response Bates VOR-000001 to 001990',
      subjectHtml: '→ <span data-aud-action="open-legal" data-id="lr-2026-0023" style="color: var(--super); text-decoration: underline;">LR-2026-0023</span>',
    },
    actor: {
      initials: 'DF',
      name: 'dario',
      avatarGradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)',
    },
    result: { variant: 'success', label: 'Success' },
    category: { variant: 'access', label: 'data·access' },
    rowVariant: 'recent',
  },
  {
    id: 'aud-2026-106890',
    timestamp: { time: '11:38:04', dateRel: 'May 11 · 6m ago' },
    severity: 'info',
    action: {
      textHtml: 'Login · TOTP verified · session 4h',
      subjectHtml: '→ admin-aisha',
    },
    actor: {
      initials: 'AO',
      name: 'aisha',
      avatarGradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)',
    },
    result: { variant: 'success', label: 'Success' },
    category: { variant: 'auth', label: 'auth' },
    rowVariant: 'recent',
  },
  {
    id: 'aud-2026-106889',
    timestamp: { time: '10:52:31', dateRel: 'May 11 · 52m ago' },
    severity: 'warn',
    action: {
      textHtml: '<strong>DSR scope edit</strong> · deletion scope updated · 3 categories adjusted',
      subjectHtml: '→ <span data-aud-action="open-dsr" data-id="dsr-2026-0089" style="color: var(--super); text-decoration: underline;">DSR-2026-0089</span>',
    },
    actor: {
      initials: 'AO',
      name: 'aisha',
      avatarGradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)',
    },
    result: { variant: 'success', label: 'Success' },
    category: { variant: 'compliance', label: 'compliance' },
  },
  {
    id: 'aud-2026-106847',
    timestamp: { time: '09:18:42', dateRel: 'May 11 · 2h ago' },
    severity: 'success',
    action: {
      textHtml: '<strong>Refund issued</strong> · $1,250 · dispute resolution',
      subjectHtml: '→ <span data-aud-action="open-refund" data-id="ref-2026-0084" style="color: var(--success); text-decoration: underline;">REF-2026-0084</span>',
    },
    actor: {
      initials: 'DF',
      name: 'dario',
      avatarGradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)',
    },
    result: { variant: 'success', label: 'Success' },
    category: { variant: 'financial', label: 'financial' },
  },
  {
    id: 'aud-2026-106823',
    timestamp: { time: '08:31:55', dateRel: 'May 11 · 3h ago' },
    severity: 'failure',
    action: {
      textHtml: '<strong>Failed login</strong> · 5 attempts from 185.220.x.x · captcha triggered, IP cooldown 1h',
      subjectHtml: '→ target: admin-dario',
    },
    actor: {
      initials: 'SY',
      name: 'system',
      avatarGradient: 'var(--ink-mute)',
      isSystem: true,
    },
    result: { variant: 'blocked', label: 'Blocked' },
    category: { variant: 'auth', label: 'auth' },
    rowVariant: 'failure',
  },
  {
    id: 'aud-2026-106244',
    timestamp: { time: 'May 9 · 09:00', dateRel: '2d ago' },
    severity: 'success',
    action: {
      textHtml: '<strong>Bulk tax form dispatch</strong> · 478 recipients · email + certified mail',
      subjectHtml: '→ tax-year-2025',
    },
    actor: {
      initials: 'SY',
      name: 'system',
      avatarGradient: 'var(--ink-mute)',
      isSystem: true,
    },
    result: { variant: 'success', label: 'Success' },
    category: { variant: 'system', label: 'system·job' },
  },
  {
    id: 'aud-2026-106102',
    timestamp: { time: 'May 5 · 11:45:32', dateRel: '6d ago' },
    severity: 'critical',
    action: {
      textHtml: '<strong>BAN · synchronized · 5 entities</strong> · Vorona Capital ring · cascade across linked accounts',
      subjectHtml: '→ <span data-aud-action="open-sanction" data-id="sb-2026-0084" style="color: var(--danger); text-decoration: underline;">SB-2026-0084</span> + <span data-aud-action="open-sanction" data-id="sb-2026-0085" style="color: var(--danger); text-decoration: underline;">SB-2026-0085</span>',
    },
    actor: {
      initials: 'DF',
      name: 'dario',
      avatarGradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)',
    },
    result: { variant: 'success', label: 'Success' },
    category: { variant: 'admin', label: 'admin·ban' },
    rowVariant: 'critical',
  },
  {
    id: 'aud-2026-105988',
    timestamp: { time: 'May 1 · 09:32:14', dateRel: '10d ago' },
    severity: 'success',
    action: {
      textHtml: 'Identity verified · 3 methods auto-confirmed · DSR gate unlocked',
      subjectHtml: '→ <span data-aud-action="open-dsr" data-id="dsr-2026-0089" style="color: var(--super); text-decoration: underline;">DSR-2026-0089</span>',
    },
    actor: {
      initials: 'SY',
      name: 'system',
      avatarGradient: 'var(--ink-mute)',
      isSystem: true,
    },
    result: { variant: 'success', label: 'Success' },
    category: { variant: 'compliance', label: 'compliance' },
  },
  {
    id: 'aud-2026-105891',
    timestamp: { time: 'May 5 · 14:22', dateRel: '6d ago' },
    severity: 'warn',
    action: {
      textHtml: '<strong>Bulk export · gov subpoena</strong> · 1,990 records exported to counsel · Bates-numbered',
      subjectHtml: '→ <span data-aud-action="open-legal" data-id="lr-2026-0023" style="color: var(--super); text-decoration: underline;">LR-2026-0023</span>',
    },
    actor: {
      initials: 'DF',
      name: 'dario',
      avatarGradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)',
    },
    result: { variant: 'success', label: 'Success' },
    category: { variant: 'access', label: 'data·access' },
    rowVariant: 'critical',
  },
  {
    id: 'aud-2026-106788',
    timestamp: { time: 'May 2 · 16:08', dateRel: '9d ago' },
    severity: 'warn',
    action: {
      textHtml: '<strong>Role granted</strong> · DPO role added to admin-aisha · 2-admin sign-off required',
      subjectHtml: '→ admin-aisha',
    },
    actor: {
      initials: 'DF',
      name: 'dario',
      avatarGradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)',
    },
    result: { variant: 'success', label: 'Success' },
    category: { variant: 'admin', label: 'admin·role' },
  },
  {
    id: 'aud-2026-104873',
    timestamp: { time: 'Apr 26 · 13:52', dateRel: '15d ago' },
    severity: 'critical',
    action: {
      textHtml: '<strong>SUSPEND</strong> · cand-1142 · fake-ID evidence · payouts halted',
      subjectHtml: '→ <span data-aud-action="open-sanction" data-id="sb-2026-0083" style="color: var(--danger); text-decoration: underline;">SB-2026-0083</span>',
    },
    actor: {
      initials: 'DF',
      name: 'dario',
      avatarGradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)',
    },
    result: { variant: 'success', label: 'Success' },
    category: { variant: 'admin', label: 'admin·suspend' },
    rowVariant: 'critical',
  },
  {
    id: 'aud-2026-104822',
    timestamp: { time: 'Apr 25 · 22:17', dateRel: '16d ago' },
    severity: 'warn',
    action: {
      textHtml: '<strong>Fraud ring identified</strong> · 5-node cluster detected · auto-flagged for T&amp;S review',
      subjectHtml: '→ <span data-aud-action="open-fraud" data-id="fa-2026-0042" style="color: var(--amber); text-decoration: underline;">FA-2026-0042</span>',
    },
    actor: {
      initials: 'SY',
      name: 'system·ml',
      avatarGradient: 'var(--ink-mute)',
      isSystem: true,
    },
    result: { variant: 'warn', label: 'Flagged' },
    category: { variant: 'system', label: 'system·detection' },
  },
  {
    id: 'aud-2026-104681',
    timestamp: { time: 'Apr 22 · 18:30', dateRel: '19d ago' },
    severity: 'warn',
    action: {
      textHtml: '<strong>Breach disclosure dispatch</strong> · 312 affected users notified · GDPR Art. 34',
      subjectHtml: '→ <span data-aud-action="open-incident" data-id="si-2026-0014" style="color: var(--super); text-decoration: underline;">SI-2026-0014</span>',
    },
    actor: {
      initials: 'DF',
      name: 'dario',
      avatarGradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)',
    },
    result: { variant: 'success', label: 'Success' },
    category: { variant: 'compliance', label: 'compliance' },
  },
  {
    id: 'aud-2026-103456',
    timestamp: { time: 'Apr 26 · 10:14', dateRel: '15d ago' },
    severity: 'warn',
    action: {
      textHtml: '<strong>Settings change</strong> · fraud-detection threshold lowered 0.75 → 0.62 · in response to FA-2026-0042',
      subjectHtml: '→ trust-safety/config',
    },
    actor: {
      initials: 'DF',
      name: 'dario',
      avatarGradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)',
    },
    result: { variant: 'success', label: 'Success' },
    category: { variant: 'modify', label: 'modify·config' },
  },
  {
    id: 'aud-2026-102109',
    timestamp: { time: 'Apr 18 · 07:42', dateRel: '23d ago' },
    severity: 'info',
    action: {
      textHtml: 'Profile update · email change · verified via OTP',
      subjectHtml: '→ cand-1156 (self)',
    },
    actor: {
      initials: 'MC',
      name: 'mira',
      avatarGradient: 'linear-gradient(135deg, #8B4F6E, #4F2D3E)',
    },
    result: { variant: 'success', label: 'Success' },
    category: { variant: 'modify', label: 'user·edit' },
  },
];

export const audDetails: Record<string, AudDetail | undefined> = {
  'aud-2026-106102': {
    breadcrumb: {
      backLabel: 'Audit logs',
      filterLabel: 'Admin actions',
      currentLabel: 'AUD-2026-106102 · Vorona ring ban',
    },
    hero: {
      id: 'AUD-2026-106102',
      actionChip: {
        variant: 'admin',
        label: 'admin · ban · synchronized',
      },
      result: {
        variant: 'success',
        label: 'Success',
      },
      immutable: true,
      timestamp: 'May 5, 2026 · 11:45:32 UTC · sequence #2,047,219',
      title: 'Synchronized ban execution · Vorona Capital + 4 linked entities · single admin action',
      subtitleHtml: '<strong style="color: var(--ink);">Dario Fonseca</strong> (Super Admin) executed a synchronized ban across the Vorona Capital ring identified by <span data-aud-action="open-fraud" data-id="fa-2026-0042">FA-2026-0042</span>. A single admin action cascaded into creating <span data-aud-action="open-sanction" data-id="sb-2026-0084">SB-2026-0084</span> (Vorona primary) and <span data-aud-action="open-sanction" data-id="sb-2026-0085">SB-2026-0085</span> (4 satellite entities), halting all 5 accounts simultaneously. This single audit entry expanded to <strong style="color: var(--ink);">31 child entries</strong> in the immutable log (5 account-state changes, 5 payout-halts, 5 session-revocations, 5 message-thread freezes, plus 11 supporting jobs). Triggered by <strong style="color: var(--ink);">3 hours of cross-team review</strong>: T&amp;S risk score 0.94, fraud-ring graph confirmation, compliance sign-off.',
    },
    heroActions: [
      { icon: 'link', label: 'Copy link' },
      { icon: 'download', label: 'Export JSON' },
      { icon: 'edit', label: 'Add context note', isPrimary: true },
    ],
    heroMoreMenu: {
      navigateSection: [
        { icon: 'prev', label: 'Previous entry · AUD-2026-106101' },
        { icon: 'next', label: 'Next entry · AUD-2026-106103' },
        { icon: 'expand', label: 'Expand child entries · 31 entries' },
      ],
      forensicsSection: [
        { icon: 'code', label: 'View raw JSON' },
        { icon: 'check', label: 'Verify entry hash · tamper check' },
        { icon: 'chain', label: 'View hash chain · 24h window' },
      ],
      disabledSection: [
        { icon: 'delete', label: 'Delete · BLOCKED (immutable)' },
        { icon: 'edit', label: 'Modify · BLOCKED (immutable)' },
      ],
    },
    heroStats: [
      {
        label: 'Severity',
        value: 'Critical',
        meta: 'irreversible mass action · 5 entities affected',
        variant: 'danger',
      },
      {
        label: 'Actor',
        value: 'Dario Fonseca',
        meta: 'Super Admin · admin-dario · TOTP verified',
      },
      {
        label: 'Child entries',
        value: '31',
        meta: 'cascade actions auto-logged · all linked',
      },
      {
        label: 'Entry hash',
        value: 'verified ✓',
        meta: 'sha-256 · chain integrity confirmed',
        valueStyle: { fontFamily: 'var(--font-mono)', fontSize: '13px' },
      },
    ],
    summary: {
      variant: 'critical',
      eyebrow: 'ACTION SUMMARY · PLAIN ENGLISH',
      title: 'Dario Fonseca banned 5 client accounts simultaneously, halting all activity and locking access.',
      detailHtml: 'Triggered manually after 3 hours of cross-team review of <strong>FA-2026-0042</strong> fraud-ring evidence. The action cascaded through Atlas\'s coordinated-ban policy: all 5 entities (Vorona Capital + 4 satellites) transitioned from <strong>active → banned</strong>, all pending payouts froze, all sessions revoked, all message threads frozen with counterparties notified, and KYC documents marked legal-hold per pending SDNY interest. Final state per entity stamped with <strong>SB-2026-0084</strong> or <strong>SB-2026-0085</strong> as governing sanction order.',
    },
    trigger: {
      eyebrow: 'TRIGGER · WHY THIS ACTION HAPPENED',
      titleHtml: 'Fraud-ring alert <span data-aud-action="open-fraud" data-id="fa-2026-0042">FA-2026-0042</span> · 5-node cluster · risk score 0.94',
      detailHtml: 'Auto-detected by the fraud-ring model on Apr 25 (AUD-2026-104822). T&amp;S analyst review confirmed 5-node cluster on Apr 27. Cross-team review (T&amp;S + Compliance + Finance) on May 5 morning. <strong>Reason cited by Dario:</strong> "Confirmed shared payment infrastructure, sequential KYC submissions within 36h, identical bank account routing through Tallinn corridor, and coordinated bidding patterns. Ring identified beyond reasonable doubt."',
    },
    // Forensic sections (Pass B)
    forensicGrid: {
      title: 'Session & device fingerprint',
      meta: 'captured automatically · admin-session ID asid-2026-0509-AB47',
      cells: [
        {
          label: 'IP address',
          value: '76.121.x.x',
          metaHtml: 'Detroit, MI · Comcast Business · <strong>Atlas HQ network</strong> · prior 47 admin sessions from this IP',
          flag: { label: 'Known IP · trusted' },
        },
        {
          label: 'Device',
          value: 'MacBook Pro M3 · Sonoma',
          metaHtml: 'Chrome 121.0 · device fingerprint <strong>dfp-A8C2F1</strong> · registered to admin-dario since Jan 2025',
          flag: { label: 'Known device · trusted' },
        },
        {
          label: 'Geolocation',
          value: 'Detroit, MI · USA',
          metaHtml: 'lat 42.331, lng -83.045 · <strong>matches stated work location</strong> · no VPN detected · clean exit node',
          flag: { label: 'Location match' },
        },
        {
          label: 'MFA at login',
          value: 'TOTP · authenticator',
          metaHtml: 'verified at <strong>07:27:14 UTC</strong> (4h 18m before action) · session valid · no step-up required for this action class',
          flag: { label: 'MFA confirmed' },
        },
        {
          label: 'Session age',
          value: '4h 18m',
          metaHtml: 'active since 07:27:14 · no idle timeout · <strong>67 admin actions</strong> in this session prior to ban',
          flag: { label: 'Healthy session' },
        },
        {
          label: 'Entry hash',
          value: '8f4a 2c91 e6d3 ...b7c2',
          metaHtml: 'sha-256 · linked to prior entry hash · <strong>chain verified</strong> · tamper check passed at last sweep (12s ago)',
          flag: { label: 'Integrity ✓' },
        },
      ],
    },
    subjects: [
      {
        initials: 'VC',
        name: 'Vorona Capital',
        id: 'cl-167',
        ref: 'SB-2026-0084',
        avatarGradient: 'linear-gradient(135deg, #C41E3A, #7E1525)',
      },
      {
        initials: 'EH',
        name: 'Eastline Holdings',
        id: 'cl-201',
        ref: 'SB-2026-0085',
        avatarGradient: 'linear-gradient(135deg, #C41E3A, #7E1525)',
      },
      {
        initials: 'MV',
        name: 'Meridian Ventures Ltd',
        id: 'cl-178a',
        ref: 'SB-2026-0085',
        avatarGradient: 'linear-gradient(135deg, #6E4F8B, #3D2B4E)',
      },
      {
        initials: 'PF',
        name: 'Polar Flow Partners',
        id: 'cl-178b',
        ref: 'SB-2026-0085',
        avatarGradient: 'linear-gradient(135deg, #6E4F8B, #3D2B4E)',
      },
      {
        initials: 'NS',
        name: 'Northstar Strategies LLC',
        id: 'cl-178c',
        ref: 'SB-2026-0085',
        avatarGradient: 'linear-gradient(135deg, #6E4F8B, #3D2B4E)',
      },
    ],
    diff: {
      title: 'State changes · 5 entities · 6 fields each · 30 total field-changes',
      meta: 'first 3 entities shown · diff is identical pattern across satellites · expand for all',
      entities: [
        {
          initials: 'VC',
          name: 'Vorona Capital',
          id: 'cl-167',
          ref: 'SB-2026-0084',
          avatarGradient: 'linear-gradient(135deg, #C41E3A, #7E1525)',
          fields: [
            { name: 'account.status', before: 'active', after: 'banned' },
            { name: 'payouts.enabled', before: 'true', after: 'false (frozen)' },
            { name: 'sessions.active', before: '3 active', after: '0 (revoked)' },
            { name: 'messages.state', before: 'open · 14 threads', after: 'frozen · read-only' },
            { name: 'kyc.hold', before: 'false', after: 'legal-hold (SDNY)' },
            { name: 'sanction.governing', before: '— (null)', after: 'SB-2026-0084' },
          ],
        },
        {
          initials: 'EH',
          name: 'Eastline Holdings',
          id: 'cl-201',
          ref: 'SB-2026-0085',
          avatarGradient: 'linear-gradient(135deg, #C41E3A, #7E1525)',
          fields: [
            { name: 'account.status', before: 'active', after: 'banned' },
            { name: 'payouts.enabled', before: 'true', after: 'false (frozen)' },
            { name: 'sessions.active', before: '1 active', after: '0 (revoked)' },
            { name: 'messages.state', before: 'open · 8 threads', after: 'frozen · read-only' },
            { name: 'kyc.hold', before: 'false', after: 'legal-hold (SDNY)' },
            { name: 'sanction.governing', before: '— (null)', after: 'SB-2026-0085' },
          ],
        },
        {
          initials: 'MV',
          name: 'Meridian Ventures Ltd',
          id: 'cl-178a',
          ref: 'SB-2026-0085',
          avatarGradient: 'linear-gradient(135deg, #6E4F8B, #3D2B4E)',
          fields: [
            { name: 'account.status', before: 'active', after: 'banned' },
            { name: 'payouts.enabled', before: 'true', after: 'false (frozen)' },
            { name: '+ 4 more fields', before: '(see expanded)', after: '(see expanded)' },
          ],
        },
      ],
      expandLabel: 'Expand · show all 30 field-changes across 5 entities',
    },
    relatedActions: {
      title: 'Surrounding entries · ±15 minutes',
      meta: '31 child entries cascaded from this action · 6 parent-context entries shown · navigate with arrow keys',
      rows: [
        {
          time: '11:42:18',
          action: 'Compliance sign-off completed · ban-cascade approved',
          actor: 'aisha',
        },
        {
          time: '11:43:55',
          action: 'Pre-action review · 5-entity scope confirmed',
          actor: 'dario',
        },
        {
          time: '11:45:14',
          action: 'Confirmation modal · Dario typed "BAN VORONA RING" to proceed',
          actor: 'dario',
        },
        {
          time: '11:45:32',
          action: '<strong>BAN · synchronized · 5 entities · this entry</strong>',
          actor: 'dario',
          isThisEntry: true,
        },
        {
          time: '11:45:32',
          action: 'Child · cl-167 account.status → banned · cascade entry 1/31',
          actor: 'system',
        },
        {
          time: '11:45:32',
          action: 'Child · cl-167 sessions.active → 0 (3 revoked) · cascade entry 2/31',
          actor: 'system',
        },
        {
          time: '11:45:33',
          action: 'Child · final cascade entry · all 5 entities banned in 217ms · cascade 31/31',
          actor: 'system',
        },
        {
          time: '11:46:04',
          action: 'Notification dispatch · 5 entities notified per <a data-aud-action="open-sanction" data-id="sb-2026-0084" style="color: var(--super); text-decoration: underline;">SB-2026-0084</a> + 0085',
          actor: 'system',
        },
        {
          time: '11:51:22',
          action: 'Post-action review · SDNY legal-hold flags propagated to all 5',
          actor: 'dario',
        },
      ],
    },
    contextNotes: {
      meta: 'notes form a chain with the original entry · cannot be modified or deleted · auditor-friendly',
      immutBadge: 'Immutable additions only',
      notes: [
        {
          author: 'Dario Fonseca',
          role: 'Super Admin · matter lead',
          time: 'May 5 · 14:00 UTC',
          textHtml: 'Coordinated ban across confirmed ring. <strong>All entity records preserved per legal-hold</strong> pending SDNY interest. Counsel (Cooley) notified separately. T&amp;S risk score 0.94 at trigger; would have lowered to 0.62 threshold in any case. No prior bidirectional engagements with non-ring clients; clean cleavage. Anticipate appeal attempts within 7 days — appeal channel monitored by Aïsha.',
          initials: 'DF',
          avatarGradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)',
        },
        {
          author: 'Aïsha Okafor',
          role: 'DPO · compliance review',
          time: 'May 9 · 11:02 UTC',
          textHtml: 'Cross-reference: SDNY subpoena <a data-aud-action="open-legal" data-id="lr-2026-0023" style="color: var(--super); text-decoration: underline;">LR-2026-0023</a> received May 4 (one day before this ban). Order of operations preserved correctly — ban predates Atlas\'s awareness of any specific government investigation, supporting Atlas\'s independent T&amp;S basis. All 5 entities\' records now under legal hold per Article 17(3)(b/e) for both GDPR and US tax retention.',
          initials: 'AO',
          avatarGradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)',
        },
      ],
      composer: {
        placeholder: 'Add an immutable context note · permanent · timestamped · attributed to you · cannot edit or delete after saving',
        footMetaText: 'Permanent · cannot edit or delete after save · audit-chain extended',
        saveLabel: 'Add note',
      },
    },
    // Rail cards
    immutability: {
      title: 'Permanently locked',
      description: 'This entry cannot be modified, deleted, or backdated. Only context notes may be appended.',
      metaRows: [
        { label: 'Retention', value: '7 years minimum' },
        { label: 'Chain status', value: 'Verified ✓', variant: 'success' as const },
        { label: 'Last integrity check', value: '12s ago' },
        { label: 'Encrypted backup', value: '2 sites · S3 + Glacier' },
      ],
    },
    actor: {
      name: 'Dario Fonseca',
      subjectId: 'admin-dario · Super Admin',
      initials: 'DF',
      avatarGradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)',
      metaRows: [
        { label: 'Role', value: 'Super Admin' },
        { label: 'Joined Atlas', value: 'Jan 2025' },
        { label: 'Admin actions YTD', value: '1,847' },
        { label: 'High-risk YTD', value: '37' },
        { label: 'Failed actions YTD', value: '0' },
      ],
      actionLabel: 'All Dario\'s actions →',
    },
    crossReferences: {
      stats: [
        { label: 'Trigger alert', value: '<a href="#">FA-2026-0042 →</a>' },
        { label: 'Primary ban', value: '<a href="#">SB-2026-0084 →</a>' },
        { label: 'Satellite ban', value: '<a href="#">SB-2026-0085 →</a>' },
        { label: 'Related subpoena', value: '<a href="#">LR-2026-0023 →</a>' },
        { label: 'Related DSR', value: '<a href="#">DSR-2026-0084 →</a>' },
      ],
      note: 'This entry is the keystone for the Vorona compliance file. Every downstream action — SDNY production, DSR rejection, banking notifications — traces back here.',
    },
  },
  // Other IDs map to same canonical detail (route clone pattern)
  'aud-2026-106891': undefined,
  'aud-2026-106890': undefined,
  'aud-2026-106889': undefined,
  'aud-2026-106847': undefined,
  'aud-2026-106823': undefined,
  'aud-2026-106244': undefined,
  'aud-2026-105988': undefined,
  'aud-2026-105891': undefined,
  'aud-2026-106788': undefined,
  'aud-2026-104873': undefined,
  'aud-2026-104822': undefined,
  'aud-2026-104681': undefined,
  'aud-2026-103456': undefined,
  'aud-2026-102109': undefined,
};

// Helper to get detail with fallback
export function getAudDetail(id: string): AudDetail {
  const detail = audDetails[id];
  if (detail) return detail;
  // Clone canonical detail for all IDs (route pattern)
  const canonical = audDetails['aud-2026-106102'];
  if (!canonical) throw new Error('Canonical detail not found');
  return {
    ...canonical,
    hero: {
      ...canonical.hero,
      id,
    },
  };
}
