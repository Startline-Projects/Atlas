// Type definitions

export type DsrTypeVariant = 'access' | 'correction' | 'deletion' | 'portability' | 'restriction' | 'objection';
export type DsrJurisdictionVariant = 'gdpr' | 'uk-gdpr' | 'ccpa' | 'pipeda' | 'voluntary';
export type DsrIdVariant = 'verified' | 'pending' | 'failed';
export type DsrStatusVariant = 'dsr-processing' | 'dsr-verifying' | 'dsr-rejected' | 'dsr-received' | 'dsr-closed';

export interface DsrTypeBadge {
  variant: DsrTypeVariant;
  label: string;
}

export interface DsrJurisdictionBadge {
  variant: DsrJurisdictionVariant;
  label: string;
  flagStyle?: React.CSSProperties;
}

export interface DsrIdPill {
  variant: DsrIdVariant;
  label: string;
}

export interface DsrStatus {
  variant: DsrStatusVariant;
  label: string;
}

export interface DsrSubject {
  initials: string;
  avatarGradient: string;
  name: string;
  metaHtml: string; // can contain anchor refs
}

export interface DsrDeadline {
  date: string;
  rel: string;
  variant?: 'urgent' | 'warn' | 'met';
}

export interface DsrRow {
  id: string;
  subject: DsrSubject;
  type: DsrTypeBadge;
  jurisdiction: DsrJurisdictionBadge;
  filed: { date: string; rel: string };
  deadline: DsrDeadline;
  idPill: DsrIdPill;
  status: DsrStatus;
  rowVariant?: 'urgent' | 'warn';
}

// DETAIL types

export interface DsrHero {
  id: string;
  statusLabel: string;
  type: DsrTypeBadge;
  jurisdiction: DsrJurisdictionBadge;
  filedMeta: string;
  title: string;
  subtitleHtml: string;
}

export interface DsrHeroStat {
  label: string;
  value: string;
  meta: string;
  variant?: 'warn' | 'success' | 'danger';
  valueStyle?: React.CSSProperties;
}

export interface DsrIdMethod {
  name: string;
  metaHtml: string;
  time: string;
}

export interface DsrIdGate {
  variant: 'verified' | 'pending' | 'failed';
  eyebrow: string;
  heading: string;
  confidenceLabel: string;
  confidence: string;
  methods: DsrIdMethod[];
  summary: Array<{ key: string; value: string; valueStyle?: React.CSSProperties }>;
}

export interface DsrCountdown {
  eyebrow: string;
  label: string;
  days: number;
  hours: number;
  minutes: number;
  barFillPct: number;
  metaHtml: string;
}

export interface DsrSubjectCard {
  initials: string;
  avatarGradient: string;
  name: string;
  subjectId: string;
  metaRows: Array<{ label: string; value: string; variant?: 'warn' | 'danger' | 'success' }>;
}

export interface DsrQuickStat {
  label: string;
  value: string;
  variant?: 'success' | 'danger';
}

export interface DsrDpoCounsel {
  name: string;
  firm: string;
  initials: string;
  avatarGradient: string;
  metaRows: Array<{ label: string; value: string }>;
}

export interface DsrGround {
  article?: string;
  strength?: 'strong' | 'weak';
  name: string;
  descHtml: string;
}

export interface DsrGroundsSide {
  eyebrow: string;
  title: string;
  grounds: DsrGround[];
}

export interface DsrGroundsRecommendation {
  title: string;
  detailHtml: string;
}

export interface DsrGroundsBalance {
  metaLabel: string;
  statusLabel: string;
  subject: DsrGroundsSide;
  atlas: DsrGroundsSide;
  recommendation: DsrGroundsRecommendation;
}

export interface DsrScopeItem {
  name: string;
  count: string;
  detailHtml: string;
  legalBasis?: string;
}

export interface DsrScopeColumn {
  count: number;
  items: DsrScopeItem[];
}

