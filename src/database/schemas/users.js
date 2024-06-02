import { serial, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const usersSchema = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 40 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
