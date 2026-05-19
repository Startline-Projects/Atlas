/* Step 36 — Internal communications fixture (Pass A: header + stats + pinned)
   Verbatim from admin.html lines 65500-65616.
   Sections 02/03/04 fixtures added in Pass B/C/D. */

import type { PrStat } from './privacy-reports-data';

export type IcmHeaderIcon = 'chart-line' | 'plus';

export interface IcmHeaderAction {
  label: string;
  icon: IcmHeaderIcon;
  isPrimary?: boolean;
  hasDropdown?: boolean;
}

export interface IcmComposeOption {
  label: string;
}

export interface IcmPinnedStat {
  label: string;
  value: string;
  valueSuffix?: string;
  meta: string;
}

export interface IcmPinnedAction {
  label: string;
  isPrimary?: boolean;
}

export interface IcmPinnedData {
  id: string;
  requiredAckLabel: string;
  authorAvatarInitials: string;
  authorAvatarGradient: string;
  authorMetaText: string;
  title: string;
  summaryHtml: string;
  stats: IcmPinnedStat[];
  footMetaHtml: string;
  actions: IcmPinnedAction[];
}

export interface IcmPageMeta {
  title: string;
  metaText: string;
}

export const icmPageMeta: IcmPageMeta = {
  title: 'Internal communications',
  metaText:
    '/admin/internal/communications · admin team only · 12 members · all messages audit-logged 7y',
};

export const icmMetaPulseHtml =
  '3 unread threads · 1 urgent announcement awaiting your acknowledgment';

export const icmSearchPlaceholder = 'Search messages, memos…';

export const icmHeaderActions: IcmHeaderAction[] = [
  { label: 'Audit', icon: 'chart-line' },
  { label: 'Compose', icon: 'plus', isPrimary: true, hasDropdown: true },
];

export const icmComposeOptions: IcmComposeOption[] = [
  { label: 'New direct message' },
  { label: 'New group thread' },
  { label: 'Broadcast announcement' },
  { label: 'Publish memo' },
];

export const icmTopStats: PrStat[] = [
  {
    label: 'Unread',
    value: '3',
    variant: 'warn',
    meta: 'threads · 2 admin · 1 manager',
  },
  {
    label: 'Active threads',
    value: '14',
    meta: '7d window · 4 group · 10 DM',
  },
  {
    label: 'Pinned',
    value: '1',
    meta: 'v3.2 privacy · acks <strong>8/12</strong>',
  },
  {
    label: 'Memos · May',
    value: '2',
    meta: 'monthly retro + quarterly review',
  },
  {
    label: 'Online now',
    value: '7',
    suffix: '/12',
    variant: 'success',
    meta: 'across 5 timezones',
  },
];

/* ============================================================
   SECTION 02 — MESSAGING
   admin.html lines 65621-65844
   ============================================================ */

export interface IcmSectionHead {
  num: string;
  title: string;
  meta: string;
}

export type IcmThreadVariant = 'default' | 'active' | 'unread';
export type IcmThreadAvatarKind = 'person' | 'group';

export interface IcmThread {
  id: string;
  variant: IcmThreadVariant;
  avatarInitials: string;
  avatarGradient: string;
  avatarKind: IcmThreadAvatarKind;
  name: string;
  previewHtml: string;
  time: string;
  unreadCount?: number;
}

export type IcmConvHeadIconKey = 'pin' | 'info';

export interface IcmConvHeadAction {
  label: string;
  iconKey: IcmConvHeadIconKey;
}

export type IcmMessageVariant = 'default' | 'system';
export type IcmMessageRoleVariant = 'default' | 'super';

export interface IcmMessage {
  variant: IcmMessageVariant;
  avatarInitials?: string;
  avatarGradient?: string;
  name?: string;
  role?: string;
  roleVariant?: IcmMessageRoleVariant;
  time?: string;
  bodyHtml: string;
}

export interface IcmThreadListData {
  headTitle: string;
  headCount: string;
  threads: IcmThread[];
}

export interface IcmConversationData {
  avatarInitials: string;
  avatarGradient: string;
  name: string;
  metaHtml: string;
  headActions: IcmConvHeadAction[];
  messages: IcmMessage[];
  composerPlaceholder: string;
  composerSendLabel: string;
}

