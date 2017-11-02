import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import repo from './repo/factory';
import logger from './logger';

repo.migrate().then(() => {
  logger.info('Completed migrations');
  process.exit();
}).catch((err) => {
  logger.error(err);
  process.exit();
});
