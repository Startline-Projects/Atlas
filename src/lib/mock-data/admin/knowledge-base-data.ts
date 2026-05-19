/* Step 37 — Internal Knowledge Base fixture (Pass A: LIST view)
   Verbatim from admin.html lines 66159-66707.
   Detail-view fixtures will be added in Pass B/C/D. */

import type { PrStat } from './privacy-reports-data';
import type {
  HcFrontmatterData,
  HcMarkdownData,
} from './help-content-data';

export type KbHeaderIcon = 'chart-line' | 'check' | 'plus';

export interface KbHeaderAction {
  label: string;
  icon: KbHeaderIcon;
  isPrimary?: boolean;
}

export type KbCategoryIconKey =
  | 'square'
  | 'user'
  | 'clipboard'
  | 'lock'
  | 'triangle-alert'
  | 'shield'
  | 'book';

export interface KbCategoryItem {
  label: string;
  count: string;
  value: string;
  iconKey: KbCategoryIconKey;
  isActive?: boolean;
}

export type KbDocStatusVariant =
  | 'live'
  | 'needs-verify'
  | 'critical-stale'
  | 'draft'
  | 'archived';

export type KbDocVariant = 'default' | 'stale' | 'critical-stale' | 'draft';
export type KbVerifiedDotVariant = 'fresh' | 'aging' | 'stale';
export type KbTagVariant =
  | 'default'
  | 'runbook'
  | 'critical'
  | 'compliance'
  | 'fraud'
  | 'onboarding';

export type KbDocBadge = '★' | '⚠';

export interface KbTag {
  label: string;
  variant: KbTagVariant;
}

export interface KbDocRow {
  id: string;
  variant: KbDocVariant;
  badge?: KbDocBadge;
  title: string;
  tags: KbTag[];
  slug: string;
  views: string;
  viewsMeta: string;
  verifiedDot: KbVerifiedDotVariant;
  verifiedDate: string;
  verifiedMeta: string;
  modifiedDate: string;
  modifiedAuthor: string;
  statusVariant: KbDocStatusVariant;
  statusLabel: string;
}

export interface KbCategorySectionData {
  id: string;
  eyebrow: string;
  title: string;
  headActionLabel: string;
  docs: KbDocRow[];
}

export interface KbPageMeta {
  title: string;
  metaText: string;
}

export const kbPageMeta: KbPageMeta = {
  title: 'Knowledge base',
  metaText:
    '/admin/internal/knowledge-base · 89 documents · 6 categories · 4 SMEs · internal only · indexed for admin search',
};

export const kbMetaPulseHtml =
  '2 critical-stale SOPs require re-verification · last verified &gt; 180d';

export const kbSearchPlaceholder = 'Search KB · SOPs · runbooks…';

export const kbHeaderActions: KbHeaderAction[] = [
  { label: 'Audit', icon: 'chart-line' },
  { label: 'Verification queue', icon: 'check' },
  { label: 'New SOP', icon: 'plus', isPrimary: true },
];

export const kbTopStats: PrStat[] = [
  {
    label: 'Total documents',
    value: '89',
    meta: '<strong>6 categories</strong> · internal only',
  },
  {
    label: 'Views · 30d',
    value: '1,847',
    meta: 'internal team · 12 unique admins',
  },
  {
    label: 'Needs re-verify',
    value: '7',
    variant: 'warn',
    meta: 'aging &gt; 120d · 2 critical &gt; 180d',
  },
  {
    label: 'Drafts',
    value: '3',
    meta: '2 in SME review · 1 in writing',
  },
  {
    label: 'Contributors',
    value: '4',
    meta: 'Aïsha · Dario · Mateo · Daniel',
  },
];

export const kbCategories: KbCategoryItem[] = [
  { label: 'All documents', count: '89', value: 'all', iconKey: 'square', isActive: true },
  { label: 'Onboarding', count: '14', value: 'onboarding', iconKey: 'user' },
  { label: 'SOPs', count: '28', value: 'sops', iconKey: 'clipboard' },
  { label: 'Compliance checklists', count: '16', value: 'compliance', iconKey: 'lock' },
  { label: 'Fraud playbooks', count: '11', value: 'fraud', iconKey: 'triangle-alert' },
  { label: 'Privacy runbooks', count: '12', value: 'privacy', iconKey: 'shield' },
  { label: 'Reference', count: '8', value: 'reference', iconKey: 'book' },
];

