import Data from "./data"
import config from "@/app.config";
import { isAuthenticated } from "@/lib/auth/check";
import { redirect } from "next/navigation";

export default async function DataPage() {
  const status = await isAuthenticated();
  if (!status)
    return redirect(config.auth.signInUrl);
  return (
    <Data />
  )
}

