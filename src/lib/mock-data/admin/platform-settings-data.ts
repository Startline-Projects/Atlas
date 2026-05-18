export interface PsPageMeta {
  title: string;
  metaText: string;
  restrictionLabel: string;
}

export interface PsHeaderAction {
  label: string;
  icon: string;
}

export interface PsCategoryNavChip {
  value: string;
  label: string;
  icon: string;
  count: number;
  active?: boolean;
}

export type PsCategoryVariant = 'operational' | 'financial' | 'comms' | 'branding' | 'security';

export interface PsCategoryStub {
  variant: PsCategoryVariant;
  eyebrow: string;
  title: string;
  meta: string;
  settingsCount: number;
}

export interface PsSetting {
  title: string;
  key: string;
  descriptionHtml: string;
  value: string;
  valueSuffix?: string;
  valueBadge?: 'default' | 'modified';
  metaHtml: string;
  actionLabel?: string;
}

export interface PsPageData {
  meta: PsPageMeta;
  searchPlaceholder: string;
  headerActions: PsHeaderAction[];
  categoryNavChips: PsCategoryNavChip[];
  categoryStubs: PsCategoryStub[];
  footerMeta: string;
  footerButtonLabel: string;
}

export const psPageMeta: PsPageMeta = {
  title: 'Platform settings',
  metaText: '/admin/platform/settings · 24 configurable settings · 22 at default · 2 modified · all changes audit-logged',
  restrictionLabel: 'Super Admin only',
};

export const psSearchPlaceholder = 'Search settings…';

export const psHeaderActions: PsHeaderAction[] = [
  { label: 'Audit trail', icon: 'audit' },
  { label: 'Export config', icon: 'download' },
];

export const psCategoryNavChips: PsCategoryNavChip[] = [
  {
    value: 'operational',
    label: 'Operational',
    icon: 'settings-cog',
    count: 7,
    active: true,
  },
  {
    value: 'financial',
    label: 'Financial',
    icon: 'dollar',
    count: 4,
  },
  {
    value: 'comms',
    label: 'Communications',
    icon: 'message',
    count: 4,
  },
  {
    value: 'branding',
    label: 'Branding',
    icon: 'globe-decorated',
    count: 4,
  },
  {
    value: 'security',
    label: 'Security',
    icon: 'shield',
    count: 5,
  },
];

export const psCategoryStubs: PsCategoryStub[] = [
  {
    variant: 'operational',
    eyebrow: 'CATEGORY 01',
    title: 'Operational',
    meta: 'vetting thresholds · match scoring · SLA targets · pool monitoring · 7 settings',
    settingsCount: 7,
  },
  {
    variant: 'financial',
    eyebrow: 'CATEGORY 02',
    title: 'Financial',
    meta: 'fee structure · currency · payment processor configuration · 4 settings',
    settingsCount: 4,
  },
  {
    variant: 'comms',
    eyebrow: 'CATEGORY 03',
    title: 'Communications',
    meta: 'email · WhatsApp · notification settings · 4 settings',
    settingsCount: 4,
  },
  {
    variant: 'branding',
    eyebrow: 'CATEGORY 04',
    title: 'Branding',
    meta: 'logo · colors · email branding · 4 settings',
    settingsCount: 4,
  },
  {
    variant: 'security',
    eyebrow: 'CATEGORY 05',
    title: 'Security',
    meta: '2FA · session timeouts · password policy · lockout rules · 5 settings',
    settingsCount: 5,
  },
];

