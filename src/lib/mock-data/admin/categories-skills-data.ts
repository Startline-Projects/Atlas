export type CsTrendDirection = 'up' | 'down' | 'flat';
export type CsValueVariant = 'default' | 'warn' | 'danger';
export type CsTab = 'categories' | 'skills' | 'tools';

export interface CsPageMeta {
  title: string;
  metaText: string;
  restrictionLabel: string;
}

export interface CsHeaderAction {
  label: string;
  icon: string;
  dataAction: string;
}

export interface CsTabNavItem {
  value: CsTab;
  label: string;
  icon: string;
  count: string;
}

export interface CsTrendLabel {
  label: string;
  direction: CsTrendDirection;
}

export interface CsCatStat {
  label: string;
  value: string;
  valueVariant?: CsValueVariant;
  trendLabel: string;
  trend: CsTrendDirection;
}

export interface CsCatSub {
  name: string;
  count: number;
}

export interface CsCategoryCard {
  id: string;
  iconInitials: string;
  iconGradient: string;
  name: string;
  ownerHtml: string;
  stats: CsCatStat[];
  subCats: CsCatSub[];
  footerHtml: string;
}

export interface CsAddCategoryCard {
  title: string;
  meta: string;
}

// Page metadata
export const csPageMeta: CsPageMeta = {
  title: 'Categories & Skills',
  metaText: '/admin/platform/categories-skills · 10 role families · 847 skills · 156 tools · last library audit 12d ago',
  restrictionLabel: 'Super Admin · add / archive',
};

// Header actions
export const csHeaderActions: CsHeaderAction[] = [
  { label: 'Audit trail', icon: 'audit', dataAction: 'open-audit' },
  { label: 'Export', icon: 'download', dataAction: 'export-libraries' },
];

// Search placeholder
export const csSearchPlaceholder = 'Search across libraries…';

// Tab navigation
export const csTabNav: CsTabNavItem[] = [
  {
    value: 'categories',
    label: 'Role categories',
    icon: 'grid',
    count: '10',
  },
  {
    value: 'skills',
    label: 'Skills library',
    icon: 'layers',
    count: '847',
  },
  {
    value: 'tools',
    label: 'Tools library',
    icon: 'tool',
    count: '156',
  },
];

