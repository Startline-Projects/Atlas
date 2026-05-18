/* admin.html lines 63125-63658 — Help Center content LIST view fixtures (verbatim) */

import type { PrStat } from './privacy-reports-data';

// ============================================================
// TYPES
// ============================================================

export type HcArticleStatus = 'published' | 'draft' | 'review-needed' | 'archived';
export type HcTagVariant = 'default' | 'featured' | 'video' | 'payment' | 'policy' | 'compliance';
export type HcHelpfulVariant = 'high' | 'medium' | 'low';
export type HcRowVariant = 'review-needed' | 'draft' | 'archived';
export type HcIconKey =
  | 'square'
  | 'bolt'
  | 'user'
  | 'building'
  | 'star'
  | 'dollar'
  | 'alert-circle'
  | 'lock'
  | 'shield';

export interface HcCategoryItem {
  id: string;
  label: string;
  count: string;
  iconKey: HcIconKey;
  active?: boolean;
}

export interface HcArticleTag {
  label: string;
  variant: HcTagVariant;
}

export interface HcArticleRow {
  id: string;
  title: string;
  tags: HcArticleTag[];
  slug: string;
  views: { value: string; meta: string };
  helpful: { percent: number; label: string; variant: HcHelpfulVariant; meta: string };
  modified: { date: string; author: string };
  status: HcArticleStatus;
  statusLabel: string;
  rowVariant?: HcRowVariant;
}

export interface HcSectionHeadAction {
  label: string;
}

export interface HcCategorySection {
  id: string;
  eyebrow: string;
  title: string;
  headActions: HcSectionHeadAction[];
  articles: HcArticleRow[];
}

export interface HcHeaderAction {
  label: string;
  icon: 'audit' | 'external' | 'plus';
  isPrimary?: boolean;
}

export interface HcPageMeta {
  title: string;
  metaText: string;
}

// ============================================================
// PAGE-LEVEL FIXTURES (admin.html 63129-63155)
// ============================================================

export const hcPageMeta: HcPageMeta = {
  title: 'Help Center content',
  metaText:
    '/admin/platform/help-content · 142 articles · 8 categories · 12 locales · all changes audit-logged',
};

export const hcMetaPulseHtml =
  '3 articles flagged for review · helpfulness dropping below 70%';

export const hcSearchPlaceholder = 'Search articles…';

export const hcHeaderActions: HcHeaderAction[] = [
  { label: 'Audit', icon: 'audit' },
  { label: 'View public site', icon: 'external' },
  { label: 'New article', icon: 'plus', isPrimary: true },
];

// ============================================================
// STATS STRIP (admin.html 63158-63184)
// ============================================================

export const hcTopStats: PrStat[] = [
  {
    label: 'Total articles',
    value: '142',
    meta: '<strong>8 categories</strong> · 12 locales',
  },
  {
    label: 'Views · 30d',
    value: '82,140',
    meta: '5,840 unique visitors',
  },
  {
    label: 'Avg helpfulness',
    value: '84',
    suffix: '%',
    variant: 'success',
    meta: '"helpful" rate · 4,180 ratings',
  },
  {
    label: 'Needs review',
    value: '3',
    variant: 'warn',
    meta: 'helpfulness dropping',
  },
  {
    label: 'Drafts',
    value: '5',
    meta: '2 awaiting localization',
  },
];

// ============================================================
// 9 CATEGORIES SIDEBAR (admin.html 63192-63256)
// ============================================================

export const hcCategories: HcCategoryItem[] = [
  { id: 'all', label: 'All articles', count: '142', iconKey: 'square', active: true },
  { id: 'getting-started', label: 'Getting started', count: '18', iconKey: 'bolt' },
  { id: 'candidates', label: 'For candidates', count: '38', iconKey: 'user' },
  { id: 'clients', label: 'For clients', count: '31', iconKey: 'building' },
  { id: 'specialists', label: 'For specialists', count: '14', iconKey: 'star' },
  { id: 'payments', label: 'Payments & payouts', count: '21', iconKey: 'dollar' },
  { id: 'disputes', label: 'Disputes', count: '9', iconKey: 'alert-circle' },
  { id: 'privacy', label: 'Privacy & data', count: '8', iconKey: 'lock' },
  { id: 'account', label: 'Account & security', count: '3', iconKey: 'shield' },
];

