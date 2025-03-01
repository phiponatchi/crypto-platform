"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { cookies } from "next/headers";
import { SESSION_KEY, validateSessionToken } from "@/lib/auth";
import { updateUser } from "./users";
import { redirect } from "next/navigation";
import config from "@/app.config";
import { revalidatePath } from "next/cache";


const schema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }).nullable(),
  lastName: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }).nullable(),
})

export const updateAccount = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { firstName, lastName } }) => {
    const cookie = cookies().get(SESSION_KEY);
    if (cookie) {
      const { user } = await validateSessionToken(cookie.value);
      if (user) {
        user.firstName = firstName;
        user.lastName = lastName;
        await updateUser(user);
        revalidatePath("/dashboard/profile/account");
      }
      else
        return redirect(config.auth.signInUrl);
    }
  });