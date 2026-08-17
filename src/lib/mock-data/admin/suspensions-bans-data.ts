/**
 * Phase 18a — Suspensions & Bans mock data.
 *
 * 9 list rows + canonical SB-2026-0083 (Marek) full detail
 * + 8 stub detail profiles (basic hero info only).
 */

export type SuspensionStatus = 'suspended' | 'banned' | 'expired' | 'auto-lifted' | 'lifted';
export type SuspensionRowVariant = 'appealing' | 'urgent' | 'default';
export type SuspensionExpiresVariant = 'normal' | 'urgent' | 'warn' | 'perm' | 'lifted';
export type SuspensionAccountRole = 'candidate' | 'client';

export interface SuspensionImposedBy {
  initials: string;
  gradient: string;
  name: string;
  when: string;
}

export interface SuspensionListRow {
  id: string;
  atlasId: string;
  variant: SuspensionRowVariant;
  accountInitials: string;
  accountGradient: string;
  accountName: string;
  accountRole: SuspensionAccountRole;
  accountId: string;
  accountMeta?: string;
  status: SuspensionStatus;
  statusLabel: string;
  reasonLabel: string;
  reasonLink?: { label: string; href: string };
  imposedBy: SuspensionImposedBy;
  expires: {
    variant: SuspensionExpiresVariant;
    primary: string;
    meta: string;
  };
}

export const SUSPENSIONS_BANS_ROWS: SuspensionListRow[] = [
  {
    id: 'sb-2026-0083',
    atlasId: 'SB-2026-0083',
    variant: 'appealing',
    accountInitials: 'MK',
    accountGradient: 'linear-gradient(135deg, #4A6741, #2C3E2A)',
    accountName: 'Marek Kowalczyk',
    accountRole: 'candidate',
    accountId: 'cand-1142',
    status: 'suspended',
    statusLabel: 'Suspended',
    reasonLabel: 'Fake ID / liveness',
    reasonLink: { label: 'FA-2026-0041', href: '/admin/trust-safety/fraud-abuse/fa-2026-0041' },
    imposedBy: {
      initials: 'AO',
      gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)',
      name: 'Aïsha Okafor',
      when: 'May 4 · 09:31',
    },
    expires: { variant: 'warn', primary: '5d 9h', meta: '↑ Appeal pending' },
  },
  {
    id: 'sb-2026-0084',
    atlasId: 'SB-2026-0084',
    variant: 'urgent',
    accountInitials: 'VC',
    accountGradient: 'linear-gradient(135deg, #C41E3A, #7E1525)',
    accountName: 'Vorona Capital + 4 linked',
    accountRole: 'client',
    accountId: 'cl-167',
    accountMeta: 'ring ban',
    status: 'banned',
    statusLabel: 'Banned',
    reasonLabel: 'Multi-account fraud',
    reasonLink: { label: 'FA-2026-0042', href: '/admin/trust-safety/fraud-abuse/fa-2026-0042' },
    imposedBy: {
      initials: 'DF',
      gradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)',
      name: 'Dario Fonseca',
      when: 'May 5 · 11:42',
    },
    expires: { variant: 'perm', primary: 'Permanent', meta: 'Appeal denied' },
  },
  {
    id: 'sb-2026-0082',
    atlasId: 'SB-2026-0082',
    variant: 'default',
    accountInitials: 'SV',
    accountGradient: 'linear-gradient(135deg, #6E4F8B, #3D2B4E)',
    accountName: 'Stefan Volkov',
    accountRole: 'candidate',
    accountId: 'cand-318',
    status: 'suspended',
    statusLabel: 'Suspended',
    reasonLabel: 'Aggressive client comm',
    reasonLink: { label: 'DSP-2026-0144', href: '/admin/operations/disputes/dsp-144' },
    imposedBy: {
      initials: 'SR',
      gradient: 'linear-gradient(135deg, #A0C9B8, #4F8B6E)',
      name: 'Sarah Reyes',
      when: 'May 1 · 14:08',
    },
    expires: { variant: 'normal', primary: '25d 14h', meta: 'No appeal filed' },
  },
  {
    id: 'sb-2026-0078',
    atlasId: 'SB-2026-0078',
    variant: 'default',
    accountInitials: 'A2',
    accountGradient: 'linear-gradient(135deg, #8B7355, #5C4D38)',
    accountName: 'A2Z Solutions Ltd',
    accountRole: 'client',
    accountId: 'cl-178',
    status: 'banned',
    statusLabel: 'Banned',
    reasonLabel: 'Sock-puppet reviews',
    reasonLink: { label: 'REV-834', href: '/admin/operations/reviews/rev-834' },
    imposedBy: {
      initials: 'DF',
      gradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)',
      name: 'Dario Fonseca',
      when: 'Apr 28 · 16:22',
    },
    expires: { variant: 'perm', primary: 'Permanent', meta: 'Appeal denied' },
  },
  {
    id: 'sb-2026-0080',
    atlasId: 'SB-2026-0080',
    variant: 'appealing',
    accountInitials: 'SB',
    accountGradient: 'linear-gradient(135deg, #6B4226, #3F260F)',
    accountName: 'Studio Berlin GmbH',
    accountRole: 'client',
    accountId: 'cl-002',
    status: 'suspended',
    statusLabel: 'Suspended',
    reasonLabel: 'Late payment pattern',
    reasonLink: { label: '4 invoices', href: '#' },
    imposedBy: {
      initials: 'AO',
      gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)',
      name: 'Aïsha Okafor',
      when: 'Apr 30 · 10:15',
    },
    expires: { variant: 'warn', primary: '8d 22h', meta: '↑ Appeal under review' },
  },
  {
    id: 'sb-2026-0081',
    atlasId: 'SB-2026-0081',
    variant: 'default',
    accountInitials: 'CM',
    accountGradient: 'linear-gradient(135deg, #8B4F6E, #4F2D3E)',
    accountName: 'Carlos Mendez',
    accountRole: 'candidate',
    accountId: 'cand-732',
    accountMeta: '3rd strike',
    status: 'banned',
    statusLabel: 'Banned',
    reasonLabel: 'Repeat rule violations',
    reasonLink: { label: '3 strikes', href: '#' },
    imposedBy: {
      initials: 'SR',
      gradient: 'linear-gradient(135deg, #A0C9B8, #4F8B6E)',
      name: 'Sarah Reyes',
      when: 'May 2 · 09:50',
    },
    expires: { variant: 'perm', primary: 'Permanent', meta: 'Appeal denied' },
  },
  {
    id: 'sb-2026-0075',
    atlasId: 'SB-2026-0075',
    variant: 'default',
    accountInitials: 'RK',
    accountGradient: 'linear-gradient(135deg, #5C8E5A, #2D4F2C)',
    accountName: 'Ravi Khanna',
    accountRole: 'candidate',
    accountId: 'cand-882',
    status: 'expired',
    statusLabel: 'Served',
    reasonLabel: 'Verbal abuse during interview',
    imposedBy: {
      initials: 'JR',
      gradient: 'linear-gradient(135deg, #B8860B, #8B5A00)',
      name: 'Jana Reinholt',
      when: 'Apr 22 · 11:44',
    },
    expires: { variant: 'lifted', primary: 'Auto-lifted Apr 25', meta: 'No appeal filed' },
  },
  {
    id: 'sb-2026-0079',
    atlasId: 'SB-2026-0079',
    variant: 'default',
    accountInitials: 'SV',
    accountGradient: 'linear-gradient(135deg, #707070, #404040)',
    accountName: 'Sara Vellas',
    accountRole: 'candidate',
    accountId: 'cand-456',
    status: 'auto-lifted',
    statusLabel: 'Auto-lifted',
    reasonLabel: 'Login anomaly',
    reasonLink: { label: 'compromised device', href: '#' },
    imposedBy: {
      initials: 'SY',
      gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)',
      name: 'System (auto)',
      when: 'Apr 28 · 03:11',
    },
    expires: { variant: 'lifted', primary: 'Lifted Apr 28', meta: 'After re-auth' },
  },
  {
    id: 'sb-2026-0085',
    atlasId: 'SB-2026-0085',
    variant: 'default',
    accountInitials: 'EH',
    accountGradient: 'linear-gradient(135deg, #C41E3A, #7E1525)',
    accountName: 'Eastline Holdings',
    accountRole: 'client',
    accountId: 'cl-201',
    accountMeta: 'ring satellite',
    status: 'banned',
    statusLabel: 'Banned',
    reasonLabel: 'Vorona ring satellite',
    reasonLink: { label: 'FA-2026-0042', href: '/admin/trust-safety/fraud-abuse/fa-2026-0042' },
    imposedBy: {
      initials: 'DF',
      gradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)',
      name: 'Dario Fonseca',
      when: 'May 5 · 11:42',
    },
    expires: { variant: 'perm', primary: 'Permanent', meta: 'Linked to SB-2026-0084' },
  },
];

export const SUSPENSIONS_BANS_PAGE_HEADER = {
  title: 'Suspensions & bans',
  meta: '/admin/trust-safety/suspensions-bans · 84 records total · 12 active suspensions · 7 active bans · 3 appeals open',
  pulse: '2 appeals require review today',
};

export interface SuspensionsBansSeverityCard {
  id: 'active-suspensions' | 'active-bans' | 'appeals-open' | 'lifted-30d';
  label: string;
  count: string;
  meta: string;
}

export const SUSPENSIONS_BANS_SEVERITY_CARDS: SuspensionsBansSeverityCard[] = [
  { id: 'active-suspensions', label: 'Active suspensions', count: '12', meta: '3 expiring < 48h · 2 appealing' },
  { id: 'active-bans', label: 'Active bans', count: '7', meta: 'all permanent · 2 from ring case' },
  { id: 'appeals-open', label: 'Appeals open', count: '3', meta: '1 under review · 2 awaiting eligibility · SLA 48h' },
  { id: 'lifted-30d', label: 'Lifted (30d)', count: '14', meta: '11 auto-lifted · 3 manual · 0 reversed' },
];

export interface SuspensionsBansFilterChip {
  id: string;
  label: string;
  count: string;
}

export const SUSPENSIONS_BANS_FILTER_CHIPS: SuspensionsBansFilterChip[] = [
  { id: 'all', label: 'All', count: '84' },
  { id: 'suspended', label: 'Suspended', count: '12' },
  { id: 'banned', label: 'Banned', count: '7' },
  { id: 'appealing', label: 'Appealing', count: '3' },
  { id: 'served', label: 'Served / lifted', count: '62' },
];

export const SUSPENSIONS_BANS_LIST_FOOTER =
  '9 of 84 records shown · canonical sample · paginated by month · auto-refresh 60s';

/* ─────────────────────────────────────────
   Detail fixture types
   ───────────────────────────────────────── */

export interface SbAuditEntry {
  variant?: 'default' | 'danger' | 'system' | 'success';
  time: string;
  action: string;
  actor?: { initials: string; gradient: string; name: string; role?: string } | null;
  detail?: string;
  detailLinkLabel?: string;
  detailLinkHref?: string;
}

export interface SbNotificationTouch {
  variant: 'success' | 'warn';
  channel: 'email' | 'whatsapp' | 'in-app' | 'sms';
  name: string;
  detail: string;
  time: string;
  status: string;
}

export interface SbCommMessage {
  from: 'user' | 'admin';
  initials: string;
  gradient: string;
  body: string;
  meta: string;
}

export interface SbInternalNote {
  initials: string;
  gradient: string;
  author: string;
  role: string;
  time: string;
  body: string;
}

export interface SbAppealStep {
  label: string;
  status: 'done' | 'current' | 'pending';
  when: string;
}

export interface SbAppealAttachment {
  label: string;
  size: string;
}

export interface SbHeroStat {
  label: string;
  value: string;
  meta: string;
  variant?: 'normal' | 'warn' | 'danger';
}

