/**
 * /candidate/profile/preview
 *
 * "Profile preview in client mode" (PROJECT_SCOPE §2.2) — the candidate's
 * profile rendered with the same component the client surface will use.
 */
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ProfilePreviewApp } from "@/components/candidate/profile/profile-preview-app";
import { getCandidateSession } from "@/lib/auth";

export const metadata: Metadata = { title: "Profile preview · Atlas" };

export default async function CandidateProfilePreviewPage() {
  const session = await getCandidateSession();
  if (!session) redirect("/candidate/signin?next=/candidate/profile/preview");

  return <ProfilePreviewApp />;
}