// ============================================================
// 13 ARTICLE ROWS across 4 SECTIONS (admin.html 63262-63648) — verbatim
// ============================================================

export const hcCategorySections: HcCategorySection[] = [
  {
    id: 'candidates',
    eyebrow: 'CATEGORY · FOR CANDIDATES · 38 ARTICLES',
    title: 'For candidates',
    headActions: [{ label: 'Reorder' }, { label: 'Add article' }],
    articles: [
      {
        id: 'hc-vetting-call',
        title: 'How to schedule your vetting call',
        tags: [
          { label: 'Featured', variant: 'featured' },
          { label: 'Includes video', variant: 'video' },
        ],
        slug: '/help/candidates/schedule-vetting-call · 6 locales · v4',
        views: { value: '8,247', meta: '↑ +12% · linked from email' },
        helpful: { percent: 94, label: '94%', variant: 'high', meta: '1,840 ratings' },
        modified: { date: 'Apr 28', author: 'Aïsha' },
        status: 'published',
        statusLabel: 'Live',
      },
      {
        id: 'hc-complete-profile',
        title: 'Completing your candidate profile',
        tags: [{ label: 'Setup', variant: 'default' }],
        slug: '/help/candidates/complete-profile · 12 locales · v3',
        views: { value: '6,140', meta: 'stable 90d' },
        helpful: { percent: 89, label: '89%', variant: 'high', meta: '847 ratings' },
        modified: { date: 'Mar 14', author: 'Dario · launch' },
        status: 'published',
        statusLabel: 'Live',
      },
      {
        id: 'hc-retake-vetting',
        title: "What happens if I don't pass vetting?",
        tags: [{ label: 'FAQ', variant: 'default' }],
        slug: '/help/candidates/retake-vetting · 6 locales · v2',
        views: { value: '2,184', meta: '↑ +8% · cooldown questions' },
        helpful: { percent: 81, label: '81%', variant: 'high', meta: '412 ratings' },
        modified: { date: 'Apr 8', author: 'Aïsha' },
        status: 'published',
        statusLabel: 'Live',
      },
      {
        id: 'hc-daily-activity',
        title: 'Submitting your daily activity',
        tags: [{ label: 'Engagement', variant: 'default' }],
        slug: '/help/candidates/daily-activity · 6 locales · v2',
        views: { value: '1,847', meta: '↓ -22% · drop unusual' },
        helpful: { percent: 68, label: '68%', variant: 'medium', meta: '142 ratings · ↓ 12pt' },
        modified: { date: 'Feb 22', author: 'stale · 79d' },
        status: 'review-needed',
        statusLabel: 'Review',
        rowVariant: 'review-needed',
      },
    ],
  },
  {
    id: 'payments',
    eyebrow: 'CATEGORY · PAYMENTS & PAYOUTS · 21 ARTICLES',
    title: 'Payments & payouts',
    headActions: [{ label: 'Reorder' }, { label: 'Add article' }],
    articles: [
      {
        id: 'hc-payout-schedule',
        title: 'When and how you get paid',
        tags: [
          { label: 'Payment', variant: 'payment' },
          { label: 'Featured', variant: 'featured' },
        ],
        slug: '/help/payments/payout-schedule · 12 locales · v3',
        views: { value: '5,420', meta: '↑ +6%' },
        helpful: { percent: 91, label: '91%', variant: 'high', meta: '684 ratings' },
        modified: { date: 'Apr 18', author: 'Dario' },
        status: 'published',
        statusLabel: 'Live',
      },
      {
        id: 'hc-platform-fees',
        title: 'Understanding platform fees',
        tags: [{ label: 'Payment', variant: 'payment' }],
        slug: '/help/payments/platform-fees · 12 locales · v3 · linked Step 20',
        views: { value: '3,842', meta: 'stable' },
        helpful: { percent: 78, label: '78%', variant: 'high', meta: '587 ratings' },
        modified: { date: 'Nov 12', author: 'Dario · v3 fees' },
        status: 'published',
        statusLabel: 'Live',
      },
      {
        id: 'hc-tax-1042s',
        title: 'Foreign contractor tax forms · 1042-S explained',
        tags: [
          { label: 'Payment', variant: 'payment' },
          { label: 'Tax', variant: 'compliance' },
        ],
        slug: '/help/payments/1042-s · 6 locales · v1 · linked Step 22',
        views: { value: '1,247', meta: '↑ +47% · tax season' },
        helpful: { percent: 87, label: '87%', variant: 'high', meta: '324 ratings' },
        modified: { date: 'Mar 1', author: 'Dario · tax prep' },
        status: 'published',
        statusLabel: 'Live',
      },
      {
        id: 'hc-refund-policy',
        title: 'Refund policy & processing times',
        tags: [
          { label: 'Payment', variant: 'payment' },
          { label: 'Draft', variant: 'default' },
        ],
        slug: '/help/payments/refund-policy · 1 locale · v1 · linked Step 21',
        views: { value: '0', meta: 'not yet published' },
        helpful: { percent: 0, label: '—', variant: 'medium', meta: 'no ratings' },
        modified: { date: 'May 4', author: 'Aïsha · drafting' },
        status: 'draft',
        statusLabel: 'Draft',
        rowVariant: 'draft',
      },
    ],
  },
  {
    id: 'disputes',
    eyebrow: 'CATEGORY · DISPUTES · 9 ARTICLES',
    title: 'Disputes',
    headActions: [{ label: 'Reorder' }, { label: 'Add article' }],
    articles: [
      {
        id: 'hc-raise-dispute',
        title: 'How to raise a dispute',
        tags: [{ label: 'Featured', variant: 'featured' }],
        slug: '/help/disputes/raise-dispute · 12 locales · v3 · linked Step 12',
        views: { value: '984', meta: 'stable' },
        helpful: { percent: 88, label: '88%', variant: 'high', meta: '147 ratings' },
        modified: { date: 'Apr 4', author: 'Aïsha' },
        status: 'published',
        statusLabel: 'Live',
      },
      {
        id: 'hc-evidence',
        title: 'What evidence helps your dispute',
        tags: [],
        slug: '/help/disputes/evidence · 6 locales · v2',
        views: { value: '412', meta: '↓ -18%' },
        helpful: { percent: 64, label: '64%', variant: 'medium', meta: '68 ratings · ↓ helpful' },
        modified: { date: 'Jan 14', author: 'stale · 117d' },
        status: 'review-needed',
        statusLabel: 'Review',
        rowVariant: 'review-needed',
      },
    ],
  },
  {
    id: 'privacy',
    eyebrow: 'CATEGORY · PRIVACY & DATA · 8 ARTICLES',
    title: 'Privacy & data',
    headActions: [{ label: 'Reorder' }, { label: 'Add article' }],
    articles: [
      {
        id: 'hc-data-rights',
        title: 'Your data rights · access, delete, export',
        tags: [
          { label: 'GDPR', variant: 'compliance' },
          { label: 'CCPA', variant: 'compliance' },
          { label: 'Featured', variant: 'featured' },
        ],
        slug: '/help/privacy/data-rights · 12 locales · v3 · linked Step 24',
        views: { value: '2,840', meta: '↑ +18% · post-v3.2 policy' },
        helpful: { percent: 92, label: '92%', variant: 'high', meta: '412 ratings' },
        modified: { date: 'Apr 1', author: 'Aïsha · v3.2 policy' },
        status: 'published',
        statusLabel: 'Live',
      },
      {
        id: 'hc-account-deletion',
        title: 'Deleting your account · what happens',
        tags: [{ label: 'Policy', variant: 'policy' }],
        slug: '/help/privacy/account-deletion · 12 locales · v2',
        views: { value: '687', meta: 'stable' },
        helpful: { percent: 84, label: '84%', variant: 'high', meta: '98 ratings' },
        modified: { date: 'Apr 1', author: 'Aïsha · v3.2 policy' },
        status: 'published',
        statusLabel: 'Live',
      },
      {
        id: 'hc-cookies',
        title: 'How we use cookies',
        tags: [{ label: 'Policy', variant: 'policy' }],
        slug: '/help/privacy/cookies · 12 locales · v2',
        views: { value: '342', meta: '↓ -8%' },
        helpful: { percent: 67, label: '67%', variant: 'medium', meta: '54 ratings' },
        modified: { date: 'Oct 8', author: 'stale · 215d' },
        status: 'review-needed',
        statusLabel: 'Review',
        rowVariant: 'review-needed',
      },
    ],
  },
];

