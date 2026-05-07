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
  'cl-001-abc123': {
    id: 'cl-001-abc123',
    name: 'TechVentures Inc.',
    email: 'hiring@techventures.com',
    status: 'verified',
    avatarGradient: 'av-2',
    badge: null,
    tags: ['SaaS', 'Startup', 'US-based'],
    initials: 'TV',
    atlasId: 'cl-001-abc123',
    location: 'San Francisco, CA',
    timezone: 'America/Los_Angeles',
    companySize: '10–50 employees',
    industry: 'SaaS',
    specialist: 'Alex Rivera',
  },

  'cl-002-7e1b3f': {
    id: 'cl-002-7e1b3f',
    name: 'Studio Berlin GmbH',
    email: 'contact@studioberlin.de',
    status: 'verified',
    avatarGradient: 'av-3',
    badge: 'Top Client',
    tags: ['Design', 'Premium', 'Europe'],
    initials: 'SB',
    atlasId: 'cl-002-7e1b3f',
    location: 'Berlin, Germany',
    timezone: 'Europe/Berlin',
    companySize: '12–50 employees',
    industry: 'Design & Brand Identity',
    specialist: 'Daniel Kovács',
  },

  'cl-003-xyz789': {
    id: 'cl-003-xyz789',
    name: 'GlobalLogistics Ltd',
    email: 'operations@globallogistics.uk',
    status: 'pending',
    avatarGradient: 'av-4',
    badge: null,
    tags: ['Logistics', 'Enterprise', 'UK'],
    initials: 'GL',
    atlasId: 'cl-003-xyz789',
    location: 'London, UK',
    timezone: 'Europe/London',
    companySize: '100–500 employees',
    industry: 'Logistics & Supply Chain',
    specialist: null,
  },

  'cl-004-pqr456': {
    id: 'cl-004-pqr456',
    name: 'CloudMetrics GmbH',
    email: 'talent@cloudmetrics.io',
    status: 'verified',
    avatarGradient: 'av-6',
    badge: 'Top Client',
    tags: ['Analytics', 'Enterprise', 'High-Confidentiality'],
    initials: 'CM',
    atlasId: 'cl-004-pqr456',
    location: 'Munich, Germany',
    timezone: 'Europe/Berlin',
    companySize: '200+ employees',
    industry: 'Data Analytics & AI',
    specialist: 'Sarah Mitchell',
  },

  'cl-005-def567': {
    id: 'cl-005-def567',
    name: 'LocalServices LLC',
    email: 'admin@localservices.us',
    status: 'suspended',
    avatarGradient: 'av-7',
    badge: null,
    tags: ['Services', 'Suspended', 'US'],
    initials: 'LS',
    atlasId: 'cl-005-def567',
    location: 'Austin, TX',
    timezone: 'America/Chicago',
    companySize: '5–10 employees',
    industry: 'Consulting Services',
    specialist: null,
    statusBanner: {
      title: 'Account Suspended',
      detail: 'Suspended due to repeated payment failures. Contact support to restore access.',
    },
  },

  'cl-006-ghi890': {
    id: 'cl-006-ghi890',
    name: 'RetroShop Inc.',
    email: 'old@retroshop.vintage',
    status: 'churned',
    avatarGradient: 'av-8',
    badge: null,
    tags: ['Retail', 'Inactive', 'Legacy'],
    initials: 'RS',
    atlasId: 'cl-006-ghi890',
    location: 'Portland, OR',
    timezone: 'America/Los_Angeles',
    companySize: '20–50 employees',
    industry: 'Retail & E-commerce',
    specialist: null,
  },
};
