import config from "@/app.config";
import { isAuthenticated } from "@/lib/auth/check";
import { redirect } from "next/navigation";

export default async function Page() {
  const status = await isAuthenticated();
  if (!status)
    return redirect(config.auth.signInUrl);
  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </>
  )
}

