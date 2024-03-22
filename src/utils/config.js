import 'dotenv/config';

export function getEnvVariable(key) {
  const variable = process.env[key];

  if (!variable) {
    throw new Error(`Failed to read the [${key}] variable from the .env file`);
  }

  return variable;
}
