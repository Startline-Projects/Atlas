/* admin.html lines 62388-62722 — Email & SMS Templates LIST view fixtures (verbatim) */

import type { PrStat } from './privacy-reports-data';

// ============================================================
// TYPES
// ============================================================

export type TmChannelValue = 'email' | 'sms' | 'whatsapp';
export type TmStatus = 'active' | 'draft' | 'in-approval' | 'archived';
export type TmStatusFilter = 'all' | 'active' | 'draft' | 'in-approval' | 'archived';
export type TmChannelIcon = 'envelope' | 'chat' | 'speech';

export interface TmChannelTab {
  value: TmChannelValue;
  label: string;
  count: string;
  icon: TmChannelIcon;
  active?: boolean;
}

export interface TmStatusFilterChip {
  value: TmStatusFilter;
  label: string;
  count: string;
  active?: boolean;
}

export interface TmHeaderAction {
  label: string;
  icon: 'audit' | 'plus';
  isPrimary?: boolean;
}

export interface TmPageMeta {
  title: string;
  metaText: string;
}

export interface TmFlowSegment {
  /** Plain text segment of a flow path; arrows are inserted between segments */
  text: string;
}

export interface TmTemplate {
  id: string;
  name: string;
  key: string;
  flowParts: string[]; // joined with → arrow separators
  locales: { count: string; list: string };
  modified: { date: string; author: string };
  sends: { value: string; meta: string };
  status: TmStatus;
  statusLabel: string;
  isInApproval?: boolean;
  isArchived?: boolean;
}

export interface TmStubPaneContent {
  title: string;
  bodyHtml: string;
}

// ============================================================
// PAGE-LEVEL FIXTURES (admin.html 62392-62414)
// ============================================================

export const tmPageMeta: TmPageMeta = {
  title: 'Email & SMS templates',
  metaText:
    '/admin/platform/templates · 23 email · 8 SMS · 6 WhatsApp · 37 total · 12 locales · all changes audit-logged',
};

export const tmMetaPulseHtml =
  '2 templates in approval · WhatsApp <strong>payout-confirmation EN/PT-BR</strong>';

export const tmSearchPlaceholder = 'Search templates…';

export const tmHeaderActions: TmHeaderAction[] = [
  { label: 'Audit', icon: 'audit' },
  { label: 'New template', icon: 'plus', isPrimary: true },
];

// ============================================================
// STATS STRIP (admin.html 62417-62443)
// ============================================================

export const tmTopStats: PrStat[] = [
  {
    label: 'Total templates',
    value: '37',
    meta: '<strong>23 email</strong> · 8 SMS · 6 WhatsApp',
  },
  {
    label: 'Active',
    value: '33',
    variant: 'success',
    meta: 'all locales rendering',
  },
  {
    label: 'In approval',
    value: '2',
    variant: 'warn',
    meta: 'WhatsApp · Meta review',
  },
  {
    label: 'Sends · 24h',
    value: '23,142',
    meta: 'across all channels',
  },
  {
    label: 'Localized',
    value: '12',
    suffix: 'locales',
    meta: 'EN canonical · 11 translations',
  },
];

// ============================================================
// CHANNEL TABS (admin.html 62446-62462)
// ============================================================

export const tmChannelTabs: TmChannelTab[] = [
  { value: 'email', label: 'Email', count: '23', icon: 'envelope', active: true },
  { value: 'sms', label: 'SMS', count: '8', icon: 'chat' },
  { value: 'whatsapp', label: 'WhatsApp', count: '6', icon: 'speech' },
];

// ============================================================
// STATUS FILTERS (admin.html 62465-62475)
// ============================================================

export const tmStatusFilters: TmStatusFilterChip[] = [
  { value: 'all', label: 'All', count: '23', active: true },
  { value: 'active', label: 'Active', count: '21' },
  { value: 'draft', label: 'Draft', count: '1' },
  { value: 'in-approval', label: 'In approval', count: '0' },
  { value: 'archived', label: 'Archived', count: '1' },
];

// ============================================================
// 14 EMAIL TEMPLATES (admin.html 62496-62691) — verbatim
// ============================================================

