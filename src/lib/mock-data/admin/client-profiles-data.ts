/**
 * Phase 6a — Client Detail Page Data
 * Structured per Step 5 patterns.
 * Reuses: CommunicationThread, AuditEntry, SignalGroup, TrustSignalsSection, AVATAR_GRADIENTS
 */

import {
  CommunicationThread,
  AuditEntry,
  SignalGroup,
  TrustSignalsSection,
  AVATAR_GRADIENTS,
} from './candidate-profiles-data';

// ============================================================
// TYPES
// ============================================================

export interface ClientProfile {
  // Basic info
  id: string;
  name: string;
  email: string;
  status: 'verified' | 'pending' | 'suspended' | 'churned';
  avatarGradient: string; // av-1 to av-12 key
  badge?: 'Top Client' | 'Growing' | null;
  tags: string[];

  // Hero section
  initials: string;
  atlasId: string;
  location?: string;
  timezone?: string;
  companySize?: string;
  industry?: string;
  specialist?: string | null;

  statusBanner?: {
    title: string;
    detail: string;
  };

  // Quick facts (right rail, Phase 6m)
  quickFacts?: {
    company_name: string;
    industry: string;
    founded_year: number;
    employee_count: number;
    subscription_tier: string;
    [key: string]: any;
  };

  // Identity Verification (Section 01, Phases 6d–6f)
  identity?: {
    kyb?: {
      status: 'verified' | 'pending' | 'failed';
      legal_entity?: string;
      registry?: string;
      vat_id?: string;
      founded?: string;
      standing?: string;
      verified_date?: string;
    };
    signatory_kyc?: {
      status: 'verified' | 'pending' | 'failed';
      name?: string;
      role?: string;
      id_type?: string;
      liveness?: string;
      biometric_match?: number;
    };
    sanctions_screening?: {
      status: 'passed' | 'review' | 'failed';
      screened_date?: string;
    };
    documents?: Array<{
      name: string;
      type: string;
      uploaded_date: string;
      status: 'valid' | 'expired' | 'pending';
    }>;
  };

  // Onboarding Status (Section 02, Phase 6g)
  onboarding?: {
    current_step?: number;
    total_steps?: number;
    steps?: Array<{
      step: number;
      label: string;
      status: 'completed' | 'in-progress' | 'pending';
      date?: string;
    }>;
  };

  // Profile Snapshot (Section 03, Phase 6h)
  profile?: {
    about?: string;
    company_details?: {
      founded_year?: number;
      employee_count?: number;
      industry?: string;
      website?: string;
    };
    categories_hired?: string[];
    trust_tier?: 'bronze' | 'silver' | 'gold' | 'platinum';
    reviews?: number;
  };

  // Hiring History (Section 04, Phase 6i)
  hiring_history?: {
    active?: Array<{
      id: string;
      name: string;
      role: string;
      duration: string;
      rate: number;
      status: 'active' | 'completed' | 'paused';
      initials: string;
      avatarGradient: string;
    }>;
    past?: Array<{
      id: string;
      name: string;
      role: string;
      duration: string;
      rate: number;
      status: 'completed';
      initials: string;
      avatarGradient: string;
    }>;
  };

  // Financial Activity (Section 05, Phase 6j)
  financial?: {
    lifetime_spent?: string;
    last_30d?: string;
    outstanding?: string;
    payment_methods?: Array<{
      type: 'card' | 'bank';
      label: string;
      last4: string;
    }>;
    subscription?: 'starter' | 'pro' | 'enterprise';
    transactions?: Array<{
      date: string;
      amount: string;
      type: 'charge' | 'credit';
      description: string;
      status?: 'captured' | 'pending' | 'failed';
    }>;
  };

  // Communications (Section 06, Phase 6c — reuses ProfileSectionCommunications)
  communications?: {
    totalMessages?: number;
    threads?: number;
    totalCaption?: string;
    items?: CommunicationThread[];
  };

