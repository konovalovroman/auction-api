import { decimal, serial, pgTable, timestamp } from 'drizzle-orm/pg-core';
import { usersSchema } from './users.js';
import { itemsSchema } from './items.js';
import { integer } from 'drizzle-orm/sqlite-core';

export const bidsSchema = pgTable('bids', {
  id: serial('id').primaryKey(),
  amount: decimal('amount', { scale: 2 }).notNull(),
  userId: integer('user_id').references(() => usersSchema.id, { onDelete: 'cascade' }).notNull(),
  itemId: integer('item_id').references(() => itemsSchema.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
