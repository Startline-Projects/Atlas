# Atlas — Talent Specialist Manager Additions Scope

**Project:** Atlas — Global Talent Marketplace
**Audience:** The Manager of Talent Specialists — one person at Atlas who oversees the team of Talent Specialists. The Manager is also a Talent Specialist themselves and works their own role category like any other Specialist.
**Operated by:** Staffva LLC, doing business as Atlas, registered in Michigan, USA
**Build approach:** Start with the existing Talent Specialist HTML interface and add a Manager layer on top. The Manager keeps every Specialist feature and gains team oversight capabilities via a toggle.

---

## Core principle

The Manager is a Talent Specialist with extra responsibilities. They are not a different kind of user. The interface reflects this by being **the Talent Specialist interface plus a toggleable Management layer** — same shell, same login, same navigation patterns, with one additional dimension.

The Manager toggles between two modes throughout their day:

1. **Specialist Mode** — Their personal Talent Specialist work. Identical to any other Specialist's interface. They source candidates, review interviews, manage their assigned candidates and clients in their role category, handle their own disputes, submit their personal daily activity.

2. **Manager Mode** — Their team oversight work. New dashboard content, new sidebar items, new pages for team management.

The toggle lives at the top of the dashboard and is always visible. Notifications and messages are **shared** across both modes (single bell icon, single envelope icon, single unified inboxes).

---

## What stays the same (preserve from existing Specialist interface)

Every existing page, component, behavior, and visual design from the Talent Specialist HTML stays unchanged for Specialist Mode:

- Sign in / forgot password / 2FA flows
- Top bar (logo, search, notifications bell, messages icon, avatar menu)
- Sidebar navigation (Workspace + Operations sections)
- Dashboard with urgent items, snapshot, and rail
- Review queue with all functionality
- Re-cert queue
- My candidates and candidate detail
- Candidate chat
- My clients and client detail
- Client chat
- Sourcing
- Pool health
- Disputes
- Daily activity
- Performance
- Reviews & approvals
- Settings
- Help & resources
- All component patterns, styling, design tokens
- All interaction patterns
- All existing JavaScript behavior

---

## What gets added

### 1. The dashboard mode toggle (the critical new component)

**Location:** Top of the dashboard view, prominently visible, immediately below the dashboard header (above the "Today snapshot" / "Urgent items" sections).

**Behavior:** Segmented control with two options:

```
┌────────────────────────────────────────────────────────────┐
│   [ My Specialist View ]    [ Manager View ]               │
└────────────────────────────────────────────────────────────┘
```

