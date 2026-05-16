export interface RsSubmissionRow {
  id: string;
  variant?: 'urgent' | 'warn' | 'done' | 'upcoming';
  name: string;
  metaHtml: string;
  tags: Array<{ label: string; variant?: 'annual' | 'quarterly' | 'adhoc' | 'ongoing' }>;
  deadlineDate: string;
  deadlineRel: string;
  statusPill: 'acknowledged' | 'in-progress' | 'not-started' | 'draft' | 'na';
  statusLabel: string;
}

export interface RsJurisdictionCard {
  id: string;
  name: string;
  regulatorHtml: string;
  count: number;
  summary: string;
  flagStyle: React.CSSProperties;
  flagOverlays?: Array<{ style: React.CSSProperties }>;
  submissions: RsSubmissionRow[];
}

export interface RsPageData {
  title: string;
  metaText: string;
  pulseText: string;
  headerActions: Array<{ label: string; icon: string; isPrimary?: boolean }>;
  topStats: Array<{
    label: string;
    value: string;
    variant?: 'danger' | 'warn' | 'success';
    meta: string;
  }>;
  viewToggles: Array<{ label: string; icon: string; value: string; active?: boolean }>;
  jurisdictions: RsJurisdictionCard[];
  footerMeta: string;
}

export const rsJurisdictions: RsJurisdictionCard[] = [
  {
    id: 'us-federal',
    name: 'United States · Federal',
    regulatorHtml: '<strong>IRS</strong> · FinCEN · Treasury OFAC',
    count: 4,
    summary: '1 submitted · 2 in-progress · 1 upcoming',
    flagStyle: {
      background: 'linear-gradient(to bottom, #b22234 8.33%, #ffffff 8.33% 16.67%, #b22234 16.67% 25%, #ffffff 25% 33.3%, #b22234 33.3% 41.67%, #ffffff 41.67% 50%, #b22234 50% 58.33%, #ffffff 58.33% 66.67%, #b22234 66.67% 75%, #ffffff 75% 83.33%, #b22234 83.33% 91.67%, #ffffff 91.67%)',
    },
    flagOverlays: [{ style: { position: 'absolute' as const, top: 0, left: 0, width: '40%', height: '54%', background: '#002868' } }],
    submissions: [
      {
        id: 'rs-irs-1042s-2025',
        variant: 'done',
        name: 'IRS Form 1042-S · 2025 tax year',
        metaHtml:
          '478 forms filed · withheld tax $24,114.20 · <a>Step 22 →</a> · agent of record: <strong>Atlas (Staffva LLC)</strong>',
        tags: [
          { label: 'Annual', variant: 'annual' },
          { label: 'Tax' },
        ],
        deadlineDate: 'Mar 15',
        deadlineRel: 'submitted Mar 14',
        statusPill: 'acknowledged',
        statusLabel: 'Acknowledged',
      },
      {
        id: 'rs-fincen-q2-2026',
        name: 'FinCEN BSA SAR · Q2 2026 quarterly review',
        metaHtml:
          '2 SARs filed YTD · Q2 review covers Vorona ring (<a>FA-2026-0042</a>) · BSA officer: Dario',
        tags: [
          { label: 'Quarterly', variant: 'quarterly' },
          { label: 'AML' },
        ],
        deadlineDate: 'Jul 30',
        deadlineRel: '80d remaining',
        statusPill: 'in-progress',
        statusLabel: 'In progress',
      },
      {
        id: 'rs-irs-1099k-2025',
        variant: 'done',
        name: 'IRS Form 1099-K · 2025 tax year (aggregate)',
        metaHtml:
          '312 forms filed · payment-processor reports · gross volume $4.7M reported',
        tags: [
          { label: 'Annual', variant: 'annual' },
          { label: 'Tax' },
        ],
        deadlineDate: 'Mar 31',
        deadlineRel: 'submitted Mar 28',
        statusPill: 'acknowledged',
        statusLabel: 'Acknowledged',
      },
      {
        id: 'rs-ofac-screening-2026',
        name: 'OFAC sanctions screening · annual self-cert',
        metaHtml:
          'all users screened against SDN list · 0 hits in 2025 · 5 ring-entity hits Q2 (<a>FA-2026-0042</a> related, cleared)',
        tags: [
          { label: 'Annual', variant: 'annual' },
          { label: 'AML' },
        ],
        deadlineDate: 'Dec 31',
        deadlineRel: '234d remaining',
        statusPill: 'not-started',
        statusLabel: 'Not started',
      },
    ],
  },
  {
    id: 'eu-gdpr',
    name: 'European Union · GDPR',
    regulatorHtml: '<strong>EDPB</strong> · national DPAs · lead supervisor: Irish DPC',
    count: 4,
    summary: '1 submitted · 2 in-progress · 1 upcoming',
    flagStyle: {
      background: '#003399',
      position: 'relative' as const,
    },
    flagOverlays: [
      {
        style: {
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#FFCC00',
          fontSize: '14px',
          lineHeight: '1',
        },
      },
    ],
    submissions: [
      {
        id: 'rs-art30-2026',
        variant: 'warn',
        name: 'Article 30 records of processing · annual update',
        metaHtml:
          '47 processing activities documented · 10 subprocessors listed · DPO sign-off pending · last updated <strong>Apr 12, 2025</strong>',
        tags: [
          { label: 'Annual', variant: 'annual' },
          { label: 'Internal record' },
        ],
        deadlineDate: 'May 31',
        deadlineRel: '20d remaining',
        statusPill: 'in-progress',
        statusLabel: 'In progress',
      },
      {
        id: 'rs-ico-breach-si-14',
        variant: 'done',
        name: 'ICO breach notification · Article 33 · <a>SI-2026-0014</a>',
        metaHtml:
          'filed within 72h window · 312 affected users · ICO ref <strong>IC-247809-J3D2</strong> · post-incident review · <a>Step 16 →</a>',
        tags: [
          { label: 'Ad-hoc', variant: 'adhoc' },
          { label: 'Breach' },
        ],
        deadlineDate: 'Apr 22',
        deadlineRel: 'submitted Apr 23 · 69h after detection',
        statusPill: 'acknowledged',
        statusLabel: 'Acknowledged',
      },
      {
        id: 'rs-tia-2026',
        name: 'Transfer impact assessment · EU → US transfers',
        metaHtml:
          'EDPB-recommended TIA for SCCs · covers AWS US, Stripe US, Customer.io US, Amplitude US · post-Schrems II refresh · counsel-led',
        tags: [
          { label: 'Annual', variant: 'annual' },
          { label: 'Transfer' },
        ],
        deadlineDate: 'Jul 15',
        deadlineRel: '65d remaining',
        statusPill: 'in-progress',
        statusLabel: 'In progress',
      },
      {
        id: 'rs-dpc-rep-2026',
        name: 'Irish DPC · EU representative confirmation',
        metaHtml:
          'Article 27 representative attestation · McMahons Privacy (Dublin) on retainer · contact details unchanged',
        tags: [
          { label: 'Annual', variant: 'annual' },
          { label: 'Designation' },
        ],
        deadlineDate: 'Sep 30',
        deadlineRel: '142d remaining',
        statusPill: 'not-started',
        statusLabel: 'Not started',
      },
    ],
  },
  {
    id: 'uk-ico',
    name: 'United Kingdom · ICO',
    regulatorHtml:
      '<strong>Information Commissioner\'s Office</strong> · PECR · UK GDPR',
    count: 2,
    summary: '1 submitted · 1 in-progress',
    flagStyle: {
      background: '#012169',
      position: 'relative' as const,
    },
    flagOverlays: [
      {
        style: {
          position: 'absolute' as const,
          top: '50%',
          left: 0,
          right: 0,
          height: '5px',
          background: '#ffffff',
          transform: 'translateY(-50%)',
        },
      },
      {
        style: {
          position: 'absolute' as const,
          top: 0,
          bottom: 0,
          left: '50%',
          width: '5px',
          background: '#ffffff',
          transform: 'translateX(-50%)',
        },
      },
      {
        style: {
          position: 'absolute' as const,
          top: '50%',
          left: 0,
          right: 0,
          height: '2px',
          background: '#C8102E',
          transform: 'translateY(-50%)',
        },
      },
      {
        style: {
          position: 'absolute' as const,
          top: 0,
          bottom: 0,
          left: '50%',
          width: '2px',
          background: '#C8102E',
          transform: 'translateX(-50%)',
        },
      },
    ],
    submissions: [
      {
        id: 'rs-ico-fee-2026',
        variant: 'warn',
        name: 'ICO data protection fee renewal',
        metaHtml: '20d remaining · Tier 3 £2,900 · finance ops draft',
        tags: [
          { label: 'Annual', variant: 'annual' },
          { label: 'Fee' },
        ],
        deadlineDate: 'May 31',
        deadlineRel: '20d remaining',
        statusPill: 'in-progress',
        statusLabel: 'In progress',
      },
      {
        id: 'rs-ico-si-14',
        variant: 'done',
        name: 'SI-2026-0014 post-incident review complete',
        metaHtml: 'submitted 69h after detection · 312 users notified',
        tags: [
          { label: 'Ad-hoc', variant: 'adhoc' },
          { label: 'Breach' },
        ],
        deadlineDate: 'Apr 22',
        deadlineRel: 'submitted Apr 23',
        statusPill: 'acknowledged',
        statusLabel: 'Acknowledged',
      },
    ],
  },
  {
    id: 'ca-state',
    name: 'California · State',
    regulatorHtml: '<strong>California AG</strong> · CPPA · CCPA / CPRA',
    count: 2,
    summary: '2 submitted',
    flagStyle: {
      background: 'linear-gradient(to right, #ffffff 70%, #ce1126 30%)',
      position: 'relative' as const,
    },
    flagOverlays: [
      {
        style: {
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '12px',
          color: '#CE1126',
        },
      },
    ],
    submissions: [
      {
        id: 'rs-ccpa-do-not-sell',
        variant: 'done',
        name: 'CCPA Do Not Sell / Do Not Share list · Q2 2026',
        metaHtml:
          '847 user opt-outs processed · 12 third-party service providers de-listed',
        tags: [
          { label: 'Quarterly', variant: 'quarterly' },
          { label: 'CCPA' },
        ],
        deadlineDate: 'Jun 30',
        deadlineRel: 'submitted Jun 28',
        statusPill: 'acknowledged',
        statusLabel: 'Acknowledged',
      },
      {
        id: 'rs-ccpa-annual',
        name: 'CCPA annual privacy notice',
        metaHtml: 'scope of data sales · opt-out rates · third-party list',
        tags: [
          { label: 'Annual', variant: 'annual' },
          { label: 'Notice' },
        ],
        deadlineDate: 'Jul 1',
        deadlineRel: '16d remaining',
        statusPill: 'not-started',
        statusLabel: 'Not started',
      },
    ],
  },
  {
    id: 'ca-pipeda',
    name: 'Canada · PIPEDA',
    regulatorHtml:
      '<strong>Office of the Privacy Commissioner</strong> · federal · Quebec Law 25 separate',
    count: 2,
    summary: '1 urgent · 1 in-progress',
    flagStyle: {
      background: 'linear-gradient(to bottom, #FF0000 0%, #FF0000 33%, #FFFFFF 33%, #FFFFFF 67%, #FF0000 67%, #FF0000 100%)',
      position: 'relative' as const,
    },
    flagOverlays: [
      {
        style: {
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '11px',
          lineHeight: '1',
        },
      },
    ],
    submissions: [
      {
        id: 'rs-pipeda-annual-2026',
        variant: 'urgent',
        name: 'PIPEDA annual report',
        metaHtml:
          'data breaches YTD · employee complaints · consent management · DPO + Super Admin sign-off needed',
        tags: [
          { label: 'Annual', variant: 'annual' },
          { label: 'Report' },
        ],
        deadlineDate: 'May 20',
        deadlineRel: '9d remaining',
        statusPill: 'draft',
        statusLabel: 'Draft',
      },
      {
        id: 'rs-quebec-law25',
        name: 'Quebec Law 25 · PIA update',
        metaHtml:
          '47 QC candidates · French translation · data processing addendum · counsel review',
        tags: [
          { label: 'Annual', variant: 'annual' },
          { label: 'Law 25' },
        ],
        deadlineDate: 'Jun 30',
        deadlineRel: '46d remaining',
        statusPill: 'in-progress',
        statusLabel: 'In progress',
      },
    ],
  },
  {
    id: 'intl-other',
    name: 'International · other jurisdictions',
    regulatorHtml:
      '<strong>Singapore PDPC</strong> · India DPDP · Australia OAIC · Brazil ANPD',
    count: 2,
    summary: '2 pending',
    flagStyle: {
      background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)',
      position: 'relative' as const,
    },
    flagOverlays: [],
    submissions: [
      {
        id: 'rs-india-dpdp-2026',
        name: 'India DPDP · SDF notification',
        metaHtml:
          '~3,400 Indian candidates · DPIA scoping needed · SDF structure assessment',
        tags: [
          { label: 'Ad-hoc', variant: 'adhoc' },
          { label: 'DPDP' },
        ],
        deadlineDate: 'Aug 1',
        deadlineRel: '78d remaining',
        statusPill: 'not-started',
        statusLabel: 'Not started',
      },
      {
        id: 'rs-singapore-pdpc',
        name: 'Singapore PDPC · Data Protection Notice',
        metaHtml:
          'cross-border transfer mechanism · no change vs 2024 · annual verification',
        tags: [
          { label: 'Annual', variant: 'annual' },
          { label: 'Notification' },
        ],
        deadlineDate: 'Oct 31',
        deadlineRel: '168d remaining',
        statusPill: 'na',
        statusLabel: 'N/A',
      },
    ],
  },
];

