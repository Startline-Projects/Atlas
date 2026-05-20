/* Step 40 (Scope Step 39) — Onboarding tour fixture
   Welcome modal markup: admin.html lines 68049-68128
   10-step tour engine: admin.html JS lines 81188-81270
   Rendered on the /admin/onboarding route (Option A). obh-kbd class → data-ob-kbd marker. */

export interface ObOverviewRow {
  num: string;
  text: string;
  sub: string;
}

export interface ObWelcomeData {
  heroEyebrow: string;
  heroTitle: string;
  heroMetaHtml: string;
  bodyProse: string[];
  overviewRows: ObOverviewRow[];
  footnoteHtml: string;
  footMeta: string;
  skipLabel: string;
  startLabel: string;
}

export type ObBadgeIconKey = 'circle';

export interface ObTourStepBadge {
  label: string;
  iconKey: ObBadgeIconKey;
}

export interface ObTourStep {
  eyebrow: string;
  badge: ObTourStepBadge | null;
  title: string;
  proseHtml: string;
  hintHtml: string;
  hashTarget: string;
  hashLabel: string;
  finish?: boolean;
}

export interface ObFinishBanner {
  title: string;
  sub: string;
}

export const obWelcomeData: ObWelcomeData = {
  heroEyebrow: 'ATLAS ADMIN · ONBOARDING',
  heroTitle: 'Welcome, Aïsha.',
  heroMetaHtml:
    '<strong>10-step tour</strong> · approx. 8 minutes · pick up where you leave off · skip any step',
  bodyProse: [
    "You've been given the <strong>Compliance Admin</strong> role. You can review users, run investigations, handle DSRs and legal requests, sign off on suspensions, and access the audit hash chain. You <em>cannot</em> alter platform configuration or fee structures — that's reserved for Super Admins.",
    "Here's what we'll walk through:",
  ],
  overviewRows: [
    { num: '1', text: 'Dashboard', sub: 'mission control · alerts · queues' },
    {
      num: '2',
      text: 'User management',
      sub: 'candidates · clients · specialists · admins',
    },
    {
      num: '3',
      text: 'Operations',
      sub: 'engagements · jobs · disputes · reviews',
    },
    {
      num: '4',
      text: 'Trust & Safety',
      sub: 'fraud · incidents · suspensions',
    },
    { num: '5', text: 'Finance', sub: 'transactions · fees · refunds · tax' },
    { num: '6', text: 'Compliance', sub: 'legal · DSR · audit · privacy' },
    {
      num: '7',
      text: 'Platform configuration',
      sub: 'settings · templates · help · integrations',
    },
    {
      num: '8',
      text: 'Internal operations',
      sub: 'performance · incidents · comms · KB',
    },
  ],
  footnoteHtml:
    'Plus 2 final steps on the <strong>cross-cutting tools</strong> — notifications, global search, and what to do next. You can always restart from your avatar menu &gt; "Restart onboarding tour".',
  footMeta: 'Progress is auto-saved · audit-logged',
  skipLabel: 'Skip tour',
  startLabel: 'Start the tour →',
};