export interface IcmMessagingSectionData {
  sectionHead: IcmSectionHead;
  sectionActionLabel: string;
  threadList: IcmThreadListData;
  conversation: IcmConversationData;
}

export const icmMessagingSection: IcmMessagingSectionData = {
  sectionHead: {
    num: '02',
    title: 'Messaging',
    meta: 'DMs + group threads · admin team only · audit-logged · 14 active threads · 3 unread',
  },
  sectionActionLabel: 'View all threads →',
  threadList: {
    headTitle: 'Recent',
    headCount: '14 · 3 unread',
    threads: [
      {
        id: 'inc-042-retro',
        variant: 'active',
        avatarInitials: '042',
        avatarGradient: 'linear-gradient(135deg, var(--amber), #A35A2C)',
        avatarKind: 'group',
        name: '# inc-042-retro',
        previewHtml:
          'Aïsha: action item #2 template is published, cross-referenced…',
        time: '12m',
      },
      {
        id: 'mateo-dario-dm',
        variant: 'unread',
        avatarInitials: 'MK',
        avatarGradient: 'linear-gradient(135deg, var(--super), #3D2B5A)',
        avatarKind: 'person',
        name: 'Mateo Kowalski',
        previewHtml:
          "Re: Lina's 1:1 — Friday 14:00 works. Topics from your Q2 review…",
        time: '34m',
        unreadCount: 2,
      },
      {
        id: 'legal-dm',
        variant: 'unread',
        avatarInitials: 'AC',
        avatarGradient: 'linear-gradient(135deg, #6E4F8B, #3D2B4E)',
        avatarKind: 'person',
        name: 'Aaron Chen',
        previewHtml:
          'SDNY follow-up: counsel approved the supplemental production list…',
        time: '1h',
        unreadCount: 1,
      },
      {
        id: 'vetting-design-group',
        variant: 'default',
        avatarInitials: 'VS',
        avatarGradient: 'linear-gradient(135deg, #4F6BED, #2540A8)',
        avatarKind: 'group',
        name: '# vetting-standards',
        previewHtml:
          'Daniel: agree on the calibration rubric, ship Tuesday EOD?',
        time: '3h',
      },
      {
        id: 'aisha-dpo-dm',
        variant: 'unread',
        avatarInitials: 'AO',
        avatarGradient: 'linear-gradient(135deg, #E876BA, #A8408A)',
        avatarKind: 'person',
        name: 'Aïsha Okafor',
        previewHtml:
          'DSR-2026-0089 (Marek deletion): can you sign off the Article 17…',
        time: '5h',
        unreadCount: 3,
      },
      {
        id: 'payments-group',
        variant: 'default',
        avatarInitials: '$',
        avatarGradient: 'linear-gradient(135deg, #2E7D54, #1D5236)',
        avatarKind: 'group',
        name: '# payments-ops',
        previewHtml:
          'Dario: weekly batch processed, $24,114 to 18 contractors via Wise…',
        time: '9h',
      },
      {
        id: 'daniel-dm',
        variant: 'default',
        avatarInitials: 'DP',
        avatarGradient: 'linear-gradient(135deg, #4F6BED, #2540A8)',
        avatarKind: 'person',
        name: 'Daniel Park',
        previewHtml:
          'Studio Berlin onboarding next week — quick sync on the brief?',
        time: '1d',
      },
      {
        id: 'all-admins-group',
        variant: 'default',
        avatarInitials: 'A',
        avatarGradient: 'linear-gradient(135deg, var(--ink), #1A232C)',
        avatarKind: 'group',
        name: '# all-admins',
        previewHtml:
          "Dario: heads up — we're hiring a 12th specialist (Data Analytics)…",
        time: '2d',
      },
    ],
  },
  conversation: {
    avatarInitials: '042',
    avatarGradient: 'linear-gradient(135deg, var(--amber), #A35A2C)',
    name: '# inc-042-retro',
    metaHtml:
      '3 members · <strong>Marek S. · Aïsha O. · Dario F.</strong> · created Apr 21 (post-mortem day)',
    headActions: [
      { label: 'Pin', iconKey: 'pin' },
      { label: 'Info', iconKey: 'info' },
    ],
    messages: [
      {
        variant: 'system',
        bodyHtml:
          'Thread auto-created from <a>INC-2026-042</a> post-mortem publication · Apr 21 · 11:00 UTC',
      },
      {
        variant: 'default',
        avatarInitials: 'MS',
        avatarGradient: 'linear-gradient(135deg, #4F6BED, #2540A8)',
        name: 'Marek Söderberg',
        role: 'ENGINEER',
        roleVariant: 'default',
        time: 'Apr 21, 11:14',
        bodyHtml:
          'Thanks both for reviewing. Action items captured in <code>#inc-042-followup</code>. Two highlights: (1) the Stripe status-page programmatic webhook subscription is straightforward — about a day of work; (2) the incident notification template is more delicate — needs DPO review because it touches customer data exposure language.',
      },
      {
        variant: 'default',
        avatarInitials: 'AO',
        avatarGradient: 'linear-gradient(135deg, #E876BA, #A8408A)',
        name: 'Aïsha Okafor',
        role: 'DPO · SUPER ADMIN',
        roleVariant: 'super',
        time: 'Apr 21, 11:42',
        bodyHtml:
          "I'll draft the incident notification template this week. Cross-referencing the GDPR Art. 14 transparency language we just added to the vetting-invite. Question for Dario: do we want a separate template per severity tier, or one parameterized template with severity-conditional language?",
      },
      {
        variant: 'default',
        avatarInitials: 'DF',
        avatarGradient: 'linear-gradient(135deg, #6E4F8B, #3D2B4E)',
        name: 'Dario Fonseca',
        role: 'SUPER ADMIN',
        roleVariant: 'super',
        time: 'Apr 21, 13:08',
        bodyHtml:
          "Parameterized · one template. Severity drives the urgency framing, retention language, and CTA. Easier to maintain. Let's also make sure cl-167 gets a manual outreach from someone — even though TX-08442 had unrelated card issues, the delay on the failure email is worth acknowledging directly.",
      },
      {
        variant: 'default',
        avatarInitials: 'AO',
        avatarGradient: 'linear-gradient(135deg, #E876BA, #A8408A)',
        name: 'Aïsha Okafor',
        role: 'DPO · SUPER ADMIN',
        roleVariant: 'super',
        time: 'May 2, 09:18',
        bodyHtml:
          'Template published — <code>email.compliance.incident_notification</code> · 12 locales · approved by Dario. Marked action item #2 complete. cl-167 outreach went out yesterday; no response yet but no further questions either.',
      },
      {
        variant: 'default',
        avatarInitials: 'AO',
        avatarGradient: 'linear-gradient(135deg, #E876BA, #A8408A)',
        name: 'Aïsha Okafor',
        role: 'DPO · SUPER ADMIN',
        roleVariant: 'super',
        time: '12 min ago',
        bodyHtml:
          'Action item #2 template is published, cross-referenced from the <a>Help Center privacy article</a>. We can close this thread when Marek finishes the runbook update (action #3 · ETA May 14).',
      },
    ],
    composerPlaceholder: 'Reply to #inc-042-retro…',
    composerSendLabel: 'Send',
  },
};

