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

// KYB Field with optional badge
interface KYBFieldDetail {
  label: string;
  value: string;
  badge?: {
    label: 'Active' | 'Match' | 'Valid' | 'Verified';
    variant: 'success' | 'warn' | 'neutral';
  };
}

// Business KYB tile data (Phase 6d)
interface KYBTile {
  status: 'verified' | 'pending' | 'failed';
  tileName: string;
  verifiedDate: string;
  verifiedBy: string;
  fields: KYBFieldDetail[];
}

// Signatory KYC tile data (Phase 6e)
interface KYCFieldDetail {
  label: string;
  value: string;
  badge?: {
    label: 'Match' | 'Verified' | 'Valid' | 'Active';
    variant: 'success' | 'warn' | 'neutral';
  };
}

interface KYCBiometricField {
  label: string;
  score: number;
  barLabel: string;
  confidence?: string;
}

interface SignatoryKYC {
  status: 'verified' | 'pending' | 'failed';
  tileName: string;
  verifiedDate: string;
  verifiedBy: string;
  fields: KYCFieldDetail[];
  biometric?: KYCBiometricField;
}

// Sanctions & PEP screening (Phase 6f)
interface SanctionsResult {
  listLabel: string; // "OFAC SDN list" | "EU consolidated list" | "UN sanctions" | "Politically Exposed Person check"
  status: {
    label: 'Clear' | 'Hit' | 'Review' | 'Pending';
    variant: 'success' | 'warn' | 'danger';
  };
}

interface SanctionsScreening {
  summary: string;
  summaryVariant: 'success' | 'warn' | 'danger';
  rows: SanctionsResult[];
}

// Documents on file (Phase 6f)
interface ClientDocument {
  name: string;
  filename: string;
  fileSize: string;
  uploadedDate: string;
}

