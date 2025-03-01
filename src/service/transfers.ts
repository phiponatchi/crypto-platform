import { db } from "@/db";
import { InsertTransfer, SelectTransfer, SelectUser, transfers } from "@/db/schema";
import { and, eq, getTableColumns, sql } from "drizzle-orm";

export const getAllTransfers = async (userId: SelectUser["id"]) => {
    return await db
        .select()
        .from(transfers)
        .where(eq(transfers.userId, userId))
        .execute();
};

export const getTransferById = async (id: SelectTransfer["id"], userId: SelectUser["id"]) => {
    return await db
        .select()
        .from(transfers)
        .where(and(eq(transfers.id, id), eq(transfers.userId, userId)))
        .execute();
};

export const createTransfer = async (transfer: InsertTransfer, userId: SelectUser["id"]) => {
    transfer.userId = userId;
    return await db
        .insert(transfers)
        .values(transfer)
        .execute();
};

export const updateTransfer = async (acquisition: InsertTransfer & { id: SelectTransfer["id"] }, userId: SelectUser["id"]) => {
    acquisition.userId = userId;
    return await db
        .update(transfers)
        .set(acquisition)
        .where(and(eq(transfers.id, acquisition.id), eq(transfers.userId, userId)))
        .execute();
};

export const deleteTransfer = async (id: SelectTransfer["id"], userId: SelectUser["id"]) => {
    return await db
        .delete(transfers)
        .where(and(eq(transfers.id, id), eq(transfers.userId, userId)))
        .execute();
};