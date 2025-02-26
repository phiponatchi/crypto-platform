"use server";

import { cookies } from "next/headers";
import { invalidateSession, SESSION_KEY } from ".";

export async function logOut(form: FormData): Promise<void> {
    const session = cookies().get(SESSION_KEY);
    const token = session?.value ?? null;
    await invalidateSession(token ?? "");
    cookies().delete(SESSION_KEY);
}