export const psOperationalSettings: PsSetting[] = [
  {
    title: 'Minimum English level for vetting',
    key: 'op.vetting.english_min',
    descriptionHtml: 'CEFR-aligned minimum spoken English level for candidate-vetting eligibility. Candidates below this are auto-blocked from booking vetting calls.',
    value: 'B2',
    valueSuffix: 'CEFR',
    valueBadge: 'default',
    metaHtml: 'last modified · <strong>at launch</strong> · never changed',
  },
  {
    title: 'Vetting retake cooldown',
    key: 'op.vetting.retake_cooldown',
    descriptionHtml: 'Days a failed candidate must wait before retaking the vetting call. Prevents repeated low-effort attempts and gives candidates time to improve.',
    value: '90',
    valueSuffix: 'days',
    valueBadge: 'default',
    metaHtml: 'last modified · <strong>at launch</strong> · 1,247 retakes YTD',
  },
  {
    title: 'Match score threshold',
    key: 'op.match.score_threshold',
    descriptionHtml: 'Minimum candidate-job similarity score (0-100) below which matches are not shown to clients. Higher = fewer but better-fit matches. <strong>Active in demo modal above.</strong>',
    value: '60',
    valueSuffix: '%',
    valueBadge: 'default',
    metaHtml: 'last modified · <strong>at launch</strong> · 2.3M matches surfaced YTD',
  },
  {
    title: 'Pool depletion warn threshold',
    key: 'op.pool.depletion_warn',
    descriptionHtml: 'Triggers an internal alert when the active-candidate pool for a vetted role/region drops below this count. Used to prompt recruiting efforts.',
    value: '20',
    valueSuffix: 'candidates',
    valueBadge: 'modified',
    metaHtml: 'last modified · <strong>Dario</strong> · 9d ago · raised from 15 · <a href="#" data-ps-action="open-audit">audit →</a>',
  },
  {
    title: 'Review SLA · hours',
    key: 'op.sla.review_hours',
    descriptionHtml: 'Target turnaround for specialist review of submitted candidate vetting calls. Visible on specialist dashboards; missed reviews show in escalation queue.',
    value: '24',
    valueSuffix: 'hours',
    valueBadge: 'default',
    metaHtml: 'last modified · <strong>at launch</strong> · 98.4% on-time',
  },
  {
    title: 'Dispute SLA · business days',
    key: 'op.sla.dispute_days',
    descriptionHtml: 'Target turnaround for admin response on disputes raised by candidates or clients. Drives dispute-page deadline countdowns. <a href="#" data-ps-action="open-disputes">Step 12 →</a>',
    value: '5',
    valueSuffix: 'business days',
    valueBadge: 'default',
    metaHtml: 'last modified · <strong>at launch</strong> · 14 disputes resolved YTD',
  },
  {
    title: 'Daily activity submission deadline',
    key: 'op.activity.submission_deadline',
    descriptionHtml: 'UTC cutoff time for candidates to submit their daily activity for the prior workday. Late submissions enter the next-day SLA review queue.',
    value: '23:59',
    valueSuffix: 'UTC',
    valueBadge: 'default',
    metaHtml: 'last modified · <strong>at launch</strong> · 96.2% on-time',
  },
];

export const psFinancialSettings: PsSetting[] = [
  {
    title: 'Fee structure',
    key: 'fin.fees.structure',
    descriptionHtml: 'Active platform fee model · transaction fee + payout fee + currency conversion margin. <a href="#" data-ps-action="open-fees">Step 20 (Fees) →</a> for full breakdown and per-tier rates.',
    value: 'v3',
    valueSuffix: 'active',
    metaHtml: 'last modified · <strong>Dario</strong> · 6 mo ago · ramped fee tier · <a href="#" data-ps-action="open-audit">audit →</a>',
    actionLabel: 'Open editor',
  },
  {
    title: 'Default platform currency',
    key: 'fin.currency.default',
    descriptionHtml: 'Currency used for invoicing, reporting, and display when client preference is unset. Affects all admin dashboards and financial reports.',
    value: 'USD',
    valueSuffix: 'United States dollar',
    valueBadge: 'default',
    metaHtml: 'last modified · <strong>at launch</strong> · 82% of clients prefer USD',
  },
  {
    title: 'Currency conversion buffer',
    key: 'fin.currency.conversion_buffer',
    descriptionHtml: 'Margin Atlas adds on top of Wise mid-market FX rates when converting payouts. Protects against rate slippage between quote and execution.',
    value: '0.50',
    valueSuffix: '%',
    valueBadge: 'default',
    metaHtml: 'last modified · <strong>at launch</strong> · 80+ currencies covered',
  },
  {
    title: 'Payment processor priority',
    key: 'fin.processor.priority',
    descriptionHtml: 'Order in which payment processors are tried for payouts. First-listed is primary; subsequent are fallback on processor errors or coverage gaps.',
    value: 'Stripe → Wise',
    valueSuffix: 'primary → fallback',
    valueBadge: 'default',
    metaHtml: 'last modified · <strong>at launch</strong> · 99.97% first-try success',
  },
];