export const tmEmailTemplates: TmTemplate[] = [
  {
    id: 'tm-vetting-invite',
    name: 'Vetting call invite',
    key: 'email.candidate.vetting_invite',
    flowParts: ['candidate signup', 'vetting scheduling'],
    locales: { count: '6', list: 'EN · ES · PT · FR · DE · ID' },
    modified: { date: 'Apr 28, 2026', author: 'Aïsha · DSR-aligned' },
    sends: { value: '14,820', meta: '98.4% delivery' },
    status: 'active',
    statusLabel: 'Active',
  },
  {
    id: 'tm-email-verify',
    name: 'Email verification',
    key: 'email.auth.verify',
    flowParts: ['signup', 'verification gate'],
    locales: { count: '12', list: 'all locales' },
    modified: { date: 'Mar 14, 2026', author: 'Dario · at launch' },
    sends: { value: '22,184', meta: '99.7% delivery' },
    status: 'active',
    statusLabel: 'Active',
  },
  {
    id: 'tm-vetting-passed',
    name: 'Vetting passed · welcome',
    key: 'email.candidate.vetting_passed',
    flowParts: ['vetting call', 'pool eligible'],
    locales: { count: '6', list: 'EN · ES · PT · FR · DE · ID' },
    modified: { date: 'Mar 14, 2026', author: 'Dario · at launch' },
    sends: { value: '8,420', meta: '98.2% delivery' },
    status: 'active',
    statusLabel: 'Active',
  },
  {
    id: 'tm-vetting-failed',
    name: 'Vetting failed · retry window',
    key: 'email.candidate.vetting_failed',
    flowParts: ['vetting call', 'cooldown gate'],
    locales: { count: '6', list: 'EN · ES · PT · FR · DE · ID' },
    modified: { date: 'Mar 14, 2026', author: 'Dario · at launch' },
    sends: { value: '2,184', meta: '99.1% delivery' },
    status: 'active',
    statusLabel: 'Active',
  },
  {
    id: 'tm-contract-sign',
    name: 'Contract signature request',
    key: 'email.contract.signature_request',
    flowParts: ['engagement start', 'DocuSign envelope'],
    locales: { count: '12', list: 'all locales' },
    modified: { date: 'Apr 2, 2026', author: 'Aïsha · DocuSign mention' },
    sends: { value: '1,847', meta: '99.5% delivery' },
    status: 'active',
    statusLabel: 'Active',
  },
  {
    id: 'tm-payout-receipt',
    name: 'Payout receipt',
    key: 'email.payment.payout_receipt',
    flowParts: ['Stripe payout.paid', 'candidate notification'],
    locales: { count: '12', list: 'all locales' },
    modified: { date: 'Mar 14, 2026', author: 'Dario · at launch' },
    sends: { value: '6,420', meta: '99.8% delivery' },
    status: 'active',
    statusLabel: 'Active',
  },
  {
    id: 'tm-refund-issued',
    name: 'Refund issued',
    key: 'email.payment.refund_issued',
    flowParts: ['REF-* · Step 21', 'client notification'],
    locales: { count: '12', list: 'all locales' },
    modified: { date: 'Apr 18, 2026', author: 'Aïsha · REF-0084 template' },
    sends: { value: '23', meta: '100% delivery' },
    status: 'active',
    statusLabel: 'Active',
  },
  {
    id: 'tm-dispute-opened',
    name: 'Dispute opened · acknowledgment',
    key: 'email.dispute.opened',
    flowParts: ['DSP-* · Step 12', 'both parties'],
    locales: { count: '12', list: 'all locales' },
    modified: { date: 'Mar 14, 2026', author: 'Dario · at launch' },
    sends: { value: '142', meta: '99.3% delivery' },
    status: 'active',
    statusLabel: 'Active',
  },
  {
    id: 'tm-suspension',
    name: 'Suspension notice',
    key: 'email.account.suspension_notice',
    flowParts: ['SB-* · Step 17', 'affected user'],
    locales: { count: '6', list: 'EN · ES · PT · FR · DE · ID' },
    modified: { date: 'Apr 4, 2026', author: 'Aïsha · DSR Article 17 reference' },
    sends: { value: '14', meta: '100% delivery' },
    status: 'active',
    statusLabel: 'Active',
  },
  {
    id: 'tm-dsr-response',
    name: 'DSR response · v3 (revised)',
    key: 'email.compliance.dsr_response',
    flowParts: ['DSR-* · Step 24', 'data subject'],
    locales: { count: '12', list: 'all locales' },
    modified: { date: 'May 4, 2026', author: 'Aïsha · v3 GDPR refresh' },
    sends: { value: '98', meta: 'v2 still live · v3 pending' },
    status: 'in-approval',
    statusLabel: 'In approval',
    isInApproval: true,
  },
  {
    id: 'tm-breach-disclosure',
    name: 'Breach disclosure · affected user',
    key: 'email.compliance.breach_disclosure',
    flowParts: ['SI-* · Step 16', 'affected users'],
    locales: { count: '12', list: 'all locales' },
    modified: { date: 'Apr 21, 2026', author: 'Aïsha · SI-0014 incident' },
    sends: { value: '312', meta: 'SI-2026-0014 affected · 100%' },
    status: 'active',
    statusLabel: 'Active',
  },
  {
    id: 'tm-1042s-notification',
    name: '1042-S available · tax year notice',
    key: 'email.tax.1042s_available',
    flowParts: ['tax season', 'foreign contractors'],
    locales: { count: '3', list: 'EN · ES · PT · 9 missing' },
    modified: { date: 'May 1, 2026', author: 'Dario · new template' },
    sends: { value: '0', meta: 'draft · not deployed' },
    status: 'draft',
    statusLabel: 'Draft',
  },
  {
    id: 'tm-match-recommend',
    name: 'Match recommendation · weekly digest',
    key: 'email.client.match_digest',
    flowParts: ['cron weekly', 'active clients'],
    locales: { count: '12', list: 'all locales' },
    modified: { date: 'Mar 14, 2026', author: 'Dario · at launch' },
    sends: { value: '1,648', meta: '82.4% open rate' },
    status: 'active',
    statusLabel: 'Active',
  },
  {
    id: 'tm-old-welcome-v1',
    name: 'Welcome · v1 (legacy)',
    key: 'email.candidate.welcome_v1',
    flowParts: ['superseded by welcome v2'],
    locales: { count: '6', list: '' },
    modified: { date: 'Aug 14, 2024', author: 'archived Mar 2026' },
    sends: { value: '—', meta: '' },
    status: 'archived',
    statusLabel: 'Archived',
    isArchived: true,
  },
];

