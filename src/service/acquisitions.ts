import { db } from "@/db";
import { Acquisition, acquisitions, InsertAcquisition, SelectAcquisition, SelectUser } from "@/db/schema";
import { and, eq, getTableColumns, sql } from "drizzle-orm";

export const getAllAquisitions = async (userId: SelectUser["id"]): Promise<Acquisition[]> => {
    return await db
        .select({
            ...getTableColumns(acquisitions),
            coursAchat: sql`${acquisitions.montantInvesti} / ${acquisitions.quantiteAchetee}`.as("coursAchat")
        })
        .from(acquisitions)
        .where(eq(acquisitions.userId, userId))
        .execute();
};

export const getAcquisitionById = async (id: SelectAcquisition["id"], userId: SelectUser["id"]) => {
    return await db
        .select({
            ...getTableColumns(acquisitions),
            coursAchat: sql`${acquisitions.montantInvesti} / ${acquisitions.quantiteAchetee}`.as("coursAchat")
        })
        .from(acquisitions)
        .where(and(eq(acquisitions.id, id), eq(acquisitions.userId, userId)))
        .execute();
};

export const createAcquisition = async (acquisition: InsertAcquisition, userId: SelectUser["id"]) => {
    acquisition.userId = userId;
    return await db
        .insert(acquisitions)
        .values(acquisition)
        .returning()
        .onConflictDoUpdate({
            target: acquisitions.id,
            set: acquisition,
        })
        .execute();
};

export const updateAcquisition = async (acquisition: InsertAcquisition & { id: SelectAcquisition["id"] }, userId: SelectUser["id"]) => {
    acquisition.userId = userId;
    return await db
        .update(acquisitions)
        .set(acquisition)
        .where(and(eq(acquisitions.id, acquisition.id), eq(acquisitions.userId, userId)))
        .execute();
};

export const deleteAcquisition = async (id: SelectAcquisition["id"], userId: SelectUser["id"]) => {
    return await db
        .delete(acquisitions)
        .where(and(eq(acquisitions.id, id), eq(acquisitions.userId, userId)))
        .execute();
};