/* ============================================================
   SECTION 03 — ANNOUNCEMENTS FEED
   admin.html lines 65849-66039
   ============================================================ */

export type IcmAnnouncementVariant = 'default' | 'urgent';
export type IcmAnnouncementScopeVariant = 'default' | 'super' | 'team';
export type IcmAnnouncementAckPctVariant = 'default' | 'partial' | 'full';

export type IcmAnnouncementMetaItem =
  | {
      kind: 'author';
      avatarInitials: string;
      avatarGradient: string;
      name: string;
    }
  | { kind: 'scope'; label: string; variant: IcmAnnouncementScopeVariant }
  | { kind: 'pinned' }
  | { kind: 'date'; text: string };

export interface IcmAnnouncementAck {
  pctValue: string;
  pctSuffix?: string;
  pctVariant: IcmAnnouncementAckPctVariant;
  label: string;
}

export interface IcmAnnouncementCard {
  id: string;
  variant: IcmAnnouncementVariant;
  metaItems: IcmAnnouncementMetaItem[];
  title: string;
  ack?: IcmAnnouncementAck;
  bodyHtml: string;
  footStatsHtml: string;
  footDateText: string;
}

export interface IcmFilterButton {
  label: string;
  value: string;
}

export interface IcmAnnouncementsData {
  sectionHead: IcmSectionHead;
  filterButtons: IcmFilterButton[];
  cards: IcmAnnouncementCard[];
  footerText: string;
  footerActionLabel: string;
}