// ============================================================
// SMS + WHATSAPP STUB PANES (admin.html 62704-62719)
// ============================================================

export const tmSmsStub: TmStubPaneContent = {
  title: 'SMS templates · 8',
  bodyHtml:
    'Routed via Twilio (<a>Step 30</a>). Templates: OTP verification · 2FA challenge · vetting call reminder · payout confirmation · suspension critical alert · breach urgent notice · password reset · login from new device. 160-char limit enforced. Test-send works the same as email.',
};

export const tmWhatsappStub: TmStubPaneContent = {
  title: 'WhatsApp templates · 6',
  bodyHtml:
    'Meta-approved templates only · used in BR · IN · NG · PH where WhatsApp is primary. <strong>2 templates in Meta approval queue</strong> (payout-confirmation EN/PT-BR). Editor saves to "draft" until Meta approves; then auto-activates. 24-72h approval window.',
};

// ============================================================
// EMAIL PANE FOOTER (admin.html 62695-62698)
// ============================================================

export const tmEmailFooterMeta =
  '14 of 23 email templates shown · sorted by sends desc · 9 hidden';
export const tmEmailFooterButtonLabel = 'Show remaining 9 →';

// ============================================================
// DETAIL VIEW TYPES + FIXTURE (admin.html 62727-62860 for Pass B)
// ============================================================

export interface TmBreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

export interface TmLocaleTab {
  code: string;
  label: string;
  flagGradient: string;
  active?: boolean;
  fallback?: boolean;
}

export interface TmDetailHeroAction {
  label: string;
  icon?: 'eye' | 'save';
  isPrimary?: boolean;
}

