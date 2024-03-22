import itemsService from '../services/items.js';

/**
 * @param {import('fastify').FastifyInstance} app 
 */
export async function itemsRoutes(app) {
  app.route({
    url: '/',
    method: 'POST',
    schema: {
      body: {
        type: 'object',
        required: ['name', 'price', 'auctionStartDate', 'auctionEndDate'],
        properties: {
          name: {
            type: 'string',
            minLength: 1,
            maxLength: 200,
          },
          price: {
            type: 'number',
            minimum: 0,
          },
          auctionStartDate: {
            type: 'string',
            format: 'date-time',
          },
          auctionEndDate: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      headers: {
        type: 'object',
        properties: {
          'X-User-ID': { type: 'number' },
        },
        required: ['X-User-ID'],
      },
    },
    handler: async (request, reply) => {
      const { body, headers } = request;
      const dto = {
        name: body.name,
        price: body.price,
        sellerId: headers['x-user-id'],
        auctionStartDate: new Date(body.auctionStartDate),
        auctionEndDate: new Date(body.auctionEndDate),
      };

      const item = await itemsService.createItem(dto);

      if (!item) {
        return reply.status(400).send({ error: 'Item creation error' });
      }

      return reply.status(201).send({ result: item });
    },
  });

  app.route({
    url: '/',
    method: 'GET',
    handler: async (request, reply) => {
      const items = await itemsService.findAllItems();

      return reply.status(200).send({ result: items });
    },
  });
}
