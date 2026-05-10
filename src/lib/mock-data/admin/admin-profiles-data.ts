/**
 * Phase 9a — Admin Master-Detail Page Data
 *
 * 5 admin profiles for the /admin/users/admins master-detail roster.
 * Aïsha Okafor (admin-001) is verbatim from admin.html lines 20882-21262.
 * The other 4 admins (Dario / Wei / Henrietta / Hiroshi) have role-coherent
 * fixtures invented to match their role context (Super / Trust & Safety /
 * Finance / Compliance respectively).
 *
 * Sub 2 (Permissions matrix) and Sub 3 (IP allowlist) types are forward-
 * declared but only declared as optional fields here — they're populated
 * in Phase 9b when those sub-sections ship.
 */

// ============================================================
// TYPES
// ============================================================

export type AdminRole = 'ops' | 'super' | 'trust' | 'finance' | 'compliance' | 'readonly';
export type AdminAvatarVariant = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

// Roster card mini-stat (4 per card)
export interface AdminRosterStat {
  label: string;
  value: string;
  variant?: 'fresh' | 'muted';
}

// Sub 1 — sp-hr-card entries (mirror Phase 7i shape with 'super' emphasisColor)
export interface AdminHrDdValue {
  text: string;
  emphasisColor?: 'success' | 'warn' | 'danger' | 'super';
}
export interface AdminHrDlEntry { dt: string; dd: AdminHrDdValue }
export interface AdminHrCard {
  title: string;
  entries: AdminHrDlEntry[];
}

// Sub 4 — Activity timeline (mirrors Phase 7jk + 8ij with optional inlineColor on segments)
export type AdminAuditCategory = 'signin' | 'override' | 'suspension' | 'ban' | 'refund' | 'dispute' | 'export';
export type AdminAuditTagVariant =
  | 'default' | 'signin' | 'override' | 'refund' | 'dispute'
  | 'suspension' | 'ban' | 'export' | 'investigation';
export type AdminAuditOutcomeVariant = 'success' | 'partial' | 'escalated';

export interface AdminAuditDetailSegment {
  type: 'text' | 'sep' | 'refId' | 'outcome';
  text: string;
  outcomeVariant?: AdminAuditOutcomeVariant;
  // NEW in Phase 9a: inline-color span (e.g. "Pending review" amber)
  inlineColor?: 'amber' | 'danger' | 'success';
}

export interface AdminAuditEvent {
  time: string;
  cat?: AdminAuditCategory;
  verb: string;
  target?: string;
  details: AdminAuditDetailSegment[];
  tagLabel: string;
  tagVariant: AdminAuditTagVariant;
}

export interface AdminAuditDay {
  dateLabel: string;
  countLabel: string;
  events: AdminAuditEvent[];
}

// Detail head — last-login hint
export interface AdminLastLogin {
  time: string;
  location: string;
  device: string;
}

// Full admin profile
export interface AdminProfile {
  id: string;
  atlasId: string;
  name: string;
  initials: string;
  email: string;
  isYou?: boolean;

  role: AdminRole;
  roleLabel: string;
  avatarVariant: AdminAvatarVariant;

  rosterStats: [AdminRosterStat, AdminRosterStat, AdminRosterStat, AdminRosterStat];

  hireLabel: string;
  lastLogin: AdminLastLogin;

  // Sub 1 — Profile & Security
  profile: {
    accountCard: AdminHrCard;
    securityCard: AdminHrCard;
  };

  // Sub 4 — Recent activity
  activity: {
    summaryLabel: string;
    days: AdminAuditDay[];
    footerLabel: string;
    auditLinkLabel: string;
    auditLinkAction: string;
  };

  // Sub 2 / Sub 3 forward-declared as optional (Phase 9b)
  // permissions?: AdminPermissionsMatrix;
  // ipAllowlist?: AdminIpEntry[];
}

export interface AdminsPageData {
  pageMeta: string;
  profiles: AdminProfile[];
}

// ============================================================
// AVATAR GRADIENTS (av-N from Phase 7f)
// ============================================================

export const AV_GRADIENTS: Record<number, string> = {
  1: 'linear-gradient(135deg, #D9A77F, #8B5A3C)',
  2: 'linear-gradient(135deg, #7BA8D9, #3F6CA1)',
  3: 'linear-gradient(135deg, #B89BD6, #6E3FE0)',
  4: 'linear-gradient(135deg, #C7CFA8, #6B8E23)',
  5: 'linear-gradient(135deg, #E8B4B8, #8B5A6F)',
  6: 'linear-gradient(135deg, #F0CC4F, #B8911E)',
  7: 'linear-gradient(135deg, #9CC9C2, #4D8A82)',
  8: 'linear-gradient(135deg, #DCA294, #8B4F47)',
  9: 'linear-gradient(135deg, #A4B5D8, #4D6699)',
  10: 'linear-gradient(135deg, #C9B8A4, #7A6B57)',
  11: 'linear-gradient(135deg, #DD9F70, #8B5C3C)',
  12: 'linear-gradient(135deg, #B5C7A8, #5C7A4D)',
};

