import { JobsShell } from '@/components/admin/operations/jobs/jobs-shell';

export const metadata = {
  title: 'Job Postings - Atlas',
  description: 'All job postings on Atlas — open / paused / filled / closed / flagged. Sourcing audited.',
};

export default function JobsPage() {
  return <JobsShell />;
}
