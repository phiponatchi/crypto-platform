"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import config from "@/app.config"
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signupUser } from "@/lib/auth/signup";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/ui/spinner";


export function SignUpForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null | undefined>(null);
    const router = useRouter();
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const username = form.get("username") as string;
        const password = form.get("password") as string;
        const confirmPassword = form.get("confirmPassword") as string;
        setPending(true);
        const status = await signupUser({ username, password, confirmPassword });
        if (status?.data) {
            const { message } = status.data;
            if (status.data.success) {
                toast(message, {
                    description: <span className="text-green-700">Redirecting to Login...</span>,
                    icon: <CheckCircle className="h-4 w-4 text-green-700" />,
                    duration: 3000
                })
                await new Promise((resolve) => setTimeout(resolve, 3000));
                router.push(config.auth.signInUrl);
            }
            else
                setError(message);
        } else {
            const message = status?.validationErrors?.confirmPassword?._errors?.[0];
            setError(message);
        }
        setPending(false);
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome to {config.appName}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <div className="grid gap-6">
                            <form className="grid gap-6" onSubmit={handleSubmit}>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Username</Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="Username"
                                        name="username"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" name="password" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Confirm Password</Label>
                                    <Input id="password" type="password" name="confirmPassword" required />
                                </div>
                                {error && (
                                    <div>
                                        <Alert variant="destructive">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertTitle className="font-bold">Error</AlertTitle>
                                            <AlertDescription>
                                                {error}
                                            </AlertDescription>
                                        </Alert>
                                    </div>
                                )}
                                <Button type="submit" className="w-full relative flex items-center justify-center" disabled={pending}>
                                    <span className={pending ? "opacity-50" : ""}>Sign up</span>
                                    {pending && <LoadingSpinner className="absolute end-16 sm:end-20 md:end-26" />}
                                </Button>
                            </form>
                            <div className="text-center text-sm">
                                Have an account?{" "}
                                <Link href="/auth/signin" className="underline underline-offset-4">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
