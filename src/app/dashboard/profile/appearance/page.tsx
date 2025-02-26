import { Separator } from "@/components/ui/separator";
import { AppearanceForm } from "./appearance-form";
import config from "@/app.config";
import { isAuthenticated } from "@/lib/auth/check";
import { redirect } from "next/navigation";

export default async function SettingsAppearancePage() {
  const status = await isAuthenticated();
  if (!status)
    return redirect(config.auth.signInUrl);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  )
}