export const psCommsSettings: PsSetting[] = [
  {
    title: 'Email templates',
    key: 'comm.email.templates',
    descriptionHtml: 'Manage all transactional + lifecycle email templates. SendGrid-routed. Localized to 6 languages. Includes vetting invites, payout receipts, dispute updates, suspension notices, breach disclosures, DSR responses.',
    value: '23',
    valueSuffix: 'templates active',
    metaHtml: 'last modified · <strong>Aïsha</strong> · 12d ago · DSR-response template v3',
    actionLabel: 'Open editor',
  },
  {
    title: 'WhatsApp templates',
    key: 'comm.whatsapp.templates',
    descriptionHtml: 'Meta-approved WhatsApp Business templates for candidate alerts in markets where WhatsApp is primary (Brazil, India, Nigeria, Philippines). Each template requires re-approval after edit.',
    value: '12',
    valueSuffix: 'approved',
    valueBadge: 'modified',
    metaHtml: 'last modified · <strong>Aïsha</strong> · 4d ago · payout-confirmation EN/PT-BR',
    actionLabel: 'Open editor',
  },
  {
    title: 'Notification rate limit · per user per day',
    key: 'comm.notify.rate_limit',
    descriptionHtml: 'Max number of non-transactional notifications (matches, recommendations, marketing) any single user receives in 24h. Transactional / security notifications bypass this limit.',
    value: '8',
    valueSuffix: 'per user / 24h',
    valueBadge: 'default',
    metaHtml: 'last modified · <strong>at launch</strong> · enforcement: 99.99% match',
  },
  {
    title: 'Quiet hours · user timezone',
    key: 'comm.notify.quiet_hours',
    descriptionHtml: 'Window during which non-urgent notifications are suppressed and queued for delivery the following morning. Per-user timezone-aware. Critical security notifications always deliver.',
    value: '22:00 – 07:00',
    valueSuffix: 'user TZ',
    valueBadge: 'default',
    metaHtml: 'last modified · <strong>at launch</strong> · supports 47 TZ',
  },
];

export const psBrandingSettings: PsSetting[] = [
  {
    title: 'Platform logo',
    key: 'brand.logo',
    descriptionHtml: 'Atlas wordmark used across all surfaces · light + dark variants required · SVG preferred · falls back to PNG at 2x for legacy email clients.',
    value: 'Fraunces',
    valueSuffix: 'wordmark · v2',
    metaHtml: 'last modified · <strong>at launch</strong> · 2 variants on file',
    actionLabel: 'Upload',
  },
  {
    title: 'Primary brand color',
    key: 'brand.color.primary',
    descriptionHtml: 'Driver of accent color across web, email, and partner-facing surfaces. Changes propagate via CSS variables; live within 5 min of confirm. Email branding cascades.',
    value: '#2E2A26',
    valueSuffix: 'ink (warm black)',
    valueBadge: 'default',
    metaHtml: 'last modified · <strong>at launch</strong>',
  },
  {
    title: 'Email header branding',
    key: 'brand.email.header',
    descriptionHtml: 'Visual treatment at the top of all transactional and lifecycle emails. Includes logo placement, headline typography, and background. Affects all 23 email templates.',
    value: 'Cream + ink',
    valueSuffix: 'v2 · current',
    valueBadge: 'default',
    metaHtml: 'last modified · <strong>at launch</strong> · all templates inherit',
  },
  {
    title: 'Favicon',
    key: 'brand.favicon',
    descriptionHtml: 'Tab icon used in browser tabs, bookmarks, and PWA installs. ICO + multiple SVG sizes for retina + mobile.',
    value: 'Atlas mark',
    valueSuffix: 'SVG · 32px · 192px',
    metaHtml: 'last modified · <strong>at launch</strong>',
    actionLabel: 'Upload',
  },
];

