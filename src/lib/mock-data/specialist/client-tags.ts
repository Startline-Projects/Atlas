/**
 * Mock data for the my-clients sheet "Tag client" panel.
 *
 * Tag library + per-client tag assignments. Tags drive filtering and
 * reporting in the future tags service. For now the panel surfaces the
 * applied tags + lets the specialist add/remove from the library
 * (visual-only — applied set lives in component state and resets on
 * sheet close, per the no-persistence prototype convention).
 *
 * The tag library is a controlled vocabulary across categories
 * (industry / lifecycle / priority / billing / custom). Each tag carries
 * a tone so the chip rendering stays consistent across views.
 */

export type TagCategory =
  | "industry"
  | "lifecycle"
  | "priority"
  | "billing"
  | "custom";

export type TagTone = "default" | "lime" | "amber" | "danger" | "navy";

export type ClientTag = {
  key: string;
  label: string;
  category: TagCategory;
  tone: TagTone;
};

export type ClientTagAssignment = {
  clientId: string;
  tagKeys: ReadonlyArray<string>;
};

/* ============================================================
   Tag library — ~20 standard tags
   ============================================================ */

export const clientTagLibrary: ReadonlyArray<ClientTag> = [
  /* Industry */
  { key: "saas-mid", label: "SaaS · mid-market", category: "industry", tone: "navy" },
  { key: "biotech", label: "Biotech", category: "industry", tone: "navy" },
  { key: "fintech", label: "Fintech", category: "industry", tone: "navy" },
  { key: "logistics", label: "Logistics", category: "industry", tone: "navy" },
  { key: "publishing", label: "Publishing", category: "industry", tone: "navy" },
  { key: "healthcare", label: "Healthcare", category: "industry", tone: "navy" },

  /* Lifecycle */
  { key: "new-client", label: "New client", category: "lifecycle", tone: "lime" },
  { key: "expansion", label: "Expansion", category: "lifecycle", tone: "lime" },
  { key: "renewal-q3", label: "Renewal · Q3", category: "lifecycle", tone: "default" },
  { key: "renewal-q4", label: "Renewal · Q4", category: "lifecycle", tone: "default" },
  { key: "at-risk", label: "At risk", category: "lifecycle", tone: "amber" },
  { key: "churn-risk", label: "Churn risk", category: "lifecycle", tone: "danger" },
  { key: "paused", label: "Paused", category: "lifecycle", tone: "amber" },

  /* Priority */
  { key: "vip", label: "VIP", category: "priority", tone: "lime" },
  { key: "priority-high", label: "High priority", category: "priority", tone: "amber" },
  { key: "do-not-pause", label: "Do-not-pause", category: "priority", tone: "lime" },

  /* Billing */
  { key: "payment-net-15", label: "Net 15", category: "billing", tone: "default" },
  { key: "payment-net-30", label: "Net 30", category: "billing", tone: "default" },
  { key: "payment-net-60", label: "Net 60", category: "billing", tone: "amber" },
  { key: "dispute-history", label: "Dispute history", category: "billing", tone: "danger" },
];

/* ============================================================
   Per-client tag assignments (2-4 per client)
   ============================================================ */

export const clientTagAssignments: ReadonlyArray<ClientTagAssignment> = [
  {
    clientId: "client-acme-co",
    tagKeys: ["vip", "saas-mid", "renewal-q3", "do-not-pause"],
  },
  {
    clientId: "client-techflow-inc",
    tagKeys: ["saas-mid", "renewal-q4", "priority-high"],
  },
  {
    clientId: "client-vertex-health",
    tagKeys: ["biotech", "expansion", "vip"],
  },
  {
    clientId: "client-lumio-health",
    tagKeys: ["healthcare", "renewal-q4"],
  },
  {
    clientId: "client-mercer-capital",
    tagKeys: ["fintech", "vip", "payment-net-30"],
  },
  {
    clientId: "client-bengaluru-bio",
    tagKeys: ["biotech", "expansion"],
  },
  {
    clientId: "client-quill-co",
    tagKeys: ["publishing", "dispute-history", "at-risk"],
  },
  {
    clientId: "client-sahara-logistics",
    tagKeys: ["logistics", "renewal-q4"],
  },
  {
    clientId: "client-helios-robotics",
    tagKeys: ["new-client", "priority-high"],
  },
  {
    clientId: "client-saunders-saas",
    tagKeys: ["saas-mid", "renewal-q3"],
  },
  {
    clientId: "client-bridgepoint-llc",
    tagKeys: ["fintech", "payment-net-60"],
  },
  {
    clientId: "client-northwind",
    tagKeys: ["saas-mid", "churn-risk", "payment-net-30"],
  },
];

/** Look up the tag library entry for a key. */
export function getTag(key: string): ClientTag | undefined {
  return clientTagLibrary.find((t) => t.key === key);
}

/** Get the tag keys applied to a client. */
export function getClientTagKeys(clientId: string): ReadonlyArray<string> {
  return (
    clientTagAssignments.find((a) => a.clientId === clientId)?.tagKeys ?? []
  );
}

/** Group the tag library by category for the picker UI. */
export function groupTagsByCategory(): ReadonlyArray<{
  category: TagCategory;
  label: string;
  tags: ReadonlyArray<ClientTag>;
}> {
  const CATEGORY_LABEL: Record<TagCategory, string> = {
    industry: "Industry",
    lifecycle: "Lifecycle",
    priority: "Priority",
    billing: "Billing",
    custom: "Custom",
  };
  const order: ReadonlyArray<TagCategory> = [
    "industry",
    "lifecycle",
    "priority",
    "billing",
    "custom",
  ];
  return order.map((category) => ({
    category,
    label: CATEGORY_LABEL[category],
    tags: clientTagLibrary.filter((t) => t.category === category),
  }));
}