export const kbCategorySections: KbCategorySectionData[] = [
  {
    id: 'fraud',
    eyebrow: 'CATEGORY · FRAUD PLAYBOOKS · 11 DOCS',
    title: 'Fraud playbooks',
    headActionLabel: 'Add doc',
    docs: [
      {
        id: 'kb-vorona-ring-sop',
        variant: 'default',
        badge: '★',
        title: 'Coordinated-fraud-ring response · SOP',
        tags: [
          { label: 'Runbook', variant: 'runbook' },
          { label: 'Critical', variant: 'critical' },
        ],
        slug: '/kb/fraud/coordinated-ring-response · v6 · 4 phases · 27 steps',
        views: '342',
        viewsMeta: '↑ +18% post-FA-0042',
        verifiedDot: 'fresh',
        verifiedDate: 'Apr 18, 2026',
        verifiedMeta: 'SME: Aïsha · 25d ago',
        modifiedDate: 'Apr 18',
        modifiedAuthor: 'Aïsha',
        statusVariant: 'live',
        statusLabel: 'Live',
      },
      {
        id: 'kb-single-fraud',
        variant: 'stale',
        title: 'Single-account fraud · escalation flow',
        tags: [{ label: 'Runbook', variant: 'runbook' }],
        slug: '/kb/fraud/single-account-flow · v3 · 14 steps',
        views: '214',
        viewsMeta: 'stable',
        verifiedDot: 'aging',
        verifiedDate: 'Dec 14, 2025',
        verifiedMeta: 'SME: Aïsha · 150d ago',
        modifiedDate: 'Dec 14',
        modifiedAuthor: 'Aïsha · stale',
        statusVariant: 'needs-verify',
        statusLabel: 'Re-verify',
      },
      {
        id: 'kb-sock-puppet',
        variant: 'default',
        title: 'Sock-puppet review clusters · detection & response',
        tags: [{ label: 'Runbook', variant: 'runbook' }],
        slug: '/kb/fraud/sock-puppet-clusters · v2 · linked REV-834',
        views: '98',
        viewsMeta: 'stable',
        verifiedDot: 'fresh',
        verifiedDate: 'Mar 22, 2026',
        verifiedMeta: 'SME: Daniel · 52d ago',
        modifiedDate: 'Mar 22',
        modifiedAuthor: 'Daniel',
        statusVariant: 'live',
        statusLabel: 'Live',
      },
      {
        id: 'kb-id-fraud',
        variant: 'default',
        title: 'Fake-ID detection & quarantine playbook',
        tags: [{ label: 'Runbook', variant: 'runbook' }],
        slug: '/kb/fraud/fake-id · v3 · linked FA-2026-0041 (Marek)',
        views: '142',
        viewsMeta: '↑ +8%',
        verifiedDot: 'fresh',
        verifiedDate: 'Apr 4, 2026',
        verifiedMeta: 'SME: Aïsha · 39d ago',
        modifiedDate: 'Apr 4',
        modifiedAuthor: 'Aïsha',
        statusVariant: 'live',
        statusLabel: 'Live',
      },
    ],
  },
  {
    id: 'sops',
    eyebrow: 'CATEGORY · SOPs · 28 DOCS',
    title: 'Standard operating procedures',
    headActionLabel: 'Add SOP',
    docs: [
      {
        id: 'kb-dispute-mediation',
        variant: 'default',
        title: 'Dispute mediation · 7-day SLA workflow',
        tags: [{ label: 'Runbook', variant: 'runbook' }],
        slug: '/kb/sops/dispute-mediation · v4 · linked Step 12, DSP-0144',
        views: '187',
        viewsMeta: '↑ +12% post-Tomás',
        verifiedDot: 'fresh',
        verifiedDate: 'Apr 24, 2026',
        verifiedMeta: 'SME: Mateo · 19d ago',
        modifiedDate: 'Apr 24',
        modifiedAuthor: 'Mateo',
        statusVariant: 'live',
        statusLabel: 'Live',
      },
      {
        id: 'kb-payout-failure',
        variant: 'default',
        title: 'Payout failure · recovery procedure',
        tags: [{ label: 'Runbook', variant: 'runbook' }],
        slug: '/kb/sops/payout-failure-recovery · v2 · linked TX-2026-08442',
        views: '98',
        viewsMeta: 'stable',
        verifiedDot: 'fresh',
        verifiedDate: 'Apr 8, 2026',
        verifiedMeta: 'SME: Dario · 35d ago',
        modifiedDate: 'Apr 8',
        modifiedAuthor: 'Dario',
        statusVariant: 'live',
        statusLabel: 'Live',
      },
      {
        id: 'kb-vetting-cooldown',
        variant: 'critical-stale',
        badge: '⚠',
        title: 'Vetting cooldown · 90-day enforcement',
        tags: [{ label: 'Runbook', variant: 'runbook' }],
        slug: '/kb/sops/vetting-cooldown · v2 · uses Step 31 templates',
        views: '47',
        viewsMeta: 'low traffic',
        verifiedDot: 'stale',
        verifiedDate: 'Oct 14, 2025',
        verifiedMeta: 'SME: Mateo · 211d ago',
        modifiedDate: 'Oct 14',
        modifiedAuthor: 'Mateo · stale',
        statusVariant: 'critical-stale',
        statusLabel: 'Critical-stale',
      },
      {
        id: 'kb-refund-decision',
        variant: 'draft',
        title: 'Refund decision matrix · v4 (revising)',
        tags: [{ label: 'Runbook', variant: 'runbook' }],
        slug: '/kb/sops/refund-decision-matrix · v4 draft · linked REF-0084',
        views: '0',
        viewsMeta: 'not yet published',
        verifiedDot: 'fresh',
        verifiedDate: '—',
        verifiedMeta: 'awaiting first SME pass',
        modifiedDate: 'May 7',
        modifiedAuthor: 'Aïsha · drafting',
        statusVariant: 'draft',
        statusLabel: 'Draft',
      },
    ],
  },
  {
    id: 'compliance',
    eyebrow: 'CATEGORY · COMPLIANCE CHECKLISTS · 16 DOCS',
    title: 'Compliance checklists',
    headActionLabel: 'Add checklist',
    docs: [
      {
        id: 'kb-dsr-checklist',
        variant: 'default',
        title: 'DSR fulfilment checklist · GDPR Art.17 / CCPA',
        tags: [
          { label: 'GDPR', variant: 'compliance' },
          { label: 'CCPA', variant: 'compliance' },
        ],
        slug: '/kb/compliance/dsr-fulfilment · v5 · linked Step 24, DSR-0089',
        views: '142',
        viewsMeta: '↑ +24% Q2',
        verifiedDot: 'fresh',
        verifiedDate: 'Apr 1, 2026',
        verifiedMeta: 'SME: Aïsha · v3.2 policy',
        modifiedDate: 'Apr 1',
        modifiedAuthor: 'Aïsha',
        statusVariant: 'live',
        statusLabel: 'Live',
      },
      {
        id: 'kb-breach-72h',
        variant: 'default',
        title: 'Breach disclosure · 72-hour ICO procedure',
        tags: [
          { label: 'GDPR Art.33', variant: 'compliance' },
          { label: 'Critical', variant: 'critical' },
        ],
        slug: '/kb/compliance/breach-72h · v3 · linked Step 16, SI-0014',
        views: '87',
        viewsMeta: '↑ +47% post-SI-0014',
        verifiedDot: 'fresh',
        verifiedDate: 'Apr 22, 2026',
        verifiedMeta: 'SME: Aïsha · 21d ago',
        modifiedDate: 'Apr 22',
        modifiedAuthor: 'Aïsha · post-SI-0014',
        statusVariant: 'live',
        statusLabel: 'Live',
      },
      {
        id: 'kb-quarterly-soc2',
        variant: 'critical-stale',
        badge: '⚠',
        title: 'Quarterly SOC2 evidence collection',
        tags: [{ label: 'SOC2', variant: 'compliance' }],
        slug: '/kb/compliance/soc2-quarterly · v1 · external audit support',
        views: '24',
        viewsMeta: 'low traffic',
        verifiedDot: 'stale',
        verifiedDate: 'Aug 14, 2025',
        verifiedMeta: 'SME: Dario · 272d ago',
        modifiedDate: 'Aug 14, 2025',
        modifiedAuthor: 'Dario · stale',
        statusVariant: 'critical-stale',
        statusLabel: 'Critical-stale',
      },
    ],
  },
  {
    id: 'onboarding',
    eyebrow: 'CATEGORY · ONBOARDING · 14 DOCS',
    title: 'Admin onboarding',
    headActionLabel: 'Add doc',
    docs: [
      {
        id: 'kb-week-1',
        variant: 'default',
        title: 'Week 1 · new admin orientation',
        tags: [{ label: 'Onboarding', variant: 'onboarding' }],
        slug: '/kb/onboarding/week-1 · v3 · 6 sub-pages',
        views: '32',
        viewsMeta: 'cohort hires',
        verifiedDot: 'fresh',
        verifiedDate: 'Apr 14, 2026',
        verifiedMeta: 'SME: Mateo · 29d ago',
        modifiedDate: 'Apr 14',
        modifiedAuthor: 'Mateo',
        statusVariant: 'live',
        statusLabel: 'Live',
      },
      {
        id: 'kb-tool-access',
        variant: 'default',
        title: 'Tool access & provisioning · day 1 checklist',
        tags: [{ label: 'Onboarding', variant: 'onboarding' }],
        slug: '/kb/onboarding/tool-access · v2 · linked Step 30 integrations',
        views: '28',
        viewsMeta: 'stable',
        verifiedDot: 'fresh',
        verifiedDate: 'Mar 14, 2026',
        verifiedMeta: 'SME: Dario · 60d ago',
        modifiedDate: 'Mar 14',
        modifiedAuthor: 'Dario',
        statusVariant: 'live',
        statusLabel: 'Live',
      },
    ],
  },
];