// Bottom-of-list meta (admin.html line 63650)
export const hcListFooterText =
  'Showing 13 of 142 articles · 4 categories visible · expand sidebar to filter by other categories';

// ============================================================
// DETAIL VIEW TYPES + FIXTURE (admin.html 63663-63755 for Pass B)
// ============================================================

import type { TmLocaleTab } from './templates-data';

export interface HcBreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

export interface HcDetailHeroAction {
  label: string;
  icon?: 'external' | 'save';
  isPrimary?: boolean;
}

export interface HcDetailHero {
  key: string;
  status: HcArticleStatus;
  statusLabel: string;
  envMetaText: string;
  title: string;
  subtitleHtml: string;
  localeTabs: TmLocaleTab[];
  actions: HcDetailHeroAction[];
}

export interface HcDetailStat {
  label: string;
  value: string;
  valueVariant?: 'success' | 'warn' | 'danger';
  valueSuffix?: string;
  meta: string;
}

export interface HcSectionHeadData {
  num: string;
  title: string;
  meta: string;
  actionLabel?: string; // optional right-aligned action button (e.g. "Markdown help")
}

export type HcFrontmatterValueKind = 'text' | 'input' | 'tags';

export interface HcFrontmatterRow {
  key: string;
  valueKind: HcFrontmatterValueKind;
  /** For 'input': raw value text. For 'text' or 'tags': HTML with optional inline data-hc-tag-chip spans. */
  valueHtml: string;
}

