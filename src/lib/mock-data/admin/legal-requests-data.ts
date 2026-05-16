// Type definitions
export interface LegalRequestSourceBadge {
  variant: 'court' | 'regulator' | 'agency';
  label: string;
  svgPath: string;
}

export interface LegalRequestTypeBadge {
  variant: 'subpoena' | 'court-order' | 'regulatory' | 'foia' | 'preservation';
  label: string;
}

export interface LegalRequestDeadline {
  date: string;
  rel: string;
  variant?: 'urgent' | 'warn' | 'met';
}

export interface LegalRequestStatus {
  variant: 'lr-under-review' | 'lr-acknowledged' | 'lr-responded' | 'lr-closed';
  label: string;
}

export interface LegalRequestSubject {
  title: string;
  meta: string;
}

export interface LegalRequestRow {
  id: string;
  refGag: boolean;
  source: LegalRequestSourceBadge;
  type: LegalRequestTypeBadge;
  subject: LegalRequestSubject;
  deadline: LegalRequestDeadline;
  status: LegalRequestStatus;
  rowVariant?: 'urgent' | 'warn';
}

export interface HeroStat {
  label: string;
  value: string;
  meta: string;
  variant?: 'warn' | 'success' | 'danger';
}

export interface AuditEntry {
  time: string;
  action: string;
  actor: string;
  actorStrong: string;
  detail: string;
  variant?: 'danger';
}

export interface LegalRequestDetail {
  id: string;
  refGag: boolean;
  breadcrumb: {
    backLabel: string;
    filterLabel: string;
    currentLabel: string;
  };
  hero: {
    id: string;
    statusVariant: 'lr-under-review' | 'lr-acknowledged' | 'lr-responded' | 'lr-closed';
    statusLabel: string;
    type: { variant: string; label: string };
    source: { variant: string; label: string };
    receivedDate: string;
    title: string;
    subtitle: string;
  };
  heroStats: HeroStat[];
  gagBanner: {
    title: string;
    detail: string;
    daysRemaining: number;
    expirationDate: string;
  };
  actionCard: {
    eyebrow: string;
    heading: string;
    cells: Array<{
      label: string;
      value: string;
      valueDanger?: boolean;
      meta: string;
    }>;
  };
  docCard: {
    filename: string;
    pages: number;
    filesize: string;
    meta: string;
    sealText: string;
    courtName: string;
    jurisdiction: string;
    caseNumber: string;
    title: string;
    bodyText: string[];
  };
  subjectTree: {
    heading: string;
    meta: string;
    count: number;
    countMeta: string;
    entities: Array<{
      initials: string;
      flagBg: string;
      name: string;
      meta: string;
      scopeChips: string[];
    }>;
    scopeList: Array<{
      collected: boolean;
      label: string;
      meta: string;
      status: 'Collected' | 'Pending';
    }>;
  };
  draftTabs: Array<{
    id: string;
    label: string;
    status?: string;
  }>;
  draftPanel: {
    version: string;
    meta: string;
    paragraphs: Array<{
      type: 'text' | 'clause';
      text: string;
    }>;
    batesRange: string;
  };
  auditChain: AuditEntry[];
  notes: Array<{
    avatar: string;
    avatarBg: string;
    author: string;
    role: string;
    time: string;
    text: string;
  }>;
  countdown: {
    eyebrow: string;
    label: string;
    days: number;
    hours: number;
    minutes: number;
    barFillPct: number;
    meta: string;
  };
  counsel: {
    name: string;
    firm: string;
    initials: string;
    avatarGradient: string;
    metaRows: Array<{
      label: string;
      value: string;
    }>;
  };
  quickstats1: Array<{
    label: string;
    value: string;
    variant?: 'success' | 'danger';
  }>;
  quickstats2: Array<{
    label: string;
    value: string;
    href?: string;
  }>;
}

// LIST VIEW DATA

