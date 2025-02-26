import { db } from "@/db";
import { InsertUser, SelectUser, User, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const getAllUsers = async (id: SelectUser["id"]) => {
    const data = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .execute();
    return data;
};

export const getUserById = async (id: SelectUser["id"]) => {
    return await db.
        select()
        .from(users)
        .where(eq(users.id, id))
        .execute();
};

export const createUser = async (user: InsertUser) => {
    const passwordHash = await bcrypt.hash(user.password, 10);
    user.password = passwordHash;
    return await db
        .insert(users)
        .values(user)
        .execute();
};

export const updateUser = async (user: User) => {
    return await db
        .update(users)
        .set(user)
        .where(eq(users.id, user.id))
        .execute();
};

export const deleteUser = async (id: SelectUser["id"]) => {
    return await db
        .delete(users)
        .where(eq(users.id, id))
        .execute();
};
