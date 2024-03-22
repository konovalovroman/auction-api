import { getEnvVariable } from './src/utils/config.js';

/** @type { import("drizzle-kit").Config } */
export default {
  schema: './src/database/schemas',
  out: './migrations',
  driver: 'mysql2',
  dbCredentials: {
    host: getEnvVariable('DB_HOST'),
    user: getEnvVariable('DB_USER'),
    password: getEnvVariable('DB_PASSWORD'),
    database: getEnvVariable('DB_NAME'),
    port: Number(getEnvVariable('DB_PORT')),
  },
};
