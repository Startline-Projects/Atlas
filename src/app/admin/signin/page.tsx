import { SignInForm } from '@/components/admin/signin-form';

export const metadata = {
  title: 'Admin Sign In - Atlas',
  description: 'Restricted access. Authorized Atlas administrators only.',
};

export default function SignInPage() {
  return <SignInForm />;
}