export const obTourSteps: ObTourStep[] = [
  {
    eyebrow: 'SECTION · DASHBOARD',
    badge: null,
    title: 'Your mission control dashboard',
    proseHtml:
      "The dashboard is the first thing you see each day. It shows critical alerts at the top, your queues, the team's pulse, and shortcuts to the work that needs attention. The 3 alert cards represent the critical items currently open across Atlas.",
    hintHtml:
      '<strong>Tip:</strong> Press <span data-ob-kbd>⌘K</span> from anywhere to open global search.',
    hashTarget: '/admin/dashboard',
    hashLabel: 'Go to Dashboard →',
  },
  {
    eyebrow: 'SECTION · USER MANAGEMENT',
    badge: { label: 'Users · 6 sub-sections', iconKey: 'circle' },
    title: 'Users · candidates, clients, specialists, admins',
    proseHtml:
      'Every person on Atlas is a user — split into candidates (talent), clients (companies hiring), specialists (the team supporting matches), managers, and admins. You can review profiles, edit roles, suspend accounts, and trace every action they took via the audit chain.',
    hintHtml:
      '<strong>Try:</strong> Click any user from the list to see their profile + activity + cross-references to disputes, transactions, and audit logs.',
    hashTarget: '/admin/users/candidates',
    hashLabel: 'Go to Users →',
  },
  {
    eyebrow: 'SECTION · OPERATIONS',
    badge: { label: 'Ops · 5 sub-sections', iconKey: 'circle' },
    title: 'Operations · engagements, jobs, disputes, reviews',
    proseHtml:
      'The day-to-day work flowing through Atlas: <strong>engagements</strong> (active client-talent placements), <strong>jobs</strong> (open postings), <strong>disputes</strong> (when things go wrong — like DSP-2026-0144), <strong>reviews</strong> (post-engagement ratings), and the <strong>reports</strong> dashboard for revenue + GMV.',
    hintHtml:
      '<strong>Note:</strong> Disputes are 7-day SLA. Escalations land in the queue immediately.',
    hashTarget: '/admin/operations/engagements',
    hashLabel: 'Go to Operations →',
  },
  {
    eyebrow: 'SECTION · TRUST & SAFETY',
    badge: { label: 'T&S · 4 sub-sections', iconKey: 'circle' },
    title: 'Trust & Safety · fraud, incidents, suspensions',
    proseHtml:
      'Where threats are detected, investigated, and acted on. Fraud cases like <strong>FA-2026-0042 (the Vorona ring)</strong> are worked here, alongside internal security incidents, suspensions, and suspicious-activity reports. The synchronized-ban workflow lives here.',
    hintHtml:
      '<strong>Critical:</strong> Coordinated-ring response follows the <strong>v6 SOP</strong> in the Knowledge Base — opens in 4 phases over 6 hours.',
    hashTarget: '/admin/trust-safety/fraud-abuse',
    hashLabel: 'Go to Trust & Safety →',
  },
  {
    eyebrow: 'SECTION · FINANCE',
    badge: { label: 'Finance · 4 sub-sections', iconKey: 'circle' },
    title: 'Finance · transactions, fees, refunds, tax',
    proseHtml:
      'Every dollar moving through Atlas. Stripe payments and Wise payouts flow through here, including refund decisions like <strong>REF-2026-0084</strong>, the fee-structure routing, and US tax forms (1099-K + 1042-S) auto-generated each season.',
    hintHtml:
      '<strong>Reminder:</strong> Refunds above $1,000 require Super Admin sign-off. Approval window: 24 hours.',
    hashTarget: '/admin/finance/transactions',
    hashLabel: 'Go to Finance →',
  },
  {
    eyebrow: 'SECTION · COMPLIANCE',
    badge: { label: 'Compliance · 5 sub-sections', iconKey: 'circle' },
    title: 'Compliance · legal, DSR, audit, privacy',
    proseHtml:
      "Your home base as DPO. Legal requests (subpoenas like LR-2026-0023), Data Subject Rights (Marek's Art.17 deletion DSR-2026-0089), the audit hash chain (AUD-2026-106102), privacy reports, and regulatory submissions across 6 jurisdictions.",
    hintHtml:
      '<strong>DSR clock:</strong> 30 days for GDPR Art.17. Auto-flagged in your queue from day 1.',
    hashTarget: '/admin/compliance/data-subject-rights',
    hashLabel: 'Go to Compliance →',
  },
  {
    eyebrow: 'SECTION · PLATFORM CONFIG',
    badge: { label: 'Config · 6 sub-sections', iconKey: 'circle' },
    title: 'Platform configuration · settings, templates, help',
    proseHtml:
      'How Atlas itself is shaped: platform <strong>settings</strong> (24 toggles), <strong>categories &amp; skills</strong> (847 skills in 10 role families), <strong>integrations</strong> (Stripe, Wise, Twilio, etc.), email/SMS <strong>templates</strong>, and <strong>Help Center content</strong> for candidates and clients.',
    hintHtml:
      '<strong>Heads-up:</strong> You can read everything here but only Super Admins can change platform settings.',
    hashTarget: '/admin/platform/settings',
    hashLabel: 'Go to Platform config →',
  },
  {
    eyebrow: 'SECTION · INTERNAL OPS',
    badge: { label: 'Internal · 4 sub-sections', iconKey: 'circle' },
    title: 'Internal operations · team performance, KB',
    proseHtml:
      'The team-facing surfaces. The <strong>performance dashboard</strong> shows the manager (Mateo) and 11 specialists with composite grades, the <strong>incident reports</strong> track engineering outages, <strong>internal communications</strong> is for team announcements, and the <strong>Knowledge Base</strong> holds all SOPs and runbooks.',
    hintHtml:
      '<strong>Tip:</strong> The Vorona response SOP lives in the KB. Read it once — phase 3 is the lesson from FA-0042.',
    hashTarget: '/admin/internal/performance',
    hashLabel: 'Go to Internal ops →',
  },
  {
    eyebrow: 'SECTION · CROSS-CUTTING TOOLS',
    badge: { label: 'Always available', iconKey: 'circle' },
    title: 'Notifications, search, audit · everywhere you go',
    proseHtml:
      'Three tools work across every page: the <strong>🔔 bell</strong> shows critical notifications (FA-0042, REF-0084, INC-058 right now), the <strong>🔍 search bar</strong> finds anything (try "vorona" — 18 results across 7 categories), and every action you take is recorded in the <strong>audit chain</strong>.',
    hintHtml:
      '<strong>Shortcut:</strong> <span data-ob-kbd>⌘K</span> for search · the bell icon top-right · audit is at Compliance → Audit logs.',
    hashTarget: '/admin/notifications',
    hashLabel: 'Go to Notifications →',
  },
  {
    eyebrow: 'TOUR COMPLETE',
    badge: null,
    title: "You're ready to start.",
    proseHtml:
      "That's the tour. Your first task is waiting: <strong>review DSR-2026-0089</strong> in your queue — Marek's Art.17 deletion request, cross-linked to FA-2026-0042. The Art.17(3)(e) legitimate-interest exemption likely applies — you'll want to consult counsel before responding.",
    hintHtml:
      '<strong>Need a refresher?</strong> Restart this tour anytime from your avatar menu &gt; "Restart onboarding tour". Tour history is saved to your audit trail.',
    hashTarget: '/admin/compliance/data-subject-rights/DSR-2026-0089',
    hashLabel: 'Review DSR-2026-0089 →',
    finish: true,
  },
];

export const obFinishBanner: ObFinishBanner = {
  title: 'Tour complete',
  sub: 'Tour history saved to your audit trail',
};