export const legalRequestsListMeta = {
  title: 'Legal requests',
  path: '/admin/compliance/legal-requests',
  meta: '8 active · 3 under gag order · 1 deadline this week',
  metaPulse: 'LR-2026-0023 due May 25 · SDNY subpoena · counsel-led',
};

export const legalRequestsStats = [
  {
    label: 'Active requests',
    value: '8',
    meta: '4 court · 3 regulator · 1 agency',
  },
  {
    label: 'Deadline this week',
    value: '1',
    meta: 'LR-2026-0023 · 14d remaining',
    variant: 'danger' as const,
  },
  {
    label: 'Under gag order',
    value: '3',
    meta: 'cannot notify affected user',
    variant: 'warn' as const,
  },
  {
    label: 'Avg response time',
    value: '18',
    suffix: 'days',
    meta: 'last 12 closed · 100% on-deadline',
  },
  {
    label: 'Closed · YTD',
    value: '23',
    meta: 'all archived to legal vault',
    variant: 'success' as const,
  },
];

export const legalRequestsFilterChips = [
  { id: 'all', label: 'All', count: 31, active: true },
  { id: 'active', label: 'Active', count: 8 },
  { id: 'subpoena', label: 'Subpoenas', count: 3 },
  { id: 'court-order', label: 'Court orders', count: 2 },
  { id: 'regulatory', label: 'Regulatory', count: 4 },
  { id: 'foia', label: 'FOIA', count: 2 },
];

