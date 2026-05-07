/**
 * Mock candidate chat conversations for `/specialist/candidate-chat`.
 *
 * 10 conversations covering all 10 ManagedStatus states. Cross-session
 * IDs: every conversation references a `cand-*` id from
 * `my-candidates.ts` — Session 3 mocks are NOT modified.
 *
 * Coverage requirements (per Session 4 directives):
 *   - 10 conversations (matches HTML's "Messages 10" header)
 *   - All 10 ManagedStatus states represented
 *   - 4–8 messages each (most), with mix of incoming/outgoing/system
 *   - ≥2 conversations include AI suggestions
 *   - ≥1 conversation includes an attachment placeholder
 *   - ≥2 conversations include `internal-note` messages (visual variant)
 */

import type {
  CandidateChatThread,
  ChatMessage,
  ChatTemplate,
} from "./chat-types";

/* ============================================================
   Quick-templates list (per HTML's cc-templates popover)
   ============================================================ */

export const CANDIDATE_CHAT_TEMPLATES: ReadonlyArray<ChatTemplate> = [
  {
    key: "schedule",
    title: "Schedule a check-in",
    preview:
      "Hey [name], do you have 15 minutes this week for a quick sync?",
    body: "Hey, do you have 15 minutes this week for a quick sync? I want to make sure everything's smooth on the engagement front.",
  },
  {
    key: "match",
    title: "New client match available",
    preview:
      "A new brief came in that fits your profile well — wanted to flag it before it goes wide.",
    body: "A new brief just came in that fits your profile really well. Wanted to flag it to you before it goes wide tomorrow — let me know if you'd like the details.",
  },
  {
    key: "recert",
    title: "Re-cert reminder",
    preview:
      "Friendly reminder — your cert renews on [date]. Anything you'd like to flag before then?",
    body: "Friendly reminder — your cert is up for renewal soon. Anything you'd like to flag before we kick off the re-cert process?",
  },
  {
    key: "kudos",
    title: "Performance kudos",
    preview:
      "Great client feedback came in this week — wanted to make sure you saw it.",
    body: "Great client feedback came in this week — wanted to make sure you saw it. Keep it up.",
  },
];

/* ============================================================
   Helpers
   ============================================================ */

function msg(
  id: string,
  kind: ChatMessage["kind"],
  body: string,
  timestamp: string,
  extra?: Partial<ChatMessage>,
): ChatMessage {
  return { id, kind, body, timestamp, ...extra };
}

/* ============================================================
   The 10 candidate conversations
   ============================================================ */

/* ---------- 1. Marie Okonkwo — active (just-approved welcome) ---------- */

const marie: CandidateChatThread = {
  kind: "candidate",
  id: "cand-marie-okonkwo",
  candidateId: "cand-marie-okonkwo",
  title: "Marie Okonkwo",
  initials: "M",
  countryFlag: "🇳🇬",
  preview: "Welcome to Atlas, Marie! Here's what to expect this week…",
  timestamp: "2h",
  unread: 0,
  status: "online",
  tags: ["all"],
  metaLine: [
    { kind: "tier", label: "★ VETTED", tone: "default" },
    { kind: "text", value: "LAGOS" },
    { kind: "text", value: "JUST APPROVED · 2H AGO" },
    { kind: "online", value: "ONLINE" },
  ],
  contextStrip: [
    { label: "Active engagements", value: "—" },
    { label: "Hours this week", value: "0h" },
    { label: "Rating", value: "—" },
    { label: "Cert status", value: "Active · 12 mo cycle" },
  ],
  conversationTags: ["support"],
  messages: [
    msg(
      "m-marie-1",
      "system",
      "Marie was approved · Vetted tier · assigned to you.",
      "2h ago",
    ),
    msg(
      "m-marie-2",
      "outgoing",
      "Welcome to Atlas, Marie! I'm Miguel, your Talent Specialist. A few quick things:\n\n1. Your profile goes live in your category within the hour.\n2. Expect first-match suggestions in 1–3 days.\n3. Reply here anytime — I read everything within 4h.",
      "2h ago",
      { readReceipt: "read" },
    ),
    msg(
      "m-marie-3",
      "incoming",
      "Thank you, Miguel! Looking forward to it. Where should I direct candidate-side questions vs client-side ones?",
      "1h ago",
    ),
  ],
};

/* ---------- 2. Anand Patel — active-contract (multi-engagement balance) ---------- */

