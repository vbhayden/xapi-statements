import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import repoFactory from './repoFactory';
import logger from './logger';

const repoFacade = repoFactory();

repoFacade.rollback().then(() => {
  logger.info('Completed rollback');
  process.exit();
}).catch((err) => {
  logger.error(err);
  process.exit();
});
