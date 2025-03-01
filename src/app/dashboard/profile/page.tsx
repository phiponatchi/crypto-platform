import { ProfileForm } from "./profile-form"
import { Separator } from "@/components/ui/separator"

import config from "@/app.config";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth/user";

export default async function SettingsProfilePage() {
  const user = await getUser();
  if (!user)
    return redirect(config.auth.signInUrl);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator />
      <ProfileForm user={user} />
    </div>
  )
}
