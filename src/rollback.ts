import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import repo from './repo';
import logger from './logger';

repo.rollback().then(() => {
  logger.info('Completed rollback');
  process.exit();
}).catch((err) => {
  logger.error(err);
  process.exit();
});
