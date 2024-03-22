import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const usersSchema = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  username: varchar('username', { length: 40 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