export interface TmDetailHero {
  key: string;
  status: TmStatus;
  statusLabel: string;
  envMetaText: string;
  title: string;
  subtitleHtml: string;
  localeTabs: TmLocaleTab[];
  actions: TmDetailHeroAction[];
}

export interface TmDetailStat {
  label: string;
  value: string;
  valueVariant?: 'success' | 'warn' | 'danger';
  valueSuffix?: string;
  meta: string;
}

export type TmApprovalStepStatus = 'complete' | 'active' | 'pending';

export interface TmApprovalStep {
  num: string;
  label: string;
  name: string;
  metaHtml: string;
  status: TmApprovalStepStatus;
}

export interface TmApprovalAction {
  label: string;
  isPrimary?: boolean;
}

export interface TmApprovalCard {
  eyebrow: string;
  title: string;
  iconSvgPaths: string;
  steps: TmApprovalStep[];
  actionsMetaHtml: string;
  actions: TmApprovalAction[];
}

export interface TmSectionHeadData {
  num: string;
  title: string;
  meta: string;
}

export type TmFieldKind = 'input' | 'body';

export interface TmField {
  label: string;
  kind: TmFieldKind;
  /** For 'input': raw value text. For 'body': HTML with inline data-tm-liquid + data-tm-tag spans. */
  valueHtml: string;
}

export interface TmEditorCardData {
  sectionHead: TmSectionHeadData;
  headTitle: string;
  headMeta: string;
  fields: TmField[];
}

export type TmVariableType = 'Required' | 'Array' | 'Number' | 'String' | 'Logic';

export interface TmVariable {
  name: string; // e.g. "{{ candidate.first_name }}" or "{% for topic in vetting.agenda %}"
  type: TmVariableType;
  description: string;
}

export interface TmVariablesPanelData {
  sectionHead: TmSectionHeadData;
  headTitle: string;
  headMeta: string;
  vars: TmVariable[];
}

export interface TmEmailPreview {
  logo: string;
  subject: string;
  bodyHtml: string;
  ctaLabel: string;
  footerHtml: string;
}

export interface TmPreviewCardData {
  headTitle: string;
  headMeta: string;
  preview: TmEmailPreview;
}

export interface TmTestSendHistoryEntry {
  text: string;
}

export interface TmTestSendData {
  headTitle: string;
  description: string;
  inputPlaceholder: string;
  inputDefaultValue: string;
  sendButtonLabel: string;
  historyFooterHtml: string;
}

export interface TmLinkedContextRow {
  label: string;
  valueHtml: string;
}

export interface TmLinkedContextData {
  headTitle: string;
  rows: TmLinkedContextRow[];
}

export interface TmDetailData {
  id: string;
  breadcrumb: TmBreadcrumbItem[];
  hero: TmDetailHero;
  detailStats: TmDetailStat[];
  approval: TmApprovalCard;
  editor: TmEditorCardData;
  variables: TmVariablesPanelData;
  preview: TmPreviewCardData;
  testSend: TmTestSendData;
  linked: TmLinkedContextData;
}