export const kbFooterText =
  'Showing 13 of 89 documents · 4 categories visible · use sidebar to filter · 2 critical-stale items above (need SME re-verification)';

/* ============================================================
   DETAIL VIEW (Pass B slice — breadcrumb + hero + verify-banner + stats)
   admin.html lines 66714-66796
   ============================================================ */

export interface KbBreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

export type KbDetailHeroIconKey = 'link' | 'history' | 'save';

export interface KbDetailHeroAction {
  label: string;
  iconKey?: KbDetailHeroIconKey;
  isPrimary?: boolean;
}

export interface KbDetailHero {
  id: string;
  statusVariant: KbDocStatusVariant;
  statusLabel: string;
  metaText: string;
  title: string;
  subtitleHtml: string;
  actions: KbDetailHeroAction[];
}

export type KbVerifyBannerVariant = 'fresh' | 'aging' | 'stale';

export interface KbVerifyBannerData {
  variant: KbVerifyBannerVariant;
  eyebrow: string;
  h3Title: string;
  metaHtml: string;
  actionLabel: string;
}

export type KbDetailStatVariant = 'default' | 'success' | 'warn';

export interface KbDetailStat {
  label: string;
  value: string;
  valueSuffix?: string;
  valueVariant?: KbDetailStatVariant;
  meta: string;
  trendVariant?: 'up' | 'down';
  trendLabel?: string;
}

