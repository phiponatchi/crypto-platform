"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { cookies } from "next/headers";
import { SESSION_KEY, validateSessionToken } from "@/lib/auth";
import { updateUser } from "./users";


const schema = z.object({
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

export const updateProfile = actionClient
    .schema(schema)
    .action(async ({ parsedInput: { username, email } }) => {
        const cookie = cookies().get(SESSION_KEY);
        if (cookie) {
            const { user } = await validateSessionToken(cookie.value);
            if (user) {
                user.username = username;
                user.email = email;
                try {
                    await updateUser(user);
                    return { success: true, message: "Your profile has been updated successfully." };
                } catch (e) {
                    return { success: false, message: "Username already exists" };
                }
            }
        }
    });