  // Trust & Safety Signals (Section 07, Phase 6k)
  trust_safety?: Array<{
    label: string;
    value: string | number;
    variant: 'ok' | 'warn' | 'danger';
    icon?: string;
    // Confidentiality card only:
    confidentiality_severity?: 'Standard' | 'Active';
    detail?: string;
  }>;

  // Audit Log (Section 08, Phase 6l)
  audit?: AuditEntry[];
}

// ============================================================
// 6 CLIENT FIXTURES (cl-001 through cl-006)
// ============================================================

export const CLIENT_PROFILES: Record<string, ClientProfile> = {
  'cl-001-acme': {
    id: 'cl-001-acme',
    name: 'Acme Holdings, Inc.',
    email: 'finance@acme-holdings.test',
    status: 'suspended',
    avatarGradient: 'av-2',
    badge: null,
    tags: ['Tech', 'Banned', 'USA'],
    initials: 'AH',
    atlasId: 'cl-001-acme',
    location: 'New York, NY',
    timezone: 'America/New_York',
    companySize: '100–500 employees',
    industry: 'Tech',
    specialist: null,
  },

  'cl-002-7e1b3f': {
    id: 'cl-002-7e1b3f',
    name: 'Studio Berlin GmbH',
    email: 'hires@studio-berlin.test',
    status: 'verified',
    avatarGradient: 'av-3',
    badge: 'Top Client',
    tags: ['Design', 'Premium', 'Europe'],
    initials: 'SB',
    atlasId: 'cl-002-7e1b3f',
    location: 'Berlin, Germany',
    timezone: 'Europe/Berlin',
    companySize: '12–50 employees',
    industry: 'Design',
    specialist: 'Daniel Kovács',
  },

  'cl-003-quantum': {
    id: 'cl-003-quantum',
    name: 'Quantum Robotics Pte. Ltd.',
    email: 'talent@quantumrobotics.test',
    status: 'verified',
    avatarGradient: 'av-4',
    badge: null,
    tags: ['Robotics', 'Enterprise', 'Singapore'],
    initials: 'QR',
    atlasId: 'cl-003-quantum',
    location: 'Singapore',
    timezone: 'Asia/Singapore',
    companySize: '50–100 employees',
    industry: 'Robotics',
    specialist: null,
  },

  'cl-004-medco': {
    id: 'cl-004-medco',
    name: 'Lighthouse Med Co.',
    email: 'people@lighthouse-med.test',
    status: 'verified',
    avatarGradient: 'av-6',
    badge: null,
    tags: ['Healthcare', 'Verified', 'Canada'],
    initials: 'LM',
    atlasId: 'cl-004-medco',
    location: 'Toronto, ON',
    timezone: 'America/Toronto',
    companySize: '50–100 employees',
    industry: 'Healthcare',
    specialist: 'Sarah Reyes',
  },

  'cl-005-tundra': {
    id: 'cl-005-tundra',
    name: 'Open Tundra Ltd.',
    email: 'hiring@opentundra.test',
    status: 'pending',
    avatarGradient: 'av-7',
    badge: null,
    tags: ['Sustainability', 'Unverified', 'Iceland'],
    initials: 'OT',
    atlasId: 'cl-005-tundra',
    location: 'Reykjavik, Iceland',
    timezone: 'Atlantic/Reykjavik',
    companySize: '10–50 employees',
    industry: 'Sustainability',
    specialist: null,
  },

  'cl-006-lagos': {
    id: 'cl-006-lagos',
    name: 'The Lagos Loom',
    email: 'hr@lagosloom.test',
    status: 'verified',
    avatarGradient: 'av-8',
    badge: null,
    tags: ['Manufacturing', 'Verified', 'Nigeria'],
    initials: 'TL',
    atlasId: 'cl-006-lagos',
    location: 'Lagos, Nigeria',
    timezone: 'Africa/Lagos',
    companySize: '20–50 employees',
    industry: 'Manufacturing',
    specialist: 'Kofi Asante',
  },
};