const anand: CandidateChatThread = {
  kind: "candidate",
  id: "cand-anand-patel",
  candidateId: "cand-anand-patel",
  title: "Anand Patel",
  initials: "A",
  countryFlag: "🇮🇳",
  avatarGradient: "caramel",
  preview: "Bandwidth confirmed — go ahead with the 4th. I'll formalize the…",
  timestamp: "12m",
  unread: 2,
  status: "online",
  tags: ["all", "unread"],
  flagged: true,
  metaLine: [
    { kind: "tier", label: "★ VETTED", tone: "default" },
    { kind: "text", value: "MUMBAI" },
    { kind: "text", value: "2 ACTIVE ENGAGEMENTS" },
    { kind: "online", value: "ONLINE" },
  ],
  contextStrip: [
    { label: "Active engagements", value: "Acme Co · TechFlow Inc" },
    { label: "Hours this week", value: "38h" },
    { label: "Rating", value: "★ 4.8", tone: "success" },
    { label: "Cert status", value: "Re-cert in 14 days" },
  ],
  conversationTags: ["support", "performance"],
  messages: [
    msg(
      "m-anand-1",
      "outgoing",
      "Anand — Sarah at Acme is asking if you can take on a 4th hire (eng ops mentor for a new EM joining their team). I want to make sure you have bandwidth before I say yes.",
      "Yesterday",
      { readReceipt: "read" },
    ),
    msg(
      "m-anand-2",
      "incoming",
      "Hi Miguel. Right now I'm at 38h/week between Acme and TechFlow. A 4th could work if it's <10h/week and async-only.",
      "Yesterday",
    ),
    msg(
      "m-anand-3",
      "outgoing",
      "Got it. The new role is 8–10h/week, weekly sync optional. Should I confirm with Sarah?",
      "Yesterday",
      { readReceipt: "read" },
    ),
    msg(
      "m-anand-4",
      "incoming",
      "Yes — but two notes:\n\n• I want it explicitly in scope that I'll cap at 10h. The pattern with Acme is they creep.\n• Could you also flag in-app that I'm at capacity after this? Don't want a 5th brief landing.",
      "Yesterday",
    ),
    msg(
      "m-anand-5",
      "internal-note",
      "Capacity flag set in admin — Anand at hard cap of 4 active. New brief routing will skip him until one closes.",
      "Yesterday",
    ),
    msg(
      "m-anand-6",
      "outgoing",
      "Both done. Cap is set internally; Sarah will get a sow with the 10h ceiling baked in.",
      "Yesterday",
      { readReceipt: "read" },
    ),
    msg(
      "m-anand-7",
      "incoming",
      "Bandwidth confirmed — go ahead with the 4th. I'll formalize the cap variance with admin and send Sarah at Acme a heads-up.",
      "12m ago",
    ),
  ],
  aiSuggestion: {
    text: "Sounds good Anand — I'll loop Sarah in this afternoon and have the SOW back to you by EOD with the 10h cap explicitly. Ping me if anything else comes up.",
    rationale: "Confirms cap, sets timeline, leaves door open.",
  },
};

/* ---------- 3. Marcus Bauer — multiple-contracts (BAU + attachment) ---------- */

const marcus: CandidateChatThread = {
  kind: "candidate",
  id: "cand-marcus-bauer",
  candidateId: "cand-marcus-bauer",
  title: "Marcus Bauer",
  initials: "M",
  countryFlag: "🇩🇪",
  avatarGradient: "purple",
  preview: "Q1 ops summary attached. Three engagements all green.",
  timestamp: "Mon",
  unread: 0,
  status: "away",
  tags: ["all"],
  metaLine: [
    { kind: "tier", label: "★ ELITE", tone: "elite" },
    { kind: "text", value: "BERLIN" },
    { kind: "text", value: "3 ACTIVE · 22 MO IN POOL" },
    { kind: "online", value: "AWAY" },
  ],
  contextStrip: [
    {
      label: "Active engagements",
      value: "Berlin SaaS · Munich Health · Helsinki Group",
    },
    { label: "Hours this week", value: "34h" },
    { label: "Rating", value: "★ 4.7", tone: "success" },
    { label: "Cert status", value: "Re-cert in 28 days" },
  ],
  conversationTags: ["support"],
  messages: [
    msg(
      "m-marcus-1",
      "outgoing",
      "Marcus, can you share your Q1 hours summary across the three engagements? Need it for the operations review on Friday.",
      "Mon 9:14 AM",
      { readReceipt: "read" },
    ),
    msg(
      "m-marcus-2",
      "incoming",
      "Attaching now. All three green; Helsinki extended through end of year.",
      "Mon 11:02 AM",
      {
        attachment: {
          id: "att-marcus-1",
          filename: "marcus_q1_2026_ops_summary.pdf",
          size: "412 KB",
          kind: "pdf",
        },
      },
    ),
    msg(
      "m-marcus-3",
      "outgoing",
      "Perfect — thanks. I'll review and circle back if there's anything to flag.",
      "Mon 11:14 AM",
      { readReceipt: "read" },
    ),
    msg(
      "m-marcus-4",
      "incoming",
      "Q1 ops summary attached. Three engagements all green.",
      "Mon 11:14 AM",
    ),
  ],
};

