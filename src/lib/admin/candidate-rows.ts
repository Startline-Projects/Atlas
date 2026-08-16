import type { Candidate } from "@/lib/domain/candidate";
import { roleCategoryLabel } from "@/lib/domain/candidate";
import type {
  CandidateStatus,
  CandidateUser,
} from "@/lib/mock-data/admin/users-data";

/**
 * Domain candidate → the row shape the admin table renders.
 *
 * Presentation only: the table was built against a fixed row type extracted
 * from the design, and this keeps that contract while the data behind it
 * becomes real. Fields the schema does not carry yet (country, hire history)
 * degrade to an em dash rather than being faked.
 */

const EMPTY = "—";

const STATUS_BY_ACCOUNT_STATUS: Record<Candidate["status"], CandidateStatus> = {
  // Signed up but not yet through email verification — still in the funnel.
  PENDING_VERIFICATION: "pipeline",
  ACTIVE: "live",
  SUSPENDED: "suspended",
  DEACTIVATED: "banned",
};

export function toCandidateRow(candidate: Candidate, now: Date): CandidateUser {
  const lastActive = candidate.lastActiveAt;

  return {
    id: candidate.id,
    name: candidate.fullName,
    email: candidate.email,
    country: candidate.country ?? EMPTY,
    flag: "",
    title: candidate.headline ?? roleCategoryLabel(candidate.roleCategory),
    status: STATUS_BY_ACCOUNT_STATUS[candidate.status],
    joinedMonth: formatMonth(candidate.createdAt),
    lastActive: lastActive ? formatRelative(lastActive, now) : "Never",
    lastActiveType: lastActiveType(lastActive, now),
    hiresCount: 0,
    hiresAmount: EMPTY,
    hiresStatus: "zero",
  };
}

function formatMonth(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/** Coarse buckets — the column is a glance, not an audit trail. */
function formatRelative(date: Date, now: Date): string {
  const minutes = Math.max(
    0,
    Math.round((now.getTime() - date.getTime()) / 60_000),
  );

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;

  return formatMonth(date);
}

/** Drives the `.fresh` / `.empty` styling in the table cell. */
function lastActiveType(
  date: Date | null,
  now: Date,
): CandidateUser["lastActiveType"] {
  if (!date) return "never";
  const hours = (now.getTime() - date.getTime()) / 3_600_000;
  return hours < 24 ? "fresh" : "regular";
}
