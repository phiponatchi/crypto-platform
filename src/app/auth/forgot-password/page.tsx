import { ForgotPasswordForm } from "@/components/pages/auth/forgot-password"
import config from '@/app.config';
import { isAuthenticated } from '@/lib/auth/check'
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const status = await isAuthenticated();
  if (status)
    return redirect(config.auth.callbackUrl);
  return (
    <ForgotPasswordForm />
  )
}