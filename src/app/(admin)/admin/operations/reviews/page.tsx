import { ReviewsShell } from '@/components/admin/operations/reviews/reviews-shell';

export const metadata = {
  title: 'Reviews moderation - Atlas',
  description: 'All reviews on Atlas — live / flagged / pattern / removed / appealed · candidate-side & client-side moderation.',
};

export default function ReviewsPage() {
  return <ReviewsShell />;
}
