import { bidsSchema } from '../database/schemas/bids.js';
import { logger } from '../utils/logger.js';
import { db } from '../database/database.js';
import { itemsSchema } from '../database/schemas/items.js';
import { eq, between, and, sql } from 'drizzle-orm';

async function createBid(data) {
  try {
    const bid = await db.transaction(async (tx) => {
      const [item] = await tx
        .select()
        .from(itemsSchema)
        .where(
          and(
            eq(itemsSchema.id, data.itemId),
            between(sql`NOW()`, itemsSchema.auctionStartDate, itemsSchema.auctionEndDate),
          ),
        );

      if (!item || item.price >= data.amount) return await tx.rollback();

      const [insertedBid] = await Promise.all([
        tx
          .insert(bidsSchema)
          .values(data)
          .returning(),
        tx
          .update(itemsSchema)
          .set({ price: data.amount })
          .where(eq(itemsSchema.id, item.id)),
      ]);

      return { result: insertedBid };
    });
    return bid;
  } catch (err) {
    logger.warn(err.message);
    return null;
  }
}

const bidsService = {
  createBid,
};

export default bidsService;