export const rsPageData: RsPageData = {
  title: 'Regulatory submissions',
  metaText:
    '/admin/compliance/regulatory-submissions · 6 jurisdictions tracked · 14 active submissions · 1 urgent deadline · 8 submitted YTD',
  pulseText: 'Canada PIPEDA annual report · due May 20 · 9 days',
  headerActions: [
    { label: 'Export schedule', icon: 'download' },
    { label: 'ICS sync', icon: 'calendar' },
    { label: 'Log new submission', icon: 'plus', isPrimary: true },
  ],
  topStats: [
    {
      label: 'Active submissions',
      value: '14',
      meta: '<strong>6 jurisdictions</strong> · 11 in-progress · 3 not started',
    },
    {
      label: 'Deadline · this week',
      value: '1',
      variant: 'danger',
      meta: '<strong>Canada PIPEDA</strong> · 9d remaining',
    },
    {
      label: 'Deadline · this month',
      value: '4',
      variant: 'warn',
      meta: 'PIPEDA · ICO · FinCEN · Art. 30',
    },
    {
      label: 'Overdue',
      value: '0',
      variant: 'success',
      meta: '100% on-time · YTD',
    },
    {
      label: 'Submitted · YTD',
      value: '8',
      meta: 'all <strong>acknowledged</strong> by regulators',
    },
  ],
  viewToggles: [
    { label: 'By jurisdiction', icon: 'globe', value: 'jurisdiction', active: true },
    { label: 'Calendar', icon: 'calendar', value: 'calendar' },
    { label: 'By status', icon: 'list', value: 'status' },
  ],
  jurisdictions: rsJurisdictions,
  footerMeta:
    '14 active · 6 jurisdictions · 8 submitted YTD · all on-time · last refreshed 4 min ago',
};