/* ---------- 4. Carmen López — available (welcome no-reply yet) ---------- */

const carmen: CandidateChatThread = {
  kind: "candidate",
  id: "cand-carmen-lopez",
  candidateId: "cand-carmen-lopez",
  title: "Carmen López",
  initials: "C",
  countryFlag: "🇦🇷",
  avatarGradient: "navy",
  preview: "Welcome to Atlas, Carmen! Three references all 5★ — that's…",
  timestamp: "1d",
  unread: 0,
  status: "offline",
  tags: ["all"],
  metaLine: [
    { kind: "tier", label: "★ VETTED", tone: "default" },
    { kind: "text", value: "BUENOS AIRES" },
    { kind: "text", value: "AVAILABLE · 1 DAY" },
    { kind: "online", value: "OFFLINE" },
  ],
  contextStrip: [
    { label: "Active engagements", value: "—" },
    { label: "Hours this week", value: "0h" },
    { label: "Rating", value: "—" },
    { label: "Cert status", value: "Active · 12 mo cycle" },
  ],
  conversationTags: ["support"],
  messages: [
    msg(
      "m-carmen-1",
      "system",
      "Carmen was approved · Vetted tier on day one · all 3 references confirmed strong.",
      "1d ago",
    ),
    msg(
      "m-carmen-2",
      "outgoing",
      "Welcome to Atlas, Carmen! Three 5★ references on day one is the strongest entry I've seen this quarter. I'll start matching you against incoming briefs in your category — expect first-match suggestions in 1–3 days.",
      "1d ago",
      { readReceipt: "delivered" },
    ),
  ],
};

/* ---------- 5. Carlos Mendoza — awaiting-client (matching outreach) ---------- */

const carlos: CandidateChatThread = {
  kind: "candidate",
  id: "cand-carlos-mendoza",
  candidateId: "cand-carlos-mendoza",
  title: "Carlos Mendoza",
  initials: "C",
  countryFlag: "🇨🇴",
  avatarGradient: "warm",
  preview: "Two briefs in flight that fit your profile — sharing both…",
  timestamp: "3d",
  unread: 0,
  status: "offline",
  tags: ["all"],
  metaLine: [
    { kind: "tier", label: "★ VETTED", tone: "default" },
    { kind: "text", value: "MEDELLÍN" },
    { kind: "text", value: "AWAITING FIRST MATCH · 1 WK" },
    { kind: "online", value: "OFFLINE" },
  ],
  contextStrip: [
    { label: "Active engagements", value: "—" },
    { label: "Hours this week", value: "0h" },
    { label: "Rating", value: "—" },
    { label: "Cert status", value: "Active · just minted" },
  ],
  conversationTags: ["sourcing"],
  messages: [
    msg(
      "m-carlos-1",
      "outgoing",
      "Carlos — wanted to flag two briefs we're working that fit your profile well: a fintech ops role (Mexico-City-based, async-friendly) and a research admin role at a Bengaluru biotech. I'll send shortlists this week. Anything you'd add to your profile in the meantime?",
      "3d ago",
      { readReceipt: "read" },
    ),
    msg(
      "m-carlos-2",
      "incoming",
      "Both sound great. The fintech one especially — that's right in my sweet spot. Should I update my hourly to reflect bilingual? Currently $15.",
      "3d ago",
    ),
    msg(
      "m-carlos-3",
      "outgoing",
      "Hold off on the bump — let's see what the first engagement does to your rating/feedback first. Atlas Vetted at $15 is competitive in your bracket. We can revisit at 90 days.",
      "3d ago",
      { readReceipt: "read" },
    ),
    msg(
      "m-carlos-4",
      "incoming",
      "Makes sense. Standing by.",
      "3d ago",
    ),
  ],
};

