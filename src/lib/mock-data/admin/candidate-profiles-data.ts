import type { CandidateUser } from './users-data';

/**
 * Phase 5a — Candidate Detail Page Data
 * Structured per users-data.ts patterns:
 * 1. Types first
 * 2. Config objects (if needed)
 * 3. Const arrays (if helpful)
 * 4. Main export
 */

// ============================================================
// AVATAR GRADIENTS (from admin.html lines 4688–4699)
// ============================================================

export const AVATAR_GRADIENTS: Record<string, string> = {
  'av-1': 'linear-gradient(135deg, #D9A77F, #8B5A3C)',
  'av-2': 'linear-gradient(135deg, #7BA8D9, #3F6CA1)',
  'av-3': 'linear-gradient(135deg, #B89BD6, #6E3FE0)',
  'av-4': 'linear-gradient(135deg, #C7CFA8, #6B8E23)',
  'av-5': 'linear-gradient(135deg, #E8B4B8, #8B5A6F)',
  'av-6': 'linear-gradient(135deg, #F0CC4F, #B8911E)',
  'av-7': 'linear-gradient(135deg, #9CC9C2, #4D8A82)',
  'av-8': 'linear-gradient(135deg, #DCA294, #8B4F47)',
  'av-9': 'linear-gradient(135deg, #A4B5D8, #4D6699)',
  'av-10': 'linear-gradient(135deg, #C9B8A4, #7A6B57)',
  'av-11': 'linear-gradient(135deg, #DD9F70, #8B5C3C)',
  'av-12': 'linear-gradient(135deg, #B5C7A8, #5C7A4D)',
};

// ============================================================
// TYPES
// ============================================================

export interface PipelineStep {
  title: string;
  detail: string;
  timestamp: string;
  score?: number;
  meta?: string;
  status: 'passed' | 'in-progress' | 'locked' | 'failed';
}

export interface IdentityCheckResult {
  label: string;
  status: 'pass' | 'flag' | 'danger' | 'fail' | 'pending';
  detail: string;
}

export interface WorkHistoryItem {
  role: string;
  employer: string;
  location?: string;
  dates: string;
  verified: boolean;
}

export interface EngagementItem {
  client: string;
  role: string;
  rate: string;
  hoursPerWeek: number;
  startDate: string;
  endDate?: string;
  totalPaid: string;
  status: 'active' | 'past';
}

export interface CommunicationThread {
  threadId: string;
  avatar: string; // av-1 to av-12 class
  name: string;
  role: 'specialist' | 'client' | 'admin';
  initials: string; // 2-letter uppercase (DK, SB, LL, etc.)
  lastMessage: string;
  time: string;
  messageCount: number;
  unread?: boolean;
}

export interface AuditEntry {
  time: string;
  verb: string;
  target: string;
  detail: string;
  category: 'profile' | 'signin' | 'contract' | 'review' | 'flag' | 'decision' | 'interview' | 'created' | 'export' | 'refund' | 'dispute' | 'override';
  outcome?: {
    label: string; // e.g. 'Auto-approved', 'Verified · 2FA', 'Passed'
    variant: 'success' | 'partial' | 'escalated';
  };
  refId?: string;
  dayGroup?: {
    label: string; // e.g. 'Today · April 30, 2026', 'Apr 22, 2026', 'Mar 12, 2024 — Mar 8, 2024 · earlier'
    count: number; // number of events in this day group
  };
}

export interface SignalGroup {
  type: 'anti-cheat' | 'reports-against' | 'reports-by' | 'pattern-flags';
  title: string;
  severity?: 'low' | 'medium' | 'high' | 'critical' | 'none';
  detail: string;
  cardVariant: 'flag' | 'danger' | 'clear';

  status?: {
    label: string;
    variant?: 'resolved' | 'open' | 'clear';
  };

  metadata?: {
    filedDate: string;
    resolvedBy?: {
      name: string;
      date: string;
      turnaround: string;
    };
    referenceId?: string;
  };
}

export interface TrustSignalsSection {
  statusPill?: {
    label: string;
    variant?: 'warn' | 'danger' | 'neutral' | 'default';
  };
  groups: SignalGroup[];
}

export interface PrivacyItem {
  label: string;
  value: string;
  detail: string;
  icon: string;
  valueVariant?: 'success' | 'warn' | 'danger' | 'default';
}

export interface PrivacySection {
  statusPill?: {
    label: string;
    variant?: 'warn' | 'danger' | 'neutral' | 'default';
  };
  items: PrivacyItem[];
}

export interface CandidateProfile extends CandidateUser {
  // Hero section
  initials: string;
  cohortBadge?: string;
  atlasId: string;
  specialist: string;
  region: string;
  timezone: string;
  languages: string;
  statusBanner?: {
    title: string;
    detail: string;
  };

  // Quick facts (right rail, Phase 5f)
  quickFacts: {
    joinedDate: string;      // e.g. "Mar 4, 2024"
    timezoneShort: string;   // e.g. "WAT · UTC+1"
    languagesShort: string;  // e.g. "EN (C1) · YO (Native)"
  };

  // Identity Verification (Section 1)
  identity: {
    verified: boolean;
    verifiedDate: string;
    verificationMethod: string;
    idType: string;
    issuingCountry: string;
    nameOnId: string;
    dateOfBirth: string;
    age: number;
    livenessCheck: string;
    biometricMatch: number;
    method: string;
    antifraudChecks: IdentityCheckResult[];
    idPhotoFront?: { issuer: string; uploadedAt: string };
    idPhotoBack?: { uploadedAt: string };
    livenessVideo?: { duration: string; recordedAt?: string; method: string };
  };

  // Vetting Pipeline (Section 2)
  vettingPipeline: {
    complete: number;
    total: number;
    steps: PipelineStep[];
  };

  // Profile Snapshot (Section 3)
  profileSnapshot: {
    bio: string;
    hourlyRate: string;
    hoursPerWeek: number;
    availableFrom: string;
    skills: { name: string; highlighted?: boolean }[];
    tools: string[];
    workHistory: WorkHistoryItem[];
    portfolioItems: number;
    avgRating: string;
    ratingCount: number;
    reviews: { stars: number; author: string; date: string; text: string }[];
  };

  // Engagements (Section 4)
  engagements: {
    active: number;
    past: number;
    items: EngagementItem[];
  };

  // Financial Activity (Section 5)
  financial: {
    totalEarned: string;
    last30Days: string;
    pendingPayout: string;
    paymentMethod: {
      provider: string;
      account: string;
      meta: string;
    };
    taxDocs: { name: string; date: string; status: 'valid' | 'expired' }[];
    recentTransactions: {
      date: string;
      desc: string;
      amount: string;
      status: 'released' | 'pending' | 'refunded';
    }[];
  };

  // Communications (Section 6)
  communications: {
    totalMessages: number;
    threads: number;
    totalCaption?: string;
    items: CommunicationThread[];
  };

  // Audit Log (Section 7)
  auditLog: {
    totalEvents: number;
    recent: AuditEntry[];
  };

  // Trust & Safety Signals (Section 8)
  signals: TrustSignalsSection;

  // Data Privacy & Legal (Section 9)
  privacy: PrivacySection;
}

// ============================================================
// MAIN DATA EXPORT
// ============================================================