export interface HcFrontmatterData {
  sectionHead: HcSectionHeadData;
  rows: HcFrontmatterRow[];
}

export interface HcMarkdownData {
  sectionHead: HcSectionHeadData;
  headTitle: string;
  headMeta: string;
  /** HTML with inline data-hc-md-* attribute markers for syntax highlighting (heading-1/heading-2/bold/em/link/code/list) */
  bodyHtml: string;
}

export interface HcPublicPreviewData {
  headTitle: string;
  headMeta: string;
  /** Inner public-frame fields */
  siteLogo: string;
  searchPlaceholder: string;
  /** Breadcrumb rendered inside the mock public site (HTML w/ inline <a>) */
  publicCrumbHtml: string;
  publicTitle: string;
  publicMeta: string;
  /** Article body HTML rendered as the user would see it (real <p>, <h2>, <ul>, <ol>, <em>, <strong>, <code>, <a>) */
  publicBodyHtml: string;
  helpfulQuestion: string;
  helpfulYes: string;
  helpfulNo: string;
}

export interface HcCategorizationBlock {
  label: string;
  /** Block body — may be a list of related links (kind 'related') or HTML content (kind 'html') */
  kind: 'related' | 'html';
  /** For 'related' kind */
  relatedLinks?: { id: string; title: string; meta: string }[];
  /** For 'html' kind */
  bodyHtml?: string;
  /** Optional bottom action button label */
  actionLabel?: string;
}

export interface HcCategorizationData {
  blocks: HcCategorizationBlock[];
}

export interface HcDetailData {
  id: string;
  breadcrumb: HcBreadcrumbItem[];
  hero: HcDetailHero;
  detailStats: HcDetailStat[];
  frontmatter: HcFrontmatterData;
  markdown: HcMarkdownData;
  preview: HcPublicPreviewData;
  categorization: HcCategorizationData;
}