export interface SbQuickStatRow {
  label: string;
  value: string;
  variant?: 'normal' | 'warn' | 'danger';
  link?: string;
  active?: boolean;
}

export interface SbCountdownData {
  eyebrow: string;
  label: string;
  cells: Array<{ value: string; label: string }>;
  progressPercent: number;
  meta: string;
  permanent?: boolean;
  liftedText?: string;
}

export interface SuspensionDetailProfile {
  id: string;
  atlasId: string;
  status: SuspensionStatus;
  statusLabel: string;
  heroVariant: 'amber' | 'danger' | 'lime' | 'success' | 'neutral';
  reasonChipLabel: string;
  detectedMeta: string;
  title: string;
  subtitleRaw: string;
  accountName: string;
  accountId: string;
  accountRole: SuspensionAccountRole;
  heroStats: SbHeroStat[];

  /* §01 — Appeal workflow (optional — only when applicable) */
  appeal?: {
    state: 'under-review' | 'approved' | 'denied' | 'none';
    stagePillLabel: string;
    headTitle: string;
    headMeta: string;
    steps: SbAppealStep[];
    statement?: {
      initials: string;
      gradient: string;
      author: string;
      time: string;
      body: string;
      attachments: SbAppealAttachment[];
    };
    reviewPrompt?: string;
    reviewActions?: Array<{ label: string; variant: 'default' | 'warn' | 'danger' | 'primary' }>;
  };

  /* §02 — Reason summary + audit chain */
  reasonSummary?: {
    eyebrow: string;
    bullet: string;
    sourceLinkLabel: string;
    sourceLinkHref: string;
  };
  auditChain: SbAuditEntry[];

  /* §03 — Notifications sent */
  notifications: SbNotificationTouch[];

  /* §04 — Communication thread */
  commThread: SbCommMessage[];

  /* §05 — Internal admin notes */
  internalNotes: SbInternalNote[];

  /* Rail */
  countdown: SbCountdownData;
  atAGlance: SbQuickStatRow[];
  sanctionLadder: Array<{ stage: string; description: string; variant?: 'normal' | 'warn' | 'danger'; active?: boolean }>;
}

/* ─────────────────────────────────────────
   CANONICAL DETAIL — SB-2026-0083 MAREK
   ───────────────────────────────────────── */
