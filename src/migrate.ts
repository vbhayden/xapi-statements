import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import repo from './repo';
import config from './config';
import logger from './logger';

const repoFacade = repo(config.production.repo);

repoFacade.migrate().then(() => {
  logger.info('Completed migrations');
  process.exit();
}).catch((err) => {
  logger.error(err);
  process.exit();
});
