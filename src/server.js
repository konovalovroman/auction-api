import { fastify } from 'fastify';
import { logger } from './utils/logger.js';
import { usersRoutes } from './routes/users.js';
import { itemsRoutes } from './routes/items.js';
import { bidsRoutes } from './routes/bids.js';

export function buildServer() {
  const app = fastify({
    logger,
  });
  
  app.register(usersRoutes, { prefix: 'users' });
  app.register(itemsRoutes, { prefix: 'items' });
  app.register(bidsRoutes, { prefix: 'bids' });

  return app;
}
