import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { getEnvVariable } from '../utils/config.js';

const connection = await mysql.createConnection({
  host: getEnvVariable('DB_HOST'),
  user: getEnvVariable('DB_USER'),
  password: getEnvVariable('DB_PASSWORD'),
  database: getEnvVariable('DB_NAME'),
  port: Number(getEnvVariable('DB_PORT')),
});

export const db = drizzle(connection);
