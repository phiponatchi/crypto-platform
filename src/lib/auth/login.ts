"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { authenticateUser, SESSION_KEY, SESSION_TIMEOUT } from ".";
import { cookies } from "next/headers";


const loginSchema = z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(3).max(100),
});

export const loginUser = actionClient
    .schema(loginSchema)
    .action(async ({ parsedInput: { username, password } }) => {
        const { user, session, token } = await authenticateUser(username, password);

        if (user && session && token) {
            cookies().set(SESSION_KEY, token, { path: "/", maxAge: SESSION_TIMEOUT, httpOnly: true });
            return true;
        }
        return false;
    });
