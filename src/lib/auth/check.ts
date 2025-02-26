"use server";

import { cookies } from "next/headers";
import { SESSION_KEY, validateSessionToken } from ".";

export async function isAuthenticated(): Promise<boolean> {
    const session = cookies().get(SESSION_KEY);
    const token = session?.value ?? null;
    if (token !== null) {
        const { session, user } = await validateSessionToken(token);
        return session !== null && user !== null;
    }
    return false;
}