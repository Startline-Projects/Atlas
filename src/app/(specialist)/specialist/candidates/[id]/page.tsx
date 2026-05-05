import { notFound } from "next/navigation";
import { ProfileApp } from "@/components/specialist/candidate-profile/profile-app";
import {
  ALL_CANDIDATE_IDS,
  getCandidateProfile,
} from "@/lib/mock-data/specialist/candidate-profile";

/** Pre-render every known candidate id at build time. */
export function generateStaticParams() {
  return ALL_CANDIDATE_IDS.map((id) => ({ id }));
}

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CandidateProfilePage({ params }: PageProps) {
  const { id } = await params;
  const profile = getCandidateProfile(id);
  if (!profile) notFound();
  return <ProfileApp profile={profile} />;
}