- The active mode is visually distinct (filled background, white text, or similar treatment matching existing button patterns in the HTML)
- The inactive mode is muted (outlined or ghost button style)
- Click the inactive segment → instant content swap (no page reload)
- The toggle is **only visible on the dashboard view** — once the Manager navigates to a specific page (e.g., Review Queue, My Team), the toggle disappears from that page but the active mode persists
- URL updates to reflect mode: `#dashboard` for Specialist Mode (default), `#dashboard-manager` for Manager Mode (or use a query param — implementer's choice)
- Mode persists across sessions (saved in localStorage or session storage)
- Toggle is keyboard accessible (Tab to focus, Arrow keys or Enter to switch)
- Default state on first login: Manager Mode (since this is the Manager's primary identity)

**Visual treatment:**
- Use the existing design language from the Specialist interface (same fonts, colors, border radius, spacing)
- The toggle should feel premium and intentional, not like a tab switcher
- Width: roughly 320-400px, centered or left-aligned to match the dashboard header
- Height: matches existing button heights (around 36-40px)

**State persistence:**
- When the Manager logs out and logs back in, they return to whichever mode they last used
- The active mode is reflected in URL hash or query param so the back/forward buttons work as expected

---

### 2. Sidebar updates (mode-aware)

The sidebar already exists in the Specialist interface with two sections (Workspace, Operations). For the Manager, the sidebar gains a third section that only appears in Manager Mode.

**Specialist Mode sidebar (unchanged from existing):**

```
WORKSPACE
- Dashboard
- Review queue
- Re-cert queue
- My candidates
- My clients
- Sourcing
- Disputes
- Pool health

OPERATIONS
- Daily activity
- Reviews
- Performance
- Help & resources
```

**Manager Mode sidebar (existing items + new Manager section):**

```
WORKSPACE
- Dashboard
- Review queue
- Re-cert queue
- My candidates
- My clients
- Sourcing
- Disputes
- Pool health

OPERATIONS
- Daily activity
- Reviews
- Performance
- Help & resources

TEAM MANAGEMENT (NEW SECTION — appears only in Manager Mode)
- My Team
- Team Performance
- Daily Activity Audit
- Team Disputes
- Pool Coordination
- Recruitment Sprints
- Team Reports
- Manager Daily Activity
```

The "TEAM MANAGEMENT" section header uses the same styling as the existing "WORKSPACE" and "OPERATIONS" section headers.

Each new sidebar item uses the same `.dash-side-item` class and patterns as the existing items — with an SVG icon (designer chooses appropriate icons), label, and optional badge for counts/alerts.

**Behavior:**
- In Specialist Mode: TEAM MANAGEMENT section is hidden completely
- In Manager Mode: TEAM MANAGEMENT section is visible
- Switching modes via the dashboard toggle reveals/hides the section instantly without page reload
- The sidebar's footer ("Your category: Virtual Assistants · Pool stable · 18 live") stays visible in both modes since the Manager is also a Specialist in a specific role category

---

### 3. Shared notifications across both modes

The existing notifications bell and dropdown in the top bar stay exactly as designed. The Manager's notifications work like this:

**Single unified notification stream.** Both Specialist-context notifications and Manager-context notifications flow into the same bell. The unread count includes both types.

**Each notification carries a context tag.** Inside the notification dropdown, each notification card displays a small tag indicating its context:

- **"Specialist" tag** — notifications about the Manager's own work (a candidate they need to review, a dispute on a contract they own, their daily activity reminder, a message from a candidate they manage as a Specialist)
- **"Manager" tag** — notifications about team oversight (a Specialist missed their daily activity, the team has disputes at risk of SLA breach, pool depletion in a category they don't personally own, performance flags)

**Visual treatment of the tag:**
- Small badge or chip on the right side of the notification card (similar pattern to existing badges in the HTML)
- Distinct colors for Specialist vs. Manager tags (designer's choice — could use the existing color palette: dark for Specialist, lime accent for Manager, or vice versa)
- Tag is non-clickable (it's just contextual information)

**Filter options at the top of the dropdown:**
- All (default)
- Specialist only
- Manager only

The existing "Mark all read" action stays.

**Clicking a notification routes to the relevant page:**
- If the notification relates to Specialist work and the Manager is in Manager Mode → automatically switches to Specialist Mode and navigates to the page
- If the notification relates to Manager work and the Manager is in Specialist Mode → automatically switches to Manager Mode and navigates to the page
- This is smart routing — the Manager never has to manually toggle to follow up on a notification

**New notification types for Manager Mode** (added to existing notification types):

- "[Specialist Name] missed daily activity submission"
- "[Specialist Name] missed daily activity 2 days running"
- "[Specialist Name]'s review SLA at risk: [N] reviews pending"
- "[Specialist Name]'s dispute SLA at risk: [N] disputes nearing 72-hour mark"
- "[Specialist Name]'s performance flag: [metric] dropped below threshold this week"
- "Pool coordination opportunity: [Category A] is overflowing while [Category B] is depleted"
- "Recruitment sprint needed in [Role Category]"
- "[Specialist Name] requested a 1:1 meeting"
- "Performance review for [Specialist Name] coming up"
- "Admin request: [request description]"

---

### 4. Shared messages across both modes

The existing messages icon and dropdown in the top bar stay exactly as designed. The Manager's messages work like this:

**Single unified message inbox.** All conversations flow into the same envelope icon. The unread count includes:

1. **Candidate conversations** — candidates the Manager manages as a Specialist
2. **Client conversations** — clients the Manager serves as a Specialist
3. **Specialist conversations** — 1:1 messages with the Specialists the Manager oversees

**Each conversation carries a type indicator.** In the conversation list, each conversation displays a small icon or label indicating who the other party is:

- **Candidate** badge (or icon) for candidate conversations
- **Client** badge (or icon) for client conversations
- **Specialist** badge (or icon) for Manager-to-Specialist conversations

**Visual treatment:**
- Small badge or chip on the conversation row (similar to existing patterns in the HTML)
- Distinct visual treatment per type so the Manager can scan the list quickly
- The Specialist-to-Specialist conversations might have a slightly different visual treatment (e.g., a different border color or accent) to indicate they're team-internal

**Filter options in the message dropdown:**
- All (default)
- Candidates only
- Clients only
- Team (Specialists) only

The existing message dropdown structure stays — header, list of recent conversations, "View all messages" link.

**Specialist-to-Specialist conversation features (additional):**
When the Manager opens a conversation with one of their Specialists, the chat view should include some additional Manager-specific tools that don't appear in Candidate or Client chats:

- "Schedule a 1:1 meeting" button in the chat header
- "Add coaching note" button (logs a private coaching note for HR records, visible only to Manager and Admin)
- "View their performance" quick link
- Standard message templates for common Manager-to-Specialist scenarios (e.g., "Follow up on missed daily activity," "Performance check-in," "Sprint coordination")

The Specialist-to-Specialist chat reuses the existing chat layout from the Candidate chat or Client chat pages — same composer, same message thread style, same controls. The differences are just the additional Manager-specific actions in the header.

---

### 5. Dashboard content in Manager Mode

When the toggle is set to Manager View, the dashboard content swaps from the Specialist dashboard content to the Manager dashboard content. The layout grid and styling match the existing dashboard for consistency.

The existing Specialist dashboard has these regions:
- Dashboard header (greeting, date, system status)
- Today's snapshot (queue count, disputes count, reviews count)
- Urgent items section
- Active items columns
- Rail (right side: on-call, daily activity, quick actions)

The Manager dashboard reuses these layout regions but with team-focused content.

**Manager dashboard header:**
- "Manager View — [Manager's Name]"
- Today's date
- System status (same as Specialist)

**Today's snapshot (team-wide):**
Replace the Specialist's personal counts with team-wide counts:
- Specialists active today: [10 of 11]
- Daily activity submitted: [9 of 11]
- Open disputes across team: [12, with 3 SLA at risk]
- Reviews completed today across team: [47]
- Pool health: [Strong / Stable / Depleted across N categories]

**Urgent items section (team-wide):**
Reuses the existing `.urgent-grid` styling and pattern. Cards show team-wide urgent items:

- **Red (urgent):** "[Specialist Name] missed daily activity submission (2 days running)"
- **Red (urgent):** "Disputes SLA at risk: [N] disputes nearing 72-hour mark across team"
- **Red (urgent):** "Pool depletion: [Role Category] critically low at [N] candidates"
- **Orange (today):** "[Specialist Name]'s review SLA hit rate dropped to 85% this week"
- **Orange (today):** "[N] performance reviews overdue"
- **Yellow (this week):** "Recruitment sprint recommended: [Role Category] projected to deplete in 5 days"

Each card uses the existing urgent-card pattern from the Specialist dashboard with priority indicator, type, details, time/SLA, and action button.

**Active items columns (team-wide):**
Replace the three Specialist columns (Candidates needing my action, Clients needing my action, Recent activity) with three Manager columns:

**Column 1: Specialists needing my attention**
- List of Specialists with issues: missing daily activity, performance flags, SLA at risk
- Per item: Specialist name + photo, issue type, time elapsed, "View profile" link

**Column 2: Disputes requiring oversight**
- List of team-wide disputes flagged for Manager review or intervention
- Per item: client/candidate names, owning Specialist, SLA countdown, "View" link

**Column 3: Recent team activity**
- Live feed of significant team events: Specialists logging in, daily activities submitted, disputes resolved, candidates approved
- Same pattern as the existing activity feed but team-wide

**Rail (right side):**
- "On call" indicator stays (Manager might be on a 1:1 video call)
- New: "Manager daily activity" status (separate from Specialist daily activity)
- Quick actions panel:
  - "Submit Manager daily report" (new)
  - "Schedule a 1:1" (new)
  - "Audit a Specialist" (new)
  - "View team analytics" (new)
  - "Run a recruitment sprint" (new)

---

### 6. New Manager-only pages

When the Manager clicks an item in the TEAM MANAGEMENT sidebar section, they navigate to a new page. These pages don't exist in the Specialist interface and need to be built from scratch using the existing design patterns.

Each new page follows the existing patterns: same sidebar, same top bar, same layout shell, same component styling (cards, badges, buttons, tables, etc.).

---

#### Page 1 — My Team

**URL:** `#my-team`

**Purpose:** Directory of all Talent Specialists with quick oversight access.

**Layout:**

- Sidebar on left (Manager Mode active)
- Main content area on right

**Main content:**

1. **Header**
   - "My Team — Talent Specialists"
   - Total Specialists count
   - Filter tabs: All / Active / On vacation / Performance flagged / At capacity
   - Search by name
   - Sort dropdown: Name / Role category / Performance score / Workload

2. **Team grid (or list view)**
   - Each Specialist as a card or row
   - Photo, name, role category, country flag
   - Status badge (Active / On vacation / At capacity / Performance flag / Out of office)
   - Today's daily activity submission status (✓ Submitted / Pending / Not submitted)
   - Workload indicator (caseload size: N candidates, N active contracts)
   - Performance score (composite metric: review SLA, dispute SLA, sourcing volume)
   - Last activity timestamp
   - Quick action buttons: View profile, Message, Schedule 1:1

3. **Empty state**
   - "No Specialists match your filter" with reset action

**Component reuse:**
- Use existing card patterns from My Candidates / My Clients pages
- Use existing badge styles
- Use existing filter tabs and search patterns

---

#### Page 2 — Individual Specialist Oversight

**URL:** `#specialist-detail/[id]`

**Purpose:** Deep dive into one Specialist's performance, workload, and activity. Opened when Manager clicks a Specialist from My Team.

**Layout:**

1. **Header**
   - Specialist photo + name + role category
   - Country, time zone, languages
   - Status badge
   - Action buttons row: Message, Schedule 1:1, View their dashboard, Audit daily activity, Performance review, Log coaching note

2. **Tabbed sections** (use existing tab pattern from the Specialist interface):

   **Tab: Overview**
   - Quick stats: total candidates managed, total clients in their category, active contracts they oversee, this month's reviews completed, this month's disputes resolved
   - Recent activity timeline

   **Tab: Performance**
   - Review performance card (reviews completed, average time, approval rate, SLA hit rate)
   - Dispute performance card (disputes handled, average resolution time, SLA hit rate, outcomes breakdown)
   - Sourcing performance card (candidates sourced, pass rate, hire rate, channels effectiveness)
   - Pool management card (their pool size, depletion incidents, recovery time)
   - Each card with charts showing trends over time (reuse existing chart styles from Performance page)

   **Tab: Workload**
   - Active caseload visualization
   - Capacity utilization
   - Recent assignments
   - Items needing their attention right now

   **Tab: Daily Activity**
   - Today's submission status
   - Last 30 days submissions calendar
   - Adherence rate (% on time)
   - Sample of recent submissions (expandable to view detail)
   - Patterns: channels used, conversion rates

   **Tab: Coaching Notes**
   - Manager's private notes on this Specialist (auto-saving rich text editor)
   - Past coaching notes log
   - Performance review history
   - Visible only to Manager and Admin

   **Tab: Communication**
   - All Manager-to-Specialist messages
   - Past 1:1 meeting notes
   - Search messages

   **Tab: Their Work**
   - Quick links to view the Specialist's:
     - Assigned candidates
     - Clients in their category
     - Open disputes they own
     - Open shortlist requests
     - "Open their full Specialist view" — switches Manager to a read-only view of this Specialist's actual interface (useful for understanding what they see)

**Action buttons with confirmation flows:**
- Message Specialist → opens chat (existing pattern)
- Schedule 1:1 → opens calendar booking modal
- Performance review → opens review template
- Log coaching note → opens note editor
- Flag for admin review → escalation flow
- Suspend (admin override required, button disabled with tooltip)

---

#### Page 3 — Daily Activity Audit

**URL:** `#daily-audit`

**Purpose:** Manager reviews and approves all daily activity submissions across the team.

**Layout:**

1. **Header**
   - "Daily Activity Audit"
   - Date selector (default: today)
   - "Submit my Manager daily report" CTA

2. **Submission status overview**
   - Total Specialists: 11
   - Submitted today: [N of 11]
   - Not submitted: [N of 11] (with names listed)
   - Submission timing distribution (small chart showing when across the day they submitted)

3. **Per-Specialist audit table**
   - Specialist photo + name (sortable)
   - Today's submission status (Submitted ✓ / Not submitted)
   - Submission time
   - Activity summary: LinkedIn messages, emails, posts, responses, signups
   - Click row to expand → full submission detail (what they logged in their daily activity form)
   - Quick actions:
     - Approve submission
     - Flag for follow-up
     - Request clarification (sends a message to the Specialist)

4. **Not-yet-submitted highlighted section**
   - Specialists who haven't submitted by deadline
   - Send reminder, mark as excused, flag for performance review

5. **Patterns insights**
   - Average daily activity volume per Specialist
   - Channels most commonly used
   - Conversion rates
   - Submission timing patterns

6. **Past activity records**
   - Calendar view of past submissions
   - Click any past day to audit

**Component reuse:**
- Use existing table patterns from Daily Activity (Specialist view)
- Use existing badge/status styles
- Use existing calendar patterns

---

#### Page 4 — Team Disputes

**URL:** `#team-disputes`

**Purpose:** View of all disputes across the team with Manager intervention capability.

**Layout:**

1. **Header**
   - "Team Disputes"
   - Filter tabs: All open / SLA at risk / Specialist's first dispute / Escalation requested
   - Sort: Oldest / Newest / By SLA / By Specialist
   - Search

2. **Disputes table** (extension of existing Disputes page)
   - Status badge
   - Client display name
   - Candidate name
   - Owning Specialist
   - Dispute reason
   - Submission date / time elapsed
   - SLA countdown
   - Quick action: Open, Message Specialist, Intervene

3. **Dispute detail view (opens when row clicked)**
   - All content from the existing Specialist Dispute detail page
   - Plus Manager-specific actions:
     - "Intervene" — Manager takes over the dispute (replaces Specialist as decision-maker)
     - "Coach the Specialist" — log feedback for the Specialist on this case
     - "Override decision" — change the Specialist's decision (rare, with audit)
     - "Escalate to Admin" — escalates beyond Manager authority

4. **Patterns dashboard**
   - Disputes per Specialist (which Specialists handle the most)
   - Disputes per role category
   - Average resolution time per Specialist
   - Disputes exceeding SLA per Specialist
   - Disputes Manager intervened in

**Component reuse:**
- Use existing Disputes page layout and styling
- Add Manager intervention action buttons

---

#### Page 5 — Pool Coordination

**URL:** `#pool-coordination`

**Purpose:** Cross-category pool health monitoring and coordination.

**Layout:**

1. **Header**
   - "Pool Coordination"
   - Date range selector

2. **Cross-category pool overview**
   - Grid showing all role categories (the 10 role families)
   - Per category card:
     - Category name
     - Owning Specialist (with photo)
     - Current pool size
     - Threshold (e.g., 15)
     - Status indicator (Strong / Stable / Depleted) with colored dot
     - Trend (small chart, last 30 days)
     - Active job postings count
     - Open shortlist requests count
     - Actions: View detailed health, Coordinate sprint, Reassign coverage

3. **Coordination opportunities panel**
   - Smart suggestions:
     - "Bookkeeper category is overflowing (45 candidates) while Customer Support is critically low (8). Consider redirecting next sprint to Customer Support."
     - "Two Specialists in adjacent categories are both underutilized. Consider cross-training or rebalancing."
     - "Skill demand: clients are asking for [Skill] but it's spread across 3 categories. Consider promoting Specialists to specialize."

4. **Active sprints panel**
   - Current recruitment sprints across team
   - Goals, progress, time remaining
   - Quick links to sprint coordination

**Component reuse:**
- Use existing card patterns for the category overview
- Use existing chart styles for trends

---

#### Page 6 — Recruitment Sprints

**URL:** `#recruitment-sprints`

**Purpose:** Manager coordinates active recruitment sprints across Specialists.

**Layout:**

1. **Header**
   - "Recruitment Sprint Coordination"
   - Active sprints count
   - Manager's overall sprint goal

2. **Active sprints list**
   - Per sprint card:
     - Specialist running the sprint
     - Category being filled
     - Goal: target candidates needed
     - Progress: candidates so far (visual progress bar)
     - Time remaining
     - Strategies in use (LinkedIn, FB groups, paid ads, referrals)
     - Status: On track / Behind / Ahead

3. **Cross-sprint coordination panel**
   - Channels overlap warnings
   - Geographic overlap warnings
   - Budget allocation across sprints
   - Resource sharing opportunities

4. **Sprint history**
   - Past sprints with outcomes
   - What worked, what didn't
   - Lessons logged

5. **"Start new sprint" CTA**
   - Opens new-sprint creation flow (target category, goal, timeline, channels)

---

#### Page 7 — Team Reports

**URL:** `#team-reports`

**Purpose:** Team-wide analytics and reporting.

**Layout:**

1. **Header**
   - "Team Reports & Analytics"
   - Date range selector (today / week / month / quarter / year / custom)
   - "Export" button
   - "Schedule report to Admin" CTA

2. **Team performance overview section**
   - Total reviews completed (with target)
   - Total disputes resolved (with SLA hit rate)
   - Total candidates approved
   - Total clients hired into team's categories
   - Daily activity completion rate
   - All with sparkline trends

3. **Per-Specialist comparison section**
   - Bar charts:
     - Reviews completed per Specialist
     - Dispute resolution time per Specialist
     - Sourcing volume per Specialist
   - Heatmap: daily activity submission rate per Specialist over the period
   - Anonymous to other Specialists (Manager sees all)

4. **Pool health analytics**
   - Pool size trends per category
   - Pool depletion incidents
   - Recovery time per depletion event
   - Sprint effectiveness per category

5. **Match success analytics**
   - Auto-shortlist completion rate
   - Average match score across the platform
   - Time from job post to first match
   - Specialist intervention rate

6. **Hire success analytics**
   - Hires per Specialist
   - Hires per category
   - Time-to-hire metrics
   - Client retention (repeat hires)

7. **Custom report builder**
   - Drag-and-drop interface (or simpler form-based)
   - Select data sources, filter, group, choose visualization
   - Save as template
   - Schedule (daily, weekly, monthly auto-generation to Admin)
   - Share with Admin

**Component reuse:**
- Use existing chart patterns from the Specialist Performance page (extend with more chart types if needed)
- Use existing card patterns

---

#### Page 8 — Manager Daily Activity

**URL:** `#manager-daily-activity`

**Purpose:** Manager submits their own daily activity log, separate from their Specialist daily activity.

**Layout:**

1. **Header**
   - "Manager Daily Activity for [Date]"
   - Submitted status: Submitted ✓ / Not yet submitted
   - Submit by [end of day]

2. **Activity submission form** (separate from the Specialist daily activity)

   **Section 1: Specialists I supported today**
   - Multi-select dropdown of Specialists
   - For each: brief note on the support given

   **Section 2: 1:1 meetings held today**
   - Per meeting: Specialist, duration, topics discussed (brief), action items

   **Section 3: Disputes I intervened in**
   - Auto-calculated from dispute records (read-only display)

   **Section 4: Performance reviews / coaching delivered**
   - Per item: Specialist, type (review, coaching, feedback), brief summary

   **Section 5: Strategic decisions made**
   - Free text

   **Section 6: Cross-team coordination performed**
   - Free text

   **Section 7: Reports submitted to Admin**
   - Auto-calculated (read-only display)

   **Section 8: Notes**
   - Today's wins for the team
   - Today's blockers across the team
   - Tomorrow's priorities

3. **Submit button**
   - Logs submission with timestamp
   - Locked after submission (admin override to edit)

4. **Past submissions**
   - Calendar view of past Manager daily activity submissions

**Important:** This is the Manager's submission to the Admin. It's separate from and in addition to the Manager's personal Specialist daily activity (which they submit on the existing Daily Activity page in Specialist Mode).

---

### 7. Updated existing pages (minor changes for Manager Mode)

Some existing pages need small additions when the Manager is in Manager Mode, but the core functionality stays the same.

**Existing page updates:**

**Dashboard:** The toggle is added at the top. Content swaps based on mode. Already covered in Section 1 and 5.

**No changes needed to:**
- Review queue (Manager handles their own reviews here, same as any Specialist)
- Re-cert queue (same)
- My candidates (Manager's personal assigned candidates)
- Candidate chat (same)
- My clients (Manager's personal assigned clients in their category)
- Client chat (same)
- Sourcing (Manager's personal sourcing for their category)
- Pool health (shows their own category's pool — for cross-category, they use Pool Coordination)
- Disputes (Manager's personal disputes — for team-wide, they use Team Disputes)
- Daily Activity (Manager's personal Specialist daily activity — separate from Manager daily activity)
- Performance (Manager's personal Specialist performance — separate from team performance)
- Reviews & Approvals (Manager's personal decision history)
- Settings (Manager's account settings)
- Help & resources (with additional Manager-specific resources added — see below)

**Help & resources page update:**
Add a new section "Manager Resources" that's visible only when the Manager is in Manager Mode. Includes:
- Manager handbook
- Performance review templates
- 1:1 conversation guides
- Coaching frameworks
- Sprint coordination playbooks
- Daily activity audit guide

---

### 8. Smart routing when toggling

When the Manager toggles between modes, the following routing rules apply:

**Toggling from Specialist Mode → Manager Mode:**
- If on the Dashboard → dashboard content swaps to Manager dashboard
- If on any other page → page stays the same (e.g., if on Review Queue, they stay on Review Queue, sidebar updates to show TEAM MANAGEMENT section)

**Toggling from Manager Mode → Specialist Mode:**
- If on the Dashboard → dashboard content swaps to Specialist dashboard
- If on a Manager-only page (My Team, Daily Activity Audit, etc.) → redirect to Dashboard (Specialist Mode) since the page is no longer accessible
- If on a shared page (Review Queue, My Candidates, etc.) → page stays the same, sidebar updates to hide TEAM MANAGEMENT section

**Clicking a notification:**
- Smart routing automatically switches mode if needed (per Section 3)

**Clicking a message:**
- Smart routing applies (per Section 4) — if it's a Specialist-to-Specialist message and the Manager is in Specialist Mode, opening it doesn't force a mode switch (Specialist Mode chats work fine), but if the Manager wants to access team-wide chat features, they should be in Manager Mode

---

### 9. Real-time update behaviors

The following surfaces auto-update without page refresh, similar to existing real-time patterns in the Specialist interface:

- Dashboard urgent items (both modes — new alerts appear as they happen)
- Team activity feed (Manager mode)
- Daily activity submission status as Specialists submit
- Disputes status changes
- Pool health indicators
- Notifications dropdown
- Messages dropdown

When new items appear, use subtle animations (fade-in, slight slide) consistent with the existing interface patterns.

---

### 10. Mobile considerations

The existing Specialist interface is desktop-first with some mobile responsiveness. The Manager additions should follow the same approach:

- **Desktop:** Full toggle visible, full sidebar with TEAM MANAGEMENT section, all Manager pages fully featured
- **Tablet:** Same as desktop with adjusted sizing
- **Mobile:** Toggle compresses to a smaller pill or icon; sidebar items in TEAM MANAGEMENT section accessible via the hamburger menu; Manager pages have simplified mobile views

The Manager-specific pages (My Team, Daily Activity Audit, etc.) prioritize the most important information on mobile — full feature parity isn't required on mobile since Managers typically work at desks.

---

### 11. Accessibility

All new Manager additions must maintain WCAG 2.1 AA compliance:

- Toggle is keyboard accessible (Tab + Arrow keys to switch)
- Screen reader announces mode changes ("Switched to Manager Mode")
- All new sidebar items are keyboard navigable
- All new pages support keyboard navigation
- Color contrast meets standards
- Notification and message context tags don't rely on color alone — include text labels or icons
- Focus management when toggling modes (focus stays on a sensible element)

---

## Implementation summary

**What to add to the existing HTML:**

1. **Toggle component** at the top of the dashboard view (`#view-dashboard`)
2. **New sidebar section** "TEAM MANAGEMENT" with 8 new items, visible only in Manager Mode
3. **Manager dashboard content** — alternative content for `#view-dashboard` that swaps in when Manager Mode is active
4. **8 new view sections** for Manager-only pages:
   - `#view-my-team`
   - `#view-specialist-detail` (templated, opens per specialist)
   - `#view-daily-audit`
   - `#view-team-disputes`
   - `#view-pool-coordination`
   - `#view-recruitment-sprints`
   - `#view-team-reports`
   - `#view-manager-daily-activity`
5. **Updated notification cards** to include Specialist/Manager context tags
6. **Updated message conversation rows** to include Candidate/Client/Specialist type indicators
7. **New Specialist-to-Specialist chat features** (1:1 scheduling, coaching notes, performance link)
8. **Help & resources page** update with Manager Resources section
9. **JavaScript** to handle:
   - Mode toggling and persistence
   - Sidebar item visibility (showing/hiding TEAM MANAGEMENT section)
   - Smart notification/message routing
   - URL hash updates for mode state
   - Real-time updates for team-wide data

**What NOT to change:**

- Any existing Specialist Mode page content
- Any existing component styling
- Any existing JavaScript behavior for Specialist Mode pages
- The top bar layout (logo, search, bell, envelope, avatar)
- The sign-in flow
- The forgot password flow
- Settings page
- Any visual design tokens (colors, typography, spacing)

**Design principles for the additions:**

- Reuse existing patterns wherever possible (cards, badges, buttons, tables, charts, modals)
- Match existing visual treatment (same colors, fonts, spacing, border-radius, shadows)
- Use existing CSS classes where applicable to maintain consistency
- Keep new components feeling like a natural extension of the Specialist interface, not a separate product
- Manager-only items use the same visual language as existing items (no special "Manager" branding or color treatment except where context tags are needed)

---

## Final deliverables

When complete, the HTML file should:

1. Open to the same Specialist sign-in page as before
2. After login, route to the Dashboard
3. Display the toggle prominently with Manager View active by default (since this user is the Manager)
4. Show Manager dashboard content with team-wide urgent items, snapshot, and active items
5. Display the expanded sidebar with TEAM MANAGEMENT section visible
6. Allow toggling to Specialist View, which swaps dashboard content to the original Specialist dashboard and hides the TEAM MANAGEMENT section
7. Support navigation to all 8 new Manager pages
8. Maintain all existing Specialist functionality unchanged
9. Display notifications and messages with appropriate context tags
10. Support smart routing on notification/message clicks

---

That's the complete scope. The Manager interface is the Talent Specialist interface plus a targeted Management layer — same shell, same patterns, additive capabilities. Build this on top of the existing HTML by adding the toggle, the new sidebar section, the alternate dashboard content, and the 8 new pages.
