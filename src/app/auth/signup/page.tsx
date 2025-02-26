import { SignUpForm } from '@/components/pages/auth/signup'
import config from '@/app.config';
import { isAuthenticated } from '@/lib/auth/check'
import { redirect } from 'next/navigation';

export default async function SignUp() {
  const status = await isAuthenticated();
  if (status)
    return redirect(config.auth.callbackUrl);
  return (
    <SignUpForm />
  )
}
