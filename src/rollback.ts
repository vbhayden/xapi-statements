import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import repo from './repo';
import config from './config';
import logger from './logger';

const repoFacade = repo(config.production.repo);

repoFacade.rollback().then(() => {
  logger.info('Completed rollback');
  process.exit();
}).catch((err) => {
  logger.error(err);
  process.exit();
});