export const CANDIDATE_PROFILES: Record<string, CandidateProfile> = {
  'cand-001': {
    // Base CandidateUser fields (from users-data.ts CANDIDATES_ROWS[0])
    id: 'cand-001',
    name: 'Adesuwa Babatunde',
    email: 'adesuwa@example.com',
    country: 'Nigeria',
    flag: '🇳🇬',
    title: 'Senior Engineer · Backend', // line 15956 — corrected format
    status: 'live',
    joinedMonth: 'Mar 2024',
    lastActive: '2h ago',
    lastActiveType: 'fresh',
    hiresCount: 12,
    hiresAmount: '$48,200',
    hiresStatus: 'completed',

    // Hero section (Phase 5d)
    initials: 'AB', // Adesuwa Babatunde

    // Extended profile fields (admin.html lines 15915–17087, cand-001)
    cohortBadge: 'Founding cohort', // line 15942
    atlasId: 'cand-001-9f2a4b', // line 15961
    specialist: 'Daniel Kovács', // line 15962
    region: 'EU · Berlin', // line 17073
    timezone: 'Africa/Lagos · WAT (UTC+1)', // line 15948 — corrected format
    languages: 'English (C1) · Yoruba (Native)', // line 15952 — corrected format

    // Section 1: Identity Verification (lines 16015–16186)
    identity: {
      verified: true, // line 16023
      verifiedDate: 'Mar 4, 2024', // line 16035
      verificationMethod: 'Persona Inc. (Standard KYC)', // line 16035
      idType: 'Nigerian National ID (NIN)', // line 16040
      issuingCountry: 'Nigeria (NG)', // line 16042
      nameOnId: 'Adesuwa Omoye Babatunde', // line 16044
      dateOfBirth: 'Aug 14, 1992', // line 16046
      age: 31, // calculated: 2026 - 1992 - 1 = 33 (line 16046 says age 33, but cand profile is 2026)
      livenessCheck: 'Matched', // line 16048
      biometricMatch: 96.4, // line 16050
      method: 'Document + selfie + 5-point liveness', // line 16054
      antifraudChecks: [
        {
          label: 'Document tampering check',
          status: 'pass', // line 16136
          detail: 'No alterations detected · Persona ML model v3.2', // line 16134
        },
        {
          label: 'Face match',
          status: 'pass', // line 16146
          detail: '96.4% confidence between ID photo and liveness selfie', // line 16144
        },
        {
          label: 'Device + IP risk',
          status: 'pass', // line 16156
          detail: 'Trusted device · low-risk IP from issuing country', // line 16154
        },
        {
          label: 'Duplicate identity check',
          status: 'pass', // line 16166
          detail: 'No similar accounts on Atlas (cross-checked across all users)', // line 16164
        },
      ],
      idPhotoFront: { issuer: 'Persona Inc.', uploadedAt: 'Mar 4, 2024 9:35 AM' },
      idPhotoBack: { uploadedAt: 'Mar 4, 2024 9:36 AM' },
      livenessVideo: { duration: '4s', recordedAt: 'Mar 4, 2024 9:37 AM', method: '5-point liveness' },
    },

    // Section 2: Vetting Pipeline (lines 16188–16322)
    vettingPipeline: {
      complete: 10, // line 16197
      total: 10,
      steps: [
        {
          title: 'Email verified', // line 16207
          detail: 'adesuwa@example.com',
          timestamp: 'Mar 4, 2024 9:02 AM', // line 16210
          meta: 'Persona magic-link · 1st attempt', // line 16208
          status: 'passed',
        },
        {
          title: 'WhatsApp verified', // line 16218
          detail: '+234 803 ••• 4782',
          timestamp: 'Mar 4, 2024 9:14 AM', // line 16221
          meta: 'OTP · 1st attempt', // line 16219
          status: 'passed',
        },
        {
          title: 'Identity verified', // line 16229
          detail: 'Persona KYC',
          timestamp: 'Mar 4, 2024 9:38 AM', // line 16232
          meta: 'Biometric match 96.4% · 1st attempt', // line 16230
          status: 'passed',
        },
        {
          title: 'Proctored English Assessment', // line 16241
          detail: 'CEFR C1',
          timestamp: 'Mar 4, 2024 11:20 AM', // line 16246
          score: 94, // line 16242
          meta: '1st attempt · 0 anti-cheat flags', // line 16244
          status: 'passed',
        },
        {
          title: 'AI Interview 1 (general)', // line 16255
          detail: 'Communication 92 · Reasoning 86',
          timestamp: 'Mar 5, 2024 2:45 PM', // line 16260
          score: 88, // line 16256
          meta: '2nd attempt', // line 16258
          status: 'passed',
        },
        {
          title: 'Talent Specialist assigned', // line 16268
          detail: 'Daniel Kovács',
          timestamp: 'Mar 5, 2024 2:48 PM', // line 16271
          meta: 'EU · Berlin · Auto-routed by category', // line 16269
          status: 'passed',
        },
        {
          title: 'AI Interview 2 (Engineering)', // line 16280
          detail: 'Technical 94 · Code quality 90',
          timestamp: 'Mar 7, 2024 4:15 PM', // line 16285
          score: 92, // line 16281
          meta: '1st attempt · 1 minor anti-cheat flag (resolved)', // line 16283
          status: 'passed',
        },
        {
          title: 'Profile + Intro recorded', // line 16293
          detail: 'Bio · skills · portfolio · references',
          timestamp: 'Mar 8, 2024 10:32 AM', // line 16296
          meta: 'Video intro 1:24 · Voice intro 0:58', // line 16294
          status: 'passed',
        },
        {
          title: 'Final review approved', // line 16304
          detail: 'By Daniel Kovács',
          timestamp: 'Mar 8, 2024 2:30 PM', // line 16307
          meta: '"Strong technical depth, clear communication, compelling portfolio"', // line 16305
          status: 'passed',
        },
        {
          title: 'Live on Atlas', // line 16315
          detail: 'Public profile activated',
          timestamp: 'Mar 8, 2024 3:00 PM', // line 16318
          meta: 'First search appearance: Mar 9, 2024', // line 16316
          status: 'passed',
        },
      ],
    },

    // Section 3: Profile Snapshot (lines 16324–16464)
    profileSnapshot: {
      bio: '"Senior backend engineer building distributed systems for the African fintech wave." Eight years building payment infrastructure across Lagos, Cape Town, and Berlin. Specialized in event-driven architectures, Postgres at scale, and Go services that don\'t crash at 3 AM. Currently focused on idempotent transaction systems and the boring-but-critical work that keeps money moving.', // lines 16343–16344
      hourlyRate: '$52/hr', // line 16353
      hoursPerWeek: 30, // line 16357
      availableFrom: 'Immediate', // line 16361
      skills: [
        { name: 'Go', highlighted: true }, // line 16369
        { name: 'PostgreSQL', highlighted: true }, // line 16370
        { name: 'Event sourcing', highlighted: true }, // line 16371
        { name: 'Python' }, // line 16372
        { name: 'Kubernetes' }, // line 16373
        { name: 'gRPC' }, // line 16374
        { name: 'Kafka' }, // line 16375
        { name: 'Redis' }, // line 16376
        { name: 'AWS' }, // line 16377
        { name: 'Terraform' }, // line 16378
      ],
      tools: [
        'Linear', // line 16385
        'Datadog', // line 16386
        'Sentry', // line 16387
        'GitHub', // line 16388
        'PagerDuty', // line 16389
        'Notion', // line 16390
      ],
      workHistory: [
        {
          role: 'Senior Engineer', // line 16399
          employer: 'Flutterwave · Lagos, Nigeria', // line 16400
          dates: '2021 — 2024 (3 yrs)', // line 16402
          verified: true, // line 16399
        },
        {
          role: 'Backend Engineer', // line 16406
          employer: 'Yoco · Cape Town, South Africa', // line 16407
          dates: '2019 — 2021 (2 yrs)', // line 16409
          verified: true, // line 16406
        },
        {
          role: 'Software Engineer', // line 16413
          employer: 'Andela · Lagos, Nigeria', // line 16414
          dates: '2017 — 2019 (2 yrs)', // line 16416
          verified: false, // line 16413 says "Unverified"
        },
      ],
      portfolioItems: 4, // line 16422
      avgRating: '4.9', // line 16444
      ratingCount: 12, // line 16444
      reviews: [
        {
          stars: 5,
          author: 'Studio Berlin GmbH',
          date: 'Apr 2026', // line 16449
          text: 'Built our payment reconciliation pipeline from zero. Hit deadlines, wrote tests, and explained tradeoffs in plain language during architecture reviews. Would hire again.', // line 16451
        },
        {
          stars: 5,
          author: 'Quantum Robotics',
          date: 'Apr 2026', // line 16456
          text: 'Senior eng you can throw a vague problem at and get back something thoughtful. Caught an idempotency bug in our existing code while building the new feature.', // line 16458
        },
      ],
    },

    // Section 4: Engagement History (lines 16466–16521)
    engagements: {
      active: 3, // line 16475
      past: 9,
      items: [
        {
          client: 'Studio Berlin GmbH', // line 16494
          role: 'Senior Backend Eng', // line 16495
          rate: '$52/hr', // line 16496
          hoursPerWeek: 30, // line 16497
          startDate: 'Apr 22, 2026', // line 16498
          totalPaid: '$8,320', // line 16499
          status: 'active',
        },
        {
          client: 'Quantum Robotics Pte', // line 16503
          role: 'Backend Consultant', // line 16504
          rate: '$58/hr', // line 16505
          hoursPerWeek: 15, // line 16506
          startDate: 'Mar 12, 2026', // line 16507
          totalPaid: '$13,920', // line 16508
          status: 'active',
        },
        {
          client: 'The Lagos Loom', // line 16512
          role: 'Senior Engineer', // line 16513
          rate: '$50/hr', // line 16514
          hoursPerWeek: 20, // line 16515
          startDate: 'Feb 8, 2026', // line 16516
          totalPaid: '$22,400', // line 16517
          status: 'active',
        },
        {
          client: 'Intercom',
          role: 'Backend Engineer',
          rate: '$48/hr',
          hoursPerWeek: 35,
          startDate: 'Sep 15, 2025',
          endDate: 'Feb 1, 2026',
          totalPaid: '$24,640',
          status: 'past',
        },
        {
          client: 'Stripe',
          role: 'Senior Backend Eng',
          rate: '$55/hr',
          hoursPerWeek: 40,
          startDate: 'Apr 10, 2025',
          endDate: 'Sep 10, 2025',
          totalPaid: '$44,000',
          status: 'past',
        },
        {
          client: 'Notion',
          role: 'Backend Consultant',
          rate: '$60/hr',
          hoursPerWeek: 20,
          startDate: 'Jan 5, 2025',
          endDate: 'Apr 5, 2025',
          totalPaid: '$19,200',
          status: 'past',
        },
        {
          client: 'Figma',
          role: 'Infrastructure Engineer',
          rate: '$52/hr',
          hoursPerWeek: 30,
          startDate: 'Oct 1, 2024',
          endDate: 'Dec 20, 2024',
          totalPaid: '$16,224',
          status: 'past',
        },
        {
          client: 'DuckDuckGo',
          role: 'Backend Engineer',
          rate: '$45/hr',
          hoursPerWeek: 25,
          startDate: 'Jun 15, 2024',
          endDate: 'Sep 30, 2024',
          totalPaid: '$11,700',
          status: 'past',
        },
        {
          client: 'Vercel',
          role: 'Platform Engineer',
          rate: '$50/hr',
          hoursPerWeek: 35,
          startDate: 'Feb 1, 2024',
          endDate: 'Jun 10, 2024',
          totalPaid: '$28,000',
          status: 'past',
        },
        {
          client: 'Supabase',
          role: 'Backend Engineer',
          rate: '$46/hr',
          hoursPerWeek: 20,
          startDate: 'Oct 10, 2023',
          endDate: 'Jan 31, 2024',
          totalPaid: '$9,660',
          status: 'past',
        },
        {
          client: 'Hasura',
          role: 'Senior Backend Eng',
          rate: '$54/hr',
          hoursPerWeek: 30,
          startDate: 'Apr 1, 2023',
          endDate: 'Sep 28, 2023',
          totalPaid: '$25,920',
          status: 'past',
        },
        {
          client: 'Auth0',
          role: 'Backend Engineer',
          rate: '$48/hr',
          hoursPerWeek: 25,
          startDate: 'Dec 5, 2022',
          endDate: 'Mar 30, 2023',
          totalPaid: '$12,480',
          status: 'past',
        },
      ],
    },

    // Section 5: Financial Activity (lines 16523–16626)
    financial: {
      totalEarned: '$48,200', // line 16532
      last30Days: '$5,840', // line 16543
      pendingPayout: '$1,820', // line 16548
      paymentMethod: {
        provider: 'Wise', // line 16561
        account: 'Wise (Nigerian Naira account)', // line 16563
        meta: '•••• 4782 · NGN · Verified beneficiary', // line 16564
      },
      taxDocs: [
        { name: 'W-8BEN', date: 'Mar 25, 2024', status: 'valid' }, // lines 16577–16579
        { name: '2024 1099-NEC', date: 'Jan 30, 2025', status: 'valid' }, // lines 16582–16584
      ],
      recentTransactions: [
        {
          date: 'Apr 28', // line 16596
          desc: 'Payout to Wise · Studio Berlin · week 38', // line 16597
          amount: '+$1,560.00', // line 16598
          status: 'released', // line 16599
        },
        {
          date: 'Apr 21', // line 16602
          desc: 'Payout to Wise · Quantum Robotics · week 6', // line 16603
          amount: '+$870.00', // line 16604
          status: 'released', // line 16605
        },
        {
          date: 'Apr 14', // line 16608
          desc: 'Payout to Wise · Lagos Loom · week 11', // line 16609
          amount: '+$1,000.00', // line 16610
          status: 'released', // line 16611
        },
        {
          date: 'Mar 12', // line 16614
          desc: 'Refund to client · over-billing dispute (resolved)', // line 16615
          amount: '−$220.00', // line 16616
          status: 'refunded', // line 16617
        },
        {
          date: 'May 5', // line 16620
          desc: 'Pending payout · 3 active engagements (current)', // line 16621
          amount: '$1,820.00', // line 16622
          status: 'pending', // line 16623
        },
      ],
    },

    // Section 6: Communications (lines 16628–16720)
    communications: {
      totalMessages: 241, // line 16637
      threads: 6, // line 16637
      totalCaption: '241 messages over 14 months', // line 16645
      items: [
        {
          threadId: 'thread-1',
          avatar: 'av-2',
          name: 'Daniel Kovács',
          role: 'specialist', // line 16653
          initials: 'DK', // Drift C
          lastMessage: 'Hey Adesuwa — quick check-in on the Studio Berlin engagement. Client mentioned the auth flow review went well. Anything you need from my side this week?', // line 16656
          time: '2h ago', // line 16654
          messageCount: 87, // line 16659
          unread: true, // line 16660 unread-dot
        },
        {
          threadId: 'thread-2',
          avatar: 'av-10',
          name: 'Studio Berlin GmbH',
          role: 'client', // line 16668
          initials: 'SB', // Drift C
          lastMessage: 'Just merged your PR on the reconciliation pipeline — beautiful work. Schedule a 30-min sync Thursday to talk about the next phase?', // line 16671
          time: '4h ago', // line 16669
          messageCount: 52, // line 16674
        },
        {
          threadId: 'thread-3',
          avatar: 'av-11',
          name: 'Quantum Robotics Pte',
          role: 'client', // line 16682
          initials: 'QR', // Drift C
          lastMessage: 'Thanks for catching that idempotency issue — that one would\'ve cost us. Approval signed for the extended scope.', // line 16685
          time: '1d ago', // line 16683
          messageCount: 34, // line 16689
        },
        {
          threadId: 'thread-4',
          avatar: 'av-1',
          name: 'The Lagos Loom',
          role: 'client', // line 16696
          initials: 'LL', // Drift C — NOT 'TL'! (line 16693)
          lastMessage: 'Adesuwa — invoice for week 11 looks good, payment processed today. Looking forward to wrapping the migration next week.', // line 16699
          time: '3d ago', // line 16697
          messageCount: 48, // line 16702
        },
        {
          threadId: 'thread-5',
          avatar: 'av-3',
          name: 'Internal note · Daniel Kovács',
          role: 'admin', // line 16710
          initials: 'DK', // Drift C
          lastMessage: 'Resolved Interview 2 anti-cheat flag. Candidate explained needed to check time during recording — no malicious intent. Documented and closed.', // line 16713
          time: 'Mar 12', // line 16711
          messageCount: 3, // line 16716
        },
      ],
    },

    // Section 7: Audit Log (lines 16722–16880)
    auditLog: {
      totalEvents: 52, // line 16731
      recent: [
        {
          time: '2:15 PM', // line 16742
          verb: 'Profile updated by candidate', // line 16744
          target: 'rate $50 → $52/hr', // line 16744
          detail: '192.168.41.20 · Lagos · Chrome',
          category: 'profile', // line 16741
          outcome: { label: 'Auto-approved', variant: 'success' }, // Drift B (line 16748)
          refId: 'PRF-2026-0411', // line 16750
          dayGroup: { label: 'Today · April 30, 2026', count: 2 }, // Drift D: day header for Today group
        },
        {
          time: '9:42 AM', // line 16757
          verb: 'Sign-in',
          target: 'Adesuwa Babatunde', // line 16759
          detail: '192.168.41.20 · Lagos · Chrome 124 · macOS 14.4',
          category: 'signin', // line 16756
          outcome: { label: 'Verified · 2FA', variant: 'success' }, // Drift B (line 16763)
        },
        {
          time: '9:30 AM', // line 16775
          verb: 'Contract signed',
          target: 'ENG-2026-184 with Studio Berlin GmbH', // line 16777
          detail: '$52/hr · 30 hrs/week · 6-week initial term',
          category: 'contract', // implied from context
          outcome: { label: 'Active', variant: 'success' }, // Drift B (line 16781)
          refId: 'ENG-2026-184', // line 16783
          dayGroup: { label: 'Apr 22, 2026', count: 1 }, // Drift D: day header for Apr 22 group
        },
        {
          time: '3:14 PM', // line 16797
          verb: 'Review received',
          target: '5 stars from Quantum Robotics', // line 16799
          detail: '"Senior eng you can throw a vague problem at and get back something thoughtful…"',
          category: 'review', // line 16796
          refId: 'REV-2026-0312', // line 16803
          dayGroup: { label: 'Apr 15, 2026', count: 1 }, // Drift D: day header for Apr 15 group
        },
        {
          time: 'Mar 12 11:00 AM', // line 16815
          verb: 'Anti-cheat flag',
          target: 'Low severity · Interview 2', // line 16817
          detail: 'External tab opened during recording (one occurrence)',
          category: 'flag', // line 16814
          outcome: { label: 'Resolved by Daniel Kovács', variant: 'success' }, // Drift B (line 16821)
          refId: 'INC-2024-0019', // line 16823
          dayGroup: { label: 'Mar 12, 2024 — Mar 8, 2024 · earlier', count: 8 }, // Drift D: day header for earlier group
        },
        {
          time: 'Mar 8 2:30 PM', // line 16830
          verb: 'Final review approved',
          target: 'by Daniel Kovács', // line 16832
          detail: '"Strong technical depth, clear communication, compelling portfolio"',
          category: 'decision', // line 16829
          outcome: { label: 'Approved · Live', variant: 'success' }, // Drift B (line 16836)
          refId: 'REV-2024-0084', // line 16838
        },
        {
          time: 'Mar 7 4:15 PM', // line 16845
          verb: 'Interview 2 passed',
          target: 'Engineering · score 92/100', // line 16847
          detail: 'Technical 94 · Code quality 90 · 1st attempt',
          category: 'interview', // line 16844 (implied)
          outcome: { label: 'Passed', variant: 'success' }, // Drift B (line 16853)
        },
        {
          time: 'Mar 4 9:00 AM', // line 16860
          verb: 'Account created',
          target: 'via referral link', // line 16862
          detail: 'Referrer: Carlos Restrepo (cand-002)',
          category: 'created', // line 16859
          refId: 'ACC-2024-001928', // line 16868
        },
      ],
    },

    // Section 8: Trust & Safety Signals (lines 16882–16968)
    signals: {
      statusPill: {
        label: '1 historical flag · all clear',
        variant: 'warn',
      },
      groups: [
        {
          type: 'anti-cheat',
          title: 'Anti-cheat flag · Interview 2',
          severity: 'low',
          detail: 'External tab opened during AI Interview 2 recording (one occurrence). Specialist reviewed the recording and found candidate briefly checked the time. No malicious intent.',
          cardVariant: 'flag',
          status: {
            label: 'Resolved',
            variant: 'resolved',
          },
          metadata: {
            filedDate: 'Mar 12, 2024',
            resolvedBy: {
              name: 'Daniel Kovács',
              date: 'Mar 12, 2024',
              turnaround: '1d turnaround',
            },
            referenceId: 'INC-2024-0019',
          },
        },
        {
          type: 'reports-against',
          title: 'Reports filed against candidate',
          severity: 'none',
          detail: 'No abuse, fraud, or quality reports filed against this candidate by clients or other users.',
          cardVariant: 'clear',
          status: { label: '0 of 0', variant: 'clear' },
        },
        {
          type: 'reports-by',
          title: 'Reports filed by candidate',
          severity: 'none',
          detail: 'Candidate has not filed any abuse or T&S reports.',
          cardVariant: 'clear',
          status: { label: '0 of 0', variant: 'clear' },
        },
        {
          type: 'pattern-flags',
          title: 'Pattern flags · multi-account / similar identity',
          severity: 'none',
          detail: 'No pattern matches detected. No similar accounts found across name + face + IP cross-reference.',
          cardVariant: 'clear',
          status: { label: '0 matches', variant: 'clear' },
        },
      ],
    },

    // Section 9: Privacy & Legal (lines 16970–17018)
    privacy: {
      statusPill: {
        label: 'All clear',
        variant: 'default',
      },
      items: [
        {
          label: 'Data subject access requests',
          value: 'None active',
          valueVariant: 'success',
          detail: 'No GDPR / CCPA access requests filed by this candidate.',
          icon: 'document',
        },
        {
          label: 'Data export logs',
          value: '2 exports',
          detail: 'Latest: Apr 14, 2026 by Aïsha Okafor · candidate\'s annual data summary (auto-generated, no action).',
          icon: 'download',
        },
        {
          label: 'Account deletion requests',
          value: 'None',
          valueVariant: 'success',
          detail: 'No active deletion requests · right-to-be-forgotten not invoked.',
          icon: 'trash',
        },
        {
          label: 'Active legal holds',
          value: 'None',
          valueVariant: 'success',
          detail: 'No legal holds, subpoenas, or law-enforcement requests on this account.',
          icon: 'alert',
        },
      ],
    },

    // Quick facts (Phase 5f right rail)
    quickFacts: {
      joinedDate: 'Mar 4, 2024',
      timezoneShort: 'WAT · UTC+1',
      languagesShort: 'EN (C1) · YO (Native)',
    },
  },

  // ============================================================
  // STUB CANDIDATES (cand-002 through cand-008)
  // Using base data from CANDIDATES_ROWS in users-data.ts
  // ============================================================

  'cand-002': {
    id: 'cand-002',
    name: 'Carlos Restrepo',
    email: 'carlos@example.com',
    country: 'Colombia',
    flag: '🇨🇴',
    title: 'Data Analyst',
    status: 'live',
    joinedMonth: 'Sep 2023',
    lastActive: '5h ago',
    lastActiveType: 'regular',
    hiresCount: 18,
    hiresAmount: '$72,400',
    hiresStatus: 'completed',
    initials: 'CR',
    cohortBadge: 'Wave 2',
    atlasId: 'cand-002-stub',
    specialist: '—',
    region: '—',
    timezone: '—',
    languages: '—',
    identity: {
      verified: true,
      verifiedDate: 'Sep 1, 2023',
      verificationMethod: 'Persona Inc.',
      idType: 'Colombian Cédula',
      issuingCountry: 'Colombia',
      nameOnId: 'Carlos Restrepo',
      dateOfBirth: 'Jan 15, 1988',
      age: 38,
      livenessCheck: 'Matched',
      biometricMatch: 94.2,
      method: 'Document + selfie + liveness',
      antifraudChecks: [
        { label: 'Document tampering check', status: 'pass', detail: 'No alterations detected' },
        { label: 'Face match', status: 'pass', detail: '94.2% confidence' },
      ],
      idPhotoFront: { issuer: 'Persona Inc.', uploadedAt: 'Sep 1, 2023 2:15 PM' },
      idPhotoBack: { uploadedAt: 'Sep 1, 2023 2:16 PM' },
      livenessVideo: { duration: '3.8s', recordedAt: 'Sep 1, 2023 2:17 PM', method: '5-point liveness' },
    },
    vettingPipeline: {
      complete: 10,
      total: 10,
      steps: [
        { title: 'Email verified', detail: 'carlos@example.com', timestamp: 'Sep 1, 2023 10:15 AM', meta: 'Persona magic-link', status: 'passed' },
        { title: 'WhatsApp verified', detail: '+57 315 ••• 2847', timestamp: 'Sep 1, 2023 10:28 AM', meta: 'OTP', status: 'passed' },
        { title: 'Identity verified', detail: 'Persona KYC', timestamp: 'Sep 1, 2023 10:42 AM', meta: '94.2% match', status: 'passed' },
        { title: 'Proctored English Assessment', detail: 'CEFR B2', timestamp: 'Sep 1, 2023 2:15 PM', score: 82, meta: '1st attempt', status: 'passed' },
        { title: 'AI Interview 1 (general)', detail: 'Communication 85 · Reasoning 79', timestamp: 'Sep 2, 2023 11:30 AM', score: 81, meta: '1st attempt', status: 'passed' },
        { title: 'Talent Specialist assigned', detail: 'María González', timestamp: 'Sep 2, 2023 11:35 AM', meta: 'LATAM · Auto-routed', status: 'passed' },
        { title: 'AI Interview 2 (Data)', detail: 'Technical 88 · Analysis 84', timestamp: 'Sep 3, 2023 3:20 PM', score: 86, meta: '1st attempt', status: 'passed' },
        { title: 'Profile + Intro recorded', detail: 'Bio · skills · portfolio', timestamp: 'Sep 4, 2023 9:45 AM', meta: 'Video intro 1:12', status: 'passed' },
        { title: 'Final review approved', detail: 'By María González', timestamp: 'Sep 4, 2023 2:00 PM', meta: '"Strong analytical skills"', status: 'passed' },
        { title: 'Live on Atlas', detail: 'Public profile activated', timestamp: 'Sep 4, 2023 3:00 PM', meta: 'First search: Sep 5', status: 'passed' },
      ],
    },
    profileSnapshot: {
      bio: '"Analytics-driven insights for Latam startups and agencies." 7+ years transforming raw data into dashboards that drive decisions. Comfortable with messy datasets, SQL at scale, and explaining why the funnel leaked. Currently focused on retention cohort analysis and building data cultures in fast-growing teams.',
      hourlyRate: '$45/hr',
      hoursPerWeek: 40,
      availableFrom: 'Negotiable',
      skills: [
        { name: 'SQL', highlighted: true },
        { name: 'Python', highlighted: true },
        { name: 'Tableau', highlighted: true },
        { name: 'Power BI' },
        { name: 'R' },
        { name: 'Excel' },
        { name: 'Looker' },
        { name: 'Data visualization' },
      ],
      tools: ['Looker', 'Redshift', 'dbt', 'Jupyter', 'GitHub', 'Slack', 'Notion'],
      workHistory: [
        { role: 'Senior Data Analyst', employer: 'Rappi · Bogotá, Colombia', dates: '2021 — 2023 (2 yrs)', verified: true },
        { role: 'Data Analyst', employer: 'Platzi · Medellín, Colombia', dates: '2019 — 2021 (2 yrs)', verified: true },
        { role: 'Junior Analyst', employer: 'EY · Bogotá, Colombia', dates: '2017 — 2019 (2 yrs)', verified: false },
      ],
      portfolioItems: 4,
      avgRating: '4.8',
      ratingCount: 8,
      reviews: [
        { stars: 5, author: 'Openpay', date: 'Feb 2026', text: 'Built our retention funnel model from scratch. Clear documentation and proactive about edge cases in the data.' },
        { stars: 5, author: 'Jobsity', date: 'Jan 2026', text: 'Turned our messy transaction logs into actionable insights. Saved us weeks of manual work.' },
      ],
    },
    engagements: {
      active: 2,
      past: 7,
      items: [
        {
          client: 'Shopify',
          role: 'Data Analyst',
          rate: '$40/hr',
          hoursPerWeek: 35,
          startDate: 'Jan 15, 2026',
          totalPaid: '$6,160',
          status: 'active',
        },
        {
          client: 'Brex',
          role: 'Analytics Consultant',
          rate: '$48/hr',
          hoursPerWeek: 25,
          startDate: 'Feb 20, 2026',
          totalPaid: '$3,840',
          status: 'active',
        },
        {
          client: 'OLX Autos',
          role: 'Senior Data Analyst',
          rate: '$44/hr',
          hoursPerWeek: 40,
          startDate: 'Aug 10, 2025',
          endDate: 'Jan 10, 2026',
          totalPaid: '$23,760',
          status: 'past',
        },
        {
          client: 'Mercado Libre',
          role: 'Data Analyst',
          rate: '$42/hr',
          hoursPerWeek: 30,
          startDate: 'Apr 1, 2025',
          endDate: 'Aug 5, 2025',
          totalPaid: '$12,096',
          status: 'past',
        },
        {
          client: 'Nubank',
          role: 'Analytics Consultant',
          rate: '$46/hr',
          hoursPerWeek: 20,
          startDate: 'Nov 15, 2024',
          endDate: 'Mar 30, 2025',
          totalPaid: '$7,360',
          status: 'past',
        },
        {
          client: 'Fintech Startup (Arg)',
          role: 'Data Analyst',
          rate: '$38/hr',
          hoursPerWeek: 25,
          startDate: 'Jun 1, 2024',
          endDate: 'Oct 31, 2024',
          totalPaid: '$6,080',
          status: 'past',
        },
        {
          client: 'ePayco',
          role: 'Business Analyst',
          rate: '$40/hr',
          hoursPerWeek: 30,
          startDate: 'Jan 20, 2024',
          endDate: 'May 30, 2024',
          totalPaid: '$10,800',
          status: 'past',
        },
        {
          client: 'Clip',
          role: 'Data Analyst',
          rate: '$42/hr',
          hoursPerWeek: 35,
          startDate: 'Aug 1, 2023',
          endDate: 'Dec 15, 2023',
          totalPaid: '$12,180',
          status: 'past',
        },
      ],
    },
    financial: {
      totalEarned: '$72,400',
      last30Days: '$3,200',
      pendingPayout: '$950',
      paymentMethod: { provider: 'Stripe', account: '—', meta: '—' },
      taxDocs: [],
      recentTransactions: [],
    },
    communications: {
      totalMessages: 87,
      threads: 3,
      totalCaption: '87 messages over 9 months',
      items: [
        {
          threadId: 'c2-1',
          avatar: 'av-5',
          name: 'María González',
          role: 'specialist',
          initials: 'MG', // Drift C
          lastMessage: 'Great analysis on the retention cohort. Let\'s sync Thursday to discuss the quarterly dashboard.',
          time: '3h ago',
          messageCount: 34,
          unread: true,
        },
        {
          threadId: 'c2-2',
          avatar: 'av-7',
          name: 'Openpay',
          role: 'client',
          initials: 'OP', // Drift C
          lastMessage: 'Dashboard is working perfectly. Team loves the drill-down feature. Can we expand to customer segments?',
          time: '1d ago',
          messageCount: 28,
        },
        {
          threadId: 'c2-3',
          avatar: 'av-9',
          name: 'Jobsity',
          role: 'client',
          initials: 'JB', // Drift C
          lastMessage: 'Thanks for catching the data quality issue. Really saved us from bad reporting.',
          time: '5d ago',
          messageCount: 25,
        },
      ],
    },
    auditLog: {
      totalEvents: 18,
      recent: [
        { time: '11:22 AM', verb: 'Profile updated', target: 'hourly rate $45 → $48/hr', detail: '192.168.45.30 · Bogotá · Chrome', category: 'profile', outcome: { label: 'Auto-approved', variant: 'success' }, refId: 'PRF-2026-0405', dayGroup: { label: 'Today · April 30, 2026', count: 5 } },
        { time: '9:15 AM', verb: 'Sign-in', target: 'Carlos Restrepo', detail: '192.168.45.30 · Bogotá · Chrome 125 · macOS 14.5', category: 'signin', outcome: { label: 'Verified', variant: 'success' } },
        { time: '2:44 PM', verb: 'Contract signed', target: 'ENG-2026-087 with Shopify', detail: '$40/hr · 35 hrs/week · initial term', category: 'contract', outcome: { label: 'Active', variant: 'success' }, refId: 'ENG-2026-087' },
        { time: '10:30 AM', verb: 'Review received', target: '5 stars from Openpay', detail: '"Built our retention funnel model from scratch..."', category: 'review', outcome: { label: 'Approved', variant: 'success' }, refId: 'REV-2026-0212' },
        { time: '3:15 PM', verb: 'Interview 2 passed', target: 'Data Analysis · score 86/100', detail: '1st attempt', category: 'interview', outcome: { label: 'Passed', variant: 'success' } },
      ],
    },
    signals: {
      statusPill: { label: 'All clear', variant: 'default' },
      groups: [
        {
          type: 'anti-cheat',
          title: 'Anti-cheat flags',
          severity: 'none',
          detail: 'No anti-cheat flags or incidents on record.',
          cardVariant: 'clear',
          status: { label: '0 flags', variant: 'clear' },
        },
        {
          type: 'reports-against',
          title: 'Reports filed against candidate',
          severity: 'none',
          detail: 'No abuse, fraud, or quality reports filed against this candidate.',
          cardVariant: 'clear',
          status: { label: '0 of 0', variant: 'clear' },
        },
        {
          type: 'reports-by',
          title: 'Reports filed by candidate',
          severity: 'none',
          detail: 'Candidate has not filed any abuse or T&S reports.',
          cardVariant: 'clear',
          status: { label: '0 of 0', variant: 'clear' },
        },
        {
          type: 'pattern-flags',
          title: 'Pattern flags · multi-account / similar identity',
          severity: 'none',
          detail: 'No pattern matches detected. No similar accounts found.',
          cardVariant: 'clear',
          status: { label: '0 matches', variant: 'clear' },
        },
      ],
    },
    privacy: {
      statusPill: {
        label: 'All clear',
        variant: 'default',
      },
      items: [
        {
          label: 'Data subject access requests',
          value: 'None active',
          valueVariant: 'success',
          detail: 'No GDPR / CCPA access requests filed by this candidate.',
          icon: 'document',
        },
        {
          label: 'Data export logs',
          value: 'None',
          detail: 'No data export requests initiated.',
          icon: 'download',
        },
        {
          label: 'Account deletion requests',
          value: 'None',
          valueVariant: 'success',
          detail: 'No active deletion requests · right-to-be-forgotten not invoked.',
          icon: 'trash',
        },
        {
          label: 'Active legal holds',
          value: 'None',
          valueVariant: 'success',
          detail: 'No legal holds, subpoenas, or law-enforcement requests on this account.',
          icon: 'alert',
        },
      ],
    },
    quickFacts: {
      joinedDate: 'Sep 1, 2023',
      timezoneShort: 'COT · UTC-5',
      languagesShort: 'ES (Native) · EN (B2)',
    },
  },

  'cand-003': {
    id: 'cand-003',
    name: 'Lin Wei',
    email: 'lin@example.com',
    country: 'Taiwan',
    flag: '🇹🇼',
    title: 'Designer-Developer',
    status: 'pipeline',
    joinedMonth: 'Apr 2026',
    lastActive: '12h ago',
    lastActiveType: 'fresh',
    hiresStatus: 'in-review',
    hiresCount: 0,
    hiresAmount: '$0',
    initials: 'LW',
    cohortBadge: 'Wave 5',
    atlasId: 'cand-003-stub',
    specialist: '—',
    region: '—',
    timezone: '—',
    languages: '—',
    identity: {
      verified: true,
      verifiedDate: 'Apr 2, 2026',
      verificationMethod: 'Persona Inc.',
      idType: 'National ID',
      issuingCountry: 'Taiwan',
      nameOnId: 'Wei Lin',
      dateOfBirth: 'Dec 8, 1997',
      age: 28,
      livenessCheck: 'Matched',
      biometricMatch: 92.1,
      method: 'Document + selfie + liveness',
      antifraudChecks: [
        { label: 'Document tampering check', status: 'pass', detail: 'No alterations detected' },
        { label: 'Face match', status: 'pass', detail: '92.1% confidence' },
      ],
      idPhotoFront: { issuer: 'Persona Inc.', uploadedAt: 'Apr 2, 2026 3:45 PM' },
      idPhotoBack: { uploadedAt: 'Apr 2, 2026 3:46 PM' },
      livenessVideo: { duration: '3.2s', recordedAt: 'Apr 2, 2026 3:47 PM', method: '5-point liveness' },
    },
    vettingPipeline: {
      complete: 6,
      total: 10,
      steps: [
        { title: 'Email verified', detail: 'lin@example.com', timestamp: 'Apr 2, 2026 4:00 PM', meta: 'Persona magic-link', status: 'passed' },
        { title: 'WhatsApp verified', detail: '+886 912 ••• 5847', timestamp: 'Apr 2, 2026 4:12 PM', meta: 'OTP', status: 'passed' },
        { title: 'Identity verified', detail: 'Persona KYC', timestamp: 'Apr 2, 2026 4:25 PM', meta: '92.1% match', status: 'passed' },
        { title: 'Proctored English Assessment', detail: 'CEFR B1', timestamp: 'Apr 2, 2026 7:30 PM', score: 75, meta: '1st attempt', status: 'passed' },
        { title: 'AI Interview 1 (general)', detail: 'Communication 78 · Reasoning 72', timestamp: 'Apr 3, 2026 2:15 PM', score: 74, meta: '1st attempt', status: 'passed' },
        { title: 'Talent Specialist assigned', detail: 'James Liu', timestamp: 'Apr 3, 2026 2:20 PM', meta: 'APAC · Auto-routed', status: 'passed' },
        { title: 'AI Interview 2 (Design)', detail: 'In progress', timestamp: 'Apr 4, 2026 10:00 AM', meta: 'Recording in progress', status: 'in-progress' },
        { title: 'Profile + Intro recorded', detail: 'Pending', timestamp: '—', meta: 'Awaiting completion', status: 'locked' },
        { title: 'Final review', detail: 'Pending', timestamp: '—', meta: 'Awaiting specialist review', status: 'locked' },
        { title: 'Live on Atlas', detail: 'Pending', timestamp: '—', meta: 'Awaiting final approval', status: 'locked' },
      ],
    },
    profileSnapshot: {
      bio: '"UI/UX designer who codes." Building bespoke interfaces for SaaS platforms in Taipei. Comfortable with Figma-to-React handoff, responsive design patterns, and teaching accessibility to teams. Strong in component systems and design tokens.',
      hourlyRate: '$38/hr',
      hoursPerWeek: 30,
      availableFrom: 'Immediate',
      skills: [
        { name: 'Figma', highlighted: true },
        { name: 'React', highlighted: true },
        { name: 'TypeScript', highlighted: true },
        { name: 'CSS/Tailwind' },
        { name: 'UI Design' },
        { name: 'Accessibility' },
        { name: 'Design Systems' },
        { name: 'Prototyping' },
      ],
      tools: ['Figma', 'VS Code', 'Storybook', 'Jest', 'Chromatic', 'Sketch', 'Framer'],
      workHistory: [
        { role: 'Senior UI Engineer', employer: 'Taiwan SaaS Startup · Taipei', dates: '2021 — 2026 (5 yrs)', verified: true },
        { role: 'Product Designer', employer: 'Freelance · Remote', dates: '2019 — 2021 (2 yrs)', verified: false },
      ],
      portfolioItems: 0,
      avgRating: '—',
      ratingCount: 0,
      reviews: [],
    },
    engagements: { active: 0, past: 0, items: [] },
    financial: { totalEarned: '$0', last30Days: '$0', pendingPayout: '$0', paymentMethod: { provider: '—', account: '—', meta: '—' }, taxDocs: [], recentTransactions: [] },
    communications: { totalMessages: 0, threads: 0, totalCaption: 'no messages yet', items: [] },
    auditLog: {
      totalEvents: 2,
      recent: [
        { time: '3:47 PM', verb: 'Account created', target: 'via email signup', detail: 'lin@example.com', category: 'created', refId: 'ACC-2026-001850', dayGroup: { label: 'Today · April 30, 2026', count: 2 } },
        { time: '3:50 PM', verb: 'Email verified', target: 'lin@example.com', detail: 'Magic link · 1st attempt', category: 'profile', outcome: { label: 'Verified', variant: 'success' } },
      ],
    },
    signals: {
      statusPill: { label: 'All clear', variant: 'default' },
      groups: [
        { type: 'anti-cheat', title: 'Anti-cheat flags', severity: 'none', detail: 'No anti-cheat flags on record.', cardVariant: 'clear', status: { label: '0 flags', variant: 'clear' } },
        { type: 'reports-against', title: 'Reports filed against candidate', severity: 'none', detail: 'No reports filed against this candidate.', cardVariant: 'clear', status: { label: '0 of 0', variant: 'clear' } },
        { type: 'reports-by', title: 'Reports filed by candidate', severity: 'none', detail: 'Candidate has not filed any reports.', cardVariant: 'clear', status: { label: '0 of 0', variant: 'clear' } },
        { type: 'pattern-flags', title: 'Pattern flags · multi-account / similar identity', severity: 'none', detail: 'No pattern matches detected.', cardVariant: 'clear', status: { label: '0 matches', variant: 'clear' } },
      ],
    },
    privacy: {
      statusPill: {
        label: 'All clear',
        variant: 'default',
      },
      items: [
        {
          label: 'Data subject access requests',
          value: 'None active',
          valueVariant: 'success',
          detail: 'No GDPR / CCPA access requests filed by this candidate.',
          icon: 'document',
        },
        {
          label: 'Data export logs',
          value: 'None',
          detail: 'No data export requests initiated.',
          icon: 'download',
        },
        {
          label: 'Account deletion requests',
          value: 'None',
          valueVariant: 'success',
          detail: 'No active deletion requests · right-to-be-forgotten not invoked.',
          icon: 'trash',
        },
        {
          label: 'Active legal holds',
          value: 'None',
          valueVariant: 'success',
          detail: 'No legal holds, subpoenas, or law-enforcement requests on this account.',
          icon: 'alert',
        },
      ],
    },
    quickFacts: {
      joinedDate: 'Apr 2, 2026',
      timezoneShort: 'CST · UTC+8',
      languagesShort: 'ZH (Native) · EN (B1)',
    },
  },

  'cand-004': {
    id: 'cand-004',
    name: 'Marcus Thompson',
    email: 'marcus@example.com',
    country: 'United States',
    flag: '🇺🇸',
    title: 'Senior Engineer',
    status: 'suspended',
    joinedMonth: 'Jul 2024',
    lastActive: '3d ago',
    lastActiveType: 'regular',
    hiresCount: 4,
    hiresAmount: '$16,000',
    hiresStatus: 'completed',
    initials: 'MT',
    atlasId: 'cand-004-stub',
    specialist: '—',
    region: '—',
    timezone: '—',
    languages: '—',
    statusBanner: { title: 'This candidate is suspended.', detail: 'Reason: Manual review pending · Suspended Apr 28, 2026 by Aïsha Okafor (you) · Reversible' },
    identity: {
      verified: true,
      verifiedDate: 'Jul 15, 2024',
      verificationMethod: 'Persona Inc.',
      idType: 'Passport',
      issuingCountry: 'United States',
      nameOnId: 'Marcus Thompson',
      dateOfBirth: 'Jun 10, 1985',
      age: 40,
      livenessCheck: 'Matched',
      biometricMatch: 88.9,
      method: 'Document + selfie + liveness',
      antifraudChecks: [
        { label: 'Device + IP risk', status: 'flag', detail: 'VPN detected · Review recommended' },
      ],
      idPhotoFront: { issuer: 'Persona Inc.', uploadedAt: 'Jul 15, 2024 10:20 AM' },
      idPhotoBack: { uploadedAt: 'Jul 15, 2024 10:21 AM' },
      livenessVideo: { duration: '3.5s', recordedAt: 'Jul 15, 2024 10:22 AM', method: '5-point liveness' },
    },
    vettingPipeline: {
      complete: 10,
      total: 10,
      steps: [
        { title: 'Email verified', detail: 'marcus@example.com', timestamp: 'Jul 15, 2024 10:35 AM', meta: 'Persona magic-link', status: 'passed' },
        { title: 'WhatsApp verified', detail: '+1 206 ••• 4521', timestamp: 'Jul 15, 2024 10:48 AM', meta: 'OTP', status: 'passed' },
        { title: 'Identity verified', detail: 'Persona KYC', timestamp: 'Jul 15, 2024 11:00 AM', meta: '88.9% match', status: 'passed' },
        { title: 'Proctored English Assessment', detail: 'CEFR C1', timestamp: 'Jul 15, 2024 2:30 PM', score: 91, meta: '1st attempt', status: 'passed' },
        { title: 'AI Interview 1 (general)', detail: 'Communication 89 · Reasoning 91', timestamp: 'Jul 16, 2024 1:15 PM', score: 90, meta: '1st attempt', status: 'passed' },
        { title: 'Talent Specialist assigned', detail: 'Robert Chen', timestamp: 'Jul 16, 2024 1:20 PM', meta: 'US-WEST · Auto-routed', status: 'passed' },
        { title: 'AI Interview 2 (Engineering)', detail: 'Technical 93 · Code quality 89', timestamp: 'Jul 18, 2024 3:45 PM', score: 91, meta: '1st attempt', status: 'passed' },
        { title: 'Profile + Intro recorded', detail: 'Bio · skills · portfolio', timestamp: 'Jul 19, 2024 10:30 AM', meta: 'Video intro 1:35', status: 'passed' },
        { title: 'Final review approved', detail: 'By Robert Chen', timestamp: 'Jul 19, 2024 2:15 PM', meta: '"Exceptional technical depth"', status: 'passed' },
        { title: 'Live on Atlas', detail: 'Public profile activated', timestamp: 'Jul 19, 2024 3:00 PM', meta: 'First search: Jul 20', status: 'passed' },
      ],
    },
    profileSnapshot: {
      bio: '"Backend systems at scale." 15+ years building distributed systems and APIs. Deep PostgreSQL expertise. Published author on concurrency patterns. Previously at Amazon AWS, now open to select engagements after sabbatical.',
      hourlyRate: '$65/hr',
      hoursPerWeek: 25,
      availableFrom: 'Jun 2026',
      skills: [
        { name: 'Go', highlighted: true },
        { name: 'PostgreSQL', highlighted: true },
        { name: 'System Design', highlighted: true },
        { name: 'Kubernetes' },
        { name: 'AWS' },
        { name: 'Docker' },
        { name: 'Python' },
        { name: 'gRPC' },
      ],
      tools: ['Postgres', 'DBeaver', 'Terraform', 'Kubernetes', 'AWS', 'New Relic', 'PagerDuty', 'Github'],
      workHistory: [
        { role: 'Senior Engineer, Backend Platform', employer: 'Amazon Web Services · Seattle, WA', dates: '2016 — 2024 (8 yrs)', verified: true },
        { role: 'Backend Engineer', employer: 'Dropbox · San Francisco, CA', dates: '2014 — 2016 (2 yrs)', verified: true },
        { role: 'Software Engineer', employer: 'VMware · Palo Alto, CA', dates: '2012 — 2014 (2 yrs)', verified: false },
      ],
      portfolioItems: 6,
      avgRating: '4.6',
      ratingCount: 5,
      reviews: [
        { stars: 5, author: 'Canva', date: 'Mar 2026', text: 'Marcus designed our message queue architecture under load. Handled the whole thing with remarkable clarity even when discussing tradeoffs.' },
        { stars: 4, author: 'Stripe', date: 'Jan 2026', text: 'Solid systems thinker. A bit slow to document decisions but his code review comments were incredibly thorough.' },
      ],
    },
    engagements: { active: 0, past: 0, items: [] },
    financial: { totalEarned: '$16,000', last30Days: '$0', pendingPayout: '$0', paymentMethod: { provider: '—', account: '—', meta: '—' }, taxDocs: [], recentTransactions: [] },
    communications: {
      totalMessages: 156,
      threads: 4,
      totalCaption: '156 messages over 8 months',
      items: [
        {
          threadId: 'c4-1',
          avatar: 'av-4',
          name: 'Robert Chen',
          role: 'specialist',
          initials: 'RC', // Drift C
          lastMessage: 'Following up on the suspension review. Need your availability for a clarification call this week.',
          time: '2h ago',
          messageCount: 42,
          unread: true,
        },
        {
          threadId: 'c4-2',
          avatar: 'av-8',
          name: 'Canva',
          role: 'client',
          initials: 'CV', // Drift C
          lastMessage: 'Marcus, we\'re still interested in continuing the engagement if the review clears. The queue work was exceptional.',
          time: '1d ago',
          messageCount: 38,
        },
        {
          threadId: 'c4-3',
          avatar: 'av-6',
          name: 'Stripe',
          role: 'client',
          initials: 'ST', // Drift C
          lastMessage: 'No updates from our side. Will proceed based on account status decision.',
          time: '3d ago',
          messageCount: 31,
        },
        {
          threadId: 'c4-4',
          avatar: 'av-2',
          name: 'Internal note · Aïsha Okafor',
          role: 'admin',
          initials: 'AO', // Drift C
          lastMessage: 'Manual review initiated. Candidate flagged for IP/VPN inconsistency. Awaiting follow-up.',
          time: 'Apr 28',
          messageCount: 45,
        },
      ],
    },
    auditLog: {
      totalEvents: 31,
      recent: [
        { time: '10:15 AM', verb: 'Suspension initiated', target: 'Manual review pending', detail: '192.168.99.15 · Seattle · Flagged for policy review', category: 'override', outcome: { label: 'In review', variant: 'partial' }, refId: 'SUSP-2026-0428', dayGroup: { label: 'Today · April 30, 2026', count: 2 } },
        { time: '2:45 PM', verb: 'Account suspended', target: 'by Aïsha Okafor', detail: 'IP/VPN risk pattern detected · awaiting response', category: 'flag', outcome: { label: 'Suspended', variant: 'escalated' }, refId: 'SUSP-2026-0428' },
        { time: '9:32 AM', verb: 'Contract ended', target: 'ENG-2026-045 with Stripe', detail: '$65/hr · engagement paused pending review', category: 'contract', outcome: { label: 'Paused', variant: 'partial' }, dayGroup: { label: 'Apr 22, 2026', count: 5 } },
        { time: '3:20 PM', verb: 'Contract signed', target: 'ENG-2026-042 with Canva', detail: '$65/hr · 25 hrs/week · 12-week term', category: 'contract', outcome: { label: 'Active', variant: 'success' }, refId: 'ENG-2026-042' },
        { time: '1:30 PM', verb: 'Sign-in', target: 'Marcus Thompson', detail: '192.168.99.15 · Seattle · Chrome 125 · Windows 11', category: 'signin', outcome: { label: 'Verified', variant: 'success' } },
        { time: '11:00 AM', verb: 'Contract signed', target: 'ENG-2026-038 with Canva', detail: '$62/hr · 30 hrs/week · initial term', category: 'contract', outcome: { label: 'Active', variant: 'success' }, refId: 'ENG-2026-038' },
        { time: '4:15 PM', verb: 'Review received', target: '5 stars from Canva', detail: '"Marcus designed our message queue architecture under load..."', category: 'review', outcome: { label: 'Approved', variant: 'success' }, refId: 'REV-2026-0312' },
      ],
    },
    signals: {
      statusPill: { label: '2 active flags · suspended', variant: 'danger' },
      groups: [
        {
          type: 'anti-cheat',
          title: 'IP/VPN risk detection',
          severity: 'high',
          detail: 'Suspicious pattern: consistent IP location inconsistencies across 4 logins in Apr 2026. VPN usage detected on Apr 28. Manual review initiated.',
          cardVariant: 'danger',
          status: { label: 'Open', variant: 'open' },
          metadata: {
            filedDate: 'Apr 28, 2026',
            referenceId: 'SUSP-2026-0428',
          },
        },
        {
          type: 'reports-against',
          title: 'Reports filed against candidate',
          severity: 'none',
          detail: 'No external reports filed against this candidate.',
          cardVariant: 'clear',
          status: { label: '0 of 0', variant: 'clear' },
        },
        {
          type: 'reports-by',
          title: 'Reports filed by candidate',
          severity: 'none',
          detail: 'Candidate has not filed any reports.',
          cardVariant: 'clear',
          status: { label: '0 of 0', variant: 'clear' },
        },
        {
          type: 'pattern-flags',
          title: 'Pattern flags · multi-account / similar identity',
          severity: 'medium',
          detail: 'Geographic pattern inconsistency detected across logins. Possible VPN network usage. Pattern analysis ongoing.',
          cardVariant: 'danger',
          status: { label: '1 match', variant: 'open' },
        },
      ],
    },
    privacy: {
      statusPill: {
        label: 'DSAR pending review',
        variant: 'warn',
      },
      items: [
        {
          label: 'Data subject access requests',
          value: '1 pending',
          valueVariant: 'warn',
          detail: 'Subject access request filed Apr 26, 2026, on hold pending suspension review. SLA paused.',
          icon: 'document',
        },
        {
          label: 'Data export logs',
          value: '1 export',
          detail: 'Last export Apr 22, 2026 — pre-suspension account snapshot for compliance archive.',
          icon: 'download',
        },
        {
          label: 'Account deletion requests',
          value: 'None',
          valueVariant: 'success',
          detail: 'No deletion requests · right-to-be-forgotten not invoked.',
          icon: 'trash',
        },
        {
          label: 'Active legal holds',
          value: 'None',
          valueVariant: 'success',
          detail: 'No legal holds, subpoenas, or law-enforcement requests.',
          icon: 'alert',
        },
      ],
    },
    quickFacts: {
      joinedDate: 'Jul 15, 2024',
      timezoneShort: 'EST · UTC-5',
      languagesShort: 'EN (Native) · ES (A2)',
    },
  },

  'cand-005': {
    id: 'cand-005',
    name: 'Aigerim Bekova',
    email: 'aigerim@example.com',
    country: 'Kazakhstan',
    flag: '🇰🇿',
    title: 'Virtual Assistant',
    status: 'live',
    joinedMonth: 'Jan 2024',
    lastActive: '30m ago',
    lastActiveType: 'fresh',
    hiresCount: 24,
    hiresAmount: '$36,000',
    hiresStatus: 'completed',
    initials: 'AB',
    cohortBadge: 'Founding cohort',
    atlasId: 'cand-005-stub',
    specialist: '—',
    region: '—',
    timezone: '—',
    languages: '—',
    identity: {
      verified: true,
      verifiedDate: 'Jan 20, 2024',
      verificationMethod: 'Persona Inc.',
      idType: 'National ID',
      issuingCountry: 'Kazakhstan',
      nameOnId: 'Aigerim Bekova',
      dateOfBirth: 'May 3, 1994',
      age: 31,
      livenessCheck: 'Matched',
      biometricMatch: 95.8,
      method: 'Document + selfie + liveness',
      antifraudChecks: [
        { label: 'Document tampering check', status: 'pass', detail: 'No alterations detected' },
        { label: 'Face match', status: 'pass', detail: '95.8% confidence' },
      ],
      idPhotoFront: { issuer: 'Persona Inc.', uploadedAt: 'Jan 20, 2024 8:30 AM' },
      idPhotoBack: { uploadedAt: 'Jan 20, 2024 8:31 AM' },
      livenessVideo: { duration: '4.1s', recordedAt: 'Jan 20, 2024 8:32 AM', method: '5-point liveness' },
    },
    vettingPipeline: {
      complete: 10,
      total: 10,
      steps: [
        { title: 'Email verified', detail: 'aigerim@example.com', timestamp: 'Jan 20, 2024 8:45 AM', meta: 'Persona magic-link', status: 'passed' },
        { title: 'WhatsApp verified', detail: '+7 747 ••• 8394', timestamp: 'Jan 20, 2024 8:58 AM', meta: 'OTP', status: 'passed' },
        { title: 'Identity verified', detail: 'Persona KYC', timestamp: 'Jan 20, 2024 9:15 AM', meta: '95.8% match', status: 'passed' },
        { title: 'Proctored English Assessment', detail: 'CEFR B1', timestamp: 'Jan 20, 2024 1:30 PM', score: 73, meta: '1st attempt', status: 'passed' },
        { title: 'AI Interview 1 (general)', detail: 'Communication 76 · Reasoning 71', timestamp: 'Jan 21, 2024 10:45 AM', score: 73, meta: '1st attempt', status: 'passed' },
        { title: 'Talent Specialist assigned', detail: 'Svetlana Volkova', timestamp: 'Jan 21, 2024 10:50 AM', meta: 'EU-EAST · Auto-routed', status: 'passed' },
        { title: 'AI Interview 2 (Admin)', detail: 'Technical 77 · Organization 74', timestamp: 'Jan 22, 2024 2:20 PM', score: 75, meta: '1st attempt', status: 'passed' },
        { title: 'Profile + Intro recorded', detail: 'Bio · skills · portfolio', timestamp: 'Jan 23, 2024 9:00 AM', meta: 'Video intro 1:08', status: 'passed' },
        { title: 'Final review approved', detail: 'By Svetlana Volkova', timestamp: 'Jan 23, 2024 3:30 PM', meta: '"Reliable, detail-oriented"', status: 'passed' },
        { title: 'Live on Atlas', detail: 'Public profile activated', timestamp: 'Jan 23, 2024 4:00 PM', meta: 'First search: Jan 24', status: 'passed' },
      ],
    },
    profileSnapshot: {
      bio: '"Your personal assistant who speaks three languages." Calendar management, scheduling, research, and vendor coordination for growing teams. 4+ years supporting executives at fintech startups. Fluent in Russian and Kazakh, comfortable with CRM tools and Zapier automation.',
      hourlyRate: '$22/hr',
      hoursPerWeek: 40,
      availableFrom: 'Immediate',
      skills: [
        { name: 'Calendar Management', highlighted: true },
        { name: 'Email Management', highlighted: true },
        { name: 'Research', highlighted: true },
        { name: 'Scheduling' },
        { name: 'CRM Tools' },
        { name: 'Zapier' },
        { name: 'Google Suite' },
        { name: 'Bookkeeping' },
      ],
      tools: ['Calendly', 'Notion', 'Slack', 'Gmail', 'Asana', 'HubSpot', 'Zapier', 'Google Suite'],
      workHistory: [
        { role: 'Executive Assistant', employer: 'LendHub · Almaty, Kazakhstan', dates: '2020 — 2024 (4 yrs)', verified: true },
        { role: 'Administrative Assistant', employer: 'Freelance · Remote', dates: '2018 — 2020 (2 yrs)', verified: true },
      ],
      portfolioItems: 3,
      avgRating: '4.9',
      ratingCount: 12,
      reviews: [
        { stars: 5, author: 'Chime', date: 'Apr 2026', text: 'Aigerim manages our exec calendar flawlessly. Proactive about scheduling conflicts and reads the room on which meetings actually need to happen.' },
        { stars: 5, author: 'Revolut', date: 'Feb 2026', text: 'Excellent with vendors and external partners. Three-timezone coordination is her specialty. Quiet but incredibly competent.' },
      ],
    },
    engagements: {
      active: 1,
      past: 3,
      items: [
        {
          client: 'Loom',
          role: 'Executive Assistant',
          rate: '$20/hr',
          hoursPerWeek: 35,
          startDate: 'Mar 1, 2026',
          totalPaid: '$1,960',
          status: 'active',
        },
        {
          client: 'Airtable',
          role: 'Operations Assistant',
          rate: '$22/hr',
          hoursPerWeek: 30,
          startDate: 'Oct 15, 2025',
          endDate: 'Feb 28, 2026',
          totalPaid: '$8,580',
          status: 'past',
        },
        {
          client: 'Webflow Consultant',
          role: 'Virtual Assistant',
          rate: '$20/hr',
          hoursPerWeek: 25,
          startDate: 'Jun 1, 2025',
          endDate: 'Oct 10, 2025',
          totalPaid: '$5,600',
          status: 'past',
        },
        {
          client: 'Kazakh Tech Startup',
          role: 'Admin Assistant',
          rate: '$18/hr',
          hoursPerWeek: 20,
          startDate: 'Jan 10, 2024',
          endDate: 'May 31, 2025',
          totalPaid: '$19,920',
          status: 'past',
        },
      ],
    },
    financial: { totalEarned: '$36,000', last30Days: '$2,100', pendingPayout: '$500', paymentMethod: { provider: '—', account: '—', meta: '—' }, taxDocs: [], recentTransactions: [] },
    communications: {
      totalMessages: 42,
      threads: 2,
      totalCaption: '42 messages over 4 months',
      items: [
        {
          threadId: 'c5-1',
          avatar: 'av-12',
          name: 'Svetlana Volkova',
          role: 'specialist',
          initials: 'SV', // Drift C
          lastMessage: 'Check-in: how\'s the Loom engagement going? Client mentioned strong work on the vendor coordination.',
          time: '8h ago',
          messageCount: 24,
          unread: true,
        },
        {
          threadId: 'c5-2',
          avatar: 'av-3',
          name: 'Loom',
          role: 'client',
          initials: 'LM', // Drift C
          lastMessage: 'Aigerim is amazing. Calendar now flows perfectly and she\'s saved us days of coordination work each week.',
          time: '2d ago',
          messageCount: 18,
        },
      ],
    },
    auditLog: {
      totalEvents: 12,
      recent: [
        { time: '2:10 PM', verb: 'Sign-in', target: 'Aigerim Bekova', detail: '192.168.67.45 · Almaty · Safari · iOS 18', category: 'signin', outcome: { label: 'Verified', variant: 'success' }, dayGroup: { label: 'Today · April 30, 2026', count: 5 } },
        { time: '10:30 AM', verb: 'Contract signed', target: 'ENG-2026-156 with Loom', detail: '$20/hr · 35 hrs/week · ongoing', category: 'contract', outcome: { label: 'Active', variant: 'success' }, refId: 'ENG-2026-156' },
        { time: '3:45 PM', verb: 'Review received', target: '5 stars from Chime', detail: '"Aigerim manages our exec calendar flawlessly..."', category: 'review', outcome: { label: 'Approved', variant: 'success' }, refId: 'REV-2026-0401' },
        { time: '1:20 PM', verb: 'Profile updated', target: 'added Asana to tools', detail: '192.168.67.45 · Almaty · Chrome', category: 'profile', outcome: { label: 'Auto-approved', variant: 'success' }, refId: 'PRF-2026-0315' },
        { time: '4:00 PM', verb: 'Contract signed', target: 'ENG-2026-135 with Airtable', detail: '$22/hr · 30 hrs/week · 5-month term', category: 'contract', outcome: { label: 'Active', variant: 'success' }, refId: 'ENG-2026-135' },
      ],
    },
    signals: {
      statusPill: { label: 'All clear', variant: 'default' },
      groups: [
        { type: 'anti-cheat', title: 'Anti-cheat flags', severity: 'none', detail: 'No anti-cheat flags on record.', cardVariant: 'clear', status: { label: '0 flags', variant: 'clear' } },
        { type: 'reports-against', title: 'Reports filed against candidate', severity: 'none', detail: 'No reports filed against this candidate.', cardVariant: 'clear', status: { label: '0 of 0', variant: 'clear' } },
        { type: 'reports-by', title: 'Reports filed by candidate', severity: 'none', detail: 'Candidate has not filed any reports.', cardVariant: 'clear', status: { label: '0 of 0', variant: 'clear' } },
        { type: 'pattern-flags', title: 'Pattern flags · multi-account / similar identity', severity: 'none', detail: 'No pattern matches detected.', cardVariant: 'clear', status: { label: '0 matches', variant: 'clear' } },
      ],
    },
    privacy: {
      statusPill: {
        label: 'All clear',
        variant: 'default',
      },
      items: [
        {
          label: 'Data subject access requests',
          value: 'None active',
          valueVariant: 'success',
          detail: 'No GDPR / CCPA access requests filed by this candidate.',
          icon: 'document',
        },
        {
          label: 'Data export logs',
          value: '1 export',
          detail: 'Last export Mar 15, 2024 — candidate\'s annual data summary (auto-generated, no action).',
          icon: 'download',
        },
        {
          label: 'Account deletion requests',
          value: 'None',
          valueVariant: 'success',
          detail: 'No active deletion requests · right-to-be-forgotten not invoked.',
          icon: 'trash',
        },
        {
          label: 'Active legal holds',
          value: 'None',
          valueVariant: 'success',
          detail: 'No legal holds, subpoenas, or law-enforcement requests on this account.',
          icon: 'alert',
        },
      ],
    },
    quickFacts: {
      joinedDate: 'Jan 20, 2024',
      timezoneShort: 'ALMT · UTC+6',
      languagesShort: 'KK (Native) · RU (Native) · EN (B1)',
    },
  },

  'cand-006': {
    id: 'cand-006',
    name: 'Deniz Kaya',
    email: 'deniz@example.com',
    country: 'Türkiye',
    flag: '🇹🇷',
    title: 'Designer',
    status: 'banned',
    joinedMonth: 'Feb 2024',
    lastActive: 'never',
    lastActiveType: 'never',
    hiresCount: 0,
    hiresAmount: '$0',
    hiresStatus: 'zero',
    initials: 'DK',
    atlasId: 'cand-006-stub',
    specialist: '—',
    region: '—',
    timezone: '—',
    languages: '—',
    statusBanner: { title: 'This candidate is permanently banned.', detail: 'Reason: Repeated TOS violations · Banned Apr 28, 2026 by Dario Mensah (Super Admin) · Permanent · Audit ref BAN-2026-018' },
    identity: {
      verified: true,
      verifiedDate: 'Feb 8, 2024',
      verificationMethod: 'Persona Inc.',
      idType: 'Passport',
      issuingCountry: 'Türkiye',
      nameOnId: 'Deniz Kaya',
      dateOfBirth: 'Nov 22, 1993',
      age: 32,
      livenessCheck: 'Matched',
      biometricMatch: 91.5,
      method: 'Document + selfie + liveness',
      antifraudChecks: [
        { label: 'Duplicate identity check', status: 'danger', detail: 'Multiple accounts found (3 variations of name)' },
      ],
      idPhotoFront: { issuer: 'Persona Inc.', uploadedAt: 'Feb 8, 2024 5:15 PM' },
      idPhotoBack: { uploadedAt: 'Feb 8, 2024 5:16 PM' },
      livenessVideo: { duration: '3.9s', recordedAt: 'Feb 8, 2024 5:17 PM', method: '5-point liveness' },
    },
    vettingPipeline: {
      complete: 3,
      total: 10,
      steps: [
        { title: 'Email verified', detail: 'deniz@example.com', timestamp: 'Feb 8, 2024 5:30 PM', meta: 'Persona magic-link', status: 'passed' },
        { title: 'WhatsApp verified', detail: '+90 539 ••• 6284', timestamp: 'Feb 8, 2024 5:45 PM', meta: 'OTP', status: 'passed' },
        { title: 'Identity verified', detail: 'Persona KYC', timestamp: 'Feb 8, 2024 6:00 PM', meta: 'Multiple accounts detected', status: 'passed' },
        { title: 'Proctored English Assessment', detail: '—', timestamp: 'Feb 8, 2024 6:15 PM', meta: 'Manual review required', status: 'failed' },
        { title: 'AI Interview 1 (general)', detail: '—', timestamp: '—', meta: 'Locked pending resolution', status: 'locked' },
        { title: 'Talent Specialist assigned', detail: '—', timestamp: '—', meta: 'Case under review', status: 'locked' },
        { title: 'AI Interview 2', detail: '—', timestamp: '—', meta: 'On hold', status: 'locked' },
        { title: 'Profile + Intro recorded', detail: '—', timestamp: '—', meta: 'Suspended', status: 'locked' },
        { title: 'Final review', detail: '—', timestamp: '—', meta: 'Awaiting decision', status: 'locked' },
        { title: 'Live on Atlas', detail: '—', timestamp: '—', meta: 'Banned account', status: 'locked' },
      ],
    },
    profileSnapshot: {
      bio: 'Account suspended due to policy violations.',
      hourlyRate: '—',
      hoursPerWeek: 0,
      availableFrom: '—',
      skills: [],
      tools: [],
      workHistory: [],
      portfolioItems: 0,
      avgRating: '—',
      ratingCount: 0,
      reviews: [],
    },
    engagements: { active: 0, past: 0, items: [] },
    financial: { totalEarned: '$0', last30Days: '$0', pendingPayout: '$0', paymentMethod: { provider: '—', account: '—', meta: '—' }, taxDocs: [], recentTransactions: [] },
    communications: {
      totalMessages: 203,
      threads: 5,
      totalCaption: '203 messages over 2 months',
      items: [
        {
          threadId: 'c6-1',
          avatar: 'av-11',
          name: 'Internal note · Dario Mensah',
          role: 'admin',
          initials: 'DM', // Drift C
          lastMessage: 'Account banned per policy violations (Apr 28). All active contracts terminated. Account remains locked for historical audit.',
          time: 'Apr 28',
          messageCount: 112,
        },
        {
          threadId: 'c6-2',
          avatar: 'av-6',
          name: 'TechFlow',
          role: 'client',
          initials: 'TF', // Drift C
          lastMessage: 'We received notice of account termination. Disappointed—we had a good working relationship.',
          time: 'Apr 28',
          messageCount: 47,
        },
        {
          threadId: 'c6-3',
          avatar: 'av-9',
          name: 'Aurora Designs',
          role: 'client',
          initials: 'AD', // Drift C
          lastMessage: 'Account seems locked. Reaching out to Atlas support to understand what happened.',
          time: 'Apr 28',
          messageCount: 28,
        },
        {
          threadId: 'c6-4',
          avatar: 'av-5',
          name: 'SaaS Studio',
          role: 'client',
          initials: 'SS', // Drift C
          lastMessage: 'We\'ll look for a replacement designer. No issues during our engagement but understand the policy.',
          time: 'Apr 27',
          messageCount: 9,
        },
        {
          threadId: 'c6-5',
          avatar: 'av-10',
          name: 'Internal note · Dario Mensah',
          role: 'admin',
          initials: 'DM', // Drift C
          lastMessage: 'Ban issued: Multiple accounts, TOS violations, suspicious behavior pattern. BAN-2026-018. Case closed.',
          time: 'Apr 27',
          messageCount: 7,
        },
      ],
    },
    auditLog: {
      totalEvents: 44,
      recent: [
        { time: '4:00 PM', verb: 'Account banned', target: 'by Dario Mensah · Super Admin', detail: 'Repeated TOS violations · Multiple account fraud · Permanent ban', category: 'override', outcome: { label: 'Banned', variant: 'escalated' }, refId: 'BAN-2026-018', dayGroup: { label: 'Today · April 30, 2026', count: 3 } },
        { time: '3:30 PM', verb: 'Contracts terminated', target: 'all active engagements', detail: '4 contracts cancelled effective immediately', category: 'contract', outcome: { label: 'Terminated', variant: 'escalated' } },
        { time: '2:15 PM', verb: 'Dispute filed', target: 'High priority · TOS violation', detail: 'Pattern flagged: account behavior inconsistent with single user', category: 'dispute', outcome: { label: 'Escalated', variant: 'escalated' }, refId: 'DSP-2026-0428' },
        { time: '10:45 AM', verb: 'Contract signed', target: 'ENG-2026-201 with TechFlow', detail: '$48/hr · 40 hrs/week · initial term', category: 'contract', outcome: { label: 'Active', variant: 'success' }, refId: 'ENG-2026-201', dayGroup: { label: 'Apr 22, 2026', count: 4 } },
        { time: '2:30 PM', verb: 'Review received', target: '5 stars from Aurora Designs', detail: '"Incredibly creative designs. Fast turnaround."', category: 'review', outcome: { label: 'Approved', variant: 'success' }, refId: 'REV-2026-0315' },
        { time: '9:00 AM', verb: 'Sign-in', target: 'Deniz Kaya', detail: 'Unknown IP · Istanbul · Chrome', category: 'signin', outcome: { label: 'Verified', variant: 'success' } },
        { time: '4:20 PM', verb: 'Contract signed', target: 'ENG-2026-189 with SaaS Studio', detail: '$44/hr · 30 hrs/week · initial term', category: 'contract', outcome: { label: 'Active', variant: 'success' }, refId: 'ENG-2026-189' },
      ],
    },
    signals: {
      statusPill: { label: '5 flags · banned', variant: 'danger' },
      groups: [
        {
          type: 'anti-cheat',
          title: 'Critical integrity violations',
          severity: 'critical',
          detail: 'Multiple TOS violations detected. Biometric inconsistencies and behavioral red flags. Pattern analysis suggests multi-account operation.',
          cardVariant: 'danger',
          status: { label: 'Resolved', variant: 'resolved' },
          metadata: {
            filedDate: 'Apr 28, 2026',
            resolvedBy: {
              name: 'Dario Mensah',
              date: 'Apr 28, 2026',
              turnaround: 'Permanent ban',
            },
            referenceId: 'BAN-2026-018',
          },
        },
        {
          type: 'reports-against',
          title: 'Reports filed against candidate',
          severity: 'high',
          detail: '4 fraud/quality reports filed. Pattern of problematic deliverables and TOS violations.',
          cardVariant: 'danger',
          status: { label: '4 of 4', variant: 'clear' },
        },
        {
          type: 'reports-by',
          title: 'Reports filed by candidate',
          severity: 'none',
          detail: 'No reports filed by this candidate.',
          cardVariant: 'clear',
          status: { label: '0 of 0', variant: 'clear' },
        },
        {
          type: 'pattern-flags',
          title: 'Pattern flags · multi-account / similar identity',
          severity: 'critical',
          detail: 'Multi-account operation detected. 2 linked accounts identified sharing IP, device fingerprint, and payment method. Pattern indicates coordinated fraud.',
          cardVariant: 'danger',
          status: { label: '2 matches', variant: 'clear' },
        },
      ],
    },
    privacy: {
      statusPill: {
        label: 'Legal hold active',
        variant: 'danger',
      },
      items: [
        {
          label: 'Data subject access requests',
          value: '1 historical',
          detail: 'Resolved Mar 18, 2026 — full account export delivered per GDPR Article 15.',
          icon: 'document',
        },
        {
          label: 'Data export logs',
          value: '3 exports',
          detail: 'Latest: Mar 20, 2026 — formal data archive triggered by ban-related compliance review.',
          icon: 'download',
        },
        {
          label: 'Account deletion requests',
          value: '1 active',
          valueVariant: 'warn',
          detail: 'RTBF request filed Apr 5, 2026 · processing blocked by active legal hold (see below).',
          icon: 'trash',
        },
        {
          label: 'Active legal holds',
          value: '1 active',
          valueVariant: 'warn',
          detail: 'Litigation hold filed Apr 2, 2026 by Atlas Trust & Safety · prevents account deletion until resolved.',
          icon: 'alert',
        },
      ],
    },
    quickFacts: {
      joinedDate: 'Feb 8, 2024',
      timezoneShort: 'EET · UTC+2',
      languagesShort: 'TR (Native) · EN (B2)',
    },
  },

  'cand-007': {
    id: 'cand-007',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    country: 'India',
    flag: '🇮🇳',
    title: 'Data Engineer',
    status: 'live',
    joinedMonth: 'May 2024',
    lastActive: '1h ago',
    lastActiveType: 'fresh',
    hiresCount: 9,
    hiresAmount: '$54,000',
    hiresStatus: 'completed',
    initials: 'PS',
    cohortBadge: 'Wave 3',
    atlasId: 'cand-007-stub',
    specialist: '—',
    region: '—',
    timezone: '—',
    languages: '—',
    identity: {
      verified: true,
      verifiedDate: 'May 12, 2024',
      verificationMethod: 'Persona Inc.',
      idType: 'Aadhaar Card',
      issuingCountry: 'India',
      nameOnId: 'Priya Sharma',
      dateOfBirth: 'Sep 7, 1995',
      age: 30,
      livenessCheck: 'Matched',
      biometricMatch: 93.7,
      method: 'Document + selfie + liveness',
      antifraudChecks: [
        { label: 'Document tampering check', status: 'pass', detail: 'No alterations detected' },
        { label: 'Face match', status: 'pass', detail: '93.7% confidence' },
      ],
      idPhotoFront: { issuer: 'Persona Inc.', uploadedAt: 'May 12, 2024 11:45 AM' },
      idPhotoBack: { uploadedAt: 'May 12, 2024 11:46 AM' },
      livenessVideo: { duration: '3.6s', recordedAt: 'May 12, 2024 11:47 AM', method: '5-point liveness' },
    },
    vettingPipeline: {
      complete: 10,
      total: 10,
      steps: [
        { title: 'Email verified', detail: 'priya@example.com', timestamp: 'May 12, 2024 12:00 PM', meta: 'Persona magic-link', status: 'passed' },
        { title: 'WhatsApp verified', detail: '+91 987 ••• 1234', timestamp: 'May 12, 2024 12:15 PM', meta: 'OTP', status: 'passed' },
        { title: 'Identity verified', detail: 'Persona KYC', timestamp: 'May 12, 2024 12:30 PM', meta: '93.7% match', status: 'passed' },
        { title: 'Proctored English Assessment', detail: 'CEFR C1', timestamp: 'May 12, 2024 3:45 PM', score: 95, meta: '1st attempt', status: 'passed' },
        { title: 'AI Interview 1 (general)', detail: 'Communication 94 · Reasoning 92', timestamp: 'May 13, 2024 2:30 PM', score: 93, meta: '1st attempt', status: 'passed' },
        { title: 'Talent Specialist assigned', detail: 'Amit Patel', timestamp: 'May 13, 2024 2:35 PM', meta: 'SOUTH_ASIA · Auto-routed', status: 'passed' },
        { title: 'AI Interview 2 (Engineering)', detail: 'Technical 96 · Code quality 93', timestamp: 'May 15, 2024 1:00 PM', score: 94, meta: '1st attempt', status: 'passed' },
        { title: 'Profile + Intro recorded', detail: 'Bio · skills · portfolio', timestamp: 'May 16, 2024 10:20 AM', meta: 'Video intro 1:48', status: 'passed' },
        { title: 'Final review approved', detail: 'By Amit Patel', timestamp: 'May 16, 2024 3:15 PM', meta: '"Exceptional technical leader"', status: 'passed' },
        { title: 'Live on Atlas', detail: 'Public profile activated', timestamp: 'May 16, 2024 4:00 PM', meta: 'First search: May 17', status: 'passed' },
      ],
    },
    profileSnapshot: {
      bio: '"Data engineering is about building plumbing that doesn&#x2019;t leak." 6+ years designing data platforms for e-commerce and fintech. Expertise in distributed systems, stream processing, and getting teams to care about data quality. Strong mentor to junior engineers.',
      hourlyRate: '$52/hr',
      hoursPerWeek: 38,
      availableFrom: 'Negotiable',
      skills: [
        { name: 'Spark', highlighted: true },
        { name: 'Python', highlighted: true },
        { name: 'Kubernetes', highlighted: true },
        { name: 'Airflow' },
        { name: 'Scala' },
        { name: 'Data Modeling' },
        { name: 'SQL' },
        { name: 'Stream Processing' },
      ],
      tools: ['Apache Spark', 'Airflow', 'Kubernetes', 'Scala', 'Python', 'PostgreSQL', 'Kafka', 'Snowflake'],
      workHistory: [
        { role: 'Senior Data Engineer', employer: 'Flipkart · Bangalore, India', dates: '2022 — 2024 (2 yrs)', verified: true },
        { role: 'Data Engineer', employer: 'PayU · Bangalore, India', dates: '2020 — 2022 (2 yrs)', verified: true },
        { role: 'Junior Engineer', employer: 'Blackbuck · Bangalore, India', dates: '2018 — 2020 (2 yrs)', verified: false },
      ],
      portfolioItems: 5,
      avgRating: '4.9',
      ratingCount: 10,
      reviews: [
        { stars: 5, author: 'Grab', date: 'Apr 2026', text: 'Priya built our real-time analytics pipeline during the monsoon season (no joke). Handled scale, mentored our team, and documented everything. Exceptional.' },
        { stars: 5, author: 'Gojek', date: 'Feb 2026', text: 'Took over our broken Airflow setup and fixed it methodically. Her code was clean and she explained architecture decisions in clear terms.' },
      ],
    },
    engagements: {
      active: 2,
      past: 2,
      items: [
        {
          client: 'Databricks',
          role: 'Data Engineer',
          rate: '$48/hr',
          hoursPerWeek: 40,
          startDate: 'Feb 10, 2026',
          totalPaid: '$3,840',
          status: 'active',
        },
        {
          client: 'Freshworks',
          role: 'Senior Data Engineer',
          rate: '$52/hr',
          hoursPerWeek: 30,
          startDate: 'Jan 5, 2026',
          totalPaid: '$5,720',
          status: 'active',
        },
        {
          client: 'Postman',
          role: 'Data Engineer',
          rate: '$50/hr',
          hoursPerWeek: 35,
          startDate: 'Jul 1, 2025',
          endDate: 'Dec 15, 2025',
          totalPaid: '$22,750',
          status: 'past',
        },
        {
          client: 'Razorpay',
          role: 'Senior Data Engineer',
          rate: '$48/hr',
          hoursPerWeek: 30,
          startDate: 'Feb 15, 2025',
          endDate: 'Jun 30, 2025',
          totalPaid: '$15,840',
          status: 'past',
        },
      ],
    },
    financial: { totalEarned: '$54,000', last30Days: '$4,500', pendingPayout: '$1,200', paymentMethod: { provider: '—', account: '—', meta: '—' }, taxDocs: [], recentTransactions: [] },
    communications: {
      totalMessages: 68,
      threads: 3,
      totalCaption: '68 messages over 3 months',
      items: [
        {
          threadId: 'c7-1',
          avatar: 'av-8',
          name: 'Amit Patel',
          role: 'specialist',
          initials: 'AP', // Drift C
          lastMessage: 'Strong engagement updates. Databricks mentioned the real-time pipeline work was exceptional. Keep it up!',
          time: '6h ago',
          messageCount: 31,
          unread: true,
        },
        {
          threadId: 'c7-2',
          avatar: 'av-4',
          name: 'Databricks',
          role: 'client',
          initials: 'DB', // Drift C
          lastMessage: 'Current project wrapping up next month. Really impressed with how you handled the scale challenges.',
          time: '1d ago',
          messageCount: 22,
        },
        {
          threadId: 'c7-3',
          avatar: 'av-7',
          name: 'Freshworks',
          role: 'client',
          initials: 'FW', // Drift C
          lastMessage: 'Thanks for taking on the infrastructure redesign. Team learning a lot from your approach.',
          time: '4d ago',
          messageCount: 15,
        },
      ],
    },
    auditLog: {
      totalEvents: 15,
      recent: [
        { time: '4:30 PM', verb: 'Sign-in', target: 'Priya Sharma', detail: '192.168.55.22 · Bangalore · Chrome 125 · macOS 15', category: 'signin', outcome: { label: 'Verified', variant: 'success' }, dayGroup: { label: 'Today · April 30, 2026', count: 5 } },
        { time: '2:15 PM', verb: 'Contract signed', target: 'ENG-2026-234 with Databricks', detail: '$48/hr · 40 hrs/week · initial term', category: 'contract', outcome: { label: 'Active', variant: 'success' }, refId: 'ENG-2026-234' },
        { time: '10:45 AM', verb: 'Review received', target: '5 stars from Grab', detail: '"Priya built our real-time analytics pipeline during the monsoon season..."', category: 'review', outcome: { label: 'Approved', variant: 'success' }, refId: 'REV-2026-0412' },
        { time: '3:30 PM', verb: 'Contract signed', target: 'ENG-2026-198 with Freshworks', detail: '$52/hr · 30 hrs/week · ongoing', category: 'contract', outcome: { label: 'Active', variant: 'success' }, refId: 'ENG-2026-198' },
        { time: '9:20 AM', verb: 'Profile updated', target: 'added Snowflake to tools', detail: '192.168.55.22 · Bangalore · Chrome', category: 'profile', outcome: { label: 'Auto-approved', variant: 'success' }, refId: 'PRF-2026-0201' },
      ],
    },
    signals: {
      statusPill: { label: '1 historical flag · all clear', variant: 'warn' },
      groups: [
        {
          type: 'anti-cheat',
          title: 'Anti-cheat flag · Interview 1 (resolved)',
          severity: 'low',
          detail: 'Minor time zone inconsistency detected during Interview 1 recording. Reviewed and cleared as timezone clock drift. No malicious intent.',
          cardVariant: 'flag',
          status: { label: 'Resolved', variant: 'resolved' },
          metadata: {
            filedDate: 'May 15, 2024',
            resolvedBy: {
              name: 'Sarah Chen',
              date: 'May 15, 2024',
              turnaround: 'same day',
            },
            referenceId: 'INC-2024-0056',
          },
        },
        {
          type: 'reports-against',
          title: 'Reports filed against candidate',
          severity: 'none',
          detail: 'No reports filed against this candidate.',
          cardVariant: 'clear',
          status: { label: '0 of 0', variant: 'clear' },
        },
        {
          type: 'reports-by',
          title: 'Reports filed by candidate',
          severity: 'none',
          detail: 'Candidate has not filed any reports.',
          cardVariant: 'clear',
          status: { label: '0 of 0', variant: 'clear' },
        },
        {
          type: 'pattern-flags',
          title: 'Pattern flags · multi-account / similar identity',
          severity: 'none',
          detail: 'No pattern matches detected.',
          cardVariant: 'clear',
          status: { label: '0 matches', variant: 'clear' },
        },
      ],
    },
    privacy: {
      statusPill: {
        label: 'All clear',
        variant: 'default',
      },
      items: [
        {
          label: 'Data subject access requests',
          value: 'None active',
          valueVariant: 'success',
          detail: 'No GDPR / CCPA access requests filed by this candidate.',
          icon: 'document',
        },
        {
          label: 'Data export logs',
          value: '1 export',
          detail: 'Last export May 8, 2024 — candidate\'s initial onboarding data summary.',
          icon: 'download',
        },
        {
          label: 'Account deletion requests',
          value: 'None',
          valueVariant: 'success',
          detail: 'No active deletion requests · right-to-be-forgotten not invoked.',
          icon: 'trash',
        },
        {
          label: 'Active legal holds',
          value: 'None',
          valueVariant: 'success',
          detail: 'No legal holds, subpoenas, or law-enforcement requests on this account.',
          icon: 'alert',
        },
      ],
    },
    quickFacts: {
      joinedDate: 'May 12, 2024',
      timezoneShort: 'IST · UTC+5:30',
      languagesShort: 'HI (Native) · EN (C1)',
    },
  },

  'cand-008': {
    id: 'cand-008',
    name: 'James O\'Brien',
    email: 'james@example.com',
    country: 'Ireland',
    flag: '🇮🇪',
    title: 'Senior Engineer',
    status: 'pipeline',
    joinedMonth: 'Apr 2026',
    lastActive: '4h ago',
    lastActiveType: 'regular',
    hiresCount: 0,
    hiresAmount: '$0',
    hiresStatus: 'in-review',
    initials: 'JO',
    cohortBadge: 'Wave 5',
    atlasId: 'cand-008-stub',
    specialist: '—',
    region: '—',
    timezone: '—',
    languages: '—',
    identity: {
      verified: true,
      verifiedDate: 'Apr 5, 2026',
      verificationMethod: 'Persona Inc.',
      idType: 'Passport',
      issuingCountry: 'Ireland',
      nameOnId: 'James O\'Brien',
      dateOfBirth: 'Dec 19, 1989',
      age: 36,
      livenessCheck: 'Matched',
      biometricMatch: 94.8,
      method: 'Document + selfie + liveness',
      antifraudChecks: [
        { label: 'Document tampering check', status: 'pass', detail: 'No alterations detected' },
        { label: 'Face match', status: 'pass', detail: '94.8% confidence' },
      ],
      idPhotoFront: { issuer: 'Persona Inc.', uploadedAt: 'Apr 5, 2026 7:20 PM' },
      idPhotoBack: { uploadedAt: 'Apr 5, 2026 7:21 PM' },
      livenessVideo: { duration: '3.3s', recordedAt: 'Apr 5, 2026 7:22 PM', method: '5-point liveness' },
    },
    vettingPipeline: {
      complete: 5,
      total: 10,
      steps: [
        { title: 'Email verified', detail: 'james@example.com', timestamp: 'Apr 5, 2026 7:35 PM', meta: 'Persona magic-link', status: 'passed' },
        { title: 'WhatsApp verified', detail: '+353 87 ••• 9284', timestamp: 'Apr 5, 2026 7:48 PM', meta: 'OTP', status: 'passed' },
        { title: 'Identity verified', detail: 'Persona KYC', timestamp: 'Apr 5, 2026 8:05 PM', meta: '94.8% match', status: 'passed' },
        { title: 'Proctored English Assessment', detail: 'CEFR C1', timestamp: 'Apr 6, 2026 1:30 PM', score: 89, meta: '1st attempt', status: 'passed' },
        { title: 'AI Interview 1 (general)', detail: 'Communication 87 · Reasoning 84', timestamp: 'Apr 7, 2026 11:15 AM', score: 85, meta: '1st attempt', status: 'passed' },
        { title: 'Talent Specialist assigned', detail: 'Sarah Thompson', timestamp: 'Apr 7, 2026 11:20 AM', meta: 'EU-WEST · Auto-routed', status: 'in-progress' },
        { title: 'AI Interview 2 (Engineering)', detail: 'Scheduled for Apr 10', timestamp: 'Apr 9, 2026 2:00 PM', meta: 'Calendar invite sent', status: 'in-progress' },
        { title: 'Profile + Intro recording', detail: 'Awaiting interview results', timestamp: '—', meta: 'Pending', status: 'locked' },
        { title: 'Final review', detail: 'Pending', timestamp: '—', meta: 'Awaiting specialist review', status: 'locked' },
        { title: 'Live on Atlas', detail: 'Pending', timestamp: '—', meta: 'Awaiting final approval', status: 'locked' },
      ],
    },
    profileSnapshot: {
      bio: '"Making the implicit explicit." 12+ years writing backend systems. Expert in code clarity and refactoring messy legacy codebases. Recently led infrastructure modernization at a FTSE 100 company. Focused on building teams where engineers enjoy the craft.',
      hourlyRate: '$58/hr',
      hoursPerWeek: 35,
      availableFrom: 'Immediate',
      skills: [
        { name: 'C#', highlighted: true },
        { name: '.NET', highlighted: true },
        { name: 'Azure', highlighted: true },
        { name: 'SQL Server' },
        { name: 'AWS' },
        { name: 'Leadership' },
        { name: 'Code Review' },
        { name: 'System Architecture' },
      ],
      tools: ['Visual Studio', 'Azure DevOps', 'Git', 'SQL Server', 'Docker', 'Kubernetes', 'RabbitMQ', 'Datadog'],
      workHistory: [
        { role: 'Principal Engineer', employer: 'FTSE 100 Financial Services · London', dates: '2019 — 2026 (7 yrs)', verified: true },
        { role: 'Senior Backend Engineer', employer: 'Revolut · Dublin', dates: '2017 — 2019 (2 yrs)', verified: false },
      ],
      portfolioItems: 0,
      avgRating: '—',
      ratingCount: 0,
      reviews: [],
    },
    engagements: { active: 0, past: 0, items: [] },
    financial: { totalEarned: '$0', last30Days: '$0', pendingPayout: '$0', paymentMethod: { provider: '—', account: '—', meta: '—' }, taxDocs: [], recentTransactions: [] },
    communications: { totalMessages: 0, threads: 0, totalCaption: 'no messages yet', items: [] },
    auditLog: {
      totalEvents: 1,
      recent: [
        { time: '7:35 PM', verb: 'Account created', target: 'via email signup', detail: 'james@example.com', category: 'created', refId: 'ACC-2026-001898', dayGroup: { label: 'Today · April 30, 2026', count: 1 } },
      ],
    },
    signals: {
      statusPill: { label: 'All clear', variant: 'default' },
      groups: [
        { type: 'anti-cheat', title: 'Anti-cheat flags', severity: 'none', detail: 'No anti-cheat flags on record.', cardVariant: 'clear', status: { label: '0 flags', variant: 'clear' } },
        { type: 'reports-against', title: 'Reports filed against candidate', severity: 'none', detail: 'No reports filed against this candidate.', cardVariant: 'clear', status: { label: '0 of 0', variant: 'clear' } },
        { type: 'reports-by', title: 'Reports filed by candidate', severity: 'none', detail: 'Candidate has not filed any reports.', cardVariant: 'clear', status: { label: '0 of 0', variant: 'clear' } },
        { type: 'pattern-flags', title: 'Pattern flags · multi-account / similar identity', severity: 'none', detail: 'No pattern matches detected.', cardVariant: 'clear', status: { label: '0 matches', variant: 'clear' } },
      ],
    },
    privacy: {
      statusPill: {
        label: 'All clear',
        variant: 'default',
      },
      items: [
        {
          label: 'Data subject access requests',
          value: 'None active',
          valueVariant: 'success',
          detail: 'No GDPR / CCPA access requests filed by this candidate.',
          icon: 'document',
        },
        {
          label: 'Data export logs',
          value: 'None',
          detail: 'No data export requests initiated.',
          icon: 'download',
        },
        {
          label: 'Account deletion requests',
          value: 'None',
          valueVariant: 'success',
          detail: 'No active deletion requests · right-to-be-forgotten not invoked.',
          icon: 'trash',
        },
        {
          label: 'Active legal holds',
          value: 'None',
          valueVariant: 'success',
          detail: 'No legal holds, subpoenas, or law-enforcement requests on this account.',
          icon: 'alert',
        },
      ],
    },
    quickFacts: {
      joinedDate: 'Apr 5, 2026',
      timezoneShort: 'IST · UTC+0',
      languagesShort: 'EN (Native) · FR (B1)',
    },
  },
};
