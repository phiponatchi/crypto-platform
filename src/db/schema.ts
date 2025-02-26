import { date, doublePrecision, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: text('name').notNull().unique(),
    email: text('email').unique(),
    password: text('password').notNull(),
    firstName: text('first_name'),
    lastName: text('last_name'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .$onUpdate(() => new Date()),
});

export const sessions = pgTable("sessions", {
    id: text("id").primaryKey(),
    userId: integer("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull()
});

export const acquisitions = pgTable('acquisitions', {
    id: serial('id').primaryKey(),
    date: date('date').notNull(),
    cryptoactif: text('cryptoactif').notNull(),
    montantInvesti: doublePrecision('montant_investi').notNull(),
    quantiteAchetee: doublePrecision('quantite_achetee').notNull(),
    userId: integer('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .$onUpdate(() => new Date()),
});

export const transfers = pgTable('transfers', {
    id: serial('id').primaryKey(),
    date: date('date').notNull(),
    cryptoactif: text('cryptoactif').notNull(),
    quantiteVendu: doublePrecision('quantite_vendu').notNull(),
    prixCession: doublePrecision('prix_cession').notNull(),
    frais: doublePrecision('frais').notNull(),
    userId: integer('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .$onUpdate(() => new Date()),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type User = Omit<SelectUser, "password">;

export type InsertSession = typeof sessions.$inferInsert;
export type SelectSession = typeof sessions.$inferSelect;

export type Session = SelectSession;

export type InsertAcquisition = typeof acquisitions.$inferInsert;
export type SelectAcquisition = typeof acquisitions.$inferSelect;

export type InsertTransfer = typeof transfers.$inferInsert;
export type SelectTransfer = typeof transfers.$inferSelect;