export interface KbPreviewStep {
  text: string;
  isComplete: boolean;
}

export interface KbPreviewCardData {
  headTitle: string;
  headMeta: string;
  sectionEyebrow: string;
  steps: KbPreviewStep[];
  footerText: string;
}

export interface KbLinkedCase {
  id: string;
  title: string;
  meta: string;
}

export interface KbRunbookLink {
  id: string;
  title: string;
  meta: string;
}

export interface KbCategorizationData {
  linkedCasesLabel: string;
  linkedCases: KbLinkedCase[];
  runbookLinksLabel: string;
  runbookLinks: KbRunbookLink[];
  crossStepLinksLabel: string;
  crossStepLinksHtml: string;
  revisionLabel: string;
  revisionHtml: string;
  revisionActionLabel: string;
}

export interface KbDetailData {
  breadcrumb: KbBreadcrumbItem[];
  hero: KbDetailHero;
  verifyBanner: KbVerifyBannerData;
  detailStats: KbDetailStat[];
  frontmatter: HcFrontmatterData;
  markdownBody: HcMarkdownData;
  previewCard: KbPreviewCardData;
  categorization: KbCategorizationData;
}

export const kbCanonicalDetail: KbDetailData = {
  breadcrumb: [
    { label: 'Knowledge base', href: '/admin/internal/knowledge-base' },
    { label: 'Fraud playbooks' },
    {
      label: 'Coordinated-fraud-ring response · v6',
      isCurrent: true,
    },
  ],
  hero: {
    id: 'kb.fraud.coordinated_ring_response',
    statusVariant: 'live',
    statusLabel: 'Live · v6',
    metaText:
      'Internal only · SME: Aïsha · 4 phases · 27 steps · 342 internal views / 30d',
    title: 'Coordinated-fraud-ring response · SOP',
    subtitleHtml:
      'The canonical runbook for handling coordinated fraud rings — multiple linked accounts engaged in identity sharing, payment manipulation, or coordinated review fraud. <strong>v6 was rewritten in April after <a>FA-2026-0042 (the Vorona ring)</a></strong> exposed gaps in the prior synchronized-ban procedure. This SOP now anchors phases 1–4: detection signals → evidence packaging → synchronized enforcement (<a>SB-2026-0084/0085</a>) → post-action audit (<a>AUD-2026-106102</a>). Last verified by <strong>Aïsha (DPO)</strong> 25 days ago. Next re-verification due <strong>Jul 18, 2026</strong>.',
    actions: [
      { label: 'Copy link', iconKey: 'link' },
      { label: 'Version history', iconKey: 'history' },
      { label: 'Save & publish v7', iconKey: 'save', isPrimary: true },
    ],
  },
  verifyBanner: {
    variant: 'fresh',
    eyebrow: 'VERIFICATION · FRESH',
    h3Title:
      'Verified Apr 18, 2026 by Aïsha (DPO) · next re-verification due Jul 18, 2026',
    metaHtml:
      'v6 incorporates the lessons learned from <strong>FA-2026-0042</strong> · explicit phase-3 synchronized-ban procedure prevents the 7-min cross-account warning that exposed satellites in the Marek ring · all 4 phases re-tested in tabletop drill Apr 16.',
    actionLabel: 'Re-verify now',
  },
  detailStats: [
    {
      label: 'Views · 30d',
      value: '342',
      meta: 'post-FA-0042 surge',
      trendVariant: 'up',
      trendLabel: '+18%',
    },
    {
      label: 'Last verified',
      value: '25',
      valueSuffix: 'd ago',
      valueVariant: 'success',
      meta: 'Apr 18 by Aïsha · drilled Apr 16',
    },
    {
      label: 'Sections',
      value: '4',
      valueSuffix: 'phases · 27 steps',
      meta: 'detect → package → enforce → audit',
    },
    {
      label: 'Time-to-execute',
      value: '~6',
      valueSuffix: 'hr',
      meta: 'tabletop · 4h actual on FA-0042',
    },
  ],
  frontmatter: {
    sectionHead: {
      num: '01',
      title: 'Document frontmatter',
      meta: 'title · slug · category · tags · SME owner · re-verification cadence',
    },
    rows: [
      {
        key: 'TITLE',
        valueKind: 'input',
        valueHtml: 'Coordinated-fraud-ring response · SOP',
      },
      {
        key: 'SLUG',
        valueKind: 'input',
        valueHtml: 'coordinated-ring-response',
      },
      {
        key: 'CATEGORY',
        valueKind: 'text',
        valueHtml:
          'Fraud playbooks · <span data-hc-muted-soft>(11 docs)</span>',
      },
      {
        key: 'TAGS',
        valueKind: 'tags',
        valueHtml:
          '<span data-hc-tag-chip>Runbook</span><span data-hc-tag-chip>Critical</span><span data-hc-tag-chip>Fraud</span><span data-hc-tag-chip>Synchronized-ban</span><span data-hc-tag-chip data-hc-tag-add>+ add tag</span>',
      },
      {
        key: 'SME OWNER',
        valueKind: 'text',
        valueHtml: 'Aïsha Omar (DPO) · backup: Mateo Kowalski',
      },
      {
        key: 'RE-VERIFY EVERY',
        valueKind: 'text',
        valueHtml:
          '90 days · auto-flag at 120d aging · auto-flag at 180d critical-stale',
      },
      {
        key: 'PUBLISHED',
        valueKind: 'text',
        valueHtml:
          'v6 · live since Apr 18, 2026 · audit AUD-2026-107238 · 5 prior versions',
      },
    ],
  },
  markdownBody: {
    sectionHead: {
      num: '02',
      title: 'Document body · Markdown',
      meta: 'GitHub-flavored markdown · custom directives for cross-refs (<code>::ref[FA-2026-0042]</code>) and SLA badges',
      actionLabel: 'Markdown help',
    },
    headTitle: 'EN · canonical · internal use only',
    headMeta: 'unsaved · last commit Apr 18 · audit AUD-2026-107238',
    bodyHtml:
      '<span data-hc-md-heading-1># Coordinated-fraud-ring response · SOP</span>\n\n' +
      '<span data-hc-md-em>Internal · admin-eyes-only · not for client distribution. Last verified Apr 18, 2026 by Aïsha O. Re-verify every 90 days.</span>\n\n' +
      '<span data-hc-md-em>Reference cases:</span> <span data-hc-md-link>[FA-2026-0042 (Vorona ring)]</span>, <span data-hc-md-link>[SB-2026-0084]</span>, <span data-hc-md-link>[SB-2026-0085]</span>, <span data-hc-md-link>[AUD-2026-106102]</span>.\n\n' +
      '<span data-hc-md-heading-2>## When to use this SOP</span>\n\n' +
      'Run this playbook when fraud detection signals indicate <span data-hc-md-bold>≥ 2 linked accounts</span> with at least one of:\n\n' +
      '<span data-hc-md-list>- Shared device fingerprint or IP within a 48h window\n' +
      '- Cross-account payment instrument reuse (same card · same bank account)\n' +
      '- Synchronized account-creation pattern (within 7 days, same vetting cohort)\n' +
      '- Bidirectional referral chain with shared payee\n' +
      '- Coordinated review activity (sock-puppet cluster detection)</span>\n\n' +
      'Single-account fraud follows the <span data-hc-md-link>[single-account flow SOP](/kb/fraud/single-account-flow)</span> instead.\n\n' +
      '<span data-hc-md-heading-2>## Phase 1 · Detection &amp; scoping (0–60min)</span>\n\n' +
      '<span data-hc-md-list>1. Open the <span data-hc-md-bold>fraud detection workspace</span> ::ref[Step 15]. The trigger alert should already include the cluster size and confidence score.\n' +
      '2. Verify the ring boundary: pull device fingerprints, IPs, payment instruments, and referral edges for every account in the cluster.\n' +
      '3. Score each account: <span data-hc-md-bold>primary</span> (initial detection), <span data-hc-md-bold>satellite</span> (linked but lower activity), <span data-hc-md-bold>edge</span> (referred but distinct).\n' +
      '4. Snapshot all current evidence to <span data-hc-md-code>/evidence/{case_id}/snapshot_t0.json</span>. <span data-hc-md-em>Do not delay this step</span> — once accounts are aware of investigation, behaviour changes.\n' +
      '5. Convene the response team in <span data-hc-md-code>#sec-incident</span>. Required: DPO, fraud lead, on-call engineer. Optional: legal counsel if &gt; 5 accounts or &gt; $50k exposure.</span>\n\n' +
      '<span data-hc-md-heading-2>## Phase 2 · Evidence packaging (60–180min)</span>\n\n' +
      '<span data-hc-md-list>6. Capture full activity trees for each account (sessions, transactions, reviews, messages) — preserve the <span data-hc-md-bold>audit hash chain</span> from ::ref[Step 25].\n' +
      '7. Generate cross-account link graph in the fraud workspace. Export as <span data-hc-md-code>.json</span> + visual PNG.\n' +
      '8. Draft the <span data-hc-md-bold>enforcement package</span>: one decision document covering primary + satellites with explicit findings, evidence pointers, and recommended actions.\n' +
      '9. Get DPO sign-off (Aïsha or backup). Sign-off is recorded in audit log.\n' +
      '10. <span data-hc-md-bold>Critical:</span> do not contact any account in the ring during this phase. Premature contact triggers cleanup behaviour and weakens the case.</span>\n\n' +
      '<span data-hc-md-heading-2>## Phase 3 · Synchronized enforcement (180–270min)</span>\n\n' +
      '<span data-hc-md-em>This phase is the lesson from FA-2026-0042. The original SOP allowed 7 minutes between primary and satellite bans, which gave the ring time to coordinate. v6 reduces this to ≤ 30 seconds via the batch-ban endpoint.</span>\n\n' +
      '<span data-hc-md-list>11. Stage the enforcement actions in the <span data-hc-md-link>[suspensions workspace](/admin/safety/sanctions)</span> as a <span data-hc-md-bold>batch</span> ::ref[Step 17].\n' +
      '12. Run a final pre-flight check: all account IDs in the batch resolve, evidence pointers attached, language pack selected.\n' +
      '13. Execute the batch ban. The synchronized-ban endpoint fires the suspension events for all accounts within a 30s window — <span data-hc-md-bold>primary first, satellites second, edges third</span>.\n' +
      '14. Confirm all suspension notifications fired (Step 31 templates auto-route).\n' +
      '15. Snapshot post-action state to <span data-hc-md-code>/evidence/{case_id}/snapshot_t_ban.json</span>.</span>\n\n' +
      '<span data-hc-md-heading-2>## Phase 4 · Post-action audit (270–360min)</span>\n\n' +
      '<span data-hc-md-list>16. Verify the audit hash chain integrity for all enforcement events ::ref[Step 25, AUD-2026-106102].\n' +
      '17. File the post-action report into the case folder. Include: ring topology, decision document, evidence snapshots, audit chain proof.\n' +
      '18. If &gt; $10k loss exposure: notify counsel + start the <span data-hc-md-link>[insurance claim runbook](/kb/fraud/insurance-claim)</span>.\n' +
      '19. If breach disclosure triggered (PII exposed to non-affiliated parties): run the <span data-hc-md-link>[72-hour ICO procedure](/kb/compliance/breach-72h)</span> in parallel.\n' +
      '20. Schedule the post-mortem within 7 days. Use <span data-hc-md-link>[incident response template](/kb/sops/incident-postmortem)</span>.</span>\n\n' +
      '<span data-hc-md-heading-2>## Edge cases</span>\n\n' +
      '<span data-hc-md-list>- <span data-hc-md-bold>Cross-jurisdiction ring</span> (accounts in &gt; 2 countries): pause at step 8, loop in counsel for GDPR Art.6(1)(f) legitimate interest assessment.\n' +
      '- <span data-hc-md-bold>Refund implications</span>: if any account in the ring received payouts in the prior 30 days, freeze and route to refund-decision-matrix SOP ::ref[REF-2026-0084].\n' +
      '- <span data-hc-md-bold>Client-side exposure</span>: if a client was billed for ring-affiliated work, the client gets a credit issued via Step 21 within 48h of enforcement.</span>\n\n' +
      '<span data-hc-md-heading-2>## Roles &amp; escalation</span>\n\n' +
      '<span data-hc-md-list>- <span data-hc-md-bold>DPO (Aïsha)</span> — phase 2 sign-off · phase 4 audit verification\n' +
      '- <span data-hc-md-bold>Manager (Mateo)</span> — escalation pickup if DPO unavailable\n' +
      '- <span data-hc-md-bold>Super Admin (Dario)</span> — only if &gt; 5 accounts or external counsel needed</span>\n\n' +
      '<span data-hc-md-em>— End of SOP · revision log: v1 Aug 2024 · v2 Nov 2024 · v3 Jan 2025 · v4 Mar 2025 · v5 Aug 2025 · v6 Apr 2026 (post FA-2026-0042)</span>',
  },
  previewCard: {
    headTitle: 'Phase preview · live checklist',
    headMeta:
      'renders as an interactive checklist when invoked from an active case',
    sectionEyebrow: 'PHASE 1 · DETECTION & SCOPING',
    steps: [
      {
        text: 'Open fraud detection workspace · trigger alert reviewed',
        isComplete: true,
      },
      {
        text: 'Verify ring boundary · device · IP · payment · referral edges',
        isComplete: true,
      },
      { text: 'Score accounts · primary · satellite · edge', isComplete: true },
      {
        text: 'Snapshot all evidence to <code>/evidence/{case_id}/snapshot_t0.json</code>',
        isComplete: false,
      },
      {
        text: 'Convene response team in <code>#sec-incident</code>',
        isComplete: false,
      },
    ],
    footerText: 'Phase 1 · 3 of 5 complete · 22min elapsed · target 60min',
  },
  categorization: {
    linkedCasesLabel: 'LINKED CASES · REFERENCED IN BODY',
    linkedCases: [
      {
        id: 'FA-2026-0042',
        title: 'Vorona ring · 5 accounts · primary + 4 satellites',
        meta: 'Step 15 fraud · resolved · drove v6 rewrite',
      },
      {
        id: 'SB-2026-0084',
        title: 'Vorona ban · 4 satellites · synchronized batch',
        meta: 'Step 17 suspensions · ≤ 30s window',
      },
      {
        id: 'SB-2026-0085',
        title: 'Primary actor ban · cand-1142 (Marek)',
        meta: 'Step 17 suspensions',
      },
      {
        id: 'AUD-2026-106102',
        title: 'Synchronized-ban audit hash chain',
        meta: 'Step 25 audit · integrity verified',
      },
      {
        id: 'REF-2026-0084',
        title: 'Tomás refund · edge case · client credit',
        meta: 'Step 21 refunds · client billed',
      },
    ],
    runbookLinksLabel: 'LINKED RUNBOOKS',
    runbookLinks: [
      {
        id: 'kb-single-fraud',
        title: 'Single-account fraud · escalation flow',
        meta: '214 views · 150d since verify',
      },
      {
        id: 'kb-breach-72h',
        title: 'Breach disclosure · 72-hour ICO procedure',
        meta: '87 views · verified 21d',
      },
      {
        id: 'kb-refund-decision',
        title: 'Refund decision matrix · v4 draft',
        meta: 'draft · awaiting SME',
      },
    ],
    crossStepLinksLabel: 'CROSS-STEP LINKS',
    crossStepLinksHtml:
      'Fraud workspace <a>Step 15</a><br>Suspensions <a>Step 17</a><br>Refunds <a>Step 21</a><br>Audit chain <a>Step 25</a><br>Template notifications <a>Step 31</a>',
    revisionLabel: 'REVISION HISTORY',
    revisionHtml:
      '<strong data-kb-rev-current>v6</strong> · Apr 18 · Aïsha · post-FA-0042 rewrite<br>' +
      '<strong>v5</strong> · Aug 2025 · Aïsha · audit chain refs<br>' +
      '<strong>v4</strong> · Mar 2025 · Mateo · phase 3 refinement<br>' +
      '<strong>v3</strong> · Jan 2025 · Aïsha · evidence packaging<br>' +
      '<strong>v2</strong> · Nov 2024 · Aïsha · edge cases<br>' +
      '<strong>v1</strong> · Aug 2024 · Aïsha · initial',
    revisionActionLabel: 'Full history & diff',
  },
};

