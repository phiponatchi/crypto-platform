import { SignInForm } from '@/components/pages/auth/signin'
import config from '@/app.config';
import { isAuthenticated } from '@/lib/auth/check'
import { redirect } from 'next/navigation';

export default async function SignIn() {
  const status = await isAuthenticated();
  if (status)
    return redirect(config.auth.callbackUrl);
  return (
    <SignInForm />
  )
}