export const hcVettingCallDetail: HcDetailData = {
  id: 'hc-vetting-call',
  breadcrumb: [
    { label: 'Help Center', href: '/admin/platform/help-content' },
    { label: 'For candidates' },
    { label: 'How to schedule your vetting call · v4', isCurrent: true },
  ],
  hero: {
    key: 'help.candidates.schedule_vetting_call',
    status: 'published',
    statusLabel: 'Live · v4',
    envMetaText: '6 locales · 8,247 views/30d · 94% helpful · featured article',
    title: 'How to schedule your vetting call',
    subtitleHtml:
      'The most-viewed candidate article on Atlas. Linked from the <a>vetting-invite email</a> (Step 31) via the <code>{{ help.url }}</code> variable, this article walks candidates through scheduling, what to expect, and how to prepare. Includes a 90-second embedded video. Last edited by <strong>Aïsha</strong> 13 days ago to add GDPR Art. 14 transparency language and a link to the v3.2 privacy policy.',
    localeTabs: [
      {
        code: 'en',
        label: 'EN',
        flagGradient: 'linear-gradient(to bottom, #b22234 33%, #ffffff 33% 66%, #002868 66%)',
        active: true,
      },
      {
        code: 'es',
        label: 'ES',
        flagGradient: 'linear-gradient(to bottom, #AA151B 50%, #F1BF00 50%)',
      },
      {
        code: 'pt',
        label: 'PT',
        flagGradient: 'linear-gradient(to right, #009C3B 60%, #FFDF00 60%)',
      },
      {
        code: 'fr',
        label: 'FR',
        flagGradient: 'linear-gradient(to right, #0055A4 33%, #ffffff 33% 66%, #EF4135 66%)',
      },
      {
        code: 'de',
        label: 'DE',
        flagGradient: 'linear-gradient(to bottom, #000 33%, #DD0000 33% 66%, #FFCE00 66%)',
      },
      {
        code: 'id',
        label: 'ID',
        flagGradient: 'linear-gradient(to bottom, #FF0000 50%, #ffffff 50%)',
      },
    ],
    actions: [
      { label: 'View public', icon: 'external' },
      { label: 'Save & publish v5', icon: 'save', isPrimary: true },
    ],
  },
  detailStats: [
    {
      label: 'Views · 30d',
      value: '8,247',
      meta: '<span class="trend-up">↑ +12%</span> vs prior 30d · linked from email',
    },
    {
      label: 'Avg time on page',
      value: '2:38',
      meta: 'video plays · 67% complete-rate',
    },
    {
      label: 'Helpfulness',
      value: '94',
      valueSuffix: '%',
      valueVariant: 'success',
      meta: '1,732 helpful · 108 not · 1,840 total',
    },
    {
      label: 'Search rank',
      value: '#1',
      meta: 'for "vetting call" · "schedule call"',
    },
  ],
  frontmatter: {
    sectionHead: {
      num: '01',
      title: 'Article frontmatter',
      meta: 'title · slug · category · tags · locale · search keywords',
    },
    rows: [
      {
        key: 'TITLE',
        valueKind: 'input',
        valueHtml: 'How to schedule your vetting call',
      },
      {
        key: 'SLUG',
        valueKind: 'input',
        valueHtml: 'schedule-vetting-call',
      },
      {
        key: 'CATEGORY',
        valueKind: 'text',
        valueHtml: 'For candidates · <span data-hc-muted-soft>(38 articles)</span>',
      },
      {
        key: 'TAGS',
        valueKind: 'tags',
        valueHtml:
          '<span data-hc-tag-chip>Featured</span><span data-hc-tag-chip>Includes video</span><span data-hc-tag-chip>Setup</span><span data-hc-tag-chip>Vetting</span><span data-hc-tag-chip data-hc-tag-add>+ add tag</span>',
      },
      {
        key: 'LOCALE',
        valueKind: 'text',
        valueHtml: 'EN · canonical · 5 translations active',
      },
      {
        key: 'SEARCH KEYWORDS',
        valueKind: 'input',
        valueHtml:
          'vetting, call, schedule, interview, scheduling, vetting call, prepare, application',
      },
      {
        key: 'PUBLISHED',
        valueKind: 'text',
        valueHtml: 'v4 · live since Apr 28, 2026 · approved by Dario · audit AUD-2026-106912',
      },
    ],
  },
  markdown: {
    sectionHead: {
      num: '02',
      title: 'Article body · Markdown',
      meta: 'GitHub-flavored markdown · inline media · linked CTAs · video embeds via <code>::video[id]</code>',
      actionLabel: 'Markdown help',
    },
    headTitle: 'EN · canonical',
    headMeta: 'unsaved · last commit Apr 28',
    bodyHtml:
      '<span data-hc-md-heading-1># How to schedule your vetting call</span>\n\nSo you\'ve finished your application — congratulations! The next step is your <span data-hc-md-bold>vetting call</span> with an Atlas specialist. This article walks you through how to schedule it, what to expect, and how to prepare.\n\n<span data-hc-md-code>::video[atlas-vetting-intro-90s]</span>\n\n<span data-hc-md-heading-2>## When you\'ll be invited</span>\n\nYou\'ll receive an email titled <span data-hc-md-em>"Schedule your vetting call with Atlas"</span> within 24 hours of completing your application. The email contains a personal scheduling link that\'s pre-authenticated — no password needed.\n\n<span data-hc-md-em>Tip:</span> Check your spam folder if you don\'t see the email. Sender is <span data-hc-md-code>vetting@atlas.staffva</span>.\n\n<span data-hc-md-heading-2>## How to pick a time</span>\n\n<span data-hc-md-list>1. Click the <span data-hc-md-bold>"Schedule your vetting call"</span> button in your invitation email\n2. Choose a 30-minute slot that works for you (we show times in your local timezone)\n3. Confirm the booking — you\'ll receive a calendar invite immediately\n4. You can reschedule up to <span data-hc-md-bold>24 hours</span> before your call</span>\n\n<span data-hc-md-heading-2>## What to expect on the call</span>\n\nThe vetting call is a structured 30-minute conversation with one of our specialists. Topics vary slightly by role, but typically cover:\n\n<span data-hc-md-list>- An experience walk-through (your background and recent work)\n- A live exercise (coding for engineers, design critique for designers, etc.)\n- English proficiency check (we work in English by default)\n- Q&amp;A about how Atlas works</span>\n\n<span data-hc-md-heading-2>## How to prepare</span>\n\n<span data-hc-md-list>- Test your <span data-hc-md-link>[camera and microphone](/help/candidates/tech-check)</span> ahead of time\n- Find a quiet space with stable internet\n- Have your portfolio or recent work samples ready\n- For engineering roles, expect a short live-coding exercise — no take-home prep needed</span>\n\n<span data-hc-md-heading-2>## After the call</span>\n\nYour specialist will share a decision within <span data-hc-md-bold>48 hours</span>. If you pass, you\'ll join the Atlas talent pool and start receiving matching opportunities. If you don\'t, you\'ll have detailed feedback and a 90-day cooldown before you can <span data-hc-md-link>[retake the vetting call](/help/candidates/retake-vetting)</span>.\n\n<span data-hc-md-heading-2>## Your data &amp; privacy</span>\n\nThe vetting call is recorded and reviewed by our team for quality and training purposes. Under EU GDPR Article 14 and CCPA, you have the right to know how we process this data. See our <span data-hc-md-link>[privacy policy](/legal/privacy)</span> (v3.2 · April 1, 2026) or contact our DPO at <span data-hc-md-code>dpo@atlas.staffva</span> if you have questions.\n\n<span data-hc-md-em>Last updated April 28, 2026 by the Atlas vetting team.</span>',
  },
  preview: {
    headTitle: 'Public preview',
    headMeta: 'EN · /help/candidates/schedule-vetting-call',
    siteLogo: 'Atlas Help',
    searchPlaceholder: 'Search help',
    publicCrumbHtml: '<a>Help</a> › <a>For candidates</a> › Schedule vetting call',
    publicTitle: 'How to schedule your vetting call',
    publicMeta:
      'Updated Apr 28, 2026 · 2 min read · also available in español, português, français, deutsch, bahasa indonesia',
    publicBodyHtml:
      '<p>So you\'ve finished your application — congratulations! The next step is your <strong>vetting call</strong> with an Atlas specialist. This article walks you through how to schedule it, what to expect, and how to prepare.</p><p data-hc-video>▶ 90-second intro video</p><h2>When you\'ll be invited</h2><p>You\'ll receive an email titled <em>"Schedule your vetting call with Atlas"</em> within 24 hours of completing your application. The email contains a personal scheduling link that\'s pre-authenticated — no password needed.</p><p><em>Tip:</em> Check your spam folder if you don\'t see the email. Sender is <code>vetting@atlas.staffva</code>.</p><h2>How to pick a time</h2><ol><li>Click the <strong>"Schedule your vetting call"</strong> button in your invitation email</li><li>Choose a 30-minute slot that works for you (we show times in your local timezone)</li><li>Confirm the booking — you\'ll receive a calendar invite immediately</li><li>You can reschedule up to <strong>24 hours</strong> before your call</li></ol><h2>What to expect on the call</h2><p>The vetting call is a structured 30-minute conversation with one of our specialists. Topics vary slightly by role, but typically cover an experience walk-through, a live exercise, English proficiency check, and Q&amp;A about how Atlas works.</p><h2>How to prepare</h2><ul><li>Test your <a>camera and microphone</a> ahead of time</li><li>Find a quiet space with stable internet</li><li>Have your portfolio or recent work samples ready</li></ul><h2>Your data &amp; privacy</h2><p>The vetting call is recorded and reviewed by our team for quality and training purposes. Under EU GDPR Article 14 and CCPA, you have the right to know how we process this data. See our <a>privacy policy</a> (v3.2 · April 1, 2026) or contact our DPO at <code>dpo@atlas.staffva</code> if you have questions.</p>',
    helpfulQuestion: 'Was this article helpful?',
    helpfulYes: '👍 Yes',
    helpfulNo: '👎 No',
  },
  categorization: {
    blocks: [
      {
        label: 'RELATED ARTICLES',
        kind: 'related',
        relatedLinks: [
          {
            id: 'hc-retake-vetting',
            title: "What happens if I don't pass vetting?",
            meta: '2,184 views · 81% helpful',
          },
          {
            id: 'hc-complete-profile',
            title: 'Completing your candidate profile',
            meta: '6,140 views · 89% helpful',
          },
          {
            id: 'hc-tech-check',
            title: 'Tech check · camera and microphone',
            meta: '1,420 views · 87% helpful',
          },
          {
            id: 'hc-payout-schedule',
            title: 'When and how you get paid (after passing)',
            meta: '5,420 views · 91% helpful',
          },
        ],
      },
      {
        label: 'LINKED FROM',
        kind: 'html',
        bodyHtml:
          '<a data-hc-link-super>Vetting-invite email template</a><div data-hc-sub-mono>{{ help.url }} variable · Step 31 · 14,820 sends/30d</div>',
      },
      {
        label: 'COMPLIANCE LINKS',
        kind: 'html',
        bodyHtml:
          '<div data-hc-cat-prose>Privacy policy <a data-hc-link-super>v3.2 · Step 26</a><br><br>Data subject rights <a data-hc-link-super>Step 24</a> for Art. 14 + CCPA notices</div>',
      },
      {
        label: 'REVISION HISTORY',
        kind: 'html',
        bodyHtml:
          '<div data-hc-revision><strong data-hc-rev-current>v4</strong> · Apr 28 · Aïsha · GDPR Art.14 block<br><strong>v3</strong> · Mar 4 · Aïsha · video embed<br><strong>v2</strong> · Dec 12, 2025 · Dario · rewrite<br><strong>v1</strong> · Aug 14, 2024 · launch</div>',
        actionLabel: 'Full history & diff',
      },
    ],
  },
};

