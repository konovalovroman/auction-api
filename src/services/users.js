import { logger } from '../utils/logger.js';
import { db } from '../database/database.js';
import { usersSchema } from '../database/schemas/users.js';

async function createUser(data) {
  try {
    const insertedUser = await db
      .insert(usersSchema)
      .values(data)
      .returning();

    return { result: insertedUser };
  } catch(err) {
    logger.warn(err.message);
    return null;
  }
}

async function findAllUsers() {
  try {
    const users = await db
      .select()
      .from(usersSchema);

    return users;
  } catch(err) {
    logger.warn(err.message);
    return null;
  }
}

const usersService =  {
  createUser,
  findAllUsers,
};

export default usersService;