const GRADIENT_DF = 'linear-gradient(135deg, #6E4F8B, #3D2B4E)';
const GRADIENT_AO = 'linear-gradient(135deg, #E876BA, #A8408A)';
const GRADIENT_MK = 'linear-gradient(135deg, var(--super), #3D2B5A)';

export const icmAnnouncementsSection: IcmAnnouncementsData = {
  sectionHead: {
    num: '03',
    title: 'Announcements · admin team',
    meta: 'broadcast feed · ack-required marked separately · chronological newest first · 5 recent shown',
  },
  filterButtons: [
    { label: 'All', value: 'all' },
    { label: 'Unread only', value: 'unread' },
    { label: 'Ack-required', value: 'ack-required' },
  ],
  cards: [
    {
      id: 'ann-2026-019',
      variant: 'urgent',
      metaItems: [
        {
          kind: 'author',
          avatarInitials: 'DF',
          avatarGradient: GRADIENT_DF,
          name: 'Dario Fonseca',
        },
        { kind: 'scope', label: 'Super Admin', variant: 'super' },
        { kind: 'scope', label: 'ANN-2026-019', variant: 'default' },
        { kind: 'date', text: 'Today · 08:42 UTC' },
      ],
      title:
        'SDNY subpoena LR-2026-0023 · counsel-approved supplemental production by EOD Friday',
      ack: {
        pctValue: '4',
        pctSuffix: '/12',
        pctVariant: 'partial',
        label: 'ACK · 33%',
      },
      bodyHtml:
        "Aaron's counsel approved our supplemental production list this morning. <strong>Action required for Marek S. + Aïsha O.</strong>: gather the 14 additional logs identified in the addendum and place them in the secure transfer folder by <strong>EOD Friday May 16</strong>. Full details in the <a>LR-2026-0023 page</a>. Counsel will handle delivery to SDNY.",
      footStatsHtml:
        '<strong>4 acks</strong> · 8 outstanding · <strong>11 views</strong> · Audience: <strong>12 admin</strong>',
      footDateText: 'Deadline May 16 · 4 days',
    },
    {
      id: 'ann-2026-018',
      variant: 'default',
      metaItems: [
        {
          kind: 'author',
          avatarInitials: 'AO',
          avatarGradient: GRADIENT_AO,
          name: 'Aïsha Okafor',
        },
        { kind: 'scope', label: 'DPO', variant: 'super' },
        { kind: 'scope', label: 'ANN-2026-018', variant: 'default' },
        { kind: 'pinned' },
        { kind: 'date', text: 'May 4 · 14:12 UTC' },
      ],
      title:
        'v3.2 privacy policy update · operational implications for admin team',
      ack: {
        pctValue: '8',
        pctSuffix: '/12',
        pctVariant: 'partial',
        label: 'ACK · 67%',
      },
      bodyHtml:
        'Reference: full announcement pinned at top of page. Effective April 1 · referenced from Help Center articles · GDPR Art. 14 transparency block now included in vetting-invite and DSR-response templates.',
      footStatsHtml:
        '<strong>8 acks</strong> · 4 outstanding · <strong>11 views</strong> · Audience: <strong>12 admin</strong>',
      footDateText: 'Deadline May 14 · 2 days',
    },
    {
      id: 'ann-2026-017',
      variant: 'default',
      metaItems: [
        {
          kind: 'author',
          avatarInitials: 'DF',
          avatarGradient: GRADIENT_DF,
          name: 'Dario Fonseca',
        },
        { kind: 'scope', label: 'Super Admin', variant: 'super' },
        { kind: 'scope', label: 'ANN-2026-017', variant: 'default' },
        { kind: 'date', text: 'May 1 · 09:00 UTC' },
      ],
      title: 'Hiring a 12th specialist · Data & Analytics',
      ack: {
        pctValue: '12',
        pctSuffix: '/12',
        pctVariant: 'full',
        label: 'VIEWED · 100%',
      },
      bodyHtml:
        "Per the <a>Q1 performance review</a>, the Data &amp; Analytics cluster received a B grade with a 38% pool depth — Daniel cross-covers but the demand outstrips the supply. Mateo and I are opening a req for a <strong>Data &amp; Analytics specialist</strong>. JD link in the thread. Referrals welcome — we'd ideally hire someone with marketplace experience and at least one analytics tooling certification.",
      footStatsHtml:
        'No ack required · <strong>12 views</strong> · Audience: <strong>12 admin</strong>',
      footDateText: 'Posted 12 days ago',
    },
    {
      id: 'ann-2026-014',
      variant: 'default',
      metaItems: [
        {
          kind: 'author',
          avatarInitials: 'DF',
          avatarGradient: GRADIENT_DF,
          name: 'Dario Fonseca',
        },
        { kind: 'scope', label: 'Super Admin', variant: 'super' },
        { kind: 'scope', label: 'ANN-2026-014', variant: 'default' },
        { kind: 'date', text: 'Apr 14 · 16:30 UTC' },
      ],
      title: '1042-S filing complete · 478 forms acknowledged by IRS',
      ack: {
        pctValue: '12',
        pctSuffix: '/12',
        pctVariant: 'full',
        label: 'VIEWED · 100%',
      },
      bodyHtml:
        'Tax season closed cleanly. 478 1042-S forms generated for foreign contractors · all acknowledged by IRS · 0 rejected. 1099-K filing also complete (clients with $20K+ GMV). Full breakdown in the <a>tax documents page</a>. Thanks especially to Dario K. on the engineering side for the Stripe Tax integration improvements, and to Aïsha for the candidate-facing communication.',
      footStatsHtml:
        'No ack required · <strong>12 views</strong> · Audience: <strong>12 admin</strong>',
      footDateText: 'Posted 28 days ago',
    },
    {
      id: 'ann-2026-011',
      variant: 'default',
      metaItems: [
        {
          kind: 'author',
          avatarInitials: 'MK',
          avatarGradient: GRADIENT_MK,
          name: 'Mateo Kowalski',
        },
        { kind: 'scope', label: 'Manager', variant: 'default' },
        { kind: 'scope', label: 'ANN-2026-011', variant: 'default' },
        { kind: 'date', text: 'Apr 2 · 10:18 UTC' },
      ],
      title: 'Calibration session this Friday · vetting-call rubric refresh',
      ack: {
        pctValue: '11',
        pctSuffix: '/11',
        pctVariant: 'full',
        label: 'VIEWED · 100%',
      },
      bodyHtml:
        "All specialists: 90-min calibration session Friday Apr 5, 14:00 UTC. We'll walk through 12 recent vetting decisions (anonymized) and rate them collectively to recalibrate our rubric. Daniel is leading. Recording for those in conflicting timezones. Bring your toughest recent vetting call.",
      footStatsHtml:
        'No ack required · <strong>11 views</strong> · Audience: <strong>11 specialists</strong>',
      footDateText: 'Posted 40 days ago',
    },
  ],
  footerText:
    '5 most recent · 23 total YTD · all announcements audit-logged 7y',
  footerActionLabel: 'View older announcements →',
};

