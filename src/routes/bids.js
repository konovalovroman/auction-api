import bidsService from '../services/bids.js';

/**
 * @param {import('fastify').FastifyInstance} app 
 */
export async function bidsRoutes(app) {
  app.route({
    url: '/',
    method: 'POST',
    schema: {
      body: {
        type: 'object',
        required: ['itemId', 'amount'],
        properties: {
          itemId: {
            type: 'number',
          },
          amount: {
            type: 'number',
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
        itemId: body.itemId,
        amount: body.amount,
        userId: headers['x-user-id'],
      };

      const bid = await bidsService.createBid(dto);

      if (!bid) {
        return reply.status(400).send({ result: 'Bid creation error' });
      }

      return reply.status(201).send({ result: bid });
    },
  });
}
