import { decimal, int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { usersSchema } from './users.js';

export const itemsSchema = mysqlTable('items', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 200 }).notNull(),
  price: decimal('price', { scale: 2 }).notNull(),
  sellerId: int('seller_id').references(() => usersSchema.id, { onDelete: 'cascade' }).notNull(),
  auctionStartDate: timestamp('auction_start_date').notNull(),
  auctionEndDate: timestamp('auction_end_date').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