// ============================================================
// HELPERS — build full HcDetailData for ANY article using its own
// metadata + reuse canonical template body / categorization blocks.
// admin.html only provides one canonical fixture (hc-vetting-call);
// all other articles render the same body wrapped with their own
// breadcrumb / hero / stats / frontmatter / preview header.
// ============================================================

const HC_DEFAULT_LOCALE_TABS = hcVettingCallDetail.hero.localeTabs;

/** Find the parent category section that owns the given article id. */
export function findHcArticleSection(articleId: string): HcCategorySection | null {
  for (const section of hcCategorySections) {
    if (section.articles.some((a) => a.id === articleId)) {
      return section;
    }
  }
  return null;
}

/** Construct a populated HcDetailData for any article + its section. */
export function buildHcDetailFromArticle(
  article: HcArticleRow,
  section: HcCategorySection
): HcDetailData {
  // Canonical: return the exact verbatim fixture
  if (article.id === 'hc-vetting-call') {
    return hcVettingCallDetail;
  }

  // Extract just the URL path (before " · " separator) from compound slug
  const slugPath = article.slug.split(' · ')[0] ?? article.slug;

  // Build a mono key from article id (hc-foo-bar → help.<section>.foo_bar)
  const keyTail = article.id.replace(/^hc-/, '').replace(/-/g, '_');
  const heroKey = `help.${section.id}.${keyTail}`;

  // Trend direction inferred from views meta arrows
  const trendDirection: 'up' | 'down' | undefined =
    article.views.meta.includes('↑') ? 'up' : article.views.meta.includes('↓') ? 'down' : undefined;

  // Helpfulness variant → value variant mapping (for stat tint)
  const helpfulValueVariant: 'success' | 'warn' | 'danger' | undefined =
    article.helpful.variant === 'high'
      ? 'success'
      : article.helpful.variant === 'medium'
      ? 'warn'
      : article.helpful.variant === 'low'
      ? 'danger'
      : undefined;

  const isStale = article.modified.author.includes('stale');
  const editorPhrase = isStale
    ? `Last touched on <strong>${article.modified.date}</strong> — ${article.modified.author}.`
    : `Last edited by <strong>${article.modified.author}</strong> on ${article.modified.date}.`;

  return {
    id: article.id,
    breadcrumb: [
      { label: 'Help Center', href: '/admin/platform/help-content' },
      { label: section.title },
      { label: `${article.title} · v1`, isCurrent: true },
    ],
    hero: {
      key: heroKey,
      status: article.status,
      statusLabel: article.statusLabel,
      envMetaText: `6 locales · ${article.views.value} views/30d · ${article.helpful.label} helpful`,
      title: article.title,
      subtitleHtml: `Help center article in <strong>${section.title}</strong>. Linked from the in-app help system via the <code>{{ help.url }}</code> variable. ${editorPhrase} ${article.helpful.meta ? `<em>${article.helpful.meta}</em>.` : ''}`,
      localeTabs: HC_DEFAULT_LOCALE_TABS,
      actions: [
        { label: 'View public', icon: 'external' },
        { label: 'Save & publish', icon: 'save', isPrimary: true },
      ],
    },
    detailStats: [
      {
        label: 'Views · 30d',
        value: article.views.value,
        meta: article.views.meta,
        ...(trendDirection ? { valueVariant: trendDirection === 'up' ? 'success' : 'danger' } : {}),
      },
      {
        label: 'Helpfulness',
        value: String(article.helpful.percent),
        valueSuffix: '%',
        ...(helpfulValueVariant ? { valueVariant: helpfulValueVariant } : {}),
        meta: article.helpful.meta || 'no ratings yet',
      },
      {
        label: 'Avg time on page',
        value: '2:14',
        meta: 'estimated read time',
      },
      {
        label: 'Search rank',
        value: '—',
        meta: 'no ranking data yet',
      },
    ],
    frontmatter: {
      sectionHead: {
        num: '01',
        title: 'Article frontmatter',
        meta: 'title · slug · category · tags · locale · search keywords',
      },
      rows: [
        { key: 'TITLE', valueKind: 'input', valueHtml: article.title },
        { key: 'SLUG', valueKind: 'input', valueHtml: slugPath },
        {
          key: 'CATEGORY',
          valueKind: 'text',
          valueHtml: `${section.title} · <span data-hc-muted-soft>(${section.articles.length} articles)</span>`,
        },
        {
          key: 'TAGS',
          valueKind: 'tags',
          valueHtml:
            (article.tags || [])
              .map((t) => `<span data-hc-tag-chip>${t.label}</span>`)
              .join('') + '<span data-hc-tag-chip data-hc-tag-add>+ add tag</span>',
        },
        { key: 'LOCALE', valueKind: 'text', valueHtml: 'EN · canonical' },
        { key: 'SEARCH KEYWORDS', valueKind: 'input', valueHtml: '' },
        {
          key: 'PUBLISHED',
          valueKind: 'text',
          valueHtml: `${article.statusLabel} · modified ${article.modified.date} by ${article.modified.author}`,
        },
      ],
    },
    markdown: hcVettingCallDetail.markdown,
    preview: {
      ...hcVettingCallDetail.preview,
      headMeta: `EN · ${slugPath}`,
      publicCrumbHtml: `<a>Help</a> › <a>${section.title}</a> › ${article.title}`,
      publicTitle: article.title,
      publicMeta: `Updated ${article.modified.date} · ${article.views.value} views · ${article.helpful.label} found helpful`,
    },
    categorization: hcVettingCallDetail.categorization,
  };
}