export interface DsrProcessStrip {
  textHtml: string;
  primaryBtnLabel: string;
  executeBtnLabel: string;
}

export interface DsrScopeSplit {
  metaLabel: string;
  delete: DsrScopeColumn;
  retain: DsrScopeColumn;
  processStrip: DsrProcessStrip;
}

export interface DsrAuditEntry {
  time: string;
  action: string;
  actorHtml: string;
  detail: string;
  variant?: 'warn';
}

export interface DsrNote {
  author: string;
  role: string;
  time: string;
  text: string;
  initials: string;
  avatarGradient: string;
}

export interface DsrNoteComposer {
  author: string;
  role: string;
  initials: string;
  avatarGradient: string;
  placeholder: string;
}

export interface DsrDetail {
  id: string;
  breadcrumb: { backLabel: string; filterLabel: string; currentLabel: string };
  hero: DsrHero;
  heroStats: DsrHeroStat[];
  idGate: DsrIdGate;
  countdown: DsrCountdown;
  subjectCard: DsrSubjectCard;
  quickstats: DsrQuickStat[];
  quickstatsNote: string;
  dpoCounsel: DsrDpoCounsel;
  groundsBalance?: DsrGroundsBalance;
  scope?: DsrScopeSplit;
  audit?: DsrAuditEntry[];
  notes?: { existing: DsrNote[]; composer: DsrNoteComposer };
}

// LIST META

export const dsrListMeta = {
  title: 'Data subject rights',
  metaText: '/admin/compliance/data-subject-rights · 11 active · 1 deadline this week · 2 ID-verification pending · 30d statutory window (GDPR/CCPA)',
  metaPulse: 'DSR-2026-0089 · Marek deletion · Article 17 grounds analysis open',
};

export const dsrStats = [
  {
    label: 'Active requests',
    value: '11',
    metaHtml: '<strong>4 access</strong> · 3 deletion · 2 portability · 1 correction · 1 objection',
  },
  {
    label: 'Deadline this week',
    value: '1',
    metaHtml: '<strong>DSR-2026-0087</strong> · 3d remaining · portability',
    variant: 'danger' as const,
  },
  {
    label: 'ID verification pending',
    value: '2',
    metaHtml: 'cannot process · gate open',
    variant: 'warn' as const,
  },
  {
    label: 'Avg fulfillment',
    value: '14',
    suffix: 'days',
    metaHtml: 'well within 30d SLA · 100% on-time',
  },
  {
    label: 'Closed · YTD',
    value: '87',
    metaHtml: '71 access · 11 deletion · 5 other',
    variant: 'success' as const,
  },
];

export const dsrFilterChips = [
  { id: 'all', label: 'All', count: 98, active: true },
  { id: 'active', label: 'Active', count: 11 },
  { id: 'access', label: 'Access', count: 4 },
  { id: 'deletion', label: 'Deletion', count: 3 },
  { id: 'portability', label: 'Portability', count: 2 },
  { id: 'correction', label: 'Correction', count: 1 },
  { id: 'objection', label: 'Objection', count: 1 },
];

