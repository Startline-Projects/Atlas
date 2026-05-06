/**
 * Mock client chat conversations for `/specialist/client-chat`.
 *
 * 12 conversations — matches the HTML "Client messages 12" header and
 * the 12 managed clients in `my-clients.ts`. Cross-session IDs: every
 * conversation references a `client-*` id from Session 3 (no Session 3
 * data is modified).
 *
 * Coverage requirements (per Session 4 directives):
 *   - 12 conversations (matches HTML "Client messages 12")
 *   - 7 rich (4–8 messages, full meta + context strip + AI/internal)
 *     and 5 light (2–3 messages, lighter context)
 *   - All 4 client cohorts represented (active / onboarding / paused / at-risk)
 *   - ≥1 unread, ≥2 AI suggestions, ≥1 system message, ≥1 attachment
 *   - ≥1 conversation includes an `internal-note` message
 *   - Templates list: Quarterly check-in / Send shortlist / Rate
 *     adjustment / Contract renewal
 *   - Filters: All / Unread / With briefs (HTML differs from candidate
 *     side — "Flagged" is candidate-only; "With briefs" is client-only)
 */

import type {
  ChatMessage,
  ChatTemplate,
  ClientChatThread,
} from "./chat-types";

/* ============================================================
   Quick-templates list (per HTML's cc-templates popover)
   ============================================================ */

