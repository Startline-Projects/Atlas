/**
 * /candidate/profile
 *
 * The profile builder (PROJECT_SCOPE §2.2). Signed-in only: the session is
 * checked here on the server so an anonymous visitor is redirected before any
 * profile UI renders; the client app re-checks via the API on load.
 */
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ProfileBuilderApp } from "@/components/candidate/profile/profile-builder-app";
import { getCandidateSession } from "@/lib/auth";

export const metadata: Metadata = { title: "Your profile · Atlas" };

export default async function CandidateProfilePage() {
  const session = await getCandidateSession();
  if (!session) redirect("/candidate/signin?next=/candidate/profile");

  return <ProfileBuilderApp />;
}