// ============================================================
// 5 ADMIN PROFILES
// ============================================================

export const ADMIN_PROFILES: Record<string, AdminProfile> = {
  // VERBATIM from admin.html lines 20701-20728 (roster) + 20862-21254 (detail)
  'admin-001': {
    id: 'admin-001',
    atlasId: 'adm-001-a8c3f1',
    name: 'Aïsha Okafor',
    initials: 'AO',
    email: 'aisha@atlas.example',
    isYou: true,
    role: 'ops',
    roleLabel: 'Operations Admin',
    avatarVariant: 1,
    rosterStats: [
      { label: 'Last login', value: '9:15 AM',  variant: 'fresh' },
      { label: '2FA',        value: 'TOTP+WA',  variant: 'fresh' },
      { label: 'Allowlist',  value: '3 IPs' },
      { label: 'Today',      value: '7 actions' },
    ],
    hireLabel: 'Hired Jun 12, 2022 · 3y 11mo',
    lastLogin: {
      time: 'Today, 9:15 AM',
      location: 'Lagos, NG · 102.89.41.214',
      device: 'Chrome 124 · macOS 14.4',
    },
    profile: {
      accountCard: {
        title: 'Account',
        entries: [
          { dt: 'Full name',      dd: { text: 'Aïsha Okafor' } },
          { dt: 'Email',          dd: { text: 'aisha@atlas.example' } },
          { dt: 'Phone',          dd: { text: '+234 808 412 7821' } },
          { dt: 'Atlas admin ID', dd: { text: 'adm-001-a8c3f1' } },
          { dt: 'Role',           dd: { text: 'Operations Admin · since hire' } },
          { dt: 'Hire date',      dd: { text: 'Jun 12, 2022 · 3y 11mo tenure' } },
          { dt: 'Status',         dd: { text: 'Active', emphasisColor: 'success' } },
        ],
      },
      securityCard: {
        title: 'Security posture',
        entries: [
          { dt: '2FA',              dd: { text: 'TOTP + WebAuthn · enrolled Jun 12, 2022', emphasisColor: 'success' } },
          { dt: 'Password rotated', dd: { text: 'Mar 14, 2026 (47d ago) · forced 90d cycle' } },
          { dt: 'Session',          dd: { text: '1h timeout · 55m warning · auto-logout enforced' } },
          { dt: 'IP allowlist',     dd: { text: '3 trusted IPs (see section 03)' } },
          { dt: 'Anomaly alerts',   dd: { text: 'None in 90 days', emphasisColor: 'success' } },
          { dt: 'Last anomaly',     dd: { text: 'Feb 8, 2026 · login from Abuja flagged · self-confirmed' } },
          { dt: 'Failed attempts',  dd: { text: '0 in last 30 days' } },
        ],
      },
    },
    activity: {
      summaryLabel: 'Last 8 events · full audit log available',
      days: [
        {
          dateLabel: 'Today · April 30, 2026', countLabel: '3 events',
          events: [
            { time: '2:18 PM', cat: 'override',
              verb: 'Q1 review co-signed', target: 'Mateo Vargas (Manager)',
              details: [
                { type: 'text', text: 'Co-signed with Dario Mensah · Exceeds expectations · 4.6/5' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'PR-2026-0414-MV' },
              ],
              tagLabel: 'REVIEW', tagVariant: 'override' },
            { time: '11:08 AM',
              verb: 'Approved daily report', target: 'Mateo Vargas (Manager)',
              details: [
                { type: 'text', text: 'Apr 30 cycle · 4 specialists supported · 1 strategic decision' },
              ],
              tagLabel: 'APPROVAL', tagVariant: 'default' },
            { time: '9:15 AM', cat: 'signin',
              verb: 'Sign-in', target: 'Aïsha Okafor (you)',
              details: [
                { type: 'text', text: '102.89.41.214 · Lagos · Chrome · macOS 14.4' },
                { type: 'sep', text: '·' },
                { type: 'outcome', outcomeVariant: 'success', text: '2FA + WebAuthn verified' },
              ],
              tagLabel: 'SIGN-IN', tagVariant: 'signin' },
          ],
        },
        {
          dateLabel: 'Apr 28, 2026', countLabel: '2 events',
          events: [
            { time: '3:42 PM',
              verb: 'Edited Admin note', target: 'on Daniel Kovács (spec-001)',
              details: [
                { type: 'text', text: 'Compliance posture observation · Q1 quarterly check' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'NOTE-2026-0884' },
              ],
              tagLabel: 'NOTE', tagVariant: 'default' },
            { time: '10:24 AM',
              verb: 'Resolved dispute', target: 'DSP-2026-0144',
              details: [
                { type: 'text', text: 'Studio Berlin ↔ Adesuwa · partial refund $440 issued · escalation closed' },
              ],
              tagLabel: 'DISPUTE', tagVariant: 'default' },
          ],
        },
        {
          dateLabel: 'Apr 14, 2026', countLabel: '1 event',
          events: [
            { time: '4:18 PM', cat: 'override',
              verb: 'Submitted permission change request', target: 'to Dario Mensah (Super Admin)',
              details: [
                { type: 'text', text: 'Requested: ability to modify platform email templates' },
                { type: 'sep', text: '·' },
                { type: 'text', text: 'Pending review', inlineColor: 'amber' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'PERM-2026-0021' },
              ],
              tagLabel: 'REQUEST', tagVariant: 'override' },
          ],
        },
        {
          dateLabel: 'Earlier', countLabel: '2 events',
          events: [
            { time: 'Mar 14\n2026', cat: 'override',
              verb: 'Password rotated', target: '90-day cycle policy',
              details: [
                { type: 'text', text: 'Self-initiated · 5 days before forced rotation deadline' },
              ],
              tagLabel: 'SECURITY', tagVariant: 'override' },
            { time: 'Jun 12\n2022', cat: 'signin',
              verb: 'Account created', target: 'Aïsha Okafor',
              details: [
                { type: 'text', text: 'Onboarded by Dario Mensah · initial role Operations Admin' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'ADM-2022-0001' },
              ],
              tagLabel: 'CREATED', tagVariant: 'signin' },
          ],
        },
      ],
      footerLabel: 'Showing 8 events · full audit log has 412',
      auditLinkLabel: 'Open full audit log →',
      auditLinkAction: 'open-full-audit',
    },
  },

  // Dario Mensah — Super Admin (role-coherent fixture)
  'admin-002': {
    id: 'admin-002',
    atlasId: 'adm-002-d4e8b2',
    name: 'Dario Mensah',
    initials: 'DM',
    email: 'dario@atlas.example',
    role: 'super',
    roleLabel: 'Super Admin',
    avatarVariant: 3,
    rosterStats: [
      { label: 'Last login', value: '11:42 AM', variant: 'fresh' },
      { label: '2FA',        value: 'TOTP+WA',  variant: 'fresh' },
      { label: 'Allowlist',  value: '2 IPs' },
      { label: 'Today',      value: '12 actions' },
    ],
    hireLabel: 'Hired Jan 18, 2020 · 6y 3mo',
    lastLogin: {
      time: 'Today, 11:42 AM',
      location: 'Accra, GH · 154.160.18.91',
      device: 'Safari 17.4 · macOS 14.5',
    },
    profile: {
      accountCard: {
        title: 'Account',
        entries: [
          { dt: 'Full name',      dd: { text: 'Dario Mensah' } },
          { dt: 'Email',          dd: { text: 'dario@atlas.example' } },
          { dt: 'Phone',          dd: { text: '+233 24 555 0184' } },
          { dt: 'Atlas admin ID', dd: { text: 'adm-002-d4e8b2' } },
          { dt: 'Role',           dd: { text: 'Super Admin · founding administrator', emphasisColor: 'super' } },
          { dt: 'Hire date',      dd: { text: 'Jan 18, 2020 · 6y 3mo tenure' } },
          { dt: 'Status',         dd: { text: 'Active', emphasisColor: 'success' } },
        ],
      },
      securityCard: {
        title: 'Security posture',
        entries: [
          { dt: '2FA',              dd: { text: 'TOTP + WebAuthn · enrolled Jan 18, 2020', emphasisColor: 'success' } },
          { dt: 'Password rotated', dd: { text: 'Apr 12, 2026 (18d ago) · forced 90d cycle' } },
          { dt: 'Session',          dd: { text: '1h timeout · 55m warning · auto-logout enforced' } },
          { dt: 'IP allowlist',     dd: { text: '2 trusted IPs (see section 03)' } },
          { dt: 'Anomaly alerts',   dd: { text: 'None in 90 days', emphasisColor: 'success' } },
          { dt: 'Last anomaly',     dd: { text: 'Nov 2, 2025 · login from Lisbon flagged · self-confirmed travel' } },
          { dt: 'Failed attempts',  dd: { text: '0 in last 30 days' } },
        ],
      },
    },
    activity: {
      summaryLabel: 'Last 8 events · platform-tier actions',
      days: [
        {
          dateLabel: 'Today · April 30, 2026', countLabel: '3 events',
          events: [
            { time: '2:18 PM', cat: 'override',
              verb: 'Q1 review co-signed', target: 'Mateo Vargas (Manager)',
              details: [
                { type: 'text', text: 'Co-signed with Aïsha Okafor · Exceeds expectations · 4.6/5 · exec-track recommended' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'PR-2026-0414-MV' },
              ],
              tagLabel: 'REVIEW', tagVariant: 'override' },
            { time: '10:32 AM', cat: 'override',
              verb: 'Approved permission change request', target: 'from Aïsha Okafor',
              details: [
                { type: 'text', text: 'Granted: ability to modify platform email templates' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'PERM-2026-0021' },
              ],
              tagLabel: 'GRANT', tagVariant: 'override' },
            { time: '8:42 AM', cat: 'signin',
              verb: 'Sign-in', target: 'Dario Mensah',
              details: [
                { type: 'text', text: '154.160.18.91 · Accra · Safari · macOS 14.5' },
                { type: 'sep', text: '·' },
                { type: 'outcome', outcomeVariant: 'success', text: '2FA + WebAuthn verified' },
              ],
              tagLabel: 'SIGN-IN', tagVariant: 'signin' },
          ],
        },
        {
          dateLabel: 'Apr 28, 2026', countLabel: '2 events',
          events: [
            { time: '4:08 PM', cat: 'override',
              verb: 'Modified platform fee schedule', target: 'global rate adjustment',
              details: [
                { type: 'text', text: 'Reduced specialist commission from 12% → 11% · effective May 1, 2026' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'FEE-2026-0042' },
              ],
              tagLabel: 'PLATFORM', tagVariant: 'override' },
            { time: '11:14 AM',
              verb: 'Approved exec-track conversation', target: 'Mateo Vargas',
              details: [
                { type: 'text', text: 'Q3 2026 promotion review window opened' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'EXEC-2026-0007' },
              ],
              tagLabel: 'PROMOTION', tagVariant: 'default' },
          ],
        },
        {
          dateLabel: 'Apr 22, 2026', countLabel: '1 event',
          events: [
            { time: '3:55 PM', cat: 'override',
              verb: 'Created admin invitation', target: 'pending Read-Only Admin (auditor)',
              details: [
                { type: 'text', text: 'External auditor · 90-day fixed-term access · Q2 audit cycle' },
                { type: 'sep', text: '·' },
                { type: 'text', text: 'Invitation pending acceptance', inlineColor: 'amber' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'INV-2026-0003' },
              ],
              tagLabel: 'CREATE', tagVariant: 'override' },
          ],
        },
        {
          dateLabel: 'Earlier', countLabel: '2 events',
          events: [
            { time: 'Apr 12\n2026', cat: 'override',
              verb: 'Password rotated', target: '90-day cycle policy',
              details: [
                { type: 'text', text: 'Forced rotation · WebAuthn re-attestation completed' },
              ],
              tagLabel: 'SECURITY', tagVariant: 'override' },
            { time: 'Jan 18\n2020', cat: 'signin',
              verb: 'Account created', target: 'Dario Mensah · founding Super Admin',
              details: [
                { type: 'text', text: 'Initial platform admin · self-onboarded as founding administrator' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'ADM-2020-0000' },
              ],
              tagLabel: 'CREATED', tagVariant: 'signin' },
          ],
        },
      ],
      footerLabel: 'Showing 8 events · full audit log has 612',
      auditLinkLabel: 'Open full audit log →',
      auditLinkAction: 'open-full-audit',
    },
  },

  // Wei Zhang — Trust & Safety (role-coherent fixture)
  'admin-003': {
    id: 'admin-003',
    atlasId: 'adm-003-w7c4e9',
    name: 'Wei Zhang',
    initials: 'WZ',
    email: 'wei.z@atlas.example',
    role: 'trust',
    roleLabel: 'Trust & Safety',
    avatarVariant: 5,
    rosterStats: [
      { label: 'Last login', value: '2:08 PM',  variant: 'fresh' },
      { label: '2FA',        value: 'TOTP',     variant: 'fresh' },
      { label: 'Allowlist',  value: '4 IPs' },
      { label: 'Today',      value: '18 actions' },
    ],
    hireLabel: 'Hired Sep 4, 2023 · 2y 8mo',
    lastLogin: {
      time: 'Today, 2:08 PM',
      location: 'Singapore · 116.197.142.74',
      device: 'Firefox 125 · Windows 11',
    },
    profile: {
      accountCard: {
        title: 'Account',
        entries: [
          { dt: 'Full name',      dd: { text: 'Wei Zhang' } },
          { dt: 'Email',          dd: { text: 'wei.z@atlas.example' } },
          { dt: 'Phone',          dd: { text: '+65 8456 0291' } },
          { dt: 'Atlas admin ID', dd: { text: 'adm-003-w7c4e9' } },
          { dt: 'Role',           dd: { text: 'Trust & Safety Admin · since hire' } },
          { dt: 'Hire date',      dd: { text: 'Sep 4, 2023 · 2y 8mo tenure' } },
          { dt: 'Status',         dd: { text: 'Active', emphasisColor: 'success' } },
        ],
      },
      securityCard: {
        title: 'Security posture',
        entries: [
          { dt: '2FA',              dd: { text: 'TOTP only · enrolled Sep 4, 2023', emphasisColor: 'success' } },
          { dt: 'Password rotated', dd: { text: 'Mar 28, 2026 (33d ago) · forced 90d cycle' } },
          { dt: 'Session',          dd: { text: '1h timeout · 55m warning · auto-logout enforced' } },
          { dt: 'IP allowlist',     dd: { text: '4 trusted IPs (see section 03)' } },
          { dt: 'Anomaly alerts',   dd: { text: 'None in 90 days', emphasisColor: 'success' } },
          { dt: 'Last anomaly',     dd: { text: 'Jan 22, 2026 · 3 failed login attempts · self-locked + reset' } },
          { dt: 'Failed attempts',  dd: { text: '0 in last 30 days' } },
        ],
      },
    },
    activity: {
      summaryLabel: 'Last 8 events · trust & safety actions',
      days: [
        {
          dateLabel: 'Today · April 30, 2026', countLabel: '3 events',
          events: [
            { time: '3:48 PM', cat: 'suspension',
              verb: 'Suspended candidate', target: 'cand-fraud-2104 · suspected identity fraud',
              details: [
                { type: 'text', text: '24-hour temporary hold pending document re-verification' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'TS-2026-0218' },
              ],
              tagLabel: 'SUSPEND', tagVariant: 'suspension' },
            { time: '12:40 PM',
              verb: 'Opened investigation', target: 'pattern flag · 7 candidates same IP cluster',
              details: [
                { type: 'text', text: 'Routing to anti-fraud automated review queue' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'INV-2026-0094' },
              ],
              tagLabel: 'INVESTIGATION', tagVariant: 'investigation' },
            { time: '8:12 AM', cat: 'signin',
              verb: 'Sign-in', target: 'Wei Zhang',
              details: [
                { type: 'text', text: '116.197.142.74 · Singapore · Firefox · Windows 11' },
                { type: 'sep', text: '·' },
                { type: 'outcome', outcomeVariant: 'success', text: '2FA verified' },
              ],
              tagLabel: 'SIGN-IN', tagVariant: 'signin' },
          ],
        },
        {
          dateLabel: 'Apr 29, 2026', countLabel: '2 events',
          events: [
            { time: '5:24 PM',
              verb: 'Resolved escalated dispute', target: 'DSP-2026-0151',
              details: [
                { type: 'text', text: 'Talent claim of contract breach · evidence reviewed · sided with talent · refund $1,200' },
                { type: 'sep', text: '·' },
                { type: 'outcome', outcomeVariant: 'partial', text: 'Partial refund' },
              ],
              tagLabel: 'DISPUTE', tagVariant: 'dispute' },
            { time: '2:18 PM', cat: 'ban',
              verb: 'Permanent ban issued', target: 'cl-fraud-0884 · repeat policy violation',
              details: [
                { type: 'text', text: '3rd violation in 60 days · automatic permaban per ToS § 12.4' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'BAN-2026-0011' },
              ],
              tagLabel: 'BAN', tagVariant: 'ban' },
          ],
        },
        {
          dateLabel: 'Apr 26, 2026', countLabel: '1 event',
          events: [
            { time: '11:12 AM',
              verb: 'Filed incident report', target: 'phishing campaign targeting specialists',
              details: [
                { type: 'text', text: 'External actor impersonating client onboarding · 4 specialists notified' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'INC-2026-0042' },
              ],
              tagLabel: 'INCIDENT', tagVariant: 'default' },
          ],
        },
        {
          dateLabel: 'Earlier', countLabel: '2 events',
          events: [
            { time: 'Mar 28\n2026', cat: 'override',
              verb: 'Password rotated', target: '90-day cycle policy',
              details: [
                { type: 'text', text: 'Self-initiated · 12 days before forced rotation deadline' },
              ],
              tagLabel: 'SECURITY', tagVariant: 'override' },
            { time: 'Sep 4\n2023', cat: 'signin',
              verb: 'Account created', target: 'Wei Zhang',
              details: [
                { type: 'text', text: 'Onboarded by Dario Mensah · initial role Trust & Safety Admin' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'ADM-2023-0003' },
              ],
              tagLabel: 'CREATED', tagVariant: 'signin' },
          ],
        },
      ],
      footerLabel: 'Showing 8 events · full audit log has 1,847',
      auditLinkLabel: 'Open full audit log →',
      auditLinkAction: 'open-full-audit',
    },
  },

  // Henrietta Lopez — Finance Admin (role-coherent fixture)
  'admin-004': {
    id: 'admin-004',
    atlasId: 'adm-004-h6f2c8',
    name: 'Henrietta Lopez',
    initials: 'HL',
    email: 'henrietta.l@atlas.example',
    role: 'finance',
    roleLabel: 'Finance Admin',
    avatarVariant: 7,
    rosterStats: [
      { label: 'Last login', value: 'Yesterday' },
      { label: '2FA',        value: 'TOTP',  variant: 'fresh' },
      { label: 'Allowlist',  value: '2 IPs' },
      { label: 'Today',      value: 'none', variant: 'muted' },
    ],
    hireLabel: 'Hired Mar 22, 2022 · 4y 1mo',
    lastLogin: {
      time: 'Yesterday, 6:34 PM',
      location: 'Mexico City, MX · 187.190.218.42',
      device: 'Chrome 124 · macOS 13.6',
    },
    profile: {
      accountCard: {
        title: 'Account',
        entries: [
          { dt: 'Full name',      dd: { text: 'Henrietta Lopez' } },
          { dt: 'Email',          dd: { text: 'henrietta.l@atlas.example' } },
          { dt: 'Phone',          dd: { text: '+52 55 5512 0498' } },
          { dt: 'Atlas admin ID', dd: { text: 'adm-004-h6f2c8' } },
          { dt: 'Role',           dd: { text: 'Finance Admin · since hire' } },
          { dt: 'Hire date',      dd: { text: 'Mar 22, 2022 · 4y 1mo tenure' } },
          { dt: 'Status',         dd: { text: 'Active', emphasisColor: 'success' } },
        ],
      },
      securityCard: {
        title: 'Security posture',
        entries: [
          { dt: '2FA',              dd: { text: 'TOTP only · enrolled Mar 22, 2022', emphasisColor: 'success' } },
          { dt: 'Password rotated', dd: { text: 'Apr 8, 2026 (22d ago) · forced 90d cycle' } },
          { dt: 'Session',          dd: { text: '1h timeout · 55m warning · auto-logout enforced' } },
          { dt: 'IP allowlist',     dd: { text: '2 trusted IPs (see section 03)' } },
          { dt: 'Anomaly alerts',   dd: { text: 'None in 90 days', emphasisColor: 'success' } },
          { dt: 'Last anomaly',     dd: { text: 'Dec 14, 2025 · login from Cancún flagged · self-confirmed travel' } },
          { dt: 'Failed attempts',  dd: { text: '0 in last 30 days' } },
        ],
      },
    },
    activity: {
      summaryLabel: 'Last 8 events · finance actions',
      days: [
        {
          dateLabel: 'Apr 29, 2026', countLabel: '3 events',
          events: [
            { time: '6:34 PM', cat: 'refund',
              verb: 'Approved refund batch', target: 'Q1 disputed transactions',
              details: [
                { type: 'text', text: '12 partial refunds totaling $4,840 · all within Finance Admin authority' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'REFUND-BATCH-2026-0019' },
              ],
              tagLabel: 'REFUND', tagVariant: 'refund' },
            { time: '4:12 PM',
              verb: 'Co-signed large refund', target: 'with Aïsha Okafor',
              details: [
                { type: 'text', text: 'Studio Berlin contract dispute · $7,200 refund · exceeds Operations $5K cap' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'REFUND-2026-0084' },
              ],
              tagLabel: 'CO-SIGN', tagVariant: 'default' },
            { time: '9:42 AM', cat: 'signin',
              verb: 'Sign-in', target: 'Henrietta Lopez',
              details: [
                { type: 'text', text: '187.190.218.42 · Mexico City · Chrome · macOS 13.6' },
                { type: 'sep', text: '·' },
                { type: 'outcome', outcomeVariant: 'success', text: '2FA verified' },
              ],
              tagLabel: 'SIGN-IN', tagVariant: 'signin' },
          ],
        },
        {
          dateLabel: 'Apr 28, 2026', countLabel: '2 events',
          events: [
            { time: '3:18 PM',
              verb: 'Generated quarterly financial report', target: 'Q1 2026 platform summary',
              details: [
                { type: 'text', text: 'Revenue + payouts + commission breakdown · sent to Dario for review' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'RPT-Q1-2026' },
              ],
              tagLabel: 'REPORT', tagVariant: 'default' },
            { time: '10:08 AM', cat: 'export',
              verb: 'Exported transaction log', target: 'Apr 1-27 platform-wide',
              details: [
                { type: 'text', text: '4,218 transactions · CSV export for finance reconciliation' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'EXP-2026-0156' },
              ],
              tagLabel: 'EXPORT', tagVariant: 'export' },
          ],
        },
        {
          dateLabel: 'Apr 24, 2026', countLabel: '1 event',
          events: [
            { time: '2:42 PM', cat: 'override',
              verb: 'Adjusted payout schedule', target: 'monthly → biweekly for top-tier specialists',
              details: [
                { type: 'text', text: 'Co-signed with Dario Mensah · effective May 15, 2026 · 11 specialists affected' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'PAYOUT-2026-0008' },
              ],
              tagLabel: 'PLATFORM', tagVariant: 'override' },
          ],
        },
        {
          dateLabel: 'Earlier', countLabel: '2 events',
          events: [
            { time: 'Apr 8\n2026', cat: 'override',
              verb: 'Password rotated', target: '90-day cycle policy',
              details: [
                { type: 'text', text: 'Self-initiated · 8 days before forced rotation deadline' },
              ],
              tagLabel: 'SECURITY', tagVariant: 'override' },
            { time: 'Mar 22\n2022', cat: 'signin',
              verb: 'Account created', target: 'Henrietta Lopez',
              details: [
                { type: 'text', text: 'Onboarded by Dario Mensah · initial role Finance Admin' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'ADM-2022-0002' },
              ],
              tagLabel: 'CREATED', tagVariant: 'signin' },
          ],
        },
      ],
      footerLabel: 'Showing 8 events · full audit log has 924',
      auditLinkLabel: 'Open full audit log →',
      auditLinkAction: 'open-full-audit',
    },
  },

  // Hiroshi Tanaka — Compliance Admin (role-coherent fixture)
  'admin-005': {
    id: 'admin-005',
    atlasId: 'adm-005-h9c1b3',
    name: 'Hiroshi Tanaka',
    initials: 'HT',
    email: 'hiroshi.t@atlas.example',
    role: 'compliance',
    roleLabel: 'Compliance',
    avatarVariant: 9,
    rosterStats: [
      { label: 'Last login', value: 'Apr 28' },
      { label: '2FA',        value: 'TOTP',  variant: 'fresh' },
      { label: 'Allowlist',  value: '3 IPs' },
      { label: 'Today',      value: 'none', variant: 'muted' },
    ],
    hireLabel: 'Hired Oct 11, 2022 · 3y 6mo',
    lastLogin: {
      time: 'Apr 28, 4:22 PM',
      location: 'Tokyo, JP · 126.51.84.118',
      device: 'Edge 124 · Windows 11',
    },
    profile: {
      accountCard: {
        title: 'Account',
        entries: [
          { dt: 'Full name',      dd: { text: 'Hiroshi Tanaka' } },
          { dt: 'Email',          dd: { text: 'hiroshi.t@atlas.example' } },
          { dt: 'Phone',          dd: { text: '+81 90 4128 0641' } },
          { dt: 'Atlas admin ID', dd: { text: 'adm-005-h9c1b3' } },
          { dt: 'Role',           dd: { text: 'Compliance Admin · since hire' } },
          { dt: 'Hire date',      dd: { text: 'Oct 11, 2022 · 3y 6mo tenure' } },
          { dt: 'Status',         dd: { text: 'Active', emphasisColor: 'success' } },
        ],
      },
      securityCard: {
        title: 'Security posture',
        entries: [
          { dt: '2FA',              dd: { text: 'TOTP only · enrolled Oct 11, 2022', emphasisColor: 'success' } },
          { dt: 'Password rotated', dd: { text: 'Mar 5, 2026 (56d ago) · forced 90d cycle' } },
          { dt: 'Session',          dd: { text: '1h timeout · 55m warning · auto-logout enforced' } },
          { dt: 'IP allowlist',     dd: { text: '3 trusted IPs (see section 03)' } },
          { dt: 'Anomaly alerts',   dd: { text: 'None in 90 days', emphasisColor: 'success' } },
          { dt: 'Last anomaly',     dd: { text: 'Sep 14, 2025 · login from Osaka flagged · self-confirmed travel' } },
          { dt: 'Failed attempts',  dd: { text: '0 in last 30 days' } },
        ],
      },
    },
    activity: {
      summaryLabel: 'Last 8 events · compliance actions',
      days: [
        {
          dateLabel: 'Apr 28, 2026', countLabel: '3 events',
          events: [
            { time: '4:22 PM',
              verb: 'Filed regulatory disclosure', target: 'Q1 2026 GDPR Article 30 record',
              details: [
                { type: 'text', text: 'Submitted to EU DPA · processing-activities log + sub-processor inventory' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'GDPR-2026-Q1' },
              ],
              tagLabel: 'REGULATORY', tagVariant: 'default' },
            { time: '2:14 PM',
              verb: 'Handled CCPA data export request', target: 'cand-006 (Deniz Kaya)',
              details: [
                { type: 'text', text: 'Full data subject request fulfilled within 25-day window · packaged + delivered' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'DSR-2026-0084' },
              ],
              tagLabel: 'DSR', tagVariant: 'default' },
            { time: '9:08 AM', cat: 'signin',
              verb: 'Sign-in', target: 'Hiroshi Tanaka',
              details: [
                { type: 'text', text: '126.51.84.118 · Tokyo · Edge · Windows 11' },
                { type: 'sep', text: '·' },
                { type: 'outcome', outcomeVariant: 'success', text: '2FA verified' },
              ],
              tagLabel: 'SIGN-IN', tagVariant: 'signin' },
          ],
        },
        {
          dateLabel: 'Apr 24, 2026', countLabel: '2 events',
          events: [
            { time: '5:48 PM',
              verb: 'Co-signed legal request response', target: 'with Aïsha Okafor',
              details: [
                { type: 'text', text: 'Subpoena response for cl-002-7e1b3f · 30-day production window · standard format' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'LEGAL-2026-0018' },
              ],
              tagLabel: 'CO-SIGN', tagVariant: 'default' },
            { time: '11:32 AM',
              verb: 'Reviewed audit response', target: 'external SOC 2 auditor Q1 inquiry',
              details: [
                { type: 'text', text: 'Provided control evidence + access reviews · audit cycle on track for May close' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'SOC2-2026-Q1' },
              ],
              tagLabel: 'AUDIT', tagVariant: 'default' },
          ],
        },
        {
          dateLabel: 'Apr 18, 2026', countLabel: '1 event',
          events: [
            { time: '3:42 PM',
              verb: 'Updated retention policy', target: 'candidate profile data · Brazil LGPD alignment',
              details: [
                { type: 'text', text: '7-year → 5-year retention for inactive profiles · Co-signed with Dario' },
                { type: 'sep', text: '·' },
                { type: 'text', text: 'Effective Jun 1, 2026', inlineColor: 'amber' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'POL-2026-0014' },
              ],
              tagLabel: 'POLICY', tagVariant: 'default' },
          ],
        },
        {
          dateLabel: 'Earlier', countLabel: '2 events',
          events: [
            { time: 'Mar 5\n2026', cat: 'override',
              verb: 'Password rotated', target: '90-day cycle policy',
              details: [
                { type: 'text', text: 'Self-initiated · 22 days before forced rotation deadline' },
              ],
              tagLabel: 'SECURITY', tagVariant: 'override' },
            { time: 'Oct 11\n2022', cat: 'signin',
              verb: 'Account created', target: 'Hiroshi Tanaka',
              details: [
                { type: 'text', text: 'Onboarded by Dario Mensah · initial role Compliance Admin' },
                { type: 'sep', text: '·' },
                { type: 'refId', text: 'ADM-2022-0004' },
              ],
              tagLabel: 'CREATED', tagVariant: 'signin' },
          ],
        },
      ],
      footerLabel: 'Showing 8 events · full audit log has 487',
      auditLinkLabel: 'Open full audit log →',
      auditLinkAction: 'open-full-audit',
    },
  },
};

export const ADMINS_PAGE_DATA: AdminsPageData = {
  pageMeta: '/admin/users/admins · 5 active admins · all 2FA-enrolled · changes are audited',
  profiles: [
    ADMIN_PROFILES['admin-001']!,
    ADMIN_PROFILES['admin-002']!,
    ADMIN_PROFILES['admin-003']!,
    ADMIN_PROFILES['admin-004']!,
    ADMIN_PROFILES['admin-005']!,
  ],
};
