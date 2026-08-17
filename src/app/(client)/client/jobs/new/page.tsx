/**
 * /client/jobs/new
 *
 * Post a job. The form validates with the same schema the API enforces and
 * hands off to the new job's page on success.
 */
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { JobForm } from "@/components/client/jobs/job-form";
import { CLIENT_HOME_PATH, clientSignInPath, getClientSession } from "@/lib/auth";

export default async function NewJobPage() {
  const session = await getClientSession();
  if (!session) redirect(clientSignInPath("/client/jobs/new"));

  return (
    <div className="mx-auto flex max-w-[760px] flex-col gap-8">
      <Link
        href={CLIENT_HOME_PATH}
        className="text-ink-mute hover:text-ink inline-flex items-center gap-1.5 self-start text-[13px] transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
        Dashboard
      </Link>
      <header>
        <div className="text-ink-mute mb-3 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
          {"// Post a job"}
        </div>
        <h1 className="display mb-3 text-[clamp(34px,4.4vw,50px)] leading-[1.05]">
          Describe the <span className="serif-italic">role</span>.
        </h1>
        <p className="text-ink-soft max-w-[560px] text-[15px] leading-[1.55]">
          Posting for {session.companyName} is free. Be specific about the work and the rate —
          the best candidates skip vague roles.
        </p>
      </header>
      <JobForm />
    </div>
  );
}