export type RsCalEventVariant = 'urgent' | 'warn' | 'upcoming' | 'done';

export interface RsCalEvent {
  id: string;
  variant: RsCalEventVariant;
  date: string;
  name: string;
  meta: string;
  jurisdiction: string;
}

export interface RsCalendarMonth {
  monthLabel: string;
  yearLabel: string;
  events: RsCalEvent[];
}

export const rsCalendarMonths: RsCalendarMonth[] = [
  {
    monthLabel: 'May',
    yearLabel: '2026 · this month',
    events: [
      {
        id: 'rs-pipeda-annual-2026',
        variant: 'urgent',
        date: 'May 20',
        name: 'PIPEDA annual report',
        meta: '9d remaining · DPO + Super Admin sign-off needed',
        jurisdiction: 'PIPEDA · CA',
      },
      {
        id: 'rs-art30-2026',
        variant: 'warn',
        date: 'May 31',
        name: 'GDPR Article 30 records update',
        meta: '20d remaining · DPO in-progress',
        jurisdiction: 'GDPR · EU',
      },
      {
        id: 'rs-ico-fee-2026',
        variant: 'warn',
        date: 'May 31',
        name: 'ICO data protection fee renewal',
        meta: '20d remaining · Tier 3 £2,900 · finance ops draft',
        jurisdiction: 'UK',
      },
    ],
  },
  {
    monthLabel: 'Jul',
    yearLabel: '2026',
    events: [
      {
        id: 'rs-ccpa-report-2026',
        variant: 'upcoming',
        date: 'Jul 1',
        name: 'CCPA annual privacy report',
        meta: 'DSAR metrics · 98 YTD · 14d avg fulfillment',
        jurisdiction: 'CCPA · CA',
      },
      {
        id: 'rs-tia-2026',
        variant: 'upcoming',
        date: 'Jul 15',
        name: 'EU → US transfer impact assessment',
        meta: 'post-Schrems II · 4 US subprocessors · counsel-led',
        jurisdiction: 'GDPR · EU',
      },
      {
        id: 'rs-fincen-q2-2026',
        variant: 'upcoming',
        date: 'Jul 30',
        name: 'FinCEN BSA Q2 quarterly review',
        meta: 'SAR review · Vorona ring (FA-2026-0042)',
        jurisdiction: 'US Fed',
      },
    ],
  },
  {
    monthLabel: 'Aug',
    yearLabel: '2026',
    events: [
      {
        id: 'rs-india-dpdp-2026',
        variant: 'upcoming',
        date: 'Aug 1',
        name: 'India DPDP · SDF notification',
        meta: '~3,400 Indian candidates · DPIA scoping needed',
        jurisdiction: 'DPDP · IN',
      },
    ],
  },
  {
    monthLabel: 'Sep',
    yearLabel: '2026',
    events: [
      {
        id: 'rs-pipeda-loi-25',
        variant: 'upcoming',
        date: 'Sep 1',
        name: 'Quebec Law 25 · PIA',
        meta: '47 QC candidates · French translation needed',
        jurisdiction: 'Loi 25 · QC',
      },
      {
        id: 'rs-dpc-rep-2026',
        variant: 'upcoming',
        date: 'Sep 30',
        name: 'Irish DPC EU representative',
        meta: 'Article 27 attestation · McMahons Privacy',
        jurisdiction: 'GDPR · IE',
      },
    ],
  },
  {
    monthLabel: 'Dec',
    yearLabel: '2026',
    events: [
      {
        id: 'rs-ofac-screening-2026',
        variant: 'upcoming',
        date: 'Dec 31',
        name: 'OFAC sanctions screening cert',
        meta: 'annual self-cert · 5 ring-entity hits cleared',
        jurisdiction: 'OFAC · US',
      },
    ],
  },
  {
    monthLabel: 'Past',
    yearLabel: 'submitted YTD',
    events: [
      {
        id: 'rs-irs-1042s-2025',
        variant: 'done',
        date: 'Mar 14',
        name: 'IRS 1042-S filing · 2025 tax year',
        meta: '478 forms · $24,114.20 withheld · acknowledged',
        jurisdiction: 'IRS · US',
      },
      {
        id: 'rs-irs-1099k-2025',
        variant: 'done',
        date: 'Mar 28',
        name: 'IRS 1099-K aggregate · 2025',
        meta: '312 forms · $4.7M gross volume · acknowledged',
        jurisdiction: 'IRS · US',
      },
      {
        id: 'rs-ico-breach-si-14',
        variant: 'done',
        date: 'Apr 23',
        name: 'ICO breach notification (SI-2026-0014)',
        meta: '69h after detection · within Art. 33 window · acknowledged',
        jurisdiction: 'ICO · UK',
      },
      {
        id: 'rs-ico-post-si-14',
        variant: 'done',
        date: 'Apr 28',
        name: 'SI-2026-0014 post-incident review',
        meta: '14 controls strengthened · ICO ack received',
        jurisdiction: 'ICO · UK',
      },
      {
        id: 'rs-ccpa-dns-2026',
        variant: 'done',
        date: 'Feb 22',
        name: 'CCPA "Do Not Sell" cert',
        meta: 'GPC honored · 312 opt-outs YTD · Cooley LLP',
        jurisdiction: 'CCPA · CA',
      },
    ],
  },
];

export const rsStatusPaneText = {
  title: 'Status view',
  description:
    'Groups submissions by workflow state: Not started · In progress · Draft · Submitted · Acknowledged · N/A. Same 14 submissions reorganized for status review meetings. Switch back to Jurisdiction view to see canonical data.',
};
