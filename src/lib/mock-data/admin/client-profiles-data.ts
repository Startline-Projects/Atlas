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
} from "./candidate-profiles-data";

// ============================================================
// TYPES
// ============================================================

// KYB Field with optional badge
interface KYBFieldDetail {
  label: string;
  value: string;
  badge?: {
    label: "Active" | "Match" | "Valid" | "Verified";
    variant: "success" | "warn" | "neutral";
  };
}

// Business KYB tile data (Phase 6d)
interface KYBTile {
  status: "verified" | "pending" | "failed";
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
    label: "Match" | "Verified" | "Valid" | "Active";
    variant: "success" | "warn" | "neutral";
  };
}

interface KYCBiometricField {
  label: string;
  score: number;
  barLabel: string;
  confidence?: string;
}

interface SignatoryKYC {
  status: "verified" | "pending" | "failed";
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
    label: "Clear" | "Hit" | "Review" | "Pending";
    variant: "success" | "warn" | "danger";
  };
}

interface SanctionsScreening {
  summary: string;
  summaryVariant: "success" | "warn" | "danger";
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
  summaryVariant: "success" | "warn";
  documents: ClientDocument[];
}

// Onboarding timeline (Phase 6g)
interface OnboardingStep {
  label: string;
  date: string;
  time: string;
  meta: string[];
  status: "completed" | "in-progress" | "locked" | "failed";
  score?: string;
}

interface OnboardingTimeline {
  sectionStatus: {
    label: string;
    variant: "success" | "warn" | "neutral";
  };
  steps: OnboardingStep[];
}

// Profile snapshot (Phase 6h)
interface CompanyDetailEntry {
  label: string;
  value: string;
}

interface CategoryTag {
  label: string;
  highlighted: boolean; // true → .lime variant
}

interface TrustTierDescriptionPart {
  text: string;
  variant: "soft" | "ink" | "success";
}

interface TrustTier {
  tier: "top-client" | "trusted" | "new";
  label: string;
  descriptionParts: TrustTierDescriptionPart[];
}

interface ReviewCard {
  stars: number;
  author: string;
  date: string;
  text: string; // raw text WITHOUT manual quotes; smart quotes added via ::before/::after
}

interface ReviewsBlock {
  summary: string;
  cards: ReviewCard[];
}

interface ProfileSnapshot {
  publicProfileUrl?: string;
  about?: {
    tagline: string;
    description: string;
  };
  companyDetails?: CompanyDetailEntry[];
  categories?: CategoryTag[];
  trustTier?: TrustTier;
  reviews?: ReviewsBlock;
}

// Hiring history (Phase 6i)
interface HiringEngagement {
  talentName: string;
  role: string;
  rate: string;
  hoursPerWeek: string;
  startedDate: string;
  totalPaid: string;
}

interface HiringHistory {
  sectionStatus: {
    label: string;
    variant: "success" | "warn" | "neutral";
  };
  active: HiringEngagement[];
  past: HiringEngagement[];
}

// Financial activity (Phase 6j)
interface FinancialHeadStat {
  label: string;
  currency: string;
  value: string;
  meta: string;
}

interface PaymentMethod {
  iconLabel: string;
  iconGradient: string; // verbatim CSS gradient string
  name: string;
  meta: string;
  tag: "primary" | "backup" | "default";
  tagLabel: string;
  status: {
    label: string;
    variant: "success" | "danger";
  };
}

interface SubscriptionRow {
  name: string;
  meta: string;
  statusLabel: string;
}

interface TransactionRow {
  date: string;
  description: string;
  amount: string; // uses U+2212 minus for charges, '+' for refunds
  amountVariant: "default" | "success";
  status: {
    label: string;
    variant: "success" | "danger" | "warn";
  };
}

interface FinancialActivity {
  sectionStatus: {
    label: string;
    variant: "success" | "warn" | "neutral";
  };
  headStats: FinancialHeadStat[];
  paymentMethods: {
    summary: string;
    rows: PaymentMethod[];
  };
  subscription: {
    summary: string;
    rows: SubscriptionRow[];
  };
  transactions: {
    summary: string;
    rows: TransactionRow[];
  };
}

// Trust & Safety signals (Phase 6l)
interface TrustSignalCard {
  type: "reports-against" | "reports-by" | "pattern-flags" | "confidentiality";
  cardVariant: "clear" | "flag" | "danger";
  iconType: "check" | "flag" | "lock";
  title: string;
  severity: {
    label: string;
    variant: "default" | "low" | "medium" | "high" | "critical";
  };
  detail: string;
  meta?: string[];
  status: {
    label: string;
    variant: "resolved" | "open";
  };
}

interface TrustSafetySignals {
  sectionStatus: {
    label: string;
    variant: "success" | "warn" | "danger" | "neutral";
  };
  cards: TrustSignalCard[];
}

// Right rail Quick Facts + TOC meta (Phase 6n)
interface TocMetaEntry {
  label: string;
  variant: "ok" | "warn" | "danger" | "neutral";
}

export interface ClientQuickFacts {
  joinedDate: string;
  entityType: string;
  hqShort: string;
  industryLabel: string;
  lastActivity: string;
  lastActivityVariant: "success" | "warn" | "neutral";
  tocMeta: {
    identity: TocMetaEntry;
    onboarding: TocMetaEntry;
    profile: TocMetaEntry;
    history: TocMetaEntry;
    financial: TocMetaEntry;
    communications: TocMetaEntry;
    signals: TocMetaEntry;
    audit: TocMetaEntry;
  };
}

export interface ClientProfile {
  // Basic info
  id: string;
  name: string;
  email: string;
  status: "verified" | "pending" | "suspended" | "churned";
  avatarGradient: string; // av-1 to av-12 key
  badge?: "Top Client" | "Growing" | null;
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

  // Quick facts (right rail, Phase 6n)
  quickFacts?: ClientQuickFacts;

  // Identity Verification (Section 01, Phases 6d–6f)
  identity?: {
    sectionStatus: {
      label: string;
      variant: "verified" | "pending" | "failed" | "warn";
    };
    kyb?: KYBTile;
    signatory_kyc?: SignatoryKYC;
    sanctions?: SanctionsScreening;
    documents?: DocumentsBlock;
  };

  // Onboarding Status (Section 02, Phase 6g)
  onboarding?: OnboardingTimeline;

  // Profile Snapshot (Section 03, Phase 6h)
  snapshot?: ProfileSnapshot;

  // Hiring History (Section 04, Phase 6i)
  hiringHistory?: HiringHistory;

  // Financial Activity (Section 05, Phase 6j)
  financial?: FinancialActivity;

  // Communications (Section 06, Phase 6k)
  communications?: {
    sectionStatus?: { label: string; variant: "success" | "warn" | "neutral" };
    totalCaption?: string;
    items?: CommunicationThread[];
  };

  // Trust & Safety Signals (Section 07, Phase 6l)
  trustSafety?: TrustSafetySignals;

  // Audit Log (Section 08, Phase 6m)
  auditLog?: {
    totalEvents: number;
    recent: AuditEntry[];
  };
}

// ============================================================
// 6 CLIENT FIXTURES (cl-001 through cl-006)
// ============================================================