/* ---------- 6. Jomari Dela Cruz — vacation (out of office) ---------- */

const jomari: CandidateChatThread = {
  kind: "candidate",
  id: "cand-jomari-dc",
  candidateId: "cand-jomari-dc",
  title: "Jomari Dela Cruz",
  initials: "J",
  countryFlag: "🇵🇭",
  avatarGradient: "olive",
  preview: "Out of office until May 15 — will reply on return.",
  timestamp: "1w",
  unread: 0,
  status: "offline",
  tags: ["all"],
  metaLine: [
    { kind: "tier", label: "★ VETTED", tone: "default" },
    { kind: "text", value: "MANILA" },
    { kind: "text", value: "ON VACATION · BACK MAY 15" },
    { kind: "online", value: "OFFLINE" },
  ],
  contextStrip: [
    { label: "Active engagements", value: "Vertex Health (paused)" },
    { label: "Hours this week", value: "—" },
    { label: "Rating", value: "★ 4.9", tone: "success" },
    { label: "Cert status", value: "Active · in 145 d" },
  ],
  conversationTags: ["vacation"],
  messages: [
    msg(
      "m-jomari-1",
      "incoming",
      "Heading on vacation Apr 30 → May 15. Vertex Health knows; I've left them a complete handover doc. Will be back online Monday May 18.",
      "1 week ago",
    ),
    msg(
      "m-jomari-2",
      "outgoing",
      "Acknowledged. Vacation status flipped in admin. Enjoy the break — we'll route any inbound briefs to your queue for return.",
      "1 week ago",
      { readReceipt: "read" },
    ),
    msg(
      "m-jomari-3",
      "system",
      "Jomari set status to 'On vacation · back May 15'.",
      "1 week ago",
    ),
    msg(
      "m-jomari-4",
      "incoming",
      "Out of office until May 15 — will reply on return.",
      "1 week ago",
    ),
  ],
};

/* ---------- 7. Aaliyah Koné — pending-action (dispute discussion) ---------- */

const aaliyah: CandidateChatThread = {
  kind: "candidate",
  id: "cand-aaliyah-kone",
  candidateId: "cand-aaliyah-kone",
  title: "Aaliyah Koné",
  initials: "A",
  countryFlag: "🇨🇮",
  avatarGradient: "olive",
  preview: "I have the timesheet PDFs ready — can I send them now?",
  timestamp: "5h",
  unread: 1,
  status: "online",
  tags: ["all", "unread", "flagged"],
  flagged: true,
  metaLine: [
    { kind: "tier", label: "★ VETTED", tone: "default" },
    { kind: "text", value: "ABIDJAN" },
    { kind: "text", value: "DISPUTE · TIMESHEET REVIEW" },
    { kind: "online", value: "ONLINE" },
  ],
  contextStrip: [
    { label: "Active engagements", value: "Sahara Logistics" },
    { label: "Hours this week", value: "12h" },
    { label: "Rating", value: "★ 4.1", tone: "amber" },
    { label: "Cert status", value: "Re-cert in 5 days · ACTION", tone: "danger" },
  ],
  conversationTags: ["dispute", "support"],
  messages: [
    msg(
      "m-aaliyah-1",
      "incoming",
      "Hi Miguel, I saw the dispute notification from Ferry Logistics. I can document my hours — what's the timeline?",
      "8h ago",
    ),
    msg(
      "m-aaliyah-2",
      "outgoing",
      "Hi Aaliyah. The dispute window is 72h from open (so closing ~Friday 6pm UTC). What I need from you:\n\n1. Timesheet PDFs for the contested weeks (Apr 7–14, Apr 14–21).\n2. Any communications with Ferry about scope changes.\n3. A short narrative — just your account in your own words.\n\nDon't reply to Ferry directly while the dispute is open — route everything through me.",
      "8h ago",
      { readReceipt: "read" },
    ),
    msg(
      "m-aaliyah-3",
      "internal-note",
      "Aaliyah's first dispute. Per Ferry's framing, the disagreement is hours billed for context-switching between two parallel projects. Aaliyah's case looks defensible — she logged everything in Toggl.",
      "8h ago",
    ),
    msg(
      "m-aaliyah-4",
      "incoming",
      "Understood. I have everything in Toggl + a Google Doc with my notes from the start. Should I export to PDF?",
      "6h ago",
    ),
    msg(
      "m-aaliyah-5",
      "outgoing",
      "PDF for the timesheets, share the Doc link directly. Cut nothing — Atlas dispute review reads everything.",
      "6h ago",
      { readReceipt: "read" },
    ),
    msg(
      "m-aaliyah-6",
      "incoming",
      "I have the timesheet PDFs ready — can I send them now?",
      "5h ago",
    ),
  ],
  aiSuggestion: {
    text: "Send them through. I'll get them into the dispute review queue tonight and have an initial read by tomorrow morning. Hold tight.",
    rationale: "Action + timeline + reassurance. Match the calm tone.",
  },
};