/* ============================================================
   Universal detail builder
   For non-canonical docs (12 of 13), derive a full KbDetailData from
   the doc row + its parent section. Markdown body + preview + categorization
   are reused from kbCanonicalDetail (same pattern as Step 33's
   buildHcDetailFromArticle). Hero, breadcrumb, verify-banner, stats, and
   frontmatter are derived from the doc's own metadata.
   ============================================================ */

function extractSlugTail(slug: string): string {
  const firstSeg = slug.split(' · ')[0] ?? slug;
  const parts = firstSeg.split('/').filter(Boolean);
  return parts[parts.length - 1] ?? firstSeg;
}

function extractVersion(slug: string): string {
  const match = slug.match(/v\d+/i);
  return match ? match[0] : 'v1';
}

function extractCategoryCountFromEyebrow(eyebrow: string): string {
  const match = eyebrow.match(/(\d+)\s*DOCS/i);
  return match && match[1] ? `${match[1]} docs` : '';
}

function parseDaysAgo(meta: string): { value: string; suffix: string } {
  const match = meta.match(/(\d+)\s*d\s*ago/i);
  if (match && match[1]) return { value: match[1], suffix: 'd ago' };
  return { value: '—', suffix: '' };
}

function bannerVariantFromDot(
  dot: KbVerifiedDotVariant
): KbVerifyBannerVariant {
  if (dot === 'aging') return 'aging';
  if (dot === 'stale') return 'stale';
  return 'fresh';
}