export const SUSPENSIONS_BANS_PROFILES: Record<string, SuspensionDetailProfile> = {
  'sb-2026-0083': {
    id: 'sb-2026-0083',
    atlasId: 'SB-2026-0083',
    status: 'suspended',
    statusLabel: 'Suspended · 7 days',
    heroVariant: 'amber',
    reasonChipLabel: 'Fake ID / liveness',
    detectedMeta: 'Imposed May 4 · 09:31 UTC · 1d 23h ago',
    title: 'Marek Kowalczyk · 7-day suspension · Identity-document fraud',
    subtitleRaw:
      'logged in May 4 with a flagged identity document. The liveness video and the submitted passport scan failed cross-verification (89% mismatch). A 7-day suspension was imposed pending appeal. The user filed an appeal on May 5 with three supporting documents (passport rescan, medical letter, timeline photos) and is currently under admin review with 23h remaining on the 48h SLA.',
    accountName: 'Marek Kowalczyk',
    accountId: 'cand-1142',
    accountRole: 'candidate',
    heroStats: [
      { label: 'Imposed by', value: 'Aïsha Okafor', meta: 'Trust & Safety lead' },
      { label: 'Imposed on', value: 'May 4 · 09:31', meta: '1d 23h ago' },
      { label: 'Expires', value: 'May 11 · 09:31', variant: 'warn', meta: 'auto-lift unless converted' },
      { label: 'Appeal', value: 'Under review', variant: 'warn', meta: '23h remaining for decision' },
    ],
    appeal: {
      state: 'under-review',
      stagePillLabel: 'Under review',
      headTitle: 'Appeal · Filed May 5 by user',
      headMeta: 'filed May 5 · 14:08 · SLA 48h · 23h remaining for decision',
      steps: [
        { label: 'Filed by user', status: 'done', when: 'May 5 · 14:08' },
        { label: 'Eligibility check', status: 'done', when: 'May 5 · 14:09' },
        { label: 'Admin review', status: 'current', when: 'in progress' },
        { label: 'Decision & close', status: 'pending', when: 'by May 7 · 14:08' },
      ],
      statement: {
        initials: 'MK',
        gradient: 'linear-gradient(135deg, #4A6741, #2C3E2A)',
        author: 'Marek Kowalczyk',
        time: 'May 5 · 14:08 UTC',
        body: 'I want to clarify the identity document confusion. The passport in my original submission was an older 2020 version that I had on file from a prior job application. The signature looks different because I recovered from a hand injury in 2022-2024 (medical letter attached). I have re-scanned my current passport (2025 issue) and included timestamped photos of myself holding the document. I have been on the platform for 4 months with 2 successful engagements and a 4.6★ rating — please review the new documents and consider lifting the suspension.',
        attachments: [
          { label: 'passport-2025.pdf', size: '2.4 MB' },
          { label: 'medical-2022-2024.pdf', size: '780 KB' },
          { label: 'timeline-photos.zip', size: '6.1 MB' },
        ],
      },
      reviewPrompt:
        'Three new documents submitted. The new passport scan passes liveness cross-check at 96% confidence. The medical letter is dated and signed by a verifiable physician. Recommended: approve & lift early.',
      reviewActions: [
        { label: 'Deny appeal', variant: 'default' },
        { label: 'Approve & lift early', variant: 'primary' },
      ],
    },
    reasonSummary: {
      eyebrow: 'PRIMARY REASON',
      bullet:
        'Identity document fraud — passport submission failed liveness cross-verification (89% facial mismatch vs the submitted ID photo).',
      sourceLinkLabel: 'FA-2026-0041 — Marek Kowalczyk identity flag',
      sourceLinkHref: '/admin/trust-safety/fraud-abuse/fa-2026-0041',
    },
    auditChain: [
      {
        variant: 'default',
        time: 'May 5 · 14:09 UTC',
        action: 'Appeal eligibility check passed',
        actor: { initials: 'SY', gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)', name: 'System (auto)', role: 'auto' },
        detail: 'User is eligible to file 1 appeal per sanction. No prior appeals on this sanction.',
      },
      {
        variant: 'default',
        time: 'May 5 · 14:08 UTC',
        action: 'Appeal filed by user',
        actor: { initials: 'MK', gradient: 'linear-gradient(135deg, #4A6741, #2C3E2A)', name: 'Marek Kowalczyk', role: 'user' },
        detail: 'Submitted via in-app appeal form · 3 attachments (passport rescan, medical letter, timeline photos).',
      },
      {
        variant: 'default',
        time: 'May 4 · 09:32 UTC',
        action: 'User notified of suspension',
        actor: { initials: 'SY', gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)', name: 'System (auto)', role: 'auto' },
        detail: 'Email + WhatsApp delivered · in-app banner shown · all confirmed delivered within 47s.',
      },
      {
        variant: 'danger',
        time: 'May 4 · 09:31 UTC',
        action: '7-day suspension imposed',
        actor: { initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', name: 'Aïsha Okafor', role: 'admin' },
        detail: 'Tier-1 sanction · auto-lift on May 11 09:31 UTC unless escalated or appealed-and-approved.',
        detailLinkLabel: 'Open FA-2026-0041',
        detailLinkHref: '/admin/trust-safety/fraud-abuse/fa-2026-0041',
      },
      {
        variant: 'system',
        time: 'May 4 · 09:18 UTC',
        action: 'Fraud alert raised',
        actor: { initials: 'SY', gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)', name: 'System (auto)', role: 'auto' },
        detail: 'Liveness classifier flagged the candidate · 89% mismatch · auto-escalated to FA-2026-0041.',
      },
      {
        variant: 'default',
        time: 'Jan 12 · earlier',
        action: 'Account created',
        actor: null,
        detail: 'Candidate signup · 4 months 12 days ago · 2 engagements since.',
      },
    ],
    notifications: [
      { variant: 'success', channel: 'email', name: 'Suspension notice (email)', detail: 'sent to marek.k@... · template t-susp-001', time: 'May 4 · 09:32', status: 'Delivered · Opened' },
      { variant: 'success', channel: 'whatsapp', name: 'WhatsApp notification', detail: 'sent to +48 ••• ••• 117 · template wa-susp-001', time: 'May 4 · 09:32', status: 'Delivered · Read' },
      { variant: 'success', channel: 'in-app', name: 'In-app banner', detail: 'shown on every login · 4 sessions across May 4-5', time: 'May 4-5', status: 'Shown · 4×' },
      { variant: 'success', channel: 'email', name: 'Appeal-received confirmation', detail: 'sent to marek.k@... · template t-appeal-rcv', time: 'May 5 · 14:09', status: 'Delivered · Opened' },
      { variant: 'warn', channel: 'email', name: 'Appeal-decision notification', detail: 'queued · will send on admin decision', time: 'pending', status: 'Queued' },
    ],
    commThread: [
      {
        from: 'user',
        initials: 'MK',
        gradient: 'linear-gradient(135deg, #4A6741, #2C3E2A)',
        body: "I'm confused about the suspension. The passport I uploaded is the one I've used everywhere. Can you tell me what was wrong?",
        meta: 'Marek · May 4 · 11:42 UTC',
      },
      {
        from: 'admin',
        initials: 'AO',
        gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)',
        body: "Hi Marek — yes, you can file an appeal in the next 14 days. The liveness video and the ID photo show a facial mismatch (89% confidence). If you have an updated passport or any documents that explain the discrepancy (medical records, photos with date stamps), please attach them to your appeal. We'll review within 48h.",
        meta: 'Aïsha · May 4 · 12:05 UTC',
      },
      {
        from: 'user',
        initials: 'MK',
        gradient: 'linear-gradient(135deg, #4A6741, #2C3E2A)',
        body: "Thank you, I'll prepare everything tonight and file tomorrow. I had a hand injury that affected my signature for 2 years and my passport is from before that.",
        meta: 'Marek · May 4 · 13:22 UTC',
      },
      {
        from: 'user',
        initials: 'MK',
        gradient: 'linear-gradient(135deg, #4A6741, #2C3E2A)',
        body: 'Appeal filed with 3 attachments: new passport (2025 issue), medical letter covering 2022-2024, and timestamped photos.',
        meta: 'Marek · May 5 · 14:11 UTC',
      },
    ],
    internalNotes: [
      {
        initials: 'DF',
        gradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)',
        author: 'Dario Fonseca',
        role: 'Super Admin',
        time: 'May 5 · 16:30 UTC',
        body: "New passport scan looks clean. Cross-verified with the medical letter and the 4-month engagement history — I'd approve. Adding context: Aïsha was on the right call to impose, the original flag was solid. Just outdated documents.",
      },
      {
        initials: 'SR',
        gradient: 'linear-gradient(135deg, #A0C9B8, #4F8B6E)',
        author: 'Sarah Reyes',
        role: 'Specialist',
        time: 'May 5 · 15:14 UTC',
        body: 'Reviewed the engagement history: 2 completed assignments with 4.6★ rating from clients. No prior flags. This reads as a genuine documentation gap, not fraud intent.',
      },
    ],
    countdown: {
      eyebrow: 'SUSPENSION EXPIRES',
      label: 'Auto-lifts May 11 · 09:31 UTC',
      cells: [
        { value: '5', label: 'Days' },
        { value: '9', label: 'Hours' },
        { value: '42', label: 'Minutes' },
      ],
      progressPercent: 27,
      meta: '1d 23h served · 5d 9h remaining · 27% of 7-day term elapsed',
    },
    atAGlance: [
      { label: 'Account', value: 'cand-1142 →', link: '/admin/users/candidates/cand-1142' },
      { label: 'Account age', value: '4 months · 12d' },
      { label: 'Prior sanctions', value: 'None' },
      { label: 'Engagements', value: '2 · 4.6 ★' },
      { label: 'Source case', value: 'FA-2026-0041 →', link: '/admin/trust-safety/fraud-abuse/fa-2026-0041' },
      { label: 'Appeal SLA', value: '23h remaining', variant: 'warn' },
      { label: 'Sanction tier', value: 'Tier 1' },
      { label: 'Next tier', value: 'Permanent ban' },
      { label: 'Audit log', value: '23 events →' },
    ],
    sanctionLadder: [
      { stage: '1st offense (here)', description: '7-day suspension + appeal window', variant: 'warn', active: true },
      { stage: '2nd offense', description: 'Permanent ban · no appeal', variant: 'danger' },
      { stage: 'Aggravating', description: 'Skip to ban (deception · forged docs · violence)' },
    ],
  },

  /* ───────── SB-2026-0084 · Vorona Capital · BANNED ───────── */
  'sb-2026-0084': {
    id: 'sb-2026-0084',
    atlasId: 'SB-2026-0084',
    status: 'banned',
    statusLabel: 'Banned · Permanent',
    heroVariant: 'danger',
    reasonChipLabel: 'Multi-account fraud',
    detectedMeta: 'Imposed May 5 · 11:42 UTC · Vorona ring',
    title: 'Vorona Capital + 4 linked · Permanent ban · Multi-account fraud',
    subtitleRaw:
      'and 4 linked client accounts permanently banned following multi-account fraud ring confirmation. Linked to fraud case FA-2026-0042. Appeal denied · permanent · no further recourse.',
    accountName: 'Vorona Capital',
    accountId: 'cl-167',
    accountRole: 'client',
    heroStats: [
      { label: 'Imposed by', value: 'Dario Fonseca', meta: 'Super Admin · Trust & Safety' },
      { label: 'Imposed on', value: 'May 5 · 11:42', meta: '1d 23h ago' },
      { label: 'Expires', value: 'Permanent', variant: 'danger', meta: 'no auto-lift' },
      { label: 'Appeal', value: 'Denied · final', variant: 'danger', meta: 'closed May 6 by Dario' },
    ],
    appeal: {
      state: 'denied',
      stagePillLabel: 'Appeal denied',
      headTitle: 'Appeal · Denied May 6 by Dario Fonseca',
      headMeta: 'filed May 5 · 16:08 · denied May 6 · 14:22 · 22h to decision',
      steps: [
        { label: 'Filed by user', status: 'done', when: 'May 5 · 16:08' },
        { label: 'Eligibility check', status: 'done', when: 'May 5 · 16:09' },
        { label: 'Admin review', status: 'done', when: 'May 6 · 10:15 → 14:22' },
        { label: 'Decision: DENIED', status: 'done', when: 'May 6 · 14:22' },
      ],
      statement: {
        initials: 'SV',
        gradient: 'linear-gradient(135deg, #C41E3A, #7E1525)',
        author: 'Sergei Vorona (rep. Vorona Capital)',
        time: 'May 5 · 16:08 UTC',
        body: 'We dispute the fraud-ring classification. The 4 linked accounts (Eastline, Northwind, Riverbend, Crestline) are independent business units operating under separate management with their own engagements. The shared registration metadata reflects our group treasury policy, not coordinated fraud. We request reconsideration of the permanent ban and propose a 90-day probationary monitoring period as a remedy.',
        attachments: [
          { label: 'operations-log.pdf', size: '3.2 MB' },
          { label: 'bank-statements-q1.pdf', size: '5.8 MB' },
          { label: 'employee-roster.pdf', size: '1.1 MB' },
        ],
      },
      reviewPrompt:
        'Appeal closed · evidence of coordinated fraud confirmed. Operations log paradoxically demonstrates same controller approving all 5 accounts. Beneficial ownership disclosure aligned with ring pattern. Treasury notified of receivable hold.',
      reviewActions: [],
    },
    reasonSummary: {
      eyebrow: 'PRIMARY REASON · CONFIRMED',
      bullet:
        'Multi-account fraud — 5 accounts created from same registration cluster with identical billing methods, coordinated invoice timing matching late-payment arbitrage pattern. Pattern auto-escalated from suspicious activity classifier (97% ring confidence).',
      sourceLinkLabel: 'FA-2026-0042 — Vorona Capital ring',
      sourceLinkHref: '/admin/trust-safety/fraud-abuse/fa-2026-0042',
    },
    auditChain: [
      { variant: 'danger', time: 'May 6 · 14:22 UTC', action: 'Appeal denied · final decision', actor: { initials: 'DF', gradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)', name: 'Dario Fonseca', role: 'Super Admin' }, detail: 'Evidence of coordinated fraud confirmed. No further appeal channel under the platform terms.' },
      { variant: 'default', time: 'May 6 · 10:15 UTC', action: 'Appeal review opened', actor: { initials: 'DF', gradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)', name: 'Dario Fonseca', role: 'Super Admin' }, detail: 'Reviewer assigned · evidence packet reviewed alongside ring case FA-2026-0042.' },
      { variant: 'default', time: 'May 5 · 16:08 UTC', action: 'Appeal filed by user', actor: { initials: 'SV', gradient: 'linear-gradient(135deg, #C41E3A, #7E1525)', name: 'Sergei Vorona', role: 'user' }, detail: 'Submitted via in-app form · 3 attachments (operations log, bank statements, employee roster).' },
      { variant: 'default', time: 'May 5 · 11:43 UTC', action: 'User notified of permanent ban', actor: { initials: 'SY', gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)', name: 'System (auto)', role: 'auto' }, detail: 'Email + WhatsApp delivered to 5 accounts · in-app banner shown · all delivered within 90s.' },
      { variant: 'danger', time: 'May 5 · 11:42 UTC', action: 'Permanent ban imposed (Vorona + 4 linked)', actor: { initials: 'DF', gradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)', name: 'Dario Fonseca', role: 'Super Admin' }, detail: 'Tier-2 sanction · 5 accounts banned simultaneously · audit-locked · Treasury notified.', detailLinkLabel: 'Open FA-2026-0042', detailLinkHref: '/admin/trust-safety/fraud-abuse/fa-2026-0042' },
      { variant: 'system', time: 'May 5 · 09:30 UTC', action: 'Fraud ring confirmed · 5 accounts linked', actor: { initials: 'SY', gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)', name: 'System (auto)', role: 'anomaly engine' }, detail: 'Cross-account analysis · 97% confidence · auto-escalated to Trust & Safety.' },
      { variant: 'system', time: 'May 4 · 22:15 UTC', action: 'Multi-account pattern detected', actor: { initials: 'SY', gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)', name: 'System (auto)', role: 'anomaly engine' }, detail: 'Late-payment arbitrage pattern · D28-D29 cycle · 14/14 invoices match.' },
      { variant: 'default', time: 'Mar 2025 · earlier', action: 'Account created', actor: null, detail: 'Vorona Capital signup · 14 months ago · 23 engagements since.' },
    ],
    notifications: [
      { variant: 'success', channel: 'email', name: 'Permanent ban notice (email)', detail: 'sent to ops@vorona-capital.... · template t-ban-perm', time: 'May 5 · 11:43', status: 'Delivered · Opened' },
      { variant: 'success', channel: 'whatsapp', name: 'WhatsApp notification', detail: 'sent to +33 ••• ••• 421 · template wa-ban-perm', time: 'May 5 · 11:43', status: 'Delivered · Read' },
      { variant: 'success', channel: 'in-app', name: 'In-app banner (all 5 accounts)', detail: 'shown on every login attempt · May 5-6 · 8× total', time: 'May 5-6', status: 'Shown · 8×' },
      { variant: 'success', channel: 'email', name: 'Appeal-received confirmation', detail: 'sent to ops@vorona-capital....', time: 'May 5 · 16:09', status: 'Delivered · Opened' },
      { variant: 'success', channel: 'email', name: 'Appeal-denied notification', detail: 'final decision delivered with reasoning summary', time: 'May 6 · 14:23', status: 'Delivered · Opened' },
      { variant: 'warn', channel: 'email', name: 'Final notice + collection trigger', detail: 'Treasury receivable handoff · pending finance approval', time: 'pending', status: 'Queued' },
    ],
    commThread: [
      { from: 'user', initials: 'SV', gradient: 'linear-gradient(135deg, #C41E3A, #7E1525)', body: "We dispute this. The accounts you've linked are separate business units. We'd like to appeal.", meta: 'Sergei · May 5 · 14:30 UTC' },
      { from: 'admin', initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', body: 'Hi Sergei — the appeal form is available in your dashboard. Please file with supporting documents. Note that the linked accounts share registration metadata and billing methods which formed the basis for the pattern detection.', meta: 'Aïsha · May 5 · 15:00 UTC' },
      { from: 'user', initials: 'SV', gradient: 'linear-gradient(135deg, #C41E3A, #7E1525)', body: 'Appeal filed with operational records, bank statements, and employee roster as evidence.', meta: 'Sergei · May 5 · 16:08 UTC' },
    ],
    internalNotes: [
      { initials: 'DF', gradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)', author: 'Dario Fonseca', role: 'Super Admin', time: 'May 6 · 14:25 UTC', body: 'Appeal denied. Evidence in operations log actually confirms the pattern — same controller approving all 5 invoices, identical signature workflow. Linked to FA-2026-0042 final disposition.' },
      { initials: 'SR', gradient: 'linear-gradient(135deg, #A0C9B8, #4F8B6E)', author: 'Sarah Reyes', role: 'Specialist', time: 'May 6 · 11:30 UTC', body: 'Reviewed bank statements. Funds flow shows all 5 accounts paying into a single beneficiary bank account. Coordinated.' },
      { initials: 'DF', gradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)', author: 'Dario Fonseca', role: 'Super Admin', time: 'May 5 · 12:15 UTC', body: 'Permanent ban imposed on Vorona + 4 linked (Eastline, Northwind, Riverbend, Crestline). Notified Treasury for receivable hold.' },
    ],
    countdown: { permanent: true, eyebrow: 'PERMANENT BAN', label: 'No expiration · no appeal channel', cells: [], progressPercent: 0, meta: 'Imposed May 5 · 11:42 UTC · audit-locked · linked to FA-2026-0042. The 4 satellite accounts (Eastline, Northwind, Riverbend, Crestline) share this sanction status.' },
    atAGlance: [
      { label: 'Account', value: 'cl-167 →', link: '/admin/users/clients/cl-167' },
      { label: 'Account age', value: '14 months' },
      { label: 'Prior sanctions', value: '1 (warning Mar 2025)', variant: 'warn' },
      { label: 'Engagements', value: '23 · 4.2 ★' },
      { label: 'Source case', value: 'FA-2026-0042 →', link: '/admin/trust-safety/fraud-abuse/fa-2026-0042' },
      { label: 'Linked accounts', value: '4 (Eastline +3)' },
      { label: 'Sanction tier', value: 'Permanent', variant: 'danger' },
      { label: 'Next tier', value: 'N/A · terminal' },
      { label: 'Audit log', value: '38 events →' },
    ],
    sanctionLadder: [
      { stage: '1st offense', description: '7-day suspension (warning Mar 2025 — served)' },
      { stage: '2nd offense (here)', description: 'Permanent ban · no appeal', variant: 'danger', active: true },
      { stage: 'Aggravating', description: 'N/A · already at terminal tier' },
    ],
  },

  /* ───────── SB-2026-0082 · Stefan Volkov · SUSPENDED 30d ───────── */
  'sb-2026-0082': {
    id: 'sb-2026-0082',
    atlasId: 'SB-2026-0082',
    status: 'suspended',
    statusLabel: 'Suspended · 30 days',
    heroVariant: 'amber',
    reasonChipLabel: 'Aggressive client comm',
    detectedMeta: 'Imposed May 1 · 14:08 UTC · DSP-2026-0144',
    title: 'Stefan Volkov · 30-day suspension · Aggressive client communications',
    subtitleRaw:
      'suspended 30 days following 3 formal client complaints about aggressive communication in chat. No appeal filed (appeal window closes May 8 — 3 days remaining). Disputes case DSP-2026-0144 linked.',
    accountName: 'Stefan Volkov',
    accountId: 'cand-318',
    accountRole: 'candidate',
    heroStats: [
      { label: 'Imposed by', value: 'Sarah Reyes', meta: 'Talent Specialist' },
      { label: 'Imposed on', value: 'May 1 · 14:08', meta: '5d 0h ago' },
      { label: 'Expires', value: 'May 31 · 14:08', variant: 'warn', meta: 'auto-lift' },
      { label: 'Appeal', value: 'None filed', variant: 'warn', meta: 'window closes May 8' },
    ],
    appeal: {
      state: 'none',
      stagePillLabel: 'No appeal filed',
      headTitle: 'Appeal · Not filed (window closing)',
      headMeta: 'appeal window: May 1 → May 8 · 3 days remaining',
      steps: [
        { label: 'Filed by user', status: 'pending', when: 'not started' },
        { label: 'Eligibility check', status: 'pending', when: '—' },
        { label: 'Admin review', status: 'pending', when: '—' },
        { label: 'Decision & close', status: 'pending', when: '—' },
      ],
    },
    reasonSummary: {
      eyebrow: 'PRIMARY REASON · CONFIRMED',
      bullet:
        '3 formal client complaints (Apr 12 / Apr 22 / Apr 28) about aggressive communication tone, profanity, and threats during candidate disputes. Pattern review by Talent Specialist confirmed sustained behavior.',
      sourceLinkLabel: 'DSP-2026-0144 — Stefan Volkov complaint thread',
      sourceLinkHref: '/admin/operations/disputes/dsp-144',
    },
    auditChain: [
      { variant: 'default', time: 'May 1 · 14:09 UTC', action: 'User notified of suspension', actor: { initials: 'SY', gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)', name: 'System (auto)', role: 'auto' }, detail: 'Email + WhatsApp delivered · in-app banner shown.' },
      { variant: 'danger', time: 'May 1 · 14:08 UTC', action: '30-day suspension imposed', actor: { initials: 'SR', gradient: 'linear-gradient(135deg, #A0C9B8, #4F8B6E)', name: 'Sarah Reyes', role: 'Specialist' }, detail: 'Tier-1 sanction · auto-lift on May 31 14:08 UTC unless extended.' },
      { variant: 'default', time: 'Apr 30 · 16:42 UTC', action: 'Specialist review · 3rd complaint confirmed', actor: { initials: 'SR', gradient: 'linear-gradient(135deg, #A0C9B8, #4F8B6E)', name: 'Sarah Reyes', role: 'Specialist' }, detail: 'Chat-log analysis: language escalation from argumentative → threatening across 3 incidents. Recommending suspension.' },
      { variant: 'default', time: 'Apr 28 · earlier', action: 'Complaint #3 filed', actor: null, detail: 'Filed by client cl-892 in DSP-2026-0144.', detailLinkLabel: 'Open DSP-2026-0144', detailLinkHref: '/admin/operations/disputes/dsp-144' },
      { variant: 'default', time: 'Aug 2024 · earlier', action: 'Account created', actor: null, detail: 'Candidate signup · 9 months ago · 8 engagements since.' },
    ],
    notifications: [
      { variant: 'success', channel: 'email', name: 'Suspension notice (email)', detail: 'sent to stefan.v@... · template t-susp-001', time: 'May 1 · 14:09', status: 'Delivered · Opened' },
      { variant: 'success', channel: 'whatsapp', name: 'WhatsApp notification', detail: 'sent to +49 ••• ••• 882', time: 'May 1 · 14:09', status: 'Delivered · Read' },
      { variant: 'success', channel: 'in-app', name: 'In-app banner', detail: 'shown on every login · 12× across May 1-13', time: 'May 1-13', status: 'Shown · 12×' },
      { variant: 'warn', channel: 'email', name: 'Auto-lift reminder (3d before)', detail: 'scheduled for May 28 · pre-lift checkup', time: 'May 28', status: 'Scheduled' },
    ],
    commThread: [
      { from: 'user', initials: 'SV', gradient: 'linear-gradient(135deg, #6E4F8B, #3D2B4E)', body: "I understand. I'll improve.", meta: 'Stefan · May 1 · 18:22 UTC' },
    ],
    internalNotes: [
      { initials: 'SR', gradient: 'linear-gradient(135deg, #A0C9B8, #4F8B6E)', author: 'Sarah Reyes', role: 'Specialist', time: 'May 1 · 14:30 UTC', body: 'Imposed 30-day suspension per policy after 3rd substantiated complaint. Behavior pattern documented in DSP-2026-0144.' },
      { initials: 'SR', gradient: 'linear-gradient(135deg, #A0C9B8, #4F8B6E)', author: 'Sarah Reyes', role: 'Specialist', time: 'Apr 29 · 11:00 UTC', body: 'Reviewing 3 complaints together. Reading chat logs — language has escalated from argumentative to threatening. Recommending formal suspension.' },
    ],
    countdown: { eyebrow: 'SUSPENSION EXPIRES', label: 'Auto-lifts May 31 · 14:08 UTC', cells: [{ value: '25', label: 'Days' }, { value: '14', label: 'Hours' }, { value: '32', label: 'Minutes' }], progressPercent: 17, meta: '5d served · 25d remaining · 17% of 30-day term elapsed' },
    atAGlance: [
      { label: 'Account', value: 'cand-318 →', link: '/admin/users/candidates/cand-318' },
      { label: 'Account age', value: '9 months' },
      { label: 'Prior sanctions', value: 'None' },
      { label: 'Engagements', value: '8 · 3.9 ★' },
      { label: 'Source case', value: 'DSP-2026-0144 →', link: '/admin/operations/disputes/dsp-144' },
      { label: 'Appeal status', value: 'Window open · 3d', variant: 'warn' },
      { label: 'Sanction tier', value: 'Tier 1' },
      { label: 'Next tier', value: 'Permanent ban' },
      { label: 'Audit log', value: '12 events →' },
    ],
    sanctionLadder: [
      { stage: '1st offense (here)', description: '30-day suspension + appeal window', variant: 'warn', active: true },
      { stage: '2nd offense', description: 'Permanent ban · no appeal', variant: 'danger' },
      { stage: 'Aggravating', description: 'Skip to ban (threats · physical · violence)' },
    ],
  },

  /* ───────── SB-2026-0078 · A2Z Solutions · BANNED ───────── */
  'sb-2026-0078': {
    id: 'sb-2026-0078',
    atlasId: 'SB-2026-0078',
    status: 'banned',
    statusLabel: 'Banned · Permanent',
    heroVariant: 'danger',
    reasonChipLabel: 'Sock-puppet reviews',
    detectedMeta: 'Imposed Apr 28 · 16:22 UTC · REV-834',
    title: 'A2Z Solutions Ltd · Permanent ban · Sock-puppet review network',
    subtitleRaw:
      'permanently banned following confirmed sock-puppet review operation. 14 fake review accounts traced to their internal network. Appeal denied May 1 — evidence shows direct involvement.',
    accountName: 'A2Z Solutions Ltd',
    accountId: 'cl-178',
    accountRole: 'client',
    heroStats: [
      { label: 'Imposed by', value: 'Dario Fonseca', meta: 'Super Admin' },
      { label: 'Imposed on', value: 'Apr 28 · 16:22', meta: '14d ago' },
      { label: 'Expires', value: 'Permanent', variant: 'danger', meta: 'no auto-lift' },
      { label: 'Appeal', value: 'Denied May 1', variant: 'danger', meta: 'final' },
    ],
    appeal: {
      state: 'denied',
      stagePillLabel: 'Appeal denied',
      headTitle: 'Appeal · Denied May 1 by Dario Fonseca',
      headMeta: 'filed Apr 29 · denied May 1 · evidence packet reviewed',
      steps: [
        { label: 'Filed by user', status: 'done', when: 'Apr 29 · 11:00' },
        { label: 'Eligibility check', status: 'done', when: 'Apr 29 · 11:02' },
        { label: 'Admin review', status: 'done', when: 'Apr 30 · 14:20' },
        { label: 'Decision: DENIED', status: 'done', when: 'May 1 · 09:15' },
      ],
      statement: {
        initials: 'A2',
        gradient: 'linear-gradient(135deg, #8B7355, #5C4D38)',
        author: 'Marcus Lin (CEO, A2Z Solutions)',
        time: 'Apr 29 · 11:00 UTC',
        body: "The 14 review accounts in question were created by an external marketing contractor acting outside our authorization. This was a marketing-oversight failure on our part — not a deliberate sock-puppet operation. We have terminated the contractor and request reconsideration of the permanent ban with a corrective-action plan instead.",
        attachments: [
          { label: 'marketing-policy.pdf', size: '420 KB' },
          { label: 'contractor-list.pdf', size: '180 KB' },
        ],
      },
      reviewPrompt:
        'Appeal closed · Evidence shows direct A2Z account involvement: 14 review accounts share A2Z internal IP block, 8 used A2Z email domain aliases, 6 paid for via A2Z corporate card. Contractor-only attribution is not supported by the evidence.',
      reviewActions: [],
    },
    reasonSummary: {
      eyebrow: 'PRIMARY REASON · CONFIRMED',
      bullet:
        'Sock-puppet review network — 14 fake review accounts traced to A2Z internal IP block. Same payment method (corporate card), same domain aliases. Review-stuffing scheme inflated A2Z rating from 3.4 ★ → 4.8 ★ over 90 days.',
      sourceLinkLabel: 'REV-834 — A2Z sock-puppet investigation',
      sourceLinkHref: '/admin/operations/reviews/rev-834',
    },
    auditChain: [
      { variant: 'danger', time: 'May 1 · 09:15 UTC', action: 'Appeal denied · final', actor: { initials: 'DF', gradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)', name: 'Dario Fonseca', role: 'Super Admin' }, detail: 'Evidence packet contradicted appeal claims · contractor attribution not supported.' },
      { variant: 'default', time: 'Apr 30 · 14:20 UTC', action: 'Appeal review opened', actor: { initials: 'DF', gradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)', name: 'Dario Fonseca', role: 'Super Admin' }, detail: 'Reviewer cross-referenced contractor list against IP/payment trail.' },
      { variant: 'default', time: 'Apr 29 · 11:00 UTC', action: 'Appeal filed by user', actor: { initials: 'A2', gradient: 'linear-gradient(135deg, #8B7355, #5C4D38)', name: 'Marcus Lin', role: 'CEO · user' }, detail: 'Submitted with marketing-policy + contractor-list attachments.' },
      { variant: 'default', time: 'Apr 28 · 16:30 UTC', action: 'User notified of permanent ban', actor: { initials: 'SY', gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)', name: 'System (auto)', role: 'auto' }, detail: 'Email + WhatsApp · in-app banner.' },
      { variant: 'danger', time: 'Apr 28 · 16:22 UTC', action: 'Permanent ban imposed', actor: { initials: 'DF', gradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)', name: 'Dario Fonseca', role: 'Super Admin' }, detail: 'Tier-2 sanction · audit-locked · 14 sock-puppet accounts also frozen.' },
      { variant: 'system', time: 'Apr 27 · 09:00 UTC', action: 'Sock-puppet network confirmed', actor: { initials: 'SY', gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)', name: 'System (auto)', role: 'anomaly engine' }, detail: '14 accounts · same IP block · same payment method · 96% confidence.' },
      { variant: 'default', time: 'May 2023', action: 'Account created', actor: null, detail: 'A2Z Solutions signup · 24 months ago · 47 engagements since.' },
    ],
    notifications: [
      { variant: 'success', channel: 'email', name: 'Permanent ban notice', detail: 'sent to ceo@a2z-solutions....', time: 'Apr 28 · 16:30', status: 'Delivered · Opened' },
      { variant: 'success', channel: 'whatsapp', name: 'WhatsApp notification', detail: 'sent to +1 ••• ••• 4291', time: 'Apr 28 · 16:30', status: 'Delivered · Read' },
      { variant: 'success', channel: 'in-app', name: 'In-app banner', detail: 'shown on every login attempt · Apr 28 → May 1', time: 'Apr 28-May 1', status: 'Shown · 6×' },
      { variant: 'success', channel: 'email', name: 'Appeal-received confirmation', detail: 'sent Apr 29', time: 'Apr 29 · 11:02', status: 'Delivered · Opened' },
      { variant: 'success', channel: 'email', name: 'Appeal-denied notification', detail: 'final decision delivered with reasoning summary', time: 'May 1 · 09:16', status: 'Delivered · Opened' },
    ],
    commThread: [
      { from: 'user', initials: 'A2', gradient: 'linear-gradient(135deg, #8B7355, #5C4D38)', body: 'This is a misunderstanding — our marketing contractor acted outside scope. We can prove this.', meta: 'Marcus · Apr 28 · 18:00 UTC' },
      { from: 'admin', initials: 'DF', gradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)', body: 'Hi Marcus — you can file a formal appeal in your dashboard within 14 days. Please include any evidence that the activity was unauthorized. We will review with the full evidence packet.', meta: 'Dario · Apr 28 · 19:30 UTC' },
    ],
    internalNotes: [
      { initials: 'DF', gradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)', author: 'Dario Fonseca', role: 'Super Admin', time: 'May 1 · 09:20 UTC', body: 'Appeal denied. Contractor list provided does not match the actual IPs / payment methods used by the 14 review accounts. Strong evidence of direct A2Z involvement.' },
      { initials: 'SR', gradient: 'linear-gradient(135deg, #A0C9B8, #4F8B6E)', author: 'Sarah Reyes', role: 'Specialist', time: 'Apr 30 · 16:30 UTC', body: 'Cross-checked the contractor invoices with the timing of fake reviews. Mismatch — reviews posted from A2Z office hours, not contractor work hours.' },
    ],
    countdown: { permanent: true, eyebrow: 'PERMANENT BAN', label: 'No expiration · no appeal channel', cells: [], progressPercent: 0, meta: 'Imposed Apr 28 · 16:22 UTC · audit-locked · 14 sock-puppet accounts also frozen.' },
    atAGlance: [
      { label: 'Account', value: 'cl-178 →', link: '/admin/users/clients/cl-178' },
      { label: 'Account age', value: '24 months' },
      { label: 'Prior sanctions', value: 'None' },
      { label: 'Engagements', value: '47 · 4.8 ★ (inflated)' },
      { label: 'Source case', value: 'REV-834 →', link: '/admin/operations/reviews/rev-834' },
      { label: 'Linked accounts', value: '14 sock-puppets · all frozen' },
      { label: 'Sanction tier', value: 'Permanent', variant: 'danger' },
      { label: 'Next tier', value: 'N/A · terminal' },
      { label: 'Audit log', value: '52 events →' },
    ],
    sanctionLadder: [
      { stage: '1st offense', description: 'Would have been 14-day suspension (skipped)' },
      { stage: '2nd offense (here)', description: 'Permanent ban · no appeal', variant: 'danger', active: true },
      { stage: 'Aggravating', description: 'Network operation = ban without warning ladder' },
    ],
  },

  /* ───────── SB-2026-0080 · Studio Berlin · APPEALING UNDER REVIEW ───────── */
  'sb-2026-0080': {
    id: 'sb-2026-0080',
    atlasId: 'SB-2026-0080',
    status: 'suspended',
    statusLabel: 'Suspended · 14 days',
    heroVariant: 'amber',
    reasonChipLabel: 'Late payment pattern',
    detectedMeta: 'Imposed Apr 30 · 10:15 UTC · 4 invoices',
    title: 'Studio Berlin GmbH · 14-day suspension · Late payment pattern',
    subtitleRaw:
      'suspended 14 days for sustained late-payment pattern (4 invoices > 30 days overdue). Appeal filed Apr 30 — currently under admin review with 8d 22h remaining on decision window.',
    accountName: 'Studio Berlin GmbH',
    accountId: 'cl-002',
    accountRole: 'client',
    heroStats: [
      { label: 'Imposed by', value: 'Aïsha Okafor', meta: 'Trust & Safety lead' },
      { label: 'Imposed on', value: 'Apr 30 · 10:15', meta: '6d ago' },
      { label: 'Expires', value: 'May 14 · 10:15', variant: 'warn', meta: 'auto-lift' },
      { label: 'Appeal', value: 'Under review', variant: 'warn', meta: '8d 22h to decision' },
    ],
    appeal: {
      state: 'under-review',
      stagePillLabel: 'Under review',
      headTitle: 'Appeal · Filed Apr 30 by user',
      headMeta: 'filed Apr 30 · 14:30 · SLA extended 14d for finance verification',
      steps: [
        { label: 'Filed by user', status: 'done', when: 'Apr 30 · 14:30' },
        { label: 'Eligibility check', status: 'done', when: 'Apr 30 · 14:32' },
        { label: 'Admin review', status: 'current', when: 'in progress' },
        { label: 'Decision & close', status: 'pending', when: 'by May 14' },
      ],
      statement: {
        initials: 'SB',
        gradient: 'linear-gradient(135deg, #6B4226, #3F260F)',
        author: 'Hannah Becker (CFO, Studio Berlin)',
        time: 'Apr 30 · 14:30 UTC',
        body: 'The 4 late invoices were a direct consequence of a delayed payment from our largest client (Northwind Industrial, $180K, 60d overdue). We have provided cash-flow statements and the client-payment evidence showing this is a temporary liquidity issue, not a pattern of non-payment. We have engagements in queue worth €240K and need the suspension lifted to honor them.',
        attachments: [
          { label: 'cash-flow-statement.pdf', size: '1.4 MB' },
          { label: 'client-payment-evidence.pdf', size: '880 KB' },
        ],
      },
      reviewPrompt:
        'Cash flow statement shows genuine liquidity issue · Northwind payment confirmed received May 3 ($180K cleared) · queued engagements worth €240K. Recommended: approve & lift early with 60-day payment-monitoring condition.',
      reviewActions: [
        { label: 'Deny appeal', variant: 'default' },
        { label: 'Approve with conditions', variant: 'warn' },
        { label: 'Approve & lift', variant: 'primary' },
      ],
    },
    reasonSummary: {
      eyebrow: 'PRIMARY REASON · CONFIRMED',
      bullet:
        'Late payment pattern — 4 invoices > 30 days overdue across Q1 2026 (avg 41 days late, totaling $63K). Triggered the auto-suspension threshold per finance policy.',
      sourceLinkLabel: 'FIN-aging-report Q1 2026',
      sourceLinkHref: '#',
    },
    auditChain: [
      { variant: 'default', time: 'May 5 · 11:20 UTC', action: 'Northwind payment verification received', actor: { initials: 'SR', gradient: 'linear-gradient(135deg, #A0C9B8, #4F8B6E)', name: 'Sarah Reyes', role: 'Specialist' }, detail: 'Bank confirms $180K cleared May 3. Studio Berlin cash position now positive.' },
      { variant: 'default', time: 'Apr 30 · 14:32 UTC', action: 'Appeal eligibility check passed', actor: { initials: 'SY', gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)', name: 'System (auto)', role: 'auto' }, detail: 'Eligible to file 1 appeal · no prior appeals on this sanction.' },
      { variant: 'default', time: 'Apr 30 · 14:30 UTC', action: 'Appeal filed by user', actor: { initials: 'SB', gradient: 'linear-gradient(135deg, #6B4226, #3F260F)', name: 'Hannah Becker', role: 'CFO · user' }, detail: 'Submitted with 2 attachments (cash flow + client payment evidence).' },
      { variant: 'default', time: 'Apr 30 · 10:16 UTC', action: 'User notified of suspension', actor: { initials: 'SY', gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)', name: 'System (auto)', role: 'auto' }, detail: 'Email + WhatsApp delivered.' },
      { variant: 'danger', time: 'Apr 30 · 10:15 UTC', action: '14-day suspension imposed', actor: { initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', name: 'Aïsha Okafor', role: 'admin' }, detail: 'Auto-lift on May 14 · finance-policy enforcement.' },
    ],
    notifications: [
      { variant: 'success', channel: 'email', name: 'Suspension notice', detail: 'sent to billing@studio-berlin....', time: 'Apr 30 · 10:16', status: 'Delivered · Opened' },
      { variant: 'success', channel: 'whatsapp', name: 'WhatsApp notification', detail: 'sent to +49 ••• ••• 552', time: 'Apr 30 · 10:16', status: 'Delivered · Read' },
      { variant: 'success', channel: 'in-app', name: 'In-app banner', detail: 'shown on every login · 9× across Apr 30-May 6', time: 'Apr 30-May 6', status: 'Shown · 9×' },
      { variant: 'warn', channel: 'email', name: 'Appeal-decision notification', detail: 'queued · awaiting admin decision', time: 'pending', status: 'Queued' },
    ],
    commThread: [
      { from: 'user', initials: 'SB', gradient: 'linear-gradient(135deg, #6B4226, #3F260F)', body: 'The late payments were due to Northwind delaying our $180K invoice. We are not insolvent. Can we appeal?', meta: 'Hannah · Apr 30 · 13:45 UTC' },
      { from: 'admin', initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', body: 'Hi Hannah — yes, please file an appeal with bank statements showing the Northwind delay and your current cash position. We will review within 14 days.', meta: 'Aïsha · Apr 30 · 14:00 UTC' },
      { from: 'user', initials: 'SB', gradient: 'linear-gradient(135deg, #6B4226, #3F260F)', body: 'Appeal filed with cash-flow statement and client-payment evidence.', meta: 'Hannah · Apr 30 · 14:32 UTC' },
    ],
    internalNotes: [
      { initials: 'SR', gradient: 'linear-gradient(135deg, #A0C9B8, #4F8B6E)', author: 'Sarah Reyes', role: 'Specialist', time: 'May 5 · 11:30 UTC', body: 'Northwind cleared $180K on May 3 — confirmed via bank. Studio Berlin cash position now positive. Appeal looks legit. Recommending approve with 60d monitoring condition.' },
      { initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', author: 'Aïsha Okafor', role: 'Trust & Safety lead', time: 'May 1 · 09:00 UTC', body: 'Imposed per finance policy. Open to lifting if the cash-flow story checks out — they have queued engagements depending on it.' },
    ],
    countdown: { eyebrow: 'SUSPENSION EXPIRES', label: 'Auto-lifts May 14 · 10:15 UTC', cells: [{ value: '8', label: 'Days' }, { value: '22', label: 'Hours' }, { value: '15', label: 'Minutes' }], progressPercent: 36, meta: '5d served · 8d 22h remaining · 36% of 14-day term elapsed · appeal pending' },
    atAGlance: [
      { label: 'Account', value: 'cl-002 →', link: '/admin/users/clients/cl-002' },
      { label: 'Account age', value: '3 years' },
      { label: 'Prior sanctions', value: 'None' },
      { label: 'Engagements', value: '38 · 4.7 ★' },
      { label: 'Source case', value: 'FIN-aging-report' },
      { label: 'Appeal SLA', value: '8d 22h remaining', variant: 'warn' },
      { label: 'Sanction tier', value: 'Tier 1' },
      { label: 'Next tier', value: 'Permanent ban' },
      { label: 'Audit log', value: '14 events →' },
    ],
    sanctionLadder: [
      { stage: '1st offense (here)', description: '14-day suspension + appeal window', variant: 'warn', active: true },
      { stage: '2nd offense', description: 'Permanent ban · no appeal', variant: 'danger' },
      { stage: 'Aggravating', description: 'Skip to ban (fraud, willful non-payment)' },
    ],
  },

  /* ───────── SB-2026-0081 · Carlos Mendez · BANNED 3rd strike ───────── */
  'sb-2026-0081': {
    id: 'sb-2026-0081',
    atlasId: 'SB-2026-0081',
    status: 'banned',
    statusLabel: 'Banned · Permanent',
    heroVariant: 'danger',
    reasonChipLabel: 'Repeat rule violations',
    detectedMeta: 'Imposed May 2 · 09:50 UTC · 3 strikes',
    title: 'Carlos Mendez · Permanent ban · 3rd strike rule violation',
    subtitleRaw:
      'permanently banned after 3rd substantiated rule violation in 90 days. Pattern: ghosting clients mid-engagement (3 incidents at days 14, 47, 82). Appeal window closed May 5 — no appeal filed.',
    accountName: 'Carlos Mendez',
    accountId: 'cand-732',
    accountRole: 'candidate',
    heroStats: [
      { label: 'Imposed by', value: 'Sarah Reyes', meta: 'Talent Specialist' },
      { label: 'Imposed on', value: 'May 2 · 09:50', meta: '4d ago' },
      { label: 'Expires', value: 'Permanent', variant: 'danger', meta: 'no auto-lift' },
      { label: 'Appeal', value: 'Window closed', variant: 'danger', meta: 'no filing on record' },
    ],
    appeal: {
      state: 'none',
      stagePillLabel: 'No appeal filed',
      headTitle: 'Appeal · Not filed (window closed)',
      headMeta: 'appeal window: May 2 → May 5 · closed without filing',
      steps: [
        { label: 'Filed by user', status: 'pending', when: 'not started' },
        { label: 'Eligibility check', status: 'pending', when: '—' },
        { label: 'Admin review', status: 'pending', when: '—' },
        { label: 'Decision & close', status: 'pending', when: '—' },
      ],
    },
    reasonSummary: {
      eyebrow: 'PRIMARY REASON · CONFIRMED',
      bullet:
        '3 substantiated ghosting incidents across 90 days — Feb 5 (eng-091, day 14), Mar 18 (eng-138, day 47), May 1 (eng-204, day 82). Each incident left a client mid-engagement with deliverables unfinished. 3-strike rule triggered permanent ban.',
      sourceLinkLabel: 'Strikes log · 3 incidents',
      sourceLinkHref: '#',
    },
    auditChain: [
      { variant: 'default', time: 'May 2 · 09:51 UTC', action: 'User notified of permanent ban', actor: { initials: 'SY', gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)', name: 'System (auto)', role: 'auto' }, detail: 'Email + WhatsApp delivered.' },
      { variant: 'danger', time: 'May 2 · 09:50 UTC', action: 'Permanent ban imposed (3rd strike)', actor: { initials: 'SR', gradient: 'linear-gradient(135deg, #A0C9B8, #4F8B6E)', name: 'Sarah Reyes', role: 'Specialist' }, detail: 'Tier-2 sanction · 3-strike rule triggered · audit-locked.' },
      { variant: 'default', time: 'May 1 · earlier', action: 'Strike #3 substantiated', actor: { initials: 'SR', gradient: 'linear-gradient(135deg, #A0C9B8, #4F8B6E)', name: 'Sarah Reyes', role: 'Specialist' }, detail: 'Ghosting incident in eng-204 (day 82 of 90-day window) · client wrote off engagement.' },
      { variant: 'default', time: 'Mar 18 · earlier', action: 'Strike #2 substantiated', actor: null, detail: 'Ghosting in eng-138 (day 47).' },
      { variant: 'default', time: 'Feb 5 · earlier', action: 'Strike #1 substantiated', actor: null, detail: 'Ghosting in eng-091 (day 14) · official warning issued.' },
      { variant: 'default', time: 'Sep 2024', action: 'Account created', actor: null, detail: 'Candidate signup · 8 months ago · 11 engagements (3 ghosted).' },
    ],
    notifications: [
      { variant: 'success', channel: 'email', name: 'Permanent ban notice', detail: 'sent to carlos.m@...', time: 'May 2 · 09:51', status: 'Delivered · Opened' },
      { variant: 'success', channel: 'whatsapp', name: 'WhatsApp notification', detail: 'sent to +52 ••• ••• 411', time: 'May 2 · 09:51', status: 'Delivered · Read' },
      { variant: 'success', channel: 'in-app', name: 'In-app banner', detail: 'shown on every login attempt · 4× across May 2-5', time: 'May 2-5', status: 'Shown · 4×' },
      { variant: 'warn', channel: 'email', name: 'Appeal-window-closed notification', detail: 'no appeal filed · final notice', time: 'May 5 · 23:00', status: 'Delivered' },
    ],
    commThread: [],
    internalNotes: [
      { initials: 'SR', gradient: 'linear-gradient(135deg, #A0C9B8, #4F8B6E)', author: 'Sarah Reyes', role: 'Specialist', time: 'May 2 · 10:00 UTC', body: '3-strike threshold triggered. All 3 incidents substantiated by client complaints + non-response logs. Permanent ban per policy.' },
      { initials: 'SR', gradient: 'linear-gradient(135deg, #A0C9B8, #4F8B6E)', author: 'Sarah Reyes', role: 'Specialist', time: 'May 1 · 16:00 UTC', body: 'Strike #3 confirmed (eng-204). Client wrote off $4,200. This is the 3rd ghosting in 90 days. Recommending permanent ban.' },
    ],
    countdown: { permanent: true, eyebrow: 'PERMANENT BAN', label: 'No expiration · appeal window closed', cells: [], progressPercent: 0, meta: 'Imposed May 2 · 09:50 UTC · audit-locked · 3-strike rule · no appeal on file.' },
    atAGlance: [
      { label: 'Account', value: 'cand-732 →', link: '/admin/users/candidates/cand-732' },
      { label: 'Account age', value: '8 months' },
      { label: 'Prior sanctions', value: '1 (Feb warning)' },
      { label: 'Engagements', value: '11 · 3 ghosted', variant: 'warn' },
      { label: 'Source case', value: 'Strikes log · 3 incidents' },
      { label: 'Appeal status', value: 'Window closed', variant: 'danger' },
      { label: 'Sanction tier', value: 'Permanent', variant: 'danger' },
      { label: 'Next tier', value: 'N/A · terminal' },
      { label: 'Audit log', value: '18 events →' },
    ],
    sanctionLadder: [
      { stage: '1st offense', description: 'Warning Feb 5 (strike #1 — served)' },
      { stage: '2nd offense (here)', description: 'Permanent ban · 3-strike rule', variant: 'danger', active: true },
      { stage: 'Aggravating', description: 'Repeat pattern within 90d = immediate ban' },
    ],
  },

  /* ───────── SB-2026-0075 · Ravi Khanna · SERVED auto-lifted ───────── */
  'sb-2026-0075': {
    id: 'sb-2026-0075',
    atlasId: 'SB-2026-0075',
    status: 'expired',
    statusLabel: 'Served · Lifted',
    heroVariant: 'success',
    reasonChipLabel: 'Verbal abuse during interview',
    detectedMeta: 'Imposed Apr 22 · 11:44 UTC · auto-lifted Apr 25',
    title: 'Ravi Khanna · 3-day suspension · Served · Lifted Apr 25',
    subtitleRaw:
      'served a 3-day suspension for verbal abuse during a candidate interview. Auto-lifted Apr 25 09:00 UTC. No further action required · account fully restored.',
    accountName: 'Ravi Khanna',
    accountId: 'cand-882',
    accountRole: 'candidate',
    heroStats: [
      { label: 'Imposed by', value: 'Jana Reinholt', meta: 'Specialist' },
      { label: 'Imposed on', value: 'Apr 22 · 11:44', meta: '20d ago' },
      { label: 'Expires', value: 'Lifted Apr 25', variant: 'normal', meta: 'auto-lifted · 3d served' },
      { label: 'Appeal', value: 'None filed', meta: 'sanction served' },
    ],
    appeal: {
      state: 'none',
      stagePillLabel: 'Sanction served',
      headTitle: 'Appeal · Not applicable',
      headMeta: 'sanction served · no appeal required · account fully restored',
      steps: [
        { label: 'Filed by user', status: 'pending', when: 'not filed' },
        { label: 'Eligibility check', status: 'pending', when: '—' },
        { label: 'Admin review', status: 'pending', when: '—' },
        { label: 'Decision & close', status: 'pending', when: '—' },
      ],
    },
    reasonSummary: {
      eyebrow: 'PRIMARY REASON · SERVED',
      bullet:
        'Verbal abuse during a candidate interview — single incident · chat transcript documented insulting language and dismissive tone toward interviewer. Tier-1 sanction served fully.',
      sourceLinkLabel: 'Interview transcript · Apr 22',
      sourceLinkHref: '#',
    },
    auditChain: [
      { variant: 'success', time: 'Apr 25 · 09:00 UTC', action: 'Suspension auto-lifted · account restored', actor: { initials: 'SY', gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)', name: 'System (auto)', role: 'auto' }, detail: '3-day term elapsed · all platform features re-enabled · audit log finalized.' },
      { variant: 'default', time: 'Apr 22 · 11:45 UTC', action: 'User notified of suspension', actor: { initials: 'SY', gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)', name: 'System (auto)', role: 'auto' }, detail: 'Email + in-app banner.' },
      { variant: 'danger', time: 'Apr 22 · 11:44 UTC', action: '3-day suspension imposed', actor: { initials: 'JR', gradient: 'linear-gradient(135deg, #B8860B, #8B5A00)', name: 'Jana Reinholt', role: 'Specialist' }, detail: 'Tier-1 sanction · auto-lift Apr 25.' },
      { variant: 'default', time: 'Apr 22 · 09:30 UTC', action: 'Specialist review completed', actor: { initials: 'JR', gradient: 'linear-gradient(135deg, #B8860B, #8B5A00)', name: 'Jana Reinholt', role: 'Specialist' }, detail: 'Chat transcript reviewed · single substantiated incident · no prior pattern.' },
      { variant: 'default', time: 'Apr 22 · 08:15 UTC', action: 'Complaint filed by candidate', actor: null, detail: 'Filed by interview candidate after the session ended.' },
    ],
    notifications: [
      { variant: 'success', channel: 'email', name: 'Suspension notice', detail: 'sent to ravi.k@...', time: 'Apr 22 · 11:45', status: 'Delivered · Opened' },
      { variant: 'success', channel: 'in-app', name: 'In-app banner', detail: 'shown on every login · 3× across Apr 22-25', time: 'Apr 22-25', status: 'Shown · 3×' },
      { variant: 'success', channel: 'email', name: 'Auto-lift confirmation', detail: 'account restored notification', time: 'Apr 25 · 09:01', status: 'Delivered · Opened' },
      { variant: 'success', channel: 'in-app', name: 'Welcome-back banner', detail: 'shown on first post-lift login', time: 'Apr 25 · 10:14', status: 'Shown · 1×' },
    ],
    commThread: [
      { from: 'user', initials: 'RK', gradient: 'linear-gradient(135deg, #5C8E5A, #2D4F2C)', body: 'I apologize for my behavior in the interview. I was having a difficult day and that is no excuse. It will not happen again.', meta: 'Ravi · Apr 22 · 14:00 UTC' },
      { from: 'admin', initials: 'JR', gradient: 'linear-gradient(135deg, #B8860B, #8B5A00)', body: 'Thank you for the acknowledgment, Ravi. The 3-day suspension will auto-lift on Apr 25. Please review the Communication guidelines in your dashboard.', meta: 'Jana · Apr 22 · 15:30 UTC' },
    ],
    internalNotes: [
      { initials: 'JR', gradient: 'linear-gradient(135deg, #B8860B, #8B5A00)', author: 'Jana Reinholt', role: 'Specialist', time: 'Apr 22 · 12:00 UTC', body: 'First incident · candidate apologized · imposing standard 3-day. No appeal expected. Monitor for repeat.' },
    ],
    countdown: { liftedText: 'Lifted', eyebrow: 'SANCTION LIFTED', label: 'Auto-lifted Apr 25 · 09:00 UTC', cells: [], progressPercent: 100, meta: '3 days served fully · account restored · audit log finalized · no further action required.' },
    atAGlance: [
      { label: 'Account', value: 'cand-882 →', link: '/admin/users/candidates/cand-882' },
      { label: 'Account age', value: '11 months' },
      { label: 'Prior sanctions', value: 'None' },
      { label: 'Engagements', value: '6 · 4.4 ★' },
      { label: 'Source case', value: 'Interview transcript' },
      { label: 'Appeal status', value: 'N/A · served' },
      { label: 'Sanction tier', value: 'Tier 1 (served)' },
      { label: 'Next tier', value: 'Tier 2 (if repeat)' },
      { label: 'Audit log', value: '9 events →' },
    ],
    sanctionLadder: [
      { stage: '1st offense (served)', description: '3-day suspension · served Apr 22-25' },
      { stage: '2nd offense', description: 'Permanent ban · no appeal', variant: 'danger' },
      { stage: 'Aggravating', description: 'Skip to ban (threats · violence)' },
    ],
  },

  /* ───────── SB-2026-0079 · Sara Vellas · AUTO-LIFTED ───────── */
  'sb-2026-0079': {
    id: 'sb-2026-0079',
    atlasId: 'SB-2026-0079',
    status: 'auto-lifted',
    statusLabel: 'Auto-lifted',
    heroVariant: 'lime',
    reasonChipLabel: 'Login anomaly · compromised device',
    detectedMeta: 'Imposed Apr 28 · 03:11 UTC · auto-lifted Apr 28 14:22',
    title: 'Sara Vellas · Login anomaly · Auto-lifted after re-auth',
    subtitleRaw:
      'account auto-suspended Apr 28 03:11 UTC after the anomaly engine detected a login from an unrecognized geo + device combination. Auto-lifted Apr 28 14:22 after Sara completed device re-verification. No user action required and no record of compromise.',
    accountName: 'Sara Vellas',
    accountId: 'cand-456',
    accountRole: 'candidate',
    heroStats: [
      { label: 'Imposed by', value: 'System (auto)', meta: 'anomaly engine' },
      { label: 'Imposed on', value: 'Apr 28 · 03:11', meta: '14d ago' },
      { label: 'Expires', value: 'Lifted same day', variant: 'normal', meta: '11h 11m served' },
      { label: 'Appeal', value: 'N/A · auto-lifted', meta: 'system protective action' },
    ],
    appeal: {
      state: 'none',
      stagePillLabel: 'Auto-lifted',
      headTitle: 'Appeal · Not applicable',
      headMeta: 'system auto-lift after device re-verification · no appeal required',
      steps: [
        { label: 'Filed by user', status: 'pending', when: 'not filed' },
        { label: 'Eligibility check', status: 'pending', when: '—' },
        { label: 'Admin review', status: 'pending', when: '—' },
        { label: 'Decision & close', status: 'pending', when: '—' },
      ],
    },
    reasonSummary: {
      eyebrow: 'PRIMARY REASON · AUTO-LIFTED',
      bullet:
        'Login anomaly — Apr 28 03:11 UTC login from IP in unrecognized geo (Bucharest, RO) combined with device fingerprint mismatch. Auto-protective action paused the account and triggered a re-verification challenge. Sara completed re-auth from her primary device on Apr 28 14:22 UTC and the suspension lifted automatically.',
      sourceLinkLabel: 'Login anomaly log',
      sourceLinkHref: '#',
    },
    auditChain: [
      { variant: 'success', time: 'Apr 28 · 14:22 UTC', action: 'Auto-lifted after successful re-auth', actor: { initials: 'SY', gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)', name: 'System (auto)', role: 'auto' }, detail: 'Device re-verification passed · account restored · no compromise confirmed.' },
      { variant: 'default', time: 'Apr 28 · 13:45 UTC', action: 'User completed device re-verification', actor: { initials: 'SV', gradient: 'linear-gradient(135deg, #707070, #404040)', name: 'Sara Vellas', role: 'user' }, detail: 'Mobile re-auth flow · primary device confirmed · 2FA passed.' },
      { variant: 'default', time: 'Apr 28 · 03:15 UTC', action: 'User notified of suspension', actor: { initials: 'SY', gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)', name: 'System (auto)', role: 'auto' }, detail: 'Email + WhatsApp with re-verification link.' },
      { variant: 'system', time: 'Apr 28 · 03:11 UTC', action: 'Account auto-suspended', actor: { initials: 'SY', gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)', name: 'System (auto)', role: 'anomaly engine' }, detail: 'Auto-protective action · prevents potential compromise while re-auth is challenged.' },
      { variant: 'system', time: 'Apr 28 · 03:10 UTC', action: 'Login anomaly detected', actor: { initials: 'SY', gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)', name: 'System (auto)', role: 'anomaly engine' }, detail: 'IP from RO (unrecognized) + device fingerprint mismatch · risk score 78%.' },
      { variant: 'default', time: 'Feb 2025', action: 'Account created', actor: null, detail: 'Candidate signup · 3 months ago · 1 engagement.' },
    ],
    notifications: [
      { variant: 'success', channel: 'email', name: 'Suspension + re-verification notice', detail: 'sent to sara.v@... · template t-auto-protect', time: 'Apr 28 · 03:15', status: 'Delivered · Opened' },
      { variant: 'success', channel: 'whatsapp', name: 'WhatsApp notification', detail: 'sent to +30 ••• ••• 117', time: 'Apr 28 · 03:15', status: 'Delivered · Read' },
      { variant: 'success', channel: 'in-app', name: 'Login banner', detail: 'shown at re-auth attempt', time: 'Apr 28 · 13:45', status: 'Shown · 1×' },
      { variant: 'success', channel: 'email', name: 'Re-auth complete confirmation', detail: 'account restored notification', time: 'Apr 28 · 14:23', status: 'Delivered · Opened' },
      { variant: 'success', channel: 'in-app', name: 'Welcome-back banner', detail: 'shown on first post-lift login', time: 'Apr 28 · 15:01', status: 'Shown · 1×' },
    ],
    commThread: [
      { from: 'user', initials: 'SV', gradient: 'linear-gradient(135deg, #707070, #404040)', body: 'I tried to log in this morning and got a security challenge. I have re-verified and would like confirmation that everything is okay.', meta: 'Sara · Apr 28 · 13:50 UTC' },
      { from: 'admin', initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', body: 'Hi Sara — the system flagged a login attempt from an unrecognized location. Your re-verification was successful and the protective hold has lifted. We recommend reviewing your active sessions in account settings just to be safe.', meta: 'Aïsha · Apr 28 · 14:30 UTC' },
    ],
    internalNotes: [
      { initials: 'AO', gradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)', author: 'Aïsha Okafor', role: 'Trust & Safety lead', time: 'Apr 28 · 14:35 UTC', body: 'Auto-lift worked as intended. Sara verified from her primary device within 12h. No compromise. Marking as a successful auto-protective action.' },
    ],
    countdown: { liftedText: 'Lifted', eyebrow: 'AUTO-LIFTED', label: 'Lifted Apr 28 · 14:22 UTC', cells: [], progressPercent: 100, meta: '11h 11m of protective hold · system auto-lifted after successful device re-verification · no compromise confirmed.' },
    atAGlance: [
      { label: 'Account', value: 'cand-456 →', link: '/admin/users/candidates/cand-456' },
      { label: 'Account age', value: '3 months' },
      { label: 'Prior sanctions', value: 'None' },
      { label: 'Engagements', value: '1 · unrated' },
      { label: 'Source case', value: 'Login anomaly log' },
      { label: 'Appeal status', value: 'N/A · auto-lifted' },
      { label: 'Sanction tier', value: 'Tier 0 · auto-protect' },
      { label: 'Next tier', value: 'Tier 1 (if repeat anomaly)' },
      { label: 'Audit log', value: '11 events →' },
    ],
    sanctionLadder: [
      { stage: 'Tier 0 (here)', description: 'Auto-protective action · system-driven · lifts on re-verification' },
      { stage: 'Tier 1', description: 'Manual review if anomaly repeats', variant: 'warn' },
      { stage: 'Tier 2', description: 'Permanent ban if confirmed compromise', variant: 'danger' },
    ],
  },

  /* ───────── SB-2026-0085 · Eastline Holdings · BANNED ring satellite ───────── */
  'sb-2026-0085': {
    id: 'sb-2026-0085',
    atlasId: 'SB-2026-0085',
    status: 'banned',
    statusLabel: 'Banned · Permanent',
    heroVariant: 'danger',
    reasonChipLabel: 'Vorona ring satellite',
    detectedMeta: 'Imposed May 5 · 11:42 UTC · linked to SB-2026-0084',
    title: 'Eastline Holdings · Permanent ban · Vorona ring satellite',
    subtitleRaw:
      'permanently banned as a confirmed satellite of the Vorona Capital ring (SB-2026-0084). Linked through shared registration metadata, billing methods, and beneficial ownership. Appeal denied May 6 following ring-wide denial.',
    accountName: 'Eastline Holdings',
    accountId: 'cl-201',
    accountRole: 'client',
    heroStats: [
      { label: 'Imposed by', value: 'Dario Fonseca', meta: 'Super Admin' },
      { label: 'Imposed on', value: 'May 5 · 11:42', meta: '1d 23h ago' },
      { label: 'Expires', value: 'Permanent', variant: 'danger', meta: 'no auto-lift' },
      { label: 'Appeal', value: 'Denied May 6', variant: 'danger', meta: 'ring-wide denial' },
    ],
    appeal: {
      state: 'denied',
      stagePillLabel: 'Appeal denied',
      headTitle: 'Appeal · Denied May 6 by Dario Fonseca',
      headMeta: 'filed May 5 · 17:14 · denied May 6 · 14:30 · ring-wide decision',
      steps: [
        { label: 'Filed by user', status: 'done', when: 'May 5 · 17:14' },
        { label: 'Eligibility check', status: 'done', when: 'May 5 · 17:16' },
        { label: 'Admin review', status: 'done', when: 'May 6 · 11:00 → 14:30' },
        { label: 'Decision: DENIED', status: 'done', when: 'May 6 · 14:30' },
      ],
      statement: {
        initials: 'EH',
        gradient: 'linear-gradient(135deg, #C41E3A, #7E1525)',
        author: 'Maria Costa (Controller, Eastline Holdings)',
        time: 'May 5 · 17:14 UTC',
        body: 'Eastline operates independently from Vorona Capital despite the shared parent group structure. Our engagements have always been delivered to spec and payments made in good faith. We attach the corporate registration and ownership-disclosure documents to demonstrate independent operation, and we request reconsideration of the satellite classification.',
        attachments: [
          { label: 'corporate-registration.pdf', size: '1.8 MB' },
          { label: 'ownership-disclosure.pdf', size: '2.4 MB' },
        ],
      },
      reviewPrompt:
        'Appeal closed · Ownership disclosure confirms 100% beneficial-owner overlap with Vorona Capital · 3 of 5 directors are shared · billing routes through the same bank account. Eastline is a confirmed ring satellite. No path to lift.',
      reviewActions: [],
    },
    reasonSummary: {
      eyebrow: 'PRIMARY REASON · CONFIRMED',
      bullet:
        'Ring satellite — Eastline Holdings linked to Vorona Capital (SB-2026-0084) by shared beneficial ownership (100% overlap), shared directors (3 of 5), shared billing routing (same bank account), and shared payment timing pattern (D28-D29). Confirmed as a satellite operating under the Vorona ring umbrella.',
      sourceLinkLabel: 'FA-2026-0042 — Vorona Capital ring',
      sourceLinkHref: '/admin/trust-safety/fraud-abuse/fa-2026-0042',
    },
    auditChain: [
      { variant: 'danger', time: 'May 6 · 14:30 UTC', action: 'Appeal denied · final', actor: { initials: 'DF', gradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)', name: 'Dario Fonseca', role: 'Super Admin' }, detail: 'Ownership documents confirmed ring membership · ring-wide denial in effect.' },
      { variant: 'default', time: 'May 6 · 11:00 UTC', action: 'Appeal review opened', actor: { initials: 'DF', gradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)', name: 'Dario Fonseca', role: 'Super Admin' }, detail: 'Cross-referenced with Vorona ring evidence packet · 100% beneficial ownership overlap confirmed.' },
      { variant: 'default', time: 'May 5 · 17:14 UTC', action: 'Appeal filed by user', actor: { initials: 'EH', gradient: 'linear-gradient(135deg, #C41E3A, #7E1525)', name: 'Maria Costa', role: 'Controller · user' }, detail: 'Submitted with corporate registration + ownership disclosure attachments.' },
      { variant: 'default', time: 'May 5 · 11:43 UTC', action: 'User notified of permanent ban', actor: { initials: 'SY', gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)', name: 'System (auto)', role: 'auto' }, detail: 'Email + WhatsApp delivered · in-app banner shown.' },
      { variant: 'danger', time: 'May 5 · 11:42 UTC', action: 'Permanent ban imposed (ring satellite)', actor: { initials: 'DF', gradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)', name: 'Dario Fonseca', role: 'Super Admin' }, detail: 'Tier-2 sanction · linked to SB-2026-0084 (Vorona Capital) · audit-locked.', detailLinkLabel: 'Open SB-2026-0084', detailLinkHref: '/admin/trust-safety/suspensions-bans/sb-2026-0084' },
      { variant: 'system', time: 'May 5 · 09:32 UTC', action: 'Ring satellite confirmed by cross-account analysis', actor: { initials: 'SY', gradient: 'linear-gradient(135deg, #6E3FE0, #3D2B6F)', name: 'System (auto)', role: 'anomaly engine' }, detail: 'Beneficial ownership + billing routing + payment pattern · 96% satellite confidence.' },
      { variant: 'default', time: 'Sep 2024', action: 'Account created', actor: null, detail: 'Eastline Holdings signup · 8 months ago · 11 engagements since.' },
    ],
    notifications: [
      { variant: 'success', channel: 'email', name: 'Permanent ban notice', detail: 'sent to ops@eastline-holdings....', time: 'May 5 · 11:43', status: 'Delivered · Opened' },
      { variant: 'success', channel: 'whatsapp', name: 'WhatsApp notification', detail: 'sent to +33 ••• ••• 887', time: 'May 5 · 11:43', status: 'Delivered · Read' },
      { variant: 'success', channel: 'in-app', name: 'In-app banner', detail: 'shown on every login attempt · 6× across May 5-6', time: 'May 5-6', status: 'Shown · 6×' },
      { variant: 'success', channel: 'email', name: 'Appeal-received confirmation', detail: 'sent May 5', time: 'May 5 · 17:16', status: 'Delivered · Opened' },
      { variant: 'success', channel: 'email', name: 'Appeal-denied notification', detail: 'final decision delivered with reasoning summary', time: 'May 6 · 14:31', status: 'Delivered · Opened' },
    ],
    commThread: [
      { from: 'user', initials: 'EH', gradient: 'linear-gradient(135deg, #C41E3A, #7E1525)', body: 'We are an independent business unit. Our operations and engagements have always been delivered in good faith. We dispute the ring-satellite classification.', meta: 'Maria · May 5 · 15:40 UTC' },
      { from: 'admin', initials: 'DF', gradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)', body: 'Hi Maria — you can file a formal appeal with ownership documents and any evidence of operational independence. We will review the documents alongside the ring evidence packet.', meta: 'Dario · May 5 · 16:30 UTC' },
    ],
    internalNotes: [
      { initials: 'DF', gradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)', author: 'Dario Fonseca', role: 'Super Admin', time: 'May 6 · 14:35 UTC', body: 'Appeal denied. Ownership disclosure confirms 100% beneficial-owner overlap with Vorona Capital. 3 of 5 directors are shared. Billing routes through the same bank account. Eastline is a confirmed ring satellite.' },
      { initials: 'SR', gradient: 'linear-gradient(135deg, #A0C9B8, #4F8B6E)', author: 'Sarah Reyes', role: 'Specialist', time: 'May 6 · 12:00 UTC', body: 'Reviewed corporate registration. Shows Eastline registered Sep 2024 with the same beneficial owner as Vorona Capital. Same Frankfurt mailing address as Vorona. Confirmed satellite.' },
    ],
    countdown: { permanent: true, eyebrow: 'PERMANENT BAN', label: 'No expiration · linked to Vorona ring', cells: [], progressPercent: 0, meta: 'Imposed May 5 · 11:42 UTC · audit-locked · linked to SB-2026-0084 (Vorona Capital). Ring-wide denial in effect.' },
    atAGlance: [
      { label: 'Account', value: 'cl-201 →', link: '/admin/users/clients/cl-201' },
      { label: 'Account age', value: '8 months' },
      { label: 'Prior sanctions', value: 'None' },
      { label: 'Engagements', value: '11 · 4.5 ★' },
      { label: 'Source case', value: 'FA-2026-0042 →', link: '/admin/trust-safety/fraud-abuse/fa-2026-0042' },
      { label: 'Linked sanction', value: 'SB-2026-0084 →', link: '/admin/trust-safety/suspensions-bans/sb-2026-0084' },
      { label: 'Sanction tier', value: 'Permanent', variant: 'danger' },
      { label: 'Next tier', value: 'N/A · terminal' },
      { label: 'Audit log', value: '27 events →' },
    ],
    sanctionLadder: [
      { stage: '1st offense', description: 'Would have been 14-day suspension (skipped)' },
      { stage: '2nd offense (here)', description: 'Permanent ban · ring satellite', variant: 'danger', active: true },
      { stage: 'Aggravating', description: 'Ring membership = ban without warning ladder' },
    ],
  },
};

/**
 * Stub profiles for the 8 non-canonical IDs — minimal hero data only.
 */
export interface SuspensionStubProfile {
  id: string;
  atlasId: string;
  status: SuspensionStatus;
  statusLabel: string;
  heroVariant: 'amber' | 'danger' | 'lime' | 'success' | 'neutral';
  reasonChipLabel: string;
  detectedMeta: string;
  title: string;
  accountName: string;
  accountId: string;
  accountRole: SuspensionAccountRole;
}

export const SUSPENSIONS_BANS_STUBS: Record<string, SuspensionStubProfile> = {
  'sb-2026-0084': {
    id: 'sb-2026-0084',
    atlasId: 'SB-2026-0084',
    status: 'banned',
    statusLabel: 'Banned · Permanent',
    heroVariant: 'danger',
    reasonChipLabel: 'Multi-account fraud',
    detectedMeta: 'Imposed May 5 · 11:42 UTC · Vorona ring',
    title: 'Vorona Capital + 4 linked · Permanent ban · Multi-account fraud',
    accountName: 'Vorona Capital',
    accountId: 'cl-167',
    accountRole: 'client',
  },
  'sb-2026-0082': {
    id: 'sb-2026-0082',
    atlasId: 'SB-2026-0082',
    status: 'suspended',
    statusLabel: 'Suspended · 30 days',
    heroVariant: 'amber',
    reasonChipLabel: 'Aggressive client comm',
    detectedMeta: 'Imposed May 1 · 14:08 UTC · DSP-2026-0144',
    title: 'Stefan Volkov · 30-day suspension · Aggressive client communications',
    accountName: 'Stefan Volkov',
    accountId: 'cand-318',
    accountRole: 'candidate',
  },
  'sb-2026-0078': {
    id: 'sb-2026-0078',
    atlasId: 'SB-2026-0078',
    status: 'banned',
    statusLabel: 'Banned · Permanent',
    heroVariant: 'danger',
    reasonChipLabel: 'Sock-puppet reviews',
    detectedMeta: 'Imposed Apr 28 · 16:22 UTC · REV-834',
    title: 'A2Z Solutions Ltd · Permanent ban · Sock-puppet review network',
    accountName: 'A2Z Solutions Ltd',
    accountId: 'cl-178',
    accountRole: 'client',
  },
  'sb-2026-0080': {
    id: 'sb-2026-0080',
    atlasId: 'SB-2026-0080',
    status: 'suspended',
    statusLabel: 'Suspended · 14 days',
    heroVariant: 'amber',
    reasonChipLabel: 'Late payment pattern',
    detectedMeta: 'Imposed Apr 30 · 10:15 UTC · 4 invoices',
    title: 'Studio Berlin GmbH · 14-day suspension · Late payment pattern',
    accountName: 'Studio Berlin GmbH',
    accountId: 'cl-002',
    accountRole: 'client',
  },
  'sb-2026-0081': {
    id: 'sb-2026-0081',
    atlasId: 'SB-2026-0081',
    status: 'banned',
    statusLabel: 'Banned · Permanent',
    heroVariant: 'danger',
    reasonChipLabel: 'Repeat rule violations',
    detectedMeta: 'Imposed May 2 · 09:50 UTC · 3 strikes',
    title: 'Carlos Mendez · Permanent ban · 3rd strike rule violation',
    accountName: 'Carlos Mendez',
    accountId: 'cand-732',
    accountRole: 'candidate',
  },
  'sb-2026-0075': {
    id: 'sb-2026-0075',
    atlasId: 'SB-2026-0075',
    status: 'expired',
    statusLabel: 'Served · Lifted',
    heroVariant: 'success',
    reasonChipLabel: 'Verbal abuse during interview',
    detectedMeta: 'Imposed Apr 22 · 11:44 UTC · auto-lifted Apr 25',
    title: 'Ravi Khanna · 3-day suspension · Served · Lifted Apr 25',
    accountName: 'Ravi Khanna',
    accountId: 'cand-882',
    accountRole: 'candidate',
  },
  'sb-2026-0079': {
    id: 'sb-2026-0079',
    atlasId: 'SB-2026-0079',
    status: 'auto-lifted',
    statusLabel: 'Auto-lifted',
    heroVariant: 'lime',
    reasonChipLabel: 'Login anomaly · compromised device',
    detectedMeta: 'Imposed Apr 28 · 03:11 UTC · auto-lifted same day',
    title: 'Sara Vellas · Login anomaly · Auto-lifted after re-auth',
    accountName: 'Sara Vellas',
    accountId: 'cand-456',
    accountRole: 'candidate',
  },
  'sb-2026-0085': {
    id: 'sb-2026-0085',
    atlasId: 'SB-2026-0085',
    status: 'banned',
    statusLabel: 'Banned · Permanent',
    heroVariant: 'danger',
    reasonChipLabel: 'Vorona ring satellite',
    detectedMeta: 'Imposed May 5 · 11:42 UTC · linked to SB-2026-0084',
    title: 'Eastline Holdings · Permanent ban · Vorona ring satellite',
    accountName: 'Eastline Holdings',
    accountId: 'cl-201',
    accountRole: 'client',
  },
};

export const SUSPENSIONS_BANS_DETAIL_IDS = [
  'sb-2026-0083',
  'sb-2026-0084',
  'sb-2026-0082',
  'sb-2026-0078',
  'sb-2026-0080',
  'sb-2026-0081',
  'sb-2026-0075',
  'sb-2026-0079',
  'sb-2026-0085',
];