export const psSecuritySettings: PsSetting[] = [
  {
    title: '2FA requirement · admins',
    key: 'sec.2fa.admin_required',
    descriptionHtml: 'All admin accounts must have TOTP or hardware key 2FA enabled before they can access the admin interface. Non-compliant admins are locked out at next login.',
    value: 'Required',
    valueSuffix: 'TOTP · hardware key',
    valueBadge: 'default',
    metaHtml: 'last modified · <strong>at launch</strong> · 100% admin compliance',
  },
  {
    title: 'Admin session timeout',
    key: 'sec.session.admin_timeout',
    descriptionHtml: 'Maximum idle time for an admin session before re-authentication is required. Active sessions also force re-auth on sensitive actions (bans, role changes, fee changes).',
    value: '8',
    valueSuffix: 'hours idle',
    valueBadge: 'default',
    metaHtml: 'last modified · <strong>at launch</strong>',
  },
  {
    title: 'User session timeout',
    key: 'sec.session.user_timeout',
    descriptionHtml: 'Maximum age for a regular user session token (candidates, clients, specialists) before re-authentication is required. Sensitive actions force re-auth regardless.',
    value: '30',
    valueSuffix: 'days',
    valueBadge: 'default',
    metaHtml: 'last modified · <strong>at launch</strong>',
  },
  {
    title: 'Password policy',
    key: 'sec.password.policy',
    descriptionHtml: 'Minimum complexity rules for all platform passwords. Enforced at signup and password change. NIST 800-63B aligned. Compromised-password check via HIBP API.',
    value: '12 char · complex',
    valueSuffix: 'NIST 800-63B',
    valueBadge: 'default',
    metaHtml: 'last modified · <strong>at launch</strong> · HIBP check enabled',
  },
  {
    title: 'Failed-login lockout',
    key: 'sec.lockout.failed_login',
    descriptionHtml: 'Number of failed sign-in attempts before the account is temporarily locked. Triggers a captcha + IP cooldown. Reflected in audit log. <a href="#" data-ps-action="open-audit">Step 25 · auth events →</a>',
    value: '5',
    valueSuffix: 'attempts · 1h cooldown',
    valueBadge: 'default',
    metaHtml: 'last modified · <strong>at launch</strong> · 23 lockouts last 24h',
  },
];

export const psFooterMeta = '24 settings tracked · all changes audit-logged · last config change 4d ago · revert window 30d';
export const psFooterButtonLabel = 'View all config changes in audit log →';

export const psPageData: PsPageData = {
  meta: psPageMeta,
  searchPlaceholder: psSearchPlaceholder,
  headerActions: psHeaderActions,
  categoryNavChips: psCategoryNavChips,
  categoryStubs: psCategoryStubs,
  footerMeta: psFooterMeta,
  footerButtonLabel: psFooterButtonLabel,
};

// ════════════════════════════════════════════════════════════════
// DEMO MODAL — CONFIRM SETTING CHANGE
// ════════════════════════════════════════════════════════════════

export interface PsDiffSide {
  eyebrow: string;
  value: string;
  meta: string;
}

export interface PsImpactItem {
  contentHtml: string;
}

export interface PsModalOption {
  id: string;
  checked: boolean;
  titleHtml: string;
  descHtml: string;
}

export interface PsAuditPreviewEntry {
  key: string;
  value: string;
  variant?: 'danger' | 'success';
}

