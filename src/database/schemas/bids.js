import { decimal, int, mysqlTable, timestamp } from 'drizzle-orm/mysql-core';
import { usersSchema } from './users.js';
import { itemsSchema } from './items.js';

export const bidsSchema = mysqlTable('bids', {
  id: int('id').primaryKey().autoincrement(),
  amount: decimal('amount', { scale: 2 }).notNull(),
  userId: int('user_id').references(() => usersSchema.id, { onDelete: 'cascade' }).notNull(),
  itemId: int('item_id').references(() => itemsSchema.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
