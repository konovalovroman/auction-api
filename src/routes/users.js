import usersService from '../services/users.js';

/**
 * @param {import('fastify').FastifyInstance} app 
 */
export async function usersRoutes(app) {
  app.route({
    url: '/',
    method: 'POST',
    schema: {
      body: {
        type: 'object',
        required: ['username'],
        properties: {
          username: {
            type: 'string',
            minLength: 1,
            maxLength: 40,
          },
        },
      },
    },
    handler: async (request, reply) => {
      const { body } = request;
      const dto = {
        username: body.username,
      };
      
      const user = await usersService.createUser(dto);

      if (!user) {
        return reply.status(400).send({ error: 'User creation error' });
      }

      return reply.status(201).send({ result: user });
    },
  });

  app.route({
    url: '/',
    method: 'GET',
    handler: async (request, reply) => {
      const users = await usersService.findAllUsers();
      return reply.status(200).send({ result: users });
    },
  });
}