/* ---------- 8. Mei Chen — paused (performance review with internal note) ---------- */

const mei: CandidateChatThread = {
  kind: "candidate",
  id: "cand-mei-chen",
  candidateId: "cand-mei-chen",
  title: "Mei Chen",
  initials: "M",
  countryFlag: "🇨🇳",
  avatarGradient: "ice",
  preview: "I understand. Walk me through what changed in the last 60 days?",
  timestamp: "3d",
  unread: 0,
  status: "offline",
  tags: ["all", "flagged"],
  flagged: true,
  metaLine: [
    { kind: "tier", label: "STANDARD", tone: "default" },
    { kind: "text", value: "SHENZHEN" },
    { kind: "text", value: "PAUSED · PERF REVIEW" },
    { kind: "online", value: "OFFLINE" },
  ],
  contextStrip: [
    { label: "Active engagements", value: "—" },
    { label: "Hours this week", value: "—" },
    { label: "Rating", value: "★ 4.0", tone: "amber" },
    { label: "Cert status", value: "Active · in 95 d" },
  ],
  conversationTags: ["performance", "support"],
  messages: [
    msg(
      "m-mei-1",
      "outgoing",
      "Mei — wanted to talk about your account before anyone else does. Your rating dropped from 4.5 → 4.0 over the last 60 days. I'm pausing new briefs while we figure out what's going on.",
      "3 days ago",
      { readReceipt: "read" },
    ),
    msg(
      "m-mei-2",
      "internal-note",
      "Mei's last 3 reviews were Lumio (4.5), Northwind (4.0), TechFlow (3.5). Pattern: response-time complaints. Going to ask before assuming. Pause is precautionary, not disciplinary.",
      "3 days ago",
    ),
    msg(
      "m-mei-3",
      "incoming",
      "I appreciate you flagging it directly. Can you tell me which engagements specifically?",
      "3 days ago",
    ),
    msg(
      "m-mei-4",
      "outgoing",
      "Northwind and TechFlow both noted 'response time slipping' in their feedback. Lumio still 4.5. I want to understand what changed — is something going on personally, or is it the work?",
      "3 days ago",
      { readReceipt: "read" },
    ),
    msg(
      "m-mei-5",
      "incoming",
      "I understand. Walk me through what changed in the last 60 days?",
      "3 days ago",
    ),
  ],
};

/* ---------- 9. Tomás Silva-Mendes — off-boarded (archived thread) ---------- */

const tomas: CandidateChatThread = {
  kind: "candidate",
  id: "cand-tomas-silva",
  candidateId: "cand-tomas-silva",
  title: "Tomás Silva-Mendes",
  initials: "T",
  countryFlag: "🇵🇹",
  avatarGradient: "purple",
  preview: "Thank you for the time, Miguel. Wishing the platform well.",
  timestamp: "6w",
  unread: 0,
  status: "offline",
  tags: ["all"],
  metaLine: [
    { kind: "tier", label: "OFF-BOARDED", tone: "default" },
    { kind: "text", value: "LISBON" },
    { kind: "text", value: "OFF-BOARDED 6W AGO" },
    { kind: "online", value: "OFFLINE" },
  ],
  contextStrip: [
    { label: "Active engagements", value: "—" },
    { label: "Hours this week", value: "—" },
    { label: "Rating", value: "★ 3.6", tone: "amber" },
    { label: "Cert status", value: "Inactive" },
  ],
  conversationTags: ["support"],
  messages: [
    msg(
      "m-tomas-1",
      "outgoing",
      "Tomás — after the second dispute closing, I've made the call to off-board your account from the active pool. You'll keep profile read access; reapply window opens in 12 months.",
      "6 weeks ago",
      { readReceipt: "read" },
    ),
    msg(
      "m-tomas-2",
      "incoming",
      "Thank you for the directness. I disagree with how the second dispute was framed but understand your decision.",
      "6 weeks ago",
    ),
    msg(
      "m-tomas-3",
      "incoming",
      "Thank you for the time, Miguel. Wishing the platform well.",
      "6 weeks ago",
    ),
    msg(
      "m-tomas-4",
      "system",
      "Conversation archived — Tomás is off-boarded from active pool.",
      "6 weeks ago",
    ),
  ],
};

