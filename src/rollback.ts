import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import repoFactory from './repoFactory';
import config from './config';
import logger from './logger';

const repoFacade = repoFactory({
  repoName: config.production.repo,
  memoryRepoConfig: {
    state: {
      statements: [],
      attachments: [],
    },
  },
  mongoRepoConfig: {
    url: config.mongo.url,
  },
});

repoFacade.rollback().then(() => {
  logger.info('Completed rollback');
  process.exit();
}).catch((err) => {
  logger.error(err);
  process.exit();
});