function statVariantFromDot(
  dot: KbVerifiedDotVariant
): KbDetailStatVariant {
  if (dot === 'aging') return 'warn';
  if (dot === 'stale') return 'warn';
  return 'success';
}

function bannerCopyFromVariant(
  variant: KbVerifyBannerVariant,
  doc: KbDocRow
): { eyebrow: string; h3Title: string; metaHtml: string } {
  if (variant === 'aging') {
    return {
      eyebrow: 'VERIFICATION · AGING',
      h3Title: `Last verified ${doc.verifiedDate} · re-verification due soon`,
      metaHtml: `Document is past the 120d aging threshold. <strong>${doc.verifiedMeta}</strong>. Schedule a re-verification with the SME before it ages into critical-stale at 180d.`,
    };
  }
  if (variant === 'stale') {
    return {
      eyebrow: 'VERIFICATION · CRITICAL-STALE',
      h3Title: `Stale since ${doc.verifiedDate} · re-verification OVERDUE`,
      metaHtml: `Document has not been re-verified in over 180 days. <strong>${doc.verifiedMeta}</strong>. Schedule a tabletop drill + SME review before this SOP is invoked in an active incident.`,
    };
  }
  return {
    eyebrow: 'VERIFICATION · FRESH',
    h3Title: `Verified ${doc.verifiedDate} by SME · next re-verification due in 90d`,
    metaHtml: `Document is within the fresh verification window. <strong>${doc.verifiedMeta}</strong>. Continue monitoring view trends and cross-reference activity in linked cases.`,
  };
}