interface DocumentsBlock {
  summary: string;
  summaryVariant: 'success' | 'warn';
  documents: ClientDocument[];
}

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
    sectionStatus: {
      label: string;
      variant: 'verified' | 'pending' | 'failed' | 'warn';
    };
    kyb?: KYBTile;
    signatory_kyc?: SignatoryKYC;
    sanctions?: SanctionsScreening;
    documents?: DocumentsBlock;
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
    statusBanner: {
      title: 'Account Suspended',
      detail: 'Suspension active · pending review',
    },
    identity: {
      sectionStatus: {
        label: 'KYB verified · account suspended',
        variant: 'warn',
      },
      kyb: {
        status: 'verified',
        tileName: 'Business KYB verified',
        verifiedDate: 'Aug 14, 2022',
        verifiedBy: 'Persona Inc. (Business KYB)',
        fields: [
          {
            label: 'Legal entity',
            value: 'Acme Holdings, Inc.',
            badge: { label: 'Active', variant: 'success' },
          },
          {
            label: 'Registry',
            value: 'Delaware C-Corp · 87234561',
            badge: { label: 'Match', variant: 'success' },
          },
          {
            label: 'VAT ID',
            value: 'EIN 47-2891034',
            badge: { label: 'Valid', variant: 'success' },
          },
          {
            label: 'Founded',
            value: 'February 1998 (28 years)',
          },
          {
            label: 'Registered address',
            value: '1209 Orange Street, Wilmington, DE 19801',
          },
          {
            label: 'Standing',
            value: 'Account suspended — pending compliance review',
          },
        ],
      },
      signatory_kyc: {
        status: 'verified',
        tileName: 'Authorized signatory verified',
        verifiedDate: 'Aug 14, 2022',
        verifiedBy: 'Persona KYC + liveness',
        fields: [
          {
            label: 'Signatory',
            value: 'Richard Acme',
            badge: { label: 'Match', variant: 'success' },
          },
          {
            label: 'Role',
            value: 'Chief Executive Officer',
          },
          {
            label: 'ID type',
            value: 'US Passport',
            badge: { label: 'Verified', variant: 'success' },
          },
          {
            label: 'Liveness',
            value: 'Matched',
            badge: { label: 'Match', variant: 'success' },
          },
          {
            label: 'Authority proof',
            value: 'Articles of Incorporation · Board Resolution',
          },
        ],
        biometric: {
          label: 'Biometric match',
          score: 98.1,
          barLabel: '98.1%',
        },
      },
      sanctions: {
        summary: 'All clear · screened Aug 14, 2022',
        summaryVariant: 'success',
        rows: [
          { listLabel: 'OFAC SDN list', status: { label: 'Clear', variant: 'success' } },
          { listLabel: 'EU consolidated list', status: { label: 'Clear', variant: 'success' } },
          { listLabel: 'UN sanctions', status: { label: 'Clear', variant: 'success' } },
          { listLabel: 'Politically Exposed Person check', status: { label: 'Clear', variant: 'success' } },
        ],
      },
      documents: {
        summary: '4 documents · all valid',
        summaryVariant: 'success',
        documents: [
          { name: 'Articles of Incorporation', filename: 'Acme_Holdings_AoI.pdf', fileSize: '2.1 MB', uploadedDate: 'uploaded Aug 12, 2022' },
          { name: 'Board Resolution (CEO authority)', filename: 'Acme_Board_Resolution.pdf', fileSize: '0.8 MB', uploadedDate: 'uploaded Aug 12, 2022' },
          { name: 'IRS EIN letter', filename: 'Acme_EIN_letter.pdf', fileSize: '0.4 MB', uploadedDate: 'uploaded Aug 13, 2022' },
          { name: 'Annual filing — 2023', filename: 'Acme_Annual_2023.pdf', fileSize: '1.7 MB', uploadedDate: 'uploaded Mar 2024' },
        ],
      },
    },
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
    identity: {
      sectionStatus: {
        label: 'KYB + Signatory verified',
        variant: 'verified',
      },
      kyb: {
        status: 'verified',
        tileName: 'Business KYB verified',
        verifiedDate: 'Jan 18, 2024',
        verifiedBy: 'Persona Inc. (Business KYB)',
        fields: [
          {
            label: 'Legal entity',
            value: 'Studio Berlin GmbH',
            badge: { label: 'Active', variant: 'success' },
          },
          {
            label: 'Registry',
            value: 'HRB 178432 · Berlin Charlottenburg',
            badge: { label: 'Match', variant: 'success' },
          },
          {
            label: 'VAT ID',
            value: 'DE318472918',
            badge: { label: 'Valid', variant: 'success' },
          },
          {
            label: 'Founded',
            value: 'March 2018 (8 years)',
          },
          {
            label: 'Registered address',
            value: 'Torstraße 109, 10119 Berlin, DE',
          },
          {
            label: 'Standing',
            value: 'Good standing · last filing Apr 2026',
          },
        ],
      },
      signatory_kyc: {
        status: 'verified',
        tileName: 'Authorized signatory verified',
        verifiedDate: 'Jan 18, 2024',
        verifiedBy: 'Persona KYC + liveness',
        fields: [
          {
            label: 'Signatory',
            value: 'Lukas Hoffmann',
            badge: { label: 'Match', variant: 'success' },
          },
          {
            label: 'Role',
            value: 'Geschäftsführer (Managing Director)',
          },
          {
            label: 'ID type',
            value: 'German Personalausweis',
            badge: { label: 'Verified', variant: 'success' },
          },
          {
            label: 'Liveness',
            value: 'Matched',
            badge: { label: 'Match', variant: 'success' },
          },
          {
            label: 'Authority proof',
            value: 'Articles of Incorporation · Power of Attorney',
          },
        ],
        biometric: {
          label: 'Biometric match',
          score: 97.8,
          barLabel: '97.8%',
        },
      },
      sanctions: {
        summary: 'All clear · screened Jan 18, 2024',
        summaryVariant: 'success',
        rows: [
          { listLabel: 'OFAC SDN list', status: { label: 'Clear', variant: 'success' } },
          { listLabel: 'EU consolidated list', status: { label: 'Clear', variant: 'success' } },
          { listLabel: 'UN sanctions', status: { label: 'Clear', variant: 'success' } },
          { listLabel: 'Politically Exposed Person check', status: { label: 'Clear', variant: 'success' } },
        ],
      },
      documents: {
        summary: '5 documents · all valid',
        summaryVariant: 'success',
        documents: [
          { name: 'Articles of Incorporation', filename: 'Studio_Berlin_GmbH_AoI.pdf', fileSize: '1.4 MB', uploadedDate: 'uploaded Jan 16, 2024' },
          { name: 'Handelsregister Auszug (HRB)', filename: 'HRB_178432_Auszug.pdf', fileSize: '320 KB', uploadedDate: 'refreshed Apr 12, 2026' },
          { name: 'Power of Attorney (Lukas Hoffmann)', filename: 'PoA_LHoffmann.pdf', fileSize: '240 KB', uploadedDate: 'uploaded Jan 18, 2024' },
          { name: 'VAT Registration Certificate', filename: 'DE318472918_certificate.pdf', fileSize: '180 KB', uploadedDate: 'uploaded Jan 16, 2024' },
          { name: 'Annual filing 2025', filename: 'Bundesanzeiger_2025.pdf', fileSize: '480 KB', uploadedDate: 'auto-refreshed Apr 1, 2026' },
        ],
      },
    },
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
    identity: {
      sectionStatus: {
        label: 'KYB + Signatory verified',
        variant: 'verified',
      },
      kyb: {
        status: 'verified',
        tileName: 'Business KYB verified',
        verifiedDate: 'Sep 03, 2023',
        verifiedBy: 'Persona Inc. (Business KYB)',
        fields: [
          {
            label: 'Legal entity',
            value: 'Quantum Robotics Pte. Ltd.',
            badge: { label: 'Active', variant: 'success' },
          },
          {
            label: 'Registry',
            value: 'UEN 202312847N · ACRA Singapore',
            badge: { label: 'Match', variant: 'success' },
          },
          {
            label: 'VAT ID',
            value: 'GST M2-0019283-X',
            badge: { label: 'Valid', variant: 'success' },
          },
          {
            label: 'Founded',
            value: 'May 2019 (7 years)',
          },
          {
            label: 'Registered address',
            value: '8 Cross Street, #11-00, Manulife Tower, Singapore 048424',
          },
          {
            label: 'Standing',
            value: 'Good standing · last filing Mar 2026',
          },
        ],
      },
      signatory_kyc: {
        status: 'verified',
        tileName: 'Authorized signatory verified',
        verifiedDate: 'Sep 03, 2023',
        verifiedBy: 'Persona KYC + liveness',
        fields: [
          {
            label: 'Signatory',
            value: 'Dr. Rajesh Patel',
            badge: { label: 'Match', variant: 'success' },
          },
          {
            label: 'Role',
            value: 'Founder & Managing Director',
          },
          {
            label: 'ID type',
            value: 'Singapore NRIC',
            badge: { label: 'Verified', variant: 'success' },
          },
          {
            label: 'Liveness',
            value: 'Matched',
            badge: { label: 'Match', variant: 'success' },
          },
          {
            label: 'Authority proof',
            value: 'Articles of Association · Director Resolution',
          },
        ],
        biometric: {
          label: 'Biometric match',
          score: 96.8,
          barLabel: '96.8%',
        },
      },
      sanctions: {
        summary: 'All clear · screened Sep 03, 2023',
        summaryVariant: 'success',
        rows: [
          { listLabel: 'OFAC SDN list', status: { label: 'Clear', variant: 'success' } },
          { listLabel: 'EU consolidated list', status: { label: 'Clear', variant: 'success' } },
          { listLabel: 'UN sanctions', status: { label: 'Clear', variant: 'success' } },
          { listLabel: 'Politically Exposed Person check', status: { label: 'Clear', variant: 'success' } },
        ],
      },
      documents: {
        summary: '5 documents · all valid',
        summaryVariant: 'success',
        documents: [
          { name: 'Articles of Association', filename: 'Quantum_Robotics_AoA.pdf', fileSize: '1.6 MB', uploadedDate: 'uploaded Sep 01, 2023' },
          { name: 'Director Resolution', filename: 'Quantum_Director_Resolution.pdf', fileSize: '0.6 MB', uploadedDate: 'uploaded Sep 01, 2023' },
          { name: 'ACRA Bizfile', filename: 'Quantum_ACRA_Bizfile.pdf', fileSize: '0.9 MB', uploadedDate: 'uploaded Sep 02, 2023' },
          { name: 'GST registration certificate', filename: 'Quantum_GST_Cert.pdf', fileSize: '0.3 MB', uploadedDate: 'uploaded Sep 02, 2023' },
          { name: 'Audited financials FY2023', filename: 'Quantum_Audited_FY2023.pdf', fileSize: '2.4 MB', uploadedDate: 'uploaded Mar 2024' },
        ],
      },
    },
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
    identity: {
      sectionStatus: {
        label: 'KYB + Signatory verified',
        variant: 'verified',
      },
      kyb: {
        status: 'verified',
        tileName: 'Business KYB verified',
        verifiedDate: 'Mar 12, 2023',
        verifiedBy: 'Persona Inc. (Business KYB)',
        fields: [
          {
            label: 'Legal entity',
            value: 'Lighthouse Medical Co. Ltd.',
            badge: { label: 'Active', variant: 'success' },
          },
          {
            label: 'Registry',
            value: 'BC Corp 1287456 · British Columbia',
            badge: { label: 'Match', variant: 'success' },
          },
          {
            label: 'VAT ID',
            value: 'GST/HST 832947561 RC0001',
            badge: { label: 'Valid', variant: 'success' },
          },
          {
            label: 'Founded',
            value: 'November 2011 (15 years)',
          },
          {
            label: 'Registered address',
            value: '885 W Georgia Street, Vancouver, BC V6C 3E8',
          },
          {
            label: 'Standing',
            value: 'Good standing · last filing Feb 2026',
          },
        ],
      },
      signatory_kyc: {
        status: 'verified',
        tileName: 'Authorized signatory verified',
        verifiedDate: 'Mar 12, 2023',
        verifiedBy: 'Persona KYC + liveness',
        fields: [
          {
            label: 'Signatory',
            value: 'Dr. Sarah Chen MD',
            badge: { label: 'Match', variant: 'success' },
          },
          {
            label: 'Role',
            value: 'Medical Director',
          },
          {
            label: 'ID type',
            value: 'Canadian Passport',
            badge: { label: 'Verified', variant: 'success' },
          },
          {
            label: 'Liveness',
            value: 'Matched',
            badge: { label: 'Match', variant: 'success' },
          },
          {
            label: 'Authority proof',
            value: 'Articles of Incorporation · Board Minutes',
          },
        ],
        biometric: {
          label: 'Biometric match',
          score: 97.2,
          barLabel: '97.2%',
        },
      },
      sanctions: {
        summary: 'All clear · screened Mar 12, 2023',
        summaryVariant: 'success',
        rows: [
          { listLabel: 'OFAC SDN list', status: { label: 'Clear', variant: 'success' } },
          { listLabel: 'EU consolidated list', status: { label: 'Clear', variant: 'success' } },
          { listLabel: 'UN sanctions', status: { label: 'Clear', variant: 'success' } },
          { listLabel: 'Politically Exposed Person check', status: { label: 'Clear', variant: 'success' } },
        ],
      },
      documents: {
        summary: '5 documents · all valid',
        summaryVariant: 'success',
        documents: [
          { name: 'Articles of Incorporation', filename: 'Lighthouse_AoI.pdf', fileSize: '1.3 MB', uploadedDate: 'uploaded Mar 09, 2023' },
          { name: 'Board Minutes', filename: 'Lighthouse_Board_Minutes.pdf', fileSize: '0.7 MB', uploadedDate: 'uploaded Mar 09, 2023' },
          { name: 'BC Corp Registration', filename: 'Lighthouse_BC_Reg.pdf', fileSize: '0.5 MB', uploadedDate: 'uploaded Mar 10, 2023' },
          { name: 'GST/HST registration', filename: 'Lighthouse_GST_Cert.pdf', fileSize: '0.2 MB', uploadedDate: 'uploaded Mar 10, 2023' },
          { name: 'Healthcare licensing certificate', filename: 'Lighthouse_Health_Cert.pdf', fileSize: '1.1 MB', uploadedDate: 'uploaded Mar 11, 2023' },
        ],
      },
    },
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
    identity: {
      sectionStatus: {
        label: 'KYB pending review',
        variant: 'warn',
      },
      kyb: {
        status: 'pending',
        tileName: 'Business KYB pending',
        verifiedDate: 'Apr 22, 2026 (submitted)',
        verifiedBy: 'Persona Inc. — review in progress',
        fields: [
          {
            label: 'Legal entity',
            value: 'Open Tundra Ltd.',
          },
          {
            label: 'Registry',
            value: 'Iceland Companies Reg 6204812490',
            badge: { label: 'Match', variant: 'success' },
          },
          {
            label: 'VAT ID',
            value: 'IS 144782',
          },
          {
            label: 'Founded',
            value: 'August 2024 (1 year)',
          },
          {
            label: 'Registered address',
            value: 'Laugavegur 174, 105 Reykjavík, Iceland',
          },
          {
            label: 'Standing',
            value: 'New entity — verification in progress',
          },
        ],
      },
      signatory_kyc: {
        status: 'pending',
        tileName: 'Authorized signatory pending',
        verifiedDate: 'Apr 22, 2026 (submitted)',
        verifiedBy: 'Persona KYC — under review',
        fields: [
          {
            label: 'Signatory',
            value: 'Jón Einarsson',
            badge: { label: 'Match', variant: 'success' },
          },
          {
            label: 'Role',
            value: 'Founder',
          },
          {
            label: 'ID type',
            value: 'Icelandic Passport',
            badge: { label: 'Verified', variant: 'success' },
          },
          {
            label: 'Liveness',
            value: 'Submitted — pending liveness check',
          },
          {
            label: 'Authority proof',
            value: 'Power of Attorney only',
          },
        ],
        // NOTE: biometric field OMITTED for pending state (Correction 2)
      },
      sanctions: {
        summary: 'Screening in progress · 2 of 4 lists checked',
        summaryVariant: 'warn',
        rows: [
          { listLabel: 'OFAC SDN list', status: { label: 'Clear', variant: 'success' } },
          { listLabel: 'EU consolidated list', status: { label: 'Pending', variant: 'warn' } },
          { listLabel: 'UN sanctions', status: { label: 'Pending', variant: 'warn' } },
          { listLabel: 'Politically Exposed Person check', status: { label: 'Clear', variant: 'success' } },
        ],
      },
      documents: {
        summary: '2 documents uploaded · 3 missing',
        summaryVariant: 'warn',
        documents: [
          { name: 'Iceland Companies Reg certificate', filename: 'OpenTundra_Reg_Cert.pdf', fileSize: '0.8 MB', uploadedDate: 'uploaded Apr 22, 2026' },
          { name: 'Power of Attorney', filename: 'OpenTundra_PoA.pdf', fileSize: '0.3 MB', uploadedDate: 'uploaded Apr 22, 2026' },
        ],
      },
    },
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
    identity: {
      sectionStatus: {
        label: 'KYB + Signatory verified',
        variant: 'verified',
      },
      kyb: {
        status: 'verified',
        tileName: 'Business KYB verified',
        verifiedDate: 'Jan 28, 2024',
        verifiedBy: 'Persona Inc. (Business KYB)',
        fields: [
          {
            label: 'Legal entity',
            value: 'The Lagos Loom Limited',
            badge: { label: 'Active', variant: 'success' },
          },
          {
            label: 'Registry',
            value: 'RC 1487293 · CAC Nigeria',
            badge: { label: 'Match', variant: 'success' },
          },
          {
            label: 'VAT ID',
            value: 'TIN 28473918-0001',
            badge: { label: 'Valid', variant: 'success' },
          },
          {
            label: 'Founded',
            value: 'July 2017 (8 years)',
          },
          {
            label: 'Registered address',
            value: '14 Adeola Odeku Street, Victoria Island, Lagos',
          },
          {
            label: 'Standing',
            value: 'Good standing · last filing Jan 2026',
          },
        ],
      },
      signatory_kyc: {
        status: 'verified',
        tileName: 'Authorized signatory verified',
        verifiedDate: 'Jan 28, 2024',
        verifiedBy: 'Persona KYC + liveness',
        fields: [
          {
            label: 'Signatory',
            value: 'Chukwuma Adeyemi',
            badge: { label: 'Match', variant: 'success' },
          },
          {
            label: 'Role',
            value: 'Managing Director',
          },
          {
            label: 'ID type',
            value: 'Nigerian National ID',
            badge: { label: 'Verified', variant: 'success' },
          },
          {
            label: 'Liveness',
            value: 'Matched',
            badge: { label: 'Match', variant: 'success' },
          },
          {
            label: 'Authority proof',
            value: 'Articles of Incorporation · Power of Attorney',
          },
        ],
        biometric: {
          label: 'Biometric match',
          score: 95.4,
          barLabel: '95.4%',
        },
      },
      sanctions: {
        summary: 'All clear · screened Jan 28, 2024',
        summaryVariant: 'success',
        rows: [
          { listLabel: 'OFAC SDN list', status: { label: 'Clear', variant: 'success' } },
          { listLabel: 'EU consolidated list', status: { label: 'Clear', variant: 'success' } },
          { listLabel: 'UN sanctions', status: { label: 'Clear', variant: 'success' } },
          { listLabel: 'Politically Exposed Person check', status: { label: 'Clear', variant: 'success' } },
        ],
      },
      documents: {
        summary: '5 documents · all valid',
        summaryVariant: 'success',
        documents: [
          { name: 'Articles of Incorporation', filename: 'Lagos_Loom_AoI.pdf', fileSize: '1.5 MB', uploadedDate: 'uploaded Jan 25, 2024' },
          { name: 'Power of Attorney', filename: 'Lagos_Loom_PoA.pdf', fileSize: '0.5 MB', uploadedDate: 'uploaded Jan 25, 2024' },
          { name: 'CAC Registration certificate', filename: 'Lagos_Loom_CAC.pdf', fileSize: '0.7 MB', uploadedDate: 'uploaded Jan 26, 2024' },
          { name: 'Tax Identification certificate', filename: 'Lagos_Loom_TIN.pdf', fileSize: '0.3 MB', uploadedDate: 'uploaded Jan 26, 2024' },
          { name: 'Manufacturing license', filename: 'Lagos_Loom_Mfg_License.pdf', fileSize: '1.2 MB', uploadedDate: 'uploaded Jan 27, 2024' },
        ],
      },
    },
  },
};