// Categories fixture (10 role families)
export const csCategories: CsCategoryCard[] = [
  {
    id: 'cat-eng',
    iconInitials: 'SE',
    iconGradient: 'linear-gradient(135deg, #4F6BED, #2540A8)',
    name: 'Software Engineering',
    ownerHtml: 'owned by <strong>Daniel Park</strong> (spec-001) · 8 sub-categories',
    stats: [
      { label: 'Candidates', value: '2,471', trend: 'up', trendLabel: '↑ +18% Q2' },
      { label: 'Open jobs', value: '147', trend: 'up', trendLabel: '↑ +9% Q2' },
      { label: 'Pool health', value: 'A', trend: 'up', trendLabel: '↑ healthy' },
    ],
    subCats: [
      { name: 'Frontend', count: 412 },
      { name: 'Backend', count: 587 },
      { name: 'Full-stack', count: 421 },
      { name: 'DevOps / SRE', count: 214 },
      { name: 'Mobile', count: 298 },
      { name: 'Data engineering', count: 186 },
      { name: 'Embedded', count: 82 },
      { name: 'QA / SDET', count: 271 },
    ],
    footerHtml: 'last modified · <strong>Daniel</strong> · 3d ago · added "Embedded" sub-cat',
  },
  {
    id: 'cat-design',
    iconInitials: 'DS',
    iconGradient: 'linear-gradient(135deg, #E876BA, #A8408A)',
    name: 'Design',
    ownerHtml: 'owned by <strong>Mateo Kowalski</strong> (mgr-001 · interim) · 5 sub-categories',
    stats: [
      { label: 'Candidates', value: '1,184', trend: 'up', trendLabel: '↑ +12% Q2' },
      { label: 'Open jobs', value: '68', trend: 'up', trendLabel: '↑ +4% Q2' },
      { label: 'Pool health', value: 'A', trend: 'up', trendLabel: '↑ healthy' },
    ],
    subCats: [
      { name: 'Product design', count: 412 },
      { name: 'UX/UI', count: 298 },
      { name: 'Brand', count: 186 },
      { name: 'Motion / 3D', count: 142 },
      { name: 'Illustration', count: 146 },
    ],
    footerHtml: 'last modified · <strong>Mateo</strong> · 18d ago · split UX/UI from Product',
  },
  {
    id: 'cat-data',
    iconInitials: 'DA',
    iconGradient: 'linear-gradient(135deg, #6E4F8B, #3D2B4E)',
    name: 'Data & Analytics',
    ownerHtml: 'owned by <strong>Daniel Park</strong> (spec-001 · interim) · 4 sub-categories',
    stats: [
      { label: 'Candidates', value: '892', trend: 'up', trendLabel: '↑ +24% Q2' },
      { label: 'Open jobs', value: '94', trend: 'up', trendLabel: '↑ +31% Q2' },
      { label: 'Pool health', value: 'B', valueVariant: 'warn', trend: 'down', trendLabel: '↓ demand > supply' },
    ],
    subCats: [
      { name: 'Data analyst', count: 412 },
      { name: 'Data scientist', count: 186 },
      { name: 'ML / AI engineer', count: 198 },
      { name: 'Analytics engineer', count: 96 },
    ],
    footerHtml: 'last modified · <strong>Daniel</strong> · 8d ago · added "Analytics engineer"',
  },
  {
    id: 'cat-marketing',
    iconInitials: 'MG',
    iconGradient: 'linear-gradient(135deg, #E8763A, #A35A2C)',
    name: 'Marketing & Growth',
    ownerHtml: 'owned by <strong>open</strong> · seeking specialist · 6 sub-categories',
    stats: [
      { label: 'Candidates', value: '1,547', trend: 'up', trendLabel: '↑ +8% Q2' },
      { label: 'Open jobs', value: '82', trend: 'flat', trendLabel: 'flat' },
      { label: 'Pool health', value: 'A', trend: 'flat', trendLabel: 'stable' },
    ],
    subCats: [
      { name: 'Performance marketing', count: 312 },
      { name: 'Content marketing', count: 298 },
      { name: 'SEO', count: 214 },
      { name: 'Lifecycle / CRM', count: 186 },
      { name: 'Brand marketing', count: 241 },
      { name: 'Growth product', count: 296 },
    ],
    footerHtml: 'last modified · <strong>Dario</strong> · 47d ago · category review',
  },
  {
    id: 'cat-sales',
    iconInitials: 'SC',
    iconGradient: 'linear-gradient(135deg, #4A7C3F, #2D5028)',
    name: 'Sales & Customer Success',
    ownerHtml: 'owned by <strong>Mateo Kowalski</strong> (mgr-001) · 4 sub-categories',
    stats: [
      { label: 'Candidates', value: '986', trend: 'up', trendLabel: '↑ +14% Q2' },
      { label: 'Open jobs', value: '58', trend: 'up', trendLabel: '↑ +6% Q2' },
      { label: 'Pool health', value: 'A', trend: 'up', trendLabel: '↑ healthy' },
    ],
    subCats: [
      { name: 'SDR / BDR', count: 298 },
      { name: 'Account executive', count: 312 },
      { name: 'Customer success', count: 241 },
      { name: 'Solutions / SE', count: 135 },
    ],
    footerHtml: 'last modified · <strong>Mateo</strong> · 22d ago · added "Solutions / SE"',
  },
  {
    id: 'cat-product',
    iconInitials: 'PM',
    iconGradient: 'linear-gradient(135deg, #C9A87A, #6E4F2F)',
    name: 'Product Management',
    ownerHtml: 'owned by <strong>Daniel Park</strong> (spec-001) · 3 sub-categories',
    stats: [
      { label: 'Candidates', value: '671', trend: 'up', trendLabel: '↑ +9% Q2' },
      { label: 'Open jobs', value: '42', trend: 'flat', trendLabel: 'flat' },
      { label: 'Pool health', value: 'A', trend: 'up', trendLabel: '↑ healthy' },
    ],
    subCats: [
      { name: 'Product manager', count: 421 },
      { name: 'Technical PM', count: 142 },
      { name: 'Product ops', count: 108 },
    ],
    footerHtml: 'last modified · <strong>Daniel</strong> · 14d ago',
  },
  {
    id: 'cat-content',
    iconInitials: 'CE',
    iconGradient: 'linear-gradient(135deg, #8B6F47, #5C4A2E)',
    name: 'Content & Editorial',
    ownerHtml: 'owned by <strong>Mateo Kowalski</strong> (mgr-001 · interim) · 5 sub-categories',
    stats: [
      { label: 'Candidates', value: '742', trend: 'up', trendLabel: '↑ +6% Q2' },
      { label: 'Open jobs', value: '34', trend: 'down', trendLabel: '↓ -8% Q2' },
      { label: 'Pool health', value: 'B', valueVariant: 'warn', trend: 'down', trendLabel: '↓ AI displacement' },
    ],
    subCats: [
      { name: 'Writer · long-form', count: 186 },
      { name: 'Copywriter', count: 241 },
      { name: 'Editor', count: 98 },
      { name: 'Localization', count: 142 },
      { name: 'Technical writer', count: 75 },
    ],
    footerHtml: 'last modified · <strong>Mateo</strong> · 8d ago · marked "AI displacement watch"',
  },
  {
    id: 'cat-finance',
    iconInitials: 'FO',
    iconGradient: 'linear-gradient(135deg, #4A6741, #2C3E2A)',
    name: 'Finance & Operations',
    ownerHtml: 'owned by <strong>open</strong> · seeking specialist · 5 sub-categories',
    stats: [
      { label: 'Candidates', value: '412', trend: 'up', trendLabel: '↑ +4% Q2' },
      { label: 'Open jobs', value: '29', trend: 'up', trendLabel: '↑ +11% Q2' },
      { label: 'Pool health', value: 'B', valueVariant: 'warn', trend: 'flat', trendLabel: 'stable' },
    ],
    subCats: [
      { name: 'Accounting', count: 142 },
      { name: 'FP&A', count: 98 },
      { name: 'Bookkeeping', count: 82 },
      { name: 'Operations', count: 68 },
      { name: 'Revenue ops', count: 22 },
    ],
    footerHtml: 'last modified · <strong>Dario</strong> · 47d ago · category review',
  },
  {
    id: 'cat-people',
    iconInitials: 'PR',
    iconGradient: 'linear-gradient(135deg, #B85A8F, #7E3D62)',
    name: 'People & Recruiting',
    ownerHtml: 'owned by <strong>Mateo Kowalski</strong> (mgr-001) · 3 sub-categories',
    stats: [
      { label: 'Candidates', value: '298', trend: 'up', trendLabel: '↑ +5% Q2' },
      { label: 'Open jobs', value: '22', trend: 'flat', trendLabel: 'flat' },
      { label: 'Pool health', value: 'A', trend: 'up', trendLabel: '↑ healthy' },
    ],
    subCats: [
      { name: 'Tech recruiter', count: 142 },
      { name: 'HR generalist', count: 86 },
      { name: 'People ops', count: 70 },
    ],
    footerHtml: 'last modified · <strong>Mateo</strong> · 31d ago',
  },
  {
    id: 'cat-legal',
    iconInitials: 'LC',
    iconGradient: 'linear-gradient(135deg, #2D3E50, #1A232C)',
    name: 'Legal & Compliance',
    ownerHtml: 'owned by <strong>Daniel Park</strong> (spec-001 · interim) · 3 sub-categories',
    stats: [
      { label: 'Candidates', value: '186', trend: 'up', trendLabel: '↑ +12% Q2' },
      { label: 'Open jobs', value: '18', trend: 'up', trendLabel: '↑ +22% Q2' },
      { label: 'Pool health', value: 'B', valueVariant: 'warn', trend: 'down', trendLabel: '↓ specialized' },
    ],
    subCats: [
      { name: 'Privacy & data', count: 68 },
      { name: 'Contract', count: 72 },
      { name: 'Compliance ops', count: 46 },
    ],
    footerHtml: 'last modified · <strong>Daniel</strong> · 9d ago · added "Privacy & data"',
  },
];