export function buildKbDetailFromDoc(
  doc: KbDocRow,
  section: KbCategorySectionData
): KbDetailData {
  const slugTail = extractSlugTail(doc.slug);
  const version = extractVersion(doc.slug);
  const daysAgo = parseDaysAgo(doc.verifiedMeta);
  const verifyVariant = bannerVariantFromDot(doc.verifiedDot);
  const verifyCopy = bannerCopyFromVariant(verifyVariant, doc);
  const categoryCount = extractCategoryCountFromEyebrow(section.eyebrow);
  const tagSummary = doc.tags.map((t) => t.label).join(', ');

  return {
    breadcrumb: [
      { label: 'Knowledge base', href: '/admin/internal/knowledge-base' },
      { label: section.title },
      { label: `${doc.title} · ${version}`, isCurrent: true },
    ],
    hero: {
      id: `kb.${slugTail.replace(/-/g, '_')}`,
      statusVariant: doc.statusVariant,
      statusLabel: `${doc.statusLabel} · ${version}`,
      metaText: `Internal only · SME: ${doc.modifiedAuthor.split(' · ')[0]} · ${doc.views} internal views / 30d`,
      title: doc.title,
      subtitleHtml: `Internal documentation for <strong>${doc.title}</strong>. ${doc.verifiedMeta}. Tagged: <strong>${tagSummary || 'untagged'}</strong>. Last modified by <strong>${doc.modifiedAuthor}</strong>. This page reuses the canonical SOP body structure as a working preview — switch to the canonical <a>Vorona-ring runbook</a> for the fully authored reference body.`,
      actions: [
        { label: 'Copy link', iconKey: 'link' },
        { label: 'Version history', iconKey: 'history' },
        { label: 'Save & publish', iconKey: 'save', isPrimary: true },
      ],
    },
    verifyBanner: {
      variant: verifyVariant,
      eyebrow: verifyCopy.eyebrow,
      h3Title: verifyCopy.h3Title,
      metaHtml: verifyCopy.metaHtml,
      actionLabel: 'Re-verify now',
    },
    detailStats: [
      {
        label: 'Views · 30d',
        value: doc.views,
        meta: doc.viewsMeta,
      },
      {
        label: 'Last verified',
        value: daysAgo.value,
        valueSuffix: daysAgo.suffix,
        valueVariant: statVariantFromDot(doc.verifiedDot),
        meta: doc.verifiedMeta,
      },
      {
        label: 'Sections',
        value: '—',
        meta: 'see body for details',
      },
      {
        label: 'Status',
        value: doc.statusLabel,
        meta: 'current lifecycle stage',
      },
    ],
    frontmatter: {
      sectionHead: {
        num: '01',
        title: 'Document frontmatter',
        meta: 'title · slug · category · tags · SME owner · re-verification cadence',
      },
      rows: [
        { key: 'TITLE', valueKind: 'input', valueHtml: doc.title },
        { key: 'SLUG', valueKind: 'input', valueHtml: slugTail },
        {
          key: 'CATEGORY',
          valueKind: 'text',
          valueHtml: categoryCount
            ? `${section.title} · <span data-hc-muted-soft>(${categoryCount})</span>`
            : section.title,
        },
        {
          key: 'TAGS',
          valueKind: 'tags',
          valueHtml:
            doc.tags
              .map((t) => `<span data-hc-tag-chip>${t.label}</span>`)
              .join('') +
            '<span data-hc-tag-chip data-hc-tag-add>+ add tag</span>',
        },
        {
          key: 'SME OWNER',
          valueKind: 'text',
          valueHtml: `${doc.modifiedAuthor.split(' · ')[0]} (SME) · backup: rotation`,
        },
        {
          key: 'RE-VERIFY EVERY',
          valueKind: 'text',
          valueHtml:
            '90 days · auto-flag at 120d aging · auto-flag at 180d critical-stale',
        },
        {
          key: 'PUBLISHED',
          valueKind: 'text',
          valueHtml: `${version} · live since ${doc.modifiedDate} · last modified by ${doc.modifiedAuthor}`,
        },
      ],
    },
    markdownBody: kbCanonicalDetail.markdownBody,
    previewCard: kbCanonicalDetail.previewCard,
    categorization: kbCanonicalDetail.categorization,
  };
}
