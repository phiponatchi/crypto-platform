import { Separator } from "@/components/ui/separator";
import { AccountForm } from "./account-form";

import config from "@/app.config";
import { isAuthenticated } from "@/lib/auth/check";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth/user";


export default async function SettingsAccountPage() {
  const status = await isAuthenticated();
  if (!status)
    return redirect(config.auth.signInUrl);
  const user = await getUser();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Separator />
      <AccountForm user={user}/>
    </div>
  )
}