export const tmVettingInviteDetail: TmDetailData = {
  id: 'tm-vetting-invite',
  breadcrumb: [
    { label: 'Templates', href: '/admin/platform/templates' },
    { label: 'Email' },
    { label: 'Vetting call invite · v2.4', isCurrent: true },
  ],
  hero: {
    key: 'email.candidate.vetting_invite',
    status: 'active',
    statusLabel: 'Active · v2.4',
    envMetaText: 'EN canonical · 6 locales · 14,820 sends / 30d · 98.4% delivery',
    title: 'Vetting call invite',
    subtitleHtml:
      'Sent to a candidate after they complete signup, inviting them to schedule their vetting call with a specialist. Triggered by the <strong>candidate signup flow</strong> · routed through <strong>SendGrid</strong> (<a>Step 30</a>) · uses the canonical <strong>Liquid syntax</strong>. Configured by the email-templates setting in <a>platform settings</a>. Last edited by <strong>Aïsha</strong> 13 days ago — added explicit DSR Article 14 transparency language and the Atlas privacy-policy link.',
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
      { label: 'Preview', icon: 'eye' },
      { label: 'Save & submit for approval', icon: 'save', isPrimary: true },
    ],
  },
  detailStats: [
    { label: 'Sends · 30d', value: '14,820', meta: '98.4% delivery · 1.6% bounce' },
    {
      label: 'Open rate',
      value: '74.2',
      valueSuffix: '%',
      valueVariant: 'success',
      meta: 'above 58% benchmark',
    },
    {
      label: 'CTA click rate',
      value: '42.8',
      valueSuffix: '%',
      meta: 'clicked "Schedule vetting"',
    },
    { label: 'Locales', value: '6', meta: 'EN canonical · 5 translations' },
  ],
  approval: {
    eyebrow: 'APPROVAL WORKFLOW · TEMPLATE CHANGES',
    title: 'Currently active · v2.4 published Apr 28 · v2.5 not yet drafted',
    iconSvgPaths: '<polyline points="20 6 9 17 4 12"/>',
    steps: [
      {
        num: '1',
        label: 'DRAFT',
        name: 'Aïsha',
        metaHtml: '<strong>Apr 24, 2026</strong>',
        status: 'complete',
      },
      {
        num: '2',
        label: 'REVIEW',
        name: 'Dario · Super Admin',
        metaHtml: 'approved <strong>Apr 26</strong>',
        status: 'complete',
      },
      {
        num: '3',
        label: 'DEPLOYED',
        name: 'Auto-rollout',
        metaHtml: 'live <strong>Apr 28, 09:00 UTC</strong>',
        status: 'complete',
      },
    ],
    actionsMetaHtml:
      'Template changes require <strong>Super Admin sign-off</strong> before deployment. All approvals audit-logged in Step 25. <a>View approval history →</a>',
    actions: [
      { label: 'Version history' },
      { label: 'Diff v2.3 → v2.4' },
    ],
  },
  editor: {
    sectionHead: {
      num: '01',
      title: 'Template editor',
      meta: 'Liquid syntax · variables enclosed in {{ }} · conditionals in {% %} · changes require approval',
    },
    headTitle: 'EN · canonical',
    headMeta: 'unsaved · last commit Apr 28',
    fields: [
      {
        label: 'SUBJECT LINE',
        kind: 'input',
        valueHtml: '{{ candidate.first_name }}, schedule your vetting call with Atlas',
      },
      {
        label: 'PREHEADER (preview text)',
        kind: 'input',
        valueHtml:
          'Your application has been received — book a 30-minute vetting call to join the Atlas talent pool.',
      },
      {
        label: 'FROM',
        kind: 'input',
        valueHtml: 'Atlas vetting team <vetting@atlas.staffva>',
      },
      {
        label: 'BODY · LIQUID HTML',
        kind: 'body',
        valueHtml:
          'Hi <span data-tm-liquid>{{ candidate.first_name }}</span>,\n\nThanks for applying to join the Atlas talent network. Your application for <span data-tm-liquid>{{ candidate.role_family }}</span> roles has been received and is queued for vetting review.\n\nThe next step is a <strong>30-minute vetting call</strong> with one of our specialists. We\'ll cover:\n<span data-tm-tag>{% for topic in vetting.agenda %}</span>\n  • <span data-tm-liquid>{{ topic }}</span>\n<span data-tm-tag>{% endfor %}</span>\n\n<span data-tm-tag>{% if candidate.role_family == "Software Engineering" %}</span>\nThe call will include a short live-coding exercise. You\'ll need a stable internet connection and quiet space.\n<span data-tm-tag>{% endif %}</span>\n\n<a>Schedule your vetting call</a>\n\nYou can reschedule up to <span data-tm-liquid>{{ scheduling.cancel_window_hours }}</span> hours before the call. If you have questions, reply to this email or visit our <a>help center</a>.\n\n— The Atlas vetting team\n\n<em>Under EU GDPR Article 14, you have the right to know how we process your data. <a>View our privacy notice</a>.</em>',
      },
    ],
  },
  variables: {
    sectionHead: {
      num: '02',
      title: 'Available variables',
      meta: 'click any variable to insert it at the cursor · required variables must be present or template fails to render',
    },
    headTitle: 'Variables · 12 available',
    headMeta: 'candidate.* · scheduling.* · vetting.* · help.* · privacy.*',
    vars: [
      {
        name: '{{ candidate.first_name }}',
        type: 'Required',
        description: 'first name as captured at signup · NULL falls back to "there"',
      },
      {
        name: '{{ candidate.role_family }}',
        type: 'Required',
        description: 'role family they applied for · maps to Step 29 taxonomy',
      },
      {
        name: '{% for topic in vetting.agenda %}',
        type: 'Array',
        description: 'array · agenda topics for this specific role · iterable',
      },
      {
        name: '{{ scheduling.url }}',
        type: 'Required',
        description: 'candidate-specific scheduling link · pre-authenticated · expires 14d',
      },
      {
        name: '{{ scheduling.cancel_window_hours }}',
        type: 'Number',
        description: 'cancellation window · platform default 24',
      },
      {
        name: '{{ help.url }}',
        type: 'String',
        description: 'deep link to Help Center · Step 32',
      },
      {
        name: '{{ privacy.url }}',
        type: 'Required',
        description: 'current privacy notice · cross-ref Step 26 (v3.2 active)',
      },
      {
        name: '{{ candidate.timezone }}',
        type: 'String',
        description: "candidate's timezone for date formatting",
      },
      {
        name: '{{ atlas.support_email }}',
        type: 'String',
        description: 'platform support address · routed via SendGrid',
      },
      {
        name: '{{ atlas.dpo_email }}',
        type: 'String',
        description: 'Data Protection Officer (Aïsha) · required in GDPR-affected templates',
      },
      {
        name: '{% if candidate.role_family == "..." %}',
        type: 'Logic',
        description: 'conditional · branch on role family · used for role-specific copy',
      },
      {
        name: '{{ candidate.locale }}',
        type: 'String',
        description: "candidate's preferred locale · auto-resolves which version sends",
      },
    ],
  },
  preview: {
    headTitle: 'Live preview',
    headMeta: 'sample candidate · EN',
    preview: {
      logo: 'Atlas',
      subject: 'Adesuwa, schedule your vetting call with Atlas',
      bodyHtml:
        '<p>Hi <strong>Adesuwa</strong>,</p><p>Thanks for applying to join the Atlas talent network. Your application for <strong>Software Engineering</strong> roles has been received and is queued for vetting review.</p><p>The next step is a <strong>30-minute vetting call</strong> with one of our specialists. We\'ll cover:</p><p data-indent>• Experience walk-through<br>• Live-coding exercise<br>• English proficiency check<br>• Q&amp;A about Atlas</p><p>The call will include a short live-coding exercise. You\'ll need a stable internet connection and quiet space.</p>',
      ctaLabel: 'Schedule your vetting call',
      footerHtml:
        '<p>You can reschedule up to <strong>24 hours</strong> before the call. If you have questions, reply to this email or visit our help center.</p><p>— The Atlas vetting team</p><p data-italic>Under EU GDPR Article 14, you have the right to know how we process your data. <a>View our privacy notice</a>.</p>',
    },
  },
  testSend: {
    headTitle: 'Test send',
    description:
      'Sends the current draft with sample data to a real email address. Test sends are tagged "TEST" and counted separately. All test-sends audit-logged.',
    inputPlaceholder: 'email@example.com',
    inputDefaultValue: 'dario@atlas.staffva',
    sendButtonLabel: 'Send',
    historyFooterHtml:
      '<strong>Last 3 test sends:</strong><br>· Apr 28 · dario@atlas.staffva · delivered 142ms<br>· Apr 28 · aisha@atlas.staffva · delivered 98ms<br>· Apr 27 · dario@atlas.staffva · delivered 187ms',
  },
  linked: {
    headTitle: 'Linked context',
    rows: [
      { label: 'Trigger', valueHtml: 'candidate.signup.completed' },
      { label: 'Delivery', valueHtml: '<a>SendGrid · Step 30 →</a>' },
      { label: 'Rate limit', valueHtml: '<a>Step 28 settings</a>' },
      { label: 'Approval audit', valueHtml: '<a>Step 25 →</a>' },
      { label: 'Privacy policy', valueHtml: '<a>v3.2 · Step 26</a>' },
    ],
  },
};