export interface PsDemoModalData {
  headIcon: string;
  headEyebrow: string;
  headTitle: string;
  headDetailHtml: string;
  diffBefore: PsDiffSide;
  diffAfter: PsDiffSide;
  impactTitle: string;
  impactItems: PsImpactItem[];
  modalOptions: PsModalOption[];
  auditPreview: PsAuditPreviewEntry[];
  footerMetaHtml: string;
  footerCancelLabel: string;
  footerConfirmLabel: string;
}

export const psDemoModal: PsDemoModalData = {
  headIcon: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  headEyebrow: 'CONFIRM SETTING CHANGE · DRY-RUN PREVIEW',
  headTitle: 'Match score threshold · 60% → 65%',
  headDetailHtml: 'You\'re about to change the <strong>minimum match score</strong> that the platform uses to surface candidate-job matches to clients. This affects which candidates clients see in their searches and which automated matches the system makes. Higher threshold = fewer matches but better fit.',
  diffBefore: {
    eyebrow: 'BEFORE',
    value: '60%',
    meta: 'platform default · in effect since launch · all clients see candidate matches ≥ 60% similarity',
  },
  diffAfter: {
    eyebrow: 'AFTER',
    value: '65%',
    meta: 'stricter match · proposed by Trust & Safety · live within 5 min of confirm · reversible',
  },
  impactTitle: 'Impact preview · dry-run',
  impactItems: [
    {
      contentHtml: '<strong>47 candidate-job pairs</strong> currently visible to clients would drop out of recommended-match surfaces (scores 60-64%)',
    },
    {
      contentHtml: '<strong>12 active engagements</strong> initiated below the new threshold are unaffected · setting is forward-only',
    },
    {
      contentHtml: '<strong>~8% reduction</strong> in match volume expected based on Q1 distribution',
    },
    {
      contentHtml: '<strong>3 specialists</strong> currently managing borderline matches (62-64%) would receive in-app notification to review their pipelines',
    },
  ],
  modalOptions: [
    {
      id: 'psmo-notify-affected',
      checked: true,
      titleHtml: 'Notify 3 affected specialists via in-app + email',
      descHtml: 'includes Daniel (spec-001), Mateo (mgr-001) reports · Standard notification template · sent 5 min after confirm',
    },
    {
      id: 'psmo-staged-rollout',
      checked: false,
      titleHtml: 'Staged rollout · 25% → 50% → 100% over 48h',
      descHtml: 'recommended for changes affecting match algorithm · auto-pause on anomaly · click-through metrics monitored',
    },
    {
      id: 'psmo-schedule',
      checked: false,
      titleHtml: 'Schedule for off-peak deployment',
      descHtml: 'apply at <strong>Sunday 02:00 UTC</strong> · minimum live-user impact window · audit-logged regardless',
    },
  ],
  auditPreview: [
    { key: 'entry_id', value: 'AUD-2026-106920 (preallocated)' },
    { key: 'timestamp', value: '2026-05-11T15:14:32Z' },
    { key: 'actor', value: 'admin-dario (Super Admin)' },
    { key: 'category', value: 'modify·platform·setting' },
    { key: 'setting', value: 'platform.match.score_threshold' },
    { key: 'before', value: '60', variant: 'danger' },
    { key: 'after', value: '65', variant: 'success' },
    { key: 'reason', value: '"Trust & Safety recommended stricter match"' },
    { key: 'severity', value: 'warn' },
    { key: 'affected', value: '3 specialists notified · 47 match-pairs reflowed' },
    { key: 'reversible', value: 'true · revert within 30d preserves audit chain' },
  ],
  footerMetaHtml: '<strong>Note:</strong> this is the demo pattern. Every modify button on this page opens a real modal with the same structure. <a data-ps-action="open-audit" style="color: var(--super); text-decoration: underline; font-weight: 700;">View prior config changes</a> in the audit trail.',
  footerCancelLabel: 'Cancel',
  footerConfirmLabel: 'Confirm change',
};