/* ============================================================
   SECTION 04 — MEMOS ARCHIVE
   admin.html lines 66044-66146
   ============================================================ */

export type IcmMemoAudienceColor = 'super' | 'success';

export interface IcmMemoRow {
  id: string;
  eyebrow: string;
  title: string;
  author: string;
  audience: string;
  audienceColor: IcmMemoAudienceColor;
  views: string;
  publishedDate: string;
  publishedRel: string;
}

export interface IcmMemosData {
  sectionHead: IcmSectionHead;
  headerActionLabel: string;
  rows: IcmMemoRow[];
  footerText: string;
  footerActionLabel: string;
}

export const icmMemosSection: IcmMemosData = {
  sectionHead: {
    num: '04',
    title: 'Memos archive',
    meta: 'long-form internal writing · weekly retros + monthly reviews + quarterly business memos · click any to read',
  },
  headerActionLabel: 'Publish new memo',
  rows: [
    {
      id: 'memo-q2-mid',
      eyebrow: 'QUARTERLY · MID-Q2 REVIEW',
      title:
        'Where we are at the midpoint of Q2 · pool health, payments, compliance',
      author: 'Dario F.',
      audience: 'Admin · 12',
      audienceColor: 'super',
      views: '14',
      publishedDate: 'May 10',
      publishedRel: '2d ago',
    },
    {
      id: 'memo-may-retro',
      eyebrow: 'MONTHLY · MAY OPS RETRO',
      title:
        'May ops retro · INC-042 lessons, DSR processing time, sourcing trends',
      author: 'Mateo K.',
      audience: 'Manager · all',
      audienceColor: 'success',
      views: '12',
      publishedDate: 'May 6',
      publishedRel: '6d ago',
    },
    {
      id: 'memo-apr-perf',
      eyebrow: 'PERFORMANCE NOTES · APRIL',
      title:
        "Notes from April performance reviews · what's working, where we need support",
      author: 'Mateo K.',
      audience: 'Super Admin · 2',
      audienceColor: 'super',
      views: '2',
      publishedDate: 'Apr 30',
      publishedRel: '12d ago',
    },
    {
      id: 'memo-tax-postmortem',
      eyebrow: 'PROCESS POSTMORTEM',
      title:
        '1042-S tax season postmortem · process improvements for next year',
      author: 'Dario F.',
      audience: 'Admin · 12',
      audienceColor: 'success',
      views: '28',
      publishedDate: 'Apr 22',
      publishedRel: '20d ago',
    },
    {
      id: 'memo-q1-business',
      eyebrow: 'QUARTERLY · BUSINESS REVIEW',
      title:
        'Q1 2026 business review · GMV, take rate, candidate growth, hiring plans',
      author: 'Dario F.',
      audience: 'Admin · 12',
      audienceColor: 'success',
      views: '47',
      publishedDate: 'Apr 8',
      publishedRel: '34d ago',
    },
    {
      id: 'memo-vetting-rubric',
      eyebrow: 'PROCESS · CALIBRATION',
      title:
        'Vetting rubric refresh · outcomes from the Apr 5 calibration session',
      author: 'Daniel P.',
      audience: 'Manager + 11 specialists',
      audienceColor: 'success',
      views: '12',
      publishedDate: 'Apr 7',
      publishedRel: '35d ago',
    },
  ],
  footerText:
    '6 of 31 memos shown · sorted by recency · audience scoped by author',
  footerActionLabel: 'View memo archive →',
};