export const legalRequestsRows: LegalRequestRow[] = [
  {
    id: 'LR-2026-0023',
    refGag: true,
    source: {
      variant: 'court',
      label: 'US District Court · SDNY',
      svgPath: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V10l7-7 7 7v11M9 21V13h6v8"/></svg>',
    },
    type: {
      variant: 'subpoena',
      label: 'Grand Jury Subpoena',
    },
    subject: {
      title: 'Vorona Capital + 4 linked entities',
      meta: 'cl-167 + ring · criminal investigation · FA-2026-0042',
    },
    deadline: {
      date: 'May 25',
      rel: '14d remaining',
      variant: 'urgent',
    },
    status: {
      variant: 'lr-under-review',
      label: 'Under review',
    },
    rowVariant: 'urgent',
  },
  {
    id: 'LR-2026-0022',
    refGag: false,
    source: {
      variant: 'regulator',
      label: 'FTC · Bureau of Consumer Protection',
      svgPath: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15 8.5 22 9.3 17 14.1 18 21 12 17.7 6 21 7 14.1 2 9.3 9 8.5 12 2"/></svg>',
    },
    type: {
      variant: 'regulatory',
      label: 'Regulatory inquiry',
    },
    subject: {
      title: 'Platform-wide fraud-rate metrics & mitigation',
      meta: 'post-Vorona ring · benchmarking other talent platforms · voluntary cooperation',
    },
    deadline: {
      date: 'Jun 15',
      rel: '35d remaining',
      variant: 'warn',
    },
    status: {
      variant: 'lr-under-review',
      label: 'Under review',
    },
    rowVariant: 'warn',
  },
  {
    id: 'LR-2026-0021',
    refGag: false,
    source: {
      variant: 'regulator',
      label: 'California AG · Privacy Unit',
      svgPath: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15 8.5 22 9.3 17 14.1 18 21 12 17.7 6 21 7 14.1 2 9.3 9 8.5 12 2"/></svg>',
    },
    type: {
      variant: 'regulatory',
      label: 'CCPA compliance audit',
    },
    subject: {
      title: 'CCPA / CPRA compliance posture · DSAR handling',
      meta: 'scope: privacy policy, data flows, retention, response SLAs · 90d window',
    },
    deadline: {
      date: 'Jul 20',
      rel: '70d remaining',
    },
    status: {
      variant: 'lr-under-review',
      label: 'Under review',
    },
  },
  {
    id: 'LR-2026-0020',
    refGag: false,
    source: {
      variant: 'agency',
      label: 'Finanzamt München · DE',
      svgPath: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>',
    },
    type: {
      variant: 'regulatory',
      label: 'Tax records request',
    },
    subject: {
      title: 'Studio Berlin GmbH · 2024-2025 payment records',
      meta: 'cl-002 · cross-border VAT inquiry · MLAT-routed · counsel: Hengeler Mueller',
    },
    deadline: {
      date: 'Jun 30',
      rel: '50d remaining',
    },
    status: {
      variant: 'lr-acknowledged',
      label: 'Acknowledged',
    },
  },
  {
    id: 'LR-2026-0019',
    refGag: true,
    source: {
      variant: 'court',
      label: 'US District Court · ED MI',
      svgPath: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V10l7-7 7 7v11M9 21V13h6v8"/></svg>',
    },
    type: {
      variant: 'preservation',
      label: 'Preservation order',
    },
    subject: {
      title: 'A2Z Solutions Ltd · all platform records',
      meta: 'cl-178 · banned · 90-day preservation pending grand-jury subpoena',
    },
    deadline: {
      date: 'Jul 5',
      rel: '55d remaining',
      variant: 'warn',
    },
    status: {
      variant: 'lr-responded',
      label: 'Responded',
    },
  },
  {
    id: 'LR-2026-0018',
    refGag: false,
    source: {
      variant: 'agency',
      label: 'MI Dept of Labor & Economic Opportunity',
      svgPath: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    },
    type: {
      variant: 'foia',
      label: 'Records request',
    },
    subject: {
      title: 'Worker-classification policies & sample contracts',
      meta: 'state-level review of 1099 vs W-2 classifications · routine inquiry',
    },
    deadline: {
      date: 'May 30',
      rel: '19d remaining',
    },
    status: {
      variant: 'lr-responded',
      label: 'Responded',
    },
  },
  {
    id: 'LR-2026-0017',
    refGag: false,
    source: {
      variant: 'regulator',
      label: 'UK Information Commissioner · ICO',
      svgPath: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15 8.5 22 9.3 17 14.1 18 21 12 17.7 6 21 7 14.1 2 9.3 9 8.5 12 2"/></svg>',
    },
    type: {
      variant: 'regulatory',
      label: 'GDPR breach follow-up',
    },
    subject: {
      title: 'SI-2026-0014 breach · post-incident review',
      meta: 'Step 16 incident · Article 33 notification accepted · ICO has 60d to assign caseworker',
    },
    deadline: {
      date: 'May 9',
      rel: 'closed Apr 30',
      variant: 'met',
    },
    status: {
      variant: 'lr-closed',
      label: 'Closed',
    },
  },
  {
    id: 'LR-2026-0016',
    refGag: false,
    source: {
      variant: 'agency',
      label: 'NLRB · Region 7',
      svgPath: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="12" cy="12" r="3"/></svg>',
    },
    type: {
      variant: 'regulatory',
      label: 'Inquiry · gig classification',
    },
    subject: {
      title: 'Talent marketplace classification practices',
      meta: 'industry-wide inquiry · no specific complaint · standard cooperation',
    },
    deadline: {
      date: 'Apr 20',
      rel: 'closed Apr 18',
      variant: 'met',
    },
    status: {
      variant: 'lr-closed',
      label: 'Closed',
    },
  },
  {
    id: 'LR-2026-0015',
    refGag: false,
    source: {
      variant: 'agency',
      label: 'MIT Sloan · academic study',
      svgPath: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
    },
    type: {
      variant: 'foia',
      label: 'Records request',
    },
    subject: {
      title: 'Aggregate pricing & engagement metrics · anonymized',
      meta: 'peer-reviewed research · NDA executed · scrubbed dataset only',
    },
    deadline: {
      date: 'Apr 15',
      rel: 'closed Apr 12',
      variant: 'met',
    },
    status: {
      variant: 'lr-closed',
      label: 'Closed',
    },
  },
];

// DETAIL VIEW DATA