/* ---------- 10. Sofia Reyes — in-dispute (dispute thread + internal note) ---------- */

const sofia: CandidateChatThread = {
  kind: "candidate",
  id: "cand-sofia-reyes",
  candidateId: "cand-sofia-reyes",
  title: "Sofia Reyes",
  initials: "S",
  countryFlag: "🇲🇽",
  avatarGradient: "lime",
  preview: "Quill's claim is that I billed for prep that wasn't requested. Here's the…",
  timestamp: "6h",
  unread: 3,
  status: "online",
  tags: ["all", "unread", "flagged"],
  flagged: true,
  metaLine: [
    { kind: "tier", label: "★ VETTED", tone: "default" },
    { kind: "text", value: "MEXICO CITY" },
    { kind: "text", value: "OPEN DISPUTE · QUILL & CO" },
    { kind: "online", value: "ONLINE" },
  ],
  contextStrip: [
    { label: "Active engagements", value: "Quill & Co (paused)" },
    { label: "Hours this week", value: "—" },
    { label: "Rating", value: "★ 4.5", tone: "success" },
    { label: "Cert status", value: "Active · in 180 d" },
  ],
  conversationTags: ["dispute"],
  messages: [
    msg(
      "m-sofia-1",
      "system",
      "Payment-delay dispute opened by Sofia Reyes against Quill & Co.",
      "12h ago",
    ),
    msg(
      "m-sofia-2",
      "outgoing",
      "Sofia — I see the dispute is open. Walk me through the situation in your words. What's the disagreement?",
      "10h ago",
      { readReceipt: "read" },
    ),
    msg(
      "m-sofia-3",
      "incoming",
      "Quill paid for week 1 and week 2 on time. Week 3 invoice is 18 days overdue. Their CFO told me 'we're reviewing scope' — but my SOW is clear, I delivered everything in scope. I waited two weeks past the net-15 before opening this.",
      "9h ago",
    ),
    msg(
      "m-sofia-4",
      "internal-note",
      "Quill & Co's pattern from prior disputes (per dispute log) is they delay payment when they're not happy with output and use 'scope review' as cover. Sofia's deliverables look clean per the timesheet log.",
      "9h ago",
    ),
    msg(
      "m-sofia-5",
      "outgoing",
      "Got it. Don't engage with Quill directly while the dispute is open — Atlas dispute review handles it from here. Send me your timesheet for week 3 + the SOW + any messages with their CFO.",
      "8h ago",
      { readReceipt: "read" },
    ),
    msg(
      "m-sofia-6",
      "incoming",
      "Quill's claim is that I billed for prep that wasn't requested. Here's the SOW; the prep IS in scope.",
      "6h ago",
      {
        attachment: {
          id: "att-sofia-1",
          filename: "sofia_quill_sow_signed.pdf",
          size: "287 KB",
          kind: "pdf",
        },
      },
    ),
  ],
  aiSuggestion: {
    text: "Confirmed — your SOW item 4 explicitly covers prep time at hourly rate. I'll attach this to the dispute review packet and you should hear from the dispute team within 48h. Hold tight.",
    rationale: "Validates her position + sets timeline + tells her to wait.",
  },
};

/* ============================================================
   Roster export
   ============================================================ */

export const candidateChatThreads: ReadonlyArray<CandidateChatThread> = [
  anand,
  aaliyah,
  sofia,
  marcus,
  mei,
  carlos,
  marie,
  carmen,
  jomari,
  tomas,
];

export const CANDIDATE_CHAT_DEFAULT_ID = anand.id;

/** Filter chip definitions for the candidate-chat conv-list rail. */
export const CANDIDATE_CHAT_FILTERS = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "flagged", label: "Flagged" },
] as const;

/** Header subtitle ("Messages 10"). */
export const CANDIDATE_CHAT_LIST_TITLE = "Messages";

/**
 * Lookup helper used by the candidate-chat page when resolving the
 * `?id=` query param. Returns `undefined` for unknown ids — the page
 * falls back to the rail's first row (no `notFound()` — the rail is
 * always present).
 */
export function getCandidateChatThread(
  id: string,
): CandidateChatThread | undefined {
  return candidateChatThreads.find((t) => t.id === id);
}