export const icmPinned: IcmPinnedData = {
  id: 'ANN-2026-018',
  requiredAckLabel: 'REQUIRED ACK',
  authorAvatarInitials: 'AO',
  authorAvatarGradient: 'linear-gradient(135deg, #E876BA, #A8408A)',
  authorMetaText: 'Aïsha O. · DPO · pinned May 4, 7d ago',
  title:
    'v3.2 privacy policy update · operational implications for admin team',
  summaryHtml:
    'The new <strong>privacy policy v3.2</strong> (effective April 1) introduces explicit GDPR Article 14 transparency language and a revised data retention schedule. Operational implications for your day-to-day: when responding to user inquiries about data processing, reference <a>v3.2 policy</a> not earlier versions. The <a>vetting-call article</a> and <a>data rights article</a> are already updated. <strong>Please review and acknowledge.</strong>',
  stats: [
    { label: 'Audience', value: '12', meta: 'all admin team' },
    {
      label: 'Acknowledged',
      value: '8',
      valueSuffix: '/12',
      meta: '66.7% · 4 outstanding',
    },
    {
      label: 'Deadline',
      value: '2',
      valueSuffix: 'd left',
      meta: 'May 14 · auto-reminder',
    },
    {
      label: 'Views',
      value: '11',
      valueSuffix: '/12',
      meta: '1 not yet opened',
    },
  ],
  footMetaHtml:
    '<strong>Outstanding acks:</strong> Faisal Rahman · Olamide Adebayo · Aaron Chen · Mira Karpov',
  actions: [
    { label: 'Send reminder' },
    { label: 'Acknowledge', isPrimary: true },
  ],
};