export const CLIENT_CHAT_TEMPLATES: ReadonlyArray<ChatTemplate> = [
  {
    key: "checkin",
    title: "Quarterly check-in",
    preview:
      "Hey [client], wanted to check in on how the engagement is tracking this quarter.",
    body: "Hey, wanted to check in on how the engagement is tracking this quarter. Anything you'd like to flag — performance, capacity, or upcoming hiring needs?",
  },
  {
    key: "shortlist",
    title: "Send shortlist",
    preview:
      "Shortlist attached for the [role] brief — three strong matches with profiles + rates.",
    body: "Shortlist attached for the brief — three strong matches with profiles, rates, and availability. Happy to set up intro calls with any or all of them.",
  },
  {
    key: "rates",
    title: "Rate adjustment",
    preview:
      "Quick note on rate adjustment for [name]'s engagement — let me know a good time to walk through it.",
    body: "Quick note on a rate adjustment proposal — driven by tenure + performance. Let me know a good time this week to walk through the numbers.",
  },
  {
    key: "renewal",
    title: "Contract renewal",
    preview:
      "Heads-up: [name]'s contract renews in 30 days. Want to lock in the same rate, or revisit?",
    body: "Heads-up — the contract is up for renewal in 30 days. Want to lock in the same rate and terms, or would you like to revisit?",
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
   The 12 client conversations
   ============================================================ */

/* ---------- 1. Acme Co — Top Client / VIP / strong (RICH, default) ---------- */

const acme: ClientChatThread = {
  kind: "client",
  id: "client-acme-co",
  clientId: "client-acme-co",
  logoVariant: 1,
  title: "Acme Co",
  initials: "AC",
  preview: "Sarah Lin: Anand crushed the Q2 ops report — sending kudos.",
  timestamp: "2h",
  unread: 2,
  status: "online",
  tags: ["unread", "briefs"],
  pinned: true,
  metaLine: [
    { kind: "tier", label: "★ TOP CLIENT", tone: "elite" },
    { kind: "text", value: "SAN FRANCISCO" },
    { kind: "text", value: "3 ACTIVE HIRES" },
    { kind: "online", value: "ONLINE" },
  ],
  contextStrip: [
    { label: "Active hires", value: "3", tone: "success" },
    { label: "Last brief", value: "2d ago" },
    { label: "Their rating", value: "4.9 ★", tone: "success" },
    { label: "Lifetime spend", value: "$84.2k", tone: "success" },
  ],
  messages: [
    msg(
      "m-acme-1",
      "incoming",
      "Hey — wanted to flag that Anand has been absolutely killing it on the Q2 ops report. Just wrapped 320 hours and our team lead asked about extending the engagement another quarter.",
      "Mon 9:14 AM",
    ),
    msg(
      "m-acme-2",
      "outgoing",
      "Love hearing this. Yes — happy to extend, and I'll route the renewal paperwork your way today. Same rate, or did you want to revisit?",
      "Mon 9:38 AM",
      { readReceipt: "read" },
    ),
    msg(
      "m-acme-3",
      "incoming",
      "Same rate is fine. Also — we'll likely need a second senior ops person within the next 60 days. Can you start a quiet search?",
      "Mon 10:02 AM",
    ),
    msg(
      "m-acme-4",
      "outgoing",
      "Yes — I'll start sourcing this week and have a shortlist of three for you by end of next week. Want me to flag the same calibre as Anand or open it to a wider net?",
      "Mon 10:18 AM",
      { readReceipt: "read" },
    ),
    msg(
      "m-acme-5",
      "incoming",
      "Same calibre. Anand sets the bar.",
      "Yesterday",
    ),
    msg(
      "m-acme-6",
      "incoming",
      "Sarah Lin: Anand crushed the Q2 ops report — sending kudos. Will leave a 5-star review later today.",
      "2h ago",
    ),
  ],
  aiSuggestion: {
    text: "Thanks — passing the kudos along to Anand. I've kicked off the senior ops search; I'll share the first three profiles by Friday and we can short-circuit straight to intro calls if any catch your eye.",
    rationale: "Acknowledges the kudos + moves the brief forward + offers a concrete timeline.",
  },
  conversationTags: ["renewal", "shortlist"],
};

/* ---------- 2. Quill & Co — open dispute (RICH, dispute) ---------- */

const quill: ClientChatThread = {
  kind: "client",
  id: "client-quill-co",
  clientId: "client-quill-co",
  logoVariant: 2,
  title: "Quill & Co",
  initials: "QC",
  preview: "I'd really like to resolve this without escalating further.",
  timestamp: "3h",
  unread: 1,
  status: "online",
  tags: ["unread"],
  flagged: true,
  metaLine: [
    { kind: "tier", label: "TRUSTED" },
    { kind: "text", value: "LONDON" },
    { kind: "text", value: "OPEN DISPUTE" },
    { kind: "online", value: "ONLINE" },
  ],
  contextStrip: [
    { label: "Active hires", value: "0" },
    { label: "Last brief", value: "21d ago" },
    { label: "Their rating", value: "4.2 ★", tone: "amber" },
    { label: "Open dispute", value: "Sofia Reyes · payment delay", tone: "danger" },
  ],
  messages: [
    msg(
      "m-quill-1",
      "incoming",
      "Want to flag — Sofia Reyes opened a payment-delay dispute against us yesterday. Surprised it came through this channel rather than direct.",
      "Yesterday",
    ),
    msg(
      "m-quill-2",
      "outgoing",
      "I saw it land. To confirm the timeline: she's claiming Aug 8 prep hours weren't paid out in the Aug 31 cycle. Can you walk me through your read on what happened?",
      "Yesterday",
      { readReceipt: "read" },
    ),
    msg(
      "m-quill-3",
      "incoming",
      "Our read: prep hours were never explicitly scoped. The brief said \"editorial coordination\" and we paid the coordinated hours in full. Prep was always implicit overhead.",
      "Yesterday",
    ),
    msg(
      "m-quill-4",
      "internal-note",
      "🔒 Internal note: Reviewed Quill's signed SOW — item 4 explicitly lists prep at $42/h. This dispute almost certainly resolves in Sofia's favor. Need to set Quill's expectations gently before the dispute team writes the determination.",
      "Yesterday",
    ),
    msg(
      "m-quill-5",
      "outgoing",
      "Understood. I want to be straight with you — I've reviewed the SOW you signed, and item 4 does carry prep at $42/h as a billable line. The dispute team will likely lean toward Sofia on the rate question. Best path forward is to settle the prep hours and we move on cleanly.",
      "8h ago",
      { readReceipt: "read" },
    ),
    msg(
      "m-quill-6",
      "incoming",
      "Frustrated to hear that, but appreciate the honesty. I'd really like to resolve this without escalating further. What do you need from us?",
      "3h ago",
    ),
  ],
  aiSuggestion: {
    text: "Thank you — I'll draft a settlement note this afternoon covering the unpaid prep hours and a small goodwill credit toward your next engagement. You'll see it before it goes to the dispute team.",
    rationale: "Lowers the temperature + commits to a concrete next step + keeps you in the loop.",
  },
  conversationTags: ["dispute"],
};

/* ---------- 3. Vertex Health — expansion ask (RICH, shortlist) ---------- */

const vertex: ClientChatThread = {
  kind: "client",
  id: "client-vertex-health",
  clientId: "client-vertex-health",
  logoVariant: 2,
  title: "Vertex Health",
  initials: "VH",
  preview: "Two more like Jomari, ideally same APAC overlap.",
  timestamp: "5h",
  unread: 0,
  status: "away",
  tags: ["briefs"],
  metaLine: [
    { kind: "tier", label: "TRUSTED" },
    { kind: "text", value: "CAMBRIDGE, MA" },
    { kind: "text", value: "EXPANDING" },
    { kind: "online", value: "AWAY" },
  ],
  contextStrip: [
    { label: "Active hires", value: "2", tone: "success" },
    { label: "Last brief", value: "1d ago" },
    { label: "Their rating", value: "4.8 ★", tone: "success" },
    { label: "Open brief", value: "Lab ops × 2", tone: "amber" },
  ],
  messages: [
    msg(
      "m-vertex-1",
      "incoming",
      "Jomari has been an absolute home run — clean documentation, fast turnaround, easy to work with. The team wants to scale that function.",
      "Yesterday",
    ),
    msg(
      "m-vertex-2",
      "incoming",
      "Two more like Jomari, ideally same APAC overlap so we have continuity across timezones.",
      "Yesterday",
    ),
    msg(
      "m-vertex-3",
      "outgoing",
      "Got it. Two lab ops admins, APAC overlap matching Jomari's hours. I'll have a shortlist of 4–5 by Wednesday with profiles + rates.",
      "Yesterday",
      { readReceipt: "read" },
    ),
    msg(
      "m-vertex-4",
      "incoming",
      "Wednesday works. Same rate band as Jomari?",
      "5h ago",
    ),
  ],
  aiSuggestion: {
    text: "Yes — I'll pin the shortlist to Jomari's rate band and flag any candidates whose comps are higher so you know up front. Sending Wednesday morning your time.",
    rationale: "Confirms scope + rate + locks the deliverable to a specific morning.",
  },
  conversationTags: ["shortlist", "strategy"],
};

/* ---------- 4. Northwind Solutions — at-risk / churn (RICH) ---------- */

const northwind: ClientChatThread = {
  kind: "client",
  id: "client-northwind",
  clientId: "client-northwind",
  logoVariant: 3,
  title: "Northwind Solutions",
  initials: "NS",
  preview: "Just been busy. Will circle back next week.",
  timestamp: "Yesterday",
  unread: 0,
  status: "offline",
  tags: ["all"],
  flagged: true,
  metaLine: [
    { kind: "tier", label: "TRUSTED" },
    { kind: "text", value: "CHICAGO" },
    { kind: "text", value: "CHURN RISK · 62D IDLE" },
    { kind: "online", value: "OFFLINE" },
  ],
  contextStrip: [
    { label: "Active hires", value: "2" },
    { label: "Last brief", value: "62d ago", tone: "danger" },
    { label: "Their rating", value: "4.4 ★", tone: "amber" },
    { label: "Risk", value: "Churn signal", tone: "danger" },
  ],
  messages: [
    msg(
      "m-nw-1",
      "outgoing",
      "Hey — noticed it's been a while since we've shared briefs. Anything I can help unblock, or has hiring slowed down for the year?",
      "Mon",
      { readReceipt: "read" },
    ),
    msg(
      "m-nw-2",
      "outgoing",
      "Quick nudge — happy to set up a quarterly check-in if useful.",
      "Wed",
      { readReceipt: "delivered" },
    ),
    msg(
      "m-nw-3",
      "incoming",
      "Just been busy. Will circle back next week.",
      "Yesterday",
    ),
    msg(
      "m-nw-4",
      "internal-note",
      "🔒 Internal note: 62-day silence from a previously-active client + a one-line dismissal is a clear churn signal. Flag for pool-health attention strip and consider a low-pressure 30-min retro offer rather than another check-in.",
      "Yesterday",
    ),
  ],
  aiSuggestion: {
    text: "Sounds good — I'll keep next week open. If it's helpful, happy to do a 30-min retro on what worked + what didn't on the last engagements; no agenda, just a sanity check on whether we're still the right fit.",
    rationale: "Reads the cooling temperature + offers a low-pressure retro to surface what's actually wrong.",
  },
  conversationTags: ["strategy", "renewal"],
};

/* ---------- 5. Helios Robotics — onboarding stalled (RICH, system) ---------- */

const helios: ClientChatThread = {
  kind: "client",
  id: "client-helios-robotics",
  clientId: "client-helios-robotics",
  logoVariant: 3,
  title: "Helios Robotics",
  initials: "HR",
  preview: "Will pull together the brief this week.",
  timestamp: "Mon",
  unread: 0,
  status: "offline",
  tags: ["all"],
  metaLine: [
    { kind: "tier", label: "NEW" },
    { kind: "text", value: "MUNICH" },
    { kind: "text", value: "ONBOARDING · STALLED" },
    { kind: "online", value: "OFFLINE" },
  ],
  contextStrip: [
    { label: "Active hires", value: "0" },
    { label: "First brief", value: "Pending", tone: "amber" },
    { label: "Account age", value: "5 days" },
    { label: "Status", value: "Onboarding", tone: "amber" },
  ],
  messages: [
    msg(
      "m-helios-1",
      "system",
      "Helios Robotics joined Atlas · welcome flow auto-sent.",
      "5 days ago",
    ),
    msg(
      "m-helios-2",
      "outgoing",
      "Welcome aboard! Quick intro — I'm your specialist for the engineering ops role family. When you're ready to share your first brief, I can have a shortlist over within ~48h.",
      "5 days ago",
      { readReceipt: "read" },
    ),
    msg(
      "m-helios-3",
      "outgoing",
      "Bumping this — happy to jump on a 15-min intro call if that's easier than writing a brief from scratch.",
      "Fri",
      { readReceipt: "delivered" },
    ),
    msg(
      "m-helios-4",
      "incoming",
      "Will pull together the brief this week.",
      "Mon",
    ),
  ],
  conversationTags: ["strategy"],
};

/* ---------- 6. Mercer Capital — awaiting shortlist (RICH, attachment) ---------- */

const mercer: ClientChatThread = {
  kind: "client",
  id: "client-mercer-capital",
  clientId: "client-mercer-capital",
  logoVariant: 1,
  title: "Mercer Capital",
  initials: "MC",
  preview: "Brief attached — bilingual VA, EST overlap preferred.",
  timestamp: "5h",
  unread: 1,
  status: "online",
  tags: ["unread", "briefs"],
  metaLine: [
    { kind: "tier", label: "TRUSTED" },
    { kind: "text", value: "BOSTON" },
    { kind: "text", value: "AWAITING SHORTLIST" },
    { kind: "online", value: "ONLINE" },
  ],
  contextStrip: [
    { label: "Active hires", value: "0" },
    { label: "Last brief", value: "5h ago", tone: "success" },
    { label: "Their rating", value: "4.7 ★", tone: "success" },
    { label: "Open brief", value: "Bilingual VA", tone: "amber" },
  ],
  messages: [
    msg(
      "m-mercer-1",
      "incoming",
      "Brief attached — bilingual VA (English + Spanish), EST overlap preferred, investment-ops admin work. Mid-senior level. Looking to start in 2–3 weeks.",
      "5h ago",
      {
        attachment: {
          id: "att-mercer-1",
          filename: "mercer_bilingual_va_brief.pdf",
          size: "412 KB",
          kind: "pdf",
        },
      },
    ),
  ],
  aiSuggestion: {
    text: "Got it — I have two strong bilingual matches in EST already, and a third I'd want to vet before sending. Targeting end-of-day Thursday for a 3-person shortlist with profiles, rates, and EST overlap notes.",
    rationale: "Confirms the brief + sets a specific delivery target with concrete deliverables.",
  },
  conversationTags: ["shortlist"],
};

/* ---------- 7. TechFlow Inc — light, kudos ---------- */

const techflow: ClientChatThread = {
  kind: "client",
  id: "client-techflow-inc",
  clientId: "client-techflow-inc",
  logoVariant: 2,
  title: "TechFlow Inc",
  initials: "TF",
  preview: "David Park: Anand keeps surprising us — left a 5★.",
  timestamp: "1w",
  unread: 0,
  status: "offline",
  tags: ["all"],
  metaLine: [
    { kind: "tier", label: "TRUSTED" },
    { kind: "text", value: "AUSTIN" },
    { kind: "text", value: "STRONG" },
    { kind: "online", value: "OFFLINE" },
  ],
  contextStrip: [
    { label: "Active hires", value: "1", tone: "success" },
    { label: "Last brief", value: "5d ago" },
    { label: "Their rating", value: "5.0 ★", tone: "success" },
  ],
  messages: [
    msg(
      "m-techflow-1",
      "incoming",
      "David Park: Anand keeps surprising us — left a 5★ extension review. Will keep him as long as he'll stay.",
      "1w ago",
    ),
    msg(
      "m-techflow-2",
      "outgoing",
      "Glad to hear it. Anand's planning to stay at his current capacity through year-end — happy to lock that in writing if you'd like.",
      "1w ago",
      { readReceipt: "read" },
    ),
  ],
};

/* ---------- 8. Lumio Health — light, brief acknowledged ---------- */

const lumio: ClientChatThread = {
  kind: "client",
  id: "client-lumio-health",
  clientId: "client-lumio-health",
  logoVariant: 3,
  title: "Lumio Health",
  initials: "LH",
  preview: "Acknowledged the Spanish-speaking VA brief — shortlist Fri.",
  timestamp: "3d",
  unread: 0,
  status: "away",
  tags: ["briefs"],
  metaLine: [
    { kind: "tier", label: "TRUSTED" },
    { kind: "text", value: "TORONTO" },
    { kind: "text", value: "STRONG" },
    { kind: "online", value: "AWAY" },
  ],
  contextStrip: [
    { label: "Active hires", value: "1", tone: "success" },
    { label: "Last brief", value: "3d ago" },
    { label: "Their rating", value: "4.9 ★", tone: "success" },
  ],
  messages: [
    msg(
      "m-lumio-1",
      "incoming",
      "Sent over a brief for a Spanish-speaking VA, telehealth patient comms. Roughly mirrors what Kanya does for us.",
      "3d ago",
    ),
    msg(
      "m-lumio-2",
      "outgoing",
      "Got it — acknowledged. I'll have a 3-person shortlist over by end of day Friday.",
      "3d ago",
      { readReceipt: "read" },
    ),
  ],
  conversationTags: ["shortlist"],
};

/* ---------- 9. Bengaluru Bio — light, post-hire steady ---------- */

const bengaluru: ClientChatThread = {
  kind: "client",
  id: "client-bengaluru-bio",
  clientId: "client-bengaluru-bio",
  logoVariant: 1,
  title: "Bengaluru Bio",
  initials: "BB",
  preview: "Carlos finished his first 60 hours — clean and on time.",
  timestamp: "1w",
  unread: 0,
  status: "offline",
  tags: ["all"],
  metaLine: [
    { kind: "tier", label: "NEW" },
    { kind: "text", value: "BENGALURU" },
    { kind: "text", value: "STRONG" },
    { kind: "online", value: "OFFLINE" },
  ],
  contextStrip: [
    { label: "Active hires", value: "1", tone: "success" },
    { label: "Last brief", value: "8d ago" },
    { label: "Their rating", value: "5.0 ★", tone: "success" },
  ],
  messages: [
    msg(
      "m-beng-1",
      "incoming",
      "Carlos finished his first 60 hours — clean and on time. Pleasantly surprised.",
      "1w ago",
    ),
    msg(
      "m-beng-2",
      "outgoing",
      "He's a quietly excellent operator. Glad it's working. I'll check in again at the 30-day mark.",
      "1w ago",
      { readReceipt: "read" },
    ),
  ],
};

/* ---------- 10. Sahara Logistics — light, supportive ---------- */

const sahara: ClientChatThread = {
  kind: "client",
  id: "client-sahara-logistics",
  clientId: "client-sahara-logistics",
  logoVariant: 2,
  title: "Sahara Logistics",
  initials: "SL",
  preview: "Adama left a 4.5★ supportive note for Aaliyah.",
  timestamp: "2w",
  unread: 0,
  status: "offline",
  tags: ["all"],
  metaLine: [
    { kind: "tier", label: "NEW" },
    { kind: "text", value: "ABIDJAN" },
    { kind: "text", value: "STRONG" },
    { kind: "online", value: "OFFLINE" },
  ],
  contextStrip: [
    { label: "Active hires", value: "1", tone: "success" },
    { label: "Last brief", value: "12d ago" },
    { label: "Their rating", value: "4.5 ★", tone: "success" },
  ],
  messages: [
    msg(
      "m-sahara-1",
      "incoming",
      "Adama left a 4.5★ supportive note for Aaliyah — said her engagement was easy to work with through the family-leave window. Wanted you to see it.",
      "2w ago",
    ),
    msg(
      "m-sahara-2",
      "outgoing",
      "Thanks for sending — I'll forward it on to Aaliyah, will mean a lot to her.",
      "2w ago",
      { readReceipt: "read" },
    ),
  ],
};

/* ---------- 11. Saunders SaaS — light, onboarding first brief ---------- */

const saunders: ClientChatThread = {
  kind: "client",
  id: "client-saunders-saas",
  clientId: "client-saunders-saas",
  logoVariant: 1,
  title: "Saunders SaaS",
  initials: "SS",
  preview: "First brief in — customer ops VA, APAC overlap.",
  timestamp: "1d",
  unread: 0,
  status: "online",
  tags: ["briefs"],
  metaLine: [
    { kind: "tier", label: "NEW" },
    { kind: "text", value: "SYDNEY" },
    { kind: "text", value: "ONBOARDING" },
    { kind: "online", value: "ONLINE" },
  ],
  contextStrip: [
    { label: "Active hires", value: "0" },
    { label: "First brief", value: "1d ago", tone: "success" },
    { label: "Account age", value: "9 days" },
  ],
  messages: [
    msg(
      "m-saunders-1",
      "system",
      "Saunders SaaS submitted their first brief.",
      "1d ago",
    ),
    msg(
      "m-saunders-2",
      "incoming",
      "Brief in — customer ops VA, APAC overlap with Sydney hours. Looking for someone who can own the inbox + light reporting.",
      "1d ago",
    ),
    msg(
      "m-saunders-3",
      "outgoing",
      "Got it — first-brief shortlist on us. I'll have 4 candidates over by Thursday with profiles + rates.",
      "1d ago",
      { readReceipt: "read" },
    ),
  ],
  conversationTags: ["shortlist"],
};

/* ---------- 12. Bridgepoint LLC — paused, light ---------- */

const bridgepoint: ClientChatThread = {
  kind: "client",
  id: "client-bridgepoint-llc",
  clientId: "client-bridgepoint-llc",
  logoVariant: 4,
  title: "Bridgepoint LLC",
  initials: "BL",
  preview: "Account paused at client request · pausing new briefs.",
  timestamp: "6w",
  unread: 0,
  status: "offline",
  tags: ["all"],
  metaLine: [
    { kind: "tier", label: "NEW" },
    { kind: "text", value: "NEW YORK" },
    { kind: "text", value: "PAUSED" },
    { kind: "online", value: "OFFLINE" },
  ],
  contextStrip: [
    { label: "Active hires", value: "0" },
    { label: "Last brief", value: "47d ago", tone: "amber" },
    { label: "Status", value: "Paused", tone: "amber" },
  ],
  messages: [
    msg(
      "m-bridge-1",
      "incoming",
      "Need to pause hiring through the M&A close — won't be sending briefs for ~6 weeks.",
      "6w ago",
    ),
    msg(
      "m-bridge-2",
      "outgoing",
      "Understood — I'll pause new briefs on our end. I'll check in at the 6-week mark; ping anytime sooner if things shift.",
      "6w ago",
      { readReceipt: "read" },
    ),
    msg(
      "m-bridge-3",
      "system",
      "Account paused — no new briefs will be auto-routed.",
      "6w ago",
    ),
  ],
};

/* ============================================================
   Roster export
   ============================================================ */

export const clientChatThreads: ReadonlyArray<ClientChatThread> = [
  acme,
  quill,
  vertex,
  northwind,
  helios,
  mercer,
  techflow,
  lumio,
  bengaluru,
  sahara,
  saunders,
  bridgepoint,
];

export const CLIENT_CHAT_DEFAULT_ID = acme.id;

/**
 * Filter chip definitions for the client-chat conv-list rail.
 * Differs from candidate side: clients have "With briefs" instead of
 * "Flagged" — flagged is candidate-internal-state and isn't surfaced
 * on the client side per the HTML.
 */
export const CLIENT_CHAT_FILTERS = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "briefs", label: "With briefs" },
] as const;

/** Header subtitle ("Client messages 12"). */
export const CLIENT_CHAT_LIST_TITLE = "Client messages";

/**
 * Lookup helper used by the client-chat page when resolving the
 * `?id=` query param. Returns `undefined` for unknown ids — the page
 * falls back to the rail's first row (no `notFound()` — the rail is
 * always present).
 */
export function getClientChatThread(
  id: string,
): ClientChatThread | undefined {
  return clientChatThreads.find((t) => t.id === id);
}