export const legalRequestDetails: Record<string, LegalRequestDetail> = {
  'LR-2026-0023': {
    id: 'LR-2026-0023',
    refGag: true,
    breadcrumb: {
      backLabel: 'Legal requests',
      filterLabel: 'Subpoenas',
      currentLabel: 'LR-2026-0023 · SDNY · Vorona Capital',
    },
    hero: {
      id: 'LR-2026-0023',
      statusVariant: 'lr-under-review',
      statusLabel: 'Under review',
      type: {
        variant: 'subpoena',
        label: 'Grand Jury Subpoena',
      },
      source: {
        variant: 'court',
        label: 'US District Court · SDNY',
      },
      receivedDate: 'Received May 4 · 7d ago · case 1:26-cr-00284-AKH',
      title: 'Grand jury subpoena re: Vorona Capital + 4 linked entities — criminal investigation',
      subtitle: 'Issued by <strong style="color: var(--ink);">AUSA Sarah Chen</strong>, US Attorney\'s Office, Southern District of New York. Seeks platform records (KYC, transactions, communications, login records) for the Vorona ring identified in <a data-lr-action="open-fraud" data-alert-id="fa-2026-0042">FA-2026-0042</a> (Step 15) and banned in <a data-lr-action="open-sanction" data-sanction-id="sb-2026-0084">SB-2026-0084</a>. Response coordinated through outside counsel <strong style="color: var(--ink);">Cooley LLP (Michael Reeves)</strong>. Atlas is <strong style="color: var(--ink);">not a target</strong> — production-only request.',
    },
    heroStats: [
      {
        label: 'Deadline',
        value: 'May 25',
        meta: '14d remaining · 50% elapsed',
        variant: 'warn',
      },
      {
        label: 'Issuing AUSA',
        value: 'Sarah Chen',
        meta: 'SDNY · criminal division',
      },
      {
        label: 'Atlas counsel',
        value: 'Cooley LLP',
        meta: 'Michael Reeves · partner',
      },
      {
        label: 'Records sought',
        value: '5 categories',
        meta: 'scope locked · all sub-§ confirmed',
      },
    ],
    gagBanner: {
      title: 'Gag order in effect · 90 days',
      detail: 'Per <strong>18 U.S.C. § 2705(b)</strong> non-disclosure order issued with this subpoena. <strong>Do NOT notify Vorona Capital, its principals, or any of the 4 linked entities</strong> of the existence of this request, its contents, or any production activity. Violation may result in obstruction charges. Order expires <strong>Aug 2, 2026</strong> unless extended.',
      daysRemaining: 83,
      expirationDate: 'Aug 2, 2026',
    },
    actionCard: {
      eyebrow: 'REQUIRED ACTION',
      heading: 'Produce 5 categories of records by May 25, 2026 · responding counsel: Cooley LLP',
      cells: [
        {
          label: 'What we must produce',
          value: 'Platform records',
          meta: '5 categories · scope detailed below · <strong>~2,800 documents</strong> identified for review',
        },
        {
          label: 'By when',
          value: 'May 25 · 17:00 EST',
          valueDanger: true,
          meta: '<strong>14 days remaining</strong> · production to AUSA office via secured FTP',
        },
        {
          label: 'Responsible counsel',
          value: 'Cooley LLP',
          meta: '<strong>Michael Reeves</strong> · partner · government investigations · responding under our SOW',
        },
      ],
    },
    docCard: {
      filename: 'subpoena_sdny_1-26-cr-00284-akh_vorona-capital.pdf',
      pages: 12,
      filesize: '4.2 MB',
      meta: '<strong>signed + sealed</strong> · received May 4 · 11:14 EST · chain of custody preserved',
      sealText: 'United\nStates\nCourts\nSeal',
      courtName: 'United States District Court',
      jurisdiction: 'for the Southern District of New York',
      caseNumber: '1:26-cr-00284-AKH',
      title: 'Grand Jury Subpoena',
      bodyText: [
        '<strong>TO:</strong> Staffva LLC, a Michigan limited liability company, doing business as "Atlas". Service via registered agent, Detroit, MI.',
        '<strong>YOU ARE COMMANDED</strong> to produce the documents, electronically stored information, and objects specified in Attachment A by <strong>May 25, 2026 at 5:00 P.M. Eastern Time</strong>. Production shall be made to the Office of the United States Attorney for the Southern District of New York via secured FTP per Attachment B, or in such other manner as may be arranged with the undersigned.',
        'The matters under investigation involve potential violations of <strong>18 U.S.C. §§ 1343 (wire fraud), 1956 (money laundering), and 371 (conspiracy)</strong>. The Grand Jury seeks records concerning the platform accounts and activity of certain entities listed in Attachment A, including "Vorona Capital" and affiliated entities.',
      ],
    },
    subjectTree: {
      heading: 'Named entities',
      meta: 'all banned May 5 · linked through Vorona ring · audit trail in FA-2026-0042',
      count: 5,
      countMeta: 'entities',
      entities: [
        {
          initials: 'VC',
          flagBg: 'linear-gradient(135deg, #C41E3A, #7E1525)',
          name: 'Vorona Capital (primary)',
          meta: 'cl-167 · banned · SB-2026-0084',
          scopeChips: ['KYC', 'Tx · all', 'Comms', 'Logins'],
        },
        {
          initials: 'EH',
          flagBg: 'linear-gradient(135deg, #C41E3A, #7E1525)',
          name: 'Eastline Holdings',
          meta: 'cl-201 · ring satellite · banned · SB-2026-0085',
          scopeChips: ['KYC', 'Tx · all', 'Logins'],
        },
        {
          initials: 'MV',
          flagBg: 'linear-gradient(135deg, #6E4F8B, #3D2B4E)',
          name: 'Meridian Ventures Ltd',
          meta: 'cl-178a · ring satellite · banned',
          scopeChips: ['KYC', 'Tx · all'],
        },
        {
          initials: 'PF',
          flagBg: 'linear-gradient(135deg, #6E4F8B, #3D2B4E)',
          name: 'Polar Flow Partners',
          meta: 'cl-178b · ring satellite · banned',
          scopeChips: ['KYC', 'Tx · all'],
        },
        {
          initials: 'NS',
          flagBg: 'linear-gradient(135deg, #6E4F8B, #3D2B4E)',
          name: 'Northstar Strategies LLC',
          meta: 'cl-178c · ring satellite · banned',
          scopeChips: ['KYC', 'Tx · all'],
        },
      ],
      scopeList: [
        {
          collected: true,
          label: 'Account creation records',
          meta: 'all KYC documents, IDs, verification photos, business filings · 5 entities · ~140 documents',
          status: 'Collected',
        },
        {
          collected: true,
          label: 'Full transaction history',
          meta: 'all payments, refunds, fees, currency movements · Jan 2025 - May 2026 · 1,847 transactions',
          status: 'Collected',
        },
        {
          collected: true,
          label: 'Communications',
          meta: 'admin ↔ Vorona messages, dispute records, support tickets · 412 communications',
          status: 'Collected',
        },
        {
          collected: false,
          label: 'Login records (IPs + timestamps + device fingerprints)',
          meta: 'all sign-in events · pending engineering pull · ETA May 13',
          status: 'Pending',
        },
        {
          collected: false,
          label: 'Linked-account analysis',
          meta: 'Step 15 fraud ring analysis · 5-node graph data + supporting evidence · pending T&S export',
          status: 'Pending',
        },
      ],
    },
    draftTabs: [
      {
        id: 'v1',
        label: 'v1 · Atlas draft',
        status: 'Superseded',
      },
      {
        id: 'v2',
        label: 'v2 · Cooley revise',
        status: 'Superseded',
      },
      {
        id: 'v3',
        label: 'v3 · Cooley final',
        status: 'Pending review',
      },
    ],
    draftPanel: {
      version: 'Draft v3 · Cooley LLP final response',
      meta: '<strong>Michael Reeves</strong> · saved May 9 · 16:42 EST · awaiting Dario sign-off · ready for Atlas review',
      paragraphs: [
        {
          type: 'text',
          text: 'Counsel for Staffva LLC d/b/a Atlas (<strong>"Producer"</strong>) hereby submits this response to the Grand Jury Subpoena dated May 1, 2026 in the matter of <em>United States v. Sealed</em>, Case No. 1:26-cr-00284-AKH ("Subpoena").',
        },
        {
          type: 'text',
          text: 'Producer has identified and is producing the following categories of records responsive to Attachments A and B:',
        },
        {
          type: 'clause',
          text: '<strong>Bates VOR-000001 to VOR-000142.</strong> Account creation and KYC records for the five entities named in Attachment A § 1, including business registration documents, beneficial-ownership disclosures, government-issued IDs for principals, and identity verification artifacts. Produced as native PDF with embedded metadata.',
        },
        {
          type: 'clause',
          text: '<strong>Bates VOR-000143 to VOR-001990.</strong> Transaction records for all five entities from account inception through May 5, 2026 (date of platform termination). Produced as a structured CSV with field-level documentation in accompanying README. Includes Stripe payment intent IDs, Wise transaction references, and Atlas internal IDs for cross-referencing.',
        },
        {
          type: 'clause',
          text: '<strong>Bates VOR-001991 to VOR-002403.</strong> All recorded communications between Producer\'s personnel and the five entities, including in-app messaging, email correspondence, and dispute records. Personal information of Producer\'s employees has been redacted per FRCrP 6(e)(2) and redaction log filed as Attachment C.',
        },
        {
          type: 'text',
          text: '<strong>Production timing.</strong> Categories 1-3 are ready for transmission upon Government\'s confirmation of receipt protocol. Categories 4-5 (login records and linked-account analysis) are in active collection and will be produced no later than the May 25, 2026 deadline.',
        },
        {
          type: 'text',
          text: '<strong>Reservation.</strong> Producer reserves all rights, including but not limited to objections on the grounds of relevance, overbreadth, and any applicable privilege, and reserves the right to supplement or amend this production in writing.',
        },
      ],
      batesRange: 'VOR-000001 to VOR-002800 · 5 categories · attachments A-C · production via SDNY secured FTP',
    },
    auditChain: [
      {
        time: 'May 9 · 16:42 UTC',
        action: 'Draft v3 saved by counsel',
        actor: 'by Michael Reeves (Cooley LLP)',
        actorStrong: 'Michael Reeves (Cooley LLP)',
        detail: 'Tightened Bates ranges, added reservation of rights, clarified production protocol for categories 4-5 still in collection. Sent to Atlas for sign-off.',
      },
      {
        time: 'May 7 · 11:08 UTC',
        action: 'Draft v2 by counsel',
        actor: 'by Michael Reeves (Cooley LLP)',
        actorStrong: 'Michael Reeves (Cooley LLP)',
        detail: 'Restructured response to follow Atlas\'s preferred Bates conventions. Added FRCrP 6(e)(2) redaction language for employee PII.',
      },
      {
        time: 'May 6 · 14:22 UTC',
        action: '3 of 5 record categories collected and exported to counsel',
        actor: 'by Dario Fonseca',
        actorStrong: 'Dario Fonseca',
        detail: 'KYC, transactions, communications exported via secured S3 bucket. Remaining 2 categories (login records + ring analysis) in active collection by Engineering + T&S teams.',
      },
      {
        time: 'May 5 · 09:15 UTC',
        action: 'Draft v1 by Atlas legal team',
        actor: 'by Dario Fonseca',
        actorStrong: 'Dario Fonseca',
        detail: 'Initial response sketch with placeholder Bates ranges. Sent to Cooley for substantive drafting.',
      },
      {
        time: 'May 4 · 13:45 UTC',
        action: 'Outside counsel engaged',
        actor: 'by Dario Fonseca',
        actorStrong: 'Dario Fonseca',
        detail: 'Cooley LLP engaged via standing SOW · Michael Reeves assigned as lead · privilege established · matter conflict-checked.',
      },
      {
        time: 'May 4 · 12:30 UTC',
        action: 'Receipt acknowledged to SDNY',
        actor: 'by Dario Fonseca',
        actorStrong: 'Dario Fonseca',
        detail: 'Formal acknowledgment of receipt sent to AUSA Sarah Chen\'s office via certified email. Confirmed intent to respond by May 25 deadline. Confidentiality of gag order affirmed.',
      },
      {
        time: 'May 4 · 11:14 UTC',
        action: 'Subpoena received',
        actor: 'via SDNY Service Department',
        actorStrong: 'SDNY Service Department',
        detail: 'Hand-delivered to Staffva LLC registered agent in Detroit, MI. Logged into compliance vault. Auto-routed to Dario (Super Admin) and Aïsha (Ops Admin) within 60s of receipt.',
        variant: 'danger',
      },
    ],
    notes: [
      {
        avatar: 'MR',
        avatarBg: 'linear-gradient(135deg, #2d3e50, #1a232c)',
        author: 'Michael Reeves',
        role: 'Cooley LLP · outside counsel',
        time: 'May 9 · 16:50 UTC',
        text: 'v3 is production-ready from our side. Reservation language follows the SDNY playbook we\'ve used in similar matters. Recommend Atlas sign off by end of week — we want 5-7 business days buffer for transmission, FTP setup, and any government follow-up before May 25.',
      },
      {
        avatar: 'DF',
        avatarBg: 'linear-gradient(135deg, #B8A0C9, #6E4F8B)',
        author: 'Dario Fonseca',
        role: 'Super Admin · matter lead',
        time: 'May 7 · 18:30 UTC',
        text: 'Engineering team confirms login-record pull on track for May 13. T&S team confirms ring-analysis export will follow by May 14. Both well within our buffer for May 25. Will sign off on v3 once final read tomorrow.',
      },
    ],
    countdown: {
      eyebrow: 'PRODUCTION DEADLINE',
      label: 'May 25 · 17:00 EST · final',
      days: 14,
      hours: 6,
      minutes: 22,
      barFillPct: 50,
      meta: '<strong>7d</strong> since receipt · <strong>14d</strong> remaining · 50% elapsed · target final-sign-off by May 16 for 7d transmission buffer.',
    },
    counsel: {
      name: 'Michael Reeves',
      firm: 'Cooley LLP · partner',
      initials: 'MR',
      avatarGradient: 'linear-gradient(135deg, #2d3e50, #1a232c)',
      metaRows: [
        {
          label: 'Practice',
          value: 'Gov\'t investigations',
        },
        {
          label: 'Engaged',
          value: 'May 4 · 13:45',
        },
        {
          label: 'Privilege',
          value: 'Established',
        },
        {
          label: 'Billed to date',
          value: '$18,400',
        },
        {
          label: 'Est. total',
          value: '$45-60K',
        },
      ],
    },
    quickstats1: [
      { label: 'Matter ref', value: 'LR-2026-0023' },
      { label: 'Case no.', value: '1:26-cr-00284-AKH' },
      { label: 'Issuing party', value: 'SDNY · AUSA Chen' },
      { label: 'Atlas role', value: 'Producer · not target', variant: 'success' },
      { label: 'Gag order', value: '90 days · § 2705(b)', variant: 'danger' },
      { label: 'Records sought', value: '5 categories' },
      { label: 'Bates range', value: 'VOR-000001 → 002800' },
      { label: 'Privilege log', value: '12 entries' },
    ],
    quickstats2: [
      { label: 'Fraud alert', value: 'FA-2026-0042' },
      { label: 'Ban order', value: 'SB-2026-0084' },
      { label: 'Sibling subpoena', value: 'LR-2026-0019' },
    ],
  },
};
