import { Session, sessions, User, users } from "@/db/schema";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const SESSION_TIMEOUT = process.env.SESSION_TIMEOUT ? parseInt(process.env.SESSION_TIMEOUT) : 1000 * 60 * 60 * 24 * 30;
export const SESSION_KEY = "session";

export function generateSessionToken(): string {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    const token = encodeBase32LowerCaseNoPadding(bytes);
    return token;
}

export async function createSession(token: string, userId: number): Promise<Session> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const session: Session = {
        id: sessionId,
        userId,
        expiresAt: new Date(Date.now() + SESSION_TIMEOUT)
    };
    await db.insert(sessions).values(session);
    return session;
}

export async function authenticateUser(username: string, password: string): Promise<SessionValidationResult & { token?: string }> {
    const [user] = await db
        .select()
        .from(users)
        .limit(1)
        .where(eq(users.username, username))
        .execute();
    if (!user)
        return { user: null, session: null };

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
        return { user: null, session: null };
    const token = generateSessionToken();
    const session = await createSession(token, user.id);
    return { user, session, token };
};


export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const result = await db
        .select({ user: users, session: sessions })
        .from(sessions)
        .innerJoin(users, eq(sessions.userId, users.id))
        .where(eq(sessions.id, sessionId));
    if (result.length < 1) {
        return { session: null, user: null };
    }
    const { user, session } = result[0];
    if (Date.now() >= session.expiresAt.getTime()) {
        await db.delete(sessions).where(eq(sessions.id, session.id));
        return { session: null, user: null };
    }
    if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
        session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        await db
            .update(sessions)
            .set({
                expiresAt: session.expiresAt
            })
            .where(eq(sessions.id, session.id));
    }
    return { session, user };
}

export async function invalidateSession(token: string): Promise<void> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    await db.delete(sessions).where(eq(sessions.id, sessionId));
}

export async function invalidateAllSessions(userId: number): Promise<void> {
    await db.delete(sessions).where(eq(sessions.userId, userId));
}

export type SessionValidationResult =
    | { session: Session; user: User }
    | { session: null; user: null };