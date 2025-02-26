"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { authenticateUser, SESSION_KEY, SESSION_TIMEOUT } from ".";
import { cookies } from "next/headers";
import { createUser } from "@/service/users";


const signupSchema = z
    .object({
        username: z.string().min(3).max(10),
        password: z.string().min(3).max(100),
        confirmPassword: z.string().min(3).max(100),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const signupUser = actionClient
    .schema(signupSchema)
    .action(async ({ parsedInput: { username, password } }) => {
        try {
            await createUser({ username, password });
        } catch (e) {
            return { success: false, message: "Username already exists" };
        }
        return { success: true, message: "User created successfully" };
    });