export const dsrRows: DsrRow[] = [
  {
    id: 'DSR-2026-0089',
    subject: {
      initials: 'MK',
      avatarGradient: 'linear-gradient(135deg, #4A6741, #2C3E2A)',
      name: 'Marek Kowalczyk',
      metaHtml: 'cand-1142 · suspended · <a style="color: var(--ink-mute); text-decoration: underline;">SB-2026-0083</a>',
    },
    type: { variant: 'deletion', label: 'Deletion · Art. 17' },
    jurisdiction: { variant: 'gdpr', label: 'GDPR · PL' },
    filed: { date: 'Apr 28', rel: '13d ago' },
    deadline: { date: 'May 28', rel: '17d remaining', variant: 'warn' },
    idPill: { variant: 'verified', label: 'Verified' },
    status: { variant: 'dsr-processing', label: 'Processing' },
    rowVariant: 'warn',
  },
  {
    id: 'DSR-2026-0088',
    subject: {
      initials: 'AE',
      avatarGradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)',
      name: 'Adesuwa Eze',
      metaHtml: 'cand-001 · active candidate',
    },
    type: { variant: 'access', label: 'Access · Art. 15' },
    jurisdiction: {
      variant: 'voluntary',
      label: 'Voluntary · NG',
      flagStyle: { background: 'linear-gradient(to bottom, #00853e 50%, #ffffff 50%)', border: '1px solid var(--ink)' },
    },
    filed: { date: 'May 3', rel: '8d ago' },
    deadline: { date: 'Jun 2', rel: '22d remaining' },
    idPill: { variant: 'verified', label: 'Verified' },
    status: { variant: 'dsr-processing', label: 'Processing' },
  },
  {
    id: 'DSR-2026-0087',
    subject: {
      initials: 'MC',
      avatarGradient: 'linear-gradient(135deg, #8B4F6E, #4F2D3E)',
      name: 'Mira Chowdhury',
      metaHtml: 'cand-1156 · active candidate',
    },
    type: { variant: 'portability', label: 'Portability · Art. 20' },
    jurisdiction: { variant: 'uk-gdpr', label: 'UK GDPR · GB' },
    filed: { date: 'Apr 14', rel: '27d ago' },
    deadline: { date: 'May 14', rel: '3d remaining', variant: 'urgent' },
    idPill: { variant: 'pending', label: 'Pending' },
    status: { variant: 'dsr-verifying', label: 'Verifying' },
    rowVariant: 'urgent',
  },
  {
    id: 'DSR-2026-0086',
    subject: {
      initials: 'JP',
      avatarGradient: 'linear-gradient(135deg, #5C8E5A, #2D4F2C)',
      name: 'Jennifer Park',
      metaHtml: 'cand-201 · US · CA',
    },
    type: { variant: 'correction', label: 'Correction · CCPA' },
    jurisdiction: { variant: 'ccpa', label: 'CCPA · CA' },
    filed: { date: 'May 6', rel: '5d ago' },
    deadline: { date: 'Jun 20', rel: '40d remaining · 45d SLA' },
    idPill: { variant: 'verified', label: 'Verified' },
    status: { variant: 'dsr-processing', label: 'Processing' },
  },
  {
    id: 'DSR-2026-0085',
    subject: {
      initials: 'SB',
      avatarGradient: 'linear-gradient(135deg, #6B4226, #3F260F)',
      name: 'Studio Berlin GmbH',
      metaHtml: 'cl-002 · client account · suspension appeal',
    },
    type: { variant: 'access', label: 'Access · Art. 15' },
    jurisdiction: { variant: 'gdpr', label: 'GDPR · DE' },
    filed: { date: 'May 5', rel: '6d ago' },
    deadline: { date: 'Jun 4', rel: '24d remaining' },
    idPill: { variant: 'verified', label: 'Verified' },
    status: { variant: 'dsr-processing', label: 'Processing' },
  },
  {
    id: 'DSR-2026-0084',
    subject: {
      initials: 'VC',
      avatarGradient: 'linear-gradient(135deg, #C41E3A, #7E1525)',
      name: 'Vorona Capital',
      metaHtml: 'cl-167 · banned · <a style="color: var(--danger); text-decoration: underline; font-weight: 600;">FA-2026-0042</a>',
    },
    type: { variant: 'deletion', label: 'Deletion · Art. 17' },
    jurisdiction: { variant: 'gdpr', label: 'GDPR · NL' },
    filed: { date: 'May 7', rel: '4d ago' },
    deadline: { date: 'Jun 6', rel: '26d · legal hold', variant: 'warn' },
    idPill: { variant: 'failed', label: 'Failed · suspected' },
    status: { variant: 'dsr-rejected', label: 'Rejected' },
    rowVariant: 'urgent',
  },
  {
    id: 'DSR-2026-0083',
    subject: {
      initials: 'TY',
      avatarGradient: 'linear-gradient(135deg, #6E4F8B, #3D2B4E)',
      name: 'Tomás Yúdice',
      metaHtml: 'cand-019 · DSP-2026-0144 dispute history',
    },
    type: { variant: 'access', label: 'Access' },
    jurisdiction: {
      variant: 'voluntary',
      label: 'Voluntary · AR',
      flagStyle: { background: '#6cace4', border: '1px solid var(--ink)' },
    },
    filed: { date: 'May 9', rel: '2d ago' },
    deadline: { date: 'Jun 8', rel: '28d remaining' },
    idPill: { variant: 'verified', label: 'Verified' },
    status: { variant: 'dsr-received', label: 'Received' },
  },
  {
    id: 'DSR-2026-0082',
    subject: {
      initials: 'HM',
      avatarGradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)',
      name: 'Hannah Müller',
      metaHtml: 'cand-1411 · active · marketing opt-out',
    },
    type: { variant: 'objection', label: 'Objection · Art. 21' },
    jurisdiction: { variant: 'gdpr', label: 'GDPR · DE' },
    filed: { date: 'Apr 18', rel: '23d ago' },
    deadline: { date: 'May 5', rel: 'closed Apr 25', variant: 'met' },
    idPill: { variant: 'verified', label: 'Verified' },
    status: { variant: 'dsr-closed', label: 'Closed' },
  },
  {
    id: 'DSR-2026-0081',
    subject: {
      initials: 'DK',
      avatarGradient: 'linear-gradient(135deg, #707070, #404040)',
      name: 'David Kim',
      metaHtml: 'cand-1455 · active · profile-search restricted',
    },
    type: { variant: 'restriction', label: 'Restriction · Art. 18' },
    jurisdiction: { variant: 'uk-gdpr', label: 'UK GDPR · GB' },
    filed: { date: 'Apr 12', rel: '29d ago' },
    deadline: { date: 'May 12', rel: 'closed Apr 22', variant: 'met' },
    idPill: { variant: 'verified', label: 'Verified' },
    status: { variant: 'dsr-closed', label: 'Closed' },
  },
];

