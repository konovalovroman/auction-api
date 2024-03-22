import { logger } from '../utils/logger.js';
import { db } from '../database/database.js';
import { itemsSchema } from '../database/schemas/items.js';
import { sql } from 'drizzle-orm';

async function createItem(data) {
  try {
    if (data.price < 0) return null;

    if (data.auctionStartDate > data.auctionEndDate) return null;

    const insertItemResult = await db
      .insert(itemsSchema)
      .values(data);
    
    return { id: insertItemResult[0].insertId };
  } catch (err) {
    logger.warn(err.message);
    return null;
  }
}

async function findAllItems() {
  try {
    const items = await db
      .select({
        ...itemsSchema,
        status: sql`
          CASE
          WHEN NOW() < auction_start_date THEN 'not_started'
          WHEN NOW() BETWEEN auction_start_date AND auction_end_date THEN 'in_progress'
          ELSE 'done'
          END
        `,
        buyerId: sql`
          CASE
          WHEN NOW() > auction_end_date THEN (
            SELECT b.user_id
            FROM  bids b
            WHERE b.item_id = items.id
            ORDER BY b.created_at DESC 
            LIMIT 1
          )
          ELSE null
          END
        `,
      })
      .from(itemsSchema);

    return items;
  } catch (err) {
    logger.warn(err.message);
    return null;
  }
}

const itemsService = {
  createItem,
  findAllItems,
};

export default itemsService;
