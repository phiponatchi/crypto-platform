"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { User } from "@/db/schema"
import { updateProfile } from "@/service/profile"
import { toast } from "sonner"
import { CheckCircle, CircleX } from "lucide-react"


const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please enter a valid email.",
    })
    .email()
})

type ProfileFormValues = z.infer<typeof profileFormSchema>


export function ProfileForm({ user }: { user: User | null }) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    defaultValues: {
      username: user?.username ?? "",
      email: user?.email ?? "",
    }
  })

  async function onSubmit(data: ProfileFormValues) {
    const result = await updateProfile(data);
    const message = result?.data?.message;
    if (result?.data?.success) {
      toast("Profile updated successfully", {
        description: <span className="text-green-700">{message}</span>,
        icon: <CheckCircle className="h-4 w-4 text-green-700" />,
        duration: 2000
      });
    }
    else {
      toast("Error", {
        description: <span className="text-red-700">{message}</span>,
        icon: <CircleX className="h-4 w-4 text-red-700" />,
        duration: 2000
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  )
}