// DETAIL VIEW DATA

export const dsrDetails: Record<string, DsrDetail> = {
  'DSR-2026-0089': {
    id: 'DSR-2026-0089',
    breadcrumb: {
      backLabel: 'Data subject rights',
      filterLabel: 'Deletion requests',
      currentLabel: 'DSR-2026-0089 · Marek Kowalczyk · Article 17',
    },
    hero: {
      id: 'DSR-2026-0089',
      statusLabel: 'Processing',
      type: { variant: 'deletion', label: 'Deletion · Art. 17 GDPR' },
      jurisdiction: { variant: 'gdpr', label: 'GDPR · Poland' },
      filedMeta: 'Filed Apr 28 · 13d ago · 30-day window',
      title: 'Article 17 deletion request from suspended candidate · competing legal obligations',
      subtitleHtml: '<strong style="color: var(--ink);">Marek Kowalczyk</strong> (cand-1142) has invoked <strong style="color: var(--ink);">Article 17(1)(a) GDPR — "right to erasure"</strong> following his suspension in <a>SB-2026-0083</a>. Atlas asserts <strong style="color: var(--ink);">Article 17(3) exemptions</strong>: tax-retention obligations (Step 22 · IRS through 2032), fraud-defense interests (<a>FA-2026-0042</a>), legal-claims defense (open dispute risks), and breach-notification record-keeping (<a>SI-2026-0014</a>). DPO recommendation: <strong style="color: var(--lime-deep);">partial deletion with retention markers</strong>.',
    },
    heroStats: [
      { label: 'Deadline', value: 'May 28', meta: '17d remaining · 30d window · 43% elapsed', variant: 'warn' },
      { label: 'Subject', value: 'cand-1142', meta: 'Marek Kowalczyk · PL · suspended' },
      { label: 'Assigned DPO', value: 'Aïsha Okafor', meta: 'Data Protection Officer · Atlas' },
      { label: 'Recommendation', value: 'Partial', meta: 'delete 7 categories · retain 5 with basis', variant: 'success', valueStyle: { color: 'var(--lime-deep)' } },
    ],
    idGate: {
      variant: 'verified',
      eyebrow: 'IDENTITY VERIFICATION · GATE STATUS',
      heading: 'Subject identity verified — processing unlocked',
      confidenceLabel: 'Confidence',
      confidence: 'HIGH',
      methods: [
        { name: 'SMS OTP', metaHtml: 'to <strong>+48-***-***-**8</strong> · OTP confirmed within 47s', time: 'May 1 · 09:28' },
        { name: 'Email link', metaHtml: 'to <strong>m.k****@gmail.com</strong> · clicked within 4 min · same IP as request', time: 'May 1 · 09:30' },
        { name: 'Suspended-account portal · 2FA', metaHtml: 'portal login required despite suspension · TOTP confirmed · suspended users have read-only access', time: 'May 1 · 09:32' },
      ],
      summary: [
        { key: 'Verified at', value: 'May 1 · 09:32 UTC' },
        { key: 'Triggered by', value: 'Subject (auto · in-app)' },
        { key: 'Verified by', value: 'System · auto-confirmed' },
        { key: 'IP at verification', value: '85.221.**.43 · Kraków, PL' },
        { key: 'Match with prior IPs', value: '100% · 47 prior sessions' },
        { key: 'Device fingerprint', value: 'Known · 8 prior matches' },
        { key: 'Risk score', value: '0.08 · low', valueStyle: { color: 'var(--success)' } },
      ],
    },
    countdown: {
      eyebrow: 'RESPONSE DEADLINE · GDPR ART. 12(3)',
      label: 'May 28 · 23:59 CET · 30d window',
      days: 17,
      hours: 12,
      minutes: 44,
      barFillPct: 43,
      metaHtml: '<strong>13d</strong> elapsed of 30 · 43% · target execution date <strong>May 16</strong> for 12-day notification buffer · extensions of 60d available under Art. 12(3) if "necessary, taking into account complexity"',
    },
    subjectCard: {
      initials: 'MK',
      avatarGradient: 'linear-gradient(135deg, #4A6741, #2C3E2A)',
      name: 'Marek Kowalczyk',
      subjectId: 'cand-1142 · suspended',
      metaRows: [
        { label: 'Account state', value: 'Suspended', variant: 'warn' },
        { label: 'Joined', value: 'Sep 2024' },
        { label: 'Location', value: 'Kraków, PL' },
        { label: 'Jurisdiction', value: 'GDPR · EU/PL' },
        { label: 'Last login', value: 'May 1 · portal' },
        { label: 'Prior DSRs', value: '0' },
        { label: 'Open matters', value: '3', variant: 'danger' },
      ],
    },
    quickstats: [
      { label: 'Suspension', value: '<a>SB-2026-0083 →</a>' },
      { label: 'Fraud ring', value: '<a>FA-2026-0042 →</a>' },
      { label: 'Breach scope', value: '<a>SI-2026-0014 →</a>' },
      { label: '2025 1042-S', value: '<a>Step 22 retention →</a>' },
    ],
    quickstatsNote: 'Each related matter influences scope. If appeal succeeds and SB-2026-0083 is vacated, partial-deletion can be revisited.',
    dpoCounsel: {
      name: 'Aïsha Okafor',
      firm: 'Data Protection Officer',
      initials: 'AO',
      avatarGradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)',
      metaRows: [
        { label: 'Role', value: 'DPO + Ops Admin' },
        { label: 'Reachable', value: 'CET business hrs' },
        { label: 'Backup', value: 'Dario (Super Admin)' },
        { label: 'External counsel', value: 'Not engaged · in-house' },
      ],
    },
    groundsBalance: {
      metaLabel: 'subject asserts 1 ground · Atlas asserts 4 exemptions · 3 strong, 1 weak',
      statusLabel: 'Pending DPO sign-off',
      subject: {
        eyebrow: 'Subject asserts',
        title: 'Right to erasure under GDPR Article 17',
        grounds: [
          {
            article: 'Art. 17(1)(a)',
            strength: 'strong',
            name: '"Personal data are no longer necessary in relation to the purposes for which they were collected"',
            descHtml: 'Subject argues: account suspended, no further engagements possible, therefore data is no longer necessary. <strong>Legally well-founded on its face.</strong> Atlas must establish overriding ground to refuse.',
          },
          {
            article: 'Subject also invokes',
            name: 'EDPB Guidelines 5/2020 on consent',
            descHtml: 'Subject claims original consent was for active marketplace use only, and that suspension terminates the consent basis for further processing.',
          },
        ],
      },
      atlas: {
        eyebrow: 'Atlas asserts (4 grounds)',
        title: 'Article 17(3) exemptions override the right to erasure',
        grounds: [
          {
            article: 'Art. 17(3)(b)',
            strength: 'strong',
            name: 'Compliance with legal obligation (tax retention)',
            descHtml: 'IRS §6501 requires retention of <strong>1042-S filings + supporting records for 7 years</strong>. Marek\'s 2025 1042-S (Step 22 · $4,420 USD earnings) was filed Mar 14 — retention through Mar 2032. Cannot delete underlying data without violating US tax law.',
          },
          {
            article: 'Art. 17(3)(b)',
            strength: 'strong',
            name: 'GDPR Article 30 records of processing',
            descHtml: 'Atlas\'s own <strong>SI-2026-0014</strong> breach record (Step 16) requires retaining identifiers of all data subjects affected. Marek\'s account was in the breach scope. Required for ICO follow-up (LR-2026-0017).',
          },
          {
            article: 'Art. 17(3)(e)',
            strength: 'strong',
            name: 'Defense of legal claims (fraud)',
            descHtml: 'Suspension <strong>SB-2026-0083</strong> for fake-ID fraud is under appeal. Open <strong>FA-2026-0042</strong> fraud-ring investigation references Marek\'s data for cluster analysis. Deletion would prejudice both Atlas\'s defense and the broader investigation.',
          },
          {
            article: 'Art. 17(3)(c)',
            strength: 'weak',
            name: 'Public interest (broader fraud detection)',
            descHtml: 'Atlas\'s anti-fraud signals improve when bad-actor data is retained for pattern matching. <strong>Weak ground:</strong> ICO has been skeptical of "platform safety" arguments without specific legal basis. Cite as supporting only.',
          },
        ],
      },
      recommendation: {
        title: 'Partial deletion · retain 5 categories under Art. 17(3)(b) and (e)',
        detailHtml: 'Delete <strong>profile, marketing, communications, cookies, behavioral data</strong> (7 categories · approx 4,200 records). Retain <strong>financial records, fraud markers, audit logs, breach-scope identifiers, dispute records</strong> (5 categories · approx 280 records) with legal-basis tags. Notify Marek of partial fulfillment with specific Art. 17(3) citations. <strong>Document for Art. 30 record of processing.</strong> Estimated execution: 3-5 business days post-DPO sign-off.',
      },
    },
    scope: {
      metaLabel: 'approx 4,480 records affected total · split per DPO recommendation',
      delete: {
        count: 7,
        items: [
          {
            name: 'Profile data',
            count: '12 records',
            detailHtml: 'Name, photo, bio, headline, skills tags, location, languages, profile customizations · <strong>direct delete</strong> from primary store · backup purge in 90d',
          },
          {
            name: 'Communications history',
            count: '2,847 records',
            detailHtml: 'In-app messages, support tickets, notification preferences · <strong>cascade delete</strong> via message-thread anonymization · counterparty data preserved',
          },
          {
            name: 'Marketing &amp; preferences',
            count: '28 records',
            detailHtml: 'Email subscriptions, push tokens, marketing consent records, A/B test cohort assignments · <strong>full purge</strong> from marketing platform (Customer.io)',
          },
          {
            name: 'Behavioral / analytics',
            count: '1,180 records',
            detailHtml: 'Click events, page views, session recordings, search queries · <strong>full purge</strong> from analytics (Amplitude) + session-replay store',
          },
          {
            name: 'Cookie / device data',
            count: '62 records',
            detailHtml: 'Cookie consent records, device fingerprints (non-fraud), session tokens · <strong>delete + revoke</strong>',
          },
          {
            name: 'Reviews authored',
            count: '8 records',
            detailHtml: 'Reviews Marek left for clients · <strong>anonymize, not delete</strong> (clients have right to retain reviewed-feedback context) · author becomes "[removed user]"',
          },
          {
            name: 'Public profile mirror',
            count: '1 record',
            detailHtml: 'Profile cache in CDN + SEO sitemap · <strong>invalidate + recrawl</strong> · 48h propagation',
          },
        ],
      },
      retain: {
        count: 5,
        items: [
          {
            name: 'Financial records · tax',
            count: '142 records',
            detailHtml: '2025 earnings ($4,420), 1042-S form (Step 22), W-8BEN, payment records · <strong>retained through Mar 2032</strong> per IRS §6501 7-year retention',
            legalBasis: 'IRS §6501 · Art. 17(3)(b)',
          },
          {
            name: 'Fraud markers',
            count: '14 records',
            detailHtml: 'SB-2026-0083 (fake ID), associated device/IP hashes, network-graph node ID, FA-2026-0042 cluster link · <strong>retained for open investigation</strong> + 3 years post-closure',
            legalBasis: 'FA-2026-0042 · Art. 17(3)(e)',
          },
          {
            name: 'Audit logs',
            count: '98 records',
            detailHtml: 'Immutable admin/system action log involving Marek\'s account · <strong>cannot delete</strong> per Atlas immutable-audit policy · 7-year retention',
            legalBasis: 'GDPR Art. 30 · Art. 17(3)(b)',
          },
          {
            name: 'Breach scope identifier',
            count: '1 record',
            detailHtml: 'SI-2026-0014 breach-scope tag · required for ICO follow-up + 72h notification record · <strong>retained for breach lifecycle + 3 years</strong>',
            legalBasis: 'SI-2026-0014 · Art. 17(3)(b)',
          },
          {
            name: 'Suspension &amp; appeal record',
            count: '23 records',
            detailHtml: 'SB-2026-0083 suspension order, appeal correspondence, evidence package · <strong>retained until appeal resolved + 3 years</strong> for legal-claims defense',
            legalBasis: 'SB-2026-0083 · Art. 17(3)(e)',
          },
        ],
      },
      processStrip: {
        textHtml: '<strong>Ready to execute partial deletion.</strong> 7 categories · approx 4,200 records will be permanently deleted. 5 categories · approx 280 records will be retained with legal-basis tags. This action is <strong>irreversible</strong> for the deletion side. Audit-logged. Subject will be notified per Art. 12(3).',
        primaryBtnLabel: 'DPO sign-off first',
        executeBtnLabel: 'Execute partial deletion',
      },
    },
    audit: [
      {
        time: 'May 9 · 10:30 UTC',
        action: 'Cross-team retention review complete',
        actorHtml: 'by <strong>Aïsha Okafor (DPO)</strong>',
        detail: 'Trust &amp; Safety confirms Marek\'s data needed for FA-2026-0042 ring analysis (open). Tax team confirms 1042-S retention through 2032. Engineering confirms scope preview accuracy. Awaiting Dario sign-off for partial-deletion recommendation.',
      },
      {
        time: 'May 7 · 16:45 UTC',
        action: 'Legal hold reviewed · Art. 17(3) exemptions applicable',
        actorHtml: 'by <strong>Aïsha Okafor (DPO)</strong>',
        detail: 'DPO confirms 3 strong Art. 17(3) exemptions: (b) tax law obligation, (b) Art. 30 record-keeping, (e) defense of legal claims (fraud + suspension appeal). 1 weak supporting ground: (c) public interest. Full deletion NOT possible; partial deletion proceeds.',
        variant: 'warn',
      },
      {
        time: 'May 5 · 11:20 UTC',
        action: 'Article 17 grounds analysis initiated',
        actorHtml: 'by <strong>Aïsha Okafor (DPO)</strong>',
        detail: 'Cross-referenced data inventory against retention obligations. Identified competing legal grounds. Drafted scope preview with delete/retain split. Sent to T&amp;S, Tax, and Compliance for sign-off.',
      },
      {
        time: 'May 3 · 14:10 UTC',
        action: 'DPO assigned · legal review begins',
        actorHtml: 'by <strong>Dario Fonseca</strong>',
        detail: 'Routed to Aïsha as Data Protection Officer due to deletion-type request + presence of fraud markers. Article 17(3) flag set in DSR-system. SLA paused for legal review window (15 days max).',
      },
      {
        time: 'May 1 · 09:32 UTC',
        action: 'Identity verified · 3 methods · auto-confirmed',
        actorHtml: 'by <strong>System</strong>',
        detail: 'SMS OTP + email link + suspended-account portal 2FA all confirmed within 4-minute window. Same IP, known device, 100% match with prior session history. Risk score 0.08 (low). Gate unlocked.',
      },
      {
        time: 'Apr 29 · 09:15 UTC',
        action: 'Auto-acknowledgement sent · 30-day SLA started',
        actorHtml: 'by <strong>System</strong>',
        detail: 'Confirmation email sent to subject. Internal routing to DPO queue. SLA clock started: 30 days from Apr 28 = May 28 deadline. Article 12(3) notification window opened.',
      },
      {
        time: 'Apr 28 · 14:22 UTC',
        action: 'Deletion request filed via standard DSR form',
        actorHtml: 'by <strong>Marek Kowalczyk (cand-1142)</strong>',
        detail: 'Subject filed via /privacy/data-rights form. Stated grounds: Article 17(1)(a) — "data no longer necessary after account suspension". Request scope: "full erasure of all personal data including suspended account".',
      },
    ],
    notes: {
      existing: [
        {
          author: 'Aïsha Okafor',
          role: 'DPO · matter lead',
          time: 'May 9 · 11:00 UTC',
          text: 'Final recommendation: partial deletion with 5 retention categories. The financial-records ground is unimpeachable (IRS law). The fraud-defense ground is strong while FA-2026-0042 is open and SB-2026-0083 is under appeal. We document Art. 30 carefully — ICO will likely review given the prior breach (SI-2026-0014). Need Dario sign-off before execution. Notification to Marek will cite specific articles and reference his appeal rights.',
          initials: 'AO',
          avatarGradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)',
        },
        {
          author: 'Dario Fonseca',
          role: 'Super Admin',
          time: 'May 7 · 17:30 UTC',
          text: 'Agreed with DPO\'s framing. The appeal to SB-2026-0083 is still active; if appeal succeeds and account is reinstated, we\'d need profile data back — argues against full deletion. Even with partial, we should preserve appeal-related data for defense. T&amp;S advises against deleting fraud markers until FA-2026-0042 closes. Path forward: partial deletion + clear notification + retain hooks for appeal outcome.',
          initials: 'DF',
          avatarGradient: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)',
        },
      ],
      composer: {
        author: 'Add privileged note as Aïsha',
        role: 'You · DPO',
        initials: 'AO',
        avatarGradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)',
        placeholder: 'Privileged · DPO work product · NOT shared with subject · audit-logged on save',
      },
    },
  },
};