export const CLIENT_PROFILES: Record<string, ClientProfile> = {
  "cl-001-acme": {
    id: "cl-001-acme",
    name: "Acme Holdings, Inc.",
    email: "finance@acme-holdings.test",
    status: "suspended",
    avatarGradient: "av-2",
    badge: null,
    tags: ["Tech", "Banned", "USA"],
    initials: "AH",
    atlasId: "cl-001-acme",
    location: "New York, NY",
    timezone: "America/New_York",
    companySize: "100–500 employees",
    industry: "Tech",
    specialist: null,
    statusBanner: {
      title: "Account Suspended",
      detail: "Suspension active · pending review",
    },
    identity: {
      sectionStatus: {
        label: "KYB verified · account suspended",
        variant: "warn",
      },
      kyb: {
        status: "verified",
        tileName: "Business KYB verified",
        verifiedDate: "Aug 14, 2022",
        verifiedBy: "Persona Inc. (Business KYB)",
        fields: [
          {
            label: "Legal entity",
            value: "Acme Holdings, Inc.",
            badge: { label: "Active", variant: "success" },
          },
          {
            label: "Registry",
            value: "Delaware C-Corp · 87234561",
            badge: { label: "Match", variant: "success" },
          },
          {
            label: "VAT ID",
            value: "EIN 47-2891034",
            badge: { label: "Valid", variant: "success" },
          },
          {
            label: "Founded",
            value: "February 1998 (28 years)",
          },
          {
            label: "Registered address",
            value: "1209 Orange Street, Wilmington, DE 19801",
          },
          {
            label: "Standing",
            value: "Account suspended — pending compliance review",
          },
        ],
      },
      signatory_kyc: {
        status: "verified",
        tileName: "Authorized signatory verified",
        verifiedDate: "Aug 14, 2022",
        verifiedBy: "Persona KYC + liveness",
        fields: [
          {
            label: "Signatory",
            value: "Richard Acme",
            badge: { label: "Match", variant: "success" },
          },
          {
            label: "Role",
            value: "Chief Executive Officer",
          },
          {
            label: "ID type",
            value: "US Passport",
            badge: { label: "Verified", variant: "success" },
          },
          {
            label: "Liveness",
            value: "Matched",
            badge: { label: "Match", variant: "success" },
          },
          {
            label: "Authority proof",
            value: "Articles of Incorporation · Board Resolution",
          },
        ],
        biometric: {
          label: "Biometric match",
          score: 98.1,
          barLabel: "98.1%",
        },
      },
      sanctions: {
        summary: "All clear · screened Aug 14, 2022",
        summaryVariant: "success",
        rows: [
          {
            listLabel: "OFAC SDN list",
            status: { label: "Clear", variant: "success" },
          },
          {
            listLabel: "EU consolidated list",
            status: { label: "Clear", variant: "success" },
          },
          {
            listLabel: "UN sanctions",
            status: { label: "Clear", variant: "success" },
          },
          {
            listLabel: "Politically Exposed Person check",
            status: { label: "Clear", variant: "success" },
          },
        ],
      },
      documents: {
        summary: "4 documents · all valid",
        summaryVariant: "success",
        documents: [
          {
            name: "Articles of Incorporation",
            filename: "Acme_Holdings_AoI.pdf",
            fileSize: "2.1 MB",
            uploadedDate: "uploaded Aug 12, 2022",
          },
          {
            name: "Board Resolution (CEO authority)",
            filename: "Acme_Board_Resolution.pdf",
            fileSize: "0.8 MB",
            uploadedDate: "uploaded Aug 12, 2022",
          },
          {
            name: "IRS EIN letter",
            filename: "Acme_EIN_letter.pdf",
            fileSize: "0.4 MB",
            uploadedDate: "uploaded Aug 13, 2022",
          },
          {
            name: "Annual filing — 2023",
            filename: "Acme_Annual_2023.pdf",
            fileSize: "1.7 MB",
            uploadedDate: "uploaded Mar 2024",
          },
        ],
      },
    },
    onboarding: {
      sectionStatus: { label: "Onboarded · later suspended", variant: "warn" },
      steps: [
        {
          label: "Email verified",
          date: "Aug 14, 2022",
          time: "8:32 AM",
          meta: ["richard@acme-holdings.test", "Magic-link · 1st attempt"],
          status: "completed",
        },
        {
          label: "Phone verified",
          date: "Aug 14, 2022",
          time: "8:48 AM",
          meta: ["+1 212 ••• 8847", "SMS OTP · 1st attempt"],
          status: "completed",
        },
        {
          label: "Business registration submitted",
          date: "Aug 17, 2022",
          time: "11:14 AM",
          meta: [
            "Articles of Incorporation",
            "Delaware C-Corp filing",
            "EIN letter",
          ],
          status: "completed",
        },
        {
          label: "Business registration verified",
          date: "Aug 19, 2022",
          time: "2:08 PM",
          meta: ["Cross-checked against Delaware SOS", "EIN 47-2891034 active"],
          status: "completed",
        },
        {
          label: "Authorized signatory ID verified",
          date: "Aug 22, 2022",
          time: "10:11 AM",
          meta: [
            "Richard Acme · US Passport",
            "Liveness matched",
            "Persona KYC",
          ],
          status: "completed",
          score: "98.1%",
        },
        {
          label: "Sanctions & PEP screening passed",
          date: "Aug 22, 2022",
          time: "10:18 AM",
          meta: ["OFAC clear", "EU clear", "UN clear", "PEP clear"],
          status: "completed",
        },
        {
          label: "Payment method added & verified",
          date: "Aug 22, 2022",
          time: "4:42 PM",
          meta: [
            "Stripe Visa •••• 1827",
            "$1 authorization successful",
            "3DS verified",
          ],
          status: "completed",
        },
        {
          label: "Verified Client status activated",
          date: "Aug 23, 2022",
          time: "9:15 AM",
          meta: ["By Marcus Chen", "Full hiring access granted"],
          status: "completed",
        },
        {
          label: "First hire made",
          date: "Sep 04, 2022",
          time: "1:28 PM",
          meta: [
            "ENG-2022-1184",
            "Olivia Reed (Senior Engineer)",
            "12-month contract",
          ],
          status: "completed",
        },
      ],
    },
    snapshot: {
      about: {
        tagline:
          '"A holding company building enduring American brands. Our portfolio companies serve millions of customers across consumer goods, hospitality, and media."',
        description:
          "Founded 1998 in Wilmington, Delaware. Acme Holdings owns and operates seven subsidiary brands across consumer goods, hospitality, and digital media. Notable acquisitions: Pinewood Bakeries (2014), Hollow Creek Hotels (2019), Magnolia Press (2022).",
      },
      companyDetails: [
        { label: "Industry", value: "Holdings · Multi-brand portfolio" },
        { label: "Headquarters", value: "New York, NY, USA" },
        { label: "Company size", value: "500+ employees (across portfolio)" },
        { label: "Founded", value: "February 1998" },
        { label: "Hiring focus", value: "Executive leadership, finance, ops" },
        { label: "Repeat hire rate", value: "N/A — account suspended" },
      ],
      categories: [
        { label: "Senior Engineer", highlighted: true },
        { label: "Operations Lead", highlighted: true },
        { label: "Finance Manager", highlighted: false },
        { label: "General Counsel", highlighted: false },
        { label: "VP Marketing", highlighted: false },
      ],
      trustTier: {
        tier: "top-client",
        label: "Top Client",
        descriptionParts: [
          { text: "Earned ", variant: "soft" },
          { text: "22 successful hires", variant: "ink" },
          {
            text: " before suspension. Status preserved pending compliance review.",
            variant: "soft",
          },
        ],
      },
      reviews: {
        summary: "4.6 avg from 22 hires (pre-suspension)",
        cards: [
          {
            stars: 5,
            author: "Margaret Chen",
            date: "Oct 2024",
            text: "Professional engagement. Clear contract terms, prompt payment. Marcus on the talent team knew our brand requirements inside out.",
          },
          {
            stars: 4,
            author: "Daniel Roberts",
            date: "Aug 2024",
            text: "Strong organization. Onboarding was slower than expected but once started, everything ran smoothly.",
          },
        ],
      },
    },
    hiringHistory: {
      sectionStatus: { label: "22 hires · account suspended", variant: "warn" },
      active: [],
      past: [
        {
          talentName: "Olivia Reed",
          role: "Senior Engineer",
          rate: "$95/hr",
          hoursPerWeek: "40",
          startedDate: "Sep 04, 2022",
          totalPaid: "$187,200",
        },
        {
          talentName: "Marcus Holloway",
          role: "Operations Lead",
          rate: "$110/hr",
          hoursPerWeek: "40",
          startedDate: "Sep 22, 2022",
          totalPaid: "$202,400",
        },
        {
          talentName: "Sarah Chen",
          role: "Finance Manager",
          rate: "$85/hr",
          hoursPerWeek: "40",
          startedDate: "Oct 11, 2022",
          totalPaid: "$156,400",
        },
        {
          talentName: "James Whitmore",
          role: "VP Marketing",
          rate: "$125/hr",
          hoursPerWeek: "40",
          startedDate: "Nov 03, 2022",
          totalPaid: "$230,000",
        },
        {
          talentName: "Emily Davis",
          role: "General Counsel",
          rate: "$145/hr",
          hoursPerWeek: "30",
          startedDate: "Dec 06, 2022",
          totalPaid: "$191,400",
        },
        {
          talentName: "Robert Kim",
          role: "Senior Engineer",
          rate: "$92/hr",
          hoursPerWeek: "40",
          startedDate: "Jan 15, 2023",
          totalPaid: "$169,280",
        },
        {
          talentName: "Jessica Martinez",
          role: "Brand Director",
          rate: "$105/hr",
          hoursPerWeek: "40",
          startedDate: "Feb 20, 2023",
          totalPaid: "$193,200",
        },
        {
          talentName: "Daniel Park",
          role: "Operations Lead",
          rate: "$98/hr",
          hoursPerWeek: "40",
          startedDate: "Mar 14, 2023",
          totalPaid: "$180,320",
        },
        {
          talentName: "Amanda Foster",
          role: "Finance Manager",
          rate: "$87/hr",
          hoursPerWeek: "40",
          startedDate: "Apr 18, 2023",
          totalPaid: "$147,360",
        },
        {
          talentName: "Christopher Lee",
          role: "Senior Engineer",
          rate: "$90/hr",
          hoursPerWeek: "40",
          startedDate: "May 22, 2023",
          totalPaid: "$151,200",
        },
        {
          talentName: "Rebecca Thompson",
          role: "VP Operations",
          rate: "$115/hr",
          hoursPerWeek: "40",
          startedDate: "Jun 30, 2023",
          totalPaid: "$211,600",
        },
        {
          talentName: "Michael Brown",
          role: "Senior Engineer",
          rate: "$94/hr",
          hoursPerWeek: "40",
          startedDate: "Aug 04, 2023",
          totalPaid: "$172,960",
        },
        {
          talentName: "Lauren Wilson",
          role: "Brand Director",
          rate: "$108/hr",
          hoursPerWeek: "40",
          startedDate: "Sep 12, 2023",
          totalPaid: "$186,624",
        },
        {
          talentName: "David Zhang",
          role: "Operations Lead",
          rate: "$102/hr",
          hoursPerWeek: "40",
          startedDate: "Oct 23, 2023",
          totalPaid: "$171,360",
        },
        {
          talentName: "Patricia Anderson",
          role: "General Counsel",
          rate: "$148/hr",
          hoursPerWeek: "30",
          startedDate: "Dec 04, 2023",
          totalPaid: "$186,480",
        },
        {
          talentName: "Steven Garcia",
          role: "Senior Engineer",
          rate: "$96/hr",
          hoursPerWeek: "40",
          startedDate: "Jan 22, 2024",
          totalPaid: "$151,680",
        },
        {
          talentName: "Kimberly Roberts",
          role: "Finance Manager",
          rate: "$89/hr",
          hoursPerWeek: "40",
          startedDate: "Feb 28, 2024",
          totalPaid: "$128,160",
        },
        {
          talentName: "Anthony Thomas",
          role: "VP Marketing",
          rate: "$128/hr",
          hoursPerWeek: "40",
          startedDate: "Apr 08, 2024",
          totalPaid: "$174,080",
        },
        {
          talentName: "Nicole Jackson",
          role: "Brand Director",
          rate: "$112/hr",
          hoursPerWeek: "40",
          startedDate: "May 20, 2024",
          totalPaid: "$134,400",
        },
        {
          talentName: "Ryan Mitchell",
          role: "Operations Lead",
          rate: "$105/hr",
          hoursPerWeek: "40",
          startedDate: "Jun 24, 2024",
          totalPaid: "$109,200",
        },
        {
          talentName: "Vanessa Carter",
          role: "Senior Engineer",
          rate: "$98/hr",
          hoursPerWeek: "40",
          startedDate: "Jul 29, 2024",
          totalPaid: "$86,240",
        },
        {
          talentName: "Brian Phillips",
          role: "Finance Manager",
          rate: "$91/hr",
          hoursPerWeek: "40",
          startedDate: "Sep 09, 2024",
          totalPaid: "$36,400",
        },
      ],
    },
    financial: {
      sectionStatus: { label: "$3.4M lifetime · suspended", variant: "warn" },
      headStats: [
        {
          label: "Total spent",
          currency: "$",
          value: "3,412,800",
          meta: "across 22 hires · since Aug 2022",
        },
        {
          label: "Last 30 days",
          currency: "$",
          value: "0",
          meta: "account suspended",
        },
        {
          label: "Outstanding",
          currency: "$",
          value: "48,640",
          meta: "frozen pending compliance review",
        },
      ],
      paymentMethods: {
        summary: "1 active · 1 failed",
        rows: [
          {
            iconLabel: "VISA",
            iconGradient: "linear-gradient(135deg, #1A1F71 0%, #0F4391 100%)",
            name: "Wells Fargo Visa Business",
            meta: "•••• 1827 · exp 06/27 · 3DS verified",
            tag: "primary",
            tagLabel: "Primary",
            status: { label: "Failed", variant: "danger" },
          },
          {
            iconLabel: "ACH",
            iconGradient: "linear-gradient(135deg, #2D7DD2 0%, #1A4A82 100%)",
            name: "Chase ACH Direct Debit",
            meta: "US •••• 8847 · last verified Sep 09, 2024",
            tag: "backup",
            tagLabel: "Backup",
            status: { label: "Verified", variant: "success" },
          },
        ],
      },
      subscription: {
        summary: "Paused",
        rows: [
          {
            name: "Atlas Pro Annual",
            meta: "$2,400/yr · paused Nov 15, 2024 (suspension)",
            statusLabel: "Active",
          },
          {
            name: "Quarterly tax invoices",
            meta: "Auto-generated · suspended pending review",
            statusLabel: "Active",
          },
        ],
      },
      transactions: {
        summary: "Recent transactions (last 6)",
        rows: [
          {
            date: "Nov 15",
            description: "Charge attempted · payment declined",
            amount: "−$48,640.00",
            amountVariant: "default",
            status: { label: "Pending", variant: "warn" },
          },
          {
            date: "Nov 04",
            description: "Charge · 4 active engagements · weekly batch",
            amount: "−$24,200.00",
            amountVariant: "default",
            status: { label: "Paid", variant: "success" },
          },
          {
            date: "Oct 28",
            description: "Charge · Brian Phillips · final week",
            amount: "−$16,400.00",
            amountVariant: "default",
            status: { label: "Paid", variant: "success" },
          },
          {
            date: "Oct 14",
            description: "Charge · Vanessa Carter · weeks 4-7",
            amount: "−$31,360.00",
            amountVariant: "default",
            status: { label: "Paid", variant: "success" },
          },
          {
            date: "Sep 22",
            description: "Refund · disputed Holloway invoice",
            amount: "+$8,800.00",
            amountVariant: "success",
            status: { label: "Refunded", variant: "danger" },
          },
          {
            date: "Sep 09",
            description: "Charge · 6 active engagements · weekly batch",
            amount: "−$32,200.00",
            amountVariant: "default",
            status: { label: "Paid", variant: "success" },
          },
        ],
      },
    },
    communications: {
      sectionStatus: {
        label: "94 messages · 3 threads · suspended",
        variant: "warn",
      },
      totalCaption: "94 messages over 28 months · suspended Nov 2024",
      items: [
        {
          threadId: "thr-cl001-001",
          avatar: "av-1",
          initials: "MC",
          name: "Marcus Chen",
          role: "specialist",
          time: "Apr 12",
          messageCount: 47,
          lastMessage:
            "Richard — following up on the suspension review status. Compliance team needs the additional documentation by end of week. We can extend if needed but please confirm receipt.",
        },
        {
          threadId: "thr-cl001-002",
          avatar: "av-2",
          initials: "VC",
          name: "Vanessa Carter",
          role: "talent",
          time: "Mar 28",
          messageCount: 18,
          lastMessage:
            "Final invoice processed and received — thank you for the smooth wrap-up despite the circumstances. Best of luck with the review process.",
        },
        {
          threadId: "thr-cl001-003",
          avatar: "av-4",
          initials: "CT",
          name: "Internal note · Compliance Team",
          role: "admin",
          time: "Nov 15",
          messageCount: 1,
          lastMessage:
            "Account suspension flagged on Nov 15, 2024. Reason: pending compliance review (T&S ticket SUSP-2024-0091). All hiring activity frozen. Outstanding $48,640 held pending resolution.",
        },
      ],
    },
    trustSafety: {
      sectionStatus: { label: "2 critical · 1 open", variant: "danger" },
      cards: [
        {
          type: "reports-against",
          cardVariant: "danger",
          iconType: "flag",
          title: "Reports filed against client",
          severity: { label: "High", variant: "high" },
          detail:
            "Five talent reports filed Nov 2024 regarding payment delays during the suspension period. All relate to weekly engagement charges that bounced when the primary card was declined.",
          meta: [
            "First filed Nov 16, 2024",
            "5 reports total",
            "CASE-2024-0421",
          ],
          status: { label: "Open", variant: "open" },
        },
        {
          type: "reports-by",
          cardVariant: "clear",
          iconType: "check",
          title: "Reports filed by client",
          severity: { label: "None", variant: "default" },
          detail:
            "No reports filed by the client against talent or other users prior to suspension.",
          status: { label: "0 of 0", variant: "resolved" },
        },
        {
          type: "pattern-flags",
          cardVariant: "danger",
          iconType: "flag",
          title: "Pattern flags · payment behavior",
          severity: { label: "Critical", variant: "critical" },
          detail:
            "Payment authorization failed Nov 15, 2024 — Wells Fargo Visa declined for $48,640 weekly engagement charge. Account auto-suspended per platform policy. Backup ACH not authorized for engagement payments.",
          meta: [
            "Card declined Nov 15, 2024",
            "$48,640 outstanding",
            "AUTH-2024-9182",
          ],
          status: { label: "Open", variant: "open" },
        },
        {
          type: "confidentiality",
          cardVariant: "flag",
          iconType: "lock",
          title: "Confidential client status",
          severity: { label: "Restricted", variant: "medium" },
          detail:
            "Account suspended — visible to compliance review team only. All hiring history redacted in cross-team views pending resolution.",
          status: { label: "Restricted", variant: "open" },
        },
      ],
    },
    auditLog: {
      totalEvents: 47,
      recent: [
        {
          dayGroup: { label: "Nov 15, 2024", count: 2 },
          time: "4:42 PM",
          verb: "Account suspended",
          target: "Auto-suspend per platform policy",
          detail:
            "Card declined for $48,640 weekly engagement charge · Wells Fargo Visa •••• 1827",
          category: "suspension",
          tagLabel: "SUSPENSION",
          refId: "SUSP-2024-0091",
        },
        {
          time: "4:38 PM",
          verb: "Charge failed",
          target: "$48,640.00 · weekly batch ENG-2024-batch-187",
          detail:
            "Wells Fargo Visa declined · 3DS challenge passed but funds insufficient",
          category: "charge",
          outcome: { label: "Declined", variant: "partial" },
        },

        {
          dayGroup: { label: "Nov 16-22, 2024", count: 1 },
          time: "Nov 16-22\nVarious",
          verb: "Talent reports filed",
          target: "5 reports re: payment delays during suspension",
          detail:
            "Filed by Brian Phillips, Vanessa Carter, Ryan Mitchell, Nicole Jackson, Anthony Thomas",
          category: "dispute",
          refId: "CASE-2024-0421",
        },

        {
          dayGroup: { label: "Earlier · 2024", count: 3 },
          time: "Sep 09\n3:22 PM",
          verb: "Charge processed",
          target: "$32,200.00 · 6 active engagements weekly batch",
          detail: "Wells Fargo Visa •••• 1827 · Stripe txn ch_3MhPq2K8Hx",
          category: "charge",
          outcome: { label: "Captured", variant: "success" },
        },
        {
          time: "Mar 04\n10:18 AM",
          verb: "Refund issued",
          target: "$8,800.00 to client · disputed Holloway invoice",
          detail: "Adjudicated by Marcus Chen · Reverse-charge approved",
          category: "refund",
          refId: "RFD-2024-0188",
        },
        {
          time: "Feb 28\n2:14 PM",
          verb: "Sign-in",
          target: "Richard Acme (signatory)",
          detail: "74.119.184.21 · New York · Chrome 121 · macOS 13.6",
          category: "signin",
          outcome: { label: "2FA verified", variant: "success" },
        },

        {
          dayGroup: { label: "Earlier · 2022", count: 2 },
          time: "Sep 04\n1:28 PM",
          verb: "First contract signed",
          target: "ENG-2022-1184 with Olivia Reed",
          detail: "Senior Engineer · 12-month contract · $95/hr",
          category: "contract",
          outcome: { label: "Completed Sep 2023", variant: "success" },
        },
        {
          time: "Aug 14\n8:32 AM",
          verb: "Account created",
          target: "Acme Holdings, Inc. (cl-001)",
          detail: "Direct signup · Authorized signatory: Richard Acme",
          category: "signin",
          tagLabel: "CREATED",
          refId: "ACC-2022-000847",
        },
      ],
    },
    quickFacts: {
      joinedDate: "Aug 14, 2022",
      entityType: "Business Holdings.",
      hqShort: "New York, NY",
      industryLabel: "Finance · Holdings",
      lastActivity: "Suspended Nov 2024",
      lastActivityVariant: "warn",
      tocMeta: {
        identity: { label: "✓", variant: "ok" },
        onboarding: { label: "9 / 9", variant: "ok" },
        profile: { label: "Top Client", variant: "neutral" },
        history: { label: "0 active", variant: "warn" },
        financial: { label: "$3.4M", variant: "warn" },
        communications: { label: "94", variant: "neutral" },
        signals: { label: "Critical", variant: "danger" },
        audit: { label: "47", variant: "neutral" },
      },
    },
  },

  "cl-002-7e1b3f": {
    id: "cl-002-7e1b3f",
    name: "Studio Berlin GmbH",
    email: "hires@studio-berlin.test",
    status: "verified",
    avatarGradient: "av-3",
    badge: "Top Client",
    tags: ["Design", "Premium", "Europe"],
    initials: "SB",
    atlasId: "cl-002-7e1b3f",
    location: "Berlin, Germany",
    timezone: "Europe/Berlin",
    companySize: "12–50 employees",
    industry: "Design",
    specialist: "Daniel Kovács",
    identity: {
      sectionStatus: {
        label: "KYB + Signatory verified",
        variant: "verified",
      },
      kyb: {
        status: "verified",
        tileName: "Business KYB verified",
        verifiedDate: "Jan 18, 2024",
        verifiedBy: "Persona Inc. (Business KYB)",
        fields: [
          {
            label: "Legal entity",
            value: "Studio Berlin GmbH",
            badge: { label: "Active", variant: "success" },
          },
          {
            label: "Registry",
            value: "HRB 178432 · Berlin Charlottenburg",
            badge: { label: "Match", variant: "success" },
          },
          {
            label: "VAT ID",
            value: "DE318472918",
            badge: { label: "Valid", variant: "success" },
          },
          {
            label: "Founded",
            value: "March 2018 (8 years)",
          },
          {
            label: "Registered address",
            value: "Torstraße 109, 10119 Berlin, DE",
          },
          {
            label: "Standing",
            value: "Good standing · last filing Apr 2026",
          },
        ],
      },
      signatory_kyc: {
        status: "verified",
        tileName: "Authorized signatory verified",
        verifiedDate: "Jan 18, 2024",
        verifiedBy: "Persona KYC + liveness",
        fields: [
          {
            label: "Signatory",
            value: "Lukas Hoffmann",
            badge: { label: "Match", variant: "success" },
          },
          {
            label: "Role",
            value: "Geschäftsführer (Managing Director)",
          },
          {
            label: "ID type",
            value: "German Personalausweis",
            badge: { label: "Verified", variant: "success" },
          },
          {
            label: "Liveness",
            value: "Matched",
            badge: { label: "Match", variant: "success" },
          },
          {
            label: "Authority proof",
            value: "Articles of Incorporation · Power of Attorney",
          },
        ],
        biometric: {
          label: "Biometric match",
          score: 97.8,
          barLabel: "97.8%",
        },
      },
      sanctions: {
        summary: "All clear · screened Jan 18, 2024",
        summaryVariant: "success",
        rows: [
          {
            listLabel: "OFAC SDN list",
            status: { label: "Clear", variant: "success" },
          },
          {
            listLabel: "EU consolidated list",
            status: { label: "Clear", variant: "success" },
          },
          {
            listLabel: "UN sanctions",
            status: { label: "Clear", variant: "success" },
          },
          {
            listLabel: "Politically Exposed Person check",
            status: { label: "Clear", variant: "success" },
          },
        ],
      },
      documents: {
        summary: "5 documents · all valid",
        summaryVariant: "success",
        documents: [
          {
            name: "Articles of Incorporation",
            filename: "Studio_Berlin_GmbH_AoI.pdf",
            fileSize: "1.4 MB",
            uploadedDate: "uploaded Jan 16, 2024",
          },
          {
            name: "Handelsregister Auszug (HRB)",
            filename: "HRB_178432_Auszug.pdf",
            fileSize: "320 KB",
            uploadedDate: "refreshed Apr 12, 2026",
          },
          {
            name: "Power of Attorney (Lukas Hoffmann)",
            filename: "PoA_LHoffmann.pdf",
            fileSize: "240 KB",
            uploadedDate: "uploaded Jan 18, 2024",
          },
          {
            name: "VAT Registration Certificate",
            filename: "DE318472918_certificate.pdf",
            fileSize: "180 KB",
            uploadedDate: "uploaded Jan 16, 2024",
          },
          {
            name: "Annual filing 2025",
            filename: "Bundesanzeiger_2025.pdf",
            fileSize: "480 KB",
            uploadedDate: "auto-refreshed Apr 1, 2026",
          },
        ],
      },
    },
    onboarding: {
      sectionStatus: { label: "9 of 9 complete", variant: "success" },
      steps: [
        {
          label: "Email verified",
          date: "Jan 12, 2024",
          time: "9:00 AM",
          meta: [
            "lukas.hoffmann@studio-berlin.test",
            "Magic-link · 1st attempt",
          ],
          status: "completed",
        },
        {
          label: "Phone verified",
          date: "Jan 12, 2024",
          time: "9:14 AM",
          meta: ["+49 30 ••• 4291", "SMS OTP · 1st attempt"],
          status: "completed",
        },
        {
          label: "Business registration submitted",
          date: "Jan 14, 2024",
          time: "2:32 PM",
          meta: [
            "Articles of Incorporation",
            "Handelsregister Auszug",
            "VAT certificate",
          ],
          status: "completed",
        },
        {
          label: "Business registration verified",
          date: "Jan 16, 2024",
          time: "11:08 AM",
          meta: [
            "Cross-checked against Bundesanzeiger",
            "HRB 178432 active & in good standing",
          ],
          status: "completed",
        },
        {
          label: "Authorized signatory ID verified",
          date: "Jan 18, 2024",
          time: "10:45 AM",
          meta: [
            "Lukas Hoffmann · Personalausweis",
            "Liveness matched",
            "Persona KYC",
          ],
          status: "completed",
          score: "97.8%",
        },
        {
          label: "Sanctions & PEP screening passed",
          date: "Jan 18, 2024",
          time: "10:52 AM",
          meta: ["OFAC clear", "EU clear", "UN clear", "PEP clear"],
          status: "completed",
        },
        {
          label: "Payment method added & verified",
          date: "Jan 18, 2024",
          time: "3:18 PM",
          meta: [
            "Stripe Visa •••• 7491",
            "$1 authorization successful",
            "3DS verified",
          ],
          status: "completed",
        },
        {
          label: "Verified Client status activated",
          date: "Jan 19, 2024",
          time: "9:30 AM",
          meta: ["By Daniel Kovács", "Full hiring access granted"],
          status: "completed",
        },
        {
          label: "First hire made",
          date: "Jan 22, 2024",
          time: "11:14 AM",
          meta: [
            "ENG-2024-0091",
            "Sebastián Vargas (Brand Designer)",
            "6-month contract",
          ],
          status: "completed",
        },
      ],
    },
    snapshot: {
      about: {
        tagline:
          '"An independent brand & identity studio in Berlin. We work with companies that build interesting things — most of them, you\'ve heard of."',
        description:
          "Founded 2018 by two former Pentagram designers. Studio Berlin specializes in identity systems, packaging, and digital product design for fintech, hospitality, and consumer-tech clients across Europe and North America. Notable past work: rebrand of Trade Republic (2021), identity for the Mast restaurant group (2023).",
      },
      companyDetails: [
        { label: "Industry", value: "Design · Brand & Identity" },
        { label: "Headquarters", value: "Berlin, Germany" },
        { label: "Company size", value: "12–50 employees" },
        { label: "Founded", value: "March 2018" },
        {
          label: "Hiring focus",
          value: "Engineering, design, and design-engineering hybrids",
        },
        {
          label: "Repeat hire rate",
          value: "62% (above platform average of 38%)",
        },
      ],
      categories: [
        { label: "Senior Engineer", highlighted: true },
        { label: "Brand Designer", highlighted: true },
        { label: "Frontend Engineer", highlighted: false },
        { label: "Data Analyst", highlighted: false },
        { label: "Product Designer", highlighted: false },
        { label: "Motion Designer", highlighted: false },
      ],
      trustTier: {
        tier: "top-client",
        label: "Top Client",
        descriptionParts: [
          { text: "Earned after ", variant: "soft" },
          { text: "15 successful hires", variant: "ink" },
          { text: " with ", variant: "soft" },
          { text: "zero unresolved disputes", variant: "success" },
          {
            text: ". Top Client status grants priority shortlists, lower fees, and dedicated specialist attention.",
            variant: "soft",
          },
        ],
      },
      reviews: {
        summary: "4.8 avg from 23 hires",
        cards: [
          {
            stars: 5,
            author: "Adesuwa Babatunde",
            date: "Apr 2026",
            text: "Clear scope, fair rate, fast feedback cycles. Lukas knows what he's doing technically — code reviews are useful, not performative. Would work with again.",
          },
          {
            stars: 5,
            author: "Anika Patel",
            date: "Mar 2026",
            text: "Best client engagement I've had on Atlas. They paid early once because their accounting was running ahead of schedule. Real respect for craft.",
          },
        ],
      },
    },
    hiringHistory: {
      sectionStatus: { label: "23 hires · 4 active", variant: "success" },
      active: [
        {
          talentName: "Adesuwa Babatunde",
          role: "Senior Backend Eng",
          rate: "$52/hr",
          hoursPerWeek: "30",
          startedDate: "Apr 22, 2026",
          totalPaid: "$8,320",
        },
        {
          talentName: "Carlos Restrepo",
          role: "Data Analyst",
          rate: "$48/hr",
          hoursPerWeek: "20",
          startedDate: "Mar 14, 2026",
          totalPaid: "$14,400",
        },
        {
          talentName: "Anika Patel",
          role: "Brand Designer",
          rate: "$55/hr",
          hoursPerWeek: "25",
          startedDate: "Feb 28, 2026",
          totalPaid: "$19,250",
        },
        {
          talentName: "Marko Petrović",
          role: "Frontend Engineer",
          rate: "$50/hr",
          hoursPerWeek: "30",
          startedDate: "Jan 8, 2026",
          totalPaid: "$24,000",
        },
      ],
      past: [
        {
          talentName: "Lukas Reiter",
          role: "Senior Backend Eng",
          rate: "$50/hr",
          hoursPerWeek: "30",
          startedDate: "Aug 14, 2025",
          totalPaid: "$52,000",
        },
        {
          talentName: "Sofia Mendez",
          role: "Brand Designer",
          rate: "$48/hr",
          hoursPerWeek: "25",
          startedDate: "Jun 02, 2025",
          totalPaid: "$36,000",
        },
        {
          talentName: "Tomás García",
          role: "Frontend Engineer",
          rate: "$45/hr",
          hoursPerWeek: "30",
          startedDate: "Mar 18, 2025",
          totalPaid: "$44,200",
        },
        {
          talentName: "Yuki Tanaka",
          role: "Motion Designer",
          rate: "$52/hr",
          hoursPerWeek: "20",
          startedDate: "Feb 11, 2025",
          totalPaid: "$24,800",
        },
        {
          talentName: "David Schwarz",
          role: "Senior Backend Eng",
          rate: "$55/hr",
          hoursPerWeek: "30",
          startedDate: "Jan 20, 2025",
          totalPaid: "$66,000",
        },
        {
          talentName: "Aisha Mohammed",
          role: "Data Analyst",
          rate: "$42/hr",
          hoursPerWeek: "25",
          startedDate: "Nov 04, 2024",
          totalPaid: "$32,400",
        },
        {
          talentName: "Klaus Bauer",
          role: "Frontend Engineer",
          rate: "$48/hr",
          hoursPerWeek: "30",
          startedDate: "Sep 16, 2024",
          totalPaid: "$52,800",
        },
        {
          talentName: "Beatriz Costa",
          role: "Brand Designer",
          rate: "$50/hr",
          hoursPerWeek: "25",
          startedDate: "Aug 12, 2024",
          totalPaid: "$40,000",
        },
        {
          talentName: "Pavel Novák",
          role: "Product Designer",
          rate: "$52/hr",
          hoursPerWeek: "30",
          startedDate: "Jun 24, 2024",
          totalPaid: "$58,400",
        },
        {
          talentName: "Mei Chen",
          role: "Senior Backend Eng",
          rate: "$54/hr",
          hoursPerWeek: "30",
          startedDate: "May 06, 2024",
          totalPaid: "$62,100",
        },
        {
          talentName: "Gabriel Silva",
          role: "Motion Designer",
          rate: "$46/hr",
          hoursPerWeek: "20",
          startedDate: "Apr 15, 2024",
          totalPaid: "$19,200",
        },
        {
          talentName: "Hannah Müller",
          role: "Brand Designer",
          rate: "$48/hr",
          hoursPerWeek: "30",
          startedDate: "Feb 19, 2024",
          totalPaid: "$44,800",
        },
        {
          talentName: "Sebastián Vargas",
          role: "Brand Designer",
          rate: "$52/hr",
          hoursPerWeek: "30",
          startedDate: "Jan 22, 2024",
          totalPaid: "$48,400",
        },
        {
          talentName: "Wei Liu",
          role: "Frontend Engineer",
          rate: "$44/hr",
          hoursPerWeek: "25",
          startedDate: "Nov 13, 2023",
          totalPaid: "$24,800",
        },
        {
          talentName: "Olga Kowalski",
          role: "Data Analyst",
          rate: "$40/hr",
          hoursPerWeek: "20",
          startedDate: "Sep 25, 2023",
          totalPaid: "$16,200",
        },
        {
          talentName: "Rafael Herrera",
          role: "Product Designer",
          rate: "$46/hr",
          hoursPerWeek: "30",
          startedDate: "Aug 07, 2023",
          totalPaid: "$33,600",
        },
        {
          talentName: "Naoko Yamamoto",
          role: "Motion Designer",
          rate: "$50/hr",
          hoursPerWeek: "25",
          startedDate: "Jun 19, 2023",
          totalPaid: "$24,000",
        },
        {
          talentName: "Felix Weber",
          role: "Frontend Engineer",
          rate: "$42/hr",
          hoursPerWeek: "30",
          startedDate: "Apr 24, 2023",
          totalPaid: "$32,800",
        },
        {
          talentName: "Sara Lindgren",
          role: "Brand Designer",
          rate: "$48/hr",
          hoursPerWeek: "25",
          startedDate: "Mar 06, 2023",
          totalPaid: "$19,200",
        },
      ],
    },
    financial: {
      sectionStatus: { label: "$184,300 lifetime spend", variant: "success" },
      headStats: [
        {
          label: "Total spent",
          currency: "$",
          value: "184,300",
          meta: "across 23 hires · since Jan 2024",
        },
        {
          label: "Last 30 days",
          currency: "$",
          value: "12,800",
          meta: "4 active engagements",
        },
        {
          label: "Outstanding",
          currency: "$",
          value: "0",
          meta: "all invoices paid on time",
        },
      ],
      paymentMethods: {
        summary: "2 active",
        rows: [
          {
            iconLabel: "VISA",
            iconGradient: "linear-gradient(135deg, #1A1F71 0%, #0F4391 100%)",
            name: "Visa business credit",
            meta: "•••• 7491 · exp 04/28 · 3DS verified",
            tag: "primary",
            tagLabel: "Primary",
            status: { label: "Verified", variant: "success" },
          },
          {
            iconLabel: "ACH",
            iconGradient: "linear-gradient(135deg, #2D7DD2 0%, #1A4A82 100%)",
            name: "SEPA Direct Debit",
            meta: "DE89 •••• 1247 · Deutsche Bank · last verified Jan 22",
            tag: "backup",
            tagLabel: "Backup",
            status: { label: "Verified", variant: "success" },
          },
        ],
      },
      subscription: {
        summary: "Active",
        rows: [
          {
            name: "Atlas Pro Annual",
            meta: "$2,400/yr · renewed Jan 19, 2026",
            statusLabel: "Active",
          },
          {
            name: "Quarterly VAT invoices",
            meta: "Auto-generated · sent to billing@studio-berlin.test",
            statusLabel: "Active",
          },
        ],
      },
      transactions: {
        summary: "Recent transactions (last 6)",
        rows: [
          {
            date: "Apr 28",
            description: "Charge · Adesuwa Babatunde · week 38 · ENG-2026-184",
            amount: "−$1,560.00",
            amountVariant: "default",
            status: { label: "Paid", variant: "success" },
          },
          {
            date: "Apr 21",
            description: "Charge · 4 active engagements · weekly batch",
            amount: "−$5,640.00",
            amountVariant: "default",
            status: { label: "Paid", variant: "success" },
          },
          {
            date: "Apr 14",
            description: "Charge · Adesuwa Babatunde · week 36",
            amount: "−$1,560.00",
            amountVariant: "default",
            status: { label: "Paid", variant: "success" },
          },
          {
            date: "Mar 12",
            description: "Refund issued to client · over-billing dispute",
            amount: "+$220.00",
            amountVariant: "success",
            status: { label: "Refunded", variant: "danger" },
          },
          {
            date: "Jan 19",
            description: "Atlas Pro Annual · subscription renewal",
            amount: "−$2,400.00",
            amountVariant: "default",
            status: { label: "Paid", variant: "success" },
          },
          {
            date: "May 5",
            description: "Pending charge · weekly batch (current period)",
            amount: "−$3,180.00",
            amountVariant: "default",
            status: { label: "Pending", variant: "warn" },
          },
        ],
      },
    },
    communications: {
      sectionStatus: { label: "186 messages · 5 threads", variant: "neutral" },
      totalCaption: "186 messages over 28 months",
      items: [
        {
          threadId: "thr-cl002-001",
          avatar: "av-2",
          initials: "DK",
          name: "Daniel Kovács",
          role: "specialist",
          time: "3h ago",
          messageCount: 94,
          unread: true,
          lastMessage:
            "Lukas — quick update on the senior backend search. Adesuwa's been an A+ result. Ready to talk about what's next on the design side?",
        },
        {
          threadId: "thr-cl002-002",
          avatar: "av-1",
          initials: "AB",
          name: "Adesuwa Babatunde",
          role: "talent",
          time: "4h ago",
          messageCount: 52,
          lastMessage:
            "Just merged your PR on the reconciliation pipeline — beautiful work. Schedule a 30-min sync Thursday to talk about the next phase?",
        },
        {
          threadId: "thr-cl002-003",
          avatar: "av-2",
          initials: "CR",
          name: "Carlos Restrepo",
          role: "talent",
          time: "1d ago",
          messageCount: 28,
          lastMessage:
            "About the dashboards refresh — we're rolling out the new schema next Tuesday. Any specific cuts you'd like the standing reports to include?",
        },
        {
          threadId: "thr-cl002-004",
          avatar: "av-3",
          initials: "AP",
          name: "Anika Patel",
          role: "talent",
          time: "2d ago",
          messageCount: 11,
          lastMessage:
            "Final round of brand explorations attached. Three directions, my recommendation is the second one — strongest narrative, most reusable system.",
        },
        {
          threadId: "thr-cl002-005",
          avatar: "av-3",
          initials: "DK",
          name: "Internal note · Daniel Kovács",
          role: "admin",
          time: "Apr 12",
          messageCount: 1,
          lastMessage:
            "Studio Berlin requested confidentiality flag for an upcoming sensitive hire (acquisition-stage discussion). Coordinated with legal — ticket CONF-2026-0014 created.",
        },
      ],
    },
    trustSafety: {
      sectionStatus: { label: "All clear · 1 historical", variant: "success" },
      cards: [
        {
          type: "reports-against",
          cardVariant: "clear",
          iconType: "check",
          title: "Reports filed against client",
          severity: { label: "None", variant: "default" },
          detail:
            "No abuse, payment, or quality reports filed against this client by talent or other users.",
          status: { label: "0 of 0", variant: "resolved" },
        },
        {
          type: "reports-by",
          cardVariant: "flag",
          iconType: "flag",
          title: "Reports filed by client",
          severity: { label: "Low", variant: "low" },
          detail:
            "One historical report filed Apr 2024 against a contractor who failed to deliver agreed milestones. Resolved by mediation; partial refund issued.",
          meta: [
            "Filed Apr 12, 2024",
            "Resolved by Daniel Kovács · 4d turnaround",
            "DSP-2024-0061",
          ],
          status: { label: "Resolved", variant: "resolved" },
        },
        {
          type: "pattern-flags",
          cardVariant: "clear",
          iconType: "check",
          title: "Pattern flags · payment behavior",
          severity: { label: "None", variant: "default" },
          detail:
            "No unusual patterns. 100% on-time payment rate across 187 weekly billing cycles. No chargebacks, no failed charges.",
          status: { label: "0 patterns", variant: "resolved" },
        },
        {
          type: "confidentiality",
          cardVariant: "clear",
          iconType: "lock",
          title: "Confidential client status",
          severity: { label: "Standard", variant: "default" },
          detail:
            "Standard confidentiality applies. Client name visible to specialists in their category; redacted by default in cross-team views.",
          status: { label: "Standard", variant: "resolved" },
        },
      ],
    },
    auditLog: {
      totalEvents: 38,
      recent: [
        {
          dayGroup: { label: "Apr 28, 2026 — today", count: 2 },
          time: "3:18 PM",
          verb: "Charge processed",
          target: "$1,560.00 · ENG-2026-184 week 38",
          detail: "Visa •••• 7491 · Stripe txn ch_3OrNpL9KqA",
          category: "charge",
          outcome: { label: "Captured", variant: "success" },
        },
        {
          time: "10:14 AM",
          verb: "Sign-in",
          target: "Lukas Hoffmann (signatory)",
          detail: "91.64.118.20 · Berlin · Chrome 124 · macOS 14.4",
          category: "signin",
          outcome: { label: "2FA verified", variant: "success" },
        },

        {
          dayGroup: { label: "Apr 22, 2026", count: 1 },
          time: "9:30 AM",
          verb: "Contract signed",
          target: "ENG-2026-184 with Adesuwa Babatunde",
          detail: "$52/hr · 30 hrs/week · 6-week initial term",
          category: "contract",
          outcome: { label: "Active", variant: "success" },
        },

        {
          dayGroup: { label: "Apr 12, 2026", count: 1 },
          time: "2:45 PM",
          verb: "Confidentiality flag set",
          target: "upcoming sensitive hire",
          detail: "Requested by Lukas Hoffmann · Approved by Daniel Kovács",
          category: "override",
          tagLabel: "FLAG",
          refId: "CONF-2026-0014",
        },

        {
          dayGroup: { label: "Mar 12, 2026", count: 1 },
          time: "11:22 AM",
          verb: "Refund issued",
          target: "$220.00 to client · over-billing dispute",
          detail:
            "Adjudicated by Daniel Kovács · Talent: Adesuwa Babatunde agreed",
          category: "refund",
          refId: "RFD-2026-0211",
        },

        {
          dayGroup: { label: "Earlier · 2024", count: 3 },
          time: "Apr 12\n10:30 AM",
          verb: "Dispute opened by client",
          target: "contractor failed to deliver",
          detail:
            "Resolved by mediation · partial refund issued · 4-day turnaround",
          category: "dispute",
          refId: "DSP-2024-0061",
        },
        {
          time: "Jan 22\n11:14 AM",
          verb: "First contract signed",
          target: "ENG-2024-0091 with Sebastián Vargas",
          detail: "Brand Designer · 6-month contract · $48/hr",
          category: "contract",
          outcome: { label: "Completed Jul 2024", variant: "success" },
        },
        {
          time: "Jan 12\n9:00 AM",
          verb: "Account created",
          target: "Studio Berlin GmbH (cl-002)",
          detail: "Direct signup · Authorized signatory: Lukas Hoffmann",
          category: "signin",
          tagLabel: "CREATED",
          refId: "ACC-2024-001247",
        },
      ],
    },
    quickFacts: {
      joinedDate: "Jan 19, 2024",
      entityType: "Business · GmbH",
      hqShort: "Berlin, DE",
      industryLabel: "Design · Brand",
      lastActivity: "3h ago",
      lastActivityVariant: "success",
      tocMeta: {
        identity: { label: "✓", variant: "ok" },
        onboarding: { label: "9 / 9", variant: "ok" },
        profile: { label: "Top Client", variant: "neutral" },
        history: { label: "4 active", variant: "neutral" },
        financial: { label: "$184K", variant: "neutral" },
        communications: { label: "186", variant: "neutral" },
        signals: { label: "1 hist", variant: "warn" },
        audit: { label: "38", variant: "neutral" },
      },
    },
  },

  "cl-003-quantum": {
    id: "cl-003-quantum",
    name: "Quantum Robotics Pte. Ltd.",
    email: "talent@quantumrobotics.test",
    status: "verified",
    avatarGradient: "av-4",
    badge: null,
    tags: ["Robotics", "Enterprise", "Singapore"],
    initials: "QR",
    atlasId: "cl-003-quantum",
    location: "Singapore",
    timezone: "Asia/Singapore",
    companySize: "50–100 employees",
    industry: "Robotics",
    specialist: null,
    identity: {
      sectionStatus: {
        label: "KYB + Signatory verified",
        variant: "verified",
      },
      kyb: {
        status: "verified",
        tileName: "Business KYB verified",
        verifiedDate: "Sep 03, 2023",
        verifiedBy: "Persona Inc. (Business KYB)",
        fields: [
          {
            label: "Legal entity",
            value: "Quantum Robotics Pte. Ltd.",
            badge: { label: "Active", variant: "success" },
          },
          {
            label: "Registry",
            value: "UEN 202312847N · ACRA Singapore",
            badge: { label: "Match", variant: "success" },
          },
          {
            label: "VAT ID",
            value: "GST M2-0019283-X",
            badge: { label: "Valid", variant: "success" },
          },
          {
            label: "Founded",
            value: "May 2019 (7 years)",
          },
          {
            label: "Registered address",
            value: "8 Cross Street, #11-00, Manulife Tower, Singapore 048424",
          },
          {
            label: "Standing",
            value: "Good standing · last filing Mar 2026",
          },
        ],
      },
      signatory_kyc: {
        status: "verified",
        tileName: "Authorized signatory verified",
        verifiedDate: "Sep 03, 2023",
        verifiedBy: "Persona KYC + liveness",
        fields: [
          {
            label: "Signatory",
            value: "Dr. Rajesh Patel",
            badge: { label: "Match", variant: "success" },
          },
          {
            label: "Role",
            value: "Founder & Managing Director",
          },
          {
            label: "ID type",
            value: "Singapore NRIC",
            badge: { label: "Verified", variant: "success" },
          },
          {
            label: "Liveness",
            value: "Matched",
            badge: { label: "Match", variant: "success" },
          },
          {
            label: "Authority proof",
            value: "Articles of Association · Director Resolution",
          },
        ],
        biometric: {
          label: "Biometric match",
          score: 96.8,
          barLabel: "96.8%",
        },
      },
      sanctions: {
        summary: "All clear · screened Sep 03, 2023",
        summaryVariant: "success",
        rows: [
          {
            listLabel: "OFAC SDN list",
            status: { label: "Clear", variant: "success" },
          },
          {
            listLabel: "EU consolidated list",
            status: { label: "Clear", variant: "success" },
          },
          {
            listLabel: "UN sanctions",
            status: { label: "Clear", variant: "success" },
          },
          {
            listLabel: "Politically Exposed Person check",
            status: { label: "Clear", variant: "success" },
          },
        ],
      },
      documents: {
        summary: "5 documents · all valid",
        summaryVariant: "success",
        documents: [
          {
            name: "Articles of Association",
            filename: "Quantum_Robotics_AoA.pdf",
            fileSize: "1.6 MB",
            uploadedDate: "uploaded Sep 01, 2023",
          },
          {
            name: "Director Resolution",
            filename: "Quantum_Director_Resolution.pdf",
            fileSize: "0.6 MB",
            uploadedDate: "uploaded Sep 01, 2023",
          },
          {
            name: "ACRA Bizfile",
            filename: "Quantum_ACRA_Bizfile.pdf",
            fileSize: "0.9 MB",
            uploadedDate: "uploaded Sep 02, 2023",
          },
          {
            name: "GST registration certificate",
            filename: "Quantum_GST_Cert.pdf",
            fileSize: "0.3 MB",
            uploadedDate: "uploaded Sep 02, 2023",
          },
          {
            name: "Audited financials FY2023",
            filename: "Quantum_Audited_FY2023.pdf",
            fileSize: "2.4 MB",
            uploadedDate: "uploaded Mar 2024",
          },
        ],
      },
    },
    onboarding: {
      sectionStatus: { label: "9 of 9 complete", variant: "success" },
      steps: [
        {
          label: "Email verified",
          date: "Sep 01, 2023",
          time: "10:42 AM",
          meta: ["rajesh@quantumrobotics.test", "Magic-link · 1st attempt"],
          status: "completed",
        },
        {
          label: "Phone verified",
          date: "Sep 01, 2023",
          time: "10:58 AM",
          meta: ["+65 ••• 4729", "SMS OTP · 1st attempt"],
          status: "completed",
        },
        {
          label: "Business registration submitted",
          date: "Sep 02, 2023",
          time: "9:18 AM",
          meta: ["Articles of Association", "ACRA Bizfile", "GST certificate"],
          status: "completed",
        },
        {
          label: "Business registration verified",
          date: "Sep 03, 2023",
          time: "11:34 AM",
          meta: ["Cross-checked against ACRA", "UEN 202312847N active"],
          status: "completed",
        },
        {
          label: "Authorized signatory ID verified",
          date: "Sep 04, 2023",
          time: "2:11 PM",
          meta: [
            "Dr. Rajesh Patel · Singapore NRIC",
            "Liveness matched",
            "Persona KYC",
          ],
          status: "completed",
          score: "96.8%",
        },
        {
          label: "Sanctions & PEP screening passed",
          date: "Sep 04, 2023",
          time: "2:16 PM",
          meta: ["OFAC clear", "EU clear", "UN clear", "PEP clear"],
          status: "completed",
        },
        {
          label: "Payment method added & verified",
          date: "Sep 05, 2023",
          time: "10:08 AM",
          meta: [
            "DBS Bank · GIRO debit setup",
            "SGD 1 authorization successful",
          ],
          status: "completed",
        },
        {
          label: "Verified Client status activated",
          date: "Sep 06, 2023",
          time: "9:00 AM",
          meta: ["By Wei Zhang", "Full hiring access granted"],
          status: "completed",
        },
        {
          label: "First hire made",
          date: "Sep 18, 2023",
          time: "3:42 PM",
          meta: [
            "ENG-2023-2419",
            "Aarav Krishnan (ML Engineer)",
            "12-month contract",
          ],
          status: "completed",
        },
      ],
    },
    snapshot: {
      about: {
        tagline:
          '"We build industrial robots that don\'t require an MIT degree to operate. Manufacturing for the hands-on builders, not the boardroom."',
        description:
          "Founded 2019 in Singapore by ex-Boston Dynamics engineers. Quantum Robotics designs cobots and pick-and-place systems for SE Asian SMEs. Series B funded (2024). Operations in Singapore, Vietnam, and Malaysia.",
      },
      companyDetails: [
        { label: "Industry", value: "Robotics · Industrial automation" },
        { label: "Headquarters", value: "Singapore" },
        { label: "Company size", value: "100-250 employees" },
        { label: "Founded", value: "May 2019" },
        {
          label: "Hiring focus",
          value: "ML engineering, robotics, mechanical design",
        },
        {
          label: "Repeat hire rate",
          value: "54% (above platform average of 38%)",
        },
      ],
      categories: [
        { label: "ML Engineer", highlighted: true },
        { label: "Robotics Engineer", highlighted: true },
        { label: "Mechanical Engineer", highlighted: false },
        { label: "Computer Vision Engineer", highlighted: false },
        { label: "Embedded Systems Engineer", highlighted: false },
        { label: "Field Service Engineer", highlighted: false },
      ],
      trustTier: {
        tier: "trusted",
        label: "Trusted",
        descriptionParts: [
          { text: "Earned after ", variant: "soft" },
          { text: "11 successful hires", variant: "ink" },
          { text: " with ", variant: "soft" },
          { text: "zero unresolved disputes", variant: "success" },
          {
            text: ". Trusted status grants priority shortlists and standard fee structure.",
            variant: "soft",
          },
        ],
      },
      reviews: {
        summary: "4.7 avg from 11 hires",
        cards: [
          {
            stars: 5,
            author: "Aarav Krishnan",
            date: "Jan 2026",
            text: "Genuinely interesting hardware problems. Rajesh respects engineering opinions and pushes back when he disagrees — that's rare and valuable.",
          },
          {
            stars: 5,
            author: "Mei Lin Tan",
            date: "Nov 2025",
            text: "Fast moving but not chaotic. Scope was clear, code review process is mature, payment always on time.",
          },
        ],
      },
    },
    hiringHistory: {
      sectionStatus: { label: "11 hires · 2 active", variant: "success" },
      active: [
        {
          talentName: "Aarav Krishnan",
          role: "ML Engineer",
          rate: "$68/hr",
          hoursPerWeek: "30",
          startedDate: "Jan 22, 2026",
          totalPaid: "$35,360",
        },
        {
          talentName: "Mei Lin Tan",
          role: "Robotics Engineer",
          rate: "$72/hr",
          hoursPerWeek: "30",
          startedDate: "Nov 14, 2025",
          totalPaid: "$108,000",
        },
      ],
      past: [
        {
          talentName: "Wei Lim",
          role: "Computer Vision Engineer",
          rate: "$65/hr",
          hoursPerWeek: "30",
          startedDate: "Apr 17, 2025",
          totalPaid: "$93,600",
        },
        {
          talentName: "Priya Sharma",
          role: "ML Engineer",
          rate: "$62/hr",
          hoursPerWeek: "30",
          startedDate: "Feb 28, 2025",
          totalPaid: "$79,560",
        },
        {
          talentName: "Daniel Tan",
          role: "Mechanical Engineer",
          rate: "$58/hr",
          hoursPerWeek: "30",
          startedDate: "Dec 10, 2024",
          totalPaid: "$66,120",
        },
        {
          talentName: "Zhi Wei Ng",
          role: "Robotics Engineer",
          rate: "$66/hr",
          hoursPerWeek: "30",
          startedDate: "Sep 22, 2024",
          totalPaid: "$87,120",
        },
        {
          talentName: "Rashida Begum",
          role: "Embedded Systems Engineer",
          rate: "$60/hr",
          hoursPerWeek: "30",
          startedDate: "Jul 14, 2024",
          totalPaid: "$52,800",
        },
        {
          talentName: "Kenji Sato",
          role: "ML Engineer",
          rate: "$64/hr",
          hoursPerWeek: "30",
          startedDate: "May 08, 2024",
          totalPaid: "$42,240",
        },
        {
          talentName: "Aaliyah Yusof",
          role: "Computer Vision Engineer",
          rate: "$63/hr",
          hoursPerWeek: "30",
          startedDate: "Mar 18, 2024",
          totalPaid: "$39,690",
        },
        {
          talentName: "Hong Sheng Tan",
          role: "Mechanical Engineer",
          rate: "$56/hr",
          hoursPerWeek: "30",
          startedDate: "Jan 22, 2024",
          totalPaid: "$26,880",
        },
        {
          talentName: "Lakshmi Iyer",
          role: "Field Service Engineer",
          rate: "$52/hr",
          hoursPerWeek: "25",
          startedDate: "Oct 09, 2023",
          totalPaid: "$20,800",
        },
      ],
    },
    financial: {
      sectionStatus: { label: "$612,400 lifetime spend", variant: "success" },
      headStats: [
        {
          label: "Total spent",
          currency: "$",
          value: "612,400",
          meta: "across 11 hires · since Sep 2023",
        },
        {
          label: "Last 30 days",
          currency: "$",
          value: "48,200",
          meta: "2 active engagements",
        },
        {
          label: "Outstanding",
          currency: "$",
          value: "0",
          meta: "all invoices paid on time",
        },
      ],
      paymentMethods: {
        summary: "2 active",
        rows: [
          {
            iconLabel: "VISA",
            iconGradient: "linear-gradient(135deg, #1A1F71 0%, #0F4391 100%)",
            name: "DBS Vantage Business Visa",
            meta: "•••• 4729 · exp 09/28 · 3DS verified",
            tag: "primary",
            tagLabel: "Primary",
            status: { label: "Verified", variant: "success" },
          },
          {
            iconLabel: "GIRO",
            iconGradient: "linear-gradient(135deg, #C8102E 0%, #8B0A1F 100%)",
            name: "DBS GIRO Direct Debit",
            meta: "SG •••• 8842 · last verified Sep 02, 2025",
            tag: "backup",
            tagLabel: "Backup",
            status: { label: "Verified", variant: "success" },
          },
        ],
      },
      subscription: {
        summary: "Active",
        rows: [
          {
            name: "Atlas Pro Annual",
            meta: "$2,400/yr · renewed Sep 06, 2025",
            statusLabel: "Active",
          },
          {
            name: "Quarterly GST e-invoices",
            meta: "Auto-generated · sent to finance@quantumrobotics.test",
            statusLabel: "Active",
          },
        ],
      },
      transactions: {
        summary: "Recent transactions (last 6)",
        rows: [
          {
            date: "Apr 30",
            description: "Charge · Aarav Krishnan · week 14 · ENG-2026-2419",
            amount: "−$2,040.00",
            amountVariant: "default",
            status: { label: "Paid", variant: "success" },
          },
          {
            date: "Apr 23",
            description: "Charge · 2 active engagements · weekly batch",
            amount: "−$4,200.00",
            amountVariant: "default",
            status: { label: "Paid", variant: "success" },
          },
          {
            date: "Apr 16",
            description: "Charge · Mei Lin Tan · week 22",
            amount: "−$2,160.00",
            amountVariant: "default",
            status: { label: "Paid", variant: "success" },
          },
          {
            date: "Mar 28",
            description: "Charge · 2 active engagements · weekly batch",
            amount: "−$4,200.00",
            amountVariant: "default",
            status: { label: "Paid", variant: "success" },
          },
          {
            date: "Sep 06",
            description: "Atlas Pro Annual · subscription renewal",
            amount: "−$2,400.00",
            amountVariant: "default",
            status: { label: "Paid", variant: "success" },
          },
          {
            date: "May 7",
            description: "Pending charge · weekly batch (current period)",
            amount: "−$3,150.00",
            amountVariant: "default",
            status: { label: "Pending", variant: "warn" },
          },
        ],
      },
    },
    communications: {
      sectionStatus: { label: "62 messages · 4 threads", variant: "neutral" },
      totalCaption: "62 messages over 31 months",
      items: [
        {
          threadId: "thr-cl003-001",
          avatar: "av-3",
          initials: "WZ",
          name: "Wei Zhang",
          role: "specialist",
          time: "5h ago",
          messageCount: 31,
          unread: true,
          lastMessage:
            "Rajesh — got the new role spec for the Computer Vision Engineer. Interesting profile requirements. I have 3 strong candidates lined up for next week — sending the shortlist tonight.",
        },
        {
          threadId: "thr-cl003-002",
          avatar: "av-1",
          initials: "AK",
          name: "Aarav Krishnan",
          role: "talent",
          time: "1d ago",
          messageCount: 19,
          lastMessage:
            "Pushing the latest robotic arm calibration model to staging tomorrow morning. Performance is 23% better than baseline — happy with the results. Want to walk through it before deploying?",
        },
        {
          threadId: "thr-cl003-003",
          avatar: "av-5",
          initials: "MT",
          name: "Mei Lin Tan",
          role: "talent",
          time: "3d ago",
          messageCount: 11,
          lastMessage:
            "Hardware testing on the new pick-and-place system scheduled for Thursday at our Singapore lab. Should have field results from the Penang factory partner by next week.",
        },
        {
          threadId: "thr-cl003-004",
          avatar: "av-3",
          initials: "WZ",
          name: "Internal note · Wei Zhang",
          role: "admin",
          time: "Mar 18",
          messageCount: 1,
          lastMessage:
            "Quantum confirmed Series B closing in Q3 2026. Plans to scale hiring to 25-30 engineers over next 18 months. Pre-allocated specialist capacity. Reference: SCALE-2026-0017.",
        },
      ],
    },
    trustSafety: {
      sectionStatus: { label: "All clear", variant: "success" },
      cards: [
        {
          type: "reports-against",
          cardVariant: "clear",
          iconType: "check",
          title: "Reports filed against client",
          severity: { label: "None", variant: "default" },
          detail:
            "No abuse, payment, or quality reports filed against this client by talent or other users.",
          status: { label: "0 of 0", variant: "resolved" },
        },
        {
          type: "reports-by",
          cardVariant: "clear",
          iconType: "check",
          title: "Reports filed by client",
          severity: { label: "None", variant: "default" },
          detail:
            "No reports filed by the client. All engagement disputes resolved internally without platform escalation.",
          status: { label: "0 of 0", variant: "resolved" },
        },
        {
          type: "pattern-flags",
          cardVariant: "clear",
          iconType: "check",
          title: "Pattern flags · payment behavior",
          severity: { label: "None", variant: "default" },
          detail:
            "No unusual patterns. 100% on-time payment rate across 124 weekly billing cycles. No chargebacks, no failed charges.",
          status: { label: "0 patterns", variant: "resolved" },
        },
        {
          type: "confidentiality",
          cardVariant: "clear",
          iconType: "lock",
          title: "Confidential client status",
          severity: { label: "Active", variant: "low" },
          detail:
            "Active confidentiality applies. Series B funding round in progress (Q3 2026). Client name and hiring patterns redacted in cross-team views; access limited to assigned specialist + leadership.",
          status: { label: "Active", variant: "resolved" },
        },
      ],
    },
    auditLog: {
      totalEvents: 22,
      recent: [
        {
          dayGroup: { label: "Apr 30, 2026", count: 2 },
          time: "4:18 PM",
          verb: "Charge processed",
          target: "$2,040.00 · ENG-2026-2419 week 14",
          detail: "DBS Vantage Visa •••• 4729 · Stripe txn ch_3OqRsT4LpY",
          category: "charge",
          outcome: { label: "Captured", variant: "success" },
        },
        {
          time: "11:42 AM",
          verb: "Sign-in",
          target: "Dr. Rajesh Patel (signatory)",
          detail: "203.116.45.18 · Singapore · Safari 17 · macOS 14.5",
          category: "signin",
          outcome: { label: "2FA verified", variant: "success" },
        },

        {
          dayGroup: { label: "Jan 22, 2026", count: 1 },
          time: "10:14 AM",
          verb: "Contract signed",
          target: "ENG-2026-2419 with Aarav Krishnan",
          detail: "$68/hr · 30 hrs/week · 6-month contract",
          category: "contract",
          outcome: { label: "Active", variant: "success" },
        },

        {
          dayGroup: { label: "Nov 14, 2025", count: 1 },
          time: "2:08 PM",
          verb: "Contract signed",
          target: "ENG-2025-2188 with Mei Lin Tan",
          detail: "$72/hr · 30 hrs/week · 12-month contract",
          category: "contract",
          outcome: { label: "Active", variant: "success" },
        },

        {
          dayGroup: { label: "Earlier · 2023", count: 4 },
          time: "Sep 18\n3:42 PM",
          verb: "First contract signed",
          target: "ENG-2023-2419 with Aarav Krishnan",
          detail: "ML Engineer · 12-month contract · $62/hr",
          category: "contract",
          outcome: { label: "Completed Sep 2024", variant: "success" },
        },
        {
          time: "Sep 06\n9:00 AM",
          verb: "Verified Client status activated",
          target: "Quantum Robotics Pte. Ltd.",
          detail: "By Wei Zhang · Full hiring access granted",
          category: "profile",
          outcome: { label: "Active", variant: "success" },
        },
        {
          time: "Sep 03\n11:34 AM",
          verb: "Business KYB verified",
          target: "UEN 202312847N · ACRA Singapore",
          detail: "Persona Inc. verification · Match",
          category: "profile",
          refId: "KYB-2023-1827",
        },
        {
          time: "Sep 01\n10:42 AM",
          verb: "Account created",
          target: "Quantum Robotics Pte. Ltd. (cl-003)",
          detail: "Direct signup · Authorized signatory: Dr. Rajesh Patel",
          category: "signin",
          tagLabel: "CREATED",
          refId: "ACC-2023-002184",
        },
      ],
    },
    quickFacts: {
      joinedDate: "Sep 06, 2023",
      entityType: "Business · Pte.",
      hqShort: "Singapore, SG",
      industryLabel: "Robotics · ML",
      lastActivity: "5h ago",
      lastActivityVariant: "success",
      tocMeta: {
        identity: { label: "✓", variant: "ok" },
        onboarding: { label: "9 / 9", variant: "ok" },
        profile: { label: "Trusted", variant: "neutral" },
        history: { label: "2 active", variant: "neutral" },
        financial: { label: "$612K", variant: "neutral" },
        communications: { label: "62", variant: "neutral" },
        signals: { label: "All clear", variant: "ok" },
        audit: { label: "22", variant: "neutral" },
      },
    },
  },

  "cl-004-medco": {
    id: "cl-004-medco",
    name: "Lighthouse Med Co.",
    email: "people@lighthouse-med.test",
    status: "verified",
    avatarGradient: "av-6",
    badge: null,
    tags: ["Healthcare", "Verified", "Canada"],
    initials: "LM",
    atlasId: "cl-004-medco",
    location: "Toronto, ON",
    timezone: "America/Toronto",
    companySize: "50–100 employees",
    industry: "Healthcare",
    specialist: "Sarah Reyes",
    identity: {
      sectionStatus: {
        label: "KYB + Signatory verified",
        variant: "verified",
      },
      kyb: {
        status: "verified",
        tileName: "Business KYB verified",
        verifiedDate: "Mar 12, 2023",
        verifiedBy: "Persona Inc. (Business KYB)",
        fields: [
          {
            label: "Legal entity",
            value: "Lighthouse Medical Co. Ltd.",
            badge: { label: "Active", variant: "success" },
          },
          {
            label: "Registry",
            value: "BC Corp 1287456 · British Columbia",
            badge: { label: "Match", variant: "success" },
          },
          {
            label: "VAT ID",
            value: "GST/HST 832947561 RC0001",
            badge: { label: "Valid", variant: "success" },
          },
          {
            label: "Founded",
            value: "November 2011 (15 years)",
          },
          {
            label: "Registered address",
            value: "885 W Georgia Street, Vancouver, BC V6C 3E8",
          },
          {
            label: "Standing",
            value: "Good standing · last filing Feb 2026",
          },
        ],
      },
      signatory_kyc: {
        status: "verified",
        tileName: "Authorized signatory verified",
        verifiedDate: "Mar 12, 2023",
        verifiedBy: "Persona KYC + liveness",
        fields: [
          {
            label: "Signatory",
            value: "Dr. Sarah Chen MD",
            badge: { label: "Match", variant: "success" },
          },
          {
            label: "Role",
            value: "Medical Director",
          },
          {
            label: "ID type",
            value: "Canadian Passport",
            badge: { label: "Verified", variant: "success" },
          },
          {
            label: "Liveness",
            value: "Matched",
            badge: { label: "Match", variant: "success" },
          },
          {
            label: "Authority proof",
            value: "Articles of Incorporation · Board Minutes",
          },
        ],
        biometric: {
          label: "Biometric match",
          score: 97.2,
          barLabel: "97.2%",
        },
      },
      sanctions: {
        summary: "All clear · screened Mar 12, 2023",
        summaryVariant: "success",
        rows: [
          {
            listLabel: "OFAC SDN list",
            status: { label: "Clear", variant: "success" },
          },
          {
            listLabel: "EU consolidated list",
            status: { label: "Clear", variant: "success" },
          },
          {
            listLabel: "UN sanctions",
            status: { label: "Clear", variant: "success" },
          },
          {
            listLabel: "Politically Exposed Person check",
            status: { label: "Clear", variant: "success" },
          },
        ],
      },
      documents: {
        summary: "5 documents · all valid",
        summaryVariant: "success",
        documents: [
          {
            name: "Articles of Incorporation",
            filename: "Lighthouse_AoI.pdf",
            fileSize: "1.3 MB",
            uploadedDate: "uploaded Mar 09, 2023",
          },
          {
            name: "Board Minutes",
            filename: "Lighthouse_Board_Minutes.pdf",
            fileSize: "0.7 MB",
            uploadedDate: "uploaded Mar 09, 2023",
          },
          {
            name: "BC Corp Registration",
            filename: "Lighthouse_BC_Reg.pdf",
            fileSize: "0.5 MB",
            uploadedDate: "uploaded Mar 10, 2023",
          },
          {
            name: "GST/HST registration",
            filename: "Lighthouse_GST_Cert.pdf",
            fileSize: "0.2 MB",
            uploadedDate: "uploaded Mar 10, 2023",
          },
          {
            name: "Healthcare licensing certificate",
            filename: "Lighthouse_Health_Cert.pdf",
            fileSize: "1.1 MB",
            uploadedDate: "uploaded Mar 11, 2023",
          },
        ],
      },
    },
    onboarding: {
      sectionStatus: { label: "9 of 9 complete", variant: "success" },
      steps: [
        {
          label: "Email verified",
          date: "Mar 09, 2023",
          time: "8:14 AM",
          meta: ["sarah.chen@lighthouse-med.test", "Magic-link · 1st attempt"],
          status: "completed",
        },
        {
          label: "Phone verified",
          date: "Mar 09, 2023",
          time: "8:32 AM",
          meta: ["+1 604 ••• 2891", "SMS OTP · 1st attempt"],
          status: "completed",
        },
        {
          label: "Business registration submitted",
          date: "Mar 10, 2023",
          time: "11:22 AM",
          meta: [
            "Articles of Incorporation",
            "BC Corp Registration",
            "GST/HST certificate",
          ],
          status: "completed",
        },
        {
          label: "Business registration verified",
          date: "Mar 11, 2023",
          time: "9:45 AM",
          meta: [
            "Cross-checked against BC Registries",
            "BC Corp 1287456 active",
          ],
          status: "completed",
        },
        {
          label: "Authorized signatory ID verified",
          date: "Mar 12, 2023",
          time: "1:08 PM",
          meta: [
            "Dr. Sarah Chen MD · Canadian Passport",
            "Liveness matched",
            "Persona KYC",
          ],
          status: "completed",
          score: "97.2%",
        },
        {
          label: "Sanctions & PEP screening passed",
          date: "Mar 12, 2023",
          time: "1:14 PM",
          meta: ["OFAC clear", "EU clear", "UN clear", "PEP clear"],
          status: "completed",
        },
        {
          label: "Payment method added & verified",
          date: "Mar 13, 2023",
          time: "10:04 AM",
          meta: [
            "RBC Visa •••• 4421",
            "CAD 1 authorization successful",
            "3DS verified",
          ],
          status: "completed",
        },
        {
          label: "Verified Client status activated",
          date: "Mar 14, 2023",
          time: "9:30 AM",
          meta: ["By Daniel Kovács", "Full hiring access granted"],
          status: "completed",
        },
        {
          label: "First hire made",
          date: "Mar 28, 2023",
          time: "11:52 AM",
          meta: [
            "MED-2023-0814",
            "Aisha Ahmed (Clinical Researcher)",
            "6-month contract",
          ],
          status: "completed",
        },
      ],
    },
    snapshot: {
      about: {
        tagline:
          "\"Patient-centered clinical research that moves at the pace of life-saving science. Our team runs trials for the pharma companies you've heard of — and a few you haven't yet.\"",
        description:
          "Founded 2011 in Vancouver, BC. Lighthouse Med specializes in Phase II/III oncology and cardiovascular trials across North America. 47 completed studies. Privately held. Currently expanding digital health monitoring program.",
      },
      companyDetails: [
        { label: "Industry", value: "Healthcare · Clinical research" },
        { label: "Headquarters", value: "Vancouver, BC, Canada" },
        { label: "Company size", value: "250-500 employees" },
        { label: "Founded", value: "November 2011" },
        {
          label: "Hiring focus",
          value: "Clinical research, biostatistics, regulatory",
        },
        {
          label: "Repeat hire rate",
          value: "71% (well above platform average of 38%)",
        },
      ],
      categories: [
        { label: "Clinical Researcher", highlighted: true },
        { label: "Biostatistician", highlighted: true },
        { label: "Regulatory Affairs Specialist", highlighted: false },
        { label: "Medical Writer", highlighted: false },
        { label: "Clinical Data Manager", highlighted: false },
        { label: "Pharmacovigilance Specialist", highlighted: false },
      ],
      trustTier: {
        tier: "trusted",
        label: "Trusted",
        descriptionParts: [
          { text: "Earned after ", variant: "soft" },
          { text: "17 successful hires", variant: "ink" },
          { text: " with ", variant: "soft" },
          { text: "zero unresolved disputes", variant: "success" },
          {
            text: ". Trusted status grants priority shortlists and standard fee structure.",
            variant: "soft",
          },
        ],
      },
      reviews: {
        summary: "4.8 avg from 17 hires",
        cards: [
          {
            stars: 5,
            author: "Aisha Ahmed",
            date: "Feb 2026",
            text: "Sarah is meticulous and protective of her team. Trial protocols were rigorous but pace was humane. Real respect for work-life sustainability.",
          },
          {
            stars: 5,
            author: "James Holloway",
            date: "Dec 2025",
            text: "Onboarding for clinical work is slow everywhere. Lighthouse made it as fast as regulation allows. Fair compensation, clear expectations.",
          },
        ],
      },
    },
    hiringHistory: {
      sectionStatus: { label: "17 hires · 3 active", variant: "success" },
      active: [
        {
          talentName: "Aisha Ahmed",
          role: "Clinical Researcher",
          rate: "$78/hr",
          hoursPerWeek: "30",
          startedDate: "Feb 04, 2026",
          totalPaid: "$77,220",
        },
        {
          talentName: "James Holloway",
          role: "Biostatistician",
          rate: "$82/hr",
          hoursPerWeek: "25",
          startedDate: "Dec 12, 2025",
          totalPaid: "$94,300",
        },
        {
          talentName: "Priya Rajesh",
          role: "Regulatory Affairs Specialist",
          rate: "$74/hr",
          hoursPerWeek: "30",
          startedDate: "Oct 28, 2025",
          totalPaid: "$115,440",
        },
      ],
      past: [
        {
          talentName: "Sarah Mitchell",
          role: "Clinical Researcher",
          rate: "$76/hr",
          hoursPerWeek: "30",
          startedDate: "May 19, 2025",
          totalPaid: "$112,480",
        },
        {
          talentName: "David Wong",
          role: "Medical Writer",
          rate: "$68/hr",
          hoursPerWeek: "25",
          startedDate: "Mar 22, 2025",
          totalPaid: "$73,440",
        },
        {
          talentName: "Emma Tremblay",
          role: "Clinical Data Manager",
          rate: "$72/hr",
          hoursPerWeek: "30",
          startedDate: "Jan 14, 2025",
          totalPaid: "$103,680",
        },
        {
          talentName: "Olivia Bernard",
          role: "Pharmacovigilance Specialist",
          rate: "$70/hr",
          hoursPerWeek: "25",
          startedDate: "Nov 06, 2024",
          totalPaid: "$52,500",
        },
        {
          talentName: "Henry Patel",
          role: "Biostatistician",
          rate: "$80/hr",
          hoursPerWeek: "30",
          startedDate: "Aug 28, 2024",
          totalPaid: "$115,200",
        },
        {
          talentName: "Margaret Singh",
          role: "Regulatory Affairs Specialist",
          rate: "$73/hr",
          hoursPerWeek: "30",
          startedDate: "Jun 18, 2024",
          totalPaid: "$94,900",
        },
        {
          talentName: "Thomas Lefebvre",
          role: "Clinical Researcher",
          rate: "$75/hr",
          hoursPerWeek: "30",
          startedDate: "Apr 22, 2024",
          totalPaid: "$90,000",
        },
        {
          talentName: "Lily Chang",
          role: "Medical Writer",
          rate: "$66/hr",
          hoursPerWeek: "25",
          startedDate: "Feb 28, 2024",
          totalPaid: "$52,800",
        },
        {
          talentName: "Ravi Krishnan",
          role: "Clinical Data Manager",
          rate: "$70/hr",
          hoursPerWeek: "30",
          startedDate: "Jan 14, 2024",
          totalPaid: "$79,800",
        },
        {
          talentName: "Sophie Dubois",
          role: "Biostatistician",
          rate: "$78/hr",
          hoursPerWeek: "30",
          startedDate: "Oct 22, 2023",
          totalPaid: "$96,720",
        },
        {
          talentName: "Marcus Chen",
          role: "Pharmacovigilance Specialist",
          rate: "$68/hr",
          hoursPerWeek: "25",
          startedDate: "Aug 04, 2023",
          totalPaid: "$54,400",
        },
        {
          talentName: "Anjali Kumar",
          role: "Clinical Researcher",
          rate: "$72/hr",
          hoursPerWeek: "30",
          startedDate: "May 30, 2023",
          totalPaid: "$69,120",
        },
        {
          talentName: "William Harper",
          role: "Medical Writer",
          rate: "$64/hr",
          hoursPerWeek: "25",
          startedDate: "Apr 14, 2023",
          totalPaid: "$32,000",
        },
        {
          talentName: "Beatrice O'Sullivan",
          role: "Regulatory Affairs Specialist",
          rate: "$70/hr",
          hoursPerWeek: "30",
          startedDate: "Mar 18, 2023",
          totalPaid: "$50,400",
        },
      ],
    },
    financial: {
      sectionStatus: { label: "$1,247,500 lifetime spend", variant: "success" },
      headStats: [
        {
          label: "Total spent",
          currency: "$",
          value: "1,247,500",
          meta: "across 17 hires · since Mar 2023",
        },
        {
          label: "Last 30 days",
          currency: "$",
          value: "84,300",
          meta: "3 active engagements",
        },
        {
          label: "Outstanding",
          currency: "$",
          value: "0",
          meta: "all invoices paid on time",
        },
      ],
      paymentMethods: {
        summary: "2 active",
        rows: [
          {
            iconLabel: "VISA",
            iconGradient: "linear-gradient(135deg, #1A1F71 0%, #0F4391 100%)",
            name: "RBC Royal Business Visa",
            meta: "•••• 4421 · exp 03/29 · 3DS verified",
            tag: "primary",
            tagLabel: "Primary",
            status: { label: "Verified", variant: "success" },
          },
          {
            iconLabel: "EFT",
            iconGradient: "linear-gradient(135deg, #002F87 0%, #001F5C 100%)",
            name: "RBC Pre-Authorized Debit",
            meta: "CA •••• 2891 · last verified Mar 13, 2023",
            tag: "backup",
            tagLabel: "Backup",
            status: { label: "Verified", variant: "success" },
          },
        ],
      },
      subscription: {
        summary: "Active",
        rows: [
          {
            name: "Atlas Pro Annual",
            meta: "$2,400/yr · renewed Mar 14, 2026",
            statusLabel: "Active",
          },
          {
            name: "Quarterly HST invoices",
            meta: "Auto-generated · sent to ap@lighthouse-med.test",
            statusLabel: "Active",
          },
        ],
      },
      transactions: {
        summary: "Recent transactions (last 6)",
        rows: [
          {
            date: "May 1",
            description: "Charge · Aisha Ahmed · week 13 · MED-2026-0814",
            amount: "−$2,340.00",
            amountVariant: "default",
            status: { label: "Paid", variant: "success" },
          },
          {
            date: "Apr 24",
            description: "Charge · 3 active engagements · weekly batch",
            amount: "−$6,840.00",
            amountVariant: "default",
            status: { label: "Paid", variant: "success" },
          },
          {
            date: "Apr 17",
            description: "Charge · James Holloway · week 18",
            amount: "−$2,050.00",
            amountVariant: "default",
            status: { label: "Paid", variant: "success" },
          },
          {
            date: "Apr 10",
            description: "Refund · scope adjustment · clinical trial reduction",
            amount: "+$1,440.00",
            amountVariant: "success",
            status: { label: "Refunded", variant: "danger" },
          },
          {
            date: "Mar 14",
            description: "Atlas Pro Annual · subscription renewal",
            amount: "−$2,400.00",
            amountVariant: "default",
            status: { label: "Paid", variant: "success" },
          },
          {
            date: "May 8",
            description: "Pending charge · weekly batch (current period)",
            amount: "−$5,290.00",
            amountVariant: "default",
            status: { label: "Pending", variant: "warn" },
          },
        ],
      },
    },
    communications: {
      sectionStatus: { label: "118 messages · 5 threads", variant: "neutral" },
      totalCaption: "118 messages over 38 months",
      items: [
        {
          threadId: "thr-cl004-001",
          avatar: "av-2",
          initials: "DK",
          name: "Daniel Kovács",
          role: "specialist",
          time: "2h ago",
          messageCount: 58,
          unread: true,
          lastMessage:
            "Sarah — pharmacovigilance specialist search update. Strong response from senior candidates with FDA + Health Canada experience. Sending the top 4 profiles by EOD.",
        },
        {
          threadId: "thr-cl004-002",
          avatar: "av-4",
          initials: "AA",
          name: "Aisha Ahmed",
          role: "talent",
          time: "6h ago",
          messageCount: 24,
          lastMessage:
            "Trial protocol Phase 2 review submitted to ethics board this morning. Expected approval within 10 business days. Drafting the Phase 3 enrollment plan in parallel.",
        },
        {
          threadId: "thr-cl004-003",
          avatar: "av-3",
          initials: "JH",
          name: "James Holloway",
          role: "talent",
          time: "2d ago",
          messageCount: 16,
          lastMessage:
            "Q2 statistical analysis package ready for client review. Three significance findings worth discussing — flagging the cardiovascular subgroup specifically. Available for sync this week.",
        },
        {
          threadId: "thr-cl004-004",
          avatar: "av-5",
          initials: "PR",
          name: "Priya Rajesh",
          role: "talent",
          time: "Apr 8",
          messageCount: 19,
          lastMessage:
            "Health Canada submission package draft v3 attached. Addressed all comments from the regulatory review. Ready for your sign-off before final filing.",
        },
        {
          threadId: "thr-cl004-005",
          avatar: "av-6",
          initials: "CT",
          name: "Internal note · Compliance Team",
          role: "admin",
          time: "Feb 22",
          messageCount: 1,
          lastMessage:
            "Lighthouse renewed clinical trial certifications (CTA + CHIP). All Canadian healthcare compliance requirements current through 2028. Ref: CERT-2026-0084.",
        },
      ],
    },
    trustSafety: {
      sectionStatus: { label: "All clear · 1 historical", variant: "success" },
      cards: [
        {
          type: "reports-against",
          cardVariant: "clear",
          iconType: "check",
          title: "Reports filed against client",
          severity: { label: "None", variant: "default" },
          detail:
            "No abuse, payment, or quality reports filed against this client by talent or other users.",
          status: { label: "0 of 0", variant: "resolved" },
        },
        {
          type: "reports-by",
          cardVariant: "flag",
          iconType: "flag",
          title: "Reports filed by client",
          severity: { label: "Low", variant: "low" },
          detail:
            "One historical report filed Jul 2024 regarding a clinical writer who failed to deliver Health Canada submission docs on agreed timeline. Resolved by mediation; replacement specialist sourced within 5 days.",
          meta: [
            "Filed Jul 18, 2024",
            "Resolved by Daniel Kovács · 5d turnaround",
            "DSP-2024-0182",
          ],
          status: { label: "Resolved", variant: "resolved" },
        },
        {
          type: "pattern-flags",
          cardVariant: "clear",
          iconType: "check",
          title: "Pattern flags · payment behavior",
          severity: { label: "None", variant: "default" },
          detail:
            "No unusual patterns. 100% on-time payment rate across 162 weekly billing cycles. No chargebacks, no failed charges.",
          status: { label: "0 patterns", variant: "resolved" },
        },
        {
          type: "confidentiality",
          cardVariant: "clear",
          iconType: "lock",
          title: "Confidential client status",
          severity: { label: "Active", variant: "low" },
          detail:
            "Active confidentiality applies. Phase II/III clinical trial work involves patient data and FDA/Health Canada submissions. Client name visible to specialists with healthcare clearance only.",
          status: { label: "Active", variant: "resolved" },
        },
      ],
    },
    auditLog: {
      totalEvents: 31,
      recent: [
        {
          dayGroup: { label: "May 1, 2026", count: 2 },
          time: "3:42 PM",
          verb: "Charge processed",
          target: "$2,340.00 · MED-2026-0814 week 13",
          detail:
            "RBC Royal Business Visa •••• 4421 · Stripe txn ch_3OsTnP8KqB",
          category: "charge",
          outcome: { label: "Captured", variant: "success" },
        },
        {
          time: "9:18 AM",
          verb: "Sign-in",
          target: "Dr. Sarah Chen MD (signatory)",
          detail: "142.114.72.18 · Vancouver · Chrome 124 · Windows 11",
          category: "signin",
          outcome: { label: "2FA verified", variant: "success" },
        },

        {
          dayGroup: { label: "Apr 10, 2026", count: 1 },
          time: "11:52 AM",
          verb: "Refund issued",
          target: "$1,440.00 to client · scope adjustment",
          detail: "Adjudicated by Daniel Kovács · Clinical trial reduction",
          category: "refund",
          refId: "RFD-2026-0184",
        },

        {
          dayGroup: { label: "Feb 4, 2026", count: 1 },
          time: "10:08 AM",
          verb: "Contract signed",
          target: "MED-2026-0814 with Aisha Ahmed",
          detail: "$78/hr · 30 hrs/week · 6-month contract",
          category: "contract",
          outcome: { label: "Active", variant: "success" },
        },

        {
          dayGroup: { label: "Jul 18, 2024", count: 1 },
          time: "3:14 PM",
          verb: "Dispute opened by client",
          target: "clinical writer failed Health Canada timeline",
          detail:
            "Resolved by mediation · replacement specialist sourced · 5-day turnaround",
          category: "dispute",
          refId: "DSP-2024-0182",
        },

        {
          dayGroup: { label: "Earlier · 2023", count: 3 },
          time: "Mar 28\n11:52 AM",
          verb: "First contract signed",
          target: "MED-2023-0814 with Aisha Ahmed",
          detail: "Clinical Researcher · 6-month contract · $76/hr",
          category: "contract",
          outcome: { label: "Completed Sep 2023", variant: "success" },
        },
        {
          time: "Mar 14\n9:30 AM",
          verb: "Verified Client status activated",
          target: "Lighthouse Medical Co. Ltd.",
          detail: "By Daniel Kovács · Full hiring access granted",
          category: "profile",
          outcome: { label: "Active", variant: "success" },
        },
        {
          time: "Mar 09\n8:14 AM",
          verb: "Account created",
          target: "Lighthouse Medical Co. Ltd. (cl-004)",
          detail: "Direct signup · Authorized signatory: Dr. Sarah Chen MD",
          category: "signin",
          tagLabel: "CREATED",
          refId: "ACC-2023-001428",
        },
      ],
    },
    quickFacts: {
      joinedDate: "Mar 14, 2023",
      entityType: "Business · Co.",
      hqShort: "Vancouver, BC",
      industryLabel: "Healthcare · Clinical",
      lastActivity: "2h ago",
      lastActivityVariant: "success",
      tocMeta: {
        identity: { label: "✓", variant: "ok" },
        onboarding: { label: "9 / 9", variant: "ok" },
        profile: { label: "Trusted", variant: "neutral" },
        history: { label: "3 active", variant: "neutral" },
        financial: { label: "$1.2M", variant: "neutral" },
        communications: { label: "118", variant: "neutral" },
        signals: { label: "1 hist", variant: "warn" },
        audit: { label: "31", variant: "neutral" },
      },
    },
  },

  "cl-005-tundra": {
    id: "cl-005-tundra",
    name: "Open Tundra Ltd.",
    email: "hiring@opentundra.test",
    status: "pending",
    avatarGradient: "av-7",
    badge: null,
    tags: ["Sustainability", "Unverified", "Iceland"],
    initials: "OT",
    atlasId: "cl-005-tundra",
    location: "Reykjavik, Iceland",
    timezone: "Atlantic/Reykjavik",
    companySize: "10–50 employees",
    industry: "Sustainability",
    specialist: null,
    identity: {
      sectionStatus: {
        label: "KYB pending review",
        variant: "warn",
      },
      kyb: {
        status: "pending",
        tileName: "Business KYB pending",
        verifiedDate: "Apr 22, 2026 (submitted)",
        verifiedBy: "Persona Inc. — review in progress",
        fields: [
          {
            label: "Legal entity",
            value: "Open Tundra Ltd.",
          },
          {
            label: "Registry",
            value: "Iceland Companies Reg 6204812490",
            badge: { label: "Match", variant: "success" },
          },
          {
            label: "VAT ID",
            value: "IS 144782",
          },
          {
            label: "Founded",
            value: "August 2024 (1 year)",
          },
          {
            label: "Registered address",
            value: "Laugavegur 174, 105 Reykjavík, Iceland",
          },
          {
            label: "Standing",
            value: "New entity — verification in progress",
          },
        ],
      },
      signatory_kyc: {
        status: "pending",
        tileName: "Authorized signatory pending",
        verifiedDate: "Apr 22, 2026 (submitted)",
        verifiedBy: "Persona KYC — under review",
        fields: [
          {
            label: "Signatory",
            value: "Jón Einarsson",
            badge: { label: "Match", variant: "success" },
          },
          {
            label: "Role",
            value: "Founder",
          },
          {
            label: "ID type",
            value: "Icelandic Passport",
            badge: { label: "Verified", variant: "success" },
          },
          {
            label: "Liveness",
            value: "Submitted — pending liveness check",
          },
          {
            label: "Authority proof",
            value: "Power of Attorney only",
          },
        ],
        // NOTE: biometric field OMITTED for pending state (Correction 2)
      },
      sanctions: {
        summary: "Screening in progress · 2 of 4 lists checked",
        summaryVariant: "warn",
        rows: [
          {
            listLabel: "OFAC SDN list",
            status: { label: "Clear", variant: "success" },
          },
          {
            listLabel: "EU consolidated list",
            status: { label: "Pending", variant: "warn" },
          },
          {
            listLabel: "UN sanctions",
            status: { label: "Pending", variant: "warn" },
          },
          {
            listLabel: "Politically Exposed Person check",
            status: { label: "Clear", variant: "success" },
          },
        ],
      },
      documents: {
        summary: "2 documents uploaded · 3 missing",
        summaryVariant: "warn",
        documents: [
          {
            name: "Iceland Companies Reg certificate",
            filename: "OpenTundra_Reg_Cert.pdf",
            fileSize: "0.8 MB",
            uploadedDate: "uploaded Apr 22, 2026",
          },
          {
            name: "Power of Attorney",
            filename: "OpenTundra_PoA.pdf",
            fileSize: "0.3 MB",
            uploadedDate: "uploaded Apr 22, 2026",
          },
        ],
      },
    },
    onboarding: {
      sectionStatus: { label: "Step 5 of 9 — in progress", variant: "warn" },
      steps: [
        {
          label: "Email verified",
          date: "Apr 18, 2026",
          time: "11:08 AM",
          meta: ["jon@opentundra.test", "Magic-link · 1st attempt"],
          status: "completed",
        },
        {
          label: "Phone verified",
          date: "Apr 18, 2026",
          time: "11:24 AM",
          meta: ["+354 ••• 8842", "SMS OTP · 1st attempt"],
          status: "completed",
        },
        {
          label: "Business registration submitted",
          date: "Apr 21, 2026",
          time: "9:42 AM",
          meta: ["Iceland Companies Reg certificate", "Power of Attorney"],
          status: "completed",
        },
        {
          label: "Business registration verified",
          date: "Apr 22, 2026",
          time: "10:18 AM",
          meta: ["Cross-checked against RSK", "Reg 6204812490 active"],
          status: "completed",
        },
        {
          label: "Authorized signatory ID verified",
          date: "Apr 22, 2026",
          time: "11:30 AM",
          meta: [
            "Jón Einarsson · Icelandic Passport",
            "Liveness check pending",
            "Persona KYC — under review",
          ],
          status: "in-progress",
        },
        {
          label: "Sanctions & PEP screening passed",
          date: "—",
          time: "",
          meta: ["Awaiting screening"],
          status: "locked",
        },
        {
          label: "Payment method added & verified",
          date: "—",
          time: "",
          meta: ["Awaiting payment setup"],
          status: "locked",
        },
        {
          label: "Verified Client status activated",
          date: "—",
          time: "",
          meta: ["Awaiting verification approval"],
          status: "locked",
        },
        {
          label: "First hire made",
          date: "—",
          time: "",
          meta: ["Awaiting verified status"],
          status: "locked",
        },
      ],
    },
    snapshot: {
      about: {
        tagline:
          '"Decarbonizing heavy industry through Iceland\'s geothermal advantage. We turn excess heat into useful work."',
        description:
          "Founded August 2024 in Reykjavík. Open Tundra captures waste heat from Icelandic data centers and aluminum smelters, recycling it for industrial process heating. Pre-revenue. Seed funded by Iceland Innovation Fund.",
      },
      companyDetails: [
        {
          label: "Industry",
          value: "Sustainability · Industrial decarbonization",
        },
        { label: "Headquarters", value: "Reykjavík, Iceland" },
        { label: "Company size", value: "10-50 employees" },
        { label: "Founded", value: "August 2024" },
        {
          label: "Hiring focus",
          value: "Awaiting verified status — pending review",
        },
        { label: "Repeat hire rate", value: "N/A — pre-onboarding" },
      ],
      categories: [],
      trustTier: {
        tier: "new",
        label: "New",
        descriptionParts: [
          {
            text: "Account is currently in onboarding (Step 5 of 9). Trust tier will be assigned after first successful hire and completion of verification.",
            variant: "soft",
          },
        ],
      },
      // reviews omitted — pending state, no reviews yet
    },
    hiringHistory: {
      sectionStatus: { label: "0 hires · onboarding", variant: "neutral" },
      active: [],
      past: [],
    },
    financial: {
      sectionStatus: { label: "$0 lifetime · onboarding", variant: "neutral" },
      headStats: [],
      paymentMethods: { summary: "", rows: [] },
      subscription: { summary: "", rows: [] },
      transactions: { summary: "", rows: [] },
    },
    communications: {
      sectionStatus: { label: "4 messages · 1 thread", variant: "neutral" },
      totalCaption: "4 messages over 14 days",
      items: [
        {
          threadId: "thr-cl005-001",
          avatar: "av-2",
          initials: "BJ",
          name: "Birta Jónsdóttir",
          role: "specialist",
          time: "1d ago",
          messageCount: 4,
          unread: true,
          lastMessage:
            "Jón — friendly nudge on the liveness verification step. Once that's complete you'll be cleared through KYC and we can fast-track the verified status review. Available to walk through it on a quick call if helpful.",
        },
      ],
    },
    trustSafety: {
      sectionStatus: { label: "No history yet", variant: "neutral" },
      cards: [
        {
          type: "reports-against",
          cardVariant: "clear",
          iconType: "check",
          title: "Reports filed against client",
          severity: { label: "None", variant: "default" },
          detail:
            "No reports on file. Account is in onboarding — verified status not yet granted.",
          status: { label: "0 of 0", variant: "resolved" },
        },
        {
          type: "reports-by",
          cardVariant: "clear",
          iconType: "check",
          title: "Reports filed by client",
          severity: { label: "None", variant: "default" },
          detail:
            "No reports filed by the client. Account is new — first hire pending verification.",
          status: { label: "0 of 0", variant: "resolved" },
        },
        {
          type: "pattern-flags",
          cardVariant: "clear",
          iconType: "check",
          title: "Pattern flags · payment behavior",
          severity: { label: "None", variant: "default" },
          detail:
            "No payment behavior to evaluate yet. No engagement charges have been processed.",
          status: { label: "No data", variant: "resolved" },
        },
        {
          type: "confidentiality",
          cardVariant: "clear",
          iconType: "lock",
          title: "Confidential client status",
          severity: { label: "Standard", variant: "default" },
          detail:
            "Standard confidentiality applies. Default for new accounts — client name visible to specialists in their category; redacted by default in cross-team views.",
          status: { label: "Standard", variant: "resolved" },
        },
      ],
    },
    auditLog: {
      totalEvents: 4,
      recent: [
        {
          dayGroup: { label: "Apr 22, 2026", count: 2 },
          time: "11:30 AM",
          verb: "Authorized signatory ID submitted",
          target: "Jón Einarsson · Icelandic Passport",
          detail: "Liveness check pending · Persona KYC under review",
          category: "profile",
        },
        {
          time: "10:18 AM",
          verb: "Business KYB verified",
          target: "Iceland Companies Reg 6204812490",
          detail: "Persona Inc. verification · Match · RSK cross-checked",
          category: "profile",
          refId: "KYB-2026-0421",
        },

        {
          dayGroup: { label: "Apr 21, 2026", count: 1 },
          time: "9:42 AM",
          verb: "Business registration submitted",
          target: "Iceland Companies Reg certificate · Power of Attorney",
          detail: "Submitted by Jón Einarsson · 2 documents uploaded",
          category: "profile",
        },

        {
          dayGroup: { label: "Apr 18, 2026", count: 1 },
          time: "11:08 AM",
          verb: "Account created",
          target: "Open Tundra Ltd. (cl-005)",
          detail: "Direct signup · Authorized signatory: Jón Einarsson",
          category: "signin",
          tagLabel: "CREATED",
          refId: "ACC-2026-000421",
        },
      ],
    },
    quickFacts: {
      joinedDate: "Apr 18, 2026",
      entityType: "Business · Ltd.",
      hqShort: "Reykjavík, IS",
      industryLabel: "Sustainability .It",
      lastActivity: "1d ago",
      lastActivityVariant: "neutral",
      tocMeta: {
        identity: { label: "Pending", variant: "warn" },
        onboarding: { label: "Step 5 of 9", variant: "warn" },
        profile: { label: "New", variant: "neutral" },
        history: { label: "0 hires", variant: "warn" },
        financial: { label: "$0", variant: "warn" },
        communications: { label: "4", variant: "neutral" },
        signals: { label: "No history", variant: "neutral" },
        audit: { label: "4", variant: "neutral" },
      },
    },
  },

  "cl-006-lagos": {
    id: "cl-006-lagos",
    name: "The Lagos Loom",
    email: "hr@lagosloom.test",
    status: "verified",
    avatarGradient: "av-8",
    badge: null,
    tags: ["Manufacturing", "Verified", "Nigeria"],
    initials: "TL",
    atlasId: "cl-006-lagos",
    location: "Lagos, Nigeria",
    timezone: "Africa/Lagos",
    companySize: "20–50 employees",
    industry: "Manufacturing",
    specialist: "Kofi Asante",
    identity: {
      sectionStatus: {
        label: "KYB + Signatory verified",
        variant: "verified",
      },
      kyb: {
        status: "verified",
        tileName: "Business KYB verified",
        verifiedDate: "Jan 28, 2024",
        verifiedBy: "Persona Inc. (Business KYB)",
        fields: [
          {
            label: "Legal entity",
            value: "The Lagos Loom Limited",
            badge: { label: "Active", variant: "success" },
          },
          {
            label: "Registry",
            value: "RC 1487293 · CAC Nigeria",
            badge: { label: "Match", variant: "success" },
          },
          {
            label: "VAT ID",
            value: "TIN 28473918-0001",
            badge: { label: "Valid", variant: "success" },
          },
          {
            label: "Founded",
            value: "July 2017 (8 years)",
          },
          {
            label: "Registered address",
            value: "14 Adeola Odeku Street, Victoria Island, Lagos",
          },
          {
            label: "Standing",
            value: "Good standing · last filing Jan 2026",
          },
        ],
      },
      signatory_kyc: {
        status: "verified",
        tileName: "Authorized signatory verified",
        verifiedDate: "Jan 28, 2024",
        verifiedBy: "Persona KYC + liveness",
        fields: [
          {
            label: "Signatory",
            value: "Chukwuma Adeyemi",
            badge: { label: "Match", variant: "success" },
          },
          {
            label: "Role",
            value: "Managing Director",
          },
          {
            label: "ID type",
            value: "Nigerian National ID",
            badge: { label: "Verified", variant: "success" },
          },
          {
            label: "Liveness",
            value: "Matched",
            badge: { label: "Match", variant: "success" },
          },
          {
            label: "Authority proof",
            value: "Articles of Incorporation · Power of Attorney",
          },
        ],
        biometric: {
          label: "Biometric match",
          score: 95.4,
          barLabel: "95.4%",
        },
      },
      sanctions: {
        summary: "All clear · screened Jan 28, 2024",
        summaryVariant: "success",
        rows: [
          {
            listLabel: "OFAC SDN list",
            status: { label: "Clear", variant: "success" },
          },
          {
            listLabel: "EU consolidated list",
            status: { label: "Clear", variant: "success" },
          },
          {
            listLabel: "UN sanctions",
            status: { label: "Clear", variant: "success" },
          },
          {
            listLabel: "Politically Exposed Person check",
            status: { label: "Clear", variant: "success" },
          },
        ],
      },
      documents: {
        summary: "5 documents · all valid",
        summaryVariant: "success",
        documents: [
          {
            name: "Articles of Incorporation",
            filename: "Lagos_Loom_AoI.pdf",
            fileSize: "1.5 MB",
            uploadedDate: "uploaded Jan 25, 2024",
          },
          {
            name: "Power of Attorney",
            filename: "Lagos_Loom_PoA.pdf",
            fileSize: "0.5 MB",
            uploadedDate: "uploaded Jan 25, 2024",
          },
          {
            name: "CAC Registration certificate",
            filename: "Lagos_Loom_CAC.pdf",
            fileSize: "0.7 MB",
            uploadedDate: "uploaded Jan 26, 2024",
          },
          {
            name: "Tax Identification certificate",
            filename: "Lagos_Loom_TIN.pdf",
            fileSize: "0.3 MB",
            uploadedDate: "uploaded Jan 26, 2024",
          },
          {
            name: "Manufacturing license",
            filename: "Lagos_Loom_Mfg_License.pdf",
            fileSize: "1.2 MB",
            uploadedDate: "uploaded Jan 27, 2024",
          },
        ],
      },
    },
    onboarding: {
      sectionStatus: { label: "9 of 9 complete", variant: "success" },
      steps: [
        {
          label: "Email verified",
          date: "Jan 25, 2024",
          time: "9:18 AM",
          meta: ["chukwuma@lagosloom.test", "Magic-link · 1st attempt"],
          status: "completed",
        },
        {
          label: "Phone verified",
          date: "Jan 25, 2024",
          time: "9:34 AM",
          meta: ["+234 ••• 7218", "SMS OTP · 1st attempt"],
          status: "completed",
        },
        {
          label: "Business registration submitted",
          date: "Jan 26, 2024",
          time: "11:48 AM",
          meta: [
            "Articles of Incorporation",
            "CAC Registration",
            "TIN certificate",
          ],
          status: "completed",
        },
        {
          label: "Business registration verified",
          date: "Jan 27, 2024",
          time: "10:12 AM",
          meta: ["Cross-checked against CAC", "RC 1487293 active"],
          status: "completed",
        },
        {
          label: "Authorized signatory ID verified",
          date: "Jan 28, 2024",
          time: "1:42 PM",
          meta: [
            "Chukwuma Adeyemi · Nigerian National ID",
            "Liveness matched",
            "Persona KYC",
          ],
          status: "completed",
          score: "95.4%",
        },
        {
          label: "Sanctions & PEP screening passed",
          date: "Jan 28, 2024",
          time: "1:48 PM",
          meta: ["OFAC clear", "EU clear", "UN clear", "PEP clear"],
          status: "completed",
        },
        {
          label: "Payment method added & verified",
          date: "Jan 29, 2024",
          time: "10:32 AM",
          meta: ["GTBank Visa •••• 9182", "NGN 100 authorization successful"],
          status: "completed",
        },
        {
          label: "Verified Client status activated",
          date: "Jan 30, 2024",
          time: "9:00 AM",
          meta: ["By Adesuwa Eze", "Full hiring access granted"],
          status: "completed",
        },
        {
          label: "First hire made",
          date: "Feb 12, 2024",
          time: "4:14 PM",
          meta: [
            "ENG-2024-0287",
            "Tochukwu Okafor (Production Manager)",
            "6-month contract",
          ],
          status: "completed",
        },
      ],
    },
    snapshot: {
      about: {
        tagline:
          '"West Africa\'s most refined textile mill. Premium fabrics for the global fashion houses that care about heritage and craftsmanship."',
        description:
          "Founded 2017 in Victoria Island, Lagos. The Lagos Loom operates a vertically integrated textile mill producing premium woven fabrics — Aso Oke, Adire, and contemporary blends — for European and US fashion houses. Notable clients include three of the four major Italian luxury houses.",
      },
      companyDetails: [
        { label: "Industry", value: "Manufacturing · Premium textiles" },
        { label: "Headquarters", value: "Lagos, Nigeria" },
        { label: "Company size", value: "50-100 employees" },
        { label: "Founded", value: "July 2017" },
        {
          label: "Hiring focus",
          value: "Production management, quality control, design",
        },
        {
          label: "Repeat hire rate",
          value: "58% (above platform average of 38%)",
        },
      ],
      categories: [
        { label: "Production Manager", highlighted: true },
        { label: "Textile Designer", highlighted: true },
        { label: "Quality Control Lead", highlighted: false },
        { label: "Operations Manager", highlighted: false },
        { label: "Logistics Coordinator", highlighted: false },
      ],
      trustTier: {
        tier: "trusted",
        label: "Trusted",
        descriptionParts: [
          { text: "Earned after ", variant: "soft" },
          { text: "14 successful hires", variant: "ink" },
          { text: " with ", variant: "soft" },
          { text: "zero unresolved disputes", variant: "success" },
          {
            text: ". Trusted status grants priority shortlists and standard fee structure.",
            variant: "soft",
          },
        ],
      },
      reviews: {
        summary: "4.7 avg from 14 hires",
        cards: [
          {
            stars: 5,
            author: "Tochukwu Okafor",
            date: "Mar 2026",
            text: "Chukwuma values craftsmanship as much as deadlines. The studio invests in the people working there — training, fair pay, real benefits.",
          },
          {
            stars: 5,
            author: "Funmi Adeleke",
            date: "Feb 2026",
            text: "Best textile production environment in Lagos. Equipment is well maintained, payment schedule is reliable, leadership listens.",
          },
        ],
      },
    },
    hiringHistory: {
      sectionStatus: { label: "14 hires · 2 active", variant: "success" },
      active: [
        {
          talentName: "Tochukwu Okafor",
          role: "Production Manager",
          rate: "$42/hr",
          hoursPerWeek: "40",
          startedDate: "Mar 18, 2026",
          totalPaid: "$30,240",
        },
        {
          talentName: "Funmi Adeleke",
          role: "Textile Designer",
          rate: "$48/hr",
          hoursPerWeek: "30",
          startedDate: "Feb 06, 2026",
          totalPaid: "$50,400",
        },
      ],
      past: [
        {
          talentName: "Adaeze Nwankwo",
          role: "Production Manager",
          rate: "$40/hr",
          hoursPerWeek: "40",
          startedDate: "Aug 22, 2025",
          totalPaid: "$112,000",
        },
        {
          talentName: "Chinaza Okeke",
          role: "Textile Designer",
          rate: "$45/hr",
          hoursPerWeek: "30",
          startedDate: "Jun 14, 2025",
          totalPaid: "$94,500",
        },
        {
          talentName: "Olumide Adeyemi",
          role: "Quality Control Lead",
          rate: "$38/hr",
          hoursPerWeek: "40",
          startedDate: "Apr 02, 2025",
          totalPaid: "$76,000",
        },
        {
          talentName: "Ngozi Onyema",
          role: "Operations Manager",
          rate: "$44/hr",
          hoursPerWeek: "40",
          startedDate: "Feb 18, 2025",
          totalPaid: "$84,480",
        },
        {
          talentName: "Babatunde Olufemi",
          role: "Logistics Coordinator",
          rate: "$36/hr",
          hoursPerWeek: "40",
          startedDate: "Dec 04, 2024",
          totalPaid: "$52,800",
        },
        {
          talentName: "Ifeoma Eze",
          role: "Textile Designer",
          rate: "$46/hr",
          hoursPerWeek: "30",
          startedDate: "Oct 18, 2024",
          totalPaid: "$69,000",
        },
        {
          talentName: "Emeka Chukwu",
          role: "Production Manager",
          rate: "$42/hr",
          hoursPerWeek: "40",
          startedDate: "Aug 14, 2024",
          totalPaid: "$77,280",
        },
        {
          talentName: "Adesuwa Nnamdi",
          role: "Quality Control Lead",
          rate: "$39/hr",
          hoursPerWeek: "40",
          startedDate: "Jun 26, 2024",
          totalPaid: "$59,280",
        },
        {
          talentName: "Femi Akande",
          role: "Operations Manager",
          rate: "$43/hr",
          hoursPerWeek: "40",
          startedDate: "May 14, 2024",
          totalPaid: "$48,160",
        },
        {
          talentName: "Yetunde Bello",
          role: "Textile Designer",
          rate: "$44/hr",
          hoursPerWeek: "30",
          startedDate: "Apr 04, 2024",
          totalPaid: "$39,600",
        },
        {
          talentName: "Kelechi Ibe",
          role: "Logistics Coordinator",
          rate: "$37/hr",
          hoursPerWeek: "40",
          startedDate: "Mar 18, 2024",
          totalPaid: "$32,560",
        },
        {
          talentName: "Chukwudi Eze",
          role: "Production Manager",
          rate: "$41/hr",
          hoursPerWeek: "40",
          startedDate: "Feb 26, 2024",
          totalPaid: "$26,240",
        },
      ],
    },
    financial: {
      sectionStatus: { label: "$486,000 lifetime spend", variant: "success" },
      headStats: [
        {
          label: "Total spent",
          currency: "$",
          value: "486,000",
          meta: "across 14 hires · since Jan 2024",
        },
        {
          label: "Last 30 days",
          currency: "$",
          value: "24,800",
          meta: "2 active engagements",
        },
        {
          label: "Outstanding",
          currency: "$",
          value: "0",
          meta: "all invoices paid on time",
        },
      ],
      paymentMethods: {
        summary: "2 active",
        rows: [
          {
            iconLabel: "VISA",
            iconGradient: "linear-gradient(135deg, #1A1F71 0%, #0F4391 100%)",
            name: "GTBank Visa Business",
            meta: "•••• 9182 · exp 11/27 · 3DS verified",
            tag: "primary",
            tagLabel: "Primary",
            status: { label: "Verified", variant: "success" },
          },
          {
            iconLabel: "WIRE",
            iconGradient: "linear-gradient(135deg, #00853F 0%, #004D24 100%)",
            name: "GTBank International Wire",
            meta: "NG •••• 7218 · last verified Jan 29, 2024",
            tag: "backup",
            tagLabel: "Backup",
            status: { label: "Verified", variant: "success" },
          },
        ],
      },
      subscription: {
        summary: "Active",
        rows: [
          {
            name: "Atlas Pro Annual",
            meta: "$2,400/yr · renewed Jan 30, 2026",
            statusLabel: "Active",
          },
          {
            name: "Quarterly Nigerian VAT invoices",
            meta: "Auto-generated · sent to finance@lagosloom.test",
            statusLabel: "Active",
          },
        ],
      },
      transactions: {
        summary: "Recent transactions (last 6)",
        rows: [
          {
            date: "May 2",
            description: "Charge · Tochukwu Okafor · week 7 · ENG-2026-0287",
            amount: "−$1,680.00",
            amountVariant: "default",
            status: { label: "Paid", variant: "success" },
          },
          {
            date: "Apr 25",
            description: "Charge · 2 active engagements · weekly batch",
            amount: "−$3,120.00",
            amountVariant: "default",
            status: { label: "Paid", variant: "success" },
          },
          {
            date: "Apr 18",
            description: "Charge · Funmi Adeleke · week 11",
            amount: "−$1,440.00",
            amountVariant: "default",
            status: { label: "Paid", variant: "success" },
          },
          {
            date: "Apr 11",
            description: "Charge · 2 active engagements · weekly batch",
            amount: "−$3,120.00",
            amountVariant: "default",
            status: { label: "Paid", variant: "success" },
          },
          {
            date: "Jan 30",
            description: "Atlas Pro Annual · subscription renewal",
            amount: "−$2,400.00",
            amountVariant: "default",
            status: { label: "Paid", variant: "success" },
          },
          {
            date: "May 9",
            description: "Pending charge · weekly batch (current period)",
            amount: "−$2,540.00",
            amountVariant: "default",
            status: { label: "Pending", variant: "warn" },
          },
        ],
      },
    },
    communications: {
      sectionStatus: { label: "76 messages · 4 threads", variant: "neutral" },
      totalCaption: "76 messages over 16 months",
      items: [
        {
          threadId: "thr-cl006-001",
          avatar: "av-3",
          initials: "AE",
          name: "Adesuwa Eze",
          role: "specialist",
          time: "8h ago",
          messageCount: 38,
          unread: true,
          lastMessage:
            "Chukwuma — three new textile designer candidates reviewed your portfolio brief. All have West African heritage textile experience. Strongest match has done work for two of your competitor mills. Sending profiles tonight.",
        },
        {
          threadId: "thr-cl006-002",
          avatar: "av-1",
          initials: "TO",
          name: "Tochukwu Okafor",
          role: "talent",
          time: "1d ago",
          messageCount: 22,
          lastMessage:
            "Production schedule for the Italian luxury house order is locked. First batch of premium Aso Oke ready for QA inspection Friday. Photos attached. Quality holding strong.",
        },
        {
          threadId: "thr-cl006-003",
          avatar: "av-5",
          initials: "FA",
          name: "Funmi Adeleke",
          role: "talent",
          time: "3d ago",
          messageCount: 15,
          lastMessage:
            "Final color palette for the Adire collection approved by your team. Starting on the indigo dyeing tomorrow morning. Should have first samples for next week.",
        },
        {
          threadId: "thr-cl006-004",
          avatar: "av-6",
          initials: "CT",
          name: "Internal note · Compliance Team",
          role: "admin",
          time: "Jan 18",
          messageCount: 1,
          lastMessage:
            "Lagos Loom renewed CAC + manufacturing license (RC 1487293, MfgLic 2024-0741). All Nigerian compliance current through Jan 2027. Ref: CERT-2026-0019.",
        },
      ],
    },
    trustSafety: {
      sectionStatus: { label: "All clear", variant: "success" },
      cards: [
        {
          type: "reports-against",
          cardVariant: "clear",
          iconType: "check",
          title: "Reports filed against client",
          severity: { label: "None", variant: "default" },
          detail:
            "No abuse, payment, or quality reports filed against this client by talent or other users.",
          status: { label: "0 of 0", variant: "resolved" },
        },
        {
          type: "reports-by",
          cardVariant: "clear",
          iconType: "check",
          title: "Reports filed by client",
          severity: { label: "None", variant: "default" },
          detail:
            "No reports filed by the client. All textile production engagements completed without dispute.",
          status: { label: "0 of 0", variant: "resolved" },
        },
        {
          type: "pattern-flags",
          cardVariant: "clear",
          iconType: "check",
          title: "Pattern flags · payment behavior",
          severity: { label: "None", variant: "default" },
          detail:
            "No unusual patterns. 100% on-time payment rate across 84 weekly billing cycles. International wire transfers verified for each engagement.",
          status: { label: "0 patterns", variant: "resolved" },
        },
        {
          type: "confidentiality",
          cardVariant: "clear",
          iconType: "lock",
          title: "Confidential client status",
          severity: { label: "Standard", variant: "default" },
          detail:
            "Standard confidentiality applies. Client name visible to specialists in their category; redacted by default in cross-team views.",
          status: { label: "Standard", variant: "resolved" },
        },
      ],
    },
    auditLog: {
      totalEvents: 26,
      recent: [
        {
          dayGroup: { label: "May 2, 2026", count: 2 },
          time: "4:14 PM",
          verb: "Charge processed",
          target: "$1,680.00 · ENG-2026-0287 week 7",
          detail: "GTBank Visa •••• 9182 · Stripe txn ch_3OuVnQ4LpC",
          category: "charge",
          outcome: { label: "Captured", variant: "success" },
        },
        {
          time: "8:42 AM",
          verb: "Sign-in",
          target: "Chukwuma Adeyemi (signatory)",
          detail: "102.89.214.18 · Lagos · Chrome 124 · Android 14",
          category: "signin",
          outcome: { label: "2FA verified", variant: "success" },
        },

        {
          dayGroup: { label: "Mar 18, 2026", count: 1 },
          time: "10:24 AM",
          verb: "Contract signed",
          target: "ENG-2026-0287 with Tochukwu Okafor",
          detail: "$42/hr · 40 hrs/week · 6-month contract",
          category: "contract",
          outcome: { label: "Active", variant: "success" },
        },

        {
          dayGroup: { label: "Feb 6, 2026", count: 1 },
          time: "2:18 PM",
          verb: "Contract signed",
          target: "ENG-2026-0184 with Funmi Adeleke",
          detail: "$48/hr · 30 hrs/week · 12-month contract",
          category: "contract",
          outcome: { label: "Active", variant: "success" },
        },

        {
          dayGroup: { label: "Earlier · 2024", count: 4 },
          time: "Feb 12\n4:14 PM",
          verb: "First contract signed",
          target: "ENG-2024-0287 with Adaeze Nwankwo",
          detail: "Production Manager · 6-month contract · $40/hr",
          category: "contract",
          outcome: { label: "Completed Aug 2024", variant: "success" },
        },
        {
          time: "Jan 30\n9:00 AM",
          verb: "Verified Client status activated",
          target: "The Lagos Loom Limited",
          detail: "By Adesuwa Eze · Full hiring access granted",
          category: "profile",
          outcome: { label: "Active", variant: "success" },
        },
        {
          time: "Jan 27\n10:12 AM",
          verb: "Business KYB verified",
          target: "RC 1487293 · CAC Nigeria",
          detail: "Persona Inc. verification · Match · CAC cross-checked",
          category: "profile",
          refId: "KYB-2024-0184",
        },
        {
          time: "Jan 25\n9:18 AM",
          verb: "Account created",
          target: "The Lagos Loom Limited (cl-006)",
          detail: "Direct signup · Authorized signatory: Chukwuma Adeyemi",
          category: "signin",
          tagLabel: "CREATED",
          refId: "ACC-2024-000142",
        },
      ],
    },
    quickFacts: {
      joinedDate: "Jan 30, 2024",
      entityType: "Business · Limited",
      hqShort: "Lagos, NG",
      industryLabel: "Manufacturing · Textiles",
      lastActivity: "8h ago",
      lastActivityVariant: "success",
      tocMeta: {
        identity: { label: "✓", variant: "ok" },
        onboarding: { label: "9 / 9", variant: "ok" },
        profile: { label: "Trusted", variant: "neutral" },
        history: { label: "2 active", variant: "neutral" },
        financial: { label: "$486K", variant: "neutral" },
        communications: { label: "76", variant: "neutral" },
        signals: { label: "All clear", variant: "ok" },
        audit: { label: "26", variant: "neutral" },
      },
    },
  },
};