// Add category card
export const csAddCategoryCard: CsAddCategoryCard = {
  title: 'Add role category',
  meta: 'Super Admin only · creates new top-level role family · triggers migration plan for affected candidates',
};

// ============================================================
// PASS B — SKILLS LIBRARY
// ============================================================

export interface CsConsolidationData {
  eyebrow: string;
  title: string;
  metaHtml: string;
  viewAllLabel: string;
  runLabel: string;
}

export interface CsSkillFilter {
  value: string;
  label: string;
  count: string;
  active?: boolean;
}

export type CsSkillFlagVariant = 'merge' | 'archive';

export interface CsSkillRow {
  id: string;
  name: string;
  aliasesHtml?: string;
  categoryChips: string[];
  count: string;
  countMetaText: string;
  trend: CsTrendDirection;
  trendLabel: string;
  duplicateWarn?: boolean;
  flag?: CsSkillFlagVariant;
  flagLabel?: string;
  actionLabel?: string;
  flagStyle?: { background: string; color: string };
}

// Consolidation alert fixture
export const csConsolidation: CsConsolidationData = {
  eyebrow: 'CONSOLIDATION CANDIDATES · DEDUP TOOL',
  title: '14 potential duplicate skills detected',
  metaHtml:
    'Atlas\'s similarity model flagged <strong>14 skill clusters</strong> where multiple tags likely refer to the same skill (e.g. "React" / "ReactJS" / "React.js"). Merging consolidates candidate counts, simplifies search, and reduces tag pollution. <strong>Merge is reversible for 30 days.</strong> All merges audit-logged.',
  viewAllLabel: 'View all',
  runLabel: 'Run consolidation',
};

