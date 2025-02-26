"use server";

import { cookies } from "next/headers";
import { SESSION_KEY, validateSessionToken } from ".";
import { User } from "@/db/schema";

export async function getUser(): Promise<User | null> {
    const cookie = cookies().get(SESSION_KEY);
    if (cookie) {
        const { user } = await validateSessionToken(cookie.value);
        return user;
    }
    return null;
}
