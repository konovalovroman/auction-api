import { decimal, serial, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { usersSchema } from './users.js';
import { integer } from 'drizzle-orm/sqlite-core';

export const itemsSchema = pgTable('items', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  price: decimal('price', { scale: 2 }).notNull(),
  sellerId: integer('seller_id')
    .references(() => usersSchema.id, { onDelete: 'cascade' }).notNull(),
  auctionStartDate: timestamp('auction_start_date').notNull(),
  auctionEndDate: timestamp('auction_end_date').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