// Filter chips (5 options, first is active)
export const csSkillFilters: CsSkillFilter[] = [
  { value: 'all', label: 'All', count: '847', active: true },
  { value: 'duplicates', label: 'Duplicates', count: '14' },
  { value: 'trending', label: 'Trending', count: '28' },
  { value: 'declining', label: 'Declining', count: '12' },
  { value: 'orphan', label: 'Orphaned', count: '7' },
];

// Search placeholder
export const csSkillSearchPlaceholder = 'Search 847 skills…';

// Skill rows (15 total, from admin.html lines 61065-61219)
export const csSkillRows: CsSkillRow[] = [
  {
    id: 'skill-react',
    name: 'React',
    aliasesHtml: '<span class="csn-alias">ReactJS</span><span class="csn-alias">React.js</span> · 3 variants · 4d ago auto-flagged',
    categoryChips: ['Software Engineering'],
    count: '1,842',
    countMetaText: '847 + 612 + 383 across variants',
    trend: 'up',
    trendLabel: '↑ +14%',
    duplicateWarn: true,
    flag: 'merge',
    flagLabel: 'Merge candidate',
    actionLabel: 'Merge',
  },
  {
    id: 'skill-typescript',
    name: 'TypeScript',
    categoryChips: ['Software Engineering'],
    count: '1,247',
    countMetaText: 'across 8 sub-roles',
    trend: 'up',
    trendLabel: '↑ +22%',
  },
  {
    id: 'skill-python',
    name: 'Python',
    categoryChips: ['Software Engineering', 'Data & Analytics'],
    count: '1,891',
    countMetaText: 'most-tagged skill',
    trend: 'up',
    trendLabel: '↑ +9%',
  },
  {
    id: 'skill-node',
    name: 'Node.js',
    aliasesHtml: '<span class="csn-alias">NodeJS</span><span class="csn-alias">Node</span> · 3 variants',
    categoryChips: ['Software Engineering'],
    count: '1,096',
    countMetaText: '624 + 312 + 160 across variants',
    trend: 'up',
    trendLabel: '↑ +6%',
    duplicateWarn: true,
    flag: 'merge',
    flagLabel: 'Merge candidate',
    actionLabel: 'Merge',
  },
  {
    id: 'skill-figma',
    name: 'Figma',
    categoryChips: ['Design'],
    count: '982',
    countMetaText: '~83% of Design candidates',
    trend: 'up',
    trendLabel: '↑ +17%',
  },
  {
    id: 'skill-sql',
    name: 'SQL',
    categoryChips: ['Data & Analytics', 'Software Engineering'],
    count: '1,524',
    countMetaText: 'cross-role',
    trend: 'up',
    trendLabel: '↑ +4%',
  },
  {
    id: 'skill-aws',
    name: 'AWS',
    categoryChips: ['Software Engineering'],
    count: '894',
    countMetaText: 'DevOps + Backend',
    trend: 'up',
    trendLabel: '↑ +11%',
  },
  {
    id: 'skill-llm',
    name: 'LLM fine-tuning',
    categoryChips: ['Data & Analytics'],
    count: '312',
    countMetaText: 'newer skill · added Jan',
    trend: 'up',
    trendLabel: '↑ +287%',
  },
  {
    id: 'skill-ml',
    name: 'Machine learning',
    aliasesHtml: '<span class="csn-alias">ML</span><span class="csn-alias">Machine Learning</span> · 3 variants',
    categoryChips: ['Data & Analytics'],
    count: '687',
    countMetaText: '412 + 187 + 88 across variants',
    trend: 'up',
    trendLabel: '↑ +31%',
    duplicateWarn: true,
    flag: 'merge',
    flagLabel: 'Merge candidate',
    actionLabel: 'Merge',
  },
  {
    id: 'skill-tailwind',
    name: 'Tailwind CSS',
    categoryChips: ['Software Engineering'],
    count: '578',
    countMetaText: 'Frontend',
    trend: 'up',
    trendLabel: '↑ +42%',
  },
  {
    id: 'skill-rust',
    name: 'Rust',
    categoryChips: ['Software Engineering'],
    count: '312',
    countMetaText: 'growing fast',
    trend: 'up',
    trendLabel: '↑ +89%',
  },
  {
    id: 'skill-go',
    name: 'Go',
    categoryChips: ['Software Engineering'],
    count: '428',
    countMetaText: 'Backend / Infrastructure',
    trend: 'up',
    trendLabel: '↑ +18%',
  },
  {
    id: 'skill-flash',
    name: 'Flash / ActionScript',
    categoryChips: ['Design'],
    count: '8',
    countMetaText: 'last engagement 2019',
    trend: 'down',
    trendLabel: '↓ -94%',
    flag: 'archive',
    flagLabel: 'Archive?',
    actionLabel: 'Archive',
    flagStyle: { background: 'var(--cream-deep)', color: 'var(--ink-mute)' },
  },
  {
    id: 'skill-salesforce',
    name: 'Salesforce',
    categoryChips: ['Sales & CS'],
    count: '412',
    countMetaText: 'CRM',
    trend: 'flat',
    trendLabel: 'flat',
  },
  {
    id: 'skill-seo',
    name: 'SEO',
    categoryChips: ['Marketing & Growth'],
    count: '214',
    countMetaText: 'specialty',
    trend: 'down',
    trendLabel: '↓ -12%',
  },
];

