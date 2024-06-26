import { buildServer } from './server.js';
import { getEnvVariable } from './utils/config.js';
import { logger } from './utils/logger.js';

function main() {
  try {
    const app = buildServer();
    
    app.listen({
      host: '0.0.0.0',
      port: Number(getEnvVariable('PORT')),
    });
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
}

main();