// Footer metadata
export const csSkillFooterMeta = '15 of 847 skills shown · sorted by candidate count desc · 14 marked for consolidation';
export const csSkillLoadMoreLabel = 'Load more skills →';

// ============================================================
// PASS C — TOOLS LIBRARY PANE (admin.html lines 61233-61463)
// ============================================================

export interface CsTool {
  id: string;
  initials: string;
  logoGradient: string; // verbatim CSS background value for inline style
  name: string;
  metaHtml: string; // contains inline <strong> tags
}

export interface CsToolSection {
  id: string;
  title: string;
  metaHtml: string;
  viewAllLabel: string;
  tools: CsTool[];
  addCardLabel: string;
}

export const csToolSections: CsToolSection[] = [
  {
    id: 'tools-eng',
    title: 'Engineering tools',
    metaHtml: 'most-common per Software Engineering · <strong>34 tools tracked</strong> · 8 most-used shown',
    viewAllLabel: 'View all 34',
    addCardLabel: 'Add tool',
    tools: [
      {
        id: 'tool-github',
        initials: 'G',
        logoGradient: 'linear-gradient(135deg, #2D2D2D, #000000)',
        name: 'GitHub',
        metaHtml: '<strong>2,341</strong> candidates · 89%',
      },
      {
        id: 'tool-vscode',
        initials: 'V',
        logoGradient: 'linear-gradient(135deg, #0078D4, #005A9E)',
        name: 'VS Code',
        metaHtml: '<strong>2,108</strong> candidates · 85%',
      },
      {
        id: 'tool-docker',
        initials: 'D',
        logoGradient: 'linear-gradient(135deg, #2496ED, #0F5C9C)',
        name: 'Docker',
        metaHtml: '<strong>1,789</strong> candidates · 72%',
      },
      {
        id: 'tool-jira',
        initials: 'J',
        logoGradient: 'linear-gradient(135deg, #0052CC, #002C7E)',
        name: 'Jira',
        metaHtml: '<strong>1,584</strong> candidates · 64%',
      },
      {
        id: 'tool-postman',
        initials: 'P',
        logoGradient: 'linear-gradient(135deg, #FF6C37, #BF4A1F)',
        name: 'Postman',
        metaHtml: '<strong>1,247</strong> candidates · 50%',
      },
      {
        id: 'tool-kubernetes',
        initials: 'K',
        logoGradient: 'linear-gradient(135deg, #326CE5, #1F4FAE)',
        name: 'Kubernetes',
        metaHtml: '<strong>912</strong> candidates · 37%',
      },
      {
        id: 'tool-terraform',
        initials: 'T',
        logoGradient: 'linear-gradient(135deg, #623CE4, #401E9C)',
        name: 'Terraform',
        metaHtml: '<strong>847</strong> candidates · 34%',
      },
    ],
  },
  {
    id: 'tools-design',
    title: 'Design tools',
    metaHtml: 'most-common per Design · <strong>22 tools tracked</strong> · 8 most-used shown',
    viewAllLabel: 'View all 22',
    addCardLabel: 'Add tool',
    tools: [
      {
        id: 'tool-figma',
        initials: 'F',
        logoGradient: 'linear-gradient(135deg, #F24E1E, #A23314)',
        name: 'Figma',
        metaHtml: '<strong>1,084</strong> candidates · 92%',
      },
      {
        id: 'tool-adobe',
        initials: 'A',
        logoGradient: 'linear-gradient(135deg, #FF0000, #B30000)',
        name: 'Adobe CC',
        metaHtml: '<strong>847</strong> candidates · 72%',
      },
      {
        id: 'tool-sketch',
        initials: 'S',
        logoGradient: 'linear-gradient(135deg, #F7B500, #B58700)',
        name: 'Sketch',
        metaHtml: '<strong>312</strong> candidates · 26%',
      },
      {
        id: 'tool-framer',
        initials: 'F',
        logoGradient: 'linear-gradient(135deg, #0055FF, #0033A8)',
        name: 'Framer',
        metaHtml: '<strong>284</strong> candidates · 24%',
      },
      {
        id: 'tool-blender',
        initials: 'B',
        logoGradient: 'linear-gradient(135deg, #F5792A, #B85A1F)',
        name: 'Blender',
        metaHtml: '<strong>142</strong> candidates · 12%',
      },
      {
        id: 'tool-procreate',
        initials: 'P',
        logoGradient: 'linear-gradient(135deg, #5C5C5C, #2D2D2D)',
        name: 'Procreate',
        metaHtml: '<strong>108</strong> candidates · 9%',
      },
      {
        id: 'tool-rive',
        initials: 'R',
        logoGradient: 'linear-gradient(135deg, #1D1D1D, #000000)',
        name: 'Rive',
        metaHtml: '<strong>68</strong> candidates · 6%',
      },
    ],
  },
  {
    id: 'tools-data',
    title: 'Data & Analytics tools',
    metaHtml: 'most-common per Data &amp; Analytics · <strong>28 tools tracked</strong> · 7 most-used shown',
    viewAllLabel: 'View all 28',
    addCardLabel: 'Add tool',
    tools: [
      {
        id: 'tool-pandas',
        initials: 'P',
        logoGradient: 'linear-gradient(135deg, #150458, #0A0230)',
        name: 'Pandas',
        metaHtml: '<strong>768</strong> candidates · 86%',
      },
      {
        id: 'tool-tableau',
        initials: 'T',
        logoGradient: 'linear-gradient(135deg, #E97627, #A8541C)',
        name: 'Tableau',
        metaHtml: '<strong>584</strong> candidates · 65%',
      },
      {
        id: 'tool-snowflake',
        initials: 'S',
        logoGradient: 'linear-gradient(135deg, #29B5E8, #1A7AA3)',
        name: 'Snowflake',
        metaHtml: '<strong>421</strong> candidates · 47%',
      },
      {
        id: 'tool-dbt',
        initials: 'D',
        logoGradient: 'linear-gradient(135deg, #FF694B, #B5462F)',
        name: 'dbt',
        metaHtml: '<strong>312</strong> candidates · 35%',
      },
      {
        id: 'tool-looker',
        initials: 'L',
        logoGradient: 'linear-gradient(135deg, #4285F4, #1A65C2)',
        name: 'Looker',
        metaHtml: '<strong>286</strong> candidates · 32%',
      },
      {
        id: 'tool-pytorch',
        initials: 'P',
        logoGradient: 'linear-gradient(135deg, #EE4C2C, #A8351F)',
        name: 'PyTorch',
        metaHtml: '<strong>247</strong> candidates · 28%',
      },
      {
        id: 'tool-mlflow',
        initials: 'M',
        logoGradient: 'linear-gradient(135deg, #0194E2, #015C8E)',
        name: 'MLflow',
        metaHtml: '<strong>184</strong> candidates · 21%',
      },
    ],
  },
];

export const csToolsFooterMeta = '3 of 10 tool categories shown · 156 tools total · auto-categorization runs nightly';
export const csToolsFooterButtonLabel = 'View remaining 7 categories →';
